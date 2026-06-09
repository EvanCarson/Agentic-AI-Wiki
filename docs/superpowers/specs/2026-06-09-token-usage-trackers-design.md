# Design: AI Blog — *ccusage vs codex-usage-tracker vs CodeBurn vs LiteLLM proxy*

Status: brainstormed 2026-06-09, awaiting user sign-off before plan/implementation.

## 1. The post in one sentence

A four-way comparison of open-source tools that tell you what your AI coding
agent is actually spending — one tracker per major agent, picked so that each
demonstrates the *different telemetry trail the host agent leaves behind*. The
post doubles as a practical guide to reducing that spend per agent.

## 2. The central angle

> **Each agent leaks a different trail, and the shape of the tracker is
> dictated by the trail.**

- **Claude Code** writes JSONL transcripts to `~/.claude/projects/…` — but the
  transcripts undercount (placeholders, no thinking tokens). A JSONL parser is
  cheap; a fetch-hook is accurate.
- **Codex CLI** writes JSONL `token_count` events under `~/.codex/sessions/…`
  — cumulative, so trackers diff successive entries to get per-turn spend.
- **Cursor** writes a local **SQLite** (`state.vscdb`, `cursorDiskKV`,
  `bubbleId:` keys) plus a hosted dashboard plus (for Enterprise) an Admin API.
  Three possible trails; three different tracker shapes.
- **Aider** doesn't leave a parseable external trail — it prints cost per turn
  via LiteLLM and exposes a `/tokens` slash command. The "tracker" you bolt on
  is a proxy or a session log scraper.

The diagrams and the per-tracker sections all flow from this thesis.

## 3. The four trackers

| Slot | Tracker | Trail it reads | Primary agent | Why this one |
|---|---|---|---|---|
| 1 | **ccusage** | JSONL session files | Claude Code (also Codex) | 15.5k★, the de-facto OSS standard; 15 agents covered |
| 2 | **codex-usage-tracker** | Codex JSONL → SQLite index + MCP | Codex CLI | The only Codex-purpose-built tool; exposes the spend as MCP tools an agent can query |
| 3 | **CodeBurn** | Per-agent disk readers (25 tools) | Cursor (representatively) | 7.6k★, MIT, the broadest cross-agent local-disk tracker; cleanest answer for Cursor since `cursor-stats` is archived |
| 4 | **LiteLLM proxy** | Live API requests via base-URL override | Aider | Aider already prices via LiteLLM internally; pointing it (and any other agent) at a LiteLLM proxy gives the dashboard Aider lacks |

This is not a "best four" claim — it's a "four trackers chosen to surface
four different telemetry trails" claim. The "When to pick which" section makes
that explicit.

## 4. Scope decisions

- **In**: open-source only. Anything with a `LICENSE` file (MIT/Apache/AGPL).
  Both per-agent disk readers and proxy/SDK approaches.
- **Out**: Anthropic Console / OpenAI Dashboard / Cursor Dashboard (vendor-hosted).
  These are mentioned only as the "official" baseline each OSS tracker improves on.
- **Out**: token-counting libraries like `tiktoken` / Anthropic's `count_tokens`
  endpoint. They count *before* the call; this post is about *measuring what
  was actually spent*.
- **Out**: prompt-compression libraries (LLMLingua etc.). Different problem.
  May reappear as one bullet in §10.
- **Adjacent and mentioned, not compared**: cccost, claude-monitor, cursor-stats,
  CursorLens, cursor-usage-tracker, Langfuse, OpenLLMetry — each gets a one-line
  callout where relevant.

## 5. Section list (the post)

The fragment follows the standard `BlogLayout` shape from `AUTHORING.md`.

1. **Hook lede** (no header). Lead with the stakes: agentic coding is the most
   token-hungry workload most engineers have ever run, and every agent hides
   the bill in a different place. The takeaway: pick the tracker that matches
   the trail your agent already leaves.
2. **At a glance**. Four-row metadata table (project, released, license,
   primary agent, trail it reads). Plus a GitHub-stars horizontal bar chart.
   Plus a feature-matrix heatmap (rows = trackers; columns = Claude Code /
   Codex / Cursor / Aider / cost breakdown / cache-aware / real-time).
3. **The thesis: four agents, four trails**. Single architecture diagram —
   four agents on the left, their respective trails in the middle (JSONL file
   / Codex JSONL / SQLite / no-trail), trackers on the right with arrows
   showing which trail each one consumes. This is the visual centerpiece.
4. **ccusage — the JSONL parser standard**. What it reads
   (`~/.claude/projects/…` JSONL + Codex JSONL), install (`npx ccusage`,
   `bun x ccusage`), report shapes (daily / weekly / monthly / session /
   blocks), tokens it splits out (input / output / cache-creation / cache-read),
   per-model breakdown, the *known limitation* (issue #866 — Claude Code's
   JSONL undercounts).
5. **codex-usage-tracker — the per-agent persistence layer**. What it reads
   (`token_count` events under CODEX_HOME), how it differs from ccusage (its
   own SQLite at `~/.codex-usage-tracker/usage.sqlite3`, MCP tools so the
   agent can query its own spend), context-use and cache-ratio metrics it
   surfaces, install (`pipx install …`), maintenance status. Mention that
   ccusage covers Codex too, and pick codex-usage-tracker when you want the
   spend reachable from inside the agent.
6. **CodeBurn — the cross-agent disk reader**. The "different trail per agent"
   thesis made flesh: README enumerates per-provider readers (Cursor →
   `state.vscdb`, Gemini → JSON, Warp → `warp.sqlite`, Forge → `~/.forge/.forge.db`,
   Copilot → workspaceStorage transcripts). What it does well (Cursor and
   25-tool coverage), what it doesn't cover (Aider's transient session), and
   how it compares with ccusage (CodeBurn is broader; ccusage is older and
   battle-tested on Claude Code).
7. **LiteLLM proxy — the route-everything-through-me approach**. How it works
   (`ANTHROPIC_BASE_URL` / `OPENAI_BASE_URL` overrides), why it's the right
   answer for Aider (Aider already imports LiteLLM for pricing — pointing at a
   proxy adds the dashboard and per-team accounting it lacks), what it sees
   that disk readers miss (thinking tokens, raw API response bodies), the
   trade-off (you now have a proxy in the path; latency + an extra running
   service). Mention Langfuse and OpenLLMetry as the dashboards people pair
   with LiteLLM proxy.
8. **Cross-cutting comparison**. Same three axes, side-by-side prose:
   - **Accuracy**: disk readers inherit whatever the agent persisted (so
     ccusage is exactly as accurate as Claude Code's JSONL — i.e. not
     entirely); CodeBurn inherits per-agent; codex-usage-tracker inherits
     Codex JSONL accuracy (good for cumulative counts); LiteLLM proxy sees
     ground truth.
   - **Coverage**: which agents each tracker can actually read.
   - **Setup cost**: ccusage `npx`, codex-usage-tracker `pipx`, CodeBurn
     `npm install -g`, LiteLLM proxy requires running a service + overriding
     base URLs.
   Each axis gets a small cross-cutting comparison diagram (300px-tall SVG).
9. **When to pick which**. A 4-row decision table: "I use Claude Code only" →
   ccusage. "I use Codex + want an MCP" → codex-usage-tracker. "I switch
   between Claude Code / Codex / Cursor / Cline / Goose…" → CodeBurn. "I use
   Aider (or want one dashboard for everything)" → LiteLLM proxy + Langfuse.
10. **How to actually save tokens** (per agent). The "save tokens" half of the
    brief. Three concrete levers per agent:
    - **Claude Code**: `/clear` and `/compact` to drop context; stable system
      prompts to keep prompt-cache hits high (90% read discount); model
      routing — `--model haiku` for cheap subtasks.
    - **Codex CLI**: pick the cheaper reasoning model in `~/.codex/config.toml`;
      watch the `Cache ratio` codex-usage-tracker surfaces — low cache ratio
      means churning system prompts; constrain context with `/clear`.
    - **Cursor**: drop the chat-dropdown model to the cheapest one that
      passes; disable "Long Context" / "Auto" for small edits; remember that
      Cursor bills per-request, so the lever is *which model gets the request*,
      not how many tokens it carries.
    - **Aider**: `--cache-prompts` for Anthropic; `/clear` to reset context;
      split `--architect` (Sonnet) and `--editor-model` (Haiku) to push cheap
      edits onto the cheap model; `/tokens` to inspect context before sending.
11. **FAQ** (`<section class="faq">` — JSON-LD source). 5 questions:
    - Why does ccusage undercount Claude Code spend?
    - Is CodeBurn the same thing as ccusage?
    - Does any tracker work for Aider?
    - Do I need a tracker if the agent already shows token counts?
    - Is the LiteLLM-proxy approach worth the extra moving part?
12. **Further reading**. Internal: link to the LangSmith/Helicone/Phoenix post
    (the LLM-app analogue), the Claude Code vs Codex vs Cursor vs Aider post,
    the AFK Coding post. External: the four trackers' repos plus the ccusage
    #866 undercount issue.

## 6. Diagrams (SVGs under `public/blogs/<slug>/`)

| File | Purpose | viewBox | Notes |
|---|---|---|---|
| `arch-trails.svg` | Centerpiece: 4 agents → 4 trails → 4 trackers | 900×500 | Three columns of boxes with arrows; this IS the thesis |
| `arch-ccusage.svg` | ccusage architecture (JSONL → CLI) | 900×400 | One column of trail files, ccusage in middle, terminal output on right |
| `arch-codex-usage-tracker.svg` | Codex JSONL → SQLite + MCP | 900×400 | Show MCP arrow back to the agent |
| `arch-codeburn.svg` | Per-agent reader plugins | 900×500 | 4–5 mini per-agent readers fanning into CodeBurn core |
| `arch-litellm-proxy.svg` | Agent → proxy → API; Langfuse off to the side | 900×400 | Show the BASE_URL override arrow |
| `compare-accuracy.svg` | Cross-cutting comparison — accuracy | 900×300 | Three columns: disk-read / SQLite-cumulative / proxy-truth |
| `compare-coverage.svg` | Cross-cutting comparison — agent coverage | 900×300 | 4×4 grid of which tracker covers which agent |
| `compare-setup.svg` | Cross-cutting comparison — setup cost | 900×300 | Three columns: one-line `npx` / `pipx` install / running service |
| `data-stars-comparison.svg` | GitHub stars bar chart | 900×400 | Horizontal bars; accent for leader |
| `data-feature-matrix.svg` | 3-level heatmap | 900×400 | Rows = trackers; columns = agents + key features |
| `logos/ccusage.svg` | ccusage glyph | 32×32 | Plain text wordmark fallback |
| `logos/codex-usage-tracker.svg` | … | 32×32 | |
| `logos/codeburn.svg` | … | 32×32 | |
| `logos/litellm.svg` | LiteLLM glyph | 32×32 | |

All diagrams follow the `AUTHORING.md` SVG rules: `viewBox`-based, CSS-variable
colors only (`var(--ink)`, `var(--paper-2)`, `var(--accent, #d4421e)`,
`var(--accent-soft)`), `role="img"` + `<title>` + `<desc>`, no scripts,
no caption text inside the SVG.

## 7. Metadata file

```ts
// src/content/blogs/posts/2026-06-09-ccusage-vs-codex-usage-tracker-vs-codeburn-vs-litellm-proxy.ts
import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-09',
  slug: 'ccusage-vs-codex-usage-tracker-vs-codeburn-vs-litellm-proxy',
  title: L(
    'ccusage vs codex-usage-tracker vs CodeBurn vs LiteLLM proxy: Four Ways to See What Your Coding Agent Just Spent',
    'ccusage、codex-usage-tracker、CodeBurn 与 LiteLLM proxy:看清编码 Agent 刚刚烧掉多少 token 的四条路',
  ),
  summary: L(
    'Every agent leaks a different trail — JSONL transcripts, SQLite stores, or nothing at all — and the open-source tracker you should install depends on which trail your agent leaves. Four trackers, four trails, plus the levers that actually cut the bill.',
    '每个编码 Agent 留下的轨迹都不一样:JSONL 记录、SQLite 数据库,甚至干脆什么都不留。你该装哪款开源跟踪器,取决于你的 Agent 走的是哪条轨迹。这里有四款,对应四条路,顺便说说真正能压低账单的几个开关。',
  ),
  tags: ['agent-comparison', 'open-source', 'cost', 'observability', 'tooling'],
};

export default post;
```

The `tooling` tag is new; `agent-comparison` / `open-source` / `cost` /
`observability` should already exist on other posts. Verify with `grep
'tags:' src/content/blogs/posts/*.ts` before writing.

## 8. Bilingual fidelity

- Both `en/<slug>.html` and `zh/<slug>.html` produced together; zh is a
  faithful translation of the en prose, full-width punctuation in prose, ASCII
  in `<pre>`/`<code>`/identifier names.
- Product names stay English: `ccusage`, `CodeBurn`, `LiteLLM`, `Codex`,
  `Claude Code`, `Cursor`, `Aider`.
- Internal links in zh use the `/zh/...` prefix per the `check-internal-links`
  rule.
- All `<pre>` code blocks byte-identical between locales.

## 9. Changelog entry

One file: `src/content/changelog/entries/2026-06-09-token-usage-trackers.ts`.
Date equals merge day; rename if the calendar moves before merge.

## 10. Verification gates

Run before pushing:

```
npm run build
npm run verify
npm test
npm run search:index && npm run test:search
```

Plus the screenshot-every-diagram rule from memory — render each SVG in a
browser at the post URL and visually inspect, not just lint structure.

## 11. Risk register

- **Accuracy claims**: the "ccusage undercounts" claim is sourced to ccusage
  issue #866 and the cccost README. Quote both URLs explicitly.
- **Star counts will drift**: state "as of 2026-06-09" once in the at-a-glance
  table and don't repeat numbers elsewhere.
- **cursor-stats is archived**: mention this as a one-liner in the CodeBurn
  section, not as a slot in the comparison.
- **LiteLLM proxy is a service to run**: clearly disclose the setup cost in
  §8 and the FAQ. This is the honest part of recommending it for Aider.
- **Aider doesn't have a "tracker"**: acknowledge directly. The post isn't
  pretending LiteLLM proxy is purpose-built for Aider — it's the best OSS
  answer when Aider is the agent.

## 12. Out of scope (do not touch this PR)

- New `concepts/` or `field-guide/` entries.
- The existing LangSmith/Helicone/Phoenix post.
- Any change to `BlogLayout.astro` or `guide.css`.
- Anthropic/OpenAI vendor dashboards (mentioned only).

## 13. Next step

Brainstorming output: this design doc. Next, invoke `superpowers:writing-plans`
to convert this into a step-by-step implementation plan covering: metadata
file → diagrams → en fragment → zh fragment → changelog → verification gates →
PR.
