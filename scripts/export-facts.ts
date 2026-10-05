import fs from "node:fs/promises";
import { parse } from "csv-parse/sync";

type ApprovedFactRow = {
  id: string;
  categoryId: string;
  topic: string;
  headline: string;
  body: string;
  summary: string;
  tags: string;
  readTimeSeconds: string;
  featured: string;
  relatedFactIds: string;
  themes?: string;
  socialHook?: string;
  contentType?: string;
  addedAt?: string;
};

// How settled the claim is (see docs/fact-writing-and-quality-guide.md §5).
// Blank cell = "fact". The app decodes unknown strings as "fact", so adding a
// value here is safe for old builds — but an unrecognized value in the CSV is
// almost certainly a typo, so fail loud instead of shipping it.
const CONTENT_TYPES = ["fact", "mystery", "possibility", "theory", "legend", "hoax"] as const;
type ContentType = (typeof CONTENT_TYPES)[number];

function parseContentType(row: ApprovedFactRow): ContentType {
  const value = (row.contentType ?? "").trim().toLowerCase() || "fact";
  if (!(CONTENT_TYPES as readonly string[]).includes(value)) {
    throw new Error(
      `${row.id}: unknown contentType "${row.contentType}" — expected one of ${CONTENT_TYPES.join(", ")}`,
    );
  }
  return value as ContentType;
}

function splitCsvList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function main() {
  const csv = await fs.readFile("approved-content/approved-facts.csv", "utf8");

  const rows = parse(csv, {
    columns: true,
    skip_empty_lines: true,
  }) as ApprovedFactRow[];

  // socialHook was gradually backfilled onto all 966 pre-2026-08-11 facts —
  // as of that backfill it's a required field for every fact, not an
  // optional one, so a blank cell here means a new fact was added without
  // one. Fail loud rather than silently exporting an app-only fact with no
  // Instagram hook (see docs/social-hook-rewrite-handoff.md for the method:
  // read the full fact, pick one of the 10 formulas in nib-social's
  // growth-strategy doc §9, never introduce a claim beyond what's already in
  // headline/body/summary).
  const missingSocialHook = rows.filter((row) => !row.socialHook?.trim()).map((row) => row.id);
  if (missingSocialHook.length > 0) {
    throw new Error(
      `${missingSocialHook.length} fact(s) missing socialHook: ${missingSocialHook.join(", ")}\n` +
        `Every fact needs an Instagram-only curiosity-gap hook — see docs/social-hook-rewrite-handoff.md.`,
    );
  }

  const facts = rows.map((row) => ({
    id: row.id,
    headline: row.headline,
    body: row.body,
    summary: row.summary,
    categoryId: row.categoryId,
    topic: row.topic,
    tags: splitCsvList(row.tags),
    readTimeSeconds: Number(row.readTimeSeconds),
    featured: row.featured === "true",
    relatedFactIds: splitCsvList(row.relatedFactIds),
    themes: splitCsvList(row.themes ?? ""),
    // Instagram-only rewrite of `headline` that opens a curiosity gap instead
    // of closing one (see nib-social's growth-strategy doc, §9 Hook Strategy).
    // Required as of the 2026-08-11 backfill — guaranteed present by the
    // check above, so no more conditional inclusion.
    socialHook: row.socialHook,
    contentType: parseContentType(row),
    // Reveal gate (docs/content-schema-reference.md): optional, blank = already live.
    // Carried through the CSV so re-running the export never drops it.
    ...(row.addedAt?.trim() ? { addedAt: row.addedAt.trim() } : {}),
  }));

  await fs.mkdir("exports", { recursive: true });

  await fs.writeFile(
    "exports/facts.json",
    JSON.stringify(facts, null, 2),
    "utf8",
  );

  console.log(`Exported ${facts.length} facts to exports/facts.json`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
