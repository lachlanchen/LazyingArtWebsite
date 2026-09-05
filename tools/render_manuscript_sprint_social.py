#!/usr/bin/env python3
"""Render the manuscript sprint social card from the public redline proof."""

from __future__ import annotations

import argparse
import hashlib
import subprocess
import tempfile
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "manuscript-sprint/assets/manuscript-sprint-social.png"
LOCAL_SOURCE = (
    ROOT.parent
    / "LazyPromotion/examples/latex-redline/artifacts/redline.pdf"
)
SOURCE_URL = (
    "https://raw.githubusercontent.com/lachlanchen/LazyPromotion/main/"
    "examples/latex-redline/artifacts/redline.pdf"
)
SOURCE_SHA256 = "52bedcef9d7ecbb10329f07eb52383f98b8917ccfd4fa7c85af1bd4af1c670d2"

WIDTH = 1200
HEIGHT = 630
BG = "#13211c"
PANEL = "#1b3028"
PANEL_DARK = "#101b17"
INK = "#f2eadc"
MUTED = "#b4c1ba"
GREEN = "#8fc8a9"
BRASS = "#d9b66f"


def font(size: int, *, weight: str = "regular") -> ImageFont.FreeTypeFont:
    suffix = "Black" if weight == "black" else "Medium" if weight == "medium" else "Regular"
    path = Path(f"/usr/share/fonts/opentype/noto/NotoSansCJK-{suffix}.ttc")
    if not path.exists():
        path = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
    return ImageFont.truetype(str(path), size)


def source_bytes(source_pdf: Path | None) -> bytes:
    if source_pdf is not None:
        data = source_pdf.read_bytes()
    elif LOCAL_SOURCE.exists():
        data = LOCAL_SOURCE.read_bytes()
    else:
        request = urllib.request.Request(SOURCE_URL, headers={"User-Agent": "LazyingArt-render/1.0"})
        with urllib.request.urlopen(request, timeout=30) as response:
            data = response.read()

    digest = hashlib.sha256(data).hexdigest()
    if digest != SOURCE_SHA256:
        raise ValueError(f"source PDF checksum mismatch: expected {SOURCE_SHA256}, got {digest}")
    return data


def render_pdf_page(data: bytes) -> Image.Image:
    with tempfile.TemporaryDirectory(prefix="lazyingart-redline-") as tmp:
        tmp_dir = Path(tmp)
        pdf = tmp_dir / "redline.pdf"
        output_prefix = tmp_dir / "redline-page"
        pdf.write_bytes(data)
        subprocess.run(
            [
                "pdftoppm",
                "-f",
                "1",
                "-singlefile",
                "-png",
                "-r",
                "120",
                str(pdf),
                str(output_prefix),
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
        )
        with Image.open(output_prefix.with_suffix(".png")) as page:
            return page.convert("RGB")


def rounded_crop(source: Image.Image, size: tuple[int, int], radius: int) -> Image.Image:
    # The crop contains the abstract, visible additions/deletions, equation, and table.
    left = round(source.width * 0.09)
    right = round(source.width * 0.91)
    top = round(source.height * 0.21)
    crop_width = right - left
    target_ratio = size[0] / size[1]
    crop_height = round(crop_width / target_ratio)
    source = source.crop((left, top, right, top + crop_height))
    source = source.resize(size, Image.Resampling.LANCZOS)

    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    result = Image.new("RGB", size, "#f6f2e8")
    result.paste(source, mask=mask)
    return result


def draw_badge(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    label: str,
    *,
    fill: str,
    ink: str,
    size: int = 19,
) -> tuple[int, int, int, int]:
    badge_font = font(size, weight="medium")
    x, y = xy
    left, top, right, bottom = draw.textbbox((x, y), label, font=badge_font)
    width = right - left + 30
    height = bottom - top + 18
    box = (x, y, x + width, y + height)
    draw.rounded_rectangle(box, radius=height // 2, fill=fill)
    draw.text((x + 15, y + 7), label, font=badge_font, fill=ink)
    return box


def render(source_pdf: Path | None, output: Path) -> None:
    canvas = Image.new("RGB", (WIDTH, HEIGHT), BG)
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((30, 30, WIDTH - 30, HEIGHT - 30), radius=28, fill=PANEL)
    draw.rectangle((30, 30, 42, HEIGHT - 30), fill=BRASS)

    page = render_pdf_page(source_bytes(source_pdf))
    proof = rounded_crop(page, (470, 372), 18)
    canvas.paste(proof, (76, 102))
    draw.rounded_rectangle((76, 102, 546, 474), radius=18, outline="#d5c7a7", width=2)
    draw_badge(draw, (94, 120), "PROJECT-OWNED REDLINE", fill=PANEL_DARK, ink=INK, size=17)

    draw.text((76, 498), "SYNTHETIC SAMPLE", font=font(18, weight="medium"), fill=GREEN)
    draw.text((76, 532), "Baseline  ·  Revision  ·  Redline", font=font(22, weight="medium"), fill=INK)
    draw.text((76, 568), "3/3 builds pass  ·  0 LaTeX errors  ·  0 undefined refs", font=font(17), fill=MUTED)

    right_x = 596
    draw.text((right_x, 78), "LAZYINGART  /  SERVICE SPRINT", font=font(18, weight="medium"), fill=GREEN)
    draw.text((right_x, 117), "Manuscript", font=font(53, weight="black"), fill=INK)
    draw.text((right_x, 176), "Build & Redline", font=font(53, weight="black"), fill=INK)
    draw.text((right_x, 255), "CLEAN BUILD  ·  TEMPLATE CHECK", font=font(20, weight="medium"), fill=BRASS)
    draw.text((right_x, 286), "ISSUE LEDGER  ·  REPRODUCIBLE DIFF", font=font(20, weight="medium"), fill=BRASS)

    draw.line((right_x, 335, 1120, 335), fill="#496159", width=2)
    draw_badge(draw, (right_x, 362), "USD 250", fill=BRASS, ink=PANEL_DARK, size=24)
    draw.text((right_x + 153, 368), "FOUNDING SPRINT", font=font(19, weight="medium"), fill=INK)

    draw.text((right_x, 430), "One LaTeX manuscript  ·  Up to 7,500 words", font=font(21, weight="medium"), fill=INK)
    draw.text((right_x, 466), "One template  ·  Supplied baseline + revision", font=font(19), fill=MUTED)

    draw.rounded_rectangle((right_x, 526, 1124, 575), radius=12, fill=PANEL_DARK)
    draw.text((right_x + 18, 537), "Free fit check first", font=font(19, weight="medium"), fill=GREEN)
    draw.text((right_x + 226, 537), "lazying.art/manuscript-sprint/", font=font(16), fill=INK)

    output.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output, format="PNG", optimize=True)
    print(f"rendered {output} ({WIDTH}x{HEIGHT})")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-pdf", type=Path, help="Optional local copy of the pinned redline PDF")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    render(args.source_pdf, args.output)


if __name__ == "__main__":
    main()
