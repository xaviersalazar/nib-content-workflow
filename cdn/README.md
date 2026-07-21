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

Four files at the configured base URL, uploaded together:

```
<base>/manifest.json      ← the app polls this
<base>/facts.json
<base>/categories.json
<base>/collections.json
```

The base URL is set locally in `Nib/Resources/Secrets.xcconfig` (gitignored) as
`NIB_CONTENT_BASE_URL`, injected into `Info.plist` → read by `RemoteContentConfig`.

> ⚠️ **Use a public endpoint.** `*.r2.cloudflarestorage.com/<bucket>` is R2's
> **S3-API** endpoint and needs signed requests — a plain app GET will 401/403.
> Point `NIB_CONTENT_BASE_URL` at the bucket's **public** URL
> (`https://pub-<hash>.r2.dev/...`) or a **custom domain** bound to the bucket.
> Never embed R2 access keys in the app.

## Publishing a content drop

1. Export the three JSON files from the repo root (`pnpm export:facts`, etc.) —
   they land in `../exports/` with the same filenames.
2. Generate the manifest (bumping the version every time), run from this `cdn/`
   folder:

   ```bash
   ./build-manifest.sh 2 ../exports
   ```

3. Upload `facts.json`, `categories.json`, `collections.json`, **and**
   `manifest.json` to the bucket. Upload the content files before/with the
   manifest so a client can't read a manifest that points at not-yet-uploaded
   files.

## Version rules (the "version floor")

- `contentVersion` must **increase** on every publish.
- It must be **greater than** the app's bundled seed version
  (`RemoteContentConfig.bundledContentVersion`, currently `1`), or the app
  ignores the drop. Your first live manifest should therefore be `2`.
- `schemaVersion` stays `1` until the content shape changes in a
  breaking way; the app ignores manifests whose `schemaVersion` it is newer
  than it understands.

## Optional: `addedAt`

Stamp post-launch facts/collections with an ISO-8601 `addedAt` to drive stable
ordering and the "NEW" badge. Bundled seed items omit it and are never "new".

See `manifest.sample.json` for the exact shape.
