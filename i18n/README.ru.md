[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


<p align="center">
  <img src="https://raw.githubusercontent.com/lachlanchen/lachlanchen/main/logos/banner.png" alt="LazyingArt banner" />
</p>


# LazyingArt - Официальный сайт

<p align="left">
  <a href="https://lazying.art"><img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Flazying.art&label=Lazying.art&color=00A86B"></a>
  <a href="https://chat.lazying.art"><img alt="EchoMind" src="https://img.shields.io/badge/EchoMind-Try%20Now-4F46E5"></a>
  <a href="https://pages.github.com/"><img alt="GitHub Pages" src="https://img.shields.io/badge/Deploy-GitHub%20Pages-24292F"></a>
  <img alt="Stack" src="https://img.shields.io/badge/Stack-HTML%2FCSS%2FJS-FF6B35">
  <img alt="Locales" src="https://img.shields.io/badge/Locales-13-blue">
</p>

## 🎨 О LazyingArt

LazyingArt прокладывает путь в будущее многоязычного ИИ-общения. Мы считаем, что технологии должны разрушать барьеры, а не создавать их. Наша миссия — сделать глобальную коммуникацию такой же естественной, как дыхание.

Этот репозиторий содержит публичный сайт и продуктовые лендинги экосистемы LazyingArt, включая EchoMind и страницы аппаратных продуктов.

## 🌍 EchoMind — наш флагманский продукт

**EchoMind** — это наш революционный многоязычный ИИ-компаньон со следующими возможностями:

- 🎙️ Голосовое взаимодействие в реальном времени на 10+ языках
- 🧠 Контекстная память и персонализация
- 📚 Интерактивное изучение языков с подсказками по произношению
- 🔤 Анализ и улучшение грамматики
- 💬 Социальные функции для общения с другими пользователями

**Попробовать EchoMind**: [chat.lazying.art](https://chat.lazying.art)

## 🚀 Быстрый старт

Этот репозиторий содержит сайт компании LazyingArt по адресу [lazying.art](https://lazying.art).

### Локальная разработка

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

### Развертывание

Сайт автоматически разворачивается через GitHub Pages, когда изменения отправляются в ветку `main`.

## ✨ Возможности

| Область | Детали |
|---|---|
| Архитектура | Статическая реализация без фреймворков (HTML/CSS/vanilla JavaScript). |
| Страницы | Основная маркетинговая страница и отдельные продуктовые страницы: `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| Локализация | Поддержка многоязычного интерфейса с 13 локалями, встроенными в скрипты страниц: `en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr` |
| i18n Runtime | Замена локализованного текста с использованием ключей `[data-i18n]` |
| Сохранение | Предпочтения языка и темы сохраняются через `localStorage` |
| Коммерция | Интеграция Stripe Buy Button для сценариев оформления заказа |
| Умные значения по умолчанию | Определение языка с помощью геолокации на главной странице (`ipapi.co` с резервом `ipwho.is`) |
| SEO/Домен | `CNAME`, `_config.yml`, `sitemap.xml` |

## 📁 Структура проекта

Текущая структура репозитория:

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

Блок устаревшей структуры из предыдущего README (сохранен для преемственности):

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

## 🛠️ Технологии

- Чистые HTML5/CSS3/JavaScript (без зависимостей от фреймворков)
- Glassmorphism и современные CSS-эффекты
- Адаптивный дизайн
- Прогрессивное улучшение
- Оптимизация для SEO
- Виджеты Stripe hosted buy button (`https://js.stripe.com/v3/buy-button.js`)
- GitHub Pages + конфигурация Jekyll для метаданных/плагинов

## 📦 Предварительные требования

- Современный браузер (Chrome, Firefox, Safari, Edge).
- Python 3 (опционально, для локального статического сервера).
- Git (для клонирования и совместной работы).

Для стандартного локального редактирования/тестирования не требуется toolchain сборки Node.js.

## 🔧 Установка

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Запуск локально:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## ▶️ Использование

Основные страницы:

- Лендинг: `http://localhost:8000/index.html`
- Страница продукта Robot: `http://localhost:8000/robot.html`
- Страница E-ink продукта: `http://localhost:8000/eink-words-card.html`
- Страница комплекта OpenHI: `http://localhost:8000/openhi-kit.html`

Типичный пользовательский сценарий:

1. Откройте `index.html`.
2. Изучите разделы экосистемы и карточки продуктов.
3. Перейдите к деталям продукта или откройте внешние приложения (`chat.lazying.art`, `onlyideas.art`, `coin.lazying.art`).
4. Используйте кнопки Stripe buy на страницах продуктов.

## ⚙️ Конфигурация

Конфигурация основана на файлах и в основном задана inline:

- `_config.yml`
  - Метаданные сайта (`title`, `description`, `url`)
  - Социальные метаданные
  - Плагины GitHub Pages (`jekyll-sitemap`, `jekyll-seo-tag`)
  - Настройки сжатия HTML
  - `google_analytics` сейчас placeholder (`UA-XXXXXXXXX-X`)
- `CNAME`
  - Привязка кастомного домена для GitHub Pages (`lazying.art`)
- Inline JS на каждой странице
  - Список локалей `supportedLangs`
  - Словари переводов
  - Управление состоянием языка/темы (`localStorage`)

Предположение: аналитика не активна, пока placeholder не заменен реальным ID аналитики.

## 🧪 Примеры

Запуск всего сайта локально:

```bash
python -m http.server 8000
```

Быстрая проверка основных endpoint'ов:

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

Сброс сохраненных UI-предпочтений в консоли браузера:

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 Примечания по разработке

- Проект намеренно сделан статическим и без фреймворков.
- Большая часть поведения (i18n, тема, UI взаимодействия с продуктом) реализована inline на каждой странице.
- В репозитории сейчас нет манифеста пакетов (`package.json`) или автоматизированного тестового набора.
- `i18n/` существует, но сейчас пуст; строки локализации встроены в HTML-файлы.
- Пустые директории, такие как `donate/`, `app/donate/` и `product-assets/`, вероятно, зарезервированы для будущего использования.

Рекомендуемый процесс редактирования:

1. Запустите локальный статический сервер.
2. Внесите изменения в страницы.
3. Проверьте макет для desktop/mobile и переключатели языка/темы.
4. Проверьте внешние ссылки и загрузку Stripe widget.

## 📊 Производительность

Как указано в целевом профиле из предыдущего README:

- ⚡ <1s First Contentful Paint
- 📱 100% Mobile-friendly
- ♿ WCAG 2.1 AA Compliant
- 🎯 100/100 Lighthouse Score

Предположение: повторно измеряйте эти метрики после крупных визуальных или скриптовых обновлений.

## 🛠️ Устранение неполадок

| Симптом | Что проверить |
|---|---|
| Локальный сервер запускается, но страницы выглядят без стилей | Убедитесь, что вы открываете через `http://localhost:8000`, а не в заблокированном контексте локального файла. |
| Stripe buy button не отображается | Убедитесь в наличии интернета и доступности `https://js.stripe.com/v3/buy-button.js`. |
| Язык меняется не так, как ожидается | Очистите ключи `localStorage` (`lang`, `theme`) и перезагрузите страницу. |
| Несоответствие деплоя на GitHub Pages | Проверьте настройки публикации ветки `main`, а также значения `CNAME` и `_config.yml`. |
| SEO-файлы выглядят устаревшими | Обновляйте записи и временные метки в `sitemap.xml` при добавлении/удалении страниц. |

## 🗺️ Дорожная карта

- Поддерживать синхронизацию README и документации структуры репозитория с production-страницами.
- Добавлять/поддерживать многоязычные варианты README в `i18n/` в рамках шагов README pipeline.
- Рассмотреть централизацию повторяющегося inline JS/CSS в общие assets для уменьшения дублирования.
- Добавить автоматические проверки битых ссылок и базовую валидацию HTML.
- Заменить placeholder конфигурации аналитики после финализации production-аналитики.

## 🤝 Участие в проекте

Мы приветствуем вклад! Не стесняйтесь отправлять Pull Request.

Рекомендуемый процесс внесения вклада:

1. Сделайте fork репозитория.
2. Создайте feature-ветку.
3. Протестируйте страницы локально.
4. Откройте PR со скриншотами для визуальных изменений.

## ❤️ Поддержка / Спонсорство

Если вы хотите поддержать проект:

- GitHub Sponsors: [lachlanchen](https://github.com/sponsors/lachlanchen)
- Website: [lazying.art](https://lazying.art)
- Product: [chat.lazying.art](https://chat.lazying.art)
- Ecosystem: [onlyideas.art](https://onlyideas.art)

Источник метаданных финансирования: `.github/FUNDING.yml`.

## 📝 Лицензия

© 2024 LazyingArt. Все права защищены.

## 📧 Контакты

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
