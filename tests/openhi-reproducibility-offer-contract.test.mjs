import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const offer = fs.readFileSync(path.join(root, "openhi-reproducibility", "index.html"), "utf8");
const fit = fs.readFileSync(path.join(root, "openhi-reproducibility", "fit-check", "index.html"), "utf8");
const sampleRoot = path.join(root, "openhi-reproducibility", "sample-report");
const sample = fs.readFileSync(path.join(sampleRoot, "index.html"), "utf8");
const summary = JSON.parse(fs.readFileSync(path.join(sampleRoot, "assets", "summary.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(sampleRoot, "assets", "manifest.json"), "utf8"));
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
assert.match(offer, /within ten business days/i);
assert.match(offer, /any generated outputs/i);
assert.match(offer, /marketplace clients keep the contract and payment on that marketplace/i);
assert.match(offer, /USD 150 for the environment record/i);
assert.match(offer, /USD 225 for the reproduction packet/i);
assert.match(offer, /USD 125 for the go\/no-go report/i);
assert.match(offer, /deleted within fourteen calendar days/i);
assert.doesNotMatch(offer, /guaranteed reproducibility|guaranteed publication/i);
assert.doesNotMatch(offer, /<stripe-buy-button\b|buy-button-id=|publishable-key=/);
assert.match(offer, /href="sample-report\/"/);
assert.match(offer, /sample-report\/assets\/weighted-cumulative\.png/);

assert.match(sample, /A run you can/);
assert.match(sample, /GO, narrowly/);
assert.match(sample, /not a customer result/i);
assert.match(sample, /does not establish acquisition, segmentation, learned compensation, calibration, reconstruction accuracy, or hardware compatibility/i);
assert.match(sample, /assets\/synthetic-events\.npz/);
assert.match(sample, /assets\/environment\.json/);
assert.match(sample, /assets\/manifest\.json/);
assert.equal(summary.openhi_commit, "080ad074a4581f34e3b87e6f23be64321eda5222");
assert.equal(summary.checks.events, 4096);
assert.equal(summary.checks.stage_exit_code, 0);
assert.equal(summary.checks.time_bins, 120);
assert.equal(summary.checks.selected_negative_scale, 1.51);
for (const [name, expected] of Object.entries(manifest.artifact_sha256)) {
  const bytes = fs.readFileSync(path.join(sampleRoot, "assets", name));
  assert.equal(crypto.createHash("sha256").update(bytes).digest("hex"), expected);
}

assert.match(fit, /data-testid="fit-form"/);
assert.match(fit, /name="target_stage"/);
assert.match(fit, /name="rights"/);
assert.match(fit, /name="scope"/);
assert.match(fit, /No data upload or payment/i);
assert.match(fit, /marketplace clients keep the contract and payment on that marketplace/i);
assert.match(legacy, /href="openhi-reproducibility\/"/);
assert.match(homepage, /href="openhi-reproducibility\/"/);

console.log("OpenHI reproducibility offer contract passed");
