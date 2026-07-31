# Nib Content Workflow — Nib Content Schema Reference

This document describes the JSON content files that power the **Nib** iOS app. It is intended to give a content-generation application everything it needs to produce valid, well-structured `categories.json` and `collections.json` files, anchored to the existing facts in `facts.json`, plus the generated `sources.json` provenance map.

---

## Overview

The app ships these JSON files inside its bundle. They form the entire content database:

| File               | Role                                                                                                       |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| `facts.json`       | The **source of truth**. Every individual fact lives here.                                                 |
| `categories.json`  | Classifies facts into broad topic areas. Each fact belongs to exactly one category.                        |
| `collections.json` | Curated thematic groupings of facts that cut across categories. A fact can appear in multiple collections. |
| `series.json`       | Curated, ordered sets of facts exploring one bounded named subject (not a theme) across categories. Hand-maintained like `collections.json` — see `series-content-guide.md`. **Fully wired into the app** (`Nib/Models/Series.swift`, `FactRepository.loadSeries()`, `FactService`, `FeaturedSeriesPicker`, `SeriesDetailView`) and **live over-the-air**: included in `cdn/build-manifest.sh`'s manifest since 2026-07-30, delivered as an optional/best-effort file (`RemoteContentConfig.optionalFiles`) — never `export-facts.ts`-generated, always hand-maintained directly. |
| `sources.json`     | **Generated** topic-level provenance. Maps `categoryId → topic → { institution, url }` for the "Source ↗" line. Built by `pnpm export:sources`; never hand-edited. |

The app reads all five of these files through `FactRepository`, which first checks an App Group shared-cache directory (populated by remote content delivery), then falls back to the bundled seed. **Dates are decoded as ISO-8601 strings.**

---

## `facts.json`

An array of `Fact` objects. **Do not modify `facts.json` directly** — the content generation application reads this file as its database and uses it to derive valid IDs for the other two files.

### Fact object schema

```json
{
  "id": "venus-day-longer-than-year",
  "headline": "A day on Venus is longer than a year on Venus.",
  "body": "Full multi-sentence explanation (2–5 sentences).",
  "summary": "One-sentence punchy version of the headline.",
  "categoryId": "space",
  "topic": "Venus",
  "tags": ["venus", "planets", "astronomy", "solar system", "rotation"],
  "readTimeSeconds": 45,
  "featured": true,
  "relatedFactIds": [
    "neutron-star-density",
    "space-is-silent",
    "eiffel-tower-grows-in-summer"
  ],
  "addedAt": "2026-08-15T09:00:00Z"
}
```

| Field             | Type       | Required | Notes                                                                                                                                                                                               |
| ----------------- | ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | `String`   | ✅       | Kebab-case unique identifier. Used as the foreign key in `categories.json` (via `categoryId`) and `collections.json` (via `factIds`). Must be globally unique across the entire `facts.json` array. |
| `headline`        | `String`   | ✅       | The attention-grabbing one-liner displayed prominently in cards and hero views.                                                                                                                     |
| `body`            | `String`   | ✅       | Full paragraph explanation, typically 3–6 sentences. Shown in the detail/expanded view.                                                                                                             |
| `summary`         | `String`   | ✅       | Shorter rephrasing of the headline used in list rows, share cards, and widgets.                                                                                                                     |
| `categoryId`      | `String`   | ✅       | Must match the `id` of an entry in `categories.json`. Exactly one category per fact.                                                                                                                |
| `topic`           | `String`   | ✅       | Freeform label for the specific subject (e.g., `"Venus"`, `"Neutron Stars"`). Used for display grouping.                                                                                            |
| `tags`            | `[String]` | ✅       | Array of lowercase search/filter tags. Typically 3–6 items.                                                                                                                                         |
| `readTimeSeconds` | `Int`      | ✅       | Estimated time to read `body`, in seconds. Typical values: 40–60.                                                                                                                                   |
| `featured`        | `Bool`     | ✅       | `true` marks the fact for potential home-screen hero display. Roughly 70–80% of facts should be `true`.                                                                                             |
| `relatedFactIds`  | `[String]` | ✅       | **Ordered** array of other fact IDs powering the "More to Discover" section. **3–8, preferred ~5.** All IDs must exist in `facts.json`; no self-references. Generated by the deterministic engine (`pnpm generate:related`) — see the `relatedFactIds` section below. |
| `addedAt`         | `String?`  | ❌       | ISO-8601 date-time string. **Omit for existing/already-published facts.** Set it on a fact **whenever the fact itself is genuinely new** — most commonly all the facts in a brand-new category, or the new-content half of a Series that also pulls in older facts. A fact does **not** inherit visibility from its category: it gates entirely on its own `addedAt`, independently of whether the category is old or new. See [Content Scheduling & the Reveal Gate](#content-scheduling--the-reveal-gate) below. |

---

## `categories.json`

An array of `Category` objects. Categories are the top-level taxonomy. Every fact must reference a valid category `id`.

### Category object schema

```json
{
  "id": "space",
  "name": "Space",
  "icon": "sparkles",
  "description": "Explore the universe.",
  "addedAt": "2026-08-15T09:00:00Z"
}
```

| Field         | Type      | Required | Notes                                                                                                                      |
| ------------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `id`          | `String`  | ✅       | Kebab-case unique identifier. This is the value that `facts.json` entries reference in their `categoryId` field.           |
| `name`        | `String`  | ✅       | Human-readable display name shown in the Categories tab and filter pills.                                                  |
| `icon`        | `String`  | ✅       | **SF Symbol name** (e.g., `"sparkles"`, `"leaf"`, `"cpu"`). Must be a valid SF Symbol available on the minimum iOS target. |
| `description` | `String`  | ✅       | Short one-line descriptor shown beneath the category name in the category browser. Keep under ~60 characters.              |
| `addedAt`     | `String?` | ❌       | ISO-8601 date-time string. **Omit for existing categories.** Set it only when publishing a brand-new category — and set the **same date** on every fact tagged to it (`facts[*].addedAt`), or the facts stay visible while the category itself waits to reveal. See [Content Scheduling & the Reveal Gate](#content-scheduling--the-reveal-gate) below. |

### Existing categories

| `id`                    | `name`                  | `icon`                          | `description`                                        |
| ----------------------- | ----------------------- | ------------------------------- | ---------------------------------------------------- |
| `ancient-civilizations` | Ancient Civilizations   | `building.columns`              | Empires, ruins, and the people who built them.       |
| `ancient-creatures`     | Ancient Creatures       | `fossil.shell`                  | Life forms that ruled long before us.                |
| `animals`               | Animals                 | `pawprint`                      | The wild, weird, and wonderful animal kingdom.       |
| `architecture`          | Architecture            | `building.2`                    | The structures that shape how we live.               |
| `artificial-intelligence` | Artificial Intelligence | `cpu.fill`                    | Machines that think, learn, and surprise us.         |
| `astronomy`             | Astronomy               | `moon.stars`                    | Stars, galaxies, and the cosmic unknown.             |
| `aviation`              | Aviation                | `airplane`                      | The science and stories of flight.                   |
| `business`              | Business                | `chart.line.uptrend.xyaxis`     | How commerce, companies, and deals work.             |
| `cars`                  | Cars                    | `car`                           | Speed, engineering, and the open road.               |
| `castles-fortresses`    | Castles & Fortresses    | `shield`                        | Stone walls with stories to tell.                    |
| `chemistry`             | Chemistry               | `flask`                         | What everything is made of — and why.                |
| `coffee`                | Coffee                  | `cup.and.saucer`                | The world's most beloved brew, explored.             |
| `colors`                | Colors                  | `paintpalette`                  | How we see, name, and feel color.                    |
| `dinosaurs`             | Dinosaurs               | `lizard`                        | Giants that walked the Earth before us.              |
| `economics`             | Economics               | `dollarsign.circle`             | How money, markets, and incentives move the world.   |
| `engineering`           | Engineering             | `gear`                          | Problem-solving built into every structure.          |
| `everyday-objects`      | Everyday Objects        | `paperclip`                     | Ordinary things with extraordinary backstories.      |
| `explorers`             | Explorers               | `map`                           | Those who dared to venture into the unknown.         |
| `famous-disasters`      | Famous Disasters        | `exclamationmark.triangle`      | Catastrophes that changed the course of history.     |
| `famous-symbols`        | Famous Symbols          | `star.circle`                   | Icons, logos, and marks that mean the world.         |
| `famous-trees-plants`   | Famous Trees & Plants   | `tree`                          | The most remarkable plants on the planet.            |
| `food`                  | Food                    | `fork.knife`                    | Flavors, origins, and the science of eating.         |
| `geography`             | Geography               | `globe.americas`                | The places and features that define our world.       |
| `history`               | History                 | `scroll`                        | The story of humanity, warts and all.                |
| `household-science`     | Household Science       | `house`                         | The physics and chemistry hiding in your home.       |
| `human-behavior`        | Human Behavior          | `person.2`                      | Why people do what they do.                          |
| `human-body`            | Human Body              | `heart.text.square`             | The strange machine you live inside.                 |
| `human-civilization`    | Human Civilization      | `person.3`                      | How societies grow, collapse, and evolve.            |
| `illusions-perceptions` | Illusions & Perceptions | `eye`                           | When your senses deceive you — beautifully.          |
| `insects`               | Insects                 | `ant`                           | Tiny creatures with outsized impact.                 |
| `internet-culture`      | Internet Culture        | `network`                       | Memes, movements, and the digital age.               |
| `inventions`            | Inventions              | `lightbulb`                     | The breakthroughs that changed everything.           |
| `languages`             | Languages               | `character.bubble`              | Words, grammar, and the diversity of speech.         |
| `literature`            | Literature              | `book`                          | Stories, authors, and the power of the written word. |
| `mathematics`           | Mathematics             | `x.squareroot`                  | Numbers that reveal the universe's hidden logic.     |
| `medicine`              | Medicine                | `cross.case`                    | Discoveries that heal, save, and astonish.           |
| `movies`                | Movies                  | `film`                          | Cinema's secrets, stunts, and wild stories.          |
| `music`                 | Music                   | `music.note`                    | Rhythms, records, and the science of sound.          |
| `mysteries`             | Mysteries               | `questionmark.circle`           | Unsolved puzzles that still haunt the curious.       |
| `myths-legends`         | Myths & Legends         | `bolt`                          | Stories too powerful to ever fully die.              |
| `ocean-life`            | Ocean Life              | `water.waves`                   | The deep, the dark, and the incredible.              |
| `physics`               | Physics                 | `atom`                          | The laws that govern all matter and energy.          |
| `pirates`               | Pirates                 | `sailboat`                      | High-seas outlaws and the myths around them.         |
| `psychology`            | Psychology              | `brain.head.profile`            | The mind's quirks, biases, and blind spots.          |
| `religion-beliefs`      | Religion & Beliefs      | `sparkle`                       | Faith, ritual, and humanity's search for meaning.    |
| `secret-codes`          | Secret Codes            | `lock.shield`                   | Ciphers, cryptography, and hidden messages.          |
| `sleep-dreams`          | Sleep & Dreams          | `moon.zzz`                      | What happens when the waking world goes dark.        |
| `space`                 | Space                   | `sparkles`                      | Explore the vast, silent universe.                   |
| `sports`                | Sports                  | `trophy`                        | Records, rivalries, and the pursuit of glory.        |
| `strange-jobs`          | Strange Jobs            | `briefcase`                     | Occupations you never knew existed.                  |
| `strange-places`        | Strange Places          | `location.magnifyingglass`      | Locations on Earth that defy all expectations.       |
| `superstitions`         | Superstitions           | `wand.and.stars`                | Luck, omens, and the fears we can't shake.           |
| `technology`            | Technology              | `cpu`                           | How innovation rewires the world around us.          |
| `video-games`           | Video Games             | `gamecontroller`                | Hidden stories from gaming's greatest hits.          |
| `weather`               | Weather                 | `cloud.sun`                     | The atmosphere's power, fury, and beauty.            |

> [!IMPORTANT]
> When generating new facts, every `categoryId` value **must** match one of the `id` values in this table (or a new category you add to `categories.json` simultaneously). A missing category will cause a decode failure.

---

## `collections.json`

An array of `Collection` objects. Collections are **curated, thematic groupings** of facts — think of them as mini-documentaries or editorial playlists. A single fact can appear in multiple collections, and a collection can span multiple categories.

### Collection object schema

```json
{
  "id": "mind-blowing",
  "title": "Mind-Blowing Facts",
  "subtitle": "Facts that create \"Wait…what?\"",
  "icon": "brain.head.profile",
  "factIds": [
    "cleopatra-closer-to-moon-landing",
    "neutron-star-density",
    "the-internet-weighs-less-than-a-strawberry",
    "trees-communicate-underground",
    "time-moves-faster-at-altitude"
  ],
  "addedAt": "2026-06-10T09:00:00Z"
}
```

| Field      | Type       | Required | Notes                                                                                                                                                                                                                                                                                              |
| ---------- | ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`       | `String`   | ✅       | Kebab-case unique identifier. Must be unique across the entire `collections.json` array.                                                                                                                                                                                                           |
| `title`    | `String`   | ✅       | Short, punchy collection name shown in the Collections tab header and hero card.                                                                                                                                                                                                                   |
| `subtitle` | `String`   | ✅       | One-line teaser sentence shown beneath the title. Sets the editorial tone.                                                                                                                                                                                                                         |
| `icon`     | `String`   | ✅       | **SF Symbol name** matching the collection's theme. Should complement (but need not match) any individual category icon.                                                                                                                                                                           |
| `factIds`  | `[String]` | ✅       | Ordered array of fact IDs. Displayed in this order within the collection. All IDs must exist in `facts.json`. Recommended: 4–8 facts per collection.                                                                                                                                               |
| `addedAt`  | `String?`  | ❌       | ISO-8601 date-time string (e.g., `"2026-06-10T09:00:00Z"`). **Omit for seed/bundled collections** (field is `null`/absent for built-in content). **Include for remotely delivered collections** — drives the "NEW" badge, the hero debut slot, **and full visibility**: a collection dated in the future is completely absent from the app, not just unbadged, until that date arrives. A collection normally references only already-existing facts, so no other file needs touching. |

> [!NOTE]
> `addedAt` is not just a badge flag — it's a visibility gate. Content dated in the future is
> completely invisible in the app (not shown anywhere, just unbadged) until the date passes, even if
> a device has already synced it. This is true for categories, collections, series, and individual
> facts alike. Bundled seed content omits this field entirely so it's never treated as new. See
> [Content Scheduling & the Reveal Gate](#content-scheduling--the-reveal-gate) below for the full
> mechanism and the publish workflow it enables.

### Existing collections

> **Seed snapshot only.** These 10 were the original bundled collections. The live `collections.json` has
> since grown (28+ as of 2026-07-14) as the monthly cadence ships two new curated packs each month — see
> `docs/content-expansion-roadmap.md`. Always read the current file for the real list.

| `id`                            | `title`                       | Fact count |
| ------------------------------- | ----------------------------- | ---------- |
| `mind-blowing`                  | Mind-Blowing Facts            | 5          |
| `space-is-terrifying`           | Space Is Terrifying           | 4          |
| `human-weirdness`               | Human Weirdness               | 4          |
| `weird-animals`                 | Weird Animals                 | 4          |
| `history-is-weird`              | History Is Weird              | 4          |
| `technology-changed-everything` | Technology Changed Everything | 4          |
| `ancient-wonders`               | Ancient Wonders               | 4          |
| `nature-is-crazy`               | Nature Is Crazy               | 4          |
| `hidden-connections`            | Hidden Connections            | 4          |
| `accidental-inventions`         | Accidental Inventions         | 4          |

---

## Content Scheduling & the Reveal Gate

`addedAt` (on `facts.json`, `categories.json`, `collections.json`, and `series.json` entries alike)
is a **visibility gate**, not just a badge flag. Content dated in the future is completely absent from
the app — not shown anywhere, just unbadged — until the date passes, even on a device that has already
synced it from the CDN. This is app-side behavior (`FeaturedCollectionPicker.isVisible(addedAt:)` in
the Nib repo); nothing in this pipeline needs to change to support it, only the dates you choose to
write.

**The one rule that trips people up: a fact does not inherit visibility from its category.** Setting
`addedAt` on a category does not hide the facts inside it — each fact needs its **own** `addedAt` if it
should stay hidden until the same date. What to set, by scenario:

| Shipping… | Container `addedAt` | New facts' `addedAt` | Facts it also reuses |
| --- | --- | --- | --- |
| A whole new category | ✅ set | ✅ same date, every fact in it | — (a new category has none) |
| A new collection | ✅ set | — (collections curate *existing* facts) | leave untouched |
| A new series | ✅ set | ✅ same date, only the newly-drafted ones | leave untouched |
| New facts folded into an *existing* category | — (category untouched) | ✅ set | leave untouched |
| Anything already live | omit / `null` | omit / `null` | n/a |

**Why this exists:** it decouples "when content is finished" from "when it should appear." Publish
whenever a batch is ready — the reveal date does the rest. If you already know the real ship date, set
`addedAt` to it now and publish; the content can sit live on the CDN for days or weeks pre-revealed
with zero risk. If you don't know the date yet (e.g. a drop tied to an app-binary release still in App
Store review), publish now with `addedAt` **omitted**, then do a **CDN-only republish** once the date
is known — same files, `addedAt` filled in, `contentVersion` bumped, no app release involved. Either
way, the pipeline's own referential-integrity checks and the app's pre-publish validation always run
against the **full** set, including anything future-dated — a broken reference in not-yet-revealed
content is still caught before a manifest is ever accepted.

**Full mechanism, code pointers, and on-device testing notes:** the Nib app repo's
[`nib-docs/content-reveal-gate.md`](../../Nib/nib-docs/content-reveal-gate.md).

---

## `sources.json` — topic-level provenance

**Generated, never hand-edited.** Produced by `pnpm export:sources` from `source-registry/sources.csv`
(joined to `categories.json` and `facts.json`). The app surfaces it as a quiet "Source: NASA ↗" line —
its _Trust First_ attribution.

A nested object keyed by `categoryId`, then by the **exact** `topic` string used on facts, so the app
looks up `sources[fact.categoryId][fact.topic]` with no normalization:

```json
{
  "space": {
    "Venus": { "institution": "NASA", "url": "https://science.nasa.gov/venus/" },
    "Mars":  { "institution": "NASA", "url": "https://science.nasa.gov/mars/" }
  },
  "chemistry": {
    "Atoms": { "institution": "Britannica", "url": "https://www.britannica.com/science/atom" }
  }
}
```

| Field         | Type     | Notes                                                                          |
| ------------- | -------- | ------------------------------------------------------------------------------ |
| `institution` | `String` | Display name shown after "Source:" (e.g. `NASA`, `Britannica`).                |
| `url`         | `String` | Canonical page, opened in-app via `SafariView`. **Must be `http(s)`** — the app drops any other scheme. Tracking query params are stripped at export. |

Rules:

- **Every fact `topic` should resolve.** Coverage is currently **100% (703/703)**. A topic with no entry
  simply shows no source line (no error), but treat a gap as a bug — add the source to
  `source-registry/sources.csv` (or a `TOPIC_ALIASES` entry in `scripts/export-sources.ts` if the fact's
  display topic just differs from the registry label) and re-run `pnpm export:sources`.
- **Attribution is topic-level, not per-fact** — every fact on a topic shares that topic's source.
- Keys mirror `facts.json`; regenerate this file whenever facts or the registry change.

---

## Referential Integrity Rules

The content generation application must enforce the following constraints:

1. **`facts[*].categoryId` → `categories[*].id`**  
   Every fact's `categoryId` must match an existing category `id`. One-to-one (a fact has exactly one category).

2. **`facts[*].relatedFactIds[*]` → `facts[*].id`**  
   Every entry in a fact's `relatedFactIds` must be another fact's `id`. Self-references are invalid.

3. **`collections[*].factIds[*]` → `facts[*].id`**  
   Every entry in a collection's `factIds` must be a valid fact `id`. Order is preserved and meaningful.

4. **IDs are globally unique within each file.** No two categories share an `id`. No two collections share an `id`. No two facts share an `id`.

---

## `relatedFactIds` — how the "knowledge graph" works

*(Folded in from the former `related-fact-ids-guide.md`, 2026-07-14.)*

`relatedFactIds` is Nib's entire knowledge graph — there is no separate graph database; the relationships
live inline on each fact. It's what turns one fact into a discovery journey (the product promise: *"Come
for one fact. Stay for five."*). The app's `MoreToDiscoverSection` resolves the IDs to facts **in array
order** (via `FactService.relatedFacts(for:)`), skipping any that don't resolve, and
`FactService.validateContent()` flags dangling references.

**How it's generated:** not hand-curated. The deterministic engine `pnpm generate:related` rebuilds the
whole column from tag + theme + text similarity, partitioned into same-topic / adjacent / cross-category
pools. **Re-run it after any batch of removals or rewrites** (a removal leaves dangling links otherwise),
then `pnpm export:facts`. It self-validates to 0 dangling / 0 self-refs.

**Authoring rules (what the engine targets, and what to preserve if hand-editing):**

- **Count:** minimum 3, **preferred 5**, maximum 8 per fact. Fewer than 3 degrades "More to Discover".
- **Order is meaningful** — strongest / most natural next-hop first (the app never re-sorts; even more so
  now that the app's old `funScore` field was removed and it relies on curated order everywhere).
- **Discovery mix**, not same-topic clones: ~40% same topic/category · ~30% adjacent topic · ~20%
  cross-category bridge · ~10% surprising-but-explainable "serendipitous jump."
- **Valid + no self-ref** — every entry must be a real fact `id`; unknown IDs are silently dropped in-app.
- **Roughly reciprocal** — if A lists B, B usually should list A.

---

## Generation Guidelines

When generating new `categories.json` and `collections.json` entries based on the existing `facts.json`:

### For `categories.json`

- Scan all `categoryId` values across `facts.json`
- For each unique `categoryId`, ensure a matching entry exists in `categories.json`
- Choose an `icon` from the SF Symbols library that visually represents the topic
- Write a `description` of ≤60 characters in an evocative, short style (e.g., `"The story of humanity."`)

### For `collections.json`

- A collection should have a unifying **editorial angle** (e.g., "things that are older than expected", "facts that break intuition")
- Pull 4–8 facts from `facts.json` that fit the angle — cross-category is encouraged
- The `subtitle` should tease the angle, not just describe the topic
- The `icon` should match the emotional tone of the collection
- Set `addedAt` only if this is a remotely delivered update batch. Leave it absent for seed collections.

---

## Decoder Configuration

The `FactRepository` decodes all three files with:

```swift
let decoder = JSONDecoder()
decoder.dateDecodingStrategy = .iso8601
```

This means:

- All date strings **must** be in full ISO-8601 format: `"2026-06-10T09:00:00Z"`
- All other types are standard JSON primitives (strings, booleans, integers, arrays)
- Unknown extra fields in the JSON are **silently ignored** by Swift's `Codable`
- Missing optional fields (like `addedAt`) default to `nil` — no explicit `null` needed
