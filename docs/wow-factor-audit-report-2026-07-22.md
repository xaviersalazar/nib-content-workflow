# Nib "Wow Factor" Editorial Audit — 2026-07-22

> Advisory audit. **No changes were made to `approved-facts.csv`.** Every one of the 1,713 facts
> was read in full (headline + summary + body) and judged on two axes — underlying revelation and
> presentation — per `docs/fact-writing-and-quality-guide.md` and the audit prompt.
>
> Machine-readable per-fact results: **`approved-content/wow-factor-audit-2026-07-22.csv`**
> (columns: `id,categoryId,topic,headline,classification,reasonCodes,coreClaim,rationale,buriedGem,recommendedAction,proposedAngle,confidence`).

---

## A. Executive Summary

| Classification | Count | % |
| --- | --- | --- |
| **PASS** | 1,614 | 94.2% |
| **NEEDS_REVIEW** | 91 | 5.3% |
| **REJECTED** | 8 | 0.5% |
| **Total reviewed** | **1,713** | 100% |

**Headline finding: the library is in excellent shape.** After three prior weed-outs, the "wait,
really?" bar is met by ~94% of facts on first read. Only **8 facts (0.5%) are hard rejects**, and
just **4 are outright removals** — every one of which sits in a topic that keeps a strong sibling,
so **no topic empties from a removal.** This is not a library that needs cutting; it needs a light
editorial polish on a small, well-defined set.

**Most common weakness reason codes** (a fact may carry several):

| Code | Count | What it means here |
| --- | --- | --- |
| `KNOWN` | 63 | Over-circulated classic — mostly *kept*, flagged for a subjective human call |
| `WEAK_PAYOFF` | 59 | Promising setup, thin conclusion (the dominant real weakness) |
| `DUPLICATE_ANGLE` | 31 | Same revelation appears twice (within a topic or across categories) |
| `TEXTBOOK` | 14 | Explains what something *is* |
| `VAGUE` | 12 | Abstract, no concrete image/number/twist |
| `NICHE_ONLY` | 9 · `AGE_GATE` 8 · `OBVIOUS` 5 · `NUMBER_WITHOUT_MEANING` 5 · `SOURCE_CHECK` 4 | |

**Recommended actions:** KEEP 1,615 · HUMAN_DECISION 80 · RE-SOURCE TOPIC 9 · REWRITE 5 · REMOVE 4.

### Strongest categories (0–3% flagged)
`physics`, `chemistry`, `mathematics`, `geography`, `architecture`, `dinosaurs`, `sleep-dreams`,
`superstitions`, `insects`, `everyday-objects`, `castles-fortresses`, `colors`,
`illusions-perceptions`, `explorers`, `famous-trees-plants`, `strange-places`, `secret-codes`,
`famous-symbols`, `human-behavior`, `literature`, `economics`, `weather`, `religion-beliefs`,
`myths-legends`, `human-civilization`, `famous-disasters` — essentially all PASS. **Physics,
chemistry, and mathematics are model "explainer" categories**: they prove abstract subjects *can*
clear the bar when every fact leads with a concrete hook.

### Categories most in need of work (the "explainer" cluster, exactly as the docs predict)
| Category | Flagged | Note |
| --- | --- | --- |
| **psychology** | 7/13 (54%) | Weakest in the library — abstract, hookless explainer facts |
| **artificial-intelligence** | 6/17 (35%) | 3 of the 8 rejects live here |
| **internet-culture** | 4/12 (33%) | Recap-style "remember this?" facts |
| **food** | 6/19 (32%) | Thinnest content category (matches handoff re-source flags) |
| video-games (30%), human-body (30%), music (27%), cars (27%), technology (25%), coffee (21%) | | Mostly weak "third facts" and known-classic scale factoids |

### Cross-cutting observations (not per-fact, but worth a decision)
1. **A presentation inconsistency, not a quality one.** `astronomy`, `ocean-life`, `animals`, and
   `space` are written in a noticeably **terser style** (short bodies, thin summaries) than the rest
   of the library. Their *revelations* pass, but they read like an earlier, less-polished generation.
   Consider a stylistic normalization pass so the daily fact feels consistent voice-to-voice.
2. **`history` is a grab-bag.** Its topics repeat subjects covered more richly elsewhere (Roman roads
   → `human-civilization`; zero → `mathematics`; pirates → the `pirates` category; Magellan →
   `explorers`), producing 3 of the batch's cross-category duplicates.
3. **~15 possible duplicate angles** cluster in `cars` (3 near-duplicate safety pairs) and across
   categories (see §E).
4. **9 topics may warrant re-sourcing** (§F) — the current flagship fact is unsalvageable, but the
   subject deserves a stronger fact rather than an empty slot.

---

## B. Complete Audit CSV

`approved-content/wow-factor-audit-2026-07-22.csv` — all 1,713 facts, one row each, verified
complete (0 missing, 0 duplicate ids).

---

## C. Human-Decision Shortlist (borderline `KNOWN` — reasonable editors will disagree)

These are **kept by default** but are the over-circulated classics where the keep/remove call is
genuinely subjective. Recommendation leans **KEEP** unless you're actively thinning "fun-fact" classics.

| Fact | Why it may feel over-circulated | Why it may still earn its place | Rec |
| --- | --- | --- | --- |
| `psychology/attention-cannot-focus-everything` — invisible gorilla | One of the most-shared psych experiments ever | Still astonishes; presentation is excellent | KEEP |
| `human-body/heart-center-of-network` — blood vessels circle Earth 2.5× | Classic body scale-factoid | Concrete, vivid | Lean KEEP |
| `human-body/skeletal-system-cartilage-shock-absorber` — bone stronger than steel | Classic body factoid | Reliably surprising | Lean KEEP |
| `human-body/blood-color-changes-with-oxygen` — blood is never blue | Well-worn myth-buster | May anchor a myth-busting collection | Lean KEEP |
| `human-body/lungs-gas-exchange` — lungs cover a tennis court | Classic body factoid | Topic keeps the stronger left-lung fact | **Trim candidate** |
| `artificial-intelligence/robotics-uncanny-valley` | Heavily circulated concept | Presentation strong; only circulation is at issue | KEEP |
| `artificial-intelligence/turing-test-chinese-room` | Well-known thought experiment | Tellable; would become the sole Turing-test fact if the definitional sibling is removed | KEEP |
| `coffee/coffee-origins-discovery-mystery` — Kaldi's dancing goats | Very circulated origin legend | Charming; but weakest of 3 in its topic | **Trim candidate** |
| `coffee/coffee-roasting-dark-not-more-caffeine` | Common "taste ≠ caffeine" factoid | Duplicates the espresso fact's angle | Keep **one** of the pair |
| `psychology/sleep-babies-half-rem` | Common sleep stat | Belongs in the dedicated `sleep-dreams` category | **Consolidate** |
| `technology/search-engines-google-backrub` | Thin name-change trivia | Fun; add the "back-links = back rubs" reason if kept | HUMAN_DECISION |
| `internet-culture/viral-content-ocean-spray-doggface` | A viral-moment recap | No assumption-gap; more "remember this?" than "wait, really?" | Lean trim |
| `music/hip-hop-rappers-delight` — first hit, not first song | "Not-first-but-first-hit" framing | Weakest of the Hip-Hop topic | Lean trim |
| `food/popcorn-expands-40-times` | Soft scale figure | Topic keeps the strong "worn in hair" fact | **Trim candidate** |
| `food/potatoes-famine-dependence` | Well-known history | Topic keeps the poisonous-berries fact | Lean trim |
| `internet-culture/viral-challenges-three-types` | Known + see age note in §D | Cautionary | HUMAN_DECISION |

---

## D. Highest-Priority Rewrites (strong revelation, weak packaging — best salvage opportunities)

These have a **real gem buried in the body or an easy re-hook**; the packaging is underselling them.
No replacement copy is written yet — only the recommended angle.

1. **`video-games/tetris-game-boy-stardom`** — *"Tetris Survived Years of Lawsuits to Conquer the Game Boy"*
   - Buried gem: the body only *gestures* at "years of licensing-rights lawsuits."
   - Undersells: it skips the genuinely wild **Cold War / Soviet licensing battle** — the real story.
   - Angle: elevate the Soviet-era licensing saga (only if the source supports the specifics).

2. **`engineering/elevators-otis-safety-brake`** — *"A Safety Brake Made Passenger Elevators Possible"*
   - Buried gem: a flat "a safety brake made elevators possible" as written.
   - Undersells: the dramatic hook — **Otis cutting his own elevator's rope at the 1854 World's Fair** — isn't in the body.
   - Angle: re-source the rope-cutting demonstration (RE-SOURCE, since it's the sole Elevators fact).

3. **`artificial-intelligence/chatbots-eliza-first`** — *"The First Chatbot Ran on a Typewriter in 1966"*
   - Buried gem: currently a flat "first/oldest" note.
   - Undersells: the real hook is the **"ELIZA effect"** — people poured their hearts out to a simple pattern-matcher, believing it understood.
   - Angle: RE-SOURCE around the ELIZA effect (don't invent it into the current body).

4. **`coffee/decaf-caffeine-reused`** — *"The Caffeine Taken Out of Decaf Ends Up in Other Products"*
   - Buried gem: the payoff is blunted — the body never says *where* it goes.
   - Angle: if the source supports it, name the destination (**your decaf's caffeine may be in someone's soda / energy drink**).

5. **`medicine/antibiotics-penicillin-accident`** ⚠️ **accuracy** — *"The First Penicillin Patient Was Saved by His Own Urine"*
   - The headline says **"Saved,"** but the body correctly says the patient **died**. Headline/body contradiction.
   - Angle: fix the headline to match the body (recovered penicillin from urine to keep dosing him — but it wasn't enough). The revelation itself is strong.

6. **`ocean-life/jellyfish-long-tentacles`** ⚠️ **accuracy** — *"Some Jellyfish Trail Tentacles Longer Than a Bus"*
   - The headline claims "longer than a bus," but the body says **12–15 feet** — *shorter* than a bus.
   - Angle: either correct the headline, or re-hook the **lion's mane jellyfish (100+ ft)**, which genuinely beats a bus.

---

## ⚠️ Age-Gate Flags (4+ / Instagram surface — read the guide's §9)

Eight facts touch the age gate. **Two need action; six are educational and clear on a read**, but
since headline+summary+body all burn onto Instagram slides, they deserve a human glance.

| Fact | Concern | Recommendation |
| --- | --- | --- |
| **`pirates/pirate-codes-harsh-punishments`** (marooning) | The hook lands on the single bullet **"to use on himself"** — a suicide allusion the §9 gate bars *in any framing* | **REWRITE** to marooning-as-abandonment; strip the self-harm line. If it can't survive, remove and trim the topic to two. |
| **`inventions/light-bulb-changed-night`** | Hook is Edison **"electrocuted animals"** during the War of Currents | Human call on the 4+ Instagram surface; re-hook the AC-vs-DC rivalry without the animal cruelty if it fails. |
| `internet-culture/viral-challenges-three-types` | Describes dangerous dares (biting toxic detergent) | Human call — cautionary framing, but depicts danger. |
| `movies/film-editing-piece-by-piece` (Psycho shower scene) | Murder is context, not the hook (the point is the knife is *never shown*) | Likely fine — confirm on the slide surface. |
| `sports/olympic-games-ancient-greek-festival` | The word "naked" repeats | Likely fine (educational/historical) — confirm on slide. |
| `pirates/buccaneers-democratic-discipline`, `pirates/jolly-roger-surrender-tool`, `pirates/jolly-roger-custom-designs` | Mild violence imagery | Likely fine — framed as history/branding, not gore. |

---

## E. Removal Candidates (clearest first, grouped by reason)

**Only 4 outright removals are recommended** — all in topics that retain a strong sibling.

### Vague / abstract (no concrete image or twist)
- `artificial-intelligence/ai-hallucinations-adversarial-attacks` — "Tiny Input Changes Can Fool AI" — states the concept with no concrete example (no turtle-as-rifle, no stop-sign stickers). Topic keeps the strong lawyer fact.

### Textbook / definitional
- `artificial-intelligence/turing-test-seem-human` — the plain encyclopedia definition of the Turing test. Topic keeps the Chinese-room sibling.

### Obvious + number-without-meaning
- `technology/data-centers-small-town-electricity` — broadly assumed; vague scale figure. Topic keeps the "sank to the seabed" fact.

### Weak-payoff / known (topic keeps a stronger sibling)
- `technology/captcha-trains-ai` — the vivid version (reCAPTCHA digitized old books) isn't in the body. Topic keeps the strong checkbox fact.

### Duplicate angles (keep the stronger of each pair — merge, don't just delete)
- **cars — 3 near-duplicate safety pairs:** windshield-wipers (`snowy-trolley` + `cadillac-standard` retell the *same* Mary Anderson origin) · air-bags (`supplement-seat-belts` + `blink-deployment` are the same "tiny explosion, blink speed") · crumple-zones (`mercedes-1959` + `safety-cage`).
- **video-games:** `easter-eggs-grey-dot` merges into `easter-eggs-hidden-credit-origin` (same Robinett/Adventure Easter egg) — frees a slot for the Konami Code.
- **Cross-category:** `history/roman-empire-roads-survive` ↔ `human-civilization/roads-military-first` · `history/ancient-india-zero` ↔ `mathematics/zero-cultural-journey` · `history/golden-age-of-piracy-privateering-to-piracy` ↔ the pirates category's `privateers` facts · `literature/legends-place-person-history` (Atlantis) ↔ the `myths-legends/Atlantis` topic · `astronomy/webb-13-billion-years` ↔ `light-years-early-universe` · `ancient-civilizations/babylonians-astronomy` ↔ `maya-astronomy` (both "predicted eclipses without telescopes") · `medicine/stethoscope-symbol-of-medicine` restates the rolled-paper-tube origin already in `stethoscope-distance-invention`.

### Weak "third facts" to trim (topics that comfortably keep 2 strong facts)
Nintendo/Ultra-Hand & NES · Pac-Man/less-violent · Esports/Space-Invaders-1980 · Zelda/Breath-of-the-Wild · synthesizers/punched-tape · jazz/swing · streaming-music/Spotify-piracy · drum-machines/Rhythmicon · gliders/Lilienthal & Wright · flying-boats/first-seaplane · ejection-seats/origin · food-tasters/trained-panels · smoke-detectors/UL-standard · foley/named-after-Jack-Foley · hittites/iron-age · phoenicians/ships · ravens/five-foot-nests · salem/apology-timeline · aviation & household-science weak thirds. (All marked `HUMAN_DECISION` in the CSV — quality trims, not required.)

---

## F. Topic Health Report

**Under the proposed slate:**

- **No topic goes empty from a removal.** All 4 REMOVE candidates sit in 2-fact topics that keep a strong sibling.
- **9 topics should be re-sourced, not deleted** — the current fact is the topic's flagship, so simply cutting it would empty the topic. Give each a stronger fact:

  | Topic | Current (weak) flagship | Re-source toward |
  | --- | --- | --- |
  | `artificial-intelligence` / Artificial Intelligence | digger-wasp "what intelligence is not" | a concrete flagship AI fact |
  | `artificial-intelligence` / Chatbots | ELIZA "ran on a typewriter" | the ELIZA effect |
  | `engineering` / Elevators | Otis safety brake (dry) | the 1854 rope-cutting demo |
  | `psychology` / Memory | "memories fade to tell time" (vague) | a concrete memory fact (named case / striking number) |
  | `psychology` / Habits | "habits from one experience" (vague) | a concrete instance (named phobia/aversion) |
  | `psychology` / Motivation | "money is learned" (abstract) | a concrete motivation fact |
  | `food` / Honey | "honey for mummification" (soft; verify) | "3,000-year-old tomb honey still edible" |
  | `food` / Pizza | "Roman pizza skips tomatoes" (vague + echo) | the Margherita/queen origin |
  | `astronomy` / Nebulae | "Helix Nebula looks like an eye" (thin) | Pillars of Creation scale / a nebula thinner than a vacuum |

  (`food/Pizza`, plus `food/Cheese`, `food/Spices`, `food/Chocolate` and `history/Vikings`,
  `history/Knights` were already on the handoff's re-source list — this audit confirms Pizza and
  points at Honey too.)

- **Topics that would keep only 1–2 strong facts** (acceptable per the "up-to-3, quality-gated" rule):
  the trimmed 3-fact topics in §E drop to 2 strong facts — this is *finished*, not deficient.

---

## Recommended Approval Sequence

Work smallest-and-safest → subjective, in this order:

1. **Fix the 2 accuracy errors first (no judgment needed):** `antibiotics-penicillin-accident`
   ("Saved" → died) and `jellyfish-long-tentacles` ("longer than a bus" → 12–15 ft). Headline edits;
   `id`s stay.
2. **Resolve the 2 hard age-gate items:** rewrite `pirate-codes-harsh-punishments` to drop the
   self-harm line; make the call on `light-bulb-changed-night`.
3. **Apply the 4 removals** (turing-test-seem-human, ai-hallucinations-adversarial-attacks,
   data-centers-small-town-electricity, captcha-trains-ai) — each topic keeps a strong sibling.
4. **Merge the duplicate pairs** (cars ×3, easter-eggs grey-dot, and the cross-category pairs) —
   keep the stronger, fold the extra detail in, strip the loser.
5. **Re-source the 9 flagship-empty topics** (§F) — draft one stronger fact each; keep the `id`s
   only where you're rewriting rather than replacing.
6. **Work the 5 highest-priority rewrites** (§D) — the best return on effort.
7. **Make the subjective `KNOWN` calls** (§C) at leisure — mostly KEEP; a handful of optional trims.
8. **(Optional, larger) normalize the terse style** in astronomy/ocean-life/animals/space, and
   de-dup `history` against the more specific categories.

After you approve a slate, apply it with the standard scripts
(`docs/topic-curation-and-quality-guide.md` §5c/5d), then regenerate the graph
(`normalize:tags → assign:themes → generate:related → export:facts`) and re-run `check:age-rating`.

**No source data was changed by this audit. Awaiting your approval before any edits.**
