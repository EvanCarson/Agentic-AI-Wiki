# Coding-Agent Comparison Post — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the AI Blog's second post — *Claude Code vs Codex CLI vs Cursor Agent vs Aider: Four Architectures of the Coding-Agent Loop* — bilingual, diagram-rich, passing all gates.

**Architecture:** The `/blogs` section infrastructure already exists (BlogLayout, manifest glob, tag pages, OG keys, nav — shipped with the first post). This plan only authors a new post: a metadata file under `src/content/blogs/posts/`, bilingual body fragments under `src/content/blogs/{en,zh}/`, ~12 co-located SVGs under `public/blogs/<slug>/`, and a changelog entry. No section/infra code changes.

**Tech Stack:** Astro 4 (static), TypeScript, Node test runner (`node --test --experimental-strip-types`), Pagefind, Vercel build pipeline. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-05-28-blog-coding-agent-comparison-design.md` (read it — this plan locks structure + verification; the spec carries the thesis, per-section talking points, and the four load-bearing decisions the prose must land).

**Authoring guide:** `src/content/blogs/AUTHORING.md` is normative for HTML skeleton, SVG conventions, FAQ JSON-LD rules, and the `is:global` gotcha. Match the first post (`*openclaw-vs-openhuman-vs-hermes-agent*`) file-for-file in shape.

**Slug:** `claude-code-vs-codex-cli-vs-cursor-agent-vs-aider`

**Branch / worktree:** `feature/blog-coding-agent-comparison-2026-05-28` in `.worktrees/blog-coding-agent-comparison`. Branch from **`origin/main`** (local `main` lags origin here). Run all commands from that worktree directory.

**Note on dates:** Written 2026-05-28. The post `date` field, both filename prefixes (post + changelog), and the snapshot-date note must equal the **day the PR merges to `main`**. Use `2026-05-28` as the working date; rename the two files and bump the `date:` fields + snapshot note if the calendar moves before merge.

**Conventions reminder:**
- Bilingual en/zh for every fragment; identical structural HTML; `<pre>` blocks (if any) byte-identical between locales; zh internal links use the `/zh/` prefix.
- Every fragment opens with a **hook lede** (no `TL;DR` / header label) — see `CLAUDE.md` "Document openers".
- SVG colors are CSS vars only (no bare hex except `var(...)` fallback); every SVG has `role="img"` + `<title>` + `<desc>`; no `<script>`/`on*=`.
- All internal links target **pre-existing** concept/deep-dive pages (already on `main`), so the intra-PR forward-link gate gotcha does **not** apply here.
- All edits inside the worktree, never on `main`.

---

## Task 1: Create the worktree and move the spec in

**Files:**
- Create: `.worktrees/blog-coding-agent-comparison/` (worktree)
- Move: the spec file into the worktree's tree (it currently lives untracked in the main checkout)

- [ ] **Step 1: Fetch and create the worktree from origin/main**

Run:
```bash
git fetch origin
git worktree add -b feature/blog-coding-agent-comparison-2026-05-28 .worktrees/blog-coding-agent-comparison origin/main
```
Expected: `Preparing worktree ... HEAD is now at <sha>`.

- [ ] **Step 2: Copy the design spec into the worktree**

The spec was written in the main checkout before the worktree existed. Copy it in so it ships with this PR:
```bash
cp docs/superpowers/specs/2026-05-28-blog-coding-agent-comparison-design.md \
   .worktrees/blog-coding-agent-comparison/docs/superpowers/specs/
cp docs/superpowers/plans/2026-05-28-blog-coding-agent-comparison.md \
   .worktrees/blog-coding-agent-comparison/docs/superpowers/plans/
```
Expected: both files present under the worktree's `docs/superpowers/`.

- [ ] **Step 3: cd into the worktree and confirm a clean baseline build**

Run (from the worktree root):
```bash
cd .worktrees/blog-coding-agent-comparison && npm ci && npm run build
```
Expected: build completes, existing 380+ pages, no warnings. This is the green baseline before any post work.

- [ ] **Step 4: Commit the spec + plan**

```bash
git add docs/superpowers/specs/2026-05-28-blog-coding-agent-comparison-design.md docs/superpowers/plans/2026-05-28-blog-coding-agent-comparison.md
git commit -m "docs: spec + plan for coding-agent comparison post"
```

---

## Task 2: Scaffold post metadata + stub fragments (the structural gate)

The `blogs.test.mjs` test is our "failing test first": it enforces slug uniqueness, that the filename date prefix equals the `date:` field, tag shape, and that both `en/` and `zh/` fragments exist. We make it green with a stub, then fill prose later.

**Files:**
- Create: `src/content/blogs/posts/2026-05-28-claude-code-vs-codex-cli-vs-cursor-agent-vs-aider.ts`
- Create: `src/content/blogs/en/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider.html`
- Create: `src/content/blogs/zh/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider.html`
- Test: `scripts/__tests__/blogs.test.mjs` (existing — do not edit)

- [ ] **Step 1: Run the blogs test on the current tree to see it pass (baseline)**

Run: `npm test -- --test-name-pattern=blog` (or `node --test --experimental-strip-types scripts/__tests__/blogs.test.mjs`)
Expected: PASS (only the first post exists). Confirms the test harness runs.

- [ ] **Step 2: Write the post metadata file**

Create `src/content/blogs/posts/2026-05-28-claude-code-vs-codex-cli-vs-cursor-agent-vs-aider.ts`:
```ts
import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-05-28',
  slug: 'claude-code-vs-codex-cli-vs-cursor-agent-vs-aider',
  title: L(
    'Claude Code vs Codex CLI vs Cursor Agent vs Aider: Four Architectures of the Coding-Agent Loop',
    'Claude Code、Codex CLI、Cursor Agent 与 Aider：编码智能体循环的四种架构',
  ),
  summary: L(
    'Four coding agents take the same prompt and the same repo down four completely different paths. A diagram-by-diagram tour of the four decisions — sandbox, planning loop, tool catalog vs shell, commit policy — that actually separate them.',
    '四款编码智能体，面对同一句提示、同一个仓库，走出了四条完全不同的路径。逐图解析真正区分它们的四个决策：沙箱、规划循环、工具清单与 shell、提交策略。',
  ),
  tags: ['agent-comparison', 'architecture', 'coding-agents', 'developer-tools'],
};

export default post;
```

- [ ] **Step 3: Create stub bilingual fragments**

Create `src/content/blogs/en/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider.html`:
```html
<p class="lede">STUB — replaced in Task 7.</p>
```
Create `src/content/blogs/zh/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider.html`:
```html
<p class="lede">占位 —— 将在任务 7 中替换。</p>
```

- [ ] **Step 4: Run the blogs test + build to verify the structural contract**

Run: `node --test --experimental-strip-types scripts/__tests__/blogs.test.mjs && npm run build`
Expected: blogs test PASS (slug unique, date prefix matches `2026-05-28`, tags valid, both fragments exist); build emits a new `/blogs/<slug>/index.html` and `/zh/blogs/<slug>/index.html`.

- [ ] **Step 5: Commit**

```bash
git add src/content/blogs/posts/2026-05-28-claude-code-vs-codex-cli-vs-cursor-agent-vs-aider.ts src/content/blogs/en/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider.html src/content/blogs/zh/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider.html
git commit -m "feat(blog): scaffold coding-agent comparison post"
```

---

## Task 3: Author the four logo SVGs

**Files:**
- Create: `public/blogs/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider/logos/claude-code.svg`
- Create: `.../logos/codex-cli.svg`
- Create: `.../logos/cursor.svg`
- Create: `.../logos/aider.svg`

- [ ] **Step 1: Create the directory**

Run: `mkdir -p public/blogs/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider/logos`

- [ ] **Step 2: Author each 32×32 logo**

Each logo: `viewBox="0 0 32 32"`, `role="img"`, `aria-label="<Name> logo"`, themeable colors only (`var(--accent, #d4421e)`, `var(--ink)`, `var(--paper)`). Use a simple, recognizable abstract mark per product (do NOT copy trademarked logos pixel-for-pixel — use a clean monogram/glyph in the site's accent palette, matching how the first post's `logos/*.svg` treat brand marks). Reference shape skeleton (customize the inner path per product):
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Claude Code logo">
  <rect x="2" y="2" width="28" height="28" rx="6" fill="var(--accent, #d4421e)" />
  <path d="M..." fill="var(--paper)" />
</svg>
```
Acceptance: 4 files, each valid standalone SVG, no `<script>`, colors via vars, distinct glyph per product.

- [ ] **Step 3: Verify they parse and commit**

Run: `for f in public/blogs/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider/logos/*.svg; do node -e "require('node-html-parser').parse(require('fs').readFileSync('$f','utf8')); console.log('ok','$f')"; done`
Expected: `ok` for all four.
```bash
git add public/blogs/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider/logos
git commit -m "feat(blog): coding-agent comparison logos"
```

---

## Task 4: Author the four architecture SVGs

**Files:**
- Create: `public/blogs/<slug>/arch-claude-code.svg`
- Create: `public/blogs/<slug>/arch-codex-cli.svg`
- Create: `public/blogs/<slug>/arch-cursor-agent.svg`
- Create: `public/blogs/<slug>/arch-aider.svg`

(`<slug>` = `claude-code-vs-codex-cli-vs-cursor-agent-vs-aider` throughout.)

- [ ] **Step 1: Author `arch-claude-code.svg`**

`viewBox="0 0 900 500"`, paste the AUTHORING §3 skeleton, then lay out boxes for: **harness** (hero box) → **typed tool catalog** (Read/Edit/Bash/…) + **deferred tools via ToolSearch** + **Skills** + **MCP servers** as adjacent boxes; a **task-list plan loop** (Claude Code's "Tasks" — the explicit, persisted task list) drawn as a cycle (plan → act → observe → update tasks) feeding back into the harness. Hero fill `var(--accent)`; secondary boxes `var(--accent-soft)`; neutral `var(--paper-2)`; arrows `currentColor`. `<title>`: "Claude Code architecture"; `<desc>`: one sentence.

- [ ] **Step 2: Author `arch-codex-cli.svg`**

Boxes for: **sandboxed VM** (hero, enclosing the work) → **shell-first tool** (the primary action surface) → **task queue** → **PR-as-output** terminal node. Show the trust boundary as a dashed enclosure around the VM. Same color hierarchy + accessibility.

- [ ] **Step 3: Author `arch-cursor-agent.svg`**

Boxes for: **IDE host** (hero) → **model/provider router** → **plan → diff → human review → apply** loop (highlight the human-in-the-loop review gate) → **multi-file edit** surface. Same conventions.

- [ ] **Step 4: Author `arch-aider.svg`**

Boxes for: **REPL** (hero) → **architect/editor model pair** (reasoning model plans, editor model emits diffs) → **edit-blocks parser** (SEARCH/REPLACE block format) → **git commit-per-edit** cycle → **repo map** input. Same conventions.

- [ ] **Step 5: Verify all parse, then commit**

Run the same parse loop as Task 3 Step 3 over `public/blogs/<slug>/arch-*.svg`.
Expected: `ok` ×4.
```bash
git add public/blogs/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider/arch-*.svg
git commit -m "feat(blog): coding-agent architecture diagrams"
```

---

## Task 5: Author the feature-matrix heatmap SVG

**Files:**
- Create: `public/blogs/<slug>/data-feature-matrix.svg`

- [ ] **Step 1: Author the heatmap**

`viewBox="0 0 900 500"`. Rows = Claude Code, Codex CLI, Cursor Agent, Aider. Columns = **Sandbox · Planning loop · MCP support · Multi-file edits · IDE-native · Commit policy**. Three levels, color-coded: weak `var(--paper-2)`, medium `var(--accent-soft)`, strong `var(--accent)`. Each cell holds a 1–2 word label (e.g. `Full VM`, `Task list`, `Yes`, `Per-edit`). Legend at the bottom. `role="img"` + `<title>`/`<desc>`. No descriptive caption text inside the SVG (that goes in the `<figcaption>`).

Cell guidance (fill levels reflect the spec's four decisions; pick the label, the color encodes strength of that trait):
- Claude Code: Sandbox=OS-sandbox(medium — bubblewrap/seatbelt + permission modes) · Planning=Task list(strong) · MCP=Yes(strong) · Multi-file=Yes(strong) · IDE-native=No(weak) · Commit=On-demand(medium)
- Codex CLI: Sandbox=Full VM(strong) · Planning=Queue(medium) · MCP=Yes(strong) · Multi-file=Yes(strong) · IDE-native=No(weak) · Commit=PR-output(strong)
- Cursor Agent: Sandbox=IDE-mediated(medium) · Planning=Plan+diff(strong) · MCP=Partial(medium) · Multi-file=Yes(strong) · IDE-native=Yes(strong) · Commit=Diff-review(medium)
- Aider: Sandbox=None(weak — local git repo, history is the safety net) · Planning=Architect/editor(medium — reasoning model plans, editor model emits diffs) · MCP=No(weak) · Multi-file=Chunked(medium) · IDE-native=No(weak) · Commit=Per-edit(strong)

(These encodings are the author's reading as of the snapshot date — verify against current docs before finalizing; the point is relative contrast, not a scorecard.)

**Grounding facts (from the May-2026 research pass — use these; they correct training-memory defaults):** Claude Code = OS-level sandbox (bubblewrap/seatbelt) + permission modes (`default`/`acceptEdits`/`plan`/`dontAsk`/`bypassPermissions`), explicit persisted **task list** (the "Tasks" system, formerly TodoWrite — describe generically, don't pin a version), full MCP, no auto-commit (commits/PRs on request), local models via a LiteLLM proxy (not first-class). Codex CLI = OS sandbox scoped to workspace, 3 approval modes (Auto/Read-only/Full Access), MCP supported, local models via `model_provider="oss"` + Ollama. Cursor (Agent mode) = IDE-mediated, plan-then-diff with **accept-per-file** review; Cursor 3 (Apr 2026) reframes the IDE as an agent runtime with a multi-agent Agents Window; MCP supported (~first 40 tools); local models via Ollama base URL. Aider = no sandbox (local git), **architect/editor model pair**, repo-map + diff edits, **auto-commits each edit**, any model incl. local via Ollama/LM Studio; MCP is NOT native — answer the FAQ honestly. Avoid specific pricing numbers (low confidence).

- [ ] **Step 2: Verify parse + commit**

```bash
node -e "require('node-html-parser').parse(require('fs').readFileSync('public/blogs/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider/data-feature-matrix.svg','utf8'));console.log('ok')"
git add public/blogs/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider/data-feature-matrix.svg
git commit -m "feat(blog): coding-agent feature matrix"
```

---

## Task 6: Author the three cross-cutting comparison SVGs

**Files:**
- Create: `public/blogs/<slug>/compare-sandbox.svg`
- Create: `public/blogs/<slug>/compare-plan-loop.svg`
- Create: `public/blogs/<slug>/compare-tools-vs-shell.svg`

- [ ] **Step 1: Author all three**

Each `viewBox="0 0 900 300"`, **four columns** at x=125 / 375 / 625 / 875 (each ~225px wide — header + 2 short label lines). Column header = product name; body = that product's stance on the axis. Color the strongest/most-distinctive cell per axis with `var(--accent)`, others `var(--paper-2)`/`var(--accent-soft)`. `role="img"` + `<title>`/`<desc>` each.
- `compare-sandbox.svg` — axis: sandbox & filesystem trust boundary (None / Full VM / IDE-mediated / permission-prompted).
- `compare-plan-loop.svg` — axis: planning loop shape (Claude Code task-list plan / Codex queue / Cursor plan-then-diff / Aider architect-editor two-pass).
- `compare-tools-vs-shell.svg` — axis: tool catalog vs the shell (typed catalog+MCP / shell-first / IDE-wrapped / narrow+git).

- [ ] **Step 2: Verify parse + commit**

Parse loop over `compare-*.svg`; expect `ok` ×3.
```bash
git add public/blogs/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider/compare-*.svg
git commit -m "feat(blog): coding-agent cross-cutting comparisons"
```

---

## Task 7: Write the English body fragment

**Files:**
- Modify: `src/content/blogs/en/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider.html` (replace the stub)

This is content authoring against a fixed structure. Use the spec §3–§9 for substance. The HTML skeleton below is the contract — fill every section with prose that lands the thesis (tool catalog ≠ capability; the four decisions are the differentiator) and writes **comparatively** in the cross-cutting section (each paragraph across all four, never four sequential descriptions).

- [ ] **Step 1: Replace the stub with the full structure**

Sections, in order (use the AUTHORING §2 skeleton tags exactly):
1. `<p class="lede">` — the hook (spec §3 en draft, including "as of late May 2026"). ~60–80 words.
2. `<section><h2>At a glance</h2>` — orienting sentence; 4-row `<table>` (Project · Released · Primary niche · Deployment shape) with logo `<img>` in the first cell of each row (`/blogs/<slug>/logos/<name>.svg`, width/height 24, vertical-align middle); a muted snapshot note `<p>` under the table (spec §7); then the feature-matrix `<figure>` (`data-feature-matrix.svg`, 900×500, `loading="lazy"`, one-line `<figcaption>`).
3. `<section><h2>Claude Code — deep dive</h2>` — `<figure>` `arch-claude-code.svg`; `<h3>` subsections: the harness model; deferred tools + skills + MCP; the task-list loop (Tasks). Inline-link `/concepts/the-agent-loop`, `/deep-dives/architectures-and-patterns/react-pattern`, `/deep-dives/tool-capability-design/tool-design-principles`, `/deep-dives/architectures-and-patterns/tool-error-recovery` where natural.
4. `<section><h2>Codex CLI — deep dive</h2>` — `<figure>` `arch-codex-cli.svg`; `<h3>`: sandboxed VM; shell-first tool surface; PR-as-output. Inline-link `/deep-dives/architectures-and-patterns/tool-error-recovery`, `/deep-dives/protocols-and-interop/structured-tool-io`.
5. `<section><h2>Cursor Agent — deep dive</h2>` — `<figure>` `arch-cursor-agent.svg`; `<h3>`: IDE-mediated FS; plan-then-diff loop; multi-file edits. Inline-link `/deep-dives/architectures-and-patterns/plan-and-execute`.
6. `<section><h2>Aider — deep dive</h2>` — `<figure>` `arch-aider.svg`; `<h3>`: git-as-protocol; edit-blocks format; chunk-by-chunk discipline.
7. `<section><h2>Cross-cutting comparison</h2>` — three `<h3>` + `<figure>` + comparative `<p>` units: Sandbox & filesystem trust (`compare-sandbox.svg`); Planning loop shape (`compare-plan-loop.svg`); Tool catalog vs the shell (`compare-tools-vs-shell.svg`). Then a short `<h3>` "Commit & output policy" with a small inline 4-row table (no SVG). Mention MCP via `/deep-dives/protocols-and-interop/mcp-architecture`, `/deep-dives/protocols-and-interop/building-interoperable-agents`; context handling via `/deep-dives/memory-and-context/context-budgeting`.
8. `<section><h2>When to pick which</h2>` — `<table>`: Use case · Pick Claude Code if… · Pick Codex CLI if… · Pick Cursor if… · Pick Aider if… (4–5 use-case rows: greenfield feature, large monorepo, fully-local/offline, heavy review discipline, quick one-file fix).
9. `<section class="faq"><h2>FAQ</h2>` — the six spec §6 questions, each `<h3>` immediately followed by exactly one `<p>` answer. No nested `<section>`.
10. `<section><h2>Further reading</h2>` — `<h3>On this wiki:</h3>` `<ul>` linking `/concepts/what-is-an-agent`, `/concepts/tool-calling-explained`, `/deep-dives/tool-capability-design/tool-design-antipatterns`; `<h3>Project sources:</h3>` `<ul>` linking each project's official docs/repo.

- [ ] **Step 2: Build and confirm the JSON-LD + page render**

Run: `npm run build`
Then:
```bash
grep -o '"@type":"BlogPosting"' dist/blogs/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider/index.html
grep -o '"@type":"FAQPage"' dist/blogs/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider/index.html
```
Expected: both match exactly once. Build has no new warnings.

- [ ] **Step 3: Commit**

```bash
git add src/content/blogs/en/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider.html
git commit -m "feat(blog): coding-agent comparison — English body"
```

---

## Task 8: Write the Chinese body fragment

**Files:**
- Modify: `src/content/blogs/zh/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider.html` (replace the stub)

- [ ] **Step 1: Mirror the en structure with faithful zh prose**

Identical structural HTML to the en fragment (same tags, same `<figure>` order, same image `src` paths). Translate prose faithfully (not byte-mirrored). Keep product names + technical terms in English (Claude Code, Codex CLI, Cursor, Aider, MCP, Tasks, REPL, VM, PR, Ollama, architect/editor). Full-width zh punctuation in prose. **Every internal link gets the `/zh/` prefix** (e.g. `/zh/concepts/the-agent-loop`, `/zh/deep-dives/architectures-and-patterns/react-pattern`). zh lede from spec §3 zh draft. zh snapshot note. The Deep-Dive/Concept anchor text is translated; the `src` of every `<img>` is identical to en.

- [ ] **Step 2: Build + verify bilingual completeness and links**

Run: `npm run verify`
Expected: build passes; `verify-chapters` / blogs bilingual check passes; `check-internal-links.mjs` reports all links resolve (including the `/zh/...` variants); `verify-og.mjs` passes.

- [ ] **Step 3: Commit**

```bash
git add src/content/blogs/zh/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider.html
git commit -m "feat(blog): coding-agent comparison — Chinese body"
```

---

## Task 9: Add the changelog entry

**Files:**
- Create: `src/content/changelog/entries/2026-05-28-coding-agent-showdown.ts`

- [ ] **Step 1: Write the entry**

Copy an existing entry under `src/content/changelog/entries/` as a template. The default export is `{ date, title: L(...), items: L(...)[] }`. Filename date prefix MUST equal the `date` field.
```ts
import { L } from '../types.ts';

export default {
  date: '2026-05-28',
  title: L(
    'New AI Blog post: four coding agents compared',
    'AI 博客新文章：四款编码智能体对比',
  ),
  items: [
    L(
      'Added “Claude Code vs Codex CLI vs Cursor Agent vs Aider” — a diagram-driven comparison of the four decisions that separate coding agents: sandbox, planning loop, tool catalog vs shell, and commit policy.',
      '新增《Claude Code、Codex CLI、Cursor Agent 与 Aider》——以图解方式比较区分编码智能体的四个决策：沙箱、规划循环、工具清单与 shell、提交策略。',
    ),
    L(
      'New tags: coding-agents, developer-tools.',
      '新增标签：coding-agents、developer-tools。',
    ),
  ],
};
```

- [ ] **Step 2: Build + test + commit**

Run: `npm run build && node --test --experimental-strip-types scripts/__tests__/changelog.test.mjs`
Expected: changelog test PASS (filename date prefix equals `date`).
```bash
git add src/content/changelog/entries/2026-05-28-coding-agent-showdown.ts
git commit -m "docs(changelog): coding-agent comparison post"
```

---

## Task 10: Full verification + manual review + PR

**Files:** none (verification + PR)

- [ ] **Step 1: Run every gate**

Run:
```bash
npm run build
npm run verify
npm test
npm run search:index && npm run test:search
```
Expected: all green, no new build warnings. Fix anything that fails and re-commit before proceeding.

- [ ] **Step 2: Manual browser check**

Run: `npm run dev`. Open `http://localhost:4321/blogs/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider`. Verify: hook lede renders with the accent left-border; all 8 figures (4 arch + 1 matrix + 3 compare) display and theme-adapt; left-rail TOC lists every `<h2>`; toggle dark mode and scroll the full length; tables don't overflow the column. Then open `/zh/blogs/<slug>` and confirm the zh mirror + `/zh/` links work.

- [ ] **Step 3: Confirm date is still correct**

If the calendar moved past 2026-05-28, rename the post file + changelog file and bump the `date:` fields + the snapshot note to the real merge day, then re-run `npm test`.

- [ ] **Step 4: Push and open the PR**

```bash
git push -u origin feature/blog-coding-agent-comparison-2026-05-28
gh pr create --title "AI Blog: coding-agent comparison (Claude Code / Codex CLI / Cursor / Aider)" --body "$(cat <<'EOF'
## Summary
- Adds the AI Blog's second post: a diagram-driven comparison of Claude Code, Codex CLI, Cursor Agent, and Aider across four architectural decisions (sandbox, planning loop, tool catalog vs shell, commit policy).
- Bilingual en/zh; 12 themeable SVGs; BlogPosting + FAQPage JSON-LD; new tags coding-agents, developer-tools.
- Spec: docs/superpowers/specs/2026-05-28-blog-coding-agent-comparison-design.md

## Test plan
- [ ] npm run build (no new warnings)
- [ ] npm run verify (bilingual complete, internal links resolve, OG meta)
- [ ] npm test (blogs.test.mjs + changelog.test.mjs green)
- [ ] npm run search:index && npm run test:search
- [ ] Manual: /blogs/<slug> + /zh/blogs/<slug>, dark mode, TOC, JSON-LD present
EOF
)"
```

- [ ] **Step 5: Post-merge housekeeping** (after the PR merges)

Sync local `main` to `origin/main`, remove the worktree (`git worktree remove .worktrees/blog-coding-agent-comparison`) and delete the merged branch, then confirm the live post at `https://menuagentic.com/blogs/<slug>`.

---

## Self-Review (completed during planning)

- **Spec coverage:** thesis/4-decisions → Tasks 4–7; lineup → Task 2; title/hook → Tasks 2 & 7; sections → Task 7; SVG inventory (12) → Tasks 3–6; FAQ (6) → Task 7 §9; snapshot mechanic → Tasks 2 & 7; tags → Task 2; internal links (group-nested, verified) → Tasks 7–8; changelog → Task 9; verification gates → Task 10. No gaps.
- **Placeholder scan:** the only intentional deferrals are prose substance (Tasks 7–8, authored against the fixed skeleton + spec talking points — the repo's first-post plan handled prose identically) and the SVG cell readings (flagged as snapshot-dependent). No "TODO"/"handle edge cases"/undefined references.
- **Type/path consistency:** slug `claude-code-vs-codex-cli-vs-cursor-agent-vs-aider` and all `/blogs/<slug>/...` asset paths, deep-dive group-nested URLs, and the four arch/logo filenames are identical across Tasks 2–10.
