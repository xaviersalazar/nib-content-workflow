/**
 * check-age-rating.ts
 *
 * Screens approved-content/approved-facts.csv against the 4+ hard gate in
 * docs/fact-writing-and-quality-guide.md §9.
 *
 * Two audiences drive this check:
 *   1. The App Store 4+ rating on the Nib app.
 *   2. Instagram's automated moderation — nib-social burns `headline`, `summary`
 *      AND `body` into carousel slide images, so all three fields are screened.
 *
 * This is a PREFILTER, not a judge. It has a deliberately high false-positive
 * rate ("icy bodies", trades "executed by computer", Loki changing "sex at
 * will") because context is what decides, and regex cannot read context.
 * ALWAYS read the flagged headlines by hand — same discipline as the §3
 * flatness pass.
 *
 * Severity:
 *   BLOCK — reject outright; the graphic detail is the hook (§9 auto-reject).
 *   WARN  — probably incidental; rewrite per §7 or confirm it's allowed.
 *
 * Exit code 1 if any BLOCK survives, so it can gate CI or a pre-export check.
 *
 * Usage: pnpm check:age-rating [--warn] [--json]
 */

import fs from "node:fs";

const CSV_PATH = "approved-content/approved-facts.csv";

// --- CSV (RFC4180) ---
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let field = "", row: string[] = [], q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

type Severity = "BLOCK" | "WARN";
interface Rule { name: string; severity: Severity; re: RegExp; note: string }

const RULES: Rule[] = [
  // --- BLOCK: disqualifying regardless of framing ---
  {
    name: "self-harm", severity: "BLOCK",
    re: /\b(suicides?|suicidal|self-harm|took (his|her|their) own life|killed (him|her|them)self)\b/i,
    note: "Disqualifying in any framing — including debunked myths and animal behavior.",
  },
  {
    name: "execution-method", severity: "BLOCK",
    // Bare "hanging" is almost always innocent (Hanging Gardens, Inca rope
    // bridges, Gaudi's chains, fog hanging in the air), so it only counts next
    // to a person or an explicit execution sense.
    re: /\b(behead\w*|decapitat\w*|guillotin\w*|gibbet\w*|hanged|gallows|burned at the stake|crucifi\w*|firing squad|(escaped|public) hanging|hanging (of|a man|a woman|him|her))\b/i,
    note: "Execution mechanics. Keep the historical irony, drop the method.",
  },
  {
    name: "torture-gore", severity: "BLOCK",
    re: /\b(tortur\w*|mutilat\w*|dismember\w*|disembowel\w*|cannibal\w*|flay\w*|severed head)\b/i,
    note: "Includes folklore and fairy-tale variants.",
  },
  {
    name: "murder", severity: "BLOCK",
    // "stabbing canines" (saber-tooth anatomy) is the recurring false positive,
    // so stabbing only counts with an explicit victim.
    re: /\b(murder(s|ed|er|ers|ous)?|assassinat\w*|massacre\w*|stabbed (to death|him|her|them)|strangl\w*|time of death)\b/i,
    note: "Killing as the subject. 'murder holes' and 'The Murders in the Rue Morgue' are known false positives — read it.",
  },
  {
    name: "sexual", severity: "BLOCK",
    re: /\b(sex work\w*|sexual\w*|slang for sex|copulat\w*|genital\w*|prostitut\w*)\b/i,
    note: "Flags on both the 4+ rating and Instagram moderation.",
  },

  // --- WARN: usually incidental, needs a human read ---
  {
    name: "corpse", severity: "WARN",
    re: /\b(corpses?|cadavers?|dead body|dead bodies|rotting flesh|decompos\w*)\b/i,
    note: "'icy bodies' / 'their bodies' are false positives — check the sense.",
  },
  {
    name: "substance", severity: "WARN",
    re: /\b(cocaine|opium|heroin|morphine|cigarettes?|smoking|alcohol\w*|drunk\w*)\b/i,
    note: "Incidental period detail is allowed (§9). Positive framing is not.",
  },
  {
    name: "atrocity", severity: "WARN",
    re: /\b(nazis?|holocaust|genocide|concentration camp|slavery|slaves?)\b/i,
    note: "Educational/resistance framing is explicitly allowed (§9). Keep it non-graphic.",
  },
  {
    name: "mass-casualty", severity: "WARN",
    re: /\b(death toll|killed (thousands|millions|hundreds)|perished|victims)\b/i,
    note: "Neutral historical death is allowed; dwelling on it is not.",
  },
];

/**
 * Reviewed exceptions: BLOCK hits a human has read and cleared. Keep this list
 * short and always record WHY — an unexplained entry is indistinguishable from
 * a fact that slipped through. Format: id -> justification.
 */
const ALLOWLIST: Record<string, string> = {
  "detective-fiction-reader-sleuth":
    "'The Murders in the Rue Morgue' is the published title of Poe's 1841 story, cited as the origin of the detective genre. No violent content in the fact itself.",
};

// --- run ---
const args = new Set(process.argv.slice(2));
const showWarn = args.has("--warn");
const asJson = args.has("--json");

const rows = parseCsv(fs.readFileSync(CSV_PATH, "utf8"));
const header = rows[0];
const idx = (c: string) => header.indexOf(c);
const [iId, iTopic, iHead, iBody, iSum] = ["id", "topic", "headline", "body", "summary"].map(idx);

interface Finding { id: string; topic: string; headline: string; severity: Severity; rule: string; field: string; excerpt: string; note: string }
const findings: Finding[] = [];

for (const row of rows.slice(1)) {
  if (!row[iId]) continue;
  const fields: [string, string][] = [
    ["headline", row[iHead] || ""],
    ["summary", row[iSum] || ""],
    ["body", row[iBody] || ""],
  ];
  for (const rule of RULES) {
    for (const [field, text] of fields) {
      const m = text.match(rule.re);
      if (!m) continue;
      const at = m.index ?? 0;
      const excerpt = text.slice(Math.max(0, at - 45), at + m[0].length + 45).replace(/\s+/g, " ").trim();
      findings.push({
        id: row[iId], topic: row[iTopic], headline: row[iHead],
        severity: rule.severity, rule: rule.name, field,
        excerpt: (at > 45 ? "…" : "") + excerpt + "…", note: rule.note,
      });
      break; // one hit per rule per fact is enough to trigger a human read
    }
  }
}

const allowed = findings.filter((f) => f.severity === "BLOCK" && ALLOWLIST[f.id]);
const blocks = findings.filter((f) => f.severity === "BLOCK" && !ALLOWLIST[f.id]);
const warns = findings.filter((f) => f.severity === "WARN");

if (asJson) {
  console.log(JSON.stringify({ blocks, warns }, null, 2));
} else {
  const print = (list: Finding[], label: string) => {
    if (!list.length) return;
    console.log(`\n${label} (${list.length})\n${"=".repeat(60)}`);
    let lastRule = "";
    for (const f of list) {
      if (f.rule !== lastRule) { console.log(`\n-- ${f.rule} --\n   ${f.note}`); lastRule = f.rule; }
      console.log(`\n  ${f.id}  (${f.topic}, ${f.field})`);
      console.log(`    ${f.headline}`);
      console.log(`    ${f.excerpt}`);
    }
  };
  print(blocks.sort((a, b) => a.rule.localeCompare(b.rule)), "BLOCK — reject or rewrite before export");
  if (showWarn) print(warns.sort((a, b) => a.rule.localeCompare(b.rule)), "WARN — read and confirm");

  const uniq = new Set(findings.map((f) => f.id)).size;
  console.log(`\n${"=".repeat(60)}`);
  console.log(`${rows.length - 1} facts screened · ${blocks.length} BLOCK · ${warns.length} WARN · ${allowed.length} allowlisted · ${uniq} facts flagged`);
  if (!showWarn && warns.length) console.log(`Re-run with --warn to see WARN findings.`);
  console.log(`Regex prefilter — read every hit before acting (guide §9).`);
}

process.exit(blocks.length ? 1 : 0);
