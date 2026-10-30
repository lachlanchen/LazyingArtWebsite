// Progressive enhancement: existing download links remain the availability authority.
export function appleQrPlans(links, manifest) {
  const seen = new Set();
  return links.flatMap(link => {
    let url;
    try { url = new URL(link.href); } catch { return []; }
    if (url.protocol !== 'https:' || url.hostname !== 'apps.apple.com' || url.username || url.password) return [];
    const id = url.pathname.match(/\/(?:app|developer)\/(?:[^/]+\/)?id(\d+)$/)?.[1];
    const asset = manifest[url.href];
    if (!id || seen.has(id) || !asset || !/^\/media\/store-qr\/[a-f0-9]{20}\.png$/.test(asset.src)) return [];
    seen.add(id);
    return [{href: url.href, src: asset.src, width: asset.width, height: asset.height,
      label: /\/developer\//.test(url.pathname) ? 'LazyingArt' : (link.label || 'App Store').trim()}];
  });
}

const words = {
  en: ['App Store QR', 'Scan to open the App Store'],
  zh: ['App Store 二维码', '扫码打开 App Store'],
  'zh-Hans': ['App Store 二维码', '扫码打开 App Store'],
  'zh-CN': ['App Store 二维码', '扫码打开 App Store'],
  'zh-Hant': ['App Store 二維碼', '掃碼開啟 App Store'],
  'zh-TW': ['App Store 二維碼', '掃碼開啟 App Store'],
  ja: ['App Store QRコード', 'スキャンして App Store を開く'],
  ko: ['App Store QR 코드', '스캔하여 App Store 열기'],
  fr: ['QR App Store', 'Scannez pour ouvrir l’App Store'],
  de: ['App Store QR-Code', 'Scannen, um den App Store zu öffnen'],
  es: ['QR de App Store', 'Escanea para abrir App Store'],
  pt: ['QR da App Store', 'Digitalize para abrir a App Store'],
  tr: ['App Store QR kodu', 'App Store’u açmak için tarayın'],
  ar: ['رمز App Store', 'امسح الرمز لفتح App Store'],
  vi: ['Mã QR App Store', 'Quét để mở App Store'],
  ru: ['QR-код App Store', 'Сканируйте, чтобы открыть App Store']
};

export async function enhanceDownloads(doc = document, fetcher = fetch) {
  const response = await fetcher('/media/store-qr/catalog.json');
  if (!response.ok) return;
  const manifest = await response.json();
  const groups = doc.querySelectorAll('.app-download-links, .store-links, .beta-launch-actions, .publisher-links');
  for (const group of groups) {
    if (group.nextElementSibling?.hasAttribute('data-download-qr')) continue;
    const plans = appleQrPlans([...group.querySelectorAll('a[href]')].map(a => ({href: a.href, label: a.textContent})), manifest);
    if (!plans.length) continue;
    const details = doc.createElement('details');
    details.className = 'store-qr';
    details.setAttribute('data-download-qr', '');
    const summary = doc.createElement('summary');
    summary.setAttribute('data-qr-summary', '');
    details.append(summary);
    const body = doc.createElement('div');
    body.className = 'store-qr-body';
    for (const plan of plans) {
      const figure = doc.createElement('figure');
      const image = doc.createElement('img');
      image.src = plan.src;
      image.width = plan.width;
      image.height = plan.height;
      image.loading = 'lazy';
      image.dataset.qrDestination = plan.href;
      const caption = doc.createElement('figcaption');
      caption.setAttribute('data-qr-caption', '');
      figure.append(image, caption);
      body.append(figure);
    }
    details.append(body);
    group.insertAdjacentElement('afterend', details);
  }
  const translate = () => {
    const language = doc.documentElement.lang || 'en';
    const [summary, caption] = words[language] || words[language.split('-')[0]] || words.en;
    doc.querySelectorAll('[data-qr-summary]').forEach(e => { e.textContent = summary; });
    doc.querySelectorAll('[data-qr-caption]').forEach(e => { e.textContent = caption; });
    doc.querySelectorAll('[data-qr-destination]').forEach(e => { e.alt = caption; });
  };
  translate();
  if (typeof MutationObserver !== 'undefined') {
    new MutationObserver(translate).observe(doc.documentElement, {attributes: true, attributeFilter: ['lang']});
  }
}

if (typeof document !== 'undefined') {
  enhanceDownloads().catch(() => { /* Direct store links stay usable when enhancement is unavailable. */ });
}
