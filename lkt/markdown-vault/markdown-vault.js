export const LKT_COMMIT = "b36bed6d794621994060c289ea788a2c71760cbf";
export const ARTIFACT_SHA256 = "ed8d778a3d8d0836e10740d5da4e3c9017fd1aca5ca6aef794aa888038b82476";
export const ARTIFACT_URL = "./markdown-vault-index.json";
export const SOURCE_ROOT = `https://github.com/lachlanchen/LocalKnowledgeTerminal/blob/${LKT_COMMIT}/examples/fixtures/markdown-vault/`;

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function requireString(value, label) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${label} must be a non-empty string`);
  }
  return value;
}

function requireCount(value, label) {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${label} must be a non-negative integer`);
  }
  return value;
}

export async function sha256Hex(bytes) {
  if (!globalThis.crypto?.subtle) throw new Error("WebCrypto is unavailable");
  const input = bytes instanceof ArrayBuffer
    ? bytes
    : bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", input);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function validateResult(result, sourceHashes, resultsBySectionId, label) {
  if (!isRecord(result)) throw new Error(`${label} must be a record`);
  const sectionId = requireString(result.section_id, `${label}.section_id`);
  const path = requireString(result.path, `${label}.path`);
  requireString(result.heading, `${label}.heading`);
  requireString(result.excerpt, `${label}.excerpt`);
  requireString(result.source_sha256, `${label}.source_sha256`);
  if (!Number.isInteger(result.heading_level) || result.heading_level < 0 || result.heading_level > 6) {
    throw new Error(`${label}.heading_level is invalid`);
  }
  if (!Number.isInteger(result.line_start) || !Number.isInteger(result.line_end) || result.line_start < 1 || result.line_end < result.line_start) {
    throw new Error(`${label} has an invalid line range`);
  }
  if (sourceHashes[path] !== result.source_sha256) {
    throw new Error(`${label} does not resolve to its declared source hash`);
  }
  if (!Array.isArray(result.wikilinks)) throw new Error(`${label}.wikilinks must be a list`);
  for (const link of result.wikilinks) {
    if (!isRecord(link)) throw new Error(`${label} contains an invalid wikilink`);
    requireString(link.target, `${label}.wikilink.target`);
    requireString(link.label, `${label}.wikilink.label`);
  }
  if (resultsBySectionId.has(sectionId)) throw new Error(`Duplicate displayed section: ${sectionId}`);
  resultsBySectionId.set(sectionId, result);
}

export function validateArtifact(artifact) {
  if (!isRecord(artifact) || artifact.version !== 1) throw new Error("The proof version is invalid");
  if (!isRecord(artifact.boundary) || !isRecord(artifact.build) || !isRecord(artifact.source_hashes) || !isRecord(artifact.searches)) {
    throw new Error("The proof is missing its boundary, build, sources, or searches");
  }
  if (artifact.boundary.writes_to_vault !== false || artifact.boundary.semantic_or_vector_search !== false || artifact.boundary.automatic_concept_discovery !== false || artifact.boundary.whole_vault_question_answering !== false) {
    throw new Error("The proof boundary is not explicit");
  }
  requireCount(artifact.build.files, "build.files");
  requireCount(artifact.build.sections, "build.sections");
  requireCount(artifact.build.wikilinks, "build.wikilinks");
  requireString(artifact.build.vault_fingerprint, "build.vault_fingerprint");
  if ("database" in artifact.build) throw new Error("The public proof must not expose a database path");

  const sourceEntries = Object.entries(artifact.source_hashes);
  if (sourceEntries.length !== artifact.build.files) throw new Error("The source count does not match the build");
  for (const [path, hash] of sourceEntries) {
    requireString(path, "source path");
    if (!/^[a-f0-9]{64}$/.test(hash)) throw new Error(`Invalid source hash for ${path}`);
  }

  const resultsBySectionId = new Map();
  for (const language of ["english", "chinese"]) {
    const results = artifact.searches[language];
    if (!Array.isArray(results) || results.length === 0) throw new Error(`Missing ${language} search result`);
    results.forEach((result, index) => validateResult(result, artifact.source_hashes, resultsBySectionId, `${language}[${index}]`));
  }

  if (artifact.build.wikilinks !== 1 || !Array.isArray(artifact.explicit_wikilink_edges) || artifact.explicit_wikilink_edges.length !== 1) {
    throw new Error("This proof must contain its single displayed wikilink edge");
  }
  for (const edge of artifact.explicit_wikilink_edges) {
    if (!isRecord(edge)) throw new Error("The displayed wikilink edge is invalid");
    const source = resultsBySectionId.get(edge.source_section_id);
    if (!source) throw new Error("A wikilink does not resolve to a displayed source section");
    requireString(edge.target, "wikilink.target");
    requireString(edge.label, "wikilink.label");
    if (!source.wikilinks.some((link) => link.target === edge.target && link.label === edge.label)) {
      throw new Error("The displayed edge does not match its source wikilink");
    }
  }
  return artifact;
}

function sourceUrl(result) {
  const path = result.path.split("/").map(encodeURIComponent).join("/");
  return `${SOURCE_ROOT}${path}#L${result.line_start}-L${result.line_end}`;
}

function metadata(term, value) {
  const row = document.createElement("div");
  const label = document.createElement("dt");
  const content = document.createElement("dd");
  label.textContent = term;
  content.textContent = value;
  row.append(label, content);
  return row;
}

function resultCard(language, query, result, contentLanguage = "en") {
  const article = document.createElement("article");
  article.className = "result-card";
  const label = document.createElement("p");
  label.className = "result-language";
  label.textContent = `${language} query · `;
  const queryText = document.createElement("span");
  queryText.lang = contentLanguage;
  queryText.textContent = query;
  label.append(queryText);
  const heading = document.createElement("h3");
  heading.lang = contentLanguage;
  heading.textContent = result.heading;
  const excerpt = document.createElement("blockquote");
  excerpt.lang = contentLanguage;
  excerpt.textContent = result.excerpt.trimEnd();
  const details = document.createElement("dl");
  details.append(
    metadata("File", result.path),
    metadata("Lines", `${result.line_start}–${result.line_end}`),
    metadata("SHA-256", result.source_sha256),
  );
  const source = document.createElement("a");
  source.href = sourceUrl(result);
  source.textContent = "Open these source lines →";
  article.append(label, heading, excerpt, details, source);
  return article;
}

function renderArtifact(artifact) {
  validateArtifact(artifact);
  document.querySelector("#file-count").textContent = String(artifact.build.files);
  document.querySelector("#section-count").textContent = String(artifact.build.sections);
  document.querySelector("#wikilink-count").textContent = String(artifact.build.wikilinks);

  const grid = document.querySelector("#result-grid");
  grid.replaceChildren(
    resultCard("English", "success choices", artifact.searches.english[0]),
    resultCard("Chinese", "成功有时会变成限制", artifact.searches.chinese[0], "zh-Hans"),
  );

  const edge = artifact.explicit_wikilink_edges[0];
  const linkCard = document.querySelector("#link-card");
  const label = document.createElement("strong");
  label.lang = "zh-Hans";
  label.textContent = edge.label;
  const arrow = document.createElement("span");
  arrow.textContent = "points to";
  const target = document.createElement("code");
  target.textContent = `[[${edge.target}]]`;
  linkCard.replaceChildren(label, arrow, target);
  document.querySelector("#proof").hidden = false;
}

export async function loadArtifact(fetchImplementation = globalThis.fetch) {
  if (typeof fetchImplementation !== "function") throw new Error("Fetch is unavailable");
  const response = await fetchImplementation(ARTIFACT_URL, { cache: "no-store" });
  if (!response.ok) throw new Error(`Pinned artifact request failed (${response.status})`);
  const bytes = await response.arrayBuffer();
  if (await sha256Hex(bytes) !== ARTIFACT_SHA256) throw new Error("Pinned artifact integrity check failed");
  return validateArtifact(JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)));
}

async function start() {
  const status = document.querySelector("#load-status");
  try {
    const artifact = await loadArtifact();
    renderArtifact(artifact);
    status.textContent = `Pinned artifact verified · ${ARTIFACT_SHA256}`;
    status.classList.add("verified");
  } catch (error) {
    status.textContent = "The interactive proof could not be verified. Open the pinned artifact or source notes below.";
    status.classList.add("failed");
  }
}

if (typeof document !== "undefined" && document.querySelector("[data-markdown-vault]")) start();
