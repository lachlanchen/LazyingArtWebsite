[English](README.md) · [العربية](i18n/README.ar.md) · [Español](i18n/README.es.md) · [Français](i18n/README.fr.md) · [日本語](i18n/README.ja.md) · [한국어](i18n/README.ko.md) · [Tiếng Việt](i18n/README.vi.md) · [中文 (简体)](i18n/README.zh-Hans.md) · [中文（繁體）](i18n/README.zh-Hant.md) · [Deutsch](i18n/README.de.md) · [Русский](i18n/README.ru.md)


[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# LazyingArt - Official Website

<p align="left">
  <a href="https://lazying.art"><img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Flazying.art&label=Lazying.art&color=00A86B"></a>
  <a href="https://chat.lazying.art"><img alt="EchoMind" src="https://img.shields.io/badge/EchoMind-Try%20Now-4F46E5"></a>
  <a href="https://pages.github.com/"><img alt="GitHub Pages" src="https://img.shields.io/badge/Deploy-GitHub%20Pages-24292F"></a>
  <img alt="Stack" src="https://img.shields.io/badge/Stack-HTML%2FCSS%2FJS-FF6B35">
  <img alt="Locales" src="https://img.shields.io/badge/Locales-13-blue">
</p>

![Project Shape](https://img.shields.io/badge/Project-Static%20Landing%20Site-0f766e?style=flat-square&logo=github&logoColor=white)
![Deployment](https://img.shields.io/badge/Deployment-GitHub%20Pages-0f172a?style=flat-square&logo=github&logoColor=white)
![Scope](https://img.shields.io/badge/Localization-13%20Locales-2563eb?style=flat-square&logo=googletranslate&logoColor=white)

### 📌 At a glance

| Item | Info |
| --- | --- |
| ✅ Repo focus | Multilingual marketing site with product entry points for LazyingArt |
| 🌍 Audience | Visitors, language learners, collaborators, contributors |
| 🧩 Core pages | `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| 🧱 Runtime | HTML/CSS/vanilla JS with localized text interpolation |

## 🎨 About LazyingArt

LazyingArt is a multilingual AI communication platform and landing-site ecosystem. This repository contains the public website and product pages for LazyingArt, including the flagship **EchoMind** experience and supporting hardware pages.

- **Mission:** Make cross-language communication feel natural, fast, and human.
- **Scope:** Browser-first static website deployed with GitHub Pages.
- **Audience:** Visitors, product teams, collaborators, and contributors.

## 🌍 EchoMind - Our Flagship Product

**EchoMind** is presented through the landing pages here and supports:

- 🎙️ Real-time voice interaction in 10+ languages
- 🧠 Contextual memory and personalization
- 📚 Interactive language-learning features and pronunciation cues
- 🔤 Grammar analysis and text enhancement
- 💬 Social/community interactions for communication practice

**Try EchoMind:** [chat.lazying.art](https://chat.lazying.art)

## 🚀 Quick Start

This repository hosts the LazyingArt website at [lazying.art](https://lazying.art).

### Local development

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Open directly:

```bash
# macOS
open index.html

# Alternative no-dependency server
python -m http.server 8000
# then open http://localhost:8000
```

### Deployment

GitHub Pages is the main deployment target. Changes pushed to `main` should publish to the custom domain through the repository’s Pages settings and `CNAME` file.

## ✨ Features

| Area | Details |
|---|---|
| Architecture | Framework-free static implementation (HTML/CSS/vanilla JavaScript). |
| Pages | Main landing page plus dedicated pages: `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html`. |
| Localization | 13 locales supported in runtime language logic (`en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr`). |
| i18n Runtime | In-page `[data-i18n]` keys with dictionary replacement. |
| Persistence | Language + theme preferences persisted by `localStorage`. |
| Commerce | Stripe buy button integration via `https://js.stripe.com/v3/buy-button.js`. |
| Smart defaults | Geolocation-assisted language detection on the main page (`ipapi.co` + `ipwho.is` fallback). |
| SEO/Domain | `CNAME`, `_config.yml`, and `sitemap.xml` for GitHub Pages metadata and routing. |

## 📁 Project Structure

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
├── logos/
├── logos-legacy/
├── figs/
├── demos/
├── app/
│   └── donate/
├── donate/
├── product-assets/
├── i18n/
└── .github/
    └── FUNDING.yml
```

Older references in previous drafts (e.g., `robots.txt`, `.nojekyll`, `assets/`) are no longer present in the current repository snapshot and were kept only as historical context.

## 🛠️ Technologies

- HTML5 / CSS3 / vanilla JavaScript (no framework dependency)
- Glassmorphism-inspired visual system and responsive layouts
- Progressive enhancement for interactive sections
- SEO-oriented metadata, custom domain routing, and sitemap support
- Jekyll-compatible GitHub Pages configuration (`jekyll-sitemap`, `jekyll-seo-tag`)

## 📦 Prerequisites

- Modern browser (Chrome, Firefox, Safari, Edge)
- Git (for cloning and collaboration)
- Python 3 (optional, for local static serving)

No Node.js build toolchain is required for standard local work.

## 🔧 Installation

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Repository path and clone URI may vary by fork. Use your repository URL when contributing via pull request.

## ▶️ Usage

Primary page routes:

- Landing: `index.html`
- Robot: `robot.html`
- E-ink product: `eink-words-card.html`
- OpenHI kit: `openhi-kit.html`

Local flow:

1. Open `index.html`
2. Explore product ecosystem sections
3. Navigate to page-specific details and external experiences (`chat.lazying.art`, `onlyideas.art`, `coin.lazying.art`)
4. Use hosted Stripe buttons for commerce actions on product pages

## ⚙️ Configuration

- `_config.yml`
  - Site metadata (`title`, `description`, `url`)
  - SEO and social metadata
  - GitHub Pages plugin settings
  - Note: `google_analytics` currently contains placeholder ID (`UA-XXXXXXXXX-X`)
- `CNAME`
  - Binds custom domain (`lazying.art`) for Pages
- Runtime scripts embedded in HTML
  - Language/theme initialization
  - `supportedLangs` with locale metadata
  - Translation dictionaries and `[data-i18n]` interpolation
  - Theme and language preference persistence in `localStorage`

_Assumption:_ `google_analytics` is not active until a real tracking ID replaces the placeholder.

## 🧪 Examples

Start a local server and validate pages quickly:

```bash
python -m http.server 8000
```

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

Reset persisted preferences in the browser console:

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 Development Notes

- Static-first architecture keeps maintenance and hosting simple.
- Locale behavior and theme switches are implemented inline on each page.
- There is no `package.json`, no transpilation, and no automated test suite.
- `i18n/README.*.md` exists for translated docs, while page translations are currently embedded in page scripts.
- `donate/`, `app/donate/`, and `product-assets/` currently appear as reserved placeholders.
- Recommended workflow: local static edit → browser validation (desktop/mobile) → link checks.

## 📊 Performance

Prior README target profile claims:

- ⚡ < 1s First Contentful Paint
- 📱 Mobile-first responsive layout
- ♿ WCAG-oriented accessibility practices in structure
- 🎯 Lighthouse-focused optimization profile

These values should be re-measured after major UI changes.

## 🛠️ Troubleshooting

| Symptom | Check |
|---|---|
| Page looks unstyled after launch | Serve via `http://localhost:8000` (do not open as plain `file://`) |
| Stripe button fails to load | Confirm network access to `https://js.stripe.com/v3/buy-button.js` |
| Language does not switch | Clear `localStorage` keys (`lang`, `theme`) and reload |
| Pages route mismatch on Pages | Confirm `CNAME`, branch deployment target, and `_config.yml` values |
| SEO metadata stale | Update `sitemap.xml` after route or content additions |

## 🗺️ Roadmap

- Keep README and repository structure in sync with production pages
- Expand `i18n/` docs with complete parity and regular updates
- Extract shared runtime logic into reusable modules to reduce page duplication
- Add link checks and lightweight HTML/format validation in CI
- Replace placeholder analytics configuration when finalized
- Add contributor guidance for localization QA and screenshot review

## 🤝 Contributing

1. Fork the repository.
2. Create a descriptive branch (for example, `docs/update-landing-copy`).
3. Edit the relevant HTML and `i18n` docs.
4. Validate desktop and mobile rendering and language/theme toggles.
5. Open a PR with clear screenshots or screen recordings for user-facing changes.

Please keep updates small and focused (content, accessibility, and responsive behavior have highest review priority).

## ❤️ Support

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://camo.githubusercontent.com/24a4914f0b42c6f435f9e101621f1e52535b02c225764b2f6cc99416926004b7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446f6e6174652d4c617a79696e674172742d3045413545393f7374796c653d666f722d7468652d6261646765266c6f676f3d6b6f2d6669266c6f676f436f6c6f723d7768697465)](https://chat.lazying.art/donate) | [![PayPal](https://camo.githubusercontent.com/d0f57e8b016517a4b06961b24d0ca87d62fdba16e18bbdb6aba28e978dc0ea21/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50617950616c2d526f6e677a686f754368656e2d3030343537433f7374796c653d666f722d7468652d6261646765266c6f676f3d70617970616c266c6f676f436f6c6f723d7768697465)](https://paypal.me/RongzhouChen) | [![Stripe](https://camo.githubusercontent.com/1152dfe04b6943afe3a8d2953676749603fb9f95e24088c92c97a01a897b4942/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5374726970652d446f6e6174652d3633354246463f7374796c653d666f722d7468652d6261646765266c6f676f3d737472697065266c6f676f436f6c6f723d7768697465)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |

## 📄 License

No dedicated `LICENSE` file is present in this repository snapshot.

Please confirm the official project license with project ownership and add the full license reference here.
