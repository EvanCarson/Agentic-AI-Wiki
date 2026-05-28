# Getting Started with OpenHuman — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a hands-on "Getting Started with OpenHuman" AI Blog post (bilingual, with 3 diagrams + changelog entry) and correct two stale facts in the existing comparison post.

**Architecture:** Astro static site. A blog post = one metadata `.ts` + `en/` and `zh/` body-only HTML fragments + co-located SVGs under `public/blogs/<slug>/`, registered automatically by the build-time manifest glob. Verification is the project's gate suite, not unit tests.

**Tech Stack:** Astro, TypeScript (`--experimental-strip-types`), Node test runner, hand-authored themeable SVG, Pagefind search index.

**Source of truth:** All facts are in `docs/superpowers/specs/2026-05-28-openhuman-getting-started-design.md`. **Do not invent install commands, URLs, versions, or pricing** beyond what that spec lists. Conventions are in `src/content/blogs/AUTHORING.md` and `CLAUDE.md`.

**Working location:** worktree `.worktrees/openhuman-getting-started`, branch `blog/openhuman-getting-started`. All commands run from the worktree root.

**Reference file (copy its shape):** `src/content/blogs/en/openclaw-vs-openhuman-vs-hermes-agent.html` and its `posts/` + `zh/` siblings are the working template for layout, section markup, figure/table markup, and the SVG conventions.

---

## File Structure

Create:
- `src/content/blogs/posts/2026-05-28-getting-started-with-openhuman.ts` — post metadata (date, slug, bilingual title/summary, tags).
- `src/content/blogs/en/getting-started-with-openhuman.html` — English body fragment, 11 sections.
- `src/content/blogs/zh/getting-started-with-openhuman.html` — Chinese mirror, same structure.
- `public/blogs/getting-started-with-openhuman/arch-trust-model.svg`
- `public/blogs/getting-started-with-openhuman/flow-onboarding.svg`
- `public/blogs/getting-started-with-openhuman/arch-context-pipeline.svg`
- `public/blogs/getting-started-with-openhuman/logos/openhuman.svg` — copied from the comparison post.
- `src/content/changelog/entries/2026-05-28-getting-started-with-openhuman.ts` — one entry, bilingual, covering the new post AND the companion fix.

Modify:
- `src/content/blogs/en/openclaw-vs-openhuman-vs-hermes-agent.html` — companion fix.
- `src/content/blogs/zh/openclaw-vs-openhuman-vs-hermes-agent.html` — companion fix (parity).

---

## Task 1: Scaffold metadata, logo, and renderable stubs

Get the post registered and rendering with placeholder bodies, so the manifest test passes before prose is written. This isolates "plumbing works" from "content is good."

**Files:**
- Create: `src/content/blogs/posts/2026-05-28-getting-started-with-openhuman.ts`
- Create: `src/content/blogs/en/getting-started-with-openhuman.html`
- Create: `src/content/blogs/zh/getting-started-with-openhuman.html`
- Create: `public/blogs/getting-started-with-openhuman/logos/openhuman.svg`

- [ ] **Step 1: Copy the logo**

```bash
mkdir -p public/blogs/getting-started-with-openhuman/logos
cp public/blogs/openclaw-vs-openhuman-vs-hermes-agent/logos/openhuman.svg \
   public/blogs/getting-started-with-openhuman/logos/openhuman.svg
```

- [ ] **Step 2: Write the metadata file**

`src/content/blogs/posts/2026-05-28-getting-started-with-openhuman.ts`:

```ts
import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-05-28',
  slug: 'getting-started-with-openhuman',
  title: L(
    'Getting Started with OpenHuman: From Install to Your First Useful Answer',
    'OpenHuman 上手指南：从安装到第一个有用的回答',
  ),
  summary: L(
    'Most agents start cold and you spend days briefing them. OpenHuman loads a compressed model of your work life in one sync pass — here is how to install it, connect your stack, and get a useful answer in about fifteen minutes.',
    '大多数智能体从零开始，你得花上几天向它交代背景。OpenHuman 在一次同步中就载入了对你工作生活的压缩模型——本文带你安装、接入你的工具栈，并在约十五分钟内得到一个有用的回答。',
  ),
  tags: ['open-source', 'getting-started', 'personal-assistant', 'memory'],
};

export default post;
```

- [ ] **Step 3: Write minimal en/zh stubs (lede only)**

`en/getting-started-with-openhuman.html`:

```html
<p class="lede">Stub lede — replaced in Task 3.</p>
```

`zh/getting-started-with-openhuman.html`:

```html
<p class="lede">占位引言——将在 Task 3 中替换。</p>
```

- [ ] **Step 4: Run the blog manifest test**

Run: `npm test 2>&1 | grep -iE "blog|fail|pass"`
Expected: `blogs.test.mjs` assertions pass (slug unique, date prefix matches `date:`, tags well-shaped, bilingual fragments present). 0 failures.

- [ ] **Step 5: Build and eyeball the route renders**

Run: `npm run build 2>&1 | tail -5`
Expected: build completes, no new warnings; `dist/blogs/getting-started-with-openhuman/index.html` and `dist/zh/blogs/getting-started-with-openhuman/index.html` exist.

- [ ] **Step 6: Commit**

```bash
git add src/content/blogs/posts/2026-05-28-getting-started-with-openhuman.ts \
        src/content/blogs/en/getting-started-with-openhuman.html \
        src/content/blogs/zh/getting-started-with-openhuman.html \
        public/blogs/getting-started-with-openhuman/logos/openhuman.svg
git commit -m "blog: scaffold getting-started-with-openhuman post (stub)"
```

---

## Task 2: Author the three diagrams

Hand-write the SVGs before the prose so the fragment can reference them and so figures inline correctly. Follow `AUTHORING.md` §3: `viewBox`-based, CSS-var fills only (no bare hex except as `var(...)` fallback), `role="img"` + `<title>` + `<desc>` + `aria-labelledby`, no `<script>`/`on*=`, no caption text inside the SVG. Use the comparison post's `arch-*.svg` as worked examples for box/arrow/label classes.

**Files:**
- Create: `public/blogs/getting-started-with-openhuman/arch-trust-model.svg`
- Create: `public/blogs/getting-started-with-openhuman/flow-onboarding.svg`
- Create: `public/blogs/getting-started-with-openhuman/arch-context-pipeline.svg`

- [ ] **Step 1: Read a worked example for the class vocabulary**

Read `public/blogs/openclaw-vs-openhuman-vs-hermes-agent/arch-openhuman.svg` to reuse its `<style>` classes (`.box/.hero/.adj/.label/.label-inv/.sub/.arrow`), marker `<defs>`, and CSS-var palette verbatim.

- [ ] **Step 2: Write `arch-trust-model.svg`** (viewBox `0 0 900 500`)

Two labelled columns. Left "On your machine" (hero/adj boxes): Memory Tree, Obsidian vault, SQLite store, workspace config — annotate "encrypted locally, stays on device." Right "Managed by default" (paper-2 boxes): account sign-in, model routing, web-search proxy, Composio OAuth broker. A footer note box: "Custom/local mode: bring your own model (Ollama) / search / Composio key — some real-time triggers still use the managed backend." `<title>`: "OpenHuman trust model: local data vs managed services." No prices, no invented services.

- [ ] **Step 3: Write `flow-onboarding.svg`** (viewBox `0 0 900 400`)

Four left-to-right stages joined by `.arrow`: (1) Install & launch → (2) Sign in ("Let's Cook"; Advanced → custom RPC) → (3) Connect a service (one-click OAuth in browser) → (4) Ask "What do I need to know from the last 12 hours?" (automatic model routing). Hero fill on the final stage. `<title>`: "OpenHuman first-run onboarding flow."

- [ ] **Step 4: Write `arch-context-pipeline.svg`** (viewBox `0 0 900 500`)

Pipeline: 118+ connectors → auto-fetch (every 20 min) → TokenJuice compression (~80% fewer tokens) → Memory Tree (≤3k-token Markdown chunks in SQLite) → Obsidian vault (.md) → agent context. Hero fill on Memory Tree. `<title>`: "How OpenHuman builds context."

- [ ] **Step 5: Validate SVG hygiene**

Run:
```bash
grep -L 'role="img"' public/blogs/getting-started-with-openhuman/*.svg            # expect: no output
grep -nE '#[0-9a-fA-F]{3,6}' public/blogs/getting-started-with-openhuman/*.svg | grep -v 'var(' || echo "OK: no bare hex"
grep -nE '<script|on[a-z]+=' public/blogs/getting-started-with-openhuman/*.svg && echo "FAIL: script/handler found" || echo "OK: no scripts"
```
Expected: first prints nothing (all have `role="img"`), second prints `OK: no bare hex`, third prints `OK: no scripts`.

- [ ] **Step 6: Commit**

```bash
git add public/blogs/getting-started-with-openhuman/*.svg
git commit -m "blog: add 3 diagrams for getting-started-with-openhuman"
```

---

## Task 3: Write the full English fragment

Replace the stub with the 11 sections from the spec. Body-only HTML (no `<h1>`/doctype). Open with the hook lede (no label, per `CLAUDE.md` Document-openers). Use existing `guide.css`/layout markup — match the comparison post's `<section><h2>`, `<figure><img …><figcaption>`, `<table>`, and `<pre>` usage. Every factual claim must trace to the spec's "Source of truth"; no invented commands/URLs/versions/prices.

**Files:**
- Modify: `src/content/blogs/en/getting-started-with-openhuman.html` (full rewrite)

- [ ] **Step 1: Write all 11 sections** in order, per spec:

  1. **Lede** — `<p class="lede">`: cold-start pain → OpenHuman pre-loads life-context → install-to-useful-answer in ~15 min.
  2. **At a glance** — short orienting sentence + ≤4-col `<table>`: What it is / Version (v0.56.0, Early Beta) / Platforms (macOS, Windows, Linux) / License (GPL-3.0). One sentence after the table on cost model (managed subscription incl. all models vs BYO/local; verify price on site — no figures). Logo `<img>` inline on the product name cell like the comparison post.
  3. **Before you install** — system requirements (4 GB min / 16 GB+ recommended; macOS Accessibility + Input Monitoring; optional camera/mic for Meeting Agent) + the trust model prose. `<figure>` → `arch-trust-model.svg` with a one-line `<figcaption>`.
  4. **Install** — per-OS steps. macOS Homebrew, Linux apt (reproduce the README keyring sequence in a `<pre>`), Arch AUR, Windows MSI, manual installers, then the warned-against script install with the integrity-check warning, then the Linux AppImage/Wayland caveat (#2463 → prefer `.deb`). Each command block in `<pre class="standalone">` (or matching sibling markup).
  5. **First run** — numbered `<ol>` of the 5 onboarding steps. `<figure>` → `flow-onboarding.svg`.
  6. **How your context gets built** — auto-fetch → TokenJuice → Memory Tree (SQLite) → Obsidian vault. `<figure>` → `arch-context-pipeline.svg`.
  7. **Connecting more of your stack** — connection states (Not connected/Connected/Manage), managed vs direct Composio, the four roles (tool/memory source/profile signal/trigger), 118+ services.
  8. **What it does out of the box** — native tools, mascot, model routing, messaging channels.
  9. **Going local / advanced** — Ollama local AI; direct Composio; agentmemory backend with inline `<code>memory.backend = "agentmemory"</code>` in `config.toml`; self-hosted RPC via Advanced panel.
  10. **FAQ** — `<section class="faq">` with `<h3>`+`<p>` pairs (no nested `<section>`): Is it really local? / Is it free? / Does it work offline? / Minimum specs? / Where is my data? / Can I bring my own model? Answers 1–3 sentences, grounded in spec.
  11. **Further reading** — `<h3>On this wiki:</h3>` list linking `/blogs/openclaw-vs-openhuman-vs-hermes-agent` and relevant Concepts (`/concepts/the-agent-loop`, plus memory + tools/actions/environments if those slugs resolve — verify in Step 2). `<h3>Project sources:</h3>` linking the repo, the GitBook docs, and the releases page.

- [ ] **Step 2: Verify every internal link target exists before committing**

```bash
npm run build >/dev/null 2>&1
# For each /concepts/<slug> or /blogs/<slug> you linked, confirm the route built:
ls dist/concepts/ dist/blogs/ | grep -iE 'agent-loop|memory|tools-actions|openclaw'
```
Expected: each linked slug appears. If a Concept slug does not resolve, drop that link rather than shipping a 404 (the verify gate will fail on broken internal links otherwise).

- [ ] **Step 3: Build + the internal-link/verify gate**

Run: `npm run build 2>&1 | tail -3 && npm run verify 2>&1 | tail -15`
Expected: build clean; verify reports bilingual completeness and link resolution. (zh is still a stub here — verify may flag structural mismatch; if it does, proceed to Task 4 which fixes parity, then re-run. Note in the commit that zh lands next.)

- [ ] **Step 4: Confirm FAQ JSON-LD emitted**

Run: `grep -o '"@type":"FAQPage"' dist/blogs/getting-started-with-openhuman/index.html`
Expected: one match (proves the `class="faq"` block parsed).

- [ ] **Step 5: Commit**

```bash
git add src/content/blogs/en/getting-started-with-openhuman.html
git commit -m "blog: write English body for getting-started-with-openhuman"
```

---

## Task 4: Write the Chinese mirror

Translate Task 3 faithfully (not byte-mirrored prose), keeping identical structural HTML, identical image `src` paths, identical `<pre>` bytes (translate prose/comments-as-prose only — never command bytes), full-width punctuation in prose, English for product/tech identifiers (OpenHuman, Composio, Tauri, SQLite, Ollama, Markdown, OAuth, LLM…), and `/zh/...` prefixes on internal links.

**Files:**
- Modify: `src/content/blogs/zh/getting-started-with-openhuman.html` (full rewrite)

- [ ] **Step 1: Mirror the en structure** section-for-section; translate all prose, table cells, `<ol>` steps, figcaptions, and FAQ Q/A. Keep all `<pre>` command blocks byte-identical to en.

- [ ] **Step 2: Rewrite internal links with `/zh/` prefix**, e.g. `/zh/blogs/openclaw-vs-openhuman-vs-hermes-agent`, `/zh/concepts/the-agent-loop`. External project-source links stay unprefixed.

- [ ] **Step 3: Build + verify (full bilingual gate)**

Run: `npm run build 2>&1 | tail -3 && npm run verify 2>&1 | tail -15 && npm test 2>&1 | tail -8`
Expected: build clean, verify passes (bilingual complete, all internal links resolve incl. `/zh/`), `npm test` 0 failures.

- [ ] **Step 4: Confirm zh FAQ JSON-LD + pre-parity**

```bash
grep -o '"@type":"FAQPage"' dist/zh/blogs/getting-started-with-openhuman/index.html   # expect 1
diff <(grep -oP '(?<=<pre[^>]*>).*?(?=</pre>)' src/content/blogs/en/getting-started-with-openhuman.html) \
     <(grep -oP '(?<=<pre[^>]*>).*?(?=</pre>)' src/content/blogs/zh/getting-started-with-openhuman.html) \
  && echo "OK: pre blocks byte-identical"
```
Expected: one FAQPage match; `OK: pre blocks byte-identical`.

- [ ] **Step 5: Commit**

```bash
git add src/content/blogs/zh/getting-started-with-openhuman.html
git commit -m "blog: write Chinese mirror for getting-started-with-openhuman"
```

---

## Task 5: Companion fix to the comparison post

Correct two stale facts in the 2026-05-26 comparison post, minimally and with en/zh parity. Edit only the sentences that are now inaccurate.

**Files:**
- Modify: `src/content/blogs/en/openclaw-vs-openhuman-vs-hermes-agent.html`
- Modify: `src/content/blogs/zh/openclaw-vs-openhuman-vs-hermes-agent.html`

- [ ] **Step 1: Find the target sentences**

```bash
grep -n -iE 'local-only|never leaves the machine|7,?800' src/content/blogs/en/openclaw-vs-openhuman-vs-hermes-agent.html
grep -n -iE '本地|7,?800|7800' src/content/blogs/zh/openclaw-vs-openhuman-vs-hermes-agent.html
```

- [ ] **Step 2: Soften the "local-only" framing (en + zh)**

Reword "local-only architecture … the memory tree never leaves the machine" to the accurate framing: the Memory Tree and vault stay on-device, but sign-in, model routing, search, and connector OAuth go through OpenHuman's managed backend by default, with custom/local mode optional. Keep it to the existing sentence(s); do not expand the section. Mirror the change in zh.

- [ ] **Step 3: Update the star count (en + zh)**

Replace "roughly 7,800 GitHub stars" (and any other 7,800 occurrence) with "roughly 29,000 GitHub stars (as of May 2026)". Update zh equivalently. Leave OpenClaw/Hermes numbers untouched.

- [ ] **Step 4: Build + verify + test**

Run: `npm run build 2>&1 | tail -3 && npm run verify 2>&1 | tail -8 && npm test 2>&1 | tail -6`
Expected: all clean, 0 failures.

- [ ] **Step 5: Commit**

```bash
git add src/content/blogs/en/openclaw-vs-openhuman-vs-hermes-agent.html \
        src/content/blogs/zh/openclaw-vs-openhuman-vs-hermes-agent.html
git commit -m "blog: correct OpenHuman local-only framing and star count in comparison post"
```

---

## Task 6: Changelog entry

One entry covering both the new post and the companion fix.

**Files:**
- Create: `src/content/changelog/entries/2026-05-28-getting-started-with-openhuman.ts`

- [ ] **Step 1: Copy an existing entry as template**

```bash
cp src/content/changelog/entries/2026-05-26-add-ai-blog-section.ts \
   src/content/changelog/entries/2026-05-28-getting-started-with-openhuman.ts
```

- [ ] **Step 2: Rewrite it** — `date: '2026-05-28'`, bilingual `title` (e.g. "New AI Blog post: Getting Started with OpenHuman" / "新增 AI 博客文章：OpenHuman 上手指南"), and `items` bullets (bilingual via `L(...)`):
  - the new hands-on getting-started guide (install → first answer, 3 diagrams, FAQ);
  - the correction to the comparison post (accurate managed-vs-local framing + updated star count).

- [ ] **Step 3: Changelog test**

Run: `npm test 2>&1 | grep -iE "changelog|fail|pass" | tail -8`
Expected: `changelog.test.mjs` passes (filename date prefix equals `date:` field). 0 failures.

- [ ] **Step 4: Commit**

```bash
git add src/content/changelog/entries/2026-05-28-getting-started-with-openhuman.ts
git commit -m "changelog: getting-started-with-openhuman post + comparison-post correction"
```

---

## Task 7: Full gate run + manual verification

**Files:** none (verification only)

- [ ] **Step 1: Run every gate**

```bash
npm run build && npm run verify && npm test && npm run search:index && npm run test:search
```
Expected: all green; build with no new warnings; search index builds and both locales index an equal, sane page count (the 3 search tests that were skipped at baseline now pass).

- [ ] **Step 2: JSON-LD presence on the new post (both locales)**

```bash
grep -o '"@type":"BlogPosting"' dist/blogs/getting-started-with-openhuman/index.html
grep -o '"@type":"FAQPage"'     dist/blogs/getting-started-with-openhuman/index.html
grep -o '"@type":"BlogPosting"' dist/zh/blogs/getting-started-with-openhuman/index.html
```
Expected: each prints one match.

- [ ] **Step 3: Manual browser check** (`npm run preview` or `npm run dev`)

Open `/blogs/getting-started-with-openhuman`: toggle dark mode, scroll full length, confirm all 3 diagrams render and theme-adapt, click left-rail TOC entries, confirm no broken `<img>`. Open `/zh/blogs/getting-started-with-openhuman` and spot-check the mirror. Confirm the index card and tag pages list the post.

- [ ] **Step 4: Date-bump check before any push**

If the calendar has moved past 2026-05-28 at merge time, rename the post file, the changelog entry file, and update both `date:` fields to the real merge day (per `AUTHORING.md` §10 / `CLAUDE.md`).

- [ ] **Step 5: Finish the branch** — invoke `superpowers:finishing-a-development-branch` to choose merge/PR/cleanup. Do not push or open a PR without explicit user approval.

---

## Self-Review (completed during planning)

- **Spec coverage:** every spec section maps to a task — identity/at-a-glance→T1+T3§2; trust model→T2(diagram)+T3§3+T5; install→T3§4; onboarding→T2+T3§5; context engine→T2+T3§6; connectors→T3§7; out-of-box→T3§8; advanced→T3§9; FAQ→T3§10; further reading→T3§11; diagrams→T2; zh mirror→T4; companion fix→T5; changelog→T6; gates→T7. No gaps.
- **Placeholder scan:** the only intentional placeholders are the Task 1 stubs, explicitly replaced in Task 3/4. No vague "add error handling"-style steps.
- **Consistency:** slug `getting-started-with-openhuman`, date `2026-05-28`, and the 3 SVG filenames are used identically across metadata, fragments, diagrams, and changelog.
