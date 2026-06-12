# TIL Content Workflow

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
- `pnpm scrape:batch`
- `pnpm export:facts`

### Scrape a Single Source

```bash
pnpm scrape:source \
  "https://science.nasa.gov/universe/black-holes/" \
  "Space" \
  "Black Holes" \
  "NASA Science"
```

Output:

- `sources/<category-slug>/<topic-slug>/<institution-slug>-<topic-slug>.md`

### Scrape All Pending Sources

`pnpm scrape:batch` reads `source-registry/sources.csv` and processes rows where `status` is `pending`.

Expected columns:

- `category`
- `topic`
- `institution`
- `url`
- `tier`
- `status`

### Export Approved Facts

`pnpm export:facts` reads `approved-content/approved-facts.csv` and writes `exports/facts.json`.

If the input file does not exist yet, create it with at least this header:

```csv
id,categoryId,topic,headline,body,summary,tags,readTimeSeconds,difficulty,funScore,featured,evergreen,sources,relatedFactIds
```

Notes:

- `tags` should be comma-separated.
- `difficulty` must be one of: `easy`, `medium`, `advanced`.
- `sources` should contain a JSON array string.
- `featured` and `evergreen` should be `true` or `false`.

## Recommended Workflow

1. Add or update trusted URLs in `source-registry/sources.csv`.
2. Run Firecrawl extraction (`pnpm scrape:source` or `pnpm scrape:batch`).
3. Draft 1-3 fact candidates per source using your AI assistant.
4. Validate claims against source text only.
5. Perform human review and keep approved facts.
6. Store approved rows in `approved-content/approved-facts.csv`.
7. Export with `pnpm export:facts`.

For detailed process guidance, see:

- `docs/trusted-source-workflow.md`
- `docs/manual-ai-assisted-content-workflow.md`

## Project Structure

```text
.
├── docs/
│   ├── manual-ai-assisted-content-workflow.md
│   ├── sources.csv
│   └── trusted-source-workflow.md
├── scripts/
│   ├── export-facts.ts
│   ├── scrape-batch.ts
│   └── scrape-source.ts
├── source-registry/              # expected by scrape-batch.ts
│   └── sources.csv
├── approved-content/             # expected by export-facts.ts
│   └── approved-facts.csv
├── sources/                      # generated markdown + metadata
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
