import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const script = fs.readFileSync(
  fileURLToPath(new URL("../lecture-pack/attribution-bridge.js", import.meta.url)),
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
    "https://lazying.art/lecture-pack/?utm_source=lazyblog&utm_medium=article&utm_campaign=bilingual_lecture_pack_pilot&utm_content=classical_mechanics_lecture_1",
    ["https://lazying.art/lecture-pack/fit-check/"],
  );
  const target = new URL(result);
  assert.equal(target.searchParams.get("utm_source"), "lazyblog");
  assert.equal(target.searchParams.get("utm_medium"), "article");
  assert.equal(target.searchParams.get("utm_campaign"), "bilingual_lecture_pack_pilot");
  assert.equal(target.searchParams.get("utm_content"), "classical_mechanics_lecture_1");
}

{
  const links = run(
    "https://lazying.art/lecture-pack/?utm_source=x%20bad&utm_medium=social",
    [
      "https://example.com/lecture-pack/fit-check/",
      "https://lazying.art/lkt/fit-check/",
      "https://lazying.art/lecture-pack/fit-check/?utm_source=website",
    ],
  );
  assert.equal(links[0], "https://example.com/lecture-pack/fit-check/");
  assert.equal(links[1], "https://lazying.art/lkt/fit-check/");
  const target = new URL(links[2]);
  assert.equal(target.searchParams.get("utm_source"), "website");
  assert.equal(target.searchParams.get("utm_medium"), "social");
}

console.log("Bilingual Lecture Pack attribution bridge tests passed");
