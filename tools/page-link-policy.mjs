// Preserve the current page when visiting another page or app. Same-page
// anchors, downloads, email and telephone actions keep their native behaviour.
export function openPageLinksInNewTabs(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<a\b[^>]*>/gi, tag => {
    if (!/^<a\b/i.test(tag)) return tag;
    const href = tag.match(/\bhref="([^"]*)"/i)?.[1];
    if (!href || href.startsWith('#') || /\bdownload(?:\s|=|>)/i.test(tag)) return tag;
    if (/^[a-z][a-z\d+.-]*:/i.test(href) && !/^https?:/i.test(href)) return tag;
    let result = tag.replace(/\s+target="[^"]*"/i, '');
    const rel = new Set((result.match(/\brel="([^"]*)"/i)?.[1] || '').split(/\s+/).filter(Boolean));
    rel.add('noopener');
    rel.add('noreferrer');
    result = result.replace(/\s+rel="[^"]*"/i, '');
    return result.slice(0, -1) + ` target="_blank" rel="${[...rel].join(' ')}">`;
  });
}
