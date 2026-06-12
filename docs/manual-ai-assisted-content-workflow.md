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

Collections emerge naturally from the same pool of facts.

Content evolves.

Architecture remains stable.

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
Relationship Suggestions
↓
Collection Assignment
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

Use:

```text
source-registry/sources.csv
```

Example:

```text
https://science.nasa.gov/universe/black-holes/
```

The source registry contains article-level pages rather than broad landing pages.

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
- ChatGPT Web

Goal:

Generate:

```text
7–10 fact candidates
```

Because sources now contain deeper content, each topic should provide enough facts to support:

- Topic browsing
- Today's Fact
- More To Discover
- Collections

---

# Fact Rules

Facts should:

- Use only supplied source text.
- Never invent facts.
- Avoid outside knowledge.
- Be conversational.
- Take 30–60 seconds to read.
- Stand alone without additional context.
- Be memorable.
- Feel like something you'd tell a friend.

Avoid:

- Trivial facts.
- Duplicate ideas.
- Extremely technical explanations.
- Academic writing.

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

Improve readability.

Never introduce new facts.

Optimize for:

- Curiosity
- Clarity
- Memorability

---

# Step 7

## Human Review

Ask:

### Curiosity Test

Would I tell a friend this?

---

### Surprise Test

Does it make me think:

> "Wait… really?"

---

### Memory Test

Will I remember this tomorrow?

---

### Conversation Test

Would this naturally come up over coffee?

---

### Wikipedia Test

Does it sound too academic?

If yes, simplify.

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

These relationships power:

```text
More To Discover
```

inside the app.

Relationships are stored directly inside each fact.

No separate relationship files are required.

Example:

```json
{
  "id": "fact_123",

  "category": "Space",

  "topic": "Black Holes",

  "relatedFactIds": ["fact_456", "fact_789", "fact_321"]
}
```

---

# Step 10

## Collection Assignment

Collections are not sourced separately.

They emerge naturally from existing facts.

Examples:

- Mind-Blowing Facts
- Space Is Terrifying
- Human Weirdness
- Weird Animals
- History Is Weird
- Technology Changed Everything
- Ancient Wonders
- Nature Is Crazy
- Hidden Connections
- Music Evolution

A single fact may belong to multiple collections.

No additional content generation is required.

---

# Step 11

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
collections.json
```

Copy into:

```text
TIL/Resources/
```

No additional export files should be introduced unless they provide significant value.

---

# Weekly Workflow

Monday

20 URLs

↓

Firecrawl extraction

---

Tuesday

Draft facts

---

Wednesday

Validation

---

Thursday

Relationship suggestions

Collection assignment

---

Friday

Export

---

# Fact Targets

Per topic:

```text
7–10 approved facts
```

Target:

```text
350 topics
```

Produces:

```text
2,500–3,500 facts
```

Average:

```text
5 related facts per fact
```

Produces a rich enough graph to power:

- Today's Fact
- More To Discover
- Categories
- Search
- Collections

without requiring additional architecture.

---

# Scaling Philosophy

Automate:

```text
URL
↓
Markdown
```

Keep manual:

- Drafting
- Validation
- Human review
- Relationship curation
- Collection curation

until:

```text
5,000+ approved facts
```

---

# Editorial North Star

Every fact should feel like:

> A curious friend sharing something fascinating over coffee.

Users should frequently think:

> "Wait… really?"

because curiosity—not complexity—is the product.

Likewise:

Content should evolve.

Architecture should remain simple.
