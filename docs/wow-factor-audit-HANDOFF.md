# Wow-Factor Audit — Session Handoff (updated 2026-07-23)

**Self-contained resume doc.** The advisory audit's actionable slate has been **executed through Tier 7**
(all content tiers). What remains is **Tier 8 (optional, structural)** and the **deferred outward batch**
(pipeline regen + age-gate + app-seed sync + CDN publish), which was intentionally held until all content
tiers were done — it is now **DUE**.

## Status at a glance
- **CSV (`approved-content/approved-facts.csv`) is the source of truth. Now 1,694 facts** (was 1,713 at audit
  time → **19 net removals** across Tiers 3/4/7, plus many rewrites/re-sources/folds).
- **The pipeline has NOT been run since Tier 3.** So:
  - **`exports/facts.json` is STALE** — it reflects the Tier 1–3 state (**1,709**), not the current CSV.
    It MUST be regenerated (`pnpm export:facts`) after the graph regen.
  - `relatedFactIds`/`themes` in the CSV are NOT regenerated for Tiers 4–7 edits. (Dropped ids were
    hand-stripped from `relatedFactIds`, so there are **0 dangling refs**, but the related graph must be
    rebuilt by `pnpm generate:related`.)
- Read-only integrity on the current CSV is clean: 0 dup ids, 0 dangling relatedFactIds, no topic > 3,
  categories contiguous, no topic emptied by any removal.
- **Backups** (in `approved-content/`, one per stage): `approved-facts.backup-20260723-085235.csv`
  (pre-Tier1–3) · `approved-facts.backup-tier4-*.csv` · `-tier5-*` · `-tier6-*` · `-tier7-*`.
- Audit deliverables unchanged on disk: `wow-factor-audit-2026-07-22.csv` (per-fact results, 1,713 rows) +
  `wow-factor-audit-report-2026-07-22.md` (narrative report). Memory: `nib_content_pipeline_state.md`
  (top entries dated 2026-07-23) mirrors all of the below.

---

## WHAT'S BEEN DONE (Tiers 1–7)

### Tier 1 — 2 accuracy fixes (headline/body contradictions)
- **`antibiotics-penicillin-accident`** — headline "Saved" was false (body says he died). New:
  *"The First Penicillin Patient's Medicine Was Recycled From His Urine"* (headline-only; body/summary
  already correct; `id` kept).
- **`jellyfish-long-tentacles`** — "longer than a bus" contradicted a 12–15 ft body. **Re-hooked to the
  lion's mane** (tentacles ~120 ft): *"One Jellyfish's Tentacles Can Outstretch a Blue Whale"* — the claim
  is now true (headline+summary+body+tags rewritten).

### Tier 2 — 2 age-gate items (§9)
- **`pirate-codes-harsh-punishments`** — rewritten to marooning-as-abandonment; the pistol / "single shot" /
  self-harm allusion fully stripped from headline+summary+body. New HL *"Pirates Dreaded Marooning More Than
  a Sea Battle."*
- **`light-bulb-changed-night`** — re-hooked to the AC-vs-DC "War of the Currents"; Edison's
  animal-electrocution + electric-chair content removed (a judgment call for the 4+ Instagram surface).
  New HL *"Your Home Runs on the Current Edison Fought to Destroy."* **Revertible if the user wants the
  cruelty hook back.**

### Tier 3 — 4 removals (1,713 → 1,709; each keeps a strong sibling, 0 topics emptied)
`turing-test-seem-human` · `ai-hallucinations-adversarial-attacks` · `data-centers-small-town-electricity`
· `captcha-trains-ai`. **Pipeline WAS run once here** (this is why `facts.json` = 1,709) + `check:age-rating`
= 0 BLOCK at that point.

### Tier 4 — duplicate merges (1,709 → 1,699): 10 drops + 5 keeper-folds + 1 re-angle
**10 dropped** (unique detail folded into the surviving sibling where noted):
`windshield-wipers-cadillac-standard` (→ fold 1903 patent + 1922-Cadillac into `windshield-wipers-snowy-trolley`;
note `windshield-wipers-inside-lever` is the Robert-Kearns/Ford-lawsuit fact, NOT a dup) · `air-bags-blink-deployment`
(→ 1/20-sec into `air-bags-supplement-seat-belts`; Air Bags now 1 fact) · `crumple-zones-safety-cage`
(→ safety-cage into `crumple-zones-mercedes-1959`; Crumple Zones now 1) · `easter-eggs-grey-dot`
(→ grey-pixel mechanic into `easter-eggs-hidden-credit-origin`; Konami-code fact already in topic) ·
`roman-empire-roads-survive` (keep `human-civilization/roads-military-first`) · `ancient-india-zero`
(keep `mathematics/zero-cultural-journey`) · `golden-age-of-piracy-privateering-to-piracy`
(keep `pirates/Privateers`) · `stethoscope-symbol-of-medicine` (→ "endures as symbol" into
`stethoscope-distance-invention`) · `medical-robots-three-main-parts` (covered by `surgeon-controlled` grape +
`minimally-invasive` Lindbergh) · `webb-13-billion-years` (keep `light-years-early-universe` — dropping THAT
would empty the Light Years topic).
**1 re-angle (no drop):** `maya-astronomy` re-hooked from eclipse-prediction (dup of `babylonians-astronomy`)
to its distinctive **Venus** tracking; Babylonians keeps eclipses.
**DEVIATION — Atlantis kept BOTH (false dup on close read):** `literature/legends-place-person-history`
owns "every Atlantis story traces to one Plato passage"; `myths-legends/Atlantis` covers different angles
(Thera eruption, Donnelly's 1882 craze, Nazi expeditions). No merge.
**Side effect flagged:** `history/Roman Empire` dropped to **1 fact (gladiators)** — a RE-SOURCE candidate
(not one of the original 9; see Tier 5). Left at 1 for now.

### Tier 5 — re-sourced 9 flagship-weak topics (in place, ids kept, count stays 1,699; all web-verified)
- `artificial-intelligence-wasp-example` → **1956 Dartmouth workshop** coined "artificial intelligence"
  (2-month/10-person study). *(AlphaGo "Move 37" was NOT reusable — already in `machine-learning-pattern-learning`.)*
- `chatbots-eliza-first` → the **ELIZA effect** (Weizenbaum's secretary asked to be left alone with it, 1966).
- `elevators-otis-safety-brake` → **Otis's 1854 world's-fair rope-cutting demo**.
- `memory-fading-helps-time` → **Patient H.M.** (1953 hippocampus removal; kept motor learning, no new memories).
- `habits-single-experience` → **66 days, not 21** (21-day rule is a myth from Maltz).
- `motivation-money-association` → **overjustification** (Lepper 1973 — paying kids to draw cut later drawing).
- `honey-egyptian-mummies` → **3,000-yr tomb honey still edible** (low water / acidic / H₂O₂; `honey-mead-alcohol`
  sibling kept, Honey now 2 facts).
- `pizza-roman-no-tomatoes` → **Margherita = Italy's flag colors** (1889 Esposito/Queen Margherita; hedged
  "as the story goes" — the letter is historically disputed).
- `nebulae-eyeball` → **a nebula is emptier than any Earth vacuum** (chosen over the more-KNOWN Pillars of Creation).
- **NOT done:** `history/Roman Empire` re-source (still at 1 fact). Offer as an optional 10th.

### Tier 6 — 2 buried-gem rewrites (in place, web-verified, count stays 1,699)
- `tetris-game-boy-stardom` → *"Tetris Made Millions While Its Soviet Creator Earned Nothing"* (Pajitnov built
  it 1984 in a Soviet state lab so the govt/ELORG owned it; Henk Rogers flew to Moscow to win Game Boy rights
  for Nintendo; Pajitnov earned ~nothing until 1996).
- `decaf-caffeine-reused` → *"The Caffeine Stripped From Decaf Is Sold to Soda and Drug Makers"* (purified +
  sold to beverage/pharma). **Honesty nuance baked in:** MOST soda caffeine is actually synthetic, so worded
  "can be reborn / may end up in" — NOT "all cola caffeine comes from decaf."

### Tier 7 — KNOWN-shortlist calls (1,699 → 1,694): 5 trims + 2 rewrites (user-selected set)
**5 trimmed** (each topic keeps a stronger sibling): `lungs-gas-exchange` (tennis-court → keeps
left-lung-smaller) · `coffee-origins-discovery-mystery` (Kaldi goats → keeps seedling + Boston-tea-party) ·
`viral-content-ocean-spray-doggface` (→ keeps small-enough-to-email) · `hip-hop-rappers-delight`
(→ keeps Kool-Herc-breakbeat) · `popcorn-expands-40-times` (→ keeps worn-in-hair).
**2 rewrites:** `viral-challenges-three-types` — user chose REWRITE over drop; pivoted from Tide-Pod/cinnamon
dares (KNOWN + age-gate) to the **2014 ALS Ice Bucket Challenge** ($115M in 8 wks → Project MinE → 2016 NEK1
gene; clean for 4+, keeps the topic). `search-engines-google-backrub` — **enriched** with the real payoff
(named "BackRub" for the **back links** it counted; renamed Google after "googol").
**Kept** (user's call) the rest of the §C shortlist: invisible-gorilla, blood-vessels-earth,
bone-stronger-steel, blood-never-blue, uncanny-valley, chinese-room (now sole Turing fact),
coffee-roasting-light>dark (sole), potato-famine (has a real idea), **babies-half-REM kept IN PLACE — did NOT
move to `sleep-dreams`** (categoryId moves are order-unsafe, see gotchas).

---

## WHAT'S LEFT

### A) Tier 8 — optional, structural (NOT started; user hasn't requested)
- **Terse-style normalization:** `astronomy`, `ocean-life`, `animals`, `space` are written more tersely than
  the rest of the library (revelations pass, presentation thin). A voice-consistency rewrite pass.
- **`history` de-dup / grab-bag:** its topics repeat angles owned by more specific categories. (Tier 4 already
  trimmed the roads/zero/piracy cross-dups; a deeper pass could keep going.)
- **Optional:** re-source `history/Roman Empire` back to 2 facts (dropped to 1 in Tier 4).

### B) DEFERRED OUTWARD BATCH — now DUE (was held until content tiers finished)
Run in this order (from `docs/topic-curation-and-quality-guide.md`):
1. **Regenerate the graph — don't hand-fix:**
   `pnpm normalize:tags && pnpm assign:themes && pnpm generate:related && pnpm export:facts`
   (rebuilds `relatedFactIds` + `themes` in the CSV and regenerates `exports/facts.json` to the current 1,694).
2. **Integrity (§5e):** 0 dup ids, 0 dangling related, no topic > 3, categories contiguous. (Read-only check
   already clean pre-regen; re-confirm after.)
3. **Age gate:** `pnpm check:age-rating` must be **0 BLOCK**. Read every WARN hit (high-FP regex prefilter).
   The Tier-2 rewrites (pirate, light-bulb) removed their flags; the Tier-7 Ice-Bucket rewrite mentions ALS
   as a disease (educational, non-graphic — expect a benign WARN at most). At Tier 3 the run was 0 BLOCK /
   39 WARN (all pre-existing allowed §9 FPs).
4. **App-seed sync:** `cp exports/facts.json ../Nib/Nib/Data/facts.json`.
5. **`collections.json` dangling/theme check — ONE KNOWN FIX NEEDED:**
   - **`great-transformations` still references `popcorn-expands-40-times`** (removed in Tier 7). The surviving
     Popcorn fact (`popcorn-thousands-years-old`, "worn in hair") does NOT fit the "transformation" theme, so
     **drop the ref** (collection 6 → 5 facts; consistent with prior-pass practice of dropping when there's no
     on-theme survivor). Fix in BOTH `exports/collections.json` and `Nib/Nib/Data/collections.json`.
   - All other 18 removed ids: **0 collection refs** (verified 2026-07-23). Re-sourced/rewritten ids (kept
     their `id` but changed subject): **none appear in any collection**, so no theme-mismatch cleanup needed.
6. **CDN publish** (per `cdn/README.md`): **`curl` the live manifest FIRST** to pick the next version
   (`https://cdn.nibapp.net/v1/manifest.json` — the memory notes have been wrong about versions before), then
   `cdn/build-manifest.sh <next-version> ../exports`, bump `contentVersion`, upload the **3 content JSONs
   first + `manifest.json` last**, verify with `curl` (200 + matching sha256s).
   - **Pin caveat:** the Nib app pins the daily pick per-day (`DailyFactStore`) — it keeps showing today's
     already-pinned fact until local midnight even after a new version lands; it re-picks correctly tomorrow.

---

## GOVERNING RULES (still in force)
- **`id` is PERMANENT** — never change it on a rewrite (relatedFactIds + collections point at it). All Tier
  5/6/7 re-sources were in-place rewrites (swap `headline`/`summary`/`body`/`tags` + recompute
  `readTimeSeconds`; `id`/`categoryId`/`topic` kept).
- **`summary` IS the push-notification copy** (not the headline). Headline must stand alone without its topic.
- **Regex/heuristics DO NOT judge wow-factor or age-appropriateness** — every call comes from reading the
  full fact.
- **4+ age gate (§9)** applies to headline **and** summary **and** body (all three burn onto Instagram slides).
  Auto-reject: self-harm/suicide in any framing, execution mechanics, torture/mutilation, murder-as-subject,
  sexual content, recreational-drug trivia.
- Body 60–90 words, grade 6–8; **don't pad sub-60-word bodies to a quota.**
- **`readTimeSeconds`** is stored in the CSV and only passed through by `export:facts` (nothing recomputes it).
  All this session's rewrites recomputed it as `round((headline+summary+body words)/120*60)` — the corpus
  best-fit (~4 s mean error; there is no exact recoverable original formula).

### CRITICAL gotchas
- **Removals/rewrites are order-safe. A categoryId MOVE is NOT** — moving a topic breaks the daily-pick
  rotation (categories must stay CONTIGUOUS in CSV/facts.json row order). This whole slate had **no moves**,
  only removes/rewrites/re-sources/folds, so it stayed order-safe. (This is why `babies-half-REM` was kept in
  `psychology/Sleep` rather than moved to `sleep-dreams`.)
- **`export:facts` only writes `facts.json`** — `categories.json`/`collections.json` are hand-maintained in
  `exports/` and must be synced by hand.
- **Always `curl` the live CDN manifest** before choosing the next version.

## Suggested next-session opening
Either (a) do **Tier 8** (terse-style normalization + optional Roman Empire re-source), or (b) go straight to
the **deferred outward batch (B)** to publish everything Tiers 1–7. If (b): run the 6 steps above in order;
the only non-mechanical step is the `great-transformations` collection fix (drop the popcorn ref) and reading
the age-gate WARNs.
