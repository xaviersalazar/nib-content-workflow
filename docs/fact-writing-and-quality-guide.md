# Fact Writing & Quality Guide

> The single source of truth for **writing, judging, and rewriting** individual Nib facts.
> Consolidates the former `content-generation-rules`, `manual-ai-assisted-content-workflow`, and
> `fact-rewrite-style-guide` docs (merged 2026-07-14). For the per-*category* process (structure → trim →
> weed-out) see `docs/topic-curation-and-quality-guide.md`; for the JSON/field contract see
> `docs/content-schema-reference.md`.

---

## 1. The bar

Nib is a daily-curiosity app. A fact is not "content" — it is the thing a user sees in a **push
notification** and decides whether to tap. Every fact must make an average adult think:

> "Wait… really?"

Quality beats quantity, always. A database of 2,000 genuinely surprising facts is worth more than 10,000
mediocre ones. The goal is **curiosity density**, not size. Every fact must earn its place; never add one
just to grow the count.

A fact **fails** if an average adult **already knows it**, or if it reads like a **textbook definition /
formula** with no twist. Those get rewritten (preferred) or removed — see §3.

---

## 2. Facts per topic — up to 3, quality-gated

- A topic ships the **best 1–3** facts. **3 is a ceiling, not a quota.**
- Over-generating candidates is fine (draft ~3–5), then approve only the strongest.
- **Never pad to 3** with a weak, redundant, or textbook fact. A topic of 1–2 strong facts is finished.
- If a topic can't yield even one "wait, really?" fact, **drop the topic** — don't manufacture filler.

> This rule exists because forcing "exactly 3" on abstract/technical topics is what produced flat filler
> like *"Espresso Cut Brewing Time to 30 Seconds."* The 2026-07-14 weed-out removed 259 such facts. Showing
> the same topic too often, or showing a dull fact, is worse than showing fewer, stronger ones.

---

## 3. Flatness red-flags (the anti-pattern — check every fact)

These are the four ways a fact goes flat. They were the failure modes behind every fact cut in the
2026-07-14 weed-out. If a draft matches one and you can't re-hook it to a real surprise, **cut it.**

| Red-flag | What it looks like | Example (all removed) |
| --- | --- | --- |
| **Textbook definition** | States what something *is*; could open an encyclopedia entry | *"A Blockchain Is a Distributed Ledger"* · *"Brakes Turn Motion Into Heat"* |
| **Vague / abstract** | True but says nothing concrete; no number, name, image, or twist | *"Memes Can Become Socially Powerful"* · *"Streaming Made Live Music Feel More Special"* |
| **Obvious** | An average adult already knows it | *"Yeast Is Alive"* · *"Al Dente Means 'To the Tooth'"* |
| **Incremental process** | Describes a small how-it-works improvement with no payoff | *"Espresso Cut Brewing Time to 30 Seconds"* (the exemplar) |

**These cluster in "explainer" categories** — abstract concepts (AI), how-it-works mechanisms
(engineering), and definitional/advice topics (coffee recipes, personal finance). When drafting one of
those, raise the bar and expect to keep 1–2, not 3.

**Salvage test:** before cutting, check the body for a buried gem — a vivid number, a famous story, a
named consequence — that could become the headline. If one exists, **rewrite** (see §7). If the body is
uniformly flat, **remove**.

---

## 4. Writing a fact — the three parts

Each fact is three pieces of text, each with a job. Write all three with purpose.

### `headline`
Catchy, curiosity-creating, Title Case. **Lead with the surprise, not a definition.** Punch up flat ones:
- *The Maya Were Skilled Astronomers* → **The Maya Predicted Eclipses Centuries Ahead**
- *Brain Folds Increase Processing Power* → **Your Brain Is Wrinkled to Fit More Power**

Not academic, not clickbait, never exaggerated beyond the source.

**It MUST stand alone without its topic.** The headline is the Spotlight title, the widget copy, and the
Siri snippet — surfaces that show **no topic label**. So never lean on the topic for the referent: no
anaphoric `Its` / `Their` / `His` / `She` / `It`, and no bare `The Test` / `The Color` / `The Expedition`.
Name the subject in the headline itself.
- ❌ *The American Revolution Helped Trigger It* (topic: French Revolution) → reads as nonsense in a widget
- ❌ *Its Feathers Reveal How Flight Began* → ✅ **Archaeopteryx's Lopsided Feathers Give Away How Flight Began**
- Cataphoric `This`/`That` is fine when self-contained: *This Island Used Giant Stone Coins Too Heavy to Move*.

### `summary` — a TEASER, never an echo
The `summary` **is** the push-notification body — the notification is a fixed `"Today's Fact"` title plus this
line (`NotificationService.notificationContent`; the headline is deliberately NOT used, as it truncates on one
line). It's also the copy in the small widget. The summary must **add** intrigue — a
number, a twist, a "wait" angle, or a concrete image — so the reader taps. **Never restate the headline.**
- Headline: *Gunpowder Began as a Chinese Discovery* → Summary: *"They were hunting for a potion to live
  forever. They found something explosive instead."*
- Headline: *Salt Is the Only Rock Humans Commonly Eat* → Summary: *"It's a mineral you sprinkle on dinner
  — and the only rock people eat on purpose."*

One short sentence that fits a notification line.

### `body` — the payoff
**4–5 short sentences, ~60–90 words** (aim 65–80). A ~30–60 second read.
- **Lead with, or land on, the surprising concrete detail.**
- Short, declarative sentences. Break up long multi-clause ones.
- End on a concrete, punchy point — **not** a vague aphorism (see §5).

---

## 5. Voice & readability

Write like **a curious friend explaining something cool over coffee** — warm, conversational, a little
playful. Calm, not hypey. Use contractions. In the spirit of National Geographic / Smithsonian / Mental
Floss, but simpler. Never academic.

- **Grade 6–8 reading level** (Flesch–Kincaid ~6–8). An average curious teen should get it instantly.
- **Plain words** over encyclopedic ones: "seen as" not "regarded as", "have" not "possess", "use" not
  "utilize", "about" not "approximately".
- **Cut abstract filler closers.** Delete vague life-lesson endings:
  - ❌ "Great ideas sometimes come from simple beginnings."
  - ❌ "Nature has evolved some remarkable solutions."

### Source attribution — keep it OUT of the body
The body must read as confident knowledge, not a report of what a source said. **Never name the source or
use attribution framing** in the body.
- ❌ "Britannica says the first smartphone was sold in 1993." → ✅ "The first smartphone was sold in 1993."
- ❌ "According to NASA, Voyager 1 travels a million miles a day." → ✅ "Voyager 1 travels about a million
  miles a day."
- ❌ Generic attribution — "Scientists think…", "Studies found…", "Historians estimate…". Keep genuine
  uncertainty as a plain hedge instead (*may, likely, probably, roughly*): "Uranus was probably knocked
  over by a massive early crash."

**The one exception — the org *is* the fact:** keep a proper noun when the organization is the fact's
actual **subject or actor**, not an authority being quoted — "NASA's *Apollo* missions," "IBM's *Deep
Blue* beat Kasparov," "the ancient *Olympics*." Quick test: if the sentence still states a true, specific
fact after you delete the org name, it was a citation — cut it. If deleting it breaks the fact, it's the
subject — keep it (but still drop any "says / according to" framing).

---

## 6. Validation — the pass/fail gate (no numeric score)

There is **no Fun Score** (removed 2026-07-14 — it wasn't a reliable indicator). A fact is judged by
whether it clears these tests:

- **Source-grounded** — everything is supported by the supplied source. No outside knowledge, no
  embellishment, no invented comparisons. *(Failing this is an automatic reject/review.)*
- **Standalone** — understandable with no surrounding context.
- **Curiosity** — sparks a genuine "want to know more."
- **Memory** — a user will remember it tomorrow.
- **Conversation** — someone would naturally tell another person ("Did you know black holes aren't
  actually holes?").
- **Not flat** — clears all four §3 red-flags.
- **Non-duplicate** — doesn't repeat another fact's idea (keep the stronger version).
- **Tone** — conversational, not textbook/Wikipedia.

### Classification
- **PASS** — clears every test above. Export it.
- **NEEDS_REVIEW** — salvageable (weak phrasing, academic tone, a flat headline hiding a real gem).
  Rewrite per §7; if the rewrite passes, promote to PASS.
- **REJECTED** — a §3 red-flag with no salvageable gem, duplicate, unsupported, or genuinely dull. Remove;
  do not export.

---

## 7. Rewriting an existing fact (reword / weed-out passes)

Two goals when rewriting: (1) a **headline + summary that hook in a notification**, and (2) a **body a
curious teen reads easily** — **without inventing anything.**

- **Only re-hook claims already in the fact.** Do not add new specifics, numbers, names, or comparisons
  that weren't in the original body. (If the body says "certain marine mammals," don't upgrade it to
  "dolphins and whales.") Keep every existing number, date, and proper noun exactly.
- **Elevate a buried detail** to the headline — usually a vivid number, a famous story, or a consequence
  the original left in the last sentence. (*"Biased Data Can Lead to Biased AI"* → **"Amazon Built a
  Hiring AI That Taught Itself to Reject Women"** — the Amazon example was already in the body.)
- **`id` NEVER changes** on a rewrite — other facts' `relatedFactIds` and collections point at it. Swap
  only `headline`, `body`, `summary`, `tags`. Leave `id`, `categoryId`, `topic`, `readTimeSeconds`,
  `featured`, `relatedFactIds` untouched.
- **Rewrite vs remove:** rewrite when a real gem exists in the body; remove when it's flat and unsalvageable
  *and* the topic keeps ≥1 strong fact. (Full weed-out process: `topic-curation-and-quality-guide.md`.)

---

## 8. CSV schema, fields & IDs

Columns (in order):

```csv
id,categoryId,topic,headline,body,summary,tags,readTimeSeconds,featured,relatedFactIds
```

| Field | Rules |
| --- | --- |
| `id` | `{topic}-{short-desc}`, lowercase, hyphenated (e.g. `black-holes-spaghettification`). **Permanent — NEVER change it once exported.** |
| `categoryId` | Lowercase slug matching an entry in `categories.json` (e.g. `space`). |
| `topic` | Human-readable topic name (e.g. `Black Holes`). |
| `headline` | See §4. |
| `body` | See §4/§5. ~60–90 words, grade 6–8, no filler closer. |
| `summary` | One-sentence teaser (§4). Never an echo. |
| `tags` | 3–4 lowercase, comma-separated. |
| `readTimeSeconds` | Approx read time, target 30–60. |
| `featured` | Always `false` — the app controls featuring. |
| `relatedFactIds` | May be empty at draft time; generated by the deterministic engine (`pnpm generate:related`). See `content-schema-reference.md`. |

**Formatting:** strict CSV. Quote any field containing a comma; prefer quoting all text fields. Escape
quotes as `""`. No blank lines between rows. Use plain ASCII in edit scripts (`CO2` not the subscript
form; straight quotes) — the rewrite matcher's `norm()` handles curly→straight quotes in old headlines.

---

## Guiding principle

> Never add a fact just to grow the database. Optimize for curiosity density. Every fact earns its place —
> and if it can't clear the "wait, really?" bar, it doesn't ship.
