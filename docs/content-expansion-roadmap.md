# Nib Content Workflow

# Content Expansion Roadmap

---

# Purpose

A forward-looking plan for growing the content library **after** the initial
launch set is fully drafted.

This is a planning document, not a production queue. Nothing here should be
scraped or drafted until the current launch backlog (the `pending` rows in
`source-registry/sources.csv`) is complete.

The goal is:

Grow breadth deliberately.

Keep trust high.

Avoid running dry on the Categories, Collections, and Series ("Journeys") screens.

---

# Where We Stand

Snapshot at time of writing (June 2026):

- **56 categories**
- **737 topics**, capped at 3 facts each (the best 3 per topic)
- **102 topics scraped/`complete`**; the rest `pending` (the launch backlog)
- **Britannica = ~63% of topics** (463 of 737) — down from ~78%, and trending
  the right way as specialist institutions come online (NASA, Smithsonian,
  National Geographic, Cleveland Clinic, Investopedia, USGS, etc.)

The 20 newest categories were just added at **10 topics each**:

> Ancient Creatures · Castles & Fortresses · Colors · Dinosaurs · Everyday
> Objects · Explorers · Famous Disasters · Famous Symbols · Famous Trees &
> Plants · Household Science · Human Behavior · Human Civilization · Illusions &
> Perception · Insects · Pirates · Secret Codes · Sleep & Dreams · Strange Jobs ·
> Strange Places · Superstitions

The original 36 categories run deeper (14–23 topics each).

At one fact per day, the launch set alone is **5+ years** of daily content.

The takeaway: expansion is **not** about avoiding a content shortage. It is about
three things —

1. **Breadth** — the Categories and Collections screens should feel alive and
   keep growing.
2. **Seasonal relevance** — timely drops that match the calendar.
3. **Marketing beats** — a recurring "new this month" story for retention.

---

# 2026-10-04 Re-plan: Ghosts, Hoaxes, Legends & Grittier Content

The app is moving to a **13+ rating** with no age filter, and the content database gains a **`contentType`**
axis (`fact` / `legend` / `hoax` / `theory` / `mystery` / `possibility` — see the writing guide §5, §9). That
unlocks the most compelling material the 4+ gate and the "verifiable fact" rule were silently filtering out
(see `docs/age-preference-and-legends-handoff.md`). This section re-points the schedule at it; the tables
below are updated to match. **The cadence rules are unchanged** (category on the 1st, Collections on the 15th,
Series on the 22nd every other month).

**Baseline: 13+.** The roadmap is written for a 13+ audience — the grittier material (murder history,
executions-as-history, forensics, horror folklore, hauntings with their dark backstories) is the *point*, not an
exception lane. The only hard stops are the guide's §9 floor (self-harm, sexual content, graphic torture/gore) and
Apple's own rules.

**The 13+ rating is handled separately** (owner updates it in App Store Connect) and is assumed in place for
this plan — it is not a blocker or a scheduling dependency here.

**App dependency:** old builds ignore `contentType` and unknown values decode as `fact`, so legend/hoax
content *can* ship before the app's `002-content-types` change (it just renders without the type badge or
"Today's Legend" masthead). The hedging rule (guide §5) is what protects the reader until then — so a
non-`fact` entry that fails to hedge in headline **and** summary **and** body must not ship either way.

**What was displaced (still good — see "Displaced categories" in the backlog):** Reptiles & Amphibians (Oct),
Fungi & Mushrooms (Nov), Holidays & Traditions (Dec), Perfume & the Science of Smell (Feb), Camouflage &
Mimicry (Mar), Birds (May), Games & Puzzles (Jul). **Kept:** Survival (shipped Aug), Poisons (Jan),
Microscopic Life (Apr), Heists, Escapes & Cons (Jun).

**Seasonal logic:** it's October, so **Ghosts & Haunted Things** goes first, as a one-off off the usual 1st
(Oct 1 has passed). Target **Mon Oct 19** — not the 15th (Collections) or 22nd (Series); latest workable date is
**Oct 26** so it still lands before Halloween. Its 16-day NEW window runs ~3 days into the Nov 1 category's, so two
categories briefly read "new" — acceptable once, don't repeat it.

---

# The Monthly Cadence (the rule this roadmap follows)

Every month ships **two** drops, and **every other month** a third:

1. **One new category** (8–10 topics) for the Categories screen — dropped at the
   **start of the month (1st)**.

   Every month adds a genuinely new tile — not an expansion of an existing one.
   A calendar tie is welcome where it fits, but **not required**: a category
   doesn't have to relate to anything on the calendar. Some of the best tiles are
   simply *unexpected and genuinely intriguing* — things people won't see coming
   but can't help tapping. (Deepening existing categories is still worthwhile, but
   it's an *opportunistic, analytics-driven* activity — see the expansion backlog
   below — not the monthly drop.)

2. **Two new Collections** — a curated, cross-category journey each, both dropped
   together on the **15th** (a mid-month beat, separate from the category on the 1st).

   Collections are **curation, not new content**: each one is a hand-picked
   `factIds` list drawn from facts that already exist (see
   `Nib/Nib/Models/Collection.swift`). With 56 categories and 2,000+ facts live,
   we can ship *two* fresh Collections a month *without drafting a single new
   fact* — pure packaging and two free marketing beats. Keep them **de-duped**
   (no repeating a shipped Collection, minimal fact overlap between them) and
   tie them to the month's holidays, seasons, or events. Within that, go
   **wacky** — the unexpected, off-the-wall angle ("Food Coma," "You've Been
   Fooled," "The Chemistry of Love") outperforms the safe one.

3. **One new Series** — a bounded, documentary-style set (8–15 facts) on a single
   named subject (an island, a doomed mission, a disaster) — dropped on the
   **22nd, every other month** (six a year, not twelve). See
   [§ New Series Every Other Month](#the-content-drop-new-series-every-other-month)
   below for why it's slower than the other two and how it's sourced.

A healthy month = **one intriguing new category (1st) + two themed Collections
(both on the 15th)**, and **every other month** a third beat: **one Series (22nd)**.
The three drop days never share a type or a date — each is its own standalone
editorial event on Today.

---

# The Content Drop: New Categories Every Month

## The monthly driver — Add New Categories

The scheduled monthly drop is **always a new category**. New categories fill
genuine gaps in the taxonomy, keep the Categories screen visibly growing, and
each one onboards at least one new specialist institution — which advances the
source-diversification goal. See the 12-month schedule below and the Year-2
backlog.

**A seasonal hook is optional.** Match the calendar when it's a natural fit, but
don't force it — a category earns its slot by being *intriguing*, not by lining up
with a holiday. Reach for the **unexpected**: subjects people would never think to
search for but find irresistible once they see the tile. After the 2026-07-14
fascination-first rewrite, **most** of the schedule below does this (Survival & the
Body's Limits, Forensics & Crime-Solving, Poisons/Venom & Toxins, Perfume & the
Science of Smell, Microscopic Life, Heists/Escapes & Cons), and the "Unexpected &
Intriguing" bank below is stocked with more (Time & Timekeeping, Twins & Cloning,
Echoes & Acoustics, and others).

## The opportunistic supplement — Expand Existing Categories

Deepening a category the user already browses is **lower risk and lower effort**
than standing up a new one: the audience is proven, the sources are validated, and
no new app-side category metadata (color token, icon, description) is required.

But expansion is **not** part of the monthly cadence — it's an *opportunistic*
move you make **on top of** the schedule when analytics reveal a winner worth
deepening. The 20 newest categories sit at only 10 topics and are the prime
candidates. Pull from the Existing-Category Expansion Backlog below whenever a
category earns it.

---

# The Content Drop: New Series Every Other Month

## Why Series runs on a slower clock than Category and Collections

A Series ("The Spread" in-app) is a **documentary, not a set or a category** — 8–15
facts that explain one bounded, named subject end to end (an island, a doomed
mission, a city frozen in time), mixing facts that already exist with a handful
drafted specifically for that subject. That makes it the **heaviest** of the three
drops to produce: unlike a Collection (pure curation, zero drafting), a Series
still needs new-fact authoring — just scoped to one subject instead of a whole
category's 8–10 topics.

The app's own "NEW" badge windows already encode this: Categories and Collections
show their pill for **16 days**; a Series shows it for **64 days** — four times
longer, because the app was built assuming Series ships far less often than
monthly. A bi-monthly cadence (a new Series roughly every 60 days) lands each
next drop just as the previous one's badge is finishing its run — no overlap,
no two Series reading "new" at once. **Do not schedule a Series more often than
every other month** without also shrinking that badge window in the app
(`FeaturedSeriesPicker.newBadgeWindow`) to match, or two will show "NEW"
simultaneously.

The **22nd** was chosen deliberately: it's not the 1st (Category) or the 15th
(Collections), and the app's Today whisper can only ever show **one** card at a
time — the newest undismissed drop (`NewDropState.todayCard`). Two drop types
landing on the same day means one silently loses its Today moment (it still gets
a tab dot and a durable home in its tab, just not the flagship Today card). Never
move a Series drop onto the 1st or the 15th.

## Sourcing a Series

Same validation discipline as a new category: confirm the subject's facts are
either already live (check `facts.json`) or genuinely new topics absent from
`source-registry/sources.csv`, prefer a specialist institution per new topic, and
route around any category/Collection that already owns the angle (see the
de-dup notes in the category table above — a Series pulling from, say, `space`
or `history` needs the same cross-check). A Series also needs a
`NibColors.topicColorMap` entry before it ships (one per Series, app-side).

Because the reveal gate (`nib-docs/content-reveal-gate.md` in the Nib app repo)
decouples publishing from the reveal date, a Series can be drafted and CDN-staged
weeks ahead of its 22nd debut with zero risk of it leaking early — publish with
`addedAt` set to the real date and let the gate hold it invisible until then.

The cheapest possible Series is one built around a subject that's **already a
topic somewhere in `sources.csv` with `status=complete`** — its 1–3 anchor facts
are already scraped and drafted, so the Series-specific work is just the
cross-category pull plus a handful of new facts for the narrower angle (see
Production Math). The 12-month schedule below and the Series Backlog do exactly
this: every scheduled/bench Series is anchored to a real, already-complete topic
row, verified against `facts.json` and `sources.csv` directly (not guessed).

---

# 12-Month Schedule — Launch Year (Aug 2026 → Jul 2027)

**Launch is July 2026.** Expansion begins the month *after* launch, so the first
drop lands **August 2026** and the launch year runs **Aug 2026 → Jul 2027**.

This is **not** the old schedule shifted a month. Each slot was re-chosen for the
month it actually lands in. The rhythm each month:

- **1st** → the month's new **category** goes live.
- **15th** → **both** of the month's new **Collections** drop together.
- **22nd, every other month** → the month's new **Series** drops (six across the
  year — see [§ New Series Every Other Month](#the-content-drop-new-series-every-other-month)
  and the schedule table below). Aug/Oct/Dec/Feb/Apr/Jun carry a Series; the
  in-between months don't — that's the point, not a gap to fill.

Categories are now **fascination-first**: each earns its slot on "wait, really?" alone
(**Survival & the Body's Limits** in Aug, **Forensics** in Sep, **Poisons, Venom & Toxins**
in Jan, **Microscopic Life** in Apr, **Heists, Escapes & Cons** in Jun). The Collections
carry the seasonal weight, and lean **wacky**. All new category topics below are
confirmed **not** already present in `sources.csv`, and every Collection is built
from facts that **already exist** (re-run both checks before staging — the registry
keeps growing).

## New category — one per month (drops on the 1st)

**Fascination-first (2026-07-14 rewrite).** After the flat-fact weed-out, the roster was re-cut so **every
category earns its slot on "wait, really?" alone** — not on a calendar tie. Six categories from the prior draft
were structurally flat (abstract concepts, how-it-works mechanisms, or advice topics — the same profile as the
259 facts we removed) and were swapped for high-curiosity picks. The **seasonal weight now lives entirely in the
Collections** (which already carry it), freeing each category to be genuinely intriguing. Kept categories are the
ones that are *both* seasonal and genuinely tappable.

| Month | New Category *(new, 10)* | Topics | Why this slot |
| --- | --- | --- | --- |
| **Aug '26** | ✅ **Survival & the Body's Limits** 🆕 | The Rule of Threes, The Mammalian Dive Reflex, Paradoxical Undressing, The Death Zone, Freediving, The Bends, G-Force, Surviving Without Food, Wilderness Survival, The Will to Live | *Fascination-first* — shipped |
| **Sep '26** | ✂️ *Forensics & Crime-Solving — dropped (auto-rejected at 4+; revived as a 13+ category in Mar '27)* | — | See Mar '27 |
| **Oct '26** *(Oct 19)* | **Ghosts & Haunted Things** 🆕 | Pepper's Ghost, The Fox Sisters, Winchester Mystery House, The Ouija Board, Spirit Photography, The Mary Celeste, Tutankhamun's "Curse", The Bell Witch, The Hope Diamond, Amityville | **Halloween.** Mix of `hoax` / `legend` / `theory` / `fact` — verified history & science *around* the belief (Amityville: real murders, admitted-fabricated haunting; Hope Diamond: the curse was a publicity story). Never asserts the supernatural is real. Replaces Reptiles & Amphibians. Bench: Infrasound, Jersey Devil, Brown Mountain Lights, Stanley Hotel. *Built 2026-10-05: 28 facts, `addedAt` 2026-10-19T09:00:00Z, icon `theatermasks`; app color to add in `NibColors.topicColorMap`: `"ghosts & haunted things": "#A8708C"  // Dusty orchid — candlelit séance` (not yet applied — Nib repo untouched).* |
| **Nov '26** | **Hoaxes & Frauds** 🆕 | Piltdown Man, The Cardiff Giant, The Cottingley Fairies, The Great Moon Hoax, The Vinland Map, The Turk (Fake Chess Robot), The FeeJee Mermaid, The War of the Worlds Broadcast, Archaeoraptor, The Surgeon's Photograph | Almost all `hoax` — each states the deception *and* how it was exposed. Replaces Fungi & Mushrooms. Fox Sisters + Spirit Photography stay in Ghosts; Han van Meegeren stays in Heists |
| **Dec '26** | **Spies & Secret Operations** 🆕 | Operation Mincemeat, The Ghost Army, Bletchley Park, The Cambridge Five, The Berlin Tunnel, The Venona Project, The Glomar Explorer, Acoustic Kitty, The Great Seal Bug, Spy Pigeons | Cold-war-winter tone; verified declassified history. Replaces Holidays & Traditions (the holiday beat lives in the Collections). Routes around secret-codes/Enigma Machine & Navajo Code Talkers |
| **Jan '27** | **Poisons, Venom & Toxins** 🆕 | Arsenic & the Marsh Test, The Radium Girls, Botulinum → Botox, The Poison Garden, Cyanide, Poison Dart Frogs, Box Jellyfish, Pufferfish (Tetrodotoxin), Curare, Polonium | *Fascination-first*; now because poison-as-murder-weapon is 13+ envelope. Poisons leans on the 13+ envelope (poison as a murder weapon) — keep the tone rule in guide §9 |
| **Feb '27** | **Folklore Around the World** 🆕 | Kitsune, The Yōkai Night Parade, Baba Yaga, The Nian (Lunar New Year, Feb 6), Anansi the Spider, The Golem of Prague, La Llorona, Selkies, Chupacabra, The Headless Horseman | Mostly `legend` — "the story goes…", origin first recorded, what's known. Counter-programs a thin Western myths-legends. Replaces Perfume & the Science of Smell |
| **Mar '27** | **Crime & Forensics** 🆕 | Time of Death, Blood Spatter (Sam Sheppard), Forensic Odontology (Ted Bundy), The Body Farm, Genetic Genealogy (Golden State Killer), Ballistics (St. Valentine's Massacre), Forensic Anthropology, DNA Fingerprinting, The Polygraph, Locard's Exchange Principle | The original Sep category, restored to its murder-centered form; non-graphic treatment only. Replaces Camouflage & Mimicry |
| **Apr '27** | **Microscopic Life** 🆕 | Demodex Face Mites, Tardigrades, Are Viruses Alive?, Dust Mites, The Brain-Eating Amoeba, Extremophiles, Diatoms, Rotifers, Leeuwenhoek's 'Animalcules', Biofilms | Earth Day → the invisible living world |
| **May '27** | **Dark History: Plagues, Panics & Trials** 🆕 | The Salem Witch Trials *(already scraped)*, The Black Death, The Dancing Plague of 1518, Trial by Ordeal, The Cadaver Synod, Plague Doctors, The Defenestration of Prague, The Great Stink, The Children's Crusade, MKUltra | Biggest gap in `history` (7 topics). Salem's ergot explanation is a `theory`; Children's Crusade is a `legend`. Replaces Birds |
| **Jun '27** | **Heists, Escapes & Cons** 🆕 | The Gardner Museum Heist, The Antwerp Diamond Heist, The Alcatraz Escape, D.B. Cooper, Han van Meegeren (Art Forgery), Victor Lustig & the Eiffel Tower, Charles Ponzi, The Great Train Robbery, The Hatton Garden Heist, Houdini & Escapology | Summer heist-movie energy. **Dedup:** forger/con items vs Hoaxes & Frauds — van Meegeren, Lustig, Ponzi stay here; Hoaxes keeps pranks, fakes and fabrications |
| **Jul '27** | **Cursed Objects & Lost Treasure** 🆕 | The Koh-i-Noor, The Amber Room, The Lost Dutchman's Mine, El Dorado, The Beale Ciphers, The Library of Alexandria, Sutton Hoo, The Staffordshire Hoard, The Lima Treasure | Summer treasure-hunt energy; `legend` / `theory` / `fact` — curse and murder backstories welcome (Hope Diamond now ships here *or* in Ghosts; keep it in one). Replaces Games & Puzzles. Routes around pirates/Treasure Maps and mysteries/Oak Island |

**Specialist source per new category** (the "every category onboards a new institution" rule; all candidates
need a verified source table approved by the owner before anything is registered):
Survival → Cleveland Clinic / National Geographic / Divers Alert Network · Ghosts → Linda Hall Library / Royal Museums
Greenwich / Strong Museum of Play / National Geographic / Smithsonian (Appendix A of the handoff has the vetted URLs for the first six; Bell Witch, Hope Diamond and Amityville still need verified sources — hobbyist sites are the risk) · Hoaxes →
Smithsonian / Natural History Museum / PBS / National Geographic · Spies → CIA Museum & *Studies in Intelligence* /
NSA / International Spy Museum / Imperial War Museums · Poisons → Natural History Museum (London) / Science History
Institute · Folklore → Smithsonian Asian Art / British Library / Folklore Society · Crime & Forensics → Smithsonian /
National Institute of Justice / FBI History · Microscopic Life → CDC / NIH · Dark History → Britannica + Science
History Institute / British Library · Heists → FBI History (The Vault) / Smithsonian · Cursed Objects → Smithsonian /
British Museum.

**No Wikipedia** (owner rule). Legend entries need a source for the story's *origin* (who first recorded it, when),
not just its content — otherwise the "verifiable" requirement fails.

**De-dup flags to honor at draft time:** Ghosts owns Fox Sisters + Spirit Photography (Hoaxes routes around them);
Hoaxes routes around Crop Circles and the Loch Ness Monster topics (existing in mysteries / myths-legends — use the
Surgeon's Photograph only as the hoax itself); Spies routes around secret-codes (Enigma, Navajo Code Talkers,
Steganography) and uses Bletchley's *people and place*; Folklore routes around myths-legends (Fairies, Mermaids,
Werewolves, Dragons, Norse Mythology) — pick distinct creatures; Crime & Forensics routes around human-body/
Fingerprints and strange-jobs/Forensic-Entomologists (the maggot clock; also the one `excluded-age-rating` row to
re-evaluate under 13+); Poisons/Poison-Dart-Frogs coordinates with Frogs now living in the displaced Reptiles &
Amphibians category (route the toxin angle here); Dark History routes around history/Titanic and
famous-disasters; Cursed Objects routes around pirates, Oak Island and anything already in Ghosts (Hope Diamond, Tutankhamun);
Heists/Houdini means any future *Magic & Illusions* category must route around Houdini; Microscopic Life routes
around human-body/Gut-Microbiome and Geography/Rainforests (plankton-oxygen).

## New Series — one every other month (drops on the 22nd)

Six slots (Aug/Oct/Dec/Feb/Apr/Jun), each anchored to a real, already-`complete`
topic — verified directly against `facts.json` and `sources.csv`, not guessed.
Titles below are working titles; the exact `factIds` set and any brand-new facts
get finalized at draft time, same as a Collection.

| Month | New Series | Anchor topic *(existing, complete)* | Live facts today | Why this slot |
| --- | --- | --- | --- | --- |
| **Aug '26** | **The Titanic** — "Built Unsinkable" | history/Titanic | 3 | Pairs with Aug's **Survival & the Body's Limits** category — the real hook isn't the engineering, it's a cold-water survival story (hypothermia, the lifeboat math) |
| **Oct '26** | **The Bermuda Triangle** — "The Mystery That Wasn't" | mysteries/Bermuda Triangle | 1 | Halloween-adjacent and the perfect foil to Oct 19's Ghosts category — the hook is the mundane, verifiable explanations (weather, currents, human error) behind the legend; use `legend`/`theory` labels where it states the myth |
| **Dec '26** | **The Enigma War** — "The Machine That Wasn't Unbreakable" | secret-codes/Enigma Machine | 2 | Pairs with Dec's **Spies & Secret Operations** category (Bletchley Park) and pulls Navajo Code Talkers (3) + Steganography from secret-codes. *(Replaces Voyager Program → Series Backlog.)* |
| **Feb '27** | **Dyatlov Pass** — "The Case That Won't Close" | mysteries/Dyatlov Pass | 1 | A `theory`/`mystery`-labelled Series: what was found, the official conclusion, and the competing explanations — never one answer as *the* answer. 13+ lane (nine deaths). *(Replaces Nellie Bly → Series Backlog; the anchor has only 1 live fact, so budget real drafting.)* |
| **Apr '27** | **Chernobyl** — "The Zone That Became a Sanctuary" | famous-disasters/Chernobyl | 3 | Echoes Apr's Earth Day "Our Planet" Collection — the exclusion zone's unplanned rewilding is the counter-intuitive angle, not a disaster recap |
| **Jun '27** | **The Salem Witch Trials** — "Anatomy of a Panic" | history/Salem Witch Trials *(scraped `complete`, **0 live facts** — drafted with May's Dark History category)* | 0 | Lands a month after May's **Dark History** category, which already drafts Salem's anchor facts; the Series adds the ergot `theory`, mass-hysteria angle and the trials' aftermath. Budget as a mini-category, not a light Series. *(Replaces Area 51 → Series Backlog.)* |

**Series tone (2026-10-04):** with a 13+ baseline, Series lean into `mystery`/`theory`/`legend` subjects (Bermuda
Triangle, Dyatlov, Salem) — each fact is typed and hedged per guide §5, and a Series that mixes types should lead
with its verified facts and put the contested ones in the middle, never the opener.

**De-dup flags honored:** all six route around subjects already spoken for —
**Socotra / Pompeii / Apollo 13** (already-shipped Series); **Atlantis, Roanoke
Colony, Easter Island, Voynich Manuscript** (reserved for the "Lost to Time"
Collection idea below); **Shackleton** (reserved for "Against the Odds," paired
with Survival); **Cottingley Fairies, the FeeJee Mermaid, War of the Worlds**
(reserved for "Caught in the Act," now paired with Nov's Hoaxes & Frauds category — they were never live facts;
the pairing waits on that category shipping).

**Specialist source per Series** (same diversification rule as categories):
Titanic → Britannica (already the anchor's source; pull cross-category facts
from specialist-sourced topics where possible) · Bermuda Triangle → Britannica ·
Enigma War → Britannica + NSA / Bletchley Park Trust · Dyatlov → National Geographic · Chernobyl → Britannica (lean on
IAEA/UN Chernobyl Forum sources for the rewilding angle when drafting new facts)
· Salem → Britannica + a specialist (Salem Witch Trials Documentary Archive / Smithsonian).

## Collections — two per month (both drop on the 15th)

Each Collection is a curated pull from **existing** facts (illustrative members
shown; final `factIds` verified — and de-duped across Collections — at build).

> **Collections now carry the calendar.** Since the 2026-07-14 rewrite made the
> *categories* fascination-first, the month's two Collections are where every
> seasonal beat lives (Perseids, back-to-school, Halloween, Valentine's, Earth Day,
> solstices, etc.). The schedule below already does this — every month's holiday/
> season hook is a Collection, so no category has to chase the calendar. As each new
> fascination category ships, it unlocks fresh Collection material too (e.g. after
> **Poisons** drops, a "Deadly Beauty" pack; after **Forensics**, a "Caught in the Act").
>
> **Timing note (2026-07-28 cadence change).** Both Collections now drop together on
> the **15th** (previously one on the 1st, one on the 15th). The two columns below are
> just the two Collections for that month, not two different dates. A few packs were
> chosen for an *early-month* holiday when they rode the 1st — **April Fools'** (Apr 1)
> and **Lunar New Year** (Feb 6) — so on a strict 15th drop their calendar hook lands
> late. When a holiday genuinely demands it, drop that month's pair a few days early
> rather than splitting them back across two dates.

### Recent additions are part of the pool, not just the launch database

The 24 Collections in the schedule below were picked against the content that
existed *before* this cadence started. That's a snapshot, not a ceiling — every
month a new Category (1st) lands ~25 fresh facts, and every other month a new
Series (22nd) lands another handful on a bounded subject. By month six there's
5–6 categories' + 2–3 Series' worth of material the original 24 picks never had
access to. **Treat that as live inventory, not a one-time bonus:**

- **Before finalizing a month's two Collections, check what's shipped in the
  trailing ~2 quarters** (not just a whole-database search) — a recently-landed
  Category or Series is usually the freshest, most on-brand material available,
  and a Collection that deepens it doubles as a quiet reinforcement of that
  drop's own "new" moment (a reader who noticed the Category weeks ago
  rediscovers it via a Collection).
- **Same-month pairing is usually too tight to plan for** — the 1st-to-15th gap
  is two weeks, only workable if that month's category was staged and drafted
  well ahead of time (see Production Math's "stage rows about a month ahead").
  The reliable pairing window is a **prior** month's Category or Series, not
  necessarily the current one's.
- **This is additive, not retroactive** — it's a rule for picking future
  Collections as the year unfolds, not a mandate to re-plan the 24 already
  scheduled below (several already have their own solid seasonal logic).
- The pattern already exists in practice — four "fascination-first" Collection
  ideas below were built specifically to pair with a newly-shipped category
  (Poisons → "Nature's Assassins," Forensics → "Caught in the Act," Microscopic
  Life → "The Invisible World," Survival → "Against the Odds"). Three more now
  do the same for the new Series schedule (Titanic, Bermuda Triangle, Dyatlov —
  see the Collection Ideas Bank). Keep extending this bank every time a
  Category or Series ships, so there's always a ready-made pairing on hand the
  next time a month's picks are due.

| Month | Collection 1 (15th) | Collection 2 (15th) |
| --- | --- | --- |
| **Aug '26** | ✅ **"Written in the Stars"** — Meteor Showers, Comets, Supernovas, Auroras, Cicadas *(Perseid peak, Aug 11–13)* | ✅ **"Too Hot to Handle"** — the Sun, Red Giants, Volcanoes, Lasers, Deserts *(dog days of summer)* |
| **Sep '26** | ✅ **"How Your Brain Learns"** — Memory, Attention, Decision Making, Motivation, Machine Learning *(back-to-school)* | ✅ **"Your Lying Eyes"** — Color Illusions, Motion Illusions, Mirage, The Dress, Placebo Effect *(how your brain fools you)* |
| **Oct '26** | **"Spooky Science"** — Bats, Spiders, Black Cats, Friday the 13th, Catacombs of Paris *(Halloween)* | **"Haunted by Science"** — Sleep Paralysis, Pareidolia, the Taos Hum, Mirage, Nightmares *(brain-and-physics explanations for "ghosts"; pull in Ghosts-category facts if it ships first)* |
| **Nov '26** | **"Around the Table"** — Chocolate, Honey, Salt, Spices, Coffee *(Thanksgiving feast)* | **"Cold Cases of History"** — Amelia Earhart, Roanoke Colony, Voynich Manuscript, Dyatlov Pass, the Wow! Signal *(unsolved, mostly `mystery`/`theory`)* |
| **Dec '26** | **"Festive & Frozen"** — Snow, Auroras, Hibernation, Glaciers, Crystals *(winter solstice, Dec 21)* | **"Code & Cipher"** — Enigma Machine, Morse Code, Navajo Code Talkers, Steganography, Pigpen Cipher *(pairs with Dec's Spies & Secret Operations category)* |
| **Jan '27** | **"Fresh Start"** — Habits, Motivation, Decision Making, Goals *(New Year resolutions)* | **"Spy vs. Spy"** — Operation Mincemeat, Ghost Army, Great Seal Bug, Acoustic Kitty, Bletchley Park *(pairs with Dec's Spies & Secret Operations category)* |
| **Feb '27** | **"Legends vs. Reality"** — the Nian (Lunar New Year, Feb 6), Kitsune, Yōkai, Dragons, Chupacabra *(pairs with Feb's Folklore category; the `legend` type's showcase)* | **"The Chemistry of Love"** — Heart, Heart Symbol, Red, Pink, Chocolate *(Valentine's Day, Feb 14)* |
| **Mar '27** | **"Things That Grow"** — Bees, Butterflies, Baobab Trees, Pollination, Beetles *(spring equinox, Mar 20)* | **"The Luck of the Draw"** — Four-Leaf Clovers, Horseshoes, Rainbows, Probability, Black Cats *(St. Patrick's Day, Mar 17)* |
| **Apr '27** | **"You've Been Fooled"** — Optical Illusions, Mirage, Placebo Effect **plus 2–3 `hoax` facts from Nov's Hoaxes & Frauds** *(April Fools' Day — the strongest pairing in the year)* | **"Our Planet"** — Oceans, Climate, Glaciers, Rainforests, Recycling Symbol *(Earth Day, Apr 22)* |
| **May '27** | **"Science Fiction, Science Fact"** — Robotics, Medical Robots, Lasers, Computer Vision, Mars *(May the 4th)* | **"Whodunit"** — DNA Fingerprinting, Locard's Principle, the Polygraph, Detective Fiction, Forensic Odontology *(pairs with Mar's Crime & Forensics category)* |
| **Jun '27** | **"Into the Deep"** — Deep Sea, Coral Reefs, Whales, Anglerfish, Bioluminescence *(World Oceans Day, Jun 8)* | **"Chasing the Sun"** — the Sun, Red Giants, Stonehenge, Comets, Meteor Showers *(summer solstice, Jun 21)* |
| **Jul '27** | **"Light Show"** — Auroras, Fireflies, Bioluminescence, Lasers, Supernovas *(July 4th fireworks weekend)* | **"Best of Year One"** — top facts from the launch year *(launch anniversary + Apollo 11, Jul 20)* |

**Aug '26 built (2026-07-30)** — real `factIds` written to `exports/collections.json` and synced to
`Nib/Nib/Data/collections.json` (28 → 30 collections, both repos byte-identical), `addedAt:
"2026-08-15T09:00:00Z"` on both so the reveal gate holds them invisible until the drop date. Verified:
every factId resolves, no id collisions, no overlap between the two. **"Too Hot to Handle" pulled from
the Pompeii Series** per the recent-additions rule above — `mount-vesuvius-population-risk` (new,
drafted for the Series) and `volcanoes-not-just-lava` (pre-existing, Pompeii-adjacent) fill its
Volcanoes slot. "Written in the Stars" found no Series fit (Apollo 13 and Alien Island's new facts
are mission-drama/ecology, not night-sky phenomena) and draws entirely from the existing base, as
planned. **Live on the CDN (2026-07-30)** — `contentVersion` 16→17, verified against
`cdn.nibapp.net/v1/manifest.json` directly (checksum + fetched `collections.json` both confirmed).
Held invisible by the reveal gate until Aug 15.

**Sep '26 built (2026-09-16, shipped 1 day late)** — the planned member lists above were aspirational;
several named topics (Learning, Habits, Neural Networks) no longer exist as literal topics after the
2026-08/09 trim passes, so final picks were chosen fresh from what's actually in the 916-fact database
(post social-hook re-audit, see `docs/session-handoff.md`). "How Your Brain Learns" ended up Memory
(`memory-fading-helps-time`), Attention (`attention-cannot-focus-everything`), Decision Making
(`decision-making-environment-shapes`), Motivation (`motivation-money-association`), and a Machine
Learning tie-in (`machine-learning-pattern-learning`) for the back-to-school angle. "Your Lying Eyes"
ended up Color Illusions (`color-illusions-rgb-white`), Motion Illusions
(`motion-illusions-peripheral-drift`), Mirage (`mirage-fake-water`), The Dress
(`the-dress-split-perception`), Placebo Effect (`placebo-effect-clinical-trials`) — checked against the
pre-existing "Tricks of the Eye" collection (forced-perspective/blue/depth-perception/pareidolia/motion
snakes) for factId overlap: none, distinct icon used (`eye.trianglebadge.exclamationmark` vs `eye`).
All 10 facts were STRONG-tier in the same-day social-hook audit. **Shipped silently (2026-10-04
decision):** the `addedAt` stamp was REMOVED from both, so they never trigger a NEW pill, Today card or tab dot
(nil `addedAt` = visible but never "new"). Synced to `Nib/Nib/Data/collections.json`; CDN v22 staged (not yet
published — bundled with the same session's 50-fact social-hook removal). The Sep 1 Forensics category and the
Oct 1 category were dropped (their sourcing/scrapes were discarded) pending the age-preference + legends refactor.

**Re-plan note (2026-10-04):** Oct 15 "Glow in the Dark", Nov 15 "Food Coma" and Dec 15 "The Science of
Sparkle" were replaced by "Haunted by Science", "Cold Cases of History" and "Code & Cipher" (the displaced three
move to the Collection Ideas Bank); Apr 15 "You've Been Fooled" now draws on the new hoax facts. A second pass
aligned three more slots with the new category lineup — Jan 15 "Spy vs. Spy" (replaces "Survival of the Coldest"),
Feb 15 "Legends vs. Reality" (replaces "Lucky Red"; the Nian carries the Lunar New Year beat), May 15 "Whodunit"
(replaces "Backyard Wonders"). Those three displaced Collections move to the bank. Every new-lane Collection is built
from facts that **already shipped**, so each is built only after its category has gone live — and if a member topic
slips, fall back to the bank entry's existing-fact members rather than moving the date.

**Tally:** 12 new categories + **24 Collections** (two a month) + **6 new Series**
(Titanic, Bermuda Triangle, Enigma War, Dyatlov Pass, Chernobyl, Salem — one
every other month) across the year. The Categories screen gains a fresh tile on
the 1st; the Collections screen gets two new themed packs on the 15th — all 24
with **zero** new drafting; the Collections/Series "Journeys" segment gains a new
bounded documentary on the 22nd every other month. Category *expansions* remain
opportunistic, layered on only when analytics flag a winner.

**Roster changes (2026-07-14 fascination-first rewrite):** six categories that were structurally prone to flat,
textbook, or "so what?" facts were swapped for high-curiosity ones — **Mirrors & Reflections → Survival & the
Body's Limits** (Aug), **Philosophy → Forensics & Crime-Solving** (Sep), **Money & Personal Finance → Poisons,
Venom & Toxins** (Jan), **Art → Perfume & the Science of Smell** (Feb), **Energy & Power → Microscopic Life**
(Apr), and **Ships & Boats → Heists, Escapes & Cons** (Jun). Why each was cut: *Philosophy / Energy & Power* were
abstract-concept and how-it-works dumps (the AI/engineering flatness profile); *Money & Personal Finance* was
advice/definitional and overlapped economics + business; *Mirrors, Art, Ships* were mechanism-thin and
triple-overlapped existing content (everyday-objects/Mirrors + superstitions/Broken-Mirrors + physics/Lasers;
the whole **colors** category for pigments; Titanic/Endurance for shipwrecks). Kept because they're *both*
seasonal and genuinely tappable: **Reptiles & Amphibians** (Oct), **Fungi & Mushrooms** (Nov), **Holidays &
Traditions** (Dec), **Camouflage & Mimicry** (Mar, topics trimmed), **Birds** (May), **Games & Puzzles** (Jul).
The six swapped-out categories are parked in the Year-2 backlog if ever wanted. *(Superseded in part by the 2026-10-04
re-plan above: Forensics returns as a Mar '27 category; seven further categories were displaced.)* *Geology, Rocks & Gems* and
*Trains & Railroads* remain there too.

---

# New Category Backlog (Year 2+)

Everything below is confirmed **not** yet in `sources.csv`. Pull from here once
the 12-month schedule is exhausted, or swap into it if analytics shift priorities.

| Category | Sample topics | Specialist sources |
| --- | --- | --- |
| Geology, Rocks & Gems | Diamonds, Jade, Quartz, Geodes, Obsidian, Amber, Marble, Granite, Opal, Meteorites | Smithsonian, USGS |
| Trains & Railroads | Steam Engines, Subways, Bullet Trains, Maglev, Railroads, Locomotives, Cable Cars, Monorails, Train Stations, Funiculars | Smithsonian, Britannica |
| Amusement Parks & Rides | Roller Coasters, Ferris Wheels, Carousels, Water Slides, Carnivals, Fairs, Bumper Cars, Cotton Candy, Haunted Houses, Fireworks | Smithsonian, Britannica |
| Gardens & Gardening | Seeds, Soil, Composting, Greenhouses, Botanical Gardens, Vegetable Gardens, Terrariums, Weeds, Herb Gardens, Watering | Smithsonian Gardens, RHS |
| Photography | Camera Obscura, Daguerreotype, Color Film, Polaroid, Darkrooms, Aperture, Famous Photos, Photojournalism, Long Exposure, Film vs Digital | George Eastman Museum |
| Famous Scientists & Inventors | Einstein, Newton, Tesla, Marie Curie, Galileo, Edison, Da Vinci, Ada Lovelace, Hawking, Faraday | Britannica, Nobel Prize |
| Evolution & Human Origins | Natural Selection, Charles Darwin, Neanderthals, Early Humans, Lucy, Stone Tools, Bipedalism, Human Migration, Genetics, Adaptation | Smithsonian Human Origins |
| Magic & Illusions | Houdini, Card Tricks, Stage Magic, Escape Acts, Sleight of Hand, Levitation, Vanishing Acts, Misdirection, Mentalism, Famous Magicians | Library of Congress, Britannica |
| Fashion & Clothing | Blue Jeans, Sneakers, Silk, Hats, Leather, Wool, Sewing, Haute Couture, Denim, Synthetic Fabrics | The Met Costume Institute |
| Materials | Glass, Plastic, Rubber, Paper, Graphene, Ceramics, Aluminum, Kevlar, Carbon Fiber, Titanium | Britannica, ACS |
| Maps & Cartography | Globes, Latitude & Longitude, Compasses, Map Projections, Surveying, Nautical Charts, Topographic Maps, Atlases, GPS Mapping, Cartographers | Library of Congress |
| World Cultures & Flags | National Flags, Festivals, Folk Costumes, Cuisines, Greetings, Currencies, Anthems, Tea Cultures, Folk Dances, World Records | National Geographic |

### Displaced 2026-10-04 — still good, just bumped (revive from here first)

Unlike the flat-fact parking lot below, these seven are fascination-rich and were bumped only to make room for the
legends/hoaxes/grittier lane. Topics are unchanged from their old schedule rows.

| Category | Old slot | Topics |
| --- | --- | --- |
| Reptiles & Amphibians | Oct '26 | Snakes, Crocodiles, Komodo Dragons, Frogs, Toads, Geckos, Iguanas, Tortoises, Salamanders, Venom *(route the toxin angle around Poisons)* |
| Fungi & Mushrooms | Nov '26 | Mushrooms, Mycelium, Truffles, Mold, Yeast, Lichen, Spores, Slime Molds, Toadstools, Fungal Networks |
| Holidays & Traditions | Dec '26 | Christmas, Diwali, Lunar New Year, Day of the Dead, Hanukkah, Thanksgiving, New Year's, Carnival, Halloween, Birthdays *(hidden-origin angle only)* |
| Perfume & the Science of Smell | Feb '27 | Smell & Memory, Petrichor, Pheromones, Ambergris, Anosmia, Olfactory Adaptation, The Nose, Skunk Spray, Fragrance Notes, Animal Musks |
| Camouflage & Mimicry | Mar '27 | Cuttlefish, Peppered Moths, Stick & Leaf Insects, Countershading, Zebra Stripes, Decoy Spiders, Batesian Mimicry, The Mimic Octopus, Orchid Mantis, Eyespots |
| Birds | May '27 | Owls, Hummingbirds, Eagles, Parrots, Flamingos, Crows, Peacocks, Woodpeckers, Falcons, Ostriches |
| Games & Puzzles | Jul '27 | Rubik's Cube, Crosswords, Dice, Playing Cards, Board Games, Sudoku, Dominoes, Jigsaw Puzzles, Mazes, Magic Tricks *(route around Houdini)* |

### Legends, mysteries & grittier-content bench (added 2026-10-04)

Not yet in `sources.csv`; same validation rule as any drop. All assume the 13+ baseline.

| Category | Sample topics | Content types | Specialist sources |
| --- | --- | --- | --- |
| Dark Psychology & Social Experiments | Milgram's Obedience Study, Asch Conformity, The Bystander Effect (Kitty Genovese myth), The Tanganyika Laughter Epidemic, Folie à Deux, Cargo Cults, The Stanford Prison Experiment (contested), Stockholm Syndrome (contested) | `fact` + `theory` | APA, Smithsonian, Britannica |
| Parasites & Mind Control | Zombie-Ant Fungus, Toxoplasma, The Botfly, Cymothoa (Tongue-Eating Isopod), Guinea Worm, Cuckoo Brood Parasitism, The Jewel Wasp, The Lancet Fluke | `fact` | Natural History Museum, CDC, National Geographic |
| Unexplained Disappearances | The Flannan Isles Lighthouse Keepers, Kaspar Hauser, The Lost Norse of Greenland, The Tunguska Event, The Tamam Shud Case | `mystery` / `theory` | Royal Museums Greenwich, Smithsonian |
| Unsolved Codes & Puzzles | Kryptos, The Shugborough Inscription, The Phaistos Disc, The Zodiac Cipher, The Piri Reis Map | `mystery` / `theory` | NSA, CIA Museum, British Museum |
| The Occult, Divination & Magic | Tarot, Astrology's Origins, Alchemy, Dowsing, Palmistry, Séances | `fact` + `legend` | Yale Library, Science History Institute |
| More Haunted Places | The Stanley Hotel, Enfield, The Tower of London's Ghosts, Raynham Hall, Eastern State Penitentiary | `legend` | Smithsonian, English Heritage — *source quality is the risk; many are hobbyist* |

### Parked — swapped out of the schedule for flatness (⚠️ re-scope before ever reviving)

These six were cut in the 2026-07-14 fascination-first rewrite because, as whole categories, they lean
textbook/abstract/advice or overlap existing content. **Don't revive as-is** — if analytics ever demand one,
first narrow it to the 2–3 genuinely tappable topics noted.

| Category | Why cut | If revived, keep only |
| --- | --- | --- |
| Philosophy | Abstract -isms → definitions (the AI-category profile) | Thought Experiments, Paradoxes, Philosophers' strange lives/deaths |
| Money & Personal Finance | Advice/definitional; overlaps economics + business | Counterfeiting, Mints, ATMs (as *history*, not advice) |
| Energy & Power | Infrastructure how-it-works (engineering flatness) | Nuclear, Fusion (as story: the demon core, ITER, Tsar Bomba) |
| Mirrors & Reflections | Optics mechanism; triple-overlaps existing content | One-Way Glass, Mirror Writing, Hall of Mirrors |
| Art | Survey-of-isms; Pigments duplicates **colors** | Mona Lisa theft, forgeries, hidden paintings under paintings |
| Ships & Boats | Mechanism/infrastructure topics; overlaps econ + Titanic | Submarines, Shipwrecks, Icebreakers |

---

# Series Backlog (Year 2+)

Bench candidates beyond the 6 scheduled above, for when the 12-month schedule is
exhausted or a slot needs swapping. Every anchor topic below was verified against
`sources.csv`/`facts.json` directly — no guessing. Unlike the Category backlog,
this bank includes a few **flagged, handle-with-care** entries; read the caution
column before scheduling one.

| Series | Anchor topic *(existing)* | Live facts today | Likely categories it spans | The hook |
| --- | --- | --- | --- | --- |
| Krakatoa | famous-disasters/Krakatoa | 3 | famous-disasters, physics, weather, geography | The 1883 eruption produced the loudest sound ever recorded (heard 3,000 miles away) and cooled the planet for years |
| Great Molasses Flood | famous-disasters/Great Molasses Flood | 2 | famous-disasters, physics, human-civilization | A wall of molasses moved at 35 mph — a "wacky" tone that varies the lineup away from disaster-as-tragedy |
| Zheng He | explorers/Zheng He | 3 | explorers, ancient-civilizations, engineering | A 15th-century Chinese admiral's treasure fleet dwarfed Columbus's ships by a century — strong non-Western representation |
| Marco Polo | explorers/Marco Polo | 3 | explorers, ancient-civilizations, human-civilization | Silk Road-era journey with a genuine "how much of this did he even see himself" hook |
| Voyager Program *(bumped 2026-10-04)* | space/Voyager Program | 1 | space, astronomy, physics, technology | Still transmitting from interstellar space 47+ years on |
| Nellie Bly *(bumped 2026-10-04)* | explorers/Nellie Bly | 2 | explorers, history, inventions | One audacious journalistic stunt — a narrative-variety slot |
| Area 51 *(bumped 2026-10-04)* | mysteries/Area 51 | 2 | mysteries, aviation, history | Real government secrecy, not aliens — pairs naturally with Spies & Secret Operations |
| Oak Island | mysteries/Oak Island | 2 | mysteries, pirates, engineering | The Money Pit: a 200-year dig and the theories (`legend`/`theory`) behind it |
| Roanoke Colony | mysteries/Roanoke Colony | 2 | mysteries, history, explorers | The "Croatoan" clue and the competing explanations (`mystery`) |
| The Voynich Manuscript | mysteries/Voynich Manuscript | 2 | mysteries, literature, secret-codes | The unread book — what's been tried and ruled out (`mystery`) |
| The Mary Celeste *(build after Oct 19 Ghosts ships)* | Ghosts & Haunted Things/Mary Celeste | 0 → category | mysteries, famous-disasters, illusions | The ghost-ship story vs. the documented facts and the Conan Doyle invention |
| Operation Mincemeat *(build after Dec Spies ships)* | Spies & Secret Operations/Operation Mincemeat | 0 → category | history, secret-codes, strange-jobs | The corpse-with-fake-papers deception told through the planners |
| The Black Death *(build after May Dark History ships)* | Dark History/The Black Death | 0 → category | history, medicine, microscopic life | Plague doctors, trade routes and what the science now says |
| Amelia Earhart | mysteries/Amelia Earhart | 2 | mysteries, aviation, explorers | The disappearance plus the real, physical search evidence (Nikumaroro) — verifiable, not speculative |

**Caution entries — verify before scheduling:**

| Series | Anchor topic | Status | Why it's flagged |
| --- | --- | --- | --- |
| Dust Bowl | famous-disasters/Dust Bowl | `complete` in `sources.csv`, but **0 facts exist anywhere** (checked `facts.json` and `approved-facts.csv`) | Scraped but never drafted. Budget this like a mini-category (real drafting work), not a light Series — don't assume the anchor facts are ready just because the row says `complete` |
| Dyatlov Pass *(now scheduled Feb '27 as a `theory`/`mystery` Series)* | mysteries/Dyatlov Pass | 1 fact live (`dyatlov-tent-cut-open`; an earlier note said 3) | A `dyatlov-conspiracy-fuel` fact was already **removed** (2026-07-30 audit) for presenting a disputed 2021 theory as settled fact. A Series here must stick strictly to documented, verifiable events (what was found, when, the official conclusion) and never present any single explanation as *the* answer — same rule that got the last fact pulled |
| Roman Empire | history/Roman Empire | Down to **1 fact**, already flagged as a re-source candidate in the 2026-07-23 dup-merge pass | Too thin an anchor as-is — re-source the topic to at least 2–3 facts first, same as any new-category topic, before building a Series on it |

Marco Polo overlaps route: watch **history/Silk Road** (already a topic) when
drafting — split the trade-route angle so the two don't duplicate.

---

# Unexpected & Intriguing Category Bank

Categories that don't need a calendar hook — they earn their tile purely on
"huh, I never thought about that." Reach here whenever a month has no obvious
seasonal category (or whenever you just want the schedule to feel surprising).
Confirmed **not** yet in `sources.csv`; validate topics + a specialist source
before staging, same as any drop.

| Category | Sample topics | Specialist sources |
| --- | --- | --- |
| Time & Timekeeping | Clocks, Calendars, Sundials, Atomic Clocks, Time Zones, Leap Years, Hourglasses, Pendulums, Stopwatches, Circadian Rhythm | NIST, Royal Observatory Greenwich |
| Locks, Keys & Safes | Padlocks, Combination Locks, Vaults, Lock Picking, Safes, Deadbolts, Master Keys, Handcuffs, Biometric Locks, Bank Vaults | Smithsonian, Britannica |
| Bubbles & Foam | Soap Bubbles, Surface Tension, Foam, Carbonation, Sea Foam, Bubble Wrap, Fizz, Aerogel, Meringue, Quicksand | Exploratorium, ACS |
| Knots & Rope | Knots, Nautical Knots, Macramé, Cat's Cradle, the Bowline, Rope-making, Tangles, Shoelaces, Fishing Knots, Knot Theory | Britannica, Smithsonian |
| Bridges & Tunnels | Suspension Bridges, Drawbridges, Tunnels, Aqueducts, Viaducts, Cantilever Bridges, Underwater Tunnels, Rope Bridges, Tunnel Boring, Covered Bridges | ASCE, Smithsonian |
| Caves & the Underground | Caves, Stalactites, Caverns, Sinkholes, Underground Rivers, Bunkers, Mines, Subterranean Life, Lava Tubes, Ice Caves | National Park Service, USGS |
| Spirals & Patterns in Nature | Fibonacci Spirals, Fractals, Honeycombs, Nautilus Shells, Tessellations, Symmetry, Spiral Galaxies, Fern Fronds, Snowflake Symmetry, Romanesco | Britannica, Wolfram |
| Echoes & Acoustics | Echoes, Whispering Galleries, Sonar, Echolocation, Reverberation, Concert-Hall Acoustics, Sound Mirrors, Anechoic Chambers, Standing Waves, Infrasound | Acoustical Society, Exploratorium |
| Twins & Cloning | Identical Twins, Twin Studies, Dolly the Sheep, Conjoined Twins, Mirror Twins, Clones, Nature vs Nurture, Twin Telepathy Myths, Polar-Body Twins, Chimeras | Smithsonian, NIH |

*(Now scheduled, so pulled from this bank: **Perfume & the Science of Smell** → Feb.
The 2026-07-14 rewrite also added five net-new fascination categories to the schedule —
**Survival & the Body's Limits**, **Forensics & Crime-Solving**, **Poisons/Venom & Toxins**,
**Microscopic Life** (promoted from the Year-2 backlog), and **Heists/Escapes & Cons**.
**Twins & Cloning** stays here as the next bench pick.)*

---

# Existing-Category Expansion Backlog

Fuel for the **opportunistic** expansions described above — *not* the monthly drop,
which is always a new category. Confirmed-new topics for the deepest categories,
ready to drop in 5–8 at a time when analytics flag a category worth deepening.
Prefer a **specialist** source over Britannica for each new row.

| Category | Confirmed-new topics to add | Prefer source |
| --- | --- | --- |
| Animals | Bears, Lions, Foxes, Bats, Pandas, Koalas, Kangaroos, Camels, Beavers, Hyenas | WWF, San Diego Zoo |
| Human Body | Liver, Kidneys, Nervous System, Teeth, Stomach, Tongue, Sweat, Nails | Cleveland Clinic |
| Food | Eggs, Tea, Sugar, Butter, Vinegar, Fermentation, Mushrooms, Garlic | Smithsonian, Britannica |
| Ocean Life | Crabs, Lobsters, Eels, Manta Rays, Narwhals, Walruses, Barnacles, Clownfish | NOAA, Monterey Bay Aquarium |
| Sports | Cycling, Boxing, Climbing, Gymnastics, Cricket, Rugby, Hockey, Archery | Olympics.com, Britannica |
| Weather | Floods, Droughts, Wind, Blizzards, Heat Waves, Sandstorms, Frost, Jet Stream | NOAA, NWS |
| Mathematics | Statistics, Knot Theory, Symmetry, Set Theory, Number Theory, Imaginary Numbers, Graph Theory | Britannica, Wolfram |
| Music | Opera, Music Theory, Choirs, Bagpipes, Drums, Guitars, Pianos, Reggae | Britannica, Smithsonian |
| Movies | Westerns, Horror Movies, Film Noir, Voice Acting, Box Office, Movie Studios, Sequels, Cameos | AFI, Britannica |
| Mysteries *(added 2026-10-04; `mystery`/`theory` types)* | The Flannan Isles Keepers, Kryptos, The Tunguska Event, The Phaistos Disc, Kaspar Hauser | Smithsonian, Royal Museums Greenwich |
| Psychology *(added 2026-10-04)* | Milgram, Asch Conformity, The Bystander Effect, Mass Hysteria, Cargo Cults | APA, Smithsonian |

Rule of thumb: when a category proves popular in analytics, deepen it from this
table **on top of** that month's scheduled new category — the new-category cadence
never pauses.

---

# Collection Ideas Bank

Spare Collections beyond the 24 scheduled above — pull from here to swap a slot or
when a bonus beat comes up. Each is a curated `factIds` pull from existing content,
no new drafting required. Same rules: de-duped, and wacky beats safe.

- **"Accidental Discoveries"** — Velcro, Penicillin, Microwaves, X-Rays,
  Post-it Notes
- **"Tiny but Mighty"** — Ants, Tardigrades, Atoms, Hummingbirds, Bacteria
- **"Built to Last"** — Pyramids, Roman Empire, Concrete, Castles, Bridges
- **"Code & Cipher"** — Enigma Machine, Morse Code, Binary, Navajo Code Talkers,
  Cryptography
- **"Lost to Time"** — Atlantis, Roanoke Colony, Pompeii, Easter Island, Voynich
  Manuscript
- **"The Body Electric"** — Brain, Heart, Nervous System, Electricity, Neurons
- **"Speed Demons"** — Cheetahs, Formula 1, Supersonic Flight, Bullet Trains,
  Lightning
- **"Nature's Overachievers"** *(wacky)* — Tardigrades, Mantis Shrimp, Octopus,
  Immortal Jellyfish, Axolotls
- **"Everyday Things You've Been Doing Wrong"** *(wacky)* — Handwashing, Sleep,
  Posture, Hydration, Breathing
- **"It Came From the Deep"** *(wacky)* — Anglerfish, Giant Squid, Deep Sea,
  Bioluminescence, Hydrothermal Vents
- **"Stars & Stripes"** — Fireworks, Flags, Bald Eagles, the Liberty Bell,
  Fourth of July *(July 4 spare)*

**Fascination-first additions (2026-07-14) — pair with the new categories, all from existing facts:**

- **"Nature's Assassins"** *(wacky)* — Dragonflies (95% kill rate), Mantis Shrimp,
  Orcas, Praying Mantises, Cone... *(pairs w/ Poisons)*
- **"Caught in the Act"** — Cottingley Fairies, the FeeJee Mermaid, Crop Circles,
  the dead-salmon fMRI, War of the Worlds *(famous hoaxes — **re-pointed 2026-10-04:** pairs w/ Nov's Hoaxes & Frauds;
  Cottingley/FeeJee/War of the Worlds are not live facts yet, so build it after that category ships)*
- **"The Invisible World"** — Gut Microbiome (you're half microbe), Atoms (mostly
  empty space), Visible Light (a tiny slice), Cosmic Microwave Background *(pairs w/ Microscopic Life)*
- **"Against the Odds"** — Shackleton, the mammalian dive reflex, wood frogs freezing
  solid, tardigrade-adjacent survival *(pairs w/ Survival & the Body's Limits)*

**Legend/hoax-lane additions (2026-10-04) — build once the matching category has shipped:**

- **"Glow in the Dark"** *(displaced from Oct 15)* — Bioluminescence, Fireflies, Anglerfish, Jellyfish, Cicadas
- **"Food Coma"** *(displaced from Nov 15)* — Hibernation, Dreams, Yawning, Naps, Melatonin
- **"The Science of Sparkle"** *(displaced from Dec 15)* — Gold, Crystals, Supernovas, Red Giants, Diamonds
- **"Survival of the Coldest"** *(displaced from Jan 15)* — Penguins, Polar Bears, Woolly Mammoths, Glaciers, Hibernation
- **"Lucky Red"** *(displaced from Feb 15)* — Red, Gold, Dragons, Fireworks, the Chinese Zodiac
- **"Backyard Wonders"** *(displaced from May 15)* — Bees, Butterflies, Fireflies, Dragonflies, Beetles
- **"Plagues & Panics"** — Black Death, Dancing Plague, Plague Doctors, Salem, Mass Hysteria *(pairs w/ May's Dark History category; a Jun/Oct beat)*
- **"Curses & Coincidences"** — Black Cats, Friday the 13th, Evil Eye, Tutankhamun's "Curse", the Hope Diamond *(pairs w/ Ghosts; a Friday-the-13th beat — Aug 13, 2027)*
- **"Haunted House Tour"** — Winchester Mystery House, Pepper's Ghost, Infrasound, Ouija Board, Mary Celeste *(pairs w/ Ghosts & Haunted Things; a late-Oct bonus beat if it ships early enough)*
- **"Spy vs. Spy"** — Operation Mincemeat, Ghost Army, Great Seal Bug, Acoustic Kitty, Bletchley Park *(pairs w/ Spies & Secret Operations)*
- **"Legends vs. Reality"** — Jersey Devil, Chupacabra, Nian, Yōkai, Kitsune *(pairs w/ Folklore Around the World; the `legend` type's showcase)*
- **"Fakes That Fooled the World"** — Piltdown Man, Cardiff Giant, Vinland Map, Great Moon Hoax, Archaeoraptor *(pairs w/ Hoaxes & Frauds; distinct from "Caught in the Act" — it's the museum-grade fakes)*

**Series-paired additions (2026-07-30) — same pattern, tied to the new Series schedule:**

- **"What the Ship Couldn't Outrun"** — Steel, Deep Sea, weather/ice angles already
  live *(pairs w/ Aug's Titanic Series; illustrative — finalize against what the
  Series actually drafts)*
- **"The Mundane Explanation"** — other legend-vs-reality debunkings already live
  across myths-legends, illusions-perceptions, and mysteries siblings *(pairs w/
  Oct's Bermuda Triangle Series — "the boring truth is wilder than the myth")*
- **"Farther Than Anyone"** — Kuiper Belt, Oort Cloud, Solar System, the Sun *(was paired w/ Dec's Voyager Series;
  Voyager is now on the Series Backlog, so this stays on the bench until it returns)*

---

# Source Diversification Goal

> **Target: reduce Britannica from ~63% of topics to ~50% over the next year.**

Britannica is an excellent primary source and should remain the backbone. But high
concentration is a single point of failure:

- **Operational risk** — one site changing structure or blocking scraping stalls
  most of the pipeline.
- **Tone sameness** — every fact reading the same hurts the "premium, curated"
  feel.
- **Trust depth** — domain-specific institutions (NASA, NOAA, USGS, AMNH, The
  Met) carry more authority on their subject than a general encyclopedia.

How to get there without lowering quality:

1. **Every new category onboards at least one new institution.** The backlog
   tables above already assign domain-specific sources for this reason.
2. **When expanding existing categories, prefer a specialist source** over
   reaching for Britannica again.
3. **Validate scraping before committing rows.** Some institutional pages are
   JS-rendered or block crawlers. Run `pnpm scrape:source` against a candidate URL
   first; only add the row if it returns clean markdown.
4. **Track the ratio.** Re-check the Britannica share each quarter and let it
   steer source choices for the next batch.

Quick check of the current ratio:

```bash
total=$(tail -n +2 source-registry/sources.csv | grep -vc '^$')
brit=$(tail -n +2 source-registry/sources.csv | grep -v '^$' | awk -F, '$3=="Britannica"' | wc -l)
echo "Britannica: $brit / $total"
```

---

# Production Math

Sustaining one new category per month means **~24–30 validated facts/month**
(8–10 topics × 3 facts). The **two** monthly Collections add **zero** drafting
load — both are curation of facts that already shipped. (Opportunistic expansions,
when you choose to run one, add their own 15–24 facts on top — budget for them only
in the months you actually do them.)

A bi-monthly Series adds its own small spike **in the months it lands**: a Series
is 8–15 facts total, but most of that can be existing facts pulled from live
categories — budget for roughly **5–10 genuinely new facts** per Series (the
launch three, Alien Island / Pompeii / Apollo 13, ran 9/11/9 facts each, a mix of
new and existing). That's a real but modest addition on top of that month's ~25
category facts, landing every other month rather than stacking every month.

- The bottleneck is the **human review pass**, not scraping. Keep each drop to one
  category, not three.
- Stage rows about a month ahead, batch-scrape, then draft and review in weekly
  sittings.
- The Collections are the free half of the month — assemble each one's `factIds`
  list any time the category drop is in review. Two a month is still zero drafting;
  the only added cost is picking and ordering existing facts.

---

# Suggested Workflow Addition: a `backlog` status

The `pending` status is consumed by `scrape:next` and `scrape:batch`. To stage
future rows in `source-registry/sources.csv` without them being scraped
prematurely, use a distinct status:

- `backlog` — decided on, URL recorded, **not** yet ready to scrape
- `pending` — ready; will be picked up by `scrape:batch`
- `complete` — scraped

When a drop's month arrives, flip its rows from `backlog` to `pending` and run the
batch. The batch scripts already ignore anything that isn't `pending`, so no code
change is required to adopt this convention.

---

# How To Use This Document

1. Finish the current launch backlog first. *(Complete as of 2026-07-28 — 0 `pending`
   rows in `sources.csv`; the Aug 2026 Survival & the Body's Limits category was the
   first expansion drop.)*
2. Each month, ship **one new category** (on the **1st**) **and two new Collections**
   (**both on the 15th**). The category can be seasonal *or* just intriguing —
   pull it from the schedule, the Year-2 backlog, or the Unexpected & Intriguing
   bank. The Collections come from the schedule or the Collection Ideas Bank.
   **Every other month**, also ship **one new Series** (on the **22nd**) — pull
   from the Series backlog once one exists (see the sourcing note above); never
   move it onto the 1st or 15th.
3. Confirm every proposed **category topic** is still absent from `sources.csv`,
   and that every **Collection member** already exists in it, before staging — the
   schedule was de-duped against the registry, but the registry keeps growing.
   Keep the two Collections in a month from overlapping each other. Before
   finalizing a month's two Collections, also check the **trailing ~2 quarters**
   of shipped Categories and Series (not just the whole database) for fresh
   pairing material — see "Recent additions are part of the pool" under the
   Collections section.
4. Prefer a non-Britannica specialist source for every new row; validate it
   scrapes cleanly before adding it.
5. Re-check the Britannica ratio quarterly and steer toward the 50% target.
6. **Check the content type and tone before scheduling a drop:** every non-`fact` entry needs the right
   `contentType` and hedging in headline, summary *and* body (guide §5). Run `pnpm check:age-rating --warn` and read
   every hit against the tone rule (guide §9) before export.
7. Keep shipping a new category every month, but when analytics reveal a clear
   winner, add an opportunistic expansion on top — deepen that winner from the
   Existing-Category Expansion Backlog.
