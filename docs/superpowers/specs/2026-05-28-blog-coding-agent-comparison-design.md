# Blog post: Coding-agent comparison (Post A) — design

**Status:** approved for planning
**Section:** AI Blog
**Slug:** `claude-code-vs-codex-cli-vs-cursor-agent-vs-aider`
**Date prefix / merge date:** TBD — set to the actual merge day on the final commit
(this spec was written 2026-05-28; bump the post + changelog filenames and `date:`
fields if the calendar moves before merge, per `CLAUDE.md`).

This is the second post in the AI Blog. It deliberately occupies the same
**named-product comparison** editorial slot as the first post
(*OpenClaw vs OpenHuman vs Hermes Agent*) but targets a different sub-niche —
**coding agents you run day-to-day** — so the two read as a series without
overlapping. Authoring conventions are fixed by
`src/content/blogs/AUTHORING.md`; this spec only records the post-specific
decisions.

---

## 1. Thesis

All four agents edit your repo. They diverge on **four load-bearing decisions**,
and those decisions — not the feature list — determine where each one shines or
breaks:

1. **Sandbox & filesystem trust boundary** — none / permission-prompted local /
   IDE-mediated local / full sandboxed VM.
2. **Planning loop shape** — explicit task-list plan (Claude Code's Tasks) /
   task queue (Codex) / interactive plan-then-diff (Cursor) /
   architect-editor two-pass (Aider).
3. **Tool catalog vs the shell** — deep typed tool catalog + MCP /
   shell-first / IDE-wrapped / narrow tools + git.
4. **Commit / output policy** — commit on demand / PR-as-output /
   diff-for-review / commit-per-edit.

Takeaway a skimmer leaves with: **tool catalog ≠ capability; architecture is the
differentiator.**

## 2. Lineup (fixed)

Four entrants, mixed lanes for maximum architectural variance:

| Agent | Lane | Defining trait |
|---|---|---|
| **Claude Code** | terminal harness | deep typed tool catalog + skills + MCP + deferred tools; explicit task-list (Tasks) loop |
| **Codex CLI** | sandboxed shell | full sandboxed VM, shell-first tool surface, PR-as-output |
| **Cursor Agent** | IDE-integrated | IDE-mediated FS, plan-then-diff with human review |
| **Aider** | git-first CLI | edit-blocks prompt format, commit-per-edit, git as the protocol |

## 3. Title & hook

**Title (en):** *Claude Code vs Codex CLI vs Cursor Agent vs Aider: Four
Architectures of the Coding-Agent Loop*

**Title (zh):** *Claude Code、Codex CLI、Cursor Agent 与 Aider：编码智能体循环的四种架构*

**Hook lede (en, draft — refine at authoring time):**
> *"Make the failing test pass"* — four coding agents, same prompt, same repo,
> four completely different theories of what should happen next, as of late
> May 2026. Claude Code spins up a task-list plan; Codex CLI starts a sandboxed
> VM; Cursor's agent drafts a multi-file diff and waits for review; Aider goes
> straight to one chunk and one commit. The feature lists barely diverge. The
> traces look like they came from four different species — because the
> **architecture** is the product, not the tool catalog.

**Hook lede (zh, draft — faithful translation, not byte-mirror):**
> *"修好这个失败的测试"*——截至 2026 年 5 月下旬，同一个仓库、同一句提示，四款编码
> 智能体给出了完全不同的下一步剧本：Claude Code 列出一份任务清单；Codex CLI
> 拉起一台沙箱 VM；Cursor 的 Agent 模式给出跨文件 diff 等你审核；Aider 直奔某个代码块、
> 提交一次。功能清单几乎相同，运行轨迹却像四个物种——因为**架构本身就是产品**，
> 工具清单不是。

Lede is ~78 words (above the 30-word skimmer mark) but the named-product payoff
in sentence one carries the eye. Acceptable; tighten only if it reads long in
the layout.

## 4. Section structure

Body-only HTML fragments at `src/content/blogs/{en,zh}/<slug>.html`. ~10 sections
(one more deep-dive than the first post because there are four entrants).

1. **Hook lede** — no `<h2>`.
2. **At a glance** — 4-row table (Project · Released · Niche · Deployment shape)
   + feature-matrix heatmap figure. **No GitHub-stars bar chart** — Claude Code
   and Cursor aren't open-source CLIs, so a stars chart would mislead. A muted
   one-line snapshot-date note sits under the table (see §7).
3. **Claude Code — deep dive** — `arch-claude-code.svg` + the harness model,
   deferred-tool schemas + skills + MCP, the task-list (Tasks) loop.
4. **Codex CLI — deep dive** — `arch-codex-cli.svg` + sandboxed VM, shell-first
   tool surface, PR-as-output policy.
5. **Cursor Agent — deep dive** — `arch-cursor-agent.svg` + IDE-mediated FS,
   plan-then-diff loop, multi-file edit semantics.
6. **Aider — deep dive** — `arch-aider.svg` + git-as-protocol, edit-blocks
   format, chunk-by-chunk discipline.
7. **Cross-cutting comparison** — three axes, each a short SVG + comparative
   prose (write across all four per paragraph, never four sequential
   descriptions):
   - Axis 1 · Sandbox & filesystem trust boundary (`compare-sandbox.svg`)
   - Axis 2 · Planning loop shape (`compare-plan-loop.svg`)
   - Axis 3 · Tool catalog vs the shell (`compare-tools-vs-shell.svg`)
   - Fourth axis — commit/output policy — prose only + a small inline table.
8. **When to pick which** — decision matrix table:
   Use case × Pick Claude Code if… × Pick Codex CLI if… × Pick Cursor if… ×
   Pick Aider if…
9. **FAQ** — `<section class="faq">`, six Q→A pairs (see §6). Load-bearing for
   the JSON-LD `FAQPage` parser: each `<h3>` immediately followed by one `<p>`,
   no nested `<section>`.
10. **Further reading** — internal wiki links + each project's docs/source.

## 5. Diagrams (SVG inventory)

~12 files under `public/blogs/<slug>/` (logos under `logos/`). All follow the
AUTHORING §3 rules: viewBox-based, themeable CSS-var colors only (no bare hex
except as `var(...)` fallback), `role="img"` + `<title>` + `<desc>`, no scripts.

| File | Purpose | viewBox |
|---|---|---|
| `logos/claude-code.svg` | brand mark | 0 0 32 32 |
| `logos/codex-cli.svg` | brand mark | 0 0 32 32 |
| `logos/cursor.svg` | brand mark | 0 0 32 32 |
| `logos/aider.svg` | brand mark | 0 0 32 32 |
| `arch-claude-code.svg` | harness + tool catalog + skills + MCP + task-list loop | 0 0 900 500 |
| `arch-codex-cli.svg` | sandboxed VM + shell tool + queue + PR output | 0 0 900 500 |
| `arch-cursor-agent.svg` | IDE host + provider router + plan/diff/apply loop | 0 0 900 500 |
| `arch-aider.svg` | REPL + edit-blocks parser + git commit cycle | 0 0 900 500 |
| `data-feature-matrix.svg` | 4 rows × ~6 axes heatmap (weak/medium/strong) | 0 0 900 500 |
| `compare-sandbox.svg` | 4-column axis comparison | 0 0 900 300 |
| `compare-plan-loop.svg` | 4-column axis comparison | 0 0 900 300 |
| `compare-tools-vs-shell.svg` | 4-column axis comparison | 0 0 900 300 |

**Feature-matrix axes (columns):** sandbox model · planning loop · MCP support ·
multi-file edits · IDE-native · commit policy. Three levels color-coded
weak (`var(--paper-2)`) / medium (`var(--accent-soft)`) / strong (`var(--accent)`).

**4-column layout decision:** the AUTHORING cross-cutting convention is three
columns at x=160/450/750. For four entrants, tighten to **x=125/375/625/875
inside the same 900-wide viewBox** (~225px/column — fits a header + 2 short
label lines). Keeps figures aligned with the rest of the site rather than
widening to 1100.

## 6. FAQ (final six)

1. What's the actual difference between Claude Code and Codex CLI?
2. Does Cursor's Agent mode replace its chat?
3. Can Aider use MCP servers?
4. Which coding agent is best for a large monorepo?
5. Do these agents send my code to the cloud?
6. Can I run any of these against a local model?

## 7. Snapshot-date mechanic

Coding agents iterate weekly; the post wears its half-life in two places:

1. **In the lede** — the phrase "…as of late May 2026" (already in §3 draft).
2. **Under the "At a glance" table** — a muted one-line note:
   *"Snapshot: 2026-MM-DD. Behavior observed the preceding week; verify in your
   own environment."* Fix the exact date on merge day.

## 8. Tags

`agent-comparison` · `architecture` · `coding-agents` · `developer-tools`

`agent-comparison` and `architecture` are reused from the first post (cross-post
anchors). `coding-agents` and `developer-tools` are new. Skipping `open-source`
(mixed lineup) and `agent-frameworks` (these aren't frameworks in the
orchestration sense). All four match the tag regex
`^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$`.

## 9. Internal-link surface

All targets verified against the concept/deep-dive manifests so
`check-internal-links.mjs` passes. **Route shapes (confirmed against
`src/pages/`):** concepts are flat `/concepts/<slug>`; deep-dives are
**group-nested `/deep-dives/<group-key>/<slug>`** (the route is
`[group]/[slug].astro`). zh fragment uses the `/zh/` prefix on every internal
link.

**Inline in the body:**
- Lede / agent-loop discussion → `/concepts/the-agent-loop`, `/deep-dives/architectures-and-patterns/react-pattern`
- Claude Code deep-dive (tools/skills) → `/deep-dives/tool-capability-design/tool-design-principles`, `/deep-dives/architectures-and-patterns/tool-error-recovery`
- Codex CLI sandbox discussion → `/deep-dives/architectures-and-patterns/tool-error-recovery`, `/deep-dives/protocols-and-interop/structured-tool-io`
- Cursor plan-then-diff → `/deep-dives/architectures-and-patterns/plan-and-execute`
- MCP comparisons → `/deep-dives/protocols-and-interop/mcp-architecture`, `/deep-dives/protocols-and-interop/building-interoperable-agents`
- Context-handling differences → `/deep-dives/memory-and-context/context-budgeting`

**Further reading section:** `/concepts/what-is-an-agent`,
`/concepts/tool-calling-explained`,
`/deep-dives/tool-capability-design/tool-design-antipatterns`, plus each
project's official docs / source repo.

Group keys for reference: `architectures-and-patterns`, `memory-and-context`,
`multi-agent-systems`, `protocols-and-interop`,
`reasoning-and-test-time-compute`, `retrieval-and-rag`,
`tool-capability-design`, `training-agentic-models`.

## 10. Files to create / touch

- `src/content/blogs/posts/<merge-date>-claude-code-vs-codex-cli-vs-cursor-agent-vs-aider.ts` — `BlogPost` metadata (date, slug, bilingual title + summary, tags).
- `src/content/blogs/en/<slug>.html` — English body fragment.
- `src/content/blogs/zh/<slug>.html` — Chinese body fragment (faithful translation; `<pre>` byte-identical if any; `/zh/` internal links).
- `public/blogs/<slug>/*.svg` + `public/blogs/<slug>/logos/*.svg` — the 12 diagrams in §5.
- `src/content/changelog/entries/<merge-date>-coding-agent-showdown.ts` — bilingual `ChangelogEntry` (new post; new tags `coding-agents`, `developer-tools`).

## 11. Verification gates (must pass before PR/merge)

```
npm run build                                  # static build, no new warnings
npm run verify                                 # bilingual completeness, internal links, OG meta
npm test                                       # incl. blogs.test.mjs (slug uniqueness, date prefix, tag shape)
npm run search:index && npm run test:search    # pagefind index + search test
```

Then manual: open `/blogs/<slug>` and `/zh/blogs/<slug>`, toggle dark mode,
scroll full length, click left-rail TOC entries, and `view-source:` confirm both
`"@type":"BlogPosting"` and `"@type":"FAQPage"` JSON-LD blocks are present.

## 12. Out of scope

- Benchmark tables (SWE-bench etc.) — considered and rejected for the at-a-glance
  bar chart; the post is architecture-first, not leaderboard-first. May add a
  single SWE-bench Verified figure later if a numeric anchor is wanted, but not
  in v1.
- The orchestration-framework comparison (LangGraph / CrewAI / Anthropic Managed
  Agents / OpenAI Agents SDK) is **Post C** — its own spec, plan, and PR.
- Autonomous-remote agents (Devin etc.) — out of this lineup by the scoping
  decision; mention in prose at most.
