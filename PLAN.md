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

# Plan: Three-mode colour atmosphere switcher

## Goal

Add a small, accessible mode switcher that lets visitors change the overall colour atmosphere of the website without changing its content or layout. The current colourful pastel theme remains the default and is represented by 🌈. Two additional modes are represented by 🌙 and 🪴.

The feature should feel like a visual mood choice rather than a conventional settings panel: compact, friendly, and consistent with the existing floating navigation and emoji-led interactions. It should sit below the main navigation only while the visitor is at the top of the page; it must not become a second sticky navigation bar while scrolling.

## Modes

### 🌈 Rainbow — current default

- Keep the existing pastel pink, purple, yellow and teal colour system.
- Preserve the current rainbow gradient in the navigation and existing component accents.
- This mode is applied when no preference has been saved yet.
- Exact mode name: **Rainbow**.
- Theme name for implementation: `rainbow`.

### 🌙 Night

- Use a dark navy background rather than black.
- Use warm yellow accents for highlights, active controls and small decorative details.
- Use lighter cream or pale blue text where required for readable contrast.
- Keep cards visibly separated with navy-toned surfaces and subtle borders rather than pure black panels.
- Adapt the rainbow gradient and pink/purple accent tokens so they feel intentional in the night palette.
- Exact mode name: **Night**.
- Theme name for implementation: `night`.

### 🪴 Garden

- Use a soft sage/pastel green page background.
- Use darker greens for primary accents, active states and borders.
- Use brown and warm orange for secondary accents, especially where the existing design uses warm pink or yellow.
- Keep cards light enough to retain the soft scrapbook/card feeling.
- Exact mode name: **Garden**.
- Theme name for implementation: `garden`.

## Football team colour preservation

- The football teams' identity colours must remain recognisable in every mode and must never be replaced by the active page theme.
- Preserve the HSV blue/white, Chicago Bears navy/orange, and Roter Stern red/black colour identities as dedicated team tokens, separate from the global theme tokens.
- Where a full team-colour card would clash with Night or Garden, use the colours through a controlled treatment such as a logo area, badge border, two-colour stripe, emblem background, or small team-colour marker.
- Keep team logos and their associated colour relationships intact; theme changes may alter the surrounding card surface, shadow or neutral text treatment, but not the teams' identifying colours.
- Check that each team treatment remains readable against all three theme backgrounds and that the team colours are not used as the sole means of communicating information.

## Interaction design

- Add three compact icon buttons below the main navigation area: 🌈, 🌙 and 🪴.
- Keep this theme switcher in normal document flow, beneath the existing main navigation, rather than making it sticky or fixed.
- It should be visible when the page is at the top and naturally scroll out of view with the page content; it must not remain visible when scrolling.
- Give each button a visible accessible label, such as `Rainbow theme`, `Starry night theme` and `Sage garden theme`.
- Use `aria-pressed` to communicate the selected mode.
- Mark the selected button with an existing-style active class and a visible focus state; do not rely on colour alone.
- Switching modes updates the document theme through a `data-theme` attribute on the root element, for example `data-theme="night"`.
- Save the visitor's selection with `localStorage` so the chosen atmosphere is retained when moving between the site's pages or returning later.
- If stored data is missing or invalid, use the rainbow mode.
- The switcher must work with mouse, keyboard and touch input.

## HTML changes

- Add a semantic theme control group directly below the shared main navigation in `docs/index.html`, `docs/library.html` and `docs/game.html`.
- Use `<div role="group" aria-label="Colour theme">` with three `<button type="button">` controls.
- Keep the emojis decorative inside the buttons and provide accessible text through visually hidden labels or equivalent accessible naming.
- Set the rainbow button to `aria-pressed="true"` in the static markup as the initial fallback state.
- Do not add inline styles or inline event handlers.

## CSS changes

- Extend the existing design-token section in `docs/css/style.css` with theme-independent variables where useful, then define theme overrides using selectors such as:

      :root[data-theme="night"] { ... }
      :root[data-theme="garden"] { ... }

- Keep all theme colours in CSS custom properties; do not add loose hex colours to component rules.
- Override the shared page background, text, muted text, card surfaces, borders, shadows, accent colours, section accents and gradients that need to respond to the selected mode.
- Ensure the main navigation, theme controls, library cards, travel polaroids, trading card area, memory game, postcard controls and football team treatments remain legible in all three modes.
- Add responsive spacing so the theme controls sit clearly below the main navigation without making the top of the page feel crowded.
- Give the selected theme button a mode-appropriate active treatment while retaining a visible focus outline.
- Keep the switcher compact at 360 px and avoid pushing the existing navigation into an unusable layout at 360 / 768 / 1280 px.
- Use existing spacing, radius and transition variables wherever possible.

## JavaScript changes

- Add a dedicated `initThemeSwitcher` function in `docs/js/main.js`.
- Define the three valid theme names in one local collection and ignore any other value read from storage.
- On page load, read the saved theme before or during initialisation, apply it to `document.documentElement`, and update every button's `aria-pressed` state and active class.
- On button activation, apply the selected theme, update the controls, and save the valid theme name.
- Do not add console logging.
- Keep the implementation vanilla JavaScript and compatible with opening the HTML files directly.

## Accessibility and resilience

- Check text and control contrast in each mode against WCAG AA expectations.
- Ensure the active state is communicated through text/ARIA and styling, not colour alone.
- Keep keyboard focus visible against all three backgrounds.
- Honour `prefers-reduced-motion` by relying on the existing reduced-motion rule and avoiding essential information in animations.
- If `localStorage` is unavailable, the switcher should still work for the current page without throwing an error; persistence can be skipped gracefully.

## Files to change when approved

- `docs/index.html` — add the theme control group below the main navigation.
- `docs/library.html` — add the theme control group below the main navigation.
- `docs/game.html` — add the theme control group below the main navigation.
- `docs/css/style.css` — add theme tokens, theme overrides, switcher layout and responsive states.
- `docs/js/main.js` — add theme initialisation, switching and persistence.

No new assets or external libraries are required.

## Execution plan

1. Add the three-button theme control group consistently below the main navigation on all pages; keep it non-sticky so it scrolls away.
2. Add the colour tokens and the Night/Garden overrides while preserving the current Rainbow appearance as the default.
3. Separate football team identity tokens from theme tokens and create compatible team-colour treatments for every mode.
4. Implement theme application, accessible state updates and safe `localStorage` persistence.
5. Open each page directly and verify that switching works without a build step, including navigation between pages.
6. Test at 360 / 768 / 1280 px, with keyboard focus, touch-sized controls, the saved preference, invalid stored values, unavailable storage, reduced-motion settings, and team-colour readability in all three modes.
