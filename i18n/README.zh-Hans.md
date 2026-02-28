[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


<p align="center">
  <img src="https://raw.githubusercontent.com/lachlanchen/lachlanchen/main/logos/banner.png" alt="LazyingArt banner" />
</p>

# LazyingArt - 官方网站

<p align="left">
  <a href="https://lazying.art"><img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Flazying.art&label=Lazying.art&color=00A86B"></a>
  <a href="https://chat.lazying.art"><img alt="EchoMind" src="https://img.shields.io/badge/EchoMind-Try%20Now-4F46E5"></a>
  <a href="https://pages.github.com/"><img alt="GitHub Pages" src="https://img.shields.io/badge/Deploy-GitHub%20Pages-24292F"></a>
  <img alt="Stack" src="https://img.shields.io/badge/Stack-HTML%2FCSS%2FJS-FF6B35">
  <img alt="Locales" src="https://img.shields.io/badge/Locales-13-blue">
</p>

## 🎨 关于 LazyingArt

LazyingArt 正在引领多语言 AI 沟通的未来。我们相信，技术应该打破障碍，而不是制造障碍。我们的使命是让全球沟通像呼吸一样自然。

本仓库包含 LazyingArt 生态的公开官网与产品落地页，包括 EchoMind 以及硬件产品页面。

## 🌍 EchoMind - 我们的旗舰产品

**EchoMind** 是我们的革命性多语言 AI 伙伴，具备以下特性：

- 🎙️ 支持 10+ 语言的实时语音交互
- 🧠 上下文记忆与个性化
- 📚 带发音指导的互动式语言学习
- 🔤 语法分析与优化
- 💬 用于连接他人的社交功能

**体验 EchoMind**： [chat.lazying.art](https://chat.lazying.art)

## 🚀 快速开始

本仓库托管 LazyingArt 公司网站：[lazying.art](https://lazying.art)。

### 本地开发

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

当变更推送到 `main` 分支后，站点会通过 GitHub Pages 自动部署。

## ✨ 功能特性

| 区域 | 详情 |
|---|---|
| 架构 | 无框架静态实现（HTML/CSS/vanilla JavaScript）。 |
| 页面 | 主营销页 + 独立产品页：`index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| 本地化 | 多语言 UI 支持，页面脚本内嵌 13 个语言环境：`en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr` |
| i18n 运行时 | 使用 `[data-i18n]` 键进行本地化文本替换 |
| 持久化 | 语言偏好 + 主题偏好通过 `localStorage` 持久保存 |
| 商业能力 | 集成 Stripe Buy Button 结账流程 |
| 智能默认 | 主页面基于地理位置辅助语言检测（`ipapi.co`，`ipwho.is` 兜底） |
| SEO/域名 | `CNAME`, `_config.yml`, `sitemap.xml` |

## 📁 项目结构

当前仓库结构：

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

来自上一版 README 的历史结构块（为保持连续性而保留）：

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

## 🛠️ 技术栈

- 纯 HTML5/CSS3/JavaScript（无框架依赖）
- Glassmorphism 与现代 CSS 效果
- 响应式设计
- 渐进增强
- SEO 优化
- Stripe 托管 Buy Button 组件（`https://js.stripe.com/v3/buy-button.js`）
- GitHub Pages + Jekyll 配置（用于元数据/插件）

## 📦 前置要求

- 现代浏览器（Chrome、Firefox、Safari、Edge）。
- Python 3（可选，用于本地静态服务器）。
- Git（用于克隆与协作）。

标准本地编辑/测试不需要 Node.js 构建工具链。

## 🔧 安装

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

本地运行：

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## ▶️ 使用方式

主要页面：

- 落地页：`http://localhost:8000/index.html`
- 机器人产品页：`http://localhost:8000/robot.html`
- 电子墨水屏产品页：`http://localhost:8000/eink-words-card.html`
- OpenHI 套件页：`http://localhost:8000/openhi-kit.html`

典型用户流程：

1. 访问 `index.html`。
2. 浏览生态分区和产品卡片。
3. 跳转到产品详情页或打开外部应用（`chat.lazying.art`, `onlyideas.art`, `coin.lazying.art`）。
4. 在产品页面使用 Stripe 购买按钮。

## ⚙️ 配置

配置以文件为主，且大多为内联：

- `_config.yml`
  - 站点元数据（`title`, `description`, `url`）
  - 社交元数据
  - GitHub Pages 插件（`jekyll-sitemap`, `jekyll-seo-tag`）
  - HTML 压缩设置
  - `google_analytics` 当前为占位符（`UA-XXXXXXXXX-X`）
- `CNAME`
  - GitHub Pages 自定义域名映射（`lazying.art`）
- 每个页面中的内联 JS
  - `supportedLangs` 语言环境列表
  - 翻译字典
  - 语言/主题状态管理（`localStorage`）

假设：在使用真实分析 ID 替换占位符前，analytics 尚未启用。

## 🧪 示例

在本地启动完整站点：

```bash
python -m http.server 8000
```

快速验证主要端点：

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

在浏览器控制台重置已保存的 UI 偏好：

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 开发说明

- 项目有意保持静态且无框架。
- 大部分行为（i18n、主题、产品交互 UI）按页面内联实现。
- 当前仓库没有包清单（`package.json`）或自动化测试套件。
- `i18n/` 已存在但当前为空；本地化字符串嵌入在 HTML 文件中。
- `donate/`、`app/donate/`、`product-assets/` 等空目录看起来是为后续用途预留。

建议的编辑流程：

1. 启动本地静态服务器。
2. 修改页面。
3. 验证桌面/移动端布局与语言/主题切换。
4. 验证外部链接与 Stripe 组件加载。

## 📊 性能

根据上一版 README 的目标画像：

- ⚡ <1s First Contentful Paint
- 📱 100% Mobile-friendly
- ♿ WCAG 2.1 AA Compliant
- 🎯 100/100 Lighthouse Score

假设：在主要视觉或脚本更新后，应重新测量这些指标。

## 🛠️ 故障排查

| 症状 | 检查项 |
|---|---|
| 本地服务器已启动，但页面样式异常 | 确认通过 `http://localhost:8000` 访问，而不是受限的本地文件上下文。 |
| Stripe Buy Button 未渲染 | 确认网络可用，且 `https://js.stripe.com/v3/buy-button.js` 可访问。 |
| 语言切换不生效 | 清除 `localStorage` 键（`lang`, `theme`）后刷新。 |
| GitHub Pages 部署内容不一致 | 检查 `main` 分支发布设置、`CNAME` 与 `_config.yml` 配置值。 |
| SEO 文件看起来过期 | 添加/删除页面时，同步更新 `sitemap.xml` 条目与时间戳。 |

## 🗺️ 路线图

- 保持 README 与仓库结构文档和生产页面同步。
- 作为 README 流水线步骤的一部分，在 `i18n/` 中添加/维护多语言 README 变体。
- 考虑将重复的内联 JS/CSS 抽离为共享资源以减少重复。
- 增加断链检查与基础 HTML 校验的自动化检查。
- 生产分析方案确定后，替换占位分析配置。

## 🤝 贡献

欢迎贡献！欢迎随时提交 Pull Request。

推荐贡献流程：

1. Fork 仓库。
2. 创建功能分支。
3. 在本地测试页面。
4. 提交 PR；如果涉及视觉改动，请附截图。

## ❤️ 支持 / 赞助

如果你想支持本项目：

- GitHub Sponsors: [lachlanchen](https://github.com/sponsors/lachlanchen)
- Website: [lazying.art](https://lazying.art)
- Product: [chat.lazying.art](https://chat.lazying.art)
- Ecosystem: [onlyideas.art](https://onlyideas.art)

资金信息来源：`.github/FUNDING.yml`。

## 📝 许可证

© 2024 LazyingArt。保留所有权利。

## 📧 联系方式

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
