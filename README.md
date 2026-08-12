# Nib Content Workflow

A lightweight content pipeline for building high-quality "Today I Learned" facts from trusted sources.

This project focuses on:

- trusted source ingestion
- low-cost human-in-the-loop fact drafting
- repeatable export to app-ready JSON

## What This Repository Includes

- Source scraping scripts powered by Firecrawl.
- Batch processing from a CSV source registry.
- Fact export from reviewed CSV content to JSON.
- Workflow documentation for manual AI-assisted drafting and review.

## Tech Stack

- Node.js + TypeScript
- pnpm
- tsx
- Firecrawl SDK

## Prerequisites

- Node.js 20+
- pnpm 9+
- A Firecrawl API key

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create an environment file:

```bash
cp .env.example .env 2>/dev/null || touch .env
```

3. Add your Firecrawl key to `.env`:

```bash
FIRECRAWL_API_KEY=your_api_key_here
```

4. Ensure the source registry file exists at `source-registry/sources.csv`.

The batch script reads from this path. If you want to use the starter file in `docs/sources.csv`, run:

```bash
mkdir -p source-registry
cp docs/sources.csv source-registry/sources.csv
```

## Scripts

- `pnpm scrape:source <url> <category> <topic> <institution>`
- `pnpm scrape:next`
- `pnpm scrape:batch`
- `pnpm export:facts`
- `pnpm export:sources` — builds `exports/sources.json`, the topic-level provenance map the app shows as a "Source ↗" line
- `pnpm check:age-rating` — screens the library against the 4+ age gate (exits 1 on any BLOCK)

### Scrape a Single Source

```bash
pnpm scrape:source \
  "https://science.nasa.gov/universe/black-holes/" \
  "Space" \
  "Black Holes" \
  "NASA Science"
```

Output:

- `sources/<category-slug>/<institution-slug>-<topic-slug>.md`

### Scrape Next Pending Source

`pnpm scrape:next` reads `source-registry/sources.csv` and runs the first row where `status` is `pending` through `scrape:source`.

### Scrape All Pending Sources

`pnpm scrape:batch` reads `source-registry/sources.csv` and processes **all** rows where `status` is `pending`.

Expected columns:

- `category`
- `topic`
- `institution`
- `url`
- `status`

### Export Approved Facts

`pnpm export:facts` reads `approved-content/approved-facts.csv` and writes `exports/facts.json`.

If the input file does not exist yet, create it with at least this header:

```csv
id,categoryId,topic,headline,body,summary,tags,readTimeSeconds,featured,relatedFactIds
```

Notes:

| Column            | Description                                                                                                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | Unique slug in the format `{topic}-{short-desc}` (e.g. `black-holes-spaghettification`). `topic` is the lowercased, hyphenated topic name; `short-desc` is a concise hyphenated description of the fact. Once set, never change it. |
| `categoryId`      | Lowercase category slug (e.g. `space`).                                                                                                                                                                                             |
| `topic`           | Human-readable topic name (e.g. `Black Holes`).                                                                                                                                                                                     |
| `headline`        | The fact's title as it appears in the app.                                                                                                                                                                                          |
| `body`            | Full fact text. Wrap in double quotes if it contains commas.                                                                                                                                                                        |
| `summary`         | One-sentence summary of the fact.                                                                                                                                                                                                   |
| `tags`            | Comma-separated list of tags (e.g. `space,gravity,physics`).                                                                                                                                                                        |
| `readTimeSeconds` | Estimated read time as a whole number of seconds.                                                                                                                                                                                   |
| `featured`        | `true` or `false` — whether the fact is featured.                                                                                                                                                                                   |
| `relatedFactIds`  | Comma-separated list of related fact `id` values. Leave blank if none.                                                                                                                                                              |

### Export Sources (provenance)

`pnpm export:sources` reads `source-registry/sources.csv`, `exports/categories.json`, and
`exports/facts.json`, and writes `exports/sources.json` — the topic-level provenance map the Nib app
renders as a quiet "Source: NASA ↗" line (its _Trust First_ attribution).

It joins the registry to the app's `categoryId` values and the **exact** `topic` strings on facts, so
the app does a trivial O(1) lookup with no normalization of its own. All reconciliation happens here:

- Category names join to app ids by name (one alias for `Illusions & Perception`).
- Topics normalize `&`↔`and` for matching; a small `TOPIC_ALIASES` map in the script covers topics
  whose display name diverges from the registry label (e.g. the registry's `Recording Studios` row
  actually points at the sound-recording article).
- Tracking query params (`srsltid`, `utm_*`, …) are stripped from every URL; load-bearing params
  (e.g. a WordPress `?p=1503`) are preserved.

The script prints its coverage (currently **100% — 703/703 topics**) and lists any topic without a
registry match. A missing topic simply shows no source line in the app, so the export never fails on a
gap — but aim to keep coverage at 100% by adding the missing source to `source-registry/sources.csv`.

Output shape (`categoryId → topic → { institution, url }`):

```json
{
  "space": { "Venus": { "institution": "NASA", "url": "https://science.nasa.gov/venus/" } }
}
```

## Recommended Workflow

1. Add or update trusted URLs in `source-registry/sources.csv`.
2. Run Firecrawl extraction (`pnpm scrape:source`, `pnpm scrape:next`, or `pnpm scrape:batch`).
3. Draft 3–5 fact candidates per source using your AI assistant (`prompts/draft-facts.md` —
   this includes drafting each fact's `socialHook`, the Instagram-only curiosity-gap headline,
   alongside the app-facing `headline`).
4. Validate claims against source text only (`prompts/validate-fact.md`, which also checks
   `socialHook` doesn't introduce anything beyond what the fact's own text supports).
5. Perform human review and approve only the best facts per topic — **up to 3 (quality-gated, never padded)**.
6. Store approved rows, including `socialHook`, in `approved-content/approved-facts.csv`.
7. Screen for age-appropriateness with `pnpm check:age-rating` (the app is rated 4+ and facts are also
   posted to Instagram). Read every hit — it's a regex prefilter, not a judge.
8. Export with `pnpm export:facts` — **this hard-fails if any fact is missing `socialHook`.**
9. Whenever `source-registry/sources.csv` changes (or after adding facts on new topics), regenerate
   provenance with `pnpm export:sources` and confirm coverage stays at 100%.

Both exports land in `exports/`. To ship them to the app, copy the JSON into the app's bundled seed
(`Nib/Data/`) and/or publish them to the CDN (see `cdn/README.md`) — `sources.json` travels the same
path as `facts.json`.

For detailed process guidance, see:

- `docs/fact-writing-and-quality-guide.md` — **Fact Writing & Quality Guide** (voice, flatness red-flags, validation, rewrite rules, CSV/ID rules)
- `docs/topic-curation-and-quality-guide.md` — per-category curation + the reproducible whole-library weed-out (§8)
- `docs/source-discovery-and-registry.md` — source discovery + registry/scraping operations
- `docs/content-schema-reference.md` — the app JSON contract + `relatedFactIds`
- `docs/content-expansion-roadmap.md` — the fascination-first content roadmap

## Project Structure

```text
.
├── docs/
│   ├── fact-writing-and-quality-guide.md
│   ├── topic-curation-and-quality-guide.md
│   ├── source-discovery-and-registry.md
│   ├── content-schema-reference.md
│   ├── content-expansion-roadmap.md
│   ├── session-handoff.md
│   └── sources.csv
├── scripts/
│   ├── export-facts.ts
│   ├── export-sources.ts         # builds exports/sources.json (provenance)
│   ├── scrape-batch.ts
│   ├── scrape-next.ts
│   └── scrape-source.ts
├── source-registry/              # expected by scrape-batch.ts + export-sources.ts
│   └── sources.csv
├── approved-content/             # expected by export-facts.ts
│   └── approved-facts.csv
├── sources/                      # generated markdown
├── exports/                      # generated json output
├── package.json
└── pnpm-lock.yaml
```

## Troubleshooting

- `No markdown extracted from <url>`:
  The URL may block scraping, require JS rendering, or not expose readable main content.
- `FIRECRAWL_API_KEY` missing:
  Confirm `.env` exists and contains the key.
- `ENOENT` for CSV files:
  Create required folders and files (`source-registry/sources.csv`, `approved-content/approved-facts.csv`).
