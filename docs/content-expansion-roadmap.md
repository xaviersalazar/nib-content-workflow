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

Avoid running dry on the Categories and Collections screens.

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

# The Monthly Cadence (the rule this roadmap follows)

Every month ships **three** drops — all of them, not a pick-one:

1. **One new category** (8–10 topics) for the Categories screen — dropped at the
   **start of the month**.

   Every month adds a genuinely new tile — not an expansion of an existing one.
   A calendar tie is welcome where it fits, but **not required**: a category
   doesn't have to relate to anything on the calendar. Some of the best tiles are
   simply *unexpected and genuinely intriguing* — things people won't see coming
   but can't help tapping. (Deepening existing categories is still worthwhile, but
   it's an *opportunistic, analytics-driven* activity — see the expansion backlog
   below — not the monthly drop.)

2. **Two new Collections** — a curated, cross-category journey each, dropped on
   the **1st** and the **15th**.

   Collections are **curation, not new content**: each one is a hand-picked
   `factIds` list drawn from facts that already exist (see
   `Nib/Nib/Models/Collection.swift`). With 56 categories and 2,000+ facts live,
   we can ship *two* fresh Collections a month *without drafting a single new
   fact* — pure packaging and two free marketing beats. Keep them **de-duped**
   (no repeating a shipped Collection, minimal fact overlap between them) and
   tie them to the month's holidays, seasons, or events. Within that, go
   **wacky** — the unexpected, off-the-wall angle ("Food Coma," "You've Been
   Fooled," "The Chemistry of Love") outperforms the safe one.

A healthy month = **one intriguing new category + two themed Collections (1st &
15th).**

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

# 12-Month Schedule — Launch Year (Aug 2026 → Jul 2027)

**Launch is July 2026.** Expansion begins the month *after* launch, so the first
drop lands **August 2026** and the launch year runs **Aug 2026 → Jul 2027**.

This is **not** the old schedule shifted a month. Each slot was re-chosen for the
month it actually lands in. The rhythm each month:

- **1st** → a new **Collection** *and* the month's new **category** go live.
- **15th** → a second **Collection** drops.

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
| **Aug '26** | **Survival & the Body's Limits** 🆕 | The Rule of Threes, The Mammalian Dive Reflex, Paradoxical Undressing, The Death Zone, Freediving, The Bends, G-Force, Surviving Without Food, Wilderness Survival, The Will to Live | *Fascination-first* (loose summer-adventure tie; the Perseids/heat beats live in the Aug Collections) |
| **Sep '26** | **Forensics & Crime-Solving** 🆕 | DNA Fingerprinting, Genetic Genealogy, Blood Spatter, Time of Death, Ballistics, Facial Reconstruction, Forensic Odontology, Locard's Exchange Principle, The Body Farm, The Polygraph | Back-to-school "how they actually crack it" |
| **Oct '26** | **Reptiles & Amphibians** | Snakes, Crocodiles, Komodo Dragons, Frogs, Toads, Geckos, Iguanas, Tortoises, Salamanders, Venom | Halloween-adjacent — kept (fascination-rich) |
| **Nov '26** | **Fungi & Mushrooms** | Mushrooms, Mycelium, Truffles, Mold, Yeast, Lichen, Spores, Slime Molds, Toadstools, Fungal Networks | Autumn-foraging — kept (fascination-rich) |
| **Dec '26** | **Holidays & Traditions** | Christmas, Diwali, Lunar New Year, Day of the Dead, Hanukkah, Thanksgiving, New Year's, Carnival, Halloween, Birthdays | Peak holiday — kept (enforce hidden-origin angle, not "festival of X" definitions) |
| **Jan '27** | **Poisons, Venom & Toxins** 🆕 | Arsenic & the Marsh Test, The Radium Girls, Botulinum → Botox, The Poison Garden, Cyanide, Poison Dart Frogs, Box Jellyfish, Pufferfish (Tetrodotoxin), Curare, Polonium | *Fascination-first* (New-Year beat lives in the Jan Collections) |
| **Feb '27** | **Perfume & the Science of Smell** 🆕 | Smell & Memory, Petrichor, Pheromones, Ambergris, Anosmia, Olfactory Adaptation, The Nose, Skunk Spray, Fragrance Notes, Animal Musks | Loose Valentine's tie (attraction & scent); the Valentine's Collection carries the day |
| **Mar '27** | **Camouflage & Mimicry** *(topics trimmed)* | Cuttlefish, Peppered Moths, Stick & Leaf Insects, Countershading, Zebra Stripes, Decoy Spiders, Batesian Mimicry, The Mimic Octopus, Orchid Mantis, Eyespots | Spring-wildlife — kept; de-duped (merged Walking Sticks/Leaf Insects, cut Katydids) |
| **Apr '27** | **Microscopic Life** 🆕 | Demodex Face Mites, Tardigrades, Are Viruses Alive?, Dust Mites, The Brain-Eating Amoeba, Extremophiles, Diatoms, Rotifers, Leeuwenhoek's 'Animalcules', Biofilms | Earth Day → the invisible living world |
| **May '27** | **Birds** | Owls, Hummingbirds, Eagles, Parrots, Flamingos, Crows, Peacocks, Woodpeckers, Falcons, Ostriches | Peak spring migration — kept (fascination-rich) |
| **Jun '27** | **Heists, Escapes & Cons** 🆕 | The Gardner Museum Heist, The Antwerp Diamond Heist, The Alcatraz Escape, D.B. Cooper, Han van Meegeren (Art Forgery), Victor Lustig & the Eiffel Tower, Charles Ponzi, The Great Train Robbery, The Hatton Garden Heist, Houdini & Escapology | Summer heist-movie energy (World Oceans Day beat lives in the Jun Collections) |
| **Jul '27** | **Games & Puzzles** | Rubik's Cube, Crosswords, Dice, Playing Cards, Board Games, Sudoku, Dominoes, Jigsaw Puzzles, Mazes, Magic Tricks | Summer-break "play" — kept |

**Specialist source per new category** (the "every category onboards a new institution" rule):
Survival → Cleveland Clinic / National Geographic / Divers Alert Network · Forensics → Smithsonian / National
Institute of Justice · Poisons → Natural History Museum (London) / Science History Institute · Perfume & Smell
→ Monell Chemical Senses Center · Microscopic Life → CDC / NIH · Heists → FBI History (The Vault) / Smithsonian.

**De-dup flags to honor at draft time** (these routes already avoid known live facts): Poisons/Poison-Dart-Frogs
coordinates with Reptiles/Frogs (split the toxin angle); Poisons routes *around* Reptiles/Venom + strange-jobs/
Snake-Milkers (uses plant/marine/chemical/radioactive poisons, not snake venom); Forensics routes around
human-body/Fingerprints (owns 3) and strange-jobs/Forensic-Entomologists (owns the maggot-clock) — uses trace
evidence, genealogy, ballistics instead; Microscopic Life routes around human-body/Gut-Microbiome (half-microbe/
B12) and Fungi (Nov) and geography/Rainforests (plankton-oxygen) — leads with Demodex mites; Heists/Houdini means
the Year-2 *Magic & Illusions* backlog and Jul's Games/Magic-Tricks must route around Houdini; Camouflage/
Mimic-Octopus + Cuttlefish coordinate with animals/Octopus.

## Collections — two per month (1st & 15th)

Each Collection is a curated pull from **existing** facts (illustrative members
shown; final `factIds` verified — and de-duped across Collections — at build).

> **Collections now carry the calendar.** Since the 2026-07-14 rewrite made the
> *categories* fascination-first, the twice-monthly Collections are where every
> seasonal beat lives (Perseids, back-to-school, Halloween, Valentine's, Earth Day,
> solstices, etc.). The schedule below already does this — every month's holiday/
> season hook is a Collection, so no category has to chase the calendar. As each new
> fascination category ships, it unlocks fresh Collection material too (e.g. after
> **Poisons** drops, a "Deadly Beauty" pack; after **Forensics**, a "Caught in the Act").

| Month | 1st of month | 15th of month |
| --- | --- | --- |
| **Aug '26** | **"Written in the Stars"** — Meteor Showers, Comets, Supernovas, Auroras, Cicadas *(Perseid peak, Aug 11–13)* | **"Too Hot to Handle"** — the Sun, Red Giants, Volcanoes, Lasers, Deserts *(dog days of summer)* |
| **Sep '26** | **"How Your Brain Learns"** — Learning, Memory, Attention, Habits, Neural Networks *(back-to-school)* | **"Your Lying Eyes"** — Optical Illusions, Motion Illusions, Color Illusions, Mirage, Placebo Effect *(how your brain fools you)* |
| **Oct '26** | **"Spooky Science"** — Bats, Spiders, Black Cats, Friday the 13th, Catacombs of Paris *(Halloween)* | **"Glow in the Dark"** — Bioluminescence, Fireflies, Anglerfish, Jellyfish, Cicadas *(eerie natural glow)* |
| **Nov '26** | **"Around the Table"** — Chocolate, Honey, Salt, Spices, Coffee *(Thanksgiving feast)* | **"Food Coma"** — Hibernation, Dreams, Yawning, Naps, Melatonin *(post-feast drowsiness)* |
| **Dec '26** | **"Festive & Frozen"** — Snow, Auroras, Hibernation, Glaciers, Crystals *(winter solstice, Dec 21)* | **"The Science of Sparkle"** — Gold, Crystals, Supernovas, Red Giants, Diamonds *(holiday shimmer)* |
| **Jan '27** | **"Fresh Start"** — Habits, Motivation, Decision Making, Goals *(New Year resolutions)* | **"Survival of the Coldest"** — Penguins, Polar Bears, Woolly Mammoths, Glaciers, Hibernation *(deep-winter cold)* |
| **Feb '27** | **"Lucky Red"** — Red, Gold, Dragons, Fireworks, the Chinese Zodiac *(Lunar New Year, Feb 6)* | **"The Chemistry of Love"** — Heart, Heart Symbol, Red, Pink, Chocolate *(Valentine's Day, Feb 14)* |
| **Mar '27** | **"Things That Grow"** — Bees, Butterflies, Baobab Trees, Pollination, Beetles *(spring equinox, Mar 20)* | **"The Luck of the Draw"** — Four-Leaf Clovers, Horseshoes, Rainbows, Probability, Black Cats *(St. Patrick's Day, Mar 17)* |
| **Apr '27** | **"You've Been Fooled"** — Optical Illusions, Mirage, Chameleons, Octopus, Placebo Effect *(April Fools' Day)* | **"Our Planet"** — Oceans, Climate, Glaciers, Rainforests, Recycling Symbol *(Earth Day, Apr 22)* |
| **May '27** | **"Science Fiction, Science Fact"** — Robotics, Medical Robots, Lasers, Computer Vision, Mars *(May the 4th)* | **"Backyard Wonders"** — Bees, Butterflies, Fireflies, Dragonflies, Beetles *(peak spring nature)* |
| **Jun '27** | **"Into the Deep"** — Deep Sea, Coral Reefs, Whales, Anglerfish, Bioluminescence *(World Oceans Day, Jun 8)* | **"Chasing the Sun"** — the Sun, Red Giants, Stonehenge, Comets, Meteor Showers *(summer solstice, Jun 21)* |
| **Jul '27** | **"Light Show"** — Auroras, Fireflies, Bioluminescence, Lasers, Supernovas *(July 4th fireworks weekend)* | **"Best of Year One"** — top facts from the launch year *(launch anniversary + Apollo 11, Jul 20)* |

**Tally:** 12 new categories + **24 Collections** (two a month) across the year. The
Categories screen gains a fresh tile monthly; the Collections screen gets a new
themed pack twice a month — all 24 with **zero** new drafting. Category *expansions*
remain opportunistic, layered on only when analytics flag a winner.

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
The six swapped-out categories are parked in the Year-2 backlog if ever wanted. *Geology, Rocks & Gems* and
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
  the dead-salmon fMRI, War of the Worlds *(famous hoaxes — pairs w/ Forensics)*
- **"The Invisible World"** — Gut Microbiome (you're half microbe), Atoms (mostly
  empty space), Visible Light (a tiny slice), Cosmic Microwave Background *(pairs w/ Microscopic Life)*
- **"Against the Odds"** — Shackleton, the mammalian dive reflex, wood frogs freezing
  solid, tardigrade-adjacent survival *(pairs w/ Survival & the Body's Limits)*

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

1. Finish the current launch backlog first (635 rows still `pending`).
2. Each month, ship **one new category** (on the 1st) **and two new Collections**
   (on the 1st and the 15th). The category can be seasonal *or* just intriguing —
   pull it from the schedule, the Year-2 backlog, or the Unexpected & Intriguing
   bank. The Collections come from the schedule or the Collection Ideas Bank.
3. Confirm every proposed **category topic** is still absent from `sources.csv`,
   and that every **Collection member** already exists in it, before staging — the
   schedule was de-duped against the registry, but the registry keeps growing.
   Keep the two Collections in a month from overlapping each other.
4. Prefer a non-Britannica specialist source for every new row; validate it
   scrapes cleanly before adding it.
5. Re-check the Britannica ratio quarterly and steer toward the 50% target.
6. Keep shipping a new category every month, but when analytics reveal a clear
   winner, add an opportunistic expansion on top — deepen that winner from the
   Existing-Category Expansion Backlog.
