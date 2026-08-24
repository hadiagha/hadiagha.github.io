#!/usr/bin/env bash
# Create a draft with valid front matter and its image folder.
#
# Drafts live in _drafts/ rather than carrying a `status: draft` flag in
# _posts/. A flag only filters listings — the post itself still builds at its
# real URL and is publicly reachable. _drafts/ is never built in production, so
# an unfinished piece cannot leak.
set -euo pipefail

TITLE="${1:-}"
KIND="${2:-article}"

if [ -z "$TITLE" ]; then
  echo "usage: make new title=\"Your title here\" [kind=article|note|review|essay]" >&2
  exit 1
fi

case "$KIND" in
  article|note|review|essay) ;;
  *) echo "error: kind must be one of article, note, review, essay (got '$KIND')" >&2; exit 1 ;;
esac

# Slug: lowercase, non-alphanumerics to hyphens, collapse and trim.
SLUG=$(printf '%s' "$TITLE" \
  | tr '[:upper:]' '[:lower:]' \
  | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//' \
  | cut -c1-60 | sed -E 's/-+$//')

if [ -z "$SLUG" ]; then
  echo "error: could not derive a slug from '$TITLE'" >&2
  exit 1
fi

DATE=$(date +%Y-%m-%d)
DRAFT="_drafts/${SLUG}.md"
MEDIA="assets/posts/${SLUG}"

if [ -e "$DRAFT" ]; then
  echo "error: $DRAFT already exists" >&2
  exit 1
fi
if ls "_posts/"*"-${SLUG}.md" >/dev/null 2>&1; then
  echo "error: a published post already uses the slug '${SLUG}'" >&2
  exit 1
fi

mkdir -p _drafts "$MEDIA"

cat > "$DRAFT" <<EOF
---
title: "${TITLE}"
description: "One or two sentences. Used for search results, link previews and cards."
date: ${DATE}
kind: ${KIND}
tags: []
toc: false
math: false
# updated: ${DATE}          # set when you revise a published post
# series: some-series-key   # must exist in _data/series.yml
# series_part: 1
# image: /assets/posts/${SLUG}/hero.png
# image_alt: "What the image shows, for screen readers and when it fails to load."
# youtube_id: dQw4w9WgXcQ   # bare ID, not a URL
# youtube_title: "Title of the companion video"
# canonical_url:            # only if this appeared somewhere else first
# featured: true            # pin to the curated list
---

Opening paragraph. Say what this is about and why it matters before any setup.

## First section

Images go in \`${MEDIA}/\` and are referenced relatively:

![Describe the image]({{ '/assets/posts/${SLUG}/example.png' | relative_url }})
EOF

echo "Created:"
echo "  $DRAFT"
echo "  $MEDIA/"
echo
echo "Next:"
echo "  make preview     # drafts are visible locally, never in production"
echo "  make publish slug=${SLUG}"
