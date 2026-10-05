/**
 * assign-themes.ts
 *
 * Adds a controlled, cross-cutting `themes` column to approved-facts.csv.
 *
 * Themes are the *intentional* connective tissue of the discover feature: unlike
 * tags (which describe a fact's subject) a theme is a pattern that recurs ACROSS
 * categories — "record-extremes", "origins-and-naming", "parental-care" — so two
 * facts from unrelated categories can share a deliberate discovery thread.
 *
 * Assignment is deterministic and rule-based: each theme has keyword patterns
 * matched (word-boundary, case-insensitive) against headline+summary+body+tags.
 * A fact keeps its top few themes ranked by hit strength. This is reviewable and
 * re-runnable; refine the vocabulary and re-run.
 *
 * The engine (generate-related-fact-ids.ts) consumes `themes` as a high-weight
 * bridge signal. Themes are NOT shipped to the app unless the export includes
 * them — they're primarily a relatedness-computation input.
 */

import fs from "node:fs";

const CSV_PATH = "approved-content/approved-facts.csv";
const MAX_THEMES_PER_FACT = 4;

// Each theme: keyword patterns as regex fragments. `min` = how many DISTINCT
// patterns must hit for the theme to apply (default 1; raise for broad themes).
interface ThemeDef { id: string; patterns: string[]; min?: number; }

const THEMES: ThemeDef[] = [
  // --- Legends / hoaxes / grittier-content lane (added 2026-10-04) ---------------
  // Specific on purpose: these sit FIRST so they win ties against the broad
  // generic themes below (e.g. "mother" -> parental-care, "voice" -> music-and-sound).
  // Several are forward-looking vocabulary for categories on the content roadmap
  // (Folklore, Crime & Forensics, Spies, Poisons, Dark History, Cursed Objects,
  // Dark Psychology, Parasites, Microscopic Life, ...) — they match nothing today.
  { id: "legend-and-folklore", min: 1, patterns: [
    "\\blegends?\\b", "folklore", "folk ?tale", "urban legend", "\\blore\\b",
    "the story goes", "\\bfables?\\b", "folk (hero|belief)", "y[oō]kai", "kitsune",
    "baba yaga", "\\bgolem\\b", "selkie", "\\banansi\\b", "la llorona",
    "headless horseman", "\\bnian\\b", "bell witch", "\\btanuki\\b" ] },
  { id: "ghosts-and-hauntings", min: 1, patterns: [
    "\\bghosts?\\b", "\\bhaunt", "apparition", "\\bs[eé]ances?\\b", "spiritualis",
    "\\bmediums?\\b", "ouija", "poltergeist", "paranormal", "supernatural",
    "spirit photo", "\\bspooky\\b", "ghost (ship|story|hunter)", "\\bspirit world" ] },
  { id: "spooky-science-explained", min: 1, patterns: [
    "infrasound", "pareidolia", "sleep paralysis", "hallucinat", "ideomotor",
    "pepper['’]s ghost", "double exposure", "carbon monoxide", "tomb toxin",
    "standing wave", "what (really|actually) (caused|explains)" ] },
  { id: "unsolved-mysteries", min: 1, patterns: [
    "\\bunsolved", "never (been )?solved", "\\bmystery\\b(?! house)", "\\bmysterious", "unexplained",
    "no one (knows|has ever)", "nobody knows", "cold case", "never (been )?explained",
    "baffl", "still (debated|unknown|unclear)" ] },
  { id: "maritime-mysteries", min: 1, patterns: [
    "ghost ship", "\\bshipwreck", "\\badrift\\b", "\\bderelict", "bermuda triangle",
    "flying dutchman", "\\bbrigantine", "abandoned (ship|vessel)", "\\bmutiny" ] },
  { id: "crime-and-forensics", min: 1, patterns: [
    "\\bcrimes?\\b", "\\bcriminal", "\\bdetective", "forensic", "fingerprint",
    "genetic genealogy", "\\bpolice\\b", "\\bheist", "\\brobb(ed|ery|ers?)\\b",
    "\\bburglar", "\\btheft\\b", "\\bpolygraph", "\\blie detector", "\\bmurder",
    "\\bhomicide", "\\bkidnap", "\\bcon (man|artist)", "\\bcrime scene" ] },
  { id: "justice-and-punishment", min: 1, patterns: [
    "\\btrial\\b", "\\bjury\\b", "\\bconvict", "\\bacquit", "\\bprosecut", "\\bexecut(ed|ion)",
    "guillotine", "\\bgallows", "\\bhanged\\b", "\\bpillory", "death sentence",
    "sentenced to", "\\bverdict", "trial by ordeal", "\\bcourtroom" ] },
  { id: "espionage-and-secrecy", min: 1, patterns: [
    "\\bspy\\b", "\\bspies\\b", "espionage", "intelligence agenc", "\\bcia\\b", "\\bkgb\\b",
    "\\bclassified\\b", "declassif", "undercover", "secret (agent|operation|mission|police)",
    "double agent", "surveillance", "wiretap", "\\bbugged\\b", "\\bconspirac",
    "cover.?up", "secret society", "\\bbletchley", "\\bdeception operation" ] },
  { id: "plague-and-epidemics", min: 1, patterns: [
    "\\bplague", "pandemic", "epidemic", "black death", "\\boutbreak", "quarantine",
    "contagio", "plague doctor" ] },
  { id: "mass-hysteria-and-panic", min: 1, patterns: [
    "witch trial", "witch.?hunt", "\\bwitches\\b", "witchcraft", "mass hysteria",
    "moral panic", "\\bhysteria\\b", "dancing plague", "\\bpanic\\b", "laughter epidemic" ] },
  { id: "treasure-and-lost-riches", min: 1, patterns: [
    "\\btreasure", "\\bhoard\\b", "buried (gold|treasure)", "\\bloot\\b",
    "lost (city|mine|gold|treasure|library)", "\\bjewels?\\b", "\\bdiamonds?\\b",
    "\\bgemstones?\\b", "\\bheirloom", "\\bamber room" ] },
  { id: "poison-and-toxins", min: 1, patterns: [
    "\\bpoison", "\\btoxic", "\\btoxins?\\b", "\\bvenom", "\\barsenic", "\\bcyanide",
    "\\bcurare", "tetrodotoxin", "nerve agent", "\\bpolonium" ] },
  { id: "parasites-and-mind-control", min: 1, patterns: [
    "\\bparasit", "\\bzombie", "mind control", "manipulat\\w* (its|the) host",
    "\\bfluke", "\\btapeworm", "\\bbotfl", "\\bisopod", "toxoplasm", "guinea worm" ] },
  { id: "cryptids-and-strange-creatures", min: 1, patterns: [
    "cryptid", "sasquatch", "bigfoot", "\\byeti\\b", "loch ness", "chupacabra",
    "jersey devil", "mothman", "sea (monster|serpent)", "\\bmonsters?\\b", "\\bkraken" ] },
  { id: "occult-and-divination", min: 1, patterns: [
    "\\btarot", "astrolog", "alchem", "divination", "palmistry", "palm reading",
    "\\bdowsing", "\\boccult", "\\bhoroscope", "fortune.?tell", "\\boracles?\\b" ] },
  { id: "grief-and-mourning", min: 1, patterns: [
    "\\bgrief", "\\bgrieving", "\\bmourn", "bereave", "\\bwidow", "\\bfuneral",
    "lost (a |her |his |their )?(child|children|husband|wife|son|brother|loved)" ] },
  { id: "tombs-and-burial", min: 1, patterns: [
    "\\bmumm(y|ies|ification)", "\\btombs?\\b", "\\bburial", "sarcophag", "\\bembalm",
    "\\bcatacomb", "\\bcemeter", "\\bgraveyard", "\\bgravestone", "\\bgraves\\b" ] },
  { id: "obedience-and-conformity", min: 1, patterns: [
    "\\bobedien", "\\bobey", "\\bconformity", "bystander", "\\bmilgram", "peer pressure",
    "authority figure", "stanford prison", "\\basch\\b" ] },
  { id: "cults-and-belief-systems", min: 1, patterns: [
    "\\bcults?\\b", "cargo cult", "\\bsect\\b", "\\bworship", "\\bpilgrim", "\\bbelievers\\b" ] },
  { id: "microscopic-life", min: 1, patterns: [
    "microscop", "\\bbacteri", "\\bmicrob", "tardigrade", "amoeba", "\\bplankton",
    "\\bmites?\\b", "\\bdiatom", "rotifer", "biofilm", "extremophile" ] },
  { id: "fungi-and-decay", min: 1, patterns: [
    "\\bmold\\b", "mushroom", "mycel", "\\byeast\\b", "\\blichen", "\\bspores?\\b",
    "\\btruffle", "toadstool", "slime mold" ] },
  { id: "scent-and-smell", min: 1, patterns: [
    "\\bsmell", "\\bscents?\\b", "\\bodou?rs?\\b", "\\bperfume", "pheromone", "fragrance",
    "olfactor", "petrichor" ] },
  { id: "holidays-and-traditions", min: 1, patterns: [
    "\\bholidays?\\b", "\\bfestival", "\\btradition", "\\bcelebrat", "christmas", "halloween",
    "thanksgiving", "diwali", "carnival", "new year", "day of the dead", "hanukkah" ] },
  { id: "record-extremes", min: 1, patterns: [
    "largest", "biggest", "smallest", "tallest", "longest", "shortest",
    "deepest", "heaviest", "lightest", "fastest", "slowest", "oldest",
    "hottest", "coldest", "highest", "widest", "world record", "best-selling",
    "holds the record", "most \\w+ ever", "record-breaking" ] },
  { id: "origins-and-naming", min: 1, patterns: [
    "named after", "named for", "gets its name", "the word .{0,20}comes from",
    "name comes from", "originally called", "etymology", "means ['‘]",
    "the name .{0,15}means", "coined the" ] },
  { id: "optical-illusion", min: 1, patterns: [
    "illusion", "trick(s)? (your|the) (eye|brain|mind)", "fools the (eye|brain)",
    "mirage", "isn['’]t really there", "your brain fills", "appears to" ] },
  { id: "perception-and-brain", min: 1, patterns: [
    "perception", "your brain", "the brain (thinks|sees|tricks|fills|decides)",
    "how we perceive", "sensory", "our senses", "the mind" ] },
  { id: "parental-care", min: 1, patterns: [
    "mother", "father", "parent", "lays? (its )?eggs", "incubat",
    "raise (its|their) young", "care(s|d)? for (its|their) (young|eggs)",
    "gives birth", "protect(s)? (its|their) (young|eggs|offspring)" ] },
  { id: "self-sacrifice", min: 1, patterns: [
    "sacrific", "gives (up )?its life", "dies (after|to|once)", "stop(s)? eating",
    "starv", "die(s)? (protecting|defending)" ] },
  { id: "camouflage-and-mimicry", min: 1, patterns: [
    "camouflage", "mimic", "blend(s)? in", "disguis", "impersonat",
    "looks (just )?like (a|an)", "pretend(s|ing)? to be" ] },
  { id: "deception-and-hoax", min: 1, patterns: [
    "hoax", "fooled", "forgery", "counterfeit", "tricked (the|people|everyone)",
    "exaggerat", "faked", "a scam", "propaganda", "\\bfraud", "swindl",
    "con (man|artist)", "\\bfakes?\\b", "bogus", "impost[eo]r", "\\bpranks?\\b",
    "fabricat", "confess(ed|ion)", "debunk" ] },
  { id: "hidden-underground", min: 1, patterns: [
    "underground", "beneath the (surface|ground|city)", "buried", "\\broots?\\b",
    "tunnel", "\\bcave\\b", "subterranean", "under the (ground|sea|city)" ] },
  { id: "extreme-temperature", min: 1, patterns: [
    "melt(s|ing)? (lead|metal|steel|rock)", "hot enough to", "molten", "lava",
    "hotter than", "colder than", "\\d+\\s?°", "degrees (f|c|fahrenheit|celsius)",
    "freezing" ] },
  { id: "relativity-and-time-warp", min: 1, patterns: [
    "time (runs|moves|slows|speeds)", "time dilation", "relativity",
    "ages? (slower|faster)", "warps? (space|time)", "faster than .{0,15}clock" ] },
  { id: "gravity-and-orbits", min: 1, patterns: [
    "\\bgravity\\b", "gravitational", "\\borbit", "weightless", "free fall",
    "escape velocity", "\\btides?\\b", "\\brotat", "\\brevolv", "\\bspins?\\b",
    "\\baxis\\b" ] },
  { id: "stars-and-cosmos", min: 1, patterns: [
    "\\bstars?\\b", "stellar", "supernova", "neutron star", "\\bplanets?\\b",
    "\\bnebula", "\\bmoons?\\b", "\\bcomet", "\\basteroid", "\\bgalax",
    "constellation", "\\bsolar\\b", "\\bcosmic", "light.year", "black hole",
    "\\buniverse\\b", "billions? of (years|stars|light)" ] },
  { id: "automation-robots-ai", min: 1, patterns: [
    "\\brobots?\\b", "\\bai\\b", "artificial intelligence", "algorithm",
    "self.driving", "autonomous", "\\bdrones?\\b", "machine learning",
    "neural network", "automat", "chatbot", "\\brover\\b" ] },
  { id: "internet-and-virality", min: 1, patterns: [
    "\\bviral\\b", "went viral", "\\bmeme", "social media", "\\bonline\\b",
    "\\bhashtag", "streaming", "the internet", "\\bwebsite", "\\bapp\\b",
    "\\bemoji" ] },
  { id: "money-trade-and-value", min: 1, patterns: [
    "\\bmoney\\b", "currency", "\\bprice", "\\beconom", "\\btrade", "\\bwealth",
    "\\bprofit", "\\bmarket", "worth (millions|billions|\\$)", "expensive",
    "\\bsalary", "inflation", "sold for" ] },
  { id: "materials-and-chemistry", min: 1, patterns: [
    "\\belements?\\b", "\\bmolecul", "\\batoms?\\b", "chemical", "\\bcompound",
    "\\breaction", "\\bacids?\\b", "\\balloy", "\\bpolymer", "\\bcrystal",
    "\\bmetal", "caffeine" ] },
  { id: "energy-and-power", min: 1, patterns: [
    "\\benergy\\b", "\\bpower(s|ed|ing)?\\b", "electric", "\\bbatter", "\\bfuel",
    "\\bvoltage", "\\bnuclear", "combustion", "\\bengine\\b", "\\bwatt" ] },
  { id: "plants-and-botany", min: 1, patterns: [
    "\\bplants?\\b", "\\btrees?\\b", "\\bflower", "\\bseeds?\\b", "\\broots?\\b",
    "photosynthesis", "\\bleaf\\b", "\\bleaves\\b", "\\bcrop", "botan",
    "\\bfungus\\b", "\\bfungi\\b" ] },
  { id: "medicine-and-cures", min: 1, patterns: [
    "\\bmedicine", "\\bcure", "vaccine", "\\bdrugs?\\b", "antibiotic",
    "\\btreatment", "\\bsurgery", "\\bdisease", "\\bvirus", "\\bremedy",
    "\\binfection" ] },
  { id: "human-body-quirks", min: 1, patterns: [
    "\\bblood\\b", "\\bbones?\\b", "\\bmuscle", "\\bskin\\b", "\\borgans?\\b",
    "\\bheart\\b", "immune", "\\bnerves?\\b", "\\bcells?\\b", "\\bteeth\\b",
    "\\blungs?\\b" ] },
  { id: "flight-and-aviation", min: 1, patterns: [
    "\\bflight\\b", "\\bfly(ing)?\\b", "aircraft", "\\bwings?\\b", "aerodynamic",
    "\\bjets?\\b", "supersonic", "takeoff", "\\bpilot", "\\bairplane", "\\bplane\\b" ] },
  { id: "collective-behavior", min: 1, patterns: [
    "\\bcrowd", "\\bswarm", "\\bflock", "\\bherd", "\\bcolony", "\\bhive\\b",
    "collective", "\\bmillions of (people|birds|insects|years)" ] },
  { id: "ancient-engineering", min: 1, patterns: [
    "roman concrete", "antikythera", "aqueduct", "\\bpyramid", "megalith",
    "ancient .{0,15}(built|engineer|invent)", "thousands of years ago .{0,20}built" ] },
  { id: "accidental-discovery", min: 1, patterns: [
    "by accident", "accidental", "stumbled (up)?on", "by chance", "serendipit",
    "unintention", "discovered .{0,15}by mistake" ] },
  { id: "world-first", min: 1, patterns: [
    "first ever", "world['’]s first", "the first \\w+ (to|ever|in|was|discovered|invented|made|built|used)",
    "earliest known", "the very first", "first person to", "pioneer",
    "\\bfirst \\w+ (spacecraft|planet|animal|country|city)" ] },
  { id: "self-organizing-patterns", min: 1, patterns: [
    "hexagon", "honeycomb", "fractal", "symmetr", "\\bspiral", "crystal",
    "geometric pattern", "tessellat", "fibonacci" ] },
  { id: "codes-and-cryptography", min: 1, patterns: [
    "\\bcipher", "encrypt", "cryptograph", "secret (code|message)",
    "hidden message", "\\bmorse\\b", "decode", "\\bcode\\b .{0,20}(secret|hidden|break)" ] },
  { id: "myth-vs-reality", min: 1, patterns: [
    "\\bmyth", "legend (says|has it|claims)", "folklore", "isn['’]t (actually|really)",
    "contrary to (popular )?belief", "common (myth|belief|misconception)", "debunk" ] },
  { id: "color-and-light", min: 1, patterns: [
    "\\bcolor", "\\bcolour", "rainbow", "wavelength", "spectrum", "pigment",
    "light bends", "why the sky", "reflect(s)? light" ] },
  { id: "timekeeping", min: 1, patterns: [
    "\\bclock", "\\bcalendar", "timekeeping", "leap (year|second)",
    "measure time", "keeps? time" ] },
  { id: "transformation-metamorphosis", min: 1, patterns: [
    "metamorphos", "transform(s|ed|ation)", "turns? into", "changes? into",
    "phase (change|transition)", "state of matter", "morph" ] },
  { id: "exploration-and-navigation", min: 1, patterns: [
    "explorer", "expedition", "navigat", "voyage", "circumnavigat", "\\bgps\\b",
    "\\bcompass", "migrat", "set(s)? sail", "charted" ] },
  { id: "language-and-writing", min: 1, patterns: [
    "\\balphabet", "writing system", "translat", "hieroglyph", "\\bscript\\b",
    "\\bletters?\\b .{0,20}(word|alphabet|sound)", "linguist", "pronunciat" ] },
  { id: "disaster-and-catastrophe", min: 1, patterns: [
    "disaster", "volcan", "eruption", "earthquake", "tsunami", "catastroph",
    "\\bcollapse", "sank", "\\bcrash", "meltdown" ] },
  { id: "symbiosis-and-cooperation", min: 1, patterns: [
    "symbio", "cooperat", "mutual", "work(s)? together", "partnership",
    "\\bcoexist", "host .{0,15}(organism|bacteria)", "colony" ] },
  { id: "animal-intelligence", min: 1, patterns: [
    "problem.solv", "tool use", "uses? tools", "self.aware", "recogniz(e|es)? (itself|faces)",
    "\\bclever", "remarkably (smart|intelligent)", "can learn", "counting" ] },
  { id: "survival-adaptation", min: 1, patterns: [
    "extremophile", "withstand", "survive .{0,20}(extreme|harsh|without)",
    "adapt(ed|ation) to", "endure", "tolerat(e|es) .{0,15}(heat|cold|pressure)",
    "hibernat", "dormant", "torpor", "suspended animation" ] },
  { id: "bioluminescence-and-glow", min: 1, patterns: [
    "bioluminescen", "glow(s|ing)?", "\\bluminous", "emit(s)? light", "light up",
    "phosphoresc" ] },
  { id: "lost-and-rediscovered", min: 1, patterns: [
    "\\blost\\b", "vanished", "disappeared", "rediscover", "long.lost",
    "found .{0,15}(centuries|years) later", "\\bmissing\\b" ] },
  { id: "invention-and-breakthrough", min: 1, patterns: [
    "invent", "\\bpatent", "prototype", "breakthrough", "revolutioniz",
    "changed .{0,15}forever" ] },
  { id: "luck-ritual-superstition", min: 1, patterns: [
    "superstition", "\\britual", "good luck", "bad luck", "\\bomen", "\\bcharm\\b",
    "\\bcurse", "ward(s)? off", "brings? (good|bad) (luck|fortune)" ] },
  { id: "counterintuitive-scale", min: 1, patterns: [
    "could (fit|swallow|hold)", "smaller than", "bigger than", "the size of",
    "as (big|small|heavy|long) as", "would (stretch|reach|cover)" ] },
  { id: "deep-sea-and-abyss", min: 1, patterns: [
    "deep sea", "ocean floor", "\\babyss", "mariana", "\\bunderwater",
    "the deep\\b", "crushing (water )?pressure of the" ] },
  { id: "storytelling-and-narrative", min: 1, patterns: [
    "\\bstor(y|ies)\\b", "narrative", "\\bnovels?\\b", "\\bfilms?\\b", "\\bmovies?\\b",
    "character", "\\bplot\\b", "\\bauthor", "\\bbook", "\\bfairy tale", "\\bfiction" ] },
  { id: "games-and-play", min: 1, patterns: [
    "\\bgames?\\b", "video game", "\\barcade", "\\bplayers?\\b", "\\bpuzzle",
    "\\bsport", "\\btournament", "championship", "\\bchess\\b", "\\bdice\\b" ] },
  { id: "music-and-sound", min: 1, patterns: [
    "\\bmusic", "\\bsound", "\\bnotes?\\b", "melody", "instrument", "\\bsongs?\\b",
    "rhythm", "\\baudio", "singing voice", "\\bvoice (actor|box|range)", "frequency", "\\bpitch\\b" ] },
  { id: "psychology-and-behavior", min: 1, patterns: [
    "\\bbehavior", "\\bhabit", "\\bemotion", "\\bdecision", "\\bfear\\b",
    "motivation", "personality", "\\bbias\\b", "subconscious", "\\bmemory\\b",
    "psycholog" ] },
  { id: "war-and-conflict", min: 1, patterns: [
    "\\bwars?\\b", "\\bbattle", "\\barmy\\b", "\\bsoldier", "\\bweapons?\\b",
    "\\bmilitary", "\\bsiege", "\\bfortress", "\\bcastle", "\\bconflict",
    "\\bcannon" ] },
  { id: "architecture-and-structures", min: 1, patterns: [
    "\\bbuilding", "\\bbridges?\\b", "\\btowers?\\b", "skyscraper", "\\bstructure",
    "\\bconstruct", "\\bdome\\b", "cathedral", "\\bmonument", "\\bfoundation" ] },
  { id: "food-and-cuisine", min: 1, patterns: [
    "\\bfood\\b", "\\beat(s|en|ing)?\\b", "\\bdish\\b", "cuisine", "recipe",
    "\\bbread\\b", "\\bcheese\\b", "\\bpizza", "\\bmeal\\b", "cooking", "\\bbaked?\\b",
    "ingredient", "\\bflavou?r", "\\bspice", "\\bsugar\\b", "\\bsalt\\b", "\\bmilk\\b",
    "\\bhoney\\b", "\\bfruit\\b" ] },
  { id: "coffee-and-tea", min: 1, patterns: [
    "\\bcoffee", "espresso", "\\bcaffeine", "\\bbrew", "\\blatte", "cappuccino",
    "\\btea\\b", "\\broast", "\\bbeans?\\b", "cold brew", "\\bmocha", "arabica",
    "robusta" ] },
  { id: "numbers-and-mathematics", min: 1, patterns: [
    "\\bnumbers?\\b", "\\bpi\\b", "\\bzero\\b", "\\bdigits?\\b", "equation",
    "mathematic", "geometr", "calculat", "probabilit", "\\binfinit", "\\bprime\\b",
    "\\bequals?\\b", "\\bfraction", "\\bpercent", "algebra", "\\bratio\\b" ] },
  { id: "computing-and-web", min: 1, patterns: [
    "computer", "software", "\\binternet", "\\bweb\\b", "website", "\\busb\\b",
    "wi.?fi", "\\bemail", "e.mail", "search engine", "\\bdigital", "\\bdata\\b",
    "\\bpixel", "hard drive", "\\bserver", "\\bbrowser", "floppy" ] },
  { id: "machines-and-mechanisms", min: 1, patterns: [
    "\\bgears?\\b", "\\bpulley", "\\blever", "\\bbrakes?\\b", "mechanism", "\\bvalve",
    "\\bpiston", "transmission", "\\bmotor", "\\bcrane\\b", "\\belevator", "\\bpump\\b",
    "\\bwheel", "\\baxle" ] },
  { id: "motion-and-force", min: 1, patterns: [
    "\\binertia", "\\bmomentum", "\\bfriction", "\\bvelocity", "acceleration",
    "\\bforces?\\b", "\\bnewton", "\\bthrust", "\\bdrag\\b", "\\btorque", "\\bfeedback",
    "\\bspeed", "\\bbrak(e|ing)" ] },
];

// --- CSV (RFC4180) ---
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let field = "", row: string[] = [], q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; } else field += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}
const csvField = (v: string) => (/[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v);
const toCsv = (h: string[], rows: string[][]) =>
  [h.map(csvField).join(","), ...rows.map((r) => r.map(csvField).join(","))].join("\n") + "\n";

function main() {
  const compiled = THEMES.map((t) => ({
    id: t.id,
    min: t.min ?? 1,
    regexes: t.patterns.map((p) => new RegExp(p, "i")),
  }));

  const table = parseCsv(fs.readFileSync(CSV_PATH, "utf8"));
  const header = table[0];
  const dataRows = table.slice(1).filter((r) => r.length >= header.length);
  const idx = (n: string) => header.indexOf(n);
  const [iHeadline, iBody, iSummary, iTags] = [idx("headline"), idx("body"), idx("summary"), idx("tags")];

  // Ensure a themes column exists (append if missing).
  let iThemes = header.indexOf("themes");
  if (iThemes === -1) { header.push("themes"); iThemes = header.length - 1; }

  const freq: Record<string, number> = {};
  let noTheme = 0;
  const themesPerFact: number[] = [];

  for (const r of dataRows) {
    const text = `${r[iHeadline]} ${r[iSummary]} ${r[iBody]} ${r[iTags].replace(/-/g, " ")}`.toLowerCase();
    const hits: { id: string; score: number }[] = [];
    for (const t of compiled) {
      let n = 0;
      for (const re of t.regexes) if (re.test(text)) n++;
      if (n >= t.min) hits.push({ id: t.id, score: n });
    }
    hits.sort((a, b) => b.score - a.score);
    const chosen = hits.slice(0, MAX_THEMES_PER_FACT).map((h) => h.id);
    for (const id of chosen) freq[id] = (freq[id] || 0) + 1;
    if (chosen.length === 0) noTheme++;
    themesPerFact.push(chosen.length);
    while (r.length <= iThemes) r.push("");
    r[iThemes] = chosen.join(",");
  }

  fs.writeFileSync(CSV_PATH, toCsv(header, dataRows), "utf8");

  const avg = (themesPerFact.reduce((a, b) => a + b, 0) / themesPerFact.length).toFixed(2);
  console.log(`Themes defined: ${THEMES.length}`);
  console.log(`Facts: ${dataRows.length} | avg themes/fact: ${avg} | facts with NO theme: ${noTheme}`);
  console.log("\nTheme frequency (sorted):");
  for (const [id, c] of Object.entries(freq).sort((a, b) => b[1] - a[1]))
    console.log(`  ${String(c).padStart(4)}  ${id}${c > dataRows.length * 0.25 ? "   <-- too broad?" : c < 8 ? "   <-- too narrow?" : ""}`);
}

main();
