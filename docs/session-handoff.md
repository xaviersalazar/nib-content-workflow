# TIL Content — "Wow" Rewrite Workflow: Session Handoff

> Last updated: 2026-06-25 · 1362 facts · 30 categories

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
  state + every de-dup decision. Update it after each category.

## Current state (2026-06-25)
- **1362 facts · 30 categories · every topic exactly 3 facts.**
- Categories: space, astronomy, history, ancient-civilizations, animals, ocean-life, human-body,
  psychology, food, coffee, technology, artificial-intelligence, internet-culture, video-games, movies,
  music, sports, engineering, aviation, cars, physics, chemistry, mathematics, business, economics,
  literature, languages, architecture, myths-legends, mysteries.
- **Categories rewritten via this workflow:** all 20 original + physics, chemistry, mathematics,
  business, economics, literature, languages, architecture (added as "castles"), myths-legends,
  mysteries.
- **Size exceptions** (left as-is, every topic still at 3): `languages` has 13 topics (39 facts);
  `myths-legends` has 16 topics (48 facts); `history` 63, `space` 51, `sports`/`video-games` <45.
  Everything else is 15 topics x 3 = 45.

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
9. Tell the user to re-export with `pnpm export:facts` when ready (do NOT run the export yourself).

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

**Watch especially:** any new category about creatures/cryptids, ancient sites, writing, or famous
inventions will collide with myths-legends, mysteries, ancient-civilizations, languages, engineering, or
literature.

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
exactly 3, bodies ~65–80 words, zero "Britannica" left in the new category.

## Other notes
- `id` is permanent — never change it, even on a full rewrite (other facts' `relatedFactIds` point at it).
- `funScore` is not a real quality signal here (almost everything is 9–10) — judge on content.
- CSV columns: `id, categoryId, topic, headline, body, summary, tags, readTimeSeconds, funScore,
  featured, relatedFactIds`.
- This is **not a git repo**; the only versioning is the timestamped `approved-facts.backup-*.csv` files.
- The user's cadence: they add a category between sessions, then say "run the same process." They approve
  the whole slate and want it done end-to-end with the de-dup care described above.
