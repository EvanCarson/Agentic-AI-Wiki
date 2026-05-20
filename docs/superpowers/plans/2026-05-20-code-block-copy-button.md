# Code-block copy button — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Inject a copy-to-clipboard button (and opt-in language badge) into every `<pre class="standalone">` on the Agentic AI Wiki via a single inline script in `BaseLayout.astro`, with matching styles in `guide.css`. No changes to the 692 existing content fragments.

**Architecture:** A `<script is:inline>` block in `src/layouts/BaseLayout.astro` runs once on `DOMContentLoaded`. It selects `pre.standalone`, wraps each in a `<div class="pre-wrap">`, and inserts a `<button class="copy-btn">` (stacked clipboard/checkmark SVGs) plus, when the `<pre>` has `data-lang="…"`, a `<span class="lang-badge">`. Click handler copies `pre.textContent` via `navigator.clipboard.writeText`, flips a `.copied` class for 1500 ms, then reverts. Bilingual `aria-label`/`title` chosen from `document.documentElement.lang`.

**Tech stack:** Astro 4 (static), vanilla JS via `is:inline`, plain CSS in `src/styles/guide.css`, Node `node:test` with `--experimental-strip-types` for unit tests.

**Spec:** `docs/superpowers/specs/2026-05-19-code-block-copy-button-design.md`

**Branch / worktree:** `issue-35-code-copy-button` under `.worktrees/issue-35-code-copy-button/`.

---

## File Structure

| Path | Action | Responsibility |
|---|---|---|
| `src/layouts/BaseLayout.astro` | Modify | Append `<script is:inline>` right before `</body>` (currently line 51). |
| `src/styles/guide.css` | Modify | Append a "CODE BLOCK COPY" CSS section immediately after the existing `pre.attack` rule (currently line 439). |
| `src/content/changelog/entries/2026-05-20-code-copy-button.ts` | Create | One-file changelog entry, bilingual title + items. Date matches the projected merge day; if the merge slips, rename + bump per `CLAUDE.md`. |
| `scripts/__tests__/copy-button.smoke.test.mjs` | Create | Source-string smoke test asserting the BaseLayout script and guide.css rules contain the expected hooks (regression guard for future edits). |

No content fragment changes. No new dependencies.

---

### Task 1: Smoke test — assert BaseLayout contains the copy-button script

**Files:**
- Create: `scripts/__tests__/copy-button.smoke.test.mjs`

The script logic is delivered as a string baked into an Astro layout; behavioral testing would require Playwright or JSDOM (deferred per spec). This smoke test catches the most common regression — someone deleting or accidentally renaming the script — by asserting key markers exist in the layout and stylesheet source.

- [ ] **Step 1: Write the failing test**

```js
// scripts/__tests__/copy-button.smoke.test.mjs
//
// Source-string smoke test for the code-block copy button (issue #35).
// We do not run the script in a DOM here (deferred per spec); we assert
// the inline script + CSS contain the load-bearing hooks so future edits
// can't silently strip the feature.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const baseLayout = readFileSync(
  fileURLToPath(new URL('../../src/layouts/BaseLayout.astro', import.meta.url)),
  'utf8',
);
const guideCss = readFileSync(
  fileURLToPath(new URL('../../src/styles/guide.css', import.meta.url)),
  'utf8',
);

test('BaseLayout: code-copy script is present and uses is:inline', () => {
  assert.match(baseLayout, /<script is:inline>[\s\S]*pre\.standalone[\s\S]*<\/script>/,
    'inline copy-button script is missing or no longer is:inline');
});

test('BaseLayout: code-copy script wires navigator.clipboard.writeText', () => {
  assert.match(baseLayout, /navigator\.clipboard\.writeText/,
    'expected navigator.clipboard.writeText call in BaseLayout script');
});

test('BaseLayout: code-copy script reads document.documentElement.lang', () => {
  assert.match(baseLayout, /document\.documentElement\.lang/,
    'expected bilingual lang lookup in BaseLayout script');
});

test('BaseLayout: code-copy script guards re-runs via data-copy-ready', () => {
  assert.match(baseLayout, /data-copy-ready|dataset\.copyReady/,
    'expected idempotency guard via data-copy-ready');
});

test('guide.css: code-copy CSS rules are present', () => {
  for (const sel of ['.pre-wrap', '.copy-btn', '.copy-btn:hover', '.copy-btn.copied', '.lang-badge']) {
    assert.ok(guideCss.includes(sel), `guide.css is missing selector ${sel}`);
  }
});

test('guide.css: prefers-reduced-motion override is present', () => {
  assert.match(guideCss, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*\.copy-btn[\s\S]*transition:\s*none/,
    'expected prefers-reduced-motion override disabling .copy-btn transition');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:
```bash
npm test -- --test-name-pattern 'code-copy|prefers-reduced'
```

Expected: 6 failing assertions — none of the hooks exist yet.

- [ ] **Step 3: Commit the failing test**

```bash
git add scripts/__tests__/copy-button.smoke.test.mjs
git commit -m "test: smoke test for code-block copy button (#35)"
```

---

### Task 2: Add the copy-button CSS to `guide.css`

**Files:**
- Modify: `src/styles/guide.css` (append after the existing `pre.attack { … }` rule near line 439)

- [ ] **Step 1: Append the new section**

Open `src/styles/guide.css`. Locate the line:

```css
pre.attack { border-left-color: #bf616a; margin: 18px -20px; }
```

Insert this block immediately after it (above the `.code-tabs` block at line 440):

```css

/* ============ CODE BLOCK COPY ============ */
.pre-wrap { position: relative; }
.copy-btn {
  position: absolute; top: 8px; right: 8px;
  width: 32px; height: 32px;
  background: var(--paper);
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: border-color 0.15s, background 0.15s;
}
.copy-btn:hover { border-color: rgba(0,0,0,0.5); background: var(--paper-2); }
.copy-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.copy-btn svg { width: 16px; height: 16px; stroke: var(--muted); fill: none;
                stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.copy-btn .icon-check { display: none; }
.copy-btn.copied { border-color: var(--accent); background: var(--accent-soft); }
.copy-btn.copied .icon-copy { display: none; }
.copy-btn.copied .icon-check { display: block; stroke: var(--accent-ink); }
.copy-btn.error { border-color: #bf616a; }
.lang-badge {
  position: absolute; top: 8px; left: 8px;
  font-family: 'JetBrains Mono', monospace; font-size: 9px;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--code-comment);
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .copy-btn { transition: none; }
}
```

- [ ] **Step 2: Run the CSS-related smoke tests**

Run:
```bash
npm test -- --test-name-pattern 'guide.css'
```

Expected: both `guide.css: code-copy CSS rules are present` and `guide.css: prefers-reduced-motion override is present` PASS. (BaseLayout assertions still fail; that's fine — Task 3.)

- [ ] **Step 3: Commit**

```bash
git add src/styles/guide.css
git commit -m "css: copy-button + language-badge styles for pre.standalone (#35)"
```

---

### Task 3: Add the inline copy-button script to `BaseLayout.astro`

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (insert before `</body>` at line 51)

The script is intentionally written as a single self-invoking arrow function. It bails out fast on pages with no `pre.standalone`. Selectors, attribute names, and class names must match Task 2 exactly.

- [ ] **Step 1: Insert the script**

Open `src/layouts/BaseLayout.astro`. Find the closing `</body>` (line 51). Insert this block immediately before it (on its own lines, between `</main>` … `<SiteFooter …/>` … and `</body>`, i.e., directly above `</body>`):

```astro
  <script is:inline>
    (() => {
      const LABELS = {
        en: { copy: 'Copy code to clipboard', copied: 'Copied', short: 'Copy' },
        'zh-Hans': { copy: '复制代码到剪贴板', copied: '已复制', short: '复制' },
      };
      const lang = LABELS[document.documentElement.lang] ? document.documentElement.lang : 'en';
      const L = LABELS[lang];

      const ICON_COPY = '<svg class="icon-copy" viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="4" width="12" height="14" rx="2" ry="2"/><path d="M4 8h2v12h10v2H4z"/></svg>';
      const ICON_CHECK = '<svg class="icon-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4 4 10-10"/></svg>';

      function enhance(pre) {
        if (pre.dataset.copyReady === '1') return;
        pre.dataset.copyReady = '1';

        const wrap = document.createElement('div');
        wrap.className = 'pre-wrap';
        pre.parentNode.insertBefore(wrap, pre);

        const langValue = pre.getAttribute('data-lang');
        if (langValue) {
          const badge = document.createElement('span');
          badge.className = 'lang-badge';
          badge.setAttribute('aria-hidden', 'true');
          badge.setAttribute('data-pagefind-ignore', '');
          badge.textContent = langValue;
          wrap.appendChild(badge);
        }

        wrap.appendChild(pre);

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'copy-btn';
        btn.setAttribute('aria-label', L.copy);
        btn.setAttribute('title', L.short);
        btn.setAttribute('data-pagefind-ignore', '');
        btn.innerHTML = ICON_COPY + ICON_CHECK;
        wrap.appendChild(btn);

        let resetTimer = null;
        btn.addEventListener('click', () => {
          const text = pre.textContent || '';
          const reset = () => {
            btn.classList.remove('copied', 'error');
            btn.setAttribute('aria-label', L.copy);
            btn.setAttribute('title', L.short);
          };
          if (resetTimer) { clearTimeout(resetTimer); resetTimer = null; }
          const ok = () => {
            btn.classList.remove('error');
            btn.classList.add('copied');
            btn.setAttribute('aria-label', L.copied);
            btn.setAttribute('title', L.copied);
            resetTimer = setTimeout(reset, 1500);
          };
          const fail = (err) => {
            btn.classList.remove('copied');
            btn.classList.add('error');
            console.warn('[copy] clipboard write failed', err);
            resetTimer = setTimeout(reset, 1500);
          };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(ok, fail);
          } else {
            fail(new Error('clipboard API unavailable'));
          }
        });
      }

      function run() {
        document.querySelectorAll('pre.standalone').forEach(enhance);
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run, { once: true });
      } else {
        run();
      }
    })();
  </script>
```

- [ ] **Step 2: Run the full smoke test**

Run:
```bash
npm test -- --test-name-pattern 'code-copy|prefers-reduced|guide.css'
```

Expected: all 6 smoke assertions PASS.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: inline copy-button enhancer for pre.standalone (#35)"
```

---

### Task 4: Add the changelog entry

**Files:**
- Create: `src/content/changelog/entries/2026-05-20-code-copy-button.ts`

`CLAUDE.md` requires a bilingual changelog entry in the same PR. The filename date must equal the entry's `date` field (the `changelog.test.mjs` test enforces this). If the merge slips past 2026-05-20, rename the file AND update the `date` field together.

- [ ] **Step 1: Create the entry**

```ts
// src/content/changelog/entries/2026-05-20-code-copy-button.ts
import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-20',
  title: L(
    'Copy buttons on every code block',
    '每个代码块新增「复制」按钮',
  ),
  items: [
    L(
      'Every standalone code block now has a clipboard copy button with bilingual aria-label.',
      '所有独立代码块现在都带有剪贴板复制按钮，aria-label 双语支持。',
    ),
    L(
      'Authors can opt into a top-left language badge by adding data-lang="python" (or similar) to the <pre> tag.',
      '作者可通过在 <pre> 标签上添加 data-lang="python"（或类似值）启用左上角语言徽章。',
    ),
    L(
      'Respects prefers-reduced-motion; copy/badge are excluded from search.',
      '尊重 prefers-reduced-motion 设置；复制按钮与徽章已排除于搜索索引之外。',
    ),
  ],
};
export default entry;
```

- [ ] **Step 2: Run the changelog test**

Run:
```bash
npm test -- --test-name-pattern 'changelog'
```

Expected: PASS — bilingual shape OK, filename date matches `date` field.

- [ ] **Step 3: Commit**

```bash
git add src/content/changelog/entries/2026-05-20-code-copy-button.ts
git commit -m "changelog: code-block copy button (#35)"
```

---

### Task 5: Run all verification gates

**Files:** none (gate run only).

Per `CLAUDE.md`, all three gates must pass before merge.

- [ ] **Step 1: Build**

Run:
```bash
npm run build
```

Expected: build completes; `dist/` is generated; no new warnings versus a baseline run on `origin/main`. Specifically, the build must not report `is:inline` script syntax errors.

- [ ] **Step 2: Verify bilingual completeness**

Run:
```bash
npm run verify
```

Expected: PASS — no orphans, no missing translations. (This change should not affect the manifests; the verifier should be a no-op.)

- [ ] **Step 3: Run all unit tests**

Run:
```bash
npm test
```

Expected: every test passes — extraction tests, manifest tests, changelog test, i18n test, and the new `copy-button.smoke.test.mjs`.

- [ ] **Step 4: If anything fails, fix the root cause and re-run from Step 1**

Do not skip or weaken any test to make the gates pass.

---

### Task 6: Manual UI verification

**Files:** none (visual check).

Smoke tests cover regression, not behavior. Manually verify behavior before opening the PR.

- [ ] **Step 1: Start the dev server**

Run:
```bash
npm run dev
```

Open the URL printed by Astro (typically `http://localhost:4321/`).

- [ ] **Step 2: Verify desktop, English**

Navigate to `/field-guide/s4` (page has many `pre.standalone` blocks).

Confirm:
- Each `<pre>` has a small clipboard button in the top-right corner.
- Hovering the button changes border / background slightly.
- Clicking copies the snippet; the button flips to a checkmark and the `title` flips to `Copied` for ~1.5 s, then reverts.
- Paste the clipboard into a scratch buffer and diff against the rendered code — must be byte-identical.
- No language badge appears (since no `<pre>` here has `data-lang`).

- [ ] **Step 3: Verify desktop, Chinese**

Navigate to `/zh/field-guide/s4`.

Confirm:
- The button is present in the same position.
- `document.documentElement.lang === 'zh-Hans'`.
- The button's `aria-label` reads `复制代码到剪贴板`; `title` reads `复制`.
- After click, `aria-label` reads `已复制`, then reverts.

- [ ] **Step 4: Verify the language badge**

Temporarily edit one entry, e.g.:
```bash
# Pick any standalone block in src/content/field-guide/en/s4.html and prepend data-lang
# Example: change `<pre class="standalone"><span class="c-cm"># Dockerfile</span>`
#       to `<pre class="standalone" data-lang="dockerfile"><span class="c-cm"># Dockerfile</span>`
```

Reload the page. Confirm a small uppercase `DOCKERFILE` badge appears in the top-left of that block. **Revert the edit before committing** — content changes are not part of this PR.

- [ ] **Step 5: Verify mobile width**

In DevTools, set viewport to 375 × 667 (iPhone SE). Reload `/field-guide/s4`.

Confirm:
- The copy button stays anchored to the top-right of the `<pre>` and is fully tappable (≥32 px).
- The `<pre>` still scrolls horizontally as before; nothing overlaps the scroll.

- [ ] **Step 6: Verify Pagefind hygiene**

Run:
```bash
npm run build:search
npm run preview
```

Open the preview URL, open the search modal, search for `Copy`, `Copied`, `复制`, `已复制`.

Expected: none of those terms returns a hit caused by the injected affordances. (Real prose containing those words is fine; the test is that the BUTTONS themselves are not indexed. `data-pagefind-ignore` should handle this.)

- [ ] **Step 7: Stop the dev server**

If any step fails, fix in the source, re-run `npm test` and the relevant manual step.

---

### Task 7: Open the PR

**Files:** none.

- [ ] **Step 1: Push the branch**

```bash
git push -u origin issue-35-code-copy-button
```

- [ ] **Step 2: Open the PR**

```bash
gh pr create --title "Code-block copy button + language badge (#35)" --body "$(cat <<'EOF'
## Summary
- Adds an inline `<script is:inline>` in `BaseLayout.astro` that wraps every `pre.standalone` with a clipboard copy button (bilingual aria-label) and, when the author opts in via `data-lang`, a top-left language badge.
- New CSS rules in `src/styles/guide.css` (`.pre-wrap`, `.copy-btn`, `.lang-badge`, plus a `prefers-reduced-motion` override).
- No content fragment changes — the feature lights up across all 692 existing standalone blocks on next deploy.

Closes #35.

## Test plan
- [ ] `npm run build` — no new warnings
- [ ] `npm run verify` — bilingual completeness
- [ ] `npm test` — extraction + smoke tests
- [ ] Manual: desktop EN, desktop ZH, mobile 375 px, language badge with a throwaway `data-lang` edit (reverted), Pagefind search for "Copy"/"复制" returns no false hits

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 3: Confirm CI passes on the PR**

Wait for GitHub checks. If anything fails, fix root cause, push, re-verify. Do not merge with red checks.

- [ ] **Step 4: Before merging, verify the changelog date**

If the merge day will not be 2026-05-20:
- Rename `src/content/changelog/entries/2026-05-20-code-copy-button.ts` to `<new-date>-code-copy-button.ts`.
- Update the `date:` field inside the file to match.
- Re-run `npm test` to confirm `changelog.test.mjs` still passes.
- Commit + push the rename.

After merge: remove the worktree and branch per `CLAUDE.md` workflow.
