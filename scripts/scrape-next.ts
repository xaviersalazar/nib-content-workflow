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

  const next = rows.find((row) => row.status === "pending");

  if (!next) {
    console.log("No pending sources found.");
    return;
  }

  console.log(
    `Scraping: ${next.category} / ${next.topic} / ${next.institution}`,
  );
  console.log(`URL: ${next.url}`);

  const result = spawnSync(
    "pnpm",
    ["scrape:source", next.url, next.category, next.topic, next.institution],
    { stdio: "inherit" },
  );

  if (result.status !== 0) {
    console.error(`Failed: ${next.url}`);
    process.exit(1);
  }

  console.log(
    `Done: ${next.institution} - ${next.topic} scraped successfully.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
