# Android downloads

The [Android download directory](https://lazying.art/downloads/) lists signed
standalone APKs. Each app also has an APK button beside its existing store links
on the homepage and product page. Preview packages are marked in the directory;
publishing an APK does not change a store release.

## Updating a package

`downloads/catalog.json` is the shared source for all three pages. Keep package
identity, version, build, minimum Android SDK, size, SHA-256, signing-certificate
fingerprint and channel tied to the exact file. Never substitute a debug build,
unsigned APK, split APK or a file containing test credentials. Preserve existing
versioned URLs when adding a successor.

Verify with Android `apksigner verify --print-certs` and inspect package metadata
with `aapt dump badging`. For a bundle export, first match the qualified AAB's
hash, export a universal APK using its existing release identity, then verify the
result. Do not publish an asset-pack-dependent base APK as a standalone installer.

Smaller packages live in `downloads/`. Large packages are GitHub release assets,
with the exact versioned URL in the catalogue. Validate the uploaded byte count
and SHA-256 digest before making a new link public. Verify the public download
after publication, including its content type, filename and content hash.

Regenerate and check the pages:

```sh
node tools/sync-android-download-links.mjs
node tools/build-product-directory.mjs
node tools/build-android-downloads.mjs
node --test tests/android-downloads.test.mjs
git diff --check
```

The generators also accept `--check`. Homepage button labels cover the site's
thirteen languages. The directory works without JavaScript; search is an optional
enhancement and never downloads APKs in advance.

For installations made through Google Play, use Google Play for updates. A direct
APK may use a different certificate; never recommend deleting an existing app and
its data to resolve a signing mismatch.
