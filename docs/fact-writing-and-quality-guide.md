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

### Content types — how settled is the claim?
Every entry carries a `contentType` (CSV column, default `fact`). The type says **how settled the claim
is**; the category says what it is about.

**The principle: every Nib card is a true statement.** A card never presents a legend, theory or hoax *as
true*. It states verifiable things *about* it — that it exists, where and when it was first recorded, what the
evidence is, and what the verdict is. "Legend says X" is a true statement if the record shows the legend says
X; "a ghost haunts the house" is not. Nib's identity is short, intriguing, *backed* facts — these types widen
what we write about, not what we are willing to assert.

| `contentType` | Use when | What the entry states | Evidence anchor it needs |
| --- | --- | --- | --- |
| `fact` | Empirically verified or documented. Default. | The claim itself. | The source. |
| `hoax` | A deliberate deception that was exposed or confessed. | The deception *and* its exposure. | The exposure: confession, trial record, expert test, investigation. |
| `legend` | Folklore, urban legend, ghost story, curse. | The **documented origin** of the story — who first recorded it, when, and what is known about it. **Never the plot as the point.** | A dated document (book, newspaper, recording) and what the evidence says about the claim. |
| `theory` | A named explanation that is proposed but unproven or contested. | Who proposed it, on what evidence, and the main objection. | The evidence for *and* against. |
| `mystery` | An open question with no accepted answer. | What is known, what is not, and (optionally) leading explanations. | The documented facts of the case. |
| `possibility` | A scientific "may/might" — plausible but unconfirmed. | What was observed and what scientists suspect. | The observation or measurement. |

**The evidence-anchor rule (every non-`fact` entry).** Each entry must contain:
1. **An anchor** — a verifiable, named piece of evidence from the source: a dated document, a trial record, a
   confession, a test result, an expedition finding, a body count. If you cannot point to the anchor in the
   source text, the entry is **rejected** — do not draft around it.
2. **A status in plain words** — *debunked*, *unproven*, *contested*, *no evidence*, *the record shows…* — so a
   reader who sees only the notification (headline + summary) still knows it is not settled.

**Reject** an entry that is mainly a retelling of the story (plot beats, "the ghost then did…"), a bare
anecdote or testimonial with no evidence and no verdict, or a claim whose only support is the claimant. A
believer's or investigator's account can appear only as *the thing being evaluated*, never as the fact.

**Hedging stays mandatory** for every non-`fact` type (`hoax` excepted — a debunked hoax is a settled fact
about a deception): headline, summary **and** body must each avoid asserting the claim as true ("legend says",
"may", "appears", "no evidence that…"). The test: could a reader come away believing the claim is true? If so,
rewrite.

**The app shows these as `Today's Fact`** like any other card; only the type badge differs. That is deliberate:
the card is a true statement about the claim, so the masthead never needs to say "Legend".

All other quality rules (§3 flatness, source-grounding, standalone, "wow") apply to every type. Pick the
**most specific** type; if you can't decide between `theory` and `possibility`, use `theory` for a named
human-proposed explanation and `possibility` for a physical/scientific "may".

### Verifiable fact, not an expert's opinion or theory
This rule governs `contentType: fact`. A fact must state something **empirically verifiable** — not an opinion, argument, model, worldview, or
theory attributed to a subject-matter expert. This is about **substance**, not phrasing: the attribution
rule above stops you *writing* "Schumpeter argued…"; this rule stops the underlying **claim itself** from
being one person's interpretation dressed as fact. An opinion-as-fact can have a great "wait, really?"
hook and still fail — the hook is not the test.

**The test:** strip any attribution and ask — is what remains an empirically verifiable fact, or is it
inherently contestable (a matter of opinion, interpretation, or theory a reasonable person could reject)?

- ❌ *Capitalism Grows by Destroying Itself* — Schumpeter's "creative destruction" **theory**. (Removed 2026-07-28.)
- ❌ *Your Dinner Depends on the Baker's Self-Interest, Not Kindness* — Adam Smith's "invisible hand" **argument**.
- ❌ *Even If You're Better at Everything, You Should Still Specialize* — an economic **model** (comparative advantage), stated as fact.
- ✅ *Ancient Egyptian Embalmers Threw the Brain Away* — a **documented belief/practice**; the fact is the belief itself.
- ✅ *He Left Blanks in the Table for Elements Nobody Had Found* — Mendeleev's predictions were later **confirmed**.

**Theories as their own type:** an interesting contested idea no longer has to be cut — if the entry is
about the idea *and its status* (who proposed it, what's contested), publish it as `theory`, `possibility`
or `mystery` with the hedging above. Economics/philosophy "principles" that are just one school's
argument still usually fail the "wow" bar, so don't relabel dull theory to save it.

**When a theory or named idea IS allowed inside a `fact`:** only when the fact is about a **verifiable event or a confirmed
result**, not the idea's truth — *who* proposed it, *when*, and *what verifiably happened* (a genuine
scientific debate honestly labeled as unsettled; an origin theory hedged with "may"/"one theory"; a
prediction that was later proven). Economics, philosophy, and psychology topics are the highest-risk
categories — an interesting-sounding "principle" there is often a contested theory, not a fact.

---

## 6. Validation — the pass/fail gate (no numeric score)

There is **no Fun Score** (removed 2026-07-14 — it wasn't a reliable indicator). A fact is judged by
whether it clears these tests:

- **Source-grounded** — everything is supported by the supplied source. No outside knowledge, no
  embellishment, no invented comparisons. *(Failing this is an automatic reject/review.)*
- **Verifiable, not opinion** — a `fact` states something empirically verifiable, not an opinion,
  argument, model, or theory presented as fact. Anything else is labeled with the right `contentType`,
  carries an evidence anchor and status, and is hedged in headline, summary and body (see §5). *(An unlabeled
  theory/legend, one with no evidence anchor, or one that asserts the claim as true is an automatic reject,
  even if the hook is excellent.)*
- **Standalone** — understandable with no surrounding context.
- **Curiosity** — sparks a genuine "want to know more."
- **Memory** — a user will remember it tomorrow.
- **Conversation** — someone would naturally tell another person ("Did you know black holes aren't
  actually holes?").
- **Not flat** — clears all four §3 red-flags.
- **13+ appropriate** — stays inside the §9 envelope and clears the hard floor. *(Crossing the floor is
  an automatic reject, even if the fact is otherwise excellent.)*
- **Non-duplicate** — doesn't repeat another fact's idea (keep the stronger version).
- **Tone** — conversational, not textbook/Wikipedia.

### Classification
- **PASS** — clears every test above. Export it.
- **NEEDS_REVIEW** — salvageable (weak phrasing, academic tone, a flat headline hiding a real gem).
  Rewrite per §7; if the rewrite passes, promote to PASS.
- **REJECTED** — a §3 red-flag with no salvageable gem, an opinion/theory presented as fact (§5) that
  can't be re-anchored on a verifiable event, a duplicate, unsupported, or genuinely dull. Remove; do not
  export.

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

Columns (in order — this is the live header, keep it in sync if the CSV changes):

```csv
id,categoryId,topic,headline,body,summary,tags,readTimeSeconds,featured,relatedFactIds,themes,socialHook,contentType
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
| `themes` | May be empty at draft time; generated by `pnpm assign:themes`. See `content-schema-reference.md`. |
| `socialHook` | **Required for every fact.** A separate Instagram-only headline that opens a curiosity gap `headline` doesn't need to (the in-app reader already opened the card). Write it at drafting time — see `prompts/draft-facts.md` and the method in `docs/social-hook-rewrite-handoff.md`: pick a formula from nib-social's growth-strategy doc §9, never introduce a claim not already in this fact's own `body`/`summary`. `pnpm export:facts` hard-fails on a blank cell. |
| `contentType` | One of `fact`, `legend`, `hoax`, `theory`, `mystery`, `possibility` (§5). Blank = `fact`; any other value fails the export. |

**Formatting:** strict CSV. Quote any field containing a comma; prefer quoting all text fields. Escape
quotes as `""`. No blank lines between rows. Use plain ASCII in edit scripts (`CO2` not the subscript
form; straight quotes) — the rewrite matcher's `norm()` handles curly→straight quotes in old headlines.

---

## 9. Audience — the 13+ envelope and hard floor

Nib ships with a **13+ (teen) App Store rating**, and every fact is also a candidate for an **Instagram
carousel** via `nib-social` (which burns `headline`, `summary`, *and* `body` into slide images). The rating
itself is the content boundary: there is no in-app age filter, maturity flag, or separate mature file.
Content is written for a curious teen — "grittier, but not too dark" — and must still clear Instagram's
own moderation, which applies independently of Apple's rating.

**The test:** *would this be fine told by a good museum guide or documentary to a room of 13-year-olds?*

> The 13+ rating is set in App Store Connect separately from this pipeline and is assumed in place.

### Hard floor — never ships, at any rating

| Never ship | Why |
| --- | --- |
| **Suicide or self-harm** — in any framing, including debunked myths and animal behavior | Disqualifying by word alone (killed the lemming fact even though its point was that it never happened). |
| **Sexual content, sexual slang, or mating as the subject** | Flagged by Apple and Instagram alike. |
| **Graphic torture, mutilation, dismemberment, cannibalism, gore** | Includes folklore and fairy-tale variants. Where the surprise *is* the gore, there is no rewrite. |
| **Recreational drugs, alcohol, or tobacco framed positively or as trivia** | Incidental historical mention is fine. |

Apple's App Review rules (§1.1 and related) apply at every rating on top of this — e.g. realistic
depictions of people being killed or tortured, or content that encourages self-harm.

### The 13+ envelope — allowed when told factually

Crime and murder history, executions **as history**, forensics, wartime and atrocity **as history**,
corpses and death in a scientific or historical frame, and horror-flavoured folklore (hauntings, curses,
cryptids, ghost stories) are in scope. Keep to this tone rule:

- **Factual, not lurid.** Tell what happened and why it matters; no method-level detail (how a killing or
  execution was physically carried out), no close-up gore.
- **No glorifying perpetrators, no gloating over victims.** The angle is the story, the science, the
  irony, or the system — not the cruelty.
- **No instructions.** Nothing that reads as a how-to for violence, drugs, or self-harm.
- **Legends and theories stay hedged and labeled** (§5) — never present a murder theory or a curse as
  established.
- **Mind Instagram.** A fact can be right for the app and still too edgy for a carousel; that is handled
  by skipping it when posting, not by a flag.

Rewrite-instead still applies to incidental grit that adds nothing (Captain Kidd: keep the
pirate-hunter-turned-pirate irony, drop the gibbeting). Don't over-sanitize either: death as a neutral
scientific or historical event, educational 20th-century history told from a resistance or cultural angle,
incidental period detail, and predation/animal biology all remain fine, as before.

### Screening

`pnpm check:age-rating` is a **regex prefilter with a high false-positive rate**. It **BLOCKs** only the
hard floor (self-harm, sexual, graphic torture/gore); murder, execution-history, corpse, substance,
atrocity and mass-casualty terms are **WARN**s. `pnpm publish:cdn` hard-fails on any BLOCK. Run it with
`--warn` and **read every hit against the tone rule above**, exactly as with the §3 flatness pass. (The
script keeps its old name; it now screens the 13+ floor.)

---

## Guiding principle

> Never add a fact just to grow the database. Optimize for curiosity density. Every fact earns its place —
> and if it can't clear the "wait, really?" bar, it doesn't ship.
