import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const script = fs.readFileSync(
  fileURLToPath(new URL("../mcp-boundary-review/attribution-bridge.js", import.meta.url)),
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
    "https://lazying.art/mcp-boundary-review/sample-report/?utm_source=linkedin&utm_medium=social&utm_campaign=mcp_boundary_review&utm_content=executed_sample",
    ["https://lazying.art/mcp-boundary-review/fit-check/?utm_source=mcp_sample_report&utm_medium=website&utm_campaign=mcp_boundary_review&utm_content=sample_hero"],
  );
  const target = new URL(result);
  assert.equal(target.searchParams.get("utm_source"), "linkedin");
  assert.equal(target.searchParams.get("utm_medium"), "social");
  assert.equal(target.searchParams.get("utm_campaign"), "mcp_boundary_review");
  assert.equal(target.searchParams.get("utm_content"), "executed_sample");
}

{
  const original = "https://lazying.art/mcp-boundary-review/fit-check/?utm_source=mcp_sample_report&utm_medium=website&utm_campaign=mcp_boundary_review&utm_content=sample_hero";
  assert.equal(
    run("https://lazying.art/mcp-boundary-review/sample-report/", [original])[0],
    original,
  );
}

{
  const links = run(
    "https://lazying.art/mcp-boundary-review/?utm_source=x%20bad&utm_medium=social",
    [
      "https://example.com/mcp-boundary-review/fit-check/?utm_source=external",
      "https://lazying.art/mcp-boundary-review/sample-report/",
      "https://lazying.art/mcp-boundary-review/fit-check/?utm_source=website",
    ],
  );
  assert.equal(links[0], "https://example.com/mcp-boundary-review/fit-check/?utm_source=external");
  assert.equal(links[1], "https://lazying.art/mcp-boundary-review/sample-report/");
  const target = new URL(links[2]);
  assert.equal(target.searchParams.get("utm_source"), "website");
  assert.equal(target.searchParams.get("utm_medium"), "social");
}

console.log("MCP boundary review attribution bridge tests passed");
