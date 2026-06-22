# Three AI Hot-Topic Blog Posts — June 2026 (Design)

Three blog posts capturing what the AI conversation is actually centered on in
June 2026: the computer-use breakthrough, MCP crossing into mainstream
infrastructure, and a frontier-model release wave that landed inside a
two-week window. All three ship together as a coordinated set, full bilingual
(en/zh), and follow `src/content/blogs/AUTHORING.md` exactly.

## Goal

Refresh the AI Blog index with three timely posts that match the catalog's
two existing registers — head-to-head comparison (Posts 1 and 3) and
infrastructure essay (Post 2) — and that earn their place against the
existing 12 posts by covering ground none of them touches:

- **Post 1** is the first computer-use coverage on the site.
- **Post 2** is the first protocol-level / standards piece.
- **Post 3** refreshes the stale "Llama 4 vs DeepSeek V3 vs Qwen3 vs Mistral
  Large 3" (2026-06-03) post with the June 2026 release cluster.

## Audience

Same as the rest of the blog: engineers and technical product readers who
already understand agents at the conceptual level and want a current,
opinionated map of the AI tooling and frontier landscape.

## Scope

Three posts only. All three dated **2026-06-22** (bump before merge if the
calendar moves, per AUTHORING §0). Published together on one merge day.

In scope:
- Architectural comparison of computer-use offerings (Post 1).
- Essay-style explainer on MCP adoption, with concrete numbers and the
  Pinterest production case (Post 2).
- Head-to-head of June 2026's frontier model wave (Post 3).

Out of scope:
- Browser-as-product reviews of Comet / Dia / Arc — folded into Post 1 only
  as quick mentions; not a separate post.
- Conceptual deep-dive on "society of thought" reasoning training — strong
  topic but lacks the actionable angle the catalog wants.
- New navigation / IA changes.
- Refactoring existing posts (the stale frontier post stays as-is; Post 3
  supersedes it implicitly via recency).

## Files

| Path | Purpose |
|---|---|
| `src/content/blogs/posts/2026-06-22-claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu.ts` | Post 1 metadata. |
| `src/content/blogs/en/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu.html` | Post 1 English body. |
| `src/content/blogs/zh/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu.html` | Post 1 Chinese body. |
| `public/blogs/claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu/*.svg` | Post 1 diagrams (4). |
| `src/content/blogs/posts/2026-06-22-mcp-at-97-million-downloads.ts` | Post 2 metadata. |
| `src/content/blogs/en/mcp-at-97-million-downloads.html` | Post 2 English body. |
| `src/content/blogs/zh/mcp-at-97-million-downloads.html` | Post 2 Chinese body. |
| `public/blogs/mcp-at-97-million-downloads/*.svg` | Post 2 diagrams (3). |
| `src/content/blogs/posts/2026-06-22-claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1.ts` | Post 3 metadata. |
| `src/content/blogs/en/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1.html` | Post 3 English body. |
| `src/content/blogs/zh/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1.html` | Post 3 Chinese body. |
| `public/blogs/claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1/*.svg` | Post 3 diagrams (4). |
| `src/content/changelog/entries/2026-06-22-three-hot-topic-blogs.ts` | One combined changelog entry covering all three posts. |

Note on the changelog: one entry (not three) for the trio, since they ship in
the same change and read as a coordinated set — keeps the changelog list dense.

---

## Post 1 — *Claude Computer Use vs Codex Background CU vs Operator vs Gemini*

**Slug:** `claude-computer-use-vs-codex-cu-vs-operator-vs-gemini-cu`

**Title (en):** Claude Computer Use (post-Vercept) vs Codex Background CU vs Operator vs Gemini: Four Bets on Letting AI Drive the Mouse

**Title (zh):** Claude Computer Use（收购 Vercept 后）、Codex 后台 CU、Operator 与 Gemini：四种让 AI 自己操作鼠标的下注方式

**Summary (en):** 72.5% on OSWorld is the new floor, not a milestone — and three labs have made architecturally opposite bets on where the mouse should live. Pick the wrong one and you fight your sandbox forever; pick the right one and the model does in two minutes what your RPA stack does in two weeks.

**Summary (zh):** 在 OSWorld 上拿到 72.5% 已经是地板而非里程碑——而三家实验室在"鼠标应该跑在哪里"这件事上做了架构上完全相反的下注。选错了就要永远跟自己的沙箱搏斗；选对了，模型两分钟能做完你 RPA 栈两周的活。

**Tags:** `agent-comparison` (reused), `frontier-models` (reused), `computer-use` (new), `browser-agents` (new) — the new tags aren't near-duplicates of anything existing.

**Lede stance:** Lead with the 72.5% number and the verb "drive". Take a side
in the first 30 words: the question is no longer *can* a model use a
computer, it's *where* the computer lives. Name the three bets explicitly.

**Section outline** (9-block standard shape, per AUTHORING §2):

1. **Hook lede** — see above.
2. **At a glance** — 4-column table (Vendor · Approach · Deployment · OSWorld) +
   horizontal bar chart of OSWorld scores (Claude 72.5%, OpenAI CUA, Gemini,
   open-source baseline) + 4×5 feature heatmap matrix.
3. **Claude Computer Use** — post-Vercept architecture: portable screenshot +
   mouse/keyboard tool over any VM/container/remote desktop. Why "your
   sandbox" wins for desktop apps + terminal + filesystem. Acquisition
   context.
4. **OpenAI Codex Background CU + Operator** — cloud-VM Chromium, contained
   and audited, browser-only. Codex Background CU shipped April 16, 2026;
   Operator's 87% travel-booking number; ChatGPT Agent integration in early
   2026.
5. **Gemini Computer Use** — narrower web focus, latency-tuned, tight
   Workspace integration. Where it wins (predictable web tasks at low cost)
   and where it doesn't (anything off the page).
6. **Cross-cutting comparison** — four axes written as comparative prose
   (each paragraph addresses all three across one axis, per AUTHORING §11):
   surface (web-only vs full-desktop), deployment (their VM vs your machine),
   safety model (containment vs human-in-loop), latency.
7. **When to pick which** — decision matrix table by use case (browser-only
   web task / desktop app automation / terminal-driven dev work / regulated
   enterprise / consumer assistant).
8. **FAQ** — 5–6 Q/A pairs (FAQPage JSON-LD): *Can I run Claude CU on
   Windows? · How safe is OpenAI's cloud VM with my credentials? · What does
   OSWorld actually measure? · Is Vercept's tech in the public API? · Which
   one wins for booking travel? · What about open-source (browser-use,
   Cogagent)?*
9. **Further reading** — internal wiki links (agent loop, MCP concept) +
   project sources (Anthropic news, OpenAI docs, OSWorld leaderboard, Vercept
   acquisition coverage).

**Diagrams** (4 SVGs, all conforming to AUTHORING §3 conventions —
viewBox-based, themeable CSS vars, `<title>+<desc>+role="img"`, no scripts):

- `data-osworld-scores.svg` (viewBox 0 0 900 400) — horizontal bar chart;
  Claude (accent fill at top), then OpenAI CUA, Gemini CU, and a single
  named open-source baseline (browser-use as the most-cited reference).
- `arch-claude-cu.svg` (viewBox 0 0 900 500) — Claude on your machine,
  screenshot + mouse/kb tool, full desktop reach.
- `arch-openai-cu.svg` (viewBox 0 0 900 500) — Sandboxed cloud Chromium,
  DOM event channel, audit trail.
- `data-feature-matrix.svg` (viewBox 0 0 900 400) — 4 vendors × 5 axes
  heatmap (weak/medium/strong).

---

## Post 2 — *MCP at 97 Million Downloads*

**Slug:** `mcp-at-97-million-downloads`

**Title (en):** MCP at 97 Million Downloads: How the Model Context Protocol Won — and What's Still Broken at Scale

**Title (zh):** 月下载量 9700 万的 MCP：模型上下文协议是如何赢的——以及到了这种规模还有什么没解决

**Summary (en):** Two years from Anthropic's launch, MCP isn't a debate — it's a dependency. Every frontier vendor, every major IDE, and one Pinterest team saving 7,000 engineering hours a month all ship against it. The interesting question is no longer *should you use MCP*, but what fails at this scale and how the 2026 roadmap plans to fix it.

**Summary (zh):** 从 Anthropic 推出至今两年，MCP 已经不是要不要用的问题——它是一种依赖。每家前沿厂商、每个主流 IDE，以及一支为公司每月节省 7000 工程师小时的 Pinterest 团队都在它上面构建。真正值得问的不再是"我要不要用 MCP"，而是到了这种规模哪些地方在崩、2026 路线图打算怎么修。

**Tags:** `mcp`, `protocols`, `infrastructure`, `ecosystem` — `infrastructure` is reused from existing posts; the other three are new (AUTHORING §1 allows organic growth and these aren't near-duplicates).

**Lede stance:** Lead with the number (97M monthly SDK downloads) and the
shift in framing (debate → dependency). Single sharpest sentence: "The
interesting question is no longer *should you use MCP* — it's *what fails at
this scale*."

**Section outline** (essay shape — fewer than 9 sections, no decision matrix):

1. **Hook lede** — see above.
2. **The numbers** — 3-row "at a glance" table (Metric · Value · As of), then
   a horizontal bar chart of monthly download growth Nov 2024 → Jun 2026,
   then a quick prose block on the Pinterest production case (66K monthly
   invocations across 844 active users, ~7K eng hours saved/mo as of April
   2026).
3. **What MCP actually is** — one canonical topology diagram (host with LLM +
   MCP client(s), JSON-RPC over stdio/HTTP, MCP servers, real-world targets).
   Three short paragraphs explaining the host / server / transport roles.
4. **Why it won** — three sub-points: (a) neutral specification with
   first-mover advantage from Anthropic, (b) cross-vendor uptake (Anthropic,
   OpenAI, Google, Microsoft, GitHub, Vercel, VS Code, Cursor, ChatGPT all
   ship MCP support), (c) Linux Foundation Agentic AI Foundation handover
   removing single-vendor risk.
5. **What still breaks at scale** — four sub-points: transport scalability
   (stdio's limits at 10K-server registries), registry trust and supply
   chain, server sprawl and discoverability, governance and auth.
6. **The 2026 roadmap** — what the upstream maintainers say ships next:
   transport scalability fixes, agent-to-agent communication, governance
   maturation, enterprise readiness.
7. **FAQ** — 5–6 Q/A pairs: *Is MCP just function calling? · Do I have to
   write a server in TypeScript? · Can I use MCP with non-Anthropic models?
   · What's the difference between MCP and OpenAPI? · Is MCP secure by
   default? · Will Google or OpenAI fork it?*
8. **Further reading** — internal wiki links + project sources (MCP spec,
   2026 roadmap post, registry, Pinterest engineering blog, Linux Foundation
   announcement).

**Diagrams** (3 SVGs):

- `data-mcp-growth.svg` (viewBox 0 0 900 400) — horizontal bar chart of
  monthly downloads Nov 2024 → Jun 2026 (5–6 quarterly bars).
- `arch-mcp-topology.svg` (viewBox 0 0 900 500) — host ↔ client ↔ JSON-RPC
  ↔ server ↔ target three-column canonical diagram.
- `data-vendor-support-matrix.svg` (viewBox 0 0 900 400) — 9 vendors × 4
  support axes (client / server / first-party docs / registry contribution)
  heatmap.

---

## Post 3 — *Claude Mythos 5 vs GPT-5.6 vs Gemini 3.2 vs Qwen 3.7 vs DeepSeek V4.1*

**Slug:** `claude-mythos-5-vs-gpt-5-6-vs-gemini-3-2-vs-qwen-3-7-vs-deepseek-v4-1`

**Title (en):** Claude Mythos 5 vs GPT-5.6 vs Gemini 3.2 vs Qwen 3.7 vs DeepSeek V4.1: The June 2026 Frontier Refresh

**Title (zh):** Claude Mythos 5、GPT-5.6、Gemini 3.2、Qwen 3.7 与 DeepSeek V4.1：2026 年 6 月的前沿模型大刷新

**Summary (en):** Five frontier-tier models shipped inside a two-week window in June 2026. The differences are no longer about who tops MMLU — each lab is now betting on a different axis: agentic computer use, reasoning cost, multimodal latency, or pure price floor. Pick the axis before you pick the model.

**Summary (zh):** 2026 年 6 月，五款前沿级模型在两周窗口内集中发布。差距早已不是谁登顶 MMLU——每家实验室如今押注的是不同的轴：智能体计算机操作、推理成本、多模态延迟，或纯粹的价格底线。先选好轴，再选模型。

**Tags:** `model-comparison`, `frontier-models`, `closed-source` (new), `open-source` (reused — same tag the prior frontier-models post uses for weights-available models).

**Lede stance:** Lead with the convergence ("five frontier models, two-week
window"). Frame the takeaway as axes-not-leaders: "Pick the axis before you
pick the model." Avoid implying a single winner.

**Section outline** (11 sections — one extra for the Chinese cluster and one extra for the release timeline that carries the post's thesis):

1. **Hook lede** — see above.
2. **At a glance** — 4-column table (Model · Release · Pricing · Headline
   strength); context length goes in the prose below, not the table, to keep
   width within AUTHORING §11. Followed by the agentic-reasoning bar chart
   and a 5-row × 5-column feature heatmap.
3. **Release timeline** — single timeline diagram showing the five releases
   plotted on a horizontal axis, lab-colored dots, "~14-day convergence
   window" highlighted band. (This is the post's thesis diagram.)
4. **Claude Mythos 5 GA (+ Fable 5 preview)** — vulnerability-aware
   reasoning for procurement, sibling-line strategy, where it leads (coding,
   agentic reasoning).
5. **GPT-5.6** — on-schedule cadence, deeper Codex Background CU and
   Operator integration, the autonomous-task lead.
6. **Gemini 3.2** — mid-cycle multimodal refresh, Workspace integration,
   price-per-quality position.
7. **The Chinese cluster** — Qwen 3.7 and DeepSeek V4.1 lead, with GLM-6,
   Hunyuan Large 3, ERNIE 5.1, and Doubao Pro as a one-paragraph sweep
   (DeepSeek V4's April 2026 pricing forced the cluster to respond inside
   weeks).
8. **Cross-cutting comparison** — five axes as comparative prose: reasoning,
   computer use, multimodal, price/perf, weights availability.
9. **When to pick which** — decision matrix table by use case (enterprise
   procurement / agentic terminal work / multimodal product / self-host /
   price-optimized batch).
10. **FAQ** — 5–6 Q/A pairs: *Is Mythos 5 just Opus renamed? · Which is
    cheapest for high-volume reasoning? · Can I run Qwen 3.7 on a single
    H100? · Does GPT-5.6 dethrone Claude on coding? · Are the Chinese
    weights actually permissively licensed? · What's the difference between
    Mythos and Fable?*
11. **Further reading** — internal wiki links + project sources (Anthropic
    Mythos GA post, OpenAI GPT-5.6 announcement, Gemini 3.2 blog, Qwen
    release, DeepSeek V4.1 paper, leaderboards).

**Diagrams** (4 SVGs):

- `data-release-timeline.svg` (viewBox 0 0 900 400) — the thesis diagram;
  five releases on a horizontal date axis, lab-colored dots, "convergence
  window" band.
- `data-agentic-benchmark.svg` (viewBox 0 0 900 400) — horizontal bar chart
  of an agentic-reasoning benchmark (e.g., SWE-bench Verified or
  GAIA), five models ranked.
- `data-price-per-token.svg` (viewBox 0 0 900 400) — horizontal bar chart of
  $/1M output tokens, five models, log-friendly scale, Chinese cluster
  bottoming the chart.
- `data-feature-matrix.svg` (viewBox 0 0 900 400) — 5 models × 5 axes
  heatmap (reasoning / computer use / multimodal / price / weights).

---

## Citation rigor

Every numeric claim cited inside any post (and in this design) must be
verified against the upstream source at draft time, with the source link in
*Further reading*. Working list of load-bearing claims to re-verify before
publishing:

- 72.5% OSWorld for Claude post-Vercept (Anthropic acquisition coverage).
- 87% travel-booking success for OpenAI Operator (OpenAI Operator docs).
- Any SWE-bench Verified numbers cited per model in Post 3 (verify against
  each lab's primary release post; the historical 49.0% Sonnet figure from
  Oct 2024 is not load-bearing and stays out unless the source explicitly
  warrants the comparison).
- 97M monthly SDK downloads for MCP (Digital Applied report May 2026).
- ~10K servers in MCP Registry (Registry API pull, May 24 2026).
- Pinterest 66K monthly invocations / 844 users / ~7K eng hours saved
  (Pinterest engineering blog, April 2026).
- April 2026 release date for OpenAI Codex Background CU.
- "Within a two-week window" for the June 2026 frontier cluster (cross-check
  exact dates against each lab's announcement post).

If any number cannot be verified to a primary source at draft time, it is
removed from the post — no soft attribution.

## Voice and conventions

All three posts follow the established voice from the existing 12 blog
posts: hook lede with the stakes named in the first 30 words, no
throat-clearing, no "TL;DR" label, counter-numbered `<h2>` sections (set by
`BlogLayout`), accent-bordered subsection `<h3>`s, comparative prose in
cross-cutting sections (never three sequential descriptions). zh prose is a
faithful translation, not byte-mirror; product names and technical
identifiers stay in English (`Claude`, `OSWorld`, `MCP`, `JSON-RPC`, `SWE-bench`,
`Operator`, `Codex`, etc.). Tables stay ≤4 columns per AUTHORING §11.

## Verification gates (per AUTHORING §10 + project CLAUDE.md)

Run all four before any merge:

```bash
npm run build       # no warnings
npm run verify      # bilingual complete, internal links resolve, OG meta on every page
npm test            # all green incl. blogs.test.mjs (slug uniqueness, date prefix, tag shape)
npm run search:index && npm run test:search   # pagefind index builds, search test passes
```

Then manually: open each post at `http://localhost:4321/blogs/<slug>` and
`/zh/blogs/<slug>`, toggle dark mode, click TOC entries, `view-source:` and
confirm both `"@type":"BlogPosting"` and `"@type":"FAQPage"` JSON-LD blocks
are present.

## Workflow

- One git worktree per post under `.worktrees/` (per project CLAUDE.md).
- Three feature branches, three PRs, squash-merged to `main` together on the
  same day.
- One combined changelog entry covering all three posts (filed under
  whichever PR merges first; the other two PRs note "changelog entry filed
  in PR #N").
- Date bump check right before push: if the calendar has moved past
  2026-06-22, rename all six date-prefixed files and bump the `date:` field
  inside each metadata + changelog file.

## Out-of-scope risks acknowledged

- The June 2026 frontier dates listed in research summaries (Mythos 5 GA,
  GPT-5.6, Gemini 3.2, Qwen 3.7, DeepSeek V4.1) need re-verification
  against each lab's primary announcement at draft time. If a date moves or
  a model has been renamed by publish day, the timeline diagram and Post 3
  title get updated rather than ignored.
- Vercept acquisition details (and the 72.5% OSWorld figure attached to it)
  need confirmation that Anthropic has publicly disclosed the Vercept-derived
  capability in a Claude release. If it is still labeled "research preview"
  at publish day, Post 1 reframes the headline number as forward-looking
  rather than current production.
- If MCP download or registry numbers have moved meaningfully by publish
  day, update Post 2's headline and the growth chart's terminal bar.
