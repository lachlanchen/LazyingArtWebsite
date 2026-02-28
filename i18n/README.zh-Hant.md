[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# LazyingArt - 官方網站

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

### 📌 速覽

| 項目 | 資訊 |
| --- | --- |
| ✅ 儲存庫重點 | 面向 LazyingArt 的多語言行銷網站，包含產品進入點 |
| 🌍 受眾 | 訪客、語言學習者、合作夥伴、貢獻者 |
| 🧩 核心頁面 | `index.html`、`robot.html`、`eink-words-card.html`、`openhi-kit.html` |
| 🧱 運行方式 | 使用 HTML/CSS/原生 JS 的靜態網站，並含本地化文字插值 |

## 🎨 關於 LazyingArt

LazyingArt 是一個多語言 AI 溝通平台與落地頁生態系。本儲存庫包含 LazyingArt 的公開網站與產品頁面，涵蓋旗艦 **EchoMind** 體驗及支援的硬體頁面。

- **使命：** 讓跨語言溝通更自然、更快，也更有人味。
- **範圍：** 以瀏覽器為先的靜態網站，透過 GitHub Pages 部署。
- **受眾：** 訪客、產品團隊、合作夥伴與貢獻者。

## 🌍 EchoMind - 我們的旗艦產品

**EchoMind** 透過此處的落地頁展示，支援：

- 🎙️ 10+ 種語言的即時語音互動
- 🧠 情境記憶與個人化體驗
- 📚 互動式語言學習功能與發音提示
- 🔤 語法分析與文字增強
- 💬 用於溝通實練的社群互動

**試用 EchoMind：** [chat.lazying.art](https://chat.lazying.art)

## 🚀 快速開始

此儲存庫託管 LazyingArt 網站於 [lazying.art](https://lazying.art)。

### 本機開發

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

直接開啟：

```bash
# macOS
open index.html

# 無相依性替代方案
python -m http.server 8000
# 然後開啟 http://localhost:8000
```

### 部署

GitHub Pages 是主要的部署目標。推送到 `main` 的變更應透過儲存庫的 Pages 設定與 `CNAME` 檔，發佈到自訂網域。

## ✨ 功能

| 領域 | 詳情 |
|---|---|
| 架構 | 無框架靜態實作（HTML/CSS/vanilla JavaScript）。 |
| 頁面 | 主落地頁加上專用頁面：`index.html`、`robot.html`、`eink-words-card.html`、`openhi-kit.html`。 |
| 本地化 | 執行期支援 13 種語系（`en`、`ja`、`zh-Hans`、`zh-Hant`、`ko`、`ar`、`vi`、`fr`、`es`、`pt`、`de`、`ru`、`tr`）。 |
| i18n 執行期 | 頁面內 `[data-i18n]` 鍵值與字典替換。 |
| 持久化 | 透過 `localStorage` 持久化語言與主題偏好。 |
| 商務 | 透過 `https://js.stripe.com/v3/buy-button.js` 整合 Stripe 購買按鈕。 |
| 智慧預設值 | 主頁支援地理定位輔助語言偵測（`ipapi.co` + `ipwho.is` 備援）。 |
| SEO/網域 | `CNAME`、`_config.yml` 與 `sitemap.xml` 用於 GitHub Pages 的中繼資料與路由。 |

## 📁 專案結構

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

先前版本草案中的舊參考（例如 `robots.txt`、`.nojekyll`、`assets/`）已不再出現在目前的儲存庫快照中，僅保留作為歷史脈絡。

## 🛠️ 技術

- HTML5 / CSS3 / vanilla JavaScript（無框架相依）
- 受 Glassmorphism 啟發的視覺系統與響應式版面
- 互動區塊的漸進式增強
- 以 SEO 為導向的中繼資料、自訂網域路由與站點地圖支援
- 與 Jekyll 相容的 GitHub Pages 設定（`jekyll-sitemap`、`jekyll-seo-tag`）

## 📦 先決條件

- 現代瀏覽器（Chrome、Firefox、Safari、Edge）
- Git（用於複製與協作）
- Python 3（可選，供本機靜態服務）

標準本機作業不需要 Node.js 建置工具鏈。

## 🔧 安裝

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

儲存庫路徑與克隆 URI 可能因 fork 而異。透過提取請求貢獻時，請使用你的儲存庫網址。

## ▶️ 使用方式

主要頁面路由：

- 落地頁：`index.html`
- 機器人頁：`robot.html`
- 電子紙產品頁：`eink-words-card.html`
- OpenHI 套件頁：`openhi-kit.html`

本機流程：

1. 開啟 `index.html`
2. 瀏覽產品生態系區塊
3. 跳轉到頁面細節與外部體驗（`chat.lazying.art`、`onlyideas.art`、`coin.lazying.art`）
4. 使用產品頁上的託管 Stripe 按鈕進行商務操作

## ⚙️ 設定

- `_config.yml`
  - 站點中繼資料（`title`、`description`、`url`）
  - SEO 與社群中繼資料
  - GitHub Pages 插件設定
  - 注意：`google_analytics` 目前為佔位符 ID（`UA-XXXXXXXXX-X`）
- `CNAME`
  - 綁定 Pages 的自訂網域（`lazying.art`）
- 內嵌於 HTML 的執行期腳本
  - 語言與主題初始化
  - 含元資料的 `supportedLangs`
  - 翻譯字典與 `[data-i18n]` 插值
  - 在 `localStorage` 持久化主題與語言偏好

_假設：_ 在真實追蹤 ID 替換佔位值前，`google_analytics` 不會生效。

## 🧪 範例

啟動本機伺服器並快速驗證頁面：

```bash
python -m http.server 8000
```

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

在瀏覽器主控台重置持久化偏好：

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 開發備註

- 靜態優先架構使維護與託管都更簡潔。
- 語系行為與主題切換在每個頁面中內嵌實作。
- 儲存庫中沒有 `package.json`，也沒有轉譯流程與自動測試套件。
- `i18n/README.*.md` 用於文件翻譯，而頁面翻譯目前仍嵌入頁面腳本中。
- `donate/`、`app/donate/` 與 `product-assets/` 目前看起來是預留佔位資料夾。
- 建議流程：本機靜態編輯 → 瀏覽器驗證（桌機/行動）→ 連結檢查。

## 📊 效能

先前 README 的目標指標聲明：

- ⚡ 小於 1 秒的首次有意義繪製
- 📱 行動優先的響應式版面
- ♿ 在結構上採用 WCAG 導向的可及性做法
- 🎯 以 Lighthouse 為導向的最佳化目標

在重大 UI 變更後應重新量測這些數值。

## 🛠️ 疑難排解

| 症狀 | 檢查 |
|---|---|
| 上線後頁面看起來未套用樣式 | 透過 `http://localhost:8000` 提供服務（請勿直接以 `file://` 開啟） |
| Stripe 按鈕載入失敗 | 確認可存取 `https://js.stripe.com/v3/buy-button.js` |
| 語言未切換 | 清除 `localStorage` 鍵（`lang`、`theme`）並重新載入 |
| Pages 路由不符 | 確認 `CNAME`、分支部署目標與 `_config.yml` 值 |
| SEO 中繼資料過期 | 在路由或內容變更後更新 `sitemap.xml` |

## 🗺️ 路線圖

- 維持 README 與儲存庫結構與正式頁面同步
- 擴充 `i18n/` 文件，實現完整一致的版本更新
- 將共用執行期邏輯提取為可複用模組，降低頁面重複
- 加入連結檢查與輕量 HTML/格式驗證到 CI
- 在分析設定確定後替換佔位的追蹤設定
- 補充在地化 QA 與截圖複核的貢獻者指引

## 🤝 貢獻指南

1. Fork 該儲存庫。
2. 建立具有描述性的分支（例如 `docs/update-landing-copy`）。
3. 編輯相關 HTML 與 `i18n` 文件。
4. 驗證桌機與行動裝置的渲染、語言與主題切換。
5. 對使用者介面變更提交帶有清晰截圖或螢幕錄製的 PR。

請保持更新幅度小而聚焦（內容、可及性與響應行為為審核優先順序最高）。

## 📄 授權

目前此儲存庫快照中未提供專用的 `LICENSE` 檔案。

請與專案擁有者確認正式授權條款，並在此處補上完整授權資訊。


## ❤️ Support

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://camo.githubusercontent.com/24a4914f0b42c6f435f9e101621f1e52535b02c225764b2f6cc99416926004b7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446f6e6174652d4c617a79696e674172742d3045413545393f7374796c653d666f722d7468652d6261646765266c6f676f3d6b6f2d6669266c6f676f436f6c6f723d7768697465)](https://chat.lazying.art/donate) | [![PayPal](https://camo.githubusercontent.com/d0f57e8b016517a4b06961b24d0ca87d62fdba16e18bbdb6aba28e978dc0ea21/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50617950616c2d526f6e677a686f754368656e2d3030343537433f7374796c653d666f722d7468652d6261646765266c6f676f3d70617970616c266c6f676f436f6c6f723d7768697465)](https://paypal.me/RongzhouChen) | [![Stripe](https://camo.githubusercontent.com/1152dfe04b6943afe3a8d2953676749603fb9f95e24088c92c97a01a897b4942/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5374726970652d446f6e6174652d3633354246463f7374796c653d666f722d7468652d6261646765266c6f676f3d737472697065266c6f676f436f6c6f723d7768697465)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |
