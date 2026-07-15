# Topic Curation & Quality Guide

A repeatable playbook for shaping a category of Nib facts: **structure → trim → quality ("wow") pass**.
Run this every time you add (or revisit) a category in `approved-content/approved-facts.csv`.

---

## 0. The North Star

Nib delivers **something new every day** — premium, content-first, **no clickbait**. Every fact must
stand on its own and make an average reader go **"wait, really?"**

A fact fails if an average adult **already knows it** or it reads like a **textbook definition / formula**
with no twist. Those get rewritten (preferred) or removed.

---

## 1. Structure rules

- **Cap: up to 3 facts per topic — quality-gated, not a quota.** A topic ships the **best 1–3** facts
  that each clear the "wait, really?" bar. **Never pad to 3 with a weak, textbook, or redundant fact** —
  a topic with 1–2 strong facts is finished. 3 is a ceiling, not a target. See `docs/fact-writing-and-quality-guide.md`.
  - This is deliberate: forcing "exactly 3" on abstract/technical topics (AI, coffee, tech, movies) is what
    produced flat filler like *"Espresso Cut Brewing Time to 30 Seconds"* or *"A Blockchain Is a Distributed Ledger."*
    Better a topic of 1 great fact than 1 great + 2 definitions.
  - If a topic genuinely has **zero** strong facts, drop the topic — don't manufacture one to fill the slot.
- A category is roughly ~15 topics averaging 2–3 facts each (~30–45 facts) — the count follows quality, not a formula.
- CSV columns: `id, categoryId, topic, headline, body, summary, tags, readTimeSeconds, featured, relatedFactIds`
- **`id` is permanent.** Never change it once set, even when you rewrite a fact's content — other facts'
  `relatedFactIds` point at it. (A slightly-stale id slug is fine; a broken link is not.)

---

## 2. The two passes

### Pass A — Trim to 3 (only if a topic has >3 facts)

For each over-full topic, keep the **3 best, most distinct, most memorable** facts. Cut:
- **Redundant** facts (two facts making the same point → keep the punchier one).
- **Generic** facts ("Rome was big," "[X] is popular").
- **Cross-topic duplicates** (same object/idea covered under another topic — e.g. a moon described in both
  `Saturn` and `Moons`; keep it in one place).
- The **driest / least-surprising** when all else is equal.

### Pass B — Quality "wow" pass (run on every topic, always)

Go fact-by-fact and flag anything that is **obvious** or **textbook**. For each flagged fact:
- **Default to REWRITE** to a sharper "wait, really?" angle in the same topic — usually a vivid number,
  a famous story, or a buried detail elevated to the headline.
- **REMOVE** only if it's inherently unsurprising *and* unsalvageable *and* redundant.

**Calibration bar (lean aggressive):**
- Flag clear textbook/obvious facts always.
- Also flag **well-worn "fun-fact" factoids** many people have heard — but only surface the ones genuinely
  worth a keep/remove/rewrite decision; note them so the human can choose.
- Keep facts that still genuinely surprise most people, even if somewhat known.

**Rewrite patterns that work** (from past passes):
| Obvious / textbook | → Rewritten "wow" |
|---|---|
| "Skin is the largest organ" | "Much of household dust is your dead skin" |
| "Sputnik was the first satellite" | "America's first satellite blew up live on TV ('Kaputnik')" |
| "Energy is the capacity to do work" | "E=mc²: the matter in a paperclip could level a city" |
| "[Sport] is ancient / popular" | the weird origin, record, or rule behind it |
| "[Engine/part] does X" (definition) | a number, a famous failure, or a relatable consequence |

**De-dup while rewriting:** if your new angle already exists in another category/topic, pick a different
angle. (Example: don't put the same "we are stardust" idea in both `Stars` and `Supernovas`.)

---

## 3. Body / headline / summary style

**The full voice, field, and rewrite rules live in `docs/fact-writing-and-quality-guide.md` (Fact Writing &
Quality Guide) — read it before rewriting.** In brief: headline leads with the surprise (Title Case);
body ~4–5 sentences, ~60–90 words, grade 6–8, "curious friend over coffee," punchy close; summary is a
teaser, never an echo. On a rewrite, keep `id`, `categoryId`, `topic`, `readTimeSeconds`, `featured`,
`relatedFactIds` unchanged — swap only headline/body/summary/tags. Also see the **Flatness red-flags**
(§3 of that guide) — the four patterns (textbook definition / vague-abstract / obvious / incremental
process) that a "wow" pass exists to catch.

---

## 4. Suggested session workflow

1. **Inspect structure** — counts per topic; confirm **no topic exceeds 3** (run Pass A if any are over). Topics with 1–2 strong facts are fine and need no padding.
2. **Dump the category** with full bodies and read every fact.
3. **Propose the slate** topic-by-topic: which to keep, which to rewrite (with the new angle), which to
   remove. Get human approval. (Going category-by-category keeps review manageable.)
4. **Write the full rewrites** and **apply** them (match by `categoryId` + old headline; keep `id`).
5. **Run integrity checks** and fix data bugs.
6. Re-export when ready (`pnpm export:facts`).

---

## 5. Reusable scripts

> Run from `approved-content/`. Always make a backup first:
> `cp approved-facts.csv "approved-facts.backup-$(date +%Y%m%d-%H%M%S).csv"`

### 5a. Inspect a category's structure
```python
import csv; from collections import Counter
rows=list(csv.DictReader(open('approved-facts.csv')))
CAT='YOUR_CATEGORY'
tc=Counter(r['topic'] for r in rows if r['categoryId']==CAT)
print(f"{CAT}: {sum(tc.values())} facts, {len(tc)} topics")
for t,c in tc.items(): print(f"  {t:26} {c}{'' if c==3 else '  <-- not 3'}")
```

### 5b. Dump a category with full bodies (to read & judge)
```python
import csv; from collections import OrderedDict
rows=list(csv.DictReader(open('approved-facts.csv')))
CAT='YOUR_CATEGORY'
topics=OrderedDict()
for r in rows:
    if r['categoryId']==CAT: topics.setdefault(r['topic'],[]).append(r)
for t,facts in topics.items():
    print('==',t,'==')
    for r in facts:
        print(f"  • {r['headline']}")
        print(f"      {r['body']}")
```

### 5c. Apply rewrites (quote-insensitive match; keeps `id`)
```python
import csv
def norm(s): return s.replace('’',"'").replace('‘',"'").replace('“','"').replace('”','"').strip()
# (categoryId, OLD_headline) -> (NEW_headline, body, summary, tags)
R = {
  ("YOUR_CATEGORY","Old Textbook Headline"):(
     "New Wow Headline",
     "Body... ~60-90 words, leads with the surprise, ends punchy.",
     "One-sentence teaser that adds intrigue.","tag1,tag2,tag3"),
  # ...
}
with open('approved-facts.csv',newline='') as f:
    rd=csv.DictReader(f); fields=rd.fieldnames; rows=list(rd)
idx={(r['categoryId'],norm(r['headline'])):r for r in rows}
applied=0; miss=[]
for (cat,old),(nh,b,s,t) in R.items():
    r=idx.get((cat,norm(old)))
    if not r: miss.append((cat,old)); continue
    r['headline']=nh; r['body']=b; r['summary']=s; r['tags']=t; applied+=1
with open('approved-facts.csv','w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=fields); w.writeheader(); w.writerows(rows)
print("applied",applied,"of",len(R)); [print("UNMATCHED",m) for m in miss]
```
> If `UNMATCHED` appears, the old headline string didn't match — usually a curly vs straight quote; the
> `norm()` helper handles most of these. Fix and re-run.

### 5d. Trim a topic / remove a fact (and clean dangling links)
```python
import csv
TARGET=("YOUR_CATEGORY","Topic","Exact Headline To Remove")
with open('approved-facts.csv',newline='') as f:
    rd=csv.DictReader(f); fields=rd.fieldnames; rows=list(rd)
out=[r for r in rows if (r['categoryId'],r['topic'],r['headline'])!=TARGET]
ids={r['id'] for r in out}
for r in out:  # strip relatedFactIds pointing at removed facts
    refs=[x.strip() for x in r['relatedFactIds'].split(',') if x.strip()]
    r['relatedFactIds']=','.join(x for x in refs if x in ids)
with open('approved-facts.csv','w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=fields); w.writeheader(); w.writerows(out)
print("rows now",len(out))
```

### 5e. Integrity check (run after any change)
```python
import csv; from collections import Counter
rows=list(csv.DictReader(open('approved-facts.csv')))
print("rows",len(rows),"| categories",len(set(r['categoryId'] for r in rows)))
print("dup (cat,topic,headline):",[k for k,c in Counter((r['categoryId'],r['topic'],r['headline']) for r in rows).items() if c>1] or "none")
print("dup ids:",[k for k,c in Counter(r['id'] for r in rows).items() if c>1] or "none")
ids={r['id'] for r in rows}
print("dangling relatedFactIds:",sum(1 for r in rows for x in r['relatedFactIds'].split(',') if x.strip() and x.strip() not in ids))
print("topics OVER 3 (must be 0; 1-2 is fine):",[k for k,c in Counter((r['categoryId'],r['topic']) for r in rows).items() if c>3] or "none")
```

---

## 6. Data-integrity gotchas seen in practice

- **Exact duplicate rows** (a topic's 3 facts entered twice → 6 rows). Catch with the `dup ids` check;
  de-dupe keeping the first occurrence.
- **Misfiled topic** (e.g. a `Bearings` fact sitting under `sports` instead of `engineering`). Move it by
  changing its `categoryId`.
- **Dangling `relatedFactIds`** after removing a fact. Strip any ref whose target id no longer exists.
- After fixes, every topic should read **1–3** in check 5e (never more than 3; 1–2 is fine when that's all that's strong).

---

## 7. Definition of done for a category

- [ ] No topic has more than 3 facts (1–2 is fine — quality over quota; never padded to 3)
- [ ] No fact is "obvious to an average person" or a bare textbook definition
- [ ] No duplicate rows or ids; no dangling `relatedFactIds`
- [ ] No cross-topic / cross-category duplicate angles
- [ ] Rewrites follow the body/summary/headline style in §3
- [ ] Backup saved before edits; integrity check (5e) passes

---

## 8. Whole-library quality weed-out (reproducible)

The passes above shape **one category**. This is the **library-wide** audit that removes already-shipped
flat facts — run when facts feel dull day-to-day. It's exactly the 2026-07-14 pass that cut the library
**2187 → 1928** (25 rewritten, 259 removed, 2 empty topics dropped). A fresh dev/agent can reproduce it
end-to-end from these steps.

**Judgment source:** the four **Flatness red-flags** in `docs/fact-writing-and-quality-guide.md` §3 (textbook
definition · vague-abstract · obvious · incremental process). Heuristics/regex only *surface* candidates —
the actual call comes from **reading** the fact.

1. **Back up:** `cp approved-facts.csv "approved-facts.backup-$(date +%Y%m%d-%H%M%S).csv"`
2. **Read everything.** Dump `headline — summary` for all facts (grouped by category) and read them; the
   flat ones cluster in the abstract "explainer" categories (AI, coffee, engineering, movies, tech,
   internet-culture ran 50–67% flagged). Save flags to a CSV: `id, categoryId, topic, headline, summary,
   reason` (reason = the red-flag code).
3. **Decide rewrite vs remove per flagged fact** — read the full **body** and its **topic siblings**:
   - **REWRITE** if the body hides a concrete, source-grounded gem (a number/story/consequence) you can
     elevate to the headline (keep `id`; see writing-guide §7). Example: *"Biased Data Can Lead to Biased
     AI"* → *"Amazon Built a Hiring AI That Taught Itself to Reject Women."*
   - **REMOVE** if the body is uniformly flat *and* the topic keeps ≥1 strong fact. If a topic goes empty
     and has no rescuable fact, **drop the topic** (we dropped `engineering/Bearings`, `internet-culture/
     Reaction GIFs`).
   - Save decisions to a CSV and **get human approval on the split before applying.**
4. **Apply** (throwaway script): apply rewrites by matching `(categoryId, norm(headline))` → new
   headline/body/summary/tags (keep `id`); remove the REMOVE ids; strip `relatedFactIds` that point at
   removed ids (scripts 5c/5d).
5. **Regenerate the graph, don't hand-fix it:** `pnpm normalize:tags && pnpm assign:themes && pnpm
   generate:related && pnpm export:facts`. `generate:related` rebuilds `relatedFactIds` over only the
   survivors (self-validates to 0 dangling / 0 self-refs), so removed facts can't leave dead links.
6. **Sync the app seed:** `cp exports/facts.json ../Nib/Nib/Data/facts.json` (key order matches; drop-in).
7. **Fix collections:** any `Nib/Nib/Data/collections.json` `factIds` pointing at removed facts → repoint
   to the **best surviving fact in the same topic** (don't just delete the ref).
8. **Verify (must all be clean):** 0 dangling `relatedFactIds`, 0 dangling collection refs, 0 dup ids, no
   topic > 3, CSV row count == `facts.json` count (integrity check 5e + a collections pass).
9. **Publish to CDN** (see `Nib/cdn/README.md`): sync `exports/{categories,collections}.json`, run
   `Nib/cdn/build-manifest.sh <next-version> ../nib-content-workflow/exports` (**bump `contentVersion`**),
   then upload the three JSON files **first** and `manifest.json` **last** to the R2 bucket behind
   `cdn.nibapp.net/v1`. Verify: `curl -s https://cdn.nibapp.net/v1/manifest.json | grep contentVersion`.
10. **Update** `session-handoff.md` (current state + this event) and the memory pipeline-state file.
