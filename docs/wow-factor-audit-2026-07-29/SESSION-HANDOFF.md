# Session Handoff — Wow-Factor Audit Remediation (Phase 2 in progress)

**Written:** 2026-07-29, mid-session, to resume in a fresh context window.
**Paste this whole file as your first message in the new session.**

---

## 1. What this is

We ran a full "Wow Factor" audit (client-supplied rubric) against all 1,704 facts in
`approved-content/approved-facts.csv`, scoring every fact PASS / REVISE / BORDERLINE / REJECT. Full
results live in `docs/wow-factor-audit-2026-07-29/`:
- `00-SUMMARY.md` — database-level findings, strongest-facts benchmark, final verdict
- `master-table.csv` — all 1,704 original facts scored across 6 dimensions + classification + primary issue
- `immediate-removals-reject-list.md` — the 106 REJECT facts (already removed)
- `batch-reports/batch01.md` … `batch08.md` — full detailed reports (Why Flagged, Rewrite Potential, etc.) for every non-PASS fact from the original audit

We are now working through the approved remediation plan at `/Users/xaviersalazar/.claude/plans/typed-watching-pike.md` (5 phases). **We are in Phase 2** (apply the 153 REVISE rewrites), going category by category, weakest-pass-rate-first, deciding keep-with-rewrite vs. remove for each REVISE fact.

## 2. Current state (verify before doing anything else)

```bash
wc -l ~/Projects/nib-content-workflow/approved-content/approved-facts.csv
```
Should show **1178** (1177 data rows + header). If it doesn't match, `git diff` or check for uncommitted work before proceeding — something may have changed since this handoff was written.

Original DB: 1704 facts → **currently 1177 facts** (a 31% reduction) after:
- Phase 1: removed all 106 REJECT facts
- **Phase 2 is COMPLETE** — all 153 original REVISE facts across all 52 categories worked through (see §5).
- **Phase 3 is COMPLETE** — redundant clusters resolved, including a fresh whole-database redundancy scan
  (see §8).
- **Phase 4 is COMPLETE** — all 335 BORDERLINE facts resolved via a streamlined auto-remove + exceptions
  process (see §8).
- **Theory-vs-fact review is COMPLETE** — done out of order, before Phase 5, at the user's request (see §9)
  to avoid a second regen pass. Next up: **Phase 5** (regenerate, export, ship) — nothing else is queued
  before it now.

Backups exist at `approved-content/approved-facts.backup-*.csv` (timestamped). Do not delete these.

## 3. The exact workflow (repeat this per round)

This is a **grouped-round** pattern (the user asked to batch ~4 small categories per round instead of
one at a time, to cut down round-trips — see §6 for the round plan).

### Step A — Pull the REVISE facts for the round's categories
```python
import csv
rows = list(csv.DictReader(open('docs/wow-factor-audit-2026-07-29/master-table.csv')))
for cat in ['CATEGORY1','CATEGORY2','CATEGORY3','CATEGORY4']:
    revise = [r for r in rows if r['category']==cat and r['classification']=='REVISE']
    print(f'=== {cat} ({len(revise)}) ===')
    for r in revise:
        print(' ', r['fact_id'], '|', r['hook'])
```

### Step B — Pull each fact's "Rewrite Potential" note
The `master-table.csv` doesn't have the full write-up — pull it from the right `batch-reports/batchNN.md`
file (look up which batch number each category was assigned to — see §7 batch-assignment table below).
```python
import re
txt = open('docs/wow-factor-audit-2026-07-29/batch-reports/batchNN.md').read()
m = re.search(rf'### Fact: {re.escape(fact_id)}\n(.*?)(?=\n### Fact:|\n## )', txt, re.S)
block = m.group(1)
rw = re.search(r'\*\*Rewrite Potential:?\*\*\s*(.*?)(?=\n\*\*|\Z)', block, re.S)
issue = re.search(r'\*\*Primary Failure:?\*\*\s*(.*)', block)
```
(Note: a few facts across the audit are missing their individual write-up despite having a table row —
if `NOT FOUND`, just work from the table's `primary_issue` column instead. This happened at least once in
`blue-late-color-word`; note it in the proof sheet if it recurs.)

### Step C — Pull the current CSV text for each fact
```python
rows = list(csv.DictReader(open('approved-content/approved-facts.csv')))
byid = {r['id']:r for r in rows}
r = byid[fact_id]  # r['headline'], r['body'], r['summary']
```

### Step D — Draft rewrites, following these hard constraints
- **Never invent a new number, date, name, or comparison not already present in the original body.** This
  is the single most important rule from `docs/fact-writing-and-quality-guide.md` §7. When the audit's own
  "Rewrite Potential" suggestion requires a detail not in the source (a specific site name, a technical
  mechanism, a comparison), **do not add it** — draft the best rewrite possible using only existing content,
  and flag it as a caveat in the proof sheet (gold border, ⚠ in the topic chip) so the human can decide
  whether to independently verify and add it.
- Headline: Title Case, leads with the surprise, stands alone (no anaphoric "it/its/this" referring to an
  unstated topic).
- Body: ~4-5 sentences, ~60-90 words, grade 6-8 reading level, ends on a concrete point not a vague aphorism.
- Summary: teaser, never an echo of the headline.
- Keep `id`, `categoryId`, `topic`, `readTimeSeconds`, `featured`, `relatedFactIds` unchanged — only
  headline/body/summary (and occasionally tags) change on a rewrite.
- Religion/culture/history topics: keep neutral, scholarly framing — never assert a belief is true/false,
  never add graphic detail beyond what's already there (age-appropriateness gate, 4+ rated app).

### Step E — Build a proof-sheet artifact (Was/Now comparison)
Use the HTML template already established in this session (editorial galley-proof aesthetic: serif body,
warm-gold accent, brick-red "was" rule vs. forest-green "now" rule, gold-bordered cards for caveats). The
template file structure is reusable — grep any of the `rewrite-compare-*.html` artifacts published earlier
in this session for the exact CSS if you want to match it precisely (they're gone from scratchpad in a new
session, but the visual spec is: `--old: #a6493c` brick red, `--new: #3d6b4a` forest green, `--gold:
#a9781f`, serif `"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif`, sans-serif UI chrome via
`ui-sans-serif, -apple-system, "Helvetica Neue", Arial, sans-serif`, dark mode variants included). Group
facts under `<h2>` category dividers within one artifact per round. Publish via the `Artifact` tool.

### Step F — Multi-select via AskUserQuestion
One question per category (or per pair of small categories, given the 4-option cap per question). Phrase:
*"[Category] — which do you want KEPT with the new rewrite? (Leave unselected = remove entirely)"*
multiSelect: true, one option per fact with a one-line description of what changed.

**If the user answers "[No preference]" for any question, do not assume — re-ask that specific group for
clarification.** This has happened several times; always confirm rather than guess.

### Step G — Apply to the CSV
```python
import csv
REMOVE = {...}       # ids not selected
REWRITES = {...}     # id -> (new_headline_or_None, new_body_or_None, new_summary_or_None)

with open('approved-content/approved-facts.csv', newline='') as f:
    rd = csv.DictReader(f); fields = rd.fieldnames; rows = list(rd)

out = []
for r in rows:
    if r['id'] in REMOVE: continue
    if r['id'] in REWRITES:
        h, b, s = REWRITES[r['id']]
        if h is not None: r['headline'] = h
        if b is not None: r['body'] = b
        if s is not None: r['summary'] = s
    out.append(r)

ids = {r['id'] for r in out}
for r in out:
    refs = [x.strip() for x in r['relatedFactIds'].split(',') if x.strip()]
    r['relatedFactIds'] = ','.join(x for x in refs if x in ids)

with open('approved-content/approved-facts.csv', 'w', newline='') as f:
    w = csv.DictWriter(f, fieldnames=fields); w.writeheader(); w.writerows(out)
```

### Step H — Integrity check (every round, no exceptions)
```python
import csv; from collections import Counter
rows=list(csv.DictReader(open('approved-content/approved-facts.csv')))
print('rows',len(rows))
print('dup ids:',[k for k,c in Counter(r['id'] for r in rows).items() if c>1] or 'none')
ids={r['id'] for r in rows}
print('dangling relatedFactIds:',sum(1 for r in rows for x in r['relatedFactIds'].split(',') if x.strip() and x.strip() not in ids))
print('topics OVER 3:',[k for k,c in Counter((r['categoryId'],r['topic']) for r in rows).items() if c>3] or 'none')
```

### Step I — Check `collections.json` for dangling references (every round)
```python
import json
c = json.load(open('exports/collections.json'))  # run from nib-content-workflow root
removed = {...}  # the ids removed this round
hits = [(coll['id'], f) for coll in c for f in coll['factIds'] if f in removed]
print('dangling collection refs:', hits or 'none')
```
If any hit: find the removed fact's original topic (check the backup CSV or `master-table.csv`), look for
a **surviving sibling fact in the same topic**, and judge if it fits the collection's theme:
- **Good thematic fit** → repoint (`coll['factIds']` list comprehension swap).
- **No good fit** (this has happened ~5 times already) → **drop the slot entirely** rather than force a
  bad match. This is the established precedent — don't re-ask, just apply it and mention it in your summary.

Then sync and re-verify:
```bash
cp exports/collections.json ../Nib/Nib/Data/collections.json
```
```python
# re-run the dangling-ref check above on the updated file — must show 'none'
```

### Step J — Report to the user
Short summary: kept+rewritten list, removed list, any collection fixes, integrity check result, before→after
count for each category, running total. Then state the next round and ask to continue.

---

## 4. IMPORTANT — do NOT regenerate/export/publish yet

Per the plan, `pnpm normalize:tags / assign:themes / generate:related / export:facts`, the CDN publish, and
syncing `Nib/Nib/Data/facts.json` all happen **once, at the very end**, after Phases 2, 3, and 4 are all
done — not after every round. `exports/facts.json` and `Nib/Nib/Data/facts.json` are intentionally stale
right now. Only `approved-facts.csv` (source of truth) and `collections.json` (exports/ + app bundle) get
touched during Phases 2-4.

## 5. Progress so far (Phase 2)

Categories fully processed (REVISE facts decided, applied, integrity-checked):

| # | Category | REVISE found | Before | After |
|---|---|---|---|---|
| 1 | history | 9 | 44 | 25 |
| 2 | space | 8 | 46 | 40 |
| 3 | chemistry | 9 | 37 | 33 |
| 4 | religion-beliefs | 9 | 48 | 36 |
| 5 | medicine | 2 | 41 | 38 |
| 6 | colors | 5 | 30 | 27 |
| 7 | food | 6 | 18 | 11 |
| 8 | cars | 5 | 23 | 15 |
| 9 | castles-fortresses | 0 (skipped — all BORDERLINE) | 28 | 28 |
| 10 | ancient-civilizations | 7 | 37 | 28 |
| 11 | internet-culture | 1 | 11 | 10 |
| 12 | superstitions | 1 | 26 | 25 |
| 13 | movies | 0 (skipped — all BORDERLINE) | 19 | 19 |
| 14 | music | 1 | 21 | 12 |
| 15 | astronomy | 3 | 31 | 29 |
| 16 | sports | 3 | 18 | 13 |
| 17 | languages | 5 | 38 | 30 |
| 18 | myths-legends | 4 | 47 | 42 |
| 19 | video-games | 2 | 22 | 17 |
| 20 | technology | 2 | 14 | 13 |
| 21 | mathematics | 1 | 45 | 40 |
| 22 | everyday-objects | 2 | 29 | 23 |
| 23 | artificial-intelligence | 1 | 15 | 12 |
| 24 | coffee | 2 | 13 | 11 |
| 25 | human-behavior | 0 (skipped — all BORDERLINE) | 29 | 29 |
| 26 | human-body (round 1) | 3 | 19 | 16 |
| 27 | mysteries (round 1) | 3 | 44 | 38 |
| 28 | household-science (round 1) | 2 | 28 | 24 |
| 29 | business (round 1) | 2 | 42 | 40 |
| 30 | famous-symbols (round 2) | 6 (all removed — no rewrite survived redundancy/abstraction cuts) | 29 | 23 |
| 31 | animals (round 2) | 1 | 33 | 33 |
| 32 | ancient-creatures (round 2) | 2 | 30 | 28 |
| 33 | economics (round 2) | 3 | 29 | 27 |
| 34 | pirates (round 3) | 6 (all removed) | 26 | 20 |
| 35 | geography (round 3) | 3 (all removed) | 43 | 40 |
| 36 | inventions (round 3) | 1 | 43 | 43 |
| 37 | secret-codes (round 3) | 3 (all removed) | 28 | 25 |
| 38 | aviation (round 4) | 3 (all removed) | 22 | 19 |
| 39 | strange-jobs (round 4) | 1 (removed) | 27 | 26 |
| 40 | psychology (round 4) | 2 | 11 | 10 |
| 41 | engineering (round 4) | 3 (all removed) | 15 | 12 |
| 42 | strange-places (round 5) | 1 (removed) | 30 | 29 |
| 43 | insects (round 5) | 3 (all removed) | 27 | 24 |
| 44 | literature (round 5) | 1 (removed) | 42 | 41 |
| 45 | weather (round 5) | 3 (all removed) | 42 | 39 |
| 46 | ocean-life (round 6) | 1 (removed) | 30 | 29 |
| 47 | physics (round 6) | 3 (all removed) | 33 | 30 |
| 48 | famous-trees-plants (round 6) | 1 | 30 | 30 |
| 49 | dinosaurs (round 6) | 2 (all removed) | 30 | 28 |
| 50 | architecture (round 7) | 2 (all removed) | 45 | 43 |
| 51 | human-civilization (round 7) | 1 (removed) | 29 | 28 |
| 52 | illusions-perceptions (round 7) | 3 (all removed) | 30 | 27 |

**Database total: 1704 → 1478. PHASE 2 COMPLETE.**

**Round 7 notes (final Phase 2 round):** all 6 remaining REVISE facts removed by user choice, continuing the Round 3-7 pattern — none survived even where the rewrite had zero caveats (courtyards-alhambra-complex, agriculture-many-origins, the-dress-color-constancy). Two facts this round had genuine caveats: arches-work-by-compression (the audit's own hand-squeeze analogy wasn't literally in the source, though it's a universal/self-verifiable demo rather than risky trivia) and color-illusions-colored-shadows (a real ID/content mismatch — titled "colored shadows" but its actual content was the same simultaneous-contrast idea as its checker-shadow sibling color-illusions-rgb-white; the audit's suggested fix, an actual colored-light-shadow demo, wasn't in the source). afterimages-not-on-wall was flagged as redundant with its sibling flag-trick fact per the audit's own "merge" recommendation. No collections.json fixes needed.

**Phase 2 final tally:** 153 original REVISE facts processed across all 52 categories with a REVISE fact. Kept-with-rewrite: only 5 facts across all 7 rounds — ravens-solve-problems-together and supply-chains-ev-complexity (Round 2), television-kept-changing (Round 3), sleep-half-brain-awake (Round 4), baobab-nine-species (Round 6). Everything else — 148 facts — was removed. In practice, REVISE was treated with the same "presumed removable unless compelling reason to keep" bar the rubric formally reserves for BORDERLINE, not "rewrite unless truly unfixable." Expect a similarly removal-heavy outcome in Phase 4.

**Round 6 notes:** baobab-nine-species was the sole survivor — hook-only fix, no caveats. All 6 others removed despite clean, caveat-free rewrites (ocean-currents-warm-norway, time-atomic-clocks-precision, friction-tiny-surface-interactions, waves-matter-or-vacuum, dinosaur-eggs-nesting-colonies, iguanodon-helped-define-dinosaurs), continuing the Round 3-6 pattern. Collections fix: `devoted-parents` referenced removed `dinosaur-eggs-nesting-colonies` — this time there WAS a good thematic fit (`dinosaur-eggs-embryos-rare`, the surviving Oviraptor "good parent" fact, same collection-worthy theme), so it was repointed rather than dropped, then synced to `../Nib/Nib/Data/collections.json` and re-verified clean.

**Round 5 notes:** cleanest round yet — all 8 rewrites drew only on content already present in the source (no caveats needed), unlike Round 4's high caveat rate. User still removed all 8 anyway. This continues the pattern from Rounds 3-5: even well-executed, caveat-free rewrites that squarely address the audit's critique are being removed by user choice more often than kept — REVISE is functionally being treated the same as BORDERLINE ("presumed removable unless compelling reason to keep"), not "rewrite unless truly unfixable." Worth keeping in mind for Round 6-7 and especially Phase 4 (which formally uses that BORDERLINE removal-presumption rule) — the bar for "keep" appears to be quite high in practice. No collections.json fixes needed this round.

**Round 4 notes:** highest caveat rate so far — 4 of the 9 REVISE facts (aerodynamics-pressure-lift, gliders-lilienthal-human-flight, flight-recorders-crash-survivable-memory, happiness-twins-similar-levels) needed the audit's own suggested fix-content (the real lift mechanism, Lilienthal's 2,000 flights/death, "hotter than lava" comparisons, a concrete happiness statistic) and none of it existed in the source bodies — flagged per the don't-invent rule rather than fabricated, then all removed by user choice. sleep-half-brain-awake was the one exception: named dolphins specifically and added the one-eye-open/role-swap detail (well-established biology, flagged as a lighter caveat since it wasn't literally in the source text) — user kept it. odor-judges-nose-plus-chemistry, steel-builds-almost-everything, hydroelectric-power-water-battery, and tunnels-under-euphrates all got clean no-caveat rewrites but were removed anyway by user choice. No collections.json fixes needed — none of the removed ids were referenced in any collection.

**Round 3 notes:** all 6 pirates REVISE facts removed by user choice (jolly-roger x2, treasure-maps-atlas-booty, pirate-codes-shares, pirate-havens-shipwreck-clues, pirate-ships-cannon) despite rewrites addressing the audit's specific critiques — user judged them not worth keeping even improved. All 3 geography REVISE facts removed (glaciers x2, fjords) despite rewrites; television-kept-changing was the only inventions/geography survivor, kept with its hatbox/bicycle-lights hook rewrite. All 3 secret-codes REVISE facts removed, including cryptography-modern-networks, which was flagged with a caveat (couldn't add the audit-suggested paint-mixing analogy since it wasn't in the source — the "how" stayed unresolved even rewritten) and book-cipher-key-weakness (audit's own suggestion was merge/drop — still just an explainer riding on 2 stronger sibling facts). No collections.json fixes needed this round — none of the removed ids were referenced in any collection.

**Round 2 notes:** all 6 famous-symbols REVISE facts were removed by user choice (2 had genuine redundancy with sibling PASS facts — peace-symbol-semaphore/peace-symbol-nuclear-disarmament, yinyang-ancient-cosmology/yinyang-circle-balance — the rest just didn't clear the bar even rewritten). ravens-solve-problems-together and supply-chains-ev-complexity were kept with rewrites. Two facts (banking-central-banks-last-resort, interest-rates-price-of-borrowing) had audit-suggested rewrite details that weren't present in the source body (bank's disaster history, merchant interest workarounds) — flagged as caveats in the proof sheet per the don't-invent rule, then removed by user choice anyway. Collections fix: `devoted-parents` referenced removed fact `mosasaurs-flippers-tail`; no surviving Mosasaur sibling fit the parenting theme, so the slot was dropped (established precedent), not repointed.

**Note on "0 REVISE" categories** (castles-fortresses, movies, human-behavior): their weak facts are all
BORDERLINE, not REVISE — that's Phase 4 territory, not Phase 2. Nothing to do for them right now.

## 6. Phase 2 rounds — ALL COMPLETE (historical record)

All 7 rounds are done:

- ~~Round 2: famous-symbols (6), animals (1), ancient-creatures (2), economics (3) — 12 facts~~ **DONE**
- ~~Round 3: pirates (6), geography (3), inventions (1), secret-codes (3) — 13 facts~~ **DONE**
- ~~Round 4: aviation (3), strange-jobs (1), psychology (2), engineering (3) — 9 facts~~ **DONE**
- ~~Round 5: strange-places (1), insects (3), literature (1), weather (3) — 8 facts~~ **DONE**
- ~~Round 6: ocean-life (1), physics (3), famous-trees-plants (1), dinosaurs (2) — 7 facts~~ **DONE**
- ~~Round 7: architecture (2), human-civilization (1), illusions-perceptions (3) — 6 facts~~ **DONE**

Categories that had **zero REVISE facts** (their weak facts are all BORDERLINE — Phase 4 territory):
explorers, survival-body-limits, famous-disasters, sleep-dreams, castles-fortresses, movies, human-behavior.

**Phase 2 is complete — 0 REVISE facts remain.** Next: Phase 3, then Phase 4, per §8 below.

## 7. Category → batch-report file mapping (for Step B lookups)

| Batch file | Categories |
|---|---|
| batch01.md | religion-beliefs, ancient-civilizations, chemistry, famous-symbols, pirates, human-body, food |
| batch02.md | literature, animals, ocean-life, human-civilization, aviation, sleep-dreams, psychology |
| batch03.md | myths-legends, languages, physics, castles-fortresses, human-behavior, movies, sports |
| batch04.md | space, medicine, economics, everyday-objects, household-science, video-games, artificial-intelligence |
| batch05.md | mathematics, inventions, ancient-creatures, explorers, famous-disasters, superstitions, internet-culture |
| batch06.md | architecture, business, astronomy, famous-trees-plants, strange-jobs, survival-body-limits, coffee |
| batch07.md | history, geography, colors, strange-places, insects, cars, technology |
| batch08.md | mysteries, weather, dinosaurs, illusions-perceptions, secret-codes, music, engineering |

## 8. Phase 2 is done — start here for Phases 3, 4, 5 (from the approved plan)

**Phase 3 — Redundant clusters: COMPLETE.** Checked all ~12 named clusters from `00-SUMMARY.md`
("Categories that appear oversaturated") against the current (post Phase 1+2) database. Finding: almost
all of them had already self-resolved as a side effect of Phase 1 REJECT removals and Phase 2 REVISE
remediation — Salem witch trials (gone), golden-age-of-piracy (pirates category thinned so hard in Round 3
the cluster no longer exists), banana trio (down to 1), IMAX pair (down to 1), CMB trio (down to 2,
distinct), platypus/chameleon/giant-squid (each down to 2, distinct), Antikythera (only in mysteries now,
no cross-category dupe), Mongol Empire (down to 2, distinct angles), moat/hillfort/siege-tower (each
category's remaining facts read as distinct angles, not restatements — this is really Phase 4 BORDERLINE
territory since castles-fortresses had 0 REVISE facts).

Two items got a real decision:
- **Titanic cluster** (3 facts: flooded-compartment design flaw, ice-warning-never-reached-bridge, lifeboat
  capacity gap) — user reviewed all 3 in full and **kept all 3** as genuinely distinct angles on one event,
  not restatement.
- **"Universe too young for X" / "advanced ancient astronomy" templates** (stars-live-trillions-years vs
  white-dwarfs-no-black-dwarfs-yet; maya-astronomy vs babylonians-astronomy) — same rhetorical trick reused
  across different topics, not duplicate content. No action taken, noted as a style observation only.

**A fresh whole-database redundancy scan was also run** (per user request — `00-SUMMARY.md` itself had
flagged that a true cross-category pass was never done, since each of the 8 audit batches could only check
its own ~213-fact slice). Method: built an inverted index of "distinctive" tokens (words appearing in 2-6
facts database-wide) per fact, scored all cross-category fact pairs by shared-distinctive-token rarity, and
manually reviewed the top ~50 candidates. Findings:
- **Concrete topic redundancy (real, actioned):** the "Concrete" topic spans 2 categories (engineering +
  architecture) with 4 facts total, and 3 of them independently led with "Roman concrete has outlasted
  modern concrete for 2,000 years" — concrete-steel-reinforcement (self-healing lime chemistry),
  concrete-ancient-material (recipe lost 1,000 years), concrete-reinforcement-strength (modern rebar rusts,
  closes by restating the same Roman-durability point). **Removed concrete-ancient-material and
  concrete-reinforcement-strength**, kept concrete-steel-reinforcement (most specific/vivid mechanism) and
  the genuinely distinct concrete-aggregate-cement-water (carbon footprint). Collections fix: `lost-and-
  rediscovered` referenced the removed concrete-ancient-material — repointed to concrete-steel-reinforcement
  (also fits the "lost knowledge rediscovered" theme: "scientists recently uncovered part of the secret"),
  synced to `../Nib/Nib/Data/collections.json`, re-verified clean.
- **Two id/content mismatches found (NOT yet fixed — flagged for a dedicated cleanup pass):**
  `concrete-steel-reinforcement`'s id is misleading — its actual content is Roman self-healing concrete, not
  steel reinforcement. `qr-codes-denso-wave`'s id is also misleading — its content is about QR
  error-correction/damage tolerance, not the Denso Wave company. User chose not to rename now (renaming
  risks breaking relatedFactIds/collections cross-references) — do this as its own focused pass later.
- **Three adjacent-but-not-duplicate pairs reviewed and kept as-is** (share an opening premise, different
  payoff): atlantis-history-debate (Nazi pseudo-history) vs legends-place-person-history (Plato invented it
  as fable); phoenicians-purple-dye (trade/wealth) vs purple-shellfish-origin (production cost/rediscovery);
  qr-codes-car-parts (why invented) vs qr-codes-everyday-bridge (why it spread for free) — both reference
  "Denso Wave, 1994" but make different points.
- **Also noted:** "Internet" topic spans technology + inventions with 4 facts total (1 over the nominal
  3-per-topic cap if counted globally rather than per-category) — all 4 are content-distinct, no action
  needed, just a data-organization quirk worth knowing about.

**Database total after Phase 3: 1704 → 1476.**

**Phase 4 — BORDERLINE review** (~335 facts originally, largest phase): category-by-category, weakest
first, same propose/approve rhythm as Phase 2 but for BORDERLINE facts. Per the rubric: "presumed removable
unless there is a compelling reason to keep." **STATUS: COMPLETE.**

Given Phase 2's outcome (only 5/153 REVISE facts survived even with clean rewrites), the user chose a
streamlined process for the 335 live BORDERLINE facts rather than repeating Phase 2's full rewrite ritual:
1. Parsed every BORDERLINE fact's own "Recommended Action" from the original batch reports and bucketed them:
   REMOVE (85, unambiguous), KEEP (37, audit said keep unchanged), REWRITE (106), TOSSUP (83, "human
   judgment call"), MERGE (20), plus 4 with missing/other write-ups.
2. **Caught one conflict before auto-applying:** `titanic-warning-never-reached-bridge` was in the REMOVE
   bucket for redundancy reasons — but the user had just explicitly kept all 3 Titanic facts in Phase 3.
   Pulled it out of REMOVE and into KEEP to honor that fresh decision.
3. Bulk-applied the 84 remaining REMOVE-bucket facts and left the 38 KEEP-bucket facts untouched — no
   per-fact review needed since the audit's own recommendation was unambiguous either way.
4. For the 213 genuine exceptions (REWRITE/TOSSUP/MERGE/other) the user chose the lightest-touch option:
   headline + one-line reason only, no rewrites drafted, batch review via AskUserQuestion. Built a single
   reference artifact (`phase4-exceptions-review.html`, all 213 facts grouped by category) instead of one
   proof sheet per round.
5. Worked through castles-fortresses, internet-culture, food, and part of ancient-civilizations one batch
   at a time — every single batch came back "remove all." After a `[No preference]` response on one batch
   (re-asked individually per the established rule — never assume on that answer), the user explicitly said
   to bulk-remove the rest of the 213-fact exceptions list rather than continue one-by-one. Confirmed the
   scope (181 remaining facts, ~1,392 → ~1,211) before applying.

**Result: all 213 exceptions removed, 0 kept.** Combined with the 84 auto-removes, **Phase 4 removed 297
facts total** (from 1476 → 1179). Collections fixes: 18 dangling refs found across two integrity-check
passes (5 after the auto-remove batch, 13 after the bulk exceptions removal) — 4 repointed to a same-topic
sibling that genuinely fit the collection's theme (fukushima, friday-13, easter-eggs/Konami Code, auto-tune),
14 slots dropped where no thematically-fitting sibling survived. All re-verified clean, synced to
`../Nib/Nib/Data/collections.json`.

**Database total after Phase 4: 1704 → 1179.**

**Phase 5 — Regenerate, export, ship**:
```bash
pnpm normalize:tags && pnpm assign:themes && pnpm generate:related && pnpm export:facts
pnpm check:age-rating
```
Then re-run the integrity check, sync `exports/facts.json` → `../Nib/Nib/Data/facts.json`, check
`Nib/Nib/Data/collections.json` for any remaining dangling refs (there shouldn't be any if §3 Step I was
followed every round), publish to CDN per `cdn/README.md`, update `docs/session-handoff.md` (the project's
own pre-existing handoff doc, different from this file) and the memory pipeline-state file.

## 9. Theory-vs-fact review — COMPLETE (moved ahead of Phase 5 by user request)

Originally queued for after Phase 5, but the user asked to run it before regenerating/exporting, to avoid
a second regen pass. Re-checked facts already marked PASS or kept during this remediation (not just newly
touched ones) against `docs/fact-writing-and-quality-guide.md` §5 ("Verifiable fact, not an expert's opinion
or theory") — the exact rule the Bermuda-Triangle methane fact was originally removed under.

**Method:** (1) read all 78 facts in the guide's own named highest-risk categories — economics, business,
psychology, human-behavior — in full; (2) ran a database-wide regex scan across all 1,179 facts for
"solved/the answer is/the reason is/proves" — style certainty language, the strongest textual signal of a
theory dressed as settled fact.

**Findings — 2 real hits, both removed by user choice:**
- `scarcity-limited-resources` — stated "**The answer is** scarcity at the margin" as the flat resolution
  to the diamond-water paradox. Marginal utility theory is mainstream economics, but it's still a
  theoretical framework resolving a centuries-old philosophical puzzle — the same pattern as the guide's own
  removed comparative-advantage example.
- `dyatlov-conspiracy-fuel` — framed the 2021 slab-avalanche study as having "helped solve"/"helped crack"
  the Dyatlov Pass mystery, when serious researchers still disagree — same pattern as the already-removed
  Bermuda Triangle methane fact.

Everything else surviving the scan (coral-islands-two-formation-paths/Darwin, gold-sacred-glow/Lycurgus Cup,
pamukkale-thermal-spa/CO2, banking-deposits-become-loans, taos-hum-worldwide-pattern, giant-sloths-claws-
leaves, etc.) was judged fine — either a well-documented event/study, a properly-attributed theory later
confirmed (the guide's explicitly allowed pattern), or already appropriately hedged with "may/likely/one
theory."

**Database total after this pass: 1179 → 1177.** No collections.json dangling refs (neither removed fact
was referenced in any collection).

**Caveat:** this was a targeted regex + high-risk-category scan, not a full manual read of all 1,177 facts —
efficient given the pattern is rare (2 hits in ~78+1179 facts checked), but not an absolute guarantee zero
instances remain elsewhere. If a fresh full manual pass is ever wanted, the two-step method above
(read the named high-risk categories in full + regex-scan the rest for certainty language) reproduces this
pass exactly.

## 10. Constraints and house style reference docs (read if unsure)

- `docs/fact-writing-and-quality-guide.md` — voice, the 4 flatness red-flags, the "don't invent" rule, the
  age-appropriateness 4+ gate (§9 — critical for history/religion/disaster topics).
- `docs/topic-curation-and-quality-guide.md` — the "up to 3 facts per topic, never padded" rule, the
  reusable Python snippets this whole workflow is derived from.
- `docs/content-schema-reference.md` — CSV field contract.

## 11. How to resume right now

1. Paste this file as your first message.
2. Run the verification command in §2 to confirm state (should show 1177 data rows / 1178 total lines).
3. **Phases 2, 3, 4, and the theory-vs-fact review are all fully complete** (see §8 and §9 for what happened
   in each). Nothing else is queued before Phase 5. Start **Phase 5** (regenerate, export, ship):
   ```bash
   pnpm normalize:tags && pnpm assign:themes && pnpm generate:related && pnpm export:facts
   pnpm check:age-rating
   ```
   Then re-run the integrity check (§3 Step H), sync `exports/facts.json` → `../Nib/Nib/Data/facts.json`,
   re-check `Nib/Nib/Data/collections.json` for dangling refs (should already be clean — every round this
   session ended with a verified-clean collections check), publish to CDN per `cdn/README.md`, and update
   the project's own pre-existing `docs/session-handoff.md` (different file from this one) plus the memory
   pipeline-state file with the final numbers (1704 → 1177, a 31% reduction).
4. Separately, a small cleanup pass is still owed whenever convenient: rename the 2 mislabeled fact ids
   found during the Phase 3 redundancy scan (`concrete-steel-reinforcement` and `qr-codes-denso-wave` —
   see §8) — not urgent, but flagged so it isn't forgotten. Both are still present in the current database.
