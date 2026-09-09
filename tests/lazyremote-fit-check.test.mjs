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

console.log("LazyRemote fit-check contract tests passed");
