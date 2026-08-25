#!/usr/bin/env python3
"""Mirror the webfonts locally so they are served from this site's own origin.

The site used to load Inter, Merriweather and JetBrains Mono from
fonts.googleapis.com. That puts a third party on the critical path of every
page — two extra DNS lookups and TLS handshakes before a single glyph can be
drawn — and hands Google the IP address of everyone who reads anything here.

This mirrors what Google was serving. It does not re-derive it: GOOGLE_FONTS_URL
below is character-for-character the URL that used to sit in _layouts/default.html,
the stylesheet it returns is downloaded, every font file it references is saved,
and the @font-face rules are reproduced with only the `src` rewritten. Nothing
about how the site looks changes, because the browser ends up with the same
files and the same declarations.

    python3 scripts/fonts.py            # download and write the CSS block
    python3 scripts/fonts.py --dry-run  # report sizes, write nothing

Needs network access, nothing else.

Two things that are easy to get wrong here, both learned the hard way:

  * Mirror the ORIGINAL combined URL, not one request per weight. Asking for
    `Inter:wght@400` gets a static instance; asking for the five weights at
    once gets a single variable font that all five @font-face rules point at.
    They are different files and they rasterise differently — measurably so:
    a pixel diff of the homepage showed 5,458 changed pixels between the two.

  * The User-Agent matters. Google inspects it and serves woff2 only to
    browsers it recognises; anything else gets a much larger legacy format.

Run this only when changing a family or a weight. The committed .woff2 files
are what the build uses.
"""

from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
FONT_DIR = ROOT / "assets" / "fonts"

# Exactly the URL that used to be in the <link>. Keep it in step with the
# weights assets/css/main.scss actually applies: requesting a weight nothing
# uses downloads a file nobody needs, and using a weight that was never
# requested makes the browser synthesise it, which looks smeared.
GOOGLE_FONTS_URL = (
    "https://fonts.googleapis.com/css2"
    "?family=Inter:wght@300;400;500;600;700"
    "&family=Merriweather:wght@300;400;700"
    "&family=JetBrains+Mono:wght@400;500"
    "&display=swap"
)

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)

# Google's stylesheet declares the other subsets (Cyrillic, Greek, Vietnamese)
# behind a unicode-range, so browsers already skip them; there is no reason to
# carry them in the repository either.
KEEP_SUBSETS = ("latin", "latin-ext")


def get(url: str) -> bytes:
    return urllib.request.urlopen(
        urllib.request.Request(url, headers={"User-Agent": UA})
    ).read()


def slug(family: str, subset: str) -> str:
    return f"{family.lower().replace(' ', '-')}-{subset}.woff2"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="report sizes only")
    args = parser.parse_args()

    css = get(GOOGLE_FONTS_URL).decode()

    # Each @font-face is preceded by a `/* subset */` comment, which is the
    # only thing saying which subset a given block covers.
    blocks = re.findall(r"/\* (\S+) \*/\s*@font-face \{(.*?)\}", css, re.S)
    if not blocks:
        print("  !! could not parse the stylesheet — has the format changed?")
        return 1

    if not args.dry_run:
        FONT_DIR.mkdir(parents=True, exist_ok=True)

    downloaded: dict[str, int] = {}
    declared = []

    for subset, block in blocks:
        if subset not in KEEP_SUBSETS:
            continue

        family = re.search(r"font-family: '([^']+)'", block).group(1)
        weight = re.search(r"font-weight: ([^;]+);", block).group(1).strip()
        style = re.search(r"font-style: (\S+);", block).group(1)
        url = re.search(r"url\((https://[^)]+)\)", block).group(1)
        urange = re.search(r"unicode-range: ([^;]+);", block).group(1).strip()

        name = slug(family, subset)

        # Several weights share one variable file; fetch it once.
        if name not in downloaded:
            data = get(url)
            downloaded[name] = len(data)
            print(f"  {name:<34} {len(data) / 1024:6.1f} KB")
            if not args.dry_run:
                (FONT_DIR / name).write_bytes(data)

        declared.append(
            {
                "family": family,
                "style": style,
                "weight": weight,
                "file": name,
                "unicode_range": urange,
            }
        )

    print(
        f"\n  {len(downloaded)} files, {sum(downloaded.values()) / 1024:.0f} KB on disk, "
        f"{len(declared)} @font-face rules"
    )

    if not args.dry_run:
        (FONT_DIR / "fonts.json").write_text(json.dumps(declared, indent=2) + "\n")
        print("  wrote assets/fonts/fonts.json")

    print("\n  Paste into the @font-face block at the top of assets/css/main.scss:\n")
    for f in declared:
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
