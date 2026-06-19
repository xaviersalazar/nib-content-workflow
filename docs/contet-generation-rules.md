# Today I Learned Content Generation Rules & Workflow

## Overview

This project powers the **Today I Learned** app, an iOS application built around highly engaging, bite-sized facts.

Facts are generated topic-by-topic from trusted sources (primarily Britannica and other reputable educational sites) and must feel:

- Interesting
- Surprising
- Conversation-worthy
- Easy to understand
- Readable in 30–60 seconds

The goal is not simply factual accuracy. The goal is **high-quality curiosity content** that makes users say:

> "Whoa, I didn't know that."

---

# Current Workflow

We work through categories **two topics at a time**.

Example:

Category:

- Food

Topics:

1. Chocolate
2. Honey

For each topic we:

1. Analyze the source.
2. Brainstorm candidate facts.
3. Validate each fact.
4. Keep only PASS facts.
5. Output:
   - Validation table
   - Continuous CSV block

---

# Fact Validation Rules

A fact must satisfy **all** of these:

## ✅ Source Grounded

Must come directly from the supplied source.

No unsupported claims.

---

## ✅ Standalone

Each fact should work independently.

Bad:

> Honey is sweet.

Good:

> Honey was humanity's original sweetener.

---

## ✅ Wonder Factor

The fact should feel:

- surprising
- unusual
- impressive
- weird
- memorable

Ask:

> "Would someone naturally tell another person this?"

---

## ✅ Conversation-Worthy

Should feel shareable.

Good:

> Ancient Egyptians used honey during mummification.

Bad:

> Honey contains glucose.

---

## ✅ Non-Duplicate

Avoid:

- repeating previous topics
- saying the same thing in multiple ways

---

## ✅ Strong Headlines

Headlines should:

- be catchy
- create curiosity
- avoid sounding academic

Good:

> Some Animals Sleep With Half Their Brain Awake

Bad:

> Unihemispheric Sleep in Marine Mammals

---

## ✅ 30–60 Second Body Length

Body text should be roughly:

4–6 sentences

Target:

~80–120 words

Long enough to feel substantial.

Short enough for a quick read.

---

## Body Writing Rules

The body is the most important part.

### DO

Explain:

- why the fact is interesting
- how it works
- historical context
- consequences
- comparisons

Allow the reader to learn something.

---

### DON'T

Write:

> The Sun is hot. It produces energy.

or

> Honey contains sugar.

Those are too short.

---

### Desired Style

Natural and educational.

Similar to:

- Britannica
- National Geographic
- Smithsonian
- Mental Floss

Should feel conversational, not academic.

---

# Fun Score Guidelines

Fun score alone does NOT determine PASS.

It is simply an indicator.

## 10

Amazing

"I have to tell someone this."

Examples:

- Salt is the only rock humans commonly eat.
- Some animals sleep with half their brain awake.

---

## 9

Very strong.

Memorable and surprising.

---

## 8

Interesting but less remarkable.

Acceptable if supported by source.

---

## 7 or below

Generally reject.

Unless the topic lacks stronger facts.

---

# CSV Schema

Every fact uses:

```csv
id,
categoryId,
topic,
headline,
body,
summary,
tags,
readTimeSeconds,
funScore,
featured,
relatedFactIds
```

---

# ID Rules

## STRICT

IDs follow:

```text
{topic}-{short-desc}
```

Examples:

```text
black-holes-spaghettification
honey-original-sweetener
sleep-half-brain-awake
pizza-working-class-naples
```

### Topic Portion

Lowercase.

Hyphenated.

Examples:

```text
black-holes
ice-cream
decision-making
```

---

### Description Portion

Short.

Concise.

Hyphenated.

Examples:

```text
little-worms
used-as-money
half-brain-awake
italian-flag
```

---

## IMPORTANT

Once an ID is created:

# NEVER CHANGE IT

IDs are permanent.

Changing them breaks relationships inside the app.

---

# CSV Rules

## Output ONLY PASS facts

No rejected facts.

---

## Continuous CSV

NO blank lines between rows.

Correct:

```csv
fact-1,...
fact-2,...
fact-3,...
```

Wrong:

```csv
fact-1,...

fact-2...
```

---

## Always wrap output inside:

````csv
```csv id="randomid"
...
```
````
