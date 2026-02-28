[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


<p align="center">
  <img src="https://raw.githubusercontent.com/lachlanchen/lachlanchen/main/logos/banner.png" alt="LazyingArt banner" />
</p>

🌐 README này là bản tiếng Việt. Các ngôn ngữ khác được tạo qua pipeline `i18n/`.

# LazyingArt - Trang web chính thức

<p align="left">
  <a href="https://lazying.art"><img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Flazying.art&label=Lazying.art&color=00A86B"></a>
  <a href="https://chat.lazying.art"><img alt="EchoMind" src="https://img.shields.io/badge/EchoMind-Try%20Now-4F46E5"></a>
  <a href="https://pages.github.com/"><img alt="GitHub Pages" src="https://img.shields.io/badge/Deploy-GitHub%20Pages-24292F"></a>
  <img alt="Stack" src="https://img.shields.io/badge/Stack-HTML%2FCSS%2FJS-FF6B35">
  <img alt="Locales" src="https://img.shields.io/badge/Locales-13-blue">
</p>

## 🎨 Về LazyingArt

LazyingArt đang tiên phong cho tương lai giao tiếp AI đa ngôn ngữ. Chúng tôi tin rằng công nghệ phải phá bỏ rào cản, không phải tạo thêm rào cản. Sứ mệnh của chúng tôi là biến giao tiếp toàn cầu trở nên tự nhiên như hơi thở.

Kho mã này chứa website công khai và các trang landing sản phẩm của hệ sinh thái LazyingArt, bao gồm EchoMind và các trang sản phẩm phần cứng.

## 🌍 EchoMind - Sản phẩm chủ lực của chúng tôi

**EchoMind** là trợ lý AI đa ngôn ngữ đột phá của chúng tôi, với các tính năng:

- 🎙️ Tương tác giọng nói thời gian thực với hơn 10 ngôn ngữ
- 🧠 Bộ nhớ ngữ cảnh và cá nhân hóa
- 📚 Học ngôn ngữ tương tác kèm hướng dẫn phát âm
- 🔤 Phân tích và cải thiện ngữ pháp
- 💬 Tính năng xã hội để kết nối với người khác

**Dùng thử EchoMind**: [chat.lazying.art](https://chat.lazying.art)

## 🚀 Bắt đầu nhanh

Kho mã này lưu trữ website công ty LazyingArt tại [lazying.art](https://lazying.art).

### Phát triển cục bộ

```bash
# Clone repository (canonical)
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

### Triển khai

Trang web được triển khai tự động qua GitHub Pages khi có thay đổi được đẩy lên nhánh `main`.

## ✨ Tính năng

| Khu vực | Chi tiết |
|---|---|
| Kiến trúc | Triển khai tĩnh không dùng framework (HTML/CSS/vanilla JavaScript). |
| Trang | Trang marketing chính cùng các trang sản phẩm chuyên biệt: `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| Bản địa hóa | Hỗ trợ UI đa ngôn ngữ với 13 locale nhúng trong script trang: `en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr` |
| Runtime i18n | Thay thế văn bản đã bản địa hóa bằng khóa `[data-i18n]` |
| Lưu trữ | Tùy chọn ngôn ngữ + giao diện được lưu qua `localStorage` |
| Thương mại | Tích hợp Stripe Buy Button cho luồng thanh toán |
| Mặc định thông minh | Phát hiện ngôn ngữ chính với hỗ trợ định vị địa lý (`ipapi.co` và fallback `ipwho.is`) |
| SEO/Tên miền | `CNAME`, `_config.yml`, `sitemap.xml` |

## 📁 Cấu trúc dự án

Bố cục kho mã hiện tại:

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

Khối cấu trúc cũ từ README trước đó (giữ lại để đảm bảo tính liên tục):

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

## 🛠️ Công nghệ

- HTML5/CSS3/JavaScript thuần (không phụ thuộc framework)
- Glassmorphism và hiệu ứng CSS hiện đại
- Thiết kế đáp ứng
- Nâng cao dần (progressive enhancement)
- Tối ưu SEO
- Widget Stripe hosted buy button (`https://js.stripe.com/v3/buy-button.js`)
- GitHub Pages + cấu hình Jekyll cho metadata/plugin

## 📦 Yêu cầu trước

- Trình duyệt hiện đại (Chrome, Firefox, Safari, Edge).
- Python 3 (tùy chọn, để chạy static server cục bộ).
- Git (để clone và cộng tác).

Không cần toolchain build Node.js cho việc chỉnh sửa/kiểm thử cục bộ thông thường.

## 🔧 Cài đặt

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Chạy cục bộ:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## ▶️ Cách dùng

Các trang chính:

- Trang landing: `http://localhost:8000/index.html`
- Trang sản phẩm Robot: `http://localhost:8000/robot.html`
- Trang sản phẩm E-ink: `http://localhost:8000/eink-words-card.html`
- Trang OpenHI kit: `http://localhost:8000/openhi-kit.html`

Luồng sử dụng điển hình:

1. Truy cập `index.html`.
2. Khám phá các mục hệ sinh thái và thẻ sản phẩm.
3. Điều hướng đến chi tiết sản phẩm hoặc mở ứng dụng bên ngoài (`chat.lazying.art`, `onlyideas.art`, `coin.lazying.art`).
4. Sử dụng Stripe buy button trên các trang sản phẩm.

## ⚙️ Cấu hình

Cấu hình dựa trên tệp và chủ yếu đặt inline:

- `_config.yml`
  - Metadata trang (`title`, `description`, `url`)
  - Metadata mạng xã hội
  - Plugin GitHub Pages (`jekyll-sitemap`, `jekyll-seo-tag`)
  - Thiết lập nén HTML
  - `google_analytics` hiện là placeholder (`UA-XXXXXXXXX-X`)
- `CNAME`
  - Ánh xạ tên miền tùy chỉnh cho GitHub Pages (`lazying.art`)
- JS inline trong từng trang
  - Danh sách locale `supportedLangs`
  - Từ điển bản dịch
  - Quản lý trạng thái ngôn ngữ/giao diện (`localStorage`)

Giả định: analytics chưa hoạt động cho đến khi ID analytics thật thay thế giá trị placeholder.

## 🧪 Ví dụ

Phục vụ toàn bộ trang cục bộ:

```bash
python -m http.server 8000
```

Kiểm tra nhanh các endpoint chính:

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

Đặt lại tùy chọn UI đã lưu trong console trình duyệt:

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 Ghi chú phát triển

- Dự án được thiết kế có chủ đích là tĩnh và không dùng framework.
- Phần lớn hành vi (i18n, giao diện, UI tương tác sản phẩm) được triển khai inline theo từng trang.
- Hiện tại chưa có package manifest (`package.json`) hoặc bộ kiểm thử tự động trong kho mã này.
- `i18n/` đã tồn tại nhưng hiện đang trống; chuỗi bản địa hóa được nhúng trong các tệp HTML.
- Các thư mục trống như `donate/`, `app/donate/`, và `product-assets/` có vẻ được dành cho mục đích sử dụng trong tương lai.

Quy trình chỉnh sửa được khuyến nghị:

1. Chạy static server cục bộ.
2. Thực hiện chỉnh sửa trang.
3. Xác minh bố cục desktop/mobile và chuyển đổi ngôn ngữ/giao diện.
4. Xác minh các liên kết ngoài và khả năng tải Stripe widget.

## 📊 Hiệu năng

Theo hồ sơ mục tiêu đã nêu trong README trước:

- ⚡ <1s First Contentful Paint
- 📱 100% Mobile-friendly
- ♿ WCAG 2.1 AA Compliant
- 🎯 100/100 Lighthouse Score

Giả định: cần đo lại các chỉ số này sau các cập nhật lớn về giao diện hoặc script.

## 🛠️ Khắc phục sự cố

| Triệu chứng | Kiểm tra |
|---|---|
| Local server đã chạy nhưng trang hiển thị không có style | Đảm bảo bạn đang mở qua `http://localhost:8000` thay vì ngữ cảnh tệp cục bộ bị chặn. |
| Stripe buy button không hiển thị | Xác nhận có internet và truy cập được `https://js.stripe.com/v3/buy-button.js`. |
| Ngôn ngữ không thay đổi như mong đợi | Xóa các khóa `localStorage` (`lang`, `theme`) rồi tải lại. |
| Triển khai trên GitHub Pages không khớp | Kiểm tra thiết lập publish nhánh `main`, `CNAME`, và giá trị trong `_config.yml`. |
| Tệp SEO trông đã lỗi thời | Cập nhật các mục và dấu thời gian trong `sitemap.xml` khi thêm/xóa trang. |

## 🗺️ Lộ trình

- Giữ README và tài liệu cấu trúc kho mã luôn đồng bộ với các trang production.
- Thêm/duy trì các biến thể README đa ngôn ngữ trong `i18n/` như một phần của các bước pipeline README.
- Cân nhắc gom các JS/CSS inline lặp lại vào tài nguyên dùng chung để giảm trùng lặp.
- Thêm kiểm tra tự động cho liên kết hỏng và xác thực HTML cơ bản.
- Thay thế cấu hình analytics placeholder khi analytics production được chốt.

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Bạn có thể gửi Pull Request bất cứ lúc nào.

Quy trình đóng góp được khuyến nghị:

1. Fork repo.
2. Tạo nhánh tính năng.
3. Kiểm thử trang cục bộ.
4. Mở PR kèm ảnh chụp màn hình cho các thay đổi giao diện.

## ❤️ Hỗ trợ / Tài trợ

Nếu bạn muốn hỗ trợ dự án:

- GitHub Sponsors: [lachlanchen](https://github.com/sponsors/lachlanchen)
- Website: [lazying.art](https://lazying.art)
- Product: [chat.lazying.art](https://chat.lazying.art)
- Ecosystem: [onlyideas.art](https://onlyideas.art)

Nguồn metadata tài trợ: `.github/FUNDING.yml`.

## 📝 Giấy phép

© 2024 LazyingArt. Bảo lưu mọi quyền.

## 📧 Liên hệ

- Website: [lazying.art](https://lazying.art)
- Product: [chat.lazying.art](https://chat.lazying.art)
- Email: contact@lazying.art
- Twitter: [@lazyingart](https://twitter.com/lazyingart)

---

<p align="center">Được tạo nên với ❤️ bởi đội ngũ LazyingArt</p>
<p align="center">
  <a href="https://lazying.art">Website</a> •
  <a href="https://chat.lazying.art">Try EchoMind</a> •
  <a href="https://twitter.com/lazyingart">Twitter</a>
</p>
