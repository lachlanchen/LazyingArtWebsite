# MCP public-repository preflight

Static preflight for [lachlanchen/LocalKnowledgeTerminal](https://github.com/lachlanchen/LocalKnowledgeTerminal) at commit `625a8d6e4c9ed1e1047ccacff32f982fea959d81`. No repository code was cloned or executed. This is a scoping aid, not a security audit, certification, vulnerability finding, or production-readiness decision.

## Pinned boundary

- Default branch: `main`
- Commit: `625a8d6e4c9ed1e1047ccacff32f982fea959d81`
- Tree: `0787137f95e4823412e2fa10d5219e6aa871c57d`
- Recursive tree complete: `yes`
- Static text files inspected: `16` of `16` selected
- Archived repository: `no`
- Fork: `no`

## Static surface candidates

| Kind | Candidate name or URI | Evidence file |
|---|---|---|
| tool | `query_private_knowledge` | `lkt/mcp_server.py` |
| tool | `trace_private_claim` | `lkt/mcp_server.py` |
| resource | `lkt://collections/status` | `lkt/mcp_server.py` |

### Transport and authority clues

- `Streamable HTTP` appears in: `README.md`, `docs/mcp.md`, `i18n/README.ar.md`, `i18n/README.de.md`, `i18n/README.es.md`, `i18n/README.fr.md`, `i18n/README.ja.md`, `i18n/README.ko.md`
- `stdio` appears in: `README.md`, `docs/mcp.md`, `i18n/README.ar.md`, `i18n/README.de.md`, `i18n/README.es.md`, `i18n/README.fr.md`, `i18n/README.ja.md`, `i18n/README.ko.md`
- Configuration names (values were not requested): `LKT_KNOWLEDGE_DB`
- No external host candidate was recovered from inspected non-Markdown source.
- No capability name matched the bounded write/side-effect verb list.

## Files inspected

| Path | Bytes | Blob |
|---|---:|---|
| `pyproject.toml` | 720 | `16c6aad18d264d175c99d0f0a11b6ddeec217895` |
| `docs/mcp.md` | 4026 | `870f74a044e65414b341739b0463bacf30e43dd4` |
| `lkt/mcp_query.py` | 44231 | `4707b760c52d34048e946cf08445f7a1f9db0eda` |
| `lkt/mcp_server.py` | 5598 | `90ea681800f775d9a492673d868b76c84a321cf1` |
| `tests/test_mcp_query.py` | 21961 | `f114541ccd27914ef8d18208954b2a0fce93bb50` |
| `README.md` | 30986 | `abdff6dcd4dfc07ebe2a6512b46339ace6f156d2` |
| `i18n/README.ar.md` | 41453 | `3308c35895bb9fa9159ae386168707de34046b5e` |
| `i18n/README.de.md` | 34156 | `1d881760a37fc0500c99cca758e681a62e80f000` |
| `i18n/README.es.md` | 34427 | `7bda461cfa44d930a15b57281531a245e41a8f82` |
| `i18n/README.fr.md` | 35760 | `0666b1ac1ce34f8fc600a2e8aa6abae06574a8b4` |
| `i18n/README.ja.md` | 36891 | `3ad3030edc2ca97381960de6b9d13cb8a443600d` |
| `i18n/README.ko.md` | 34140 | `cff80a01b58a7e1c5be18067169bda3050df9e67` |
| `i18n/README.ru.md` | 52128 | `dd4687493e277b78ee673f4e20be0cf4daa09259` |
| `i18n/README.vi.md` | 36851 | `be3d8244566dc248da7d35d403a1ed18ec6b4d68` |
| `i18n/README.zh-Hans.md` | 30704 | `603d8583cf4ecb004be781816fd57af361d3c3ad` |
| `i18n/README.zh-Hant.md` | 30708 | `a257c18d0e2b4ebdd9576425d22d17b68e6d0ff1` |

## Proposed ten-check review

1. Protocol version negotiation.
2. Advertised versus live tool and resource discovery.
3. One agreed valid tool call, including output bounds and result handoff.
4. One agreed valid resource read, including locator resolution by the intended client.
5. Unknown tool or resource rejection.
6. Malformed or missing input rejection.
7. Actual reads, writes, external calls, and approval gates.
8. Credential, path, and private-context disclosure in agreed outputs and logs.
9. One safe failure or timeout case.
10. Client and transport authentication and isolation boundary.

## Missing decisions before scope

- Which MCP client and exact version will consume this server?
- Which transport and network boundary should be tested?
- Which detected tools/resources are in scope, up to eight total?
- Which disposable fixtures and network calls are authorized?
- What decision must the report support, and what would make it a no-go?

## Review-ready reply draft

I pinned `lachlanchen/LocalKnowledgeTerminal` at `625a8d6e4c9e` and performed a static public-repository preflight without running its code. It recovered 3 tool/resource/prompt candidate(s) and 2 transport clue(s). Before fixing scope, I still need the intended MCP client/version, transport boundary, and the decision the review must support. The full review is a fixed USD 500 for one revision, one server, up to eight tools/resources, and ten agreed checks; it is not a penetration test, certification, fix implementation, or production guarantee.
