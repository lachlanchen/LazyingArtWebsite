import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const source = fs.readFileSync(
  fileURLToPath(new URL("../service-translations.js", import.meta.url)),
  "utf8",
);
const context = { window: {} };
vm.runInNewContext(source, context);

const homepage = fs.readFileSync(
  fileURLToPath(new URL("../index.html", import.meta.url)),
  "utf8",
);
const revision = createHash("sha256").update(source).digest("hex").slice(0, 12);
assert.ok(
  homepage.includes(`src="service-translations.js?v=${revision}"`),
  "translation changes must invalidate the previous browser-cached asset",
);

const translations = context.window.serviceTranslations;
const languages = [
  "en",
  "ja",
  "zh-Hans",
  "zh-Hant",
  "ko",
  "ar",
  "vi",
  "fr",
  "es",
  "pt",
  "de",
  "ru",
  "tr",
];
const requiredKeys = Object.keys(translations.en);

assert.deepEqual(Object.keys(translations), languages);
for (const language of languages) {
  assert.deepEqual(Object.keys(translations[language]), requiredKeys);
  for (const key of requiredKeys) {
    assert.ok(translations[language][key].trim(), `${language}.${key} must not be empty`);
  }
}

console.log("Homepage service translations tests passed");
