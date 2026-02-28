[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


<p align="center">
  <img src="https://raw.githubusercontent.com/lachlanchen/lachlanchen/main/logos/banner.png" alt="LazyingArt banner" />
</p>

# LazyingArt - 公式ウェブサイト

<p align="left">
  <a href="https://lazying.art"><img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Flazying.art&label=Lazying.art&color=00A86B"></a>
  <a href="https://chat.lazying.art"><img alt="EchoMind" src="https://img.shields.io/badge/EchoMind-Try%20Now-4F46E5"></a>
  <a href="https://pages.github.com/"><img alt="GitHub Pages" src="https://img.shields.io/badge/Deploy-GitHub%20Pages-24292F"></a>
  <img alt="Stack" src="https://img.shields.io/badge/Stack-HTML%2FCSS%2FJS-FF6B35">
  <img alt="Locales" src="https://img.shields.io/badge/Locales-13-blue">
</p>

## 🎨 LazyingArt について

LazyingArt は、多言語 AI コミュニケーションの未来を切り拓いています。私たちは、テクノロジーは壁を作るのではなく、壁を取り払うべきだと考えています。私たちの使命は、グローバルなコミュニケーションを呼吸するように自然なものにすることです。

このリポジトリには、EchoMind やハードウェア製品ページを含む、LazyingArt エコシステムの公開ウェブサイトおよびプロダクトランディングページが含まれています。

## 🌍 EchoMind - 私たちのフラッグシップ製品

**EchoMind** は、次の機能を備えた革新的な多言語 AI コンパニオンです。

- 🎙️ 10 以上の言語でのリアルタイム音声対話
- 🧠 文脈に基づく記憶とパーソナライズ
- 📚 発音ガイド付きのインタラクティブな語学学習
- 🔤 文法の分析と改善
- 💬 他ユーザーとつながるためのソーシャル機能

**EchoMind を試す**: [chat.lazying.art](https://chat.lazying.art)

## 🚀 クイックスタート

このリポジトリは、[lazying.art](https://lazying.art) で公開されている LazyingArt の企業ウェブサイトをホストしています。

### ローカル開発

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

### デプロイ

`main` ブランチに変更を push すると、GitHub Pages 経由でサイトが自動デプロイされます。

## ✨ 特徴

| 項目 | 詳細 |
|---|---|
| Architecture | フレームワーク非依存の静的実装（HTML/CSS/vanilla JavaScript）。 |
| Pages | メインのマーケティングページと専用プロダクトページ: `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| Localization | 13 ロケール対応の多言語 UI をページ内スクリプトに埋め込み: `en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr` |
| i18n Runtime | `[data-i18n]` キーを用いたローカライズテキスト置換 |
| Persistence | `localStorage` による言語設定とテーマ設定の永続化 |
| Commerce | チェックアウトフロー向け Stripe Buy Button 統合 |
| Smart Defaults | メインページでの位置情報補助付き言語検出（`ipapi.co`、フォールバックは `ipwho.is`） |
| SEO/Domain | `CNAME`, `_config.yml`, `sitemap.xml` |

## 📁 プロジェクト構成

現在のリポジトリ構成:

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

以前の README にあったレガシー構成ブロック（継続性のため保持）:

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

## 🛠️ 技術スタック

- ピュアな HTML5/CSS3/JavaScript（フレームワーク依存なし）
- Glassmorphism とモダン CSS エフェクト
- レスポンシブデザイン
- プログレッシブエンハンスメント
- SEO 最適化
- Stripe のホスト型 Buy Button ウィジェット（`https://js.stripe.com/v3/buy-button.js`）
- GitHub Pages + メタデータ/プラグイン向け Jekyll 設定

## 📦 前提条件

- モダンブラウザ（Chrome、Firefox、Safari、Edge）
- Python 3（任意、ローカル静的サーバー用）
- Git（クローンおよび共同作業用）

通常のローカル編集・テストでは Node.js のビルドツールチェーンは不要です。

## 🔧 インストール

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

ローカルで実行:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## ▶️ 使い方

主要ページ:

- ランディングページ: `http://localhost:8000/index.html`
- Robot 製品ページ: `http://localhost:8000/robot.html`
- E-ink 製品ページ: `http://localhost:8000/eink-words-card.html`
- OpenHI kit ページ: `http://localhost:8000/openhi-kit.html`

一般的なユーザーフロー:

1. `index.html` にアクセスする。
2. エコシステム紹介セクションと製品カードを見る。
3. 製品詳細ページに移動する、または外部アプリ（`chat.lazying.art`, `onlyideas.art`, `coin.lazying.art`）を開く。
4. 製品ページ上の Stripe Buy Button を利用する。

## ⚙️ 設定

設定はファイルベースで、ほとんどがインラインです。

- `_config.yml`
  - サイトメタデータ（`title`, `description`, `url`）
  - ソーシャルメタデータ
  - GitHub Pages プラグイン（`jekyll-sitemap`, `jekyll-seo-tag`）
  - HTML 圧縮設定
  - `google_analytics` は現在プレースホルダー（`UA-XXXXXXXXX-X`）
- `CNAME`
  - GitHub Pages のカスタムドメインマッピング（`lazying.art`）
- 各ページのインライン JS
  - `supportedLangs` ロケール一覧
  - 翻訳辞書
  - 言語/テーマ状態管理（`localStorage`）

前提: プレースホルダーを実際の analytics ID に置き換えるまで analytics は有効化されません。

## 🧪 例

サイト全体をローカル配信:

```bash
python -m http.server 8000
```

主要エンドポイントを素早く検証:

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

ブラウザコンソールで保存済み UI 設定をリセット:

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 開発ノート

- このプロジェクトは意図的に静的かつフレームワーク非依存です。
- 挙動の大半（i18n、テーマ、製品 UI 連携）はページごとのインライン実装です。
- 現時点でこのリポジトリには package マニフェスト（`package.json`）や自動テストスイートはありません。
- `i18n/` は存在しますが現在は空で、ローカライズ文字列は HTML ファイル内に埋め込まれています。
- `donate/`、`app/donate/`、`product-assets/` のような空ディレクトリは将来用途として予約されているようです。

推奨編集ワークフロー:

1. ローカル静的サーバーを起動する。
2. ページを編集する。
3. デスクトップ/モバイルレイアウトと言語/テーマ切り替えを確認する。
4. 外部リンクと Stripe ウィジェット読み込みを確認する。

## 📊 パフォーマンス

以前の README に記載された目標プロファイル:

- ⚡ <1s First Contentful Paint
- 📱 100% Mobile-friendly
- ♿ WCAG 2.1 AA Compliant
- 🎯 100/100 Lighthouse Score

前提: 大きなビジュアル変更やスクリプト更新後は、これらの指標を再計測してください。

## 🛠️ トラブルシューティング

| 症状 | 確認項目 |
|---|---|
| ローカルサーバーは起動するがページのスタイルが崩れる | `http://localhost:8000` 経由で開いているかを確認してください（制限されたローカルファイルコンテキストではないこと）。 |
| Stripe Buy Button が表示されない | インターネット接続と `https://js.stripe.com/v3/buy-button.js` への到達性を確認してください。 |
| 言語が期待どおりに切り替わらない | `localStorage` キー（`lang`, `theme`）を削除して再読み込みしてください。 |
| GitHub Pages のデプロイ結果が一致しない | `main` ブランチ公開設定、`CNAME`、`_config.yml` の値を確認してください。 |
| SEO ファイルが古く見える | ページ追加/削除時に `sitemap.xml` のエントリとタイムスタンプを更新してください。 |

## 🗺️ ロードマップ

- README とリポジトリ構成ドキュメントを本番ページと同期し続ける。
- README パイプラインの一部として `i18n/` に多言語 README を追加・維持する。
- 重複しているインライン JS/CSS を共通アセットへ集約し、重複を減らすことを検討する。
- リンク切れチェックと基本的な HTML 検証の自動化を追加する。
- 本番 analytics が確定したらプレースホルダー設定を置き換える。

## 🤝 コントリビューション

コントリビューションを歓迎します。ぜひ Pull Request を送ってください。

推奨コントリビューションフロー:

1. リポジトリを Fork する。
2. 機能ブランチを作成する。
3. ローカルでページをテストする。
4. 見た目の変更がある場合はスクリーンショット付きで PR を作成する。

## ❤️ サポート / スポンサーシップ

プロジェクトを支援したい場合:

- GitHub Sponsors: [lachlanchen](https://github.com/sponsors/lachlanchen)
- Website: [lazying.art](https://lazying.art)
- Product: [chat.lazying.art](https://chat.lazying.art)
- Ecosystem: [onlyideas.art](https://onlyideas.art)

資金提供メタデータの参照元: `.github/FUNDING.yml`。

## 📝 ライセンス

© 2024 LazyingArt. All rights reserved.

## 📧 お問い合わせ

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
