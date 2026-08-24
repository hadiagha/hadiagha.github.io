#!/usr/bin/env bash
# Move a draft into _posts/, naming the file from its front-matter date.
#
# The URL is built from the front-matter `date` and the filename slug, so those
# two are the only things that must never drift once a post is live. Doing the
# rename here rather than by hand is what keeps them in agreement.
set -euo pipefail

SLUG="${1:-}"

if [ -z "$SLUG" ]; then
  echo "usage: make publish slug=your-post-slug" >&2
  echo >&2
  echo "drafts available:" >&2
  ls -1 _drafts/*.md 2>/dev/null | sed 's|_drafts/||; s|\.md$||; s|^|  |' >&2 || echo "  (none)" >&2
  exit 1
fi

SLUG="${SLUG%.md}"
DRAFT="_drafts/${SLUG}.md"

[ -f "$DRAFT" ] || { echo "error: no draft at $DRAFT" >&2; exit 1; }

# Read the front-matter date; fall back to today and write it back, so the file
# name and the front matter always agree.
DATE=$(sed -n '/^---$/,/^---$/p' "$DRAFT" | sed -n 's/^date:[[:space:]]*\([0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}\).*/\1/p' | head -1)

if [ -z "$DATE" ]; then
  DATE=$(date +%Y-%m-%d)
  echo "note: no date in front matter; using ${DATE}"
  # Insert a date line after the opening ---
  tmp=$(mktemp)
  awk -v d="$DATE" 'NR==1{print; print "date: " d; next} {print}' "$DRAFT" > "$tmp"
  mv "$tmp" "$DRAFT"
fi

TARGET="_posts/${DATE}-${SLUG}.md"

if [ -e "$TARGET" ]; then
  echo "error: $TARGET already exists" >&2
  exit 1
fi

git mv "$DRAFT" "$TARGET" 2>/dev/null || mv "$DRAFT" "$TARGET"

echo "Published to $TARGET"
echo
echo "Run 'make check' before pushing."
