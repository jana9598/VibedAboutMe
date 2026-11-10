# Plan: Recent Travels section on main page

## Concept

A horizontally scrollable row of slightly tilted **polaroid cards**, each with a photo placeholder, destination, date and short note. Visually distinct from the library's uniform 2-column grid and tabbed panels, and fits the site's playful, postcard-friendly tone.

## Where it goes

- New `#travels` section on `docs/index.html`, placed above the "From the library" teaser section (after Hobbies, before Library).
- Main page only (no dedicated page).

## Structure (HTML)

- `<section id="travels" class="travels-section">` with `<h2>Recent travels</h2>`.
- `<ul class="travel-strip">` (horizontal scroll, snap scrolling) of `<li class="polaroid">`.
- Each polaroid: `.polaroid-photo` (emoji placeholder, swappable for a real `<img>`) + `.polaroid-caption` with place / date / note.
- 5 placeholder trips (Reykjavík, Kyoto, Lisbon, Copenhagen, Marrakech) marked with a `TODO` comment so they can be replaced.

## Styling (CSS)

- `.travel-strip`: flex row, `overflow-x: auto`, `scroll-snap-type: x mandatory`, hidden scrollbar, gap.
- `.polaroid`: fixed width ~170px, white card, padding, soft shadow, `scroll-snap-align: start`.
- Slight alternating rotations via `:nth-child` (e.g. −2°, +1.5°, −1°) for the "wall of polaroids" feel.
- `.polaroid-photo`: 4:3 placeholder area with a soft accent background and centred emoji; easy to swap for an image.
- Mobile (≤620px): smaller cards, still horizontally scrollable (no layout break).

## Interaction

- On hover, only the photo flips horizontally to reveal a second picture (CSS 3D flip on `.polaroid-photo`), not the whole polaroid. Requires a front/back face inside `.polaroid-photo` (e.g. two layers) and `perspective` + `transform: rotateY(180deg)` on hover, with `backface-visibility: hidden`.

## Accessibility

- Semantic `ul`/`li`, `aria-label` on the strip, `aria-hidden` on decorative photo placeholders, visible focus on scroll container.

## Files to change

- `docs/index.html` — add section.
- `docs/css/style.css` — add travel-strip / polaroid styles + responsive tweak.

No JS needed, so `docs/js/main.js` stays untouched and the page still works when opened directly.

## Execution plan (3 steps)

1. **HTML (`docs/index.html`)**: Insert the `#travels` section above the library teaser with polaroid cards; each `.polaroid-photo` contains a front and back face (two layers) for the flip, plus caption (place/date/note). Add `TODO` placeholders.
2. **CSS (`docs/css/style.css`)**: Add travel-strip/polaroid layout, alternating rotations, and a 3D flip on hover that rotates only `.polaroid-photo` (front/back faces with `backface-visibility: hidden`); add responsive tweaks for ≤620px.
3. **Test**: Open `docs/index.html` directly; verify horizontal scroll + snap, flip on photo hover, and layout at 360/768/1280 px; check keyboard focus and no console errors.