"""Network-free acceptance tests for the public-listing checker."""
import importlib.util
import json
from pathlib import Path
import unittest
from unittest.mock import patch

path = Path(__file__).resolve().parents[1] / 'tools/check-public-store-links.py'
spec = importlib.util.spec_from_file_location('store_links', path)
checker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checker)


class Response:
    status = 200

    def __init__(self, url, app=None, raw=None):
        self.url = url
        self.body = raw if raw is not None else '<script type="application/ld+json">' + json.dumps(app) + '</script>'

    def __enter__(self):
        return self

    def __exit__(self, *args):
        pass

    def read(self):
        return self.body.encode()


class StoreLinks(unittest.TestCase):
    def check(self, store='google-play', os_name='ANDROID', availability='https://schema.org/InStock', raw=None, redirect=False):
        url = ('https://play.google.com/store/apps/details?id=art.lazying.bunko' if store == 'google-play'
               else 'https://apps.apple.com/us/app/bunko-classics-with-ruby/id6815137919' + ('?platform=mac' if store == 'mac-app-store' else ''))
        app = {'@type': 'SoftwareApplication', 'name': 'Bunko', 'operatingSystem': os_name,
               'availableOnDevice': 'Mac' if 'macOS' in os_name else 'iPhone, iPad',
               'offers': [{'priceCurrency': 'USD', 'price': '0.99', 'availability': availability}]}
        response = Response(url.replace('art.lazying.bunko', 'another.package') if redirect else url, app, raw)
        with patch.object(checker.urllib.request, 'urlopen', return_value=response) as request:
            result = checker.check({'url': url, 'store': store})
            self.assertEqual(request.call_count, 1)
            return result

    def test_available_android(self):
        self.assertEqual(self.check()['download_usd'], '0.99')

    def test_mac_and_ios_are_distinct(self):
        self.assertEqual(self.check('mac-app-store', 'macOS 12.0 or later')['state'], 'public_listing_verified')
        self.assertEqual(self.check('app-store', 'Requires iOS 15.0')['state'], 'public_listing_verified')

    def test_mac_url_falling_back_to_iphone_is_rejected(self):
        with self.assertRaises(AssertionError):
            self.check('mac-app-store', 'Requires iOS 15.0')

    def test_iphone_url_falling_back_to_mac_is_rejected(self):
        with self.assertRaises(AssertionError):
            self.check('app-store', 'macOS 12.0 or later')

    def test_unavailable_offer_is_rejected(self):
        with self.assertRaises(AssertionError):
            self.check(availability='https://schema.org/PreOrder')

    def test_success_status_without_product_schema_is_rejected(self):
        with self.assertRaises(AssertionError):
            self.check(raw='<html>Try again later</html>')

    def test_package_redirect_is_rejected(self):
        with self.assertRaises(AssertionError):
            self.check(redirect=True)

    def test_parser_accumulates_script_chunks(self):
        parser = checker.Schemas()
        parser.feed('<script type="application/ld+json">{"name":')
        parser.feed('"Bunko"}</script>')
        self.assertEqual(parser.items, [{'name': 'Bunko'}])


if __name__ == '__main__':
    unittest.main()
