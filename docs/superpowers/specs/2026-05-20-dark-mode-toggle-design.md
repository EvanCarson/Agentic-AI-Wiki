# Dark mode toggle with system-preference default — design

- **Issue:** [#44](https://github.com/EvanCarson/Agentic-AI-Wiki/issues/44) `[P1] Dark mode toggle with system-preference default`
- **Branch:** `og-cards-and-canonical-url` (bundled into PR #58)
- **Date drafted:** 2026-05-20
- **Status:** design — pending user approval before implementation plan

## Goal

Ship a three-state theme toggle (light / dark / auto) on the existing wiki, with `auto` honoring `prefers-color-scheme` and explicit choices persisting in `localStorage`. Default dark palette is "True Black OLED-friendly": pure black background, warm cream text, brighter orange accent.

## Non-goals (explicit — to keep scope tight)

- **Per-section accent variants in dark mode.** Same accent across all sections.
- **AdSense ad-unit color matching.** No `<ins>` ad slots exist yet; revisit when ads are placed.
- **Cross-device theme sync.** `localStorage` only, no cookie, no server-side state, no telemetry.
- **Transition animations.** No fade/cross-dissolve when toggling — instant flip, matching peer developer-tool sites.
- **Issues #41 (TOC) and #45 (Pagefind filters).** Bundled in the same PR (#58) but separate features with their own design phases.

## Locked decisions

1. **Three-state cycle.** Click cycles `light → dark → auto → light…`. `auto` follows the OS via `@media (prefers-color-scheme: dark)`; the other two override.
2. **True Black palette.** Pure `#000` background, warm cream text, brighter orange accent `#ff552d`. OLED-friendly on mobile.
3. **Single icon button.** 36×36 square matching the existing `.site-search-trigger` visual weight. Current state's icon visible; the other two hidden via CSS. Tooltip explains the cycle.
4. **Inline FOUC-prevention script.** First child of `<head>`, runs before paint.
5. **`localStorage.theme` key.** Single string value `'light' | 'dark' | 'auto'`. Per-origin, so EN ↔ ZH switches preserve it automatically.

## Token mapping

Light values stay in the existing `:root`. Dark overrides go in a new selector — winning under either `:root[data-theme="dark"]` (explicit override) OR `@media (prefers-color-scheme: dark) :root:not([data-theme="light"])` (auto, but not if user explicitly chose light).

| token | light | dark | notes |
|---|---|---|---|
| `--ink` | `#0a0a0a` | `#f4f1ea` | Body text + 2px borders. Inverts to paper. |
| `--paper` | `#f4f1ea` | `#000000` | Page background. |
| `--paper-2` | `#ebe7dc` | `#111111` | Secondary surface (sidebars, callouts). |
| `--accent` | `#d4421e` | `#ff552d` | Brand orange brightened to maintain visibility on black. |
| `--accent-ink` | `#a82f0d` | `#ffb088` | Small accent text (links); ~9.6:1 on `#000` (AA). |
| `--accent-soft` | `#f0d5cc` | `#2a1c14` | Soft accent-tinted backgrounds. Dark brown. |
| `--muted` | `#6b6358` | `#8a8270` | Secondary text. ~6.3:1 on `#000`. |
| `--code-bg` | `#1a1a1a` | `#1a1a1a` | **Unchanged** — already dark. |
| `--code-text` / `--code-comment` / `--code-key` / `--code-str` / `--code-fn` | (dark theme) | unchanged | Already paper-on-ink. |
| `--q-bg` | `#fdf6e3` | `#1a1814` | Pull-quote / callout background. Warm dark. |
| `--q-border` | `#b8860b` | `#d4a040` | Golden border, brightened. |
| `--tab-anthropic` | `#d4421e` | unchanged | Brand color. |
| `--tab-openai` | `#10a37f` | unchanged | Brand color. |

Borders that reference `var(--ink)` flip automatically — no per-declaration edits required. 103 `var(--…)` references in `guide.css` + 43 in `site.css` all inherit dark values through tokens.

## Architecture

```
src/styles/guide.css            ← +1 block: dark-mode token overrides
                                   ~15 lines added after the :root declaration

src/layouts/BaseLayout.astro    ← +1 inline <script is:inline> (~10 lines)
                                   FIRST child of <head> — pre-paint FOUC guard

src/components/SiteHeader.astro ← +1 <button id="theme-toggle"> in the toolset
                                   row (between SiteSearch and lang-switch)
                                  +1 inline <script is:inline> for the cycle handler
                                  +CSS for the button + the 3-SVG icon swap

src/styles/site.css             ← +CSS for .theme-toggle button + .ico-sun / -moon / -auto

src/i18n/ui.ts                  ← +1 string per locale for the toggle's aria-label
                                   template ("Theme: %S. Click to cycle.")
```

Five files touched. No new dependencies. No new build step.

## CSS organization

Add ONE new block to `src/styles/guide.css`, immediately after the existing `:root` declaration:

```css
:root { /* light tokens — existing block, unchanged */ }

/* Dark mode: applied when the user (a) explicitly chose dark OR (b) didn't
   choose anything and their OS prefers dark. The :not([data-theme="light"])
   guard prevents the media query from overriding an explicit user choice. */
:root[data-theme="dark"],
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --ink: #f4f1ea;
    --paper: #000000;
    --paper-2: #111111;
    --accent: #ff552d;
    --accent-ink: #ffb088;
    --accent-soft: #2a1c14;
    --muted: #8a8270;
    --q-bg: #1a1814;
    --q-border: #d4a040;
  }
}
```

## FOUC prevention (inline script in `BaseLayout.astro`)

Placed as the **first** child of `<head>`, before any `<link rel="stylesheet">`:

```html
<script is:inline>
  (() => {
    try {
      const t = localStorage.getItem('theme');
      if (t === 'light' || t === 'dark') {
        document.documentElement.setAttribute('data-theme', t);
      }
      // 'auto' or no value → leave the attribute off; the media query handles it.
    } catch {} // localStorage may be disabled in restricted contexts
  })();
</script>
```

~10 lines. Runs before paint. No flash even if the user has `theme=dark` set + their OS is light.

## Toggle button + cycle handler

Inserted in `SiteHeader.astro` between `<SiteSearch />` and `<nav class="lang-switch">`:

```html
<button
  id="theme-toggle"
  type="button"
  class="theme-toggle"
  data-theme="auto"
  aria-label={t.theme.ariaAuto}
>
  <svg class="ico-sun"  …>{/* sun icon */}</svg>
  <svg class="ico-moon" …>{/* moon icon */}</svg>
  <svg class="ico-auto" …>{/* split-circle icon */}</svg>
</button>
```

CSS shows only the active icon:
```css
.theme-toggle .ico-sun,
.theme-toggle .ico-moon,
.theme-toggle .ico-auto { display: none; }
.theme-toggle[data-theme="light"] .ico-sun  { display: block; }
.theme-toggle[data-theme="dark"]  .ico-moon { display: block; }
.theme-toggle[data-theme="auto"]  .ico-auto { display: block; }
```

Cycle handler (inline `<script is:inline>` in `SiteHeader.astro`):

```js
(() => {
  const html = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const STATES = ['light', 'dark', 'auto'];
  const LABELS = { light: 'ariaLight', dark: 'ariaDark', auto: 'ariaAuto' };
  const t = /* injected from ui[locale].theme */;

  function apply(theme) {
    if (theme === 'auto') html.removeAttribute('data-theme');
    else html.setAttribute('data-theme', theme);
    btn.dataset.theme = theme;
    btn.setAttribute('aria-label', t[LABELS[theme]]);
    try { localStorage.setItem('theme', theme); } catch {}
  }

  const current = (() => { try { return localStorage.getItem('theme') || 'auto'; } catch { return 'auto'; } })();
  apply(current);

  btn.addEventListener('click', () => {
    const idx = STATES.indexOf(btn.dataset.theme);
    apply(STATES[(idx + 1) % 3]);
  });
})();
```

A `<noscript>` block hides the button entirely — the `@media (prefers-color-scheme)` rule still works as auto behavior.

## i18n strings

Add to `src/i18n/ui.ts` under each locale:

```ts
theme: {
  ariaLight: 'Theme: Light. Click to cycle.',   // zh: '主题：浅色。点击切换。'
  ariaDark:  'Theme: Dark. Click to cycle.',    // zh: '主题：深色。点击切换。'
  ariaAuto:  'Theme: Auto. Click to cycle.',    // zh: '主题：跟随系统。点击切换。'
}
```

The interface field gets `theme: { ariaLight: string; ariaDark: string; ariaAuto: string }`.

## Persistence semantics

- **Key**: `localStorage.theme` (single key, string value `'light' | 'dark' | 'auto'`).
- **No locale binding**: theme is global — switching EN ↔ ZH preserves the choice because `localStorage` is per-origin, not per-path.
- **Default**: `'auto'` (no key written until the user clicks).
- **Out-of-band changes**: if the user changes the key in DevTools / another tab, the page picks up the new value on next load (not live). Acceptable for a personal-preference setting.
- **Privacy**: not synced to any server. Just the local key.

## Verification gates

### A. Build + tests (the standard chain)

1. `npm run build` clean (368 pages emit unchanged HTML; only CSS/JS bytes differ).
2. `npm run verify` clean (`verify-og` continues to pass — OG meta tags are theme-independent).
3. `npm test` clean.
4. `npx astro check` does not gain any NEW errors (3 pre-existing errors are out of scope).

### B. Behavioral spot-checks (manual, on the deploy preview)

5. **Cycle correctness** — visit `/`, click the toggle three times. Confirm: icon swaps each click; HTML `data-theme` attribute is set to `light` / `dark` / removed (`auto`); `localStorage.theme` mirrors the choice.
6. **FOUC** — set `localStorage.theme = 'dark'` in DevTools; reload with "Slow 3G" throttling. First paint must be black — no white flash.
7. **OS-pref tracking** — set `localStorage.theme = 'auto'`; toggle DevTools "Rendering → Emulate CSS prefers-color-scheme". The page should flip without any JS running.
8. **No locale leakage** — set theme to dark on `/concepts/`, click the EN→ZH switch; the `/zh/concepts/` page should arrive in dark too.
9. **AA contrast** — body text on `#000` ≈ 15.3:1; accent-ink `#ffb088` on `#000` ≈ 9.6:1; muted `#8a8270` on `#000` ≈ 6.3:1. All pass.
10. **Code blocks** — open a Field Guide chapter in dark mode. Code blocks (`#1a1a1a` on `#000`) should still read as a distinct surface.

### C. Pre-existing tests (no change needed)

11. `verify-og` already runs against `dist/` and would catch any meta-tag regression caused by changes to `BaseLayout.astro`.
12. `i18n.test.mjs` covers bilingual completeness of `ui.ts`; the new `theme` strings get pulled in automatically.

## Work breakdown (input for the implementation plan)

1. **Token override block** in `src/styles/guide.css`.
2. **FOUC inline script** in `BaseLayout.astro` (first child of `<head>`).
3. **Toggle button + icons** in `SiteHeader.astro` (markup, CSS in `site.css`, inline cycle script).
4. **i18n strings** in `src/i18n/ui.ts` (`theme.ariaLight/ariaDark/ariaAuto` per locale).
5. **Visual smoke checks** locally before committing.
6. **Append to the existing PR #58 changelog entry** with a new bullet group covering dark mode.

## Risk register

| risk | likelihood | mitigation |
|---|---|---|
| FOUC despite inline script | L | Script is the FIRST child of `<head>` and uses `is:inline` so Astro doesn't bundle/defer it. Behavioral test #6 catches regressions. |
| OS-pref users who clicked once and now can't get back to "auto" | M | The three-state cycle puts auto reachable by one more click. Documented via the tooltip ("Click to cycle"). |
| Brand orange shift (`#d4421e` → `#ff552d`) feels different from light mode | L | Brand identity preserved by the same hue family; brighter for legibility on black. Visual companion confirmed acceptable. |
| Code block visibility on pure black (`#1a1a1a` on `#000`) | L | Spot-check during smoke testing (#10). If too subtle, raise `--code-bg` to `#202020` later — not blocking. |
| `localStorage` disabled in private/restricted browser modes | L | All access wrapped in `try/catch`. Toggle still cycles in-memory; just doesn't persist. |
| Existing AdSense script renders bright on dark page | None today | No `<ins>` ad slots exist; the script alone produces no visible elements. Revisit when ads are added. |

## Open questions for the implementation plan

These are deferred to writing-plans, not strategic:

- Exact SVG paths/optimization for the three icons (sun, moon, split-circle) — pick consistent stroke weights with the existing search icon.
- Whether the cycle handler script gets injected via `define:vars` for the i18n strings (like `SiteSearch.astro` does today) or via separate per-locale rendering — match the SiteSearch pattern.
