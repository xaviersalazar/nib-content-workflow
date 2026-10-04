import "dotenv/config";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import {
  CopyObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

/// Publishes ../exports to the Nib CDN (Cloudflare R2, served at cdn.nibapp.net/v1).
///
///   pnpm publish:cdn                      dry run: every check + a full plan, uploads nothing
///   pnpm publish:cdn --yes                publish for real
///   pnpm publish:cdn --rollback-to 21     dry run of a rollback (re-publishes archive/v21 as live+1)
///   pnpm publish:cdn --rollback-to 21 --yes
///
/// Flags: --version N (override live+1), --allow-shrink, --skip-age-check.
/// contentVersion must strictly increase, so a rollback is a NEW higher version carrying old content.

const FILES = ["facts", "categories", "collections", "sources", "series"] as const;
const PREFIX = "v1";
const ARCHIVE = "archive";
const EXPORTS = path.resolve("exports");
const APP_SEED = path.resolve("../Nib/Nib/Data");
const PUBLIC_BASE = (process.env.R2_PUBLIC_BASE ?? "https://cdn.nibapp.net/v1").replace(/\/$/, "");
const SCHEMA_VERSION = 1;
// Mirrors FeaturedCollectionPicker.newBadgeWindow / FeaturedSeriesPicker.newBadgeWindow in the app.
const NEW_WINDOW_DAYS = { categories: 16, collections: 16, series: 64 } as const;
const MAX_SHRINK = 0.2;

type Manifest = {
  contentVersion: number;
  schemaVersion: number;
  files: { name: string; url: string; sha256: string }[];
};
type Json = any;

const args = process.argv.slice(2);
const flag = (n: string) => args.includes(`--${n}`);
const opt = (n: string) => {
  const i = args.indexOf(`--${n}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const APPLY = flag("yes");
const ROLLBACK_TO = opt("rollback-to") ? Number(opt("rollback-to")) : undefined;

const sha256 = (b: Buffer | Uint8Array) => crypto.createHash("sha256").update(b).digest("hex");
const say = (s = "") => console.log(s);
const fail = (s: string): never => {
  console.error(`\nFAIL: ${s}`);
  process.exit(1);
};
const warnings: string[] = [];

function env(name: string): string {
  const v = process.env[name];
  if (!v) fail(`${name} is not set in .env`);
  return v as string;
}

const BUCKET = env("R2_BUCKET");
const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${env("R2_ACCOUNT_ID")}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: env("R2_ACCESS_KEY_ID"), secretAccessKey: env("R2_SECRET_ACCESS_KEY") },
  requestChecksumCalculation: "WHEN_REQUIRED",
  responseChecksumValidation: "WHEN_REQUIRED",
});

async function getKey(key: string): Promise<Buffer> {
  const r = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
  return Buffer.from(await r.Body!.transformToByteArray());
}
async function exists(key: string): Promise<boolean> {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch (e: any) {
    if (e?.$metadata?.httpStatusCode === 404 || e?.name === "NotFound") return false;
    throw e;
  }
}
async function putKey(key: string, body: Buffer) {
  await s3.send(
    new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: "application/json" }),
  );
}
async function fetchPublic(file: string): Promise<Buffer> {
  let last: unknown;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const r = await fetch(`${PUBLIC_BASE}/${file}`, {
        headers: { "cache-control": "no-cache" },
        signal: AbortSignal.timeout(30_000),
      });
      if (!r.ok) throw new Error(`${PUBLIC_BASE}/${file} -> HTTP ${r.status}`);
      return Buffer.from(await r.arrayBuffer());
    } catch (e) {
      last = e;
      await new Promise((res) => setTimeout(res, 1500 * attempt));
    }
  }
  throw new Error(`could not fetch ${PUBLIC_BASE}/${file} after 4 attempts: ${(last as any)?.cause?.code ?? (last as any)?.message}`);
}

function buildManifest(version: number, hashes: Record<string, string>): Buffer {
  const m: Manifest = {
    contentVersion: version,
    schemaVersion: SCHEMA_VERSION,
    files: FILES.map((n) => ({ name: n, url: `${n}.json`, sha256: hashes[n] })),
  };
  return Buffer.from(JSON.stringify(m, null, 2) + "\n");
}

function localIntegrity(local: Record<string, Json>) {
  const facts: Json[] = local.facts;
  const ids = new Set<string>();
  for (const f of facts) {
    if (ids.has(f.id)) fail(`duplicate fact id ${f.id}`);
    ids.add(f.id);
  }
  const cats = new Set<string>(local.categories.map((c: Json) => c.id));
  const badCat = facts.filter((f) => !cats.has(f.categoryId));
  if (badCat.length) fail(`${badCat.length} facts reference an unknown category (e.g. ${badCat[0].id})`);
  const dangling = facts.flatMap((f) => (f.relatedFactIds ?? []).filter((r: string) => !ids.has(r)));
  if (dangling.length) fail(`${dangling.length} dangling relatedFactIds (e.g. ${dangling[0]})`);
  for (const [name, list] of [["collections", local.collections], ["series", local.series]] as const) {
    for (const item of list as Json[]) {
      const bad = (item.factIds ?? []).filter((i: string) => !ids.has(i));
      if (bad.length) fail(`${name}/${item.id} references missing facts: ${bad.join(", ")}`);
    }
  }
  say(`  integrity: ${facts.length} facts, ${cats.size} categories, ${local.collections.length} collections, ${local.series.length} series — no dups, no dangling refs`);
}

function ageGate() {
  if (flag("skip-age-check")) return warnings.push("age-rating check skipped (--skip-age-check)");
  const r = spawnSync("pnpm", ["check:age-rating"], { encoding: "utf8" });
  const summary = (r.stdout.match(/\d+ facts screened.*/) ?? [""])[0];
  if (r.status !== 0) fail(`age-rating gate has BLOCK findings — run \`pnpm check:age-rating\` and fix. ${summary}`);
  say(`  age-rating gate: ${summary}`);
}

function seedParity(buffers: Record<string, Buffer>) {
  if (!fs.existsSync(APP_SEED)) return warnings.push(`app seed dir not found (${APP_SEED}); parity not checked`);
  const drift = FILES.filter((n) => {
    const p = path.join(APP_SEED, `${n}.json`);
    return !fs.existsSync(p) || !fs.readFileSync(p).equals(buffers[n]);
  });
  if (drift.length) warnings.push(`app seed differs from exports for: ${drift.join(", ")} (cp exports/*.json into Nib/Nib/Data if intended)`);
  else say("  app seed (Nib/Nib/Data): identical to exports");
}

function newReport(local: Record<string, Json>, label: string) {
  const now = Date.now();
  const lines: string[] = [];
  let hidden = 0;
  for (const kind of ["categories", "collections", "series"] as const) {
    for (const item of local[kind] as Json[]) {
      if (!item.addedAt) continue;
      const t = Date.parse(item.addedAt);
      const days = (now - t) / 86_400_000;
      if (days < 0) lines.push(`    ${kind}/${item.id}: HIDDEN until ${item.addedAt}`);
      else if (days < NEW_WINDOW_DAYS[kind])
        lines.push(`    ${kind}/${item.id}: NEW — shows pill/Today card/tab dot for ${Math.ceil(NEW_WINDOW_DAYS[kind] - days)} more days`);
    }
  }
  hidden = (local.facts as Json[]).filter((f) => f.addedAt && Date.parse(f.addedAt) > now).length;
  say(`  ${label}: ${lines.length ? "" : "SILENT — nothing will show as NEW, and no drop card/dot will fire"}`);
  lines.forEach((l) => say(l));
  if (hidden) say(`    facts: ${hidden} gated by a future addedAt`);
}

function diffSummary(liveFiles: Record<string, Buffer>, local: Record<string, Json>, hashes: Record<string, string>) {
  for (const n of FILES) {
    say(`  ${n.padEnd(12)} ${sha256(liveFiles[n]) === hashes[n] ? "unchanged" : "CHANGED"}`);
  }
  const ids = (b: Buffer, key = "id") => new Set<string>((JSON.parse(b.toString()) as Json[]).map((x) => x[key]));
  for (const n of ["facts", "categories", "collections", "series"] as const) {
    const a = ids(liveFiles[n]);
    const b = new Set<string>((local[n] as Json[]).map((x) => x.id));
    const added = [...b].filter((x) => !a.has(x));
    const removed = [...a].filter((x) => !b.has(x));
    if (added.length || removed.length)
      say(`  ${n}: ${a.size} -> ${b.size}  (+${added.length} / -${removed.length})${added.length && added.length <= 4 ? "  added: " + added.join(", ") : ""}`);
  }
}

async function verifyLive(version: number, hashes: Record<string, string>) {
  let m: Manifest | undefined;
  for (let i = 0; i < 10; i++) {
    m = JSON.parse((await fetchPublic("manifest.json")).toString());
    if (m!.contentVersion === version) break;
    await new Promise((r) => setTimeout(r, 2000));
  }
  if (m!.contentVersion !== version) fail(`live manifest still reports v${m!.contentVersion}, expected v${version}`);
  for (const n of FILES) {
    const got = sha256(await fetchPublic(`${n}.json`));
    if (got !== hashes[n]) fail(`live ${n}.json checksum mismatch (got ${got.slice(0, 12)}…, want ${hashes[n].slice(0, 12)}…). Re-run, or --rollback-to the previous version.`);
  }
  say(`  verified: live manifest is v${version} and all ${FILES.length} files match their checksums`);
}

async function main() {
  say(APPLY ? (ROLLBACK_TO ? `== ROLLBACK to v${ROLLBACK_TO} (LIVE) ==` : "== PUBLISH (LIVE) ==") : `== DRY RUN${ROLLBACK_TO ? ` (rollback to v${ROLLBACK_TO})` : ""} — nothing will be uploaded ==`);

  // 1. Confirm the bucket really is what serves the public domain, and read the live version.
  const livePublic: Manifest = JSON.parse((await fetchPublic("manifest.json")).toString());
  if (!(await exists(`${PREFIX}/manifest.json`)))
    fail(`bucket "${BUCKET}" has no ${PREFIX}/manifest.json — wrong bucket or key layout`);
  const liveBucket: Manifest = JSON.parse((await getKey(`${PREFIX}/manifest.json`)).toString());
  if (liveBucket.contentVersion !== livePublic.contentVersion)
    fail(`bucket manifest is v${liveBucket.contentVersion} but ${PUBLIC_BASE} serves v${livePublic.contentVersion} — bucket does not back the public URL`);
  const live = livePublic.contentVersion;
  say(`live: v${live} (bucket and ${PUBLIC_BASE} agree)`);

  const version = Number(opt("version") ?? live + 1);
  if (!Number.isInteger(version) || version <= live) fail(`new version ${version} must be greater than live v${live}`);

  let local: Record<string, Json> = {};
  let buffers: Record<string, Buffer> = {};
  say(ROLLBACK_TO ? `\nsource: ${ARCHIVE}/v${ROLLBACK_TO} in the bucket` : "\npre-flight checks");
  if (ROLLBACK_TO) {
    const am: Manifest = JSON.parse((await getKey(`${ARCHIVE}/v${ROLLBACK_TO}/manifest.json`).catch(() => fail(`no archive for v${ROLLBACK_TO}`))).toString());
    for (const n of FILES) {
      buffers[n] = await getKey(`${ARCHIVE}/v${ROLLBACK_TO}/${n}.json`);
      const want = am.files.find((f) => f.name === n)?.sha256;
      if (sha256(buffers[n]) !== want) fail(`archived ${n}.json does not match its archived manifest checksum`);
      local[n] = JSON.parse(buffers[n].toString());
    }
    warnings.push("local exports/ are NOT changed by a rollback — they will differ from live until you re-export");
  } else {
    for (const n of FILES) {
      const p = path.join(EXPORTS, `${n}.json`);
      if (!fs.existsSync(p)) fail(`missing ${p}`);
      buffers[n] = fs.readFileSync(p);
      try { local[n] = JSON.parse(buffers[n].toString()); } catch { fail(`${n}.json is not valid JSON`); }
    }
    localIntegrity(local);
    ageGate();
    seedParity(buffers);
  }

  const hashes = Object.fromEntries(FILES.map((n) => [n, sha256(buffers[n])]));
  const manifestBytes = buildManifest(version, hashes);

  // 2. Diff + shrink guard against what is live right now.
  say(`\nchanges vs live v${live}`);
  const liveFiles: Record<string, Buffer> = {};
  for (const n of FILES) liveFiles[n] = await fetchPublic(`${n}.json`);
  diffSummary(liveFiles, local, hashes);
  const before = JSON.parse(liveFiles.facts.toString()).length, after = local.facts.length;
  if (after < before * (1 - MAX_SHRINK) && !flag("allow-shrink"))
    fail(`facts would shrink ${before} -> ${after} (>${MAX_SHRINK * 100}%). Re-run with --allow-shrink if intended.`);

  say("\nNEW / reveal status once live");
  newReport(local, "result");

  if (warnings.length) { say("\nwarnings"); warnings.forEach((w) => say(`  ! ${w}`)); }

  say(`\nplan: archive live v${live} -> ${ARCHIVE}/v${live}/, upload ${FILES.length} content files, then manifest (v${version}) last, then verify.`);
  if (!APPLY) {
    say("\nDRY RUN complete — nothing uploaded. Re-run with --yes to publish.");
    return;
  }

  // 3. Archive current live objects (idempotent), then publish content files before the manifest.
  for (const n of [...FILES.map((f) => `${f}.json`), "manifest.json"]) {
    const dest = `${ARCHIVE}/v${live}/${n}`;
    if (await exists(dest)) continue;
    await s3.send(new CopyObjectCommand({ Bucket: BUCKET, CopySource: `${BUCKET}/${PREFIX}/${n}`, Key: dest }));
  }
  say(`\narchived live v${live} -> ${ARCHIVE}/v${live}/`);
  for (const n of FILES) {
    await putKey(`${PREFIX}/${n}.json`, buffers[n]);
    say(`  uploaded ${n}.json`);
  }
  await putKey(`${PREFIX}/manifest.json`, manifestBytes);
  say(`  uploaded manifest.json (v${version})`);

  await verifyLive(version, hashes);

  if (!ROLLBACK_TO) fs.writeFileSync(path.join(EXPORTS, "manifest.json"), manifestBytes);
  fs.appendFileSync(
    path.resolve("cdn/publish-log.jsonl"),
    JSON.stringify({ at: new Date().toISOString(), version, previous: live, rollbackTo: ROLLBACK_TO ?? null, facts: after, hashes }) + "\n",
  );
  say(`\nPUBLISHED v${version}. Rollback if needed: pnpm publish:cdn --rollback-to ${live} --yes`);
}

main().catch((e) => {
  console.error(`\nERROR: ${e?.name ?? "Error"}: ${e?.message ?? e}`);
  process.exit(1);
});
