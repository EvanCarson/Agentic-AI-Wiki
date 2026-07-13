# PR 3 — Field Guide Chapters (Frontier Part expansion + Evaluate Part)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship 5 Field Guide chapters — 4 additions to the sparse Part V "Frontier" (previously had only `r1 What to Read`) and 1 addition to Part III "Evaluate" — completing the third track of the approved slate.

**Architecture:** All 5 chapters register in `src/content/field-guide/manifest.ts` (append to `PARTS[key='r'].chapters` for r2-r5, append to `PARTS[key='e'].chapters` for e5). Each chapter creates a bilingual pair under `src/content/field-guide/{en,zh}/<page>.html` where `<page>` is the chapter id (`r2`, `r3`, `r4`, `r5`, `e5`). Xref back-pass adds links from ~3-4 existing pages into the new chapters. One bilingual changelog entry, then verification and PR.

**Tech Stack:** Astro + TypeScript for manifest; body-only HTML fragments using existing `guide.css` class vocabulary (`.phase`, `.step`, `.callout`, `<pre class="standalone">`, `<pre class="trace">`, `<code class="inline">`, `.xref`); vitest for manifest tests.

**Approved slate:** `docs/superpowers/specs/2026-07-06-new-tech-pages-slate.md` (Track 3 section).

**Research source:** `docs/superpowers/specs/2026-07-06-new-tech-pages-research.md` — draws on §§2-5.

**Prerequisites:** PRs 1 and 2 merged. All Deep-Dive essays those chapters link to are alive on `main` (verify with `git ls-tree origin/main -- src/content/deep-dives/groups/` before starting).

**PR 1 + PR 2 lessons applied:**
- Manifest edits + fragments must ship in ONE atomic commit per chapter (registration + HTML together — the manifest test rejects registered slugs with missing HTML, same rule as Deep-Dive group manifests).
- Xref URLs: deep-dives use `/deep-dives/<group-key>/<slug>`, concepts `/concepts/<slug>`, operations `/operations/<group-key>/<slug>` (group keys: `safety-and-security`, `evaluation-and-observability`, `governance-compliance`, `economics-roi`, `agentops`), playbooks `/playbooks/<group-key>/<slug>`, field-guide `/field-guide/<slug>` (single flat namespace).
- Serial dispatch within-file conflicts (all 5 chapters modify `field-guide/manifest.ts`). Parallelism NOT recommended for this PR.
- Header labels must MATCH existing sibling chapters' `<div class="week">` shape — verify by grep before drafting each chapter (subagent-caught bug in PR 2).

---

## File structure

**Modified (1 manifest file):**
- `src/content/field-guide/manifest.ts` — append r2, r3, r4, r5 to Part V (key `r`) and e5 to Part III (key `e`).

**Created (10 chapter files):**
- `src/content/field-guide/en/r2.html` + `zh/r2.html` — computer-use-in-production
- `src/content/field-guide/en/r3.html` + `zh/r3.html` — mcp-native-agent-building
- `src/content/field-guide/en/r4.html` + `zh/r4.html` — the-two-layer-consensus
- `src/content/field-guide/en/r5.html` + `zh/r5.html` — choosing-thinking-effort
- `src/content/field-guide/en/e5.html` + `zh/e5.html` — evals-as-ci-gate

**Xref back-pass (Task 6):** modifies ~3-4 existing pages to link into new chapters.

**Changelog (Task 7):** `src/content/changelog/entries/<merge-date>-pr3-field-guide-chapters.ts`.

---

## Standard chapter-authoring workflow

**Fragment shell (from existing Part V `r1` and Part IV `x2`):**

```html
<section class="phase">
    <div class="phase-num">{PART-NUM}.{CHAPTER-NUM}</div>
    <div class="week">Part {ROMAN} / {PartName} · {chapter-specific subtitle}</div>
    <h2>{chapter title}</h2>
    <p class="goal">{hook lede — one paragraph, no header label, no bulleted opener; leads with stakes, names takeaway. Field Guide hook ledes run longer than Deep-Dive ones — 4-6 sentences is normal.}</p>

    <!-- ============ STEP 1 ============ -->
    <div class="step">
      <div class="step-num">STEP 1</div>
      <h3>{step 1 heading.}</h3>
      <p>...</p>
      <!-- optional <h4>Subsection</h4> blocks -->
    </div>

    <!-- ============ STEP 2 ============ -->
    <div class="step">...</div>
    <!-- ... -->
</section>
```

**Phase-num codes:**
- Part V (Frontier) is chapter number 5: r1 = `5.1` (existing), r2 = `5.2`, r3 = `5.3`, r4 = `5.4`, r5 = `5.5`.
- Part III (Evaluate) is chapter number 3: e1-e4 already exist as `3.1`-`3.4`; e5 = `3.5`.

**`.week` header line — per-chapter subtitle.** Existing chapters use the form `Part {ROMAN} / {PartName} · {chapter-specific subtitle}`. Subtitles are chapter-authored — see the per-chapter content spec for the subtitle text.

**Hook lede rule (from CLAUDE.md).** One paragraph, leads with stakes, names takeaway. No banned openers (TL;DR, Summary, In this post…). Field Guide hook ledes are typically longer than Deep-Dive ones (see `r1` for reference) — 4-6 sentences is normal.

**`<pre>` block rule.** Byte-identical between en and zh. Only prose translates. Hash-verify before commit.

**Xref markup:** `<a href="<url>" class="xref">visible text</a>` (en); prepend `/zh` on href for zh. Never inside `<pre>`, headings, or `<code>`. First natural mention only. All linked targets must be pre-existing (all deep-dive essays from PRs 1 & 2 are alive after PR 2 merges; if this plan is executed before PR 2 merges, cross-check).

**Manifest atomic-commit pattern:** Because `field-guide.test.mjs` verifies every registered page has a bilingual HTML fragment, the manifest edit and the fragment writes must ship in a single commit per chapter. Sequence per chapter:

1. Append entry to `field-guide/manifest.ts` at the appropriate position within the Part's `chapters` array.
2. Write en fragment at `field-guide/en/<page>.html`.
3. Write zh fragment at `field-guide/zh/<page>.html`.
4. Run `npm test` — expect PASS (registration + fragments both present).
5. Run `npm run verify` — expect PASS.
6. Run `npm run build` — expect PASS.
7. Commit atomically: `git add src/content/field-guide/manifest.ts src/content/field-guide/en/<page>.html src/content/field-guide/zh/<page>.html && git commit -m "<msg>"`.

**Draft order (serial):** r2 → r3 → r4 → r5 → e5. This order ensures r3 can link to the already-committed MCP Deep-Dive essays (on `main` after PR 1); r4 can link to `a2a-v1-deep-dive` (PR 2); r5 can link to `adaptive-thinking-and-effort-budgets` (PR 2); e5 can link to `judge-calibration-and-meta-evaluation` (PR 2). All dependencies satisfied at draft time.

---

## Task 1: Chapter r2 — `computer-use-in-production`

**Files:**
- Modify: `src/content/field-guide/manifest.ts` — append r2 entry to Part V.
- Create: `src/content/field-guide/en/r2.html`.
- Create: `src/content/field-guide/zh/r2.html`.

**Chapter spec:**
- Phase-num: `5.2`
- Slug: `computer-use-in-production`
- Priority: must
- Size: M (~1400 en words prose)

**Entry line to append (inside `PARTS[key='r'].chapters` array):**

```ts
{ page: 'r2', slug: 'computer-use-in-production', num: '02', title: L('Computer Use in Production', '生产中的计算机操作') },
```

**`.week` subtitle (en / zh):**
- en: `Part V / Frontier · Where computer-use agents stopped being a demo`
- zh: `第五部分 · 前沿 · 计算机操作智能体从"演示"迈入"生产"的分界`

**`<h2>` claim (en):** Computer use crossed the demo-to-production line on narrow flows in early 2026 — the harness now matters more than the model, and six failure modes are the whole design job.

**`<h2>` claim (zh):** 2026 年年初，计算机操作在窄流程上迈过了"演示到生产"的分界——外壳的重要性已超过模型，六种失败模式就是全部设计工作。

**Hook lede (en, ~5 sentences):** OSWorld sat at 15% completion in late 2024; by early 2026 it had climbed to 72.5% and WebArena's Claude Mythos Preview passed 68.7%. Those numbers don't say "browser agents ship" — they say "narrow flows now ship, and the harness that surrounds the model matters more than which model you picked." This chapter is the operational reality: which flows are in scope for a production computer-use agent in mid-2026, the six failure modes that don't show up in benchmarks (DOM drift, screenshot ambiguity, login-state expiry, modal interruptions, rate-limit cliffs, irreversibility), and the harness-level fixes for each. By the end you'll know when to reach for computer use, when to refuse and use an API, and what a production harness needs to survive a real corporate portal.

**Hook lede (zh, faithful translation):** OSWorld 在 2024 年年底完成率约 15%；到 2026 年年初已攀升到 72.5%，WebArena 的 Claude Mythos Preview 通过了 68.7%。这些数字并不是说"浏览器智能体可以上线了"——它们说的是"如今上线的是窄流程，而围绕模型的外壳比你挑了哪个模型更要紧"。本章讲运维现实：2026 年年中一台生产级计算机操作智能体处理哪些流程是可行的、六种在基准中露不出来的失败模式（DOM 漂移、截图歧义、登录状态过期、模态弹窗打断、限流断崖、不可逆操作），以及每一种在外壳层的修法。读完之后你会知道何时该抬手够计算机操作、何时该拒绝改用 API，以及一台生产外壳要在真实企业门户里活下来需要什么。

**Section outline (STEP N, en / zh):**

- STEP 1 — "The 2024→2026 curve, honestly read" / "2024→2026 曲线，如实解读"
- STEP 2 — "Narrow flows that ship" / "上线的窄流程"
- STEP 3 — "The six failure modes benchmarks miss" / "基准漏掉的六种失败模式"
- STEP 4 — "Harness-level fixes" / "外壳层修法"
- STEP 5 — "When to refuse computer use" / "何时应当拒绝使用计算机操作"

**Content beats:**

STEP 1 — Reading the curve honestly: OSWorld 15% → 72.5% is real progress but the 90th-percentile task hasn't budged as much as the median. WebArena is easier than OSWorld; both are easier than a real corporate portal. Don't cite WebVoyager (98%+, saturated). Reference `browser-agent-failure-modes` deep-dive for the harness taxonomy.

STEP 2 — What ships in 2026: form-filling with a known target, contained SaaS flows with stable DOMs, screenshot-driven QA of internal dashboards. What doesn't ship: general-purpose "book me a flight," open-web research where the DOM changes across sessions.

STEP 3 — Six failure modes (walk each with a concrete symptom): DOM drift between screenshots; screenshot ambiguity (button off-canvas); login state expiring mid-run; modal interruptions (cookie banners, permission prompts); rate-limit cliffs (per-tenant); irreversibility (agent clicks Delete then can't undo). Link to `browser-agent-failure-modes` deep-dive.

STEP 4 — Fixes per mode: DOM-anchor hashing, viewport auto-scroll before screenshot, session-refresh checkpoint, dismiss-modal-first policy, backoff with tenant awareness, undoable-vs-irreversible action classification. Each fix in ~2-3 sentences.

STEP 5 — Refuse computer use when: an API exists at the same access tier, the flow is high-stakes irreversible (money movement, deletes), or the target UI changes between sessions.

**Required `<pre>` blocks:** One code snippet showing DOM-anchor-hashing (`<pre class="standalone">`, ~15 lines Python or TS). One trace showing a failed-then-recovered run (`<pre class="trace">`, ~12 lines).

**Cross-links:**
- `/deep-dives/architectures-and-patterns/browser-agent-failure-modes` in STEP 3 (verify slug lives in that group before linking — grep to confirm).
- `/field-guide/computer-use` (existing `x2`) in STEP 1 (backward reference to the introductory chapter — Field Guide URLs use `/field-guide/<slug>`).
- `/playbooks/coding-and-computer-use-agents/browser-agents` in STEP 2.
- `/playbooks/coding-and-computer-use-agents/computer-use-and-gui-agents` in STEP 5.
- `/operations/safety-and-security/agentic-threat-model` in STEP 5 (irreversibility → safety consideration).

**Sources:** research §3 (frontier capabilities — computer-use section) + https://awesomeagents.ai/leaderboards/web-agent-benchmarks-leaderboard/ + https://futureagi.com/blog/evaluating-browser-use-agents-2026/.

**Commit message:** `"Field Guide: r2 computer-use-in-production"`.

---

## Task 2: Chapter r3 — `mcp-native-agent-building`

**Files:**
- Modify: `field-guide/manifest.ts` (append r3 entry).
- Create: `field-guide/en/r3.html`, `field-guide/zh/r3.html`.

**Chapter spec:**
- Phase-num: `5.3`
- Slug: `mcp-native-agent-building`
- Priority: must
- Size: L (~2000-2500 en words prose)

**Entry line:**

```ts
{ page: 'r3', slug: 'mcp-native-agent-building', num: '03', title: L('MCP-Native Agent Building', 'MCP 原生的智能体构建') },
```

**`.week` subtitle:**
- en: `Part V / Frontier · Wire an agent through MCP end-to-end`
- zh: `第五部分 · 前沿 · 端到端把智能体接到 MCP`

**`<h2>` claim (en):** Building an agent MCP-first — server for tools, client on the host, wire the loop — is the shape that most 2026 production agents converge on, and the field guide chapter for that shape is the natural capstone for the MCP deep-dive group.

**`<h2>` claim (zh):** MCP 优先地构建智能体——工具做成服务器、宿主运行客户端、把循环接通——是 2026 年多数生产级智能体最终收敛到的形态，也是给 MCP 深入解析分组的自然收束章。

**Hook lede (en, ~5-6 sentences):** By mid-2026 the median production agent doesn't build its own tool layer — it consumes MCP servers. Anthropic's own docs frame it that way; Bloomberry's survey of 1,412 production servers shows why. This chapter walks a real MCP-native agent end-to-end: pick tools by exposing them as an MCP server, wire the client on the host side, handle the loop including sampling and elicitation, test it in-process, and ship it with the operational disciplines the MCP deep-dive group covers. By the end you'll have built a small agent that reads and writes to a filesystem via an MCP server with proper auth and audit, and you'll know exactly which MCP essays to reach for when your production build hits each surface.

**Hook lede (zh, faithful):** 到 2026 年年中，中位数的生产级智能体不再自建工具层——它消费 MCP 服务器。Anthropic 自家文档以这种方式定框；Bloomberry 对 1,412 台生产服务器的调查解释了为什么。本章端到端走一遍真正的 MCP 原生智能体：把工具做成 MCP 服务器暴露出去、在宿主侧接客户端、处理包含 sampling 与 elicitation 的循环、进程内测试它、以及以 MCP 深入解析分组覆盖的运维纪律把它上线。读完之后你会造好一台小型智能体，通过带鉴权和审计的 MCP 服务器读写文件系统，并且清楚生产上撞到每个面时该翻到哪一篇 MCP 篇章。

**Section outline:**

- STEP 1 — "Why 'MCP-native' is a real category in 2026" / "为什么 2026 年 '`MCP 原生`' 是一个真正的类别"
- STEP 2 — "Choosing which capabilities to expose as tools vs resources vs prompts" / "选择哪些能力做成 tool、resource 还是 prompt"
- STEP 3 — "Wiring the MCP client into your host loop" / "把 MCP 客户端接进你的宿主循环"
- STEP 4 — "The full loop, including sampling and elicitation" / "完整循环，含 sampling 与 elicitation"
- STEP 5 — "Testing the whole thing in-process" / "在进程内测试整体"
- STEP 6 — "Ship checklist" / "上线清单"

**Content beats:**

STEP 1 — Median server = 5 tools, 0 resources, 0 prompts (Bloomberry survey). Most agents consume servers rather than build them. Reference the whole MCP group.

STEP 2 — Reprise the tool-vs-resource-vs-prompt distinction from `mcp-tool-design` briefly, applied to the tutorial example (a filesystem server). Filesystem: `read_file`/`write_file` are tools; `list_directory` might be a resource.

STEP 3 — Code walkthrough: minimal MCP client using `@modelcontextprotocol/sdk` (TS) or `mcp` (Python) wired into a plain agent loop. Show the initialize handshake, `tools/list`, `tools/call`. Link to `mcp-architecture` for protocol shape.

STEP 4 — Add sampling: server needs LLM help without holding an API key, so it issues `sampling/createMessage` back to the client. Add elicitation: server needs a value from the user mid-call. Link to `mcp-sampling-and-elicitation`.

STEP 5 — In-memory client + server binding for tests. Link to `mcp-testing`.

STEP 6 — Auth (OAuth 2.1 profile, link `mcp-auth-oauth21`), audit logging (link `mcp-ops-in-production`), transport choice (link `mcp-streamable-http-deep-dive` or stdio for local).

**Required `<pre>` blocks:** One complete minimal MCP client wired into a loop (~25 lines Python or TS, `<pre class="standalone">`). One tools/list response trace (~10 lines JSON, `<pre class="trace">`). One in-memory test snippet (~12 lines, `<pre class="standalone">`).

**Cross-links (all pre-existing after PR 1):**
- `/deep-dives/mcp/mcp-tool-design` (STEP 2)
- `/deep-dives/protocols-and-interop/mcp-architecture` (STEP 3)
- `/deep-dives/mcp/mcp-building-servers-in-practice` (STEP 3)
- `/deep-dives/mcp/mcp-sampling-and-elicitation` (STEP 4)
- `/deep-dives/mcp/mcp-testing` (STEP 5)
- `/deep-dives/mcp/mcp-auth-oauth21` (STEP 6)
- `/deep-dives/mcp/mcp-ops-in-production` (STEP 6)
- `/deep-dives/mcp/mcp-streamable-http-deep-dive` (STEP 6)
- `/field-guide/tool-use` (existing `f3`) in STEP 1 (backward reference).

**Sources:** research §2 (MCP landscape) + https://modelcontextprotocol.io/specification.

**Commit message:** `"Field Guide: r3 mcp-native-agent-building"`.

---

## Task 3: Chapter r4 — `the-two-layer-consensus`

**Files:**
- Modify: `field-guide/manifest.ts` (append r4 entry).
- Create: `field-guide/en/r4.html`, `field-guide/zh/r4.html`.

**Chapter spec:**
- Phase-num: `5.4`
- Slug: `the-two-layer-consensus`
- Priority: should
- Size: M (~1500 en words)

**Entry line:**

```ts
{ page: 'r4', slug: 'the-two-layer-consensus', num: '04', title: L('The Two-Layer Consensus', '两层共识') },
```

**`.week` subtitle:**
- en: `Part V / Frontier · MCP below, A2A above, and where the picture breaks`
- zh: `第五部分 · 前沿 · MCP 在下、A2A 在上，以及全局在哪里失灵`

**`<h2>` claim (en):** The 2026 agent-interop stack collapsed into a two-layer consensus — MCP for agent-to-tool, A2A for agent-to-agent — and knowing where it breaks down decides which stack you actually build.

**`<h2>` claim (zh):** 2026 年智能体互操作栈收敛为两层共识——MCP 承担智能体到工具、A2A 承担智能体到智能体——搞清它在哪里失灵，才决定你实际要造哪套栈。

**Hook lede (en, ~5 sentences):** The "protocol war" of 2024-2025 didn't play out — ACP folded into A2A, MCP crystallized around a 2025-11-25 spec, and by mid-2026 the field converged on a two-layer picture: MCP for calling tools, A2A for delegating to other agents. A Q3 2026 joint MCP/A2A interop spec is on the public roadmap. This chapter is the map: where the two-layer picture is honest, where it breaks (single-vendor stacks, local/edge scenarios that used to be ACP's pitch), and how to plan a system when only one layer applies. By the end you'll know when your architecture actually needs both protocols and when one is doing double duty for the other.

**Hook lede (zh, faithful):** 2024–2025 的"协议大战"并未上演——ACP 并入 A2A，MCP 围绕 2025-11-25 规范定型，到 2026 年年中，领域收敛到两层画面：MCP 用于调工具、A2A 用于向其他智能体委派。Q3 2026 的 MCP/A2A 联合互操作规范已在公开路线图上。本章讲这张地图：两层画面在哪里诚实、在哪里失灵（单厂商栈、原先属于 ACP 卖点的本地/边缘场景），以及只有一层适用时如何规划系统。读完之后你会知道你的架构何时确实需要两套协议、何时其中一套在替另一套兼职。

**Section outline:**

- STEP 1 — "How the two-layer picture formed" / "两层画面如何形成"
- STEP 2 — "MCP as the tool layer" / "作为工具层的 MCP"
- STEP 3 — "A2A as the agent layer" / "作为智能体层的 A2A"
- STEP 4 — "Where the picture breaks" / "画面在哪里失灵"
- STEP 5 — "Planning against the two-layer picture (or without it)" / "按两层画面（或抛开它）做规划"

**Content beats:**

STEP 1 — ACP contributed to Linux Foundation July 2025, folded into A2A. MCP spec 2025-11-25. A2A v1.0 April 2026. Cite the joint-spec roadmap.

STEP 2 — MCP handles tool invocation from an agent's model. Link to `mcp-architecture`.

STEP 3 — A2A handles agent-to-agent delegation with the nine-state task lifecycle. Link to `a2a-v1-deep-dive`.

STEP 4 — Single-vendor stacks (all-Anthropic, all-Google) don't need both layers cleanly. Local/edge scenarios (a single machine, no auth story) collapse both layers into stdio + direct calls.

STEP 5 — Planning rule: draw the trust boundary first. If two components are in the same trust domain, they may not need a protocol. If they cross trust boundaries as tool vs agent, pick the right layer.

**Required `<pre>` blocks:** One system-diagram trace showing MCP + A2A in a real deployment (`<pre class="trace">`, ~15 lines ASCII diagram). One collapse case showing when both layers become one (~10 lines).

**Cross-links (pre-existing after PRs 1 & 2):**
- `/deep-dives/protocols-and-interop/mcp-architecture` (STEP 2)
- `/deep-dives/protocols-and-interop/a2a-v1-deep-dive` (STEP 3)
- `/deep-dives/protocols-and-interop/interop-problem` (STEP 1)
- `/deep-dives/protocols-and-interop/acp-and-what-happened` (STEP 1)
- `/deep-dives/mcp/mcp-registry-and-distribution` (STEP 2)
- `/deep-dives/protocols-and-interop/agent-cards-and-discovery` (STEP 3)

**Sources:** research §§2, 5.

**Commit message:** `"Field Guide: r4 the-two-layer-consensus"`.

---

## Task 4: Chapter r5 — `choosing-thinking-effort`

**Files:**
- Modify: `field-guide/manifest.ts` (append r5 entry).
- Create: `field-guide/en/r5.html`, `field-guide/zh/r5.html`.

**Chapter spec:**
- Phase-num: `5.5`
- Slug: `choosing-thinking-effort`
- Priority: should
- Size: M (~1400 en words)

**Entry line:**

```ts
{ page: 'r5', slug: 'choosing-thinking-effort', num: '05', title: L('Choosing Thinking Effort', '选择思考努力度') },
```

**`.week` subtitle:**
- en: `Part V / Frontier · When to turn thinking on, and when it burns money`
- zh: `第五部分 · 前沿 · 何时开启思考，何时烧钱`

**`<h2>` claim (en):** Thinking tokens are billed at output rate — an adaptive `effort: high` on a task that didn't need it 3-5× the bill without changing the answer, and the decision rule is empirical, not principled.

**`<h2>` claim (zh):** 思考令牌按输出费率计费——对一个不需要它的任务，自适应 `effort: high` 会让账单变成原来的 3–5×，答案却毫无变化；决策规则是经验的，不是原理的。

**Hook lede (en, ~5 sentences):** By 2026 every major vendor's reasoning API takes an `effort` (Claude) / `thinking_level` (Gemini) / `reasoning_effort` (OpenAI) dial. The default answer is "just leave it on medium." That default is expensive — thinking tokens are billed at output rate, and on latency-sensitive paths medium can 2× your latency budget with no measurable quality gain. This chapter is the decision rule that survives contact with a real cost sheet: which task classes actually benefit from thinking, which ones burn money on it, and how to measure the delta on your specific traffic before you commit to a setting. By the end you'll have a per-task-class thinking policy and know why "default medium" is the most expensive mistake.

**Hook lede (zh, faithful):** 到 2026 年，每家主要厂商的推理 API 都提供 `effort`（Claude）/ `thinking_level`（Gemini）/ `reasoning_effort`（OpenAI）旋钮。默认答案是"就用 medium 吧"。这个默认很贵——思考令牌按输出费率计费，而在延迟敏感的路径上，medium 会让延迟预算翻倍，质量却毫无可测提升。本章讲一份经得起真实成本表检验的决策规则：哪些任务类别真的从思考中受益、哪些在思考上烧钱，以及在你为某个设置背书之前如何在你自己的流量上度量差异。读完之后你会拿到一份按任务类别的思考策略，并明白"默认 medium"为什么是最贵的错。

**Section outline:**

- STEP 1 — "The three vendor dials" / "三家的旋钮"
- STEP 2 — "Task classes that benefit from thinking" / "从思考中受益的任务类别"
- STEP 3 — "Task classes where it burns money" / "在思考上烧钱的任务类别"
- STEP 4 — "How to measure the delta on your traffic" / "如何在你的流量上度量差异"
- STEP 5 — "A per-task-class thinking policy" / "一份按任务类别的思考策略"

**Content beats:**

STEP 1 — Cross-vendor mapping: Claude `effort` (low/medium/high), Gemini `thinking_level`, OpenAI `reasoning_effort`. Anthropic deprecated `budget_tokens`. Link to `adaptive-thinking-and-effort-budgets` deep-dive.

STEP 2 — Multi-step logic, math, code generation with tests, agentic tool-loops with credit assignment.

STEP 3 — Extractive question-answering, structured output from a fixed schema, most classification tasks. Thinking helps ~0 while costing 3-5×.

STEP 4 — A/B: same input, effort=off vs effort=medium, compare output quality (LLM judge or golden set) and cost. If quality delta < X% and cost > 2×, off wins.

STEP 5 — Concrete policy table: task class → effort setting. Link to `s2 cost-and-latency`.

**Required `<pre>` blocks:** One `<pre class="trace">` showing an effort-comparison A/B (~15 lines). One `<pre class="standalone">` policy-table code (~12 lines).

**Cross-links:**
- `/deep-dives/reasoning-and-test-time-compute/adaptive-thinking-and-effort-budgets` (STEP 1, pre-existing after PR 2)
- `/deep-dives/reasoning-and-test-time-compute/when-reasoning-helps` (STEP 2)
- `/field-guide/cost-and-latency` (existing `s2`) in STEP 5
- `/concepts/reasoning-models` (STEP 1)

**Sources:** research §3 (frontier — reasoning) + vendor docs.

**Commit message:** `"Field Guide: r5 choosing-thinking-effort"`.

---

## Task 5: Chapter e5 — `evals-as-ci-gate`

**Files:**
- Modify: `field-guide/manifest.ts` (append e5 entry to Part III `e` chapters).
- Create: `field-guide/en/e5.html`, `field-guide/zh/e5.html`.

**Chapter spec:**
- Phase-num: `3.5`
- Slug: `evals-as-ci-gate`
- Priority: should
- Size: M (~1400 en words)

**Entry line (in `PARTS[key='e'].chapters` array):**

```ts
{ page: 'e5', slug: 'evals-as-ci-gate', num: '05', title: L('Evals as CI Gate', '把评测做成 CI 门禁') },
```

**`.week` subtitle:**
- en: `Part III / Evaluate · Turn your eval suite into a merge gate`
- zh: `第三部分 · 评估 · 把评测套件做成合入门禁`

**`<h2>` claim (en):** An eval suite that runs but doesn't block merges is a lie — the tiered pattern (cheap graders in pre-commit, LLM judges in preview, judge calibration in monthly cadence) is the 2026 discipline that survives production.

**`<h2>` claim (zh):** 会跑但不阻断合入的评测套件是假的——分层模式（预提交阶段的廉价打分器、预览阶段的 LLM 评判器、月度节奏的评判器校准）是 2026 年经受住生产考验的纪律。

**Hook lede (en, ~5 sentences):** Every team ships an eval suite; most teams don't block merges on it. The result is the "eval report" nobody reads until a regression makes it into production. The 2026 discipline that survives is tiered: cheap code-graders (~ms) run in pre-commit hooks, LLM judges (~s) run on preview deploys, and judge calibration runs monthly against a versioned human gold set. This chapter is the operational build — what to run where, how to configure the merge gate, and how to keep the gold set alive. By the end you'll have an eval-CI pipeline that actually blocks bad merges, and you'll know the two failure modes (judge drift and gold-set rot) that undo it.

**Hook lede (zh, faithful):** 每个团队都会上评测套件；大多数团队不会用它阻断合入。结果就是一份"没人读的评测报告"——直到一次回归被放进生产。2026 年经受住考验的纪律是分层：便宜的代码打分器（毫秒级）跑在预提交钩子里，LLM 评判器（秒级）跑在预览部署上，评判器校准按月针对一份有版本的人类金标集运行。本章讲运维搭建——哪一层跑什么、怎么配置合入门禁、怎么让金标集不腐化。读完之后你会拥有一条真正会阻断坏合入的评测 CI 流水线，并知道会拆掉它的两种失败模式（评判器漂移与金标集腐化）。

**Section outline:**

- STEP 1 — "The three tiers" / "三层"
- STEP 2 — "Pre-commit: cheap code graders" / "预提交：便宜的代码打分器"
- STEP 3 — "Preview: LLM judges" / "预览：LLM 评判器"
- STEP 4 — "Monthly: judge calibration + gold-set upkeep" / "按月：评判器校准 + 金标集维护"
- STEP 5 — "Failure modes: judge drift and gold-set rot" / "失败模式：评判器漂移与金标集腐化"

**Content beats:**

STEP 1 — Three tiers by cost/latency: code graders ms, LLM judges s-min, calibration monthly. Each tier has a specific merge-blocking role.

STEP 2 — Pre-commit hooks running deterministic checks (regex, unit tests on generated code, schema validation). Fast, blocking.

STEP 3 — Preview deploy runs LLM-judge suite on a sampled set. If aggregate score drops below threshold, merge is blocked. Link to `llm-as-judge-for-agents`.

STEP 4 — Monthly recalibration against gold set. Link to `judge-calibration-and-meta-evaluation`. Gold set additions from production traces (the flywheel).

STEP 5 — Judge drift: the judge model's scoring distribution changes over time. Gold-set rot: labels become outdated or ambiguous. Fixes: monthly re-cal, alert on distribution shift, rotate a portion of the gold set annually.

**Required `<pre>` blocks:** One CI YAML snippet showing the three tiers (`<pre class="standalone">`, ~20 lines). One trace showing an eval-blocked merge (~10 lines).

**Cross-links:**
- `/deep-dives/evaluating-agents/judge-calibration-and-meta-evaluation` (STEP 4, pre-existing after PR 2)
- `/field-guide/eval-driven-dev` (existing `e1`) in STEP 1
- `/field-guide/benchmarks-and-ci` (existing `e4`) in STEP 1
- `/operations/evaluation-and-observability/llm-as-judge-for-agents` (STEP 3)
- `/operations/evaluation-and-observability/eval-driven-agent-development` (STEP 4)

**Sources:** research §4 + https://www.langchain.com/blog/agent-evaluation-readiness-checklist.

**Commit message:** `"Field Guide: e5 evals-as-ci-gate"`.

---

## Task 6: Xref back-pass

**Files (~3-4 existing pages, en + zh each):**

For each new chapter, identify a natural link point in an existing related page and add xref markup in both locales at matching positions.

**Suggested back-pass targets (verify natural mention; skip if none):**

- Existing `x2 computer-use` chapter → `r2 computer-use-in-production` (natural: "the production reality is in r2").
  - Files: `src/content/field-guide/en/x2.html` + `zh/x2.html`.
  - Anchor: near the closing paragraph mentioning production shipping. Href `/field-guide/computer-use-in-production` (en) / `/zh/field-guide/computer-use-in-production` (zh).

- Existing `f3 tool-use` chapter → `r3 mcp-native-agent-building` (natural: "for MCP-based agents see r3").
  - Files: `src/content/field-guide/en/f3.html` + `zh/f3.html`.
  - Anchor: near a mention of tool ecosystems or MCP. Href `/field-guide/mcp-native-agent-building`.

- Existing `mcp-architecture` deep-dive → `r3` and `r4` (natural mentions of "protocol stack" and "building an agent").
  - Files: `src/content/deep-dives/en/mcp-architecture.html` + `zh/mcp-architecture.html`.

- Existing `e4 benchmarks-and-ci` chapter → `e5 evals-as-ci-gate` (natural: successor chapter).
  - Files: `src/content/field-guide/en/e4.html` + `zh/e4.html`.

- [ ] **Walk the list. For each existing page, read en and zh, find first natural mention, add xref markup at matching prose positions. Skip when no natural mention.**

- [ ] **Balance check.** For every modified file, en xref count == zh xref count.

- [ ] **Verify all new xref targets exist (all 5 new page slugs must be registered):**

```bash
for slug in computer-use-in-production mcp-native-agent-building the-two-layer-consensus choosing-thinking-effort evals-as-ci-gate; do
  if ! grep -q "slug: '$slug'" src/content/field-guide/manifest.ts; then echo "MISSING: $slug"; fi
done
```

- [ ] **Run gates:** `npm run build && npm run verify && npm test`.

- [ ] **Commit:**

```bash
git add <modified files>
git commit -m "PR 3 xref back-pass: link existing pages into new Field Guide chapters"
```

---

## Task 7: Changelog entry

**Files:**
- Create: `src/content/changelog/entries/<MERGE-DATE>-pr3-field-guide-chapters.ts`

Use today's date at draft time; rename filename + update `date:` field just before merge if the merge day differs.

- [ ] **Step 1: Create the file.**

```ts
import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '<YYYY-MM-DD>',  // == merge date, == filename prefix
  title: L(
    'Field Guide: 4 new Frontier chapters + 1 Evaluate chapter (5 chapters total)',
    'Field Guide：新增 4 章"前沿"部分 + 1 章"评估"部分（共 5 章）',
  ),
  items: [
    L(
      'Added 4 chapters to Part V — Frontier: r2 Computer Use in Production, r3 MCP-Native Agent Building, r4 The Two-Layer Consensus, r5 Choosing Thinking Effort. Part V previously had only r1 What to Read.',
      '在第五部分"前沿"下新增 4 章：r2 生产中的计算机操作、r3 MCP 原生的智能体构建、r4 两层共识、r5 选择思考努力度。第五部分之前仅有 r1 延伸阅读。',
    ),
    L(
      'Added 1 chapter to Part III — Evaluate: e5 Evals as CI Gate. Extends the existing e1-e4 chain with the tiered eval-CI discipline.',
      '在第三部分"评估"下新增 1 章：e5 把评测做成 CI 门禁。承接 e1–e4 的既有链，加入分层评测 CI 纪律。',
    ),
    L(
      "Cross-linked new chapters back from existing pages (Field Guide's x2, f3, e4, plus the Deep-Dive's mcp-architecture) so readers on established chapters find the 2026 material.",
      '把新章节从既有页面反向链回（Field Guide 的 x2、f3、e4，加上深入解析的 mcp-architecture），让读者从既有章节也能找到 2026 年的新内容。',
    ),
  ],
};
export default entry;
```

- [ ] **Step 2: Verify filename ↔ date match.**
- [ ] **Step 3: Run gates.**
- [ ] **Step 4: Commit.**

```bash
git add src/content/changelog/entries/<file>.ts
git commit -m "Changelog: entry for PR 3 Field Guide chapters"
```

---

## Task 8: Final verification + PR opening

- [ ] **Step 1: Full gates.**

```bash
npm run build 2>&1 | tail -5
npm run verify 2>&1 | tail -3
npm test 2>&1 | tail -5
```

- [ ] **Step 2: Grep new content for TODOs.**

```bash
grep -rn "TODO\|TBD" src/content/field-guide/en/{r2,r3,r4,r5,e5}.html src/content/field-guide/zh/{r2,r3,r4,r5,e5}.html
```

Expected: empty.

- [ ] **Step 3: Hook-lede audit.** Read the first `<p class="goal">` of each of the 5 new en chapters. Confirm: no banned openers, first sentence carries stakes.

- [ ] **Step 4: `<pre>` byte-identical audit.**

```bash
for page in r2 r3 r4 r5 e5; do
  en_hash=$(python3 -c "import re; print('\n'.join(re.findall(r'<pre[^>]*>.*?</pre>', open('src/content/field-guide/en/${page}.html').read(), re.DOTALL)))" | sha256sum | cut -c1-16)
  zh_hash=$(python3 -c "import re; print('\n'.join(re.findall(r'<pre[^>]*>.*?</pre>', open('src/content/field-guide/zh/${page}.html').read(), re.DOTALL)))" | sha256sum | cut -c1-16)
  [ "$en_hash" = "$zh_hash" ] && echo "$page: OK" || echo "$page: MISMATCH"
done
```

- [ ] **Step 5: Xref count balance.**

```bash
for page in r2 r3 r4 r5 e5; do
  en=$(grep -c 'class="xref"' src/content/field-guide/en/${page}.html)
  zh=$(grep -c 'class="xref"' src/content/field-guide/zh/${page}.html)
  [ "$en" = "$zh" ] || echo "$page: MISMATCH en=$en zh=$zh"
done
```

- [ ] **Step 6: Verify changelog `date:` matches today.** If merging different day, rename file + update `date:` field.

- [ ] **Step 7: Push + open PR.**

```bash
git push -u origin plan/pr3-field-guide-chapters
gh pr create --title "Field Guide: 5 new chapters (Frontier Part expansion + Evaluate)" --body "$(cat <<'EOF'
## Summary
- 5 new Field Guide chapters — 4 in Part V (Frontier) and 1 in Part III (Evaluate) — closing out the third and final track of the approved slate.
- Part V previously had only `r1 What to Read`; this PR adds r2, r3, r4, r5.
- Cross-linked from ~4 existing pages so readers arriving on `x2 computer-use`, `f3 tool-use`, `e4 benchmarks-and-ci`, and `mcp-architecture` discover the new material.
- Bilingual throughout; `<pre>` blocks byte-identical (SHA-hash verified); hook ledes honor CLAUDE.md.
- Changelog entry included.

## Contents
| Chapter | Part | Slug | Priority |
|---|---|---|---|
| r2 | V — Frontier | computer-use-in-production | must |
| r3 | V — Frontier | mcp-native-agent-building | must |
| r4 | V — Frontier | the-two-layer-consensus | should |
| r5 | V — Frontier | choosing-thinking-effort | should |
| e5 | III — Evaluate | evals-as-ci-gate | should |

## Design & planning trail
- Design: `docs/superpowers/specs/2026-07-06-new-tech-pages-design.md`
- Slate (approved): `docs/superpowers/specs/2026-07-06-new-tech-pages-slate.md`
- PR 3 plan: `docs/superpowers/plans/2026-07-13-pr3-field-guide-chapters.md`

## Test plan
- [x] `npm run build` passes
- [x] `npm run verify` passes
- [x] `npm test` passes
- [x] Every chapter opens with a hook lede
- [x] Every `<pre>` block byte-identical en↔zh (SHA-hash verified)
- [x] Every xref resolves
- [x] Changelog `date:` matches filename

## Slate completion
This closes out Track 3 of the approved slate. Combined with PR 1 (Track 1 — MCP group) and PR 2 (Track 2 — Deep-Dive additions), the 42-page slate ships as 42 pages: 27 Deep-Dive essays + 10 MCP Deep-Dive essays + 5 Field Guide chapters.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 8: Save PR URL, report back.**

---

## Notes for the executor

- All work in `.worktrees/pr3-field-guide-chapters/`. Never edit main.
- Serial dispatch (all 5 chapters modify `field-guide/manifest.ts`) — do NOT parallelize.
- Prerequisites: PR 1 and PR 2 must be merged to main before this plan can start. The plan's cross-link targets reference deep-dive essays from both.
- All 5 chapters' cross-links are safe (no forward-refs) because all deep-dive targets exist after PR 2 merges. Verify each target still resolves at draft time with `grep -l "slug: '<target>'" src/content/`.
- If a specific chapter's plan spec conflicts with reality (e.g., Field Guide Part-key or numbering changes between plan-write and execution), follow the current manifest state and flag the plan for update.
