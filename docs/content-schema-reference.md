# Nib Content Workflow — Nib Content Schema Reference

This document describes the three JSON content files that power the **Nib** iOS app. It is intended to give a content-generation application everything it needs to produce valid, well-structured `categories.json` and `collections.json` files, anchored to the existing facts in `facts.json`.

---

## Overview

The app ships three JSON files inside its bundle. They form the entire content database:

| File               | Role                                                                                                       |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| `facts.json`       | The **source of truth**. Every individual fact lives here.                                                 |
| `categories.json`  | Classifies facts into broad topic areas. Each fact belongs to exactly one category.                        |
| `collections.json` | Curated thematic groupings of facts that cut across categories. A fact can appear in multiple collections. |

The app reads all three files through `FactRepository`, which first checks an App Group shared-cache directory (populated by remote content delivery), then falls back to the bundled seed. **Dates are decoded as ISO-8601 strings.**

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
  ]
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
| `relatedFactIds`  | `[String]` | ✅       | Array of 2–3 other fact IDs shown as "You might also like" suggestions. All IDs must exist in `facts.json`.                                                                                         |

---

## `categories.json`

An array of `Category` objects. Categories are the top-level taxonomy. Every fact must reference a valid category `id`.

### Category object schema

```json
{
  "id": "space",
  "name": "Space",
  "icon": "sparkles",
  "description": "Explore the universe."
}
```

| Field         | Type     | Required | Notes                                                                                                                      |
| ------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `id`          | `String` | ✅       | Kebab-case unique identifier. This is the value that `facts.json` entries reference in their `categoryId` field.           |
| `name`        | `String` | ✅       | Human-readable display name shown in the Categories tab and filter pills.                                                  |
| `icon`        | `String` | ✅       | **SF Symbol name** (e.g., `"sparkles"`, `"leaf"`, `"cpu"`). Must be a valid SF Symbol available on the minimum iOS target. |
| `description` | `String` | ✅       | Short one-line descriptor shown beneath the category name in the category browser. Keep under ~60 characters.              |

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
| `addedAt`  | `String?`  | ❌       | ISO-8601 date-time string (e.g., `"2026-06-10T09:00:00Z"`). **Omit for seed/bundled collections** (field is `null`/absent for built-in content). **Include for remotely delivered collections** — the app uses this field to show a "NEW" badge and feature the collection in the hero debut slot. |

> [!NOTE]
> The `addedAt` field is the mechanism that drives the "NEW" badge in the UI. Bundled seed collections omit this field entirely so they are never treated as new content. Only remotely delivered collections should supply it.

### Existing collections

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
