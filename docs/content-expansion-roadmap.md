# TIL Content Workflow

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

Avoid running dry on the Categories and Collections screens.

---

# Where We Stand

Snapshot at time of writing (June 2026):

- **56 categories**
- **737 topics**, most at 3–5 facts each
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

# The Monthly Cadence (the rule this roadmap follows)

Every month ships **two** things:

1. **One content drop** — *either*
   - a **new category** (8–10 topics), *or*
   - an **expansion** of an existing category (5–8 new topics).

   Tailor the drop to the calendar where it helps — seasonal, holiday, or themed
   drops land harder than generic ones.

2. **One new Collection** — a curated, cross-category journey.

   Collections are **curation, not new content**: each one is a hand-picked
   `factIds` list drawn from facts that already exist (see
   `TIL/TIL/Models/Collection.swift`). With 56 categories and 700+ topics live,
   we can ship a fresh Collection every month *without drafting a single new
   fact* — it's pure packaging and a free marketing beat.

A healthy month pairs the two: a new/expanded category for the Categories screen
**plus** a themed Collection for the Collections screen.

---

# Two Levers for the Content Drop

## Lever 1 — Expand Existing Categories

Adding topics to a category the user already browses is **lower risk and lower
effort** than standing up a new category: the audience is proven, the source
institutions are already validated, and no new app-side category metadata (color
token, icon, description) is required.

Deepen before you widen. The 20 newest categories sit at only 10 topics and are
the prime expansion candidates once analytics show which ones land.

## Lever 2 — Add New Categories

New categories fill genuine gaps in the taxonomy. See the backlog and the
12-month schedule below. Each new category also onboards at least one new
specialist institution, which advances the source-diversification goal.

---

# 12-Month Schedule — Launch Year (Jul 2026 → Jun 2027)

Assumes a mid-2026 launch. Shift the months to match the real launch date. Every
row obeys the cadence: **one content drop + one Collection.** All topics below
are confirmed **not** already present in `sources.csv`.

| Month | Content Drop (type) | New topics | New Collection | Seasonal hook |
| --- | --- | --- | --- | --- |
| **Jul '26** | **Space** *(expand +6)* | Mercury, Earth, Solar Eclipses, Space Junk, Halley's Comet, Solar Wind | **"We Went to the Moon"** — Space Race, Voyager Program, Moons, Sun | Apollo 11 anniversary (Jul 20) |
| **Aug '26** | **Birds** *(new, 10)* | Owls, Hummingbirds, Eagles, Parrots, Flamingos, Crows, Peacocks, Woodpeckers, Falcons, Ostriches | **"Backyard Wonders"** — Birds + Bees + Butterflies + Fireflies | Late-summer nature |
| **Sep '26** | **Philosophy** *(new, 10)* | Socrates, Plato, Stoicism, Ethics, Logic, Free Will, Thought Experiments, Paradoxes, Existentialism, Skepticism | **"How Your Brain Learns"** — Learning, Memory, Attention, Habits, Neural Networks | Back-to-school |
| **Oct '26** | **Reptiles & Amphibians** *(new, 10)* | Snakes, Crocodiles, Komodo Dragons, Frogs, Toads, Geckos, Iguanas, Tortoises, Salamanders, Venom | **"Spooky Science"** — Bats, Spiders, Werewolves, Black Cats, Friday the 13th, Catacombs of Paris | Halloween |
| **Nov '26** | **Geology, Rocks & Gems** *(new, 10)* | Diamonds, Jade, Quartz, Geodes, Obsidian, Amber, Marble, Granite, Opal, Meteorites | **"Buried Treasure"** — Gems + Fossils + Treasure Maps + Pearl Divers | Crowd-pleaser marquee |
| **Dec '26** | **Holidays & Traditions** *(new, 10)* | Christmas, Diwali, Lunar New Year, Day of the Dead, Hanukkah, Thanksgiving, New Year's, Carnival, Halloween, Birthdays | **"Festive & Frozen"** — Snow, Aurora, Hibernation, Winter holidays | Winter / festive |
| **Jan '27** | **Money & Personal Finance** *(new, 10)* | Compound Interest, Credit, ATMs, Budgeting, Saving, Debt, Mints, Counterfeiting, Insurance, Allowances | **"Fresh Start"** — Habits, Motivation, Decision Making, Goals | New Year |
| **Feb '27** | **Art** *(new, 10)* | Mona Lisa, Impressionism, Cave Paintings, Sculpture, Pigments, Street Art, Surrealism, Mosaics, Portraits, Renaissance Art | **"Art & Love"** — Art topics + Heart Symbol + Pink + Red | Valentine's |
| **Mar '27** | **Famous Trees & Plants** *(expand +8)* | Sunflowers, Orchids, Ferns, Moss, Pitcher Plants, Dandelions, Lotus, Tulips | **"Things That Grow"** — Trees + Plants + Bees + Pollination | Spring |
| **Apr '27** | **Energy & Power** *(new, 10)* | Solar Power, Wind Power, Nuclear Power, Fusion, Hydrogen, Power Grid, Geothermal, Tidal Power, Coal, Wind Turbines | **"Our Planet"** — Oceans, Climate, Glaciers, Rainforests, Recycling Symbol | Earth Day (Apr 22) |
| **May '27** | **Games & Puzzles** *(new, 10)* | Rubik's Cube, Crosswords, Dice, Playing Cards, Board Games, Sudoku, Dominoes, Jigsaw Puzzles, Mazes, Magic Tricks | **"Play & Logic"** — Chess, Game Theory, Probability, Esports | Lighthearted "play" beat |
| **Jun '27** | **Trains & Railroads** *(new, 10)* | Steam Engines, Subways, Bullet Trains, Maglev, Railroads, Locomotives, Cable Cars, Monorails, Train Stations, Funiculars | **"Best of Year One"** — top facts from the launch year | Launch anniversary + recap |

**Tally:** 10 new categories + 2 deep expansions + 12 new Collections across the
year. That keeps the Categories screen growing roughly one tile a month while the
Collections screen gets a fresh themed pack every month with zero new drafting.

---

# New Category Backlog (Year 2+)

Everything below is confirmed **not** yet in `sources.csv`. Pull from here once
the 12-month schedule is exhausted, or swap into it if analytics shift priorities.

| Category | Sample topics | Tier-1 specialist sources |
| --- | --- | --- |
| Microscopic Life | Bacteria, Viruses, Fungi, Tardigrades, Cells, Algae, Plankton, Mold, Yeast, Parasites | CDC, NIH |
| Photography | Camera Obscura, Daguerreotype, Color Film, Polaroid, Darkrooms, Aperture, Famous Photos, Photojournalism, Long Exposure, Film vs Digital | George Eastman Museum |
| Ships & Boats | Submarines, Sailing Ships, Canals, Cruise Ships, Aircraft Carriers, Tugboats, Cargo Ships, Anchors, Shipwrecks, Icebreakers | Smithsonian, Britannica |
| Famous Scientists & Inventors | Einstein, Newton, Tesla, Marie Curie, Galileo, Edison, Da Vinci, Ada Lovelace, Hawking, Faraday | Britannica, Nobel Prize |
| Evolution & Human Origins | Natural Selection, Charles Darwin, Neanderthals, Early Humans, Lucy, Stone Tools, Bipedalism, Human Migration, Genetics, Adaptation | Smithsonian Human Origins |
| Magic & Illusions | Houdini, Card Tricks, Stage Magic, Escape Acts, Sleight of Hand, Levitation, Vanishing Acts, Misdirection, Mentalism, Famous Magicians | Library of Congress, Britannica |
| Fashion & Clothing | Blue Jeans, Sneakers, Silk, Hats, Leather, Wool, Sewing, Haute Couture, Denim, Synthetic Fabrics | The Met Costume Institute |
| Materials | Glass, Plastic, Rubber, Paper, Graphene, Ceramics, Aluminum, Kevlar, Carbon Fiber, Titanium | Britannica, ACS |
| Maps & Cartography | Globes, Latitude & Longitude, Compasses, Map Projections, Surveying, Nautical Charts, Topographic Maps, Atlases, GPS Mapping, Cartographers | Library of Congress |
| World Cultures & Flags | National Flags, Festivals, Folk Costumes, Cuisines, Greetings, Currencies, Anthems, Tea Cultures, Folk Dances, World Records | National Geographic |

---

# Existing-Category Expansion Backlog

Confirmed-new topics for the deepest categories, ready to drop in 5–8 at a time.
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

Rule of thumb: when a category proves popular in analytics, the **first** response
is to deepen it from this table, not to launch something new.

---

# Collection Ideas Bank

A backlog of cross-category Collections beyond the 12 scheduled above. Each is a
curated `factIds` pull from existing content — no new drafting required.

- **"Accidental Discoveries"** — Velcro, Post-it Notes, Penicillin/Antibiotics,
  Microwaves, X-Rays
- **"Tiny but Mighty"** — Ants, Tardigrades, Atoms, Hummingbirds, Bacteria
- **"Built to Last"** — Pyramids, Roman Empire, Concrete, Castles, Bridges
- **"Code & Cipher"** — Enigma Machine, Morse Code, Binary, Navajo Code Talkers,
  Cryptography
- **"Deep & Dark"** — Deep Sea, Black Holes, Caves, Anglerfish, Catacombs of Paris
- **"Lost to Time"** — Atlantis, Roanoke Colony, Pompeii, Easter Island, Voynich
  Manuscript
- **"The Body Electric"** — Brain, Heart, Nervous System, Electricity, Neurons
- **"Sweet & Savory"** — Chocolate, Honey, Salt, Spices, Coffee
- **"Speed Demons"** — Cheetahs, Formula 1, Supersonic Flight, Bullet Trains,
  Lightning
- **"Once in a Lifetime"** — Solar Eclipses, Halley's Comet, Auroras, Cicadas,
  Supernovas

---

# Source Diversification Goal

> **Target: reduce Britannica from ~63% of topics to ~50% over the next year.**

Britannica is an excellent Tier-1 source and should remain the backbone. But high
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

Sustaining one new category (or one deep expansion) per month means **~30–50
validated facts/month** (8–10 topics × 3–5 facts). The monthly Collection adds
**zero** drafting load — it's curation of facts that already shipped.

- The bottleneck is the **human review pass**, not scraping. Keep each drop to one
  category, not three.
- Stage rows about a month ahead, batch-scrape, then draft and review in weekly
  sittings.
- The Collection is the cheap half of the month — assemble its `factIds` list any
  time the category drop is in review.

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

1. Finish the current launch backlog first (635 rows still `pending`).
2. Each month, ship **one content drop** (new category *or* expansion, from the
   12-month schedule or the backlog tables) **and one new Collection** (from the
   schedule or the Collection Ideas Bank).
3. Confirm every proposed topic is still absent from `sources.csv` before adding
   it — the schedule above was de-duplicated against the registry, but the
   registry keeps growing.
4. Prefer a non-Britannica specialist source for every new row; validate it
   scrapes cleanly before adding it.
5. Re-check the Britannica ratio quarterly and steer toward the 50% target.
6. Revisit and reprioritize as analytics reveal which categories users actually
   explore — deepen the winners from the expansion backlog first.
