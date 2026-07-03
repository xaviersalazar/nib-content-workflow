# Nib Fact Rewrite Style Guide

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
Rewrites change wording only, never the id. Don't touch `tags`, `featured`,
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
- **State the fact directly — never name or cite the source in the body.** The body must
  read as confident knowledge, not a report of what a source said. See the section below.

---

## Source attribution — keep it out of the body

The body should sound like a knowledgeable friend stating a fact, not a book report. Never
let the source's name or a hedge-verb sit in the body.

**Cut all of these (citation framing):**

- ❌ "Britannica says the first smartphone was sold in 1993."
- ❌ "According to the Cleveland Clinic, déjà vu is a false sense of familiarity."
- ❌ "NASA says Voyager 1 travels about a million miles a day."
- ❌ "The Hollywood Reporter contrasts vintage Technicolor prints…"
- ✅ "The first smartphone was sold in 1993." / "Déjà vu is a false sense of familiarity."
  / "Voyager 1 travels about a million miles a day."

This also covers **generic, unnamed attribution** — the same voice with a placeholder
authority instead of a brand name. Rewrite these to state the claim directly, keeping any
genuine uncertainty as a plain hedge (*may, likely, probably, roughly*):

- ❌ "Scientists think…" → ✅ "Researchers now believe…" is still weak; prefer "Uranus was
  probably knocked over by a massive early crash."
- ❌ "Studies found that companies which added '.com'…" → ✅ "Companies that added '.com'…"
- ❌ "Historians estimate the presses produced 20 million books." → ✅ "Within fifty years,
  European presses produced an estimated 20 million books."

### The one exception: the org **is** the fact, not the citation

Keep a proper noun when the organization is the actual **subject or actor** of the fact,
not an authority being quoted. Removing it there would break the fact or invent a vaguer one.

- ✅ Keep: "NASA's *Apollo* missions," "IBM's *Deep Blue* beat Kasparov," "the ancient
  *Olympics*," "*Martin-Baker's* ejection seats have saved 7,700 aircrew," "Tim Berners-Lee
  invented the Web at *CERN*," "the *Smithsonian* preserves the first scanned barcode."
- ❌ Remove: any "*Org* says / explains / defines / notes / found / according to *Org*."

Quick test: if the sentence still states a true, specific fact after you delete the org
name, it was a **citation** — delete it. If deleting the name leaves "someone did a thing"
or forces you to make something up, it was the **subject** — keep it, but still drop any
"says/notes/according to" framing around it.

### Process used in the July 2026 source-removal pass (582 facts)

1. **Detect.** Scan every `body` for (a) any institution name from
   `source-registry/sources.csv` immediately followed by an attribution verb
   (`says, explains, defines, notes, describes, identifies, according to, …`), and
   (b) generic attribution (`scientists/researchers/historians/studies … say/found/think/
   estimate/have`). Case-sensitive-match the few source names that are also common English
   words (*History, TIME, Fisheries, Travelers*) to avoid false hits.
2. **Rewrite `body` only.** Never touch `id`, `headline`, `summary`, `tags`, `themes`,
   `categoryId`, `topic`, `featured`, or `readTimeSeconds`. Apply edits with a Python script
   keyed by `id` (read/write with the `csv` module to preserve quoting).
3. **Keep it source-grounded.** Only reword claims already in the fact — no new numbers,
   names, or specifics. Preserve every existing number, date, and proper noun exactly.
4. **Verify.** Re-scan **all** bodies (not just the ones you changed): the count of
   name-citations and generic-attributions must reach **0**. Confirm same id set, same row
   count, only `body` changed, no summary equal to its headline, and the grade distribution
   did not regress (the removal usually *lowers* grade, since "Org says" framing is dropped).
5. Keep bodies to 4–5 sentences with **no single sentence over ~28 words** — split run-ons
   created while unwinding a citation clause.

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
- `docs/content-generation-rules.md` — fact validation rules + the **3 facts per topic**
  cap (the best 3, most interesting facts only).
- `docs/manual-ai-assisted-content-workflow.md` — drafting/validation workflow.
- `prompts/draft-facts.md` — the drafting prompt.
