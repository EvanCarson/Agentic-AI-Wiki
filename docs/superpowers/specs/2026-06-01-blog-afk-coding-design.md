# Blog post: AFK coding — design

**Status:** approved for planning
**Section:** AI Blog
**Slug:** `afk-coding`
**Date prefix / merge date:** TBD — set to the actual merge day on the final
commit (this spec was written 2026-06-01; bump the post + changelog filenames
and `date:` fields if the calendar moves before merge, per `CLAUDE.md`).

This is a new AI Blog post in the **workflow / opinion-essay** editorial slot,
sitting next to the existing **named-product comparisons**
(*OpenClaw vs OpenHuman vs Hermes Agent*,
*Claude Code vs Codex CLI vs Cursor Agent vs Aider*,
*LangGraph vs CrewAI vs Claude Managed vs OpenAI Agents SDK*) and the
**onboarding guide** (*Getting Started with OpenHuman*). It is **inspired by**
Alex Op's "How to do AFK coding" (alexop.dev) and credits him + the people he
builds on (Geoffrey Huntley on the Ralph loop; Simon Willison; Lee Robinson),
but the prose is original and the voice is the wiki's. Authoring conventions
are fixed by `src/content/blogs/AUTHORING.md`; this spec only records the
post-specific decisions.

---

## 1. Thesis

Modern AI coding agents are very good at *implementation* and very bad at
*large tickets*. The failure mode is not creativity — it is **context
degradation, skipped refactor, and silently dropped tests** as a single
session stretches past where the model can hold the whole problem.

The fix is not a bigger model. It is a **pipeline that splits judgment from
execution**: humans stay in the loop (HITL) for the two ends — spec and
review — and agents work away from the keyboard (AFK) on the middle — slicing,
implementing, refactoring, and QA — in parallel, each in a fresh context.

Takeaway a skimmer leaves with: **the unit of work shifts from a typed line
of code to a reviewed slice; the developer's job shifts from typist to
manager of parallel pipelines.**

## 2. Editorial framing

- **Original, not adaptation.** We cite Alex Op's piece prominently in the
  *Further reading → Sources* block and link out for the original framing.
  All prose is the wiki's; we do not lift sentences.
- **Attribute third-party numeric claims.** The source quotes
  Anthropic-internal stats ("tripled headcount while productivity climbed
  70%", "80–90% of Claude Code now self-written"). These are unverifiable
  from the wiki's vantage point. **Either attribute explicitly to the
  source** (`as Alex Op notes, citing Anthropic …`) **or drop them**. Never
  assert them as wiki fact.
- **Counterbalance is non-optional.** Simon Willison's "AI intensifies
  rather than reduces work" point is the load-bearing caveat — the post
  ends honest, not triumphalist.
- **Wiki-voice signals.** Concrete verbs over hype; second-person sparingly;
  the wiki's existing rhythm of *short paragraphs → diagram → short
  paragraphs*.

## 3. Title & hook

**Title (en):** *AFK Coding: Managing Parallel AI Agents Instead of Typing*

**Title (zh):** *AFK 编程：管理并行的 AI 智能体，而不是亲自敲代码*

**Hook lede (en, draft — refine at authoring time):**
> Hand an agent a five-point ticket and watch it quietly delete the failing
> test, paper over a bad refactor, and ship something that compiles but
> does the wrong thing. The bug is not the model — it is the workflow that
> asked one fresh context to hold the whole feature. *AFK coding* trades
> that single long session for a pipeline: humans stay in the loop for spec
> and review, agents run **away from the keyboard** on slices, refactor,
> and QA. The unit of work is no longer a typed line; it is a reviewed slice.

**Hook lede (zh, draft — faithful translation, not byte-mirror):**
> 给一个智能体丢过去一个五故事点的工单，看着它悄悄删掉失败的测试、糊弄一次糟糕的
> 重构，最后交出一份能编译、却没做对事的代码。锅不在模型，而在让一个新开的上下文
> 扛下整个功能的工作流。**AFK 编程**用流水线替换那一次性的长会话：人保留在
> *规格制定* 与 *评审* 两端的回路里，智能体则在 *切片实现、重构、QA* 几个中间
> 环节"离开键盘"地并行运转。工作的最小单位不再是一行敲出来的代码，而是一段被
> 评审过的纵向切片。

Lede is ~90 words — above the 30-word skimmer mark, but the diagnostic in
sentence one (delete the failing test / paper over a bad refactor) is the
eye-catching work. Acceptable; tighten only if it reads long in the layout.

## 4. Section structure

Body-only HTML fragments at `src/content/blogs/{en,zh}/afk-coding.html`. Eight
content sections after the lede, plus FAQ and Further reading — same overall
rhythm as the existing blog posts.

1. **Hook lede** (no `<h2>`, no "TL;DR" label) — text above.

2. **At a glance** — *snippet bait*. Two pieces of payload:
   - A ≤4-column table of the six pipeline phases:
     `Phase | Owner | HITL / AFK | One-line role`. Phases:
     align-on-spec, slice-into-vertical-tickets, ralph-loop-per-slice,
     refactor-pass, agentic-qa, human-review.
   - A short paragraph + small `<ul>` on **ticket sizing**:
     1–3 story points → one prompt, one session, ship direct;
     5+ points → context overflow / skipped refactor / silent test
     deletion → use the pipeline.
   - **No diagram in this section.** The vertical-vs-horizontal slicing
     diagram lives in §5; this section stays text-only to keep the
     "at-a-glance" payload skim-able.

3. **Why big tickets break agents** — three subheadings (`<h3>`):
   *context degradation*, *append-don't-restructure refactor failure*,
   *silent test deletion under pressure*. Two-to-three short paragraphs
   each. Internal links: `concepts/context-windows`,
   `concepts/the-agent-loop`, `concepts/planning-and-termination`.

4. **The six-phase pipeline** — *hero* section. Single big diagram
   (`pipeline-six-phase.svg`) showing the six phases left-to-right with
   HITL endpoints accent-coloured and AFK middle steps neutral. Then a
   short paragraph per phase under `<h3>` subheadings — what enters, what
   leaves, who owns it.

5. **Vertical slices beat horizontal layers** — argument + diagram
   (`slicing-vertical-vs-horizontal.svg`). Horizontal slicing (frontend /
   backend / tests as separate strips) creates blocking dependencies and
   amplifies a single failure; vertical slices each ship complete behavior
   and survive partial failure. Comparative prose, not three sequential
   descriptions. Internal links: **optional** deep-dive cross-link into the
   `architectures-and-patterns` group — only if a clean match exists at
   authoring time; otherwise stay within the concept links already cited
   in §3.

6. **The Ralph loop** — Geoffrey Huntley's pattern: fresh context per
   iteration, read a prompt file listing unchecked tasks, implement one,
   commit, exit. Many cheap runs converge better than one perfect attempt
   ("the technique is deterministically bad in an undeterministic world").
   Diagram: `ralph-loop.svg` showing the fresh-context cycle. Internal
   links: `concepts/the-agent-loop`,
   `concepts/planning-and-termination`,
   field-guide `code-agents` (`/field-guide/code-agents`).

7. **Backpressure: tests, types, lint** — *why automated feedback is the
   load-bearing safety mechanism.* Without it, an agent under deadline
   pressure removes failing tests rather than fixing the code. Tests,
   strict types, and lint rules turn each Ralph iteration into a
   red/green gate the agent cannot silently bypass. Internal links:
   `concepts/guardrails-101`, `concepts/evals-101`.

8. **Parallelism: git worktrees + agentic QA** — how the AFK steps run
   side by side without trampling each other. Git worktrees give each
   agent isolated state; per-agent log files surface what each one is
   doing. Agentic QA (`agent-browser` and similar) closes the
   unit-tests-pass-but-feature-broken gap by driving a real browser via
   accessibility snapshots, not CSS selectors. Internal links:
   field-guide `computer-use` (`/field-guide/computer-use`),
   field-guide `multi-agent` (`/field-guide/multi-agent`), and the
   blog post `claude-code-vs-codex-cli-vs-cursor-agent-vs-aider`.

9. **The human stays the bottleneck** — the honest counterbalance.
   Parallelism is bounded by **review capacity**, not agent capacity.
   Stacking more parallel agents than a human can review just enlarges
   the queue. Cite Simon Willison's caveat about AI intensifying rather
   than reducing work. Burnout is a real failure mode of compulsive
   task-stacking. Internal links: `concepts/autonomy-levels`,
   `concepts/when-to-use-an-agent`.

10. **FAQ** (`<section class="faq">` — load-bearing class, drives JSON-LD).
    Five Q/A pairs, each `<h3>` Q immediately followed by one `<p>` A.
    Candidate questions (refine at authoring):
    - *What ticket size is too small for the AFK pipeline?* (1–3 pts → skip it.)
    - *Do I need four agents in parallel?* (No — start with one slice + Ralph;
      add parallelism only when review capacity allows.)
    - *What if I do not have eval coverage yet?* (Then you have no
      backpressure; build tests first, then turn on AFK runs.)
    - *Is this only for greenfield code?* (No, but legacy code raises the
      cost of vertical slicing; budget extra for spec.)
    - *How is this different from "just running an agent overnight"?*
      (Fresh contexts per iteration + backpressure + agentic QA — the
      delta is judgment-at-the-ends, not duration.)

11. **Further reading.**
    - *On this wiki* (cross-links, all `<a href="…">` in en, mirrored to
      `/zh/...` in the zh fragment):
      `/concepts/the-agent-loop`, `/concepts/context-windows`,
      `/concepts/planning-and-termination`, `/concepts/guardrails-101`,
      `/concepts/evals-101`, `/concepts/autonomy-levels`,
      `/concepts/when-to-use-an-agent`,
      `/field-guide/code-agents`, `/field-guide/computer-use`,
      `/field-guide/multi-agent`,
      `/blogs/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider`.
    - *Sources* (external, in this order, with explicit credit lines):
      Alex Op — *How to do AFK coding* (alexop.dev, the piece this post
      builds on); Geoffrey Huntley — Ralph loop write-up; Simon Willison
      on AI intensifying work; Lee Robinson on "writing code was never
      the bottleneck"; the source's own Anthropic-stats citation
      (attributed, not asserted by us).

## 5. Diagrams (SVGs under `public/blogs/afk-coding/`)

Three diagrams. **Drop the worktrees diagram** per the brainstorm decision
to keep the post tight; cover parallelism in §8 prose only.

| File | viewBox | Role |
|---|---|---|
| `pipeline-six-phase.svg` | `0 0 900 500` | Hero. Six labelled boxes left-to-right (Spec → Slice → Ralph → Refactor → QA → Review). HITL endpoints filled `var(--accent)`; AFK middle steps filled `var(--paper-2)` with `var(--ink)` stroke. Arrows in `currentColor`. Small caption tag on each box (`HITL` / `AFK`). |
| `slicing-vertical-vs-horizontal.svg` | `0 0 900 400` | Side-by-side comparison. Left half = three horizontal strips (frontend / backend / tests) with a red dependency arrow; right half = three vertical slices each spanning all layers. Use `var(--accent)` on the vertical-slice side as the recommended pattern; `var(--paper-2)` on the horizontal side. |
| `ralph-loop.svg` | `0 0 900 400` | Circular flow: *read prompt file → pick one unchecked task → implement → commit → fresh context → repeat*. Accent on the "fresh context" return arrow — that is the load-bearing detail. |

All three follow AUTHORING.md §3: themeable colors only (`var(--ink)`,
`var(--paper-2)`, `var(--accent)`, `var(--accent-soft)`, `currentColor`),
`role="img"` + `<title>` + `<desc>` + `aria-labelledby`, no scripts, no
captions inside the SVG (use `<figcaption>` in the HTML).

## 6. Metadata file (`posts/<merge-date>-afk-coding.ts`)

```ts
import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: 'YYYY-MM-DD',                          // = filename prefix = merge day
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

**Tag choices**: `coding-agents` and `developer-tools` already exist in
`posts/2026-05-28-claude-code-vs-codex-cli-vs-cursor-agent-vs-aider.ts` —
reused, not minted. `workflow` and `agentic-qa` are new and consistent with
the kebab-case regex; both will gain auto-generated tag index pages at
`/blogs/tag/workflow` and `/blogs/tag/agentic-qa`. Reconcile against
`grep tags src/content/blogs/posts/*.ts` at authoring time in case a sibling
tag emerged in the meantime.

## 7. Bilingual plan

- Both `en/afk-coding.html` and `zh/afk-coding.html` exist with **identical
  structural HTML** — same `<section>`, `<figure>`, `<h2>`, `<h3>`,
  `class="faq"` placement.
- zh prose is a **faithful translation, not a byte-mirror** (per
  `CLAUDE.md` Document-openers rule and AUTHORING.md §8).
- Keep these terms in English in zh prose: *HITL*, *AFK*, *Ralph loop*,
  *git worktree*, *agentic QA*, *MCP*, *LLM*, *PRD*, *CSS*, *PR*, plus all
  product / person names (Alex Op, Geoffrey Huntley, Simon Willison, Lee
  Robinson, Anthropic, Claude Code, Cursor, Codex CLI, Aider).
- zh internal links use the `/zh/...` prefix:
  `/zh/concepts/the-agent-loop`, `/zh/field-guide/code-agents`,
  `/zh/blogs/claude-code-vs-codex-cli-vs-cursor-agent-vs-aider`, etc.
- Punctuation: full-width in zh prose (`，` `。` `：` `；` `——` `（）`);
  ASCII inside `<code>` (no `<pre>` blocks are currently planned for this
  post — if one is added, it must be byte-identical across locales).
- Caption (`<figcaption>`) text translated; image `src` paths identical
  between locales.

## 8. Changelog entry

`src/content/changelog/entries/<merge-date>-afk-coding.ts` — bilingual title
+ bullets, default-export a `ChangelogEntry`. Single entry covering the new
post. Copy the existing `2026-05-28-...openhuman...` entry as a template;
date must equal merge day. Bullets (draft):

- en: *New AI Blog post: AFK coding — a six-phase pipeline that splits
  judgment (spec, review) from execution (slices, Ralph loop, refactor,
  agentic QA).*
- zh: *新增 AI Blog 文章：AFK 编程——把判断（规格、评审）与执行（切片、Ralph
  循环、重构、Agentic QA）分到六阶段流水线两端。*

## 9. Verification gates

Before pushing the final commit (per `CLAUDE.md` + AUTHORING.md §10):

```bash
npm run build          # static build to dist/ — no new warnings
npm run verify         # bilingual completeness / no orphans / internal links resolve
npm test               # extraction tests incl. blogs.test.mjs (slug uniqueness, date prefix, tag shape)
npm run search:index && npm run test:search
```

Then manually:

1. Date bump if the calendar moved past the original draft date. Rename
   both the post file and the changelog entry file; update the `date:`
   field inside each.
2. Open `http://localhost:4321/blogs/afk-coding` in a browser. Toggle dark
   mode. Scroll the full length. Click section TOC entries on the left
   rail. Verify the three diagrams render and theme correctly.
3. `view-source:` the detail page; confirm both `"@type":"BlogPosting"`
   and `"@type":"FAQPage"` JSON-LD blocks are present.
4. Check the zh mirror at `/zh/blogs/afk-coding`.

## 10. Scope guardrails

In scope:

- One AI Blog post (en + zh fragments + metadata + three SVGs + changelog
  entry).
- Cross-links into existing concepts / field-guide chapters / one prior
  blog post.

Out of scope (explicitly — do not expand the PR):

- Adding new Concept or Deep-Dive pages on Ralph loop / vertical slicing /
  agentic QA. If they would help, file follow-up issues; do not bundle.
- Authoring-convention changes (`BlogLayout.astro`, `guide.css`,
  `AUTHORING.md`). The post must work within the existing system.
- A second post in the same PR. If the source inspires more material,
  ship this one first.
