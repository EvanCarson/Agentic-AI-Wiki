# P0 Content Enrichment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author the 18 P0 entries the IA expansion's §10 backlog called out as "needed so the section feels coherent at launch" — 3 Concepts mirrors + 7 Playbooks + 8 Operations — shipped as three parallel PRs (one per section).

**Architecture:** Three parallel worktrees off `origin/main`, each producing one squash-merged PR. Each worktree adds bilingual `<slug>.html` fragments under `src/content/<section>/{en,zh}/` and one registration line per entry in the destination group file (or `concepts/manifest.ts`). No code or layout changes — content only, plus one changelog entry per PR.

**Tech Stack:** Astro 4 (static), bilingual EN/ZH HTML fragments using the existing `src/styles/guide.css` class vocabulary (`.phase`, `.step`, `.callout`, `<pre class="standalone">`), Node test runner with `--experimental-strip-types`. Vercel auto-deploys on push to `main`.

**Source spec:** `docs/superpowers/specs/2026-05-22-content-p0-enrichment-design.md`

---

## Conventions for every task

These apply across all phases. The per-entry tasks below DO NOT repeat them.

**Worktrees:**
- Phase 1 worktree: `/Users/cq/Git/agentic-ai-wiki/.worktrees/p0-content-concepts` on branch `feat/p0-content-concepts`.
- Phase 2 worktree: `/Users/cq/Git/agentic-ai-wiki/.worktrees/p0-content-playbooks` on branch `feat/p0-content-playbooks`.
- Phase 3 worktree: `/Users/cq/Git/agentic-ai-wiki/.worktrees/p0-content-operations` on branch `feat/p0-content-operations`.
- All three branched from `origin/main` (per memory: local `main` lags `origin/main` on this repo).
- All paths in the plan are relative to whichever worktree root the current phase is in.

**Per-entry workflow** (used by every "Author <slug>" task):
1. Read the two sibling files named in the task to anchor voice and ZH register.
2. Write `src/content/<section>/en/<slug>.html` matching the body skeleton in spec §3.2 — 4–6 steps, 1–2 callouts, 50–120 lines total. Use the kicker line and phase-num given in the task. Use the EN summary in the spec as the thesis (`<p class="goal">`) and the EN title as the `<h2>`.
3. Write `src/content/<section>/zh/<slug>.html` — same step count, same callout count, same structure, fluent native ZH (NOT a literal token map). Sample siblings' ZH register. Any `<pre>` block content must be byte-identical between EN and ZH (translate prose only).
4. Add the registration line shown in the task to the destination group file (or `concepts/manifest.ts`) at the configured position.
5. Run the verification gates: `npm run build && npm run verify && npm test`. All three must pass.
6. Commit. Subject is given per task; body is empty unless noted; trailer is the Claude `Co-Authored-By` line shown below.

**Commit trailer (every commit, all phases):**
```
Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

**HTML body skeleton (every entry uses this — fill in your own prose):**
```html
<section class="phase">
  <div class="phase-num">XX</div>                                  <!-- given per task -->
  <div class="week">Kicker · Group Name</div>                      <!-- given per task -->
  <h2>One-sentence thesis (matches EN title in spec).</h2>
  <p class="goal">Two-to-four sentence framing (paraphrases EN summary in spec; sharper than the summary, scoped to who the essay is for).</p>

  <div class="step">
    <div class="step-num">STEP 1</div>
    <h3>First section heading</h3>
    <p>Prose. 1–3 paragraphs.</p>
    <!-- optional callout: <div class="callout"><p>…</p></div> or .callout.danger / .callout.tip -->
  </div>

  <!-- 3–5 more <div class="step"> blocks -->

  <div class="step">
    <div class="step-num">STEP N</div>
    <h3>Closing / what to take away</h3>
    <p>Final paragraph.</p>
  </div>
</section>
```

**Verification gates (run after EACH entry):**
```bash
npm run build      # static build to dist/ — no new warnings
npm run verify     # bilingual completeness + check-internal-links.mjs
npm test           # extraction unit tests + manifest tests
```

All three must pass before committing. If any fails, fix before moving to the next entry.

**Cross-link policy (from spec §5):**
- DO NOT populate the `related` field on any new entry. Deferred to a follow-up sweep PR.
- DO add 1–3 in-prose `<a href="/<section>/<group>/<slug>">` links to existing entries where it sharpens a sentence. Use the full new-style URL. Suggested pairings in spec §5.3.

**Source-of-truth for every entry's metadata:** spec §4 (slug, EN/ZH title, EN/ZH summary, group, position). The per-entry tasks inline the registration code so you don't have to flip between docs.

---

## Phase 0 — Design PR (already on this branch)

The spec and this plan live on branch `feat/content-p0-enrichment` (worktree `.worktrees/feat-content-p0-enrichment`). This phase wraps them up as a docs-only PR so the three implementation PRs reference a merged path.

### Task 0.1: Push & open the design PR

**Files:** none modified

- [ ] **Step 1: Push the branch from the design worktree**

Run (from the design worktree, `.worktrees/feat-content-p0-enrichment`):
```bash
git push -u origin feat/content-p0-enrichment
```

- [ ] **Step 2: Open the PR**

Run (from the same worktree):
```bash
gh pr create --title "Design: P0 content enrichment (spec + plan)" --body "$(cat <<'EOF'
## Summary
- Spec covering the 18 P0 entries called out in the IA expansion spec §10 (3 Concepts + 7 Playbooks + 8 Operations).
- Implementation plan with three parallel content PRs.
- No site changes; `docs/superpowers/` only.

Refs the IA expansion design at `docs/superpowers/specs/2026-05-19-content-ia-expansion-design.md`.

## Test plan
- [x] No site code changed; build is unaffected.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 3: Confirm the PR opened**

Run: `gh pr view --json url -q .url`
Expected: a PR URL printed.

Phase 0 is independent of Phases 1–3. The design PR can merge first, last, or in parallel; the implementation PRs do not depend on its merge.

---

## Phase 1 — Concepts P0 PR (3 entries)

Single group file touched: `src/content/concepts/manifest.ts`. Three bilingual fragments. Branch: `feat/p0-content-concepts`.

### Task 1.0: Set up the Concepts worktree

**Files:** none yet

- [ ] **Step 1: Fetch origin and create the worktree**

Run (from `/Users/cq/Git/agentic-ai-wiki`):
```bash
git fetch origin main
git worktree add .worktrees/p0-content-concepts -b feat/p0-content-concepts origin/main
```

Expected: `Preparing worktree (new branch 'feat/p0-content-concepts')` and `HEAD is now at <commit> ...`.

- [ ] **Step 2: Install dependencies in the worktree**

Run (from `.worktrees/p0-content-concepts`):
```bash
npm ci
```

Expected: clean install; no errors.

- [ ] **Step 3: Confirm gates are green BEFORE any edits**

Run (from `.worktrees/p0-content-concepts`):
```bash
npm run build && npm run verify && npm test
```

Expected: all pass. This is the baseline; subsequent entries are added against a known-green state.

### Task 1.1: Author `prompt-injection-101` (tracer entry)

This is the Concepts tracer — drafted first, full gate cycle, before any other Concepts entry. Catches any structural / registration issue at entry #1 rather than entry #3.

**Files:**
- Create: `src/content/concepts/en/prompt-injection-101.html`
- Create: `src/content/concepts/zh/prompt-injection-101.html`
- Modify: `src/content/concepts/manifest.ts` (insert at position 17, after `agentic-risks-intro`)

**Entry metadata:**
- Slug: `prompt-injection-101`
- Page: `prompt-injection-101`
- EN title: `Prompt injection, in plain words`
- ZH title: `用大白话讲提示词注入`
- EN summary: `What prompt injection actually is, why it's not a bug a vendor can patch, and the three real defenses available to you.`
- ZH summary: `提示词注入究竟是什么、为何它不是哪家厂商能打补丁的 bug，以及你真正能用的三种防御手段。`
- Group: `L('Agentic AI','智能体 AI')`
- Phase-num: `A9` (next free in Agentic AI prefix; A1–A8 used)
- EN kicker: `Concepts · Agentic AI Explained`
- ZH kicker: `概念 · 智能体 AI 详解`

**Sibling files to sample (for voice + ZH register):**
- `src/content/concepts/en/agentic-risks-intro.html` (same group, A8)
- `src/content/concepts/zh/agentic-risks-intro.html` (ZH register anchor)

**Topic coverage** (cover, in order):
1. What prompt injection IS at the token-stream level (instructions and data share one channel; no cryptographic boundary).
2. Direct vs indirect injection — concrete example of each, one paragraph.
3. Why no vendor can "fix" it (it's a property of the architecture, not a bug — analogy: SQL injection before parameterized queries).
4. The three real defenses: (a) sandbox the side-effect surface (scoped tools, scoped creds), (b) treat all model input as untrusted (no privilege escalation via retrieved text), (c) layered review for high-stakes actions (HITL).
5. Where to read next — link to the deep version at `/operations/safety-and-security/prompt-injection`.

- [ ] **Step 1: Read sibling files**

Run:
```
Read src/content/concepts/en/agentic-risks-intro.html
Read src/content/concepts/zh/agentic-risks-intro.html
```

Note the body skeleton, depth (~70 lines), step count, callout count, and ZH register.

- [ ] **Step 2: Draft `src/content/concepts/en/prompt-injection-101.html`**

Use the body skeleton from "Conventions" above. Start with:
```html
<section class="phase">
  <div class="phase-num">A9</div>
  <div class="week">Concepts · Agentic AI Explained</div>
  <h2>Prompt injection, in plain words.</h2>
  <p class="goal">What prompt injection actually is, why it's not a bug a vendor can patch, and the three real defenses available to you. This is the beginner-friendly mirror of the <a class="xref" href="/operations/safety-and-security/prompt-injection">Operations deep-dive</a> — same shape of attack, lower-context framing.</p>
  …
</section>
```

Continue with 4 step blocks covering the five topic points above (collapse 1+2 into one step, 3 into one, 4 into one, 5 into a short closer). Aim for 60–90 lines. Use 1 `.callout.danger` to land the "treat all model input as untrusted" point.

- [ ] **Step 3: Draft `src/content/concepts/zh/prompt-injection-101.html`**

Match the EN structure: same `phase-num`, same step count, same callout placement. Use kicker `概念 · 智能体 AI 详解`. Use ZH title `用大白话讲提示词注入` as `<h2>`. Translate prose natively — DO NOT word-map from EN. Cross-link in `<p class="goal">` to `/zh/operations/safety-and-security/prompt-injection`.

If you include any `<pre>` block (none required for this entry), the contents must be byte-identical to the EN copy.

- [ ] **Step 4: Register in `src/content/concepts/manifest.ts` at position 17**

Find the entry for `agentic-risks-intro` (currently the last entry of the Agentic AI group, position 16). Immediately after that line, insert:

```ts
  { page: 'prompt-injection-101', slug: 'prompt-injection-101', title: L('Prompt injection, in plain words','用大白话讲提示词注入'), summary: L('What prompt injection actually is, why it\'s not a bug a vendor can patch, and the three real defenses available to you.','提示词注入究竟是什么、为何它不是哪家厂商能打补丁的 bug，以及你真正能用的三种防御手段。'), group: L('Agentic AI','智能体 AI') },
```

Two-space indent matches existing siblings.

- [ ] **Step 5: Run gates (full trio)**

Run: `npm run build && npm run verify && npm test`

Expected: all pass. If `verify` reports a missing bilingual fragment, you forgot one of the two HTML files. If `test` reports a manifest shape error, check the registration line.

- [ ] **Step 6: Commit**

Run:
```bash
git add src/content/concepts/en/prompt-injection-101.html src/content/concepts/zh/prompt-injection-101.html src/content/concepts/manifest.ts
git commit -m "$(cat <<'EOF'
Add Concepts entry: prompt-injection-101

Beginner-friendly mirror of the Operations deep-dive on prompt injection.
Three-defense framing (sandbox side-effects, untrust all model input,
layered review for high stakes). Concepts tracer entry — verifies the
registration plumbing before the other two Concepts P0s land.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 1.2: Author `guardrails-101`

**Files:**
- Create: `src/content/concepts/en/guardrails-101.html`
- Create: `src/content/concepts/zh/guardrails-101.html`
- Modify: `src/content/concepts/manifest.ts` (insert at position 25, after `structured-outputs`)

**Entry metadata:**
- Slug + page: `guardrails-101`
- EN title: `Guardrails, in plain words`
- ZH title: `用大白话讲护栏`
- EN summary: `Guardrails are pre/post-checks around a model call, not a wall around the model — what they catch, what they miss, and where they live.`
- ZH summary: `护栏是模型调用前后的检查，而不是围着模型的一堵墙——它们能拦住什么、漏掉什么，又该装在哪里。`
- Group: `L('Building Blocks','基础构件')`
- Phase-num: `B9`
- EN kicker: `Concepts · Core Building Blocks`
- ZH kicker: `概念 · 核心构件`

**Sibling files to sample:**
- `src/content/concepts/en/structured-outputs.html` (same group, B8)
- `src/content/concepts/zh/structured-outputs.html`

**Topic coverage:**
1. What a guardrail actually IS — pre-check (input) and post-check (output) wrapping a model call. Not a property of the model.
2. The three places guardrails live: at input (block disallowed prompts), at output (block unsafe completions), at action (block dangerous tool calls).
3. What guardrails are good at: known-shape risks (PII, profanity, schema violations). Bad at: novel jailbreaks, social engineering, instruction-shape attacks.
4. Where in the stack they go — library options, build-vs-buy framing.
5. Pointer to deep-dive at `/operations/safety-and-security/guardrails`.

- [ ] **Step 1: Read sibling files**

Run:
```
Read src/content/concepts/en/structured-outputs.html
Read src/content/concepts/zh/structured-outputs.html
```

- [ ] **Step 2: Draft `src/content/concepts/en/guardrails-101.html`**

Header:
```html
<section class="phase">
  <div class="phase-num">B9</div>
  <div class="week">Concepts · Core Building Blocks</div>
  <h2>Guardrails, in plain words.</h2>
  <p class="goal">Guardrails are pre/post-checks around a model call, not a wall around the model — what they catch, what they miss, and where they live. The conceptual mirror of the <a class="xref" href="/operations/safety-and-security/guardrails">Operations deep-dive</a>.</p>
  …
</section>
```

4 steps covering the topic points. 1 callout (a `.callout.tip` to land "guardrails are not a model property"). 60–90 lines.

- [ ] **Step 3: Draft `src/content/concepts/zh/guardrails-101.html`**

Mirror structure; kicker `概念 · 核心构件`; `<h2>` is `用大白话讲护栏`. Cross-link to `/zh/operations/safety-and-security/guardrails`.

- [ ] **Step 4: Register in `src/content/concepts/manifest.ts` at position 25**

Find `structured-outputs` (last entry of Building Blocks group, position 24). After it, insert:

```ts
  { page: 'guardrails-101', slug: 'guardrails-101', title: L('Guardrails, in plain words','用大白话讲护栏'), summary: L('Guardrails are pre/post-checks around a model call, not a wall around the model — what they catch, what they miss, and where they live.','护栏是模型调用前后的检查，而不是围着模型的一堵墙——它们能拦住什么、漏掉什么，又该装在哪里。'), group: L('Building Blocks','基础构件') },
```

- [ ] **Step 5: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/content/concepts/en/guardrails-101.html src/content/concepts/zh/guardrails-101.html src/content/concepts/manifest.ts
git commit -m "$(cat <<'EOF'
Add Concepts entry: guardrails-101

Beginner-friendly mirror of the Operations deep-dive on guardrails.
Frames guardrails as pre/post-checks around the model, not a property
of the model — what they catch, miss, and where they live in the stack.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 1.3: Author `evals-101`

**Files:**
- Create: `src/content/concepts/en/evals-101.html`
- Create: `src/content/concepts/zh/evals-101.html`
- Modify: `src/content/concepts/manifest.ts` (insert at position 26, after `guardrails-101`)

**Entry metadata:**
- Slug + page: `evals-101`
- EN title: `Evals, in plain words`
- ZH title: `用大白话讲评测`
- EN summary: `An eval is a small, trusted scoreboard you run against your own task — why public benchmarks aren't enough, and what a useful eval set looks like.`
- ZH summary: `评测是你针对自己任务运行的一个小而可信的记分牌——为何公开基准不够用，以及一个有用的评测集长什么样。`
- Group: `L('Building Blocks','基础构件')`
- Phase-num: `B10`
- EN kicker: `Concepts · Core Building Blocks`
- ZH kicker: `概念 · 核心构件`

**Sibling files to sample:**
- `src/content/concepts/en/reading-benchmarks.html` (related entry on benchmarks)
- `src/content/concepts/zh/reading-benchmarks.html`

**Topic coverage:**
1. What an eval IS — a small set of (input, expected behavior, scoring rule) tuples that scores model/agent outputs.
2. Why public benchmarks aren't enough — they measure proxy tasks, not yours; saturation; contamination; selection bias.
3. What a useful eval set looks like — small (10–100 cases), specific to YOUR task, scored cheaply (or at least repeatably), with at least one "easy" case (sanity) and one "hard" case (regression target).
4. Online vs offline (one paragraph pointer; full treatment lives at `/operations/evaluation-and-observability/online-vs-offline-evals`).
5. Pointer to deep-dive at `/operations/evaluation-and-observability/why-agent-eval-is-hard`.

- [ ] **Step 1: Read sibling files**

Run:
```
Read src/content/concepts/en/reading-benchmarks.html
Read src/content/concepts/zh/reading-benchmarks.html
```

- [ ] **Step 2: Draft `src/content/concepts/en/evals-101.html`**

Header (phase-num `B10`, kicker `Concepts · Core Building Blocks`, `<h2>` is `Evals, in plain words.`). 4 steps. 1 callout (a `.callout.tip` landing "10 specific cases beat 1000 generic ones"). 60–90 lines.

- [ ] **Step 3: Draft `src/content/concepts/zh/evals-101.html`**

Mirror structure; kicker `概念 · 核心构件`; `<h2>` is `用大白话讲评测`.

- [ ] **Step 4: Register in `src/content/concepts/manifest.ts` at position 26**

After the `guardrails-101` line you added in Task 1.2, insert:

```ts
  { page: 'evals-101', slug: 'evals-101', title: L('Evals, in plain words','用大白话讲评测'), summary: L('An eval is a small, trusted scoreboard you run against your own task — why public benchmarks aren\'t enough, and what a useful eval set looks like.','评测是你针对自己任务运行的一个小而可信的记分牌——为何公开基准不够用，以及一个有用的评测集长什么样。'), group: L('Building Blocks','基础构件') },
```

- [ ] **Step 5: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/content/concepts/en/evals-101.html src/content/concepts/zh/evals-101.html src/content/concepts/manifest.ts
git commit -m "$(cat <<'EOF'
Add Concepts entry: evals-101

Beginner-friendly framing of evals as small task-specific scoreboards,
not public benchmarks. Sets up the deeper material under Operations >
Evaluation & Observability.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 1.4: Add the Phase 1 changelog entry

**Files:**
- Create: `src/content/changelog/entries/<merge-date>-concepts-p0-launch.ts`

**Note:** Use today's date in `YYYY-MM-DD` as a placeholder. If review/merge slips, rename the file and update the `date:` field at merge time (per `CLAUDE.md`).

- [ ] **Step 1: Read a recent changelog entry as a template**

Run: `Read src/content/changelog/entries/2026-05-20-ia-restructure-playbooks-operations.ts`

- [ ] **Step 2: Create the new entry**

Create `src/content/changelog/entries/<YYYY-MM-DD>-concepts-p0-launch.ts` with:

```ts
import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '<YYYY-MM-DD>',
  title: L(
    'Added P0 Concepts: prompt injection, guardrails, evals',
    '新增 P0 概念条目：提示词注入、护栏、评测',
  ),
  items: [
    L(
      'Three beginner-friendly Concepts mirrors of the deeper material under Operations and Evaluation — closes the launch-coherence gaps called out in the IA expansion backlog.',
      '三篇面向初学者的概念条目，对应 Operations 与 Evaluation 中的深度文章——填补了 IA 扩展规划中提到的"上线连贯性"缺口。',
    ),
    L(
      'Entries: prompt-injection-101 (Agentic AI), guardrails-101 and evals-101 (Building Blocks).',
      '条目：prompt-injection-101（智能体 AI）、guardrails-101 与 evals-101（基础构件）。',
    ),
  ],
};
export default entry;
```

- [ ] **Step 3: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass; `changelog.test.mjs` checks the filename date prefix matches the `date:` field.

- [ ] **Step 4: Commit**

```bash
git add src/content/changelog/entries/<YYYY-MM-DD>-concepts-p0-launch.ts
git commit -m "$(cat <<'EOF'
Changelog: Concepts P0 launch

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 1.5: Manual smoke + push + open PR

**Files:** none modified

- [ ] **Step 1: Build and preview locally**

Run:
```bash
npm run build && npx astro preview &
sleep 2
```

- [ ] **Step 2: Spot-check the three new entries**

In your browser:
- `http://localhost:4321/concepts/prompt-injection-101` — renders, has the kicker line, has 4 step blocks, callout shows.
- `http://localhost:4321/concepts/guardrails-101` — same checks.
- `http://localhost:4321/concepts/evals-101` — same checks.
- `http://localhost:4321/zh/concepts/prompt-injection-101` — ZH renders, kicker is `概念 · 智能体 AI 详解`.
- `http://localhost:4321/zh/concepts/guardrails-101` — ZH renders, kicker is `概念 · 核心构件`.
- `http://localhost:4321/zh/concepts/evals-101` — ZH renders, kicker is `概念 · 核心构件`.
- `http://localhost:4321/concepts/` — the section landing page shows the new entries inside their groups in the correct reading order.

- [ ] **Step 3: Stop preview**

Run: `pkill -f "astro preview"`

- [ ] **Step 4: Push the branch**

Run: `git push -u origin feat/p0-content-concepts`

- [ ] **Step 5: Open the PR**

Run:
```bash
gh pr create --title "Concepts P0: prompt injection, guardrails, evals (101s)" --body "$(cat <<'EOF'
## Summary
- Adds 3 beginner-friendly Concepts mirrors for the gaps the IA expansion exposed.
- `prompt-injection-101` (Agentic AI) — pointer to `/operations/safety-and-security/prompt-injection`.
- `guardrails-101` and `evals-101` (Building Blocks) — pointers to Operations deep-dives.

Spec: `docs/superpowers/specs/2026-05-22-content-p0-enrichment-design.md`

## Test plan
- [x] `npm run build` passes
- [x] `npm run verify` passes (bilingual completeness + internal-link gate)
- [x] `npm test` passes (manifest tests + changelog test)
- [x] Manual smoke: all 6 new pages (en + zh) render with correct kickers
- [x] Concepts section landing shows new entries in correct positions

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 6: Verify the changelog date matches merge day**

When the PR is ready to merge, if the date in the changelog filename is not today, rename the file (`git mv ...`) and bump the `date:` field. Commit the rename as the last commit before squash-merge.

Phase 1 complete. Three new entries live under `/concepts/`, one changelog entry, one PR opened.

---

## Phase 2 — Playbooks P0 PR (7 entries)

Four group files touched. Seven bilingual fragments. Branch: `feat/p0-content-playbooks`.

### Task 2.0: Set up the Playbooks worktree

**Files:** none yet

- [ ] **Step 1: Fetch origin and create the worktree**

Run (from `/Users/cq/Git/agentic-ai-wiki`):
```bash
git fetch origin main
git worktree add .worktrees/p0-content-playbooks -b feat/p0-content-playbooks origin/main
```

- [ ] **Step 2: Install dependencies**

Run (from `.worktrees/p0-content-playbooks`):
```bash
npm ci
```

- [ ] **Step 3: Confirm gates are green before edits**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

### Task 2.1: Author `progressive-disclosure-ux` (tracer entry)

This is the Playbooks tracer — small group (4 entries existing), self-contained topic, anchored in clear sibling material. Full gate cycle before the other six.

**Files:**
- Create: `src/content/playbooks/en/progressive-disclosure-ux.html`
- Create: `src/content/playbooks/zh/progressive-disclosure-ux.html`
- Modify: `src/content/playbooks/groups/agent-ux-and-human-interaction.ts` (insert at position 3, after `approval-and-confirmation-ux`)

**Entry metadata:**
- Slug: `progressive-disclosure-ux`
- EN title: `Progressive-disclosure UX for agents`
- ZH title: `智能体的渐进式披露界面`
- EN summary: `Show the user only the next decision they need to make — when to surface the chain of thought, the tool call, the diff; and when to keep it folded.`
- ZH summary: `只把用户下一步需要做的决定摆在他面前——什么时候展开思考链、工具调用、diff，什么时候继续折叠。`
- Group: `agent-ux-and-human-interaction`
- Phase-num: `H7`
- EN kicker: `Playbook · Agent UX & Human Interaction`
- ZH kicker: `实战手册 · 智能体体验与人机交互`

**Sibling files to sample:**
- `src/content/playbooks/en/approval-and-confirmation-ux.html` (same group, immediately precedes)
- `src/content/playbooks/zh/approval-and-confirmation-ux.html`

**Topic coverage:**
1. Why progressive disclosure matters for agents — they generate a LOT of artifacts (thought, tool calls, diffs); dumping all of it on the user is the same anti-pattern as `console.log` debugging in production UI.
2. The four expand-collapse layers in order of "always show" → "show on demand": (a) the action being requested (always), (b) the diff or tool args (one click), (c) the reasoning / chain of thought (two clicks or hidden), (d) raw model traces (debug-only).
3. Decision-point UX — surface ONE next decision at a time; don't bundle approvals.
4. When to break the rule — high-trust users, batch workflows, "show me everything" debug mode.
5. Anti-patterns — overloaded modals, chat-only UIs that hide the diff, "approve all" buttons by default.

- [ ] **Step 1: Read sibling files**

Run:
```
Read src/content/playbooks/en/approval-and-confirmation-ux.html
Read src/content/playbooks/zh/approval-and-confirmation-ux.html
```

- [ ] **Step 2: Draft `src/content/playbooks/en/progressive-disclosure-ux.html`**

Header:
```html
<section class="phase">
  <div class="phase-num">H7</div>
  <div class="week">Playbook · Agent UX & Human Interaction</div>
  <h2>Show the user the next decision, not every artifact the agent produced.</h2>
  <p class="goal">Show the user only the next decision they need to make — when to surface the chain of thought, the tool call, the diff; and when to keep it folded. Sits beside <a class="xref" href="/playbooks/agent-ux-and-human-interaction/approval-and-confirmation-ux">approval &amp; confirmation UX</a>: that one is about <em>what</em> to confirm; this one is about <em>how much</em> to show while confirming.</p>
  …
</section>
```

5 steps; 1 callout (`.callout.danger` on "approve-all defaults"). 70–100 lines.

- [ ] **Step 3: Draft `src/content/playbooks/zh/progressive-disclosure-ux.html`**

Mirror structure; kicker `实战手册 · 智能体体验与人机交互`; `<h2>` is `把下一步要做的决定摆在用户面前，而不是把智能体产生的所有东西都倒出来。`. Cross-link to `/zh/playbooks/agent-ux-and-human-interaction/approval-and-confirmation-ux`.

- [ ] **Step 4: Register in `src/content/playbooks/groups/agent-ux-and-human-interaction.ts` at position 3**

Open the file; find the `approval-and-confirmation-ux` entry (position 2). Immediately after it, insert:

```ts
    { page: 'progressive-disclosure-ux', slug: 'progressive-disclosure-ux', title: L('Progressive-disclosure UX for agents','智能体的渐进式披露界面'), summary: L('Show the user only the next decision they need to make — when to surface the chain of thought, the tool call, the diff; and when to keep it folded.','只把用户下一步需要做的决定摆在他面前——什么时候展开思考链、工具调用、diff，什么时候继续折叠。') },
```

Four-space indent (inside the `entries:` array).

- [ ] **Step 5: Run gates (full trio)**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/content/playbooks/en/progressive-disclosure-ux.html src/content/playbooks/zh/progressive-disclosure-ux.html src/content/playbooks/groups/agent-ux-and-human-interaction.ts
git commit -m "$(cat <<'EOF'
Add Playbook entry: progressive-disclosure-ux

Playbooks tracer entry — verifies the registration + gate cycle before
the other six P0 Playbooks land. Frames progressive disclosure as the
"next decision only" pattern, complementing approval-and-confirmation-ux.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 2.2: Author `finance-agents`

**Files:**
- Create: `src/content/playbooks/en/finance-agents.html`
- Create: `src/content/playbooks/zh/finance-agents.html`
- Modify: `src/content/playbooks/groups/domain-playbooks.ts` (insert at position 6, before `playbook-meta`)

**Entry metadata:**
- Slug: `finance-agents`
- EN title: `Finance agents`
- ZH title: `金融场景智能体`
- EN summary: `Where agents earn their keep in finance — reconciliation, research synthesis, KYC review — and the hard rails (audit, determinism, regulator-readable trails) they must carry.`
- ZH summary: `智能体在金融场景真正能创造价值的地方——对账、研报合成、KYC 审核——以及它们必须背着的硬性约束（审计、确定性、可供监管审阅的轨迹）。`
- Group: `domain-playbooks`
- Phase-num: `Y7`
- EN kicker: `Playbook · Domain Playbooks`
- ZH kicker: `实战手册 · 领域实战手册`

**Sibling files to sample:**
- `src/content/playbooks/en/sales-and-gtm-agents.html` (same group)
- `src/content/playbooks/zh/sales-and-gtm-agents.html`

**Topic coverage:**
1. Where finance agents work today — reconciliation (matching transactions across systems), research synthesis (analyst-style note generation), KYC review (document extraction + flagging).
2. Where they don't — high-frequency trading, fiduciary advice, anything where determinism beats accuracy.
3. The non-negotiable rails: full audit trail of every prompt + tool call + decision; determinism wherever possible (cached deterministic prompts, structured outputs, frozen model versions); regulator-readable explanation logs (not raw chain-of-thought, but a structured "why we did X").
4. Quick fact-pass: regulatory bodies named must be real (FINRA, FCA, SEC, MAS — by jurisdiction). Don't invent directives or citations.
5. Reading order pointer: links to `/operations/governance-compliance/audit-trails` and `.../regulatory-landscape`.

- [ ] **Step 1: Fact-pass before drafting**

Per spec §6.2, this entry is one of five flagged for regulatory accuracy. Before drafting, verify any regulator name, directive name, or effective date you intend to mention is correct. Don't invent. If unsure, use generic language ("regulators in most jurisdictions require…") instead of naming a specific directive.

- [ ] **Step 2: Read sibling files**

Run:
```
Read src/content/playbooks/en/sales-and-gtm-agents.html
Read src/content/playbooks/zh/sales-and-gtm-agents.html
```

- [ ] **Step 3: Draft `src/content/playbooks/en/finance-agents.html`**

Header (`Y7`, `Playbook · Domain Playbooks`, `<h2>` is `Finance agents.`). 5 steps. 1 callout (`.callout.danger` on "no fiduciary advice without humans in the loop"). 70–110 lines.

- [ ] **Step 4: Draft `src/content/playbooks/zh/finance-agents.html`**

Mirror; kicker `实战手册 · 领域实战手册`; `<h2>` is `金融场景智能体。`.

- [ ] **Step 5: Register at position 6 in `src/content/playbooks/groups/domain-playbooks.ts`**

The current order ends with `playbook-meta` (a meta/HOWTO that should stay at the end). Find the `sales-and-gtm-agents` entry (position 5). After it, insert:

```ts
    { page: 'finance-agents', slug: 'finance-agents', title: L('Finance agents','金融场景智能体'), summary: L('Where agents earn their keep in finance — reconciliation, research synthesis, KYC review — and the hard rails (audit, determinism, regulator-readable trails) they must carry.','智能体在金融场景真正能创造价值的地方——对账、研报合成、KYC 审核——以及它们必须背着的硬性约束（审计、确定性、可供监管审阅的轨迹）。') },
```

Confirm `playbook-meta` is still LAST in the array.

- [ ] **Step 6: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add src/content/playbooks/en/finance-agents.html src/content/playbooks/zh/finance-agents.html src/content/playbooks/groups/domain-playbooks.ts
git commit -m "$(cat <<'EOF'
Add Playbook entry: finance-agents

Where agents earn their keep in finance (reconciliation, research
synthesis, KYC review) and the audit / determinism / regulator-readable
rails they must carry. Inserted before playbook-meta in domain-playbooks.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 2.3: Author `healthcare-agents`

**Files:**
- Create: `src/content/playbooks/en/healthcare-agents.html`
- Create: `src/content/playbooks/zh/healthcare-agents.html`
- Modify: `src/content/playbooks/groups/domain-playbooks.ts` (insert at position 7, after `finance-agents`)

**Entry metadata:**
- Slug: `healthcare-agents`
- EN title: `Healthcare agents`
- ZH title: `医疗场景智能体`
- EN summary: `Charting, prior auth, intake triage — the few healthcare jobs where agents shave real labor, and the privacy + clinical-safety guardrails you cannot ship without.`
- ZH summary: `病历记录、事前授权、分诊接待——这些是医疗中智能体真正节省人力的少数任务，以及离开它们就不能上线的隐私与临床安全护栏。`
- Group: `domain-playbooks`
- Phase-num: `Y8`
- EN kicker: `Playbook · Domain Playbooks`
- ZH kicker: `实战手册 · 领域实战手册`

**Sibling files to sample:**
- `src/content/playbooks/en/finance-agents.html` (Task 2.2 output — anchors voice for sibling domain entries)
- `src/content/playbooks/zh/finance-agents.html`

**Topic coverage:**
1. Where healthcare agents work today — ambient charting (scribe-style transcription + SOAP note generation), prior authorization (document drafting + payer-portal navigation), intake triage (symptom-collection chat that hands off to a clinician).
2. Where they don't — diagnosis, treatment recommendations without clinician sign-off, anything that hits the FDA's SaMD definition.
3. The non-negotiable rails: privacy (HIPAA-aligned data handling, ZERO unnecessary retention of PHI), clinical safety (no autonomous treatment language; "this is informational" framing), and an explicit handoff path to a licensed clinician.
4. Audit + reproducibility — every patient interaction logged with timestamps + model version + retrieved context.
5. Quick fact-pass: HIPAA, SaMD, GDPR Article 9 (special-category data) — verify names/concepts before mentioning specifics.

- [ ] **Step 1: Fact-pass**

Same caveat as Task 2.2: don't invent regulation names or numbers. Use generic phrasing when unsure.

- [ ] **Step 2: Read sibling files**

Run:
```
Read src/content/playbooks/en/finance-agents.html
Read src/content/playbooks/zh/finance-agents.html
```

- [ ] **Step 3: Draft `src/content/playbooks/en/healthcare-agents.html`**

Header (`Y8`, kicker `Playbook · Domain Playbooks`, `<h2>` is `Healthcare agents.`). 5 steps. 1 callout (`.callout.danger` on "never diagnose without a licensed clinician"). 70–110 lines.

- [ ] **Step 4: Draft `src/content/playbooks/zh/healthcare-agents.html`**

Mirror; kicker `实战手册 · 领域实战手册`; `<h2>` is `医疗场景智能体。`.

- [ ] **Step 5: Register at position 7**

After the `finance-agents` entry you added in Task 2.2, insert:

```ts
    { page: 'healthcare-agents', slug: 'healthcare-agents', title: L('Healthcare agents','医疗场景智能体'), summary: L('Charting, prior auth, intake triage — the few healthcare jobs where agents shave real labor, and the privacy + clinical-safety guardrails you cannot ship without.','病历记录、事前授权、分诊接待——这些是医疗中智能体真正节省人力的少数任务，以及离开它们就不能上线的隐私与临床安全护栏。') },
```

- [ ] **Step 6: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add src/content/playbooks/en/healthcare-agents.html src/content/playbooks/zh/healthcare-agents.html src/content/playbooks/groups/domain-playbooks.ts
git commit -m "$(cat <<'EOF'
Add Playbook entry: healthcare-agents

Charting, prior auth, intake triage — and the privacy + clinical-safety
rails (HIPAA-aligned handling, no autonomous treatment language,
explicit clinician handoff) that gate every shipment.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 2.4: Author `legal-agents`

**Files:**
- Create: `src/content/playbooks/en/legal-agents.html`
- Create: `src/content/playbooks/zh/legal-agents.html`
- Modify: `src/content/playbooks/groups/domain-playbooks.ts` (insert at position 8, after `healthcare-agents`)

**Entry metadata:**
- Slug: `legal-agents`
- EN title: `Legal agents`
- ZH title: `法律场景智能体`
- EN summary: `Discovery, contract review, citation checking — where legal agents already work, where they hallucinate, and what supervision they need by jurisdiction.`
- ZH summary: `电子取证、合同审阅、引文核查——法律智能体已经能跑的地方、它们会幻觉的地方，以及不同法域下需要的人工监督。`
- Group: `domain-playbooks`
- Phase-num: `Y9`
- EN kicker: `Playbook · Domain Playbooks`
- ZH kicker: `实战手册 · 领域实战手册`

**Sibling files to sample:**
- `src/content/playbooks/en/research-agents.html`
- `src/content/playbooks/zh/research-agents.html`

**Topic coverage:**
1. Where legal agents already work — eDiscovery (document classification at scale), contract review (clause extraction + variance flagging vs a playbook), citation checking (verify cited authorities exist and say what's claimed).
2. Where they hallucinate — citation invention (the well-documented failure mode; courts have sanctioned lawyers for this), case-summary fabrication, false confidence on novel jurisdictions.
3. Supervision by jurisdiction — US state bar rules on AI disclosure, UK SRA guidance, EU duty-of-care implications. Generic framing only; do not name specific case numbers.
4. Build-vs-buy framing — established legal-tech vendors vs in-house agents; what each is good at.
5. Reading-order pointer to `/operations/governance-compliance/audit-trails`.

- [ ] **Step 1: Fact-pass**

Particularly important for this entry — citation-related claims must be careful. Don't invent case names; use generic phrasing ("multiple US courts have sanctioned…") instead of specific case numbers.

- [ ] **Step 2: Read sibling files**

Run:
```
Read src/content/playbooks/en/research-agents.html
Read src/content/playbooks/zh/research-agents.html
```

- [ ] **Step 3: Draft `src/content/playbooks/en/legal-agents.html`**

Header (`Y9`, kicker `Playbook · Domain Playbooks`, `<h2>` is `Legal agents.`). 5 steps. 1 callout (`.callout.danger` on "verified-citation-only output mode"). 70–110 lines.

- [ ] **Step 4: Draft `src/content/playbooks/zh/legal-agents.html`**

Mirror; kicker `实战手册 · 领域实战手册`; `<h2>` is `法律场景智能体。`.

- [ ] **Step 5: Register at position 8**

After the `healthcare-agents` entry, insert:

```ts
    { page: 'legal-agents', slug: 'legal-agents', title: L('Legal agents','法律场景智能体'), summary: L('Discovery, contract review, citation checking — where legal agents already work, where they hallucinate, and what supervision they need by jurisdiction.','电子取证、合同审阅、引文核查——法律智能体已经能跑的地方、它们会幻觉的地方，以及不同法域下需要的人工监督。') },
```

- [ ] **Step 6: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add src/content/playbooks/en/legal-agents.html src/content/playbooks/zh/legal-agents.html src/content/playbooks/groups/domain-playbooks.ts
git commit -m "$(cat <<'EOF'
Add Playbook entry: legal-agents

Discovery, contract review, citation checking — where they work, where
they hallucinate, and what supervision the major jurisdictions require.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 2.5: Author `browser-agents`

**Files:**
- Create: `src/content/playbooks/en/browser-agents.html`
- Create: `src/content/playbooks/zh/browser-agents.html`
- Modify: `src/content/playbooks/groups/coding-and-computer-use-agents.ts` (insert immediately after `computer-use-and-gui-agents`, which is currently at array index 3)

**Entry metadata:**
- Slug: `browser-agents`
- EN title: `Browser agents`
- ZH title: `浏览器智能体`
- EN summary: `Driving a real browser as a tool — DOM versus pixel observation, login + auth state, the well-trodden failure modes, and when to step up to a full GUI agent.`
- ZH summary: `把一个真实浏览器当工具来驱动——DOM 与像素两种观察方式、登录与认证状态、踩烂了的失败模式，以及何时该升级到完整 GUI 智能体。`
- Group: `coding-and-computer-use-agents`
- Phase-num: `U7`
- EN kicker: `Playbook · Coding & Computer-Use Agents`
- ZH kicker: `实战手册 · 编码与计算机操作智能体`

**Sibling files to sample:**
- `src/content/playbooks/en/computer-use-and-gui-agents.html` (immediately precedes)
- `src/content/playbooks/zh/computer-use-and-gui-agents.html`

**Topic coverage:**
1. Why "browser as a tool" is a distinct surface — narrower than full GUI control, broader than HTTP.
2. DOM vs pixel observation — accessibility-tree (semantic, robust to redesigns) vs screenshot (works on any page but fragile to layout). Most production agents combine both.
3. Auth + session state — cookies, OAuth flows, MFA challenges; persistent profiles vs ephemeral sessions; safety implications of either choice.
4. Well-trodden failure modes — infinite-scroll traps, CAPTCHA walls, iframe boundaries, ad pop-ups, redirect loops, SPA routing that breaks accessibility-tree snapshots.
5. When to step up to a full GUI agent — when DOM/pixel hybrid still can't unblock you (native dialogs, OS-level prompts, multi-window orchestration).

- [ ] **Step 1: Read sibling files**

Run:
```
Read src/content/playbooks/en/computer-use-and-gui-agents.html
Read src/content/playbooks/zh/computer-use-and-gui-agents.html
```

- [ ] **Step 2: Draft `src/content/playbooks/en/browser-agents.html`**

Header (`U7`, kicker `Playbook · Coding & Computer-Use Agents`, `<h2>` is `Browser agents.`). 5 steps. 1 callout. 70–110 lines.

- [ ] **Step 3: Draft `src/content/playbooks/zh/browser-agents.html`**

Mirror; kicker `实战手册 · 编码与计算机操作智能体`; `<h2>` is `浏览器智能体。`.

- [ ] **Step 4: Register immediately after `computer-use-and-gui-agents`**

Find the `computer-use-and-gui-agents` entry (4th entry in the `entries:` array) in `src/content/playbooks/groups/coding-and-computer-use-agents.ts`. Immediately after it (and before `sandboxing-and-execution`), insert:

```ts
    { page: 'browser-agents', slug: 'browser-agents', title: L('Browser agents','浏览器智能体'), summary: L('Driving a real browser as a tool — DOM versus pixel observation, login + auth state, the well-trodden failure modes, and when to step up to a full GUI agent.','把一个真实浏览器当工具来驱动——DOM 与像素两种观察方式、登录与认证状态、踩烂了的失败模式，以及何时该升级到完整 GUI 智能体。') },
```

- [ ] **Step 5: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/content/playbooks/en/browser-agents.html src/content/playbooks/zh/browser-agents.html src/content/playbooks/groups/coding-and-computer-use-agents.ts
git commit -m "$(cat <<'EOF'
Add Playbook entry: browser-agents

Driving a real browser as a tool — DOM vs pixel observation, auth/session
state, and the well-trodden failure modes. Sits between
computer-use-and-gui-agents and evaluating-coding-agents.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 2.6: Author `ide-agents`

**Files:**
- Create: `src/content/playbooks/en/ide-agents.html`
- Create: `src/content/playbooks/zh/ide-agents.html`
- Modify: `src/content/playbooks/groups/coding-and-computer-use-agents.ts` (insert immediately after `browser-agents`, the entry you added in Task 2.5)

**Entry metadata:**
- Slug: `ide-agents`
- EN title: `IDE agents`
- ZH title: `IDE 智能体`
- EN summary: `Coding agents that live in the editor — the loop is the same as a CLI coding agent, but the interaction surface, undo expectations, and trust threshold are all different.`
- ZH summary: `住在编辑器里的编码智能体——内循环和 CLI 编码智能体一样，但交互面、撤销预期与信任阈值都不同。`
- Group: `coding-and-computer-use-agents`
- Phase-num: `U8`
- EN kicker: `Playbook · Coding & Computer-Use Agents`
- ZH kicker: `实战手册 · 编码与计算机操作智能体`

**Sibling files to sample:**
- `src/content/playbooks/en/coding-agent-architecture.html`
- `src/content/playbooks/zh/coding-agent-architecture.html`

**Topic coverage:**
1. IDE-agents share the core loop with CLI coding agents (plan → tool → observe → revise) — the architecture from `coding-agent-architecture` applies wholesale.
2. What's different about the IDE surface: undo expectations (every change must be Ctrl-Z-able), trust threshold (the user is watching every keystroke), latency (inline completions ≠ background diffs).
3. Inline completion vs diff-suggestion vs in-place rewrite — three distinct interaction modes; pick one per feature, don't blend.
4. State the agent needs that a CLI agent doesn't — current cursor, open buffer, selection, undo history, lint state.
5. Failure modes specific to IDE agents — overwriting unsaved buffers, breaking unsaved selection, dropping cursor on accept.

- [ ] **Step 1: Read sibling files**

Run:
```
Read src/content/playbooks/en/coding-agent-architecture.html
Read src/content/playbooks/zh/coding-agent-architecture.html
```

- [ ] **Step 2: Draft `src/content/playbooks/en/ide-agents.html`**

Header (`U8`, kicker `Playbook · Coding & Computer-Use Agents`, `<h2>` is `IDE agents.`). 5 steps. 1 callout (`.callout.tip` on "always preserve the undo stack"). 70–110 lines.

- [ ] **Step 3: Draft `src/content/playbooks/zh/ide-agents.html`**

Mirror; kicker `实战手册 · 编码与计算机操作智能体`; `<h2>` is `IDE 智能体。`.

- [ ] **Step 4: Register immediately after `browser-agents`**

After the `browser-agents` entry you added in Task 2.5 (and before `sandboxing-and-execution`), insert:

```ts
    { page: 'ide-agents', slug: 'ide-agents', title: L('IDE agents','IDE 智能体'), summary: L('Coding agents that live in the editor — the loop is the same as a CLI coding agent, but the interaction surface, undo expectations, and trust threshold are all different.','住在编辑器里的编码智能体——内循环和 CLI 编码智能体一样，但交互面、撤销预期与信任阈值都不同。') },
```

- [ ] **Step 5: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/content/playbooks/en/ide-agents.html src/content/playbooks/zh/ide-agents.html src/content/playbooks/groups/coding-and-computer-use-agents.ts
git commit -m "$(cat <<'EOF'
Add Playbook entry: ide-agents

Coding agents that live in the editor — shares the CLI agent loop but
diverges on surface, undo expectations, and trust threshold. Lands
between browser-agents and evaluating-coding-agents.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 2.7: Author `outbound-voice-agents`

**Files:**
- Create: `src/content/playbooks/en/outbound-voice-agents.html`
- Create: `src/content/playbooks/zh/outbound-voice-agents.html`
- Modify: `src/content/playbooks/groups/voice-realtime-agents.ts` (insert at position 7, after `voice-failure-modes`)

**Entry metadata:**
- Slug: `outbound-voice-agents`
- EN title: `Outbound voice agents`
- ZH title: `外呼语音智能体`
- EN summary: `Agents that **make** the call instead of answering it — pacing, abandonment, identity disclosure, and the regulatory landmines that turn a clever demo into a fine.`
- ZH summary: `主动拨打而非接听的智能体——节奏、放弃率、身份披露，以及把炫酷 demo 变成罚单的合规雷区。`
- Group: `voice-realtime-agents`
- Phase-num: `V7`
- EN kicker: `Playbook · Voice & Realtime Agents`
- ZH kicker: `实战手册 · 语音与实时智能体`

**Sibling files to sample:**
- `src/content/playbooks/en/voice-failure-modes.html` (immediately precedes)
- `src/content/playbooks/zh/voice-failure-modes.html`

**Topic coverage:**
1. Outbound vs inbound — different latency budget, different rapport-building expectations, different regulatory regime.
2. Pacing & abandonment — predictive-dialer math; the legal/ethical limit on abandoned calls in major jurisdictions; how to stay under it.
3. Identity disclosure — TCPA in the US (must identify as AI), similar rules in EU/UK; what "identify as AI" must literally sound like.
4. Consent and recording — do-not-call lists, time-of-day restrictions, opt-out handling within the call.
5. The regulatory landmines that turn a demo into a fine — TCPA per-call statutory damages, FCC AI disclosure rules, state-level (e.g., California) augmentations.

- [ ] **Step 1: Fact-pass**

This entry references TCPA, FCC rules, and state regulations. Verify named acts/rules before citing. Generic phrasing ("most US states require…") is preferable to fake-specific.

- [ ] **Step 2: Read sibling files**

Run:
```
Read src/content/playbooks/en/voice-failure-modes.html
Read src/content/playbooks/zh/voice-failure-modes.html
```

- [ ] **Step 3: Draft `src/content/playbooks/en/outbound-voice-agents.html`**

Header (`V7`, kicker `Playbook · Voice & Realtime Agents`, `<h2>` is `Outbound voice agents.`). 5 steps. 1 callout (`.callout.danger` on "AI disclosure is not optional"). 70–110 lines.

- [ ] **Step 4: Draft `src/content/playbooks/zh/outbound-voice-agents.html`**

Mirror; kicker `实战手册 · 语音与实时智能体`; `<h2>` is `外呼语音智能体。`.

- [ ] **Step 5: Register at position 7**

Find `voice-failure-modes` (position 6) in `src/content/playbooks/groups/voice-realtime-agents.ts`. After it, insert:

```ts
    { page: 'outbound-voice-agents', slug: 'outbound-voice-agents', title: L('Outbound voice agents','外呼语音智能体'), summary: L('Agents that **make** the call instead of answering it — pacing, abandonment, identity disclosure, and the regulatory landmines that turn a clever demo into a fine.','主动拨打而非接听的智能体——节奏、放弃率、身份披露，以及把炫酷 demo 变成罚单的合规雷区。') },
```

- [ ] **Step 6: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add src/content/playbooks/en/outbound-voice-agents.html src/content/playbooks/zh/outbound-voice-agents.html src/content/playbooks/groups/voice-realtime-agents.ts
git commit -m "$(cat <<'EOF'
Add Playbook entry: outbound-voice-agents

Agents that make the call — pacing, abandonment, identity disclosure,
and the regulatory landmines that turn a clever demo into a fine.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 2.8: Add the Phase 2 changelog entry

**Files:**
- Create: `src/content/changelog/entries/<merge-date>-playbooks-p0-launch.ts`

- [ ] **Step 1: Create the changelog entry**

Create the file with:

```ts
import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '<YYYY-MM-DD>',
  title: L(
    'Added P0 Playbooks: finance, healthcare, legal, browser, IDE, outbound voice, progressive-disclosure UX',
    '新增 P0 实战手册：金融、医疗、法律、浏览器、IDE、外呼语音、渐进式披露 UX',
  ),
  items: [
    L(
      'Seven new Playbook entries close the launch-coherence gaps the IA expansion flagged for Playbooks.',
      '七篇新增实战手册条目，填补了 IA 扩展规划中针对实战手册板块标出的"上线连贯性"缺口。',
    ),
    L(
      'Domain playbooks: finance-agents, healthcare-agents, legal-agents.',
      '领域实战手册：finance-agents、healthcare-agents、legal-agents。',
    ),
    L(
      'Coding & UX: browser-agents, ide-agents, outbound-voice-agents, progressive-disclosure-ux.',
      '编码与交互：browser-agents、ide-agents、outbound-voice-agents、progressive-disclosure-ux。',
    ),
  ],
};
export default entry;
```

- [ ] **Step 2: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 3: Commit**

```bash
git add src/content/changelog/entries/<YYYY-MM-DD>-playbooks-p0-launch.ts
git commit -m "$(cat <<'EOF'
Changelog: Playbooks P0 launch

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 2.9: Manual smoke + push + open PR

**Files:** none modified

- [ ] **Step 1: Build and preview**

Run:
```bash
npm run build && npx astro preview &
sleep 2
```

- [ ] **Step 2: Spot-check each new entry**

Visit (and confirm renders cleanly, kicker correct, structure intact):
- `http://localhost:4321/playbooks/domain-playbooks/finance-agents`
- `http://localhost:4321/playbooks/domain-playbooks/healthcare-agents`
- `http://localhost:4321/playbooks/domain-playbooks/legal-agents`
- `http://localhost:4321/playbooks/coding-and-computer-use-agents/browser-agents`
- `http://localhost:4321/playbooks/coding-and-computer-use-agents/ide-agents`
- `http://localhost:4321/playbooks/voice-realtime-agents/outbound-voice-agents`
- `http://localhost:4321/playbooks/agent-ux-and-human-interaction/progressive-disclosure-ux`
- The same 7 paths under `/zh/playbooks/...` — ZH renders, kickers match the ZH table in spec §3.3.
- `http://localhost:4321/playbooks/domain-playbooks/` — group landing shows new entries in correct reading order, `playbook-meta` is last.
- `http://localhost:4321/playbooks/coding-and-computer-use-agents/` — `browser-agents` and `ide-agents` appear between `computer-use-and-gui-agents` and `evaluating-coding-agents`.

- [ ] **Step 3: Stop preview**

Run: `pkill -f "astro preview"`

- [ ] **Step 4: Push**

Run: `git push -u origin feat/p0-content-playbooks`

- [ ] **Step 5: Open the PR**

```bash
gh pr create --title "Playbooks P0: finance, healthcare, legal, browser, IDE, outbound voice, progressive-disclosure UX" --body "$(cat <<'EOF'
## Summary
- Adds 7 P0 Playbook entries called out in the IA expansion backlog.
- domain-playbooks (3): finance-agents, healthcare-agents, legal-agents.
- coding-and-computer-use-agents (2): browser-agents, ide-agents.
- voice-realtime-agents (1): outbound-voice-agents.
- agent-ux-and-human-interaction (1): progressive-disclosure-ux.

Spec: `docs/superpowers/specs/2026-05-22-content-p0-enrichment-design.md`

## Test plan
- [x] `npm run build` / `npm run verify` / `npm test` all pass
- [x] All 14 new pages (7 × en+zh) render with correct kickers
- [x] Each affected group's landing shows the new entries in the right reading order
- [x] Regulatory-content fact-pass done on finance, healthcare, legal, outbound-voice per spec §6.2

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 6: Verify changelog date matches merge day**

Same rule as Phase 1: if the changelog date is no longer today at merge time, rename the file and bump `date:`.

Phase 2 complete. Seven new entries live under `/playbooks/`, one changelog entry, one PR opened.

---

## Phase 3 — Operations P0 PR (8 entries)

Five group files touched. Eight bilingual fragments. Branch: `feat/p0-content-operations`. Largest of the three PRs.

### Task 3.0: Set up the Operations worktree

- [ ] **Step 1: Fetch origin and create the worktree**

Run (from `/Users/cq/Git/agentic-ai-wiki`):
```bash
git fetch origin main
git worktree add .worktrees/p0-content-operations -b feat/p0-content-operations origin/main
```

- [ ] **Step 2: Install dependencies**

Run (from `.worktrees/p0-content-operations`):
```bash
npm ci
```

- [ ] **Step 3: Confirm gates are green**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

### Task 3.1: Author `feature-flags-for-agents` (tracer entry)

**Files:**
- Create: `src/content/operations/en/feature-flags-for-agents.html`
- Create: `src/content/operations/zh/feature-flags-for-agents.html`
- Modify: `src/content/operations/groups/agentops.ts` (insert at position 6, after `rollout-and-versioning`)

**Entry metadata:**
- Slug: `feature-flags-for-agents`
- EN title: `Feature flags for agents`
- ZH title: `面向智能体的特性开关`
- EN summary: `Flags scoped to prompts, models, tools, and policies — what to gate, how to roll, and why "off by default" is a non-negotiable for agent flags.`
- ZH summary: `面向 prompt、模型、工具与策略的开关——该把什么放进开关、如何放量，以及为何"默认关"对智能体开关是没得商量的。`
- Group: `agentops`
- Phase-num: `O7`
- EN kicker: `Operation · AgentOps: Deploy & Operate`
- ZH kicker: `运维 · 智能体运维：部署与运营`

**Sibling files to sample:**
- `src/content/operations/en/rollout-and-versioning.html` (immediately precedes)
- `src/content/operations/zh/rollout-and-versioning.html`

**Topic coverage:**
1. What feature flags FOR AGENTS gate — not just code paths: prompts, tool registrations, model versions, policy thresholds, sampling temperature, retrieval-config switches.
2. Off-by-default — for any agent flag with non-trivial blast radius, default to off and require explicit opt-in. Even more aggressive than classic feature-flag hygiene.
3. Tenant / cohort scoping — flags evaluated per-request with full agent context, not just user-id.
4. Flag-lifetime — how to retire agent flags (the long-tail flag is more dangerous when it's gating a policy than a pure code path).
5. Audit trail — every flag flip and per-request evaluation should be observable; ties back to `tracing-and-observability`.

- [ ] **Step 1: Read sibling files**

Run:
```
Read src/content/operations/en/rollout-and-versioning.html
Read src/content/operations/zh/rollout-and-versioning.html
```

- [ ] **Step 2: Draft `src/content/operations/en/feature-flags-for-agents.html`**

Header (`O7`, kicker `Operation · AgentOps: Deploy & Operate`, `<h2>` is `Feature flags for agents.`). 5 steps. 1 callout (`.callout.tip` on "off by default"). 70–110 lines.

- [ ] **Step 3: Draft `src/content/operations/zh/feature-flags-for-agents.html`**

Mirror; kicker `运维 · 智能体运维：部署与运营`; `<h2>` is `面向智能体的特性开关。`.

- [ ] **Step 4: Register at position 6**

Find `rollout-and-versioning` (position 5) in `src/content/operations/groups/agentops.ts`. After it, insert:

```ts
    { page: 'feature-flags-for-agents', slug: 'feature-flags-for-agents', title: L('Feature flags for agents','面向智能体的特性开关'), summary: L('Flags scoped to prompts, models, tools, and policies — what to gate, how to roll, and why "off by default" is a non-negotiable for agent flags.','面向 prompt、模型、工具与策略的开关——该把什么放进开关、如何放量，以及为何"默认关"对智能体开关是没得商量的。') },
```

- [ ] **Step 5: Run gates (full trio)**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/content/operations/en/feature-flags-for-agents.html src/content/operations/zh/feature-flags-for-agents.html src/content/operations/groups/agentops.ts
git commit -m "$(cat <<'EOF'
Add Operation entry: feature-flags-for-agents

Operations tracer entry — flag-gating prompts, models, tools, and
policies. "Off by default" framing, tenant/cohort scoping, lifetime,
and audit trail. Verifies registration plumbing before the other seven
Operations P0s land.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 3.2: Author `kill-switches`

**Files:**
- Create: `src/content/operations/en/kill-switches.html`
- Create: `src/content/operations/zh/kill-switches.html`
- Modify: `src/content/operations/groups/agentops.ts` (insert at position 7, after `feature-flags-for-agents`)

**Entry metadata:**
- Slug: `kill-switches`
- EN title: `Kill switches`
- ZH title: `急停开关`
- EN summary: `A button that stops a running agent fleet — what it must actually stop (in-flight calls, queued work, scheduled retries), and how to test it before you need it.`
- ZH summary: `一个能停下整支正在运行的智能体队伍的按钮——它真正要拦下的东西（飞行中调用、排队任务、计划重试），以及如何在你真用上它之前就把它演练好。`
- Group: `agentops`
- Phase-num: `O8`
- EN kicker: `Operation · AgentOps: Deploy & Operate`
- ZH kicker: `运维 · 智能体运维：部署与运营`

**Sibling files to sample:**
- `src/content/operations/en/incident-response-for-agents.html`
- `src/content/operations/zh/incident-response-for-agents.html`

**Topic coverage:**
1. What a kill-switch must actually halt — in-flight LLM calls (cancel; don't wait), queued tasks (drain or discard?), scheduled retries (cancel timers), webhooks-in-flight, downstream side effects already started.
2. The four scopes a kill-switch should support — single agent, tenant, group/feature, global. Each needs its own button.
3. The propagation problem — distributed agent fleet means the "stop" has to fan out faster than work fans in.
4. Tabletop drill — quarterly test of the kill-switch in staging; pull the lever, measure how long every layer takes to stop.
5. After the switch — what state the system is left in; what's recoverable, what isn't; how to resume.

- [ ] **Step 1: Read sibling files**

Run:
```
Read src/content/operations/en/incident-response-for-agents.html
Read src/content/operations/zh/incident-response-for-agents.html
```

- [ ] **Step 2: Draft `src/content/operations/en/kill-switches.html`**

Header (`O8`, kicker `Operation · AgentOps: Deploy & Operate`, `<h2>` is `Kill switches.`). 5 steps. 1 callout (`.callout.danger` on "untested kill-switches don't exist"). 70–110 lines.

You may include 1 in-prose `<a href="/operations/agentops/feature-flags-for-agents">` and 1 `<a href="/operations/agentops/incident-response-for-agents">` link.

- [ ] **Step 3: Draft `src/content/operations/zh/kill-switches.html`**

Mirror; kicker `运维 · 智能体运维：部署与运营`; `<h2>` is `急停开关。`.

- [ ] **Step 4: Register at position 7**

After the `feature-flags-for-agents` entry, insert:

```ts
    { page: 'kill-switches', slug: 'kill-switches', title: L('Kill switches','急停开关'), summary: L('A button that stops a running agent fleet — what it must actually stop (in-flight calls, queued work, scheduled retries), and how to test it before you need it.','一个能停下整支正在运行的智能体队伍的按钮——它真正要拦下的东西（飞行中调用、排队任务、计划重试），以及如何在你真用上它之前就把它演练好。') },
```

- [ ] **Step 5: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/content/operations/en/kill-switches.html src/content/operations/zh/kill-switches.html src/content/operations/groups/agentops.ts
git commit -m "$(cat <<'EOF'
Add Operation entry: kill-switches

What the button must actually stop (in-flight, queued, scheduled), the
four scopes (agent / tenant / group / global), the propagation problem,
and the quarterly tabletop drill.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 3.3: Author `online-vs-offline-evals`

**Files:**
- Create: `src/content/operations/en/online-vs-offline-evals.html`
- Create: `src/content/operations/zh/online-vs-offline-evals.html`
- Modify: `src/content/operations/groups/evaluation-and-observability.ts` (insert at position 2, after `why-agent-eval-is-hard`)

**Entry metadata:**
- Slug: `online-vs-offline-evals`
- EN title: `Online vs offline evals`
- ZH title: `在线评测与离线评测`
- EN summary: `Offline evals catch regressions before deploy; online evals catch the user behavior you couldn't fake — why you need both, and where each one lies to you.`
- ZH summary: `离线评测在发布前抓住回归；在线评测抓住你伪造不出来的用户行为——为何你两者都需要，以及它们各自会在哪里骗你。`
- Group: `evaluation-and-observability`
- Phase-num: `E7`
- EN kicker: `Operation · Evaluation & Observability`
- ZH kicker: `运维 · 评估与可观测性`

**Sibling files to sample:**
- `src/content/operations/en/why-agent-eval-is-hard.html` (immediately precedes)
- `src/content/operations/zh/why-agent-eval-is-hard.html`

**Topic coverage:**
1. Offline eval — pre-deploy, fixed dataset, deterministic. Strengths and lies (selection bias, distribution drift, contamination).
2. Online eval — post-deploy, real users, real distribution. Strengths and lies (Hawthorne effect, novelty, satisficing-vs-success).
3. Why you need BOTH — neither alone covers regressions + emergent user behavior.
4. Bridging — shadow mode, replay traffic against new model, dark launches that score-but-don't-act.
5. Cost — online evals burn real tokens on real users; offline evals burn engineering hours building the dataset.

- [ ] **Step 1: Read sibling files**

Run:
```
Read src/content/operations/en/why-agent-eval-is-hard.html
Read src/content/operations/zh/why-agent-eval-is-hard.html
```

- [ ] **Step 2: Draft `src/content/operations/en/online-vs-offline-evals.html`**

Header (`E7`, kicker `Operation · Evaluation & Observability`, `<h2>` is `Online vs offline evals.`). 5 steps. 1 callout (`.callout.tip` on shadow-mode bridges). 70–110 lines.

- [ ] **Step 3: Draft `src/content/operations/zh/online-vs-offline-evals.html`**

Mirror; kicker `运维 · 评估与可观测性`; `<h2>` is `在线评测与离线评测。`.

- [ ] **Step 4: Register at position 2**

Find the `why-agent-eval-is-hard` entry (position 1) in `src/content/operations/groups/evaluation-and-observability.ts`. Immediately after it, insert:

```ts
    { page: 'online-vs-offline-evals', slug: 'online-vs-offline-evals', title: L('Online vs offline evals','在线评测与离线评测'), summary: L('Offline evals catch regressions before deploy; online evals catch the user behavior you couldn\'t fake — why you need both, and where each one lies to you.','离线评测在发布前抓住回归；在线评测抓住你伪造不出来的用户行为——为何你两者都需要，以及它们各自会在哪里骗你。') },
```

- [ ] **Step 5: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/content/operations/en/online-vs-offline-evals.html src/content/operations/zh/online-vs-offline-evals.html src/content/operations/groups/evaluation-and-observability.ts
git commit -m "$(cat <<'EOF'
Add Operation entry: online-vs-offline-evals

Why you need both — what each catches, where each lies to you, and the
shadow-mode / replay bridges between them.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 3.4: Author `per-customer-economics`

**Files:**
- Create: `src/content/operations/en/per-customer-economics.html`
- Create: `src/content/operations/zh/per-customer-economics.html`
- Modify: `src/content/operations/groups/economics-roi.ts` (insert at position 3, after `unit-economics`)

**Entry metadata:**
- Slug: `per-customer-economics`
- EN title: `Per-customer economics`
- ZH title: `按客户的单位经济模型`
- EN summary: `Whole-system unit economics hide which customers cost you money — a per-tenant cost view, what drives the heavy-tail user, and the levers you actually have.`
- ZH summary: `整盘的单位经济模型会把哪些客户亏钱遮起来——按租户的成本视图、什么造就长尾用户，以及你手上真正能用的杠杆。`
- Group: `economics-roi`
- Phase-num: `B7`
- EN kicker: `Operation · Economics & ROI`
- ZH kicker: `运维 · 经济性与投资回报`

**Sibling files to sample:**
- `src/content/operations/en/unit-economics.html` (immediately precedes)
- `src/content/operations/zh/unit-economics.html`

**Topic coverage:**
1. Why whole-system economics hide losers — averaging masks the heavy-tail.
2. The per-tenant view — token usage, tool-call count, retrieval queries, retries per task, all bucketed per customer; the resulting heavy-tail distribution.
3. What drives the heavy-tail user — usually one of: (a) very long sessions, (b) unusually high tool-call fan-out per task, (c) prompt size that's 5x average.
4. The levers you actually have — per-tenant rate limits, model-cascade rules per cohort, prompt-cache aware UI patterns, hard caps with graceful degradation.
5. When to give up on a customer — the cost-to-serve math; honest framing.

- [ ] **Step 1: Read sibling files**

Run:
```
Read src/content/operations/en/unit-economics.html
Read src/content/operations/zh/unit-economics.html
```

- [ ] **Step 2: Draft `src/content/operations/en/per-customer-economics.html`**

Header (`B7`, kicker `Operation · Economics & ROI`, `<h2>` is `Per-customer economics.`). 5 steps. 1 callout. 70–110 lines.

- [ ] **Step 3: Draft `src/content/operations/zh/per-customer-economics.html`**

Mirror; kicker `运维 · 经济性与投资回报`; `<h2>` is `按客户的单位经济模型。`.

- [ ] **Step 4: Register at position 3**

Find `unit-economics` (position 2) in `src/content/operations/groups/economics-roi.ts`. After it, insert:

```ts
    { page: 'per-customer-economics', slug: 'per-customer-economics', title: L('Per-customer economics','按客户的单位经济模型'), summary: L('Whole-system unit economics hide which customers cost you money — a per-tenant cost view, what drives the heavy-tail user, and the levers you actually have.','整盘的单位经济模型会把哪些客户亏钱遮起来——按租户的成本视图、什么造就长尾用户，以及你手上真正能用的杠杆。') },
```

- [ ] **Step 5: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/content/operations/en/per-customer-economics.html src/content/operations/zh/per-customer-economics.html src/content/operations/groups/economics-roi.ts
git commit -m "$(cat <<'EOF'
Add Operation entry: per-customer-economics

Why averaging hides the heavy-tail — per-tenant cost view, what drives
the loss-makers, and the levers you actually have.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 3.5: Author `eu-ai-act-for-agents`

**Files:**
- Create: `src/content/operations/en/eu-ai-act-for-agents.html`
- Create: `src/content/operations/zh/eu-ai-act-for-agents.html`
- Modify: `src/content/operations/groups/governance-compliance.ts` (insert at position 4, after `regulatory-landscape`)

**Entry metadata:**
- Slug: `eu-ai-act-for-agents`
- EN title: `EU AI Act, for agents`
- ZH title: `欧盟《人工智能法案》——智能体视角`
- EN summary: `The AI Act's risk tiers explained from an agent builder's perspective — what triggers high-risk, what general-purpose AI obligations look like, and the dates that matter.`
- ZH summary: `从智能体开发者视角解读《人工智能法案》的风险分层——什么会触发高风险、通用人工智能义务是什么样子，以及关键时间点。`
- Group: `governance-compliance`
- Phase-num: `C7`
- EN kicker: `Operation · Governance & Compliance`
- ZH kicker: `运维 · 治理与合规`

**Sibling files to sample:**
- `src/content/operations/en/regulatory-landscape.html`
- `src/content/operations/zh/regulatory-landscape.html`

**Topic coverage:**
1. Risk tiers — unacceptable, high-risk, limited, minimal. What category an "agent" tends to fall into (often "high-risk" by use case, sometimes "limited" with transparency obligations).
2. What "high-risk" actually requires of an agent builder — risk management, data governance, technical documentation, transparency, human oversight, accuracy & robustness & cybersecurity.
3. General-purpose AI obligations — model providers vs deployers; what flows downstream to you if you build on a GPAI.
4. The dates that matter — staged application milestones (and which obligations kick in when).
5. Where it intersects with `nist-ai-rmf-for-agents` (the next entry) — same problem, different framework.

- [ ] **Step 1: Fact-pass (REQUIRED)**

Per spec §6.2, this is one of the regulatory entries. Verify named risk tiers, named obligations, and named dates against the AI Act text or a current authoritative summary. If unsure on a specific date, say "phased over the years following entry into force" rather than inventing a date.

- [ ] **Step 2: Read sibling files**

Run:
```
Read src/content/operations/en/regulatory-landscape.html
Read src/content/operations/zh/regulatory-landscape.html
```

- [ ] **Step 3: Draft `src/content/operations/en/eu-ai-act-for-agents.html`**

Header (`C7`, kicker `Operation · Governance & Compliance`, `<h2>` is `EU AI Act, for agents.`). 5 steps. 1 callout (`.callout.tip` on "your use case probably puts you in 'high-risk' even if the model isn't"). 70–110 lines.

- [ ] **Step 4: Draft `src/content/operations/zh/eu-ai-act-for-agents.html`**

Mirror; kicker `运维 · 治理与合规`; `<h2>` is `欧盟《人工智能法案》——智能体视角。`.

- [ ] **Step 5: Register at position 4**

Find `regulatory-landscape` (position 3) in `src/content/operations/groups/governance-compliance.ts`. After it, insert:

```ts
    { page: 'eu-ai-act-for-agents', slug: 'eu-ai-act-for-agents', title: L('EU AI Act, for agents','欧盟《人工智能法案》——智能体视角'), summary: L('The AI Act\'s risk tiers explained from an agent builder\'s perspective — what triggers high-risk, what general-purpose AI obligations look like, and the dates that matter.','从智能体开发者视角解读《人工智能法案》的风险分层——什么会触发高风险、通用人工智能义务是什么样子，以及关键时间点。') },
```

- [ ] **Step 6: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add src/content/operations/en/eu-ai-act-for-agents.html src/content/operations/zh/eu-ai-act-for-agents.html src/content/operations/groups/governance-compliance.ts
git commit -m "$(cat <<'EOF'
Add Operation entry: eu-ai-act-for-agents

Risk tiers from an agent builder's perspective — what triggers high-risk,
what GPAI obligations look like, and the staged dates. Fact-passed
against the Act text.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 3.6: Author `nist-ai-rmf-for-agents`

**Files:**
- Create: `src/content/operations/en/nist-ai-rmf-for-agents.html`
- Create: `src/content/operations/zh/nist-ai-rmf-for-agents.html`
- Modify: `src/content/operations/groups/governance-compliance.ts` (insert at position 5, after `eu-ai-act-for-agents`)

**Entry metadata:**
- Slug: `nist-ai-rmf-for-agents`
- EN title: `NIST AI RMF, for agents`
- ZH title: `NIST AI RMF——智能体视角`
- EN summary: `Map / Measure / Manage / Govern read as a checklist for agent teams — what each function actually demands when the system is an autonomous agent rather than a model.`
- ZH summary: `把"映射 / 度量 / 管理 / 治理"四件套当作智能体团队的清单来看——当系统是自主智能体而不仅仅是一个模型时，每个职能真正要求什么。`
- Group: `governance-compliance`
- Phase-num: `C8`
- EN kicker: `Operation · Governance & Compliance`
- ZH kicker: `运维 · 治理与合规`

**Sibling files to sample:**
- `src/content/operations/en/governance-in-practice.html`
- `src/content/operations/zh/governance-in-practice.html`

**Topic coverage:**
1. Quick intro — NIST AI RMF is voluntary, framework-not-regulation, four functions: Map, Measure, Manage, Govern.
2. Map for agents — characterize context, intended use, stakeholders, but ALSO map the agent's tool surface and trust boundaries.
3. Measure for agents — quality, robustness, safety, security; what changes when "the system" is a loop that calls tools.
4. Manage for agents — risk treatment, incident response, change management with agents-in-the-loop.
5. Govern for agents — policies, accountability, oversight; how it stacks with the EU AI Act's "human oversight" requirement.

- [ ] **Step 1: Fact-pass (REQUIRED)**

Verify NIST AI RMF function names and structure against the published RMF (currently 1.0 / Generative AI Profile). Don't invent sub-functions.

- [ ] **Step 2: Read sibling files**

Run:
```
Read src/content/operations/en/governance-in-practice.html
Read src/content/operations/zh/governance-in-practice.html
```

- [ ] **Step 3: Draft `src/content/operations/en/nist-ai-rmf-for-agents.html`**

Header (`C8`, kicker `Operation · Governance & Compliance`, `<h2>` is `NIST AI RMF, for agents.`). 5 steps (one per function plus an intro). 1 callout. 70–110 lines.

- [ ] **Step 4: Draft `src/content/operations/zh/nist-ai-rmf-for-agents.html`**

Mirror; kicker `运维 · 治理与合规`; `<h2>` is `NIST AI RMF——智能体视角。`.

- [ ] **Step 5: Register at position 5**

After the `eu-ai-act-for-agents` entry, insert:

```ts
    { page: 'nist-ai-rmf-for-agents', slug: 'nist-ai-rmf-for-agents', title: L('NIST AI RMF, for agents','NIST AI RMF——智能体视角'), summary: L('Map / Measure / Manage / Govern read as a checklist for agent teams — what each function actually demands when the system is an autonomous agent rather than a model.','把"映射 / 度量 / 管理 / 治理"四件套当作智能体团队的清单来看——当系统是自主智能体而不仅仅是一个模型时，每个职能真正要求什么。') },
```

- [ ] **Step 6: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add src/content/operations/en/nist-ai-rmf-for-agents.html src/content/operations/zh/nist-ai-rmf-for-agents.html src/content/operations/groups/governance-compliance.ts
git commit -m "$(cat <<'EOF'
Add Operation entry: nist-ai-rmf-for-agents

Map / Measure / Manage / Govern as a checklist for agent teams. Pairs
with eu-ai-act-for-agents — same problem, different framework.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 3.7: Author `agent-identity`

**Files:**
- Create: `src/content/operations/en/agent-identity.html`
- Create: `src/content/operations/zh/agent-identity.html`
- Modify: `src/content/operations/groups/safety-and-security.ts` (insert at position 5, after `guardrails`)

**Entry metadata:**
- Slug: `agent-identity`
- EN title: `Agent identity`
- ZH title: `智能体的身份`
- EN summary: `Who is acting when an agent calls a tool? Service accounts, on-behalf-of patterns, and the audit consequences of getting the answer wrong.`
- ZH summary: `智能体调用工具时，到底是"谁"在动作？服务账号、on-behalf-of 模式，以及把这个答案搞错时的审计后果。`
- Group: `safety-and-security`
- Phase-num: `S10`
- EN kicker: `Operation · Safety, Alignment & Agentic Security`
- ZH kicker: `运维 · 安全与防护`

**Sibling files to sample:**
- `src/content/operations/en/guardrails.html` (immediately precedes)
- `src/content/operations/zh/guardrails.html`

**Topic coverage:**
1. The question — when an agent calls a tool, whose identity is on the request? Three patterns: service account (agent's own identity), on-behalf-of (impersonating the user with a delegated token), hybrid (agent identity but user identity in the audit metadata).
2. Trade-offs — service-account is simplest but loses per-user authorization; OBO preserves authorization but expands the blast radius if the agent is compromised.
3. Audit consequences — getting this wrong means the audit log can't answer "who did this?". Specific implications for finance/healthcare/legal entries already covered in Playbooks.
4. Implementation patterns — short-lived OBO tokens, action-scoped delegation, audit metadata that always records BOTH agent and human principals.
5. Anti-pattern: the "robot user" — a literal user account shared by the agent. Don't do it.

- [ ] **Step 1: Read sibling files**

Run:
```
Read src/content/operations/en/guardrails.html
Read src/content/operations/zh/guardrails.html
```

- [ ] **Step 2: Draft `src/content/operations/en/agent-identity.html`**

Header (`S10`, kicker `Operation · Safety, Alignment & Agentic Security`, `<h2>` is `Agent identity.`). 5 steps. 1 callout (`.callout.danger` on "never share a user account with the agent"). 70–110 lines. You may include an in-prose `<a href="/operations/governance-compliance/audit-trails">` link.

- [ ] **Step 3: Draft `src/content/operations/zh/agent-identity.html`**

Mirror; kicker `运维 · 安全与防护`; `<h2>` is `智能体的身份。`.

- [ ] **Step 4: Register at position 5**

Find `guardrails` (position 4) in `src/content/operations/groups/safety-and-security.ts`. After it, insert:

```ts
    { page: 'agent-identity', slug: 'agent-identity', title: L('Agent identity','智能体的身份'), summary: L('Who is acting when an agent calls a tool? Service accounts, on-behalf-of patterns, and the audit consequences of getting the answer wrong.','智能体调用工具时，到底是"谁"在动作？服务账号、on-behalf-of 模式，以及把这个答案搞错时的审计后果。') },
```

- [ ] **Step 5: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/content/operations/en/agent-identity.html src/content/operations/zh/agent-identity.html src/content/operations/groups/safety-and-security.ts
git commit -m "$(cat <<'EOF'
Add Operation entry: agent-identity

Who's acting when an agent calls a tool — service-account vs OBO vs
hybrid, the audit consequences, and the anti-pattern of shared user
accounts. Sets up scoped-credentials-for-agents.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 3.8: Author `scoped-credentials-for-agents`

**Files:**
- Create: `src/content/operations/en/scoped-credentials-for-agents.html`
- Create: `src/content/operations/zh/scoped-credentials-for-agents.html`
- Modify: `src/content/operations/groups/safety-and-security.ts` (insert at position 6, after `agent-identity`)

**Entry metadata:**
- Slug: `scoped-credentials-for-agents`
- EN title: `Scoped credentials for agents`
- ZH title: `面向智能体的范围受限凭证`
- EN summary: `Why agents should never hold human-grade credentials — short-lived, narrowly-scoped, per-action tokens, and the failure modes when you try to take shortcuts.`
- ZH summary: `为何智能体绝不该持有人类级别的凭证——短期、范围窄、按动作签发的令牌，以及走捷径时会撞上的失败模式。`
- Group: `safety-and-security`
- Phase-num: `S11`
- EN kicker: `Operation · Safety, Alignment & Agentic Security`
- ZH kicker: `运维 · 安全与防护`

**Sibling files to sample:**
- `src/content/operations/en/agent-identity.html` (Task 3.7 output)
- `src/content/operations/zh/agent-identity.html`

**Topic coverage:**
1. Why human-grade credentials fail for agents — long-lived, broadly-scoped, can't be revoked granularly; the blast radius if the agent is prompt-injected.
2. The three properties scoped agent credentials need — short-lived (minutes, not days), narrowly-scoped (specific resource + specific action), per-action (re-derive for each tool call).
3. Implementation patterns — STS-style temporary credentials, OAuth scopes per tool, JWT with audience+action claims; the role of an authorization layer that sits BETWEEN the agent and the tool.
4. Failure modes when you take shortcuts — single all-powerful API key, long-lived OAuth tokens, "we'll add scoping later", giving the agent admin "just for this run".
5. Auditing the scope — every credential issuance and every tool call observable; ties to `audit-trails`.

- [ ] **Step 1: Read sibling files**

Run:
```
Read src/content/operations/en/agent-identity.html
Read src/content/operations/zh/agent-identity.html
```

(Note: this references the entry you wrote in Task 3.7. That's intentional — these are intra-PR forward references and the file exists in this worktree.)

- [ ] **Step 2: Draft `src/content/operations/en/scoped-credentials-for-agents.html`**

Header (`S11`, kicker `Operation · Safety, Alignment & Agentic Security`, `<h2>` is `Scoped credentials for agents.`). 5 steps. 1 callout (`.callout.danger` on "no admin-just-for-this-run"). 70–110 lines. You may include an in-prose link to `/operations/safety-and-security/agent-identity` (intra-PR — fine).

- [ ] **Step 3: Draft `src/content/operations/zh/scoped-credentials-for-agents.html`**

Mirror; kicker `运维 · 安全与防护`; `<h2>` is `面向智能体的范围受限凭证。`.

- [ ] **Step 4: Register at position 6**

After the `agent-identity` entry, insert:

```ts
    { page: 'scoped-credentials-for-agents', slug: 'scoped-credentials-for-agents', title: L('Scoped credentials for agents','面向智能体的范围受限凭证'), summary: L('Why agents should never hold human-grade credentials — short-lived, narrowly-scoped, per-action tokens, and the failure modes when you try to take shortcuts.','为何智能体绝不该持有人类级别的凭证——短期、范围窄、按动作签发的令牌，以及走捷径时会撞上的失败模式。') },
```

- [ ] **Step 5: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/content/operations/en/scoped-credentials-for-agents.html src/content/operations/zh/scoped-credentials-for-agents.html src/content/operations/groups/safety-and-security.ts
git commit -m "$(cat <<'EOF'
Add Operation entry: scoped-credentials-for-agents

Short-lived, narrowly-scoped, per-action tokens — and the failure modes
when you try to take shortcuts. Builds on agent-identity.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 3.9: Add the Phase 3 changelog entry

**Files:**
- Create: `src/content/changelog/entries/<merge-date>-operations-p0-launch.ts`

- [ ] **Step 1: Create the changelog entry**

Create the file with:

```ts
import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '<YYYY-MM-DD>',
  title: L(
    'Added P0 Operations: feature flags, kill switches, online vs offline evals, per-customer economics, EU AI Act, NIST AI RMF, agent identity, scoped credentials',
    '新增 P0 运维条目：特性开关、急停开关、在线 vs 离线评测、按客户经济、欧盟 AI 法案、NIST AI RMF、智能体身份、范围受限凭证',
  ),
  items: [
    L(
      'Eight new Operation entries close the launch-coherence gaps the IA expansion flagged for Operations.',
      '八篇新增运维条目，填补了 IA 扩展规划中针对运维板块标出的"上线连贯性"缺口。',
    ),
    L(
      'AgentOps: feature-flags-for-agents, kill-switches. Eval & Obs: online-vs-offline-evals. Economics: per-customer-economics.',
      'AgentOps：feature-flags-for-agents、kill-switches。评估与可观测性：online-vs-offline-evals。经济性：per-customer-economics。',
    ),
    L(
      'Governance: eu-ai-act-for-agents, nist-ai-rmf-for-agents. Safety: agent-identity, scoped-credentials-for-agents.',
      '治理：eu-ai-act-for-agents、nist-ai-rmf-for-agents。安全：agent-identity、scoped-credentials-for-agents。',
    ),
  ],
};
export default entry;
```

- [ ] **Step 2: Run gates**

Run: `npm run build && npm run verify && npm test`
Expected: all pass.

- [ ] **Step 3: Commit**

```bash
git add src/content/changelog/entries/<YYYY-MM-DD>-operations-p0-launch.ts
git commit -m "$(cat <<'EOF'
Changelog: Operations P0 launch

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### Task 3.10: Manual smoke + push + open PR

**Files:** none modified

- [ ] **Step 1: Build and preview**

Run:
```bash
npm run build && npx astro preview &
sleep 2
```

- [ ] **Step 2: Spot-check each new entry**

Visit:
- `http://localhost:4321/operations/agentops/feature-flags-for-agents`
- `http://localhost:4321/operations/agentops/kill-switches`
- `http://localhost:4321/operations/evaluation-and-observability/online-vs-offline-evals`
- `http://localhost:4321/operations/economics-roi/per-customer-economics`
- `http://localhost:4321/operations/governance-compliance/eu-ai-act-for-agents`
- `http://localhost:4321/operations/governance-compliance/nist-ai-rmf-for-agents`
- `http://localhost:4321/operations/safety-and-security/agent-identity`
- `http://localhost:4321/operations/safety-and-security/scoped-credentials-for-agents`
- The same 8 paths under `/zh/operations/...` — ZH renders, kickers match the ZH table in spec §3.3.
- `http://localhost:4321/operations/agentops/` — `feature-flags-for-agents` and `kill-switches` appear in slots 6–7, after `rollout-and-versioning`.
- `http://localhost:4321/operations/safety-and-security/` — `agent-identity` and `scoped-credentials-for-agents` appear in slots 5–6, after `guardrails`.

- [ ] **Step 3: Stop preview**

Run: `pkill -f "astro preview"`

- [ ] **Step 4: Push**

Run: `git push -u origin feat/p0-content-operations`

- [ ] **Step 5: Open the PR**

```bash
gh pr create --title "Operations P0: feature flags, kill switches, evals, economics, governance, identity, scoped creds" --body "$(cat <<'EOF'
## Summary
- Adds 8 P0 Operations entries called out in the IA expansion backlog.
- agentops (2): feature-flags-for-agents, kill-switches.
- evaluation-and-observability (1): online-vs-offline-evals.
- economics-roi (1): per-customer-economics.
- governance-compliance (2): eu-ai-act-for-agents, nist-ai-rmf-for-agents.
- safety-and-security (2): agent-identity, scoped-credentials-for-agents.

Spec: `docs/superpowers/specs/2026-05-22-content-p0-enrichment-design.md`

## Test plan
- [x] `npm run build` / `npm run verify` / `npm test` all pass
- [x] All 16 new pages (8 × en+zh) render with correct kickers
- [x] Each affected group's landing shows the new entries in the right reading order
- [x] Regulatory-content fact-pass done on EU AI Act and NIST AI RMF per spec §6.2

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 6: Verify changelog date matches merge day**

If the changelog date is no longer today at merge time, rename the file and bump `date:`.

Phase 3 complete. Eight new entries live under `/operations/`, one changelog entry, one PR opened.

---

## Cleanup (after all PRs merge)

- [ ] **Step 1: For each merged worktree, remove it and prune the branch**

Run (from `/Users/cq/Git/agentic-ai-wiki`, once per merged worktree):
```bash
git worktree remove .worktrees/p0-content-concepts
git branch -d feat/p0-content-concepts
```

Repeat for `p0-content-playbooks` and `p0-content-operations`. Do not remove the design worktree until its PR also merges.

- [ ] **Step 2: Sync local main**

```bash
git checkout main
git pull origin main
```

- [ ] **Step 3: Confirm the live site**

Visit `https://menuagentic.com/operations/` and `/playbooks/` and `/concepts/`; click into one of the new entries from each section.

---

## Follow-up: not in this plan

After all three content PRs merge, a separate single-PR sweep should land per spec §11:

- Populate `Entry.related` (forward on the 18 new entries, backward on natural existing entries).
- Re-enable the `related` render block in `src/components/pages/GroupIndexView.astro` (removed at line 54 in PR #56 review).
- Add a manifest test asserting every `related` slug resolves to a real entry in its declared source.

That sweep is small (touches `groups/*.ts`, `concepts/manifest.ts`, one component, one test file) and produces user-visible "Related" blocks on group landing pages. Brainstorm it separately when ready.
