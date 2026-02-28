[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# LazyingArt - 공식 웹사이트

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

### 📌 한눈에 보기

| 항목 | 정보 |
| --- | --- |
| ✅ 저장소 초점 | 제품 진입점이 포함된 LazyingArt 다국어 마케팅 사이트 |
| 🌍 대상 | 방문자, 언어 학습자, 협업자, 기여자 |
| 🧩 핵심 페이지 | `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| 🧱 런타임 | 현지화된 텍스트 치환을 지원하는 HTML/CSS/바닐라 JS |

## 🎨 LazyingArt 소개

LazyingArt는 다국어 AI 커뮤니케이션 플랫폼이자 랜딩사이트 생태계입니다. 이 저장소에는 플래그십 제품 **EchoMind** 체험판과 하드웨어 보조 페이지를 포함해 LazyingArt의 공개 웹사이트와 제품 페이지가 들어 있습니다.

- **미션:** 언어 간 소통을 자연스럽고 빠르며 인간적인 경험으로 만듭니다.
- **범위:** GitHub Pages로 배포되는 브라우저 우선 정적 웹사이트.
- **대상:** 방문자, 제품 팀, 협업자, 기여자.

## 🌍 EchoMind - 대표 제품

**EchoMind**는 이 페이지들의 랜딩에서 소개되며 다음을 지원합니다.

- 🎙️ 10개 이상 언어의 실시간 음성 상호작용
- 🧠 맥락 기반 메모리와 개인화
- 📚 인터랙티브 언어 학습 기능 및 발음 단서
- 🔤 문법 분석 및 텍스트 개선
- 💬 커뮤니케이션 연습을 위한 소셜/커뮤니티 상호작용

**EchoMind 체험하기:** [chat.lazying.art](https://chat.lazying.art)

## 🚀 빠른 시작

이 저장소는 [lazying.art](https://lazying.art)에서 제공되는 LazyingArt 웹사이트를 호스팅합니다.

### 로컬 개발

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

직접 열기:

```bash
# macOS
open index.html

# 의존성 없는 대체 서버
python -m http.server 8000
# then open http://localhost:8000
```

### 배포

GitHub Pages가 기본 배포 대상입니다. `main`에 푸시된 변경사항은 저장소의 Pages 설정과 `CNAME` 파일을 통해 사용자 지정 도메인으로 게시됩니다.

## ✨ 기능

| 영역 | 상세 |
|---|---|
| 아키텍처 | 프레임워크 없는 정적 구현(HTML/CSS/vanilla JavaScript). |
| 페이지 | 메인 랜딩 페이지 + 전용 페이지: `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html`. |
| 현지화 | 런타임 언어 로직에서 13개 로케일 지원 (`en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr`). |
| i18n 런타임 | 사전형 대체를 이용한 페이지 내 `[data-i18n]` 키 처리. |
| 지속성 | 언어 + 테마 선호도를 `localStorage`에 저장. |
| 커머스 | `https://js.stripe.com/v3/buy-button.js`를 통한 Stripe 구매 버튼 통합. |
| 스마트 기본값 | 메인 페이지에서 지리 기반 언어 감지(`ipapi.co` + `ipwho.is` 대체). |
| SEO/도메인 | `CNAME`, `_config.yml`, `sitemap.xml`을 통한 GitHub Pages 메타데이터 및 라우팅. |

## 📁 프로젝트 구조

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

이전 초안의 오래된 참조(`robots.txt`, `.nojekyll`, `assets/`)는 현재 저장소 스냅샷에 더 이상 존재하지 않으며, 역사적 맥락으로만 유지됩니다.

## 🛠️ 기술 스택

- HTML5 / CSS3 / vanilla JavaScript (프레임워크 의존성 없음)
- 글래스모피즘 영감을 받은 시각 시스템과 반응형 레이아웃
- 상호작용 영역을 위한 점진적 향상
- SEO 지향 메타데이터, 사용자 지정 도메인 라우팅, 사이트맵 지원
- Jekyll 호환 GitHub Pages 구성(`jekyll-sitemap`, `jekyll-seo-tag`)

## 📦 사전 요구사항

- 최신 브라우저 (Chrome, Firefox, Safari, Edge)
- Git(클론 및 협업용)
- Python 3(선택, 로컬 정적 서빙용)

일반적인 로컬 작업에는 Node.js 빌드 툴체인이 필요하지 않습니다.

## 🔧 설치

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

저장소 경로와 clone URI는 포크마다 다를 수 있습니다. PR 기여 시 본인 저장소 URL을 사용하세요.

## ▶️ 사용법

주요 페이지 경로:

- 랜딩: `index.html`
- 로봇: `robot.html`
- 전자잉크 제품: `eink-words-card.html`
- OpenHI 키트: `openhi-kit.html`

로컬 동작:

1. `index.html` 열기
2. 제품 생태계 섹션 탐색
3. 페이지별 상세 및 외부 경험(`chat.lazying.art`, `onlyideas.art`, `coin.lazying.art`)으로 이동
4. 제품 페이지의 호스팅 Stripe 버튼으로 결제 액션 수행

## ⚙️ 구성

- `_config.yml`
  - 사이트 메타데이터 (`title`, `description`, `url`)
  - SEO 및 소셜 메타데이터
  - GitHub Pages 플러그인 설정
  - 참고: `google_analytics`에는 현재 placeholder ID(`UA-XXXXXXXXX-X`)가 들어가 있습니다.
- `CNAME`
  - Pages용 사용자 지정 도메인(`lazying.art`) 바인딩
- HTML에 임베드된 런타임 스크립트
  - 언어/테마 초기화
  - 로케일 메타데이터가 포함된 `supportedLangs`
  - 번역 딕셔너리와 `[data-i18n]` 치환
  - `localStorage`의 테마·언어 선호도 유지

_가정:_ `google_analytics`는 실제 추적 ID로 placeholder가 교체될 때까지 활성화되지 않습니다.

## 🧪 예시

로컬 서버를 시작해 빠르게 페이지를 검증합니다.

```bash
python -m http.server 8000
```

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

브라우저 콘솔에서 저장된 환경 설정 초기화:

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 개발 노트

- 정적 우선 아키텍처로 유지관리와 호스팅이 간단합니다.
- 로케일 동작과 테마 전환은 각 페이지에 인라인으로 구현되어 있습니다.
- `package.json`이 없고, 트랜스파일링 및 자동화된 테스트 스위트가 없습니다.
- 페이지 번역은 현재 페이지 스크립트에 삽입되며, `i18n/README.*.md`는 번역 문서를 위한 보조 역할입니다.
- `donate/`, `app/donate/`, `product-assets/`는 현재 예약된 placeholder로 보입니다.
- 권장 워크플로: 로컬 정적 편집 → 브라우저 확인(데스크톱/모바일) → 링크 점검.

## 📊 성능

이전 README 타겟 프로필을 기준으로 보면:

- ⚡ < 1s First Contentful Paint
- 📱 모바일 우선 반응형 레이아웃
- ♿ 구조에서 WCAG 지향 접근성 관행 반영
- 🎯 Lighthouse 중심 최적화 프로필

이 값들은 주요 UI 변경 후 다시 측정해야 합니다.

## 🛠️ 트러블슈팅

| 증상 | 확인 항목 |
|---|---|
| 배포 후 페이지가 스타일이 깨져 보임 | `http://localhost:8000`으로 서빙해서 열어보세요 (`file://`로 직접 열지 말 것). |
| Stripe 버튼이 로드되지 않음 | `https://js.stripe.com/v3/buy-button.js` 접근성을 확인하세요. |
| 언어가 전환되지 않음 | `localStorage` 키(`lang`, `theme`)를 지운 뒤 새로고침 |
| Pages에서 라우트 불일치 | `CNAME`, 배포 브랜치 대상, `_config.yml` 값을 확인 |
| SEO 메타데이터가 오래됨 | 페이지/콘텐츠 추가 후 `sitemap.xml` 갱신 |

## 🗺️ 로드맵

- README와 저장소 구조를 운영 페이지와 동기화 상태로 유지
- `i18n/` 문서를 완성도 있게 확장하고 정기적으로 업데이트
- 페이지 중복을 줄이기 위해 공통 런타임 로직을 재사용 가능한 모듈로 분리
- 링크 점검과 가벼운 HTML/포맷 검증 CI 추가
- 최종 확정 시 placeholder 분석 설정 교체
- 현지화 QA 및 스크린샷 리뷰를 위한 기여 가이드 추가

## 🤝 기여하기

1. 저장소를 포크합니다.
2. 설명이 명확한 브랜치를 생성합니다(예: `docs/update-landing-copy`).
3. 관련 HTML과 `i18n` 문서를 수정합니다.
4. 데스크톱/모바일 렌더링과 언어/테마 토글을 확인합니다.
5. 사용자 노출 변경 시 명확한 스크린샷 또는 화면 녹화본을 첨부해 PR을 올립니다.

업데이트는 작고 집중적으로 유지하세요(콘텐츠, 접근성, 반응형 동작이 가장 우선적으로 검토됩니다).

## 📄 라이선스

현재 저장소 스냅샷에는 전용 `LICENSE` 파일이 없습니다.

프로젝트의 공식 라이선스는 프로젝트 소유자와 확인 후 여기에 전체 라이선스 정보를 추가하세요.


## ❤️ Support

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://camo.githubusercontent.com/24a4914f0b42c6f435f9e101621f1e52535b02c225764b2f6cc99416926004b7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446f6e6174652d4c617a79696e674172742d3045413545393f7374796c653d666f722d7468652d6261646765266c6f676f3d6b6f2d6669266c6f676f436f6c6f723d7768697465)](https://chat.lazying.art/donate) | [![PayPal](https://camo.githubusercontent.com/d0f57e8b016517a4b06961b24d0ca87d62fdba16e18bbdb6aba28e978dc0ea21/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50617950616c2d526f6e677a686f754368656e2d3030343537433f7374796c653d666f722d7468652d6261646765266c6f676f3d70617970616c266c6f676f436f6c6f723d7768697465)](https://paypal.me/RongzhouChen) | [![Stripe](https://camo.githubusercontent.com/1152dfe04b6943afe3a8d2953676749603fb9f95e24088c92c97a01a897b4942/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5374726970652d446f6e6174652d3633354246463f7374796c653d666f722d7468652d6261646765266c6f676f3d737472697065266c6f676f436f6c6f723d7768697465)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |
