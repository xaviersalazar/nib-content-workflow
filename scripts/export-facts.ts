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
};

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
