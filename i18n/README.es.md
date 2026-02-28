[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# LazyingArt - Sitio web oficial

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

### 📌 De un vistazo

| Elemento | Información |
| --- | --- |
| ✅ Foco del repositorio | Sitio de marketing multilingüe con puntos de entrada de producto para LazyingArt |
| 🌍 Audiencia | Visitantes, personas que aprenden idiomas, colaboradores, contribuidores |
| 🧩 Páginas principales | `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| 🧱 Entorno | Sitio HTML/CSS/vanilla JS con interpolación de texto localizada |

## 🎨 Acerca de LazyingArt

LazyingArt es una plataforma de comunicación con IA y un ecosistema de landing pages multilingüe. Este repositorio contiene el sitio web público y las páginas de producto de LazyingArt, incluyendo la experiencia principal **EchoMind** y páginas de hardware de apoyo.

- **Misión:** Hacer que la comunicación entre idiomas sea natural, rápida y humana.
- **Alcance:** Sitio web estático con prioridad de navegador desplegado con GitHub Pages.
- **Audiencia:** Visitantes, equipos de producto, colaboradores y contribuidores.

## 🌍 EchoMind - Nuestro producto principal

**EchoMind** se presenta a través de las landing pages de este repositorio y ofrece:

- 🎙️ Interacción de voz en tiempo real en más de 10 idiomas
- 🧠 Memoria contextual y personalización
- 📚 Funciones interactivas para aprender idiomas y ayudas de pronunciación
- 🔤 Análisis gramatical y mejora de texto
- 💬 Interacciones sociales/comunitarias para practicar comunicación

**Probar EchoMind:** [chat.lazying.art](https://chat.lazying.art)

## 🚀 Inicio rápido

Este repositorio aloja el sitio de LazyingArt en [lazying.art](https://lazying.art).

### Desarrollo local

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Abrir directamente:

```bash
# macOS
open index.html

# Servidor alternativo sin dependencias
python -m http.server 8000
# luego abre http://localhost:8000
```

### Despliegue

GitHub Pages es el objetivo principal de despliegue. Los cambios enviados a `main` deberían publicarse en el dominio personalizado mediante la configuración de Pages del repositorio y el archivo `CNAME`.

## ✨ Características

| Área | Detalles |
|---|---|
| Arquitectura | Implementación estática sin framework (HTML/CSS/vanilla JavaScript). |
| Páginas | Página principal más páginas dedicadas: `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html`. |
| Localización | 13 idiomas soportados en la lógica de runtime (`en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr`). |
| Runtime i18n | Claves `[data-i18n]` con reemplazo de diccionario en la página. |
| Persistencia | Preferencias de idioma y tema persistidas por `localStorage`. |
| Comercio | Integración de botón de compra de Stripe mediante `https://js.stripe.com/v3/buy-button.js`. |
| Valores predeterminados inteligentes | Detección de idioma asistida por geolocalización en la página principal (`ipapi.co` + fallback de `ipwho.is`). |
| SEO/Dominio | `CNAME`, `_config.yml` y `sitemap.xml` para metadatos y enrutamiento de GitHub Pages. |

## 📁 Estructura del proyecto

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

Las referencias antiguas de borradores previos (por ejemplo, `robots.txt`, `.nojekyll`, `assets/`) ya no están presentes en la instantánea actual del repositorio y se mantienen solo como contexto histórico.

## 🛠️ Tecnologías

- HTML5 / CSS3 / JavaScript vanilla (sin dependencia de framework)
- Sistema visual inspirado en glassmorphism y diseños responsivos
- Mejora progresiva para secciones interactivas
- Metadatos orientados a SEO, enrutamiento de dominio personalizado y soporte de sitemap
- Configuración compatible con Jekyll para GitHub Pages (`jekyll-sitemap`, `jekyll-seo-tag`)

## 📦 Requisitos previos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Git (para clonar y colaborar)
- Python 3 (opcional, para servir localmente contenido estático)

No se requiere una cadena de herramientas de compilación Node.js para el trabajo local estándar.

## 🔧 Instalación

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

La ruta del repositorio y el URI de clonación pueden variar según el fork. Usa la URL de tu repositorio al contribuir mediante pull request.

## ▶️ Uso

Rutas principales:

- Landing: `index.html`
- Robot: `robot.html`
- Producto de e-ink: `eink-words-card.html`
- Kit OpenHI: `openhi-kit.html`

Flujo local:

1. Abre `index.html`
2. Explora las secciones del ecosistema del producto
3. Navega a detalles específicos de cada página y experiencias externas (`chat.lazying.art`, `onlyideas.art`, `coin.lazying.art`)
4. Usa los botones de Stripe alojados para acciones de comercio en páginas de producto

## ⚙️ Configuración

- `_config.yml`
  - Metadatos del sitio (`title`, `description`, `url`)
  - Metadatos SEO y sociales
  - Ajustes de plugins de GitHub Pages
  - Nota: `google_analytics` actualmente contiene un ID de marcador de posición (`UA-XXXXXXXXX-X`)
- `CNAME`
  - Asocia el dominio personalizado (`lazying.art`) para Pages
- Scripts de runtime embebidos en HTML
  - Inicialización de idioma/tema
  - `supportedLangs` con metadatos de locale
  - Diccionarios de traducción y interpolación de `[data-i18n]`
  - Persistencia de preferencias de tema e idioma en `localStorage`

*Suposición:* `google_analytics` no está activo hasta que un ID real de seguimiento reemplace el marcador de posición.

## 🧪 Ejemplos

Inicia un servidor local y valida páginas rápidamente:

```bash
python -m http.server 8000
```

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

Reinicia preferencias persistentes desde la consola del navegador:

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 Notas de desarrollo

- La arquitectura de prioridad estática mantiene simple el mantenimiento y el hosting.
- El comportamiento de locale y los cambios de tema se implementan de forma inline en cada página.
- No existe `package.json`, no hay transpile y no hay suite automatizada de pruebas.
- `i18n/README.*.md` existe para documentación traducida, mientras que las traducciones de páginas hoy permanecen embebidas en los scripts de cada página.
- `donate/`, `app/donate/` y `product-assets/` aparecen actualmente como marcadores de posición.
- Flujo recomendado: edición estática local → validación en navegador (escritorio/móvil) → revisiones de enlaces.

## 🧪 Rendimiento

La versión objetivo declarada del README anterior indica:

- ⚡ Menos de 1s de First Contentful Paint
- 📱 Diseño responsive con prioridad móvil
- ♿ Prácticas de accesibilidad orientadas a WCAG en la estructura
- 🎯 Perfil de optimización enfocado en Lighthouse

Estos valores deben medirse de nuevo después de cambios importantes de UI.

## 🛠️ Solución de problemas

| Síntoma | Verificación |
|---|---|
| La página se ve sin estilos después de publicar | Sirve a través de `http://localhost:8000` (no la abras como `file://`) |
| El botón de Stripe no carga | Confirma acceso de red a `https://js.stripe.com/v3/buy-button.js` |
| El idioma no cambia | Borra las claves de `localStorage` (`lang`, `theme`) y recarga |
| Discordancia de ruta en Pages | Confirma `CNAME`, destino de despliegue de branch y valores de `_config.yml` |
| Metadatos SEO obsoletos | Actualiza `sitemap.xml` después de añadir rutas o contenido |

## 🗺️ Hoja de ruta

- Mantener README y estructura del repositorio en sincronía con las páginas de producción
- Expandir documentación en `i18n/` con paridad completa y actualizaciones regulares
- Extraer lógica de runtime compartida en módulos reutilizables para reducir duplicación entre páginas
- Añadir validaciones de enlaces y validación HTML/formato liviana en CI
- Reemplazar configuración de analítica de marcador de posición cuando se finalice
- Añadir guía para colaboradores sobre QA de localización y revisión de capturas de pantalla

## 🤝 Contribuciones

1. Haz un fork del repositorio.
2. Crea una rama descriptiva (por ejemplo, `docs/update-landing-copy`).
3. Edita el HTML relevante y la documentación `i18n`.
4. Valida el renderizado en escritorio y móvil y los cambios de idioma/tema.
5. Abre un PR con capturas de pantalla o grabaciones de pantalla para cambios visibles al usuario.

Mantén las actualizaciones pequeñas y enfocadas (contenido, accesibilidad y comportamiento responsive tienen la mayor prioridad de revisión).

## ❤️ Support

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://camo.githubusercontent.com/24a4914f0b42c6f435f9e101621f1e52535b02c225764b2f6cc99416926004b7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446f6e6174652d4c617a79696e674172742d3045413545393f7374796c653d666f722d7468652d6261646765266c6f676f3d6b6f2d6669266c6f676f436f6c6f723d7768697465)](https://chat.lazying.art/donate) | [![PayPal](https://camo.githubusercontent.com/d0f57e8b016517a4b06961b24d0ca87d62fdba16e18bbdb6aba28e978dc0ea21/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50617950616c2d526f6e677a686f754368656e2d3030343537433f7374796c653d666f722d7468652d6261646765266c6f676f3d70617970616c266c6f676f436f6c6f723d7768697465)](https://paypal.me/RongzhouChen) | [![Stripe](https://camo.githubusercontent.com/1152dfe04b6943afe3a8d2953676749603fb9f95e24088c92c97a01a897b4942/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5374726970652d446f6e6174652d3633354246463f7374796c653d666f722d7468652d6261646765266c6f676f3d737472697065266c6f676f436f6c6f723d7768697465)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |

## 📄 License

No existe un archivo `LICENSE` dedicado en esta instantánea del repositorio.

Por favor, confirma la licencia oficial del proyecto con los responsables y añade aquí la referencia completa de la licencia.
