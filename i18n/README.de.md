[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# LazyingArt - Offizielle Website

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

### 📌 Kurzüberblick

| Punkt | Info |
| --- | --- |
| ✅ Repo-Schwerpunkt | Mehrsprachige Marketing-Site mit Produkteinstiegspunkten für LazyingArt |
| 🌍 Zielgruppe | Besucher, Sprachlernende, Partner und Beitragende |
| 🧩 Kernseiten | `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| 🧱 Laufzeit | HTML/CSS/vanilla JS mit lokalisierter Texteinbindung |

## 🎨 Über LazyingArt

LazyingArt ist eine mehrsprachige KI-Kommunikationsplattform und ein Landing-Page-Ökosystem. Dieses Repository enthält die öffentliche Website und die Produktseiten von LazyingArt, einschließlich der Leitseite **EchoMind** und unterstützender Hardware-Seiten.

- **Mission:** Sprachübergreifende Kommunikation natürlich, schnell und menschlich wirken lassen.
- **Scope:** Browser-first statische Website, bereitgestellt über GitHub Pages.
- **Zielgruppe:** Besucher, Produktteams, Partner und Beitragende.

## 🌍 EchoMind - Unser Flagship-Produkt

**EchoMind** wird über die Landingpages hier präsentiert und unterstützt:

- 🎙️ Echtzeit-Sprachinteraktion in über 10 Sprachen
- 🧠 Kontextuelles Gedächtnis und Personalisierung
- 📚 Interaktive Sprachlern-Funktionen und Aussprachehilfen
- 🔤 Grammatikanalyse und Textverbesserung
- 💬 Soziale/Community-Interaktionen für Kommunikationspraxis

**EchoMind testen:** [chat.lazying.art](https://chat.lazying.art)

## 🚀 Schnellstart

Dieses Repository hostet die LazyingArt-Website unter [lazying.art](https://lazying.art).

### Lokale Entwicklung

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Direkt öffnen:

```bash
# macOS
open index.html

# Server ohne Abhängigkeiten
python -m http.server 8000
# dann http://localhost:8000 öffnen
```

### Bereitstellung

GitHub Pages ist das primäre Deployment-Ziel. Änderungen, die nach `main` gepusht werden, sollten über die Pages-Einstellungen des Repositories und die `CNAME`-Datei auf die eigene Domain veröffentlicht werden.

## ✨ Funktionen

| Bereich | Details |
|---|---|
| Architektur | Framework-freie statische Umsetzung (HTML/CSS/vanilla JavaScript). |
| Seiten | Haupt-Landingpage plus dedizierte Seiten: `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html`. |
| Lokalisierung | 13 aktive Sprachfassungen im Laufzeit-Selektor (`en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr`). |
| i18n Runtime | In-page-Schlüssel `[data-i18n]` mit Wörterbuchersatz. |
| Persistenz | Sprach- und Theme-Einstellungen werden in `localStorage` gespeichert. |
| Commerce | Stripe Buy-Button-Integration über `https://js.stripe.com/v3/buy-button.js`. |
| Intelligente Standardwerte | Geolocation-unterstützte Sprachenerkennung auf der Hauptseite (`ipapi.co` + `ipwho.is` Fallback). |
| SEO/Domain | `CNAME`, `_config.yml` und `sitemap.xml` für GitHub Pages-Metadaten und Routing. |

## 📁 Projektstruktur

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

Ältere Verweise aus früheren Entwürfen (z. B. `robots.txt`, `.nojekyll`, `assets/`) sind in der aktuellen Repository-Snapshot nicht mehr vorhanden und wurden nur als historischer Kontext beibehalten.

## 🛠️ Technologien

- HTML5 / CSS3 / vanilla JavaScript (keine Framework-Abhängigkeit)
- Glassmorphism-inspiriertes visuelles System und responsive Layouts
- Progressive Enhancement für interaktive Abschnitte
- SEO-orientierte Metadaten, benutzerdefiniertes Domain-Routing und Sitemap-Unterstützung
- Jekyll-kompatible GitHub Pages-Konfiguration (`jekyll-sitemap`, `jekyll-seo-tag`)

## 📦 Voraussetzungen

- Moderner Browser (Chrome, Firefox, Safari, Edge)
- Git (zum Klonen und Zusammenarbeiten)
- Python 3 (optional für lokales statisches Serving)

Für Standardarbeiten ist keine Node.js-Build-Toolchain erforderlich.

## 🔧 Installation

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Der Repository-Pfad und die Clone-URI können je nach Fork variieren. Verwenden Sie für Beiträge per Pull Request die URL Ihres Repositories.

## ▶️ Nutzung

Hauptseiten-Routen:

- Landing: `index.html`
- Robot: `robot.html`
- E-Ink-Produkt: `eink-words-card.html`
- OpenHI-Kit: `openhi-kit.html`

Lokaler Ablauf:

1. `index.html` öffnen
2. Produkt-Ökosystem-Bereiche erkunden
3. Zu seiten-spezifischen Details und externen Erlebnissen navigieren (`chat.lazying.art`, `onlyideas.art`, `coin.lazying.art`)
4. Auf Produktseiten die bereitgestellten Stripe-Buttons für Kaufvorgänge verwenden

## ⚙️ Konfiguration

- `_config.yml`
  - Metadaten der Site (`title`, `description`, `url`)
  - SEO- und Social-Metadaten
  - Einstellungen der GitHub Pages-Plugins
  - Hinweis: `google_analytics` enthält derzeit eine Platzhalter-ID (`UA-XXXXXXXXX-X`)
- `CNAME`
  - Bindet die benutzerdefinierte Domain (`lazying.art`) für Pages
- Laufzeit-Skripte, die in HTML eingebettet sind
  - Sprach-/Theme-Initialisierung
  - `supportedLangs` mit Locale-Metadaten
  - Übersetzungswörterbücher und `[data-i18n]`-Interpolation
  - Theme- und Sprachpräferenz-Persistenz in `localStorage`

_Hypothese:_ `google_analytics` ist nicht aktiv, bis eine echte Tracking-ID den Platzhalter ersetzt.

## 🧪 Beispiele

Starten Sie einen lokalen Server und prüfen Sie die Seiten schnell:

```bash
python -m http.server 8000
```

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

Zurücksetzen gespeicherter Einstellungen in der Browser-Konsole:

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 Entwicklungsnotizen

- Static-first-Architektur hält Wartung und Hosting einfach.
- Locale-Verhalten und Theme-Umschalter sind direkt auf jeder Seite inline implementiert.
- Es gibt keine `package.json`, kein Transpiling und keine automatisierte Test-Suite.
- `i18n/README.*.md` ist für übersetzte Dokumente vorhanden, während Seitenübersetzungen aktuell in Seitenskripten eingebettet sind.
- `donate/`, `app/donate/` und `product-assets/` sind derzeit vor allem als Platzhalterbereiche vorhanden.
- Empfohlener Ablauf: lokale statische Bearbeitung → Browser-Validierung (Desktop/Mobil) → Link-Checks.

## 📊 Performance

Frühere Zielwerte aus der README:

- ⚡ < 1s First Contentful Paint
- 📱 Mobile-first responsives Layout
- ♿ WCAG-orientierte Accessibility-Praktiken in der Struktur
- 🎯 Lighthouse-orientiertes Optimierungsprofil

Diese Werte sollten nach größeren UI-Änderungen erneut gemessen werden.

## 🛠️ Fehlerbehebung

| Symptom | Prüfung |
|---|---|
| Seite erscheint nach dem Start ungestylt | Über `http://localhost:8000` bereitstellen (nicht als reine `file://` öffnen) |
| Stripe-Button lädt nicht | Netzwerkzugriff auf `https://js.stripe.com/v3/buy-button.js` prüfen |
| Sprache wechselt nicht | `localStorage`-Schlüssel (`lang`, `theme`) löschen und neu laden |
| Seitenroutenfehler auf Pages | `CNAME`, Ziel-Branch für Deployment und Werte in `_config.yml` prüfen |
| SEO-Metadaten veraltet | `sitemap.xml` nach Inhalts- oder Routenänderungen aktualisieren |

## 🗺️ Roadmap

- README und Repository-Struktur mit den Produktionsseiten synchron halten
- `i18n/`-Dokumente schrittweise vollständig angleichen und regelmäßig aktualisieren
- Gemeinsame Laufzeitlogik in wiederverwendbare Module auslagern, um Seitenduplikation zu reduzieren
- Link-Checks und leichte HTML/Format-Validierung in CI ergänzen
- Platzhalter-Analytics-Konfiguration ersetzen, sobald finalisiert
- Leitfaden für Beitragende zu Lokalisierungs-QA und Screenshot-Review hinzufügen

## 🤝 Mitwirken

1. Repository forken.
2. Einen beschreibenden Branch erstellen (zum Beispiel `docs/update-landing-copy`).
3. Die relevante HTML-Datei und die `i18n`-Dokumentation bearbeiten.
4. Desktop- und Mobile-Darstellung sowie Sprach-/Theme-Umschalter validieren.
5. Bei benutzerwirksamen Änderungen einen PR mit klaren Screenshots oder Bildschirmaufnahmen öffnen.

Bitte halten Sie Änderungen klein und fokussiert (Inhalte, Barrierefreiheit und responsives Verhalten haben die höchste Review-Priorität).

## 📄 Lizenz

Es ist in diesem Repository-Snapshot keine dedizierte `LICENSE`-Datei vorhanden.

Bitte bestätigen Sie die offizielle Projektlizenz mit dem Projektverantwortlichen und ergänzen Sie hier den vollständigen Lizenzverweis.


## ❤️ Support

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://camo.githubusercontent.com/24a4914f0b42c6f435f9e101621f1e52535b02c225764b2f6cc99416926004b7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446f6e6174652d4c617a79696e674172742d3045413545393f7374796c653d666f722d7468652d6261646765266c6f676f3d6b6f2d6669266c6f676f436f6c6f723d7768697465)](https://chat.lazying.art/donate) | [![PayPal](https://camo.githubusercontent.com/d0f57e8b016517a4b06961b24d0ca87d62fdba16e18bbdb6aba28e978dc0ea21/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50617950616c2d526f6e677a686f754368656e2d3030343537433f7374796c653d666f722d7468652d6261646765266c6f676f3d70617970616c266c6f676f436f6c6f723d7768697465)](https://paypal.me/RongzhouChen) | [![Stripe](https://camo.githubusercontent.com/1152dfe04b6943afe3a8d2953676749603fb9f95e24088c92c97a01a897b4942/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5374726970652d446f6e6174652d3633354246463f7374796c653d666f722d7468652d6261646765266c6f676f3d737472697065266c6f676f436f6c6f723d7768697465)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |
