import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const offer = fs.readFileSync(path.join(root, "browser-regression", "index.html"), "utf8");
const fit = fs.readFileSync(path.join(root, "browser-regression", "fit-check", "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "browser-regression", "fit-check", "fit-check.js"), "utf8");
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");

assert.match(offer, /Browser Regression Baseline/);
assert.match(offer, /USD 250/);
assert.match(offer, /three public user flows, twelve checkpoints/i);
assert.match(offer, /1440 × 1000/);
assert.match(offer, /390 × 844/);
assert.match(offer, /Python pytest\/Playwright/i);
assert.match(offer, /three consecutive runs/i);
assert.match(offer, /JUnit XML/i);
assert.match(offer, /screenshots on assertion failure/i);
assert.match(offer, /project-owned|own site and workflow evidence/i);
assert.match(offer, /34646905819/);
assert.match(offer, /cd605396989993cd323aadc736d9b7c79d3e3f7d/);
assert.match(offer, /34651573895/);
assert.match(offer, /1929c3565ba1c9db5fdb77f832587265ff1fe835/);
assert.match(offer, /retries it with the same id without a duplicate/i);
assert.match(offer, /no customer data or private AiMemo source/i);
assert.match(offer, /outside the fixed USD 250 public-site baseline/i);
assert.match(offer, /within seven business days/i);
assert.match(offer, /one consolidated list of factual corrections/i);
assert.match(offer, /USD 75 for the test map/i);
assert.match(offer, /USD 125 for the runnable suite/i);
assert.match(offer, /USD 50 for evidence and handoff/i);
assert.match(offer, /marketplace clients keep contract and payment on that marketplace/i);
assert.doesNotMatch(offer, /<stripe-buy-button\b|buy-button-id=|publishable-key=/);
assert.doesNotMatch(offer, /all browsers|every user-facing feature|guaranteed/i);

assert.match(fit, /data-testid="fit-form"/);
assert.match(fit, /name="site_url"/);
assert.match(fit, /name="flows"/);
assert.match(fit, /name="delivery"/);
assert.match(fit, /data-testid="review-request"/);
assert.match(fit, /data-testid="send-fit-check"/);
assert.match(fit, /No credentials, source upload, or payment/i);
assert.match(script, /offer: "browser_regression"/);
assert.match(script, /credentials: "omit"/);
assert.doesNotMatch(script, /localStorage|sessionStorage|document\.cookie/);

for (const url of [
  "https://lazying.art/browser-regression/",
  "https://lazying.art/browser-regression/fit-check/",
]) {
  assert.equal(sitemap.split(`<loc>${url}</loc>`).length - 1, 1);
}

console.log("Browser regression offer contract passed");
