[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# LazyingArt - Site officiel

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

### 📌 En bref

| Élément | Infos |
| --- | --- |
| ✅ Focus du dépôt | Site marketing multilingue avec points d’entrée produit pour LazyingArt |
| 🌍 Public | Visiteurs, apprenants de langues, collaborateurs, contributeurs |
| 🧩 Pages principales | `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| 🧱 Runtime | HTML/CSS/JS vanille avec interpolation de texte localisé |

## 🎨 À propos de LazyingArt

LazyingArt est une plateforme de communication IA multilingue et un écosystème de pages d’atterrissage. Ce dépôt contient le site web public et les pages produit de LazyingArt, y compris l’expérience phare **EchoMind** ainsi que les pages hardware associées.

- **Mission :** rendre la communication interlingue naturelle, rapide et proche de l’humain.
- **Périmètre :** site web statique orienté navigateur déployé via GitHub Pages.
- **Public cible :** visiteurs, équipes produit, collaborateurs et contributeurs.

## 🌍 EchoMind - Notre produit phare

**EchoMind** est présenté via les pages de destination de ce dépôt et prend en charge :

- 🎙️ Interaction vocale en temps réel dans plus de 10 langues
- 🧠 Mémoire contextuelle et personnalisation
- 📚 Fonctionnalités interactives d’apprentissage des langues avec repères de prononciation
- 🔤 Analyse grammaticale et amélioration textuelle
- 💬 Interactions sociales et communautaires pour s’entraîner à communiquer

**Essayer EchoMind :** [chat.lazying.art](https://chat.lazying.art)

## 🚀 Démarrage rapide

Ce dépôt héberge le site web LazyingArt sur [lazying.art](https://lazying.art).

### Développement local

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Ouverture directe :

```bash
# macOS
open index.html

# Serveur sans dépendance alternative
python -m http.server 8000
# puis ouvrir http://localhost:8000
```

### Déploiement

GitHub Pages est la cible principale de déploiement. Les changements poussés sur `main` sont publiés sur le domaine personnalisé via les paramètres Pages du dépôt et le fichier `CNAME`.

## ✨ Fonctionnalités

| Domaine | Détails |
|---|---|
| Architecture | Implémentation statique sans framework (HTML/CSS/vanilla JavaScript). |
| Pages | Page principale de destination + pages dédiées : `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html`. |
| Localisation | 13 locales prises en charge dans la logique i18n runtime (`en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr`). |
| Runtime i18n | Remplacement des textes via les clés `[data-i18n]` dans la page. |
| Persistance | Préférences de langue + thème conservées via `localStorage`. |
| Commerce | Intégration de boutons d’achat Stripe via `https://js.stripe.com/v3/buy-button.js`. |
| Réglages intelligents | Détection de langue assistée par géolocalisation sur la page d’accueil (`ipapi.co` + repli `ipwho.is`). |
| SEO/Domaine | `CNAME`, `_config.yml` et `sitemap.xml` pour les métadonnées GitHub Pages et le routage. |

## 📁 Structure du projet

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

Les références plus anciennes dans les versions préalables (par exemple `robots.txt`, `.nojekyll`, `assets/`) ne sont plus présentes dans l’instantané actuel du dépôt et ont été conservées uniquement comme contexte historique.

## 🛠️ Technologies

- HTML5 / CSS3 / JavaScript vanille (sans dépendance framework)
- Système visuel inspiré du glassmorphism et mises en page responsive
- Amélioration progressive pour les sections interactives
- Métadonnées orientées SEO, routage de domaine personnalisé, et prise en charge du sitemap
- Configuration GitHub Pages compatible Jekyll (`jekyll-sitemap`, `jekyll-seo-tag`)

## 📦 Prérequis

- Navigateur moderne (Chrome, Firefox, Safari, Edge)
- Git (pour le clonage et la collaboration)
- Python 3 (optionnel, pour le service local statique)

Aucun outil de build Node.js n’est requis pour le travail local standard.

## 🔧 Installation

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Le chemin du dépôt et l’URI de clonage peuvent varier selon le fork. Utilisez l’URL de votre dépôt lors d’une contribution via pull request.

## ▶️ Utilisation

Routes principales :

- Landing : `index.html`
- Robot : `robot.html`
- Produit E-ink : `eink-words-card.html`
- Kit OpenHI : `openhi-kit.html`

Flux local :

1. Ouvrir `index.html`
2. Explorer les sections de l’écosystème produit
3. Naviguer vers les pages de détails spécifiques et les expériences externes (`chat.lazying.art`, `onlyideas.art`, `coin.lazying.art`)
4. Utiliser les boutons Stripe hébergés pour les actions commerciales sur les pages produits

## ⚙️ Configuration

- `_config.yml`
  - Métadonnées du site (`title`, `description`, `url`)
  - Métadonnées SEO et sociales
  - Paramètres de plugin GitHub Pages
  - Note : `google_analytics` contient actuellement un ID placeholder (`UA-XXXXXXXXX-X`)
- `CNAME`
  - Lie le domaine personnalisé (`lazying.art`) à Pages
- Scripts runtime intégrés dans le HTML
  - Initialisation de la langue et du thème
  - `supportedLangs` avec métadonnées locales
  - Dictionnaires de traduction et interpolation `[data-i18n]`
  - Persistance des préférences langue/thème dans `localStorage`

Hypothèse : `google_analytics` n’est pas actif tant qu’un ID de suivi réel ne remplace pas le placeholder.

## 🧪 Exemples

Démarrer un serveur local et valider rapidement les pages :

```bash
python -m http.server 8000
```

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

Réinitialiser les préférences persistantes dans la console navigateur :

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 Notes de développement

- L’architecture statique-first maintient la maintenance et l’hébergement simples.
- Le comportement des locales et les changements de thème sont implémentés directement dans chaque page.
- Il n’existe pas de `package.json`, pas de transpilation, et pas de suite de tests automatisée.
- `i18n/README.*.md` existe pour la documentation traduite, tandis que les traductions de pages sont pour l’instant intégrées dans les scripts des pages.
- `donate/`, `app/donate/` et `product-assets/` apparaissent actuellement comme des espaces réservés.
- Flux de travail recommandé : édition statique locale → validation navigateur (desktop/mobile) → vérifications de liens.

## 📊 Performance

Le README visé précédemment affiche les objectifs suivants :

- ⚡ First Contentful Paint < 1s
- 📱 Mise en page responsive priorisant le mobile
- ♿ Pratiques d’accessibilité orientées WCAG dans la structure
- 🎯 Profil d’optimisation orienté Lighthouse

Ces valeurs devraient être re-mesurées après des changements d’UI majeurs.

## 🛠️ Dépannage

| Symptôme | Vérification |
|---|---|
| La page apparaît sans style après le lancement | Servir via `http://localhost:8000` (ne pas ouvrir comme `file://`) |
| Le bouton Stripe ne se charge pas | Vérifier l’accès réseau à `https://js.stripe.com/v3/buy-button.js` |
| La langue ne se bascule pas | Effacer les clés `localStorage` (`lang`, `theme`) puis recharger |
| Discordance de routage sur Pages | Vérifier `CNAME`, la cible de déploiement de la branche, et les valeurs de `_config.yml` |
| Métadonnées SEO obsolètes | Mettre à jour `sitemap.xml` après ajouts/suppressions de routes ou de contenu |

## 🗺️ Feuille de route

- Maintenir le README et la structure du dépôt alignés avec les pages en production
- Étendre `i18n/` avec une documentation complète et des mises à jour régulières
- Extraire la logique runtime partagée dans des modules réutilisables pour réduire la duplication par page
- Ajouter des vérifications de liens et une validation HTML légère en CI
- Remplacer la configuration analytics placeholder lorsqu’elle sera finalisée
- Ajouter des consignes de contribution pour le QA de localisation et la revue de captures d’écran

## 🤝 Contribuer

1. Forker le dépôt.
2. Créer une branche descriptive (par exemple, `docs/update-landing-copy`).
3. Modifier le HTML pertinent et les docs `i18n`.
4. Valider le rendu sur desktop/mobile et les bascules de langue/thème.
5. Ouvrir une PR avec captures d’écran ou enregistrements d’écran pour les changements destinés aux utilisateurs.

Merci de garder les mises à jour petites et ciblées (contenu, accessibilité et comportement responsive ont la priorité la plus élevée en revue).

## 📄 Licence

Aucun fichier `LICENSE` dédié n’est présent dans cet instantané du dépôt.

Veuillez confirmer la licence officielle du projet auprès des responsables du projet et ajouter ici la référence complète.


## ❤️ Support

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://camo.githubusercontent.com/24a4914f0b42c6f435f9e101621f1e52535b02c225764b2f6cc99416926004b7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446f6e6174652d4c617a79696e674172742d3045413545393f7374796c653d666f722d7468652d6261646765266c6f676f3d6b6f2d6669266c6f676f436f6c6f723d7768697465)](https://chat.lazying.art/donate) | [![PayPal](https://camo.githubusercontent.com/d0f57e8b016517a4b06961b24d0ca87d62fdba16e18bbdb6aba28e978dc0ea21/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50617950616c2d526f6e677a686f754368656e2d3030343537433f7374796c653d666f722d7468652d6261646765266c6f676f3d70617970616c266c6f676f436f6c6f723d7768697465)](https://paypal.me/RongzhouChen) | [![Stripe](https://camo.githubusercontent.com/1152dfe04b6943afe3a8d2953676749603fb9f95e24088c92c97a01a897b4942/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5374726970652d446f6e6174652d3633354246463f7374796c653d666f722d7468652d6261646765266c6f676f3d737472697065266c6f676f436f6c6f723d7768697465)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |
