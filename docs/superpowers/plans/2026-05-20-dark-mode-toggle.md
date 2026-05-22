# Dark Mode Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a three-state (light / dark / auto) theme toggle to the wiki header with True Black OLED-friendly dark palette, FOUC-free first paint via an inline script, and `localStorage`-backed persistence.

**Architecture:** Pure-CSS dark variant of the existing `:root` color tokens; a `data-theme` attribute on `<html>` selects between auto/light/dark; an inline FOUC-prevention script in `BaseLayout` runs before paint; a single icon-button in `SiteHeader` cycles light → dark → auto and persists the choice. No new dependencies.

**Tech Stack:** Astro 4, vanilla JS (inline `is:inline` scripts), CSS custom properties, `localStorage`.

**Spec:** `docs/superpowers/specs/2026-05-20-dark-mode-toggle-design.md`

**Worktree:** `/Users/cq/Git/agentic-ai-wiki/.worktrees/og-cards-and-canonical-url`
**Branch:** `og-cards-and-canonical-url` (PR #58 already open — pushing new commits triggers Vercel rebuild)

**Always run commands from the worktree root:**
```bash
cd /Users/cq/Git/agentic-ai-wiki/.worktrees/og-cards-and-canonical-url
```

---

## Task 1: Dark-mode token override block in `guide.css`

Add the dark variant of every theme-dependent `:root` token. After this task the page reacts to `prefers-color-scheme: dark` (no toggle yet) — visible via DevTools "Rendering → Emulate CSS prefers-color-scheme".

**Files:**
- Modify: `src/styles/guide.css` (add block immediately after the existing `:root { … }` declaration, around line 23)

- [ ] **Step 1: Insert the dark-mode block after the existing `:root` declaration**

Find the closing `}` of the existing `:root` declaration (the block that ends with `--subnav-h: 0px;` followed by `}`). Insert this block immediately after that closing brace:

```css
/* Dark mode: applies when the user (a) explicitly chose dark via the
   header toggle (data-theme="dark") OR (b) hasn't chosen anything and
   their OS prefers dark. The :not([data-theme="light"]) guard prevents
   the media query from overriding an explicit user choice. */
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

- [ ] **Step 2: Build and confirm no CSS warnings**

```bash
npm run build
```

Expected: 368 pages built, no new warnings. `dist/_astro/*.css` will contain the new rules.

- [ ] **Step 3: Manual smoke check via DevTools `prefers-color-scheme`**

Open `dist/index.html` locally (or run `npm run dev` and visit `http://localhost:4321`), open DevTools → Rendering → set "Emulate CSS prefers-color-scheme" to `dark`. The page should flip to True Black (background `#000`, light text, brighter orange accent).

- [ ] **Step 4: Commit**

```bash
git add src/styles/guide.css
git commit -m "Dark mode: add token overrides for prefers-color-scheme + data-theme"
```

---

## Task 2: FOUC-prevention inline script in `BaseLayout.astro`

Sets `data-theme` on `<html>` from `localStorage` before paint. Without this, a user who's chosen `light` while their OS is dark would see a flash of dark on every load (and vice versa).

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (add as the FIRST child of `<head>`, immediately after `<head>`)

- [ ] **Step 1: Insert the inline script**

Find the `<head>` opening tag in `src/layouts/BaseLayout.astro`. Immediately after it (before `<meta charset="UTF-8" />`), insert:

```html
<script is:inline>
  (() => {
    try {
      const t = localStorage.getItem('theme');
      if (t === 'light' || t === 'dark') {
        document.documentElement.setAttribute('data-theme', t);
      }
      // 'auto' or no value → leave the attribute off; @media (prefers-color-scheme) handles it.
    } catch {} /* localStorage may be disabled in restricted contexts */
  })();
</script>
```

Position matters: it MUST be before `<link rel="stylesheet">` and any other `<meta>` tags. Astro's `is:inline` directive prevents bundling/deferring.

- [ ] **Step 2: Build and confirm the script lands in every page's `<head>`**

```bash
npm run build
grep -c "localStorage.getItem('theme')" dist/index.html dist/concepts/index.html dist/about/index.html
```

Expected: `1` in each file (one occurrence per page).

- [ ] **Step 3: Behavior test — confirm the attribute is set on reload**

```bash
npm run dev
```

In the browser:
1. Open the dev server, open DevTools console
2. Run `localStorage.setItem('theme', 'dark')`
3. Reload the page
4. Run `document.documentElement.getAttribute('data-theme')` — expected: `"dark"`
5. Run `localStorage.setItem('theme', 'auto'); location.reload()`
6. Run `document.documentElement.getAttribute('data-theme')` — expected: `null` (attribute removed)

Stop the dev server (`Ctrl+C`).

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "Dark mode: FOUC-prevention inline script in BaseLayout"
```

---

## Task 3: Add `theme` strings to `UIStrings` (EN + ZH)

Three bilingual aria-label strings the toggle button uses to describe its current state.

**Files:**
- Modify: `src/i18n/ui.ts` (interface around line 45; EN block; ZH block)

- [ ] **Step 1: Extend the `UIStrings` interface**

Find the line `og: { tagline: string };` (~line 45). Add the `theme` field right after it (before `seriesTitle`):

```diff
   og: { tagline: string };
+  theme: { ariaLight: string; ariaDark: string; ariaAuto: string };
   seriesTitle: string;
```

- [ ] **Step 2: Add EN values**

Find the EN block's `og: { tagline: '...' },` line (one of the last few entries before `seriesTitle: 'The Agentic AI Field Guide'`). Add right after it:

```diff
     og: { tagline: 'A living knowledge base on building agentic AI.' },
+    theme: {
+      ariaLight: 'Theme: Light. Click to cycle.',
+      ariaDark:  'Theme: Dark. Click to cycle.',
+      ariaAuto:  'Theme: Auto. Click to cycle.',
+    },
     seriesTitle: 'The Agentic AI Field Guide',
```

- [ ] **Step 3: Add ZH values**

Mirror in the ZH block right after that locale's `og: { tagline: '...' },`:

```diff
     og: { tagline: '持续更新的智能体 AI 知识库。' },
+    theme: {
+      ariaLight: '主题：浅色。点击切换。',
+      ariaDark:  '主题：深色。点击切换。',
+      ariaAuto:  '主题：跟随系统。点击切换。',
+    },
     seriesTitle: 'Agentic AI 实战指南',
```

- [ ] **Step 4: Type-check**

```bash
npx astro check
```

Expected: 3 pre-existing errors (the same operations/playbooks `Locale` export errors + the SectionEntryLayout narrowing), no NEW errors.

- [ ] **Step 5: Run tests**

```bash
npm test
```

Expected: all green (the `i18n.test.mjs` test verifies bilingual completeness — the new `theme` field gets covered automatically).

- [ ] **Step 6: Commit**

```bash
git add src/i18n/ui.ts
git commit -m "Dark mode: add theme.ariaLight/Dark/Auto strings to UIStrings"
```

---

## Task 4: Toggle button markup in `SiteHeader.astro`

The button + the three SVG icons. Position between `<SiteSearch />` and `<nav class="lang-switch">`. CSS shows only the active-state icon (Task 5).

**Files:**
- Modify: `src/components/SiteHeader.astro`

- [ ] **Step 1: Add the button between SiteSearch and lang-switch**

Find the `<SiteSearch locale={locale} />` line and the `<nav class="lang-switch" …>` line that immediately follows it. Insert the toggle markup between them:

```diff
   <SiteSearch locale={locale} />
+  <button
+    id="theme-toggle"
+    type="button"
+    class="theme-toggle"
+    data-theme="auto"
+    aria-label={t.theme.ariaAuto}
+  >
+    <svg class="ico-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
+      <circle cx="12" cy="12" r="4"/>
+      <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
+      <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
+      <line x1="4.6" y1="4.6" x2="6.8" y2="6.8"/><line x1="17.2" y1="17.2" x2="19.4" y2="19.4"/>
+      <line x1="4.6" y1="19.4" x2="6.8" y2="17.2"/><line x1="17.2" y1="6.8" x2="19.4" y2="4.6"/>
+    </svg>
+    <svg class="ico-moon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
+      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
+    </svg>
+    <svg class="ico-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
+      <circle cx="12" cy="12" r="9"/>
+      <path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/>
+    </svg>
+  </button>
   <nav class="lang-switch" aria-label={t.switcher.aria}>
```

- [ ] **Step 2: Build and confirm the button renders**

```bash
npm run build
grep -c 'id="theme-toggle"' dist/index.html
```

Expected: `1`.

- [ ] **Step 3: Commit**

```bash
git add src/components/SiteHeader.astro
git commit -m "Dark mode: theme-toggle button + 3-icon SVGs in SiteHeader"
```

---

## Task 5: Toggle CSS in `site.css`

Square 36×36 button matching the search trigger's visual weight; icon visibility driven by `[data-theme]`.

**Files:**
- Modify: `src/styles/site.css` (add a new section after the existing `.site-search-trigger` rules, around line 150)

- [ ] **Step 1: Append the toggle styles**

Find the existing `.site-search-trigger svg { display: block; }` line (around line 149). Insert immediately after it:

```css

/* ============ THEME TOGGLE ============
   Square icon-button matching .site-search-trigger. Three SVGs in the
   markup; CSS shows only the one for the currently-active theme via
   the button's data-theme attribute. */
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin: 0 4px 0 0;
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--paper-2);
  border-radius: 4px;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}
.theme-toggle:hover,
.theme-toggle:focus-visible {
  background: var(--paper-2);
}
.theme-toggle:focus-visible { box-shadow: inset 0 0 0 2px var(--accent); outline: none; }
.theme-toggle svg { display: none; }
.theme-toggle[data-theme="light"] .ico-sun  { display: block; }
.theme-toggle[data-theme="dark"]  .ico-moon { display: block; }
.theme-toggle[data-theme="auto"]  .ico-auto { display: block; }
```

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected: clean.

- [ ] **Step 3: Visual check — only one icon visible at a time**

```bash
npm run dev
```

In the browser, the toggle should show the split-circle (auto) icon by default. In DevTools, manually change the `data-theme` attribute on the button to `light` then `dark` — only the matching icon should appear each time. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/styles/site.css
git commit -m "Dark mode: theme-toggle button CSS + icon-swap rules"
```

---

## Task 6: Cycle handler script in `SiteHeader.astro`

The click handler. Reads the localStorage value, applies it (sets / removes `data-theme` on `<html>`), updates the button's `aria-label`, and on click advances to the next state.

**Files:**
- Modify: `src/components/SiteHeader.astro`

- [ ] **Step 1: Append the inline script**

At the bottom of the file (after the closing `</header>` tag), add:

```html
<script
  is:inline
  define:vars={{
    labels: {
      light: t.theme.ariaLight,
      dark:  t.theme.ariaDark,
      auto:  t.theme.ariaAuto,
    },
  }}
>
  (() => {
    const html = document.documentElement;
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const STATES = ['light', 'dark', 'auto'];

    function read() {
      try { return localStorage.getItem('theme') || 'auto'; } catch { return 'auto'; }
    }
    function write(theme) {
      try { localStorage.setItem('theme', theme); } catch {}
    }
    function apply(theme) {
      if (theme === 'auto') html.removeAttribute('data-theme');
      else html.setAttribute('data-theme', theme);
      btn.dataset.theme = theme;
      btn.setAttribute('aria-label', labels[theme]);
      write(theme);
    }

    apply(read());

    btn.addEventListener('click', () => {
      const idx = STATES.indexOf(btn.dataset.theme);
      apply(STATES[(idx + 1) % STATES.length]);
    });
  })();
</script>
```

The `define:vars` pattern matches how `SiteSearch.astro` injects its localized strings (see `src/components/SiteSearch.astro:48-62`). This keeps the script `is:inline` (no bundling) while still being locale-aware.

- [ ] **Step 2: Build**

```bash
npm run build
grep -c 'apply(read())' dist/index.html dist/zh/index.html
```

Expected: `1` in each — the script lands on every page.

- [ ] **Step 3: Behavior test — click through all three states**

```bash
npm run dev
```

In the browser:
1. Open the dev server. The button should show the split-circle (auto) icon by default.
2. Open DevTools console. Run `localStorage.removeItem('theme')` and reload to start clean.
3. Click the toggle once. Expect: sun icon visible, `<html>` has `data-theme="light"`, `localStorage.theme === "light"`, page is light (forced).
4. Click again. Expect: moon icon, `data-theme="dark"`, `localStorage.theme === "dark"`, page is True Black.
5. Click again. Expect: split-circle icon, `data-theme` attribute removed, `localStorage.theme === "auto"`, page follows OS preference.
6. Click again. Back to light. Cycle complete.

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/components/SiteHeader.astro
git commit -m "Dark mode: cycle handler script in SiteHeader (light → dark → auto)"
```

---

## Task 7: Full gate run

Verify the standard chain still passes.

- [ ] **Step 1: Clean rebuild + full gate**

```bash
rm -rf dist
npm run build
npm run verify
npm test
```

Expected: all four commands exit 0.

- [ ] **Step 2: Confirm idempotence of OG PNGs (Task 1 of #58's plan-in-the-PR shouldn't have shifted)**

```bash
git status -- public/og/
```

Expected: empty.

- [ ] **Step 3: Manual social validators wait until deploy preview** (no commit needed for this step; just confirm gates green)

---

## Task 8: Amend the bundled changelog entry

This PR uses a single changelog entry covering all four bundled features. We add a "Dark mode" bullet group to the existing file rather than creating a new one (per CLAUDE.md's "one entry per PR" rule when bundling).

**Files:**
- Modify: `src/content/changelog/entries/2026-05-20-og-cards-and-canonical-url.ts`

- [ ] **Step 1: Add new bilingual items**

After the existing `items: [` array's last entry (the one about `npm run og:build`), append two new `L(...)` entries:

```diff
     L(
       'New `npm run og:build` regenerates all 14 PNGs from a single template via Satori + resvg-js. Adding a new section is a one-line change in src/content/og.ts.',
       '新增 `npm run og:build`，通过 Satori + resvg-js 从单一模板重新生成全部 14 张 PNG。新增版块只需在 src/content/og.ts 中加一行。',
     ),
+    L(
+      'Dark mode: a three-state toggle (light / dark / auto) in the header. Defaults to your OS preference; click cycles through. True-black palette (#000 background) on OLED-friendly displays.',
+      '深色模式：标题栏新增三态切换（浅色 / 深色 / 跟随系统）。默认跟随系统偏好，点击循环切换。纯黑配色（#000 背景），对 OLED 屏更友好。',
+    ),
+    L(
+      'Theme choice persists in localStorage and survives EN ↔ 中文 switches. No flash of wrong theme on reload (inline pre-paint guard).',
+      '主题选择存于 localStorage，并在中英文切换间保持不变。重新加载时不会出现错误主题闪烁（采用首屏前置内联守卫）。',
+    ),
   ],
```

(If you eventually want to also rename the file from `2026-05-20-og-cards-and-canonical-url.ts` to something broader, that's optional — but per CLAUDE.md the filename's date prefix must match the `date:` field, and both are `2026-05-20`, so the existing name is fine.)

- [ ] **Step 2: Test the changelog**

```bash
npm test -- --test-name-pattern='changelog'
```

Expected: changelog tests still pass.

- [ ] **Step 3: Commit**

```bash
git add src/content/changelog/entries/2026-05-20-og-cards-and-canonical-url.ts
git commit -m "Changelog: add dark mode bullets to the bundled #58 entry"
```

---

## Task 9: Push to update PR #58

The PR is already open. New commits push automatically to the same branch.

- [ ] **Step 1: Push**

```bash
git push
```

Expected: pushes commits to `origin/og-cards-and-canonical-url`. Vercel rebuilds; PR #58's check list updates.

- [ ] **Step 2: Verify PR view picks up the new commits**

```bash
gh pr view 58 --repo EvanCarson/Agentic-AI-Wiki --json title,statusCheckRollup
```

Expected: the PR title is unchanged; `statusCheckRollup` shows Vercel status `PENDING` or `SUCCESS` once the build completes. If `FAILURE`, fetch the Vercel log via the targetUrl and address the failure.

- [ ] **Step 3: Update the PR description to mention dark mode**

```bash
gh pr edit 58 --repo EvanCarson/Agentic-AI-Wiki --body "$(cat <<'EOF'
Closes #34, closes #44.
Pending: #41 (scroll-spy TOC) and #45 (Pagefind section filters) — being added to this PR next.

## Summary

- **#34**: Per-section bilingual 1200×630 OG/Twitter card images (14 PNGs in `public/og/`). Canonical URL flipped to `menuagentic.com`. `twitter:card` upgraded to `summary_large_image`. New `verify-og` gate.
- **#44**: Three-state theme toggle (light / dark / auto) in the header. True Black OLED-friendly palette. Inline FOUC-prevention script. localStorage-backed persistence, no cookie, no server-side state.

## Test plan

- [x] `npm run og:build` produces 14 PNGs, idempotent on re-run
- [x] `npm run build` clean (368 pages)
- [x] `npm run verify` clean (`[verify-og] OK — 368 pages checked`)
- [x] `npm test` all green
- [x] Toggle cycles light → dark → auto correctly; localStorage matches; FOUC-free on slow network throttle
- [ ] Twitter Card Validator on `/concepts/what-is-an-agent/` (EN) — pending deploy preview
- [ ] Twitter Card Validator on ZH equivalent — pending deploy preview
- [ ] LinkedIn Post Inspector on the same two URLs — pending deploy preview

## Notes

- Card design "Direction A — dark editorial" from brainstorming
- Dark palette "True Black OLED-friendly" from brainstorming
- AdSense ads are not yet placed (\`<ins>\` slots absent); dark mode design is future-AdSense-compatible

Spec (#34): \`docs/superpowers/specs/2026-05-20-og-cards-and-canonical-url-design.md\`
Plan (#34): \`docs/superpowers/plans/2026-05-20-og-cards-and-canonical-url.md\`
Spec (#44): \`docs/superpowers/specs/2026-05-20-dark-mode-toggle-design.md\`
Plan (#44): \`docs/superpowers/plans/2026-05-20-dark-mode-toggle.md\`

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

(The body still notes #41 and #45 as pending — those land in subsequent batches.)

- [ ] **Step 4: Confirm Vercel build green**

After ~2-3 minutes:
```bash
gh pr view 58 --repo EvanCarson/Agentic-AI-Wiki --json statusCheckRollup
```

Expected: Vercel context shows `state: "SUCCESS"`. If `FAILURE`, address by reading the targetUrl (re-using the verify-og fix pattern from earlier — find the verify-og failure mode and patch).

---

## Risk register

| risk | mitigation |
|---|---|
| FOUC despite inline script | Script is the FIRST child of `<head>`, uses `is:inline`. Behavioral test in Task 2 Step 3 catches regressions. |
| OS-pref users stuck after clicking once | Three-state cycle puts auto reachable by 1-2 more clicks. Tooltip says "Click to cycle". |
| Brand orange shift (#d4421e → #ff552d) feels off | Hue family preserved. Visual companion confirmed acceptable. Adjust to taste in a follow-up if needed. |
| Code-block visibility on pure black (#1a1a1a on #000) | Spot-check in Task 7. If subtle, bump `--code-bg` to `#202020` — non-blocking. |
| `localStorage` disabled (private mode, restricted contexts) | All access in `try/catch`. Toggle still cycles in-memory; just doesn't persist. |
| Vercel rebuild fails because of OG/canonical changes accidentally re-broken | Task 9 Step 4 catches it. The verify-og changelog exemption (commit `1c4a463`) already addressed the only known case. |
| Adding `data-theme` to `<html>` interferes with other Astro/Vercel tooling | None observed in research; the attribute is a standard pattern (used by Tailwind, GitHub, MDN, etc.). |
