# TIL Content Workflow

# Trusted Source Workflow

---

# Purpose

Defines how trusted sources are gathered and processed.

The goal is:

High trust.

Low effort.

High quality.

---

# Golden Rule

Extract articles.

Not facts.

---

# Workflow

```text
Category
↓
Topic
↓
Source URL
↓
Firecrawl
↓
Markdown File
↓
AI Drafting
↓
Approved Facts
```

---

# Source Registry

Single source of truth:

```text
source-registry/sources.csv
```

Columns:

```csv
category
topic
institution
url
tier
status
```

---

# Tier Definitions

## Tier 1

Primary sources.

Examples:

- NASA
- NOAA
- Smithsonian
- NIH
- Britannica
- National Geographic

Priority:

★★★★★

---

## Tier 2

Highly trusted secondary sources.

Examples:

- Harvard Business Review
- ArchDaily
- Psychology Today

Priority:

★★★★☆

---

## Tier 3

Discovery sources.

Require manual review.

Priority:

★★★☆☆

---

# Source Selection

Always process:

Tier 1

before

Tier 2

before

Tier 3

---

# Folder Structure

```text
sources/

space/
    nasa-black-holes.md

animals/
    monterey-octopus.md

history/
    britannica-roman-empire.md
```

---

# Metadata File

Example:

```json
{
  "category": "Space",
  "topic": "Black Holes",
  "institution": "NASA",
  "url": "https://science.nasa.gov/universe/black-holes/",
  "tier": 1
}
```

---

# Processing Strategy

Work in waves.

---

## Wave 1

Tier 1 + Automation Friendly

Examples:

- NASA
- NOAA
- Smithsonian
- Britannica
- NIH
- National Geographic

Goal:

200–300 URLs

---

## Wave 2

Museums

Examples:

- British Museum
- Met Museum
- Computer History Museum

---

## Wave 3

Specialized Organizations

Examples:

- IEEE
- ACS
- ASME
- SAE

---

## Wave 4

Manual Sources

Examples:

- Library of Congress

---

# Facts Per Source

Target:

```text
1 page
↓
1–3 facts
```

Avoid:

```text
1 page
↓
20 facts
```

Quality decreases.

---

# Topic Progression

Example:

```text
Black Holes

NASA
↓
2 facts

ESA
↓
2 facts

Smithsonian
↓
2 facts

Total:

6 approved facts
```

---

# Weekly Target

20 URLs

↓

20 markdown files

↓

40–60 approved facts

---

# Long-Term Goal

```text
200 URLs

↓

500 approved facts

↓

1000 approved facts
```

before building the full Content Studio.

---

# Source Philosophy

Trust is more important than volume.

A smaller library of excellent sources is better than thousands of questionable ones.
