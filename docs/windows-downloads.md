# Windows downloads

Bunko and OnlyIdeas are available as complete, self-contained Windows 11 x64 EXEs
at [Windows downloads](https://lazying.art/downloads/windows/). Homepage and product
cards link to the same exact files. The binaries are GitHub release assets, keeping
large generated files out of the website Git history.

The previews are unsigned and require Microsoft Edge WebView2 Runtime. Each
includes .NET and runs without an installer. The catalogue records exact file
sizes, versions and SHA-256 checksums. Both exact EXEs were checked in isolated,
nonactivating Windows 11 sessions: Bunko opened a real multilingual book chapter;
OnlyIdeas opened a public research paper, contents, search and figure enlargement.
Actual provider sign-in and Windows 10 remain separate qualification gaps.

AiMemo 1.0.0 is a separate, unsigned Edge-backed launcher with a per-user
installer, not a portable .NET app. Its exact 303,672-byte installer and SHA-256
come from the public `lachlanchen/AiMemo-Downloads` versioned release. It targets
Windows 10/11 x64 with Microsoft Edge. Windows 11 install, upgrade, uninstall,
reinstall and signed-out startup were checked; real provider login remains
unqualified. The [setup guide](https://memo.lazying.art/windows.html) records
requirements and limitations. No app-store release or subscription changes.

Regenerate the pages and check links:

```sh
node tools/build-windows-downloads.mjs
node tools/build-product-directory.mjs
node tools/build-android-downloads.mjs
node --test tests/windows-downloads.test.mjs tests/android-downloads.test.mjs
```

Keep existing Android APKs and store destinations independent. Publish an updated
EXE only after matching its runtime receipt, checksum and remote release asset.
