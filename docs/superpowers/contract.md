# Content-Agent Contract (C1–C8) — Concepts & Deep-Dives

Date: 2026-05-18
Phase: 1 (Scaffold A1) → binding for Phase 2 (Content C1–C8) and Phase 3 (Integrate I1)
Branch / worktree: `feat/wiki-content-enrichment` @ `.worktrees/wiki-enrichment`

This is the authoritative, unambiguous spec for what each content agent
delivers. The scaffold is built and the build is green with EMPTY manifests.
Content agents add ONLY their own HTML fragment pairs. Integration (I1)
registers them in the manifests in Phase 3.

---

## 1. What each content agent owns

| Agent | Section | URL base | Topic |
|---|---|---|---|
| C1 | Concepts | `/concepts` | AI Foundations 101 |
| C2 | Concepts | `/concepts` | Agentic AI Explained |
| C3 | Concepts | `/concepts` | Core Building Blocks |
| C4 | Concepts | `/concepts` | The AI Model & Tooling Ecosystem |
| C5 | Deep-Dives | `/deep-dives` | Agent Architectures & Design Patterns |
| C6 | Deep-Dives | `/deep-dives` | Agent Protocols & Interop |
| C7 | Deep-Dives | `/deep-dives` | Memory & Context Engineering |
| C8 | Deep-Dives | `/deep-dives` | Safety, Alignment & Agentic Security |

Each agent MAY produce one or more entries for its topic. Each entry = one
bilingual fragment pair (see §2).

## 2. File convention (EXACT — do not deviate)

For a **Concepts** entry with slug `<slug>`:

```
src/content/concepts/en/<slug>.html      ← English body fragment
src/content/concepts/zh/<slug>.html      ← Chinese body fragment
```

For a **Deep-Dives** entry with slug `<slug>`:

```
src/content/deep-dives/en/<slug>.html
src/content/deep-dives/zh/<slug>.html
```

Rules:

1. **Slugs are lowercase-kebab-case**: `[a-z0-9-]+`, e.g.
   `what-is-an-llm`, `the-agent-loop`, `prompt-injection`. No spaces,
   no uppercase, no underscores.
2. The basename in `en/` and `zh/` MUST be **identical**. Every entry MUST
   have BOTH files. A missing-locale file is tolerated by the build (it
   falls back to the other locale) but is a contract violation — ship both.
3. Files are **raw HTML body fragments**: NO `<!DOCTYPE>`, NO `<html>`,
   `<head>`, `<body>`, NO frontmatter, NO `<script>`/`<style>`. Just the
   content markup that goes inside `<article set:html>` (exactly like the
   Field Guide's `src/content/field-guide/en/f1.html`).
4. The HTML carries **no titles/labels for navigation** — the page title,
   summary, and group label live in the manifest entry (§4), not the HTML.
   You MAY (and should) open the body with a heading for on-page reading.
5. Each body should be substantive (the verify gate uses a ≥200-byte floor
   for field-guide; aim well above that — real encyclopedia/essay content).
6. `code` blocks: if you provide a code block, keep the EN and ZH versions
   **byte-identical** (only prose differs between locales). Phase-3/4 checks
   may enforce this the way field-guide does.

## 3. HTML structure & CSS classes (reuse the Field Guide vocabulary)

Styling is global CSS in `src/styles/guide.css` + `src/styles/site.css`.
The fragment is injected into `<article set:html>` inside the same
`.chapter-shell` / `.chapter-main` shell the Field Guide chapters use, so
reuse these REAL classes (verified to exist in `guide.css`):

**Top-level structure** — wrap the body in a `<section class="phase">`:

```html
<section class="phase">
  <div class="phase-num">01</div>
  <div class="week">Concepts · AI Foundations</div>
  <h2>What is a large language model?</h2>
  <p class="goal">One-paragraph framing of what this entry teaches.</p>

  <div class="step">
    <div class="step-num">STEP 1</div>
    <h3>Section heading</h3>
    <h4>Sub-heading</h4>
    <p>Body text. Inline code uses <code class="inline">like_this</code>.</p>
    <ul><li>Bulleted point (auto-prefixed with → arrow)</li></ul>
  </div>
</section>
```

**Available class vocabulary (all defined in `guide.css`):**

- Layout: `.phase`, `.phase-num`, `.week`, `.goal`, `.step`, `.step-num`
- Headings/body: `<h2>` `<h3>` `<h4>` `<p>` `<ul><li>` `<strong>` render
  styled within `.phase` / `.step`.
- Code blocks: `<pre class="standalone">` (default), `<pre class="trace standalone">`
  (output/trace, accent border), `<pre class="shell standalone">` (shell,
  green border), `<pre class="attack standalone">` (red border).
- Syntax spans inside `<pre>`: `.c-kw` (keyword), `.c-st` (string),
  `.c-cm` (comment, italic), `.c-fn` (function), `.c-out` (stdout/green),
  `.c-err` (error/red), `.c-atk` (attack/orange). Hand-span syntax exactly
  like the Field Guide fragments — there is no auto-highlighter.
- Inline code: `<code class="inline">…</code>`.
- Callouts: `<div class="callout">…</div>` (label "NOTE"), plus modifiers
  `callout warn` ("TRAP"), `callout tip` ("TIP"), `callout danger`
  ("DANGER"). Put text in `<p>` inside the callout.
- Optional API tabs (only if you genuinely show two SDKs): `.code-tabs` +
  `.code-tab[data-api="…"]` followed by `.code-content[data-api="…"]`
  blocks; the `switchTab` handler is already injected by the layout.

Do NOT invent new class names or inline `<style>`. If you need a visual
treatment, use one of the above. Match the tone/density of `f1.html`.

## 4. Manifest entry template (paste into your handoff summary)

You do NOT edit any manifest. Instead, for EVERY entry you create, include
this exact, ready-to-paste object in your agent handoff summary so Phase 3
(I1) can drop it into `src/content/<section>/manifest.ts`'s `entries` array:

```ts
{
  page: '<slug>',                       // = the .html basename
  slug: '<slug>',                       // = public URL segment (same value)
  title:   L('English Title', '中文标题'),
  summary: L('One-line English summary.', '一句话中文摘要。'),
  group:   L('English Group', '中文分组'),   // OPTIONAL — omit the line if ungrouped
}
```

- `L` is exported from each section's `manifest.ts` as `L(en, zh)`.
- `group` is optional; entries with the same `group[locale]` are bucketed
  together on the index, in manifest order. Suggested groups:
  - Concepts: `L('Foundations','基础')`, `L('Agentic AI','智能体 AI')`,
    `L('Building Blocks','核心构件')`, `L('Ecosystem','生态')`.
  - Deep-Dives: `L('Architectures','架构')`, `L('Protocols','协议')`,
    `L('Memory','记忆')`, `L('Safety','安全')`.
  Coordinate exact group strings with I1; consistency across agents matters.
- State the desired ORDER of your entries explicitly in your summary
  (manifest order = display order, and prev/next order).

## 5. Hard prohibitions (conflict-avoidance contract)

Content agents (C1–C8) MUST NOT touch any of these — they are sequential
Phase-1/Phase-3 shared files and editing them causes merge conflicts:

- `src/content/concepts/manifest.ts`, `src/content/deep-dives/manifest.ts`
- Any file under `src/pages/**` (routes, incl. `/zh` mirrors)
- Any file under `src/layouts/**` or `src/components/**`
- `src/i18n/ui.ts`, `src/i18n/index.ts`
- `src/content/config.ts`, `astro.config.mjs`, `package.json`
- The Field Guide content (`src/content/field-guide/**`)
- Another content agent's fragment files

You write ONLY: `src/content/<your-section>/{en,zh}/<your-slug>.html`
(plus your GitHub research sub-Issue). Do not delete the `.gitkeep` files.

## 6. How to self-check before handoff

The routes only render entries registered in the manifest (Phase 3), so you
cannot see your page live yet. Verify instead:

1. Both `en/<slug>.html` and `zh/<slug>.html` exist, same basename.
2. Each is a bare HTML fragment (no doctype/html/head/body/frontmatter).
3. It only uses classes listed in §3.
4. `npm run build` still completes (your files don't break the glob).
5. Your handoff summary contains the §4 manifest object(s) + intended order.

I1 will register entries, run `npm run build && npm run verify && npm test`,
screenshot, and fix any integration issues.

---

## Appendix: scaffold surface (already built by A1 — reference only)

- Manifests (empty `entries`, helpers `entryBySlug`, `groupedEntries`,
  exported `ENTRIES`, `L`): `src/content/{concepts,deep-dives}/manifest.ts`
- Index views: `src/components/pages/{ConceptsView,DeepDivesView}.astro`
  → shared `src/components/pages/SectionIndexView.astro`
- Detail layouts: `src/layouts/{ConceptLayout,DeepDiveLayout}.astro`
  → shared `src/layouts/SectionEntryLayout.astro` + `src/components/SectionSidebar.astro`
- Routes: `src/pages/{concepts,deep-dives}/{index,[slug]}.astro` and
  `src/pages/zh/{concepts,deep-dives}/{index,[slug]}.astro`
- Nav + i18n: `src/components/SiteHeader.astro`, `src/i18n/ui.ts`
  (`nav.concepts`, `nav.deepDives`, `concepts.*`, `deepDives.*`)
