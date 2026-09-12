#!/usr/bin/env python3
"""Render the MCP boundary review social card from executed public evidence."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "mcp-boundary-review/assets/mcp-boundary-review-social.png"

WIDTH = 1200
HEIGHT = 630
BG = "#13211c"
PANEL = "#1b3028"
PANEL_DARK = "#101b17"
INK = "#f2eadc"
MUTED = "#b4c1ba"
GREEN = "#8fc8a9"
BRASS = "#d9b66f"
LIME = "#c8f04a"


def font(size: int, *, weight: str = "regular") -> ImageFont.FreeTypeFont:
    suffix = "Black" if weight == "black" else "Medium" if weight == "medium" else "Regular"
    path = Path(f"/usr/share/fonts/opentype/noto/NotoSansCJK-{suffix}.ttc")
    if not path.exists():
        path = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
    return ImageFont.truetype(str(path), size)


def badge(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    label: str,
    *,
    fill: str,
    ink: str,
    size: int = 19,
) -> int:
    face = font(size, weight="medium")
    x, y = xy
    left, top, right, bottom = draw.textbbox((x, y), label, font=face)
    width = right - left + 30
    height = bottom - top + 18
    draw.rounded_rectangle((x, y, x + width, y + height), radius=height // 2, fill=fill)
    draw.text((x + 15, y + 7), label, font=face, fill=ink)
    return width


def evidence_row(
    draw: ImageDraw.ImageDraw,
    y: int,
    number: str,
    label: str,
) -> None:
    draw.text((688, y), number, font=font(27, weight="black"), fill=LIME)
    draw.text((752, y + 3), label, font=font(20, weight="medium"), fill=INK)


def render(output: Path) -> None:
    canvas = Image.new("RGB", (WIDTH, HEIGHT), BG)
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((30, 30, WIDTH - 30, HEIGHT - 30), radius=28, fill=PANEL)
    draw.rectangle((30, 30, 42, HEIGHT - 30), fill=BRASS)

    draw.text((76, 72), "LAZYINGART  /  CODE + PROTOCOL REVIEW", font=font(18, weight="medium"), fill=GREEN)
    draw.text((76, 117), "MCP Server", font=font(55, weight="black"), fill=INK)
    draw.text((76, 180), "Pre-Deployment", font=font(55, weight="black"), fill=INK)
    draw.text((76, 243), "Review", font=font(55, weight="black"), fill=INK)

    draw.text((76, 328), "Know what one server can read, change,", font=font(23, weight="medium"), fill=INK)
    draw.text((76, 363), "call, and disclose before an agent uses it.", font=font(23, weight="medium"), fill=INK)

    x = 76
    x += badge(draw, (x, 420), "USD 500", fill=BRASS, ink=PANEL_DARK, size=23) + 14
    x += badge(draw, (x, 420), "1 SERVER", fill=PANEL_DARK, ink=INK, size=20) + 14
    badge(draw, (x, 420), "10 CHECKS", fill=PANEL_DARK, ink=INK, size=20)

    draw.rounded_rectangle((76, 520, 578, 572), radius=13, fill=PANEL_DARK)
    draw.text((94, 533), "Free fit check first", font=font(19, weight="medium"), fill=GREEN)
    draw.text((283, 535), "lazying.art/mcp-boundary-review/", font=font(15), fill=INK)

    draw.rounded_rectangle((638, 64, 1124, 568), radius=24, fill=PANEL_DARK)
    draw.text((680, 100), "EXECUTED PROJECT-OWNED SAMPLE", font=font(17, weight="medium"), fill=GREEN)
    draw.text((680, 140), "A decision tied", font=font(43, weight="black"), fill=INK)
    draw.text((680, 190), "to evidence.", font=font(43, weight="black"), fill=INK)

    evidence_row(draw, 266, "2", "read-only tools")
    evidence_row(draw, 310, "1", "status resource")
    evidence_row(draw, 354, "14", "focused tests passed")

    draw.line((680, 410, 1082, 410), fill="#496159", width=2)
    draw.text((680, 438), "GO", font=font(25, weight="black"), fill=LIME)
    draw.text((760, 441), "recorded local boundary", font=font(19, weight="medium"), fill=INK)
    draw.text((680, 482), "NO-GO", font=font(22, weight="black"), fill=BRASS)
    draw.text((792, 485), "direct remote exposure", font=font(19, weight="medium"), fill=INK)
    draw.text((680, 529), "Pinned revision · sanitized packet · limited recheck", font=font(16), fill=MUTED)

    output.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output, format="PNG", optimize=True)
    print(f"rendered {output} ({WIDTH}x{HEIGHT})")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    render(args.output)


if __name__ == "__main__":
    main()
