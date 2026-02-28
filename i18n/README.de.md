[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


<p align="center">
  <img src="https://raw.githubusercontent.com/lachlanchen/lachlanchen/main/logos/banner.png" alt="LazyingArt banner" />
</p>

# LazyingArt - Offizielle Website

<p align="left">
  <a href="https://lazying.art"><img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Flazying.art&label=Lazying.art&color=00A86B"></a>
  <a href="https://chat.lazying.art"><img alt="EchoMind" src="https://img.shields.io/badge/EchoMind-Try%20Now-4F46E5"></a>
  <a href="https://pages.github.com/"><img alt="GitHub Pages" src="https://img.shields.io/badge/Deploy-GitHub%20Pages-24292F"></a>
  <img alt="Stack" src="https://img.shields.io/badge/Stack-HTML%2FCSS%2FJS-FF6B35">
  <img alt="Locales" src="https://img.shields.io/badge/Locales-13-blue">
</p>

## 🎨 Über LazyingArt

LazyingArt gestaltet die Zukunft der mehrsprachigen KI-Kommunikation. Wir sind überzeugt, dass Technologie Barrieren abbauen statt neue schaffen sollte. Unsere Mission ist es, globale Kommunikation so natürlich wie das Atmen zu machen.

Dieses Repository enthält die öffentliche Website und die Produkt-Landingpages des LazyingArt-Ökosystems, einschließlich EchoMind und Hardware-Produktseiten.

## 🌍 EchoMind - Unser Flaggschiffprodukt

**EchoMind** ist unser revolutionärer mehrsprachiger KI-Begleiter mit folgenden Funktionen:

- 🎙️ Sprachinteraktion in Echtzeit in über 10 Sprachen
- 🧠 Kontextuelles Gedächtnis und Personalisierung
- 📚 Interaktives Sprachenlernen mit Aussprachehilfen
- 🔤 Grammatikanalyse und -verbesserung
- 💬 Soziale Funktionen, um sich mit anderen zu vernetzen

**EchoMind ausprobieren**: [chat.lazying.art](https://chat.lazying.art)

## 🚀 Schnellstart

Dieses Repository hostet die LazyingArt-Unternehmenswebsite unter [lazying.art](https://lazying.art).

### Lokale Entwicklung

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

Die Website wird automatisch über GitHub Pages bereitgestellt, sobald Änderungen in den Branch `main` gepusht werden.

## ✨ Funktionen

| Bereich | Details |
|---|---|
| Architektur | Framework-freie statische Implementierung (HTML/CSS/Vanilla JavaScript). |
| Seiten | Haupt-Marketingseite plus dedizierte Produktseiten: `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| Lokalisierung | Mehrsprachige UI-Unterstützung mit 13 in Seitenskripte eingebetteten Locales: `en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr` |
| i18n Runtime | Ersetzung lokalisierter Texte über `[data-i18n]`-Schlüssel |
| Persistenz | Sprachpräferenz + Theme-Präferenz werden über `localStorage` gespeichert |
| Commerce | Stripe Buy Button-Integration für Checkout-Flows |
| Smarte Standardwerte | Geolokationsgestützte Spracherkennung auf der Hauptseite (`ipapi.co` mit `ipwho.is`-Fallback) |
| SEO/Domain | `CNAME`, `_config.yml`, `sitemap.xml` |

## 📁 Projektstruktur

Aktuelles Repository-Layout:

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

Legacy-Strukturblock aus der vorherigen README (zur Kontinuität beibehalten):

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

## 🛠️ Technologien

- Reines HTML5/CSS3/JavaScript (keine Framework-Abhängigkeiten)
- Glassmorphism und moderne CSS-Effekte
- Responsives Design
- Progressive Enhancement
- SEO-optimiert
- Stripe gehostete Buy Button-Widgets (`https://js.stripe.com/v3/buy-button.js`)
- GitHub Pages + Jekyll-Konfiguration für Metadaten/Plugins

## 📦 Voraussetzungen

- Ein moderner Browser (Chrome, Firefox, Safari, Edge).
- Python 3 (optional, für einen lokalen statischen Server).
- Git (zum Klonen und für die Zusammenarbeit).

Für normales lokales Bearbeiten/Testen ist keine Node.js-Build-Toolchain erforderlich.

## 🔧 Installation

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Lokal ausführen:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## ▶️ Verwendung

Hauptseiten:

- Landingpage: `http://localhost:8000/index.html`
- Robot-Produktseite: `http://localhost:8000/robot.html`
- E-Ink-Produktseite: `http://localhost:8000/eink-words-card.html`
- OpenHI-Kit-Seite: `http://localhost:8000/openhi-kit.html`

Typischer Nutzerfluss:

1. `index.html` aufrufen.
2. Ökosystem-Bereiche und Produktkarten erkunden.
3. Zu Produktdetails navigieren oder externe Apps öffnen (`chat.lazying.art`, `onlyideas.art`, `coin.lazying.art`).
4. Stripe Buy Buttons auf Produktseiten verwenden.

## ⚙️ Konfiguration

Die Konfiguration ist dateibasiert und größtenteils inline:

- `_config.yml`
  - Site-Metadaten (`title`, `description`, `url`)
  - Social-Metadaten
  - GitHub Pages-Plugins (`jekyll-sitemap`, `jekyll-seo-tag`)
  - HTML-Komprimierungseinstellungen
  - `google_analytics` ist aktuell ein Platzhalter (`UA-XXXXXXXXX-X`)
- `CNAME`
  - Zuordnung der Custom Domain für GitHub Pages (`lazying.art`)
- Inline-JS auf jeder Seite
  - `supportedLangs`-Locale-Liste
  - Übersetzungs-Dictionaries
  - Zustandsverwaltung für Sprache/Theme (`localStorage`)

Annahme: Analytics ist nicht aktiv, bis eine echte Analytics-ID den Platzhalter ersetzt.

## 🧪 Beispiele

Die gesamte Website lokal bereitstellen:

```bash
python -m http.server 8000
```

Wichtige Endpunkte schnell prüfen:

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

Gespeicherte UI-Präferenzen in der Browser-Konsole zurücksetzen:

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 Hinweise zur Entwicklung

- Das Projekt ist bewusst statisch und framework-frei.
- Der Großteil des Verhaltens (i18n, Theme, Produktinteraktions-UI) ist pro Seite inline implementiert.
- Derzeit gibt es in diesem Repository weder ein Package-Manifest (`package.json`) noch eine automatisierte Test-Suite.
- `i18n/` existiert, ist aber aktuell leer; Lokalisierungs-Strings sind in die HTML-Dateien eingebettet.
- Leere Verzeichnisse wie `donate/`, `app/donate/` und `product-assets/` scheinen für künftige Nutzung reserviert zu sein.

Empfohlener Bearbeitungsablauf:

1. Lokalen statischen Server starten.
2. Seiten bearbeiten.
3. Desktop-/Mobile-Layout sowie Sprach-/Theme-Toggles prüfen.
4. Externe Links und Laden des Stripe-Widgets prüfen.

## 📊 Performance

Wie im Zielprofil der vorherigen README angegeben:

- ⚡ <1s First Contentful Paint
- 📱 100% mobilfreundlich
- ♿ WCAG 2.1 AA-konform
- 🎯 100/100 Lighthouse Score

Annahme: Diese Metriken nach größeren visuellen oder Skript-Updates erneut messen.

## 🛠️ Fehlerbehebung

| Symptom | Prüfen |
|---|---|
| Lokaler Server startet, aber Seiten sehen ungestylt aus | Sicherstellen, dass du über `http://localhost:8000` aufrufst und nicht in einem blockierten lokalen Dateikontext. |
| Stripe Buy Button wird nicht gerendert | Internetzugang prüfen und sicherstellen, dass `https://js.stripe.com/v3/buy-button.js` erreichbar ist. |
| Sprache ändert sich nicht wie erwartet | `localStorage`-Schlüssel (`lang`, `theme`) löschen und neu laden. |
| Deployment-Abweichung auf GitHub Pages | Publishing-Einstellungen für Branch `main`, `CNAME` und Werte in `_config.yml` prüfen. |
| SEO-Dateien wirken veraltet | Einträge und Zeitstempel in `sitemap.xml` beim Hinzufügen/Entfernen von Seiten aktualisieren. |

## 🗺️ Roadmap

- README und Dokumentation der Repository-Struktur mit den Produktivseiten synchron halten.
- Mehrsprachige README-Varianten in `i18n/` als Teil der README-Pipeline-Schritte hinzufügen/pflegen.
- Erwägen, wiederholtes Inline-JS/CSS in gemeinsame Assets auszulagern, um Duplikation zu reduzieren.
- Automatisierte Checks für defekte Links und grundlegende HTML-Validierung hinzufügen.
- Platzhalter-Analytics-Konfiguration ersetzen, sobald produktive Analytics finalisiert sind.

## 🤝 Beiträge

Wir freuen uns über Beiträge! Reiche gerne einen Pull Request ein.

Empfohlener Beitrags-Workflow:

1. Repository forken.
2. Feature-Branch erstellen.
3. Seiten lokal testen.
4. PR mit Screenshots bei visuellen Änderungen öffnen.

## ❤️ Support / Sponsoring

Wenn du das Projekt unterstützen möchtest:

- GitHub Sponsors: [lachlanchen](https://github.com/sponsors/lachlanchen)
- Website: [lazying.art](https://lazying.art)
- Produkt: [chat.lazying.art](https://chat.lazying.art)
- Ökosystem: [onlyideas.art](https://onlyideas.art)

Quelle der Funding-Metadaten: `.github/FUNDING.yml`.

## 📝 Lizenz

© 2024 LazyingArt. Alle Rechte vorbehalten.

## 📧 Kontakt

- Website: [lazying.art](https://lazying.art)
- Produkt: [chat.lazying.art](https://chat.lazying.art)
- E-Mail: contact@lazying.art
- Twitter: [@lazyingart](https://twitter.com/lazyingart)

---

<p align="center">Built with ❤️ by the LazyingArt Team</p>
<p align="center">
  <a href="https://lazying.art">Website</a> •
  <a href="https://chat.lazying.art">Try EchoMind</a> •
  <a href="https://twitter.com/lazyingart">Twitter</a>
</p>
