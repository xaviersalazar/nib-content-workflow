/**
 * generate-related-fact-ids.ts
 *
 * Populates the `relatedFactIds` column in approved-content/approved-facts.csv.
 *
 * Approach (deterministic, no external API needed):
 *   For every fact we compute a relatedness score against every other fact that
 *   shares at least one signal (a tag or a meaningful text token). The score
 *   blends two normalized similarities:
 *     - IDF-weighted tag cosine   (shared specific tags = strong thematic link)
 *     - TF-IDF text cosine        (conceptual overlap in headline+summary+body)
 *
 *   Candidates are then partitioned into three pools relative to the source fact:
 *     - sameTopic   (same categoryId AND same topic)
 *     - sameCat     (same categoryId, different topic)  -> "adjacent topic"
 *     - crossCat    (different categoryId)              -> "bridge" / "serendipity"
 *
 *   We fill an ordered list of 5 following the guide's discovery mix:
 *     1. same topic
 *     2. same topic (2nd) else adjacent
 *     3. adjacent topic
 *     4. cross-category bridge (best cross-cat)
 *     5. serendipitous jump (next best cross-cat from a *different* category)
 *   Under-filled slots backfill from remaining candidates by score so every fact
 *   reaches 5 where possible (hard minimum 3). A light reciprocity pass adds
 *   strong links back to under-filled partners (cap 6).
 *
 * See docs/related-fact-ids-guide.md for the product rationale.
 */

import fs from "node:fs";

const CSV_PATH = "approved-content/approved-facts.csv";

// ---- CSV helpers (RFC4180) -------------------------------------------------

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c === "\r") {
      // ignore; handled by \n
    } else {
      field += c;
    }
  }
  // trailing field / row
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function csvField(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return '"' + value.replace(/"/g, '""') + '"';
  }
  return value;
}

function toCsv(header: string[], rows: string[][]): string {
  const lines = [header.map(csvField).join(",")];
  for (const r of rows) lines.push(r.map(csvField).join(","));
  return lines.join("\n") + "\n";
}

// ---- Text normalization ----------------------------------------------------

const STOPWORDS = new Set(
  (
    "a an the and or but of to in on at by for with from as is are was were be been being " +
    "it its this that these those they them their there here what which who whom whose when " +
    "where why how all any both each few more most other some such no nor not only own same " +
    "so than too very can will just should now then out up down over under again once about " +
    "into through during before after above below off between one two three you your we our " +
    "his her him she he them they has have had do does did doing would could may might must " +
    "also like many much even still first make made makes take takes get gets got than into"
  ).split(/\s+/),
);

function tokenize(text: string): string[] {
  const out: string[] = [];
  const raw = text
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[^a-z0-9']+/g, " ")
    .split(/\s+/);
  for (let w of raw) {
    w = w.replace(/'s$/, "").replace(/'/g, "");
    if (w.length < 3) continue;
    if (STOPWORDS.has(w)) continue;
    // crude singularization so "planets" ~ "planet", "galaxies" ~ "galaxy"
    if (w.length > 4 && w.endsWith("ies")) w = w.slice(0, -3) + "y";
    else if (w.length > 4 && w.endsWith("ses")) w = w.slice(0, -2);
    else if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) w = w.slice(0, -1);
    out.push(w);
  }
  return out;
}

// ---- Types -----------------------------------------------------------------

interface Fact {
  idx: number;
  id: string;
  categoryId: string;
  topic: string;
  tags: string[];
  textVec: Map<string, number>; // TF-IDF, normalized
  tagVec: Map<string, number>; // IDF-weighted, normalized (category-echo stripped)
  themeVec: Map<string, number>; // IDF-weighted cross-cutting themes, normalized
}

function cosine(a: Map<string, number>, b: Map<string, number>): number {
  // vectors are pre-normalized to unit length -> dot product == cosine
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  let dot = 0;
  for (const [k, v] of small) {
    const w = large.get(k);
    if (w) dot += v * w;
  }
  return dot;
}

function normalize(vec: Map<string, number>): void {
  let norm = 0;
  for (const v of vec.values()) norm += v * v;
  norm = Math.sqrt(norm);
  if (norm === 0) return;
  for (const [k, v] of vec) vec.set(k, v / norm);
}

// ---- Main ------------------------------------------------------------------

function main() {
  const raw = fs.readFileSync(CSV_PATH, "utf8");
  const table = parseCsv(raw);
  const header = table[0];
  const dataRows = table.slice(1).filter((r) => r.length >= header.length);

  const col = (name: string) => header.indexOf(name);
  const iId = col("id");
  const iCat = col("categoryId");
  const iTopic = col("topic");
  const iHeadline = col("headline");
  const iBody = col("body");
  const iSummary = col("summary");
  const iTags = col("tags");
  const iThemes = col("themes"); // -1 if the theme layer hasn't been generated
  const iRelated = col("relatedFactIds");

  const N = dataRows.length;

  // First pass: gather raw tokens + document frequencies.
  const textTokensList: string[][] = [];
  const tagList: string[][] = [];
  const themeList: string[][] = [];
  const textDf = new Map<string, number>();
  const tagDf = new Map<string, number>();
  const themeDf = new Map<string, number>();

  for (const r of dataRows) {
    const textTokens = tokenize(
      `${r[iHeadline]} ${r[iSummary]} ${r[iBody]}`,
    );
    const tags = r[iTags]
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    const themes = iThemes === -1
      ? []
      : r[iThemes].split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
    textTokensList.push(textTokens);
    tagList.push(tags);
    themeList.push(themes);
    for (const t of new Set(textTokens)) textDf.set(t, (textDf.get(t) || 0) + 1);
    for (const t of new Set(tags)) tagDf.set(t, (tagDf.get(t) || 0) + 1);
    for (const t of new Set(themes)) themeDf.set(t, (themeDf.get(t) || 0) + 1);
  }

  const textIdf = (t: string) => Math.log(N / (textDf.get(t) || 1)) + 1;
  const tagIdf = (t: string) => Math.log(N / (tagDf.get(t) || 1)) + 1;
  const themeIdf = (t: string) => Math.log(N / (themeDf.get(t) || 1)) + 1;

  // Category-echo tags (a tag that merely restates a category, e.g. "space" on
  // a space fact, or the space-variant "internet culture" of "internet-culture")
  // carry no topical information — categoryId already encodes membership — but
  // they forge false cross-category bridges (pi tagged "space" -> Jupiter). We
  // treat them as stop-tags so only *specific* tags drive tag-based relatedness.
  const categoryTags = new Set<string>();
  for (const r of dataRows) {
    const c = r[iCat].toLowerCase();
    categoryTags.add(c);
    categoryTags.add(c.replace(/-/g, " ")); // "internet culture" == "internet-culture"
  }
  const isCategoryTag = (t: string) => categoryTags.has(t) || categoryTags.has(t.replace(/-/g, " "));

  // Second pass: build normalized vectors.
  const facts: Fact[] = dataRows.map((r, idx) => {
    const textTokens = textTokensList[idx];
    const tags = tagList[idx];

    const tf = new Map<string, number>();
    for (const t of textTokens) tf.set(t, (tf.get(t) || 0) + 1);
    const textVec = new Map<string, number>();
    for (const [t, f] of tf) textVec.set(t, (1 + Math.log(f)) * textIdf(t));
    normalize(textVec);

    const tagVec = new Map<string, number>();
    for (const t of tags) {
      if (isCategoryTag(t)) continue; // ignore category-echo tags as a signal
      tagVec.set(t, tagIdf(t));
    }
    normalize(tagVec);

    // Themes are cross-cutting by design and never category-echo. IDF weighting
    // keeps broad themes (record-extremes) weak and specific ones (self-sacrifice,
    // relativity-and-time-warp) strong, so a shared theme is a real bridge signal.
    const themeVec = new Map<string, number>();
    for (const t of themeList[idx]) themeVec.set(t, themeIdf(t));
    normalize(themeVec);

    return {
      idx,
      id: r[iId],
      categoryId: r[iCat],
      topic: r[iTopic],
      tags,
      textVec,
      tagVec,
      themeVec,
    };
  });

  // Inverted indexes so we only score facts that share a signal.
  const byTag = new Map<string, number[]>();
  const byToken = new Map<string, number[]>();
  const byTheme = new Map<string, number[]>();
  facts.forEach((f) => {
    for (const t of f.tags) {
      if (isCategoryTag(t)) continue; // don't gather candidates via category-echo tags
      if (!byTag.has(t)) byTag.set(t, []);
      byTag.get(t)!.push(f.idx);
    }
    // only index reasonably specific text tokens to keep candidate sets tight
    for (const tok of f.textVec.keys()) {
      if ((textDf.get(tok) || 0) <= 60) {
        if (!byToken.has(tok)) byToken.set(tok, []);
        byToken.get(tok)!.push(f.idx);
      }
    }
    for (const th of f.themeVec.keys()) {
      if (!byTheme.has(th)) byTheme.set(th, []);
      byTheme.get(th)!.push(f.idx);
    }
  });

  const W_TAG = Number(process.env.W_TAG ?? "0.45");
  const W_THEME = Number(process.env.W_THEME ?? "0.25");
  const W_TEXT = Number(process.env.W_TEXT ?? "0.30");

  const blended = (a: Fact, b: Fact) =>
    W_TAG * cosine(a.tagVec, b.tagVec) +
    W_THEME * cosine(a.themeVec, b.themeVec) +
    W_TEXT * cosine(a.textVec, b.textVec);

  // Cross-category links must clear this blended-score bar, otherwise we'd
  // rather emit fewer (but relevant) links than pad with a spurious "shares a
  // generic tag like space/history" jump. Same-topic and same-category links
  // are inherently relevant and are never gated. Tunable via MIN_CROSS env.
  const MIN_CROSS = Number(process.env.MIN_CROSS ?? "0.16");
  const TAG_FLOOR = Number(process.env.TAG_FLOOR ?? "0.10"); // min shared-tag cosine ...
  const TEXT_FLOOR = Number(process.env.TEXT_FLOOR ?? "0.12"); // ... or text cosine, to corroborate a cross link
  const DIAG = process.env.DIAG === "1";

  const relatedIds: string[][] = [];
  const diagScores: { slot: string; score: number }[] = [];

  for (const f of facts) {
    // Gather candidate indices from every shared signal (tag, text token, theme).
    const cand = new Set<number>();
    for (const t of f.tags) for (const j of byTag.get(t) || []) cand.add(j);
    for (const tok of f.textVec.keys())
      for (const j of byToken.get(tok) || []) cand.add(j);
    for (const th of f.themeVec.keys())
      for (const j of byTheme.get(th) || []) cand.add(j);
    cand.delete(f.idx);

    interface Scored {
      idx: number;
      id: string;
      cat: string;
      topic: string;
      score: number;
      tagCos: number;
      textCos: number;
    }
    const scored: Scored[] = [];
    for (const j of cand) {
      const g = facts[j];
      const s = blended(f, g);
      if (s <= 0) continue;
      scored.push({
        idx: j, id: g.id, cat: g.categoryId, topic: g.topic, score: s,
        tagCos: cosine(f.tagVec, g.tagVec), textCos: cosine(f.textVec, g.textVec),
      });
    }
    scored.sort((a, b) => b.score - a.score);

    const sameTopic = scored.filter((s) => s.cat === f.categoryId && s.topic === f.topic);
    const sameCat = scored.filter((s) => s.cat === f.categoryId && s.topic !== f.topic);
    const crossCat = scored.filter((s) => s.cat !== f.categoryId);

    // A cross-category link must clear the score bar AND have real subject/concept
    // corroboration (a specific shared tag or genuine text overlap). Themes
    // amplify and narrate a bridge but must not *manufacture* one on their own —
    // otherwise a shared broad theme alone links friday-13 to coffee.
    const crossOk = crossCat.filter(
      (s) => s.score >= MIN_CROSS && (s.tagCos >= TAG_FLOOR || s.textCos >= TEXT_FLOOR),
    );

    if (DIAG && process.env.PROBE_ID === f.id) {
      console.log(`\n[PROBE] ${f.id} [${f.categoryId}/${f.topic}] tags=${f.tags.join(",")}`);
      for (const s of scored.slice(0, 15)) {
        const rel = s.cat === f.categoryId ? (s.topic === f.topic ? "SAME" : "adj") : "CROSS";
        console.log(`  ${s.score.toFixed(3)} [${rel}] ${s.id} (${s.cat}/${s.topic})`);
      }
    }

    const picked: string[] = [];
    const takenIdx = new Set<number>();
    const take = (s: Scored | undefined, slot: string) => {
      if (!s || takenIdx.has(s.idx) || picked.length >= 5) return;
      takenIdx.add(s.idx);
      picked.push(s.id);
      if (DIAG) diagScores.push({ slot, score: s.score });
    };
    const next = (pool: Scored[]) => pool.find((s) => !takenIdx.has(s.idx));

    // Slot 1: same topic
    take(next(sameTopic), "same");
    // Slot 2: same topic (2nd) else adjacent
    take(next(sameTopic) || next(sameCat), "same/adj");
    // Slot 3: adjacent topic
    take(next(sameCat), "adj");
    // Slot 4: cross-category bridge (gated)
    const bridge = next(crossOk);
    take(bridge, "cross");
    // Slot 5: serendipity — best gated cross-cat from a different category
    const serendip =
      crossOk.find((s) => !takenIdx.has(s.idx) && (!bridge || s.cat !== bridge.cat)) ||
      next(crossOk);
    take(serendip, "cross");

    // Backfill toward 5, preferring relevant links: remaining same-topic,
    // then adjacent (same category), then only gated cross-category. We never
    // reach for an ungated cross link just to hit 5 — 3-4 strong links beat
    // 5 with a spurious one.
    if (picked.length < 5) {
      for (const s of [...sameTopic, ...sameCat, ...crossOk]) {
        if (picked.length >= 5) break;
        take(s, "backfill");
      }
    }

    relatedIds.push(picked);
  }

  // Light reciprocity pass: if A links B strongly but B omits A and B is
  // under-filled, add A back to B (cap 6). Preserves the primary ordering.
  const idToIdx = new Map(facts.map((f) => [f.id, f.idx]));
  const RECIP_MIN = 0.16;
  for (let i = 0; i < facts.length; i++) {
    for (const targetId of relatedIds[i]) {
      const j = idToIdx.get(targetId);
      if (j === undefined) continue;
      if (relatedIds[j].includes(facts[i].id)) continue;
      if (relatedIds[j].length >= 6) continue;
      const s = blended(facts[i], facts[j]);
      // Cross-category reciprocal links must clear the same relevance bar.
      const bar = facts[i].categoryId === facts[j].categoryId ? RECIP_MIN : MIN_CROSS;
      if (s >= bar) relatedIds[j].push(facts[i].id);
    }
  }

  // Write back.
  const newRows = dataRows.map((r, idx) => {
    const copy = r.slice();
    copy[iRelated] = relatedIds[idx].join(",");
    return copy;
  });

  fs.writeFileSync(CSV_PATH, toCsv(header, newRows), "utf8");

  // ---- Stats ----
  const counts = relatedIds.map((r) => r.length);
  const under3 = counts.filter((c) => c < 3).length;
  const dist = { same: 0, adj: 0, cross: 0 };
  let totalLinks = 0;
  const catOf = new Map(facts.map((f) => [f.id, f]));
  facts.forEach((f, i) => {
    for (const rid of relatedIds[i]) {
      const g = catOf.get(rid)!;
      totalLinks++;
      if (g.categoryId === f.categoryId && g.topic === f.topic) dist.same++;
      else if (g.categoryId === f.categoryId) dist.adj++;
      else dist.cross++;
    }
  });

  console.log(`Facts processed: ${facts.length}`);
  console.log(
    `Links per fact: min=${Math.min(...counts)} max=${Math.max(...counts)} avg=${(
      counts.reduce((a, b) => a + b, 0) / counts.length
    ).toFixed(2)}`,
  );
  console.log(`Facts with <3 links: ${under3}`);
  console.log(`Total links: ${totalLinks}`);
  console.log(
    `Mix: same-topic ${((dist.same / totalLinks) * 100).toFixed(1)}%  ` +
      `adjacent ${((dist.adj / totalLinks) * 100).toFixed(1)}%  ` +
      `cross-category ${((dist.cross / totalLinks) * 100).toFixed(1)}%`,
  );

  // Validation
  const idSet = new Set(facts.map((f) => f.id));
  let dangling = 0;
  let selfref = 0;
  facts.forEach((f, i) => {
    for (const rid of relatedIds[i]) {
      if (!idSet.has(rid)) dangling++;
      if (rid === f.id) selfref++;
    }
  });
  console.log(`Validation -> dangling IDs: ${dangling}, self-refs: ${selfref}`);
  console.log(`MIN_CROSS threshold: ${MIN_CROSS}`);

  if (DIAG) {
    const cross = diagScores.filter((d) => d.slot === "cross").map((d) => d.score);
    cross.sort((a, b) => a - b);
    const pct = (p: number) => cross[Math.floor((cross.length - 1) * p)]?.toFixed(3);
    console.log(
      `\n[DIAG] cross-link scores: n=${cross.length} min=${cross[0]?.toFixed(3)} ` +
        `p10=${pct(0.1)} p25=${pct(0.25)} p50=${pct(0.5)} p90=${pct(0.9)} max=${cross[cross.length - 1]?.toFixed(3)}`,
    );
    const distCount: Record<number, number> = {};
    for (const r of relatedIds) distCount[r.length] = (distCount[r.length] || 0) + 1;
    console.log("[DIAG] links-per-fact distribution:", distCount);

    // Weakest cross links + which signal carried them (spot broad-theme-only junk).
    const idToIdx2 = new Map(facts.map((f) => [f.id, f.idx]));
    const crossLinks: { s: number; tag: number; th: number; txt: number; a: Fact; b: Fact }[] = [];
    facts.forEach((f, i) => {
      for (const rid of relatedIds[i]) {
        const j = idToIdx2.get(rid)!;
        const g = facts[j];
        if (g.categoryId === f.categoryId) continue;
        crossLinks.push({
          s: blended(f, g),
          tag: cosine(f.tagVec, g.tagVec),
          th: cosine(f.themeVec, g.themeVec),
          txt: cosine(f.textVec, g.textVec),
          a: f,
          b: g,
        });
      }
    });
    crossLinks.sort((a, b) => a.s - b.s);
    console.log("\n[DIAG] 15 weakest cross links (tag/theme/text cosines):");
    for (const c of crossLinks.slice(0, 15))
      console.log(
        `  ${c.s.toFixed(3)} (tag ${c.tag.toFixed(2)} th ${c.th.toFixed(2)} txt ${c.txt.toFixed(2)})  ` +
          `${c.a.id} -> ${c.b.id}`,
      );
  }
}

main();
