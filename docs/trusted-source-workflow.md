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
status
```

---

# Trusted Sources

Prefer primary sources.

Examples:

- NASA
- NOAA
- Smithsonian
- NIH
- Britannica
- National Geographic

Highly trusted secondary sources are also fine:

- Harvard Business Review
- ArchDaily
- Psychology Today

Discovery sources require manual review — use them sparingly.

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
  "url": "https://science.nasa.gov/universe/black-holes/"
}
```

---

# Processing Strategy

Work in waves.

---

## Wave 1

Automation-Friendly Sources

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
3–5 candidate facts
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
3–5 candidate facts

Total:

3 approved facts max (keep only the best, most interesting)
```

---

# Weekly Target

20 URLs

↓

20 markdown files

↓

60–100 approved facts

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
