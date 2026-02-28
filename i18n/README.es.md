[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


<p align="center">
  <img src="https://raw.githubusercontent.com/lachlanchen/lachlanchen/main/logos/banner.png" alt="LazyingArt banner" />
</p>

🌐 **Idiomas:** **Inglés (actual)** | Otros idiomas: planificados mediante el pipeline `i18n/`

# LazyingArt - Sitio web oficial

<p align="left">
  <a href="https://lazying.art"><img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Flazying.art&label=Lazying.art&color=00A86B"></a>
  <a href="https://chat.lazying.art"><img alt="EchoMind" src="https://img.shields.io/badge/EchoMind-Try%20Now-4F46E5"></a>
  <a href="https://pages.github.com/"><img alt="GitHub Pages" src="https://img.shields.io/badge/Deploy-GitHub%20Pages-24292F"></a>
  <img alt="Stack" src="https://img.shields.io/badge/Stack-HTML%2FCSS%2FJS-FF6B35">
  <img alt="Locales" src="https://img.shields.io/badge/Locales-13-blue">
</p>

## 🎨 Acerca de LazyingArt

LazyingArt está liderando el futuro de la comunicación multilingüe con IA. Creemos que la tecnología debe derribar barreras, no crearlas. Nuestra misión es hacer que la comunicación global sea tan natural como respirar.

Este repositorio contiene el sitio web público y las páginas de aterrizaje de productos del ecosistema LazyingArt, incluyendo EchoMind y páginas de productos de hardware.

## 🌍 EchoMind - Nuestro producto insignia

**EchoMind** es nuestro revolucionario compañero de IA multilingüe que incluye:

- 🎙️ Interacción de voz en tiempo real en más de 10 idiomas
- 🧠 Memoria contextual y personalización
- 📚 Aprendizaje interactivo de idiomas con guías de pronunciación
- 🔤 Análisis y mejora gramatical
- 💬 Funciones sociales para conectar con otras personas

**Prueba EchoMind**: [chat.lazying.art](https://chat.lazying.art)

## 🚀 Inicio rápido

Este repositorio aloja el sitio web corporativo de LazyingArt en [lazying.art](https://lazying.art).

### Desarrollo local

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

### Despliegue

El sitio se despliega automáticamente mediante GitHub Pages cuando los cambios se envían a la rama `main`.

## ✨ Funcionalidades

| Área | Detalles |
|---|---|
| Arquitectura | Implementación estática sin framework (HTML/CSS/JavaScript vanilla). |
| Páginas | Página principal de marketing más páginas dedicadas de productos: `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| Localización | Soporte de UI multilingüe con 13 locales embebidos en scripts de página: `en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr` |
| Runtime i18n | Reemplazo de texto localizado usando claves `[data-i18n]` |
| Persistencia | Preferencia de idioma + preferencia de tema persistidas mediante `localStorage` |
| Comercio | Integración de Stripe Buy Button para flujos de compra |
| Valores predeterminados inteligentes | Detección de idioma asistida por geolocalización en la página principal (`ipapi.co` con respaldo de `ipwho.is`) |
| SEO/Dominio | `CNAME`, `_config.yml`, `sitemap.xml` |

## 📁 Estructura del proyecto

Diseño actual del repositorio:

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

Bloque de estructura heredada del README anterior (se mantiene por continuidad):

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

## 🛠️ Tecnologías

- HTML5/CSS3/JavaScript puro (sin dependencias de framework)
- Glassmorphism y efectos CSS modernos
- Diseño responsivo
- Mejora progresiva
- SEO optimizado
- Widgets de Stripe hosted buy button (`https://js.stripe.com/v3/buy-button.js`)
- GitHub Pages + configuración Jekyll para metadatos/plugins

## 📦 Requisitos previos

- Un navegador moderno (Chrome, Firefox, Safari, Edge).
- Python 3 (opcional, para servidor estático local).
- Git (para clonado y colaboración).

No se requiere una toolchain de build de Node.js para edición/pruebas locales estándar.

## 🔧 Instalación

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Ejecutar localmente:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## ▶️ Uso

Páginas principales:

- Página de inicio: `http://localhost:8000/index.html`
- Página de producto Robot: `http://localhost:8000/robot.html`
- Página de producto E-ink: `http://localhost:8000/eink-words-card.html`
- Página del kit OpenHI: `http://localhost:8000/openhi-kit.html`

Flujo típico de usuario:

1. Visita `index.html`.
2. Explora las secciones del ecosistema y las tarjetas de productos.
3. Navega a los detalles del producto o abre apps externas (`chat.lazying.art`, `onlyideas.art`, `coin.lazying.art`).
4. Usa los botones de compra de Stripe en las páginas de producto.

## ⚙️ Configuración

La configuración se basa en archivos y en su mayoría está en línea:

- `_config.yml`
  - Metadatos del sitio (`title`, `description`, `url`)
  - Metadatos sociales
  - Plugins de GitHub Pages (`jekyll-sitemap`, `jekyll-seo-tag`)
  - Ajustes de compresión HTML
  - `google_analytics` actualmente es un marcador de posición (`UA-XXXXXXXXX-X`)
- `CNAME`
  - Mapeo de dominio personalizado para GitHub Pages (`lazying.art`)
- JS en línea en cada página
  - Lista de locales `supportedLangs`
  - Diccionarios de traducción
  - Gestión del estado de idioma/tema (`localStorage`)

Suposición: analytics no está activo hasta que un ID real de analytics reemplace el marcador de posición.

## 🧪 Ejemplos

Servir el sitio completo localmente:

```bash
python -m http.server 8000
```

Validar rápidamente endpoints principales:

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

Restablecer preferencias de UI guardadas en la consola del navegador:

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 Notas de desarrollo

- El proyecto es intencionalmente estático y sin frameworks.
- La mayor parte del comportamiento (i18n, tema, UI de interacción de producto) está implementada en línea por página.
- Actualmente no hay manifiesto de paquetes (`package.json`) ni suite de pruebas automatizadas en este repositorio.
- `i18n/` existe, pero actualmente está vacío; las cadenas de localización están embebidas en archivos HTML.
- Directorios vacíos como `donate/`, `app/donate/` y `product-assets/` parecen reservados para uso futuro.

Flujo de edición recomendado:

1. Ejecutar un servidor estático local.
2. Realizar ediciones de página.
3. Verificar diseño desktop/mobile y toggles de idioma/tema.
4. Verificar enlaces externos y carga del widget de Stripe.

## 📊 Rendimiento

Como se indica en el perfil objetivo del README anterior:

- ⚡ <1s First Contentful Paint
- 📱 100% compatible con móviles
- ♿ Cumple con WCAG 2.1 AA
- 🎯 Puntuación Lighthouse 100/100

Suposición: volver a medir estas métricas tras cambios importantes de estilo o scripts.

## 🛠️ Solución de problemas

| Síntoma | Verificación |
|---|---|
| El servidor local inicia pero las páginas se ven sin estilos | Asegúrate de abrir mediante `http://localhost:8000` y no desde un contexto de archivo local bloqueado. |
| El botón de compra de Stripe no se renderiza | Confirma acceso a internet y que `https://js.stripe.com/v3/buy-button.js` sea accesible. |
| El idioma no cambia como se espera | Limpia las claves de `localStorage` (`lang`, `theme`) y recarga. |
| Desajuste de despliegue en GitHub Pages | Verifica la configuración de publicación de la rama `main`, `CNAME` y los valores de `_config.yml`. |
| Los archivos SEO parecen desactualizados | Actualiza entradas y marcas de tiempo de `sitemap.xml` al agregar/eliminar páginas. |

## 🗺️ Hoja de ruta

- Mantener sincronizados el README y la documentación de estructura del repositorio con las páginas de producción.
- Agregar/mantener variantes multilingües de README en `i18n/` como parte de los pasos del pipeline de README.
- Considerar centralizar JS/CSS en línea repetido en assets compartidos para reducir duplicación.
- Agregar comprobaciones automatizadas de enlaces rotos y validación básica de HTML.
- Reemplazar la configuración placeholder de analytics cuando se finalice analytics de producción.

## 🤝 Contribuir

¡Agradecemos contribuciones! No dudes en enviar un Pull Request.

Flujo de contribución recomendado:

1. Haz fork del repo.
2. Crea una rama de funcionalidad.
3. Prueba las páginas localmente.
4. Abre un PR con capturas de pantalla para cambios visuales.

## ❤️ Soporte / Patrocinio

Si quieres apoyar el proyecto:

- GitHub Sponsors: [lachlanchen](https://github.com/sponsors/lachlanchen)
- Sitio web: [lazying.art](https://lazying.art)
- Producto: [chat.lazying.art](https://chat.lazying.art)
- Ecosistema: [onlyideas.art](https://onlyideas.art)

Fuente de metadatos de financiación: `.github/FUNDING.yml`.

## 📝 Licencia

© 2024 LazyingArt. Todos los derechos reservados.

## 📧 Contacto

- Sitio web: [lazying.art](https://lazying.art)
- Producto: [chat.lazying.art](https://chat.lazying.art)
- Email: contact@lazying.art
- Twitter: [@lazyingart](https://twitter.com/lazyingart)

---

<p align="center">Built with ❤️ by the LazyingArt Team</p>
<p align="center">
  <a href="https://lazying.art">Website</a> •
  <a href="https://chat.lazying.art">Try EchoMind</a> •
  <a href="https://twitter.com/lazyingart">Twitter</a>
</p>
