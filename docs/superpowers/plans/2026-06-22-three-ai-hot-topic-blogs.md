# Three AI Hot-Topic Blog Posts — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship three coordinated blog posts in one merge — (1) a four-way computer-use comparison, (2) an MCP infrastructure essay, (3) a five-way frontier-model refresh — all bilingual, diagram-rich, with one combined changelog entry, passing every verification gate.

**Architecture:** The `/blogs` section infrastructure (BlogLayout, manifest glob, tag pages, OG, nav, JSON-LD emitter) already exists. This plan authors three new posts only: metadata under `src/content/blogs/posts/`, bilingual fragments under `src/content/blogs/{en,zh}/`, co-located SVGs under `public/blogs/<slug>/`, and one combined changelog entry. No section/infra code changes.

**Tech Stack:** Astro 4 (static), TypeScript, Node test runner (`node --test --experimental-strip-types`), Pagefind, Vercel build pipeline. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-06-22-three-ai-hot-topic-blogs-design.md` — read it before starting any body task. It carries the per-post thesis, FAQ questions, citation list, and the load-bearing numbers that the prose must land.

**Authoring guide:** `src/content/blogs/AUTHORING.md` is normative for HTML skeleton, SVG conventions, FAQ JSON-LD parsing rules, the `is:global` gotcha, and the bilingual checklist. Match the existing posts file-for-file in shape.

**Slugs (referenced throughout):**
- **Post 1:** `claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu`
- **Post 2:** `mcp-at-97-million-downloads`
- **Post 3:** `claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1`

**Branch / worktree:** `feature/blog-three-hot-topics-2026-06-22` in `.worktrees/blog-three-hot-topics`. Branch from **`origin/main`** (local `main` may lag). Run all commands from that worktree directory.

**Note on dates:** Written 2026-06-22. The post `date` fields, all three filename prefixes, and the changelog entry's date + filename must equal the **merge day**. If the calendar moves before merge, rename + bump (Task 13 has the date-bump step).

**Conventions reminder:**
- Bilingual en/zh; identical structural HTML; `<pre>` (if any) byte-identical between locales; zh internal links use the `/zh/` prefix.
- Hook lede opener — no `TL;DR`/`Summary`/`Overview` label, no throat-clearing (`CLAUDE.md` Document-openers rule).
- SVGs: viewBox-based, themeable CSS vars only (no bare hex except inside `var(... , #fallback)`), `role="img"` + `<title>` + `<desc>` + `aria-labelledby`, no `<script>`, no `on*=` handlers.
- Tables ≤4 columns in the article column (AUTHORING §11).
- All internal links must target **pre-existing** wiki pages — verify in browser before commit.
- All edits inside the worktree, never on `main`.

**Citation rigor:** Every numeric claim (97M MCP downloads, 72.5% OSWorld, 87% Operator, Pinterest 66K/7K, release dates, prices) must be verified against the upstream source at draft time, with the source link included in *Further reading*. If a number cannot be verified to a primary source, remove it — no soft attribution.

---

## Task 1: Create the worktree and move spec + plan in

**Files:**
- Create: `.worktrees/blog-three-hot-topics/` (worktree)
- Move: spec + this plan into the worktree's tree

- [ ] **Step 1: Fetch and create the worktree from origin/main**

```bash
git fetch origin
git worktree add -b feature/blog-three-hot-topics-2026-06-22 .worktrees/blog-three-hot-topics origin/main
```
Expected: `Preparing worktree ... HEAD is now at <sha>`.

- [ ] **Step 2: Copy spec + plan into the worktree**

```bash
cp docs/superpowers/specs/2026-06-22-three-ai-hot-topic-blogs-design.md \
   .worktrees/blog-three-hot-topics/docs/superpowers/specs/
cp docs/superpowers/plans/2026-06-22-three-ai-hot-topic-blogs.md \
   .worktrees/blog-three-hot-topics/docs/superpowers/plans/
```

- [ ] **Step 3: Enter worktree, install, baseline build**

```bash
cd .worktrees/blog-three-hot-topics && npm ci && npm run build
```
Expected: build completes, no warnings — green baseline. **All subsequent commands in this plan run from this worktree directory.**

- [ ] **Step 4: Commit spec + plan**

```bash
git add docs/superpowers/specs/2026-06-22-three-ai-hot-topic-blogs-design.md docs/superpowers/plans/2026-06-22-three-ai-hot-topic-blogs.md
git commit -m "docs: spec + plan for three June-2026 hot-topic blog posts"
```

---

## Task 2: Scaffold all three post metadata files + stub bilingual fragments

**Files:**
- Create: `src/content/blogs/posts/2026-06-22-claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu.ts`
- Create: `src/content/blogs/posts/2026-06-22-mcp-at-97-million-downloads.ts`
- Create: `src/content/blogs/posts/2026-06-22-claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1.ts`
- Create: `src/content/blogs/{en,zh}/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu.html`
- Create: `src/content/blogs/{en,zh}/mcp-at-97-million-downloads.html`
- Create: `src/content/blogs/{en,zh}/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1.html`
- Test: `scripts/__tests__/blogs.test.mjs` (existing — do not edit)

- [ ] **Step 1: Run the blogs test for a baseline**

```bash
node --test --experimental-strip-types scripts/__tests__/blogs.test.mjs
```
Expected: PASS on the current tree.

- [ ] **Step 2: Write Post 1 metadata**

`src/content/blogs/posts/2026-06-22-claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu.ts`:
```ts
import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-22',
  slug: 'claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu',
  title: L(
    'Claude Computer Use (post-Vercept) vs Codex Background CU vs Operator vs Gemini: Four Bets on Letting AI Drive the Mouse',
    'Claude Computer Use（收购 Vercept 后）、Codex 后台 CU、Operator 与 Gemini：四种让 AI 自己操作鼠标的下注方式',
  ),
  summary: L(
    '72.5% on OSWorld is the new floor, not a milestone — and three labs have made architecturally opposite bets on where the mouse should live. Pick the wrong one and you fight your sandbox forever; pick the right one and the model does in two minutes what your RPA stack does in two weeks.',
    '在 OSWorld 上拿到 72.5% 已经是地板而非里程碑——而三家实验室在"鼠标应该跑在哪里"这件事上做了架构上完全相反的下注。选错了就要永远跟自己的沙箱搏斗；选对了，模型两分钟能做完你 RPA 栈两周的活。',
  ),
  tags: ['agent-comparison', 'frontier-models', 'computer-use', 'browser-agents'],
};

export default post;
```

- [ ] **Step 3: Write Post 2 metadata**

`src/content/blogs/posts/2026-06-22-mcp-at-97-million-downloads.ts`:
```ts
import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-22',
  slug: 'mcp-at-97-million-downloads',
  title: L(
    'MCP at 97 Million Downloads: How the Model Context Protocol Won — and What\'s Still Broken at Scale',
    '月下载量 9700 万的 MCP：模型上下文协议是如何赢的——以及到了这种规模还有什么没解决',
  ),
  summary: L(
    'Two years from Anthropic\'s launch, MCP isn\'t a debate — it\'s a dependency. Every frontier vendor, every major IDE, and one Pinterest team saving 7,000 engineering hours a month all ship against it. The interesting question is no longer *should you use MCP* — it\'s what fails at this scale and how the 2026 roadmap plans to fix it.',
    '从 Anthropic 推出至今两年，MCP 已经不是要不要用的问题——它是一种依赖。每家前沿厂商、每个主流 IDE，以及一支为公司每月节省 7000 工程师小时的 Pinterest 团队都在它上面构建。真正值得问的不再是"我要不要用 MCP"，而是到了这种规模哪些地方在崩、2026 路线图打算怎么修。',
  ),
  tags: ['mcp', 'protocols', 'infrastructure', 'ecosystem'],
};

export default post;
```

- [ ] **Step 4: Write Post 3 metadata**

`src/content/blogs/posts/2026-06-22-claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1.ts`:
```ts
import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-22',
  slug: 'claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1',
  title: L(
    'Claude Mythos 5 vs GPT-5.6 vs Gemini 3.2 vs Qwen 3.7 vs DeepSeek V4.1: The June 2026 Frontier Refresh',
    'Claude Mythos 5、GPT-5.6、Gemini 3.2、Qwen 3.7 与 DeepSeek V4.1：2026 年 6 月的前沿模型大刷新',
  ),
  summary: L(
    'Five frontier-tier models shipped inside a two-week window in June 2026. The differences are no longer about who tops MMLU — each lab is now betting on a different axis: agentic computer use, reasoning cost, multimodal latency, or pure price floor. Pick the axis before you pick the model.',
    '2026 年 6 月，五款前沿级模型在两周窗口内集中发布。差距早已不是谁登顶 MMLU——每家实验室如今押注的是不同的轴：智能体计算机操作、推理成本、多模态延迟，或纯粹的价格底线。先选好轴，再选模型。',
  ),
  tags: ['model-comparison', 'frontier-models', 'closed-source', 'open-source'],
};

export default post;
```

- [ ] **Step 5: Create six stub fragments (one per post per locale)**

For each of the three slugs, create matching `en` and `zh` stubs.

`src/content/blogs/en/<SLUG>.html`:
```html
<p class="lede">STUB — replaced in the body-authoring task for this post.</p>
```

`src/content/blogs/zh/<SLUG>.html`:
```html
<p class="lede">占位 —— 将在该文章的正文撰写任务中替换。</p>
```

Repeat verbatim for all three slugs. Six stub files total.

- [ ] **Step 6: Run blogs test + build**

```bash
node --test --experimental-strip-types scripts/__tests__/blogs.test.mjs && npm run build
```
Expected: blogs test PASS (3 new slugs unique, date prefixes `2026-06-22`, tags valid, all six fragments exist); build emits `/blogs/<slug>/index.html` and `/zh/blogs/<slug>/index.html` for each.

- [ ] **Step 7: Commit**

```bash
git add src/content/blogs/posts/2026-06-22-*.ts src/content/blogs/en/{claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu,mcp-at-97-million-downloads,claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1}.html src/content/blogs/zh/{claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu,mcp-at-97-million-downloads,claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1}.html
git commit -m "feat(blog): scaffold three June-2026 hot-topic posts"
```

---

## Task 3: Author Post 1 logos (4 SVGs)

**Files:**
- Create: `public/blogs/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu/logos/anthropic.svg`
- Create: `public/blogs/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu/logos/openai.svg`
- Create: `public/blogs/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu/logos/google.svg`
- Create: `public/blogs/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu/logos/browser-use.svg`

- [ ] **Step 1: Create the directory**

```bash
mkdir -p public/blogs/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu/logos
```

- [ ] **Step 2: Author each 32×32 logo**

Per AUTHORING §3: `viewBox="0 0 32 32"`, `role="img"`, `aria-label="<Name> logo"`, CSS-var colors only, clean abstract monogram per vendor (do **not** reproduce trademarked marks pixel-for-pixel). Skeleton:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Anthropic logo">
  <rect x="2" y="2" width="28" height="28" rx="6" fill="var(--accent, #d4421e)" />
  <path d="M..." fill="var(--paper)" />
</svg>
```
Four distinct glyphs — Anthropic, OpenAI, Google, browser-use (open-source baseline). No scripts. No `on*=`.

- [ ] **Step 3: Verify parse + commit**

```bash
for f in public/blogs/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu/logos/*.svg; do node -e "require('node-html-parser').parse(require('fs').readFileSync('$f','utf8'));console.log('ok','$f')"; done
git add public/blogs/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu/logos
git commit -m "feat(blog): computer-use comparison logos"
```

---

## Task 4: Author Post 1 diagrams (4 SVGs)

**Files:**
- Create: `public/blogs/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu/data-osworld-scores.svg`
- Create: `public/blogs/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu/arch-claude-cu.svg`
- Create: `public/blogs/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu/arch-openai-cu.svg`
- Create: `public/blogs/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu/data-feature-matrix.svg`

- [ ] **Step 1: `data-osworld-scores.svg`** (horizontal bar chart, viewBox `0 0 900 400`)

AUTHORING §4 bar-chart pattern. Rows (top to bottom, descending score): **Claude Computer Use (post-Vercept)** — `var(--accent)`, score 72.5; **OpenAI Operator** — `var(--accent-soft)`, score per latest Operator number (verify at draft time); **Gemini Computer Use** — `var(--paper-2)`, score per latest Gemini number; **browser-use (OSS baseline)** — `var(--paper-2)`, score per latest published number. Light dotted gridlines every quartile (0/25/50/75/100). Numeric labels at the right edge of each bar in matching fill. Chart title inside SVG: *"OSWorld benchmark (% success)"*. `role="img"` + `<title>` + `<desc>`. **No descriptive caption text inside the SVG** — that goes in the `<figcaption>` in the body.

- [ ] **Step 2: `arch-claude-cu.svg`** (viewBox `0 0 900 500`)

AUTHORING §3 skeleton. Boxes: **Claude model** (hero, `var(--accent)`) → **screenshot + mouse/keyboard tool** → reaches into a clearly-labeled "**YOUR MACHINE / VM / CONTAINER**" envelope containing Desktop apps, Terminal, Filesystem, and Browser (all `var(--paper-2)`). Emphasize: *portable, OS-agnostic, sandbox is yours*. Hero accent fill; targets neutral; arrows `currentColor`. `<title>`: "Claude Computer Use — your sandbox, portable harness".

- [ ] **Step 3: `arch-openai-cu.svg`** (viewBox `0 0 900 500`)

Boxes: **GPT-5.6** (hero, `var(--accent)`) → **DOM event channel** → enclosed by an **"OpenAI cloud VM"** envelope containing a **sandboxed Chromium** (browser only — no FS, no native apps). Side note box: *audit trail, credential containment*. Emphasize: *containment, web-only*. `<title>`: "OpenAI Codex Background CU + Operator — cloud VM, browser only".

- [ ] **Step 4: `data-feature-matrix.svg`** (viewBox `0 0 900 400`)

AUTHORING §4 feature-heatmap pattern. Rows = Claude CU / OpenAI CUA / Gemini CU / browser-use. Columns = **Surface (web vs full-desktop) · Deployment (their VM vs your machine) · Safety model · Latency · Open-weights**. Levels: weak `var(--paper-2)` / medium `var(--accent-soft)` / strong `var(--accent)` with 1–2 word in-cell labels (`Full desktop` / `Your machine` / `Containment` / `Low` / `Yes` etc.). Bottom legend. `role="img"` + `<title>` + `<desc>`. No caption text inside.

Cell guidance (verify against current docs at draft time):
- **Claude CU:** Surface=Full desktop(strong) · Deployment=Your machine(strong) · Safety=Human-in-loop(medium) · Latency=Medium(medium) · Open-weights=No(weak)
- **OpenAI CUA:** Surface=Web only(weak) · Deployment=Their VM(strong as managed; weak if you need control) · Safety=Containment(strong) · Latency=Low(strong) · Open-weights=No(weak)
- **Gemini CU:** Surface=Web only(weak) · Deployment=Their VM(strong) · Safety=Containment(medium) · Latency=Low(strong) · Open-weights=No(weak)
- **browser-use:** Surface=Web only(weak) · Deployment=Your machine(strong) · Safety=Your responsibility(weak) · Latency=Medium(medium) · Open-weights=Yes(strong)

- [ ] **Step 5: Verify parse + commit**

```bash
for f in public/blogs/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu/{data-*,arch-*}.svg; do node -e "require('node-html-parser').parse(require('fs').readFileSync('$f','utf8'));console.log('ok','$f')"; done
git add public/blogs/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu/{data-*,arch-*}.svg
git commit -m "feat(blog): computer-use comparison diagrams"
```

---

## Task 5: Author Post 1 English body

**Files:**
- Modify: `src/content/blogs/en/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu.html` (replace stub)

Content authoring against the fixed structure below. Substance from spec §"Post 1". Land the thesis (architecture, not benchmark score, is what decides which model fits your job) and write **comparatively** in the cross-cutting section (not three sequential descriptions — see AUTHORING §11).

- [ ] **Step 1: Replace the stub with the full body**

1. `<p class="lede">` — opens with the 72.5% number and the verb "drive"; takes a side in the first 30 words: *the question is no longer can a model use a computer, it's where the computer lives*; names the three bets explicitly. No `TL;DR`/label. Insert an "as of late June 2026" snapshot phrase.
2. `<section><h2>At a glance</h2>` — one orienting sentence; 4-column `<table>` (Vendor · Approach · Deployment · OSWorld %); muted snapshot `<p>` note; `<figure>` with `data-osworld-scores.svg` (900×400, `loading="lazy"`); `<figure>` with `data-feature-matrix.svg` (900×400).
3. `<section><h2>Claude Computer Use</h2>` — `<figure>` `arch-claude-cu.svg`; `<h3>`s: *Post-Vercept architecture · Why "your sandbox" wins · The acquisition context*. Inline-link `/concepts/the-agent-loop`.
4. `<section><h2>OpenAI Codex Background CU + Operator</h2>` — `<figure>` `arch-openai-cu.svg`; `<h3>`s: *Cloud-VM Chromium · Codex Background CU (shipped April 16, 2026) · Operator's 87% travel-booking number · ChatGPT Agent integration*.
5. `<section><h2>Gemini Computer Use</h2>` — narrower web focus, latency-tuned, tight Workspace ties; `<h3>`s: *Where it wins · Where it doesn't*.
6. `<section><h2>Cross-cutting comparison</h2>` — **four `<h3>` subsections, each a single comparative paragraph addressing all three vendors on that axis**: *Surface · Deployment · Safety model · Latency*. Do not write three sequential descriptions (AUTHORING §11).
7. `<section><h2>When to pick which</h2>` — 4-column decision matrix `<table>`: Use case · Pick Claude if… · Pick OpenAI if… · Pick Gemini if… Rows: browser-only web task / desktop app automation / terminal-driven dev work / regulated enterprise / consumer assistant.
8. `<section class="faq"><h2>FAQ</h2>` — exactly these six `<h3>` questions, each followed immediately by one `<p>` answer (no other tag between, no nested `<section>`):
   - *Can I run Claude Computer Use on Windows?*
   - *How safe is OpenAI's cloud VM with my credentials?*
   - *What does OSWorld actually measure?*
   - *Is Vercept's technology in the public Claude API?*
   - *Which one wins for booking travel?*
   - *What about open-source options (browser-use, CogAgent)?*
9. `<section><h2>Further reading</h2>` — `<h3>On this wiki:</h3>` `<ul>` linking `/concepts/the-agent-loop` and `/concepts/agent-frameworks`; `<h3>Project sources:</h3>` `<ul>` linking the Anthropic Computer Use announcement, OpenAI Operator docs, OpenAI Codex Background CU announcement, Gemini Computer Use docs, OSWorld leaderboard, Anthropic Vercept acquisition coverage. **Every URL verified at draft time.**

- [ ] **Step 2: Build + confirm JSON-LD**

```bash
npm run build
grep -o '"@type":"BlogPosting"' dist/blogs/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu/index.html
grep -o '"@type":"FAQPage"' dist/blogs/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu/index.html
```
Expected: both match exactly once; no new build warnings.

- [ ] **Step 3: Commit**

```bash
git add src/content/blogs/en/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu.html
git commit -m "feat(blog): computer-use comparison — English body"
```

---

## Task 6: Author Post 1 Chinese body

**Files:**
- Modify: `src/content/blogs/zh/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu.html` (replace stub)

- [ ] **Step 1: Mirror en structure with faithful zh prose**

Identical structural HTML to the English fragment. Faithful (not byte-mirror) translation. Keep product names + technical terms in English: `Claude`, `Vercept`, `OpenAI`, `Operator`, `Codex Background CU`, `Gemini`, `OSWorld`, `Chromium`, `OS`, `VM`, `RPA`, `API`. Full-width zh punctuation in prose (`，` `。` `：` `；` `——` `（）`); ASCII inside `<code>` and `<pre>` blocks. zh lede includes "截至 2026 年 6 月下旬" snapshot phrase. Image `src` paths identical to en. **Every internal link uses the `/zh/` prefix** (e.g. `<a href="/zh/concepts/the-agent-loop">`).

- [ ] **Step 2: Build + verify**

```bash
npm run verify
```
Expected: bilingual check passes; `check-internal-links.mjs` resolves every link including `/zh/...`; `verify-og.mjs` passes.

- [ ] **Step 3: Commit**

```bash
git add src/content/blogs/zh/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu.html
git commit -m "feat(blog): computer-use comparison — Chinese body"
```

---

## Task 7: Author Post 2 logos (9 SVGs)

**Files:** vendor logos for the support-matrix diagram in Post 2.
- Create: `public/blogs/mcp-at-97-million-downloads/logos/{anthropic,openai,google,microsoft,github,vercel,vscode,cursor,chatgpt}.svg`

- [ ] **Step 1: Create the directory**

```bash
mkdir -p public/blogs/mcp-at-97-million-downloads/logos
```

- [ ] **Step 2: Author all nine 32×32 logos**

Same convention as Task 3 Step 2 — `viewBox="0 0 32 32"`, `role="img"`, `aria-label`, CSS-var colors, abstract monogram. Nine distinct glyphs. No scripts.

- [ ] **Step 3: Verify parse + commit**

```bash
for f in public/blogs/mcp-at-97-million-downloads/logos/*.svg; do node -e "require('node-html-parser').parse(require('fs').readFileSync('$f','utf8'));console.log('ok','$f')"; done
git add public/blogs/mcp-at-97-million-downloads/logos
git commit -m "feat(blog): MCP post vendor logos"
```

---

## Task 8: Author Post 2 diagrams (3 SVGs)

**Files:**
- Create: `public/blogs/mcp-at-97-million-downloads/data-mcp-growth.svg`
- Create: `public/blogs/mcp-at-97-million-downloads/arch-mcp-topology.svg`
- Create: `public/blogs/mcp-at-97-million-downloads/data-vendor-support-matrix.svg`

- [ ] **Step 1: `data-mcp-growth.svg`** (horizontal bar chart, viewBox `0 0 900 400`)

5–6 horizontal bars showing monthly MCP SDK downloads at quarterly snapshots from Nov 2024 → Jun 2026, terminal bar at 97M (or the verified current number, in millions). Terminal bar `var(--accent)`; middle bars `var(--accent-soft)`; earliest bars `var(--paper-2)`. Light dotted gridlines. Numeric labels at right edge. Chart title inside SVG: *"MCP monthly SDK downloads (millions)"*. `role="img"` + `<title>` + `<desc>`. No descriptive caption inside.

- [ ] **Step 2: `arch-mcp-topology.svg`** (viewBox `0 0 900 500`)

Canonical three-column MCP topology — readers recognize the shape from every MCP write-up on the internet, so match it.
- **Left column "MCP HOST":** envelope (`var(--accent)`, hero) containing **LLM** at top + three **MCP Client** boxes stacked below.
- **Middle gap:** three pairs of bidirectional arrows (`currentColor`, `marker-end` + `marker-start`) labeled *"JSON-RPC over stdio / HTTP"* at the top of the gap.
- **Middle-right column "MCP SERVERS":** three **server** boxes (`var(--accent-soft)`) — e.g. *Filesystem server*, *GitHub server*, *Pinterest internal server*.
- **Right column "REAL SYSTEMS":** three neutral `var(--paper-2)` boxes — e.g. */path/to/repo*, *api.github.com*, *Pinterest data warehouse* — with single-direction arrows from each server.

`<title>`: "MCP topology — host, JSON-RPC, server, target".

- [ ] **Step 3: `data-vendor-support-matrix.svg`** (viewBox `0 0 900 400`, heatmap)

Rows = nine vendors: **Anthropic · OpenAI · Google · Microsoft · GitHub · Vercel · VS Code · Cursor · ChatGPT** (use logos in the row labels via inline `<image>` href to the vendor SVGs, or just text — text is simpler and avoids the inline-href complication). Columns: **MCP client · MCP server · First-party docs · Registry contribution**. Levels: weak `var(--paper-2)` / medium `var(--accent-soft)` / strong `var(--accent)` with 1-word labels (`Yes` / `Partial` / `No` / `Native` etc.). Bottom legend. `role="img"` + `<title>` + `<desc>`. **Cell ratings must be verified against each vendor's current MCP documentation at draft time** — do not guess.

- [ ] **Step 4: Verify parse + commit**

```bash
for f in public/blogs/mcp-at-97-million-downloads/{data-*,arch-*}.svg; do node -e "require('node-html-parser').parse(require('fs').readFileSync('$f','utf8'));console.log('ok','$f')"; done
git add public/blogs/mcp-at-97-million-downloads/{data-*,arch-*}.svg
git commit -m "feat(blog): MCP post diagrams"
```

---

## Task 9: Author Post 2 English body

**Files:**
- Modify: `src/content/blogs/en/mcp-at-97-million-downloads.html` (replace stub)

Content authoring against the fixed structure below. Substance from spec §"Post 2". Essay register — no decision matrix.

- [ ] **Step 1: Replace the stub with the full body**

1. `<p class="lede">` — opens with the 97M number; frames the shift "MCP isn't a debate — it's a dependency"; lands the sharpest sentence: *"The interesting question is no longer should you use MCP — it's what fails at this scale."* No `TL;DR`. Insert "as of late June 2026" snapshot phrase.
2. `<section><h2>The numbers</h2>` — 3-row `<table>` (Metric · Value · As of): *Monthly MCP SDK downloads · 97 million · May 2026* / *Registry server records · ~10,000 (9,652 latest / 28,959 with versions) · May 24, 2026* / *Pinterest production invocations · 66,000/month across 844 active users, ~7,000 eng hours saved · April 2026*; one short prose paragraph contextualizing each row; `<figure>` with `data-mcp-growth.svg` (900×400, `loading="lazy"`).
3. `<section><h2>What MCP actually is</h2>` — `<figure>` with `arch-mcp-topology.svg` (900×500); three short paragraphs explaining host / server / transport roles; one inline link to the wiki concept page (verify which exists — try `/concepts/the-agent-loop` and `/concepts/tools-and-environments`).
4. `<section><h2>Why it won</h2>` — three `<h3>` subsections: *Neutral specification with first-mover advantage · Cross-vendor uptake* (mention the nine vendors covered by the matrix) *· Linux Foundation Agentic AI Foundation handover removing single-vendor risk*. `<figure>` with `data-vendor-support-matrix.svg`.
5. `<section><h2>What still breaks at scale</h2>` — four `<h3>` subsections: *Transport scalability (stdio's limits at 10K-server registries) · Registry trust and supply chain · Server sprawl and discoverability · Governance and auth*. One concrete failure-mode example per subsection — do not list axes without naming what breaks.
6. `<section><h2>The 2026 roadmap</h2>` — what upstream maintainers say ships next: transport scalability fixes, agent-to-agent communication, governance maturation, enterprise readiness. Single paragraph each. Link the official roadmap blog post.
7. `<section class="faq"><h2>FAQ</h2>` — exactly these six `<h3>`/`<p>` pairs (no nested section):
   - *Is MCP just function calling?*
   - *Do I have to write a server in TypeScript?*
   - *Can I use MCP with non-Anthropic models?*
   - *What's the difference between MCP and OpenAPI?*
   - *Is MCP secure by default?*
   - *Will Google or OpenAI fork it?*
8. `<section><h2>Further reading</h2>` — `<h3>On this wiki:</h3>` `<ul>` linking `/concepts/tools-and-environments` (verify exists; fall back to `/concepts/the-agent-loop`); `<h3>Project sources:</h3>` `<ul>` linking the MCP specification site, 2026 MCP Roadmap blog post, MCP registry, Pinterest engineering blog post on MCP, Linux Foundation Agentic AI Foundation announcement. **Every URL verified at draft time.**

- [ ] **Step 2: Build + confirm JSON-LD**

```bash
npm run build
grep -o '"@type":"BlogPosting"' dist/blogs/mcp-at-97-million-downloads/index.html
grep -o '"@type":"FAQPage"' dist/blogs/mcp-at-97-million-downloads/index.html
```
Expected: both match exactly once; no new build warnings.

- [ ] **Step 3: Commit**

```bash
git add src/content/blogs/en/mcp-at-97-million-downloads.html
git commit -m "feat(blog): MCP post — English body"
```

---

## Task 10: Author Post 2 Chinese body

**Files:**
- Modify: `src/content/blogs/zh/mcp-at-97-million-downloads.html` (replace stub)

- [ ] **Step 1: Mirror en structure with faithful zh prose**

Identical structural HTML. Faithful (not byte-mirror) translation. Keep technical terms in English: `MCP`, `Model Context Protocol`, `JSON-RPC`, `stdio`, `HTTP`, `Anthropic`, `OpenAI`, `Pinterest`, `Linux Foundation`, `SDK`, `OpenAPI`. Full-width zh punctuation in prose; ASCII inside `<code>`/`<pre>`. zh lede includes "截至 2026 年 6 月下旬" snapshot phrase. Image `src` paths identical to en. Internal links use `/zh/` prefix.

- [ ] **Step 2: Build + verify**

```bash
npm run verify
```
Expected: bilingual check passes; internal links resolve; OG meta present.

- [ ] **Step 3: Commit**

```bash
git add src/content/blogs/zh/mcp-at-97-million-downloads.html
git commit -m "feat(blog): MCP post — Chinese body"
```

---

## Task 11: Author Post 3 logos (5 SVGs)

**Files:**
- Create: `public/blogs/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1/logos/{anthropic,openai,google,qwen,deepseek}.svg`

- [ ] **Step 1: Create the directory**

```bash
mkdir -p public/blogs/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1/logos
```

- [ ] **Step 2: Author all five 32×32 logos**

Same convention as Task 3 Step 2. Five distinct glyphs — Anthropic, OpenAI, Google, Qwen (Alibaba), DeepSeek. The Anthropic/OpenAI/Google logos can be visually similar to Task 3's but **must be authored as separate files** (per-post co-location convention).

- [ ] **Step 3: Verify parse + commit**

```bash
for f in public/blogs/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1/logos/*.svg; do node -e "require('node-html-parser').parse(require('fs').readFileSync('$f','utf8'));console.log('ok','$f')"; done
git add public/blogs/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1/logos
git commit -m "feat(blog): frontier-refresh post logos"
```

---

## Task 12: Author Post 3 diagrams (4 SVGs)

**Files:**
- Create: `public/blogs/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1/data-release-timeline.svg`
- Create: `public/blogs/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1/data-agentic-benchmark.svg`
- Create: `public/blogs/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1/data-price-per-token.svg`
- Create: `public/blogs/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1/data-feature-matrix.svg`

- [ ] **Step 1: `data-release-timeline.svg`** (viewBox `0 0 900 400`) — this is the post's thesis diagram

Horizontal date axis spanning roughly Jun 3 → Jun 21 2026 with tick marks. A semi-transparent `var(--accent)` rectangle highlights the ~14-day convergence window. Five lab-colored dots plotted on the axis at each model's verified release date:
- **Claude Mythos 5 (+ Fable 5 preview)** — `var(--accent)`
- **GPT-5.6**
- **Gemini 3.2**
- **Qwen 3.7 / DeepSeek V4.1** — paired marker (the Chinese cluster lead)
- **GLM-6 / Hunyuan Large 3 / ERNIE 5.1 / Doubao Pro** — clustered marker labeled as the price-pressure response

Each dot has a vertical drop line to a text label above the axis with model name + one-line context. Title inside SVG: *"Five frontier models in one fortnight (June 2026)"*. `role="img"` + `<title>` + `<desc>`. **Re-verify every release date against each lab's primary announcement at draft time.**

- [ ] **Step 2: `data-agentic-benchmark.svg`** (viewBox `0 0 900 400`, horizontal bar chart)

Pick **one** agentic benchmark (SWE-bench Verified or GAIA — whichever has fresh, comparable numbers across all five models at draft time; document the choice in the figcaption). Five horizontal bars ranked descending: leader in `var(--accent)`; runners-up in `var(--accent-soft)`; trailing in `var(--paper-2)`. Numeric labels at the right edge. Chart title inside SVG names the benchmark. Light dotted gridlines.

- [ ] **Step 3: `data-price-per-token.svg`** (viewBox `0 0 900 400`, horizontal bar chart)

Five horizontal bars: $/1M output tokens for each model (use blended/standard rates from each lab's pricing page — verify at draft time). Chinese cluster should bottom the chart (price-floor thesis). Cheapest in `var(--accent)`; middle in `var(--accent-soft)`; most-expensive in `var(--paper-2)`. Numeric labels at right edge. Chart title inside SVG: *"Price per 1M output tokens (USD)"*.

- [ ] **Step 4: `data-feature-matrix.svg`** (viewBox `0 0 900 400`, heatmap)

Rows = the five models. Columns = **Reasoning · Computer use · Multimodal · Price/perf · Open-weights**. Levels weak `var(--paper-2)` / medium `var(--accent-soft)` / strong `var(--accent)` with 1-word in-cell labels. Bottom legend. `role="img"` + `<title>` + `<desc>`.

Cell guidance (verify at draft time):
- **Claude Mythos 5:** Reasoning(strong) · Computer use(strong, post-Vercept) · Multimodal(medium) · Price/perf(medium) · Open-weights(weak)
- **GPT-5.6:** Reasoning(strong) · Computer use(strong, Codex Background CU + Operator) · Multimodal(strong) · Price/perf(medium) · Open-weights(weak)
- **Gemini 3.2:** Reasoning(strong) · Computer use(medium) · Multimodal(strong) · Price/perf(strong) · Open-weights(weak)
- **Qwen 3.7:** Reasoning(strong) · Computer use(medium) · Multimodal(medium) · Price/perf(strong) · Open-weights(strong)
- **DeepSeek V4.1:** Reasoning(strong) · Computer use(weak/medium) · Multimodal(medium) · Price/perf(strong) · Open-weights(strong)

- [ ] **Step 5: Verify parse + commit**

```bash
for f in public/blogs/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1/data-*.svg; do node -e "require('node-html-parser').parse(require('fs').readFileSync('$f','utf8'));console.log('ok','$f')"; done
git add public/blogs/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1/data-*.svg
git commit -m "feat(blog): frontier-refresh post diagrams"
```

---

## Task 13: Author Post 3 English body

**Files:**
- Modify: `src/content/blogs/en/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1.html` (replace stub)

Content authoring against the fixed structure below. Substance from spec §"Post 3". 11 sections (one extra for Chinese cluster, one extra for the release timeline). Write comparatively in the cross-cutting section.

- [ ] **Step 1: Replace the stub with the full body**

1. `<p class="lede">` — opens with "Five frontier models, two-week window"; takeaway phrased as axes-not-leaders: *"Pick the axis before you pick the model."* No `TL;DR`. Insert "as of late June 2026" snapshot phrase.
2. `<section><h2>At a glance</h2>` — one orienting sentence; 4-column `<table>` (Model · Released · Pricing · Headline strength) — **context length goes in the prose, not the table**, per AUTHORING §11; muted snapshot `<p>` note; `<figure>` with `data-agentic-benchmark.svg`; `<figure>` with `data-feature-matrix.svg`.
3. `<section><h2>Release timeline</h2>` — `<figure>` with `data-release-timeline.svg` (the thesis diagram); two short paragraphs naming the convergence and what triggered each release (DeepSeek V4's April 2026 pricing forced the Chinese cluster to respond inside weeks; the western labs followed their own cadence).
4. `<section><h2>Claude Mythos 5 GA (+ Fable 5 preview)</h2>` — vulnerability-aware reasoning for procurement; sibling-line strategy (Mythos GA vs Fable preview); where it leads (coding, agentic reasoning). Inline-link `/concepts/agent-frameworks` if natural.
5. `<section><h2>GPT-5.6</h2>` — on-schedule cadence; deeper Codex Background CU and Operator integration; the autonomous-task lead. Cross-reference Post 1 (the computer-use post) by internal link.
6. `<section><h2>Gemini 3.2</h2>` — mid-cycle multimodal refresh; Workspace integration; price-per-quality position.
7. `<section><h2>The Chinese cluster</h2>` — Qwen 3.7 and DeepSeek V4.1 lead; one-paragraph sweep covering GLM-6 / Hunyuan Large 3 / ERNIE 5.1 / Doubao Pro; price-floor pressure narrative; weights availability matters here.
8. `<section><h2>Cross-cutting comparison</h2>` — five `<h3>` subsections, each a comparative paragraph across all five models: *Reasoning · Computer use · Multimodal · Price/perf · Weights availability*. `<figure>` with `data-price-per-token.svg` under the price subsection.
9. `<section><h2>When to pick which</h2>` — 5-column-ish decision matrix is too wide — use a 4-column `<table>` instead: Use case · Best Western option · Best Chinese-cluster option · Rationale. Rows: enterprise procurement / agentic terminal work / multimodal product / self-host / price-optimized batch.
10. `<section class="faq"><h2>FAQ</h2>` — exactly these six `<h3>`/`<p>` pairs:
    - *Is Mythos 5 just Opus renamed?*
    - *Which is cheapest for high-volume reasoning?*
    - *Can I run Qwen 3.7 on a single H100?*
    - *Does GPT-5.6 dethrone Claude on coding?*
    - *Are the Chinese weights actually permissively licensed?*
    - *What's the difference between Mythos and Fable?*
11. `<section><h2>Further reading</h2>` — `<h3>On this wiki:</h3>` `<ul>` linking the prior frontier-models post `/blogs/llama-4-vs-deepseek-v3-vs-qwen3-vs-mistral-large-3` and a relevant concept page; `<h3>Project sources:</h3>` `<ul>` linking each lab's primary release announcement (Anthropic Mythos 5 GA + Fable 5 preview, OpenAI GPT-5.6, Google Gemini 3.2, Qwen 3.7, DeepSeek V4.1) + a public leaderboard (llm-stats.com or similar). **Every URL verified at draft time.**

- [ ] **Step 2: Build + confirm JSON-LD**

```bash
npm run build
grep -o '"@type":"BlogPosting"' dist/blogs/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1/index.html
grep -o '"@type":"FAQPage"' dist/blogs/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1/index.html
```
Expected: both match exactly once; no new build warnings.

- [ ] **Step 3: Commit**

```bash
git add src/content/blogs/en/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1.html
git commit -m "feat(blog): frontier-refresh post — English body"
```

---

## Task 14: Author Post 3 Chinese body

**Files:**
- Modify: `src/content/blogs/zh/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1.html` (replace stub)

- [ ] **Step 1: Mirror en structure with faithful zh prose**

Identical structural HTML. Faithful (not byte-mirror) translation. Keep model names + technical terms in English: `Claude Mythos 5`, `Fable 5`, `GPT-5.6`, `Gemini 3.2`, `Qwen 3.7`, `DeepSeek V4.1`, `GLM-6`, `Hunyuan Large 3`, `ERNIE 5.1`, `Doubao Pro`, `MMLU`, `SWE-bench`, `GAIA`, `H100`, `MoE`. Full-width zh punctuation in prose; ASCII inside `<code>`/`<pre>`. zh lede includes "截至 2026 年 6 月下旬" snapshot phrase. Image `src` paths identical to en. Internal links use `/zh/` prefix (including the cross-link to the prior frontier post, which becomes `/zh/blogs/llama-4-vs-deepseek-v3-vs-qwen3-vs-mistral-large-3`).

- [ ] **Step 2: Build + verify**

```bash
npm run verify
```
Expected: bilingual check passes; internal links resolve; OG meta present.

- [ ] **Step 3: Commit**

```bash
git add src/content/blogs/zh/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1.html
git commit -m "feat(blog): frontier-refresh post — Chinese body"
```

---

## Task 15: Add one combined changelog entry

**Files:**
- Create: `src/content/changelog/entries/2026-06-22-three-hot-topic-blogs.ts`

- [ ] **Step 1: Write the entry**

```ts
import { L } from '../types.ts';

export default {
  date: '2026-06-22',
  title: L(
    'Three new AI Blog posts: computer use, MCP at scale, and the June 2026 frontier refresh',
    'AI 博客新增三篇文章：计算机操作、规模化的 MCP，以及 2026 年 6 月的前沿模型刷新',
  ),
  items: [
    L(
      'Added "Claude Computer Use (post-Vercept) vs Codex Background CU vs Operator vs Gemini" — a four-way architectural comparison of how each lab lets AI drive the mouse, with OSWorld scores and a deployment-vs-safety matrix.',
      '新增《Claude Computer Use（收购 Vercept 后）、Codex 后台 CU、Operator 与 Gemini》——四家实验室让 AI 操作鼠标的架构对比，附 OSWorld 评分与"部署方式 vs 安全模型"矩阵。',
    ),
    L(
      'Added "MCP at 97 Million Downloads" — an essay on how the Model Context Protocol crossed into mainstream agent infrastructure, with the Pinterest production case and the 2026 roadmap.',
      '新增《月下载量 9700 万的 MCP》——一篇关于模型上下文协议如何走入主流智能体基础设施的随笔，包含 Pinterest 的生产案例与 2026 路线图。',
    ),
    L(
      'Added "Claude Mythos 5 vs GPT-5.6 vs Gemini 3.2 vs Qwen 3.7 vs DeepSeek V4.1" — a refresh comparing five frontier-tier models that all shipped inside a two-week window in June 2026.',
      '新增《Claude Mythos 5、GPT-5.6、Gemini 3.2、Qwen 3.7 与 DeepSeek V4.1》——对 2026 年 6 月两周窗口内集中发布的五款前沿级模型的刷新对比。',
    ),
    L(
      'New tags: computer-use, browser-agents, mcp, protocols, ecosystem, closed-source.',
      '新增标签：computer-use、browser-agents、mcp、protocols、ecosystem、closed-source。',
    ),
  ],
};
```

- [ ] **Step 2: Build + test + commit**

```bash
npm run build && node --test --experimental-strip-types scripts/__tests__/changelog.test.mjs
```
Expected: changelog test PASS (filename date prefix matches `date:` field; entry shape valid).

```bash
git add src/content/changelog/entries/2026-06-22-three-hot-topic-blogs.ts
git commit -m "docs(changelog): three new June-2026 hot-topic blog posts"
```

---

## Task 16: Full verification + manual review + date bump + PR

- [ ] **Step 1: Run every gate**

```bash
npm run build
npm run verify
npm test
npm run search:index && npm run test:search
```
Expected: all green, no new warnings. Fix + re-commit anything that fails (do **not** force the gates).

- [ ] **Step 2: Manual browser check — all three posts, both locales**

Run `npm run dev`. For each of the three slugs, open `http://localhost:4321/blogs/<slug>` and verify:
- Lede has the 3px accent left border; no `TL;DR` label visible.
- Every `<figure>` renders the SVG correctly; toggle dark mode and confirm the SVGs theme-adapt (no hard-coded hex bleed-through).
- Left-rail TOC lists every `<h2>` in order; clicking each scrolls to the section.
- Tables don't overflow the article column on narrow viewports.
- The thesis diagram for each post lands the argument visually (Post 1: feature matrix; Post 2: topology; Post 3: release timeline).

Then repeat at `/zh/blogs/<slug>` and confirm internal links navigate within `/zh/`.

- [ ] **Step 3: JSON-LD spot-check per post**

```bash
for slug in claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu mcp-at-97-million-downloads claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1; do
  echo "=== $slug ==="
  grep -o '"@type":"BlogPosting"' dist/blogs/$slug/index.html
  grep -o '"@type":"FAQPage"' dist/blogs/$slug/index.html
done
```
Expected: each slug prints exactly one `BlogPosting` and one `FAQPage` line.

- [ ] **Step 4: Date bump if calendar moved**

If today is past 2026-06-22:
1. Rename all four date-prefixed files (three post `.ts` files + one changelog `.ts` file) from `2026-06-22-` to the new merge date.
2. Update the `date:` field inside each renamed file.
3. Update the "as of late June 2026" snapshot phrase in all six body fragments (en + zh × 3) if the month rolled over.
4. Re-run `npm test` to confirm `blogs.test.mjs` and `changelog.test.mjs` still pass.
5. Amend the relevant commits or add a fixup commit.

- [ ] **Step 5: Push + open PR**

```bash
git push -u origin feature/blog-three-hot-topics-2026-06-22
gh pr create --title "AI Blog: three June-2026 hot-topic posts (computer use, MCP, frontier refresh)" --body "$(cat <<'EOF'
## Summary
- Adds three coordinated AI Blog posts capturing what the AI conversation is centered on in June 2026:
  - **Computer use comparison** — Claude (post-Vercept) vs OpenAI Codex Background CU + Operator vs Gemini, with OSWorld scores and a deployment/safety matrix.
  - **MCP at 97M downloads** — essay on how Model Context Protocol crossed into mainstream agent infrastructure, with the Pinterest production case and the 2026 roadmap.
  - **Frontier model refresh** — five frontier-tier models (Claude Mythos 5, GPT-5.6, Gemini 3.2, Qwen 3.7, DeepSeek V4.1) shipped inside a two-week June 2026 window.
- Bilingual en/zh for all three; ~25 themeable SVGs total; BlogPosting + FAQPage JSON-LD on each; one combined changelog entry.
- Spec: `docs/superpowers/specs/2026-06-22-three-ai-hot-topic-blogs-design.md`
- Plan: `docs/superpowers/plans/2026-06-22-three-ai-hot-topic-blogs.md`

## Test plan
- [ ] `npm run build` (no new warnings)
- [ ] `npm run verify` (bilingual complete, internal links resolve, OG meta on every page)
- [ ] `npm test` (blogs.test.mjs + changelog.test.mjs green)
- [ ] `npm run search:index && npm run test:search`
- [ ] Manual: all three `/blogs/<slug>` + `/zh/blogs/<slug>`, dark mode, TOC, JSON-LD present
- [ ] Citation rigor: every numeric claim (97M MCP downloads, 72.5% OSWorld, 87% Operator, Pinterest 66K/7K, release dates, prices) verified against upstream source
EOF
)"
```

- [ ] **Step 6: Post-merge housekeeping** (after merge)

Sync local `main`:
```bash
cd ../..   # back to main repo
git fetch origin && git checkout main && git pull --ff-only origin main
git worktree remove .worktrees/blog-three-hot-topics
git branch -d feature/blog-three-hot-topics-2026-06-22
```
Confirm live at `https://menuagentic.com/blogs/<each-slug>`.

---

## Self-Review (completed during planning)

- **Spec coverage:** thesis per post → Tasks 5, 9, 13 (en bodies); FAQ Qs per spec → Tasks 5/9/13 step 1 ¶8/¶7/¶10; SVG inventory per spec (4+3+4 diagrams + 4+9+5 logos = 11 diagrams + 18 logos = 29 SVGs total) → Tasks 3/4/7/8/11/12; bilingual fragments → Tasks 5/6, 9/10, 13/14; combined changelog → Task 15; verification gates → Task 16; worktree workflow → Tasks 1, 16; date bump → Task 16 step 4. Citation-rigor list from spec is enforced via the "verify at draft time" reminders threaded through the SVG and body tasks. No gaps.
- **Placeholder scan:** intentional deferrals are (a) prose substance in body tasks (authored against fixed skeletons + spec) and (b) snapshot-dependent SVG cell readings and source URLs (flagged with "verify at draft time" in every relevant step). No stray TODO/undefined references; no "TBD"; no "implement later".
- **Type/path consistency:** the three slugs are spelled identically across all 16 tasks; the branch name `feature/blog-three-hot-topics-2026-06-22` and worktree path `.worktrees/blog-three-hot-topics` are consistent; the tag list in metadata (Task 2) matches the new-tags announcement in the changelog (Task 15); the changelog `date:` field matches the filename prefix.
