# Nib Content — "Wow" Rewrite Workflow: Session Handoff

> Last updated: 2026-08-07 · 996 facts · 56 categories
> (Keep this line current — bump it every time a category is finished or the library changes. See step 9 of the standing pattern.)

## What this is
Nib is an iOS app that serves something new every day. Content lives in a single
CSV. New categories get added as **textbook-style dumps** (bare definitions, often citing "Britannica"),
and the job is to rewrite every fact into a genuine **"wait, really?" "wow"** fact in the app's house voice.

## Key locations
- **CSV (source of truth):** `nib-content-workflow/approved-content/approved-facts.csv`
- **Run scripts from:** the `approved-content/` directory.
- **The category playbook (read first):** `docs/topic-curation-and-quality-guide.md` — includes §8, the
  reproducible whole-library weed-out.
- **Voice / writing / rewrite / flatness rules:** `docs/fact-writing-and-quality-guide.md` (the Fact Writing &
  Quality Guide — now consolidates the old `fact-rewrite-style-guide` + `manual-ai-assisted` docs).
- **JSON / field / relatedFactIds contract:** `docs/content-schema-reference.md`.
- **Source discovery + registry:** `docs/source-discovery-and-registry.md` (now includes the old
  `trusted-source-workflow`).
- **Roadmap (fascination-first):** `docs/content-expansion-roadmap.md`.
- **CDN publish:** `cdn/README.md` + `cdn/build-manifest.sh` (moved here from the Nib app repo).
- **Persistent memory:** `nib_content_pipeline_state.md` (in the Claude memory dir) tracks the running
  state + every de-dup decision (exhaustive per-category log). Update it alongside this handoff doc — but
  **this doc, not memory, is the durable handoff** (memory can't be relied on across machines/devs).
- **Archived, fully-actioned audits:** `docs/archive/` — the wow-factor audit (HANDOFF + report + raw CSV,
  2026-07-22/23) and the opinion-vs-fact audit (2026-07-28). Both are content work that's done and
  verified (see the 2026-07-29 entry below); kept for provenance, not something a new session needs to
  read to get oriented.

## Current state (2026-08-07)
- **996 facts · 56 categories · 30 collections · 3 series (all at or above original size) · up to 3 facts per topic (quality-gated, NOT "exactly 3").**
- **App bundle (`Nib/Nib/Data/`) and `nib-social/public/data/facts.json` are in sync with the pipeline as of
  2026-08-07.** CDN is NOT — a publish is owed (see below), left for the user to run manually rather than
  pushed automatically.

### What changed on 2026-08-07 (Instagram social-hook trim — 1196 → 989, a 17% cut across 3 passes)

Triggered by the user posting to `nib-social` (Instagram) daily and observing more people see that content
than the app itself — content now needs to work as a cold-scroll hook, not just clear the app's own
"wait, really?" bar. Full pass built and run via parallel subagent batches (8-10 batches per pass, each
reading full body text, never sampling). Every removal/rewrite decision was reviewed by the user before
being applied to the CSV — nothing was auto-applied.

- **Scoring pass (diagnostic only, no changes applied):** built a 4-part rubric distinct from the app's own
  quality bar — Headline Grab (0-3), Universal Relatability (0-3), Visceral Punch (0-2), Shareability (0-2)
  — scored all 1196 facts. Calibration anchor: `trade-not-just-nations` ("A Simple Steel Box Built the
  Modern World") scored 4/10 despite being a genuinely good app fact, because shipping-container logistics
  requires the reader to already care about the subject. Result: 692 POST / 434 MAYBE / 70 SKIP. Saved to
  `exports/social-scores.json` (may now be stale relative to the current CSV — treat as historical).
- **Phase 1 (SKIP cut, 1196 → 1130, -66 facts, -14 topics):** cut all 70 SKIP facts except 4 user-approved
  exceptions kept for narrative/collection reasons (`easter-eggs-konami-code-testing`,
  `recession-not-depression`, `playstation-failed-nintendo-deal`, `jellyfish-hitchhiking-crabs` — the last
  one anchors the `unlikely-partnerships` collection). 17 of the 70 were the sole fact in their topic;
  user reviewed all 17 individually and approved cutting 14, keeping 3 (the exceptions above minus
  jellyfish, which wasn't topic-emptying). Repointed `hidden-beneath-us` (`caves-start-in-cracks` →
  `caves-acidic-water`) and trimmed `unlikely-partnerships` (dropped `wolves-older-siblings-help`, no
  replacement forced — 5 facts is fine).
- **Phase 2 (stricter "youth-engagement" pass, 1130 → 1103, -27 facts, -4 topics):** first MAYBE-tier pass
  (434 facts) using only the app's own flatness red-flags found **0 REMOVE candidates** — everything either
  already cleared the app bar or got a headline/summary rewrite (219 rewrites). User pushed back with a
  concrete example (*"Brutalism Has Nothing to Do With Being Brutal"* — well-crafted, but architecture-
  movement terminology has no baseline pull for a young audience) and asked for a second, stricter pass
  judging the SUBJECT's inherent appeal, not just craft quality. That pass found 27 genuine removes
  (etymology-for-its-own-sake, design philosophy, policy/corporate history — even when well-written).
  4 more topics dropped (Yin-Yang — both facts independently flagged REMOVE by the same batch, a "sibling
  interaction" the per-fact check missed and had to be caught manually; Courtyards, Business Cards, GDP).
- **Final wow pass (989, -114 facts, -24 topics, +107 rewrites):** re-audited the ENTIRE current database
  (not just the previously-flagged tier) against a raised "amazing, not just fine" bar — includes facts
  that had already scored POST originally. Found 91 REMOVE + 31 FLAG_EMPTY_TOPIC (topic-emptying, held for
  review) + 107 REWRITE across 874 STRONG. User reviewed all 91 REMOVEs in groups of 10 (approved all), then
  the 31 empty-topic candidates as a single categorized list with per-item recommendations (kept 7: the 3
  narrative exceptions + `jellyfish-hitchhiking-crabs` again + Fibonacci↔km / MP3-"Tom's Diner" / self-
  climbing Cranes, all judged to have a genuine hook despite a "process" surface). 107 rewrites applied
  without individual review (all were "surface the buried concrete detail" edits, same pattern as prior
  passes, no new facts invented).
- **Collections:** stripped dangling refs across ~15 collections as facts were cut; no anchor-critical
  losses this round (unlike Phase 1's jellyfish near-miss). One collection, `time-plays-tricks`, is down to
  **3 facts** (below the 4-8 guideline but still valid) — flagged to the user, no fix applied yet, worth a
  same-theme top-up next time a curation session touches it (see the 2026-07-30 "post-remediation
  collections audit" entry below for the exact restore method: pull unused on-theme facts already in the
  database, never invent new ones).
- **Graph regenerated fresh after each of the 3 phases**, not hand-fixed (`normalize:tags → assign:themes →
  generate:related → export:facts`), self-validating to 0 dangling IDs / 0 self-refs every time. Final
  integrity check: CSV 989 == facts.json 989, 0 dup ids, 0 dangling relatedFactIds, 0 dangling collection
  refs, no topic > 3.
- **Synced** `exports/{facts,collections}.json` → `Nib/Nib/Data/` and `exports/facts.json` →
  `nib-social/public/data/facts.json`. **CDN publish intentionally NOT done** — same standing rule as every
  prior pass, left for the user to trigger explicitly.
- **Backups:** `approved-content/approved-facts.backup-20260807-181028.csv` (pre-Phase-1 snapshot, full
  1196-fact state) — the only backup taken; Phases 2/3 were not separately snapshotted since they ran
  same-session immediately after.
- **Follow-up same day — fully restored `the-alien-island` series (989 → 993 facts, series 5 → 9):** the
  trim had thinned this series (see the series.json gap above). First attempt added one new fact (goats
  overgrazing threatening the dragon's blood tree) — user reviewed it and didn't like it, asked for a
  different angle and a full restore to the original count of 9, "all facts sourced need to be amazing and
  follow the same standards we just used to trim the others out." **Removed the goat fact** and re-mined the
  cached National Geographic source `sources/ancient-civilizations/national-geographic-hoq-cave.md`
  (originally scraped only for the Hoq Cave graffiti angle — turned out to be a full narrative feature with
  much more unused material). **4 new facts written**, each checked against the same visceral/universal
  bar as the trim, none reusing an already-cut angle:
  - `socotra-man-lives-in-cave` (strange-places/Socotra) — a man born in, and still living in, a cliffside
    cave (human-interest).
  - `dragons-blood-tree-origin-legend` (famous-trees-plants/Dragon's Blood Tree) — the dragon-vs-elephant
    myth explaining the tree's blood-red resin (distinct from the 2 existing biology-angle facts in that
    topic — myth vs. mechanism, no overlap).
  - `socotra-mistaken-for-atlantis` (strange-places/Socotra) — ancient sailors believed the island was part
    of Atlantis (checked against existing DB Atlantis facts in `literature` and `myths-legends` — genuinely
    distinct, neither covers Socotra).
  - `socotra-twin-cyclones-2015` (famous-disasters, new topic "Socotra Cyclones") — 2015's twin cyclones
    displaced a third of the island's population, a 2018 cyclone killed 19 more; "3 major storms in 3 years"
    was unprecedented on record.
  All 3 category/topic caps respected (strange-places/Socotra and famous-trees-plants/Dragon's Blood Tree
  both landed at exactly 3; Socotra Cyclones is a new 1-fact topic, allowed). Ran the full pipeline again,
  0 dangling refs (collections + series), synced all 3 bundle targets, rebuilt CDN v19 again (still
  unpublished). **Lesson reinforced: a source cached for ONE narrow fact (here, just Hoq Cave graffiti) can
  be a full-length piece with several other unused angles — re-read the whole cached file, not just the
  paragraph the original fact came from, before concluding a topic is tapped out.**
- **Follow-up same day — topped up the other 2 thinned series too (993 → 996):**
  `the-city-vesuvius-stopped` (8 → 9) and `apollo-13` (8 → 10), same "amazing, source-grounded, no reused
  cut angles" bar. For Vesuvius, re-read `sources/famous-disasters/britannica-pompeii.md` in full (previously
  only mined for the plaster-cast and excavation-history facts) and found the 62 CE earthquake — Pompeii was
  still mid-rebuild, its new baths literally under construction, when Vesuvius hit 17 years later — a distinct
  dramatic-irony angle from the eruption-mechanics fact already in the series. New: `pompeii-earthquake-
  before-eruption` (famous-disasters/Pompeii, now 3). For Apollo 13, re-read `sources/space/nasa-apollo-13.md`
  past the paragraphs already mined (earth-horizon navigation, explosion/lifeboat, Houston misquote) and found
  two unused concrete details in the same article: the cabin dropped to 38°F when the crew powered down the
  heat, and the lunar module's food/water/power were designed for 2 astronauts for 1.5 days, not 3 for 3.5.
  New: `apollo13-freezing-cabin` + `apollo13-lifeboat-rationing` (both medicine/Apollo 13 Crew Health, now 3).
  Same pipeline-regen + sync + CDN-rebuild cycle as the other two top-ups. **Pattern now established for this
  kind of request: when a series/collection needs restoring post-trim, re-read the FULL cached source(s) for
  its topic(s) end-to-end (not just the paragraph the original fact came from) before deciding a fresh scrape
  is needed — all 3 restores (9 new facts total) came from source material already sitting in `sources/` that
  a prior single-fact draft had left untapped.**
- **Follow-up same day — user wanted the 2 Apollo 13 facts swapped for something more interesting, "maybe
  even from a different source."** The cached Apollo-13-adjacent sources were genuinely tapped out this
  time — the big medicine source (`nasa-apollo-13-crew-health.md`) is a generic clinical brief on spaceflight
  urinary health, not narrative; the engineering source (`smithsonian-apollo-13-co2-scrubber.md`) is a museum
  conservation writeup, the same source that produced the jettisoned-replica fact already cut today for being
  process trivia. **Did a fresh, live web search this time** (NASA/Universe-Today-caliber results) and found
  two well-documented, previously-untapped angles: Ken Mattingly was pulled from the crew 72 hours before
  launch after a measles exposure, replaced by Jack Swigert — whose specific skills (deep command-module
  emergency-procedure knowledge, methodical nature) turned out to be exactly what the in-flight crisis needed;
  and the line "Failure is not an option" was never actually said during the mission — it was invented for the
  1995 movie (verified via 2 independent sources; Kranz's real words, and the "Houston we have a problem"
  misquote already covered by an existing fact, were cross-checked to avoid overlap). Removed
  `apollo13-freezing-cabin` + `apollo13-lifeboat-rationing`; added `apollo13-mattingly-measles-swap`
  (new topic space/Apollo 13 Crew) + `apollo13-failure-not-option-myth` (new topic movies/Apollo 13 (Film)).
  Cached both new sources to `sources/space/universe-today-apollo-13-measles.md` and
  `sources/movies/irishnews-apollo-13-movie-quotes.md`, added rows to `source-registry/sources.csv`. Same
  pipeline/sync/CDN-rebuild cycle; series stayed at 10 facts, just 2 different ones. **Lesson: when the
  already-cached sources for a topic are genuinely exhausted (not just under-read), a live web search for a
  well-documented, verifiable angle is the right move — same sourcing bar applies (verify via 2 sources where
  possible, cache the result, add to the registry) even when it's not part of a scheduled source-discovery
  session.**
- **Follow-up same day — caught a missed step: `exports/sources.json` was never regenerated after adding new
  topics.** User asked directly whether it had been updated. It hadn't — `sources.json` is a **generated**
  file (`pnpm export:sources`, joins `source-registry/sources.csv` + `categories.json` + `facts.json`), not
  something touched by the normal `normalize:tags → assign:themes → generate:related → export:facts` cycle,
  so it's easy to forget when a session's changes are all fact-content edits. All 3 new-topic series-restore
  facts today needed a matching registry row for "Source ↗" to resolve: `space/Apollo 13 Crew` and
  `movies/Apollo 13 (Film)` already had rows (added alongside those facts); `famous-disasters/Socotra
  Cyclones` did not — added it (National Geographic, same URL as the existing `ancient-civilizations/Hoq
  Cave` row, since both facts came from the same source article, which is a normal/expected pattern in this
  registry). Ran `pnpm export:sources`: **596/596 topics matched (100%), 0 unmatched** — confirms no other
  topic was missed. Synced `exports/sources.json` → `Nib/Nib/Data/sources.json`, rebuilt CDN v19 once more
  (sources checksum changed; facts/categories/collections/series unchanged from the prior rebuild).
  **Lesson: after adding a fact under a brand-new topic (not just a new fact in an existing topic), always
  check whether it needs a `source-registry/sources.csv` row too, then re-run `pnpm export:sources` — it's
  not part of the standard 4-step content pipeline and won't error if skipped, it'll just silently ship
  without a "Source ↗" link for that topic.**

### What changed on 2026-07-30 (wow-factor audit remediation, Phases 1-5 — 1704 → 1177, a 31% cut)

Full detail lives in `docs/wow-factor-audit-2026-07-29/SESSION-HANDOFF.md` (that file's own round-by-round
log); this is the summary for this doc's running history.

- **Phase 1** (already done before this remediation began): removed all 106 REJECT facts from the
  2026-07-29 audit.
- **Phase 2** (7 rounds): worked through all 153 REVISE facts across every category that had one. Only 5
  survived with a rewrite (`ravens-solve-problems-together`, `supply-chains-ev-complexity`,
  `television-kept-changing`, `sleep-half-brain-awake`, `baobab-nine-species`); the rest were removed — in
  practice REVISE got the same "presumed removable" bar the rubric reserves for BORDERLINE.
- **Phase 3**: resolved the audit's named redundant clusters — almost all had already self-resolved via
  Phases 1-2 (Salem witch trials, golden-age-of-piracy, banana/IMAX/CMB/platypus/chameleon/giant-squid
  trios, Antikythera, Mongol Empire). Also ran a fresh whole-database cross-category redundancy scan (the
  audit itself flagged this as never having been done) and found + fixed one real hit: the "Concrete" topic
  spanned engineering + architecture with 3 of 4 facts independently claiming "Roman concrete outlasts
  modern concrete" — kept only `concrete-steel-reinforcement` (note: **this id is mislabeled**, its content
  is actually about self-healing Roman concrete, not steel reinforcement — same for `qr-codes-denso-wave`,
  whose content is about error-correction, not the company; both flagged for a future rename pass, not
  fixed yet since renaming risks breaking `relatedFactIds`/collections cross-refs).
- **Phase 4**: resolved all 335 BORDERLINE facts. Parsed each fact's own "Recommended Action" from the
  original batch reports and auto-applied the unambiguous ones (85 "Remove", 37 "Keep unchanged" — no
  per-fact review needed). The remaining 213 genuine exceptions (rewrite-suggested / "human judgment call" /
  merge candidates) got a lightest-touch batch review; every batch came back "remove," and partway through,
  the user opted to bulk-remove the rest rather than continue one-by-one. **Caught and fixed one conflict**
  before auto-applying: `titanic-warning-never-reached-bridge` was flagged for removal for redundancy
  reasons the user had just explicitly overruled in Phase 3 (kept all 3 Titanic facts) — pulled it into the
  keep bucket to honor that decision.
- **Theory-vs-fact pass** (run before Phase 5, at the user's request, to avoid a second regen): re-checked
  facts already marked PASS or kept during remediation against the "verifiable fact, not a theory dressed as
  fact" rule (`fact-writing-and-quality-guide.md` §5). Read all 78 facts in the guide's own named
  highest-risk categories (economics, business, psychology, human-behavior) in full, then regex-scanned all
  1,179 facts for "solved/the answer is/the reason is" certainty language. Found and removed 2:
  `scarcity-limited-resources` (stated marginal-utility theory as "the answer" to the diamond-water paradox
  — same pattern as the guide's own removed comparative-advantage example) and `dyatlov-conspiracy-fuel`
  (framed the 2021 slab-avalanche study as having "solved" the Dyatlov Pass mystery, which remains genuinely
  disputed — same pattern as the already-removed Bermuda Triangle methane fact). Note: `dyatlov-
  conspiracy-fuel` had been in the original audit's own top-20 "Strongest Facts Benchmark" list — a good
  illustration of why this pass is worth doing even on facts the audit itself loved.
- **Pre-Phase-5 sanity check** (worth reusing next time): before calling any multi-phase audit remediation
  "done," diff every non-PASS fact's *current* headline **and body** against the original audit's flagged
  version — not just the headline. A REVISE/BORDERLINE fact whose recommended action was "rewrite body
  only" is *supposed* to keep its original headline, so headline-only comparison produces false positives.
  Caught 15 apparent "never reviewed" facts this way that turned out to be correctly rewritten (verified via
  diff against the `approved-facts.backup-*.csv` snapshots) — a real scare, but ultimately a clean result.
- **Phase 5** (regenerate/export/ship): ran `normalize:tags` (0 changes), `assign:themes` (56 themes, avg
  2.55/fact, 41 facts with none), `generate:related` (0 dangling, 0 self-refs, avg 5.29 links/fact),
  `export:facts` (1177 → `exports/facts.json`), `check:age-rating` (**0 BLOCK, 28 WARN** — read every WARN
  individually; all matched the guide's own explicitly-allowed patterns: educational Nazi/WWII history,
  neutral historical death tolls, "smoking" as an incidental word, "corpse flower" regex false positive —
  nothing needed fixing). Synced `exports/facts.json` → `Nib/Nib/Data/facts.json` and re-verified
  `collections.json` has zero dangling refs against the app bundle. **CDN publish was intentionally left
  undone** — the user wants to run `cdn/build-manifest.sh` + the upload themselves rather than have it
  pushed live automatically; do not publish to the live CDN without the user explicitly asking for that
  specific step.
- **Still owed, not urgent:** rename `concrete-steel-reinforcement` and `qr-codes-denso-wave` (mislabeled
  ids, see Phase 3 above); the CDN publish itself, whenever the user runs it.
- **Post-remediation collections audit (same day, after Phase 5):** the user asked whether any of the 28
  collections got weak from all the removals. Diffed every collection's current `factIds` length against
  the pre-audit count (`git show HEAD:exports/collections.json`, since this repo has git history unlike
  the CSV-only workflow described elsewhere in this doc). Found 3 genuinely thinned: `into-the-unknown`
  (6→3, -50%), `time-plays-tricks` (5→3, -40%), `tricks-of-the-eye` (6→4, -33%, plus a content-fit issue —
  `glaciers-flow-slowly` isn't actually an optical illusion, it's real ice-compression physics). Restored
  all 3 by pulling genuinely-fitting, currently-unused facts from the same theme within the existing 1177
  fact database (no new writing needed): `into-the-unknown` → +`amundsen-northwest-passage`,
  `lewis-clark-corps-discovery`, `zheng-he-treasure-fleets` (6 total); `time-plays-tricks` → +`time-hard-
  to-define`, `timekeeping-mechanical-clocks` (5 total); `tricks-of-the-eye` → dropped `glaciers-flow-
  slowly`, added `depth-perception-learned-cues`, `pareidolia-survival-skill`, `motion-illusions-rotating-
  snakes` (6 total). Re-verified zero dangling refs and synced `exports/collections.json` →
  `Nib/Nib/Data/collections.json` again. **Worth reusing next time a big removal pass runs:** always diff
  collection sizes against the pre-audit snapshot afterward — a collection can silently drop to a
  too-thin size or lose its thematic coherence with no integrity-check failure to catch it (dangling-ref
  checks only catch removed facts, not "technically fine but now too small/misaligned" collections).
  **Follow-up same day:** also restored the 2 collections flagged as "thinner but still coherent" rather
  than leaving them alone — `older-than-you-think` (7→4, -43%) got +`hot-air-balloons-hot-air-lighter`,
  `oort-cloud-comets-before-humans`, `epic-poems-heroic-scale` (back to 7); `everything-you-know-is-wrong`
  (6→4, -33%) got +`pink-not-always-girly` (notably, one of the original audit's own top-20 strongest
  facts in the whole database) and `orcas-are-dolphins` (back to 6). Same method: pull unused, genuinely
  on-theme facts already in the 1177-fact database, verify zero dangling refs, sync to the app bundle.
  **Follow-up #2, same day:** user asked to top up the remaining 8 too. Found strong on-theme, unused
  candidates for 7 and applied them: `when-disaster-struck` +`hindenburg-thirty-four-seconds` (another
  audit top-20 fact), `record-breakers` +`moon-ganymede-biggest`, `built-to-outlast-us` +`domes-arch-
  turned-space`, `luck-omens-and-rituals` +`horseshoes-st-dunstan`, `great-transformations` +`metals-free-
  electrons-conduct`, `the-first-of-its-kind` +`batteries-portable-power`, `rise-of-the-machines`
  +`reinforcement-learning-reward-signal` (all back to their pre-audit size). `devoted-parents` was left at
  5 (not 6) — the only candidate found (`penguins-creches`) would've been a second penguin fact in a
  6-fact collection and a weaker parental-devotion fit than the rest; user chose not to force it. **Final
  state: 27 of 28 collections at or above pre-audit size, 1 (`devoted-parents`) deliberately left 1 short
  rather than padding with a mediocre fit** — consistent with this whole project's "never pad" rule.

### What changed on 2026-07-29 (reconciliation — outward sync that was flagged "DUE" since 07-23, plus doc cleanup)

Picked up in an unrelated Series-feature session; the app bundle turned out to be **17 facts behind** the
pipeline, going back to the wow-factor audit's deferred outward batch that was never run.

- **Traced the actual state** (three sources had three different counts): CSV/`exports/facts.json` = 1709,
  this doc's own banner claimed 1717 (stale), `Nib/Nib/Data/facts.json` = 1692 (frozen from *before* the
  Aug 1 expansion below — the app-seed sync step was never run at all).
- **Confirmed `opinion-vs-fact-audit-2026-07-28.md` (archived, see above) was fully actioned**: 8 of its 9
  flagged facts are gone from the CSV (`entrepreneurship-schumpeter-growth`, `capitalism-private-ownership`,
  `taxes-burden-can-shift`, `recession-ripples-through-economy`, `trade-comparative-advantage`,
  `gdp-final-goods-only`, `scarcity-forces-choices`, `emotions-change-thinking`); `turing-test-chinese-room`
  correctly kept per the audit's own "weakest of the tier" note. Math checks out: 1717 (post-expansion) − 8
  = 1709 (current).
- **Ran integrity + gate checks on the live CSV/export before syncing anything:** 0 dup ids, 0 dangling
  `relatedFactIds`, 0 self-refs, no topic > 3, 0 facts with an unknown `categoryId`, 0 dangling collection
  refs, 28/28 collections resolve. `pnpm check:age-rating` = **0 BLOCK, 39 WARN** (matches the known
  pre-existing §9 false-positive baseline from Tier 3 of the wow audit — nothing new).
- **Ran the app-seed sync** (`cp exports/{facts,categories,sources}.json ../Nib/Nib/Data/`):
  `facts.json` 1692 → 1709, `categories.json` gained `survival-body-limits` (confirmed present — this is
  the fix for the "app won't render facts for an unknown categoryId" gotcha the Aug expansion entry below
  flagged as outstanding), `sources.json` refreshed for the new topics. `collections.json` was already in
  sync (no diff) — the `great-transformations`/`popcorn-expands-40-times` dangling-ref fix the wow-audit
  HANDOFF flagged had already been handled at some point, just never logged here.
- **Left uncommitted in the `Nib` app repo** — a clean 3-file diff (`git status Nib/Nib/Data/`), ready for
  review/commit on the app side.
- **STILL TO DO (outward-facing, NOT done): CDN publish.** The CDN at `https://nibapp.net/v1` still serves
  whatever version was last uploaded — this session did not touch it (needs R2 credentials). `curl` the
  live manifest first to confirm the actual served version before picking the next one (per the CDN
  gotcha further down this doc — the "notes are wrong" trap has bitten twice already). Then
  `cdn/build-manifest.sh` + upload content JSONs first, `manifest.json` last, per `cdn/README.md`.
- **Docs reorganized:** the two fully-actioned audits above moved to `docs/archive/` (git `mv`, history
  preserved). No other doc in `docs/` was stale — the five core reference guides + this handoff are all
  current and unchanged.

### What changed on 2026-07-28 (NEW CATEGORY — first monthly expansion drop: Aug 2026)

First execution of the `content-expansion-roadmap.md` monthly cadence. **New category `survival-body-limits`
("Survival & the Body's Limits"), 10 topics, +25 facts (1692 → 1717).** This was a from-scratch build (source
discovery → scrape → draft), NOT a wow-rewrite. Full source-discovery + scrape validation done; all 10 registry
rows in `sources.csv` are `complete`; 10 clean markdown files in `sources/survival-and-the-bodys-limits/`.

- **Roadmap deviations, all user-approved:** the roadmap's Aug slate was `Survival & the Body's Limits` with a
  specific 10 topics. Final shipped topics differ: **Rule of Threes → The Vacuum of Space** (weak/blog-only
  source), **The Bends → Heatstroke** (heat counterpart to the cold topics), **Paradoxical Undressing → Hysterical
  Strength** (Live Science was JS-gated junk; then rejected Wikipedia as a source on principle — user won't use
  editable-by-anyone sources), **The Death Zone → Hypothermia** (scraped NatGeo page was a climbing *memoir*, not
  physiology), **The Will to Live → Surviving a Fall** (scraped NatGeo page was a "vacation mindset" essay, off
  topic). Lesson: **validate that a scraped page is actually about the topic AND scrapes to real body text before
  committing** — three sources failed this at draft time (JS-gate, memoir, off-topic essay).
- **Final 10 topics / institutions:** The Vacuum of Space (ScienceABC), Heatstroke (Cleveland Clinic), Hypothermia
  (Cleveland Clinic), Hysterical Strength (Cleveland Clinic), G-Force (Smithsonian), Wilderness Survival (National
  Geographic), Surviving a Fall (Guinness World Records), Freediving (Divers Alert Network), The Mammalian Dive
  Reflex (Ochsner Health), Surviving Without Food (Scientific American). **Zero Britannica, zero Wikipedia** — a
  strong source-diversification win for the roadmap's 50%-Britannica goal.
- **Facts-per-topic (quality-gated, user-enforced):** Vacuum 3, Heatstroke 3, Hypothermia 3, Hysterical Strength
  3, G-Force 3, Wilderness 3, Surviving a Fall **1** (user cut 2 same-incident facts — "up to 3" is a ceiling),
  Freediving 2, Dive Reflex 2, Surviving Without Food 2.
- **4+ age-gate routing (this category pulls morbid/medical sources):** Dive Reflex source is self-harm-framed →
  facts kept to physiology only; Surviving Without Food source is heavily morbid (anorexia/end-of-life) → kept to
  Gandhi's fast + metabolism downshift; Surviving a Fall → survival + physics only, no crash/injury/bombing detail.
  `pnpm check:age-rating` = **0 BLOCK, 0 WARN** on all 25 (reworded one summary that said "act drunk").
- **STILL TO DO (outward-facing, NOT done):** (1) run the graph pipeline `normalize:tags → assign:themes →
  generate:related` (the 25 rows have empty `relatedFactIds`/`themes`); (2) `pnpm export:facts` + sync to
  `Nib/Nib/Data/facts.json`; (3) **app-side: add `survival-body-limits` to `categories.json`** (color token, icon,
  description) — the app won't render facts for an unknown categoryId; (4) CDN republish. Backup:
  `approved-content/approved-facts.backup-survival-20260728-003432.csv`.
- **Roadmap monthly cadence also expects 2 Collections** ("Written in the Stars", "Too Hot to Handle") — NOT
  started; those are pure curation of existing facts, no drafting. **Cadence changed 2026-07-28:** category drops
  on the 1st, and **both** Collections now drop together on the **15th** (was 1st + 15th). See
  `content-expansion-roadmap.md`.

### What changed on 2026-07-21 (later — category-fit pass, 1716 → 1713)

Triggered by the Fact of the Day *"The Guinness Book Is One of the Most-Stolen Library Books"* appearing under
**sports**. Audited category placement at the **topic level** (~600 topics; the tag-vs-category heuristic is
noise — tags are subject keywords). Two genuine misfiles fixed: **(1)** `sports/World Records` (both facts
about the Guinness *book*) → moved to **literature**, topic renamed **Guinness World Records**. **(2)** `Bees`
existed in both `animals` and `insects` (bees are insects) → merged into insects, trimmed the combined 6 → 3.
The 4 remaining cross-category duplicate topics (Printing Press, Internet, QR Codes, Concrete) are
**intentional** distinct-angle pairs — do not "fix" them. Graph regenerated + exported (1713, 0 dangling),
age-rating 0 BLOCK. Moving a topic = change `categoryId` + fix the leading category tag; `id` stays permanent
so related/collections are safe (verified). Same **outward-facing steps still pending** (app-seed sync + CDN)
as the wow pass — do them together.

### What changed on 2026-07-21 (third "wow" weed-out — 1822 → 1716)

Triggered by the Fact of the Day *"The Javelin Was Redesigned Because Throwers Got Too Good"* reading flat.
The failure mode this round was **over-circulated `KNOWN` factoids** — true and well-written, but the reader
has already met them — distinct from the *textbook-definition* lens of the 2026-07-14/18 passes. **106
removed · 21 rewritten across 33 categories**, 15 tier-1 flags withdrawn on close reading (well-known but
still reliably surprising). Full per-fact rationale in **`docs/wow-weedout-2026-07-21.md`**; machine-readable
changelog in `approved-content/wow-weedout-2026-07-21-changelog.csv`; the flag file that seeded it is
`approved-content/flagged-wow-candidates.csv` (its 93 tier-2 rows are a watchlist, not yet actioned). Graph
regenerated + exported (1716, 0 dangling/self-ref), `pnpm check:age-rating` = 0 BLOCK. **Still to do
(outward-facing):** app-seed sync + collections.json dangling-ref check (§8 step 7) and CDN publish (§8 step
9). **Re-source candidates** (topics gutted to weak/empty by this pass): food/Cheese, food/Spices,
food/Chocolate, food/Pizza, history/Vikings, history/Knights.

### What changed on 2026-07-19 (4+ age-appropriateness pass — 1836 → 1822)

Triggered by the Fact of the Day surfacing *"A Famous Nature Documentary Faked Lemming 'Suicide'"* — the
app is rated **4+** and every fact is also an Instagram carousel candidate via `nib-social`, which burns
`headline`, `summary`, **and** `body` into slide images. The library had **no age rule at all** until now.

- **New rule: `fact-writing-and-quality-guide.md` §9 — the 4+ hard gate.** Auto-reject categories
  (self-harm, execution methods, torture, murder-as-subject, sexual content, recreational substances),
  a rewrite-instead band, and — importantly — an **explicitly-allowed** list so future passes don't
  over-sanitize (dying stars, the Dead Sea, "died in 1943", educational Nazi-era history, predation).
  Also added to the §6 validation gate as an automatic reject.
- **New script: `pnpm check:age-rating`** (`scripts/check-age-rating.ts`) — screens all three surfaced
  fields, BLOCK/WARN severity, `--warn`/`--json` flags, exits 1 on any BLOCK so it can gate export.
  It is a **regex prefilter with a deliberately high false-positive rate** ("icy *bodies*", trades
  "*executed* by computer", Poe's *"The Murders in the Rue Morgue"*) — **read every hit.** Confirmed
  false positives go in the script's `ALLOWLIST` **with a written justification** (1 entry so far).
- **14 facts removed** where the graphic detail *was* the hook: the lemming one, `captain-kidd-executed`,
  `blackbeard-killed-at-ocracoke`, `werewolves-human-wolf`, `sleepwalking-partial-waking`,
  `rock-hard-to-define`, `praying-mantis-raptorial-forelegs`, `walking-under-ladders-gallows`,
  `female-pirates-fought-capture`, `female-pirates-rackham-crew`, all three `forensic-entomologists-*`,
  `drawbridges-protected-weak-gates`, `french-revolution-louis-xvi`.
- **17 facts rewritten** per §7 (id kept, only headline/summary/body/tags/readTime changed), re-hooking
  claims already in the body — e.g. Captain Kidd keeps the pirate-hunter irony without the execution;
  Pompeii keeps the plaster-cast technique without the decomposition; the OED keeps the crowdsourcing
  and the asylum cell without the killing; the lemming fact survives as a **media-deception** fact.
- **1 topic dropped:** `strange-jobs / Forensic Entomologists` — inherently about corpses, no fact in it
  can clear the gate. Its registry row is now `status=excluded-age-rating` so `scrape:batch` won't
  resurrect it (new status value documented in `source-discovery-and-registry.md`).
- **Collection repointed, not shrunk** (§8 step 7): `your-strange-body` → `sleepwalking-partial-waking`
  replaced with `sleepwalking-childhood-common` (same topic, same angle). All 28 collections resolve.
- **Graph regenerated, not hand-fixed:** `normalize:tags && assign:themes && generate:related &&
  export:facts` → 0 dangling IDs, 0 self-refs. Synced to `Nib/Nib/Data/{facts,collections}.json` and
  `nib-social/public/data/facts.json` (all three at 1822).

> **Note for the next pass:** the CDN at `https://nibapp.net/v1` still serves the old 1836-fact dataset.
> Re-publish via `cdn/build-manifest.sh` to push these removals to already-installed apps.

### What changed on 2026-07-18 (second "wow" weed-out — 1880 → 1836)
Triggered by a real in-app complaint: the daily fact was *"Pokémon Started as Red and Green, Not Red and
Blue"* — true, but flat, and already known to any casual fan. Ran the §8 whole-library audit again.

- **44 removed · 11 rewritten · 9 false flags reversed.**
- **METHOD NOTE — heuristics do not work for this, and this is the second time it's bitten.** A regex pass
  over headline/summary shape (echo-summary, "Is a" copulas, hedged verbs, no-number bodies) flagged **1394
  of 1880 facts (74%)** and included known-good exemplars like *"The Matter in a Paperclip Could Level a
  City"*, which the writing guide cites as a **model** rewrite. "An average adult already knows this" is a
  knowledge judgment, not a text pattern. **Read the headlines; use regex only to sort reading order.**
  - 9 of my own flags were reversed on reading the body — e.g. *"No One Owns the World Wide Web"* (the
    "never patented it, gave it away" angle is a genuine surprise) and *"To Film a Giant Model, Filmmakers
    Have to Fake Physics"* (body is concrete: chemicals in the water, slow motion). Both were caught by a
    "vague-sounding headline" rule. A vague-sounding headline over a concrete body is a **rewrite**
    candidate at worst, never a removal.
- **Removal reasons:** 8 redundant with a stronger topic sibling · 2 cross-category duplicates
  (`psychology/Dreams` and `psychology/Body Language`→crossed arms were both covered far better in
  `sleep-dreams` and `human-behavior`) · 34 textbook/obvious/vague with no salvageable gem.
- **6 topics dropped to zero and were removed:** `psychology/Dreams`, `ai/Autonomous Vehicles`,
  `internet-culture/Podcasts`, `engineering/Pulleys`, `food/Sushi`, `human-body/Hormones`.
- **Held back by human review:** *"Viking Helmets Didn't Have Horns"* was proposed for removal as
  common knowledge and **kept** — it also anchors the `everything-you-know-is-wrong` collection.
  *"Chuck Yeager First Broke the Sound Barrier"* was removed (its sibling, the whip tip as the first
  supersonic object, is far better).
- **Collections repointed, not deleted** (§8 step 7): `everything-you-know-is-wrong` →
  `crossed-arms-not-always-defensive`, `great-transformations` → `popcorn-expands-40-times`,
  `where-names-come-from` → `bluetooth-direct-device-talk`.
- **Verified clean:** CSV 1836 == facts.json 1836 · 0 dangling relatedFactIds · 0 self-refs · 0 dup ids ·
  0 dangling collection refs · no topic > 3 · all 11 rewritten bodies 66–76 words, 0 summary echoes.
- **CDN v7 STAGED, awaiting manual upload** (see below).

#### CDN state — CORRECTED 2026-07-18 (earlier notes in this doc were WRONG)
**`cdn.nibapp.net/v1` was serving `contentVersion` 6, not 4.** Verified by fetching the live manifest:
it returns v6 and its three sha256s match the locally staged manifest byte-for-byte, so **v6 was published
at some point and nobody recorded it.** Older notes here and in memory claiming "v5 staged, never uploaded,
live = v4" were stale and have caused version confusion twice. **Always `curl` the live manifest before
choosing the next version — do not trust these notes.**
- Next version is therefore **7**, now built and staged in `nib-content-workflow/exports/`.
- **`exports/collections.json` was stale** and had to be synced from `Nib/Nib/Data/collections.json`
  (it was missing this pass's 3 repoints). `export:facts` only writes `facts.json` — **`categories.json`
  and `collections.json` are NOT regenerated by the pipeline and must be copied by hand.** `categories.json`
  was already identical, so only collections needed syncing.
- Staged v7 payload verified: contentVersion 7 · schemaVersion 1 · all 3 checksums recomputed and matching ·
  1836 facts · 55 categories · 28 collections · 0 dangling collection refs · 0 dangling relatedFactIds ·
  0 facts with an unknown categoryId.
- **Upload order matters:** `facts.json`, `categories.json`, `collections.json` **first**, then
  `manifest.json` **last** — otherwise a client can read a manifest pointing at files that aren't up yet.

#### Attribution reword pass (same day, 2026-07-18) — DONE, 10 bodies fixed
Cleared the §5 source-attribution leaks found during the weed-out. **Body text only — no headline,
summary, id, or `readTimeSeconds` changes** (every edit moved word count by ≤3, so the stored read times
stay valid). Three distinct cases, handled differently — the lesson is that **"names a source" is not one
bug, and a blanket regex cut would have damaged three good facts:**

1. **True citation leaks → cut outright.** A *modern* source quoted as an authority.
   `viral-content-small-enough-email` + `viral-content-ocean-spray-doggface` ("MadeDaily explains/
   describes…"), `imax-sideways-film` ("Film Atlas describes IMAX as…"). Cutting the citation left IMAX
   opening with two consecutive "IMAX…" sentences, so the seam was smoothed to "It's a 15-perforation…".
2. **Legend/tradition hedges → kept the hedge, dropped the "According to" framing.** §5 explicitly allows
   a plain hedge, and past passes already ruled narrative "Legend/Tradition says" is NOT a leak.
   `columns-capitals-show-style` (→ "One ancient story says…"), `medieval-castles-defense-layers` (→
   "Tradition holds that…"), `forks-replaced-table-knives` (→ "As the popular story goes…"),
   `marco-polo-il-milione` (→ "In a well-known account…").
3. **Ancient/primary sources → made the document the SUBJECT, not a citation** (§5 "the org *is* the
   fact" exception). `caesar-cipher-julius-caesar` (→ "The Roman historian Suetonius recorded that…"),
   `loch-ness-surgeons-photo-hoax` (→ "A biography of Saint Columba records that…"). Suetonius and the
   Columba *vita* are the *only* reason we know these claims — deleting them would weaken the fact.

**Two deliberately NOT touched:** `bauhaus-short-life-long-shadow` — "protected as a UNESCO World Heritage
Site" is the **name of the designation**, not an authority being quoted (§5 exception). And
`microwaves-mass-production` — "This explains the microwave's quirks" was a regex false positive.
Also left `relativity-redefined-space-time` semantically intact, only tightening "According to relativity"
→ "Under relativity" (naming a theory was never a violation).
Re-ran the full pipeline + app sync; 1836 unchanged, 0 dangling/self-refs/dup ids/dangling collection refs.
Note `viral-content-small-enough-email` is now 55 words — **do NOT pad it**; sub-60 bodies are a documented
threshold artifact and padding-to-quota is the root cause of the original flat facts.

### What changed on 2026-07-15 (headline pass — hook + stand-alone rule)
- **KEY CORRECTION — the `headline` is NOT the notification copy.** `NotificationService.notificationContent`
  (`Nib/Services/NotificationService.swift`) builds the daily push as a fixed `title = "Today's Fact"` plus
  `body = fact.summary`. The headline is *deliberately* omitted (it truncates on one line) — a decision made in
  commit `2127954` (2026-07-03) and **locked by the test** `testContentLeadsWithTitleAndSummary`. The old guide
  §4 claim that "headline + summary are the two lines of a push notification" was **stale and has been fixed.**
  - `summary` = notification body **and** the small-widget copy. `headline` = Today hero (wraps, never truncates),
    medium widget (2 lines), `accessoryInline`/`accessoryRectangular`, share card, **Spotlight title**, Siri snippet.
- **Read all 1,881 headlines. Only 73 (3.9%) needed work** — the library was already strong (passes 1–2 did the
  heavy lifting; zero definitional "X Is a Y" copulas remained). Candidates: `approved-content/headline-candidates.csv`.
- **Tier A — 19 "orphaned" headlines rewritten (a real bug, not taste).** These only parsed next to their topic
  label, but the headline renders in Spotlight/widgets where **no topic is shown** — e.g. *"The American Revolution
  Helped Trigger It"* (topic: French Revolution), *"Its Feathers Reveal How Flight Began"*, *"His Slave May Be the
  True First to Circle Earth"*. **New rule added to guide §4: a headline MUST stand alone without its topic** —
  no anaphoric `Its/Their/His/She/It`, no bare `The Test`/`The Color`. Cataphoric `This`/`That` is fine when
  self-contained (*"This Island Used Giant Stone Coins Too Heavy to Move"*) and was left alone.
- **Tier B — 54 flat headlines rewritten** by elevating a concrete detail already in the body (guide §7), e.g.
  *"Hammurabi Created a Famous Law Code"* → *"Hammurabi Carved 300 Laws on a Pillar for All to See"*;
  *"Winglets Can Reduce Fuel Use"* → *"Bending a Wingtip Cut a Jet's Fuel Use by 6.5 Percent"*. Nothing invented —
  every rewrite is grounded in its own body text.
- **`summary` field needed no pass.** An echo/novelty scan over all 1,881 found only **3 true echoes** + 2 real
  deflations (headline carried a number the summary hedged away). All 5 fixed, plus a grammar bug in
  `sacagawea-shoshone-horses`'s summary (missing "whom").
- **Odds and ends:** dropped `emojis-unicode-standard` — an exact duplicate of `emojis-japanese-name` (same 1999/176-icon/MoMA
  fact in two categories; kept the richer one, which names Shigetaka Kurita). That emptied **`internet-culture/Emojis`**
  → topic dropped (`languages/Emojis` keeps 3 facts). Fixed "Airbags"→"Air Bags" and "Pokemon"→"Pokémon".
- Pipeline re-run (0 dangling, 0 self-refs), app `facts.json` synced at **1880**. **CDN v5 re-staged with new
  checksums, still NOT uploaded** (needs R2 creds). Live is still v4.
- Backup: `approved-content/approved-facts.backup-20260715-09*.csv`.

#### Same-day follow-up audit (body / typography / metadata)
- **7 named-source attribution leaks removed from bodies** (guide §5: never name the source) — textbook-dump
  residue: *"Cornell Lab says…"* ×3 (Ravens), *"UNESCO says…"*, *"The Pokémon Company says…"*, *"Film Atlas says…"*,
  *"Hartzell says…"*. The claims were kept; only the framing went. **Not** leaks and deliberately left alone:
  narrative *"Legend says" / "Folklore says" / "Tradition says"*, and Topology's rhetorical closer *"Topology says so."*
- **Curly → straight apostrophes** across all text fields (guide §8): 4 headlines, 17 summaries, 4 bodies.
- **6 thin bodies enriched from cached sources** in `sources/` (742 cached .md files; 98% topic coverage).
  Also fixed a **body-level orphan**: the wiper body said *"Anderson's invention"* without ever introducing her →
  now names Mary Anderson + the 1903 trolley/patent detail.
  - **De-overstated a headline:** the Dwarf Planets source says the IAU expects *"perhaps more than a hundred"*,
    but the body claimed "hundreds" and the new headline amplified it → now *"…but Many More Are Out There."*
  - **3 of the 9 left alone on purpose** (`venus-day-longer-than-year`, `white-dwarfs-no-black-dwarfs-yet`,
    `voyager-program-interstellar-space`): their sources offered nothing the body didn't already say, so expanding
    would have been padding.
  - `readTimeSeconds` recomputed for those 6 only (corpus median **0.70 s/word**; the field is stored in the CSV and
    merely passed through by `export-facts.ts:41` — **nothing recomputes it, so it goes stale whenever a body changes**).
- **DELIBERATELY NOT DONE — do not "fix" the remaining 232 short bodies.** The <60-word count looks alarming but is a
  threshold artifact: only 9 were genuinely thin (<50w); **157 (66%) sit at 55–59w**, i.e. ~5 words under. Lifting all
  238 to 60 needs just ~1,126 words total (**~4.7 words each**) — that is padding, and padding-to-hit-a-quota is the
  *documented root cause* of the flat facts pass 1 had to delete. Median body is 72w, nothing exceeds 90w. **Leave it.**

#### Known follow-up: `featured` is a dead column
`featured` is `false` for all 1,880 rows, and **`Nib/Models/Fact.swift` has no `featured` property** — the app never
decodes it. (The app's "featured" code is about featured *collections*, picked at runtime by `FeaturedCollectionPicker`.)
Yet `export-facts.ts:42` serializes it into every fact, so it ships in the 2.2MB bundle **and** the CDN payload.
`themes` is in the same position (exported, absent from `Fact.swift`) — but it likely feeds `generate:related` at build
time, so check before removing. Dropping either is a schema/CDN change, deferred by the user.

### What changed on 2026-07-15 (pass-2 weed-out — obvious/well-known lens)
- **Pass-2 weed-out: 1928 → 1881 (47 removes, all cuts, no rewrites).** A second, sharper pass on top of the
  2026-07-14 flat-fact weed-out, using a lens pass 1 missed: cut facts **obvious to a modern adult** or
  **well-worn "everyone's heard it" factoids** (exemplar: *"Digital Signatures Became Legally Equal to Written
  Ones"*). Candidates were pre-flagged into `approved-content/pass2-candidates.csv` (Tier A = confident cuts,
  Tier B = well-known classics for the user's call).
- **Decision: Tier A only (46) + glass.** User kept **all 19 Tier B classics** (honey never spoils, sun
  8-min-old, banana DNA, sharks older than dinosaurs, Beethoven going deaf, etc.). The one exception —
  *"Glass Is Technically a Frozen Liquid"* — was cut despite being Tier B because it's an **accuracy** problem
  (glass is an amorphous solid, a misconception, not an editorial call). = **47 total.**
- **Dropped emptied topic `technology/Cryptography`** (its only remaining fact was the digital-signatures one;
  fully redundant with the `secret-codes` category, which keeps its own Cryptography topic).
- Ran the full pipeline (normalize:tags → assign:themes → generate:related → export:facts): **0 dangling
  relatedFactIds, 0 self-refs.** Synced `Nib/Nib/Data/facts.json` (1881). CSV count == facts.json count == 1881,
  no dup ids, no topic > 3.
- **Fixed 4 dangling `collections.json` refs:** repointed 2 to the best same-topic survivor — *Great
  Transformations* → `states-of-matter-familiar-three`, *Time Plays Tricks* → `light-years-looking-back-time`;
  **dropped 2** where the removed fact was the collection's thematic anchor and no on-theme survivor existed —
  *Where Names Come From* (lost the marathon-name fact) and *Rise of the Machines* (lost the Deep-Blue fact),
  each now 5 facts.
- **CDN v5 staged, NOT uploaded.** `exports/manifest.json` bumped to **contentVersion 5** (facts + collections
  checksums changed; categories unchanged). Upload the 3 JSON files then `manifest.json` last to the R2 bucket
  per `cdn/README.md`, then verify `curl -s https://cdn.nibapp.net/v1/manifest.json | grep contentVersion`.
  **Note:** pass-1 **v4 is confirmed live** (verified 2026-07-15: 200 + matching shas) — the earlier "still v3?"
  worry is resolved; v5 is the only pending drop.
- Backup / audit trail: `approved-content/approved-facts.backup-20260715-090418.csv` +
  `approved-content/pass2-candidates.csv`.

### What changed on 2026-07-14 (major library edit — reproduce via curation-guide §8)
- **Flat-fact weed-out: 2187 → 1928.** Read every fact; flagged 284 flat ones (the 4 red-flags now in
  `fact-writing-and-quality-guide.md` §3 — textbook-def / vague-abstract / obvious / incremental-process, e.g.
  *"Espresso Cut Brewing Time to 30 Seconds"*). **Rewrote 25** (elevated a buried gem, kept `id`), **removed
  259**, dropped 2 emptied topics (`engineering/Bearings`, `internet-culture/Reaction GIFs`). Ran the full
  pipeline (normalize:tags → assign:themes → generate:related → export:facts), synced
  `Nib/Nib/Data/facts.json`, fixed 5 dangling `collections.json` refs. Audit trail:
  `approved-content/flat-fact-decisions.csv` + `approved-facts.backup-20260714-*.csv`.
- **Rule relaxed:** "exactly 3 per topic" → **"up to 3, quality-gated."** Both `fact-writing-and-quality-guide.md`
  and `topic-curation-and-quality-guide.md` now say this; padding to 3 was the root cause of the flat facts.
- **Fun Score removed** from the workflow (it wasn't a reliable indicator). Validation is now the pass/fail
  tests in `fact-writing-and-quality-guide.md` §6, no numeric score.
- **Docs consolidated 10 → 6:** merged the 3 writing docs into `fact-writing-and-quality-guide.md`; merged
  `trusted-source-workflow` into `source-discovery-and-registry.md`; folded `related-fact-ids-guide` into
  `content-schema-reference.md`.
- **Roadmap rewritten fascination-first:** 6 flat-prone upcoming categories (Philosophy, Money & Personal
  Finance, Energy & Power, Mirrors, Art, Ships) swapped for high-curiosity ones (Survival & the Body's
  Limits, Forensics, Poisons/Venom & Toxins, Perfume & Smell, Microscopic Life, Heists/Escapes & Cons);
  seasonal weight moved onto the Collections. See `content-expansion-roadmap.md`.
- **CDN:** v4 drop staged in `nib-content-workflow/exports/` (facts + collections checksums changed);
  publish per `cdn/README.md`. Confirm live version with `curl cdn.nibapp.net/v1/manifest.json`.

- All 55 categories were rewritten via this workflow. Categories: space, astronomy, history,
  ancient-civilizations, animals, ocean-life, human-body, psychology, food, coffee, technology,
  artificial-intelligence, internet-culture, video-games, movies, music, sports, engineering, aviation,
  cars, physics, chemistry, mathematics, business, economics, literature, languages, architecture,
  myths-legends, mysteries, medicine, geography, weather, inventions, religion-beliefs, dinosaurs,
  ancient-creatures, pirates, castles-fortresses, famous-disasters, strange-jobs, everyday-objects,
  household-science, famous-symbols, colors, sleep-dreams, illusions-perceptions, secret-codes,
  superstitions, human-behavior, explorers, famous-trees-plants, insects, strange-places,
  human-civilization.
- **Recent additions:** medicine, geography, weather, inventions, religion-beliefs (2026-06-29) →
  dinosaurs, ancient-creatures, pirates, castles-fortresses, famous-disasters (2026-06-29) →
  strange-jobs, everyday-objects, household-science, famous-symbols, colors (2026-06-30) →
  sleep-dreams, illusions-perceptions, secret-codes, superstitions, human-behavior, explorers,
  famous-trees-plants, insects (2026-07-01) → strange-places, human-civilization (2026-07-02).
- **Facts-per-topic distribution (post-weed 2026-07-14):** 565 topics at 3 facts · 71 at 2 · 91 at 1.
  Topic *count* per category is unchanged from the pre-weed layout (most ~15 topics; the 20 newest
  categories ~10; `history`/`space` deepest) — the weed-out only reduced facts *within* topics, so many
  topics now run 1–2. **No topic exceeds 3.** Don't "top up" 1–2-fact topics back to 3.

## The standing pattern (what the user expects each time)
When the user says "new category of X added, run the same process," do exactly this:

1. **Locate the category id** (it's usually not literally what they call it — e.g. "castles" was actually
   the `architecture` category; "myths & legends" -> `myths-legends`). Find it by listing `categoryId`
   counts and looking for the new/odd one.
2. **Back up first:** `cp approved-facts.csv "approved-facts.backup-<cat>-$(date +%Y%m%d-%H%M%S).csv"`
3. **Inspect structure** (confirm no topic exceeds 3; 1–2 is fine) and **dump all facts** with full bodies.
4. **De-dup grep (critical — see below).** Grep the new category's subjects/topics against the rest of
   the dataset to find collisions, and reroute angles before proposing.
5. **Propose the full slate** as a compact table (one "wow" angle per fact), then call AskUserQuestion to
   approve. The user has approved "Approve all, write them" every time — but still ask.
6. **Write all rewrites** in a throwaway Python script (template below), keep id/topic/relatedFactIds,
   swap only headline/body/summary/tags.
7. **Run integrity check (section 5e).** Then `rm` the script.
8. **Update memory** (`nib_content_pipeline_state.md` + the `MEMORY.md` index line with the new
   fact/category counts and any new de-dup decisions).
9. **Update THIS handoff doc** (required — do not skip): bump the `Last updated` line and the
   **Current state** section (new totals, add the category to the list + size-exceptions), and add any
   notable new angle-ownership to **The de-dup discipline** so future categories avoid it. The memory
   file holds the exhaustive log; this doc holds the running state + the high-value landmines.
10. Tell the user to re-export with `pnpm export:facts` when ready (do NOT run the export yourself).

## House style (full rules: `fact-writing-and-quality-guide.md`)
- **headline:** leads with the surprise, Title Case, no definition.
- **body:** ~60–90 words (aim 65–80), conversational "curious friend over coffee," grade 6–8, ends on a
  punchy line. **Drop all "Britannica explains/defines" framing entirely.**
- **summary:** one-sentence teaser that adds intrigue (not an echo of the headline).
- **tags:** 3–4 lowercase, comma-separated.
- Use plain ASCII in the script (write `CO2` not the subscript form, `Ragnarok` not `Ragnarok` with
  diacritics, `Gaudi`/`Chretien`/`Kongo`/`Brasilia` without accents, straight quotes). The matcher's
  `norm()` handles curly->straight quotes in old headlines.

## The de-dup discipline (the part that matters most)
Later categories overlap earlier ones HARD. Before writing, grep planned subjects against the whole
dataset (excluding the current category) and reroute any hit. Established collisions already handled — a
new category must keep avoiding these:

- **engineering/Concrete** owns cement-vs-concrete, water ratio, **Roman self-healing concrete**.
- **engineering/Gears** owns the **Antikythera "analog computer" + Olympic dial**.
- **engineering/Suspension Bridges** owns Tacoma Narrows + cable-spinning; **engineering/Elevators** owns
  Otis; **engineering/Earthquake Engineering** owns tuned-mass dampers.
- **languages/Writing Systems** owns **Linear A & rongorongo** (undeciphered scripts);
  **ancient-civ/Indus Valley** owns the Indus script; **ancient-civ/Phoenicians** owns
  Phoenician-alphabet->Greek.
- **ancient-civ/Ancient Egypt** owns sacred cats + Tut's tomb; **ancient-civ/Ancient Rome** owns the
  flooded Colosseum; **ancient-civ/Minoans** owns bull-leaping/Knossos.
- **history/Printing Press** owns Korea-pre-Gutenberg, the Gutenberg lawsuit, ~40 surviving Bibles;
  **history/Renaissance** owns Brunelleschi; **history/Ancient India** owns Mohenjo-daro.
- **literature** owns: Atlantis-from-Plato, Norse-gods-as-weekdays, the hero's-journey/Star Wars,
  Dracula/Vlad, the sea-foam Little Mermaid, and the Grimm/6000-year-old fairy-tale angles.
- **ocean-life/Giant Squid** owns "first filmed 2012."
- **Columbus** is now used in history (Age of Exploration) and myths-legends (manatee "mermaids") —
  avoid further reuse.
- **business + economics are adjacent and angle-overlap-prone** (tulip mania->business/Stock Market,
  shipping container->business/Trade, comparative advantage / "I, Pencil"->Trade, negative oil / Veblen
  goods->Supply & Demand). Check both when touching either.

### Newer high-value landmines (added through 2026-06-30; full per-category log is in memory)
- **physics/Sound** owns **Krakatoa** "loudest sound" + the Krakatoa eruption noise. **physics/Light**
  owns the EM-spectrum "visible light is a tiny slice." **physics/Electricity** owns "lightning is 5x
  hotter than the sun" + the doorknob-shock. **physics/Relativity** owns "GPS needs relativity."
- **geography/Volcanoes** owns **Pompeii's killer = pyroclastic surge** (not lava). **languages/Palindromes**
  owns the **Pompeii Sator square**. So a Pompeii/volcano fact must dodge both.
- **chemistry/Polymers** owns **"Teflon was a lucky accident."** **chemistry/Catalysts** owns **enzymes**
  + the catalytic converter. **chemistry/Radioactivity** owns bananas-are-radioactive + paper-vs-lead
  shielding (but NOT americium-in-smoke-detectors). **chemistry/Covalent Bonds** owns "diamond is one
  giant molecule."
- **food/Popcorn** owns popcorn (so the microwave-discovery fact uses the melted chocolate bar, not
  popcorn). **human-body/Taste Buds** owns the tongue-map myth + taste-cell renewal (keep food-taster
  facts off taste-bud-count). **medicine/Germ Theory** owns Semmelweis/handwashing (soap facts stay on
  the molecule).
- **ocean-life/Sharks** owns "sharks don't have bones" + "older than dinosaurs" (so megalodon avoids the
  cartilage/teeth-only + shark-age angles). **ocean-life/Deep Sea** owns Mariana-deeper-than-Everest.
- **space/Asteroids** owns *general* asteroid facts but NOT Chicxulub/the dino-killer (that's
  famous-disasters + dinosaurs). **space/Sun** owns "the Sun creates Earth's auroras."
- **history/Golden Age of Piracy** owns Black-Bart-400-vessels + privateer-turns-pirate + pirates-as-
  exaggerated-news. **history/Space Race** does NOT own Challenger (free).
- **inventions/Radio** owns the **coconut-shells-for-horse-hooves** Foley trick. **architecture/Castles**
  owns clockwise-stairs + garderobe-toilets + Neuschwanstein-fairy-tale-fake.
- **Thomas Midgley / Freon / ozone / leaded gas** now live in **household-science/Refrigerators** — grep
  before any cars/chemistry/environment category.
- **De-extinction (Colossal)** used once (ancient-creatures/Woolly Mammoths). **Einstein** appears in
  physics/Relativity AND household-science (the Einstein fridge) — distinct angles, OK.
- **mathematics/Infinity** owns Cantor + Hilbert-Hotel + 0.999=1 (the CONCEPT of infinity);
  **mathematics/Topology** owns "Möbius strip has only one side"; **mathematics/Calculus** owns "integral
  sign is a 300-yr-old S." So **famous-symbols/Infinity Symbol** stuck to the GLYPH (Wallis-1655 /
  lemniscate / forever-jewelry) and **Recycling** used Möbius only as inspiration, never the one-sided
  property.
- **pirates/Jolly Roger** owns the pirate-flag angle (3 facts: red flag, false friendly flags, custom
  captain flags). **famous-symbols/Skull & Crossbones** therefore avoided pirates entirely → owns
  **Mr. Yuk** (kids found the skull appealing, 1971), Victorian ridged cobalt poison bottles, and the
  winged death's-head gravestone.
- **myths-legends/Egyptian Religion** owns "heart weighed against a feather." So **famous-symbols/Heart
  Symbol** rerouted off Egypt → owns **silphium-seedpod origin**, Aristotle's cardiocentrism ("learn by
  heart"), and **Milton Glaser's I♥NY (1977) made the heart a verb**.
- **famous-symbols** now owns these symbol/typography anchors — grep before any symbols/punctuation/
  currency-sign/typography category: ampersand = fused e+t Latin "et" + "and-per-se-and"-27th-letter +
  **Tironian et (⁊) on Irish road signs**; checkmark-means-WRONG-in-Japan/Korea/Finland (correct = circle
  maru) + Roman "V"-for-veritas theory + **X was the old "I agree" mark**; Greek-question-mark-is-a-
  semicolon + Spanish-¿-(official-1754) + "qo"-from-quaestio; **dollar sign from the Spanish peso "ps"**
  (predates the US) + "dollar"=thaler←Joachimsthaler (a Czech valley) + Pillars-of-Hercules theory;
  peace-sign = semaphore N+D + despair-figure-Holtom-never-copyrighted + John-Birch-"broken-cross" smear;
  yin-yang DOTS-are-the-point + 陰陽=shady/sunny-hillside + the-taijitu-swirl-is-younger-than-the-idea;
  recycling = 1970-student-contest-never-trademarked + resin-codes-arent-a-recyclability-promise +
  forgotten-3rd-arrow.
- **colors vs physics/chemistry/ancient-civ/cars/architecture/aviation (a big overlap cluster).**
  **physics/Light** owns "visible light is only a tiny slice" (the wavelength/spectrum framing) → every
  colors fact dropped nanometers/spectrum framing. **ancient-civ/Phoenicians** owns "Royal Purple Came
  From the Phoenicians" (murex→royal→got-rich) → colors/Purple took distinct angles (250k-snails-per-
  ounce/stench, **Perkin's mauve 1856**, cardinals-wear-red-after-1453). **cars/Tires** owns carbon-black
  → colors/Black used **iron-gall ink** instead. **architecture/Bridges** owns Golden-Gate "International
  Orange" AND **aviation/Flight-Recorders** owns "black boxes are actually orange" → colors/Orange dropped
  safety-orange (used **saffron**). NOTE: **languages does NOT own color-naming** (color-term order /
  Homer's wine-dark sea / "blue named late" are FREE) — colors/Blue used the Homer/no-word-for-blue wow.
- **colors** now owns these color/pigment/dye anchors — grep before any color/light/pigment/perception
  category: gold-leaf-see-through + **Lycurgus-Cup gold nanoparticles** + gold-is-yellow-from-relativity;
  **Vantablack + Kapoor-vs-Semple pink war** + true-black-was-a-luxury-dye + iron-gall-ink; **blue is the
  rarest natural color (structural color, crush-the-feather)** + Homer-no-word-for-blue + ultramarine =
  ground lapis; **Scheele's/Paris green arsenic wallpaper (Napoleon)** + eyes-most-sensitive-to-green +
  green-screen-is-farthest-from-skin-tone; **Newton added indigo to force 7 rainbow colors** + jeans-blue-
  from-air-oxidation/dye-coats-only-the-surface + synthetic-indigo-BASF-killed-the-crop; **color named
  after the fruit (robin redbreast)** + carrots-were-purple + saffron; **pink isn't in the rainbow (brain
  invents it)** + pink-was-once-the-boys'-color + **Baker-Miller/drunk-tank pink**; **cochineal = red food
  dye is crushed bugs** + red-ochre-oldest-pigment + **bulls are red-green colorblind (it's the motion)**;
  **lead-white/ceruse makeup poisoned Elizabeth I** + **titanium-dioxide is in your toothpaste/candy** +
  white=mourning-in-much-of-Asia.
- **sleep-dreams vs psychology (the biggest collision — psychology owns BOTH `Sleep` and `Dreams`).**
  psychology/Sleep owns babies-dream-half + **half-brain/unihemispheric sleep (dolphins)** + why-we-sleep-
  unknown; psychology/Dreams owns dreams-less-weird + **the plain "lucid dreamers know they're dreaming"
  definition (+ can direct it)** + **recurring-dream themes (flying/chased/naked/late)**. sleep-dreams
  dodged all of these → Lucid Dreaming used only lab-proof angles (LaBerge eye-signals / 2021 two-way
  conversation / dream-time≈real-time); REM used 1953-discovery / paradoxical-sleep / RBD-acting-out (NOT
  babies/half-brain/why); Nightmares used mara-etymology / night-terrors-are-different / rewrite-the-
  ending (NOT recurring themes). Also: **strange-jobs/Professional-Sleepers** owns NASA-bedrest → Naps used
  Dali/Edison-key-drop instead; **coffee/Caffeine** owns caffeine → skipped the coffee-nap; **animals**
  only owns bees-winter-cluster (hibernation/torpor free); **myths-legends does NOT own sleep-paralysis
  folklore** (Old-Hag/kanashibari/Fuseli/alien-abduction free).
- **sleep-dreams** now owns these sleep/dream anchors — grep before any sleep/dream/brain/consciousness
  category: bears-months-no-bathroom-recycle-urea + **wood-frogs-freeze-solid** + arctic-ground-squirrel-
  below-freezing; **LaBerge eye-signal proof** + 2021-two-way-dream-conversation + dream-time=real-time;
  **nightmare = mara demon (not a horse)** + night-terrors-are-NREM-no-memory + imagery-rehearsal-therapy;
  **Kenneth-Parks-1987-sleep-drove-and-killed-acquitted** + sleepwalkers-eyes-open/no-memory + waking-a-
  sleepwalker-is-safe-myth; **90+-decibel snores** + **didgeridoo-reduces-snoring/apnea** + heavy-snoring=
  apnea; **REM-discovered-1953-darting-eyes** + paradoxical-sleep + **RBD-acting-out-dreams**; **fatal-
  familial-insomnia (prion)** + **Randy-Gardner-11-days-1964** + DEC2-short-sleeper-gene; **Michel-Siffre-
  cave** + **de-Mairan-1729-mimosa** + non-visual-eye-cells-set-the-clock; **Dali/Edison-nap-with-a-key** +
  sleep-inertia + afternoon-dip-is-circadian; sleep-paralysis=mind-wakes-body-locked + **Old-Hag/
  kanashibari/Fuseli/alien-abduction** + back-sleeping-triggers-it.
- **illusions-perceptions vs psychology + human-body + movies (perception/vision cluster).**
  **psychology owns an `Optical Illusions` topic AND a `Perception` topic** — it owns 'illusions trick
  your brain', **'you can't always unsee an illusion'**, phantom-limb mirror therapy, 'brain constructs
  reality', 'two people perceive differently', and **'brain fills in missing information'**. **human-body/
  Eyes** owns **the blind spot** ('Each of Your Eyes Has a Hole in Its Vision': gap + brain-fills-it +
  dot-test) + 'retina is part of the brain'. **movies/3D-Movies** owns '3D tricks each eye'. So illusions-
  perceptions REROUTED: Blind Spots dropped the hole/fill-in/dot-test (used 9-Moons-size / saccadic-
  masking / averted-vision); Impossible Shapes dropped 'can't unsee' (used trident-joints / Penrose-Escher
  loop / buildable-Penrose); Depth Perception avoided 3D-each-eye (used Magic-Eye / stereoblindness /
  Moon-illusion); Pareidolia + The Dress stayed concrete, not psychology's generic 'brain builds reality'.
  NOTE: physics/Light does NOT own refraction/mirage; colors owns pigments NOT color-constancy/The-Dress.
- **illusions-perceptions** now owns these perception anchors — grep before any perception/vision/optics
  category: **Magic-Eye stereograms** + **stereoblindness/Stereo-Sue** + **Moon-illusion**; **Fata-Morgana
  (Flying-Dutchman)** + desert-oasis-is-the-sky + **Novaya-Zemlya-see-the-sun-after-sunset**; **Face-on-
  Mars-was-a-hill** + **$28,000-Virgin-Mary-grilled-cheese** + cars/outlets-look-like-faces; color-
  reversed-flag-afterimage + afterimage=fatigued-cone-cells + **Troxler-fading**; **blind-spot-hides-9-
  Moons** + **saccadic-masking (can't see your eyes move in a mirror)** + **averted-vision**; **Adelson
  checker-shadow** + **strawberry-illusion (no red pixels)** + simultaneous-contrast; impossible-trident-
  joints + **Penrose↔Escher loop** + **buildable-Penrose-triangle (Perth)**; **motion-aftereffect/
  waterfall-illusion** + Rotating-Snakes-peripheral-only + **wagon-wheel-effect**; **LOTR-hobbits-forced-
  perspective** + **Ames-Room** + **Disney-castles-shrink-upper-floors**; **The-Dress-was-blue-and-black**
  + white-gold-vs-blue-black-tracks-lark-vs-owl + **Yanny-or-Laurel**.
- **secret-codes vs technology + mathematics + languages + famous-symbols + ai + mysteries + history.**
  **technology/Cryptography** owns the kryptos etymology + code-vs-cipher distinction + digital-signatures;
  **mathematics/Prime-Numbers** owns **RSA / hard-to-factor primes**; **famous-symbols/Peace-Symbol** owns
  **semaphore = N+D**; **ai/Turing-Test** owns the Turing Test + Chinese Room (NOT Turing's codebreaking);
  **languages** owns **Morse-Code** (3 facts) + **Hieroglyphics** (Rosetta) + **Writing-Systems**
  (undeciphered Linear-A/rongorongo); **mysteries/Voynich** owns the Voynich manuscript. So secret-codes
  rerouted: Cryptography → Kerckhoffs / al-Kindi-frequency-analysis / public-key-exchange (NOT etymology/
  code-vs-cipher/digital-sigs/RSA/hieroglyphs); Semaphore → Chappe / Blanc-hack / Nelson-Trafalgar (NOT
  peace-sign N+D); Enigma → letter-never-itself-flaw / Rejewski / shortened-war-secret (NOT Turing-Test);
  Book-Cipher → Beale/Benedict-Arnold (NOT Voynich). NOTE: history does NOT own Enigma/Bletchley/code-
  talkers/Trafalgar (all free).
- **secret-codes** now owns these code/cipher/espionage anchors — grep before any codes/cipher/spy
  category: **Ovaltine-decoder-ring (A Christmas Story)** + Caesar-shift-3-weak + **ROT13-self-undoing**;
  **Kerckhoffs-no-security-through-obscurity** + **al-Kindi-invented-frequency-analysis** + **public-key-
  two-strangers-agree-in-the-open**; **Enigma-cant-encode-a-letter-as-itself** + **Rejewski-Poland-broke-
  it-first** + Enigma-secret-shortened-WWII-2yrs-classified-til-1970s; **Chappe-optical-telegraph** +
  **Blanc-brothers-semaphore-stock-hack (first data breach)** + **Nelson-Trafalgar 'England expects'**;
  **Histiaeus-tattooed-scalp** + **WWII-microdots** + **printer-secret-yellow-tracking-dots**; Pigpen-
  looks-secret-but-weak + **Freemason-gravestones-carved-in-pigpen** + Union-POWs-used-pigpen; **one-time-
  pad-Shannon-proved-unbreakable-1949** + **numbers-stations-shortwave-spy-broadcasts** + **Soviets-reused-
  pads-Venona-cracked-them**; **Beale-ciphers-Declaration-of-Independence-treasure** + **Benedict-Arnold-
  book-cipher** + book-cipher-key-is-an-innocent-book; **Spartan-scytale-key=stick-thickness** + scytale=
  transposition + historians-doubt-scytale-was-a-real-cipher; **Navajo-code-never-broken** + **code-
  talkers-punished-for-Navajo-in-boarding-schools** + 'iron-fish'=submarine-code-talker-beats-a-machine.
- **superstitions vs myths-legends + history(Salem) + ancient-civ(Egypt) + religion-beliefs + everyday-
  objects.** Owners were narrow: **myths-legends/Norse** owns Loki → Friday-13th/Lucky-Numbers used Last-
  Supper + Thirteen-Club (NOT Loki-13th-guest); **history/Salem-Witch-Trials** owns the trials → Black-Cats
  used the 1233 papal letter **Vox in Rama** + medieval Europe (NOT Salem); **ancient-civ/Ancient-Egypt**
  owns sacred cats → Black-Cats avoided Egyptian cat-worship; **religion-beliefs/Pilgrimage** owns True-
  Cross relics → Knocking-on-Wood used tic + touch-iron + Tiggy-Touchwood (NOT True-Cross); **everyday-
  objects/Mirrors** owns mirror-test + Venice-craft → Broken-Mirrors stayed on the superstition. FREE
  wins: **animals owns NO Cats/Rabbits/Horses**; religion-beliefs has NO evil-eye/amulet topic (nazar
  free); no Knights-Templar fact exists; psychology doesn't own pick-a-number/illusion-of-control.
- **human-behavior vs psychology (the tightest de-dup in the project).** human-behavior IS body language,
  and **psychology owns a `Body Language` topic AND an `Emotions` topic** that own the generic frame:
  psychology/Body-Language owns 'brain reads body language before you notice' + 'mirroring builds rapport'
  + **'Crossed Arms Do Not Always Mean Anger'** (an EXACT topic collision); psychology/Emotions owns
  **'Forcing a Smile Makes You Happier'** (facial feedback). So human-behavior dodged EVERY generic
  'reveals-emotion / needs-context / mirroring / facial-feedback' angle and used only concrete named
  studies/history: Smiling → Duchenne/innate/Russia (NOT facial feedback); Crossed-Arms → pain-reduction/
  persistence/arm-fold-handedness (NOT 'doesn't mean anger'); Facial-Expressions → Fore-tribe/still-face/
  blind-athletes; Microexpressions → 'Lie-to-Me'/1-25th-sec/TSA-$1B. Also **languages/Emojis** (thumbs-up
  emoji=contract) + **languages/Sign-Language** (deaf-babies-babble) → Gestures used physical-gesture-
  insults + gesture-on-the-phone + Italian-lexicon. RULE: for any body-language/nonverbal/social-behavior
  category, grep **psychology(Body-Language + Emotions) FIRST** and win only with concrete specifics.
- **explorers vs history + a few others (surprisingly free — history owns almost no named explorers).**
  Only 2 real collisions: **history/Age-of-Exploration** owns 'Magellan's Expedition Circled Earth' (5
  ships / first circumnavigation / Magellan died in the Philippines 1521 / most crew died / Elcano finished
  1522) → Magellan rerouted OFF all of that, to **Enrique-of-Malacca (maybe the true first circumnavigator)**
  / named-the-Pacific-then-ate-rats-and-leather / **survivors-lost-a-day (first date line)**; **ancient-
  creatures/Giant-Sloths** owns 'Jefferson Thought Sloth Bones Were a Lion' (and says Jefferson told Lewis
  & Clark to look for living megafauna) → Lewis & Clark avoided the Jefferson-mammoth angle, using only-
  one-death / ~300-new-species / **York (enslaved man who got a vote)**. Also: history/Age-of-Exploration
  owns Columbus + Vikings-before-Columbus; pirates/Privateers owns Drake; myths-legends/Unicorns owns
  Scotland-unicorn (Zheng-He's giraffe framed as a **qilin**, not 'unicorn'); animals/Giraffes owns giraffe
  biology. Cousteau, Shackleton, Ibn Battuta, Marco Polo, Nellie Bly, Amundsen, Zheng He, Sacagawea were
  all completely free.
- **famous-trees-plants vs geography/ocean-life/food/colors/inventions (mostly free — botany barely
  overlaps).** No topic dups, only avoidable framing: **inventions/Light-Bulb** owns 'Edison Tested
  Bamboo' (avoided the filament angle); **colors/Red** owns cochineal-on-cactus (avoided for Cacti);
  **ocean-life/Kelp-Forests** owns kelp (ocean-life does NOT own mangroves — free); **famous-disasters**
  owns the Krakatoa/Fukushima tsunami events (mangrove-tsunami framed on 2004 Indian-Ocean protection);
  **geography/Rainforests** owns only Amazon-specific facts. NO Hiroshima fact exists (Yamaki bonsai free);
  geography does NOT own sequoias/saguaro/redwood.
- **insects vs animals + math + ocean-life + food + coffee + strange-jobs.** KEY: **animals HAS a `Bees`
  topic** (royal-jelly-new-queen / winter-ball / drones-kicked-out) → insects/Bees used waggle-dance /
  lifetime-honey / bees-recognize-faces-and-zero instead; **food/Honey** owns 'Honey Never Spoils' and
  **coffee/Caffeine** owns caffeine-pesticide → avoided both for Bees; **mathematics/Prime-Numbers** owns
  'Cicadas Survive Using Prime Numbers' → Cicadas dropped the prime framing (used 100-decibels / Massospora-
  zombie / 17-yrs-underground WITHOUT 'prime'); **ocean-life/Bioluminescence** owns biolum AND name-checks
  fireflies → Fireflies used are-beetles / synchronous / femme-fatale (not how-the-glow-works); **strange-
  jobs/Forensic-Entomologists** owns forensic maggots (no flies topic made). FREE: mosquito-deadliest/
  malaria, dung-beetle-Milky-Way, termites-are-cockroaches, mantis-3D-glasses/one-ear-bats, Meganeura,
  leafcutter-fungus-farming.
- **strange-places vs geography (the one real collision).** **geography/Lakes** owns 'In the Dead Sea You
  Float Without Trying' (float/buoyancy + lowest-dry-land + 10x-saltier + dropping + 'almost nothing
  lives') → strange-places/Dead-Sea rerouted OFF all of that, to shrinking-sinkholes / world's-first-spa /
  it-floats-up-asphalt-for-mummies. Everything else FREE: Paris-Catacombs (only myths-legends/Egyptian used
  'catacomb'), Darvaza/methane (space/Saturn + mysteries/Bermuda own methane), Blood-Falls-astrobiology
  (space owns Europa-water/Mars-robots, not extremophile-life-model), Lake-Hillier carotenoid/flamingo
  (colors owns pink-PERCEPTION, not lake-algae), Salar-mirror/satellite-calibration, Giant's-Causeway,
  Pamukkale/Hierapolis, Socotra/dragon's-blood-tree. NOTE: for future places/landmarks/wonders categories
  grep **geography (all 15 topics) + mysteries + ancient-civ + ocean-life + colors + space** first.
- **human-civilization — the most overlap-prone category type (abstract "how society works" + everything-
  adjacent).** Strategy: inject CONCRETE facts per abstract topic while dodging owners. Collisions:
  **ancient-civ/Babylonians owns Hammurabi** → Laws led with Ur-Nammu-is-older + Draco + animal-trials;
  **ancient-civ/Persia (Royal Road) + Inca (roads/bridges)** → Roads stayed all-Roman; **history/Ancient-
  India (Indus sewage) + ancient-civ/Indus (well-planned)** → Sewers used Cloaca-Maxima/Great-Stink and
  Cities used Catalhoyuk/Rome-1M/2007-urban; **religion-beliefs/Religious-Calendars (extra-month/Easter)**
  → Calendars used Gregorian-lost-days/month-names/French-decimal; **myths-legends/Dragons ('Here Be
  Dragons')** → Maps used Mercator/orient-east/Babylonian-tablet; **architecture/Urban-Planning (Haussmann/
  jaywalking/Brasilia)** avoided; **food/Bread ('Bread Predates Agriculture') + architecture/Ancient-Temples
  (Gobekli-Tepe)** avoided. **⚠ LATE CATCH — the integrity dup-headlines check caught it: physics/Time owns
  'The Best Clocks Won't Lose a Second in Billions of Years' (atomic clocks).** My Timekeeping atomic-clock
  rewrite was a near-verbatim dup → rerouted to Harrison-marine-chronometer-solved-longitude. LESSON:
  always run the 5e dup-headlines check; broad categories can collide even after anchor-grepping.
- **human-civilization** now owns these anchors — grep before any civilization/infrastructure category:
  farming-was-a-health-disaster + farming-invented-independently-~11-times + corn/teosinte-can't-reproduce-
  without-us; **Gregorian-switch-deleted-days (Oct 1582 / Britain 1752)** + **Sept–Dec-mean-months-7–10** +
  French-Revolution-decimal-10-day-week; **Catalhoyuk-had-no-streets (roof entry)** + Rome-hit-1-million-
  until-London-1800 + **majority-urban-only-since-~2007**; **'money'-from-temple-of-Juno-Moneta** + first-
  coins-Lydia-electrum-Croesus + **Brutus-EID-MAR-'I-killed-Caesar'-coin**; **Persian-qanats** + **Egypt-
  nilometer-flood-sets-taxes** + **Soviet-irrigation-drained-the-Aral-Sea**; **Ur-Nammu-older-than-
  Hammurabi** + **Draco/'draconian'** + **medieval-animal-trials**; **all-roads-lead-to-Rome-Golden-
  Milestone** + Roman-roads-underlie-modern-highways + cursus-publicus-postal-relay; **Cloaca-Maxima-2500yrs-
  had-a-goddess** + **London-Great-Stink-1858** + sanitation-voted-greatest-medical-advance; ancient-hours-
  changed-length-with-seasons + **railways-created-time-zones** + **Harrison-marine-chronometer-longitude**;
  **Mercator-Greenland-vs-Africa** + north-wasn't-always-up-'orient' + **oldest-map-is-a-Babylonian-clay-
  tablet**.
- **strange-places** now owns these place anchors — grep before any places/landmarks category:
  Dead-Sea-shrinking-sinkholes + **Dead-Sea-was-the-first-spa (Herod/Cleopatra)** + **Dead-Sea-floats-up-
  asphalt-for-mummies**; **Salar-de-Uyuni-world's-largest-mirror (satellite calibration)** + flattest-
  place-on-Earth + lithium-battery-supply; **Fly-Geyser-was-an-accidental-leaking-well** + colors-are-
  living-algae + still-growing-Burning-Man-owns-it; **Door-to-Hell-lit-1971-still-burning** + Turkmenistan-
  cant-put-it-out + **Kourounis-rappelled-in-found-bacteria**; **Giant's-Causeway-hexagons-like-dried-mud**
  + **same-lava-as-Scotland's-Fingal's-Cave** + Finn-McCool-disguised-as-a-giant-baby; **Paris-Catacombs-6-
  million-people** + **cataphiles-secret-cinema-found-2004** + bones-in-walls-man-lost-1793-found-11-yrs-
  later; **Blood-Falls-bleeding-glacier-is-rust** + fed-by-2-million-yr-sealed-lake + microbes-on-iron/
  sulfur-astrobiology; **Pamukkale-white-castle-is-travertine** + **Hierapolis-'Gate-to-Hell'-lethal-CO2** +
  swim-in-Cleopatra's-Pool-toppled-columns; **Socotra-dragon's-blood-trees** + Galapagos-of-the-Indian-
  Ocean-endemism + monsoon-seals-it-off-for-months; **Lake-Hillier-stays-pink-in-a-glass** + carotenoid-
  flamingo-pigment + pink-lake-beside-a-blue-sea.
- **insects** now owns these bug anchors — grep before any insect/arthropod/bug category:
  **20-quadrillion-ants-outweigh-birds+mammals** + **leafcutter-ants-farm-fungus-50M-yrs** + fire-ants-
  living-rafts; **bee-waggle-dance (von Frisch Nobel)** + worker-bee-1/12-tsp-honey-in-a-lifetime + **bees-
  recognize-faces-and-grasp-zero**; caterpillar-dissolves-to-goo-keeps-memories + **butterflies-taste-with-
  their-feet** + monarch-migration-takes-3-4-generations; cicada-swarm-100-decibels + **Massospora-zombie-
  fungus** + cicadas-17-yrs-underground-for-one-summer; **dragonflies-95%-hunt-success (deadliest)** +
  globe-skimmer-11000mi-ocean-migration + **Meganeura-2ft-wingspan-high-oxygen**; fireflies-are-beetles +
  **synchronous-fireflies** + **femme-fatale-fireflies-eat-males**; **female-mantis-eats-the-male's-head** +
  **mantises-see-in-3D (tiny glasses)** + mantis-one-ear-on-chest-hears-bats; **termites-are-social-
  cockroaches** + termite-queen-lives-30-50-yrs + **termite-mounds-inspired-an-AC-free-building**; **mosquito-
  deadliest-animal (malaria)** + only-females-bite-blood-for-eggs + mosquitoes-track-you-by-CO2/heat/sweat;
  **1-in-4-animal-species-is-a-beetle** + **dung-beetles-steer-by-the-Milky-Way** + bombardier-beetle-
  boiling-spray.
- **famous-trees-plants** now owns these botany anchors — grep before any plant/tree/garden category:
  **bamboo-grass-strong-as-steel-scaffolding** + **fastest-growing-plant-3ft/day** + **bamboo-flowers-
  worldwide-then-Mautam-rat-famine**; **baobab-trunks-as-pub/jail/bus-stop** + baobabs-2000yrs-several-
  died-2010s + upside-down-tree-legend; **cacti-are-almost-all-American** + spines-are-modified-leaves +
  **saguaro-so-slow-a-man-who-shot-one-was-crushed**; **urushiol-pinhead-rashes-hundreds-lasts-years** +
  **never-burn-poison-ivy** + CO2-makes-poison-ivy-worse; **Venus-flytrap-only-near-Wilmington-NC-poaching-
  felony** + flytrap-eats-bugs-for-nitrogen-not-energy + **Venus-flytrap-can-COUNT (2 to close, 5 to
  digest)**; **DC-cherry-trees-first-batch-burned-1910** + **Kyoto-1200-yr-bloom-record-shows-warming** +
  cherry-blossoms-last-a-week-hanami/mono-no-aware; **General-Sherman-biggest-living-thing-from-an-oat-
  seed** + **giant-sequoias-NEED-fire-to-open-cones** + Wawona-drive-through-tunnel-tree-fell-1969;
  **corpse-flower-isn't-one-flower-Rafflesia-is-biggest-single-bloom** + **corpse-flower-heats-itself-to-
  body-temp** + blooms-every-7-10-yrs-crowds-livestream; **mangroves-give-live-birth-spear-propagules** +
  mangrove-snorkel-roots + **mangroves-blunted-the-2004-tsunami**; **bonsai-is-not-a-dwarf-species** +
  oldest-bonsai-sell-for-millions + **Yamaki-bonsai-survived-Hiroshima-unknown-til-2001**.
- **explorers** now owns these explorer anchors — grep before any voyage/expedition/discovery category:
  **Shackleton-800mi-lifeboat-not-one-man-lost** + turned-back-97mi-from-South-Pole + **Endurance-found-
  2022-no-shipworms**; **Ibn-Battuta-out-traveled-Marco-Polo-3x** + judge/serial-husband + Mecca-trip-
  became-24-years; **Cousteau-Aqua-Lung-1943** + **Conshelf-lived-on-the-sea-floor** + **Silent-World-won-
  Palme-dOr-AND-Oscar**; Lewis-Clark-only-one-death-burst-appendix + ~300-new-species + **York-got-a-vote-
  denied-freedom**; **Magellan's-Enrique-of-Malacca** + named-Pacific-ate-rats/leather + **survivors-lost-
  a-day (date line)**; **Marco-Polo-dictated-his-book-from-prison** + doubts-he-reached-China + deathbed-
  'I-did-not-tell-half'; **Nellie-Bly-72-days-raced-secret-rival-Bisland** + faked-insanity-Ten-Days-in-a-
  Mad-House + later-factory-owner/patents/WWI-reporter; **Amundsen-beat-Scott-who-died** + first-through-
  Northwest-Passage-Gjoa + **first-to-both-poles-vanished-rescuing-a-rival-1928**; **Zheng-He-enslaved-
  eunuch-admiral** + fleet-dwarfed-Columbus-28000-men + **giraffe-as-qilin-then-China-turned-inward**;
  **Sacagawea-crossed-continent-with-a-newborn** + **the-chief-was-her-long-lost-brother** + walking-
  signal-of-peace-most-statues-of-any-American-woman.
- **human-behavior** now owns these nonverbal anchors — grep before any body-language/social category:
  **Duchenne-smile (doctor shocked faces)** + smiling-is-innate(fetuses/blind-babies) + Russia-smiling-
  seems-fake; **36-questions-4-min-eye-contact-fall-in-love** + look-away-to-think + **belladonna-pupils-
  widen**; **amygdala-holds-personal-space** + cultural-conversational-dance + **Edward-Hall-proxemic-
  zones**; handshake-weapon-check + **Shalmaneser-III-9th-c-BCE-relief** + **handshake-2x-bacteria-of-a-
  high-five**; **Fore-tribe-universal-expressions** + **still-face-experiment** + **blind-athletes-pride/
  shame-poses**; **power-posing-replication-war** + **text-neck-60-lbs** + **NEAT-fidgeting-burns-
  calories**; **thumbs-up/OK-insult-abroad** + gesture-on-the-phone-helps-the-speaker + **Italian-gesture-
  lexicon**; **most-laughter-isn't-jokes (Provine)** + **tickled-rats-giggle** + **1962-Tanganyika-
  laughter-epidemic**; **microexpressions-inspired-'Lie-to-Me'** + 1/25th-of-a-second + **TSA-$1B-no-
  better-than-chance**; **crossing-arms-reduces-pain** + folded-arms-make-you-persist + **fixed-arm-fold-
  handedness**.
- **superstitions** now owns these luck/omen anchors — grep before any folklore/luck/ritual category:
  **four-leaf-clover=1-in-5000-mutation-collector-found-100k** + each-leaf=faith/hope/love/luck +
  **shamrock(3-leaf)=Trinity-NOT-the-lucky-one**; **evil-eye=envy/praise-is-the-danger (mashallah/spit)**
  + **nazar-blue-bead-everywhere-even-on-planes** + blue-eyes-feared-because-rare; **Friday-13th-costs-the-
  economy** + **the-Thirteen-Club-dined-13-to-defy-it** + Tuesday-13(Spain/Greece)/Friday-17(Italy);
  **China-8=wealth-Beijing-8/8/08** + **7=world's-favorite-number(pick-1-to-10)** + **4=death-tetraphobia-
  skipped-4th-floors**; **black-cat=GOOD-luck-in-UK/Japan** + **Vox-in-Rama-1233** + **black-cat-adoption-
  bias**; knock-on-wood-even-if-you-dont-believe + **Italians-touch-iron/Turks-tug-earlobe** + **Tiggy-
  Touchwood-kids-game-origin**; **Pliny-hare's-foot-for-gout** + rabbits-magical-born-eyes-open-live-
  underground + **left-hind-foot-from-a-graveyard-rabbit**; walking-under-ladders-is-just-safe + ladder=
  Holy-Trinity-triangle + **ladders-led-to-the-gallows**; **horseshoe-up-vs-down-argument** + **St-Dunstan-
  nailed-a-shoe-on-the-Devil** + iron+blacksmith+7-nails; **reflection-was-your-soul** + **cover-mirrors-
  after-a-death(Victorian/shiva)** + 7-years=Roman-body-renews-every-7-years-myth.

**Watch especially:** any new category about creatures/cryptids, ancient sites, writing, famous
inventions, everyday objects/appliances, disasters, or jobs will collide with myths-legends, mysteries,
ancient-civilizations, languages, engineering, inventions, everyday-objects, household-science, physics,
chemistry, or literature. When in doubt, grep the specific anchor against the whole CSV first.

### Watch for pre-existing duplicate IDs in the source dumps
The source data has occasionally shipped the **same `id` in two categories** (found `internet-network-of-networks`
in BOTH technology/Internet and inventions/Internet — present in the backup, so not introduced by a rewrite).
The integrity check's `dup ids` line catches these. Resolve by renaming **the new category's** row to a
unique id (only safe if nothing references it via `relatedFactIds` — check first), then report it.

## Reusable script template (matches by old headline, keeps id)
```python
# -*- coding: utf-8 -*-
import csv
def norm(s):
    return s.replace('’',"'").replace('‘',"'").replace('“','"').replace('”','"').strip()
CAT = "your-category-id"
R = {  # OLD headline -> (NEW headline, body, summary, tags)
  "Old Textbook Headline": ("New Wow Headline","Body ~60-90 words...","One-sentence teaser.","tag1,tag2,tag3"),
  # ... one entry per fact
}
with open('approved-facts.csv', newline='', encoding='utf-8') as f:
    rd=csv.DictReader(f); fields=rd.fieldnames; rows=list(rd)
idx={(r['categoryId'],norm(r['headline'])):r for r in rows}
applied=0; miss=[]
for old,(nh,b,s,t) in R.items():
    r=idx.get((CAT,norm(old)))
    if not r: miss.append(old); continue
    r['headline']=nh; r['body']=b; r['summary']=s; r['tags']=t; applied+=1
with open('approved-facts.csv','w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=fields); w.writeheader(); w.writerows(rows)
print("rewrites in dict:",len(R),"| applied:",applied)
for m in miss: print("UNMATCHED:",m)
```

## Integrity check (section 5e — run after every change)
```python
import csv; from collections import Counter
rows=list(csv.DictReader(open('approved-facts.csv')))
print('rows',len(rows),'| categories',len(set(r['categoryId'] for r in rows)))
print('dup (cat,topic,headline):',[k for k,c in Counter((r['categoryId'],r['topic'],r['headline']) for r in rows).items() if c>1] or 'none')
print('dup ids:',[k for k,c in Counter(r['id'] for r in rows).items() if c>1] or 'none')
ids={r['id'] for r in rows}
print('dangling relatedFactIds:',sum(1 for r in rows for x in r['relatedFactIds'].split(',') if x.strip() and x.strip() not in ids))
print('topics OVER 3 (must be 0; 1-2 ok):',[k for k,c in Counter((r['categoryId'],r['topic']) for r in rows).items() if c>3] or 'none')
print('dup headlines dataset-wide:',[k for k,c in Counter(r['headline'] for r in rows).items() if c>1] or 'none')
```
Target for a finished category: no dup ids/headlines dataset-wide, 0 dangling links, no topic over 3
(1–2 is fine — never pad), bodies in the 55–95 band (aim 65–80; recent batches have run ~78–82 avg, which
is fine), zero "Britannica"/source-attribution framing left in the new category.

## Other notes
- `id` is permanent — never change it, even on a full rewrite (other facts' `relatedFactIds` point at it).
- CSV columns: `id, categoryId, topic, headline, body, summary, tags, readTimeSeconds,
  featured, relatedFactIds`.
- This is **not a git repo**; the only versioning is the timestamped `approved-facts.backup-*.csv` files.
- The user's cadence: they add a category between sessions, then say "run the same process." They approve
  the whole slate and want it done end-to-end with the de-dup care described above.
