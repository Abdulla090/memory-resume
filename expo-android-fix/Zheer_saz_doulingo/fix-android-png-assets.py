#!/usr/bin/env python3
"""Re-encode PNG assets so Android AAPT2 can compile release resources."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"


def normalize_png(path: Path) -> None:
    with Image.open(path) as image:
        rgba = image.convert("RGBA")
        temp = path.with_suffix(".tmp.png")
        rgba.save(temp, format="PNG", optimize=True)
        temp.replace(path)


def main() -> None:
    if not ASSETS.exists():
        raise SystemExit(f"Assets folder not found: {ASSETS}")

    for png in sorted(ASSETS.rglob("*.png")):
        normalize_png(png)
        print(f"normalized {png.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
