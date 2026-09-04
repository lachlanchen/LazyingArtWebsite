export const LKT_COMMIT = "02334df74094a3ad75cf9073a7096794db79a5f4";
export const ARTIFACT_SHA256 = "801dfb0f3edb0c7aaf54c644352e5bd6a647914c0d2b9e350c4cd4c116106ef9";
export const ARTIFACT_URL = `https://raw.githubusercontent.com/lachlanchen/LocalKnowledgeTerminal/${LKT_COMMIT}/examples/artifacts/pocketpolyglot-passage-graph.json`;
export const SOURCE_URL = "https://github.com/lachlanchen/PocketPolyglot/blob/a437cbfa62aee4cb147bc6dea2188aea12791752/data/interlinear/sample.json";

const SVG_NS = "http://www.w3.org/2000/svg";

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function requireString(value, label) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${label} must be a non-empty string`);
  }
  return value;
}

export async function sha256Hex(bytes) {
  if (!globalThis.crypto?.subtle) {
    throw new Error("WebCrypto is unavailable");
  }
  const input = bytes instanceof ArrayBuffer
    ? bytes
    : bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", input);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function validateArtifact(artifact) {
  if (!isRecord(artifact) || !isRecord(artifact.graph) || !isRecord(artifact.source)) {
    throw new Error("The proof is missing its graph or source record");
  }
  if (!Array.isArray(artifact.graph.nodes) || !Array.isArray(artifact.graph.edges) || !Array.isArray(artifact.evidence)) {
    throw new Error("The proof graph must contain node, edge, and evidence lists");
  }
  if (artifact.proof?.review_status !== "hand-reviewed") {
    throw new Error("The proof is not marked hand-reviewed");
  }

  const source = artifact.source;
  const sourcePath = requireString(source.path, "source.path");
  const sourceCommit = requireString(source.commit, "source.commit");
  const sourceHash = requireString(source.sha256, "source.sha256");
  requireString(source.paragraph_text, "source.paragraph_text");

  const nodesById = new Map();
  for (const node of artifact.graph.nodes) {
    const id = requireString(node?.id, "node.id");
    requireString(node.label, `node ${id} label`);
    if (nodesById.has(id)) throw new Error(`Duplicate node ID: ${id}`);
    nodesById.set(id, node);
  }

  const evidenceById = new Map();
  for (const item of artifact.evidence) {
    const id = requireString(item?.evidence_id, "evidence.evidence_id");
    if (evidenceById.has(id)) throw new Error(`Duplicate evidence ID: ${id}`);
    requireString(item.excerpt, `evidence ${id} excerpt`);
    requireString(item.locator, `evidence ${id} locator`);
    if (!isRecord(item.payload)) throw new Error(`Evidence ${id} is missing its source payload`);
    if (item.payload.source_path !== sourcePath || item.payload.source_commit !== sourceCommit || item.source_hash !== sourceHash) {
      throw new Error(`Evidence ${id} does not resolve to the declared source`);
    }
    evidenceById.set(id, item);
  }

  const edgesById = new Map();
  for (const edge of artifact.graph.edges) {
    const id = requireString(edge?.id, "edge.id");
    if (edgesById.has(id)) throw new Error(`Duplicate edge ID: ${id}`);
    if (!nodesById.has(edge.source) || !nodesById.has(edge.target)) {
      throw new Error(`Edge ${id} references an unknown node`);
    }
    if (edge.basis !== "reviewed" || edge.properties?.review_status !== "hand-reviewed") {
      throw new Error(`Edge ${id} is not hand-reviewed`);
    }
    if (!Array.isArray(edge.evidence_ids) || edge.evidence_ids.length === 0) {
      throw new Error(`Edge ${id} has no evidence`);
    }
    for (const evidenceId of edge.evidence_ids) {
      if (!evidenceById.has(evidenceId)) {
        throw new Error(`Edge ${id} has unresolved evidence: ${evidenceId}`);
      }
    }
    edgesById.set(id, edge);
  }

  if (!nodesById.has(artifact.graph.subject_entity_id)) {
    throw new Error("The graph subject does not resolve to a node");
  }

  return { nodesById, evidenceById, edgesById };
}

export function relationEvidence(artifact, edgeId) {
  const validated = validateArtifact(artifact);
  const edge = validated.edgesById.get(edgeId);
  if (!edge) throw new Error(`Unknown relation: ${edgeId}`);
  return {
    edge,
    sourceNode: validated.nodesById.get(edge.source),
    targetNode: validated.nodesById.get(edge.target),
    evidence: edge.evidence_ids.map((id) => validated.evidenceById.get(id)),
    source: artifact.source,
  };
}

function svgElement(name, attributes = {}) {
  const element = document.createElementNS(SVG_NS, name);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value));
  return element;
}

function appendSvgText(parent, value, attributes = {}) {
  const text = svgElement("text", attributes);
  text.textContent = value;
  parent.append(text);
  return text;
}

function graphPositions(artifact) {
  const subjectId = artifact.graph.subject_entity_id;
  const terms = artifact.graph.nodes.filter((node) => node.id !== subjectId);
  const positions = new Map([[subjectId, { x: 450, y: 280 }]]);
  terms.forEach((node, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / terms.length;
    positions.set(node.id, {
      x: 450 + Math.cos(angle) * 320,
      y: 280 + Math.sin(angle) * 205,
    });
  });
  return positions;
}

function renderGraph(artifact, onSelect) {
  const svg = document.querySelector("#concept-graph");
  const preserved = Array.from(svg.children).filter((child) => child.tagName === "title" || child.tagName === "desc");
  svg.replaceChildren(...preserved);

  const defs = svgElement("defs");
  const marker = svgElement("marker", {
    id: "arrowhead",
    viewBox: "0 0 10 10",
    refX: "9",
    refY: "5",
    markerWidth: "7",
    markerHeight: "7",
    orient: "auto-start-reverse",
  });
  marker.append(svgElement("path", { d: "M 0 0 L 10 5 L 0 10 z" }));
  defs.append(marker);
  svg.append(defs);

  const positions = graphPositions(artifact);
  const edgesLayer = svgElement("g", { class: "graph-edges", "aria-hidden": "true" });
  for (const edge of artifact.graph.edges) {
    const start = positions.get(edge.source);
    const end = positions.get(edge.target);
    const line = svgElement("line", {
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
      "data-edge-id": edge.id,
      "marker-end": "url(#arrowhead)",
    });
    edgesLayer.append(line);
  }
  svg.append(edgesLayer);

  const nodesLayer = svgElement("g", { class: "graph-nodes", "aria-hidden": "true" });
  for (const node of artifact.graph.nodes) {
    const point = positions.get(node.id);
    const isSubject = node.id === artifact.graph.subject_entity_id;
    const group = svgElement("g", { class: isSubject ? "graph-node subject" : "graph-node" });
    group.append(svgElement(isSubject ? "rect" : "circle", isSubject
      ? { x: point.x - 90, y: point.y - 36, width: 180, height: 72, rx: 20 }
      : { cx: point.x, cy: point.y, r: 43 }));
    appendSvgText(group, isSubject ? "source passage" : node.label, {
      x: point.x,
      y: point.y + 5,
      "text-anchor": "middle",
    });
    nodesLayer.append(group);
  }
  svg.append(nodesLayer);

  svg.addEventListener("click", (event) => {
    const edgeId = event.target.getAttribute?.("data-edge-id");
    if (edgeId) onSelect(edgeId);
  });
}

function makeMetadata(label, value) {
  const wrapper = document.createElement("div");
  const term = document.createElement("dt");
  const description = document.createElement("dd");
  term.textContent = label;
  description.textContent = value;
  wrapper.append(term, description);
  return wrapper;
}

function displayNodeLabel(artifact, node) {
  return node.id === artifact.graph.subject_entity_id ? "Source passage" : node.label;
}

function renderEvidenceDetail(artifact, edgeId) {
  const detail = relationEvidence(artifact, edgeId);
  const container = document.querySelector("#evidence-content");
  container.replaceChildren();

  const relation = document.createElement("p");
  relation.className = "selected-relation";
  relation.textContent = `${displayNodeLabel(artifact, detail.sourceNode)} — ${detail.edge.relation} → ${displayNodeLabel(artifact, detail.targetNode)}`;
  container.append(relation);

  for (const item of detail.evidence) {
    const article = document.createElement("article");
    const quote = document.createElement("blockquote");
    quote.lang = item.payload.language || "zh";
    quote.textContent = item.excerpt;
    const metadata = document.createElement("dl");
    metadata.append(
      makeMetadata("Locator", item.locator),
      makeMetadata("Source path", item.payload.source_path),
      makeMetadata("Source commit", item.payload.source_commit),
      makeMetadata("Source SHA-256", item.source_hash),
    );
    article.append(quote, metadata);
    container.append(article);
  }

  document.querySelectorAll(".relation-button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.edgeId === edgeId));
  });
  document.querySelectorAll("[data-edge-id]").forEach((line) => {
    line.classList.toggle("selected", line.getAttribute("data-edge-id") === edgeId);
  });
}

function renderRelations(artifact) {
  const validated = validateArtifact(artifact);
  const list = document.querySelector("#relation-list");
  list.replaceChildren();
  for (const edge of artifact.graph.edges) {
    const source = validated.nodesById.get(edge.source);
    const target = validated.nodesById.get(edge.target);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "relation-button";
    button.dataset.edgeId = edge.id;
    button.setAttribute("aria-controls", "evidence-detail");
    button.setAttribute("aria-pressed", "false");
    const relation = document.createElement("strong");
    const labels = document.createElement("span");
    relation.textContent = edge.relation.replaceAll("-", " ");
    labels.textContent = `${displayNodeLabel(artifact, source)} → ${displayNodeLabel(artifact, target)}`;
    button.append(relation, labels);
    button.addEventListener("click", () => renderEvidenceDetail(artifact, edge.id));
    const item = document.createElement("li");
    item.append(button);
    list.append(item);
  }
}

function renderArtifact(artifact) {
  validateArtifact(artifact);
  const proof = document.querySelector("#proof");
  document.querySelector("#source-passage").textContent = artifact.source.paragraph_text;
  document.querySelector("#integrity-note").textContent = `Verified artifact SHA-256 · ${ARTIFACT_SHA256}`;
  renderRelations(artifact);
  renderGraph(artifact, (edgeId) => renderEvidenceDetail(artifact, edgeId));
  renderEvidenceDetail(artifact, artifact.graph.edges[0].id);
  proof.hidden = false;
}

export async function loadArtifact(fetchImplementation = globalThis.fetch) {
  if (typeof fetchImplementation !== "function") throw new Error("Fetch is unavailable");
  const response = await fetchImplementation(ARTIFACT_URL, { cache: "no-store" });
  if (!response.ok) throw new Error(`Pinned artifact request failed (${response.status})`);
  const bytes = await response.arrayBuffer();
  const actualHash = await sha256Hex(bytes);
  if (actualHash !== ARTIFACT_SHA256) throw new Error("Pinned artifact integrity check failed");
  const artifact = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  validateArtifact(artifact);
  return artifact;
}

async function start() {
  const status = document.querySelector("#load-status");
  try {
    const artifact = await loadArtifact();
    renderArtifact(artifact);
    status.textContent = "Pinned artifact verified. Select a relation to inspect its evidence.";
    status.classList.add("verified");
  } catch (error) {
    status.textContent = "The interactive proof could not be verified. Open the pinned artifact or source below.";
    status.classList.add("failed");
  }
}

if (typeof document !== "undefined" && document.querySelector("[data-passage-graph]")) {
  start();
}
