#!/usr/bin/env python3
"""Content health check.

Catches the things that rot quietly: front matter that drifts from the schema,
filenames that disagree with their dates, tags used once, media nobody
references, and series that point at nothing.

Exits non-zero on errors; warnings are reported but do not fail the build.
"""
from __future__ import annotations

import os
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
POSTS = ROOT / "_posts"
DRAFTS = ROOT / "_drafts"
MEDIA = ROOT / "assets" / "posts"

VALID_KINDS = {"article", "note", "review", "essay"}
REQUIRED = ("title", "description", "date", "kind")

errors: list[str] = []
warnings: list[str] = []


def parse_front_matter(path: Path) -> tuple[dict, str]:
    """Minimal YAML front-matter reader.

    Deliberately not using PyYAML: this script must run with a bare Python 3
    and the front matter we control is flat scalars and inline lists.
    """
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n?(.*)$", text, re.S)
    if not m:
        return {}, text
    fm: dict[str, str] = {}
    for line in m.group(1).splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if ":" not in line or line.startswith((" ", "\t")):
            continue
        key, _, value = line.partition(":")
        fm[key.strip()] = value.strip().strip('"').strip("'")
    return fm, m.group(2)


def parse_list(raw: str) -> list[str]:
    raw = (raw or "").strip()
    if raw.startswith("[") and raw.endswith("]"):
        raw = raw[1:-1]
    return [t.strip().strip('"').strip("'") for t in raw.split(",") if t.strip()]


def load_keys(data_file: Path) -> set[str]:
    """Top-level keys of a simple data file, without a YAML dependency."""
    if not data_file.exists():
        return set()
    keys = set()
    for line in data_file.read_text(encoding="utf-8").splitlines():
        if line and not line.startswith((" ", "\t", "#")) and ":" in line:
            keys.add(line.split(":", 1)[0].strip())
    return keys


known_tags = load_keys(ROOT / "_data" / "tags.yml")
known_series = load_keys(ROOT / "_data" / "series.yml")

posts = sorted(POSTS.glob("*.md")) if POSTS.exists() else []
drafts = sorted(DRAFTS.glob("*.md")) if DRAFTS.exists() else []

tag_counts: dict[str, int] = {}
series_members: dict[str, list[tuple[int, str]]] = {}
referenced_media: set[str] = set()

for path in posts + drafts:
    rel = path.relative_to(ROOT)
    is_draft = path.parent.name == "_drafts"

    # A draft is work in progress by definition, so schema violations there are
    # advisory. They become errors the moment `make publish` moves the file into
    # _posts/, which is the point at which they would reach a reader.
    def fail(msg: str, _draft=is_draft) -> None:
        (warnings if _draft else errors).append(msg)

    fm, body = parse_front_matter(path)

    if not fm:
        fail(f"{rel}: no front matter")
        continue

    for key in REQUIRED:
        if not fm.get(key):
            fail(f"{rel}: missing required front matter '{key}'")

    kind = fm.get("kind", "")
    if kind and kind not in VALID_KINDS:
        fail(f"{rel}: kind '{kind}' is not one of {sorted(VALID_KINDS)}")

    desc = fm.get("description", "")
    if desc:
        if len(desc) < 40:
            warnings.append(f"{rel}: description is very short ({len(desc)} chars)")
        elif len(desc) > 200:
            warnings.append(f"{rel}: description is {len(desc)} chars; search engines cut around 160")
        if desc.startswith("One or two sentences"):
            fail(f"{rel}: description is still the template placeholder")

    # Filename must agree with the front-matter date, because the URL is built
    # from the date and the slug. Drift here is how posts quietly get two URLs.
    fm_date = (fm.get("date") or "")[:10]
    if not is_draft:
        m = re.match(r"^(\d{4}-\d{2}-\d{2})-(.+)\.md$", path.name)
        if not m:
            fail(f"{rel}: filename must be YYYY-MM-DD-slug.md")
        elif fm_date and m.group(1) != fm_date:
            fail(
                f"{rel}: filename date {m.group(1)} disagrees with front-matter date {fm_date} "
                f"(the URL uses the front-matter date, so this is confusing at best)"
            )

    if fm_date:
        try:
            d = date.fromisoformat(fm_date)
            if not is_draft and d > date.today():
                warnings.append(f"{rel}: dated in the future ({fm_date}); it will not appear until then")
        except ValueError:
            fail(f"{rel}: date '{fm_date}' is not YYYY-MM-DD")

    updated = (fm.get("updated") or "")[:10]
    if updated and fm_date and updated < fm_date:
        fail(f"{rel}: updated ({updated}) is before date ({fm_date})")

    for tag in parse_list(fm.get("tags", "")):
        tag_counts[tag] = tag_counts.get(tag, 0) + 1
        if known_tags and tag not in known_tags:
            warnings.append(f"{rel}: tag '{tag}' is not in _data/tags.yml")

    series = fm.get("series", "")
    if series:
        if known_series and series not in known_series:
            fail(f"{rel}: series '{series}' is not defined in _data/series.yml")
        part = fm.get("series_part", "")
        if not part:
            fail(f"{rel}: in series '{series}' but has no series_part")
        else:
            try:
                series_members.setdefault(series, []).append((int(part), str(rel)))
            except ValueError:
                fail(f"{rel}: series_part '{part}' is not a number")

    yt = fm.get("youtube_id", "")
    if yt:
        if yt.startswith("http") or "/" in yt:
            fail(f"{rel}: youtube_id must be the bare ID, not a URL")
        elif not re.fullmatch(r"[A-Za-z0-9_-]{11}", yt):
            warnings.append(f"{rel}: youtube_id '{yt}' does not look like an 11-character video ID")

    if fm.get("image") and not fm.get("image_alt"):
        fail(f"{rel}: has an image but no image_alt")

    # Track referenced media so unused files can be reported.
    for match in re.finditer(r"/assets/posts/([^\s'\")]+)", fm.get("image", "") + "\n" + body):
        referenced_media.add(match.group(1))

# Series numbering should be contiguous from 1.
for series, members in series_members.items():
    parts = sorted(p for p, _ in members)
    if parts != list(range(1, len(parts) + 1)):
        warnings.append(f"series '{series}': parts are {parts}, expected 1..{len(parts)}")

# Tags used exactly once are not navigable — but with only a handful of posts
# every tag is used once, and the warning is noise rather than signal.
if len(posts) >= 5:
    for tag, count in sorted(tag_counts.items()):
        if count == 1:
            warnings.append(f"tag '{tag}' is used by only one post")

# Orphaned media.
if MEDIA.exists():
    post_slugs = {re.sub(r"^\d{4}-\d{2}-\d{2}-", "", p.stem) for p in posts}
    post_slugs |= {p.stem for p in drafts}
    for folder in sorted(MEDIA.iterdir()):
        if not folder.is_dir():
            continue
        if folder.name not in post_slugs:
            warnings.append(f"assets/posts/{folder.name}/ has no matching post or draft")
            continue
        for f in sorted(folder.rglob("*")):
            if f.is_file() and not f.name.startswith("."):
                key = str(f.relative_to(MEDIA))
                if key not in referenced_media:
                    warnings.append(f"assets/posts/{key} is not referenced by any post")

print(f"Checked {len(posts)} post(s) and {len(drafts)} draft(s).\n")

if warnings:
    print(f"{len(warnings)} warning(s):")
    for w in warnings:
        print(f"  ! {w}")
    print()

if errors:
    print(f"{len(errors)} error(s):")
    for e in errors:
        print(f"  x {e}")
    sys.exit(1)

print("No errors." if not warnings else "No errors (warnings above are advisory).")
