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
  a topic with 1–2 strong facts is finished. 3 is a ceiling, not a target. See `docs/content-generation-rules.md`.
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

Match the existing rows:
- **headline:** leads with the surprise, not a definition. Title Case.
- **body:** ~4–5 short sentences, **~60–90 words**, grade 6–8 reading level, conversational ("a curious
  friend over coffee"), ends on a punchy line. No clickbait, no exaggeration.
- **summary:** a one-sentence teaser that **adds intrigue** — never just an echo of the headline.
- **tags:** 3–4 lowercase, comma-separated.
- Keep `id`, `categoryId`, `topic`, `readTimeSeconds`, `featured`, `relatedFactIds` unchanged
  on a rewrite (only swap headline/body/summary/tags).

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
print("topics not at 3:",[k for k,c in Counter((r['categoryId'],r['topic']) for r in rows).items() if c!=3] or "none")
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
