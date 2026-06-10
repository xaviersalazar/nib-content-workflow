import "dotenv/config";
import FirecrawlApp from "@mendable/firecrawl-js";
import fs from "node:fs/promises";
import path from "node:path";
import slugify from "slugify";

const app = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

function slug(value: string) {
  return slugify(value, { lower: true, strict: true });
}

async function main() {
  const [url, category, topic, institution] = process.argv.slice(2);

  if (!url || !category || !topic || !institution) {
    console.error(
      "Usage: pnpm scrape:source <url> <category> <topic> <institution>",
    );
    process.exit(1);
  }

  const categorySlug = slug(category);
  const topicSlug = slug(topic);
  const institutionSlug = slug(institution);

  const dir = path.join("sources", categorySlug, topicSlug);
  await fs.mkdir(dir, { recursive: true });

  const result = await app.scrapeUrl(url, {
    formats: ["markdown"],
    onlyMainContent: true,
    removeBase64Images: true,
    blockAds: true,
  });

  const markdown = result.markdown ?? "";

  if (!markdown.trim()) {
    throw new Error(`No markdown extracted from ${url}`);
  }

  const baseName = `${institutionSlug}-${topicSlug}`;

  await fs.writeFile(path.join(dir, `${baseName}.md`), markdown, "utf8");

  await fs.writeFile(
    path.join(dir, `${baseName}.metadata.json`),
    JSON.stringify(
      {
        url,
        category,
        topic,
        institution,
        extractedAt: new Date().toISOString(),
        markdownFile: `${baseName}.md`,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(`Saved ${dir}/${baseName}.md`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
