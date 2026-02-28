[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# LazyingArt - 公式サイト

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

### 📌 概要

| 項目 | 情報 |
| --- | --- |
| ✅ リポジトリの焦点 | LazyingArt の製品導線を含む多言語マーケティングサイト |
| 🌍 対象 | 訪問者、言語学習者、協力者、貢献者 |
| 🧩 コアページ | `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| 🧱 実行環境 | HTML/CSS/バニラ JS とローカライズ済みテキスト補間 |

## 🎨 LazyingArt について

LazyingArt は多言語対応の AI コミュニケーションプラットフォームとランディングサイトのエコシステムです。本リポジトリには、主要プロダクトである **EchoMind** や補助ハードウェアページを含む、LazyingArt の公開サイトと製品ページが含まれています。

- **使命:** 言語を越えたコミュニケーションを自然・高速・人間らしくすること。
- **対象範囲:** GitHub Pages で配信される、ブラウザファーストの静的ウェブサイト。
- **読者:** 訪問者、プロダクトチーム、協力者、コントリビューター。

## 🌍 EchoMind - 主要プロダクト

**EchoMind** はこのサイトのランディングページから提供され、次の機能を備えています。

- 🎙️ 10 言語以上でのリアルタイム音声対話
- 🧠 文脈記憶とパーソナライズ
- 📚 インタラクティブな語学学習機能と発音ガイド
- 🔤 文法解析とテキスト強化
- 💬 コミュニケーション練習向けソーシャル／コミュニティ機能

**EchoMind を試す:** [chat.lazying.art](https://chat.lazying.art)

## 🚀 クイックスタート

このリポジトリは [lazying.art](https://lazying.art) で公開される LazyingArt ウェブサイトをホスティングしています。

### ローカル開発

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

直接開く場合:

```bash
# macOS
open index.html

# 代替: 依存のない簡易サーバー
python -m http.server 8000
# then open http://localhost:8000
```

### デプロイ

GitHub Pages が主要なデプロイ先です。`main` への変更は、リポジトリの Pages 設定と `CNAME` ファイルにより独自ドメインへ公開される想定です。

## ✨ 特徴

| 領域 | 詳細 |
|---|---|
| アーキテクチャ | フレームワークに依存しない静的実装（HTML/CSS/バニラ JavaScript）。 |
| ページ | メインランディングページおよび専用ページ: `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html`。 |
| ローカライズ | 実行時言語ロジックで 13 ロケールをサポート（`en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr`）。 |
| i18n ランタイム | ページ内の `[data-i18n]` キーと辞書置換。 |
| 永続化 | 言語・テーマ設定を `localStorage` に保存。 |
| 決済 | `https://js.stripe.com/v3/buy-button.js` による Stripe ボタン連携。 |
| スマートデフォルト | メインページでの位置情報補助言語検出（`ipapi.co` + `ipwho.is` フォールバック）。 |
| SEO/ドメイン | `CNAME`、`_config.yml`、`sitemap.xml` による Pages メタとルーティング。 |

## 📁 プロジェクト構成

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

旧版ドラフトにあった `robots.txt`、`.nojekyll`、`assets/` の参照は、現在のリポジトリには存在せず、過去の履歴情報としてのみ維持されていました。

## 🛠️ 技術スタック

- HTML5 / CSS3 / バニラ JavaScript（フレームワーク依存なし）
- ガラスモーフィズム風のビジュアルシステムとレスポンシブレイアウト
- 対話領域のプログレッシブエンハンスメント
- SEO 指向のメタデータ、独自ドメインルーティング、サイトマップ対応
- Jekyll 互換の GitHub Pages 設定（`jekyll-sitemap`, `jekyll-seo-tag`）

## 📦 前提条件

- モダンブラウザ（Chrome、Firefox、Safari、Edge）
- Git（クローンと共同開発用）
- Python 3（任意、ローカルでの静的配信用）

標準的なローカル作業には Node.js のビルドツールチェーンは不要です。

## 🔧 導入

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

リポジトリのパスと clone URI はフォークで異なる場合があります。PR ではあなたのリポジトリ URL を使用してください。

## ▶️ 利用方法

主要なページルート:

- ランディング: `index.html`
- ロボット: `robot.html`
- E-ink 製品: `eink-words-card.html`
- OpenHI キット: `openhi-kit.html`

ローカルの流れ:

1. `index.html` を開く
2. 製品エコシステムのセクションを確認する
3. ページ別の詳細と外部体験（`chat.lazying.art`、`onlyideas.art`、`coin.lazying.art`）へ移動する
4. 製品ページ上の Stripe ボタンで決済アクションを実行する

## ⚙️ 設定

- `_config.yml`
  - サイトメタデータ（`title`、`description`、`url`）
  - SEO とソーシャルメタデータ
  - GitHub Pages プラグイン設定
  - 注記: `google_analytics` は現在プレースホルダー ID（`UA-XXXXXXXXX-X`）を保持
- `CNAME`
  - Pages 用に独自ドメイン（`lazying.art`）を紐付ける
- HTML に組み込み済みの実行時スクリプト
  - 言語・テーマ初期化
  - ロケールメタデータ付き `supportedLangs`
  - 翻訳辞書と `[data-i18n]` 置換
  - テーマと言語の既定値を `localStorage` に保存

_仮定:_ `google_analytics` は実運用の追跡 ID に置き換えられるまでは有効化されません。

## 🧪 例

ローカルサーバーを起動してページを短時間で検証します。

```bash
python -m http.server 8000
```

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

ブラウザコンソールで保存済み設定をリセット:

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 開発ノート

- スタティックファースト構成で保守とホスティングをシンプルにしています。
- ロケール挙動とテーマ切替は各ページ内にインライン実装されています。
- `package.json`、トランスパイル、 自動テストスイートはありません。
- `i18n/README.*.md` は翻訳ドキュメント用で、ページの翻訳は現在ページ内スクリプトに埋め込まれています。
- `donate/`、`app/donate/`、`product-assets/` は予約済みのプレースホルダーとして見えます。
- 推奨ワークフロー: ローカル静的編集 → ブラウザ検証（デスクトップ／モバイル） → リンクチェック

## 📊 パフォーマンス

Prior README で示された目標プロファイル:

- ⚡ < 1s First Contentful Paint
- 📱 モバイルファーストのレスポンシブレイアウト
- ♿ 構造における WCAG 指向のアクセシビリティ実践
- 🎯 Lighthouse 最適化を意識した設計

これらの値は主要 UI 変更後に再測定する必要があります。

## 🛠️ トラブルシューティング

| 症状 | 確認 |
|---|---|
| 起動後にページが未スタイル表示になる | `http://localhost:8000` 経由で提供しているか確認する（`file://` で開かない）。 |
| Stripe ボタンが読み込まれない | `https://js.stripe.com/v3/buy-button.js` へのネットワーク到達性を確認する |
| 言語が切り替わらない | `localStorage` キー（`lang`、`theme`）を削除して再読込 |
| Pages でページルート不一致 | `CNAME`、デプロイ対象ブランチ、`_config.yml` の値を確認 |
| SEO メタデータが古い | ルートや内容追加後に `sitemap.xml` を更新 |

## 🗺️ ロードマップ

- README とリポジトリ構造を本番ページと同期して保つ
- `i18n/` ドキュメントを完全に同等化し、定期更新を続ける
- 重複する実行時ロジックを再利用可能モジュールへ抽出し、ページ重複を減らす
- CI にリンクチェックと軽量な HTML/フォーマット検証を追加する
- 決定次第でプレースホルダーの解析設定を置換する
- ローカリゼーション QA とスクリーンショットレビュー向けの貢献者ガイドを追加する

## 🤝 コントリビューション

1. リポジトリをフォークする。
2. 分かりやすいブランチ名を作成する（例: `docs/update-landing-copy`）。
3. 該当する HTML と `i18n` ドキュメントを編集する。
4. デスクトップとモバイルのレンダリングと言語／テーマ切替を検証する。
5. 利用者向け変更には明確なスクリーンショットか画面録画付きで PR を作成する。

更新は小さく集中して行ってください（本文、アクセシビリティ、レスポンシブ挙動がレビュー優先度が最も高いです）。

## 📄 ライセンス

このリポジトリのスナップショットには、専用の `LICENSE` ファイルがありません。

公式プロジェクトライセンスについては、プロジェクト所有者と確認し、ここに正式な参照を追加してください。


## ❤️ Support

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://camo.githubusercontent.com/24a4914f0b42c6f435f9e101621f1e52535b02c225764b2f6cc99416926004b7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446f6e6174652d4c617a79696e674172742d3045413545393f7374796c653d666f722d7468652d6261646765266c6f676f3d6b6f2d6669266c6f676f436f6c6f723d7768697465)](https://chat.lazying.art/donate) | [![PayPal](https://camo.githubusercontent.com/d0f57e8b016517a4b06961b24d0ca87d62fdba16e18bbdb6aba28e978dc0ea21/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50617950616c2d526f6e677a686f754368656e2d3030343537433f7374796c653d666f722d7468652d6261646765266c6f676f3d70617970616c266c6f676f436f6c6f723d7768697465)](https://paypal.me/RongzhouChen) | [![Stripe](https://camo.githubusercontent.com/1152dfe04b6943afe3a8d2953676749603fb9f95e24088c92c97a01a897b4942/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5374726970652d446f6e6174652d3633354246463f7374796c653d666f722d7468652d6261646765266c6f676f3d737472697065266c6f676f436f6c6f723d7768697465)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |
