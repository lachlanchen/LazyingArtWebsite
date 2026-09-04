import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const script = fs.readFileSync(
  fileURLToPath(new URL("../lkt/attribution-bridge.js", import.meta.url)),
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
    "https://lazying.art/lkt/sample-report/?utm_source=instagram&utm_medium=social&utm_campaign=local_knowledge_terminal_pilot&utm_content=product_sample_report",
    ["https://lazying.art/lkt/fit-check/?utm_source=lkt_sample_report&utm_medium=website&utm_content=report_hero"],
  );
  const target = new URL(result);
  assert.equal(target.searchParams.get("utm_source"), "instagram");
  assert.equal(target.searchParams.get("utm_medium"), "social");
  assert.equal(target.searchParams.get("utm_campaign"), "local_knowledge_terminal_pilot");
  assert.equal(target.searchParams.get("utm_content"), "product_sample_report");
}

{
  const original = "https://lazying.art/lkt/fit-check/?utm_source=lkt_sample_report";
  assert.equal(run("https://lazying.art/lkt/sample-report/", [original])[0], original);
}

{
  const links = run(
    "https://lazying.art/lkt/?utm_source=x%20bad&utm_medium=social",
    [
      "https://example.com/lkt/fit-check/?utm_source=external",
      "https://lazying.art/eink/?utm_source=original",
      "https://lazying.art/lkt/fit-check/?utm_source=website",
    ],
  );
  assert.equal(links[0], "https://example.com/lkt/fit-check/?utm_source=external");
  assert.equal(links[1], "https://lazying.art/eink/?utm_source=original");
  const target = new URL(links[2]);
  assert.equal(target.searchParams.get("utm_source"), "website");
  assert.equal(target.searchParams.get("utm_medium"), "social");
}

{
  const [result] = run(
    "https://lazying.art/lkt/passage-graph/?utm_source=wenyan&utm_medium=owned_guide&utm_campaign=wenyan_history&utm_content=passage_graph",
    ["https://lazying.art/lkt/fit-check/"],
  );
  const target = new URL(result);
  assert.equal(target.searchParams.get("utm_source"), "wenyan");
  assert.equal(target.searchParams.get("utm_medium"), "owned_guide");
  assert.equal(target.searchParams.get("utm_campaign"), "wenyan_history");
  assert.equal(target.searchParams.get("utm_content"), "passage_graph");
}

console.log("LKT attribution bridge tests passed");
