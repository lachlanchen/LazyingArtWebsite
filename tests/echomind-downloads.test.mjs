import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import vm from "node:vm";
import {apkButton, downloadsFor} from "../tools/android-downloads.mjs";

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
const echoMindCard = html.match(/<aside class="beta-launch-card"[\s\S]*?<\/aside>/)?.[0];
assert.ok(echoMindCard, "EchoMind download card exists");
assert.ok(echoMindCard.includes('href="https://apps.apple.com/app/id6793615455"'), "released EchoMind uses its own App Store identity");
assert.ok(echoMindCard.includes('href="https://apps.apple.com/us/app/echomind-language-research/id6793615455?platform=mac"'), "released native EchoMind Mac app has an explicit store route");
assert.ok(echoMindCard.includes('href="https://testflight.apple.com/join/bKGrC3Jn"'), "optional TestFlight access remains available");
const ubuntu = JSON.parse(fs.readFileSync(new URL("downloads/ubuntu/releases.json", root))).apps.echomind;
const guide = '/downloads/echomind-linux.html';
const products = fs.readFileSync(new URL('products/index.html', root), 'utf8');
const echoProduct = products.match(/<article id="echomind"[^>]*>[\s\S]*?<\/article>/)?.[0];
for (const card of [echoMindCard, echoProduct]) {
  const buttons = [...card.matchAll(/<a\b[^>]*data-ubuntu-download="echomind"[^>]*>[\s\S]*?<\/a>/g)];
  assert.equal(buttons.length, 1, 'one EchoMind Ubuntu button per card');
  assert.ok(buttons[0][0].includes(`href="${guide}"`) && buttons[0][0].includes('Ubuntu .deb · Preview'));
  assert.equal(card.split(`href="${guide}"`).length, 2, 'no duplicate guide link');
}
const ubuntuDirectory = fs.readFileSync(new URL('downloads/ubuntu/index.html', root), 'utf8');
const ubuntuCard = ubuntuDirectory.match(/<article[^>]* id="echomind"[^>]*>[\s\S]*?<\/article>/)?.[0];
assert.ok(ubuntuCard, 'the Ubuntu directory has a linkable EchoMind card');
for (const detail of [ubuntu.version, `Package ${ubuntu.packageRevision}`, ubuntu.sha256, `href="${ubuntu.download}"`, `href="${guide}"`, (ubuntu.bytes / 1e6).toFixed(1) + ' MB']) {
  assert.ok(ubuntuCard.includes(detail), `Ubuntu release card: ${detail}`);
}
for (const [, href] of html.matchAll(/href="(https:\/\/apps\.apple\.com\/[^\"]+)"/g)) {
  if (href === 'https://apps.apple.com/developer/lazyingart-llc/id1867662412') continue; // Company catalogue, not an app purchase.
  if (href === 'https://apps.apple.com/us/app/musia-learn-music-guitar/id6816265930?mt=12') continue; // Qualified Mac-only release, not the pending iPhone edition.
  assert.match(href, /\/id(?:6808872450|6815137919|6793615455|6816392935|6757573920|6816377548|6794785684|6816384930|6819458905)(?:\?platform=(?:mac|iphone))?$/, "only verified app identities are linked");
  if (href.includes('6816392935')) assert.match(href, /\?platform=(?:mac|iphone)$/, 'OnlyIdeas has qualified iOS and Mac routes');
}
assert.ok(!html.includes('href="https://play.google.com/apps/testing/art.lazying.echomind"'));
assert.equal(crypto.createHash("sha256").update(fs.readFileSync(new URL(file, root))).digest("hex"),
  "61be324cfad32ef6e9ac06d2af1675dffdb3151a7694b8c414e9245b7400a638");
assert.ok(fs.existsSync(new URL("downloads/EchoMind-0.1.0-build81-test.apk", root)), "prior link remains recoverable");
const priorTestApk = "downloads/EchoMind-0.2.0-build92-test.apk";
assert.equal(crypto.createHash("sha256").update(fs.readFileSync(new URL(priorTestApk, root))).digest("hex"),
  "66884cfcb328fc2c310f000f275f459769573e813b7fe2f4f1a0f2536862f43b",
  "Prior Android92 direct test download remains unchanged and recoverable");
const previous96Apk = "downloads/EchoMind-0.2.0-build96-test.apk";
assert.equal(crypto.createHash("sha256").update(fs.readFileSync(new URL(previous96Apk, root))).digest("hex"),
  "781dee67512aec072de520f5cf1b5265aa5309fbc606802d0e01bb21128f1e67",
  "Prior Android96 direct test download remains unchanged and recoverable");
const previous97Apk = "downloads/EchoMind-0.2.0-build97-test.apk";
assert.equal(crypto.createHash("sha256").update(fs.readFileSync(new URL(previous97Apk, root))).digest("hex"),
  "3f6849b3e16629c16ae8959c7aa0fb75193f208d29081505872ab508b5ff2c0a",
  "Prior Android97 direct test download remains unchanged and recoverable");
const previous98Apk = "downloads/EchoMind-0.2.0-build98-test.apk";
assert.equal(crypto.createHash("sha256").update(fs.readFileSync(new URL(previous98Apk, root))).digest("hex"),
  "7687e0b33786ff1fc43b8541a5d99c697136afbade2c087257ab5f77ad870612",
  "Prior Android98 direct test download remains unchanged and recoverable");
const previous100Apk = "downloads/EchoMind-0.2.0-build100-test.apk";
assert.equal(crypto.createHash("sha256").update(fs.readFileSync(new URL(previous100Apk, root))).digest("hex"),
  "ecf494938252975eeed346834774991a2ee6dcbc5236ef3fd0d60df187f54cb8",
  "Prior Android100 direct test download remains unchanged and recoverable");
const previous101Apk = "downloads/EchoMind-0.2.0-build101-test.apk";
assert.equal(crypto.createHash("sha256").update(fs.readFileSync(new URL(previous101Apk, root))).digest("hex"),
  "088e6aa5356b9730a2108f1218d0ce80b8e6a10ec6e39bfeb638d4f9a59aa265",
  "Prior Android101 direct test download remains unchanged and recoverable");
const previous102Apk = "downloads/EchoMind-0.2.0-build102-test.apk";
assert.equal(crypto.createHash("sha256").update(fs.readFileSync(new URL(previous102Apk, root))).digest("hex"),
  "6388d4b6620c085af6b73f59897c6ad5d4ad4a31cbd6de7af6361a3cf2d45dd1",
  "Prior Android102 direct test download remains unchanged and recoverable");
assert.ok(!html.includes(`href="${previous102Apk}"`), "previous tester download is not a public-store recommendation");
const previous103Apk = "downloads/EchoMind-0.2.0-build103-test.apk";
assert.equal(crypto.createHash("sha256").update(fs.readFileSync(new URL(previous103Apk, root))).digest("hex"),
  "7950fdf922b39484d270a11929c3a68f6692c10f2bd8ca41c96db3a52a4922ad",
  "Prior Android103 direct test download remains unchanged and recoverable");
const previous104Apk = "downloads/EchoMind-0.2.0-build104-test.apk";
assert.equal(crypto.createHash("sha256").update(fs.readFileSync(new URL(previous104Apk, root))).digest("hex"),
  "59d92399a770acc80cc01f306c5269c38445df4e0629e321d98c171c10ea45fd",
  "Prior Android104 download remains unchanged and recoverable");
const previous105Apk = "downloads/EchoMind-0.2.1-build105-test.apk";
assert.equal(crypto.createHash("sha256").update(fs.readFileSync(new URL(previous105Apk, root))).digest("hex"),
  "ff34bad69c77b5cc2f01b1a417a52e0f16b9c73aea0cbe0a5b782df4e1f690dd",
  "Prior Android105 download remains unchanged and recoverable");
const verified106 = fs.readFileSync(new URL("downloads/EchoMind-0.2.1-build106-test.apk", root));
assert.equal(verified106.length, 2748502, "Android106 exact paired APK size");
assert.equal(crypto.createHash("sha256").update(verified106).digest("hex"),
  "c39ea26493612791ad79c7d9edf8932cc1e42884639bcce64ea63a862f6ed0d3",
  "Android106 direct test download matches the qualified signed artifact");
const [current, ...duplicates] = downloadsFor("echomind");
assert.ok(current && !duplicates.length && current.build >= 108, "one reviewed direct-APK record; never advertise a superseded build");
const verified108 = fs.readFileSync(new URL("downloads/EchoMind-0.2.1-build108-test.apk", root));
assert.equal(verified108.length, 2793662);
assert.equal(crypto.createHash("sha256").update(verified108).digest("hex"),
  "5aa9e429ac6337ffed76a50f044092c3641359b68ed9d8cce096aae13d04f516", "Qualified directly signed Android108 APK");
const advertised = fs.readFileSync(new URL("downloads/" + current.filename, root));
assert.equal(advertised.length, current.bytes);
assert.equal(crypto.createHash("sha256").update(advertised).digest("hex"), current.sha256);
for (const route of ["index.html", "products/index.html", "downloads/index.html"]) {
  const page = fs.readFileSync(new URL(route, root), "utf8");
  const anchors = [...page.matchAll(/<a\b[^>]*data-apk-download="echomind"[^>]*>[\s\S]*?<\/a>/g)].map(m => m[0]);
  const expected = route === "index.html" ? apkButton(current, {homepage:true, extraClass:"beta-download-button"}) : apkButton(current);
  assert.deepEqual(anchors, [expected], "Static download link, filename and label must match the verified catalog on " + route);
}
const downloadCard = fs.readFileSync(new URL("downloads/index.html", root), "utf8").match(/<article[^>]+id="echomind"[^>]*>[\s\S]*?<\/article>/)?.[0];
assert.ok(downloadCard?.includes("· Build " + current.build + "</span>") && downloadCard.includes(current.sha256),
  "Install page must describe the exact linked APK");
assert.equal(Object.keys(translations).length, 13);
for (const [locale, dictionary] of Object.entries(translations)) {
  assert.match(dictionary.echomind_ubuntu_download, /Ubuntu \.deb/, `${locale}: Ubuntu preview label`);
  assert.match(dictionary.beta_title, /Mac/, `${locale}: Mac is included in the release title`);
  assert.match(dictionary.beta_subtitle, /Mac/, `${locale}: Mac is included in download guidance`);
  for (const key of ["beta_title", "beta_subtitle", "beta_google_play", "beta_testflight", "beta_android"]) {
    assert.ok(dictionary[key]?.trim(), `${locale}.${key} is localized`);
  }
}
for (const [locale, dictionary] of Object.entries(translations)) {
  assert.match(dictionary.beta_subtitle, /Google Play/, `${locale}: public Android store`);
  assert.match(dictionary.beta_testflight, /TestFlight/, `${locale}: beta access is clearly separate`);
  assert.match(dictionary.beta_subtitle, /App[ -]Store/, `${locale}: public Apple store`);
}
assert.doesNotMatch(translations.en.beta_subtitle, /review|beta|progress/);
assert.match(translations.en.beta_subtitle, /varies by region/);
assert.doesNotMatch(translations.en.beta_google_play, /test/i);
console.log("EchoMind download identity and 13-locale access guidance passed");
