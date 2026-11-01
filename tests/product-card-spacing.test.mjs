import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../store-links.css', import.meta.url), 'utf8');
const echo = html.match(/<aside class="beta-launch-card"[\s\S]*?<\/aside>/)[0];

test('shared intrinsic tracks align copy and the first download row, not card bottoms', () => {
  assert.match(css, /@supports \(grid-template-rows: subgrid\)/);
  assert.match(css, /\.app-downloads\s*\{[^}]*grid-auto-flow: column[^}]*grid-auto-columns: 320px[^}]*grid-template-rows: repeat\(5, max-content\)/);
  assert.match(css, /grid-row: 1 \/ span 5;\s*grid-template-rows: subgrid/);
  assert.match(css, /\.app-downloads \.beta-launch-actions\s*\{[^}]*align-content: start[^}]*margin-top: 0/);
  assert.match(css, /\.app-downloads \.beta-launch-actions \{ grid-row: 4; align-self: start; \}/);
  assert.match(css, /\.app-downloads \.store-qr \{ grid-row: 5; align-self: start; \}/);
  assert.doesNotMatch(css, /line-clamp|text-overflow:\s*ellipsis/);
  assert.match(css, /grid-auto-columns: min\(300px, calc\(100% - 22px\)\)/);
});

test('optional details and badges use the icon header without an empty text row', () => {
  assert.match(css, /\.app-downloads \.app-details-link\s*\{\s*grid-row: 1/);
  assert.match(css, /\.app-downloads \.app-details-link \{ align-self: end; \}/);
  assert.match(css, /max-width: calc\(100% - 86px\)/);
  assert.match(css, /\.app-downloads \.beta-launch-heading \{ display: contents; \}/);
  assert.match(css, /\.app-downloads \.app-card-meta\s*\{[^}]*flex-direction: column[^}]*flex-wrap: nowrap/);
  assert.match(css, /\.app-downloads \.app-card-meta > :is\([^}]+max-width: 100%;\s*margin: 0/);
  const musia = html.match(/<article class="app-download-card" data-app="musia"[\s\S]*?<\/article>/)[0];
  assert.match(musia, /<div class="app-card-description">\s*<p data-i18n="app_musia_desc">[\s\S]*?<p data-i18n="app_musia_apple">[\s\S]*?<\/div>/);
});

test('EchoMind hides only the long Windows note and retains all seven install routes', () => {
  assert.match(echo, /<p id="echomind-windows-note"[^>]*\bhidden>/);
  assert.match(echo, /aria-describedby="echomind-windows-note"/);
  assert.match(echo, /href="\/downloads\/echomind-windows.html"/);
  const actions = echo.match(/<div class="beta-launch-actions">([\s\S]*?)<\/div>/)[1];
  assert.equal([...actions.matchAll(/<a\b/g)].length, 7);
  for (const destination of [
    'https://chat.lazying.art/', 'https://apps.apple.com/app/id6793615455',
    'https://apps.apple.com/us/app/echomind-language-research/id6793615455?platform=mac',
    '/downloads/EchoMind-1.0.1-preview.1-win-x64.exe',
    'https://play.google.com/store/apps/details?id=art.lazying.echomind',
    'https://lazying.art/downloads/EchoMind-0.2.1-build105-test.apk',
    'https://testflight.apple.com/join/bKGrC3Jn',
  ]) assert.ok(actions.includes(`href="${destination}"`), destination);
});
