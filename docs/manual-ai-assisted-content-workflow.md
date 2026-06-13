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

Quality matters more than quantity.

Curiosity—not completeness—is the product.

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
Validation + Fun Score
↓
Human Review
↓
Approved Facts
↓
CSV Generation
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

Prefer article-level pages rather than broad landing pages.

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

Facts should support:

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
- Facts that are only mildly interesting.

---

# Step 5

## Validation

Each fact receives:

- Validation status
- Fun score

Possible statuses:

```text
PASS
NEEDS_REVIEW
REJECTED
```

Fun score scale:

| Score      | Meaning                      |
| ---------- | ---------------------------- |
| 10         | "Wait… really?"              |
| 9          | Extremely fascinating        |
| 8          | Very interesting             |
| 7          | Solid curiosity              |
| 6          | Informative but needs review |
| 5 or below | Candidate for rejection      |

Validation rules:

```text
funScore 7–10
→ PASS

funScore 6
→ NEEDS_REVIEW

funScore ≤5
→ REJECTED
```

Be conservative.

Interesting facts are better than lots of facts.

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

### Boredom Test

Would I scroll past this?

If yes:

```text
REJECT
```

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

Only approved facts are exported.

---

# Step 9

## Generate CSV Rows

Each approved fact generates a row with:

```text
id
categoryId
topic
headline
body
summary
tags
readTimeSeconds
funScore
featured
relatedFactIds
```

### ID Convention

Use:

```text
<topic-slug>-<fact-slug>
```

Example:

```text
black-holes-spaghettification
venus-hotter-than-mercury
roman-empire-concrete
```

IDs should be:

- lowercase
- kebab-case
- descriptive
- stable

---

### Featured

Always:

```text
featured=false
```

The application controls which fact becomes Fact of the Day.

Content generation never sets featured facts.

---

### Tags

Use:

```text
3–6 tags
```

Example:

```text
space,gravity,physics
```

All tags should be lowercase.

---

### Read Time

Target:

```text
30–60 seconds
```

---

# Step 10

## Relationship Suggestions

Suggest:

```text
2–5 relatedFactIds
```

Relationships are stored directly inside each fact.

Example:

```json
{
  "id": "fact_123",
  "relatedFactIds": ["fact_456", "fact_789"]
}
```

These are provisional.

A larger relationship pass across the entire database will refine them later.

---

# Step 11

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

# Step 12

## Export

Run:

```bash
pnpm export:facts
```

Generate:

```text
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
7–10 candidates
```

Quality matters more than hitting the target.

Reject boring facts.

Average quality should matter more than total count.

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
