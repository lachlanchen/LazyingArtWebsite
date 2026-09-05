import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const script = fs.readFileSync(
  fileURLToPath(new URL("../story-clip/attribution-bridge.js", import.meta.url)),
  "utf8",
);

function run(pageUrl, hrefs) {
  const links = hrefs.map((href) => ({ href }));
  vm.runInNewContext(script, {
    URL,
    window: { location: { href: pageUrl } },
    document: { querySelectorAll: () => links },
  });
  return links.map((link) => link.href);
}

{
  const [result] = run(
    "https://lazying.art/story-clip/?utm_source=linkedin&utm_medium=outreach&utm_campaign=story_clip_pilot&utm_content=oxodonia",
    ["https://lazying.art/story-clip/fit-check/"],
  );
  const target = new URL(result);
  assert.equal(target.searchParams.get("utm_source"), "linkedin");
  assert.equal(target.searchParams.get("utm_medium"), "outreach");
  assert.equal(target.searchParams.get("utm_campaign"), "story_clip_pilot");
  assert.equal(target.searchParams.get("utm_content"), "oxodonia");
}

{
  const links = run(
    "https://lazying.art/story-clip/?utm_source=x%20bad&utm_medium=social",
    [
      "https://example.com/story-clip/fit-check/",
      "https://lazying.art/lecture-pack/fit-check/",
      "https://lazying.art/story-clip/fit-check/?utm_source=website",
    ],
  );
  assert.equal(links[0], "https://example.com/story-clip/fit-check/");
  assert.equal(links[1], "https://lazying.art/lecture-pack/fit-check/");
  const target = new URL(links[2]);
  assert.equal(target.searchParams.get("utm_source"), "website");
  assert.equal(target.searchParams.get("utm_medium"), "social");
}

console.log("Story Clip Pilot attribution bridge tests passed");
