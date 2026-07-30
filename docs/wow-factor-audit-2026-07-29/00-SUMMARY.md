# Nib Fact Database "Wow Factor" Audit — Database Summary

**Date:** 2026-07-29
**Scope:** Full `approved-content/approved-facts.csv` as of this date (1,704 facts, 56 categories), audited
against the client-supplied "Wow Factor" Audit rubric (see the source PDF for the full standard).
**Method:** Split into 8 balanced batches (~213 facts / 7 categories each), each independently scored by a
reviewer applying the identical rubric — every fact rated 1–5 on Wow Appeal, Hook Strength, Body Payoff,
Broad Audience Appeal, Writing & Presentation, and Memorability, then classified PASS / REVISE / BORDERLINE
/ REJECT. Parsed and cross-checked programmatically against the source CSV: **100% coverage, zero
duplicates, zero omissions** (1,704 facts in, 1,704 scored rows out).

Full per-fact tables and detailed reports for every non-PASS fact live in `batch-reports/batch01.md`
through `batch08.md`. The full scored table (all 1,704 rows) is in `master-table.csv`. The complete list of
106 REJECT facts is in `immediate-removals-reject-list.md`.

---

## Database Audit Summary

| Classification | Count | % of database |
|---|---|---|
| **PASS** | 1,110 | 65.1% |
| **REVISE** | 153 | 9.0% |
| **BORDERLINE** | 335 | 19.7% |
| **REJECT** | 106 | 6.2% |
| **Total not meeting full quality bar** (REVISE+BORDERLINE+REJECT) | **594** | **34.9%** |

**Roughly one in three facts in the current database does not clear the bar this rubric sets.** Note this
rubric is deliberately stricter and more audience-focused than the database's original "wow" quality gate
— a large BORDERLINE bucket (19.7%) is expected and intentional per the rubric's own instruction to "use
BORDERLINE aggressively." It does not mean a third of the database is bad; it means a third doesn't yet
hit the standard set by the database's own best facts (see Strongest Facts Benchmark below).

### Strongest categories (by PASS rate)
| Category | Pass rate | Facts |
|---|---|---|
| sleep-dreams | 92.3% | 26 |
| human-civilization | 90.0% | 30 |
| illusions-perceptions | 90.0% | 30 |
| famous-disasters | 88.9% | 27 |
| architecture | 88.9% | 45 |
| survival-body-limits | 88.0% | 25 |
| dinosaurs | 86.7% | 30 |
| explorers | 83.3% | 30 |
| famous-trees-plants | 83.3% | 30 |
| ocean-life | 79.4% | 34 |

### Weakest categories (by PASS rate)
| Category | Pass rate | Facts | Why |
|---|---|---|---|
| history | 27.3% | 44 | Dominated by political/administrative/legal framing (governance, IP law, court procedure) that requires background context and reads academic |
| food | 27.8% | 18 | Several facts are informational rather than surprising; one somber (famine) topic with a flat, uncomfortable hook |
| cars | 30.4% | 23 | Engineering-spec and industrial-adoption history — dry mechanism explainers, several redundant "first X" facts |
| castles-fortresses | 34.5% | 29 | Nearly the whole category reads as procedural military engineering ("how sieges worked") rather than individual surprising facts |
| ancient-civilizations | 35.1% | 37 | Repeats a "skilled ancient astronomers / advanced ancient engineers" template across multiple civilizations; several political/administrative topics |
| internet-culture | 36.4% | 11 | Mostly tech-nostalgia footnotes and etymology trivia with thin emotional payoff |
| superstitions | 38.5% | 26 | Mild cultural-variance trivia rather than genuine "wait, really?" moments; heavy redundancy within superstition pairs |
| movies | 42.1% | 19 | Institutional/corporate film history (studio deals, format specs) skews adult and dry |
| music | 42.9% | 21 | Equipment-history and corporate/business-history facts (synthesizers, drum machines, streaming) read as trade trivia |
| astronomy | 45.2% | 31 | Jargon-heavy (CMB, dark energy) and several facts built around a bare statistic with no visual comparison |

### Most common failure patterns (keyword analysis of all 594 flagged facts' "Primary Issue")
1. **Dry / academic / administrative framing** — 70 facts. The single biggest failure mode: facts about
   governance, bureaucracy, legal/court procedure, or "how X system worked" that read like a textbook
   section rather than a surprise.
2. **Redundant / duplicate** — 56 facts. Topics that already have a stronger sibling fact making the same
   point (e.g., 3 banana facts, 3 Mongol Empire facts, 3 Salem witch trial facts, 3 white-dwarf "universe
   too young" facts). See Repetitive Pattern Audit below.
3. **Adult / economic / political / financial context required** — 41 facts. The exact pattern you first
   flagged in economics — concentrated there, but also present in history, movies, and music (corporate
   and legal history).
4. **Textbook definition** — 19 facts. States what something *is* rather than a surprise about it.
5. **Requires prior knowledge / niche** — 19 facts. Assumes the reader already knows a name, event, or
   system the hook depends on (e.g., "requires Columbus/Vespucci background," "assumes reader knows who
   Hammurabi is").
6. **Common knowledge / obvious** — 16 facts. An average adult (or in several cases, an average teenager)
   already knows this.
7. Smaller patterns: vague/dry hooks (11), a bare statistic with no visual anchor (8), chronological/
   biographical structure instead of a surprise-first structure (7).

### Categories that appear oversaturated (same idea told multiple times)
- **history**: Mongol Empire cluster (3 facts, same "vast empire" idea), Salem witch trials cluster (3
  facts, all REJECT), Titanic cluster, golden-age-of-piracy cluster
- **food**: the 3-fact banana cluster (clones / giant herb / Gros Michel disease) — all landed
  REVISE/BORDERLINE, none is a clear standout
- **castles-fortresses**: moat, hillfort, and siege-tower sub-clusters each contain 2–3 near-identical
  "here's how this defensive feature worked" facts
- **ancient-civilizations**: the "ancient civilization X had surprisingly advanced astronomy/engineering"
  template repeats across Maya, Babylonians, and Indus facts
- **movies**: IMAX cluster (2 facts, same technical-spec angle)
- **astronomy**: white-dwarf "universe is too young for X to exist yet" mechanism is reused from the
  stars-live-trillions-years fact; 3 CMB (cosmic microwave background) facts overlap heavily
- **animals / ocean-life** (per batch02): platypus, chameleon, and giant-squid topics each have a "weakest
  of three" sibling that adds nothing
- **mysteries / secret-codes** (per batch08): the Antikythera Mechanism is covered redundantly across both
  categories

*Caveat: each batch could only check redundancy within its own ~213-fact slice (7 categories). A true
whole-database redundancy pass — checking whether, say, an astronomy fact and a physics fact make the same
point — hasn't been done and would need a dedicated cross-batch pass if you want it.*

### Categories relying too heavily on adult/technical/economic/historical context
In order of severity: **history** (worst — political, legal, and administrative framing throughout),
**castles-fortresses** (entirely procedural military engineering), **ancient-civilizations** (governance/
administrative topics), **cars** (industrial-adoption and engineering-spec history), **movies** and
**music** (corporate/business and equipment history), **astronomy** (physics jargon: dark energy, CMB),
and — as already identified and partly corrected — **economics** and **business**.

### Overall assessment: does the database consistently deliver the "wait, really?" experience?
**Not consistently — but the strong majority of it does, and the database's best facts are genuinely
excellent.** 65% PASS outright, and the categories built around concrete objects, animals, places, and
individual human stories (sleep-dreams, illusions, disasters, architecture, survival, dinosaurs, explorers)
are performing at 80–92% — proof the format works. The failure is concentrated and identifiable: it's not
random noise, it's specific categories built on institutional/political/administrative subject matter
(history above all) plus a scattering of redundant sibling facts everywhere else. Fixing the ~10 weakest
categories and clearing the redundancy clusters would likely push the database's overall PASS rate well
past 80%.

---

## Strongest Facts Benchmark

The 20 strongest facts across the whole database — the standard the rest should be held to:

1. **ancient-egypt-3000-years** — *"Cleopatra Lived Closer to the Moon Landing Than to the Great Pyramid"* — a mind-bending timeline comparison that instantly recontextualizes something readers think they already understand.
2. **currency-can-be-unusual** — *"This Island Used Giant Stone Coins Too Heavy to Move"* — a genuinely unbelievable, universally visual image that needs zero prior knowledge.
3. **golf-scotland-real-golf** — *"There Are Golf Balls Sitting on the Moon"* — instantly vivid and absurd, works for every age.
4. **gravity-weak-universe-shaping** — *"A Fridge Magnet Beats the Entire Planet's Gravity"* — an everyday object overturns an intuitive assumption about the universe's "strongest" force.
5. **mri-soft-tissue-detail** — *"A Dead Salmon 'Lit Up' in a Brain Scanner"* — funny, famous, scientifically important, and instantly shareable.
6. **sampling-citizen-dj-free** — *"A 6-Second Drum Loop Built Entire Music Genres"* — massive scale of influence collides with a gut-punch injustice; vivid and emotionally resonant.
7. **dyatlov-conspiracy-fuel** — *"Disney's 'Frozen' Helped Solve a Real Death Mystery"* — an utterly unexpected crossover nobody would guess and everyone wants to repeat.
8. **shackleton-endurance-survival** — *"Shackleton Lost His Ship but Not a Single Man"* — a two-year survival ordeal with real stakes and a clean, almost unbelievable resolution.
9. **hindenburg-thirty-four-seconds** — *"The Hydrogen-Filled Hindenburg Had a Smoking Room"* — a jaw-dropping irony that recontextualizes a famous disaster in one line.
10. **milky-way-no-photo** — *"Nobody Has Ever Photographed the Milky Way From Outside"* — a genuinely mind-bending twist with a perfect closing analogy.
11. **urban-planning-industrial-pressure** — *"Car Companies Invented the Crime of Jaywalking"* — exposes a hidden manipulation everyone has personally experienced.
12. **beetles-eat-everything** — *"Dung Beetles Steer by the Milky Way"* — absurd, visual, and scientifically verified.
13. **butterflies-complete-metamorphosis** — *"A Caterpillar Dissolves Into Goo Inside Its Cocoon"* — gross, astonishing, with a second wow layered on top of the first.
14. **pink-not-always-girly** — *"Pink Does Not Exist in the Rainbow"* — a mind-bending perception fact explained with total clarity.
15. **steganography-digital-files** — *"Your Printer Hides Secret Dots on Every Page"* — immediately relevant to the reader's own life and completely unknown to most people.
16. **elevators-otis-safety-brake** — *"An Inventor Cut His Own Elevator's Rope to Prove It Was Safe"* — a real, dramatic public stunt with genuine historical consequence.
17. **iguanodon-iguana-tooth-name** — *"Scientists Held a Dinner Party Inside a Dinosaur"* — delightfully absurd, needs zero prior knowledge.
18. **laughter-contagious** — *"Rats Giggle When You Tickle Them"* — adorable, surprising, and appeals to every age group without exception.
19. **detective-fiction-hard-boiled** — *"The Queen of Mystery Vanished for 11 Days"* — a real, still-unexplained mystery with perfect irony and stakes.
20. **rem-sleep-night-cycles** — *"In REM Sleep, Your Brain Is Awake but Your Body Is Locked"* — a true paradox, vividly framed, universally relevant since everyone sleeps.

**What they have in common:** every one gives the reader a concrete image or object to hold onto (a stone
coin, a dead salmon, a dinner party, a fridge magnet), needs no background knowledge, and the surprise
survives — or deepens — after the hook is explained. None of them lean on a statistic alone; the ones that
use a number (6-second loop, 11 days) attach it to a story, not a chart.

---

## Priority Removal List

### Immediate removals — 106 facts (all REJECT)
Full table with fact ID, category, topic, hook, and one-line reason: see
**`immediate-removals-reject-list.md`**. These clearly weaken the database as-is; rewriting was assessed
per-fact in the batch reports and judged not worth the effort (the underlying idea itself is the problem,
not just the writing) except where a batch report explicitly says otherwise.

By category, REJECT is concentrated in: history (13), astronomy/music/ocean-life (~4 each), and scattered
1–5 elsewhere. Full breakdown in `master-table.csv`.

### Needs rewrite — 153 facts (REVISE)
The underlying fact has real potential; the hook, body, or both need real work. Every REVISE fact has a
"Rewrite Potential" note in its batch report stating the exact angle to rewrite toward — these are ready to
hand to a rewrite pass without re-deciding anything. Concentrated in: history (9), space (8), chemistry
(9), religion-beliefs (9), medicine, colors — see `master-table.csv` filtered to `classification=REVISE`.

### Human review required — 335 facts (BORDERLINE)
Per the rubric: *"Borderline facts should be flagged for human review and presumed removable unless there
is a compelling reason to keep them."* This is the largest bucket and the one that most needs your
judgment call, since a fact with real charm can still land BORDERLINE for being the "third-best" version of
an idea already covered better elsewhere. Heaviest concentrations: physics/castles-fortresses (18 each),
superstitions (15), myths-legends (16), ancient-civilizations (14).

Recommended approach given the volume: **triage by category, not fact-by-fact.** The five weakest
categories (history, food, cars, castles-fortresses, ancient-civilizations) account for 71 of the 335
BORDERLINE facts and are where a category-level rewrite pass (per the existing
`topic-curation-and-quality-guide.md` workflow) will do the most good fastest.

---

## Final Editorial Verdict

1. **Does the database currently feel premium?** Mostly, but unevenly. The top categories are genuinely
   excellent and match the Socotra bar this audit was calibrated against. But roughly 1 in 3 facts,
   concentrated in about 10 categories, would read as a letdown next to yesterday's or tomorrow's fact if a
   user compared them side by side.
2. **Are users likely to get a "wait, really?" moment most days?** Yes, if the app is drawing primarily
   from the 65% PASS pool and especially from the 20 categories above 75% pass rate. The risk is entirely
   in the weak categories — if the daily-fact selection logic pulls evenly across all 56 categories rather
   than weighting by quality, a user is meaningfully more likely to get a dud on a history or castle day
   than an insects or sleep-dreams day.
3. **Are too many facts merely informative rather than remarkable?** Yes — this is the #1 failure pattern
   (70 facts flagged "dry/academic/administrative"), and it's the same failure mode you originally spotted
   in economics, just showing up under different subject matter (history's court procedures and
   governance, castles' military engineering, cars' industrial-adoption timelines).
4. **Which categories need the most aggressive cleanup?** In order: **history, food, cars,
   castles-fortresses, ancient-civilizations.** These five average a 33% pass rate combined and account for
   151 of the 594 flagged facts (25%) despite being only 9% of the categories.
5. **Approximate percentage to remove/revise/replace:** ~35% of the database (594 facts) doesn't meet the
   full bar as written today. Of that: 106 (6%) should simply go, 153 (9%) are worth a rewrite pass, and
   335 (20%) need your judgment — expect roughly half of that BORDERLINE pool to end up cut once reviewed,
   based on the rubric's own "presume removable" default.
6. **Three most important editorial changes to raise the whole database to the Socotra standard:**
   - **Kill the "explainer" and "how-it-worked" structure wherever it appears** — this is the single
     biggest driver of failure (70 facts) and it isn't confined to one category; it's a writing pattern
     that shows up in history, castles, cars, music, and movies alike. Any fact whose hook could be a
     Wikipedia section heading needs its structure rebuilt around a person, object, or moment.
   - **Resolve every redundant cluster identified above** — nearly a dozen 2-3-fact clusters exist where
     only the single best fact should survive per topic, per the project's own "up to 3, quality-gated,
     never padded" rule. This alone would clear ~56 flagged facts with no rewriting needed.
   - **Apply the audience-appeal lens (not just "is this true and interesting") to every institutional/
     political/legal/corporate topic**, the same lens applied to economics — history and movies in
     particular need this pass next; both fail primarily because the subject matter assumes adult civic,
     legal, or industry context the target audience doesn't have.

---

## Files in this audit
- `00-SUMMARY.md` — this file
- `master-table.csv` — all 1,704 facts scored across 6 dimensions + classification + primary issue
- `immediate-removals-reject-list.md` — all 106 REJECT facts with reasons, ready to remove
- `batch-reports/batch01.md` … `batch08.md` — full per-fact detailed reports (Why It Was Flagged, Audience/
  Hook/Body Assessment, Recommended Action, Rewrite Potential) for every REVISE/BORDERLINE/REJECT fact,
  plus each batch's own strongest-facts picks and priority-removal breakdown
