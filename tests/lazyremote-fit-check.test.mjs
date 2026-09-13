import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const html = fs.readFileSync(
  fileURLToPath(new URL("../lazyremote/fit-check/index.html", import.meta.url)),
  "utf8",
);
const script = fs.readFileSync(
  fileURLToPath(new URL("../lazyremote/fit-check/fit-check.js", import.meta.url)),
  "utf8",
);

assert.match(html, /Free network fit check/);
assert.match(html, /免费适配确认/);
assert.match(html, /USD 250/);
assert.match(html, /one relay and up to three existing computers/i);
assert.match(html, /Do not include passwords, private keys, IP addresses, hostnames/);
assert.match(html, /data-testid="review-request"/);
assert.match(html, /data-testid="review-confirmed"/);
assert.match(html, /data-testid="send-fit-check"/);
assert.match(html, /https:\/\/remote\.lazying\.art\/sample-report\.html/);
assert.match(script, /offer: "lazyremote"/);
assert.match(script, /credentials: "omit"/);
assert.match(script, /response\.status !== 202/);
assert.doesNotMatch(script, /localStorage|sessionStorage|document\.cookie/);

const chinese = fs.readFileSync(
  fileURLToPath(new URL("../lazyremote/fit-check/zh-Hans/index.html", import.meta.url)),
  "utf8",
);
assert.match(chinese, /<html lang="zh-Hans">/);
assert.match(chinese, /src="\.\.\/fit-check\.js"/);
assert.match(chinese, /https:\/\/remote\.lazying\.art\/zh-Hans\/sample-report\.html/);
const fieldSchema = (page) => [...page.matchAll(/<(?:input|textarea)\s+[^>]*>/g)]
  .filter(([tag]) => / name="/.test(tag))
  .map(([tag]) => ({
    name: tag.match(/name="([^"]+)"/)[1],
    required: /\srequired(?:\s|>)/.test(tag),
    maxLength: tag.match(/maxlength="(\d+)"/)?.[1] || null,
  }));
assert.deepEqual(fieldSchema(chinese), fieldSchema(html));
assert.match(chinese, /data-fit-language-link href="\.\.\/"/);
assert.match(chinese, /id="send-fit-check"[^>]+disabled/);
assert.match(chinese, /USD 250/);

// Mail fallback must use the same subject as the reviewed JavaScript path,
// so inquiry routing does not depend on the visitor's script settings.
const subjects = script.match(/const subject = localize\("([^"]+)", "([^"]+)"\)/);
assert.ok(subjects, "Both localized inquiry subjects must be declared");
for (const [page, subject] of [[html, subjects[1]], [chinese, subjects[2]]]) {
  const fallback = page.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1];
  assert.ok(fallback, "A no-script email fallback must be present");
  const href = fallback.match(/href="(mailto:[^"]+)"/)?.[1];
  assert.ok(href, "The fallback must link to the business inbox");
  const mail = new URL(href.replaceAll("&amp;", "&"));
  assert.equal(mail.pathname, "contact@lazying.art");
  assert.equal(mail.searchParams.get("subject"), subject);
}

console.log("LazyRemote fit-check contract tests passed");
