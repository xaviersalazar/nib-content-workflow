# Manual AI-Assisted Content Workflow

## Philosophy

Quality matters more than quantity.

The goal is not to maximize the number of facts in the database. The goal is to build a database that is dense with curiosity.

A database containing 3,000 highly memorable facts is more valuable than a database containing 10,000 mediocre facts.

Every fact should make users think:

> "Wait… really?"

---

# Workflow Overview

For each source:

1. Scrape source page with Firecrawl.
2. Feed markdown into AI.
3. Generate 3–5 candidate facts.
4. Validate each fact using editorial rules.
5. Classify each fact:
   - PASS
   - NEEDS_REVIEW
   - REJECTED

6. Rewrite NEEDS_REVIEW facts.
7. Promote successful rewrites to PASS.
8. Export only PASS facts to the master CSV.

---

# Step 1: Source Selection

Use trusted sources from `sources`.

Facts must be generated only from the supplied source markdown.

No outside information should be introduced.

---

# Step 2: Generate Candidate Facts

Generate approximately 3–5 candidate facts per source.

Keep only the most interesting facts for the topic — 5 at the very most.

Some topics may produce:

- 3 excellent facts
- 4 excellent facts
- 5 excellent facts

If a topic only yields 3 truly strong facts, stop there. Quality always wins over quantity, and showing the same topic too often in the app is worse than showing fewer, stronger facts.

---

# Step 3: Fact Writing Guidelines

Facts should:

### Be conversational

Write as if explaining something interesting to a friend.

Good:

> Mars is entirely inhabited by robots.

Bad:

> Mars is currently home to several robotic exploration missions.

---

### Be standalone

Facts should make sense without surrounding context.

Users should not need previous facts to understand them.

---

### Be memorable

Facts should stick in a person's mind.

---

### Be surprising

Facts should create a sense of wonder or curiosity.

---

### Avoid academic tone

Do not write like Wikipedia.

Avoid:

- dry descriptions
- encyclopedia language
- unnecessary jargon

---

### Avoid trivia

Facts should not exist simply because they are technically true.

Examples of weak facts:

- Uranus has 28 moons.
- Saturn is the second largest planet.
- Asteroids are sometimes called minor planets.

---

### Prefer "Wait… really?" moments

Examples:

- Humans have successfully moved an asteroid.
- Mars is inhabited entirely by robots.
- Earth would continue orbiting if the Sun became a black hole of equal mass.
- Some planets wander through space alone.

---

### Write all three parts with purpose

Each fact has three pieces of text, and each has a job:

- **headline** — catchy and curiosity-creating. Lead with the surprise, not a definition.
  Punch up flat ones ("The Maya Were Skilled Astronomers" → "The Maya Predicted Eclipses
  Centuries Ahead").
- **summary** — a **teaser**, never an echo of the headline. Add a number, a twist, or a
  concrete image so the reader taps to read more. (Headline: *Gunpowder Began as a Chinese
  Discovery* → Summary: *"They were hunting for a potion to live forever. They found
  something explosive instead."*)
- **body** — the payoff, easy to read (see below).

---

### Be easy to read (teen/child-friendly)

Write so an average reader — even a curious teen or child — gets it instantly.
Target a **Flesch–Kincaid grade of ~6–8**.

- Short, declarative sentences. Break up long, multi-clause ones.
- Plain words: "seen as" not "regarded as", "have" not "possess", "use" not "utilize".
- 4–5 sentences, ~60–90 words.

---

### Don't end on a vague aphorism

Cut abstract filler closers. End on a concrete, interesting point instead.

Avoid:

- "Great ideas sometimes come from simple beginnings."
- "Nature has evolved some remarkable solutions."

---

# Step 4: Validation

Every fact must pass these tests.

---

## Source Grounded Test

Everything in the fact must be supported by the supplied source.

No outside knowledge.

No embellishment.

No unsupported comparisons.

Failing this test automatically sends the fact to:

REJECTED or NEEDS_REVIEW.

---

## Standalone Test

Can somebody understand the fact without additional context?

---

## Curiosity Test

Does the fact spark curiosity?

Would somebody want to learn more?

---

## Memory Test

Will users remember this tomorrow?

---

## Conversation Test

Would someone naturally tell another person this fact?

Examples:

> "Did you know humans have actually changed an asteroid's orbit?"

> "Did you know black holes aren't actually holes?"

---

## Boredom Test

Remove facts that are:

- obvious
- generic
- technically true but uninteresting

Examples:

Reject:

- Uranus has 28 moons.
- Saturn is the second largest planet.

---

## Duplicate Test

Avoid facts that communicate essentially the same idea.

Keep the stronger version.

---

## Tone Test

Facts should sound natural and conversational.

Avoid:

- textbook language
- Wikipedia language
- excessive scientific wording

---

# Step 5: Fun Score

Assign a score from 1–10.

### 10

Exceptional.

Highly memorable.

Strong "Wait… really?" factor.

---

### 8–9

Very strong.

Interesting and worth keeping.

---

### 6–7

Acceptable but may deserve review.

---

### 5 or below

Candidate for rejection.

Fun score supports validation.

It does not replace validation.

---

# Step 6: Classification

## PASS

Requirements:

- Source grounded
- Conversational
- Memorable
- Non-duplicate
- Fun score ≥ 7

PASS facts are exported.

---

## NEEDS_REVIEW

Fact is salvageable.

Common reasons:

- unsupported wording
- weak phrasing
- overly academic tone
- unnecessary details

Attempt a rewrite.

If the rewrite passes validation:

Promote to PASS.

---

## REJECTED

Remove permanently.

Reasons:

- boring
- duplicate
- unsupported
- too academic
- low curiosity
- fun score ≤ 5

Do not export.

---

# Step 7: CSV Export

Export only PASS facts.

Headers:

```csv
id,categoryId,topic,headline,body,summary,tags,readTimeSeconds,funScore,featured,relatedFactIds
```

---

## ID

Use the format `{topic}-{short-desc}`.

- `topic` — lowercased, hyphenated version of the topic name (e.g. `black-holes`, `dwarf-planets`)
- `short-desc` — a concise, hyphenated description unique to this fact (e.g. `spaghettification`, `spin-1000-times-per-second`)

Example:

```text
black-holes-spaghettification
```

Once an `id` is assigned and exported, never change it. Downstream references and `relatedFactIds` depend on it remaining stable.

---

## categoryId

Lowercase slug.

Example:

```text
space
```

---

## topic

Human-readable topic name.

Example:

```text
Black Holes
```

---

## headline

Title shown in the app. Catchy and curiosity-creating; lead with the surprise, not a
definition.

---

## body

Full fact. Easy to read (grade ~6–8), 4–5 short sentences, ~60–90 words. No vague
filler-closer sentence.

---

## summary

One-sentence **teaser** for the notification — adds intrigue, never just restates the
headline.

---

## tags

Comma-separated tags.

---

## readTimeSeconds

Approximate reading time.

Target:

30–60 seconds.

---

## funScore

1–10 engagement score.

Supports validation but does not replace it.

---

## featured

Always:

```text
false
```

The app controls featured facts.

---

## relatedFactIds

May be empty.

A future global pass will generate stronger relationships.

---

# CSV Formatting Rules

Use strict CSV formatting.

Quote fields that contain commas.

Prefer quoting all text fields:

- headline
- body
- summary
- tags
- relatedFactIds

Escape quotes using:

```text
""
```

Examples:

```csv
headline,body
"Black Holes Aren't Actually Holes","Despite their name, black holes aren't really holes."
```

---

# Future Passes

After accumulating hundreds or thousands of facts:

## Generate relatedFactIds

Build the curiosity graph.

---

## Remove semantic duplicates

Keep only the strongest versions.

---

## Create collections

Examples:

- Mind-Blowing Facts
- Space Is Weird
- Things Bigger Than You Think
- Hidden Oceans
- Alien Worlds
- Cosmic Collisions

---

# Guiding Principle

Never add facts simply to increase the size of the database.

Optimize for curiosity density.

Every fact should earn its place.
