[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


<p align="center">
  <img src="https://raw.githubusercontent.com/lachlanchen/lachlanchen/main/logos/banner.png" alt="Bannière LazyingArt" />
</p>

🌐 **Langues :** **Anglais (actuel)** | Autres langues : prévues via le pipeline `i18n/`

# LazyingArt - Site officiel

<p align="left">
  <a href="https://lazying.art"><img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Flazying.art&label=Lazying.art&color=00A86B"></a>
  <a href="https://chat.lazying.art"><img alt="EchoMind" src="https://img.shields.io/badge/EchoMind-Try%20Now-4F46E5"></a>
  <a href="https://pages.github.com/"><img alt="GitHub Pages" src="https://img.shields.io/badge/Deploy-GitHub%20Pages-24292F"></a>
  <img alt="Stack" src="https://img.shields.io/badge/Stack-HTML%2FCSS%2FJS-FF6B35">
  <img alt="Locales" src="https://img.shields.io/badge/Locales-13-blue">
</p>

## 🎨 À propos de LazyingArt

LazyingArt ouvre la voie vers l’avenir de la communication IA multilingue. Nous pensons que la technologie doit faire tomber les barrières, pas en créer. Notre mission est de rendre la communication mondiale aussi naturelle que la respiration.

Ce dépôt contient le site public et les pages produit de l’écosystème LazyingArt, y compris EchoMind et des pages de produits matériels.

## 🌍 EchoMind - Notre produit phare

**EchoMind** est notre compagnon IA multilingue révolutionnaire avec :

- 🎙️ Interaction vocale en temps réel dans plus de 10 langues
- 🧠 Mémoire contextuelle et personnalisation
- 📚 Apprentissage interactif des langues avec guides de prononciation
- 🔤 Analyse grammaticale et amélioration
- 💬 Fonctionnalités sociales pour se connecter aux autres

**Essayer EchoMind** : [chat.lazying.art](https://chat.lazying.art)

## 🚀 Démarrage rapide

Ce dépôt héberge le site de l’entreprise LazyingArt sur [lazying.art](https://lazying.art).

### Développement local

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

### Déploiement

Le site est déployé automatiquement via GitHub Pages lorsque des changements sont poussés sur la branche `main`.

## ✨ Fonctionnalités

| Zone | Détails |
|---|---|
| Architecture | Implémentation statique sans framework (HTML/CSS/JavaScript vanilla). |
| Pages | Page marketing principale + pages produits dédiées : `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| Localisation | Prise en charge UI multilingue avec 13 locales intégrées dans les scripts de page : `en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr` |
| Moteur i18n | Remplacement des textes localisés via les clés `[data-i18n]` |
| Persistance | Préférences de langue + thème enregistrées via `localStorage` |
| Commerce | Intégration du bouton d’achat Stripe pour les parcours de paiement |
| Valeurs par défaut intelligentes | Détection de langue assistée par géolocalisation sur la page principale (`ipapi.co` avec repli `ipwho.is`) |
| SEO/Domaine | `CNAME`, `_config.yml`, `sitemap.xml` |

## 📁 Structure du projet

Arborescence actuelle du dépôt :

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

Bloc de structure historique de l’ancien README (conservé pour continuité) :

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

- HTML5/CSS3/JavaScript purs (aucune dépendance framework)
- Effets Glassmorphism et CSS moderne
- Design responsive
- Progressive enhancement
- Optimisé SEO
- Widgets Stripe de bouton d’achat hébergé (`https://js.stripe.com/v3/buy-button.js`)
- GitHub Pages + configuration Jekyll pour métadonnées/plugins

## 📦 Prérequis

- Un navigateur moderne (Chrome, Firefox, Safari, Edge).
- Python 3 (optionnel, pour un serveur statique local).
- Git (pour cloner et collaborer).

Aucune toolchain Node.js de build n’est requise pour l’édition/test local standard.

## 🔧 Installation

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Exécution en local :

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## ▶️ Utilisation

Pages principales :

- Page d’accueil : `http://localhost:8000/index.html`
- Page produit Robot : `http://localhost:8000/robot.html`
- Page produit E-ink : `http://localhost:8000/eink-words-card.html`
- Page kit OpenHI : `http://localhost:8000/openhi-kit.html`

Parcours utilisateur typique :

1. Visiter `index.html`.
2. Explorer les sections de l’écosystème et les cartes produits.
3. Naviguer vers les détails produits ou ouvrir les applications externes (`chat.lazying.art`, `onlyideas.art`, `coin.lazying.art`).
4. Utiliser les boutons d’achat Stripe sur les pages produits.

## ⚙️ Configuration

La configuration est basée sur les fichiers et majoritairement inline :

- `_config.yml`
  - Métadonnées du site (`title`, `description`, `url`)
  - Métadonnées sociales
  - Plugins GitHub Pages (`jekyll-sitemap`, `jekyll-seo-tag`)
  - Paramètres de compression HTML
  - `google_analytics` est actuellement un placeholder (`UA-XXXXXXXXX-X`)
- `CNAME`
  - Mapping de domaine personnalisé pour GitHub Pages (`lazying.art`)
- JS inline dans chaque page
  - liste de locales `supportedLangs`
  - dictionnaires de traduction
  - gestion de l’état langue/thème (`localStorage`)

Hypothèse : l’analytics n’est pas actif tant qu’un ID analytics réel ne remplace pas le placeholder.

## 🧪 Exemples

Servir le site complet en local :

```bash
python -m http.server 8000
```

Valider rapidement les endpoints principaux :

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

Réinitialiser les préférences UI enregistrées dans la console navigateur :

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 Notes de développement

- Le projet est volontairement statique et sans framework.
- La plupart des comportements (i18n, thème, UI d’interaction produit) sont implémentés inline par page.
- Il n’existe actuellement ni manifeste de paquets (`package.json`), ni suite de tests automatisés dans ce dépôt.
- `i18n/` existe mais est actuellement vide ; les chaînes de localisation sont intégrées dans les fichiers HTML.
- Des dossiers vides comme `donate/`, `app/donate/` et `product-assets/` semblent réservés pour un usage futur.

Flux d’édition recommandé :

1. Lancer un serveur statique local.
2. Faire les modifications de page.
3. Vérifier la mise en page desktop/mobile et les bascules langue/thème.
4. Vérifier les liens externes et le chargement du widget Stripe.

## 📊 Performance

Comme indiqué dans le profil cible de l’ancien README :

- ⚡ <1s First Contentful Paint
- 📱 100% Mobile-friendly
- ♿ WCAG 2.1 AA Compliant
- 🎯 100/100 Lighthouse Score

Hypothèse : remesurer ces métriques après des mises à jour visuelles ou script importantes.

## 🛠️ Dépannage

| Symptôme | Vérification |
|---|---|
| Le serveur local démarre mais les pages semblent sans style | Assurez-vous d’ouvrir via `http://localhost:8000` et non dans un contexte de fichier local bloqué. |
| Le bouton d’achat Stripe ne s’affiche pas | Confirmez l’accès internet et que `https://js.stripe.com/v3/buy-button.js` est joignable. |
| La langue ne change pas comme prévu | Effacez les clés `localStorage` (`lang`, `theme`) puis rechargez. |
| Décalage de déploiement sur GitHub Pages | Vérifiez la publication de la branche `main`, `CNAME` et les valeurs de `_config.yml`. |
| Les fichiers SEO semblent obsolètes | Mettez à jour les entrées et horodatages de `sitemap.xml` lors de l’ajout/suppression de pages. |

## 🗺️ Feuille de route

- Garder le README et la documentation de structure du dépôt synchronisés avec les pages de production.
- Ajouter/maintenir les variantes multilingues de README dans `i18n/` via les étapes du pipeline README.
- Envisager de centraliser le JS/CSS inline répété dans des assets partagés pour réduire la duplication.
- Ajouter des vérifications automatisées des liens cassés et une validation HTML de base.
- Remplacer la configuration analytics placeholder lorsque l’analytics de production sera finalisé.

## 🤝 Contribution

Nous accueillons les contributions ! N’hésitez pas à soumettre une Pull Request.

Flux de contribution recommandé :

1. Forker le dépôt.
2. Créer une branche de fonctionnalité.
3. Tester les pages en local.
4. Ouvrir une PR avec des captures d’écran pour les changements visuels.

## ❤️ Support / Sponsoring

Si vous souhaitez soutenir le projet :

- GitHub Sponsors: [lachlanchen](https://github.com/sponsors/lachlanchen)
- Website: [lazying.art](https://lazying.art)
- Product: [chat.lazying.art](https://chat.lazying.art)
- Ecosystem: [onlyideas.art](https://onlyideas.art)

Source des métadonnées de financement : `.github/FUNDING.yml`.

## 📝 Licence

© 2024 LazyingArt. Tous droits réservés.

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
