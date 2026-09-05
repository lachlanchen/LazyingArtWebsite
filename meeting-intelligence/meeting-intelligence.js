export const ARTIFACT_URL = "./meeting-intelligence-demo.json";
export const ARTIFACT_SHA256 = "b75713fcd7520fb904b56a02e513405ecbd8f4e8e62097cf04cbc4b35ef0358e";
export const SOURCE_SHA256 = "4087a4626f719379ff78971865c9a5e931c1024aea8a24d77116f7f54f956d74";
export const LKT_COMMIT = "907e0b3ba6a48cc1d42e37cdaa22b28416264ab6";
export const PINNED_ARTIFACT_URL = `https://github.com/lachlanchen/LocalKnowledgeTerminal/blob/${LKT_COMMIT}/examples/artifacts/scripted-bilingual-meeting-knowledge.json`;
export const LIFECYCLE_STATES = Object.freeze(["Draft", "Pending", "Confirmed", "Superseded"]);
export const KNOWLEDGE_TYPES = Object.freeze([
  "customer-requirement",
  "market-signal",
  "product-suggestion",
  "technical-issue",
  "decision-rationale",
  "risk",
  "item-requiring-verification",
  "new-opportunity",
  "competitor-information",
  "commitment-action",
]);

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function requireString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string`);
  }
  return value;
}

function requireInteger(value, label) {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error(`${label} must be a non-negative integer`);
  return value;
}

function requireSha256(value, label) {
  const hash = requireString(value, label);
  if (!/^[a-f0-9]{64}$/.test(hash)) throw new Error(`${label} must be a lowercase SHA-256`);
  return hash;
}

export async function sha256Hex(bytes) {
  if (!globalThis.crypto?.subtle) throw new Error("WebCrypto is unavailable");
  const input = bytes instanceof ArrayBuffer
    ? bytes
    : bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", input);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function matchingLifecycle(artifact, unitId) {
  return artifact.review_lifecycle
    .filter((event) => event.unit_id === unitId)
    .sort((left, right) => left.revision - right.revision);
}

export function deriveLifecycle(artifact, unitId) {
  const unit = artifact.knowledge_units.find((candidate) => candidate.unit_id === unitId);
  if (!unit) throw new Error(`Unknown knowledge unit: ${unitId}`);
  const stored = matchingLifecycle(artifact, unitId);
  const stages = [
    {
      status: "Draft",
      source: "presentation stage",
      note: "A typed candidate is prepared outside the immutable transcript.",
    },
    {
      status: "Pending",
      source: "presentation stage",
      note: "The candidate waits for a person to compare it with the exact source span.",
    },
  ];
  for (const event of stored) {
    stages.push({
      status: event.status === "accepted" ? "Confirmed" : "Superseded",
      source: `stored review · r${event.revision}`,
      note: event.review_note,
      summary: event.summary,
    });
  }
  return stages;
}

export function currentDisplayStatus(artifact, unitId) {
  return deriveLifecycle(artifact, unitId).at(-1).status;
}

export function validateArtifact(artifact) {
  if (
    !isRecord(artifact) ||
    !isRecord(artifact.example) ||
    !isRecord(artifact.source) ||
    !isRecord(artifact.graph)
  ) {
    throw new Error("The meeting artifact is missing its example, source, or graph record");
  }
  if (artifact.schema_version !== "1.0") throw new Error("Unsupported meeting artifact schema");
  if (
    artifact.example.scripted !== true ||
    artifact.example.review_status !== "manually reviewed" ||
    artifact.example.ownership !== "Local Knowledge Terminal project-owned fixture"
  ) {
    throw new Error("The project-owned synthetic proof boundary is incomplete");
  }
  if (!Array.isArray(artifact.example.not_claimed)) throw new Error("The proof must declare what it does not claim");
  for (const boundary of [
    "automatic speech recognition or diarization",
    "automatic knowledge extraction",
    "ASR, diarization, extraction, or translation accuracy benchmark",
    "customer deployment or customer result",
  ]) {
    if (!artifact.example.not_claimed.includes(boundary)) throw new Error(`Missing proof boundary: ${boundary}`);
  }

  const source = artifact.source;
  const sourceHash = requireSha256(source.sha256, "source.sha256");
  if (sourceHash !== SOURCE_SHA256) throw new Error("Unexpected scripted-source hash");
  if (source.recording_exists !== false) throw new Error("The scripted proof must not imply a recording exists");
  if (source.utterance_count !== 10 || source.duration_ms !== 54800) {
    throw new Error("The scripted meeting source boundary changed");
  }
  requireString(source.meeting_id, "source.meeting_id");
  requireString(source.title, "source.title");
  requireString(source.note, "source.note");
  requireString(source.timing_basis, "source.timing_basis");
  requireString(source.transcript, "source.transcript");

  if (!Array.isArray(artifact.evidence) || artifact.evidence.length !== 10) {
    throw new Error("The artifact must contain exactly ten evidence records");
  }
  const evidenceById = new Map();
  for (const evidence of artifact.evidence) {
    const id = requireString(evidence?.evidence_id, "evidence.evidence_id");
    if (evidenceById.has(id)) throw new Error(`Duplicate evidence ID: ${id}`);
    const excerpt = requireString(evidence.excerpt, `evidence ${id} excerpt`);
    requireString(evidence.locator, `evidence ${id} locator`);
    requireString(evidence.source_entry_id, `evidence ${id} source_entry_id`);
    if (evidence.source_hash !== sourceHash) throw new Error(`Evidence ${id} does not resolve to the source hash`);
    if (!isRecord(evidence.payload)) throw new Error(`Evidence ${id} is missing its payload`);
    const payload = evidence.payload;
    const start = requireInteger(payload.transcript_start_char, `evidence ${id} transcript_start_char`);
    const end = requireInteger(payload.transcript_end_char, `evidence ${id} transcript_end_char`);
    if (end <= start || source.transcript.slice(start, end) !== excerpt) {
      throw new Error(`Evidence ${id} excerpt does not resolve to the embedded transcript`);
    }
    requireInteger(payload.start_ms, `evidence ${id} start_ms`);
    requireInteger(payload.end_ms, `evidence ${id} end_ms`);
    if (payload.end_ms <= payload.start_ms || payload.end_ms > source.duration_ms) {
      throw new Error(`Evidence ${id} has an invalid time span`);
    }
    requireString(payload.speaker, `evidence ${id} speaker`);
    if (!['en', 'zh'].includes(payload.language)) throw new Error(`Evidence ${id} has an unsupported language`);
    if (payload.timing_basis !== "scripted fixture timing, not measured from audio") {
      throw new Error(`Evidence ${id} overstates its timing basis`);
    }
    const expectedLocator = `#t=${payload.start_ms},${payload.end_ms}&chars=${start},${end}`;
    if (!evidence.locator.endsWith(expectedLocator)) throw new Error(`Evidence ${id} locator does not match its payload`);
    evidenceById.set(id, evidence);
  }

  if (!Array.isArray(artifact.knowledge_units) || artifact.knowledge_units.length !== 10) {
    throw new Error("The demonstration must contain exactly ten knowledge units");
  }
  const unitsById = new Map();
  const entityIds = new Set();
  const observedTypes = new Set();
  for (const unit of artifact.knowledge_units) {
    const id = requireString(unit?.unit_id, "knowledge_unit.unit_id");
    if (unitsById.has(id)) throw new Error(`Duplicate knowledge-unit ID: ${id}`);
    const type = requireString(unit.type, `unit ${id} type`);
    if (!KNOWLEDGE_TYPES.includes(type) || observedTypes.has(type)) {
      throw new Error(`Unit ${id} has an unexpected or duplicate business category`);
    }
    observedTypes.add(type);
    requireString(unit.type_label, `unit ${id} type_label`);
    requireString(unit.summary, `unit ${id} summary`);
    const entityId = requireString(unit.entity_id, `unit ${id} entity_id`);
    if (entityIds.has(entityId)) throw new Error(`Duplicate knowledge entity ID: ${entityId}`);
    entityIds.add(entityId);
    if (unit.review_status !== "manually reviewed") throw new Error(`Unit ${id} is not manually reviewed`);
    const evidence = evidenceById.get(unit.evidence_id);
    if (!evidence) throw new Error(`Unit ${id} has unresolved evidence`);
    if (!isRecord(unit.source_span)) throw new Error(`Unit ${id} is missing its source span`);
    const span = unit.source_span;
    if (
      span.utterance_id !== evidence.source_entry_id ||
      span.source_hash !== evidence.source_hash ||
      span.text !== evidence.excerpt ||
      span.speaker !== evidence.payload.speaker ||
      span.language !== evidence.payload.language ||
      span.start_ms !== evidence.payload.start_ms ||
      span.end_ms !== evidence.payload.end_ms ||
      span.transcript_start_char !== evidence.payload.transcript_start_char ||
      span.transcript_end_char !== evidence.payload.transcript_end_char
    ) {
      throw new Error(`Unit ${id} source span does not resolve to its evidence record`);
    }
    unitsById.set(id, unit);
  }
  if (KNOWLEDGE_TYPES.some((type) => !observedTypes.has(type))) {
    throw new Error("One or more required business categories are missing");
  }

  if (!Array.isArray(artifact.review_lifecycle)) throw new Error("The artifact is missing its review lifecycle");
  for (const unit of artifact.knowledge_units) {
    const lifecycle = matchingLifecycle(artifact, unit.unit_id);
    if (lifecycle.length === 0) throw new Error(`Unit ${unit.unit_id} is missing stored review history`);
    let revision = 0;
    for (const event of lifecycle) {
      if (!['accepted', 'superseded'].includes(event.status) || event.review_method !== "manual") {
        throw new Error(`Unit ${unit.unit_id} has an invalid stored review event`);
      }
      if (event.knowledge_type !== unit.type || event.revision <= revision) {
        throw new Error(`Unit ${unit.unit_id} has an invalid stored review sequence`);
      }
      requireString(event.review_note, `unit ${unit.unit_id} review note`);
      requireString(event.summary, `unit ${unit.unit_id} review summary`);
      revision = event.revision;
    }
    const current = lifecycle.at(-1);
    if (current.status !== "accepted" || current.summary !== unit.summary) {
      throw new Error(`Unit ${unit.unit_id} does not resolve to its accepted current revision`);
    }
  }
  const lifecycleUnitIds = new Set(artifact.review_lifecycle.map((event) => event.unit_id));
  if (lifecycleUnitIds.size !== unitsById.size || [...lifecycleUnitIds].some((id) => !unitsById.has(id))) {
    throw new Error("Stored review history references an unknown knowledge unit");
  }

  if (!Array.isArray(artifact.graph.nodes) || !Array.isArray(artifact.graph.edges)) {
    throw new Error("The artifact is missing its graph projection");
  }
  requireSha256(artifact.graph.projection_hash, "graph.projection_hash");
  const nodesById = new Map();
  for (const node of artifact.graph.nodes) {
    const id = requireString(node?.id, "graph.node.id");
    if (nodesById.has(id)) throw new Error(`Duplicate graph node ID: ${id}`);
    nodesById.set(id, node);
  }
  if (!nodesById.has(artifact.graph.subject_entity_id)) throw new Error("The graph subject does not resolve to a node");

  const edgesByUnitId = new Map();
  for (const edge of artifact.graph.edges) {
    const unitId = edge?.properties?.unit_id;
    if (!unitsById.has(unitId) || edgesByUnitId.has(unitId)) {
      throw new Error("The graph has an unresolved or duplicate unit edge");
    }
    const unit = unitsById.get(unitId);
    if (
      edge.basis !== "reviewed" ||
      edge.confidence !== 1 ||
      edge.properties.review_status !== "manually reviewed" ||
      edge.properties.knowledge_type !== unit.type ||
      edge.target !== unit.entity_id ||
      edge.subject_entity_id !== artifact.graph.subject_entity_id ||
      edge.source !== artifact.graph.subject_entity_id ||
      !Array.isArray(edge.evidence_ids) ||
      edge.evidence_ids.length !== 1 ||
      edge.evidence_ids[0] !== unit.evidence_id
    ) {
      throw new Error(`Graph edge for ${unitId} does not resolve to the reviewed unit`);
    }
    const node = nodesById.get(unit.entity_id);
    if (!node || node.payload?.unit_id !== unitId || node.payload?.knowledge_type !== unit.type) {
      throw new Error(`Graph node for ${unitId} does not resolve to the reviewed unit`);
    }
    edgesByUnitId.set(unitId, edge);
  }
  if (edgesByUnitId.size !== unitsById.size) throw new Error("The graph projection does not cover all knowledge units");

  return { evidenceById, unitsById, nodesById, edgesByUnitId };
}

export function filterKnowledgeUnits(artifact, type = "all") {
  validateArtifact(artifact);
  if (type === "all") return [...artifact.knowledge_units];
  if (!KNOWLEDGE_TYPES.includes(type)) throw new Error(`Unknown knowledge-unit type: ${type}`);
  return artifact.knowledge_units.filter((unit) => unit.type === type);
}

export function resolveKnowledgeUnit(artifact, unitId) {
  const validated = validateArtifact(artifact);
  const unit = validated.unitsById.get(unitId);
  if (!unit) throw new Error(`Unknown knowledge unit: ${unitId}`);
  return {
    unit,
    evidence: validated.evidenceById.get(unit.evidence_id),
    lifecycle: deriveLifecycle(artifact, unitId),
    status: currentDisplayStatus(artifact, unitId),
  };
}

export async function loadArtifact(fetchImplementation = globalThis.fetch) {
  if (typeof fetchImplementation !== "function") throw new Error("Fetch is unavailable");
  const response = await fetchImplementation(ARTIFACT_URL, { cache: "no-store" });
  if (!response.ok) throw new Error(`Meeting artifact request failed (${response.status})`);
  const bytes = await response.arrayBuffer();
  const artifactHash = await sha256Hex(bytes);
  if (artifactHash !== ARTIFACT_SHA256) throw new Error("Meeting artifact file integrity check failed");
  const artifact = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  validateArtifact(artifact);
  return artifact;
}

function formatTimestamp(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const tenths = Math.floor((milliseconds % 1000) / 100);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${tenths}`;
}

function timestampForEvidence(evidence) {
  return `${formatTimestamp(evidence.payload.start_ms)}–${formatTimestamp(evidence.payload.end_ms)}`;
}

function titleCase(value) {
  return value.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function element(name, className, text) {
  const node = document.createElement(name);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function metadata(label, value, extraClass = "") {
  const wrapper = element("div", `metadata-item ${extraClass}`.trim());
  wrapper.append(element("dt", "metadata-label", label), element("dd", "metadata-value", value));
  return wrapper;
}

function renderTranscript(artifact) {
  const list = document.querySelector("#transcript-list");
  list.replaceChildren();
  const orderedEvidence = [...artifact.evidence].sort((left, right) => left.payload.start_ms - right.payload.start_ms);
  for (const evidence of orderedEvidence) {
    const item = element("li", "transcript-turn");
    item.id = `transcript-${evidence.source_entry_id}`;
    item.dataset.sourceEntryId = evidence.source_entry_id;
    const header = element("div", "turn-header");
    header.append(
      element("time", "turn-time", timestampForEvidence(evidence)),
      element("strong", "turn-speaker", evidence.payload.speaker),
      element("span", "turn-language", evidence.payload.language === "zh" ? "中文" : "EN"),
    );
    const text = element("p", "turn-text", evidence.excerpt);
    text.lang = evidence.payload.language === "zh" ? "zh-Hans" : "en";
    item.append(header, text);
    list.append(item);
  }
}

function renderStatusSummary(artifact) {
  const container = document.querySelector("#status-summary");
  container.replaceChildren();
  for (const status of LIFECYCLE_STATES) {
    const count = artifact.knowledge_units.filter((unit) =>
      deriveLifecycle(artifact, unit.unit_id).some((event) => event.status === status)
    ).length;
    const item = element("div", `summary-stat status-${status.toLowerCase()}`);
    item.append(element("strong", "", String(count)), element("span", "", status));
    container.append(item);
  }
}

function renderDetail(artifact, unitId, { focus = false } = {}) {
  const { unit, evidence, lifecycle, status } = resolveKnowledgeUnit(artifact, unitId);
  const panel = document.querySelector("#unit-detail");
  panel.dataset.status = status.toLowerCase();
  panel.dataset.unitId = unit.unit_id;
  document.querySelector("#detail-type").textContent = titleCase(unit.type_label);
  document.querySelector("#detail-title").textContent = unit.summary;
  document.querySelector("#detail-statement").textContent = `Stored as ${unit.entity_id} with one reviewed assertion and one exact evidence record.`;

  const statusBadge = document.querySelector("#detail-status");
  statusBadge.textContent = status;
  statusBadge.className = `status-badge status-${status.toLowerCase()}`;

  const quote = document.querySelector("#detail-evidence");
  quote.textContent = evidence.excerpt;
  quote.lang = evidence.payload.language === "zh" ? "zh-Hans" : "en";

  const source = document.querySelector("#detail-source");
  source.replaceChildren(
    metadata("Speaker", evidence.payload.speaker),
    metadata("Timestamp", timestampForEvidence(evidence)),
    metadata("Evidence ID", evidence.evidence_id),
    metadata("Knowledge entity", unit.entity_id),
    metadata("Source SHA-256", evidence.source_hash, "metadata-hash"),
    metadata("Source locator", evidence.locator),
    metadata("Stored review", unit.review_status),
  );

  const lifecycleList = document.querySelector("#detail-lifecycle");
  lifecycleList.replaceChildren();
  for (const event of lifecycle) {
    const item = element("li", "lifecycle-event");
    const marker = element("span", `lifecycle-marker status-${event.status.toLowerCase()}`);
    marker.setAttribute("aria-hidden", "true");
    const copy = element("div", "lifecycle-copy");
    const heading = element("div", "lifecycle-heading");
    heading.append(element("strong", "", event.status), element("span", "", event.source));
    copy.append(heading, element("p", "", event.note));
    if (event.summary && event.summary !== unit.summary) {
      copy.append(element("p", "lifecycle-old-summary", `Earlier wording: “${event.summary}”`));
    }
    item.append(marker, copy);
    lifecycleList.append(item);
  }

  document.querySelectorAll(".unit-button").forEach((button) => {
    const selected = button.dataset.unitId === unit.unit_id;
    button.setAttribute("aria-pressed", String(selected));
    button.classList.toggle("selected", selected);
  });
  document.querySelectorAll(".transcript-turn").forEach((item) => {
    item.classList.toggle("evidence-source", item.dataset.sourceEntryId === evidence.source_entry_id);
  });
  document.querySelector("[data-meeting-proof]").dataset.selectedUnit = unit.unit_id;
  if (focus) panel.focus({ preventScroll: true });
}

function renderUnitList(artifact, type = "all") {
  const units = filterKnowledgeUnits(artifact, type);
  const list = document.querySelector("#unit-list");
  list.replaceChildren();
  for (const unit of units) {
    const status = currentDisplayStatus(artifact, unit.unit_id);
    const item = element("li", "unit-item");
    const button = element("button", "unit-button");
    button.type = "button";
    button.dataset.unitId = unit.unit_id;
    button.setAttribute("aria-controls", "unit-detail");
    button.setAttribute("aria-pressed", "false");
    const top = element("span", "unit-topline");
    top.append(
      element("span", "unit-type", unit.type_label),
      element("span", `status-badge status-${status.toLowerCase()}`, status),
    );
    button.append(top, element("strong", "unit-title", unit.summary), element("span", "unit-id", unit.unit_id));
    button.addEventListener("click", () => renderDetail(artifact, unit.unit_id, { focus: true }));
    item.append(button);
    list.append(item);
  }
  document.querySelector("#unit-count").textContent = `${units.length} of ${artifact.knowledge_units.length} units`;
  return units;
}

function renderFilters(artifact) {
  const container = document.querySelector("#type-filters");
  container.replaceChildren();
  const filters = [
    { value: "all", label: "All types" },
    ...artifact.knowledge_units.map((unit) => ({ value: unit.type, label: unit.type_label })),
  ];
  for (const filter of filters) {
    const button = element("button", "filter-button", titleCase(filter.label));
    button.type = "button";
    button.dataset.filter = filter.value;
    button.setAttribute("aria-pressed", String(filter.value === "all"));
    button.addEventListener("click", () => {
      const units = renderUnitList(artifact, filter.value);
      container.querySelectorAll(".filter-button").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      document.querySelector("[data-meeting-proof]").dataset.filter = filter.value;
      if (units.length) renderDetail(artifact, units[0].unit_id);
    });
    container.append(button);
  }
}

function renderArtifact(artifact) {
  renderTranscript(artifact);
  renderStatusSummary(artifact);
  renderFilters(artifact);
  renderUnitList(artifact);
  const unitWithRevision = artifact.knowledge_units.find((unit) =>
    matchingLifecycle(artifact, unit.unit_id).some((event) => event.status === "superseded")
  );
  renderDetail(artifact, unitWithRevision?.unit_id || artifact.knowledge_units[0].unit_id);
  document.querySelector("#artifact-hash").textContent = ARTIFACT_SHA256;
  document.querySelector("#source-hash").textContent = artifact.source.sha256;
  document.querySelector("#meeting-title").textContent = artifact.source.title;
  document.querySelector("#proof-workspace").hidden = false;
}

async function start() {
  const root = document.querySelector("[data-meeting-proof]");
  const status = document.querySelector("#load-status");
  try {
    const artifact = await loadArtifact();
    renderArtifact(artifact);
    root.dataset.status = "ready";
    root.dataset.filter = "all";
    status.textContent = "Artifact hash verified · ten evidence-linked knowledge units ready";
    status.classList.add("verified");
  } catch (error) {
    root.dataset.status = "error";
    status.textContent = "The interactive proof could not be verified. The portable JSON remains available for inspection.";
    status.classList.add("failed");
  }
}

if (typeof document !== "undefined" && document.querySelector("[data-meeting-proof]")) start();
