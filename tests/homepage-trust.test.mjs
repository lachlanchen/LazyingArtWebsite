import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");
const translationMatch = homepage.match(
  /const translations = (\{[\s\S]*?\n        \});\n\n        function applyTranslations/,
);
assert.ok(translationMatch, "homepage translation object must remain parseable");
const translations = vm.runInNewContext(`(${translationMatch[1]})`);

assert.match(homepage, /href="work\/" data-i18n="nav_work"/);
assert.match(homepage, /<div class="stat-number">13<\/div>/);
assert.match(homepage, /<div class="stat-number">100\+<\/div>/);
assert.match(homepage, /<div class="stat-number">3<\/div>/);
assert.doesNotMatch(homepage, /50K\+|complete privacy|Join thousands/);
assert.doesNotMatch(
  homepage,
  /数万用户|數萬用戶|Hàng chục nghìn|Des milliers|Miles de usuarios|Milhares já|Tausende erleben|Тысячи уже|Binlercesi/,
);
assert.doesNotMatch(homepage, /KONAMI.*(?:50%|五折|5 折)|(?:50%|五折|5 折).*KONAMI/);
assert.doesNotMatch(
  homepage,
  /community token that powers|Unlock ecosystem perks|rewards and payouts|turn small wins into income/i,
);
assert.doesNotMatch(homepage, /href="#"/);
assert.match(homepage, /https:\/\/github\.com\/lachlanchen/);
assert.match(homepage, /https:\/\/github\.com\/sponsors\/lachlanchen/);
assert.match(homepage, /document\.documentElement\.lang = lang/);

for (const [language, dictionary] of Object.entries(translations)) {
  for (const key of [
    "stats_languages",
    "stats_active_users",
    "stats_ai_availability",
    "feat_privacy_desc",
    "cta_subtitle",
    "coin_subtitle",
    "coin_b2",
    "coin_b3",
    "ecos_card_coin_desc",
    "ecos_card_earn_desc",
    "konami_alert",
  ]) {
    assert.ok(dictionary[key]?.trim(), `${language}.${key} must not fall back to another language`);
  }
}

for (const file of ["index.html", "robot.html", "eink-words-card.html", "openhi-kit.html"]) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  assert.doesNotMatch(html, /href="#"/, `${file} must not expose placeholder links`);
  assert.doesNotMatch(html, /<stripe-buy-button\b/, `${file} must gate hardware checkout`);
  assert.doesNotMatch(html, /buy-button-id=|publishable-key=/, `${file} must not embed retired checkout configuration`);
  assert.match(html, /mailto:contact@lazying\.art\?subject=/, `${file} must offer a pre-payment availability check`);
}

assert.match(homepage, /href="openhi-kit\.html" class="secondary-button"/);
assert.match(homepage, /href="eink\/" class="secondary-button">View details/);

console.log("Homepage trust contract passed");
