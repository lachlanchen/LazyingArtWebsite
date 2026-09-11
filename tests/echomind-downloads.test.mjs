import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const html = fs.readFileSync(new URL("index.html", root), "utf8");
const match = html.match(/const translations = (\{[\s\S]*?\n        \});\n\n        function applyTranslations/);
assert.ok(match, "homepage translations remain parseable");
const translations = vm.runInNewContext(`(${match[1]})`);
const file = "downloads/EchoMind-0.1.0-build80-test.apk";
assert.ok(html.includes(`href="${file}"`));
assert.ok(html.includes('href="https://testflight.apple.com/join/bKGrC3Jn"'));
assert.ok(html.includes('href="https://play.google.com/apps/internaltest/4701510550966449647"'));
assert.ok(!html.includes('href="https://play.google.com/apps/testing/art.lazying.echomind"'));
assert.equal(crypto.createHash("sha256").update(fs.readFileSync(new URL(file, root))).digest("hex"),
  "ccf41f8be9b15a61b2bb1a3854c2f90346e57a9be4fd118625bcdbe4e99443cd");
assert.ok(fs.existsSync(new URL("downloads/EchoMind-0.1.0-build79-test.apk", root)), "prior link remains recoverable");
assert.equal(Object.keys(translations).length, 13);
for (const [locale, dictionary] of Object.entries(translations)) {
  for (const key of ["beta_subtitle", "beta_google_play", "beta_testflight", "beta_android"]) {
    assert.ok(dictionary[key]?.trim(), `${locale}.${key} is localized`);
  }
}
assert.match(translations.en.beta_subtitle, /requires an enrolled account/);
assert.match(translations.ja.beta_subtitle, /登録済みのアカウント/);
assert.match(translations["zh-Hans"].beta_subtitle, /已加入测试名单/);
console.log("EchoMind download identity and 13-locale access guidance passed");
