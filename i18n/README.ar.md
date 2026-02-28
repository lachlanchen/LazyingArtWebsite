[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


<p align="center">
  <img src="https://raw.githubusercontent.com/lachlanchen/lachlanchen/main/logos/banner.png" alt="لافتة LazyingArt" />
</p>

# LazyingArt - الموقع الرسمي

<p align="left">
  <a href="https://lazying.art"><img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Flazying.art&label=Lazying.art&color=00A86B"></a>
  <a href="https://chat.lazying.art"><img alt="EchoMind" src="https://img.shields.io/badge/EchoMind-Try%20Now-4F46E5"></a>
  <a href="https://pages.github.com/"><img alt="GitHub Pages" src="https://img.shields.io/badge/Deploy-GitHub%20Pages-24292F"></a>
  <img alt="Stack" src="https://img.shields.io/badge/Stack-HTML%2FCSS%2FJS-FF6B35">
  <img alt="Locales" src="https://img.shields.io/badge/Locales-13-blue">
</p>

## 🎨 عن LazyingArt

تُعد LazyingArt من الجهات الرائدة في رسم مستقبل التواصل متعدد اللغات بالاعتماد على الذكاء الاصطناعي. نحن نؤمن بأن التقنية يجب أن تُزيل الحواجز لا أن تصنعها. مهمتنا هي جعل التواصل العالمي طبيعيًا مثل التنفس.

يحتوي هذا المستودع على الموقع العام وصفحات الهبوط الخاصة بمنتجات منظومة LazyingArt، بما في ذلك EchoMind وصفحات منتجات الأجهزة.

## 🌍 EchoMind - منتجنا الرئيسي

**EchoMind** هو رفيقنا الثوري متعدد اللغات المعتمد على الذكاء الاصطناعي، ويقدّم:

- 🎙️ تفاعلًا صوتيًا لحظيًا بأكثر من 10 لغات
- 🧠 ذاكرة سياقية وتخصيصًا شخصيًا
- 📚 تعلّمًا تفاعليًا للغات مع أدلة نطق
- 🔤 تحليلًا نحويًا وتحسينًا لغويًا
- 💬 ميزات اجتماعية للتواصل مع الآخرين

**جرّب EchoMind**: [chat.lazying.art](https://chat.lazying.art)

## 🚀 البدء السريع

يستضيف هذا المستودع موقع شركة LazyingArt على [lazying.art](https://lazying.art).

### التطوير المحلي

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

### النشر

يتم نشر الموقع تلقائيًا عبر GitHub Pages عند دفع التغييرات إلى فرع `main`.

## ✨ الميزات

| المجال | التفاصيل |
|---|---|
| Architecture | تنفيذ ثابت بدون إطار عمل (HTML/CSS/vanilla JavaScript). |
| Pages | صفحة تسويقية رئيسية بالإضافة إلى صفحات منتجات مخصّصة: `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| Localization | دعم واجهة متعددة اللغات مع 13 لغة مضمّنة داخل سكربتات الصفحات: `en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr` |
| i18n Runtime | استبدال النصوص المترجمة باستخدام مفاتيح `[data-i18n]` |
| Persistence | حفظ تفضيل اللغة + تفضيل السمة عبر `localStorage` |
| Commerce | تكامل زر الشراء من Stripe لمسارات الدفع |
| Smart Defaults | كشف اللغة بمساعدة الموقع الجغرافي في الصفحة الرئيسية (`ipapi.co` مع بديل `ipwho.is`) |
| SEO/Domain | `CNAME`, `_config.yml`, `sitemap.xml` |

## 📁 بنية المشروع

التخطيط الحالي للمستودع:

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

كتلة البنية القديمة من README السابق (أُبقيت للاستمرارية):

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

## 🛠️ التقنيات

- Pure HTML5/CSS3/JavaScript (no framework dependencies)
- Glassmorphism and modern CSS effects
- Responsive design
- Progressive enhancement
- SEO optimized
- Stripe hosted buy button widgets (`https://js.stripe.com/v3/buy-button.js`)
- GitHub Pages + Jekyll config for metadata/plugins

## 📦 المتطلبات المسبقة

- متصفح حديث (Chrome، Firefox، Safari، Edge).
- Python 3 (اختياري، لخادم محلي ثابت).
- Git (للاستنساخ والتعاون).

لا يلزم وجود سلسلة بناء Node.js للتحرير/الاختبار المحلي القياسي.

## 🔧 التثبيت

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

التشغيل محليًا:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## ▶️ الاستخدام

الصفحات الأساسية:

- الصفحة الرئيسية: `http://localhost:8000/index.html`
- صفحة منتج الروبوت: `http://localhost:8000/robot.html`
- صفحة منتج الحبر الإلكتروني: `http://localhost:8000/eink-words-card.html`
- صفحة عدة OpenHI: `http://localhost:8000/openhi-kit.html`

تدفّق المستخدم المعتاد:

1. زيارة `index.html`.
2. استكشاف أقسام المنظومة وبطاقات المنتجات.
3. الانتقال إلى تفاصيل المنتجات أو فتح التطبيقات الخارجية (`chat.lazying.art`, `onlyideas.art`, `coin.lazying.art`).
4. استخدام أزرار شراء Stripe في صفحات المنتجات.

## ⚙️ الإعداد

الإعداد قائم على الملفات ومعظمه مضمّن داخل الصفحات:

- `_config.yml`
  - بيانات تعريف الموقع (`title`, `description`, `url`)
  - بيانات اجتماعية
  - إضافات GitHub Pages (`jekyll-sitemap`, `jekyll-seo-tag`)
  - إعدادات ضغط HTML
  - `google_analytics` هو حاليًا قيمة مكانية (`UA-XXXXXXXXX-X`)
- `CNAME`
  - ربط النطاق المخصص لـ GitHub Pages (`lazying.art`)
- JavaScript مضمّن داخل كل صفحة
  - قائمة اللغات `supportedLangs`
  - قواميس الترجمة
  - إدارة حالة اللغة/السمة (`localStorage`)

افتراض: التحليلات غير مفعّلة حتى استبدال المعرّف الوهمي بمعرّف حقيقي.

## 🧪 أمثلة

تشغيل الموقع كاملًا محليًا:

```bash
python -m http.server 8000
```

التحقق سريعًا من نقاط النهاية الرئيسية:

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

إعادة ضبط تفضيلات الواجهة المحفوظة من وحدة تحكم المتصفح:

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 ملاحظات التطوير

- المشروع ثابت عمدًا وبدون إطار عمل.
- معظم السلوكيات (i18n، السمة، واجهة تفاعل المنتجات) مطبّقة بشكل مضمّن داخل كل صفحة.
- لا يوجد حاليًا ملف حزم (`package.json`) أو حزمة اختبارات آلية في هذا المستودع.
- `i18n/` موجود لكنه فارغ حاليًا؛ سلاسل الترجمة مضمنة داخل ملفات HTML.
- مجلدات فارغة مثل `donate/` و`app/donate/` و`product-assets/` تبدو مخصّصة لاستخدامات مستقبلية.

سير عمل تحرير موصى به:

1. تشغيل خادم ثابت محلي.
2. إجراء تعديلات الصفحات.
3. التحقق من تخطيط سطح المكتب/الجوال وتبديل اللغة/السمة.
4. التحقق من الروابط الخارجية وتحميل ويدجت Stripe.

## 📊 الأداء

كما ورد في ملف README السابق ضمن ملف تعريف الأهداف:

- ⚡ <1s First Contentful Paint
- 📱 100% Mobile-friendly
- ♿ WCAG 2.1 AA Compliant
- 🎯 100/100 Lighthouse Score

افتراض: يجب إعادة قياس هذه المؤشرات بعد أي تحديثات كبيرة على التصميم أو السكربتات.

## 🛠️ استكشاف الأخطاء وإصلاحها

| العرض | التحقق |
|---|---|
| يبدأ الخادم المحلي لكن الصفحات تظهر دون تنسيق | تأكد من الفتح عبر `http://localhost:8000` وليس من سياق ملف محلي محجوب. |
| زر الشراء من Stripe لا يظهر | تأكد من توفر الإنترنت وإمكانية الوصول إلى `https://js.stripe.com/v3/buy-button.js`. |
| اللغة لا تتغير كما هو متوقع | امسح مفاتيح `localStorage` (`lang`, `theme`) ثم أعد التحميل. |
| عدم تطابق النشر على GitHub Pages | تحقّق من إعدادات النشر لفرع `main` وقيم `CNAME` و`_config.yml`. |
| ملفات SEO تبدو قديمة | حدّث إدخالات `sitemap.xml` والطوابع الزمنية عند إضافة/إزالة صفحات. |

## 🗺️ خارطة الطريق

- إبقاء README وتوثيق بنية المستودع متزامنين مع صفحات الإنتاج.
- إضافة/صيانة نُسخ README متعددة اللغات في `i18n/` ضمن خطوات خط أنابيب README.
- التفكير في توحيد JavaScript/CSS المضمّن المتكرر داخل أصول مشتركة لتقليل التكرار.
- إضافة فحوصات آلية للروابط المعطوبة والتحقق الأساسي من HTML.
- استبدال إعداد التحليلات الوهمي عند اعتماد تحليلات الإنتاج نهائيًا.

## 🤝 المساهمة

نرحب بالمساهمات! لا تتردد في إرسال Pull Request.

تدفق مساهمة موصى به:

1. Fork للمستودع.
2. إنشاء فرع ميزة.
3. اختبار الصفحات محليًا.
4. فتح PR مع لقطات شاشة للتغييرات البصرية.

## ❤️ الدعم / الرعاية

إذا أردت دعم المشروع:

- GitHub Sponsors: [lachlanchen](https://github.com/sponsors/lachlanchen)
- Website: [lazying.art](https://lazying.art)
- Product: [chat.lazying.art](https://chat.lazying.art)
- Ecosystem: [onlyideas.art](https://onlyideas.art)

مصدر بيانات التمويل: `.github/FUNDING.yml`.

## 📝 الترخيص

© 2024 LazyingArt. جميع الحقوق محفوظة.

## 📧 التواصل

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
