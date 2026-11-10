# AGENTS.md - Coding Guidelines for this Project

This document applies to every change made to the project. Read it completely before writing code and follow it. If this document conflicts with an instruction given in the chat, the chat instruction wins.

## 1. Project Overview

- Personal website (university project), static, no build tool and no framework.
- Technologies: **HTML5, CSS3, vanilla JavaScript (ES6+)**. No libraries and no npm packages unless explicitly requested.
- Website language: **English** (`<html lang="en">`).
- Language in code (class names, variables, comments, file names): **English**.
- The site must work in current browsers by simply opening `index.html` (no server dependency, no `fetch` calls to local files).

## 2. Way of Working

1. **Read first, then write.** Look at the existing code and follow its patterns instead of inventing new ones.
2. **Small, targeted changes.** Only change what belongs to the task. No unrequested reformatting, renaming or refactoring of unrelated code.
3. **Reuse before rewriting.** Before adding a new class, check whether an existing class or design token is enough.
4. **Simple over clever.** The code must be readable and explainable for students. No tricks that cannot be explained in one sentence.
5. **Don't invent things.** Do not add content, image URLs or features that were not requested.
6. **Ask when unclear** instead of guessing, whenever several reasonable solutions exist.
7. **Report briefly at the end**: what was changed, in which files, and what the person should test manually.

## 3. File Structure

Target structure (place new files accordingly):

```
project/
    index.html
    css/
        style.css
    js/
        main.js
    assets/
        images/
        fonts/
```

- CSS and JS belong in **separate files**, not inline in the HTML (no `<style>` block, no `onclick="..."` attributes).
- Additional pages are named `kebab-case.html` and use the same CSS and JS files.
- File names: lowercase, `kebab-case`, no spaces or umlauts.
- Images go in `assets/images/`, are included in compressed form and have meaningful names (`lemon-cake.webp`, not `IMG_0042.jpg`).

> Note: The current `index.html` still contains everything in one file. If you are making larger changes to it anyway, or the person asks for it, move CSS and JS out as described above. Without such a request, do not change the structure.

## 4. HTML

### Basic Rules

- Always include `<!DOCTYPE html>`, `lang`, UTF-8 `charset` and the viewport meta tag.
- Every page has exactly **one `<h1>`**. Headings are never skipped (`h1 -> h2 -> h3`).
- Indentation: **4 spaces** (as in the existing code), no tabs.
- Comments mark sections, e.g. `<!-- Favourite Books -->`. No comments that merely repeat the tag.
- Attributes in double quotes, tags and attributes in lowercase.

### Semantics (important)

Use the element that matches the meaning, not just `div` and `span`:

| Content | Element |
| --- | --- |
| Page header / footer | `<header>` / `<footer>` |
| Main content | `<main>` (exactly once per page) |
| Navigation | `<nav>` with a list `<ul><li><a>` |
| Thematic section | `<section>` with a heading and an `id` |
| Self-contained card (book, recipe) | `<article>` or `<li>` inside a `<ul>` |
| Title inside a card | `<h3>` or `<p>` with a class, **not** `<span>` |
| Groups of similar items | `<ul>` / `<ol>` |
| Image | `<img>` with `alt`, `width`, `height` |

### Accessibility

- Purely decorative emojis/icons: `aria-hidden="true"`. Emojis that carry information get a text alternative or `aria-label`.
- Links that contain only a symbol need an `aria-label` (e.g. the avatar link in the navigation).
- Provide star ratings (e.g. four filled stars and one empty star) additionally as text for screen readers (e.g. `aria-label="Rating: 4 out of 5"`).
- Every image has a meaningful `alt` (use `alt=""` for decorative images).
- Interactive elements are real `<a>` or `<button>` elements, never a `div` with a click handler.
- Focus must stay visible: never remove `outline` without a replacement. Use `:focus-visible`.
- Text contrast at least WCAG AA (4.5 : 1).

## 5. CSS

### Organisation

- Order in `style.css`: **1. Design tokens (`:root`) -> 2. Reset -> 3. Base elements -> 4. Layout -> 5. Components -> 6. Utilities -> 7. Media queries**.
- Every component has a comment header: `/* Book Cards */`.
- Order inside a rule: positioning -> box model -> typography -> colours/visuals -> animation.
- One property per line, 4-space indentation, blank line between rules.

### Naming

- Classes: **`kebab-case`**, named by meaning, not by appearance (`.book-card`, not `.pink-box`).
- For related parts use the component as a prefix: `.book-card`, `.book-title`, `.book-author`.
- States as an additional class: `.is-active`, `.is-open`, `.is-hidden`.
- JavaScript uses **its own hooks** (`data-` attributes or `js-` classes), not style classes.
- IDs only for anchor targets (`#bio`) and form fields, never for styling.

### Design Tokens (mandatory)

All colours, shadows, radii and spacings come from CSS variables. **No loose hex values inside components.** If a value is missing, create a token first.

Existing tokens (from the current page):

```css
:root {
    --primary-color: #2d2b32;
    --accent-color: #ff94b7;
    --accent-soft: #fff0f5;
    --bg-color: #faf8f5;
    --card-bg: #ffffff;
    --border-color: #eeddd8;
    --text-color: #4a4a4a;
    --text-muted: #6e6b7b;
    --shadow-subtle: 0 4px 15px rgba(220, 190, 195, 0.15);
    --shadow-hover: 0 8px 25px rgba(220, 190, 195, 0.25);
    --rainbow-gradient: linear-gradient(90deg, #ff94b7, #ffd166, #a8ded6, #b8c0ff, #ff94b7);
}
```

Add new tokens in the same style when needed (examples):

```css
:root {
    --radius-card: 16px;
    --radius-pill: 999px;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 2rem;
    --transition-fast: 0.2s ease;
    --z-navbar: 1000;
}
```

### Rules

- **Mobile-first is preferred**: base styles for small screens, extensions via `min-width`. If the existing code is desktop-first (`max-width`), stay with one direction within a file.
- Layout with **Flexbox** (one-dimensional) and **Grid** (two-dimensional). No `float`, no tables for layout.
- Units: `rem` for font sizes and spacing, `%`/`fr`/`min()`/`max()` for widths, `px` only for borders, shadows and fine details.
- No `!important`. No IDs as selectors. Keep selectors flat (max. 2-3 levels).
- **No element selectors for component styling** (e.g. `section { ... }` for everything). Element selectors only in the base section (`body`, `h1`, `a`).
- **No `transition: all`.** Name the properties: `transition: transform 0.2s ease, box-shadow 0.2s ease;`
- Move recurring patterns (card with border, radius, shadow) into **one shared class** instead of copying them per component. Currently `.interest-card`, `.book-card` and `.recipe-card` repeat almost identical styles.
- Do not leave unused or dead rules behind.
- Fonts: system font stack as fallback. Google Fonts only with `display=swap` and with fallback fonts.

### Animation

- Only animate `transform` and `opacity` (smooth and cheap).
- Duration usually 0.2-0.3 s, subtle effects. No permanent animation that distracts from the content.
- **Respect `prefers-reduced-motion`:**

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
    }
}
```

(This is the only place where `!important` is allowed.)

### Responsive Design

- Main breakpoint so far: `620px`. Add new breakpoints only when the content requires it, and collect them in one central place at the end of the file.
- Mentally test every change at about **360 px, 768 px and 1280 px** width.
- No horizontal scrolling. Images: `max-width: 100%; height: auto;`.

## 6. JavaScript

### Basic Rules

- **Vanilla JS** only, modern syntax: `const` (default), `let` (only when reassigned), **never `var`**.
- Include the file with `<script src="js/main.js" defer></script>` in the `<head>`.
- Strict comparison (`===`, `!==`). Use template literals when concatenating strings.
- Use semicolons, single quotes `'...'`, 4-space indentation.

### Naming

| What | Style | Example |
| --- | --- | --- |
| Variables, functions | `camelCase` | `bookList`, `renderBooks()` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_ITEMS` |
| Booleans | prefix `is`/`has`/`can` | `isOpen`, `hasError` |
| Functions | start with a verb | `toggleMenu`, `getRating` |

### Structure and Quality

- **One function = one task**, ideally under about 20 lines. No global variables; wrap code in functions or a module.
- Collect constants and DOM references at the top of the file.
- **No inline JS** in the HTML. Register events with `addEventListener`.
- Select elements with `querySelector` / `querySelectorAll`, using `data-` attributes or `js-` classes.
- For many similar elements use **event delegation** instead of one listener per element.
- Switch states by **toggling classes** (`classList.toggle('is-open')`), not by setting `element.style.xyz`.
- Keep data (e.g. book list, recipes) as an **array of objects** and render HTML from it instead of copying identical HTML ten times:

```js
const books = [
    { title: 'Project Hail Mary', author: 'Andy Weir', rating: 4.5 },
    { title: 'Klara and the Sun', author: 'Kazuo Ishiguro', rating: 4 }
];
```

- When rendering text from data, use `textContent` instead of `innerHTML` (protects against bugs and XSS). Use `innerHTML` only with fixed, trusted HTML written in the code.
- Handle errors: check that an element exists before accessing it (`if (!element) return;`).
- No `console.log` in finished code (only for debugging, remove it afterwards).
- Comments explain the **why**, not the obvious. Complex functions get a short JSDoc comment (`@param`, `@returns`).

## 7. Performance

- Images: modern formats (`webp`), appropriate size, `loading="lazy"` for images below the fold.
- Keep the number of font weights small (currently: Caveat 400/500/600; only load what is needed).
- Do not copy repeated SVGs (e.g. the cloud buttons); define them once as a `<symbol>` and reference them with `<use href="#cloud">`.
- No unnecessary dependencies, no large files without a reason.

## 8. Content and Consistency

- Use **one** spelling throughout the text. Currently mixed: "Favorite Books" (navigation) vs. "Favourite Books" (heading). Use **British English** (`favourite`, `colour`, `centre`), matching most of the page, unless the person decides otherwise.
- Anchor IDs and navigation links must match (`href="#books"` <-> `id="books"`).
- Equal things look the same and are named the same: same spacings, radii, shadows (via tokens).

## 9. Existing Strengths (keep)

These patterns of the current page are good and remain the standard:

- Design tokens as CSS variables in `:root`.
- Global reset with `box-sizing: border-box`.
- Meaningful, meaning-based class names in `kebab-case` (`.book-card`, `.bio-highlights`).
- Section comments in HTML and CSS.
- `scroll-margin-top` so anchors don't disappear under the sticky navigation, plus `scroll-behavior: smooth`.
- Subtle hover effects using `transform` and shadow.
- Mobile adaptation via media query and viewport meta tag.

## 10. Known Legacy Issues (fix when the opportunity arises)

Only tackle these if you are changing the spot anyway or the person asks you to:

1. Everything lives in one `index.html` -> split into `css/style.css` and `js/main.js`.
2. Loose colour values (`#666`, `#777`, `#4a4a4a`, `#b83260`, `#5d4097` ...) -> replace with tokens (`--text-muted` exists but is not used).
3. `transition: all` in several places -> name the specific properties.
4. Cards (`interest-card`, `book-card`, `recipe-card`) duplicate styles -> shared `.card` base class.
5. Books and recipes consist of `<div>` and `<span>` -> `<ul>`/`<li>`/`<article>` with headings.
6. The nav cloud SVG path appears four times in the HTML -> define once as a `<symbol>`.
7. Missing `<main>`; avatar link without `aria-label`; emojis without `aria-hidden`.
8. The wave animation (`wave`) ignores `prefers-reduced-motion`.
9. The comment "animated gradient" is wrong, the gradient is static -> keep comments up to date.
10. Unused rules (e.g. `.bio-paragraph { position: relative; }`), generic `section` selector carrying layout styles.
11. Mixed spelling "Favorite"/"Favourite".

## 11. Checklist Before Finishing

Go through every item before reporting the task as done:

- [ ] The change is limited to the requested task.
- [ ] HTML is semantic, heading hierarchy is correct, one `<h1>`.
- [ ] No loose colour values, tokens are used instead.
- [ ] No inline CSS/JS, no `!important` (except `prefers-reduced-motion`), no `transition: all`, no `var`.
- [ ] All images have `alt`, icon-only links have `aria-label`.
- [ ] Layout works at about 360 px, 768 px and 1280 px, no horizontal scrolling.
- [ ] Hover and focus states exist, keyboard operation is possible.
- [ ] Names, indentation and spelling follow this document.
- [ ] No leftover `console.log`, no unused rules or variables.
- [ ] Short summary of the changes and testing notes written.
