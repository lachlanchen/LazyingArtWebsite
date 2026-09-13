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

console.log("LazyRemote fit-check contract tests passed");
