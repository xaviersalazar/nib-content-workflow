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
  const [category] = process.argv.slice(2);

  if (!category) {
    console.error("Usage: pnpm scrape:category <category>");
    console.error('Example: pnpm scrape:category "Business"');
    process.exit(1);
  }

  const csv = await fs.readFile("source-registry/sources.csv", "utf8");

  const rows = parse(csv, {
    columns: true,
    skip_empty_lines: true,
  }) as SourceRow[];

  const pending = rows.filter(
    (row) =>
      row.category.toLowerCase() === category.toLowerCase() &&
      row.status === "pending",
  );

  if (pending.length === 0) {
    console.log(`No pending sources found for category: "${category}"`);
    return;
  }

  console.log(
    `Found ${pending.length} pending topic(s) in category "${category}". Starting scrape...\n`,
  );

  let completed = 0;
  let failed = 0;

  for (const source of pending) {
    console.log(
      `[${completed + failed + 1}/${pending.length}] Scraping: ${source.category} / ${source.topic} / ${source.institution}`,
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
      console.error(`❌ Failed: ${source.url}\n`);
      failed++;
    } else {
      console.log(
        `✅ Done: ${source.institution} - ${source.topic} scraped successfully.\n`,
      );
      completed++;
    }
  }

  console.log(
    `\nFinished. ${completed} succeeded, ${failed} failed out of ${pending.length} total.`,
  );

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
