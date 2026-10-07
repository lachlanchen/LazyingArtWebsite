# Homepage app carousels

The main homepage has a single-row icon shortcut strip above a single-row
carousel of app download cards. Several cards fit on desktop; phones show a
full card and a hint of the next. Both rows support native horizontal swiping.

The former two-column feature grid below the hardware carousel is removed.
OnlyIdeas, AiMemo, LazyEdit and EchoMind now keep their introduction links on
the existing app cards. MicroQuant has one carousel card and icon shortcut,
explicitly labelled as a research tool, with its public landing page and GitHub
links rather than store badges. Its icon is the existing MicroQuant favicon
from `MicroQuant/static/favicon.png`; it is not new product artwork.

Detail links are compact outline pills immediately above each card's store
buttons. The button groups remain at the bottom, including Musia's status note
above its buttons. Keep DOM order and keyboard order consistent with this layout.

E Ink and Robot remain in the hardware carousel. Old `#einkwordsgpt` and
`#lazyingart-robot` URLs reveal the corresponding slide and stop autoplay so
the visitor stays on the linked product. The detail pages remain unchanged.

`app-carousel.js` progressively adds previous/next controls, keyboard arrows
on the card row and looping card navigation. It rotates the actual offscreen
cards with scroll compensation: there are no cloned IDs, inaccessible duplicate
cards or duplicated purchase links. Icon shortcuts reveal and focus the right
card before scrolling to it.

Card autoplay advances once every 4.8 seconds when the row is visible and idle.
Hover, keyboard focus, dragging, an in-progress scroll or a hidden page pause it.
The visible autoplay toggle stops movement and remembers an off preference
locally. Reduced-motion preferences start autoplay off and disable decorative
animation; a later reduced-motion change stops it again. A visitor can explicitly
enable it. The icon strip is manually controlled, not another moving animation.

Controls and accessibility names follow all 13 website languages. Light/dark
themes are supported. If JavaScript is unavailable, the real app cards, store
links and native scrolling remain available; inactive controls remain hidden.
Store identity, regional availability and product claims are unchanged by this
presentation update. LightMind keeps its separate company attribution.

Validate the static content and controller guards with:

```sh
node --check app-carousel.js
node --test
git diff --check
```

Browser acceptance should cover narrow/wide layouts, equal-row geometry,
loaded artwork, complete forward/backward loops, live store links, shortcut
reveal, autoplay on/off and persistence, hover/focus pauses, reduced motion,
all locales, RTL, and the JavaScript-disabled scrolling fallback.
