#!/usr/bin/env python3
"""Render the 4:5 social card from the reviewed LKT service cover."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "lkt-collection-fit-service-cover-v1.png"
OUTPUT = ROOT / "lkt-collection-fit-service-instagram-v1.png"
REGULAR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"


def font(size: int, *, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(BOLD if bold else REGULAR, size)


def centered(draw: ImageDraw.ImageDraw, y: int, text: str, face, fill: str) -> None:
    box = draw.textbbox((0, 0), text, font=face)
    x = (1080 - (box[2] - box[0])) // 2
    draw.text((x, y), text, font=face, fill=fill)


def main() -> None:
    canvas = Image.new("RGB", (1080, 1350), "#07111f")
    source = Image.open(SOURCE).convert("RGB")
    source.thumbnail((1080, 608), Image.Resampling.LANCZOS)
    canvas.paste(source, ((1080 - source.width) // 2, 0))

    draw = ImageDraw.Draw(canvas)
    draw.rectangle((0, 608, 1080, 1350), fill="#07111f")
    draw.rectangle((72, 648, 1008, 651), fill="#e9a93a")
    centered(draw, 688, "LOCAL KNOWLEDGE TERMINAL", font(25, bold=True), "#8fb7ee")
    centered(draw, 733, "COLLECTION-FIT SPRINT", font(54, bold=True), "#f6f0e6")
    centered(draw, 815, "USD 250 · SOFTWARE SERVICE", font(42, bold=True), "#f3b544")
    centered(
        draw,
        881,
        "ONE COLLECTION · ONE LANGUAGE GOAL · ONE EXISTING MACHINE",
        font(23, bold=True),
        "#dce7f6",
    )

    items = (
        "DATA, PRIVACY & PROVENANCE MAP",
        "SMALL CITED BROWSER PROOF",
        "WRITTEN GO / NO-GO BOUNDARY",
    )
    for index, item in enumerate(items):
        y = 945 + index * 68
        draw.rounded_rectangle((115, y, 965, y + 48), radius=12, outline="#315f9f", width=2)
        centered(draw, y + 9, item, font(24, bold=True), "#f6f0e6")

    draw.rounded_rectangle((290, 1166, 790, 1222), radius=12, outline="#e9a93a", width=3)
    centered(draw, 1177, "HARDWARE NOT INCLUDED", font(26, bold=True), "#f3b544")
    centered(
        draw,
        1268,
        "Sample report: lazying.art/lkt/sample-report",
        font(24),
        "#dce7f6",
    )
    canvas.save(OUTPUT, optimize=True)
    print(OUTPUT)


if __name__ == "__main__":
    main()
