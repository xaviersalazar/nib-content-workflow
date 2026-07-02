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

  const pending = rows.filter((row) => row.status === "pending");

  for (const row of pending) {
    console.log(`Scraping ${row.category} / ${row.topic} / ${row.institution}`);

    const result = spawnSync(
      "pnpm",
      ["scrape:source", row.url, row.category, row.topic, row.institution],
      { stdio: "inherit" },
    );

    if (result.status !== 0) {
      console.error(`Failed: ${row.url}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
