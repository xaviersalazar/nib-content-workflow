# `relatedFactIds` — Content Generation Context

> Context for generating the `relatedFactIds` field. Describes how and why the
> TIL iOS app consumes it, so generated values match what the app expects.

## What it is

`relatedFactIds` is a field on the **Fact** model in the TIL iOS app:

```swift
struct Fact: Identifiable, Codable, Equatable {
    let id: String
    ...
    let relatedFactIds: [String]   // ordered list of other facts' `id` values
}
```

It's an **ordered array of other facts' `id` strings** — a manually curated
adjacency list. Each entry must be the `id` of another real fact in the same
`facts.json` bundle (e.g. `"neutron-star-density"`,
`"venus-day-longer-than-year"`). It is the app's entire "knowledge graph" —
there is no separate graph database; the relationships live inline on each fact.

## Purpose / Why It Exists

TIL's product promise is *"Come for one fact. Stay for five."* `relatedFactIds`
is the mechanism that turns a single fact into a **discovery journey**. When a
user reads a fact, the app surfaces a "More to Discover" section built from that
fact's `relatedFactIds`, letting them hop from one fact to the next along
editorially-chosen threads rather than a random feed. It's the difference
between a playlist and a mini-documentary.

## How It's Consumed in the App

- **`FactService.relatedFacts(for:)`** resolves the IDs to full `Fact` objects,
  **preserving the array order** and skipping any ID that doesn't resolve:

  ```swift
  func relatedFacts(for fact: Fact) throws -> [Fact] {
      let allFacts = try repository.loadFacts()
      return fact.relatedFactIds.compactMap { id in allFacts.first { $0.id == id } }
  }
  ```

- **`MoreToDiscoverSection`** (shown under a fact) calls that method, takes the
  first N, and renders them as tappable discovery rows. Order in the array =
  display order.
- **`FactService.validateContent()`** flags any `relatedFactIds` entry that
  points to a non-existent fact `id`, so dangling references are caught.

## Why Order and Content Matter

- **Order is meaningful** — the app renders related facts in array order (no
  re-sorting; even more true now that `funScore` was removed and the app relies
  on curated order everywhere). Put the strongest / most natural next-hop first.
- **IDs must be valid** — every entry must exactly match an existing fact's
  `id`. Unknown IDs are silently dropped at runtime and reported by validation.
  Don't reference a fact that isn't in the bundle.
- **Don't self-reference** — a fact should not list its own `id`.

## Authoring Rules

**Count per fact:** minimum 3, preferred 5, maximum 8 related facts. (The UI is
built around ~3–5; fewer than 3 degrades the "More to Discover" experience.)

**Discovery mix** — aim for a blend, not just same-topic clones:

- ~40% same topic / same category
- ~30% adjacent topic
- ~20% cross-category bridge
- ~10% surprising but explainable "serendipitous jump"

For a typical list of 5:

1. Same topic
2. Same or adjacent topic
3. Adjacent topic
4. Cross-category bridge
5. Serendipitous but explainable jump

**Relationship types** to justify a link (editorial guidance, not stored in
schema): Same Topic, Adjacent Topic, Cross Category (e.g. GPS → relativity),
Shared Person, Shared Place, Shared Era, Shared Concept, Shared Institution,
Attribute Match (similar "wow" quality).

## Practical Requirements for the Generator

1. Output `relatedFactIds` as a **JSON array of existing fact `id` strings**.
2. Only reference facts that exist in the same generated bundle — resolve and
   validate IDs before emitting, since invalid ones are dropped silently in-app.
3. Order the array intentionally (best next-hop first).
4. Target 3–5 (up to 8) entries per fact, following the discovery-mix ratios.
5. Relationships are directional as authored, but for a good graph you'll
   usually want them **roughly reciprocal** — if A lists B, B often should list
   A (see the seed data, e.g. `venus-day-longer-than-year` ↔
   `neutron-star-density`).
