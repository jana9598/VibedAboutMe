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

## Accessibility

- Semantic `ul`/`li`, `aria-label` on the strip, `aria-hidden` on decorative photo placeholders, visible focus on scroll container.

## Files to change

- `docs/index.html` — add section.
- `docs/css/style.css` — add travel-strip / polaroid styles + responsive tweak.

No JS needed, so `docs/js/main.js` stays untouched and the page still works when opened directly.