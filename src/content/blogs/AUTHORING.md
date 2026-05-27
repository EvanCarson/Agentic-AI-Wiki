# Authoring a blog post

Conventions for writing new posts in the AI Blog section. The first post —
*OpenClaw vs OpenHuman vs Hermes Agent* (2026-05-26) — is the working reference.
Copy its shape and you will inherit the look without re-litigating the design.

## 0. Where things live

| File | Purpose |
|---|---|
| `src/content/blogs/posts/<YYYY-MM-DD>-<slug>.ts` | Post metadata. One file per post. |
| `src/content/blogs/en/<slug>.html` | English body fragment (body-only HTML, no doctype/head). |
| `src/content/blogs/zh/<slug>.html` | Chinese body fragment. Same structural HTML; prose translated faithfully. |
| `public/blogs/<slug>/*.svg` | Diagrams and data-viz charts, co-located with the post. |
| `public/blogs/<slug>/logos/*.svg` | Project / brand logos referenced from the post. |
| `src/content/changelog/entries/<YYYY-MM-DD>-<slug>.ts` | One changelog entry per post (per project rule in `CLAUDE.md`). |

The filename date prefix **must equal** the `date:` field inside the file
(`scripts/__tests__/blogs.test.mjs` enforces this). Both must equal the **day
the PR actually merges to `main`**, not the day you started drafting. Bump
right before push if the calendar moved.

## 1. The metadata file (`posts/<date>-<slug>.ts`)

Copy this template, fill in the strings, leave everything else alone:

```ts
import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: 'YYYY-MM-DD',                          // Must equal filename prefix.
  slug: 'kebab-case-slug',                     // Must equal filename slug.
  title: L(
    'English title — keep it under ~14 words, no clickbait',
    '中文标题——保持简洁，与英文等长',
  ),
  summary: L(
    '1–2 sentences. Used on the index card and as <meta description>. Lead with the stakes; do not throat-clear.',
    '一两句话。用于索引卡片与 <meta description>。开门见山点出风险，不要清嗓。',
  ),
  tags: ['agent-comparison', 'open-source'],   // lowercase kebab-case, non-empty.
};

export default post;
```

**Tag rules** — lowercase, kebab-case (regex `^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$`).
No predefined list; tags grow organically. The `/blogs/tag/<tag>` pages are
generated automatically from the union of all post tags. Reuse existing tags
where they fit (grep `src/content/blogs/posts/*.ts` to see what's in use)
rather than minting a near-duplicate.

**Import path** — `from '../types.ts'` with the `.ts` extension. Node's
`--experimental-strip-types` loader requires the extension; without it the
manifest test fails with `ERR_MODULE_NOT_FOUND`.

## 2. The body fragment skeleton

Both `en/<slug>.html` and `zh/<slug>.html` are body-only HTML (no doctype, no
`<head>`, no `<h1>` — the layout supplies the title). Open with a **hook lede**
(no header label) and follow with as many `<section><h2>` blocks as the post
needs. The first post used these 9 sections; you do not have to copy them
verbatim but if you do, the layout's existing CSS makes them look right with
zero extra work.

```html
<!-- 1. The hook lede. No <h2>, no "TL;DR" label.
        Lead with the stakes; name the takeaway in the first 30 words.
        See CLAUDE.md "Document openers" — banned: TL;DR / Summary /
        Overview / Intro labels, and throat-clearing openers. -->
<p class="lede">One short paragraph. Why a reader who clicks away loses something concrete, plus the takeaway.</p>

<!-- 2. The "at a glance" block — snippet bait. Keep the metadata table
        to ≤4 columns so it fits the article column. Wider comparisons
        belong in the bar chart / feature matrix below it. -->
<section>
  <h2>At a glance</h2>
  <p>One sentence orienting the reader.</p>
  <table>
    <thead>
      <tr><th>Project</th><th>Released</th><th>Primary niche</th><th>Deployment shape</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><img src="/blogs/<slug>/logos/proj-a.svg" width="24" height="24" alt="Project A logo" style="vertical-align:middle;margin-right:8px;" />Project A</td>
        <td>YYYY-MM-DD</td>
        <td>One-line niche.</td>
        <td>How it deploys.</td>
      </tr>
      <!-- … -->
    </tbody>
  </table>

  <!-- Optional: bar chart for one objective numeric axis (e.g. star count). -->
  <figure>
    <img src="/blogs/<slug>/data-stars-comparison.svg" alt="…" width="900" height="400" loading="lazy" />
    <figcaption>One-line interpretation. The figcaption is the ONLY caption — do NOT put descriptive text inside the SVG.</figcaption>
  </figure>

  <!-- Optional: feature matrix for multi-axis comparison (3 levels: weak / medium / strong, color-coded). -->
  <figure>
    <img src="/blogs/<slug>/data-feature-matrix.svg" alt="…" width="900" height="400" loading="lazy" />
    <figcaption>Where each entry leans hardest.</figcaption>
  </figure>
</section>

<!-- 3. Per-subject deep-dive sections. One <section> per major subject.
        Each section may have its own <figure> diagram followed by <h3>
        subsections. The h2+figure combo gets tight (8px) spacing so they
        read as one unit; the figure→prose gap returns to the normal rhythm. -->
<section>
  <h2>Subject A — deep dive</h2>
  <figure>
    <img src="/blogs/<slug>/arch-subject-a.svg" alt="…" width="900" height="500" loading="lazy" />
    <figcaption>One-line caption.</figcaption>
  </figure>
  <h3>First subtopic</h3>
  <p>1–3 short paragraphs.</p>
  <h3>Second subtopic</h3>
  <p>…</p>
</section>

<!-- 4. Cross-cutting comparison: same axes for all subjects, side-by-side. -->
<section>
  <h2>Cross-cutting comparison</h2>
  <h3>Axis 1</h3>
  <figure>
    <img src="/blogs/<slug>/compare-axis-1.svg" alt="…" width="900" height="300" loading="lazy" />
    <figcaption>One-line.</figcaption>
  </figure>
  <p>Comparative prose — describe across all subjects per paragraph, not three sequential descriptions.</p>
</section>

<!-- 5. "When to pick which" — decision matrix table. -->
<section>
  <h2>When to pick which</h2>
  <table>
    <thead>
      <tr><th>Use case</th><th>Pick A if…</th><th>Pick B if…</th><th>Pick C if…</th></tr>
    </thead>
    <tbody>
      <tr><td>Use case 1</td><td>…</td><td>…</td><td>…</td></tr>
    </tbody>
  </table>
</section>

<!-- 6. FAQ. The class="faq" is load-bearing: BlogLayout parses this
        section for <h3> Q + immediately-following <p> A pairs and emits
        JSON-LD FAQPage schema for SEO. Constraints:
        - <h3> MUST be followed by <p> with no other tag between.
        - Do NOT nest <section> inside class="faq" — the parser bails
          at the first </section>. -->
<section class="faq">
  <h2>FAQ</h2>
  <h3>First question?</h3>
  <p>1–3 sentence answer.</p>
  <h3>Second question?</h3>
  <p>Answer.</p>
</section>

<!-- 7. Further reading. -->
<section>
  <h2>Further reading</h2>
  <h3>On this wiki:</h3>
  <ul>
    <li><a href="/concepts/the-agent-loop">The Agent Loop</a> — short description.</li>
  </ul>
  <h3>Project sources:</h3>
  <ul>
    <li><a href="https://github.com/example/proj-a">Project A repo</a></li>
  </ul>
</section>
```

**Internal-link locale rule**: in `zh/<slug>.html`, internal links use the
`/zh/...` prefix (`<a href="/zh/concepts/the-agent-loop">`). The
`check-internal-links.mjs` script validates every link resolves.

**`<pre>` parity** (if you use code blocks): `<pre>` content must be
**byte-identical** between en and zh fragments. Translate prose only;
never translate code, comments, or identifiers.

## 3. Diagrams (SVG conventions)

Every SVG goes under `public/blogs/<slug>/` (logos under `logos/`). You
reference them from the fragment with a normal `<img src="/blogs/<slug>/foo.svg" ... />`
— `BlogLayout` then **inlines them at build time** before `set:html`, so
the rendered HTML contains the SVG markup directly inside the article.
The inlining means each SVG inherits the page's CSS custom properties
(`--ink`, `--paper-2`, `--accent`, etc.) and the document's color
cascade for `currentColor`. That's why these SVGs can theme-adapt in
dark mode without any per-file `@media` rules.

Mechanics: `inlineSvgs()` in `BlogLayout.astro` scans the body string,
finds every `<img src="/blogs/…\.svg" …>` reference, reads the file
from `public/`, strips the XML declaration, and transfers
`width`/`height`/`class`/`style` from the `<img>` onto the `<svg>`
opening tag. Accessibility carries through via the SVG's own
`<title>+<desc>+role="img"` markup. The `<img>` was never displayed.

Authoring rules — all enforced visually and by review, not by tests:

- **viewBox-based, no fixed pixel sizes.** Architecture diagrams use
  `viewBox="0 0 900 500"`; cross-cutting comparisons use
  `viewBox="0 0 900 300"` (three columns at x=160 / x=450 / x=750); logos use
  `viewBox="0 0 32 32"`; data charts use `viewBox="0 0 900 400"`.
- **Themeable colors only.** Every fill, stroke, and text color uses a CSS
  variable: `var(--ink)`, `var(--paper)`, `var(--paper-2)`, `var(--accent, #d4421e)`,
  `var(--accent-soft)`, `var(--muted)`, `var(--border-soft)`. **Never** a bare
  hex literal (except as the fallback inside the `var(...)` call). Because
  SVGs are inlined into the page, these vars resolve to the active theme's
  values — no per-SVG `@media` block is needed.
- **Color hierarchy.** Solid `var(--accent)` for the hero / main box;
  `var(--accent-soft)` for accent-adjacent secondary boxes; `var(--paper-2)`
  for neutral / muted boxes; `currentColor` for arrows and strokes.
- **Accessibility.** Every SVG: `role="img"` + a `<title>` child + a `<desc>`
  child + `aria-labelledby="t d"` (or matching IDs) so screen readers get a
  description. Logos can skip `<title>`/`<desc>` and use `aria-label` instead.
- **No scripts, no on-handlers.** SVGs are inline content — `<script>` and
  `on*=` are banned per the `CLAUDE.md` security trade-off.
- **No caption text inside the SVG.** Use the surrounding HTML `<figcaption>`
  for the caption. The chart title (e.g. *"GitHub stars (thousands)"*) IS
  appropriate inside the SVG; the long descriptive caption is not.

Skeleton you can paste and customize:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" role="img" aria-labelledby="t d">
  <title id="t">[Subject] architecture</title>
  <desc id="d">[1–2 sentence description of what the diagram shows.]</desc>
  <style>
    .box    { fill: var(--paper-2); stroke: var(--ink); stroke-width: 1.25; rx: 8; ry: 8; }
    .hero   { fill: var(--accent, #d4421e); }
    .adj    { fill: var(--accent-soft); stroke: var(--ink); stroke-width: 1.25; rx: 8; ry: 8; }
    .label  { font-family: 'Inter', system-ui, sans-serif; font-size: 14px; fill: var(--ink); }
    .label-inv { font-family: 'Inter', system-ui, sans-serif; font-size: 14px; fill: var(--paper); }
    .sub    { font-family: 'Inter', system-ui, sans-serif; font-size: 12px; fill: var(--ink); opacity: .65; }
    .arrow  { fill: none; stroke: currentColor; stroke-width: 1.25; marker-end: url(#arr); }
  </style>
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
    </marker>
  </defs>
  <!-- boxes, arrows, labels — see public/blogs/openclaw-vs-openhuman-vs-hermes-agent/arch-*.svg for worked examples. -->
</svg>
```

## 4. Data visualizations

Two patterns proven in the first post:

- **Horizontal bar chart** for a single objective numeric axis (e.g. star
  counts). Use accent fill for the leader; `var(--accent-soft)` for the
  middle; `var(--paper-2)` for the trailing entry. Light dotted gridlines
  every quartile. Numeric labels at the right edge of each bar in the same
  fill as the bar (accent / accent-ink for visibility). Filename pattern:
  `data-<dimension>.svg`. See `data-stars-comparison.svg`.
- **Feature heatmap matrix** for multi-axis qualitative comparison. Rows =
  projects, columns = axes. 3 levels: weak (`var(--paper-2)`), medium
  (`var(--accent-soft)`), strong (`var(--accent)`). Cells contain a short
  label inside (`Strong (eBPF)`, `Medium`, `Weak`). Legend at the bottom.
  See `data-feature-matrix.svg`.

Both patterns are SVGs under `public/blogs/<slug>/` referenced from `<figure>`
just like architecture diagrams.

## 5. Typography decisions baked into the layout

Do not fight these — they are the design system. If you want to override one
you are probably doing it wrong; ask for a design conversation instead.

| Element | Style | Set in |
|---|---|---|
| Body paragraphs | Inter sans 17px line-height 1.65 | inherited from `body` in `guide.css` |
| Hook lede (`<p class="lede">` in body) | Fraunces italic 19px, 3px accent left border, 8/28px margins | `BlogLayout.astro` |
| Section h2 (`<section><h2>`) | Fraunces 28px weight 400, margin 0/24px, **counter-numbered prefix** (`01`, `02`, …) in italic Fraunces accent at 30px on the left | `BlogLayout.astro` |
| Subsection h3 | Fraunces 22px weight 600, margin 36/14px, **32×2px accent underline tab** anchored to the heading's bottom-left | `BlogLayout.astro` |
| FAQ h3 (`<section class="faq"><h3>`) | Same as subsection h3 but **underline tab suppressed** so the Q→A rhythm stays dense | `BlogLayout.astro` |
| Inline `<code>` | JetBrains Mono 0.9em, paper-2 background | `BlogLayout.astro` |
| Body link `<a>` | accent-ink, underlined | `BlogLayout.astro` |
| Block `<blockquote>` | Fraunces italic 19px, 3px accent left border | `BlogLayout.astro` |
| Bullet `<ul>` / `<ol>` | 20px bottom, 8px between items | `BlogLayout.astro` |
| `<figure>` | 32px above/below; 8px after a direct heading | `BlogLayout.astro` |
| `<figcaption>` | Inter 13px italic muted | `BlogLayout.astro` |
| Tables | paper-2 header bg, uppercase JetBrains Mono `<th>`, 10/12px cell padding, hover row | `BlogLayout.astro` |

**Heading hierarchy at a glance:**

```
h1            Fraunces 34px       (post title)
.lede         Fraunces italic 19  (hook lede with 3px accent LEFT border)
h2            Fraunces 28px       (with "01" / "02" / … italic accent COUNTER prefix)
h3            Fraunces 22px w600  (with 32×2px accent UNDERLINE tab below)
FAQ h3        Fraunces 22px w600  (no underline — keeps Q→A dense)
body          Inter 17px          (inherited)
```

The accent palette (lede border / h2 counter / h3 underline) gives the
three heading levels related-but-distinct visual anchors — left bar
for the lede, prefix number for h2, bottom tab for h3. Same vocabulary,
different roles.

## 6. The `is:global` gotcha (do not remove)

The `<style>` block in `BlogLayout.astro` is `is:global`. **Keep it that way.**

Why: the article body is rendered via `<article set:html={body}>`. Astro
scoped styles work by injecting a `data-astro-cid-*` attribute on
template-rendered elements; elements injected through `set:html` do not get
the attribute. With default scoping, every `.blog-article ...` selector
becomes dead CSS (silently — the build does not warn). The whole body
typography quietly stops applying.

If you add a NEW `<style>` block in BlogLayout that targets `.blog-article`
descendants, mark it `is:global` too. If you only target template elements
(`.blog-header`, `.blog-footer`, `.blog-card`), default scoping is fine.

## 7. JSON-LD (SEO schema)

`BlogLayout` emits two JSON-LD blocks automatically — you don't write them
yourself, but you should know what controls them:

- **`BlogPosting`** — always emitted. Pulled from the post metadata:
  `headline` ← `title`, `description` ← `summary`, `datePublished` ← `date`,
  `author` ← `author ?? defaultAuthor`, `image` ← `ogImage ?? section default`,
  `keywords` ← `tags.join(', ')`, `inLanguage` ← locale.
- **`FAQPage`** — emitted only when the body fragment contains
  `<section class="faq">` with at least one `<h3>` + immediately-following
  `<p>` pair. The parser regex is non-greedy and bails at the first
  `</section>`, so **do not nest `<section>` inside `class="faq"`** — any
  pairs after the nested section are silently dropped.

Verify after `npm run build`:

```bash
grep -o '"@type":"BlogPosting"' dist/blogs/<slug>/index.html  # must match
grep -o '"@type":"FAQPage"'     dist/blogs/<slug>/index.html  # matches if FAQ exists
```

## 8. Bilingual checklist

- Both `en/<slug>.html` and `zh/<slug>.html` exist with identical structural HTML.
- zh prose is a faithful translation, not a byte-mirror.
- Identifiers + product names + technical terms stay in English: `OpenClaw`,
  `eBPF`, `Tauri`, `SQLite`, `Markdown`, `LLM`, `JSON-LD`, `RSS`, etc.
- Punctuation: full-width in zh prose (`，` `。` `：` `；` `——` `（）`); ASCII
  inside `<pre>` / `<code>` blocks.
- Captions translated; image `src` paths identical between locales.
- `<pre>` blocks byte-identical between en and zh — the verify gate enforces
  this for chapters; for blogs it's a convention you should follow anyway.
- Internal links in zh use the `/zh/...` prefix.

## 9. Changelog entry

Every post ships with a changelog entry at
`src/content/changelog/entries/<merge-date>-<short-slug>.ts`. Date must
equal the merge day. Bilingual title + bullets. Copy any existing entry as
a template.

## 10. Pre-merge checklist

Run all four before pushing the final commit, and fix anything that fails:

```bash
npm run build      # 382+ pages, no warnings
npm run verify     # bilingual complete, internal links resolve, OG meta on every page
npm test           # all green incl. blogs.test.mjs (slug uniqueness, date prefix, tag shape)
npm run search:index && npm run test:search   # pagefind index builds, search test passes
```

Then manually:

1. Date bump if the calendar moved past the original draft date. Rename both
   the post file and the changelog entry file; update the `date:` field
   inside each.
2. Open `http://localhost:4321/blogs/<slug>` in a browser. Toggle dark mode.
   Scroll the full length. Click a few section TOC entries on the left rail.
3. `view-source:` the detail page; confirm both `"@type":"BlogPosting"` and
   (if you have a FAQ) `"@type":"FAQPage"` JSON-LD blocks are present.
4. Check the zh mirror at `/zh/blogs/<slug>`.

## 11. Things that hurt the post (resist these)

- **Wide tables** (>5 columns) in the article column. They wrap to 4-line
  cells and look broken. Trim to 4 columns; push the rest into prose or a
  feature matrix.
- **Caption duplication** — text inside the SVG that repeats the
  `<figcaption>` below it. Pick one (almost always the `<figcaption>`).
- **`TL;DR` / `Summary` / `Overview` labels** above the lede. Banned by
  `CLAUDE.md` Document-openers rule.
- **Hand-drawn-feeling diagrams** with thin strokes and no fill. Use the
  filled-box conventions in §3 — solid accent fills mark hierarchy.
- **Three sequential descriptions** in a cross-cutting comparison section
  (one paragraph per subject). Write COMPARATIVE prose instead: each
  paragraph addresses all three subjects across the same axis.
