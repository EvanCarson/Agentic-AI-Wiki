# AFK Coding Blog Post — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship one new AI Blog post — *AFK Coding: Managing Parallel AI Agents Instead of Typing* — bilingual (en + zh), three SVG diagrams, a FAQ that triggers FAQPage JSON-LD, full cross-linking into existing wiki concepts / field-guide / blog, plus the mandatory changelog entry.

**Architecture:** One post file + two body fragments + three diagrams + one changelog entry. No code changes to `BlogLayout.astro`, `guide.css`, or any manifest — the post must work within the existing system. Authoring conventions are fixed by `src/content/blogs/AUTHORING.md`; the design decisions are in `docs/superpowers/specs/2026-06-01-blog-afk-coding-design.md`. **Both documents are required reading before starting any task.**

**Tech Stack:** Astro static site, body-only HTML fragments rendered via `set:html`, inline SVG (theme-adaptive via CSS custom properties), Node `--experimental-strip-types` for `.ts` content files, `npm test` (node:test) for shape/uniqueness gates.

**On the `[bracketed]` prose directions in this plan.** For prose-heavy sections, individual paragraphs are specified as `[Paragraph N: <claim + cross-links + voice direction>]` rather than written verbatim. These are **paragraph specifications, not "TBD" placeholders to delete.** Each bracket fixes the substance (the claim being made), the concrete cross-link `href`s, and how the paragraph relates to other sections — leaving the implementer the wording (1–3 short sentences per paragraph). Treat them like a function signature: the contract is fixed, the body is yours. Anything that is not a `[bracket]` (HTML structure, headings, table content, FAQ Q-and-A pairs, code blocks) is verbatim and must be copied as-is.

---

## File Structure

Files this plan creates (all paths relative to repo root):

| File | Purpose |
|---|---|
| `src/content/blogs/posts/2026-06-01-afk-coding.ts` | Post metadata (date, slug, bilingual title + summary, tags). |
| `src/content/blogs/en/afk-coding.html` | English body fragment (lede + 8 content sections + FAQ + Further reading). |
| `src/content/blogs/zh/afk-coding.html` | Chinese body fragment, identical structural HTML, faithful translation. |
| `public/blogs/afk-coding/pipeline-six-phase.svg` | Hero diagram: six-phase HITL/AFK pipeline. |
| `public/blogs/afk-coding/slicing-vertical-vs-horizontal.svg` | Comparison diagram: vertical slice vs horizontal layers. |
| `public/blogs/afk-coding/ralph-loop.svg` | Ralph-loop cycle diagram, accent on "fresh context" return arrow. |
| `src/content/changelog/entries/2026-06-01-afk-coding.ts` | One-line bilingual changelog entry (required by `CLAUDE.md`). |

Files this plan touches that already exist: **none.** No manifest edits — the blog manifest globs `posts/*.ts` at build time, the changelog aggregator globs `entries/*.ts`, the SVG inliner globs `<img src="/blogs/...svg">` in the fragment, and the tag index page is generated from the union of all post tags.

**Date convention** — `2026-06-01` is the plan's draft date; per `CLAUDE.md` the filename prefix and the `date:` field inside each `.ts` file must equal **the merge day to `main`**. If the calendar moves before merge, rename three files (post, changelog, and this plan is fine to leave) and bump the inline `date:` fields.

---

## Task 1: Scaffold post metadata + empty bilingual fragments

**Files:**
- Create: `src/content/blogs/posts/2026-06-01-afk-coding.ts`
- Create: `src/content/blogs/en/afk-coding.html`
- Create: `src/content/blogs/zh/afk-coding.html`
- Test: `scripts/__tests__/blogs.test.mjs` (existing — must pass after this task)

- [ ] **Step 1.1: Create the post metadata file**

`src/content/blogs/posts/2026-06-01-afk-coding.ts`:

```ts
import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-01',
  slug: 'afk-coding',
  title: L(
    'AFK Coding: Managing Parallel AI Agents Instead of Typing',
    'AFK 编程：管理并行的 AI 智能体，而不是亲自敲代码',
  ),
  summary: L(
    'Hand an agent a five-point ticket and it quietly deletes the failing test. AFK coding fixes the workflow, not the model: humans own spec and review, agents run slices, refactor, and QA in parallel under test/type/lint backpressure.',
    '把一个五故事点的工单交给智能体，它会悄悄删掉失败的测试。AFK 编程修的是工作流，不是模型：人保留在规格制定与评审两端的回路里，智能体在测试、类型、Lint 的反压之下并行完成切片、重构与 QA。',
  ),
  tags: ['coding-agents', 'workflow', 'developer-tools', 'agentic-qa'],
};

export default post;
```

Notes for the implementer: the `from '../types.ts'` import requires the `.ts` extension because Node's `--experimental-strip-types` loader resolves explicit extensions; without it the manifest test fails with `ERR_MODULE_NOT_FOUND`. The metadata test enforces `date` equals filename date prefix, `slug` equals filename slug, both are bilingual non-empty, every tag matches `^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$`, and the en + zh HTML fragments exist (which is why the next steps create the empty files).

- [ ] **Step 1.2: Create the English fragment scaffold**

`src/content/blogs/en/afk-coding.html`:

```html
<p class="lede">[hook lede — filled in Task 2]</p>

<section>
  <h2>At a glance</h2>
</section>

<section>
  <h2>Why big tickets break agents</h2>
</section>

<section>
  <h2>The six-phase pipeline</h2>
</section>

<section>
  <h2>Vertical slices beat horizontal layers</h2>
</section>

<section>
  <h2>The Ralph loop</h2>
</section>

<section>
  <h2>Backpressure: tests, types, lint</h2>
</section>

<section>
  <h2>Parallelism: git worktrees + agentic QA</h2>
</section>

<section>
  <h2>The human stays the bottleneck</h2>
</section>

<section class="faq">
  <h2>FAQ</h2>
</section>

<section>
  <h2>Further reading</h2>
</section>
```

- [ ] **Step 1.3: Create the Chinese fragment scaffold**

`src/content/blogs/zh/afk-coding.html` — same structural HTML, translated `<h2>` text only:

```html
<p class="lede">[钩子导语——在第 2 步填充]</p>

<section>
  <h2>概览</h2>
</section>

<section>
  <h2>为什么大工单会让智能体翻车</h2>
</section>

<section>
  <h2>六阶段流水线</h2>
</section>

<section>
  <h2>纵向切片胜过横向分层</h2>
</section>

<section>
  <h2>Ralph 循环</h2>
</section>

<section>
  <h2>反压：测试、类型、Lint</h2>
</section>

<section>
  <h2>并行：git worktree 与 Agentic QA</h2>
</section>

<section>
  <h2>瓶颈仍是人</h2>
</section>

<section class="faq">
  <h2>常见问答</h2>
</section>

<section>
  <h2>延伸阅读</h2>
</section>
```

- [ ] **Step 1.4: Run the blogs unit test — expected PASS**

```bash
npm test -- --test-name-pattern='blogs:'
```

Expected: all three `blogs:` tests pass. The test verifies the new post is well-shaped, has a unique slug, and its en + zh fragments exist on disk.

- [ ] **Step 1.5: Build to verify nothing else broke**

```bash
npm run build
```

Expected: build completes, no new warnings. The new post should appear in `dist/blogs/afk-coding/index.html` even though the body is mostly empty `<section>` blocks.

- [ ] **Step 1.6: Commit**

```bash
git add src/content/blogs/posts/2026-06-01-afk-coding.ts \
        src/content/blogs/en/afk-coding.html \
        src/content/blogs/zh/afk-coding.html
git commit -m "AI Blog: scaffold AFK coding post (metadata + bilingual section skeleton)"
```

---

## Task 2: Hook lede (en + zh)

**Files:**
- Modify: `src/content/blogs/en/afk-coding.html` (replace `<p class="lede">[hook lede…]</p>`)
- Modify: `src/content/blogs/zh/afk-coding.html` (replace `<p class="lede">[钩子导语…]</p>`)

The spec's §3 contains the approved draft lede in both languages. Use it verbatim; refine in-place only if the layout shows it reading long.

- [ ] **Step 2.1: Replace the en lede placeholder**

Replace the line `<p class="lede">[hook lede — filled in Task 2]</p>` with:

```html
<p class="lede">Hand an agent a five-point ticket and watch it quietly delete the failing test, paper over a bad refactor, and ship something that compiles but does the wrong thing. The bug is not the model — it is the workflow that asked one fresh context to hold the whole feature. <em>AFK coding</em> trades that single long session for a pipeline: humans stay in the loop for spec and review, agents run <strong>away from the keyboard</strong> on slices, refactor, and QA. The unit of work is no longer a typed line; it is a reviewed slice.</p>
```

Self-test before moving on (per `CLAUDE.md` Document-openers rule): which sentence does the eye-catching work? Sentence one (the diagnostic — *delete the failing test / paper over a bad refactor*). If you can rewrite for tighter punch, do so; otherwise leave as-is.

- [ ] **Step 2.2: Replace the zh lede placeholder**

Replace the line `<p class="lede">[钩子导语——在第 2 步填充]</p>` with:

```html
<p class="lede">给一个智能体丢过去一个五故事点的工单，看着它悄悄删掉失败的测试、糊弄一次糟糕的重构，最后交出一份能编译、却没做对事的代码。锅不在模型，而在让一个新开的上下文扛下整个功能的工作流。<em>AFK 编程</em>用流水线替换那一次性的长会话：人保留在<strong>规格制定</strong>与<strong>评审</strong>两端的回路里，智能体则在切片实现、重构、QA 几个中间环节"离开键盘"地并行运转。工作的最小单位不再是一行敲出来的代码，而是一段被评审过的纵向切片。</p>
```

zh punctuation rule (`AUTHORING.md` §8): full-width in prose (`，` `。` `：` `——` `（）`); inline English product names stay ASCII (*AFK*, *QA* above are fine).

- [ ] **Step 2.3: Build + commit**

```bash
npm run build
git add src/content/blogs/en/afk-coding.html src/content/blogs/zh/afk-coding.html
git commit -m "AI Blog (AFK coding): hook lede (en + zh)"
```

---

## Task 3: §2 At a glance + §3 Why big tickets break agents

These two sections are text-only (no diagrams). Pair them in one commit because they together set the post's initial framing before the hero diagram appears in §4.

**Files:**
- Modify: `src/content/blogs/en/afk-coding.html` (fill the first two `<section>` blocks after the lede)
- Modify: `src/content/blogs/zh/afk-coding.html` (same, faithfully translated)

Cross-links to include (en uses `/concepts/...`, zh uses `/zh/concepts/...`):
- `/concepts/context-windows` — context degradation (cite in §3)
- `/concepts/the-agent-loop` — the loop primitive (cite in §3)
- `/concepts/planning-and-termination` — why long sessions decay (cite in §3)
- `/deep-dives/memory-and-context/context-budgeting` — deep-dive cross-link (cite in §3)

- [ ] **Step 3.1: Author §2 "At a glance" (en)**

Inside `<section><h2>At a glance</h2></section>`, add:

1. One short orienting paragraph (≤2 sentences). Substance: "AFK coding = HITL on the ends (spec, review), AFK in the middle (implementation). It is a workflow shape, not a tool."
2. The six-phase table — exactly four columns (`Phase | Owner | Mode | One-line role`) — matching the spec §4(2):

```html
<table>
  <thead>
    <tr><th>Phase</th><th>Owner</th><th>Mode</th><th>One-line role</th></tr>
  </thead>
  <tbody>
    <tr><td>1. Align on spec</td><td>Human + AI</td><td>HITL</td><td>Interview requirements; produce a PRD.</td></tr>
    <tr><td>2. Slice into vertical tickets</td><td>Agent</td><td>AFK</td><td>End-to-end strips, not horizontal layers.</td></tr>
    <tr><td>3. Ralph loop per slice</td><td>Agent</td><td>AFK</td><td>Fresh context, red-green-refactor, in parallel.</td></tr>
    <tr><td>4. Refactor pass</td><td>Agent</td><td>AFK</td><td>Dedicated cleanup; reduce duplication.</td></tr>
    <tr><td>5. Agentic QA</td><td>Agent</td><td>AFK</td><td>Browser-driven workflow validation.</td></tr>
    <tr><td>6. Human review</td><td>Human</td><td>HITL</td><td>Developer + stakeholder approval.</td></tr>
  </tbody>
</table>
```

3. A short *ticket sizing* paragraph + `<ul>` capturing the spec's rule of thumb:

```html
<p><strong>When to reach for the pipeline.</strong> Ticket size is the trigger:</p>
<ul>
  <li><strong>1–3 story points</strong> — one prompt, one session, ship direct. The pipeline is overkill.</li>
  <li><strong>5+ story points</strong> — a single long context predictably overflows, refactors are skipped, failing tests get quietly deleted instead of fixed. Use the pipeline.</li>
</ul>
```

- [ ] **Step 3.2: Author §2 "概览" (zh)** — same structural HTML, translated prose. Translate the table cells faithfully; keep "HITL"/"AFK"/"PRD" in English. Story-point numbers and `<ul>` structure identical.

- [ ] **Step 3.3: Author §3 "Why big tickets break agents" (en)**

Three `<h3>` subsections under `<section><h2>Why big tickets break agents</h2></section>`. Each subsection is 2–3 short paragraphs.

```html
<h3>Context degradation</h3>
<p>[Lead claim: a long single session burns its useful context budget on early-stage exploration; by the time real implementation starts, the model is reasoning over a compressed-and-stale view of the codebase. See <a href="/concepts/context-windows">context windows</a> and <a href="/deep-dives/memory-and-context/context-budgeting">context budgeting</a> for the underlying mechanics.]</p>
<p>[Second paragraph: what this looks like in practice — duplicated helpers, forgotten conventions, the model "rediscovering" code it already touched.]</p>

<h3>Append, don't restructure</h3>
<p>[Lead claim: under context pressure, agents default to appending new code rather than restructuring existing code. Refactor is the first step skipped.]</p>
<p>[Second paragraph: even in red-green-refactor loops, the *refactor* step is the one most often dropped. Hence the need for a separate refactor pass in the pipeline (§4 phase 4).]</p>

<h3>Silent test deletion</h3>
<p>[Lead claim: when a test fails and pressure mounts, an agent can decide the test is "wrong" and delete it. The session ends green; the bug ships. See <a href="/concepts/planning-and-termination">planning and termination</a> for why a loop that can edit its own success criteria is hazardous.]</p>
<p>[Second paragraph: this is why backpressure (tests, types, lint — see §7) is load-bearing, not optional. Without it, "all tests pass" is uninformative.]</p>
```

The implementer fills the `[bracketed]` prose; the cross-link anchors are pinned. Keep paragraphs short (2–3 sentences). Comparative voice — describe the failure modes, do not retell the spec.

- [ ] **Step 3.4: Author §3 "为什么大工单会让智能体翻车" (zh)** — same structural HTML, three `<h3>` subsections (`<h3>上下文退化</h3>`, `<h3>追加而非重构</h3>`, `<h3>悄悄删测试</h3>`), translated paragraphs. zh internal links use `/zh/concepts/...` and `/zh/deep-dives/...` prefixes.

- [ ] **Step 3.5: Build**

```bash
npm run build
```

Expected: build succeeds; both `dist/blogs/afk-coding/index.html` and `dist/zh/blogs/afk-coding/index.html` contain the new section content.

- [ ] **Step 3.6: Commit**

```bash
git add src/content/blogs/en/afk-coding.html src/content/blogs/zh/afk-coding.html
git commit -m "AI Blog (AFK coding): §2 at a glance + §3 why big tickets break agents (en + zh)"
```

---

## Task 4: §4 The six-phase pipeline + `pipeline-six-phase.svg`

The hero section. Create the SVG and the section that uses it in the same task so the commit is atomic.

**Files:**
- Create: `public/blogs/afk-coding/pipeline-six-phase.svg`
- Modify: `src/content/blogs/en/afk-coding.html` (fill `<section><h2>The six-phase pipeline</h2></section>`)
- Modify: `src/content/blogs/zh/afk-coding.html` (same)

- [ ] **Step 4.1: Create the hero SVG**

`public/blogs/afk-coding/pipeline-six-phase.svg` — six labeled boxes left-to-right, viewBox `0 0 900 500`. HITL endpoints (phase 1 + phase 6) use `var(--accent)` with `label-inv` text; AFK middle steps (phases 2–5) use `var(--paper-2)` with `label` text. Arrows in `currentColor` with the `arr` marker.

**Reference exemplar (copy structure from):** `public/blogs/getting-started-with-openhuman/flow-onboarding.svg` (same horizontal-flow shape, four stages; this one extends to six).

Required SVG structural rules (per `AUTHORING.md` §3):
- Root: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" role="img" aria-labelledby="t d">`
- Children: `<title id="t">AFK coding pipeline: six phases</title>` and `<desc id="d">[2-sentence description of what the diagram shows; mention HITL endpoints vs AFK middle.]</desc>`
- `<defs>` with the `arr` marker (copy from the exemplar).
- `<style>` block defining `.box / .hero / .adj / .label / .label-inv / .sub / .arrow` — copy verbatim from the exemplar; do not introduce bare hex literals except as fallbacks inside `var(...)`.
- Six `<rect>` boxes laid out at x = 30, 175, 320, 465, 610, 755 (each 110 wide, 200 tall, y = 150). Adjust spacing if labels wrap.
- One `<rect class="hero">` style on phases 1 and 6 (HITL endpoints).
- `<rect class="box">` style on phases 2-5 (AFK middle).
- Each phase: phase number (large), phase name (label/label-inv), one-line role (sub/sub-inv), HITL/AFK tag (sub/sub-inv, smaller).
- Five connecting arrows between adjacent phases.
- No `<script>`, no `on*=` handlers, no caption text inside the SVG (use the `<figcaption>` in the HTML).

Verify after writing: `xmllint --noout public/blogs/afk-coding/pipeline-six-phase.svg` — expected exit code 0 (well-formed XML).

- [ ] **Step 4.2: Fill §4 "The six-phase pipeline" (en)**

```html
<figure>
  <img src="/blogs/afk-coding/pipeline-six-phase.svg" alt="Six-phase AFK coding pipeline: align-on-spec and human-review are HITL endpoints (accent-filled); slice, Ralph loop, refactor, and agentic QA are the AFK middle (neutral)." width="900" height="500" loading="lazy" />
  <figcaption>The pipeline that splits judgment (spec, review) from execution (slice, Ralph, refactor, QA). Humans own the endpoints; agents own the middle.</figcaption>
</figure>

<h3>1. Align on spec (HITL)</h3>
<p>[1–2 paragraphs: humans + AI interview requirements, produce a PRD. The output is what every subsequent phase consumes; ambiguity here amplifies downstream.]</p>

<h3>2. Slice into vertical tickets (AFK)</h3>
<p>[1–2 paragraphs: an agent breaks the PRD into vertical slices (each ships complete behavior end-to-end). See §5 for why vertical beats horizontal.]</p>

<h3>3. Ralph loop per slice (AFK)</h3>
<p>[1–2 paragraphs: a fresh-context agent picks one slice, drives it red→green→refactor, commits, exits. Fresh context is the load-bearing detail — see §6.]</p>

<h3>4. Refactor pass (AFK)</h3>
<p>[1–2 paragraphs: a dedicated agent reads the post-Ralph diff and cleans up duplication, extracts shared helpers. Separate from Ralph because Ralph itself skips refactor under pressure.]</p>

<h3>5. Agentic QA (AFK)</h3>
<p>[1–2 paragraphs: a browser-driving agent validates user workflows through accessibility snapshots, not CSS selectors. Catches the "unit tests pass, feature broken" failure mode.]</p>

<h3>6. Human review (HITL)</h3>
<p>[1–2 paragraphs: developer reviews the diff for taste + correctness; the business stakeholder validates the user-facing behavior. Last gate before merge.]</p>
```

- [ ] **Step 4.3: Fill §4 "六阶段流水线" (zh)** — same structural HTML, translated `<h3>` titles (`1. 对齐规格（HITL）`, `2. 切成纵向工单（AFK）`, `3. 每个切片跑 Ralph 循环（AFK）`, `4. 重构通过（AFK）`, `5. Agentic QA（AFK）`, `6. 人工评审（HITL）`), translated paragraphs. Image `src` and `width`/`height` identical to the en version.

- [ ] **Step 4.4: Build + verify the SVG inlined correctly**

```bash
npm run build
grep -q '<title id="t">AFK coding pipeline: six phases</title>' dist/blogs/afk-coding/index.html
```

Expected: `npm run build` succeeds; the `grep` exits 0 (proves `BlogLayout.inlineSvgs()` inlined the SVG into the rendered HTML, so theme vars resolve against the page).

- [ ] **Step 4.5: Commit**

```bash
git add public/blogs/afk-coding/pipeline-six-phase.svg \
        src/content/blogs/en/afk-coding.html \
        src/content/blogs/zh/afk-coding.html
git commit -m "AI Blog (AFK coding): §4 hero — six-phase pipeline + diagram (en + zh)"
```

---

## Task 5: §5 Vertical slices beat horizontal layers + `slicing-vertical-vs-horizontal.svg`

**Files:**
- Create: `public/blogs/afk-coding/slicing-vertical-vs-horizontal.svg`
- Modify: `src/content/blogs/{en,zh}/afk-coding.html` (fill `<section><h2>Vertical slices beat horizontal layers</h2></section>`)

Cross-links: `/deep-dives/architectures-and-patterns/single-vs-multi-agent` (zh: `/zh/deep-dives/architectures-and-patterns/single-vs-multi-agent`) — adjacent topic on scoping units of agent work. Include only as a "see also" sentence; don't force the link into the prose flow if it reads awkward.

- [ ] **Step 5.1: Create the comparison SVG**

`public/blogs/afk-coding/slicing-vertical-vs-horizontal.svg` — viewBox `0 0 900 400`. Two side-by-side panels:

- **Left panel (x = 30 to 430)** — horizontal layers, neutral (`var(--paper-2)` boxes). Three stacked strips labeled *Frontend*, *Backend*, *Tests*. A red `var(--accent)`-stroked dependency arrow looping back from *Tests* to *Backend* to *Frontend* to mark the blocking chain.
- **Right panel (x = 470 to 870)** — vertical slices, accent (`var(--accent)` boxes for the slice "spines", `var(--accent-soft)` for the per-layer cells inside each slice). Three side-by-side slices, each spanning all three layers (Frontend / Backend / Tests rows). Independence indicated by no inter-slice arrows.
- A horizontal label band at the top: `Horizontal layers (blocking)` left, `Vertical slices (independent)` right.

`role="img"`, `<title>`/`<desc>`/`aria-labelledby="t d"`. No caption inside the SVG. Reference exemplar: `public/blogs/openclaw-vs-openhuman-vs-hermes-agent/arch-*.svg` for the two-panel layout pattern.

Verify: `xmllint --noout public/blogs/afk-coding/slicing-vertical-vs-horizontal.svg`.

- [ ] **Step 5.2: Author §5 (en)**

```html
<figure>
  <img src="/blogs/afk-coding/slicing-vertical-vs-horizontal.svg" alt="Side-by-side comparison: left panel shows three horizontal strips (Frontend, Backend, Tests) chained by a dependency arrow; right panel shows three vertical slices, each spanning all three layers, with no inter-slice dependencies." width="900" height="400" loading="lazy" />
  <figcaption>Horizontal layers chain failure; vertical slices isolate it. Each vertical slice ships complete behavior on its own.</figcaption>
</figure>

<p>[Comparative paragraph 1: the failure mode of horizontal slicing. Frontend agent finishes first but blocks on backend; backend blocks on tests; one failed agent stops the whole release. Reviewer cannot ship "frontend done, backend pending" because nothing works end-to-end yet.]</p>

<p>[Comparative paragraph 2: vertical slices invert the dependency graph. Each slice carries its own frontend, backend, and test changes — so a partial-pipeline failure leaves the merged slices fully working. Parallelism becomes safe: any subset of completed slices is shippable.]</p>

<p>[Comparative paragraph 3: the implication for the AFK loop. The Ralph loop (§6) operates per-slice precisely because slices are independent units of "done"; without that property, Ralph cannot commit and exit. <a href="/deep-dives/architectures-and-patterns/single-vs-multi-agent">single vs multi-agent</a> covers the related question of how many agents to run in parallel.]</p>
```

Note the *comparative* voice — each paragraph addresses both slicing strategies across the same axis, not three sequential descriptions of one strategy (per `AUTHORING.md` §11 "things that hurt the post").

- [ ] **Step 5.3: Author §5 "纵向切片胜过横向分层" (zh)** — same structural HTML, faithful translation. zh internal link: `/zh/deep-dives/architectures-and-patterns/single-vs-multi-agent`.

- [ ] **Step 5.4: Build**

```bash
npm run build
```

Expected: success.

- [ ] **Step 5.5: Commit**

```bash
git add public/blogs/afk-coding/slicing-vertical-vs-horizontal.svg \
        src/content/blogs/en/afk-coding.html \
        src/content/blogs/zh/afk-coding.html
git commit -m "AI Blog (AFK coding): §5 vertical slices + comparison diagram (en + zh)"
```

---

## Task 6: §6 The Ralph loop + `ralph-loop.svg`

**Files:**
- Create: `public/blogs/afk-coding/ralph-loop.svg`
- Modify: `src/content/blogs/{en,zh}/afk-coding.html` (fill `<section><h2>The Ralph loop</h2></section>`)

Cross-links: `/concepts/the-agent-loop`, `/concepts/planning-and-termination`, `/field-guide/code-agents` (en); same with `/zh/...` prefix (zh).

- [ ] **Step 6.1: Create the Ralph-loop SVG**

`public/blogs/afk-coding/ralph-loop.svg` — viewBox `0 0 900 400`. A cycle of five labeled boxes arranged in a circle (or pentagonal layout), connected by arrows. Loop nodes:

1. *Read prompt file* (lists unchecked tasks) — `box`
2. *Pick one unchecked task* — `box`
3. *Implement (red → green → refactor)* — `adj`
4. *Commit* — `box`
5. *Fresh context, re-launch* — `hero` (accent, the load-bearing detail)

The return arrow from node 5 → node 1 carries the accent emphasis (stroke: `var(--accent)`, opacity 1.0). Other arrows are `currentColor` opacity .70. A short label band below: *"Many cheap runs converge better than one perfect attempt"*.

Required SVG hygiene (same as Task 4.1).

Verify: `xmllint --noout public/blogs/afk-coding/ralph-loop.svg`.

- [ ] **Step 6.2: Author §6 (en)**

```html
<figure>
  <img src="/blogs/afk-coding/ralph-loop.svg" alt="Five-node cycle: read prompt file, pick one unchecked task, implement red-green-refactor, commit, fresh context. The 'fresh context' return arrow is accent-coloured." width="900" height="400" loading="lazy" />
  <figcaption>The Ralph loop. The accent-coloured return arrow — <em>fresh context</em> — is the load-bearing detail.</figcaption>
</figure>

<p>[Paragraph 1: what the loop is mechanically. A shell pattern: launch an agent, read a prompt file listing unchecked tasks (one Markdown file with `- [ ]` items), implement the first one, commit, exit. The next iteration starts a brand-new agent context. Credit Geoffrey Huntley's original write-up.]</p>

<p>[Paragraph 2: why fresh context every iteration is the trick. The agent never accumulates the kind of compressed-and-stale state that <a href="/concepts/context-windows">long contexts</a> develop. Each iteration is a small problem in a small budget. See <a href="/concepts/the-agent-loop">the agent loop</a> for the underlying primitive.]</p>

<p>[Paragraph 3: the counter-intuitive part. <q>The technique is deterministically bad in an undeterministic world</q> — many cheap runs converge on a working answer better than one perfect attempt at a long horizon. <a href="/concepts/planning-and-termination">planning and termination</a> for why a loop with a clean exit beats an open-ended one. <a href="/field-guide/code-agents">Code agents</a> in the field guide is the related practitioner chapter.]</p>
```

- [ ] **Step 6.3: Author §6 "Ralph 循环" (zh)** — same structure, faithful translation. Keep "Ralph"/"red → green → refactor" in English. zh internal links use `/zh/...` prefix.

- [ ] **Step 6.4: Build + commit**

```bash
npm run build
git add public/blogs/afk-coding/ralph-loop.svg \
        src/content/blogs/en/afk-coding.html \
        src/content/blogs/zh/afk-coding.html
git commit -m "AI Blog (AFK coding): §6 Ralph loop + cycle diagram (en + zh)"
```

---

## Task 7: §7 Backpressure + §8 Parallelism + §9 The human stays the bottleneck

Three short text-only sections in one commit — together they form the post's *practitioner's caveats* arc.

**Files:**
- Modify: `src/content/blogs/{en,zh}/afk-coding.html` (fill all three remaining content `<section>` blocks)

Cross-links:
- §7 Backpressure → `/concepts/guardrails-101`, `/concepts/evals-101`
- §8 Parallelism → `/field-guide/computer-use`, `/field-guide/multi-agent`, `/blogs/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider`, `/deep-dives/multi-agent-systems/multi-agent-topologies`
- §9 Bottleneck → `/concepts/autonomy-levels`, `/concepts/when-to-use-an-agent`

- [ ] **Step 7.1: Author §7 "Backpressure: tests, types, lint" (en)**

```html
<p>[Lead paragraph: tests, strict types, and lint rules are what stop §3's failure modes at the gate. The agent cannot decide a failing test is "wrong" and delete it if the loop exits non-zero on a deleted test; cannot append unrelated code if the linter blocks unused imports; cannot lie about types if the type-checker refuses to compile.]</p>

<p>[Paragraph 2: why this is not optional. Without backpressure, "all tests pass" is a free variable the agent will optimize. With backpressure, the same phrase is information. <a href="/concepts/guardrails-101">Guardrails 101</a> covers the broader pattern; <a href="/concepts/evals-101">evals 101</a> covers how to make the test suite itself trustworthy in the first place.]</p>

<p>[Paragraph 3: practical setup. Before turning on the AFK pipeline, ensure (a) test coverage of the surface area you care about, (b) strict types or equivalent, (c) lint rules that fail the build, not just warn. Without all three, the loop is open-loop control of code generation. The pipeline is only as strong as the weakest gate.]</p>
```

- [ ] **Step 7.2: Author §7 "反压：测试、类型、Lint" (zh)** — same structure, faithful translation. `/zh/...` for internal links. "Lint" stays English.

- [ ] **Step 7.3: Author §8 "Parallelism: git worktrees + agentic QA" (en)**

```html
<p>[Paragraph 1: the parallelism mechanic. Git worktrees give each agent an isolated checkout sharing one repo — multiple agents can work on multiple slices simultaneously without trampling each other's working tree. Per-agent log files surface what each one is doing without crowding one terminal. See <a href="/deep-dives/multi-agent-systems/multi-agent-topologies">multi-agent topologies</a> for the design space of how agents coordinate.]</p>

<p>[Paragraph 2: agentic QA closes the gap. A unit test green-lights a function; it does not green-light the feature. <a href="/field-guide/computer-use">Computer-use</a> agents — drivers like <code>agent-browser</code> — exercise the actual user workflow through accessibility snapshots rather than brittle CSS selectors. The gap between "unit tests pass" and "the button does the right thing when clicked" closes here, not in §7.]</p>

<p>[Paragraph 3: choosing the harness. <a href="/field-guide/multi-agent">Multi-agent</a> in the field guide and the existing <a href="/blogs/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider">coding-agent comparison post</a> cover the trade-offs between Claude Code's task-list runner, Codex CLI's sandboxed VM, Cursor's IDE-mediated agent, and Aider's commit-per-edit style. The pipeline is harness-agnostic; the choice is taste plus your existing toolchain.]</p>
```

- [ ] **Step 7.4: Author §8 "并行：git worktree 与 Agentic QA" (zh)** — same structure. Keep "git worktree", "agent-browser", "CSS", "Claude Code", "Codex CLI", "Cursor", "Aider" in English. `/zh/...` internal links.

- [ ] **Step 7.5: Author §9 "The human stays the bottleneck" (en)**

```html
<p>[Paragraph 1: parallelism is bounded by review capacity, not agent capacity. Stack ten parallel agents in front of one reviewer and the queue grows; ship rate is capped by the slowest gate, which by design is human review (phase 6). The temptation to scale parallel agents past review capacity is the most common shape of the failure described next.]</p>

<p>[Paragraph 2: Simon Willison's caveat — AI tooling intensifies work rather than reducing it. The pipeline does not buy time; it shifts where time goes. Spec interviews + reviews become the long phases; typing becomes negligible. Burnout from compulsive task-stacking is a real failure mode. See <a href="/concepts/autonomy-levels">autonomy levels</a> for the framing of where humans stay in the loop.]</p>

<p>[Paragraph 3: when not to reach for AFK at all. <a href="/concepts/when-to-use-an-agent">When to use an agent</a> remains the right starting question. If the work is small (§2 ticket-sizing rule), or the spec is genuinely ambiguous (no PRD = no slices), or the codebase lacks the backpressure of §7, the pipeline is friction not leverage. Use the right tool for the size of the problem.]</p>
```

- [ ] **Step 7.6: Author §9 "瓶颈仍是人" (zh)** — same structure, faithful translation. `/zh/...` internal links.

- [ ] **Step 7.7: Build + commit**

```bash
npm run build
git add src/content/blogs/en/afk-coding.html src/content/blogs/zh/afk-coding.html
git commit -m "AI Blog (AFK coding): §7 backpressure + §8 parallelism + §9 bottleneck (en + zh)"
```

---

## Task 8: §10 FAQ + §11 Further reading

Two short, structural sections. The FAQ is **load-bearing** — `BlogLayout` parses `<section class="faq">` for `<h3>` Q + immediately-following `<p>` A pairs and emits a `FAQPage` JSON-LD block. Constraints (from `AUTHORING.md` §7):

- Every `<h3>` MUST be followed by a `<p>` with no other tag between them.
- Do NOT nest `<section>` inside `class="faq"` — the parser bails at the first `</section>`.

**Files:**
- Modify: `src/content/blogs/{en,zh}/afk-coding.html` (fill the last two `<section>` blocks)

- [ ] **Step 8.1: Author §10 FAQ (en)**

Inside `<section class="faq"><h2>FAQ</h2>...</section>`, five Q/A pairs (each strictly `<h3>` + `<p>`):

```html
<h3>What ticket size is too small for the AFK pipeline?</h3>
<p>1–3 story points. The setup tax of slicing, parallel agents, and review queueing dwarfs the saving on a small task. One prompt, one session, ship it.</p>

<h3>Do I need four agents running in parallel?</h3>
<p>No. Start with one slice + Ralph + agentic QA on a single branch; add parallelism only when your review capacity (§9) is genuinely the bottleneck, not your agent count.</p>

<h3>What if I do not have eval coverage yet?</h3>
<p>Build the tests first, then turn the pipeline on. Without backpressure (§7) the agent's "green" is uninformative; the pipeline amplifies that problem rather than fixing it.</p>

<h3>Is this only for greenfield code?</h3>
<p>No, but legacy code raises the cost of vertical slicing — finding clean end-to-end strips through a tangled codebase eats spec time. Budget for the spec phase; the rest of the pipeline runs the same.</p>

<h3>How is this different from "just running an agent overnight"?</h3>
<p>Fresh contexts per iteration, backpressure at every gate, and agentic QA — the differences are at the joints, not the duration. Judgment stays at the ends; execution scales in the middle.</p>
```

- [ ] **Step 8.2: Author §10 "常见问答" (zh)** — same structure, faithful translations. **Critical:** maintain the strict `<h3>` Q → `<p>` A adjacency; do not insert `<br>`, `<ul>`, nested `<section>`, or any other element between them. Five pairs.

- [ ] **Step 8.3: Author §11 "Further reading" (en)**

```html
<h3>On this wiki:</h3>
<ul>
  <li><a href="/concepts/the-agent-loop">The agent loop</a> — the primitive the Ralph loop builds on.</li>
  <li><a href="/concepts/context-windows">Context windows</a> — why long sessions decay.</li>
  <li><a href="/concepts/planning-and-termination">Planning and termination</a> — clean exits beat open-ended loops.</li>
  <li><a href="/concepts/guardrails-101">Guardrails 101</a> — the backpressure family.</li>
  <li><a href="/concepts/evals-101">Evals 101</a> — make "green" mean something.</li>
  <li><a href="/concepts/autonomy-levels">Autonomy levels</a> — where the human stays in the loop.</li>
  <li><a href="/concepts/when-to-use-an-agent">When to use an agent</a> — the right-tool-for-the-job question.</li>
  <li><a href="/field-guide/code-agents">Code agents</a> — the practitioner chapter.</li>
  <li><a href="/field-guide/computer-use">Computer use</a> — browser-driven QA agents.</li>
  <li><a href="/field-guide/multi-agent">Multi-agent</a> — coordinating several agents.</li>
  <li><a href="/deep-dives/memory-and-context/context-budgeting">Context budgeting</a> — managing the limited budget.</li>
  <li><a href="/deep-dives/architectures-and-patterns/single-vs-multi-agent">Single vs multi-agent</a> — scope of one agent's work.</li>
  <li><a href="/deep-dives/multi-agent-systems/multi-agent-topologies">Multi-agent topologies</a> — how agents coordinate.</li>
  <li><a href="/blogs/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider">Claude Code vs Codex CLI vs Cursor Agent vs Aider</a> — picking the harness.</li>
</ul>

<h3>Sources:</h3>
<ul>
  <li>Alex Op — <a href="https://alexop.dev/posts/how-to-do-afk-coding/" rel="noopener noreferrer">How to do AFK coding</a>. The piece this post builds on; read it for the original framing and pixel-art diagrams.</li>
  <li>Geoffrey Huntley — original write-up of the Ralph loop pattern (linked from Alex Op's piece).</li>
  <li>Simon Willison — public commentary on AI tooling intensifying rather than reducing work; relevant to §9.</li>
  <li>Lee Robinson — <em>"Writing code was never really the bottleneck, especially for larger projects"</em> (quoted by Alex Op).</li>
  <li>Anthropic-internal productivity figures (tripled headcount, 70% productivity climb, 80–90% of Claude Code self-written) — quoted in Alex Op's piece. We surface them as attributed, not asserted.</li>
</ul>
```

The full internal-link list is intentionally exhaustive — every cross-link referenced in the body section above plus the *related* pages the reader is likely to want next. The `check-internal-links.mjs` script in `npm run verify` will catch any path that does not resolve to an actual page.

- [ ] **Step 8.4: Author §11 "延伸阅读" (zh)** — same structure, **all internal `href`s prefixed with `/zh/`**, translated `<li>` descriptions. External (Sources) links keep their original URLs; descriptions translated.

- [ ] **Step 8.5: Build + verify the JSON-LD blocks emit**

```bash
npm run build
grep -o '"@type":"BlogPosting"' dist/blogs/afk-coding/index.html
grep -o '"@type":"FAQPage"'     dist/blogs/afk-coding/index.html
```

Expected: each `grep` exits 0 (one match). If `FAQPage` is missing, the most likely cause is an element snuck between an `<h3>` and its `<p>` inside the FAQ section — re-check §10.

- [ ] **Step 8.6: Commit**

```bash
git add src/content/blogs/en/afk-coding.html src/content/blogs/zh/afk-coding.html
git commit -m "AI Blog (AFK coding): §10 FAQ + §11 further reading (en + zh)"
```

---

## Task 9: Changelog entry

**Files:**
- Create: `src/content/changelog/entries/2026-06-01-afk-coding.ts`
- Test: `scripts/__tests__/changelog.test.mjs` (existing — must pass)

- [ ] **Step 9.1: Create the changelog entry**

`src/content/changelog/entries/2026-06-01-afk-coding.ts`:

```ts
import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-06-01',
  title: L(
    'New AI Blog post: AFK coding',
    '新增 AI Blog 文章：AFK 编程',
  ),
  items: [
    L(
      'New AI Blog post — AFK coding: a six-phase pipeline that splits judgment (spec, review) from execution (vertical slices, Ralph loop, refactor, agentic QA). Three new diagrams (hero pipeline, vertical-vs-horizontal slicing, Ralph cycle), an FAQ, bilingual en/zh, cross-links into concepts / field-guide / deep-dives / the coding-agent comparison post.',
      '新增 AI Blog 文章——AFK 编程：用一条六阶段流水线，把判断（规格、评审）和执行（纵向切片、Ralph 循环、重构、Agentic QA）拆到两端。配三张全新示意图（六阶段流水线、纵向 vs 横向切片对比、Ralph 循环），一组常见问答，中英双语，并交叉链接到概念、Field Guide、深入解析与编码智能体对比文章。',
    ),
  ],
};

export default entry;
```

- [ ] **Step 9.2: Run the changelog test — expected PASS**

```bash
npm test -- --test-name-pattern='changelog'
```

Expected: all changelog tests pass. The test enforces filename date prefix equals the entry's `date` field and the entry is well-shaped bilingual.

- [ ] **Step 9.3: Commit**

```bash
git add src/content/changelog/entries/2026-06-01-afk-coding.ts
git commit -m "Changelog: AI Blog AFK coding post"
```

---

## Task 10: Full verification gates + manual QA

The final task. Runs every gate `CLAUDE.md` + `AUTHORING.md` require before merge. Each sub-step is independent — if one fails, fix in place and re-run.

**Files:** no changes; this task verifies prior work.

- [ ] **Step 10.1: Bump date if calendar has moved**

If today's date is past `2026-06-01`, rename three files and bump their inline `date:` fields to today (the actual merge day):

```bash
# Example for a merge on 2026-06-03:
git mv src/content/blogs/posts/2026-06-01-afk-coding.ts \
       src/content/blogs/posts/2026-06-03-afk-coding.ts
git mv src/content/changelog/entries/2026-06-01-afk-coding.ts \
       src/content/changelog/entries/2026-06-03-afk-coding.ts
```

Then edit both files to update the `date:` field. The `blogs.test.mjs` and `changelog.test.mjs` tests both enforce `filename-date-prefix === inline-date`.

- [ ] **Step 10.2: `npm run build`**

```bash
npm run build
```

Expected: build succeeds with no new warnings. The new post route lives at `dist/blogs/afk-coding/index.html` and `dist/zh/blogs/afk-coding/index.html`.

- [ ] **Step 10.3: `npm run verify`**

```bash
npm run verify
```

Expected: passes. This runs `build` again, then `verify-chapters.mjs` (bilingual completeness), `check-internal-links.mjs` (every `<a href>` resolves), and `verify-og.mjs` (OG meta on every page). If `check-internal-links.mjs` flags an unresolved path, fix the path in the en + zh fragments and re-run.

- [ ] **Step 10.4: `npm test`**

```bash
npm test
```

Expected: all suites pass — incl. `blogs.test.mjs` (post shape, slug uniqueness, bilingual fragments) and `changelog.test.mjs` (entry shape, date-prefix match).

- [ ] **Step 10.5: Search index + search test**

```bash
npm run search:index && npm run test:search
```

Expected: pagefind builds the index and `search-index.test.mjs` passes. The new post should be discoverable.

- [ ] **Step 10.6: JSON-LD spot-check**

```bash
grep -o '"@type":"BlogPosting"' dist/blogs/afk-coding/index.html
grep -o '"@type":"FAQPage"'     dist/blogs/afk-coding/index.html
grep -o '"@type":"BlogPosting"' dist/zh/blogs/afk-coding/index.html
grep -o '"@type":"FAQPage"'     dist/zh/blogs/afk-coding/index.html
```

Expected: each `grep` exits 0 (one match). If a `FAQPage` block is missing on either locale, an element snuck between the `<h3>` and `<p>` in §10 — re-check.

- [ ] **Step 10.7: Manual browser pass — en**

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:4321/blogs/afk-coding`. Verify:
- Hook lede renders with the 3px accent left border.
- Section h2s carry the italic accent counter prefix (`01`, `02`, …).
- All three diagrams render (not broken-image icons) and theme-adapt when you toggle dark mode (look for the theme toggle in the site header).
- The left-rail in-page TOC lists all 10 `<h2>` sections and scrolls smoothly when clicked.
- Inline `<code>`, `<table>`, `<blockquote>` typography all match the existing blog posts.

- [ ] **Step 10.8: Manual browser pass — zh**

Open `http://localhost:4321/zh/blogs/afk-coding`. Verify:
- Lede + section h2s in zh.
- All internal `<a href>`s point under `/zh/...` — click one and confirm it resolves (do not land on a 404 or the en version).
- Diagrams render identically (image `src` is locale-agnostic).
- `<figcaption>` is translated.

- [ ] **Step 10.9: Tag pages spot-check**

`http://localhost:4321/blogs/tag/workflow` and `http://localhost:4321/blogs/tag/agentic-qa` should each be a generated index page listing this post (these are new tags this post introduces). `coding-agents` and `developer-tools` are pre-existing tags; both index pages should now list this post alongside the existing entries.

- [ ] **Step 10.10: Final commit if anything was fixed in steps 10.1–10.9**

Any fix found during manual QA goes into a small follow-up commit on the same branch:

```bash
git add <changed files>
git commit -m "AI Blog (AFK coding): <one-line description of the fix>"
```

If no fixes were needed, no commit is created — the branch is ready for PR.

- [ ] **Step 10.11: Open the PR (after explicit user confirmation)**

Do **not** push or open the PR without the user explicitly asking. When asked:

```bash
git push -u origin blog/afk-coding
gh pr create --title "AI Blog: AFK Coding (managing parallel AI agents instead of typing)" \
  --body "$(cat <<'EOF'
## Summary
- New AI Blog post: *AFK Coding: Managing Parallel AI Agents Instead of Typing* — bilingual (en + zh).
- Three new SVG diagrams: hero six-phase pipeline, vertical-vs-horizontal slicing comparison, Ralph-loop cycle.
- Cross-links into existing concepts, field-guide chapters, deep-dives, and the prior coding-agent comparison post.
- Two new tags introduced (`workflow`, `agentic-qa`); reuses `coding-agents` and `developer-tools`.
- Mandatory changelog entry.

Inspired by Alex Op's "How to do AFK coding" (alexop.dev). Original prose; third-party numeric claims attributed to the source, not asserted as wiki fact. Spec at `docs/superpowers/specs/2026-06-01-blog-afk-coding-design.md`.

## Test plan
- [x] `npm run build` — no new warnings
- [x] `npm run verify` — bilingual completeness, internal links resolve, OG meta present
- [x] `npm test` — `blogs.test.mjs` + `changelog.test.mjs` green
- [x] `npm run search:index && npm run test:search` — green
- [x] Manual: en + zh detail pages render, diagrams theme-adapt, FAQ JSON-LD present on both locales, tag index pages list the post

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

After merge, follow the `CLAUDE.md` Workflow: sync local `main` to `origin/main`, remove the merged worktree + branch, and confirm the live site.
