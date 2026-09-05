#!/usr/bin/env python3
"""Render the Bilingual Lecture Pack social card from project-owned evidence."""

from __future__ import annotations

import argparse
import hashlib
import io
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "lecture-pack/assets/bilingual-lecture-pack-social.png"
LOCAL_SOURCE = (
    ROOT.parent
    / "LalaMedias/media/thumbs/aginti-autonomous-lab-ai-glasses-2b85b0d9.jpg"
)
SOURCE_URL = (
    "https://raw.githubusercontent.com/lachlanchen/LalaMedias/main/"
    "media/thumbs/aginti-autonomous-lab-ai-glasses-2b85b0d9.jpg"
)
SOURCE_SHA256 = "af8f2f18525c98f8861b5f95472a3f9196181b462ac13f799a78ff647d511a92"

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


def source_bytes(source_image: Path | None) -> bytes:
    if source_image is not None:
        data = source_image.read_bytes()
    elif LOCAL_SOURCE.exists():
        data = LOCAL_SOURCE.read_bytes()
    else:
        request = urllib.request.Request(SOURCE_URL, headers={"User-Agent": "LazyingArt-render/1.0"})
        with urllib.request.urlopen(request, timeout=30) as response:
            data = response.read()

    digest = hashlib.sha256(data).hexdigest()
    if digest != SOURCE_SHA256:
        raise ValueError(f"source image checksum mismatch: expected {SOURCE_SHA256}, got {digest}")
    return data


def rounded_image(source: Image.Image, size: tuple[int, int], radius: int) -> Image.Image:
    target_width, target_height = size
    source_ratio = source.width / source.height
    target_ratio = target_width / target_height
    if source_ratio > target_ratio:
        crop_width = round(source.height * target_ratio)
        left = (source.width - crop_width) // 2
        source = source.crop((left, 0, left + crop_width, source.height))
    else:
        crop_height = round(source.width / target_ratio)
        top = (source.height - crop_height) // 2
        source = source.crop((0, top, source.width, top + crop_height))

    source = source.resize(size, Image.Resampling.LANCZOS).convert("RGB")
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, target_width, target_height), radius=radius, fill=255)
    result = Image.new("RGB", size, PANEL_DARK)
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


def render(source_image: Path | None, output: Path) -> None:
    canvas = Image.new("RGB", (WIDTH, HEIGHT), BG)
    draw = ImageDraw.Draw(canvas)

    # Subtle framing keeps important content inside social-platform safe areas.
    draw.rounded_rectangle((30, 30, WIDTH - 30, HEIGHT - 30), radius=28, fill=PANEL)
    draw.rectangle((30, 30, 42, HEIGHT - 30), fill=BRASS)

    source = Image.open(io.BytesIO(source_bytes(source_image)))
    sample = rounded_image(source, (470, 352), 18)
    canvas.paste(sample, (76, 104))
    draw.rounded_rectangle((76, 104, 546, 456), radius=18, outline="#d5c7a7", width=2)

    draw_badge(draw, (94, 122), "PROJECT-OWNED SAMPLE", fill=PANEL_DARK, ink=INK, size=17)
    draw.text((76, 468), "00:00:00  ·  EN / JA", font=font(18, weight="medium"), fill=GREEN)
    draw.text(
        (76, 500),
        "Today we're not shooting an ad;",
        font=font(21),
        fill=INK,
    )
    draw.text((76, 531), "we're doing a real experiment.", font=font(21), fill=INK)
    draw.text((76, 565), "今日は広告を撮らずに、本当の実験を一度します。", font=font(17), fill=MUTED)

    right_x = 596
    draw.text((right_x, 82), "LAZYINGART  /  SERVICE PILOT", font=font(18, weight="medium"), fill=GREEN)
    draw.text((right_x, 122), "Bilingual", font=font(57, weight="black"), fill=INK)
    draw.text((right_x, 186), "Lecture Pack", font=font(57, weight="black"), fill=INK)
    draw.text((right_x, 270), "TRANSCRIPT  ·  SUBTITLES", font=font(21, weight="medium"), fill=BRASS)
    draw.text((right_x, 302), "POCKET STUDY PDF  ·  PREVIEW CLIP", font=font(21, weight="medium"), fill=BRASS)

    draw.line((right_x, 351, 1120, 351), fill="#496159", width=2)
    draw_badge(draw, (right_x, 378), "USD 250", fill=BRASS, ink=PANEL_DARK, size=24)
    draw.text((right_x + 153, 384), "FOUNDING PILOT", font=font(19, weight="medium"), fill=INK)

    draw.text((right_x, 446), "One rights-cleared English lecture", font=font(23, weight="medium"), fill=INK)
    draw.text((right_x, 481), "One target language  ·  Up to 20 minutes", font=font(20), fill=MUTED)

    draw.rounded_rectangle((right_x, 536, 1124, 585), radius=12, fill=PANEL_DARK)
    draw.text((right_x + 18, 547), "Free fit check first", font=font(19, weight="medium"), fill=GREEN)
    draw.text((right_x + 226, 547), "lazying.art/lecture-pack/", font=font(17), fill=INK)

    output.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output, format="PNG", optimize=True)
    print(f"rendered {output} ({WIDTH}x{HEIGHT})")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-image", type=Path, help="Optional local copy of the pinned sample thumbnail")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    render(args.source_image, args.output)


if __name__ == "__main__":
    main()
