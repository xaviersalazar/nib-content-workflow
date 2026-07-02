import "dotenv/config";
import fs from "node:fs/promises";
import { parse } from "csv-parse/sync";
import { spawnSync } from "node:child_process";

type SourceRow = {
  category: string;
  topic: string;
  institution: string;
  url: string;
  status: string;
};

async function main() {
  const csv = await fs.readFile("source-registry/sources.csv", "utf8");

  const rows = parse(csv, {
    columns: true,
    skip_empty_lines: true,
  }) as SourceRow[];

  const next = rows.filter((row) => row.status === "pending").slice(0, 2);

  if (next.length === 0) {
    console.log("No pending sources found.");
    return;
  }

  for (const source of next) {
    console.log(
      `Scraping: ${source.category} / ${source.topic} / ${source.institution}`,
    );
    console.log(`URL: ${source.url}`);

    const result = spawnSync(
      "pnpm",
      [
        "scrape:source",
        source.url,
        source.category,
        source.topic,
        source.institution,
      ],
      { stdio: "inherit" },
    );

    if (result.status !== 0) {
      console.error(`Failed: ${source.url}`);
      process.exit(1);
    }

    console.log(
      `Done: ${source.institution} - ${source.topic} scraped successfully.`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
