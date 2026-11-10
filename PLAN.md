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

# Plan: Compact floating-pill navbar

## Goal
Replace the heavy full-width rainbow bar with a light two-item navbar — a 🏠 Home cloud and a decorative gradient-bordered Library pill — plus a slim rainbow line at the very top.

## Choices
- Navbar style: compact floating pill
- Home button: 🏠 Home cloud
- Library link: gradient pill with 📚
- Rainbow gradient: slim line at top

## HTML (both `docs/index.html` and `docs/library.html`)
Replace the whole `<nav>` block with:

    <!-- Full Width Top Navigation Bar -->
    <nav class="top-navbar">
        <div class="nav-content">
            <ul class="nav-items">
                <li>
                    <a href="index.html" class="cloud-link is-active" aria-current="page">
                        <svg class="cloud-svg-bg" viewBox="0 0 120 50" preserveAspectRatio="none" aria-hidden="true">
                            <use href="#cloud"></use>
                        </svg>
                        <span class="cloud-text"><span aria-hidden="true">🏠 </span>Home</span>
                    </a>
                </li>
                <li>
                    <a href="library.html" class="nav-pill nav-library">
                        <span aria-hidden="true">📚</span> Library
                    </a>
                </li>
            </ul>
        </div>
    </nav>

- On `index.html`: Home gets `is-active` + `aria-current="page"`.
- On `library.html`: Home loses those; Library gets `class="nav-pill nav-library is-active"` + `aria-current="page"`.
- The ✨ avatar is removed; the Home cloud takes over the "home" role.
- The `#cloud` SVG symbol stays at the bottom of both files.

## CSS (`docs/css/style.css`)

1. `.top-navbar` — drop `filter: drop-shadow(...)`, add slim rainbow line:

    .top-navbar {
        width: 100%;
        position: sticky;
        top: 0;
        z-index: var(--z-navbar);
        display: flex;
        flex-direction: column;
        align-items: center;
        background-image: var(--rainbow-gradient);
        background-repeat: no-repeat;
        background-position: top;
        background-size: 100% 4px;
        padding-top: 4px;
    }

2. `.nav-content` — from full-width rainbow bar to floating white pill:

    .nav-content {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: var(--space-sm);
        padding: 6px 10px;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-pill);
        box-shadow: var(--shadow-subtle);
    }

3. `.nav-items` — gap becomes `var(--space-md)`.

4. New `.nav-pill` (gradient border via layered backgrounds, dark text for contrast):

    .nav-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 18px;
        border: 2px solid transparent;
        border-radius: var(--radius-pill);
        background:
            linear-gradient(var(--card-bg), var(--card-bg)) padding-box,
            var(--rainbow-gradient) border-box;
        color: var(--text-charcoal);
        font-family: inherit;
        font-size: 0.9rem;
        font-weight: 500;
        text-decoration: none;
        box-shadow: var(--shadow-subtle);
        transition: transform var(--transition-fast), box-shadow var(--transition-fast);
    }

    .nav-pill:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-hover);
    }

    .nav-pill.is-active {
        background:
            linear-gradient(var(--accent-soft), var(--accent-soft)) padding-box,
            var(--rainbow-gradient) border-box;
        color: var(--accent-strong);
    }

5. Active cloud state — accent text, plus a soft pink cloud fill via a custom property:

    .cloud-link {
        --cloud-fill: var(--card-bg);   /* add to existing rule */
    }

    .cloud-link.is-active {
        --cloud-fill: var(--accent-soft);
    }

    .cloud-link.is-active .cloud-text {
        color: var(--accent-strong);
        font-weight: 500;
    }

    #cloud path {
        fill: var(--cloud-fill, var(--card-bg));   /* change existing rule */
    }

6. Remove the now-unused `.nav-avatar-link` / `.nav-avatar` / `.nav-avatar:hover` rules.

7. Media query (≤620px) — add `.nav-pill { padding: 6px 14px; }` and keep the existing cloud shrink.

## Accessibility
- `aria-current="page"` on the current page's link (also fixes a bug: `index.html` currently marks Library as current).
- `aria-hidden="true"` on the decorative 🏠 / 📚 emojis and the cloud SVG.
- Dark text on the white pill keeps WCAG AA contrast; the gradient is only a border.
- Visible focus stays on the browser default / existing link styles.

## Files to change
- `docs/index.html` — nav block only.
- `docs/library.html` — nav block only.
- `docs/css/style.css` — navbar styles, new pill, active states, remove avatar rules, media query tweak.

No JS changes needed (`docs/js/main.js` stays untouched).

## Testing
Open both pages directly and check: sticky pill stays put on scroll, active states on each page, layout at 360 / 768 / 1280 px, keyboard focus, and no console errors.