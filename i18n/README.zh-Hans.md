[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# LazyingArt - 官方网站

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

### 📌 速览

| 项目 | 信息 |
| --- | --- |
| ✅ 仓库核心 | 面向 LazyingArt 的多语言营销网站，含产品入口页面 |
| 🌍 受众 | 访客、语言学习者、合作伙伴、贡献者 |
| 🧩 核心页面 | `index.html`、`robot.html`、`eink-words-card.html`、`openhi-kit.html` |
| 🧱 运行方式 | 使用 HTML/CSS/原生 JS 的静态网站，并带有本地化文本插值 |

## 🎨 关于 LazyingArt

LazyingArt 是一个多语言 AI 通信平台与着陆页生态系统。本仓库包含 LazyingArt 的公共网站与产品页面，包括旗舰 **EchoMind** 体验及辅助硬件页面。

- **使命：** 让跨语言沟通变得自然、快速且更像人与人之间的交流。
- **范围：** 以浏览器为先的静态网站，通过 GitHub Pages 部署。
- **受众：** 访客、产品团队、合作伙伴和贡献者。

## 🌍 EchoMind - 我们的旗舰产品

**EchoMind** 在该站点落地页中展示，并支持：

- 🎙️ 10+ 语言实时语音交互
- 🧠 情境记忆与个性化
- 📚 互动式语言学习与发音提示
- 🔤 语法分析和文本增强
- 💬 用于沟通实践的社交/社区互动

**试用 EchoMind：** [chat.lazying.art](https://chat.lazying.art)

## 🚀 快速开始

此仓库托管 LazyingArt 网站，访问 [lazying.art](https://lazying.art)。

### 本地开发

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

直接打开：

```bash
# macOS
open index.html

# 无依赖替代方案
python -m http.server 8000
# 然后打开 http://localhost:8000
```

### 部署

GitHub Pages 是主要部署目标。推送到 `main` 的变更应通过仓库的 Pages 设置和 `CNAME` 文件发布到自定义域名。

## ✨ 特性

| 范围 | 详情 |
|---|---|
| 架构 | 无框架静态实现（HTML/CSS/vanilla JavaScript）。 |
| 页面 | 除主着陆页外，还包括专用页面：`index.html`、`robot.html`、`eink-words-card.html`、`openhi-kit.html`。 |
| 本地化 | 运行时支持 13 种语言（`en`、`ja`、`zh-Hans`、`zh-Hant`、`ko`、`ar`、`vi`、`fr`、`es`、`pt`、`de`、`ru`、`tr`）。 |
| i18n 运行时 | 页面内 `[data-i18n]` 键值与字典替换。 |
| 持久化 | 通过 `localStorage` 持久化语言与主题偏好。 |
| 电商 | 通过 `https://js.stripe.com/v3/buy-button.js` 集成 Stripe 购买按钮。 |
| 智能默认值 | 主页面支持基于地理位置辅助语言检测（`ipapi.co` + `ipwho.is` 兜底）。 |
| SEO/域名 | `CNAME`、`_config.yml`、`sitemap.xml` 用于 GitHub Pages 的元数据与路由。 |

## 📁 项目结构

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

先前版本草稿中的旧引用（例如 `robots.txt`、`.nojekyll`、`assets/`）已不再出现在当前仓库快照中，仅保留为历史上下文。

## 🛠️ 技术栈

- HTML5 / CSS3 / vanilla JavaScript（无框架依赖）
- 受 Glassmorphism 启发的视觉系统与响应式布局
- 互动区块的渐进增强
- 面向 SEO 的元数据、自定义域名路由与站点地图支持
- Jekyll 兼容的 GitHub Pages 配置（`jekyll-sitemap`、`jekyll-seo-tag`）

## 📦 先决条件

- 现代浏览器（Chrome、Firefox、Safari、Edge）
- Git（用于克隆与协作）
- Python 3（可选，用于本地静态服务）

标准本地开发无需 Node.js 构建链。

## 🔧 安装

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

仓库路径和克隆 URI 可能因分叉而异。提交 PR 时请使用你的仓库地址。

## ▶️ 使用方式

主要页面路由：

- 着陆页：`index.html`
- 机器人页：`robot.html`
- 电子墨水产品页：`eink-words-card.html`
- OpenHI 套件页：`openhi-kit.html`

本地流程：

1. 打开 `index.html`
2. 浏览产品生态系统区域
3. 跳转到页面详情及外部体验（`chat.lazying.art`、`onlyideas.art`、`coin.lazying.art`）
4. 在产品页使用托管的 Stripe 按钮进行商业操作

## ⚙️ 配置

- `_config.yml`
  - 站点元数据（`title`、`description`、`url`）
  - SEO 与社交元数据
  - GitHub Pages 插件设置
  - 注意：`google_analytics` 当前为占位符 ID（`UA-XXXXXXXXX-X`）
- `CNAME`
  - 绑定 Pages 的自定义域名（`lazying.art`）
- 运行时脚本嵌入在 HTML 中
  - 语言与主题初始化
  - 带元数据的 `supportedLangs`
  - 翻译字典与 `[data-i18n]` 插值
  - 在 `localStorage` 中持久化主题与语言偏好

_假设：_ 直到真实追踪 ID 替换占位值前，`google_analytics` 不会生效。

## 🧪 示例

启动本地服务器并快速校验页面：

```bash
python -m http.server 8000
```

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

在浏览器控制台重置持久化偏好：

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 开发说明

- 静态优先架构保持了维护与托管的简洁。
- 区域设置与主题切换在每个页面内联实现。
- 仓库中没有 `package.json`，也没有转译步骤和自动化测试套件。
- `i18n/README.*.md` 用于文档翻译，而页面翻译目前嵌入页面脚本。
- `donate/`、`app/donate/` 与 `product-assets/` 当前看起来是预留占位目录。
- 推荐工作流：本地静态编辑 → 浏览器验证（桌面/移动）→ 链接检查。

## 📊 性能

先前 README 目标指标说明：

- ⚡ 小于 1 秒的首屏内容绘制
- 📱 移动优先响应式布局
- ♿ 结构上采用 WCAG 导向的可访问性实践
- 🎯 面向 Lighthouse 的优化指标目标

重大 UI 更改后应重新测量这些数值。

## 🛠️ 故障排查

| 症状 | 检查项 |
|---|---|
| 页面发布后样式消失 | 通过 `http://localhost:8000` 提供服务（避免直接以 `file://` 打开） |
| Stripe 按钮加载失败 | 确认可访问 `https://js.stripe.com/v3/buy-button.js` |
| 语言未切换 | 清除 `localStorage` 键（`lang`、`theme`）并刷新 |
| Pages 路由不匹配 | 确认 `CNAME`、分支部署目标和 `_config.yml` 配置 |
| SEO 元数据过期 | 在路由或内容变更后更新 `sitemap.xml` |

## 🗺️ 路线图

- 让 README 与仓库结构与生产页面保持同步
- 扩展 `i18n/` 文档，实现完整且定期更新的版本一致性
- 把共享运行时逻辑提取为可复用模块，减少页面重复
- 新增链接检查与轻量级 HTML/格式校验到 CI
- 在分析配置确定后替换占位 analytics 配置
- 为本地化 QA 与截图复核补充贡献者指引

## 🤝 贡献指南

1. Fork 该仓库。
2. 创建描述性分支（例如 `docs/update-landing-copy`）。
3. 编辑相关 HTML 与 `i18n` 文档。
4. 验证桌面与移动端渲染、语言/主题切换。
5. 对面向用户的变更提交带有清晰截图或录屏的 PR。

请保持更新小而聚焦（内容、可访问性和响应行为是审核优先级最高的内容）。

## 📄 许可证

当前仓库快照中未提供专门的 `LICENSE` 文件。

请与项目所有者确认官方项目许可，并在此处添加完整许可说明。


## ❤️ Support

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://camo.githubusercontent.com/24a4914f0b42c6f435f9e101621f1e52535b02c225764b2f6cc99416926004b7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446f6e6174652d4c617a79696e674172742d3045413545393f7374796c653d666f722d7468652d6261646765266c6f676f3d6b6f2d6669266c6f676f436f6c6f723d7768697465)](https://chat.lazying.art/donate) | [![PayPal](https://camo.githubusercontent.com/d0f57e8b016517a4b06961b24d0ca87d62fdba16e18bbdb6aba28e978dc0ea21/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50617950616c2d526f6e677a686f754368656e2d3030343537433f7374796c653d666f722d7468652d6261646765266c6f676f3d70617970616c266c6f676f436f6c6f723d7768697465)](https://paypal.me/RongzhouChen) | [![Stripe](https://camo.githubusercontent.com/1152dfe04b6943afe3a8d2953676749603fb9f95e24088c92c97a01a897b4942/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5374726970652d446f6e6174652d3633354246463f7374796c653d666f722d7468652d6261646765266c6f676f3d737472697065266c6f676f436f6c6f723d7768697465)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |
