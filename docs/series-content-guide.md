# Nib Content Workflow

# Series — Content Guide

> Last updated: 2026-07-30
> Status: feature proof-of-concept, not yet built in the app. This doc exists so a future session in
> *this* repo can pick up the content side without re-deriving context from the app-side design work.

---

# What this is

**Series** is a new Nib feature, currently at the proof-of-concept stage — designed, not yet built.
Full product spec and UI mockups live in the **Nib app repo**, not here:

- [`../../Nib/nib-docs/series-design-2026-07-28.md`](../../Nib/nib-docs/series-design-2026-07-28.md) —
  the full design spec (data model, UI, discovery/navigation, curation rules).
- [`../../Nib/nib-docs/series-mockup-2026-07-28.html`](../../Nib/nib-docs/series-mockup-2026-07-28.html) —
  interactive HTML mockup (open in a browser).

**This doc only covers the content-authoring side** — what a Series needs from *this* repo's pipeline,
and the current state of the three candidate Series being drafted.

## The one-sentence version

A Series is a curated, ordered set of 8–15 existing (or newly written) facts that explores **one
specific, named subject** — not a theme, not a category — from as many different disciplines as
genuinely apply. Contrast with the two structures this repo already knows:

- **Category** organizes by broad subject area (`geography`, `history`) — permanent, hierarchical.
- **Collection** curates by a shared *theme/angle* (`happy-accidents.json`-style — "breakthroughs nobody
  meant to make") — the facts are independent examples of one idea, interchangeable in principle.
- **Series** curates by one shared *subject* (Socotra, Pompeii, the Antikythera Mechanism) — every fact
  exists to explain a different facet of *that one thing specifically*. Swap the subject and the facts
  stop making sense — that's the test that separates a Series from a Collection.

---

# Curation rules (what to check before proposing a fact for a Series)

Carried over from the design spec, restated for a content-authoring context:

1. **8–15 facts minimum viable**, occasionally up to 20 for an unusually deep subject.
2. **At least 4 categories represented.** Below that, it's really just a Topic with extra steps — this
   is exactly what disqualified "Black Holes" as a candidate (see below): 10 facts existed, but 7 were
   pure `astronomy` restating the same "black holes are extreme" idea.
3. **No artificial connections.** A fact earns its place by explaining a *distinct* facet of the named
   subject, not by merely mentioning it. Don't pad a Series with a fact that's only tangentially
   "in the neighborhood" (e.g. a fact about a *different* volcano doesn't belong in a Krakatoa Series
   just because it's also a volcano).
4. **The subject must be specific and bounded** — a named place, object, person, event, or discovery.
   "Nature," "The Ocean," "Volcanoes" fail this test the same way they'd fail as a Category name.
5. **A Series subject must not already be a Category.** This is what disqualified "Coffee" (16 facts, 5
   categories — looked great on paper, but `coffee` is already a top-level Category, so using it as a
   Series subject would contradict the whole point of the feature).
6. **Every fact must still stand alone**, exactly like today — a Series fact can surface as anyone's
   daily fact, in search, or in a category browse, with zero Series context. No new authoring constraint
   here; this repo's existing quality bar already guarantees it.

---

# Current state: three candidate Series, all short of the bar

None of these are launch-ready yet. All three are in the *same* position — real, non-padded seed
content already in `facts.json`, but short of both the 8-fact and 4-category minimums. The full
candidate list (with exact `factIds`) lives in
[`../exports/series.draft.json`](../exports/series.draft.json) — treat that file as the live commission
brief; this doc explains the *why* behind it.

## 1. The Alien Island (Socotra)

**6 facts / 3 categories** (`strange-places` ×3, `geography` ×1, `ancient-creatures` ×2).

Existing facts: `socotra-endemic-plants`, `socotra-reptiles-snails`, `socotra-marine-diversity`,
`islands-isolation-shapes-life`, `woolly-mammoths-late-islands`, `terror-birds-before-land-bridge`.

**Needs ~3-4 more facts, landing in at least one new category, to clear the bar:**
- The Soqotri language — unwritten until recently, endangered, linguistically distinct from Arabic.
  → new category: `languages`.
- *Dendrosicyos socotranus*, the desert cucumber relative that evolved into a swollen-trunk tree.
  → new category: `famous-trees-plants`.
- Hoq Cave inscriptions — ancient sailors from India, Arabia, and Greece left graffiti here, dated
  roughly 1st century BCE–6th century CE. → new category: `ancient-civilizations`.
- Why dragon's blood trees grow their distinctive umbrella canopy (an arid-climate adaptation) — a
  *different* angle from the two dragon's-blood-tree facts already in the library (which cover "looks
  alien" and "bleeds red," not canopy shape/mechanism).

## 2. The City Vesuvius Stopped (Pompeii)

**5 facts / 3 categories** (`geography` ×1, `famous-disasters` ×3, `languages` ×1).

Existing facts: `volcanoes-not-just-lava`, `pompeii-preserved-city`, `pompeii-vesuvius-burial`,
`pompeii-excavation-source`, `palindromes-ancient-wordplay`.

**Needs ~3-4 more facts, landing in at least one new category, to clear the bar:**
- Herculaneum's carbonized scrolls, now being read by AI/X-ray without physically unrolling them (the
  real-world "Vesuvius Challenge" project). → new category: `technology`.
- Pliny the Younger's eyewitness letter — the only surviving firsthand account of the eruption, and the
  source of the volcanology term "Plinian eruption." → new category: `literature` or `history`.
- Pompeian Red — the pigment named for the frescoes found on Pompeii's walls. → new category: `colors`.
- Vesuvius is still active today, looming over roughly 3 million people in modern Naples — a present-day
  relevance angle (would land in `geography`, already covered once, but strengthens the closing-fact
  option the design spec calls for).

**Landmine, per this repo's existing de-dup log (`session-handoff.md`):** `physics/Sound` already owns
the Krakatoa "loudest sound" angle, and `geography/Volcanoes` + `languages/Palindromes` already own the
two Pompeii facts reused here. Don't accidentally re-draft either — the Series pulls the *existing*
facts by id, it doesn't need new versions of them.

## 3. The Machine Time Forgot (Antikythera Mechanism) — new candidate, found this session

**5 facts / 3 categories** (`mysteries` ×3, `engineering` ×1, `ancient-civilizations` ×1).

Existing facts: `antikythera-ancient-computer`, `antikythera-predicted-eclipses`,
`antikythera-gears-hidden-inside`, `gears-speed-torque-tradeoff`, `babylonians-astronomy`.

Why this one: it matches the "object/scientific discovery with unexpected depth" archetype the same way
Socotra matches "place." The four directly-on-subject facts already cover four genuinely distinct
angles — discovery (1901 shipwreck), decoding (engraved instruction manual), significance (unmatched for
1,000 years), and mechanics (30-gear analog computer) — not four restatements of one claim.

**Needs ~3-4 more facts, landing in at least one new category, to clear the bar:**
- The 2000s–2020s CT-scanning / X-ray tomography projects that finally read the mechanism's hidden
  inscriptions. → new category: `technology`.
- Modern working replicas built to test how it functioned, including hobbyist builds (some genuinely out
  of LEGO). → new category: `inventions` or `technology`.
- Competing theories on who built it — schools of thought pointing at Archimedes' successors, Rhodes, or
  Hipparchus. (Deepens `history`/`mysteries`, doesn't strictly need to be a new category, but is strong
  content regardless.)
- What else the shipwreck held — bronze and marble statues recovered alongside the mechanism. → new
  category: `art`, or deepens `ancient-civilizations`.

**Landmine:** `engineering/Gears` is logged in `session-handoff.md`'s de-dup discipline as *already
owning* "the Antikythera 'analog computer' + Olympic dial." The one existing engineering fact
(`gears-speed-torque-tradeoff`) is that ownership in action — any *new* Antikythera facts should stay
out of `engineering` unless they're genuinely about gear mechanics specifically, to avoid overloading
one category with the whole subject.

---

# Why these three, and not others

A broad search was run across this session — not just the two originally-proposed candidates, but
roughly 90 additional named-subject keywords spanning places, natural phenomena, inventions, historical
events, and people (Antarctica, Chernobyl, Sahara, Everest, Stonehenge, Machu Picchu, the Black Death,
DNA, radio, earthquakes, Leonardo da Vinci, Marie Curie, and many more). Worth recording so a future
session doesn't repeat the search:

- **Most keyword hits were coincidental, not real subject clusters.** Pulling the actual fact bodies for
  "Everest" (6 hits), "the Black Death" (5 hits), "earthquake" (8 hits), and "DNA" (9 hits) showed the
  word merely appeared in unrelated facts (a size comparison, a Pied Piper legend, scattered engineering
  facts, ant/mammoth/explorer trivia) — not a coherent, draftable subject.
- **Black Holes** (10 facts, spans `astronomy`/`technology`/`physics`/`colors`) was seriously considered
  and rejected: 7 of the 10 are pure `astronomy` repeating the same "black holes are extreme" claim —
  it's really the existing Black Holes *Topic*, not a multidisciplinary Series.
- **Coffee** (16 facts, 5 categories) is disqualified on principle — `coffee` is already a Category, so
  it can't also be a Series subject without contradicting the feature's own definition.
- **Glaciers** (8 facts, mostly `geography`) reads as "too broad" — closer to a general phenomenon than
  one bounded, named subject, the same failure mode as "Nature" or "The Ocean."
- **Krakatoa** (4 genuinely on-subject facts across `famous-disasters` + `physics`, including a nice art
  angle — its ash may be behind the sky in Munch's *The Scream*) is a real, promising subject but was
  set aside as a 4th-place candidate for now: thinner than the three above even before counting gaps,
  and the volcanic-eruption territory already overlaps with Pompeii's Series. Worth revisiting once the
  three above are drafted, if a 4th Series is wanted later.

---

# What to actually do with this

1. **Research each gap-closing topic listed above** through the normal pipeline —
   `source-discovery-and-registry.md` for sourcing, same trust bar as any other fact (specialist
   institutions over Wikipedia/blogs, per the existing house rule).
2. **Draft into `approved-content/approved-facts.csv`** using the normal house style
   (`fact-writing-and-quality-guide.md`) — headline/body/summary/tags, same 4+ age-rating gate, same
   "up to 3 facts per topic, quality-gated" rule.
3. **Run the normal pipeline** (`normalize:tags → assign:themes → generate:related → export:facts`) once
   the new facts are approved — nothing about Series changes this part.
4. **Update `../exports/series.draft.json`** — replace each `_candidateNewFactTopics` array entry with
   the real new `factId` once it's drafted and exported, and drop the `_curationNote` once a Series hits
   8 facts / 4 categories.
5. **There is no `series.json` export step yet** — Series doesn't exist in `export-facts.ts`, the
   `Manifest`, or the app's `Nib/Nib/Data/` directory. That's app-side work tracked in the design spec's
   own phasing (§8), not something this repo's pipeline produces today. Once a Series is content-complete,
   hand `series.draft.json` back to an app-side session to build the actual `Series` model/JSON and wire
   it up — this repo's job stops at "the facts exist and are good."

---

# Open question worth flagging to the product owner

The three candidates above all need genuinely new sourced content, not just recombination of existing
facts — this is consistent with how the concept doc always intended Series to work ("could combine
existing facts... one or two Series-exclusive facts"), but it does mean a first Series drop has a real
content cost, roughly 3-4 new facts × 3 subjects = ~10-12 new facts, before anything can ship. Decide
whether that's worth prioritizing against the existing monthly-cadence roadmap
(`content-expansion-roadmap.md`) before starting to draft.
