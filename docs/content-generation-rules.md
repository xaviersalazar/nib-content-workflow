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

# Facts Per Topic (Hard Cap)

Every topic ships **at most 3 facts** — the best 3, most interesting only.

- Over-generating candidates is fine (aim for ~3–5 per source), but **approve no more than 3 per topic**.
- A topic with 1 or 2 genuinely strong facts is fine — do not pad to 3 with weak or redundant facts.
- Prefer fewer, stronger, distinct facts over more, overlapping ones. Showing the same topic too often in the app is worse than showing fewer, stronger facts.

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

## ✅ Teaser Summaries (NOT an echo of the headline)

The `headline` + `summary` are what a user sees in a daily push notification.

The summary must **add** intrigue — a number, a twist, a "wait" angle, or a concrete image.

It must **never** just restate the headline.

Bad (echoes the headline):

> Headline: Salt Is the Only Rock Humans Commonly Eat
> Summary: Salt is the only rock humans commonly eat.

Good (teases, makes you tap):

> Headline: Salt Is the Only Rock Humans Commonly Eat
> Summary: It's a mineral you sprinkle on dinner — and the only rock people eat on purpose.

Keep it to one short sentence that fits a notification line.

---

## ✅ 30–60 Second Body Length

Body text should be roughly:

4–5 sentences

Target:

~60–90 words

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

### Easy to Read (teen/child-friendly)

Write so an average reader — even a curious teen or child — gets it instantly.

Target a **Flesch–Kincaid grade of ~6–8**.

- Short, declarative sentences. Break up long, multi-clause ones.
- Plain words over encyclopedic ones: "seen as" not "regarded as", "have" not "possess",
  "use" not "utilize", "about" not "approximately".
- Lead with — or land on — the surprising concrete detail.

### Cut Abstract Filler Closers

Do NOT end the body with a vague life-lesson sentence. Delete these:

- ❌ "Great ideas sometimes come from simple beginnings."
- ❌ "Nature has evolved some remarkable solutions."
- ❌ "Few foods are as unusual as the one people sprinkle on nearly every meal."

End on a concrete, interesting point instead.

### State Facts Directly — Never Cite the Source in the Body

The body must read as confident knowledge, not a report of what a source said. Do **not**
name the source or use attribution framing in the body.

- ❌ "Britannica says the first smartphone was sold in 1993."
- ❌ "According to NASA, Voyager 1 travels a million miles a day."
- ❌ "Scientists think…", "Studies found…", "Historians estimate…" (generic attribution)
- ✅ "The first smartphone was sold in 1993."
- ✅ "Voyager 1 travels about a million miles a day."

Keep genuine uncertainty as a plain hedge instead (*may, likely, probably, roughly*):
"Uranus was probably knocked over by a massive early crash."

**Exception:** keep a proper noun when the organization is the fact's actual **subject or
actor**, not an authority being quoted — e.g. "NASA's *Apollo* missions," "IBM's *Deep Blue*
beat Kasparov," "the ancient *Olympics*." Quick test: if the sentence still states a true,
specific fact after you delete the org name, it was a citation — cut it. If deleting it
breaks the fact, it's the subject — keep it (but still drop any "says/according to" framing).

> Full rationale, the July 2026 source-removal pass process, and the detect→rewrite→verify
> steps live in `docs/fact-rewrite-style-guide.md` ("Source attribution — keep it out of the body").

### Desired Style

Like a curious friend explaining something cool over coffee — warm, conversational, a
little playful. Calm, not hypey. Use contractions.

In the spirit of:

- National Geographic
- Smithsonian
- Mental Floss

…but simpler. Conversational, never academic.

> Full voice + field rules and the review-then-promote workflow live in
> `docs/fact-rewrite-style-guide.md`. Read it before generating or rewriting facts.

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
