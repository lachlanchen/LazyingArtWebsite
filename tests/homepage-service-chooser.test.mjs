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

assert.match(chooser, /fixed-scope USD 250 sprint/);
assert.match(chooser, /private collection/);
assert.match(chooser, /LaTeX manuscript/);
assert.match(chooser, /rights-cleared lecture/);
assert.match(chooser, /recording you own/);
assert.match(chooser, /No source upload or payment before both sides accept the scope/);
assert.equal(
  (chooser.match(/<article class="service-card">/g) || []).length,
  4,
  "homepage should expose all four bounded service routes",
);

assert.match(
  chooser,
  /lkt\/\?utm_source=lazyingart&amp;utm_medium=website&amp;utm_campaign=local_knowledge_terminal_pilot&amp;utm_content=service_chooser/,
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
  /story-clip\/\?utm_source=lazyingart&amp;utm_medium=website&amp;utm_campaign=story_clip_pilot&amp;utm_content=service_chooser/,
);
assert.doesNotMatch(chooser, /fit-check\//);
assert.match(homepage, /href="#services" data-i18n="nav_services"/);

console.log("Homepage service chooser tests passed");
