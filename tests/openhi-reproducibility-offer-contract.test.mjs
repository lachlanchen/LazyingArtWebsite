import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const offer = fs.readFileSync(path.join(root, "openhi-reproducibility", "index.html"), "utf8");
const fit = fs.readFileSync(path.join(root, "openhi-reproducibility", "fit-check", "index.html"), "utf8");
const legacy = fs.readFileSync(path.join(root, "openhi-kit.html"), "utf8");
const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");

assert.match(offer, /OpenHI Software Reproducibility Sprint/);
assert.match(offer, /Software-only · one stage · USD 500/);
assert.match(offer, /10\.1364\/OPTICA\.585766/);
assert.match(offer, /https:\/\/github\.com\/lachlanchen\/OpenHI/);
assert.match(offer, /one existing workstation/i);
assert.match(offer, /one rights-cleared dataset/i);
assert.match(offer, /one named OpenHI pipeline stage/i);
assert.match(offer, /Hardware remains a separate decision/);
assert.match(offer, /one consolidated list of factual corrections/i);
assert.match(offer, /deleted within fourteen calendar days/i);
assert.doesNotMatch(offer, /guaranteed reproducibility|guaranteed publication/i);
assert.doesNotMatch(offer, /<stripe-buy-button\b|buy-button-id=|publishable-key=/);

assert.match(fit, /data-testid="fit-form"/);
assert.match(fit, /name="target_stage"/);
assert.match(fit, /name="rights"/);
assert.match(fit, /name="scope"/);
assert.match(fit, /No data upload or payment/i);
assert.match(legacy, /href="openhi-reproducibility\/"/);
assert.match(homepage, /href="openhi-reproducibility\/"/);

console.log("OpenHI reproducibility offer contract passed");
