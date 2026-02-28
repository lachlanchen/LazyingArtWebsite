[English](README.md) · [العربية](i18n/README.ar.md) · [Español](i18n/README.es.md) · [Français](i18n/README.fr.md) · [日本語](i18n/README.ja.md) · [한국어](i18n/README.ko.md) · [Tiếng Việt](i18n/README.vi.md) · [中文 (简体)](i18n/README.zh-Hans.md) · [中文（繁體）](i18n/README.zh-Hant.md) · [Deutsch](i18n/README.de.md) · [Русский](i18n/README.ru.md)

<p align="center">
  <img src="https://raw.githubusercontent.com/lachlanchen/lachlanchen/main/logos/banner.png" alt="LazyingArt banner" />
</p>


# LazyingArt - Official Website

<p align="left">
  <a href="https://lazying.art"><img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Flazying.art&label=Lazying.art&color=00A86B"></a>
  <a href="https://chat.lazying.art"><img alt="EchoMind" src="https://img.shields.io/badge/EchoMind-Try%20Now-4F46E5"></a>
  <a href="https://pages.github.com/"><img alt="GitHub Pages" src="https://img.shields.io/badge/Deploy-GitHub%20Pages-24292F"></a>
  <img alt="Stack" src="https://img.shields.io/badge/Stack-HTML%2FCSS%2FJS-FF6B35">
  <img alt="Locales" src="https://img.shields.io/badge/Locales-13-blue">
</p>

## 🎨 About LazyingArt

LazyingArt is pioneering the future of multilingual AI communication. We believe technology should break down barriers, not create them. Our mission is to make global communication as natural as breathing.

This repository contains the public website and product landing pages for the LazyingArt ecosystem, including EchoMind and hardware product pages.

## 🌍 EchoMind - Our Flagship Product

**EchoMind** is our revolutionary multilingual AI companion that features:

- 🎙️ Real-time voice interaction in 10+ languages
- 🧠 Contextual memory and personalization
- 📚 Interactive language learning with pronunciation guides
- 🔤 Grammar analysis and enhancement
- 💬 Social features for connecting with others

**Try EchoMind**: [chat.lazying.art](https://chat.lazying.art)

## 🚀 Quick Start

This repository hosts the LazyingArt company website at [lazying.art](https://lazying.art).

### Local Development

```bash
# Clone the repository (canonical)
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite

# Alternative clone format
git clone https://github.com/YOUR_USERNAME/LazyingArt.git
cd LazyingArt

# Open in browser (no build process needed)
open index.html
# or
python -m http.server 8000
# Visit http://localhost:8000
```

### Deployment

The site is automatically deployed via GitHub Pages when changes are pushed to the `main` branch.

## ✨ Features

| Area | Details |
|---|---|
| Architecture | Framework-free static implementation (HTML/CSS/vanilla JavaScript). |
| Pages | Main marketing page plus dedicated product pages: `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| Localization | Multilingual UI support with 13 locales embedded in page scripts: `en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr` |
| i18n Runtime | Localized text replacement using `[data-i18n]` keys |
| Persistence | Language preference + theme preference persisted via `localStorage` |
| Commerce | Stripe Buy Button integration for checkout flows |
| Smart Defaults | Geolocation-assisted language detection on main page (`ipapi.co` with `ipwho.is` fallback) |
| SEO/Domain | `CNAME`, `_config.yml`, `sitemap.xml` |

## 📁 Project Structure

Current repository layout:

```text
LazyingArtLanding/
├── README.md
├── index.html
├── robot.html
├── eink-words-card.html
├── openhi-kit.html
├── 404.html
├── sitemap.xml
├── CNAME
├── _config.yml
├── favicon.ico
├── favicon-32x32.png
├── .github/
│   └── FUNDING.yml
├── demos/
│   ├── LazyingArtRobot.png
│   ├── OpenHI.png
│   ├── demo.jpg
│   ├── device_setup.png
│   └── words_card_arabic.JPG
├── figs/
├── logos/
├── logos-legacy/
├── app/
│   └── donate/
├── donate/
├── product-assets/
└── i18n/
```

Legacy structure block from the previous README (kept for continuity):

```text
LazyingArt/
├── index.html          # Main landing page
├── CNAME              # Custom domain configuration
├── robots.txt         # SEO configuration
├── sitemap.xml        # SEO sitemap
├── .nojekyll          # Disable Jekyll processing
├── README.md          # This file
└── assets/            # Images and resources (optional)
    ├── logo.png
    └── og-image.png
```

## 🛠️ Technologies

- Pure HTML5/CSS3/JavaScript (no framework dependencies)
- Glassmorphism and modern CSS effects
- Responsive design
- Progressive enhancement
- SEO optimized
- Stripe hosted buy button widgets (`https://js.stripe.com/v3/buy-button.js`)
- GitHub Pages + Jekyll config for metadata/plugins

## 📦 Prerequisites

- A modern browser (Chrome, Firefox, Safari, Edge).
- Python 3 (optional, for local static server).
- Git (for cloning and collaboration).

No Node.js build toolchain is required for standard local editing/testing.

## 🔧 Installation

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Run locally:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## ▶️ Usage

Primary pages:

- Landing page: `http://localhost:8000/index.html`
- Robot product page: `http://localhost:8000/robot.html`
- E-ink product page: `http://localhost:8000/eink-words-card.html`
- OpenHI kit page: `http://localhost:8000/openhi-kit.html`

Typical user flow:

1. Visit `index.html`.
2. Explore ecosystem sections and product cards.
3. Navigate to product details or open external apps (`chat.lazying.art`, `onlyideas.art`, `coin.lazying.art`).
4. Use Stripe buy buttons on product pages.

## ⚙️ Configuration

Configuration is file-based and mostly inline:

- `_config.yml`
  - Site metadata (`title`, `description`, `url`)
  - Social metadata
  - GitHub Pages plugins (`jekyll-sitemap`, `jekyll-seo-tag`)
  - HTML compression settings
  - `google_analytics` is currently placeholder (`UA-XXXXXXXXX-X`)
- `CNAME`
  - Custom domain mapping for GitHub Pages (`lazying.art`)
- Inline JS in each page
  - `supportedLangs` locale list
  - translation dictionaries
  - language/theme state management (`localStorage`)

Assumption: analytics is not active until a real analytics ID replaces the placeholder.

## 🧪 Examples

Serve the full site locally:

```bash
python -m http.server 8000
```

Quickly validate main endpoints:

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

Reset saved UI preferences in browser console:

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 Development Notes

- The project is intentionally static and framework-free.
- Most behavior (i18n, theme, product interaction UI) is implemented inline per page.
- There is currently no package manifest (`package.json`) or automated test suite in this repo.
- `i18n/` exists but is currently empty; localization strings are embedded in HTML files.
- Empty directories such as `donate/`, `app/donate/`, and `product-assets/` appear reserved for future use.

Recommended editing workflow:

1. Run local static server.
2. Make page edits.
3. Verify desktop/mobile layout and language/theme toggles.
4. Verify external links and Stripe widget load.

## 📊 Performance

As stated in the prior README target profile:

- ⚡ <1s First Contentful Paint
- 📱 100% Mobile-friendly
- ♿ WCAG 2.1 AA Compliant
- 🎯 100/100 Lighthouse Score

Assumption: re-measure these metrics after major visual or script updates.

## 🛠️ Troubleshooting

| Symptom | Check |
|---|---|
| Local server starts but pages look unstyled | Ensure you are opening via `http://localhost:8000` and not a blocked local file context. |
| Stripe buy button does not render | Confirm internet access and that `https://js.stripe.com/v3/buy-button.js` is reachable. |
| Language does not change as expected | Clear `localStorage` keys (`lang`, `theme`) and reload. |
| Deployment mismatch on GitHub Pages | Verify `main` branch publishing settings, `CNAME`, and `_config.yml` values. |
| SEO files appear outdated | Update `sitemap.xml` entries and timestamps when adding/removing pages. |

## 🗺️ Roadmap

- Keep README and repository structure documentation in sync with production pages.
- Add/maintain multilingual README variants in `i18n/` as part of README pipeline steps.
- Consider centralizing repeated inline JS/CSS into shared assets to reduce duplication.
- Add automated checks for broken links and basic HTML validation.
- Replace placeholder analytics configuration when production analytics is finalized.

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

Recommended contribution flow:

1. Fork the repo.
2. Create a feature branch.
3. Test pages locally.
4. Open a PR with screenshots for visual changes.

## ❤️ Support / Sponsorship

If you want to support the project:

- GitHub Sponsors: [lachlanchen](https://github.com/sponsors/lachlanchen)
- Website: [lazying.art](https://lazying.art)
- Product: [chat.lazying.art](https://chat.lazying.art)
- Ecosystem: [onlyideas.art](https://onlyideas.art)

Funding metadata source: `.github/FUNDING.yml`.

## 📝 License

© 2024 LazyingArt. All rights reserved.

## 📧 Contact

- Website: [lazying.art](https://lazying.art)
- Product: [chat.lazying.art](https://chat.lazying.art)
- Email: contact@lazying.art
- Twitter: [@lazyingart](https://twitter.com/lazyingart)

---

<p align="center">Built with ❤️ by the LazyingArt Team</p>
<p align="center">
  <a href="https://lazying.art">Website</a> •
  <a href="https://chat.lazying.art">Try EchoMind</a> •
  <a href="https://twitter.com/lazyingart">Twitter</a>
</p>
