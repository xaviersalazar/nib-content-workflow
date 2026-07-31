# Nib Remote Content Delivery — CDN side

The app fetches content from a CDN so new facts/categories/collections ship
**without an App Store update**. This folder holds the tools for producing what
you upload.

> This folder lives in the **`nib-content-workflow`** repo (moved here from the
> Nib app repo) because publishing is part of the content pipeline. The JSON it
> packages is produced by `pnpm export:facts` in the repo root → `../exports/`.
> The consuming app code (`RemoteContentService`, `Manifest`, `RemoteContentConfig`)
> stays in the Nib repo.

## What lives on the CDN

Files at the configured base URL, uploaded together:

```
<base>/manifest.json      ← the app polls this
<base>/facts.json
<base>/categories.json
<base>/collections.json
<base>/sources.json       ← topic-level provenance ("Source ↗")
<base>/series.json        ← curated cross-category fact sets ("Series")
```

> `sources.json` and `series.json` are both listed in the manifest by
> `build-manifest.sh` so every drop carries them. The app fetches each
> **over-the-air** as an *optional, best-effort* file
> (`RemoteContentConfig.optionalFiles`): downloaded, validated, and applied
> when the manifest advertises it, silently skipped when it doesn't — a drop
> without either still applies facts/categories/collections, and the app
> always falls back to its bundled seed for whichever one it's missing. So
> including them is safe for every app version, and omitting either never
> blocks a content update.
>
> **`series.json` was missing from `build-manifest.sh` until 2026-07-30** —
> the app-side code (`RemoteContentConfig.optionalFiles`, the cross-validation
> in `RemoteContentService`) was already built and waiting for it; this repo's
> manifest generator just hadn't been updated to include it. Fixed now. The
> app-side comment on `optionalFiles` says to *"promote it to `managedFiles`
> once the CDN side ships it"* — don't do that in the same pass as this fix.
> Promoting it makes `series` a hard requirement (a manifest missing it would
> throw `manifestIncomplete` and block the *entire* content refresh), so it
> should only happen after a manifest with `series.json` has actually been
> published live and confirmed working — never in the same commit as the
> tooling fix, to avoid a build shipping with a hard requirement the live CDN
> can't yet satisfy.

The base URL is set locally in `Nib/Resources/Secrets.xcconfig` (gitignored) as
`NIB_CONTENT_BASE_URL`, injected into `Info.plist` → read by `RemoteContentConfig`.

> ⚠️ **Use a public endpoint.** `*.r2.cloudflarestorage.com/<bucket>` is R2's
> **S3-API** endpoint and needs signed requests — a plain app GET will 401/403.
> Point `NIB_CONTENT_BASE_URL` at the bucket's **public** URL
> (`https://pub-<hash>.r2.dev/...`) or a **custom domain** bound to the bucket.
> Never embed R2 access keys in the app.

## Publishing a content drop

1. Export the JSON files from the repo root (`pnpm export:facts` and
   `pnpm export:sources`; `categories.json`/`collections.json`/`series.json` are
   hand-maintained directly in `../exports/`) — they land in `../exports/` with
   the same filenames.
2. Generate the manifest (bumping the version every time), run from this `cdn/`
   folder:

   ```bash
   ./build-manifest.sh 2 ../exports
   ```

3. Upload `facts.json`, `categories.json`, `collections.json`, `sources.json`,
   `series.json`, **and** `manifest.json` to the bucket. Upload the content
   files before/with the manifest so a client can't read a manifest that points
   at not-yet-uploaded
   files.

## Version rules (the "version floor")

- `contentVersion` must **increase** on every publish.
- It must be **greater than** the app's bundled seed version
  (`RemoteContentConfig.bundledContentVersion`, currently `1`), or the app
  ignores the drop. Your first live manifest should therefore be `2`.
- `schemaVersion` stays `1` until the content shape changes in a
  breaking way; the app ignores manifests whose `schemaVersion` it is newer
  than it understands.

## Scheduling a reveal: `addedAt`

`addedAt` is a field on entries **inside** `facts.json` / `categories.json` /
`collections.json` / `series.json` (not on `manifest.json` itself — the
manifest only carries `contentVersion`, `schemaVersion`, and per-file
checksums). It is a full **visibility gate**, not just a badge flag: any
entry dated in the future is completely absent from the app — not shown
anywhere, just unbadged — until that date passes, even on a device that
already synced this exact drop. Bundled seed items omit it entirely and are
never "new".

This means **you don't have to time a CDN publish around the reveal date.**
Two ways to schedule one:

- **Know the real date already?** Set `addedAt` to it and publish now — the
  content can sit live on the CDN for days or weeks pre-revealed with zero
  risk.
- **Don't know it yet** (e.g. a drop tied to an app-binary release still in
  App Store review, where review time is unpredictable)? Publish now with
  `addedAt` omitted, then do a **CDN-only republish** once the date is known:
  same files, `addedAt` filled in, `contentVersion` bumped. No app release
  involved in that second step.

**A fact does not inherit visibility from its category** — set `addedAt` on
a fact whenever the fact itself is genuinely new (every fact in a new
category; only the newly-drafted facts in a Series that also reuses older
ones), independent of what the category/collection/series it belongs to has
set. Full rules and a by-scenario table:
[`docs/content-schema-reference.md`](../docs/content-schema-reference.md#content-scheduling--the-reveal-gate).
