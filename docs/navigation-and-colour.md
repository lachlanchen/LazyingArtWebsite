# Navigation and colour

The homepage's EchoMind link is a normal link to `https://chat.lazying.art/`.
`echomind-link.js` changes only that marked anchor to the released EchoMind App
Store destination on iOS/iPadOS, or its Google Play destination on Android.
Desktop and unknown devices keep the web destination. No automatic redirect,
deep-link timer, tracking request or attempt to detect installation is used.
iPad desktop mode is covered; touchscreen Windows stays on the web. The normal
web link remains usable when JavaScript is unavailable.

Current header order: Products, EchoMind, OnlyIdeas, LightMind, More,
Ecosystem, About, Contact. More contains Services, E Ink, LKT, Lecture Pack, then Work.
Keep the native disclosure and its Escape/focus/outside-dismiss behaviour.

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
