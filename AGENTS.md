# AGENTS.md — Project Rules

Static personal website (university project). HTML5, CSS3, vanilla JS only. No frameworks, libraries or npm. English throughout. Must work by opening `index.html` directly.

## House rules
1. Read existing code first and follow its patterns. Make small, targeted changes only.
2. Reuse existing classes and CSS variables before creating new ones.
3. HTML: one `<h1>`, semantic elements, 4-space indent, section comments, British English.
4. CSS: `kebab-case` classes, all colours/spacing via variables, Flexbox/Grid, mobile-first, test at 360/768/1280 px.
5. JS: vanilla only, `const`/`let` (never `var`), `camelCase`, separate file with `defer`.
6. Accessibility: `alt` on images, `aria-label` on icon links, visible focus, WCAG AA contrast.
7. File names lowercase `kebab-case`; CSS/JS in separate files.
8. Ask when unclear; report what changed, which files, what to test.

## Never do
- No frameworks, libraries, npm, or build tools.
- No inline CSS/JS (no `<style>`, no `onclick`).
- No loose hex colours, no `!important`, no `transition: all`.
- No `var`, no float/table layout, no global variables.
- No `console.log` in finished code.
- No unrequested changes, invented content, or extra features.
