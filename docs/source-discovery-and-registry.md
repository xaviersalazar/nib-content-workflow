# Source Discovery & Registry Guide

> The single source of truth for **finding sources and building the registry**. Consolidates the former
> `agent-discovery-guide` and `trusted-source-workflow` docs (merged 2026-07-14). For how to *write* facts
> from a source, see `docs/fact-writing-and-quality-guide.md` (Fact Writing & Quality Guide).

## Purpose

This document defines the role of the source discovery agent used to expand the source registry for the **Nib** ("Today I Learned") application.

The goal is to build a source registry filled with:

- high-trust sources
- interesting topics
- working URLs
- scrape-friendly pages
- curiosity-dense source material

The source discovery agent does **not** generate facts.

Its role is to find source pages that can later be scraped and passed to a fact-generation agent.

---

# Core Content Philosophy

The app should optimize for curiosity density.

Every topic should be capable of producing facts that make users think:

> Wait… really?

A topic should not be added simply because it is technically valid.

A smaller collection of excellent topics and excellent sources is better than a large collection of weak ones.

---

# Facts Per Topic

The target is:

```text
1 topic
↓
1 source page
↓
up to 3 excellent facts (the best 1–3 — quality-gated, not a quota)
```

**3 is a ceiling, not a target.** A source that only supports 1–2 genuinely surprising facts is fine —
never pad to 3. If a topic can only produce dull facts, replace the topic. (Full rule: `docs/fact-writing-and-quality-guide.md`
§2, and the per-category process in `docs/topic-curation-and-quality-guide.md`.) For sourcing, this means:
**prefer a page that clearly supports several strong candidates so you can approve the best.**

The goal is to ship more topics at launch and reduce the chance that users repeatedly see facts from the same topic.

---

# Overall Workflow

```text
Category
↓
Topic planning
↓
Duplicate check
↓
Source discovery
↓
Verification table
↓
Manual user verification
↓
CSV rows
↓
Firecrawl scrape
↓
Markdown source file
↓
Fact generation agent
↓
up to 3 approved facts (the best 1–3, quality-gated)
↓
App
```

---

# Agent Responsibilities

The source discovery agent is responsible for:

1. Iterating category-by-category.
2. Checking existing topics before proposing new topics.
3. Avoiding exact and semantic duplicates.
4. Finding one excellent source page per topic.
5. Returning URLs in a verification table.
6. Waiting for manual approval.
7. Producing CSV rows only after approval.
8. Repeating until all categories are complete.

The source discovery agent should never generate facts.

---

# Required Source Registry Format

CSV rows must match:

```csv
category,topic,institution,url,status
```

When producing CSV output for the user, do **not** include the header row.

Output only the rows themselves.

Correct:

```csv
Space,Kuiper Belt,NASA,https://science.nasa.gov/solar-system/kuiper-belt/facts/,pending
Space,Oort Cloud,NASA,https://science.nasa.gov/solar-system/oort-cloud/facts/,pending
```

Incorrect:

```csv
category,topic,institution,url,status
Space,Kuiper Belt,NASA,https://science.nasa.gov/solar-system/kuiper-belt/facts/,pending
```

Status should always be:

```text
pending
```

unless the user explicitly requests otherwise.

---

# Trusted Sources

Prefer highly trusted primary or institutional sources.

Examples:

- NASA
- NOAA
- Smithsonian
- Britannica
- NIH
- National Geographic
- Library of Congress
- USGS
- CDC
- National Park Service
- CERN
- FAA
- NHTSA
- UNESCO
- National Inventors Hall of Fame
- Cleveland Clinic
- American Red Cross
- Royal Museums Greenwich
- SETI Institute
- The Canadian Encyclopedia

Trusted secondary or specialized sources are also fine when they provide better
curiosity density or a better working page:

- HowStuffWorks
- TIME
- BBC
- Car and Driver
- Travelers
- Live Science
- The Punctuation Guide
- Public Domain Review
- Royal Literary Fund
- Hartzell Propeller
- MovieWeb
- Hollywood Reporter

Use lower-confidence discovery sources sparingly and only when:

- the topic is valuable
- no stronger source exists
- the page is dedicated and useful
- the user manually approves it

---

# Source Selection Priority

Prefer pages in this order:

1. Dedicated facts pages
2. Dedicated article pages
3. Educational explainers
4. Long-form feature articles
5. Stable encyclopedia pages
6. Official institutional pages

Avoid:

- guessed URLs
- generic landing pages
- search result pages
- topic hubs
- category indexes
- mission directories
- technical PDFs
- thin dictionary entries
- pages with very little topic content
- pages that load but redirect to an unrelated page
- pages that take too long to load or are likely to scrape poorly

---

# No Guessed URLs Rule

Never assume a URL works because it follows a pattern.

Bad:

```text
https://example.com/topic-name
```

unless confirmed as a real content page.

The agent should only propose URLs that appear to be actual working, dedicated source pages.

---

# Verification Table First

Before generating CSV, always return a verification table.

Example:

| Topic       | Institution | URL                                                      |
| ----------- | ----------- | -------------------------------------------------------- |
| Kuiper Belt | NASA        | https://science.nasa.gov/solar-system/kuiper-belt/facts/ |
| Oort Cloud  | NASA        | https://science.nasa.gov/solar-system/oort-cloud/facts/  |

The user then manually verifies:

- the URL works
- the page is dedicated to the topic
- the page has enough useful content
- the page is not a generic landing page
- the page is not a search result page
- the page is not overly technical
- the page looks scrape-friendly

Only after user approval should CSV rows be generated.

---

# Source Quality Over Topic Completion

Do not force weak topics just to complete a list.

It is better to replace a weak topic than to attach a bad source to it.

A topic may be replaced if:

- source pages are weak
- links are broken
- pages are generic or thin
- pages are too technical
- the topic overlaps another category
- the topic would only produce boring facts

---

# Curiosity Density Rule

A source page should support at least 3 strong facts (ideally a few candidates, so you can approve the best 3).

Reject pages that are technically accurate but likely to produce only generic facts.

Weak examples:

- “X is a type of Y.”
- “X was invented in YEAR.”
- “X is used for Z.”

Strong examples:

- “Cars are designed to crush themselves in specific areas to protect passengers.”
- “Auto-Tune was invented by an engineer who had worked with seismic data.”
- “Post-it Notes came from a glue that was considered a failure.”
- “Flying boats became obsolete partly because World War II created so many long runways.”

---

# Duplicate Topic Rule

Before proposing or sourcing topics, check the existing source list.

Avoid exact duplicates.

Bad:

```text
Space → Space Telescopes
Astronomy → Space Telescopes
```

Avoid semantic duplicates.

Bad:

```text
Cars → Automatic Transmissions
Cars → Transmission

Aviation → Black Boxes
Aviation → Flight Recorders

Business → Product Placement
Business → Advertising

Mathematics → Statistics
Mathematics → Probability

Religion & Beliefs → Buddhism
Religion & Beliefs → Buddhism already exists
```

Every topic should ideally have one clear home.

---

# Category Territory Rule

Every category should own a clear conceptual territory.

Ask:

> What domain does this category own?

Topics should reinforce the category’s identity.

Categories should complement one another, not compete with one another.

---

## Example Category Territories

### Space

Owns:

- planets
- solar system objects
- moons
- asteroids
- comets
- dwarf planets
- Kuiper Belt
- Oort Cloud
- space exploration
- meteor showers

Avoids:

- black holes
- galaxies
- telescopes
- stars

Those belong better in Astronomy.

---

### Astronomy

Owns:

- stars
- galaxies
- nebulae
- black holes
- pulsars
- quasars
- supernovas
- cosmology
- telescopes

---

### Technology

Owns:

- computing infrastructure
- protocols
- standards
- hardware
- digital systems

Examples:

- Bluetooth
- USB
- CAPTCHA
- Search Engines
- Data Centers

---

### Artificial Intelligence

Owns:

- machine learning concepts
- AI behavior
- AI ethics
- intelligent systems

Examples:

- AI Hallucinations
- Recommendation Systems
- Reinforcement Learning
- AI Ethics
- Autonomous Vehicles

---

### Internet Culture

Owns:

- online communities
- memes
- viral behavior
- internet slang
- livestreaming
- reaction GIFs

---

### Movies

Owns:

- filmmaking techniques
- cinema history
- studios
- behind-the-scenes innovations

Examples:

- Stop Motion
- Pixar
- Movie Trailers
- Movie Makeup
- Technicolor

---

### Music

Owns:

- production tools
- recording techniques
- music culture
- music history
- music festivals

Examples:

- Drum Machines
- Auto-Tune
- Sampling
- DJ Culture
- Music Festivals

---

### Religion & Beliefs

Owns:

- belief systems
- religious practices
- sacred traditions
- religious objects
- calendars
- fasting
- sacred texts

Avoid duplicating major traditions if they already exist.

---

# Topic Evolution Rule

Topics are not fixed forever.

If a better source suggests a better topic, update the topic.

Examples:

| Original Topic          | Replacement         |
| ----------------------- | ------------------- |
| Space Probes            | Voyager Program     |
| Game Controllers        | Speedrunning        |
| Movie Soundtracks       | Movie Trailers      |
| Stunts                  | Movie Makeup        |
| Automatic Transmissions | Crumple Zones       |
| Airport Runways         | Flying Boats        |
| Product Placement       | Trade Secrets       |
| Statistics              | Topology            |
| Microwave Oven          | Post-it Notes       |
| Black Boxes             | Autopilot           |
| Airplane Wings          | Winglets            |
| Book Covers             | Pulp Fiction Covers |
| Pseudonyms              | Anonymous Authors   |

---

# Institution Consistency Rule

Whenever possible, keep a category mostly within the same institution.

Benefits:

- consistent quality
- predictable scraping
- easier maintenance
- fewer formatting issues
- stable tone

Examples:

- Space → NASA
- Astronomy → NASA
- Ancient Civilizations → Britannica
- Dinosaurs → Britannica
- Inventions → National Inventors Hall of Fame
- Chemistry → Britannica
- Mathematics → Britannica

However, do not force institutional consistency when mixed sources produce better pages.

Examples of mixed-source categories:

- Ocean Life
- Internet Culture
- Movies
- Music
- Cars
- Aviation

---

# Slow Source Flow Rule

Do not rush sourcing.

A slower response with high-quality working links is better than a fast response with broken links.

The improved process is:

1. Check existing topics.
2. Identify duplicate risks.
3. Choose or refine topics.
4. Search for dedicated source pages.
5. Prefer stable institutional pages.
6. Avoid guessed URLs.
7. Return only links that look like real source pages.
8. Let the user verify manually.
9. Fix outliers before generating CSV.

---

# Handling Broken or Weak Links

If the user reports that a link does not work:

1. Keep all approved links.
2. Replace only the failed link.
3. Do not regenerate the entire category unless needed.
4. Prefer a stronger source even if it changes the institution.
5. If the topic itself seems weak, propose a replacement topic.

If the user says a source is too dry or too technical, replace the topic or source with something more curiosity-rich.

Example:

- Airport Runways was replaced because the FAA source was too technical.
- Flying Boats was chosen instead because it had stronger story potential.

---

# New Category Rule

New categories should have **8–10 topics each**, not only 5.

Reason:

Older categories usually have 8+ topics, and new categories should feel equally substantial.

When creating or expanding a new category:

1. Start with 8–10 topic candidates.
2. Remove duplicates against existing categories.
3. Replace overlapping topics.
4. Source the full set using the stricter source flow.
5. Generate CSV only after approval.

---

# Existing Category Expansion Rule

Existing categories should receive at least **5 new topics**, unless duplication or poor source quality requires fewer.

If a topic is removed due to overlap, replace it with a cleaner topic.

Example:

Space originally had 5 planned additions, but Space Telescopes was removed because Astronomy already owned telescope-related topics.

---

# Recommended Output Style

## During source discovery

Use:

```markdown
# Category Verification Table

| Topic | Institution | URL |
| ----- | ----------- | --- |
| Topic | Institution | URL |
```

Include short notes only when helpful.

Do not generate CSV during this phase.

---

## During CSV generation

Use a CSV code block with no header row.

Example:

```csv
Cars,Airbags,NHTSA,https://www.nhtsa.gov/vehicle-safety/air-bags,1,pending
Cars,Windshield Wipers,National Inventors Hall of Fame,https://www.invent.org/inductees/mary-anderson,1,pending
```

---

# Final Checklist Before Returning Sources

Before showing a verification table, confirm:

- Topic is not already in the source list.
- Topic does not semantically duplicate another topic.
- Topic belongs in the category territory.
- URL is not guessed.
- URL appears to be a dedicated content page.
- Source is trustworthy enough.
- Page likely supports at least 3 interesting facts (the best 3 are kept).
- Page is not too technical or too thin.
- Page is likely scrape-friendly.

---

# Final Checklist Before Returning CSV

Before generating CSV, confirm:

- User approved all links.
- Category name matches the source file exactly.
- Topic names match the approved topics.
- Institution names are consistent.
- URL values are final approved URLs.
- Status is `pending`.
- No CSV header row is included.

---

# Registry & Scraping Operations

*(Folded in from the former `trusted-source-workflow.md`, 2026-07-14.)*

## Golden rule: extract articles, not facts

Scrape a **whole article/page** into markdown, then draft facts from that markdown. Don't try to scrape
"facts" directly.

## Pipeline

```text
Category → Topic → Source URL → Firecrawl → Markdown file → AI drafting → Approved facts
```

## Source registry

Single source of truth: `source-registry/sources.csv`, columns:

```csv
category,topic,institution,url,status
```

`status` values: `backlog` (staged, not ready) · `pending` (ready; picked up by `scrape:batch`) ·
`complete` (scraped) · `excluded-age-rating` (the topic can't yield a fact that clears the 4+ gate in
`fact-writing-and-quality-guide.md` §9 — don't re-scrape it). Batch scripts only process `pending`.

## Scraped-file layout

```text
sources/
  space/    nasa-black-holes.md
  animals/  monterey-octopus.md
  history/  britannica-roman-empire.md
```

Each source page has a metadata sidecar:

```json
{ "category": "Space", "topic": "Black Holes", "institution": "NASA",
  "url": "https://science.nasa.gov/universe/black-holes/" }
```

## Processing in waves

1. **Wave 1 — automation-friendly** (NASA, NOAA, Smithsonian, Britannica, NIH, National Geographic) — bulk of URLs.
2. **Wave 2 — museums** (British Museum, The Met, Computer History Museum).
3. **Wave 3 — specialized orgs** (IEEE, ACS, ASME, SAE).
4. **Wave 4 — manual sources** (Library of Congress, etc.).

## Facts per source

One page → **3–5 candidates → approve the best 1–3.** Never squeeze 20 facts from one page; quality drops.

## Targets

- **Weekly:** ~20 URLs → ~20 markdown files → 60–100 approved facts.
- **Source philosophy:** trust over volume. A small library of excellent sources beats thousands of
  questionable ones.

---

# Guiding Principle

The source library is the foundation of the content system.

Optimize for:

```text
Trust > Quantity

Quality > Volume

Curiosity > Completeness

Working URLs > Fast guesses
```
