# Navigation and colour

The homepage's EchoMind link is a normal link to `https://chat.lazying.art/`.
`echomind-link.js` changes only that marked anchor to the released EchoMind App
Store destination on iOS/iPadOS, or its Google Play destination on Android.
Desktop and unknown devices keep the web destination. No automatic redirect,
deep-link timer, tracking request or attempt to detect installation is used.
iPad desktop mode is covered; touchscreen Windows stays on the web. The normal
web link remains usable when JavaScript is unavailable.

Current header order: Products, EchoMind, OnlyIdeas, GlassAgent, More,
Ecosystem, About, Contact. More contains E Ink, LKT, Lecture Pack, Work, then Services.
Keep the native disclosure and its Escape/focus/outside-dismiss behaviour.

GlassAgent opens `https://lightmind.art/` in a new tab. The existing `#babelglass`
anchor is retained; the left visual is named GlassAgent and the right panel
introduces LightMind Agent with its app icon, localized description, App Store
and Google Play buttons, and the LightMind website link. The former prototype
dock and hardware promises are removed. Copy and links were checked against
both public store listings on October 8, 2026; LightMind Tech Limited remains
the separate app publisher. The panel reuses `app_lightmind_desc` in all 13
site languages, so switching languages cannot restore the old prototype copy.
The left language tiles match the app's 11 listed interface languages. Its
preview expands on small screens and keeps tiles visible with reduced motion.
Sources: [App Store](https://apps.apple.com/us/app/lightmind-agent/id6794785684),
[Google Play](https://play.google.com/store/apps/details?id=art.lightmind.mobile).

Services no longer occupy the main navigation or interrupt the app introduction.
The existing offer panel sits immediately before the footer inside a native
details disclosure, closed by default. More and the footer lead to it. Prices,
scope and standalone pages are preserved, not promoted as new delivery capacity.

`vibrant-theme.css` supplies the homepage's cool white/navy, cobalt, teal and
rose palette, including dark mode. The catalogue's `products/styles.css` uses
the same colours. Existing `tone-yellow` and `tone-peach` catalogue keys are
kept for stable data but now render cyan/blue rather than yellow/beige.

Buttons keep high-contrast white text; links, prices, availability and product
claims are not changed by the colour refresh. Carousels, search, motion toggle,
keyboard operation and reduced-motion preferences remain available.

Run `node --test tests/*.test.mjs`. Rebuild the directory with
`node tools/build-product-directory.mjs` after editing its HTML template.
Browser acceptance includes device-specific link clicks, both themes, mobile
and wide layouts, all homepage locales, product search and reduced motion.
