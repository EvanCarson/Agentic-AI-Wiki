# Blog post: Orchestration-framework comparison (Post C) — design

**Status:** approved for planning
**Section:** AI Blog
**Slug:** `langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk`
**Date prefix / merge date:** TBD — set to the actual merge day on the final commit
(spec written 2026-05-28; bump the post + changelog filenames and `date:` fields
if the calendar moves before merge, per `CLAUDE.md`).

Third post in the AI Blog, same **named-product comparison** editorial slot as
the first two. Sub-niche: the **agent orchestration layer** — the framework most
teams pick in their first sprint. Sister post to the coding-agent comparison
(Post A, `2026-05-28-blog-coding-agent-comparison-design.md`); independent
spec/plan/PR. Authoring conventions are fixed by
`src/content/blogs/AUTHORING.md`; this spec records only post-specific decisions.

---

## 1. Thesis

All four let you "orchestrate agents." The spine of the post is one question the
feature lists hide: **where does your agent's state actually live?** — because
that decides which one you can operate in production. Four load-bearing
decisions:

1. **State ownership & durability** — explicit checkpointed state object you own
   (LangGraph) / implicit, in-memory in the crew (CrewAI) / server-held, never
   on your machine (Claude Managed Agents) / process-local session, ephemeral
   unless persisted (OpenAI Agents SDK).
2. **Control-flow model** — graph nodes + (conditional) edges / role + task
   declaration / server-side autonomous loop / plain code + handoffs.
3. **Multi-agent stance** — subgraphs / crews are multi by construction /
   sub-agents / handoffs between agents.
4. **Where it runs & who operates it** — your infra (LangGraph, CrewAI, OpenAI
   SDK) vs vendor infra (Claude Managed Agents).

Takeaway a skimmer leaves with: **the feature matrices nearly match; state
ownership is the axis that actually separates these tools.**

## 2. Lineup (fixed)

| Framework | Lane | Defining trait |
|---|---|---|
| **LangGraph** | explicit graph DSL | you draw the state machine; checkpointed, durable state object you own |
| **CrewAI** | role-based crews | declare agents-with-roles + tasks; framework threads context; state mostly implicit |
| **Claude Managed Agents** | managed service | submit a goal; the server runs the loop and holds the state; you poll/stream results |
| **OpenAI Agents SDK** | minimal code-first | agents + tools + handoffs + guardrails + sessions; a thin runner loop in your process |

## 3. Title & hook

**Title (en) — recommended (keeps the series format):**
*LangGraph vs CrewAI vs Claude Managed Agents vs OpenAI Agents SDK: Four
Architectures of the Orchestration Layer*

Decided: lead with the series-format title for consistency with the first two
posts; carry the state thesis in the hook and the cross-cutting section. (The
thesis-forward alt — "Where Does Your Agent's State Live? …" — was considered
and set aside to keep the AI-Blog titles reading as a set.)

**Title (zh):** *LangGraph、CrewAI、Claude Managed Agents 与 OpenAI Agents
SDK：编排层的四种架构*

**Hook lede (en, draft — refine at authoring time):**
> Wire up the same three-step workflow — research, draft, review — in all four
> and the code looks nearly identical: name some agents, give them tools, hit
> run. Then the first run crashes halfway. LangGraph replays from its last
> checkpoint; Anthropic's managed runtime never lost the thread because the
> state was never on your machine; CrewAI and the OpenAI Agents SDK start from
> nothing. The feature matrices almost match. The thing that decides which one
> you can actually operate in production is invisible on the feature list:
> **where your agent's state lives.**

**Hook lede (zh, draft — faithful translation, not byte-mirror):**
> 把同一个三步工作流——检索、起草、审核——在这四者里各搭一遍，代码看上去几乎一样：
> 给几个智能体起名、配工具、点运行。然后第一次运行中途崩溃。LangGraph 从上一个检查点
> 重放；Anthropic 的托管运行时根本没丢线索，因为状态从不在你的机器上；CrewAI 与
> OpenAI Agents SDK 则从零重来。功能矩阵几乎一致，但真正决定你能不能在生产环境里运维
> 它的那一点，在功能清单上看不见：**你的智能体状态到底存在哪里。**

## 4. Section structure

Body-only HTML at `src/content/blogs/{en,zh}/<slug>.html`. ~10 sections.

1. **Hook lede** — no `<h2>`.
2. **At a glance** — 4-row table (Framework · Released / maintainer · Primary
   niche · Where it runs) + feature-matrix heatmap. **No GitHub-stars bar
   chart** — mixed open-source (LangGraph, CrewAI, OpenAI Agents SDK) and managed
   service (Claude Managed Agents), so a stars chart would mislead (same
   reasoning as Post A). Muted snapshot-date note under the table (§7).
3. **LangGraph — deep dive** — `arch-langgraph.svg` + graph nodes, the state
   object, the checkpointer/durability story, conditional edges.
4. **CrewAI — deep dive** — `arch-crewai.svg` + crew/agent/task model,
   sequential vs hierarchical process, where context is threaded implicitly.
5. **Claude Managed Agents — deep dive** — `arch-claude-managed-agents.svg`
   + client submits goal, server runs the loop, server-side tool execution,
   poll/stream results, what you give up and gain.
6. **OpenAI Agents SDK — deep dive** — `arch-openai-agents-sdk.svg` + agents +
   tools + handoffs + guardrails + sessions, the thin runner loop.
7. **Cross-cutting comparison** — three axes, each a short SVG + comparative
   prose (write across all four per paragraph):
   - Axis 1 · Where state lives & durability (`compare-state.svg`)
   - Axis 2 · Control-flow model (`compare-control-flow.svg`)
   - Axis 3 · Multi-agent stance (`compare-multi-agent.svg`)
   - Fourth axis — where it runs / who operates it — prose only + small inline
     table.
8. **When to pick which** — decision matrix table:
   Use case × Pick LangGraph if… × Pick CrewAI if… × Pick Claude Managed if…
   × Pick OpenAI Agents SDK if…
9. **FAQ** — `<section class="faq">`, six Q→A pairs (§6). JSON-LD `FAQPage`
   rules: each `<h3>` immediately followed by one `<p>`, no nested `<section>`.
10. **Further reading** — internal wiki links + each project's docs/source.

## 5. Diagrams (SVG inventory)

~12 files under `public/blogs/<slug>/` (logos under `logos/`). AUTHORING §3 rules:
viewBox-based, themeable CSS-var colors only, `role="img"` + `<title>` + `<desc>`,
no scripts.

| File | Purpose | viewBox |
|---|---|---|
| `logos/langgraph.svg` | brand mark | 0 0 32 32 |
| `logos/crewai.svg` | brand mark | 0 0 32 32 |
| `logos/claude-managed-agents.svg` | brand mark | 0 0 32 32 |
| `logos/openai-agents-sdk.svg` | brand mark | 0 0 32 32 |
| `arch-langgraph.svg` | nodes + state object + checkpointer + conditional edges | 0 0 900 500 |
| `arch-crewai.svg` | crew + role-agents + tasks + process model | 0 0 900 500 |
| `arch-claude-managed-agents.svg` | client → server loop → tool exec → poll/stream | 0 0 900 500 |
| `arch-openai-agents-sdk.svg` | agent + tools + handoffs + guardrails + sessions + runner | 0 0 900 500 |
| `data-feature-matrix.svg` | 4 rows × 6 axes heatmap (weak/medium/strong) | 0 0 900 500 |
| `compare-state.svg` | 4-column axis comparison | 0 0 900 300 |
| `compare-control-flow.svg` | 4-column axis comparison | 0 0 900 300 |
| `compare-multi-agent.svg` | 4-column axis comparison | 0 0 900 300 |

**Feature-matrix axes (columns):** state durability · control-flow model ·
multi-agent first-class · streaming · human-in-the-loop · self-hosted vs managed.
Three levels: weak (`var(--paper-2)`) / medium (`var(--accent-soft)`) /
strong (`var(--accent)`).

**4-column layout decision:** same as Post A — tighten the cross-cutting columns
to x=125/375/625/875 inside the 900-wide viewBox (the AUTHORING convention's
three-column x=160/450/750 doesn't fit four entrants).

## 6. FAQ (final six)

1. What's the difference between LangGraph and the OpenAI Agents SDK?
2. Is CrewAI built on LangChain?
3. Do I have to self-host LangGraph, or is there a managed version?
4. Can I use Claude / non-OpenAI models with the OpenAI Agents SDK?
5. When should I use a framework at all instead of a plain `while` loop?
6. Which framework is best for long-running, durable workflows?

## 7. Snapshot-date mechanic

Same as Post A (these iterate slower than coding agents but still move):
1. **In the lede** — a short "as of late May 2026" phrase (add at authoring time;
   the §3 draft omits it — insert before merge).
2. **Under the "At a glance" table** — muted note: *"Snapshot: 2026-MM-DD.
   Verify against current docs; these frameworks change fast."* Fix the date on
   merge day.

## 8. Tags

`agent-comparison` · `architecture` · `agent-frameworks` · `orchestration`

`agent-comparison`, `architecture`, `agent-frameworks` reused from the first post
(`agent-frameworks` genuinely fits here — these *are* frameworks). `orchestration`
is new. All match the tag regex `^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$`.

## 9. Internal-link surface

Verified against the manifests + route shapes in `src/pages/`. Concepts are flat
`/concepts/<slug>`; deep-dives are group-nested
`/deep-dives/<group-key>/<slug>`. zh fragment uses the `/zh/` prefix on every
internal link.

**Inline in the body:**
- "Do you even need a framework" / loop discussion → `/concepts/the-agent-loop`, `/concepts/agent-frameworks`
- LangGraph control-flow → `/deep-dives/architectures-and-patterns/plan-and-execute`
- State / durability discussion → `/deep-dives/memory-and-context/short-vs-long-term-memory`
- Multi-agent stance → `/deep-dives/multi-agent-systems/multi-agent-when-and-why`, `/deep-dives/multi-agent-systems/multi-agent-topologies`, `/deep-dives/multi-agent-systems/supervisor-worker-pattern`
- Single- vs multi-agent framing → `/deep-dives/architectures-and-patterns/single-vs-multi-agent`
- Termination / when to stop → `/concepts/planning-and-termination`

**Further reading section:** `/concepts/agent-frameworks`,
`/concepts/the-agent-loop`,
`/deep-dives/multi-agent-systems/supervisor-worker-pattern`, plus each project's
official docs / source repo.

Group keys for reference: `architectures-and-patterns`, `memory-and-context`,
`multi-agent-systems`, `protocols-and-interop`,
`reasoning-and-test-time-compute`, `retrieval-and-rag`,
`tool-capability-design`, `training-agentic-models`.

## 10. Files to create / touch

- `src/content/blogs/posts/<merge-date>-langgraph-vs-crewai-vs-claude-managed-agents-vs-openai-agents-sdk.ts` — `BlogPost` metadata.
- `src/content/blogs/en/<slug>.html` — English body fragment.
- `src/content/blogs/zh/<slug>.html` — Chinese body fragment (faithful translation; `<pre>` byte-identical if any; `/zh/` internal links).
- `public/blogs/<slug>/*.svg` + `public/blogs/<slug>/logos/*.svg` — the 12 diagrams in §5.
- `src/content/changelog/entries/<merge-date>-orchestration-framework-comparison.ts` — bilingual `ChangelogEntry` (new post; new tag `orchestration`).

## 11. Verification gates (must pass before PR/merge)

```
npm run build
npm run verify
npm test
npm run search:index && npm run test:search
```

Then manual: open `/blogs/<slug>` and `/zh/blogs/<slug>`, toggle dark mode,
scroll full length, click left-rail TOC entries, and `view-source:` confirm both
`"@type":"BlogPosting"` and `"@type":"FAQPage"` JSON-LD blocks.

## 12. Out of scope

- Benchmark / star-count charts — rejected for the at-a-glance figure (mixed
  open/managed lineup; architecture-first post).
- AutoGen, Google ADK, LlamaIndex Workflows, Pydantic AI, Letta — considered for
  the lineup, set aside to keep four distinct philosophies. May anchor a future
  follow-up.
- The coding-agent comparison is **Post A** — its own spec, plan, and PR.
- Deep code samples for each framework — a couple of short illustrative snippets
  are fine (with byte-identical `<pre>` across locales), but this is an
  architecture comparison, not a tutorial.
