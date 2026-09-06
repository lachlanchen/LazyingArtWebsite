import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const read = (relative) =>
  fs.readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const page = read("../lkt/lexical-ingest/index.html");
const offer = read("../lkt/index.html");
const sitemap = read("../sitemap.xml");

assert.match(page, /Lexical data without losing the source/);
assert.match(page, /42<\/strong><span>raw source fields retained/);
assert.match(page, /2<\/strong><span>incomplete records quarantined/);
assert.match(page, /0<\/strong><span>writes on an identical replay/);
assert.match(page, /source file hash and record ID/);
assert.match(page, /exact raw value as received/);
assert.match(page, /IPA is copied into a clearly named raw field/);
assert.match(page, /leaves every ingestion table empty/);
assert.match(page, /no new writes and leaves the database bytes unchanged/);
assert.match(page, /synthetic and project-owned/);
assert.match(page, /not compatibility with a particular database, linguistic accuracy, or a customer result/);
assert.match(page, /Custom adapters, bulk conversion, OCR, production deployment, and hardware are separate work/);
assert.match(page, /No source upload or payment at the fit-check stage/);
assert.match(page, /examples\/lexical-ingest-proof/);
assert.match(page, /utm_source=lexical_ingest&amp;utm_medium=owned_proof&amp;utm_campaign=lexical_data_carpentry/);
assert.match(offer, /href="lexical-ingest\/\?utm_source=lkt&amp;utm_medium=owned_proof&amp;utm_campaign=lexical_data_carpentry/);
assert.match(sitemap, /https:\/\/lazying\.art\/lkt\/lexical-ingest\//);
assert.doesNotMatch(page, /OUTOFPAPUA|customer data|customer result or testimonial/);

console.log("LKT lexical-ingest proof tests passed");
