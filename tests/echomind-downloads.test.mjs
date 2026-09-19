import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const html = fs.readFileSync(new URL("index.html", root), "utf8");
const match = html.match(/const translations = (\{[\s\S]*?\n        \});\n\n        function applyTranslations/);
assert.ok(match, "homepage translations remain parseable");
const translations = vm.runInNewContext(`(${match[1]})`);
const file = "downloads/EchoMind-0.1.0-build82-test.apk";
assert.ok(!html.includes(`href="${file}"`), "retired test APK is not a public install recommendation");
assert.ok(html.includes('href="https://testflight.apple.com/join/bKGrC3Jn"'));
assert.ok(html.includes('href="https://play.google.com/store/apps/details?id=art.lazying.echomind"'));
assert.ok(!html.includes('href="https://play.google.com/apps/internaltest/4701510550966449647"'));
assert.ok(!html.includes('href="https://apps.apple.com/'), "EchoMind App Store release is not yet verified");
assert.ok(!html.includes('href="https://play.google.com/apps/testing/art.lazying.echomind"'));
assert.equal(crypto.createHash("sha256").update(fs.readFileSync(new URL(file, root))).digest("hex"),
  "61be324cfad32ef6e9ac06d2af1675dffdb3151a7694b8c414e9245b7400a638");
assert.ok(fs.existsSync(new URL("downloads/EchoMind-0.1.0-build81-test.apk", root)), "prior link remains recoverable");
assert.equal(Object.keys(translations).length, 13);
for (const [locale, dictionary] of Object.entries(translations)) {
  for (const key of ["beta_subtitle", "beta_google_play", "beta_testflight", "beta_android"]) {
    assert.ok(dictionary[key]?.trim(), `${locale}.${key} is localized`);
  }
}
for (const [locale, dictionary] of Object.entries(translations)) {
  assert.match(dictionary.beta_subtitle, /Google Play/, `${locale}: public Android store`);
  assert.match(dictionary.beta_subtitle, /TestFlight/, `${locale}: iPhone is still beta`);
  assert.match(dictionary.beta_subtitle, /App[ -]Store/, `${locale}: pending Apple review`);
}
assert.match(translations.en.beta_subtitle, /review is in progress/);
assert.doesNotMatch(translations.en.beta_google_play, /test/i);
console.log("EchoMind download identity and 13-locale access guidance passed");
