/**
 * normalize-tags.ts
 *
 * Canonicalizes the `tags` column in approved-content/approved-facts.csv so the
 * relatedness engine sees one token per concept instead of near-duplicates:
 *
 *   1. lowercase + trim
 *   2. hyphenate multi-word tags ("internet culture" -> "internet-culture") to
 *      match the categoryId style and the majority of specific tags.
 *   3. safe plural->singular merge: only when the singular form ALSO exists as a
 *      tag somewhere in the corpus (so we never mangle "physics" -> "physic").
 *      A tiny exclusion list prevents wrong merges (blues != blue).
 *   4. a short, conservative synonym map (acronym/exact synonyms only).
 *   5. de-duplicate within each fact, preserving first-seen order.
 *
 * Idempotent: running twice is a no-op.
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
const csvField = (v: string) => (/[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v);
const toCsv = (h: string[], rows: string[][]) =>
  [h.map(csvField).join(","), ...rows.map((r) => r.map(csvField).join(","))].join("\n") + "\n";

// --- normalization rules ---
const SYNONYMS: Record<string, string> = {
  ai: "artificial-intelligence",
  automobile: "cars",
  automobiles: "cars",
  film: "movies",
  films: "movies",
};
// Plural merges we must NOT make even though both forms exist (false friends).
const PLURAL_EXCLUDE = new Set(["blues"]);

const hyphenate = (t: string) => t.trim().toLowerCase().replace(/\s+/g, "-");

function singularOf(h: string): string | null {
  if (h.length > 4 && h.endsWith("ies")) return h.slice(0, -3) + "y";
  if (h.length > 4 && h.endsWith("ses")) return h.slice(0, -2);
  if (h.length > 4 && h.endsWith("s") && !h.endsWith("ss") && !h.endsWith("us") && !h.endsWith("is"))
    return h.slice(0, -1);
  return null;
}

function main() {
  const table = parseCsv(fs.readFileSync(CSV_PATH, "utf8"));
  const header = table[0];
  const iTags = header.indexOf("tags");
  const dataRows = table.slice(1).filter((r) => r.length >= header.length);

  // Pass 1: build the set of all hyphenated tags to drive safe plural merges.
  const present = new Set<string>();
  for (const r of dataRows)
    for (const t of r[iTags].split(",").map(hyphenate).filter(Boolean)) present.add(t);

  const pluralMap = new Map<string, string>();
  for (const h of present) {
    const s = singularOf(h);
    if (s && s !== h && present.has(s) && !PLURAL_EXCLUDE.has(h)) pluralMap.set(h, s);
  }

  const canon = (raw: string): string => {
    let t = hyphenate(raw);
    if (SYNONYMS[t]) t = SYNONYMS[t];
    if (pluralMap.has(t)) t = pluralMap.get(t)!;
    // a synonym target could itself be a plural ("movies"); leave as-is — it's the chosen canonical form
    return t;
  };

  // Pass 2: rewrite.
  let changedFacts = 0;
  const mergeExamples = new Map<string, string>();
  const beforeUnique = new Set<string>();
  const afterUnique = new Set<string>();

  for (const r of dataRows) {
    const original = r[iTags].split(",").map((s) => s.trim()).filter(Boolean);
    for (const t of original) beforeUnique.add(t.toLowerCase());
    const seen = new Set<string>();
    const out: string[] = [];
    for (const raw of original) {
      const c = canon(raw);
      if (c !== raw.trim().toLowerCase() && mergeExamples.size < 40)
        mergeExamples.set(raw.trim().toLowerCase(), c);
      if (!seen.has(c)) { seen.add(c); out.push(c); afterUnique.add(c); }
    }
    const joined = out.join(",");
    if (joined !== r[iTags]) changedFacts++;
    r[iTags] = joined;
  }

  fs.writeFileSync(CSV_PATH, toCsv(header, dataRows), "utf8");

  console.log(`Facts with tag changes: ${changedFacts}/${dataRows.length}`);
  console.log(`Unique tags: ${beforeUnique.size} -> ${afterUnique.size}`);
  console.log(`Plural merges applied: ${pluralMap.size}, synonym rules: ${Object.keys(SYNONYMS).length}`);
  console.log("Sample rewrites:");
  for (const [from, to] of [...mergeExamples].slice(0, 25)) console.log(`  ${from} -> ${to}`);
}

main();
