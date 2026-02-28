[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


<p align="center">
  <img src="https://raw.githubusercontent.com/lachlanchen/lachlanchen/main/logos/banner.png" alt="LazyingArt banner" />
</p>


# LazyingArt - 官方網站

<p align="left">
  <a href="https://lazying.art"><img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Flazying.art&label=Lazying.art&color=00A86B"></a>
  <a href="https://chat.lazying.art"><img alt="EchoMind" src="https://img.shields.io/badge/EchoMind-Try%20Now-4F46E5"></a>
  <a href="https://pages.github.com/"><img alt="GitHub Pages" src="https://img.shields.io/badge/Deploy-GitHub%20Pages-24292F"></a>
  <img alt="Stack" src="https://img.shields.io/badge/Stack-HTML%2FCSS%2FJS-FF6B35">
  <img alt="Locales" src="https://img.shields.io/badge/Locales-13-blue">
</p>

## 🎨 關於 LazyingArt

LazyingArt 正在開創多語言 AI 溝通的未來。我們相信，科技應該打破隔閡，而不是製造隔閡。我們的使命是讓全球溝通如呼吸般自然。

此儲存庫包含 LazyingArt 生態系的公開網站與產品落地頁，包含 EchoMind 與硬體產品頁面。

## 🌍 EchoMind - 我們的旗艦產品

**EchoMind** 是我們革命性的多語言 AI 夥伴，具備以下特點：

- 🎙️ 支援 10+ 種語言的即時語音互動
- 🧠 情境記憶與個人化
- 📚 具發音引導的互動式語言學習
- 🔤 文法分析與優化
- 💬 用於與他人連結的社交功能

**體驗 EchoMind**：[chat.lazying.art](https://chat.lazying.art)

## 🚀 快速開始

此儲存庫託管了 LazyingArt 公司網站：[lazying.art](https://lazying.art)。

### 本機開發

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

### 部署

當變更推送到 `main` 分支後，網站會透過 GitHub Pages 自動部署。

## ✨ 功能

| 區塊 | 詳細說明 |
|---|---|
| Architecture | 無框架靜態實作（HTML/CSS/vanilla JavaScript）。 |
| Pages | 主行銷頁與獨立產品頁：`index.html`、`robot.html`、`eink-words-card.html`、`openhi-kit.html` |
| Localization | 多語 UI 支援，頁面腳本內嵌 13 個語系：`en`、`ja`、`zh-Hans`、`zh-Hant`、`ko`、`ar`、`vi`、`fr`、`es`、`pt`、`de`、`ru`、`tr` |
| i18n Runtime | 使用 `[data-i18n]` 鍵進行在地化文字替換 |
| Persistence | 語言偏好與主題偏好透過 `localStorage` 持久化 |
| Commerce | 整合 Stripe Buy Button 作為結帳流程 |
| Smart Defaults | 主頁具地理位置輔助語言偵測（`ipapi.co`，並以 `ipwho.is` 作為備援） |
| SEO/Domain | `CNAME`、`_config.yml`、`sitemap.xml` |

## 📁 專案結構

目前儲存庫結構：

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

前一版 README 的舊版結構區塊（為了連續性而保留）：

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

## 🛠️ 技術

- 純 HTML5/CSS3/JavaScript（無框架依賴）
- Glassmorphism 與現代 CSS 效果
- 響應式設計
- 漸進式增強
- SEO 最佳化
- Stripe 託管 Buy Button 元件（`https://js.stripe.com/v3/buy-button.js`）
- GitHub Pages + Jekyll 設定，用於 metadata/plugins

## 📦 先決條件

- 現代瀏覽器（Chrome、Firefox、Safari、Edge）。
- Python 3（可選，用於本機靜態伺服器）。
- Git（用於 clone 與協作）。

進行一般本機編輯/測試不需要 Node.js 建置工具鏈。

## 🔧 安裝

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

本機執行：

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## ▶️ 使用方式

主要頁面：

- 首頁：`http://localhost:8000/index.html`
- Robot 產品頁：`http://localhost:8000/robot.html`
- E-ink 產品頁：`http://localhost:8000/eink-words-card.html`
- OpenHI kit 頁面：`http://localhost:8000/openhi-kit.html`

典型使用者流程：

1. 造訪 `index.html`。
2. 探索生態系區塊與產品卡片。
3. 前往產品詳情，或開啟外部應用（`chat.lazying.art`、`onlyideas.art`、`coin.lazying.art`）。
4. 在產品頁使用 Stripe buy buttons。

## ⚙️ 設定

設定以檔案為主，且多數為內嵌：

- `_config.yml`
  - 網站 metadata（`title`、`description`、`url`）
  - 社群 metadata
  - GitHub Pages plugins（`jekyll-sitemap`、`jekyll-seo-tag`）
  - HTML 壓縮設定
  - `google_analytics` 目前為佔位值（`UA-XXXXXXXXX-X`）
- `CNAME`
  - GitHub Pages 的自訂網域對應（`lazying.art`）
- 每個頁面的內嵌 JS
  - `supportedLangs` 語系列表
  - 翻譯字典
  - 語言/主題狀態管理（`localStorage`）

假設：在以真實 analytics ID 取代佔位值前，analytics 尚未啟用。

## 🧪 範例

在本機提供完整站點：

```bash
python -m http.server 8000
```

快速驗證主要端點：

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

在瀏覽器主控台重設已儲存的 UI 偏好：

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 開發備註

- 本專案刻意維持為靜態且無框架。
- 多數行為（i18n、主題、產品互動 UI）以每頁內嵌方式實作。
- 目前儲存庫沒有 package manifest（`package.json`）或自動化測試套件。
- `i18n/` 目錄存在但目前為空；在地化字串嵌在 HTML 檔內。
- `donate/`、`app/donate/`、`product-assets/` 等空目錄看起來保留作未來用途。

建議編輯流程：

1. 啟動本機靜態伺服器。
2. 進行頁面修改。
3. 檢查桌機/手機版面與語言/主題切換。
4. 檢查外部連結與 Stripe 元件載入。

## 📊 效能

如前一版 README 所述的目標設定：

- ⚡ <1s First Contentful Paint
- 📱 100% Mobile-friendly
- ♿ WCAG 2.1 AA Compliant
- 🎯 100/100 Lighthouse Score

假設：重大視覺或腳本更新後，應重新量測這些指標。

## 🛠️ 疑難排解

| 症狀 | 檢查項目 |
|---|---|
| 本機伺服器已啟動，但頁面樣式異常 | 請確認是透過 `http://localhost:8000` 開啟，而非受限的本機檔案情境。 |
| Stripe buy button 未顯示 | 確認網路連線正常，且可存取 `https://js.stripe.com/v3/buy-button.js`。 |
| 語言切換未如預期 | 清除 `localStorage` 鍵（`lang`、`theme`）後重新載入。 |
| GitHub Pages 部署內容不一致 | 檢查 `main` 分支發佈設定、`CNAME` 與 `_config.yml` 值。 |
| SEO 檔案看起來過期 | 新增/移除頁面時同步更新 `sitemap.xml` 項目與時間戳。 |

## 🗺️ 路線圖

- 讓 README 與儲存庫結構文件持續與正式頁面同步。
- 在 README 流程中於 `i18n/` 新增/維護多語 README 版本。
- 考慮將重複的內嵌 JS/CSS 集中到共用資產，以降低重複。
- 新增自動化檢查（失效連結與基本 HTML 驗證）。
- 當正式 analytics 定案後，替換佔位用 analytics 設定。

## 🤝 貢獻

我們歡迎貢獻！歡迎隨時提交 Pull Request。

建議的貢獻流程：

1. Fork 儲存庫。
2. 建立功能分支。
3. 在本機測試頁面。
4. 提交 PR（視覺變更請附上截圖）。

## ❤️ 支援 / 贊助

如果你想支持這個專案：

- GitHub Sponsors: [lachlanchen](https://github.com/sponsors/lachlanchen)
- Website: [lazying.art](https://lazying.art)
- Product: [chat.lazying.art](https://chat.lazying.art)
- Ecosystem: [onlyideas.art](https://onlyideas.art)

資助資訊來源：`.github/FUNDING.yml`。

## 📝 授權

© 2024 LazyingArt. All rights reserved.

## 📧 聯絡方式

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
