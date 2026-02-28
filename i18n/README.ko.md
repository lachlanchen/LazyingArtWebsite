[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


<p align="center">
  <img src="https://raw.githubusercontent.com/lachlanchen/lachlanchen/main/logos/banner.png" alt="LazyingArt banner" />
</p>

# LazyingArt - 공식 웹사이트

<p align="left">
  <a href="https://lazying.art"><img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Flazying.art&label=Lazying.art&color=00A86B"></a>
  <a href="https://chat.lazying.art"><img alt="EchoMind" src="https://img.shields.io/badge/EchoMind-Try%20Now-4F46E5"></a>
  <a href="https://pages.github.com/"><img alt="GitHub Pages" src="https://img.shields.io/badge/Deploy-GitHub%20Pages-24292F"></a>
  <img alt="Stack" src="https://img.shields.io/badge/Stack-HTML%2FCSS%2FJS-FF6B35">
  <img alt="Locales" src="https://img.shields.io/badge/Locales-13-blue">
</p>

## 🎨 LazyingArt 소개

LazyingArt는 다국어 AI 커뮤니케이션의 미래를 개척하고 있습니다. 우리는 기술이 장벽을 만들지 않고, 장벽을 허물어야 한다고 믿습니다. 우리의 미션은 전 세계 커뮤니케이션을 숨 쉬는 것처럼 자연스럽게 만드는 것입니다.

이 저장소에는 EchoMind와 하드웨어 제품 페이지를 포함한 LazyingArt 생태계의 공개 웹사이트 및 제품 랜딩 페이지가 담겨 있습니다.

## 🌍 EchoMind - 대표 제품

**EchoMind**는 다음 기능을 제공하는 혁신적인 다국어 AI 컴패니언입니다:

- 🎙️ 10개 이상 언어에서 실시간 음성 상호작용
- 🧠 맥락 기반 메모리 및 개인화
- 📚 발음 가이드가 포함된 인터랙티브 언어 학습
- 🔤 문법 분석 및 개선
- 💬 다른 사용자와 연결되는 소셜 기능

**EchoMind 체험하기**: [chat.lazying.art](https://chat.lazying.art)

## 🚀 빠른 시작

이 저장소는 [lazying.art](https://lazying.art)에서 제공되는 LazyingArt 회사 웹사이트를 호스팅합니다.

### 로컬 개발

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

### 배포

`main` 브랜치에 변경 사항이 푸시되면 사이트는 GitHub Pages를 통해 자동 배포됩니다.

## ✨ 기능

| 영역 | 상세 |
|---|---|
| 아키텍처 | 프레임워크 없는 정적 구현(HTML/CSS/vanilla JavaScript). |
| 페이지 | 메인 마케팅 페이지 + 전용 제품 페이지: `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| 현지화 | 페이지 스크립트에 13개 로케일 내장: `en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr` |
| i18n 런타임 | `[data-i18n]` 키를 이용한 현지화 텍스트 치환 |
| 지속성 | 언어/테마 선호도를 `localStorage`로 저장 |
| 커머스 | 결제 흐름을 위한 Stripe Buy Button 통합 |
| 스마트 기본값 | 메인 페이지에서 위치 기반 언어 감지 지원(`ipapi.co`, 실패 시 `ipwho.is` 대체) |
| SEO/도메인 | `CNAME`, `_config.yml`, `sitemap.xml` |

## 📁 프로젝트 구조

현재 저장소 레이아웃:

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

이전 README의 레거시 구조 블록(연속성 유지를 위해 보존):

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

## 🛠️ 기술 스택

- 순수 HTML5/CSS3/JavaScript(프레임워크 의존성 없음)
- 글래스모피즘 및 현대적인 CSS 효과
- 반응형 디자인
- 점진적 향상(Progressive enhancement)
- SEO 최적화
- Stripe 호스팅 Buy Button 위젯 (`https://js.stripe.com/v3/buy-button.js`)
- 메타데이터/플러그인용 GitHub Pages + Jekyll 설정

## 📦 사전 요구사항

- 최신 브라우저(Chrome, Firefox, Safari, Edge).
- Python 3(선택 사항, 로컬 정적 서버용).
- Git(클론 및 협업용).

표준 로컬 편집/테스트에는 Node.js 빌드 툴체인이 필요하지 않습니다.

## 🔧 설치

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

로컬 실행:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## ▶️ 사용 방법

주요 페이지:

- 랜딩 페이지: `http://localhost:8000/index.html`
- Robot 제품 페이지: `http://localhost:8000/robot.html`
- E-ink 제품 페이지: `http://localhost:8000/eink-words-card.html`
- OpenHI kit 페이지: `http://localhost:8000/openhi-kit.html`

일반적인 사용자 흐름:

1. `index.html`에 접속합니다.
2. 생태계 섹션과 제품 카드를 둘러봅니다.
3. 제품 상세 페이지로 이동하거나 외부 앱(`chat.lazying.art`, `onlyideas.art`, `coin.lazying.art`)을 엽니다.
4. 제품 페이지의 Stripe buy button을 사용합니다.

## ⚙️ 설정

설정은 파일 기반이며 대부분 인라인으로 구성되어 있습니다:

- `_config.yml`
  - 사이트 메타데이터(`title`, `description`, `url`)
  - 소셜 메타데이터
  - GitHub Pages 플러그인(`jekyll-sitemap`, `jekyll-seo-tag`)
  - HTML 압축 설정
  - `google_analytics`는 현재 플레이스홀더(`UA-XXXXXXXXX-X`)
- `CNAME`
  - GitHub Pages용 커스텀 도메인 매핑(`lazying.art`)
- 각 페이지의 인라인 JS
  - `supportedLangs` 로케일 목록
  - 번역 딕셔너리
  - 언어/테마 상태 관리(`localStorage`)

가정: 실제 분석 ID가 플레이스홀더를 대체하기 전까지 분석 기능은 활성화되지 않습니다.

## 🧪 예시

전체 사이트를 로컬에서 서빙:

```bash
python -m http.server 8000
```

주요 엔드포인트 빠르게 검증:

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

브라우저 콘솔에서 저장된 UI 선호도 초기화:

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 개발 노트

- 이 프로젝트는 의도적으로 정적이며 프레임워크를 사용하지 않습니다.
- 대부분의 동작(i18n, 테마, 제품 상호작용 UI)은 페이지별 인라인으로 구현되어 있습니다.
- 현재 이 저장소에는 패키지 매니페스트(`package.json`)나 자동화 테스트 스위트가 없습니다.
- `i18n/` 디렉터리는 존재하지만 현재 비어 있으며, 현지화 문자열은 HTML 파일에 내장되어 있습니다.
- `donate/`, `app/donate/`, `product-assets/` 같은 빈 디렉터리는 향후 사용을 위해 예약된 것으로 보입니다.

권장 편집 워크플로:

1. 로컬 정적 서버를 실행합니다.
2. 페이지를 수정합니다.
3. 데스크톱/모바일 레이아웃 및 언어/테마 토글을 확인합니다.
4. 외부 링크와 Stripe 위젯 로드를 확인합니다.

## 📊 성능

이전 README의 목표 프로필에 따르면:

- ⚡ <1s First Contentful Paint
- 📱 100% Mobile-friendly
- ♿ WCAG 2.1 AA Compliant
- 🎯 100/100 Lighthouse Score

가정: 주요 시각 요소 또는 스크립트 업데이트 이후에는 이 지표를 다시 측정해야 합니다.

## 🛠️ 문제 해결

| 증상 | 확인 사항 |
|---|---|
| 로컬 서버는 실행되지만 페이지 스타일이 깨져 보임 | 차단된 로컬 파일 컨텍스트가 아닌 `http://localhost:8000`으로 열고 있는지 확인하세요. |
| Stripe buy button이 렌더링되지 않음 | 인터넷 연결과 `https://js.stripe.com/v3/buy-button.js` 접근 가능 여부를 확인하세요. |
| 언어가 예상대로 변경되지 않음 | `localStorage` 키(`lang`, `theme`)를 지우고 다시 로드하세요. |
| GitHub Pages 배포 결과가 기대와 다름 | `main` 브랜치 퍼블리싱 설정, `CNAME`, `_config.yml` 값을 확인하세요. |
| SEO 파일이 오래된 것처럼 보임 | 페이지 추가/삭제 시 `sitemap.xml` 항목과 타임스탬프를 업데이트하세요. |

## 🗺️ 로드맵

- README와 저장소 구조 문서를 운영 중 페이지와 동기화 상태로 유지.
- README 파이프라인 단계의 일부로 `i18n/` 다국어 README 변형을 추가/유지.
- 중복을 줄이기 위해 반복되는 인라인 JS/CSS를 공용 자산으로 중앙화하는 방안 검토.
- 깨진 링크 및 기본 HTML 검증을 위한 자동 점검 추가.
- 운영 분석이 확정되면 플레이스홀더 분석 설정 교체.

## 🤝 기여

기여를 환영합니다! Pull Request를 자유롭게 제출해 주세요.

권장 기여 흐름:

1. 저장소를 포크합니다.
2. 기능 브랜치를 생성합니다.
3. 페이지를 로컬에서 테스트합니다.
4. 시각 변경 사항에는 스크린샷을 포함해 PR을 엽니다.

## ❤️ 지원 / 스폰서십

프로젝트를 지원하고 싶다면:

- GitHub Sponsors: [lachlanchen](https://github.com/sponsors/lachlanchen)
- Website: [lazying.art](https://lazying.art)
- Product: [chat.lazying.art](https://chat.lazying.art)
- Ecosystem: [onlyideas.art](https://onlyideas.art)

펀딩 메타데이터 출처: `.github/FUNDING.yml`.

## 📝 라이선스

© 2024 LazyingArt. All rights reserved.

## 📧 연락처

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
