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
    // Most facts don't have one yet — omitted (not an empty string) so it's
    // undefined in-app rather than a visible blank field, and so this column
    // can be filled in gradually without a schema-wide backfill.
    ...(row.socialHook ? { socialHook: row.socialHook } : {}),
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
