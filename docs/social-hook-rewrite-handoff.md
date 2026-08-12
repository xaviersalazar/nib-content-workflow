# Social Hook Rewrite — Handoff

Living doc for the `socialHook` backfill effort. Continue this in a fresh session by reading this file first — it has the exact in-flight batch so nothing needs to be re-derived from scratch.

**Origin:** [nib-social/docs/instagram-growth-strategy.md](../../nib-social/docs/instagram-growth-strategy.md) §9 (Hook Strategy) flagged that Nib's carousel headlines "hand over the answer before the swipe" — e.g. "A Day on Venus Is Longer Than a Year" states the entire payoff before anyone swipes. The fix decided on: a new `socialHook` field (schema in [content-schema-reference.md](content-schema-reference.md)), written by hand per-fact (not an LLM call), gradually backfilled. See [nib-social/docs/growth-pipeline-handoff.md](../../nib-social/docs/growth-pipeline-handoff.md) for the wider pipeline status this sits inside.

## Status

**🎉 Backfill complete: all 966 facts now have a `socialHook`.** Done in 43 phases across the 4-tier structure in `instagram-growth-strategy.md` §10 (Tier A → B → C → D, in that order, per-category or small same-theme category groups). Each phase was drafted, then written in via the CSV → export → diff-check → commit loop described below. Full per-fact detail (which phase, which category, done/pending) lives in the master ledger artifact from that session — ask the user for the link if you need to re-derive scope, since it isn't saved to a file in this repo.

| Step | Status |
|---|---|
| `socialHook` field added to schema/CSV/export | ✅ Committed (`1dafe86`) |
| Venus example (`venus-day-longer-than-year`) | ✅ Committed |
| 20-fact sample batch (space) | ✅ Committed (`afe1732`) |
| Remaining 5 Space facts | ✅ Committed (`c8c088f`) |
| Tier A (19 phases, 398 facts) | ✅ Complete |
| Tier B (11 phases, 321 facts) | ✅ Complete |
| Tier C (9 phases, 188 facts) | ✅ Complete |
| Tier D (4 phases, 59 facts) | ✅ Complete |
| **All 966 facts** | ✅ **100% complete** |

**Pick up here:** the backfill itself is done. What's left is downstream consumption — see [Related, still-open](#related-still-open-from-the-same-session) below: nib-social doesn't read `socialHook` yet, and it hasn't synced past `nib-content-workflow`'s own `exports/facts.json`.

## The method (apply to every future batch)

1. **Read the full fact** — `headline`, `summary`, `body` — never just the headline. The right formula depends on what kind of surprise the fact actually has.
2. **Pick a formula per fact, don't force one pattern.** The 10 formulas are in the strategy doc §9: Counterintuitive, Hidden Reality, Scale, Historical Twist, The Catch, Forbidden/Banned, Countdown/Threshold, Direct-Address Provocation, Comparison Flip, Unsolved/Open Question.
3. **Never introduce a claim, number, or comparison that isn't already in that fact's own body/summary.** This bit twice drafting the batch below — e.g. a first draft claimed the Antikythera mechanism was "too advanced for another 1,000 years," which isn't stated in that fact's body, so it got rewritten to stick only to what's actually there. This matters specifically because `socialHook` lives in the same pipeline that enforces "verified, not scraped" — general knowledge that's *probably* true doesn't clear that bar, only what the sourced fact itself supports does.
4. **Not every fact needs a rewrite.** A few in the batch below (`exoplanets-rogue-planets`, `perception-brain-fills-gaps`, `dolphins-signature-whistle`, `mirage-bending-light`) already open a gap reasonably well — don't force churn for its own sake.
5. **`headline` never changes.** It's the app-facing field; `socialHook` is additive and Instagram-only.

## The first batch (historical — kept as a worked example of the method)

Sample chosen across 5 categories (space, mysteries, psychology, animals, illusions-perceptions) to sanity-check formula variety before scaling up — this was explicitly *not* a Tier-A sweep or a full-database pass, just a first review batch.

| Fact id | Category | Formula | Current `headline` (unchanged) | Proposed `socialHook` |
|---|---|---|---|---|
| mars-search-for-life | space | Comparison Flip | Sunsets on Mars Are Blue | Everything you know about sunset colors is backwards on this planet. |
| asteroids-dart-changed-orbit | space | Historical Twist | Humans Have Successfully Moved an Asteroid | In 2022, humans did something no one in history had ever managed — on purpose. |
| exoplanets-rogue-planets | space | Hidden Reality | Somewhere Out There, a Planet Is Drifting Through Eternal Darkness — Alone | There's a planet out there that has never once seen a sunrise. |
| asteroids-less-mass-than-moon | space | Comparison Flip | All the Asteroids Together Weigh Less Than the Moon | Combine every asteroid ever discovered into one ball, and it still wouldn't outweigh the object next door. |
| amelia-earhart-final-flight | mysteries | Unsolved | Amelia Earhart Vanished Almost Within Reach of Land | Amelia Earhart's last words were a radio call for help — and then nothing, ever again. |
| antikythera-ancient-computer | mysteries | Historical Twist | Sponge Divers Found an Ancient Marvel by Accident | Divers looking for sponges accidentally found a machine too advanced to explain. |
| area-51-real-base | mysteries | Forbidden/Banned | Many 'UFOs' Over Area 51 Were Secret Spy Planes | The government spent decades letting people believe they'd seen aliens — because the truth was classified. |
| antikythera-predicted-eclipses | mysteries | Historical Twist | The Ancient Device Came With an Instruction Manual | Two thousand years ago, someone engraved a step-by-step guide into solid bronze. |
| attention-cannot-focus-everything | psychology | Direct-Address | Half of People Miss a Gorilla in Plain Sight | You would swear you'd notice a gorilla walk across the screen. Half the people watching didn't. |
| decision-making-environment-shapes | psychology | Counterintuitive | One Checkbox Decides Who Donates Organs | Two countries, equally generous people — but one has six times more organ donors, because of a single checkbox. |
| motivation-money-association | psychology | Counterintuitive | Paying Kids to Draw Made Them Enjoy It Less | The reward was supposed to make kids like drawing more. It did the opposite. |
| perception-brain-fills-gaps | psychology | Hidden Reality | You're Hallucinating Part of What You're Seeing Right Now | Part of what you're looking at right now isn't really there — your brain just invented it. |
| octopus-mothers-stop-eating | animals | Scale | Mother Octopuses Sacrifice Themselves for Their Eggs | An octopus mother won't eat a single meal for months while she guards her eggs. |
| dolphins-signature-whistle | animals | Hidden Reality | Every Dolphin Has Its Own Name | Every dolphin in the ocean answers to its own personal name. |
| dolphins-mud-rings | animals | Hidden Reality | Dolphins Hunt Using Mud Traps | One hunting trick lets dolphins make fish jump straight into their mouths. |
| penguins-fathers-incubate | animals | Scale | Penguin Fathers Balance Eggs on Their Feet | An emperor penguin father will go two months without eating or ever putting the egg down. |
| depth-perception-motion-parallax | illusions-perceptions | Historical Twist | Some People Cannot See in 3D at All | One woman didn't see in 3D for decades. Then, seemingly overnight, everything popped. |
| mirage-bending-light | illusions-perceptions | Hidden Reality | A Mirage Can Conjure Floating Cities and Ghost Ships | Sailors have spotted entire floating cities that were never actually there. |
| mirage-looming | illusions-perceptions | Historical Twist | A Mirage Can Show You a Sun That Has Already Set | In 1597, a group of explorers watched the sun rise two weeks before it possibly could have. |
| pareidolia-faces-randomness | illusions-perceptions | Unsolved | A Face on Mars Turned Out to Be a Hill | For decades, people were certain NASA had photographed a face carved into Mars. |

## How to write a batch in

Once a batch is approved (as-is or with edits), same procedure as the Venus example:

```bash
cd nib-content-workflow
cp approved-content/approved-facts.csv "approved-content/approved-facts.backup-socialhook-$(date +%Y%m%d-%H%M%S).csv"
```

Then a small Python script (safer than hand-editing a 966-row CSV): read with `csv.DictReader`, set `socialHook` on the approved rows by `id`, write back with **`lineterminator='\n'`** explicitly — Python's csv module defaults to `\r\n`, which touches every line in the diff even when only one column changed (bit this exact step once already, see commit `1dafe86`'s history if useful context). Then:

```bash
pnpm export:facts
git diff exports/facts.json   # sanity-check only the intended facts changed
```

Commit using this repo's own terse convention (see recent `git log` — mostly single-line `feat:`/`chore:` subjects, rarely a body).

## Scoping the rest — resolved

The original scoping question (Tier A only vs. everything) was superseded: the user asked for all 966 facts broken into a full tier structure (A/B/C/D, extending the growth-strategy doc's original tiering to cover every category, not just the original ~680-fact subset), then ran the whole thing to completion in "auto mode" — each phase drafted and auto-approved on formula-fit + no-fabrication judgment, with the batch shown to the user for visibility after each phase rather than before. That's how all 966 got done in one session. See `instagram-growth-strategy.md` §10 for the final tier table.

## Related, still-open (from the same session)

- **nib-social doesn't consume `socialHook` yet.** The studio's "Cover hook" field (Phase 1) still only knows its own local override state — it doesn't default to `fact.socialHook` when the database has one. Once a real batch of facts carry the field, `nib-social/src/App.tsx`'s fact-reset effect should prefer `fact.socialHook` over `fact.headline` as the default. Not done.
- **Sync not done.** This field only exists in `nib-content-workflow`'s `exports/facts.json` so far — not synced to `nib-social/public/data/facts.json`, the Nib app's bundled copy, or the CDN. Hold off until there's a real batch worth shipping, not one example.
- **Hook-rewriting-as-a-feature is still manual.** No auto-suggestion in the studio itself — this whole effort is a one-time-per-fact hand backfill, not a generation mechanism. (Two other options — LLM-drafted or a heuristic nudge — were discussed and explicitly not chosen; see growth-pipeline-handoff.md's "Gap: hook rewriting is still manual" section.)
