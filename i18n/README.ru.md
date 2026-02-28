[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# LazyingArt - Официальный сайт

<p align="left">
  <a href="https://lazying.art"><img alt="Сайт" src="https://img.shields.io/website?url=https%3A%2F%2Flazying.art&label=Lazying.art&color=00A86B"></a>
  <a href="https://chat.lazying.art"><img alt="EchoMind" src="https://img.shields.io/badge/EchoMind-Try%20Now-4F46E5"></a>
  <a href="https://pages.github.com/"><img alt="GitHub Pages" src="https://img.shields.io/badge/Deploy-GitHub%20Pages-24292F"></a>
  <img alt="Стек" src="https://img.shields.io/badge/Stack-HTML%2FCSS%2FJS-FF6B35">
  <img alt="Локали" src="https://img.shields.io/badge/Locales-13-blue">
</p>

![Project Shape](https://img.shields.io/badge/Project-Static%20Landing%20Site-0f766e?style=flat-square&logo=github&logoColor=white)
![Deployment](https://img.shields.io/badge/Deployment-GitHub%20Pages-0f172a?style=flat-square&logo=github&logoColor=white)
![Scope](https://img.shields.io/badge/Localization-13%20Locales-2563eb?style=flat-square&logo=googletranslate&logoColor=white)

### 📌 Взгляд в целом

| Элемент | Информация |
| --- | --- |
| ✅ Направление репозитория | Многоязычный маркетинговый сайт с точками входа в продукты LazyingArt |
| 🌍 Целевая аудитория | Посетители, изучающие языки, партнёры, контрибьюторы |
| 🧩 Ключевые страницы | `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| 🧱 Среда выполнения | HTML/CSS/vanilla JS с локализованным подстановочным текстом |

## 🎨 О LazyingArt

LazyingArt — это многоязычная платформа для общения с ИИ и экосистема лендинговых сайтов. Этот репозиторий содержит публичный сайт и страницы продуктов LazyingArt, включая флагманский опыт **EchoMind** и поддерживающие страницы для оборудования.

- **Миссия:** Сделать межъязыковое общение естественным, быстрым и человеческим.
- **Область:** Сайт «первым делом» для браузера, развёрнутый через GitHub Pages.
- **Аудитория:** Посетители, продуктовые команды, партнёры и контрибьюторы.

## 🌍 EchoMind — наш флагманский продукт

**EchoMind** представлен на этих лендингах и поддерживает:

- 🎙️ Общение в реальном времени на 10+ языках
- 🧠 Контекстную память и персонализацию
- 📚 Интерактивные функции изучения языков и подсказки произношения
- 🔤 Анализ грамматики и улучшение текста
- 💬 Социальное и сообщественное взаимодействие для практики общения

**Попробуйте EchoMind:** [chat.lazying.art](https://chat.lazying.art)

## 🚀 Быстрый старт

В этом репозитории размещён сайт LazyingArt на [lazying.art](https://lazying.art).

### Локальная разработка

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Откройте напрямую:

```bash
# macOS
open index.html

# Альтернативный запуск без зависимостей
python -m http.server 8000
# затем откройте http://localhost:8000
```

### Развёртывание

GitHub Pages — основной вариант развёртывания. Изменения, отправленные в `main`, публикуются на пользовательском домене через настройки Pages репозитория и файл `CNAME`.

## ✨ Особенности

| Направление | Подробности |
|---|---|
| Архитектура | Реализация без фреймворка (HTML/CSS/vanilla JavaScript). |
| Страницы | Главный лендинг и отдельные страницы: `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html`. |
| Локализация | Поддерживается 13 локалей в логике языка во время работы (`en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr`). |
| Runtime i18n | Ключи `[data-i18n]` в странице с заменой из словаря. |
| Персистентность | Предпочтения языка и темы хранятся в `localStorage`. |
| Коммерция | Интеграция кнопки покупки Stripe через `https://js.stripe.com/v3/buy-button.js`. |
| Умные значения по умолчанию | Геолокация для определения языка на главной (`ipapi.co` + резервный `ipwho.is`). |
| SEO и домен | `CNAME`, `_config.yml` и `sitemap.xml` для метаданных GitHub Pages и маршрутизации. |

## 📁 Структура проекта

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

Старые ссылки из предыдущих черновиков (например, `robots.txt`, `.nojekyll`, `assets/`) в текущем снимке репозитория больше отсутствуют и сохранены здесь только как исторический контекст.

## 🛠️ Технологии

- HTML5 / CSS3 / vanilla JavaScript (без зависимости от фреймворка)
- Визуальная система в стиле glassmorphism и адаптивная верстка
- Постепенное улучшение для интерактивных секций
- SEO-ориентированные метаданные, маршрутизация пользовательского домена и поддержка sitemap
- Jekyll-совместимая конфигурация GitHub Pages (`jekyll-sitemap`, `jekyll-seo-tag`)

## 📦 Требования

- Современный браузер (Chrome, Firefox, Safari, Edge)
- Git (для клонирования и совместной работы)
- Python 3 (необязательно, для локального запуска статического сервера)

Для обычной локальной работы пайплайн Node.js не требуется.

## 🔧 Установка

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Путь репозитория и URI клонирования могут отличаться в форках. При работе через pull request используйте URL своего репозитория.

## ▶️ Использование

Основные маршруты страниц:

- Лэндинг: `index.html`
- Робот: `robot.html`
- Товары для электронных чернил: `eink-words-card.html`
- Набор OpenHI: `openhi-kit.html`

Локальный поток:

1. Откройте `index.html`
2. Изучите секции продуктового экосистемы
3. Перейдите к деталям конкретных страниц и внешним сервисам (`chat.lazying.art`, `onlyideas.art`, `coin.lazying.art`)
4. Используйте размещённые кнопки Stripe для коммерческих действий на страницах продуктов

## ⚙️ Конфигурация

- `_config.yml`
  - Метаданные сайта (`title`, `description`, `url`)
  - SEO и социальные метаданные
  - Настройки плагинов GitHub Pages
  - Примечание: `google_analytics` сейчас содержит placeholder ID (`UA-XXXXXXXXX-X`)
- `CNAME`
  - Привязывает пользовательский домен (`lazying.art`) для Pages
- Встроенные runtime-скрипты в HTML
  - Инициализация языка и темы
  - `supportedLangs` с метаданными локалей
  - Словари переводов и интерполяция `[data-i18n]`
  - Сохранение предпочтений языка и темы в `localStorage`

_Предположение:_ `google_analytics` неактивен, пока реальный ID отслеживания не заменит placeholder.

## 🧪 Примеры

Запустите локальный сервер и быстро проверьте страницы:

```bash
python -m http.server 8000
```

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

Сброс сохранённых настроек в консоли браузера:

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 Заметки по разработке

- Архитектура "static-first" упрощает сопровождение и хостинг.
- Логика локализации и переключение темы реализованы прямо в каждом HTML.
- Нет `package.json`, трансляции и автоматического набора тестов.
- Для переводов документации присутствует `i18n/README.*.md`, а переводы страниц сейчас хранятся в скриптах страниц.
- `donate/`, `app/donate/` и `product-assets/` пока фактически выступают как резервные разделы.
- Рекомендуемый процесс: локальная правка статических файлов → проверка в браузере (desktop/mobile) → проверка ссылок.

## 📊 Производительность

В предыдущем целевом профиле README указано:

- ⚡ Первое содержимое отображается менее чем за 1 секунду
- 📱 Адаптивная вёрстка с мобильным приоритетом
- ♿ Практики доступности, ориентированные на WCAG
- 🎯 Оптимизация под профиль Lighthouse

Эти значения стоит пересчитать после значимых изменений UI.

## 🛠️ Устранение неполадок

| Симптом | Что проверить |
|---|---|
| Страница отображается без стилей после запуска | Запускайте через `http://localhost:8000` (не открывайте как `file://`) |
| Кнопка Stripe не загружается | Проверьте доступ к `https://js.stripe.com/v3/buy-button.js` |
| Язык не переключается | Очистите ключи `localStorage` (`lang`, `theme`) и перезагрузите |
| Несовпадение маршрутов на Pages | Проверьте `CNAME`, целевой branch деплоя и значения в `_config.yml` |
| Устаревшие SEO-метаданные | Обновите `sitemap.xml` после изменений маршрутов или контента |

## 🗺️ Дорожная карта

- Поддерживать актуальность README и структуры репозитория с продакшн-страницами
- Расширять документацию `i18n/` до полной параллельности и регулярных обновлений
- Вынести общую runtime-логику в переиспользуемые модули, чтобы снизить дублирование страниц
- Добавить проверки ссылок и лёгкую валидацию HTML/формата в CI
- Заменить конфигурацию аналитики placeholder на финальный вариант
- Добавить руководство для контрибьюторов по локализационному QA и обзору скриншотов

## 🤝 Участие

1. Сделайте форк репозитория.
2. Создайте описательную ветку (например, `docs/update-landing-copy`).
3. Измените соответствующие HTML и документы `i18n`.
4. Проверьте отображение на desktop и mobile, а также переключатели языка и темы.
5. Отправьте PR с понятными скриншотами или видеозаписями для изменений интерфейса.

Старайтесь держать правки небольшими и сфокусированными (контент, доступность и отзывчивое поведение имеют наивысший приоритет в ревью).

## 📄 Лицензия

В текущем снимке репозитория отдельный файл `LICENSE` не добавлен.

Пожалуйста, подтвердите официальную лицензию проекта у владельца репозитория и добавьте полную ссылку на лицензию здесь.


## ❤️ Support

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://camo.githubusercontent.com/24a4914f0b42c6f435f9e101621f1e52535b02c225764b2f6cc99416926004b7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446f6e6174652d4c617a79696e674172742d3045413545393f7374796c653d666f722d7468652d6261646765266c6f676f3d6b6f2d6669266c6f676f436f6c6f723d7768697465)](https://chat.lazying.art/donate) | [![PayPal](https://camo.githubusercontent.com/d0f57e8b016517a4b06961b24d0ca87d62fdba16e18bbdb6aba28e978dc0ea21/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50617950616c2d526f6e677a686f754368656e2d3030343537433f7374796c653d666f722d7468652d6261646765266c6f676f3d70617970616c266c6f676f436f6c6f723d7768697465)](https://paypal.me/RongzhouChen) | [![Stripe](https://camo.githubusercontent.com/1152dfe04b6943afe3a8d2953676749603fb9f95e24088c92c97a01a897b4942/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5374726970652d446f6e6174652d3633354246463f7374796c653d666f722d7468652d6261646765266c6f676f3d737472697065266c6f676f436f6c6f723d7768697465)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |
