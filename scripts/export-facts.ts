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
  difficulty: "easy" | "medium" | "advanced";
  funScore: string;
  featured: string;
  evergreen: string;
  sourceUrls: string;
  relatedFactIds: string;
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
    difficulty: row.difficulty,
    funScore: Number(row.funScore),
    featured: row.featured === "true",
    evergreen: row.evergreen === "true",
    relatedFactIds: splitCsvList(row.relatedFactIds),
    sourceUrls: splitCsvList(row.sourceUrls),
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
