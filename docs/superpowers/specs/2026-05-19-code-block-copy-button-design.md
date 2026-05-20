# Code-block copy button with language badge — design

> Issue: [#35](https://github.com/EvanCarson/Agentic-AI-Wiki/issues/35) ·
> Tier P0 · Lenses: `lens/competitor`, `lens/engagement` · Impact H / Effort S / Risk L

## Problem

Hundreds of `<pre class="standalone">` code blocks across the Field Guide,
Concepts, and Deep-Dive content have no copy-to-clipboard affordance and no
visible language label. Readers wanting to run or adapt a snippet must
hand-select the text, which is error-prone on mobile. Every peer technical
documentation site (MDN, GitHub, Astro docs, Prompting Guide, Hugging Face)
ships this — it's a baseline reader expectation.

## Goals

- Add a copy-to-clipboard button to every `<pre class="standalone">` block.
- Add an opt-in language badge (top-left) when the author marks the block with
  `data-lang="…"`.
- Stay pure-static: vanilla JS injected once via `is:inline`, no framework
  dependency, no build-time HTML rewriting.
- No changes to the 692 existing fragments; the feature lights up automatically
  on the next deploy.
- Bilingual `aria-label` / `title` for the button, matching the en / zh
  bilingualism the rest of the site already maintains.

## Non-goals

- No automatic language detection. Badge is purely opt-in via `data-lang`.
- No syntax highlighting changes — colorization stays in the existing
  `<span class="c-*">` markup.
- No bulk content migration to add `data-lang` to all 692 blocks; authors can
  annotate gradually in follow-up PRs.
- No copy button on `<pre>` blocks inside `.code-tabs` (those are not
  `.standalone`, so excluded automatically).

## Architecture

A single inline `<script is:inline>` near the bottom of
`src/layouts/BaseLayout.astro` runs once per page on `DOMContentLoaded`. The
script:

1. Queries `document.querySelectorAll('pre.standalone')`.
2. For each match (guarded by `pre.dataset.copyReady` so re-runs are no-ops):
   - Wraps the `<pre>` in a `<div class="pre-wrap">`.
   - Inserts a `<button class="copy-btn" data-pagefind-ignore>` with two
     stacked SVGs (clipboard, checkmark) — the active one is chosen by a
     `.copied` class on the button.
   - If the `<pre>` has a `data-lang` attribute, inserts a
     `<span class="lang-badge" data-pagefind-ignore>{value}</span>`.
3. On button click: copies `pre.textContent` via
   `navigator.clipboard.writeText`, toggles `.copied` for 1500 ms, then
   reverts. On rejection, toggles `.error` for the same window and emits a
   single `console.warn`.

Style rules live alongside the existing `pre` block in
`src/styles/guide.css` (the same stylesheet that defines the dark code-block
look), so the visual is colocated with what it modifies.

## Components touched

- **`src/layouts/BaseLayout.astro`** — append one `<script is:inline>` block
  just before `</body>`. ~40 lines including the two SVG paths and the
  bilingual label dict.
- **`src/styles/guide.css`** — add a `/* ============ CODE BLOCK COPY ============ */`
  section immediately after the existing `pre.attack` rule (≈line 440)
  containing `.pre-wrap`, `.copy-btn`, `.copy-btn:hover`, `.copy-btn.copied`,
  `.copy-btn.error`, `.lang-badge`.
- **`src/content/changelog/entries/2026-05-19-code-copy-button.ts`** —
  required by `CLAUDE.md`: bilingual `ChangelogEntry`. Date is the merge
  day; verify before merge and rename the file + bump `date` if it slips.
- **No content fragment changes.**

## Behavior contract

| Aspect | Behavior |
|---|---|
| Target selector | `pre.standalone` (covers `.attack.standalone`, `.shell.standalone`, `.trace.standalone` — anything with `.standalone`) |
| Trigger | `DOMContentLoaded`, single pass |
| Idempotent | `pre.dataset.copyReady === '1'` short-circuits a second invocation |
| Copy source | `pre.textContent` (excludes the button + badge by construction — they are siblings inside `.pre-wrap`, not children of `<pre>`) |
| Bilingual labels | Read `document.documentElement.lang` once; map `'en' → ['Copy','Copied']`, `'zh-Hans' → ['复制','已复制']`; default to en for any other value |
| Aria | Button has `type="button"`, `aria-label`, and `title` (both bilingual). Badge has `aria-hidden="true"` (decorative). |
| Success | `.copied` class for 1500 ms; checkmark SVG visible, clipboard SVG hidden |
| Failure | `.error` class for 1500 ms; single `console.warn('[copy] clipboard write failed', err)` |
| Reduced motion | The only motion is a 150 ms color/background transition; a `@media (prefers-reduced-motion: reduce) { .copy-btn { transition: none; } }` rule disables it for users who opt out |
| Pagefind | Button + badge carry `data-pagefind-ignore` so "python", "Copy", etc. don't pollute search |

## DOM shape after enhancement

Before:

```html
<pre class="standalone" data-lang="python">def call_agent(...): ...</pre>
```

After (post-DOMContentLoaded):

```html
<div class="pre-wrap">
  <span class="lang-badge" aria-hidden="true" data-pagefind-ignore>python</span>
  <pre class="standalone" data-lang="python" data-copy-ready="1">def call_agent(...): ...</pre>
  <button class="copy-btn" type="button" data-pagefind-ignore
          aria-label="Copy code to clipboard" title="Copy">
    <svg class="icon-copy" aria-hidden="true" …>…</svg>
    <svg class="icon-check" aria-hidden="true" …>…</svg>
  </button>
</div>
```

Without `data-lang`, the `<span class="lang-badge">` is omitted entirely.

## CSS sketch

The mockup lives on the `research/site-enhancements-2026-05-19` branch at
`docs/research/mockups/02-code-block-copy-button.html` (also linked from
issue #35) and is the authoritative visual reference. Lifted with two
adjustments:

- The button background uses `var(--paper)` and border `rgba(0,0,0,0.2)`,
  which stays legible on the dark `--code-bg: #1a1a1a` pre.
- The badge color uses `var(--code-comment)` (already defined,
  `#8a8270`) so it reads as muted commentary against the dark code.

```css
.pre-wrap { position: relative; }
.copy-btn {
  position: absolute; top: 8px; right: 8px;
  width: 32px; height: 32px;
  background: var(--paper);
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.copy-btn:hover { border-color: rgba(0,0,0,0.5); background: var(--paper-2); }
.copy-btn svg { width: 16px; height: 16px; stroke: var(--muted); fill: none;
                stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.copy-btn .icon-check { display: none; }
.copy-btn.copied { border-color: var(--accent); background: var(--accent-soft); }
.copy-btn.copied .icon-copy { display: none; }
.copy-btn.copied .icon-check { display: block; stroke: var(--accent-ink); }
.copy-btn.error { border-color: #bf616a; }
@media (prefers-reduced-motion: reduce) {
  .copy-btn { transition: none; }
}
.lang-badge {
  position: absolute; top: 8px; left: 8px;
  font-family: 'JetBrains Mono', monospace; font-size: 9px;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--code-comment);
  pointer-events: none;
}
```

## Edge cases

- **`pre` inside `.code-tabs`** — not `.standalone`; excluded automatically.
- **Multiple `pre.standalone` in a tight column on mobile (≤375 px)** — each
  `pre` already scrolls horizontally; the overlay buttons stay pinned to the
  visible edge of the code block. Matches the mockup mobile screenshot.
- **`navigator.clipboard` unsupported** — `astro dev` on plain `http://`
  localhost can fail. Production is HTTPS-only, so accepted.
- **`pre` with empty textContent** — `writeText('')` succeeds silently; no
  special case.
- **RTL** — site is `lang="en"` / `lang="zh-Hans"` (LTR); no RTL handling
  needed.
- **Repeat invocation / HMR** — `data-copy-ready="1"` guard.

## Verification

Mandatory per `CLAUDE.md`:

```
npm run build    # static build to dist/ — no new warnings
npm run verify   # bilingual completeness
npm test         # extraction unit tests
```

Manual checks before opening PR:

- Load `/field-guide/s4` and `/zh/field-guide/s4` locally (`npm run dev`),
  click copy on three different `<pre>` blocks, paste into a scratch file,
  diff against the rendered code — must be byte-identical.
- Inspect `document.documentElement.lang` on `/zh/...`; confirm button
  `aria-label` reads `复制 …` and the post-click label flips to `已复制`.
- Resize to 375 px mobile width; confirm button + badge don't overflow.
- Add `data-lang="python"` to one fragment locally and confirm the badge
  renders; revert before commit (no content changes ship with this PR).
- Confirm Pagefind search for "Copy", "Copied", "复制", "python" does not
  return false hits from the injected affordances. (`npm run build:search`
  then load the site preview and try the search modal.)

## Risk & rollback

- Risk **L**: the script is additive and self-contained; the worst plausible
  failure is "button doesn't appear", which leaves the site identical to
  today.
- Rollback: revert the BaseLayout + guide.css diff (one commit).

## Open items for follow-up

- Authors can begin annotating `<pre class="standalone" data-lang="…">` on
  new content, and a future bulk pass can backfill the 692 existing blocks.
  That work is out of scope here.
- A Playwright smoke test asserting the clipboard contents could be added,
  reusing the `scripts/screenshot.mjs` Playwright dependency. Deferred:
  call it out in the implementation plan; only add if it's a few lines.
