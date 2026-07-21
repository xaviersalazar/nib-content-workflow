#!/usr/bin/env bash
#
# build-manifest.sh — generate manifest.json for Nib remote content delivery.
#
# Computes the SHA-256 of each content file and writes a manifest the app can
# verify. Run it against the directory that holds the published JSON (e.g. the
# nib-content-workflow export dir), then upload the JSON files + manifest.json
# to the CDN bucket together.
#
# Usage:
#   ./build-manifest.sh <contentVersion> [content-dir] [output-file]
#
# Examples:
#   ./build-manifest.sh 2 ../exports
#   ./build-manifest.sh 3 ./content ./content/manifest.json
#
# contentVersion MUST increase every time you publish, and must be greater than
# the app's bundled seed version (RemoteContentConfig.bundledContentVersion),
# or the version floor will ignore the drop.

set -euo pipefail

CONTENT_VERSION="${1:?usage: build-manifest.sh <contentVersion> [content-dir] [output-file]}"
CONTENT_DIR="${2:-.}"
OUTPUT="${3:-${CONTENT_DIR}/manifest.json}"
SCHEMA_VERSION=1
FILES=(facts categories collections)

sha256_of() {
  # Prefer shasum (macOS default); fall back to sha256sum (Linux/CI).
  if command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$1" | awk '{print $1}'
  else
    sha256sum "$1" | awk '{print $1}'
  fi
}

entries=""
for name in "${FILES[@]}"; do
  path="${CONTENT_DIR}/${name}.json"
  if [[ ! -f "$path" ]]; then
    echo "error: missing ${path}" >&2
    exit 1
  fi
  sum="$(sha256_of "$path")"
  [[ -n "$entries" ]] && entries+=","
  entries+=$'\n    {'
  entries+=$'\n      "name": "'"${name}"'",'
  entries+=$'\n      "url": "'"${name}.json"'",'
  entries+=$'\n      "sha256": "'"${sum}"'"'
  entries+=$'\n    }'
done

cat > "$OUTPUT" <<EOF
{
  "contentVersion": ${CONTENT_VERSION},
  "schemaVersion": ${SCHEMA_VERSION},
  "files": [${entries}
  ]
}
EOF

echo "Wrote ${OUTPUT} (contentVersion ${CONTENT_VERSION})"
