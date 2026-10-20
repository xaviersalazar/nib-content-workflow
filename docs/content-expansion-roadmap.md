# Nib Content Workflow

# Content Expansion Roadmap

> Last updated: 2026-10-20 · 958 facts · 57 categories · 33 collections · 4 series
> **Cadence changed 2026-10-20** (see below). The schedule in this doc runs **Nov 2026 → Oct 2027**.
> The launch-year plan this replaces (Aug–Oct 2026) is summarized under
> [Shipped so far](#shipped-so-far-aug--oct-2026); its full text is in git history.

---

# Purpose

A forward-looking plan for growing the content library: what ships when, and the backlog to pull from
when a slot needs swapping.

The goal is:

Grow breadth deliberately.

Keep trust high.

Make every bigger drop (Collections, Series) **richer than the last**, by feeding it from the categories
that shipped before it.

---

# The Cadence (2026-10-20)

## Why it changed

The launch-year cadence (1 category + 2 Collections a month, a Series every other month) shipped more
*packaging* than the library could fill. Collections are curation-only, and two a month drew down the
pool of strong, unused, on-theme facts faster than one category a month refilled it. The October
Collections had to be re-planned because their planned members were already used elsewhere.

The new cadence flips the ratio: **more new facts, fewer and better-stocked packages.**

## The rules

| Drop | When | How often | Size | New drafting |
| --- | --- | --- | --- | --- |
| **New category** ×2 | **1st and 15th** | Every month | 8–10 topics, up to 3 facts each (quality-gated, never padded) | ~24–30 facts each, ~50–60/month |
| **Collection** | **15th** | 2 of every 3 months (the months without a Series) | 4–8 existing facts | None: curation only |
| **Series** | **15th** | Every 3 months (Jan / Apr / Jul / Oct) | 8–15 facts, new and existing mixed | ~5–10 new facts |

**Collections and Series never drop in the same month.** The 15th rotates through the year:

> Collection (Nov) → Collection (Dec) → **Series (Jan)** → Collection (Feb) → Collection (Mar) →
> **Series (Apr)** → Collection (May) → Collection (Jun) → **Series (Jul)** → Collection (Aug) →
> Collection (Sep) → **Series (Oct)** → …

That's **24 categories, 8 Collections and 4 Series a year.**

## Same-day drops on the 15th (the Today card)

The 15th carries two drops: the month's second category **and** that month's Collection or Series.
The app shows only **one** Today card at a time: the newest undismissed drop by `addedAt`
(`NewDropState.todayCard`, sorted newest first in `NewDropDetector`). The second card appears only
after the reader closes the first with its ×. Both still get their tab dot and NEW pill.

**Rule: stagger the timestamps so the rarer drop wins the card.** On the 15th, set the category to
`T09:00:00Z` and the Collection/Series to **`T10:00:00Z`**. The later timestamp is newer, so the
Collection or Series gets the Today card and the category falls back to its tab dot until the reader
dismisses. Never give two drops on the same day an identical `addedAt`; the tie order is undefined.

## NEW-badge windows

- **Categories and Collections: 16 days** (`FeaturedCollectionPicker.newBadgeWindow`). With categories on
  the 1st and 15th, each one's pill overlaps the next by ~1–2 days. That's acceptable. If it starts to
  feel noisy, shrink the window to 14 days app-side; don't move the drop days.
- **Series: 64 days** (`FeaturedSeriesPicker.newBadgeWindow`). A Series every ~90 days never overlaps
  another. Do not schedule Series more often than every 3 months without revisiting this.

## Production math

Two categories a month doubles the drafting load to **~50–60 validated facts/month**, plus ~5–10 more
in Series months. The bottleneck is the human review pass, not scraping:

- **Stage each category ~4–6 weeks ahead**: verification table → owner approval → registry rows →
  scrape → draft → review. Publish early with a future `addedAt`; the reveal gate holds it invisible.
- **Keep the pair of categories in a month in different "weights"**: one sourcing-heavy (grittier,
  13+ lane, specialist sources) and one lighter (nature/science with established sources). The schedule
  below already alternates this way.
- Collections remain near-zero cost (picking and ordering). The Series is the one heavy package.

---

# The Pool Sweep (required before every Collection and Series)

Collections and Series are **built from the whole live database**, and the database grows by two
categories a month. Before finalizing any Collection or Series:

1. **Sweep the full `exports/facts.json`**, not just the categories the plan names. Search by theme
   (`themes`), tag, keyword and topic for anything that fits the angle, and pay special attention to
   everything added since the last Collection/Series (any fact with an `addedAt` in the trailing ~3–6
   months). The planned members below are a starting point; the sweep can replace any of them.
2. **Check reveal state.** A Collection or Series must never reveal a gated fact early: its `addedAt`
   has to be **on or after** the `addedAt` of every member fact. Prefer facts that have already been
   live for at least a few weeks over a category landing the same day.
3. **De-dup across packages.** No fact already in another Collection; minimal overlap with Series
   members; never rebuild a Collection or Series that already shipped. Check
   `exports/collections.json` and `exports/series.json` directly.
4. **Respect the reserved pairings** in the tables below (e.g. Salem belongs to the Jul '27 Series, so
   "Plagues & Panics" routes around it).
5. **Record the sweep** in the commit: which new-since-last-drop facts were considered, and which made it in.

The same sweep applies to a Series' **existing-fact** half before any new drafting is planned: draft
only for the facets the database genuinely doesn't cover.

---

# 12-Month Schedule — Nov 2026 → Oct 2027

| Month | 1st — Category | 15th — Category | 15th — Collection or Series |
| --- | --- | --- | --- |
| **Nov '26** | Hoaxes & Frauds ⚠️ | Fungi & Mushrooms | Collection: **"Dead Interesting"** |
| **Dec '26** | Spies & Secret Operations | Holidays & Traditions | Collection: **"Caught in the Act"** |
| **Jan '27** | Poisons, Venom & Toxins | Time & Timekeeping | **Series: The Enigma War** |
| **Feb '27** | Folklore Around the World | Perfume & the Science of Smell | Collection: **"Nature's Assassins"** |
| **Mar '27** | Crime & Forensics | Camouflage & Mimicry | Collection: **"Legends vs. Reality"** |
| **Apr '27** | Microscopic Life | Parasites & Mind Control | **Series: Chernobyl** |
| **May '27** | Dark History: Plagues, Panics & Trials | Birds | Collection: **"Whodunit"** |
| **Jun '27** | Heists, Escapes & Cons | Reptiles & Amphibians | Collection: **"The Invisible World"** |
| **Jul '27** | Cursed Objects & Lost Treasure | Games & Puzzles | **Series: The Salem Witch Trials** |
| **Aug '27** | Caves & the Underground | Unexplained Disappearances | Collection: **"Curses & Coincidences"** |
| **Sep '27** | Dark Psychology & Social Experiments | Evolution & Human Origins | Collection: **"Plagues & Panics"** |
| **Oct '27** | The Occult, Divination & Magic | Haunted Places | **Series: Jack the Ripper** |

**Tally:** 24 categories · 8 Collections · 4 Series.

⚠️ **Nov 1 is at risk.** As of 2026-10-20, Hoaxes & Frauds has no verified source table, no registry
rows and no scrapes. Ghosts took ~2 weeks from sourcing to ready. Start source discovery immediately;
if it can't clear review in time, ship it a few days late with its own `addedAt` (as Ghosts did on
Oct 19) rather than padding it. Fungi (Nov 15) should start right behind it.

**How the pairings feed forward:** every Collection and Series draws on categories that shipped at
least ~6 weeks earlier, so their members have been live long enough to have been someone's daily
fact. The links: Hoaxes (Nov 1) → "Caught in the Act" (Dec 15); Spies (Dec 1) → Enigma War (Jan 15);
Poisons (Jan 1) → "Nature's Assassins" (Feb 15); Folklore (Feb 1) → "Legends vs. Reality" (Mar 15);
Fungi (Nov) + Microscopic Life (Apr 1) → Chernobyl (Apr 15); Crime & Forensics (Mar 1) → "Whodunit"
(May 15); Microscopic + Parasites (Apr) → "The Invisible World" (Jun 15); Dark History (May 1) → Salem
(Jul 15) and "Plagues & Panics" (Sep 15); Cursed Objects (Jul 1) + Ghosts → "Curses & Coincidences"
(Aug 15); Crime & Forensics + Dark Psychology → Jack the Ripper (Oct 15).

The two exceptions are **Apr 15** (Chernobyl leans on Microscopic Life from the same month's 1st) and
**Jun 15** ("The Invisible World" leans on the Apr categories, ~8 weeks earlier, which is fine). For
Chernobyl, the Fungi facts from Nov are the main feed; use Apr 1 facts only if the sweep confirms
they're live first.

**Seasonal hooks** (optional, not required): Fungi in autumn; Holidays & Traditions in December; Time
& Timekeeping at New Year; Folklore around Lunar New Year (Feb 6, 2027); Perfume near Valentine's;
Microscopic Life in Earth Day month; Birds in spring migration; Caves for summer; back-to-school
psychology and evolution in September; the Occult and Haunted Places for Halloween.

---

# Categories — topics, sources and de-dup

Every category needs a verified source table approved by the owner before anything is registered
(`docs/source-discovery-and-registry.md`). **No Wikipedia** (owner rule). Every non-`fact` entry needs
its evidence anchor and plain-words status (guide §5). Re-check that each topic is still absent from
`source-registry/sources.csv` before staging; the registry keeps growing.

| Slot | Category | Topics (draft) | Specialist sources | Route around |
| --- | --- | --- | --- | --- |
| Nov 1 | **Hoaxes & Frauds** | Piltdown Man, The Cardiff Giant, The Cottingley Fairies, The Great Moon Hoax, The Vinland Map, The Turk (Fake Chess Robot), The FeeJee Mermaid, The War of the Worlds Broadcast, Archaeoraptor, The Surgeon's Photograph | Smithsonian, Natural History Museum, PBS, National Geographic | Fox Sisters + Spirit Photography (Ghosts); Crop Circles + Loch Ness (existing: `loch-ness-home` already covers the Surgeon's Photograph, so cut that topic if it duplicates); van Meegeren / Lustig / Ponzi (Heists) |
| Nov 15 | **Fungi & Mushrooms** | Mushrooms, Mycelium, Truffles, Mold, Yeast, Lichen, Spores, Slime Molds, Toadstools, Fungal Networks | Kew Gardens, Natural History Museum, National Geographic | `cicadas-shed-skins` (zombie fungus) and `fairies-close-to-humans` (fairy rings) already exist; penicillin facts in medicine |
| Dec 1 | **Spies & Secret Operations** | Operation Mincemeat, The Ghost Army, Bletchley Park, The Cambridge Five, The Berlin Tunnel, The Venona Project, The Glomar Explorer, Acoustic Kitty, The Great Seal Bug, Spy Pigeons | CIA Museum & *Studies in Intelligence*, NSA, International Spy Museum, Imperial War Museums | secret-codes (Enigma, Navajo Code Talkers, Steganography, One-Time Pad); Bletchley as *people and place* only, since the Jan Series owns the machine |
| Dec 15 | **Holidays & Traditions** | Christmas, Diwali, Lunar New Year, Day of the Dead, Hanukkah, Thanksgiving, New Year's, Carnival, Halloween, Birthdays | Smithsonian, National Geographic, Library of Congress | Hidden-origin angle only; route around superstitions and anything in Ghosts |
| Jan 1 | **Poisons, Venom & Toxins** | Arsenic & the Marsh Test, The Radium Girls, Botulinum → Botox, The Poison Garden, Cyanide, Poison Dart Frogs, Box Jellyfish, Pufferfish (Tetrodotoxin), Curare, Polonium | Natural History Museum (London), Science History Institute | Existing poison facts: Victorian green, white makeup, food tasters, snake milkers, poison ivy, potato berries; Poison Dart Frogs takes the toxin angle so Reptiles (Jun) doesn't |
| Jan 15 | **Time & Timekeeping** | Sundials, Atomic Clocks, Time Zones, Leap Seconds, Hourglasses, Water Clocks, The Prime Meridian, Daylight Saving Time, Railway Time, The Doomsday Clock | NIST, Royal Observatory Greenwich | human-civilization/Calendars, religion-beliefs/Religious Calendars, sleep-dreams/Circadian Rhythm, and the "Time Plays Tricks" Collection's members |
| Feb 1 | **Folklore Around the World** | Kitsune, The Yōkai Night Parade, Baba Yaga, The Nian, Anansi the Spider, The Golem of Prague, La Llorona, Selkies, Chupacabra, The Headless Horseman | Smithsonian Asian Art, British Library, Folklore Society | myths-legends (Fairies, Mermaids, Werewolves, Dragons, Norse Mythology, Sasquatch, Yeti, Kraken, Unicorns); "Monsters, Explained" members. Mostly `legend`, each with a documented origin |
| Feb 15 | **Perfume & the Science of Smell** | Smell & Memory, Petrichor, Pheromones, Ambergris, Anosmia, Olfactory Adaptation, The Nose, Skunk Spray, Fragrance Notes, Animal Musks | Monell Chemical Senses Center, Smithsonian, Scientific American | Existing `scent-and-smell` theme facts (sweep first) |
| Mar 1 | **Crime & Forensics** | Time of Death, Blood Spatter (Sam Sheppard), Forensic Odontology (Ted Bundy), The Body Farm, Genetic Genealogy (Golden State Killer), Ballistics (St. Valentine's Massacre), Forensic Anthropology, DNA Fingerprinting, The Polygraph, Locard's Exchange Principle | Smithsonian, National Institute of Justice, FBI History | human-body/Fingerprints; strange-jobs/Forensic Entomologists (the `excluded-age-rating` row; re-evaluate under 13+); the H.H. Holmes exhumation facts. Non-graphic treatment only (§9) |
| Mar 15 | **Camouflage & Mimicry** | Cuttlefish, Peppered Moths, Stick & Leaf Insects, Countershading, Zebra Stripes, Decoy Spiders, Batesian Mimicry, The Mimic Octopus, Orchid Mantis, Eyespots | Natural History Museum, Smithsonian, National Geographic | animals/Octopus, animals/Chameleons, and "The Art of Disguise" Collection's members |
| Apr 1 | **Microscopic Life** | Demodex Face Mites, Tardigrades, Are Viruses Alive?, Dust Mites, The Brain-Eating Amoeba, Extremophiles, Diatoms, Rotifers, Leeuwenhoek's 'Animalcules', Biofilms | CDC, NIH, Natural History Museum | human-body/Gut Microbiome; geography/Rainforests (plankton oxygen); the `door-to-hell-extremophiles` fact |
| Apr 15 | **Parasites & Mind Control** | Zombie-Ant Fungus, Toxoplasma, The Botfly, Cymothoa (Tongue-Eating Isopod), Guinea Worm, Cuckoo Brood Parasitism, The Jewel Wasp, The Lancet Fluke | Natural History Museum, CDC, National Geographic | Fungi (Nov) for the zombie-ant fungus (pick one home); `cicadas-shed-skins`; anglerfish fusion |
| May 1 | **Dark History: Plagues, Panics & Trials** | The Salem Witch Trials *(already scraped)*, The Black Death, The Dancing Plague of 1518, Trial by Ordeal, The Cadaver Synod, Plague Doctors, The Defenestration of Prague, The Great Stink, The Children's Crusade, MKUltra | Britannica, Science History Institute, British Library | history/Titanic, famous-disasters; `silk-road-black-death` and `sewers-two-systems` already exist (sweep before drafting). Salem's anchor facts here feed the Jul Series |
| May 15 | **Birds** | Owls, Hummingbirds, Eagles, Parrots, Flamingos, Crows, Peacocks, Woodpeckers, Falcons, Ostriches | Cornell Lab of Ornithology, Audubon, Smithsonian | Existing bird facts in animals (penguins, ravens); sweep first |
| Jun 1 | **Heists, Escapes & Cons** | The Gardner Museum Heist, The Antwerp Diamond Heist, The Alcatraz Escape, D.B. Cooper, Han van Meegeren (Art Forgery), Victor Lustig & the Eiffel Tower, Charles Ponzi, The Great Train Robbery, The Hatton Garden Heist, Houdini & Escapology | FBI History (The Vault), Smithsonian | Hoaxes & Frauds keeps pranks, fakes and fabrications; Houdini here means any later Magic category routes around him |
| Jun 15 | **Reptiles & Amphibians** | Snakes, Crocodiles, Komodo Dragons, Frogs, Toads, Geckos, Iguanas, Tortoises, Salamanders, Axolotls | Smithsonian National Zoo, San Diego Zoo, National Geographic | Poison Dart Frogs (Poisons); `dragons-hero-test` (Komodo venom) already exists |
| Jul 1 | **Cursed Objects & Lost Treasure** | The Koh-i-Noor, The Amber Room, The Lost Dutchman's Mine, El Dorado, The Beale Ciphers, The Library of Alexandria, Sutton Hoo, The Staffordshire Hoard, The Lima Treasure | Smithsonian, British Museum | Hope Diamond + Tutankhamun (Ghosts); pirates/Treasure Maps; mysteries/Oak Island |
| Jul 15 | **Games & Puzzles** | Rubik's Cube, Crosswords, Dice, Playing Cards, Board Games, Sudoku, Dominoes, Jigsaw Puzzles, Mazes, Monopoly | The Strong National Museum of Play, Smithsonian | sports/Chess; Houdini (Heists); the Ouija Board (Ghosts) |
| Aug 1 | **Caves & the Underground** | Stalactites, Sinkholes, Underground Rivers, Lava Tubes, Ice Caves, The Cave of Crystals, Cold War Bunkers, Salt Mines, Subterranean Life, Derinkuyu (Underground City) | National Park Service, USGS, National Geographic | geography/Caves; strange-places/Paris Catacombs; "Hidden Beneath Us" Collection's members |
| Aug 15 | **Unexplained Disappearances** | The Flannan Isles Lighthouse Keepers, Kaspar Hauser, The Lost Norse of Greenland, The Tamam Shud Case, The Franklin Expedition, The Princes in the Tower, Percy Fawcett, Glenn Miller, The Ninth Legion | Royal Museums Greenwich, Smithsonian, National Archives | mysteries (Roanoke, Amelia Earhart, Bermuda Triangle, Dyatlov); the Mary Celeste (Ghosts). Mostly `mystery` |
| Sep 1 | **Dark Psychology & Social Experiments** | Milgram's Obedience Study, Asch Conformity, The Bystander Effect (the Kitty Genovese myth), The Tanganyika Laughter Epidemic, Folie à Deux, Cargo Cults, The Stanford Prison Experiment (contested), Stockholm Syndrome (contested) | APA, Smithsonian, Britannica | `laughter-not-always-jokes` already covers Tanganyika (sweep; drop the topic if it duplicates); psychology/human-behavior explainer risk (guide §3) is highest here |
| Sep 15 | **Evolution & Human Origins** | Natural Selection, Neanderthals, Lucy, Stone Tools, Bipedalism, Human Migration, The Hobbit (Homo floresiensis), Denisovans, Darwin's Finches, The Piltdown Fallout | Smithsonian Human Origins, Natural History Museum | Piltdown Man itself lives in Hoaxes (Nov); only the scientific fallout here |
| Oct 1 | **The Occult, Divination & Magic** | Tarot, Astrology's Origins, Alchemy, Dowsing, Palmistry, Crystal Balls, Nostradamus, Grimoires, The Witch's Familiar, John Dee | Yale Library, Science History Institute, British Library | Séances, Fox Sisters, Ouija, Spirit Photography (Ghosts); `ancient-china-gunpowder` (alchemists) |
| Oct 15 | **Haunted Places** | The Stanley Hotel, The Enfield Haunting, The Tower of London's Ghosts, Raynham Hall, Eastern State Penitentiary, The Edinburgh Vaults, Poveglia, The Queen Mary | Smithsonian, English Heritage, Historic Royal Palaces | Everything in Ghosts & Haunted Things (Winchester, Bell Witch, Amityville). **Source quality is the risk**: many are hobbyist. If the source table can't clear review, swap in Magic & Illusions from the backlog |

---

# Series — every 3 months (Jan / Apr / Jul / Oct, on the 15th)

Each Series is a documentary on **one named subject**, 8–15 facts across **at least 4 categories**
(`docs/series-content-guide.md`). Run the [pool sweep](#the-pool-sweep-required-before-every-collection-and-series)
first; draft new facts only for facets the database doesn't already cover. A Series also needs a
`NibColors.topicColorMap` entry (app-side, keyed by title); without one it shows the grey fallback.

| Slot | Series | Fed by | Live anchors today | Angle |
| --- | --- | --- | --- | --- |
| **Jan 15 '27** | **The Enigma War** — "The Machine That Wasn't Unbreakable" | Spies & Secret Operations (Dec 1) + secret-codes | secret-codes/Enigma Machine (2), Navajo Code Talkers (3) | Bletchley's people and place come from Dec's category; the Series follows the machine and the codebreaking end to end |
| **Apr 15 '27** | **Chernobyl** — "The Zone That Became a Sanctuary" | Fungi (Nov 15), Microscopic Life (Apr 1), famous-disasters | famous-disasters/Chernobyl (3) | The exclusion zone's unplanned rewilding and the radiation-eating fungi, not a disaster recap. Sourcing from the 2026-07-30 Series session (World Nuclear Association, NIH) is still valid. *Note: the owner previously passed on it as too close in tone to Pompeii; re-confirm, or use an alternate* |
| **Jul 15 '27** | **The Salem Witch Trials** — "Anatomy of a Panic" | Dark History (May 1) | history/Salem Witch Trials (scraped, 0 live facts; drafted with May's category) | The ergot `theory`, the mass-hysteria angle, and the aftermath. "Plagues & Panics" (Sep) routes around Salem |
| **Oct 15 '27** | **Jack the Ripper** — "The Killer the Newspapers Named" | Crime & Forensics (Mar 1), Dark Psychology (Sep 1), H.H. Holmes Series | mysteries/Holmes as Jack the Ripper (1) | Halloween true crime, a follow-up to H.H. Holmes. Hook: the "Dear Boss" letter that named him was probably written by a journalist (`hoax`), plus the birth of crime-press sensationalism and the contested shawl-DNA claim (`theory`). Victim details stay non-graphic (§9) |

**Alternates for any Series slot:** Dyatlov Pass (Oct or Jan), D.B. Cooper (Jul, fed by Heists), The
Black Death (Jul, fed by Dark History), Operation Mincemeat (Jan, fed by Spies), The Paris Catacombs
(Oct). See the [Series backlog](#series-backlog).

**Tone:** a Series that mixes types leads with its verified facts and puts contested ones
(`legend`/`theory`/`hoax`) mid-Series, never as the opener.

---

# Collections — 2 of every 3 months (on the 15th)

Curated, cross-category pulls of **existing** facts. Members below are a starting point: finalize every
list with the [pool sweep](#the-pool-sweep-required-before-every-collection-and-series), and keep it
**wacky** where it fits.

| Slot | Collection | Fed by | Starting members |
| --- | --- | --- | --- |
| **Nov 15 '26** | **"Dead Interesting"** — the strangest things people have done with the dead | Ghosts (Oct) + the existing library | `paris-catacombs-cemetery-crisis`, `egyptian-religion-cosmos-order`, `tutankhamuns-curse-real-tomb-curses`, `stonehenge-solstice-alignment`, `pigpen-freemason-cipher`, `rabbits-foot-graveyard-rules`, `dire-wolf-la-brea` *(all verified unused 2026-10-20; Day of the Dead adjacent)* |
| **Dec 15 '26** | **"Caught in the Act"** — famous hoaxes and how they were exposed | Hoaxes & Frauds (Nov 1) | Cottingley Fairies, FeeJee Mermaid, War of the Worlds (from Nov's category), the dead-salmon fMRI (`mri-soft-tissue-detail`), `sasquatch-footprint-legend`. Crop circles and Loch Ness are already in "Fakes, Frauds & Hoaxes", so route around them |
| **Feb 15 '27** | **"Nature's Assassins"** *(wacky)* — the deadliest designs in nature | Poisons (Jan 1) | Box Jellyfish, Pufferfish, Poison Dart Frogs (Jan), `platypus-venomous-males`, `snake-milkers-research-venom`, dragonflies' 95% kill rate, mantis shrimp |
| **Mar 15 '27** | **"Legends vs. Reality"** — where the stories came from | Folklore Around the World (Feb 1) | The Nian, Kitsune, Yōkai, Chupacabra (Feb), plus the sweep. "Monsters, Explained" members are taken |
| **May 15 '27** | **"Whodunit"** — how cases actually got cracked | Crime & Forensics (Mar 1) | DNA Fingerprinting, Locard's Principle, the Polygraph, Forensic Odontology (Mar), `detective-fiction-poe-origin`, `the-holmes-exhumation-single-molar` |
| **Jun 15 '27** | **"The Invisible World"** — the life you can't see | Microscopic Life + Parasites (Apr) | Tardigrades, Demodex Mites, Toxoplasma (Apr), Gut Microbiome, Atoms (mostly empty space), Visible Light |
| **Aug 15 '27** | **"Curses & Coincidences"** — the stories people tell when luck turns | Cursed Objects (Jul 1) + Ghosts | The Koh-i-Noor (Jul), `tutankhamuns-curse-six-of-26`, the Hope Diamond (Ghosts), Black Cats, Evil Eye *(Friday the 13th falls on Aug 13, 2027: two days before)* |
| **Sep 15 '27** | **"Plagues & Panics"** — when fear spread faster than disease | Dark History (May 1) | The Dancing Plague, Plague Doctors, The Great Stink (May), `laughter-not-always-jokes`, `silk-road-black-death`, `printing-press-idea-machine` (penny dreadfuls). Routes around Salem (Jul Series) |

---

# Shipped so far (Aug – Oct 2026)

The launch-year cadence (1 category on the 1st, 2 Collections on the 15th, a Series on the 22nd every
other month) ran Aug–Oct 2026 before this change.

| Month | Category | Collections | Series |
| --- | --- | --- | --- |
| **Aug '26** | ✅ Survival & the Body's Limits (25 facts, Aug 1) | ✅ "Written in the Stars", "Too Hot to Handle" (Aug 15) | ✅ 3 launch Series (Alien Island, Pompeii, Apollo 13), Aug 1 · ❌ Titanic: missed, **archived** 2026-10-20 |
| **Sep '26** | ❌ Forensics: dropped at the 4+ gate (returns as Crime & Forensics, Mar '27) | ✅ "How Your Brain Learns", "Your Lying Eyes" (Sep 16, shipped silently, no NEW pill) | *(off-month)* |
| **Oct '26** | ✅ Ghosts & Haunted Things (27 facts, Oct 19) | ✅ "Monsters, Explained" (Oct 27; one Collection this month by decision; the planned "Spooky Science" / "Haunted by Science" overlapped existing Collections) | ✅ The Real H.H. Holmes (15 facts, Oct 22; swapped in for the Bermuda Triangle) |

Decisions carried forward from the launch year:

- **2026-07-14 fascination-first rewrite:** every category has to earn its slot on "wait, really?"
  alone. Structurally flat categories were parked (see the Parked table in the backlog).
- **2026-10-04 13+ re-plan:** the app moved to a 13+ rating with a `contentType` axis
  (`fact` / `legend` / `hoax` / `theory` / `mystery` / `possibility`), unlocking legends, hoaxes, true
  crime and grittier history. Hard floor and tone rule: guide §9. Evidence-anchor rule: guide §5.

---

# Backlog — alternatives to pull from

Everything below is confirmed **not** yet in `sources.csv` as of 2026-10-20 unless noted. Re-check
before staging. Swap any of these into a slot when sourcing fails, analytics shift, or a better
seasonal fit comes up.

## Category backlog

### Strongest alternates (ready to swap in)

| Category | Sample topics | Specialist sources | Notes |
| --- | --- | --- | --- |
| Magic & Illusions | Card Tricks, Stage Magic, Sleight of Hand, Levitation, Vanishing Acts, Misdirection, Mentalism, Famous Magicians, Sawing a Woman in Half, The Indian Rope Trick | Library of Congress, Britannica | Routes around Houdini (Heists). The fallback for Haunted Places (Oct '27) |
| Unsolved Codes & Puzzles | Kryptos, The Shugborough Inscription, The Phaistos Disc, The Zodiac Cipher, The Piri Reis Map | NSA, CIA Museum, British Museum | `mystery`/`theory`. Routes around Voynich (mysteries) and secret-codes |
| Twins & Cloning | Identical Twins, Twin Studies, Dolly the Sheep, Conjoined Twins, Mirror Twins, Clones, Twin Telepathy Myths, Chimeras | Smithsonian, NIH | |
| Geology, Rocks & Gems | Diamonds, Jade, Quartz, Geodes, Obsidian, Amber, Opal, Meteorites | Smithsonian, USGS | Routes around Cursed Objects (Koh-i-Noor, Hope Diamond) |
| Famous Scientists & Inventors | Einstein, Newton, Tesla, Marie Curie, Galileo, Ada Lovelace, Faraday | Britannica, Nobel Prize | Strange-lives angle only; flatness risk if biographical |
| Echoes & Acoustics | Whispering Galleries, Sonar, Echolocation, Sound Mirrors, Anechoic Chambers, Infrasound | Acoustical Society, Exploratorium | Infrasound was on the Ghosts bench |

### Unexpected & intriguing bank

| Category | Sample topics | Specialist sources |
| --- | --- | --- |
| Locks, Keys & Safes | Padlocks, Combination Locks, Vaults, Lock Picking, Master Keys, Handcuffs, Bank Vaults | Smithsonian, Britannica |
| Bubbles & Foam | Soap Bubbles, Surface Tension, Carbonation, Sea Foam, Bubble Wrap, Aerogel, Quicksand | Exploratorium, ACS |
| Knots & Rope | Nautical Knots, Macramé, Cat's Cradle, the Bowline, Rope-making, Knot Theory | Britannica, Smithsonian |
| Bridges & Tunnels | Suspension Bridges, Drawbridges, Aqueducts, Underwater Tunnels, Rope Bridges, Tunnel Boring | ASCE, Smithsonian |
| Spirals & Patterns in Nature | Fibonacci Spirals, Fractals, Honeycombs, Nautilus Shells, Tessellations, Romanesco | Britannica, Wolfram |

### Year-2 backlog

| Category | Sample topics | Specialist sources |
| --- | --- | --- |
| Trains & Railroads | Steam Engines, Subways, Bullet Trains, Maglev, Cable Cars, Funiculars | Smithsonian, Britannica |
| Amusement Parks & Rides | Roller Coasters, Ferris Wheels, Carousels, Water Slides, Haunted Houses, Fireworks | Smithsonian, Britannica |
| Gardens & Gardening | Seeds, Composting, Greenhouses, Botanical Gardens, Terrariums | Smithsonian Gardens, RHS |
| Photography | Camera Obscura, Daguerreotype, Polaroid, Famous Photos, Photojournalism, Long Exposure | George Eastman Museum |
| Fashion & Clothing | Blue Jeans, Sneakers, Silk, Hats, Haute Couture, Synthetic Fabrics | The Met Costume Institute |
| Materials | Glass, Plastic, Rubber, Graphene, Ceramics, Kevlar, Carbon Fiber | Britannica, ACS |
| Maps & Cartography | Globes, Map Projections, Nautical Charts, Atlases, Cartographers | Library of Congress |
| World Cultures & Flags | National Flags, Festivals, Greetings, Currencies, Anthems, Tea Cultures | National Geographic |

### Parked — swapped out for flatness (⚠️ re-scope before ever reviving)

| Category | Why cut | If revived, keep only |
| --- | --- | --- |
| Philosophy | Abstract -isms → definitions | Thought Experiments, Paradoxes, Philosophers' strange lives/deaths |
| Money & Personal Finance | Advice/definitional; overlaps economics + business | Counterfeiting, Mints, ATMs (as *history*) |
| Energy & Power | Infrastructure how-it-works | Nuclear, Fusion (as story: the demon core, Tsar Bomba) |
| Mirrors & Reflections | Optics mechanism; triple-overlaps existing content | One-Way Glass, Mirror Writing, Hall of Mirrors |
| Art | Survey-of-isms; Pigments duplicates **colors** | Mona Lisa theft, forgeries, hidden paintings under paintings |
| Ships & Boats | Mechanism topics; overlaps econ + Titanic | Submarines, Shipwrecks, Icebreakers |

## Series backlog

Every anchor verified against `sources.csv` / `facts.json`. Read the ⚠️ notes before scheduling.

| Series | Anchor topic | Live facts | Likely categories | The hook |
| --- | --- | --- | --- | --- |
| Dyatlov Pass | mysteries/Dyatlov Pass | 1 | mysteries, survival, physics, history | `theory`/`mystery` Series: what was found, the official conclusion, the competing explanations. ⚠️ A prior fact was removed for presenting the 2021 avalanche study as settled; never present one answer as *the* answer |
| D.B. Cooper | Heists (Jun '27) | 0 → category | aviation, mysteries, history, crime | The only unsolved US air piracy; FBI Vault files; the 1980 money find |
| The Black Death | Dark History (May '27) | 0 → category | history, medicine, microscopic life | Plague doctors, trade routes and what the science now says |
| Operation Mincemeat | Spies (Dec '26) | 0 → category | history, secret-codes, strange-jobs | The corpse-with-fake-papers deception, told through the planners |
| The Paris Catacombs | strange-places/Paris Catacombs | 3 | strange-places, history, architecture, geology | Six million dead, cataphiles, the secret cinema. Real horror with no supernatural claim |
| The Year Without a Summer | geography/Volcanoes (`volcanoes-shape-varies`) | 1 partial | geography, weather, literature, inventions | Tambora → the Villa Diodati ghost-story contest → *Frankenstein* and *The Vampyre* in one week; galvanism experiments |
| Burke & Hare | none | 0 | medicine, history, law, languages | Murder to supply anatomy schools; "burking"; iron mortsafes; the 1832 Anatomy Act |
| Lizzie Borden | none | 0 | crime, law, languages | The rhyme gets everything wrong; she was acquitted |
| The Mary Celeste | ghosts-haunted-things/The Mary Celeste | 3 | mysteries, famous-disasters, illusions | ⚠️ Mostly Ghosts-category material; needs 4+ categories of fresh angles |
| The Bermuda Triangle *(bumped 2026-10-20)* | mysteries/Bermuda Triangle | 1 | mysteries, weather, ocean-life | ⚠️ The Series guide rejected it once: fresh angles kept retelling "it's overhyped" |
| Krakatoa | famous-disasters/Krakatoa | 3 | famous-disasters, physics, weather, geography | The loudest sound ever recorded. Overlaps Pompeii's volcanic territory |
| Great Molasses Flood | famous-disasters/Great Molasses Flood | 2 | famous-disasters, physics, human-civilization | Wacky tone that varies the lineup |
| Zheng He | explorers/Zheng He | 3 | explorers, ancient-civilizations, engineering | A treasure fleet that dwarfed Columbus's ships |
| Marco Polo | explorers/Marco Polo | 3 | explorers, ancient-civilizations, human-civilization | "How much did he see himself?" Watch history/Silk Road overlap |
| Voyager Program | space/Voyager Program | 1 | space, astronomy, physics, technology | Still transmitting from interstellar space |
| Nellie Bly | explorers/Nellie Bly | 2 | explorers, history, inventions | One audacious journalistic stunt |
| Area 51 | mysteries/Area 51 | 2 | mysteries, aviation, history | Real government secrecy, not aliens; pairs with Spies |
| Oak Island | mysteries/Oak Island | 2 | mysteries, pirates, engineering | The 200-year Money Pit dig |
| Roanoke Colony | mysteries/Roanoke Colony | 2 | mysteries, history, explorers | The "Croatoan" clue (`mystery`) |
| The Voynich Manuscript | mysteries/Voynich Manuscript | 2 | mysteries, literature, secret-codes | The unread book |
| Amelia Earhart | mysteries/Amelia Earhart | 2 | mysteries, aviation, explorers | The disappearance plus the physical search evidence (Nikumaroro) |
| Dust Bowl | famous-disasters/Dust Bowl | 0 (scraped, never drafted) | famous-disasters, weather, geography | ⚠️ Budget as a mini-category |
| Roman Empire | history/Roman Empire | 1 | history, architecture, engineering | ⚠️ Re-source to 2–3 facts before building on it |
| Titanic *(archived 2026-10-20)* | history/Titanic | 3 | history, survival, physics | Missed its Aug '26 slot; revive only by explicit decision |

## Collection bank

Spares beyond the 8 scheduled. Each is a pull of existing facts; run the pool sweep before building.

**Ready now (verified unused 2026-10-20):**

- **"Strange Justice"** — `laws-national-codification` (animal trials), `great-fire-london-pudding-lane`
  (the false confession), `spirit-photography-nine-ways-acquitted`, `laws-ancient-codes` (Draco),
  `ancient-egypt-cats`
- **"Your Brain Is Haunted"** — `sleep-paralysis-hallucinations`, `pareidolia-faces-randomness`,
  `pareidolia-apophenia`, `mirage-bending-light`, `perception-brain-fills-gaps`,
  `insomnia-sleep-opportunity`. ⚠️ Would be the third perception Collection; Pareidolia and Mirage
  topics already appear in "Tricks of the Eye" / "Your Lying Eyes"

**Build after the matching category ships:**

- **"Spy vs. Spy"** — Operation Mincemeat, Ghost Army, Great Seal Bug, Acoustic Kitty *(after Spies;
  routes around the Jan Series' Enigma/Bletchley facts)*
- **"Fakes That Fooled the World"** — Piltdown Man, Cardiff Giant, Vinland Map, Great Moon Hoax,
  Archaeoraptor *(after Hoaxes; distinct from "Caught in the Act")*
- **"Haunted House Tour"** — Winchester Mystery House, Pepper's Ghost, Ouija Board, Mary Celeste, plus
  Haunted Places *(after Oct '27)*
- **"Heist Movie Night"** — Gardner Museum, Antwerp, Hatton Garden, Great Train Robbery *(after Heists)*
- **"Lucky Red"** — Red, Gold, Dragons, Fireworks, the Chinese Zodiac *(Lunar New Year)*

**Seasonal and evergreen spares:**

- **"Festive & Frozen"** — Snow, Auroras, Hibernation, Glaciers, Crystals *(winter solstice)*
- **"The Chemistry of Love"** — Heart, Heart Symbol, Red, Pink, Chocolate *(Valentine's)*
- **"You've Been Fooled"** — Optical Illusions, Placebo Effect, plus `hoax` facts *(April Fools')*
- **"Our Planet"** — Oceans, Climate, Glaciers, Rainforests *(Earth Day)*
- **"It Came From the Deep"** — Deep Sea, Anglerfish, Giant Squid, Bioluminescence *(watch overlap
  with "Creatures of the Deep")*
- **"Accidental Discoveries"** — Velcro, Penicillin, Microwaves, X-Rays *(watch "Happy Accidents")*
- **"Tiny but Mighty"** — Ants, Tardigrades, Atoms, Hummingbirds
- **"Built to Last"** — Pyramids, Roman Empire, Concrete, Castles
- **"Lost to Time"** — Atlantis, Roanoke Colony, Pompeii, Easter Island, Voynich Manuscript
- **"Speed Demons"** — Cheetahs, Formula 1, Supersonic Flight, Bullet Trains, Lightning
- **"Nature's Overachievers"** *(wacky)* — Tardigrades, Mantis Shrimp, Octopus, Immortal Jellyfish
- **"Food Coma"** — Hibernation, Dreams, Yawning, Naps, Melatonin
- **"The Science of Sparkle"** — Gold, Crystals, Supernovas, Diamonds
- **"Best of Year One"** — top facts from the launch year *(launch anniversary, Jul '27)*

## Existing-category expansion backlog

Opportunistic, **on top of** the schedule, when analytics flag a category worth deepening. Prefer a
specialist source over Britannica.

| Category | Confirmed-new topics | Prefer source |
| --- | --- | --- |
| Animals | Bears, Lions, Foxes, Bats, Pandas, Koalas, Kangaroos, Camels, Beavers, Hyenas | WWF, San Diego Zoo |
| Human Body | Liver, Kidneys, Nervous System, Teeth, Stomach, Tongue, Sweat, Nails | Cleveland Clinic |
| Food | Eggs, Tea, Sugar, Butter, Vinegar, Fermentation, Garlic | Smithsonian, Britannica |
| Ocean Life | Crabs, Lobsters, Eels, Manta Rays, Narwhals, Walruses, Barnacles, Clownfish | NOAA, Monterey Bay Aquarium |
| Sports | Cycling, Boxing, Climbing, Gymnastics, Cricket, Rugby, Hockey, Archery | Olympics.com, Britannica |
| Weather | Floods, Droughts, Blizzards, Heat Waves, Sandstorms, Jet Stream | NOAA, NWS |
| Music | Opera, Bagpipes, Drums, Guitars, Pianos, Reggae | Britannica, Smithsonian |
| Movies | Westerns, Horror Movies, Film Noir, Voice Acting, Box Office, Cameos | AFI, Britannica |
| Mysteries | The Tunguska Event, Kryptos, The Phaistos Disc *(`mystery`/`theory`)* | Smithsonian, Royal Museums Greenwich |

---

# Source Diversification Goal

> **Target: keep reducing Britannica's share of topics toward ~50%.**

Two categories a month means twice as many chances to onboard specialist institutions. Rules:

1. **Every new category onboards at least one new institution.** The category table assigns one.
2. **When expanding existing categories, prefer a specialist source** over Britannica.
3. **Validate scraping before committing rows.** Run `pnpm scrape:source` against a candidate URL first;
   only add the row if it returns clean article text (not boilerplate, a memoir, or an off-topic essay).
4. **Track the ratio quarterly** and let it steer the next batch.

```bash
total=$(tail -n +2 source-registry/sources.csv | grep -vc '^$')
brit=$(tail -n +2 source-registry/sources.csv | grep -v '^$' | awk -F, '$3=="Britannica"' | wc -l)
echo "Britannica: $brit / $total"
```

---

# Staging convention: the `backlog` status

`pending` rows are consumed by `scrape:next` and `scrape:batch`. To stage future rows without scraping
them early:

- `backlog` — decided on, URL recorded, **not** ready to scrape
- `pending` — ready; picked up by `scrape:batch`
- `complete` — scraped

Flip a drop's rows from `backlog` to `pending` when it enters its 4–6 week staging window.

---

# How To Use This Document

1. **Every month:** ship a category on the **1st** and another on the **15th**. Stage each 4–6 weeks
   ahead (verification table → owner approval → registry → scrape → draft → review → export → publish
   with a future `addedAt`).
2. **On the 15th, also ship that month's Collection or Series**, per the rotation (Series in Jan / Apr /
   Jul / Oct; a Collection in every other month). Stagger `addedAt` so it's later than the category's
   (`T10:00:00Z` vs `T09:00:00Z`).
3. **Before every Collection or Series, run the pool sweep** over the whole database, with extra
   attention to the categories added since the last package. Never include a fact gated later than the
   package itself.
4. **Re-check de-dup before staging**: category topics against `sources.csv`; Collection members
   against `collections.json`; Series members against `series.json`.
5. **Check content type and tone**: every non-`fact` entry needs its `contentType`, evidence anchor and
   hedging in headline, summary *and* body (guide §5). Run `pnpm check:age-rating --warn` and read every
   hit against the tone rule (guide §9).
6. **Swap from the backlog** when a source table can't clear review, rather than padding a weak slot.
7. **Update this doc** when a slot ships (✅ in the schedule) or changes, and keep the header counts
   current.
