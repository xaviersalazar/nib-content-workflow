# TIL Content — "Wow" Rewrite Workflow: Session Handoff

> Last updated: 2026-07-01 · 2067 facts · 51 categories
> (Keep this line current — bump it every time a category is finished. See step 9 of the standing pattern.)

## What this is
TIL ("Today I Learned") is an iOS app that serves one fascinating fact a day. Content lives in a single
CSV. New categories get added as **textbook-style dumps** (bare definitions, often citing "Britannica"),
and the job is to rewrite every fact into a genuine **"wait, really?" "wow"** fact in the app's house voice.

## Key locations
- **CSV:** `til-content-workflow/approved-content/approved-facts.csv`
- **Run scripts from:** the `approved-content/` directory.
- **The playbook (read it first):** `docs/topic-curation-and-quality-guide.md`
- Voice/style rules also in `docs/fact-rewrite-style-guide.md`; the 3-per-topic rule in
  `docs/content-generation-rules.md`.
- **Persistent memory:** `til_content_pipeline_state.md` (in the Claude memory dir) tracks the running
  state + every de-dup decision (exhaustive per-category log). Update it after each category, alongside
  this handoff doc.

## Current state (2026-07-01)
- **2067 facts · 51 categories · every topic exactly 3 facts.**
- All 51 categories have been rewritten via this workflow. Categories: space, astronomy, history,
  ancient-civilizations, animals, ocean-life, human-body, psychology, food, coffee, technology,
  artificial-intelligence, internet-culture, video-games, movies, music, sports, engineering, aviation,
  cars, physics, chemistry, mathematics, business, economics, literature, languages, architecture,
  myths-legends, mysteries, medicine, geography, weather, inventions, religion-beliefs, dinosaurs,
  ancient-creatures, pirates, castles-fortresses, famous-disasters, strange-jobs, everyday-objects,
  household-science, famous-symbols, colors, sleep-dreams, illusions-perceptions, secret-codes,
  superstitions, human-behavior, explorers.
- **Recent additions:** medicine, geography, weather, inventions, religion-beliefs (2026-06-29) →
  dinosaurs, ancient-creatures, pirates, castles-fortresses, famous-disasters (2026-06-29) →
  strange-jobs, everyday-objects, household-science, famous-symbols, colors (2026-06-30) →
  sleep-dreams, illusions-perceptions, secret-codes, superstitions, human-behavior, explorers
  (2026-07-01).
- **Size exceptions** (left as-is, every topic still at 3): most categories are 15 topics x 3 = 45.
  Exceptions: `religion-beliefs` 16 topics (48); `myths-legends` 16 (48); `dinosaurs`,
  `ancient-creatures`, `pirates`, `castles-fortresses`, `strange-jobs`, `everyday-objects`,
  `household-science`, `famous-symbols`, `colors`, `sleep-dreams`, `illusions-perceptions`,
  `secret-codes`, `superstitions`, `human-behavior`, `explorers` each 10 topics (30); `famous-disasters`
  9 topics (27); `languages` 13 (39); `sports` 13 (39); `video-games` 14 (42); `history` 63; `space` 51.

## The standing pattern (what the user expects each time)
When the user says "new category of X added, run the same process," do exactly this:

1. **Locate the category id** (it's usually not literally what they call it — e.g. "castles" was actually
   the `architecture` category; "myths & legends" -> `myths-legends`). Find it by listing `categoryId`
   counts and looking for the new/odd one.
2. **Back up first:** `cp approved-facts.csv "approved-facts.backup-<cat>-$(date +%Y%m%d-%H%M%S).csv"`
3. **Inspect structure** (confirm every topic is at 3) and **dump all facts** with full bodies.
4. **De-dup grep (critical — see below).** Grep the new category's subjects/topics against the rest of
   the dataset to find collisions, and reroute angles before proposing.
5. **Propose the full slate** as a compact table (one "wow" angle per fact), then call AskUserQuestion to
   approve. The user has approved "Approve all, write them" every time — but still ask.
6. **Write all rewrites** in a throwaway Python script (template below), keep id/topic/relatedFactIds,
   swap only headline/body/summary/tags.
7. **Run integrity check (section 5e).** Then `rm` the script.
8. **Update memory** (`til_content_pipeline_state.md` + the `MEMORY.md` index line with the new
   fact/category counts and any new de-dup decisions).
9. **Update THIS handoff doc** (required — do not skip): bump the `Last updated` line and the
   **Current state** section (new totals, add the category to the list + size-exceptions), and add any
   notable new angle-ownership to **The de-dup discipline** so future categories avoid it. The memory
   file holds the exhaustive log; this doc holds the running state + the high-value landmines.
10. Tell the user to re-export with `pnpm export:facts` when ready (do NOT run the export yourself).

## House style (section 3 of the guide)
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
print('topics not at 3:',[k for k,c in Counter((r['categoryId'],r['topic']) for r in rows).items() if c!=3] or 'none')
print('dup headlines dataset-wide:',[k for k,c in Counter(r['headline'] for r in rows).items() if c>1] or 'none')
```
Target for a finished category: no dup ids/headlines dataset-wide, 0 dangling links, every topic at
exactly 3, bodies in the 55–95 band (aim 65–80; recent batches have run ~78–82 avg, which is fine),
zero "Britannica"/source-attribution framing left in the new category.

## Other notes
- `id` is permanent — never change it, even on a full rewrite (other facts' `relatedFactIds` point at it).
- `funScore` is not a real quality signal here (almost everything is 9–10) — judge on content.
- CSV columns: `id, categoryId, topic, headline, body, summary, tags, readTimeSeconds, funScore,
  featured, relatedFactIds`.
- This is **not a git repo**; the only versioning is the timestamped `approved-facts.backup-*.csv` files.
- The user's cadence: they add a category between sessions, then say "run the same process." They approve
  the whole slate and want it done end-to-end with the de-dup care described above.
