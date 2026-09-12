import assert from "node:assert/strict";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const homepage = fs.readFileSync(
  fileURLToPath(new URL("../index.html", import.meta.url)),
  "utf8",
);

const chooserMatch = homepage.match(
  /<section class="service-chooser" id="services"[\s\S]*?<\/section>/,
);

assert.ok(chooserMatch, "homepage should expose a focused services section");

const chooser = chooserMatch[0];

assert.match(chooser, /Choose one bounded service/);
assert.match(chooser, /one software stage or source you control/);
assert.match(chooser, /one named OpenHI stage/);
assert.match(chooser, /USD 500 scope and executed sample/);
assert.match(chooser, /one MCP server can read or change/);
assert.match(chooser, /ten protocol checks/);
assert.match(chooser, /one rights-cleared chapter/);
assert.match(chooser, /LaTeX manuscript/);
assert.match(chooser, /rights-cleared lecture/);
assert.doesNotMatch(chooser, /recording you own/);
assert.doesNotMatch(chooser, /up to six AI-generated clips you control/);
assert.doesNotMatch(chooser, /USD 500 scope and video proof/);
assert.match(chooser, /No source upload or payment before both sides accept the scope/);
assert.equal(
  (chooser.match(/<article class="service-card(?: service-card-wide)?">/g) || []).length,
  6,
  "homepage should expose the six currently supported bounded service routes",
);

assert.match(
  chooser,
  /openhi-reproducibility\/\?utm_source=lazyingart&amp;utm_medium=website&amp;utm_campaign=openhi_reproducibility&amp;utm_content=service_chooser/,
);
assert.match(
  chooser,
  /lkt\/\?utm_source=lazyingart&amp;utm_medium=website&amp;utm_campaign=local_knowledge_terminal_pilot&amp;utm_content=service_chooser/,
);
assert.match(
  chooser,
  /book-specimen\/\?utm_source=lazyingart&amp;utm_medium=website&amp;utm_campaign=book_specimen_pilot&amp;utm_content=service_chooser/,
);
assert.match(
  chooser,
  /manuscript-sprint\/\?utm_source=lazyingart&amp;utm_medium=website&amp;utm_campaign=manuscript_sprint_pilot&amp;utm_content=service_chooser/,
);
assert.match(
  chooser,
  /lecture-pack\/\?utm_source=lazyingart&amp;utm_medium=website&amp;utm_campaign=bilingual_lecture_pack_pilot&amp;utm_content=service_chooser/,
);
assert.match(
  chooser,
  /mcp-boundary-review\/\?utm_source=lazyingart&amp;utm_medium=website&amp;utm_campaign=mcp_boundary_review&amp;utm_content=service_chooser/,
);
assert.doesNotMatch(chooser, /utm_campaign=story_clip_pilot/);
assert.doesNotMatch(chooser, /utm_campaign=ai_clip_assembly/);
assert.doesNotMatch(chooser, /fit-check\//);
assert.match(homepage, /href="#services" data-i18n="nav_services"/);

console.log("Homepage service chooser tests passed");
