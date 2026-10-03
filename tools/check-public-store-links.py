#!/usr/bin/env python3
"""Read-only public listing check; never logs in, installs, or buys an app."""
import concurrent.futures
import datetime
import json
from html.parser import HTMLParser
from pathlib import Path
import sys
import urllib.parse
import urllib.request


class Schemas(HTMLParser):
    def __init__(self):
        super().__init__()
        self.active = False
        self.parts = []
        self.items = []

    def handle_starttag(self, tag, attrs):
        if tag == 'script':
            self.active = dict(attrs).get('type') == 'application/ld+json'
            self.parts = []

    def handle_data(self, text):
        if self.active:
            self.parts.append(text)

    def handle_endtag(self, tag):
        if tag == 'script' and self.active:
            value = json.loads(''.join(self.parts))
            self.items.extend(value if isinstance(value, list) else [value])
            self.active = False


def check(link):
    url = urllib.parse.urlsplit(link['url'])
    expected_host = 'play.google.com' if link['store'] == 'google-play' else 'apps.apple.com'
    assert url.scheme == 'https' and url.hostname == expected_host
    query = dict(urllib.parse.parse_qsl(url.query))
    if expected_host == 'play.google.com':
        query.update(hl='en', gl='US')
    destination = urllib.parse.urlunsplit(url._replace(query=urllib.parse.urlencode(query)))
    request = urllib.request.Request(destination, headers={'User-Agent': 'LazyingArt-public-listing-check/1.0'})
    with urllib.request.urlopen(request, timeout=30) as response:
        final = urllib.parse.urlsplit(response.url)
        assert response.status == 200 and final.hostname == expected_host
        if expected_host == 'play.google.com':
            assert dict(urllib.parse.parse_qsl(final.query))['id'] == query['id']
        else:
            assert final.path.rsplit('/', 1)[-1] == url.path.rsplit('/', 1)[-1]
        parser = Schemas()
        parser.feed(response.read().decode('utf-8'))
    apps = [s for s in parser.items if isinstance(s, dict) and s.get('@type') == 'SoftwareApplication']
    assert len(apps) == 1, 'A landing/error page is not a listing'
    app = apps[0]
    os_name = app.get('operatingSystem', '')
    if link['store'] == 'mac-app-store':
        assert 'macOS' in os_name, 'An iPhone fallback is not a Mac release'
    elif link['store'] == 'app-store':
        assert 'iOS' in os_name and 'iPhone' in app.get('availableOnDevice', '')
    else:
        assert os_name == 'ANDROID'
    offers = app['offers']
    offers = offers if isinstance(offers, list) else [offers]
    offer = next(o for o in offers if o.get('priceCurrency') == 'USD')
    if link['store'] == 'google-play':
        assert offer.get('availability') == 'https://schema.org/InStock'
    return {'url': link['url'], 'store': link['store'], 'state': 'public_listing_verified',
            'name': app['name'], 'operating_system': os_name,
            'download_usd': str(offer['price'])}


def main():
    catalog = json.loads((Path(__file__).resolve().parents[1] / 'products/catalog.json').read_text())
    links = {link['url']: link for item in catalog['items'] for link in item.get('storeLinks', [])}
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        futures = {pool.submit(check, link): link for link in links.values()}
        for future, link in futures.items():
            try:
                results.append(future.result())
            except Exception as error:
                results.append({'url': link['url'], 'state': 'not_verified', 'error': str(error)})
    print(json.dumps({'checked_at': datetime.datetime.now(datetime.timezone.utc).isoformat(),
                      'storefront': 'US', 'scope': 'public listing, not install or sale',
                      'results': results}, indent=2, ensure_ascii=False))
    return 1 if any(r['state'] != 'public_listing_verified' for r in results) else 0


if __name__ == '__main__':
    sys.exit(main())
