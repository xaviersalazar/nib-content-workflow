# TIL Content Workflow

# Manual AI-Assisted Content Workflow

---

# Purpose

This document defines the manual, low-cost content workflow used to create facts for Today I Learned (TIL).

The process is intentionally:

- Human-in-the-loop
- Low cost
- Repeatable
- AI provider agnostic
- High quality

Supported AI assistants:

- Claude Web
- ChatGPT Web
- Gemini
- Future models

---

# Philosophy

AI drafts.

Humans approve.

The app ships reviewed facts only.

---

# Workflow Overview

```text
Topic
↓
Source URL
↓
Firecrawl
↓
Markdown File
↓
Claude/ChatGPT
↓
Draft Facts
↓
Validation
↓
Human Review
↓
Approved Facts
↓
Export JSON
↓
TIL App
```

---

# Step 1

## Select Topic

Example:

```text
Category:
Space

Topic:
Black Holes
```

---

# Step 2

## Select Source URL

Use the approved source registry:

```text
source-registry/sources.csv
```

Example:

```text
https://science.nasa.gov/universe/black-holes/
```

---

# Step 3

## Extract Source Material

Use Firecrawl.

Goal:

Extract article content into markdown.

Output:

```text
sources/

space/
    black-holes/
        nasa-black-holes.md
```

Only automate this step.

---

# Step 4

## Generate Draft Facts

Paste markdown into:

- Claude Web
  or
- ChatGPT Web

Goal:

Generate:

```text
1–3 fact candidates
```

Rules:

- Use only supplied source text.
- Never invent facts.
- No outside knowledge.
- 30–60 second reads.
- Conversational tone.

---

# Step 5

## Validation

Run a second AI pass.

Possible outcomes:

```text
PASS

NEEDS_REVIEW

FAIL
```

Be conservative.

---

# Step 6

## Rewrite (Optional)

Improve writing.

Never introduce new facts.

---

# Step 7

## Human Review

Ask:

### Curiosity Test

Would I tell a friend this?

### Surprise Test

Does it make me think:

"Wait… really?"

### Memory Test

Will I remember this tomorrow?

### Wikipedia Test

Does it sound too academic?

---

# Step 8

## Store Approved Facts

Save to:

```text
approved-content/approved-facts.csv
```

Statuses:

```text
DRAFTED

VALIDATED

APPROVED

REJECTED

EXPORTED
```

---

# Step 9

## Relationship Suggestions

After multiple facts exist:

Suggest:

```text
3–8 relatedFactIds
```

These power:

```text
More to Discover
```

inside the app.

---

# Step 10

## Export

Run:

```bash
pnpm export:facts
```

Generate:

```text
exports/

facts.json
categories.json
topics.json
collections.json
```

Copy into:

```text
TIL/Resources/
```

---

# Weekly Workflow

Monday:

20 URLs

↓

Firecrawl extraction

Tuesday:

Draft facts

Wednesday:

Validation

Thursday:

Relationship suggestions

Friday:

Export

---

# Scaling Philosophy

Automate:

```text
URL
↓
Markdown
```

Keep manual:

```text
Drafting
Validation
Human review
Relationship curation
```

until:

```text
500–1000 approved facts
```

---

# Editorial North Star

Every fact should feel like:

"A curious friend sharing something fascinating over coffee."

If users think:

"Wait… really?"

then the workflow is succeeding.
