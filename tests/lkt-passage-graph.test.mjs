import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import {
  ARTIFACT_SHA256,
  ARTIFACT_URL,
  LKT_COMMIT,
  SOURCE_URL,
  relationEvidence,
  validateArtifact,
} from "../lkt/passage-graph/passage-graph.js";

const read = (relative) =>
  fs.readFileSync(fileURLToPath(new URL(relative, import.meta.url)), "utf8");

const page = read("../lkt/passage-graph/index.html");
const script = read("../lkt/passage-graph/passage-graph.js");
const offer = read("../lkt/index.html");
const sampleReport = read("../lkt/sample-report/index.html");
const sitemap = read("../sitemap.xml");

const commit = "02334df74094a3ad75cf9073a7096794db79a5f4";
const artifactHash = "801dfb0f3edb0c7aaf54c644352e5bd6a647914c0d2b9e350c4cd4c116106ef9";
const sourceCommit = "a437cbfa62aee4cb147bc6dea2188aea12791752";
const sourceHash = "d544f1c97d353373b2ac86ef730c7e7a00f52f8ca79fbf34f7eaa039f5266f2f";

assert.equal(LKT_COMMIT, commit);
assert.equal(ARTIFACT_SHA256, artifactHash);
assert.equal(
  ARTIFACT_URL,
  `https://raw.githubusercontent.com/lachlanchen/LocalKnowledgeTerminal/${commit}/examples/artifacts/pocketpolyglot-passage-graph.json`,
);
assert.equal(
  SOURCE_URL,
  `https://github.com/lachlanchen/PocketPolyglot/blob/${sourceCommit}/data/interlinear/sample.json`,
);
assert.ok(
  script.indexOf("await sha256Hex(bytes)") < script.indexOf("JSON.parse"),
  "the artifact must be verified before it is parsed",
);
assert.match(script, /crypto\.subtle\.digest\("SHA-256"/);

const supportedCopy = "This hand-reviewed sample turns one project-owned aligned passage into a small concept graph. Every reviewed relation resolves to the exact passage unit, excerpt, and source-file hash.";
assert.ok(page.includes(supportedCopy));
assert.match(page, /Project-owned sample · hand-reviewed relations/);
assert.doesNotMatch(page, /automatically extracts|full-book ingestion|translation benchmark|customer result/i);

assert.match(page, /<svg[^>]+role="img"[^>]+aria-labelledby="graph-title graph-description"/);
assert.match(page, /<title id="graph-title">/);
assert.match(page, /<desc id="graph-description">/);
assert.match(page, /id="load-status" role="status" aria-live="polite"/);
assert.match(page, /<ol class="relation-list" id="relation-list" aria-label="Passage relations">/);
assert.match(page, /id="evidence-detail" tabindex="-1"[^>]+aria-live="polite"/);
assert.match(page, /<noscript>/);
assert.match(page, new RegExp(commit));
assert.match(page, new RegExp(sourceCommit));
assert.match(page, /id="artifact-fallback"/);
assert.match(page, /lkt-passage-graph-social-4x5\.png/);
assert.match(page, /twitter:card" content="summary_large_image/);

assert.match(offer, /href="passage-graph\/">Trace one passage graph/);
assert.match(sampleReport, /href="\.\.\/passage-graph\/">Trace one hand-reviewed relation/);
assert.match(sitemap, /<loc>https:\/\/lazying\.art\/lkt\/passage-graph\/<\/loc>/);
assert.match(page, /href="\.\.\/sample-report\/"/);
assert.match(page, /href="\.\.\/fit-check\/"/);

const validArtifact = {
  proof: { review_status: "hand-reviewed" },
  source: {
    path: "data/interlinear/sample.json",
    commit: sourceCommit,
    sha256: sourceHash,
    paragraph_text: "春天来了，风很轻。",
  },
  graph: {
    subject_entity_id: "passage",
    nodes: [
      { id: "passage", label: "春天来了，风很轻。" },
      { id: "wind", label: "风" },
    ],
    edges: [
      {
        id: "edge-1",
        source: "passage",
        target: "wind",
        relation: "mentions-concept",
        basis: "reviewed",
        evidence_ids: ["evidence-1"],
        properties: { review_status: "hand-reviewed" },
      },
    ],
  },
  evidence: [
    {
      evidence_id: "evidence-1",
      excerpt: "风很轻。",
      locator: "stories/sample/units/0",
      source_hash: sourceHash,
      payload: {
        source_path: "data/interlinear/sample.json",
        source_commit: sourceCommit,
      },
    },
  ],
};

const validated = validateArtifact(validArtifact);
assert.equal(validated.nodesById.get("wind").label, "风");
assert.equal(validated.evidenceById.get("evidence-1").excerpt, "风很轻。");
const resolved = relationEvidence(validArtifact, "edge-1");
assert.equal(resolved.evidence[0].locator, "stories/sample/units/0");
assert.equal(resolved.source.path, "data/interlinear/sample.json");

const brokenArtifact = structuredClone(validArtifact);
brokenArtifact.graph.edges[0].evidence_ids = ["missing-evidence"];
assert.throws(() => validateArtifact(brokenArtifact), /unresolved evidence/);

const wrongSourceArtifact = structuredClone(validArtifact);
wrongSourceArtifact.evidence[0].source_hash = "0".repeat(64);
assert.throws(() => validateArtifact(wrongSourceArtifact), /does not resolve to the declared source/);

console.log("LKT passage graph tests passed");
