# TIL Fact Rewrite Style Guide

How to rewrite `approved-facts.csv` facts so they (1) hook a reader in a notification and
(2) read at a teen/child-friendly level — **without inventing anything**. This captures the
voice and rules used in the June 2026 full rewrite pass. Use it for new facts and future reword passes.

---

## The two goals

1. **Hook strength** — the `headline` + `summary` are what a user sees in a daily push
   notification. They must make someone think *"wait, really?"* and tap to read more.
2. **Body readability** — the `body` should be easy for an average reader, including a
   curious teen or child. Target **Flesch–Kincaid grade ~6–8**.

Both matter. A great hook with a dense body fails; a simple body with a flat hook fails.

---

## The non-negotiable rule: stay source-grounded

The whole pipeline depends on facts being validated against the source. When rewriting:

- **Only simplify and re-hook claims that are already in the fact.** Do not add new
  specifics, numbers, names, or comparisons that weren't in the original body.
- Example: if the body says "certain marine mammals," do **not** rewrite it to "dolphins
  and whales" — that's a new specific. Keep it as "some sea animals / marine mammals."
- Keep every existing number, date, and proper noun exactly (e.g. `455 million years`,
  `1492`, `Tenochtitlán`, `Theobroma cacao`).
- Rewriting for clarity is fine. Embellishing for drama is not.

---

## Field rules

### `id` — NEVER change it
IDs are permanent (`{topic}-{short-desc}`). The app and `relatedFactIds` depend on them.
Rewrites change wording only, never the id. Don't touch `tags`, `funScore`, `featured`,
`readTimeSeconds`, `categoryId`, or `topic` either.

### `headline`
- Headlines are **not** ids, so they're safe to change.
- **Keep** headlines that already create curiosity ("Some Animals Sleep With Half Their
  Brain Awake", "Sharks Don't Have Bones"). Most are fine — only ~2% needed changing.
- **Punch up** flat/definitional headlines. Lead with the surprise.
  - `Brain Folds Increase Processing Power` → `Your Brain Is Wrinkled to Fit More Power`
  - `The Maya Were Skilled Astronomers` → `The Maya Predicted Eclipses Centuries Ahead`
  - `Stars Help Build Future Worlds` → `The Atoms in Your Body Were Made Inside Stars`
- Don't sound academic. Don't use clickbait. Don't exaggerate beyond the source.

### `summary` — make it a TEASER, never an echo
- The original facts almost all had a summary that **restated the headline verbatim** —
  this wastes the second line of a notification. **Never do this.**
- A good summary *adds* intrigue: a number, a twist, a "wait" angle, or a concrete image.
  - Headline: *Salt Is the Only Rock Humans Commonly Eat*
    Summary: *"It's a mineral you sprinkle on dinner — and the only rock people eat on purpose."*
  - Headline: *Gunpowder Began as a Chinese Discovery*
    Summary: *"They were hunting for a potion to live forever. They found something explosive instead."*
- One sentence, short enough for a notification line.

### `body` — plain language, ~grade 6–8
- **4–5 short sentences, ~55–85 words.** (Schema target is still a 30–60 second read.)
- **Short, declarative sentences.** Break up long multi-clause sentences.
- **Plain words.** Swap encyclopedic vocabulary for everyday equivalents:
  - "regarded as / possess / obtain / consequential / utilize" → "seen as / have / get /
    important / use"
  - "approximately 4.6 billion years ago" → "about 4.6 billion years ago"
- **Lead with or land the surprise.** Put the most interesting concrete detail up front or
  as the payoff.
- **Cut abstract filler closers.** The original bodies often ended with a vague aphorism —
  delete these:
  - ❌ "Great ideas sometimes come from simple beginnings."
  - ❌ "Nature has evolved some remarkable solutions."
  - ❌ "Few foods are as unusual as the one people sprinkle on nearly every meal."
- **Use concrete anchors that are already implied**, not new facts: "like a strand of
  spaghetti," "about as tall as a two-story building," "faster than a person can sprint."
- Spell out or simplify jargon the first time (e.g. "the event horizon — the edge").

---

## Voice

Write like **a curious friend explaining something cool over coffee** — warm,
conversational, a little playful. Calm, not hypey. Models: Mental Floss, National
Geographic, Smithsonian, but simpler. Contractions are good ("it's," "they're," "don't").

---

## Readability reality check by category

After the pass, median body grade dropped from **~10.8 → ~7.5**. Some categories naturally
run higher because of unavoidable vocabulary — that's OK as long as the *sentences* are simple:

- **Easiest (~6.5–7.5):** Space, Astronomy, Animals, Ocean Life, Human Body, Food
- **Runs higher (~8–9):** History, Ancient Civilizations, Psychology — proper nouns
  (*Constantinople*, *Peloponnesian*) and abstract concepts (*neurotransmitter*) inflate the
  score even when the writing is plain. Don't dumb down the names; just keep sentences short.

Quick way to score bodies (Flesch–Kincaid grade) with Python's stdlib — count vowel-group
syllables, then `0.39*(words/sentences) + 11.8*(syllables/words) − 15.59`. Flag anything
with a sentence over ~25 words or a grade over ~9 for a second look.

---

## Workflow (review-then-promote)

This is the safe process used for both the trim and the reword:

1. **Work into a candidate file**, never the live one:
   `cp approved-facts.csv approved-facts.reworded.csv` and patch the candidate.
2. **Go one category at a time** (`categoryId`). Note: Black Holes is under `astronomy`,
   Moons is under `space` — group by the actual `categoryId`, not by intuition.
3. Apply edits with a Python script keyed by `id` (set new `summary`/`body`, and `headline`
   only when changing it). Re-read with `csv` to preserve quoting/commas.
4. **Emit a before→after review doc per category** so a human can scan the changes.
5. **Verify integrity**: same id set, same row count, only `headline`/`summary`/`body`
   changed, no summary equals its headline, grade distribution improved.
6. **Promote**: back up first (`cp -p approved-facts.csv approved-facts.csv.bak`), then
   `cp approved-facts.reworded.csv approved-facts.csv`.
7. Re-run `pnpm export:facts` to regenerate the JSON.
8. Clean up candidate + review docs once promoted.

> ⚠️ Backup note: promoting reuses `approved-facts.csv.bak`, so each promote overwrites the
> previous backup. If you need to keep an older snapshot (e.g. the pre-trim 964-fact set),
> copy it to a uniquely named file or rely on git history before promoting again.

---

## Related docs
- `docs/contet-generation-rules.md` — fact validation rules + the **3–5 facts per topic**
  cap (most interesting facts only).
- `docs/manual-ai-assisted-content-workflow.md` — drafting/validation workflow.
- `prompts/draft-facts.md` — the drafting prompt.
