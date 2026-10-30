"""Build local QR assets only for Apple destinations already present on the site."""
from pathlib import Path
import hashlib
import html
import json
import re
from urllib.parse import urlsplit

import qrcode

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "media" / "store-qr"
DEST.mkdir(parents=True, exist_ok=True)
urls = set()
for name in ["index.html", "products/index.html", "work/index.html", "downloads/index.html"]:
    for raw in re.findall(r'href="(https://apps\.apple\.com/[^"<>]+)"', (ROOT / name).read_text()):
        url = html.unescape(raw)
        parsed = urlsplit(url)
        if parsed.hostname != "apps.apple.com" or parsed.username or parsed.password:
            raise ValueError("Unexpected Apple destination")
        urls.add(url)

manifest = {}
for url in sorted(urls):
    name = hashlib.sha256(url.encode()).hexdigest()[:20] + ".png"
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=8, border=4, mask_pattern=1)
    qr.add_data(url)
    qr.make(fit=True)
    image = qr.make_image(fill_color="black", back_color="white").convert("RGB")
    image.save(DEST / name)
    manifest[url] = {"src": "/media/store-qr/" + name, "width": image.width, "height": image.height}
(DEST / "catalog.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n")
print(f"Built {len(manifest)} local App Store QR codes")
