import fs from "node:fs/promises";
import { parse } from "csv-parse/sync";

/// Builds `exports/sources.json` — the topic-level provenance map the Nib app
/// surfaces as a quiet "Source: NASA ↗" line.
///
/// Joins three inputs:
///   • source-registry/sources.csv   (category name, topic → institution, url)
///   • exports/categories.json       (category name → id, for the app's ids)
///   • exports/facts.json            (the exact topic strings the app renders)
///
/// The map is keyed by the app's `categoryId` → the *exact* `topic` string that
/// appears on facts, so the app does a trivial O(1) lookup with no normalization
/// of its own — all fuzzy matching happens here, at build time.

type SourceRow = {
  category: string;
  topic: string;
  institution: string;
  url: string;
  status: string;
};

type Category = { id: string; name: string };
type Fact = { categoryId: string; topic: string };
type SourceRef = { institution: string; url: string };

/// The one registry category whose name differs from the app's (singular vs
/// plural). Everything else joins on an exact name match.
const CATEGORY_NAME_ALIAS: Record<string, string> = {
  "Illusions & Perception": "Illusions & Perceptions",
};

/// Fact topics whose display name diverges from the registry's topic label,
/// mapped `categoryId → { factTopic: registryTopic }`. The registry row's URL
/// is the correct source in every case — only the label differs (e.g. the
/// registry's "Recording Studios" row actually points at the sound-recording
/// article; "Pulp Fiction Covers" points at an art-of-book-covers essay). This
/// reconciliation lives here, not in the registry, so the hand-curated scrape
/// registry stays untouched.
const TOPIC_ALIASES: Record<string, Record<string, string>> = {
  "ancient-civilizations": {
    "Aztec Civilization": "Aztecs",
    "Inca Civilization": "Incas",
    "Maya Civilization": "Maya",
  },
  cars: { "Air Bags": "Airbags" },
  chemistry: { "Chemical Elements": "Elements" },
  economics: { GDP: "Gross Domestic Product" },
  engineering: { Gears: "Gear", Levers: "Lever", Wheels: "Wheel" },
  explorers: { "Ferdinand Magellan": "Magellan" },
  history: { "Golden Age of Piracy": "Pirate Age" },
  literature: {
    "Book Covers": "Pulp Fiction Covers",
    Pseudonyms: "Anonymous Authors",
  },
  music: { "Sound Recording": "Recording Studios" },
  "ocean-life": { "Sea Stars": "Starfish" },
  physics: { Superconductivity: "Superconductors" },
  "strange-places": { "Paris Catacombs": "Catacombs of Paris" },
  technology: { "E-mail": "Email" },
  "video-games": { "Pokémon": "Pokemon", "The Legend of Zelda": "Zelda" },
};

/// Query parameters that carry no meaning for the destination page and exist
/// only to track the click. Stripped from every emitted URL so the "Source ↗"
/// link is the clean canonical page. Anything not listed here (e.g. a WordPress
/// `?p=1503` post id) is load-bearing and preserved.
const TRACKING_PARAMS = new Set([
  "srsltid", "gclid", "fbclid", "dclid", "gbraid", "wbraid", "msclkid",
  "yclid", "mc_cid", "mc_eid", "_hsenc", "_hsmi", "igshid", "vero_id",
  "oly_enc_id", "oly_anon_id", "ref", "ref_src", "ref_url", "referrer",
  "spm", "scm",
]);

/// Removes tracking query params (and any `utm_*`), dropping a now-empty `?`.
/// Leaves the URL untouched if it can't be parsed.
function cleanUrl(raw: string): string {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return raw.trim();
  }
  for (const key of [...url.searchParams.keys()]) {
    if (TRACKING_PARAMS.has(key) || key.toLowerCase().startsWith("utm_")) {
      url.searchParams.delete(key);
    }
  }
  url.search = url.searchParams.toString();
  return url.toString();
}

/// Normalizes a topic for matching only: lowercased, "&" spelled out, and all
/// other punctuation collapsed to single spaces. Recovers "Acids & Bases" ↔
/// "Acids and Bases" without touching the emitted (exact) topic strings.
function normalizeTopic(topic: string): string {
  return topic
    .replace(/&/g, "and")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/// The registry lookup key for a (categoryId, topic) pair.
function key(categoryId: string, topic: string): string {
  return `${categoryId}::${normalizeTopic(topic)}`;
}

async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await fs.readFile(path, "utf8")) as T;
}

async function main() {
  const csv = await fs.readFile("source-registry/sources.csv", "utf8");
  const rows = parse(csv, { columns: true, skip_empty_lines: true }) as SourceRow[];
  const categories = await readJson<Category[]>("exports/categories.json");
  const facts = await readJson<Fact[]>("exports/facts.json");

  const nameToId = new Map(categories.map((c) => [c.name, c.id]));

  // Registry indexed by `${categoryId}::${normalizedTopic}`.
  const registry = new Map<string, SourceRef>();
  const skipped = { excluded: 0, unknownCategory: 0 };
  for (const row of rows) {
    if (row.status.trim().startsWith("exclude")) {
      skipped.excluded += 1;
      continue;
    }
    const name = CATEGORY_NAME_ALIAS[row.category] ?? row.category;
    const categoryId = nameToId.get(name);
    if (!categoryId) {
      skipped.unknownCategory += 1;
      continue;
    }
    registry.set(key(categoryId, row.topic), {
      institution: row.institution.trim(),
      url: cleanUrl(row.url),
    });
  }

  // Emit keyed by the exact fact topics so the app needs no normalization.
  const out: Record<string, Record<string, SourceRef>> = {};
  const seen = new Set<string>();
  let matched = 0;
  const unmatched: string[] = [];
  for (const fact of facts) {
    const pairKey = `${fact.categoryId}::${fact.topic}`;
    if (seen.has(pairKey)) continue;
    seen.add(pairKey);

    let ref = registry.get(key(fact.categoryId, fact.topic));
    if (!ref) {
      // Fall back to the topic-label alias (the registry URL is still correct).
      const aliasTopic = TOPIC_ALIASES[fact.categoryId]?.[fact.topic];
      if (aliasTopic) ref = registry.get(key(fact.categoryId, aliasTopic));
    }
    if (!ref) {
      unmatched.push(`${fact.categoryId} / ${fact.topic}`);
      continue;
    }

    (out[fact.categoryId] ??= {})[fact.topic] = ref;
    matched += 1;
  }

  await fs.mkdir("exports", { recursive: true });
  await fs.writeFile("exports/sources.json", JSON.stringify(out, null, 2), "utf8");

  const distinct = seen.size;
  console.log(
    `Exported provenance for ${matched}/${distinct} topics ` +
      `(${((100 * matched) / distinct).toFixed(1)}%) to exports/sources.json`,
  );
  console.log(`Skipped registry rows:`, skipped);
  if (unmatched.length) {
    console.log(`\n${unmatched.length} topics without a registry match:`);
    for (const u of unmatched) console.log(`   ${u}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
