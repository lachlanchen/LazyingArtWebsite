import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  ARTIFACT_SHA256,
  LKT_COMMIT,
  validateArtifact,
} from "../lkt/markdown-vault/markdown-vault.js";

const artifactBytes = await readFile(new URL(
  "../lkt/markdown-vault/markdown-vault-index.json",
  import.meta.url,
));
const artifact = JSON.parse(artifactBytes);
const page = await readFile(new URL("../lkt/markdown-vault/index.html", import.meta.url), "utf8");

test("pinned Markdown proof hash and commit match the published source", () => {
  assert.equal(createHash("sha256").update(artifactBytes).digest("hex"), ARTIFACT_SHA256);
  assert.match(LKT_COMMIT, /^[a-f0-9]{40}$/);
  assert.match(page, new RegExp(LKT_COMMIT, "g"));
});

test("Markdown proof validates exact bilingual provenance and one explicit edge", () => {
  assert.equal(validateArtifact(artifact), artifact);
  assert.equal(artifact.build.files, 2);
  assert.equal(artifact.build.sections, 5);
  assert.equal(artifact.build.wikilinks, 1);
  assert.match(artifact.searches.english[0].excerpt, /earlier success/);
  assert.match(artifact.searches.chinese[0].excerpt, /成功有时会变成限制/);
  assert.equal(artifact.explicit_wikilink_edges[0].target, "Concepts/Success Trap");
});

test("page states the narrow boundary and routes to the fit check", () => {
  assert.match(page, /Read-only Markdown scanning/);
  assert.match(page, /Semantic or vector search/);
  assert.match(page, /Automatic concept discovery/);
  assert.match(page, /Whole-vault answers or a customer result/);
  assert.match(page, /href="\.\.\/fit-check\/"/);
  assert.doesNotMatch(page, /client result|customer success|production-ready/i);
});

test("validator rejects relaxed boundaries and unresolved hashes", () => {
  const relaxed = structuredClone(artifact);
  relaxed.boundary.writes_to_vault = true;
  assert.throws(() => validateArtifact(relaxed), /boundary/);

  const wrongHash = structuredClone(artifact);
  wrongHash.searches.english[0].source_sha256 = "0".repeat(64);
  assert.throws(() => validateArtifact(wrongHash), /declared source hash/);

  const missingEdge = structuredClone(artifact);
  missingEdge.build.wikilinks = 0;
  missingEdge.explicit_wikilink_edges = [];
  assert.throws(() => validateArtifact(missingEdge), /single displayed wikilink edge/);

  const unrelatedEdge = structuredClone(artifact);
  unrelatedEdge.explicit_wikilink_edges[0].target = "Unrelated Note";
  assert.throws(() => validateArtifact(unrelatedEdge), /does not match its source wikilink/);
});
