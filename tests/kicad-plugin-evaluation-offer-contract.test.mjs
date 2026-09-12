import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const offer = fs.readFileSync(path.join(root, "kicad-plugin-evaluation", "index.html"), "utf8");
const fit = fs.readFileSync(path.join(root, "kicad-plugin-evaluation", "fit-check", "index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "kicad-plugin-evaluation", "fit-check", "fit-check.js"), "utf8");
const work = fs.readFileSync(path.join(root, "work", "index.html"), "utf8");
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");

assert.match(offer, /KiCad Plugin Evaluation/);
assert.match(offer, /USD 400/);
assert.match(offer, /one authorized KiCad geometry-plugin version/i);
assert.match(offer, /one KiCad 10\/Linux environment/i);
assert.match(offer, /up to four agreed setting presets/i);
assert.match(offer, /seven-case project-owned board/i);
assert.match(offer, /before-and-after/i);
assert.match(offer, /segment count, width, layer, net, endpoint continuity/i);
assert.match(offer, /zero violations and zero unconnected items/i);
assert.match(offer, /34 track segments/i);
assert.match(offer, /d97f76ec6cfe16fad0e4e3308f085413adb51e0c/);
assert.match(offer, /project-owned baseline and test method, not a result for a third-party plugin/i);
assert.match(offer, /Buyer boards, plugin-code repair, security or malware certification/i);
assert.match(offer, /within five business days/i);
assert.match(offer, /one consolidated list of factual corrections/i);
assert.match(offer, /marketplace work keeps its contract and payment on that marketplace/i);
assert.doesNotMatch(offer, /<stripe-buy-button\b|buy-button-id=|publishable-key=/);
assert.doesNotMatch(offer, /guaranteed safe|all boards|every environment/i);

for (const field of [
  "contact_email", "plugin", "authorization", "environment", "presets",
  "expected_behavior", "delivery", "constraints",
]) {
  assert.match(fit, new RegExp(`name="${field}"`));
}
assert.match(fit, /No plugin upload, buyer board, customer data, or payment/i);
assert.match(fit, /Direct send unavailable/);
assert.match(script, /offer: "kicad_plugin_evaluation"/);
assert.match(script, /encryptedIntakeAvailable = false/);
assert.doesNotMatch(script, /\bfetch\s*\(/);
assert.doesNotMatch(script, /localStorage|sessionStorage|document\.cookie/);

assert.match(work, /KiCad Plugin Evaluation · USD 400/);
assert.match(work, /utm_campaign=kicad_plugin_evaluation/);

for (const url of [
  "https://lazying.art/kicad-plugin-evaluation/",
  "https://lazying.art/kicad-plugin-evaluation/fit-check/",
]) {
  assert.equal(sitemap.split(`<loc>${url}</loc>`).length - 1, 1);
}

console.log("KiCad plugin evaluation offer contract passed");
