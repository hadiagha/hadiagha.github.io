#!/usr/bin/env python3
"""Fetch and trim the self-hosted webfonts.

The site does not load fonts from Google. Requesting fonts.googleapis.com puts
a third party on the critical path of every page and hands them every visitor's
IP address, which is exactly the sort of thing this site is trying not to do.
So the font files live in assets/fonts/ and are served from our own origin.

This script is how they got there, and how to refresh them. It is not part of
the build — the committed .woff2 files are. Run it only when changing a family,
a weight range, or picking up an upstream font revision:

    python3 scripts/fonts.py            # writes assets/fonts/ and the CSS block
    python3 scripts/fonts.py --dry-run  # report sizes, write nothing

Needs network access plus `pip install fonttools brotli`.

What it does beyond downloading:

  * Keeps only the `latin` and `latin-ext` subsets. The others (Cyrillic, Greek,
    Vietnamese) are declared by Google's CSS with a unicode-range so browsers
    skip them, but there is no reason to carry them in the repository.

  * Trims the variable fonts. Google serves the full designspace whatever you
    ask for: Source Serif 4 arrives with weight 200-900 even when the request
    says 400-700. Clipping the axis to what the stylesheet actually uses takes
    the regular face from 119 KB to 81 KB.

  * Pins the optical-size axis on the italic. `opsz` costs about 48 KB and pays
    for itself on the roman, which sets everything from 13px captions to 44px
    headings. Italics only ever appear in running prose at one size, so there
    the axis is 48 KB of nothing.
"""

from __future__ import annotations

import argparse
import io
import json
import pathlib
import re
import sys
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONT_DIR = ROOT / "assets" / "fonts"

# Pretending to be a current browser is what makes the API return woff2 rather
# than the truetype fallback it serves to unknown clients.
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)

KEEP_SUBSETS = ("latin", "latin-ext")

# One entry per @font-face we intend to ship.
#
# `limits` is passed to fontTools' instancer: a tuple clips an axis to a range,
# a bare number pins it. `css_weight` is what the @font-face declares, which for
# a variable font is the range browsers may interpolate across.
FAMILIES = [
    {
        "query": "Source+Serif+4:ital,opsz,wght@0,8..60,400..700",
        "family": "Source Serif 4",
        "style": "normal",
        "css_weight": "400 700",
        "limits": {"wght": (400, 400, 700)},
        "slug": "source-serif-4",
    },
    {
        "query": "Source+Serif+4:ital,opsz,wght@1,8..60,400..600",
        "family": "Source Serif 4",
        "style": "italic",
        "css_weight": "400 600",
        "limits": {"wght": (400, 400, 600), "opsz": 20},
        "slug": "source-serif-4-italic",
    },
    {
        "query": "IBM+Plex+Sans:wght@400..600",
        "family": "IBM Plex Sans",
        "style": "normal",
        "css_weight": "400 600",
        "limits": {"wght": (400, 400, 600)},
        "slug": "ibm-plex-sans",
    },
    # Plex Mono has no variable cut on Google Fonts, so these are static
    # instances and there is nothing to trim.
    {
        "query": "IBM+Plex+Mono:wght@400",
        "family": "IBM Plex Mono",
        "style": "normal",
        "css_weight": "400",
        "limits": None,
        "slug": "ibm-plex-mono-400",
    },
    {
        "query": "IBM+Plex+Mono:wght@500",
        "family": "IBM Plex Mono",
        "style": "normal",
        "css_weight": "500",
        "limits": None,
        "slug": "ibm-plex-mono-500",
    },
]


def get(url: str) -> bytes:
    return urllib.request.urlopen(
        urllib.request.Request(url, headers={"User-Agent": UA})
    ).read()


def faces_from_css(css: str) -> list[dict]:
    """Split Google's stylesheet into per-subset faces.

    Each @font-face is preceded by a `/* subset */` comment, which is the only
    thing identifying which subset a URL belongs to.
    """
    out = []
    for subset, block in re.findall(r"/\* (\S+) \*/\s*(@font-face \{.*?\})", css, re.S):
        if subset not in KEEP_SUBSETS:
            continue
        out.append(
            {
                "subset": subset,
                "url": re.search(r"url\((https://[^)]+)\)", block).group(1),
                "unicode_range": re.search(r"unicode-range: ([^;]+);", block)
                .group(1)
                .strip(),
            }
        )
    return out


def trim(data: bytes, limits: dict | None) -> bytes:
    if not limits:
        return data

    from fontTools.ttLib import TTFont
    from fontTools.varLib import instancer

    font = TTFont(io.BytesIO(data))
    if "fvar" not in font:
        return data

    instancer.instantiateVariableFont(font, limits, inplace=True, updateFontNames=False)
    font.flavor = "woff2"
    buf = io.BytesIO()
    font.save(buf)
    return buf.getvalue()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="report sizes only")
    args = parser.parse_args()

    if not args.dry_run:
        FONT_DIR.mkdir(parents=True, exist_ok=True)

    css_faces, total_before, total_after = [], 0, 0

    for spec in FAMILIES:
        css = get(
            f"https://fonts.googleapis.com/css2?family={spec['query']}&display=swap"
        ).decode()
        faces = faces_from_css(css)
        if not faces:
            print(f"  !! no {'/'.join(KEEP_SUBSETS)} face for {spec['query']}")
            return 1

        for face in faces:
            raw = get(face["url"])
            trimmed = trim(raw, spec["limits"])
            name = f"{spec['slug']}-{face['subset']}.woff2"

            total_before += len(raw)
            total_after += len(trimmed)
            saved = (
                f"  (-{(len(raw) - len(trimmed)) / 1024:.0f} KB)"
                if len(trimmed) < len(raw)
                else ""
            )
            print(f"  {name:<44} {len(trimmed) / 1024:6.1f} KB{saved}")

            if not args.dry_run:
                (FONT_DIR / name).write_bytes(trimmed)

            css_faces.append(
                {
                    "family": spec["family"],
                    "style": spec["style"],
                    "weight": spec["css_weight"],
                    "file": name,
                    "unicode_range": face["unicode_range"],
                }
            )

    print(
        f"\n  {total_after / 1024:.0f} KB on disk, "
        f"{(total_before - total_after) / 1024:.0f} KB trimmed"
    )

    manifest = FONT_DIR / "fonts.json"
    if not args.dry_run:
        manifest.write_text(json.dumps(css_faces, indent=2) + "\n")
        print(f"  wrote {manifest.relative_to(ROOT)}")

    print("\n  Paste into the @font-face block of assets/css/main.scss:\n")
    for f in css_faces:
        print("@font-face {")
        print(f"  font-family: '{f['family']}';")
        print(f"  font-style: {f['style']};")
        print(f"  font-weight: {f['weight']};")
        print("  font-display: swap;")
        print(f"  src: url('/assets/fonts/{f['file']}') format('woff2');")
        print(f"  unicode-range: {f['unicode_range']};")
        print("}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
