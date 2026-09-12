import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const offer = fs.readFileSync(path.join(root, "mcp-boundary-review", "index.html"), "utf8");
const fit = fs.readFileSync(path.join(root, "mcp-boundary-review", "fit-check", "index.html"), "utf8");
const sampleRoot = path.join(root, "mcp-boundary-review", "sample-report");
const sample = fs.readFileSync(path.join(sampleRoot, "index.html"), "utf8");
const assets = path.join(sampleRoot, "assets");
const summary = JSON.parse(fs.readFileSync(path.join(assets, "summary.json"), "utf8"));
const inventory = JSON.parse(fs.readFileSync(path.join(assets, "tool-inventory.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(assets, "manifest.json"), "utf8"));
const packet = path.join(assets, "lkt-mcp-boundary-review-sample.zip");
const checksum = fs.readFileSync(`${packet}.sha256`, "utf8");
const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");

assert.match(offer, /<link rel="canonical" href="https:\/\/lazying\.art\/mcp-boundary-review\/">/);
assert.match(offer, /MCP Boundary Review/);
assert.match(offer, /USD 500/);
assert.match(offer, /one MCP server/i);
assert.match(offer, /up to eight tools\/resources/i);
assert.match(offer, /ten agreed checks/i);
assert.match(offer, /one correction pass/i);
assert.match(offer, /No credentials, production data, payment, or server access/i);
assert.match(offer, /No fix implementation, penetration test, security certification/i);
assert.match(offer, /Direct-site clients receive a Stripe request; marketplace clients keep the contract and payment on that marketplace/i);
assert.doesNotMatch(offer, /guaranteed secure|fully secure|zero risk/i);

assert.match(fit, /data-testid="fit-form"/);
for (const name of [
  "role", "repository", "surface", "environment", "client_transport", "risk",
  "constraints", "rights", "scope",
]) {
  assert.match(fit, new RegExp(`name="${name}"`));
}
assert.match(fit, /No source upload or payment/i);
assert.match(fit, /Do not include source code, credentials, tokens, private data/i);

assert.match(sample, /GO locally/);
assert.match(sample, /NO-GO remotely/);
assert.match(sample, /not a customer result, penetration test, security certification/i);
assert.match(sample, /read-only does not mean private/i);
assert.match(sample, /assets\/lkt-mcp-boundary-review-sample\.zip" download/);
assert.match(sample, /assets\/lkt-mcp-boundary-review-sample\.zip\.sha256/);

assert.equal(summary.lkt_commit, "e750e5ae24b780e45de896f7dc3a769d2410dabd");
assert.equal(summary.checks.tests_passed, 14);
assert.equal(summary.checks.tool_count, 2);
assert.equal(summary.checks.resource_count, 1);
assert.equal(summary.checks.prompt_count, 0);
assert.equal(summary.checks.database_mtime_unchanged, true);
assert.deepEqual(
  inventory.tools.map((tool) => tool.name),
  ["query_private_knowledge", "trace_private_claim"],
);
assert.deepEqual(inventory.resources.map((resource) => resource.uri), ["lkt://collections/status"]);
for (const tool of inventory.tools) {
  assert.equal(tool.annotations.readOnlyHint, true);
  assert.equal(tool.annotations.destructiveHint, false);
}
for (const [name, expected] of Object.entries(manifest.artifact_sha256)) {
  const actual = crypto.createHash("sha256").update(fs.readFileSync(path.join(assets, name))).digest("hex");
  assert.equal(actual, expected);
}
assert.match(checksum, /^[0-9a-f]{64}  lkt-mcp-boundary-review-sample\.zip\n$/);
assert.equal(
  crypto.createHash("sha256").update(fs.readFileSync(packet)).digest("hex"),
  checksum.slice(0, 64),
);

assert.match(
  homepage,
  /mcp-boundary-review\/\?utm_source=lazyingart&amp;utm_medium=website&amp;utm_campaign=mcp_boundary_review&amp;utm_content=service_chooser/,
);
for (const url of [
  "https://lazying.art/mcp-boundary-review/",
  "https://lazying.art/mcp-boundary-review/sample-report/",
  "https://lazying.art/mcp-boundary-review/fit-check/",
]) {
  assert.equal(sitemap.split(`<loc>${url}</loc>`).length - 1, 1);
}

console.log("MCP boundary review offer contract passed");
