[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# LazyingArt - Trang web chính thức

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

### 📌 Tổng quan nhanh

| Mục | Thông tin |
| --- | --- |
| ✅ Mục tiêu repo | Trang web tiếp thị đa ngôn ngữ với các điểm truy cập sản phẩm của LazyingArt |
| 🌍 Đối tượng | Khách truy cập, người học ngôn ngữ, cộng tác viên, người đóng góp |
| 🧩 Trang chủ | `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| 🧱 Chạy | HTML/CSS/vanilla JS với nội suy văn bản đã địa phương hóa |

## 🎨 Giới thiệu về LazyingArt

LazyingArt là nền tảng giao tiếp AI đa ngôn ngữ và hệ sinh thái trang landing-site. Kho chứa này là website công khai và các trang sản phẩm của LazyingArt, bao gồm trải nghiệm chủ lực **EchoMind** và các trang phần cứng hỗ trợ.

- **Sứ mệnh:** Giúp giao tiếp xuyên ngôn ngữ trở nên tự nhiên, nhanh chóng và gần gũi.
- **Phạm vi:** Website tĩnh hướng tới trình duyệt, triển khai qua GitHub Pages.
- **Đối tượng:** Khách truy cập, nhóm sản phẩm, cộng tác viên và người đóng góp.

## 🌍 EchoMind - Sản phẩm nổi bật

**EchoMind** được giới thiệu qua các trang landing tại đây và hỗ trợ:

- 🎙️ Tương tác giọng nói thời gian thực bằng hơn 10 ngôn ngữ
- 🧠 Bộ nhớ ngữ cảnh và cá nhân hóa
- 📚 Tính năng học ngôn ngữ tương tác và gợi ý phát âm
- 🔤 Phân tích ngữ pháp và cải thiện văn bản
- 💬 Tương tác xã hội/cộng đồng để luyện tập giao tiếp

**Dùng thử EchoMind:** [chat.lazying.art](https://chat.lazying.art)

## 🚀 Bắt đầu nhanh

Kho chứa này lưu trữ website LazyingArt tại [lazying.art](https://lazying.art).

### Phát triển cục bộ

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Mở trực tiếp:

```bash
# macOS
open index.html

# Máy chủ không cần phụ thuộc (tuỳ chọn)
python -m http.server 8000
# sau đó mở http://localhost:8000
```

### Triển khai

GitHub Pages là điểm triển khai chính. Các thay đổi đẩy lên `main` nên được xuất bản trên miền tuỳ chỉnh qua cài đặt Pages của kho và tệp `CNAME`.

## ✨ Tính năng

| Khu vực | Chi tiết |
|---|---|
| Kiến trúc | Triển khai tĩnh không dùng framework (HTML/CSS/vanilla JavaScript). |
| Trang | Trang đích chính kèm các trang chuyên biệt: `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html`. |
| Đa ngôn ngữ | 13 locale được hỗ trợ trong logic ngôn ngữ runtime (`en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr`). |
| Runtime i18n | Từ điển `[data-i18n]` nội tuyến trên mỗi trang. |
| Lưu trữ | Tùy chọn ngôn ngữ + theme được lưu trong `localStorage`. |
| Thương mại | Tích hợp nút thanh toán Stripe qua `https://js.stripe.com/v3/buy-button.js`. |
| Mặc định thông minh | Nhận diện ngôn ngữ có hỗ trợ địa lý trên trang chính (`ipapi.co` + `ipwho.is` dự phòng). |
| SEO/Tên miền | `CNAME`, `_config.yml`, và `sitemap.xml` cho metadata và định tuyến của GitHub Pages. |

## 📁 Cấu trúc dự án

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

Tham chiếu cũ trong các bản nháp trước (ví dụ `robots.txt`, `.nojekyll`, `assets/`) không còn xuất hiện trong bản snapshot kho hiện tại và chỉ được giữ lại như bối cảnh lịch sử.

## 🛠️ Công nghệ

- HTML5 / CSS3 / vanilla JavaScript (không phụ thuộc framework)
- Hệ thống trực quan lấy cảm hứng từ Glassmorphism và bố cục responsive
- Nâng cấp dần cho các phần tương tác
- Metadata tối ưu cho SEO, định tuyến miền tuỳ chỉnh, và hỗ trợ sitemap
- Cấu hình GitHub Pages tương thích Jekyll (`jekyll-sitemap`, `jekyll-seo-tag`)

## 📦 Yêu cầu

- Trình duyệt hiện đại (Chrome, Firefox, Safari, Edge)
- Git (để clone và cộng tác)
- Python 3 (tùy chọn, để chạy local tĩnh)

Không cần hệ thống build Node.js cho công việc địa phương thông thường.

## 🔧 Cài đặt

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Đường dẫn kho và URI clone có thể thay đổi theo fork. Hãy dùng URL kho của bạn khi đóng góp qua pull request.

## ▶️ Cách sử dụng

Các route chính:

- Landing: `index.html`
- Robot: `robot.html`
- Sản phẩm E-ink: `eink-words-card.html`
- Bộ OpenHI: `openhi-kit.html`

Luồng làm việc cục bộ:

1. Mở `index.html`
2. Khám phá các khu vực hệ sinh thái sản phẩm
3. Điều hướng đến chi tiết theo từng trang và trải nghiệm ngoài môi trường (`chat.lazying.art`, `onlyideas.art`, `coin.lazying.art`)
4. Dùng các nút Stripe được host cho hành động thương mại trên trang sản phẩm

## ⚙️ Cấu hình

- `_config.yml`
  - Metadata site (`title`, `description`, `url`)
  - Metadata SEO và social
  - Cài đặt plugin GitHub Pages
  - Lưu ý: `google_analytics` hiện đang chứa ID mẫu (`UA-XXXXXXXXX-X`)
- `CNAME`
  - Gắn miền tuỳ chỉnh (`lazying.art`) cho Pages
- Script runtime nhúng trong HTML
  - Khởi tạo ngôn ngữ/theme
  - `supportedLangs` cùng metadata locale
  - Từ điển dịch thuật và nội suy `[data-i18n]`
  - Lưu trữ ngôn ngữ/theme trong `localStorage`

_Giả định:_ `google_analytics` chưa hoạt động cho đến khi ID theo dõi thật thay thế placeholder.

## 🧪 Ví dụ

Khởi chạy server cục bộ và kiểm tra nhanh các trang:

```bash
python -m http.server 8000
```

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

Đặt lại các tùy chọn đã lưu trong console trình duyệt:

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 Ghi chú phát triển

- Kiến trúc static-first giúp việc bảo trì và hosting đơn giản hơn.
- Hành vi locale và chuyển theme được triển khai nội tuyến trên từng trang.
- Không có `package.json`, không có transpilation, và không có test suite tự động.
- `i18n/README.*.md` tồn tại cho tài liệu đã dịch, trong khi bản dịch trang hiện đang nhúng trong script của từng trang.
- `donate/`, `app/donate/`, và `product-assets/` hiện đang là các khu vực dự phòng.
- Quy trình gợi ý: chỉnh sửa tĩnh cục bộ → kiểm tra qua trình duyệt (máy tính/di động) → kiểm tra liên kết.

## 📊 Hiệu suất

Mục tiêu README trước đó nêu:

- ⚡ Thời gian hiển thị nội dung đầu tiên (FCP) < 1 giây
- 📱 Bố cục responsive theo nguyên tắc mobile-first
- ♿ Thực hành tiếp cận theo hướng tiếp cận WCAG trong cấu trúc
- 🎯 Hồ sơ tối ưu hóa tập trung vào Lighthouse

Các giá trị này nên được đo lại sau khi có thay đổi lớn về UI.

## 🛠️ Khắc phục sự cố

| Triệu chứng | Kiểm tra |
|---|---|
| Trang trông chưa được style sau khi triển khai | Chạy qua `http://localhost:8000` (không mở trực tiếp bằng `file://`) |
| Nút Stripe không tải được | Kiểm tra kết nối mạng đến `https://js.stripe.com/v3/buy-button.js` |
| Ngôn ngữ không chuyển đổi | Xóa khóa `localStorage` (`lang`, `theme`) và tải lại |
| Đường dẫn trang lệch trên Pages | Xác nhận `CNAME`, target triển khai nhánh, và giá trị trong `_config.yml` |
| Metadata SEO lỗi thời | Cập nhật `sitemap.xml` sau khi thêm route hoặc nội dung mới |

## 🗺️ Lộ trình

- Giữ cho README và cấu trúc kho đồng bộ với các trang production
- Mở rộng tài liệu `i18n/` với độ tương đương đầy đủ và cập nhật thường xuyên
- Tách logic runtime dùng chung thành module tái sử dụng để giảm trùng lặp giữa các trang
- Thêm kiểm tra liên kết và xác thực HTML/định dạng nhẹ trong CI
- Thay thế cấu hình phân tích (analytics) mẫu khi hoàn thiện
- Bổ sung hướng dẫn đóng góp cho QA địa phương hóa và xem lại ảnh chụp màn hình

## 🤝 Đóng góp

1. Fork repository.
2. Tạo branch có mô tả (ví dụ `docs/update-landing-copy`).
3. Chỉnh sửa các file HTML liên quan và tài liệu `i18n`.
4. Kiểm tra hiển thị desktop/mobile và chuyển đổi giao diện/ngôn ngữ.
5. Tạo PR kèm ảnh chụp màn hình hoặc bản ghi màn hình rõ ràng cho các thay đổi với người dùng.

Hãy giữ các cập nhật nhỏ và tập trung (nội dung, khả năng tiếp cận, và hành vi responsive là ưu tiên cao nhất trong review).

## 📄 Giấy phép

Không có file `LICENSE` chuyên dụng nào trong snapshot kho này.

Vui lòng xác nhận giấy phép chính thức của dự án với ban sở hữu và thêm đầy đủ tham chiếu giấy phép tại đây.


## ❤️ Support

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://camo.githubusercontent.com/24a4914f0b42c6f435f9e101621f1e52535b02c225764b2f6cc99416926004b7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446f6e6174652d4c617a79696e674172742d3045413545393f7374796c653d666f722d7468652d6261646765266c6f676f3d6b6f2d6669266c6f676f436f6c6f723d7768697465)](https://chat.lazying.art/donate) | [![PayPal](https://camo.githubusercontent.com/d0f57e8b016517a4b06961b24d0ca87d62fdba16e18bbdb6aba28e978dc0ea21/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50617950616c2d526f6e677a686f754368656e2d3030343537433f7374796c653d666f722d7468652d6261646765266c6f676f3d70617970616c266c6f676f436f6c6f723d7768697465)](https://paypal.me/RongzhouChen) | [![Stripe](https://camo.githubusercontent.com/1152dfe04b6943afe3a8d2953676749603fb9f95e24088c92c97a01a897b4942/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5374726970652d446f6e6174652d3633354246463f7374796c653d666f722d7468652d6261646765266c6f676f3d737472697065266c6f676f436f6c6f723d7768697465)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |
