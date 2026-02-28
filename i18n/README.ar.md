[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)


[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# LazyingArt - الموقع الرسمي

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

### 📌 لمحة سريعة

| العنصر | المعلومات |
| --- | --- |
| ✅ تركيز المستودع | موقع تسويقي متعدد اللغات مع نقاط دخول للمنتجات الخاصة بـ LazyingArt |
| 🌍 الجمهور | الزائرون، متعلمو اللغات، المتعاونون، المساهمون |
| 🧩 الصفحات الأساسية | `index.html`, `robot.html`, `eink-words-card.html`, `openhi-kit.html` |
| 🧱 التشغيل | HTML/CSS/JS خام مع استبدال النصوص المترجمة مدمجًا |

## 🎨 حول LazyingArt

LazyingArt هي منصة تواصل بالذكاء الاصطناعي ومجموعة صفحات هبوط متعددة اللغات. يحتوي هذا المستودع على الموقع العام وصفحات المنتجات الخاصة بـ LazyingArt، بما في ذلك تجربة **EchoMind** الرئيسية وصفحات الأجهزة الداعمة.

- **الرسالة:** جعل التواصل بين اللغات يبدو طبيعياً وسريعا وإنسانياً.
- **النطاق:** موقع ثابت يعمل داخل المتصفح، منشور عبر GitHub Pages.
- **الجمهور:** الزائرون، فرق المنتجات، المتعاونون، والمساهمون.

## 🌍 EchoMind - منتجنا الرئيسي

يُعرض **EchoMind** عبر صفحات الهبوط هنا ويدعم:

- 🎙️ تفاعلًا صوتيًا في الوقت الفعلي بأكثر من 10 لغات
- 🧠 ذاكرة سياقية وتخصيص
- 📚 ميزات تفاعلية لتعلم اللغات وإشارات النطق
- 🔤 تحليل نحوي وتحسين النص
- 💬 تفاعلات اجتماعية/مجتمعية لممارسة التواصل

**جرب EchoMind:** [chat.lazying.art](https://chat.lazying.art)

## 🚀 البدء السريع

يوفر هذا المستودع موقع LazyingArt على [lazying.art](https://lazying.art).

### التطوير المحلي

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

Open directly:

```bash
# macOS
open index.html

# Alternative no-dependency server
python -m http.server 8000
# then open http://localhost:8000
```

### النشر

GitHub Pages هو هدف النشر الأساسي. يجب أن تنشر التغييرات المرسلة إلى الفرع `main` عبر إعدادات Pages في المستودع وملف `CNAME` على النطاق المخصص.

## ✨ المميزات

| المجال | التفاصيل |
|---|---|
| البنية | تنفيذ ثابت بدون إطار عمل (HTML/CSS/vanilla JavaScript). |
| الصفحات | الصفحة الرئيسية بالإضافة إلى صفحات مخصصة: `index.html` و `robot.html` و `eink-words-card.html` و `openhi-kit.html`. |
| التعريب | 13 لغة معتمدة في منطق اللغة وقت التشغيل (`en`, `ja`, `zh-Hans`, `zh-Hant`, `ko`, `ar`, `vi`, `fr`, `es`, `pt`, `de`, `ru`, `tr`). |
| وقت التشغيل الدولي | مفاتيح `[data-i18n]` داخل الصفحة مع استبدال القواميس. |
| الحفظ | تفضيلات اللغة والثيم محفوظة عبر `localStorage`. |
| التجارة | تكامل زر شراء Stripe عبر `https://js.stripe.com/v3/buy-button.js`. |
| الإعدادات الذكية | كشف لغة مبدئي مضافًا إليه تحديد جغرافي على الصفحة الرئيسية (`ipapi.co` + احتياطي `ipwho.is`). |
| SEO/النطاق | `CNAME` و `_config.yml` و `sitemap.xml` لبيانات GitHub Pages الوصفية والتوجيه. |

## 📁 بنية المشروع

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

المراجع الأقدم في المسودات السابقة (مثل `robots.txt` و `.nojekyll` و `assets/`) لم تعد موجودة في لقطة المستودع الحالية، وكانت تُحفظ فقط كسياق تاريخي.

## 🛠️ التقنيات

- HTML5 / CSS3 / vanilla JavaScript (لا توجد اعتماديات إطار عمل)
- نظام بصري مستوحى من Glassmorphism وتصميمات متجاوبة
- تحسين تدريجي للأقسام التفاعلية
- بيانات وصفية موجهة لمحركات البحث، توجيه نطاق مخصص، ودعم خريطة الموقع
- إعداد GitHub Pages متوافق مع Jekyll (`jekyll-sitemap`, `jekyll-seo-tag`)

## 📦 المتطلبات الأساسية

- متصفح حديث (Chrome و Firefox و Safari و Edge)
- Git (للاستنساخ والتعاون)
- Python 3 (اختياري، لخدمة الملفات محليًا)

لا يلزم وجود سلسلة أدوات بناء Node.js للعمل المحلي العادي.

## 🔧 التثبيت

```bash
git clone git@github.com:lachlanchen/LazyingArtWebsite.git
cd LazyingArtWebsite
```

قد يختلف مسار المستودع وURI الاستنساخ حسب الـ fork. استخدم رابط المستودع الخاص بك عند المساهمة عبر طلب سحب.

## ▶️ الاستخدام

توجيهات الصفحات الأساسية:

- الصفحة الرئيسية: `index.html`
- صفحة الروبوت: `robot.html`
- منتج الحبر الإلكتروني: `eink-words-card.html`
- طقم OpenHI: `openhi-kit.html`

التدفق المحلي:

1. افتح `index.html`
2. استكشف أقسام منظومة المنتجات
3. انتقل إلى تفاصيل الصفحة الخاصة والخبرات الخارجية (`chat.lazying.art`، `onlyideas.art`، `coin.lazying.art`)
4. استخدم أزرار Stripe المستضافة لإجراءات التجارة على صفحات المنتج

## ⚙️ الإعدادات

- `_config.yml`
  - بيانات الموقع الوصفية (`title`, `description`, `url`)
  - بيانات SEO ووسائط التواصل الاجتماعي
  - إعدادات إضافة GitHub Pages
  - ملاحظة: `google_analytics` يحتوي حاليًا على معرّف نائب (`UA-XXXXXXXXX-X`)
- `CNAME`
  - يربط النطاق المخصص (`lazying.art`) لـ Pages
- السكربتات المضمنة داخل HTML
  - تهيئة اللغة والثيم
  - `supportedLangs` مع بيانات التعريف للمحلّية
  - قواميس الترجمة واستبدال `[data-i18n]`
  - حفظ تفضيلات اللغة والثيم في `localStorage`

*الافتراض:* `google_analytics` غير مفعل حتى يتم استبدال المعرف الوهمي بمعرف تتبع فعلي.

## 🧪 أمثلة

ابدأ سيرفرًا محليًا وتحقق من الصفحات بسرعة:

```bash
python -m http.server 8000
```

```bash
curl -I http://localhost:8000/
curl -I http://localhost:8000/robot.html
curl -I http://localhost:8000/eink-words-card.html
curl -I http://localhost:8000/openhi-kit.html
```

إعادة تعيين التفضيلات المحفوظة في وحدة تحكم المتصفح:

```js
localStorage.removeItem('lang');
localStorage.removeItem('theme');
location.reload();
```

## 🧑‍💻 ملاحظات التطوير

- هندسة «أولاً ثابتة» keep maintenance and hosting simple.
- سلوكيات اللغة ومفاتيح الثيم مطبقة مباشرة داخل كل صفحة.
- لا يوجد `package.json` أو transpilation أو نظام اختبارات آلي.
- يوجد `i18n/README.*.md` للوثائق المترجمة، بينما ترجمات الصفحات مدمجة حاليًا داخل سكربتات الصفحات.
- تظهر `donate/` و `app/donate/` و `product-assets/` حاليًا كعناصر محتفظ بها.
- سير العمل الموصى به: تعديل محلي ثابت → تحقق من المتصفح (سطح المكتب/الموبايل) → فحص الروابط.

## 📊 الأداء

ملف تعريف الهدف السابق في README يذكر:

- ⚡ أول لوحة محتوى مرئي خلال أقل من ثانية (`< 1s`)
- 📱 تخطيط متجاوب للأجهزة المحمولة أولاً
- ♿ ممارسات وصول موجّهة وفق WCAG في البنية
- 🎯 ملف تحسين موجه نحو Lighthouse

ينبغي إعادة قياس هذه القيم بعد تغييرات UI كبيرة.

## 🛠️ استكشاف الأخطاء وإصلاحها

| العرض | ما يجب التحقق منه |
|---|---|
| تبدو الصفحة بلا تنسيق بعد التشغيل | قدّمها عبر `http://localhost:8000` (لا تفتحها مباشرة عبر `file://`) |
| فشل تحميل زر Stripe | تأكد من الوصول الشبكي إلى `https://js.stripe.com/v3/buy-button.js` |
| لا تتبدل اللغة | امسح مفاتيح `localStorage` (`lang`, `theme`) وأعد التحميل |
| عدم تطابق مسارات Pages | تأكد من `CNAME` وهدف فرع النشر وقيم `_config.yml` |
| بيانات SEO قديمة | حدّث `sitemap.xml` بعد إضافة مسارات أو محتوى |

## 🗺️ خارطة الطريق

- الإبقاء على تزامن README وهيكل المستودع مع صفحات الإنتاج
- توسيع وثائق `i18n/` لتكون متطابقة ومُحدّثة بانتظام
- استخراج المنطق المشترك أثناء التشغيل إلى وحدات قابلة للإعادة لاستخدامها لتقليل تكرار الصفحات
- إضافة فحص الروابط والتحقق الخفيف من HTML/الهيكل في CI
- استبدال إعدادات التحليلات الوهمية عند اعتمادها نهائيًا
- إضافة إرشادات للمساهمين حول QA التعريب ومراجعة لقطات الشاشة

## 🤝 المساهمة

1. Fork المستودع.
2. أنشئ فرعًا وصفيًا (على سبيل المثال، `docs/update-landing-copy`).
3. عدّل HTML ذات الصلة ومستندات `i18n`.
4. تحقق من عرض سطح المكتب والموبايل ومفاتيح اللغة والثيم.
5. افتح طلب سحب مع لقطات شاشة أو تسجيلات واضحة للتغييرات المرئية.

الرجاء الحفاظ على التحديثات صغيرة ومركزة (المحتوى وإمكانية الوصول وسلوك الاستجابة لها أعلى أولويات المراجعة).

## 📄 الترخيص

لا يوجد ملف `LICENSE` مخصص في لقطة هذا المستودع.

يرجى تأكيد الترخيص الرسمي للمشروع مع مالكي المشروع وإضافة مرجع الترخيص الكامل هنا.


## ❤️ Support

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://camo.githubusercontent.com/24a4914f0b42c6f435f9e101621f1e52535b02c225764b2f6cc99416926004b7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f446f6e6174652d4c617a79696e674172742d3045413545393f7374796c653d666f722d7468652d6261646765266c6f676f3d6b6f2d6669266c6f676f436f6c6f723d7768697465)](https://chat.lazying.art/donate) | [![PayPal](https://camo.githubusercontent.com/d0f57e8b016517a4b06961b24d0ca87d62fdba16e18bbdb6aba28e978dc0ea21/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50617950616c2d526f6e677a686f754368656e2d3030343537433f7374796c653d666f722d7468652d6261646765266c6f676f3d70617970616c266c6f676f436f6c6f723d7768697465)](https://paypal.me/RongzhouChen) | [![Stripe](https://camo.githubusercontent.com/1152dfe04b6943afe3a8d2953676749603fb9f95e24088c92c97a01a897b4942/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5374726970652d446f6e6174652d3633354246463f7374796c653d666f722d7468652d6261646765266c6f676f3d737472697065266c6f676f436f6c6f723d7768697465)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |
