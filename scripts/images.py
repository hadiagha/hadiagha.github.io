#!/usr/bin/env python3
"""Resize and re-encode post images.

Runs on the host rather than in the build container, because Pillow is a heavy
dependency to carry just for occasional image work. Idempotent: an image already
within the size budget is left alone, and an existing .webp is only rewritten if
the source is newer.
"""
from __future__ import annotations

import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit(
        "Pillow is not installed.\n"
        "  python3 -m pip install --user Pillow\n"
        "Images are optional — the site builds fine without running this."
    )

ROOT = Path(__file__).resolve().parent.parent
MEDIA = ROOT / "assets" / "posts"

MAX_WIDTH = 1600
JPEG_QUALITY = 82
WEBP_QUALITY = 80
RASTER = {".jpg", ".jpeg", ".png"}

if not MEDIA.exists():
    print("No assets/posts/ yet — nothing to do.")
    sys.exit(0)

changed = 0
for path in sorted(MEDIA.rglob("*")):
    if not path.is_file() or path.suffix.lower() not in RASTER:
        continue

    rel = path.relative_to(ROOT)
    with Image.open(path) as im:
        width, height = im.size
        needs_resize = width > MAX_WIDTH

        if needs_resize:
            before = path.stat().st_size
            out = im.convert("RGBA" if path.suffix.lower() == ".png" else "RGB")
            out.thumbnail((MAX_WIDTH, MAX_WIDTH * 4), Image.LANCZOS)
            if path.suffix.lower() == ".png":
                out.save(path, "PNG", optimize=True)
            else:
                out.save(path, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
            after = path.stat().st_size
            print(f"  resized {rel}  {width}px -> {out.size[0]}px  ({before // 1024}KB -> {after // 1024}KB)")
            changed += 1

    webp = path.with_suffix(".webp")
    if not webp.exists() or webp.stat().st_mtime < path.stat().st_mtime:
        with Image.open(path) as im:
            im.convert("RGBA" if path.suffix.lower() == ".png" else "RGB").save(
                webp, "WEBP", quality=WEBP_QUALITY, method=6
            )
        print(f"  wrote   {webp.relative_to(ROOT)}  ({webp.stat().st_size // 1024}KB)")
        changed += 1

print(f"\n{changed} file(s) written." if changed else "Everything already optimized.")
