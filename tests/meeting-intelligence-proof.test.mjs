import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import {
  ARTIFACT_SHA256,
  ARTIFACT_URL,
  KNOWLEDGE_TYPES,
  LKT_COMMIT,
  LIFECYCLE_STATES,
  PINNED_ARTIFACT_URL,
  SOURCE_SHA256,
  currentDisplayStatus,
  deriveLifecycle,
  filterKnowledgeUnits,
  loadArtifact,
  resolveKnowledgeUnit,
  validateArtifact,
} from "../meeting-intelligence/meeting-intelligence.js";

const read = (relative) =>
  fs.readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");
const readBytes = (relative) =>
  fs.readFileSync(fileURLToPath(new URL(relative, import.meta.url)));
const clone = (value) => structuredClone(value);

const page = read("../meeting-intelligence/index.html");
const script = read("../meeting-intelligence/meeting-intelligence.js");
const styles = read("../meeting-intelligence/styles.css");
const lktOffer = read("../lkt/index.html");
const sitemap = read("../sitemap.xml");
const artifactBytes = readBytes("../meeting-intelligence/meeting-intelligence-demo.json");
const artifact = JSON.parse(artifactBytes.toString("utf8"));

assert.equal(ARTIFACT_URL, "./meeting-intelligence-demo.json");
assert.equal(LKT_COMMIT, "907e0b3ba6a48cc1d42e37cdaa22b28416264ab6");
assert.equal(
  PINNED_ARTIFACT_URL,
  `https://github.com/lachlanchen/LocalKnowledgeTerminal/blob/${LKT_COMMIT}/examples/artifacts/scripted-bilingual-meeting-knowledge.json`,
);
assert.equal(crypto.createHash("sha256").update(artifactBytes).digest("hex"), ARTIFACT_SHA256);
assert.equal(artifact.source.sha256, SOURCE_SHA256);
assert.ok(
  script.indexOf("await sha256Hex(bytes)") < script.indexOf("JSON.parse"),
  "the local artifact must be hash-verified before parsing",
);

const validated = validateArtifact(artifact);
assert.equal(artifact.knowledge_units.length, 10);
assert.equal(artifact.evidence.length, 10);
assert.equal(validated.unitsById.size, 10);
assert.equal(validated.edgesByUnitId.size, 10);
assert.deepEqual(artifact.knowledge_units.map((unit) => unit.type), KNOWLEDGE_TYPES);
assert.deepEqual(LIFECYCLE_STATES, ["Draft", "Pending", "Confirmed", "Superseded"]);
assert.deepEqual(
  deriveLifecycle(artifact, "unit-03").map((event) => event.status),
  ["Draft", "Pending", "Superseded", "Confirmed"],
);
assert.equal(currentDisplayStatus(artifact, "unit-03"), "Confirmed");
assert.equal(filterKnowledgeUnits(artifact, "all").length, 10);
assert.equal(filterKnowledgeUnits(artifact, "product-suggestion")[0].unit_id, "unit-03");
assert.throws(() => filterKnowledgeUnits(artifact, "made-up-type"), /Unknown knowledge-unit type/);

const productSuggestion = resolveKnowledgeUnit(artifact, "unit-03");
assert.equal(productSuggestion.evidence.payload.speaker, "Maya");
assert.equal(productSuggestion.evidence.payload.start_ms, 11800);
assert.equal(productSuggestion.evidence.payload.end_ms, 15700);
assert.equal(
  productSuggestion.evidence.excerpt,
  "Let's add a bilingual evidence view beside each extracted item.",
);
assert.match(productSuggestion.unit.entity_id, /^term-[a-f0-9-]+$/);
assert.match(productSuggestion.evidence.evidence_id, /^evidence-[a-f0-9-]+$/);

const beforeValidation = JSON.stringify(artifact);
validateArtifact(artifact);
deriveLifecycle(artifact, "unit-03");
filterKnowledgeUnits(artifact, "risk");
resolveKnowledgeUnit(artifact, "unit-05");
assert.equal(JSON.stringify(artifact), beforeValidation, "inspection must not mutate the portable source artifact");

const brokenExcerpt = clone(artifact);
brokenExcerpt.evidence[0].excerpt = "not in the source";
assert.throws(() => validateArtifact(brokenExcerpt), /does not resolve to the embedded transcript/);

const brokenSourceHash = clone(artifact);
brokenSourceHash.evidence[0].source_hash = "0".repeat(64);
assert.throws(() => validateArtifact(brokenSourceHash), /does not resolve to the source hash/);

const brokenSpan = clone(artifact);
brokenSpan.knowledge_units[0].source_span.speaker = "Unknown";
assert.throws(() => validateArtifact(brokenSpan), /source span does not resolve/);

const brokenGraph = clone(artifact);
brokenGraph.graph.edges.find((edge) => edge.properties.unit_id === "unit-01").evidence_ids = [artifact.knowledge_units[1].evidence_id];
assert.throws(() => validateArtifact(brokenGraph), /does not resolve to the reviewed unit/);

const brokenReview = clone(artifact);
brokenReview.review_lifecycle = brokenReview.review_lifecycle.filter((event) => event.unit_id !== "unit-10");
assert.throws(() => validateArtifact(brokenReview), /missing stored review history/);

const brokenBoundary = clone(artifact);
brokenBoundary.example.not_claimed = brokenBoundary.example.not_claimed.filter((claim) => !claim.includes("customer result"));
assert.throws(() => validateArtifact(brokenBoundary), /Missing proof boundary/);

const toArrayBuffer = (bytes) => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
const loaded = await loadArtifact(async (url, options) => {
  assert.equal(url, ARTIFACT_URL);
  assert.deepEqual(options, { cache: "no-store" });
  return { ok: true, arrayBuffer: async () => toArrayBuffer(artifactBytes) };
});
assert.equal(loaded.source.meeting_id, "lkt-scripted-meeting-001");

const tamperedBytes = Buffer.concat([artifactBytes, Buffer.from(" ")]);
await assert.rejects(
  loadArtifact(async () => ({ ok: true, arrayBuffer: async () => toArrayBuffer(tamperedBytes) })),
  /file integrity check failed/,
);

assert.match(page, /<link rel="canonical" href="https:\/\/lazying\.art\/meeting-intelligence\/">/);
assert.match(page, /data-meeting-proof[^>]+data-testid="meeting-proof"[^>]+data-status="loading"/);
assert.match(page, /id="load-status"[^>]+role="status" aria-live="polite"/);
assert.match(page, /id="type-filters"[^>]+data-testid="type-filters"/);
assert.match(page, /id="unit-detail"[^>]+data-testid="unit-detail"[^>]+tabindex="-1"/);
assert.match(page, /href="meeting-intelligence-demo\.json" download/);
assert.match(page, /scripted, project-owned, and manually reviewed/i);
assert.match(page, /not automatic extraction, ASR, diarization, or translation accuracy/i);
assert.match(page, /not a customer result/i);
assert.match(page, /Knowledge changes state\. The source does not\./);
assert.match(page, /Draft/);
assert.match(page, /Pending/);
assert.match(page, /Confirmed/);
assert.match(page, /Superseded/);
assert.match(page, /\.\.\/lkt\/\?utm_source=/);
assert.match(page, /Test one representative meeting first\./);
assert.match(page, /Send only metadata first; do not attach confidential audio until scope and handling are agreed\./);
assert.match(page, /mailto:contact@lazying\.art\?subject=Meeting%20intelligence%20fit%20check/);
assert.match(page, /Languages%3A/);
assert.match(page, /Rights%2Fconsent%20confirmed%3A%20yes%2Fno/);
assert.doesNotMatch(page, /\.\.\/lkt\/fit-check\//);
assert.match(page, new RegExp(LKT_COMMIT));
assert.match(
  lktOffer,
  /\.\.\/meeting-intelligence\/\?utm_source=lkt&amp;utm_medium=owned_proof&amp;utm_campaign=meeting_intelligence&amp;utm_content=sample_section/,
);
assert.match(sitemap, /<loc>https:\/\/lazying\.art\/meeting-intelligence\/<\/loc>/);
for (const repository of ["LocalKnowledgeTerminal", "Video2Book", "LazyEdge"]) {
  assert.match(page, new RegExp(`https://github\\.com/lachlanchen/${repository}`));
}
assert.doesNotMatch(page, /customer testimonial|production-ready|enterprise-ready|accuracy rate/i);
assert.match(styles, /@media \(max-width: 700px\)/);
assert.match(styles, /\[hidden\] \{ display: none !important; \}/);
assert.match(styles, /\.unit-button\[aria-pressed="true"\]|\.unit-button\.selected/);

console.log("Meeting-intelligence proof contract passed");
