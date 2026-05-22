# P0 Content Enrichment — Design

**Date:** 2026-05-22
**Status:** Drafted via brainstorming on 2026-05-22; pending user review before plan.
**Author:** Chen Qian (with Claude)
**References:** [`2026-05-19-content-ia-expansion-design.md`](./2026-05-19-content-ia-expansion-design.md) §10 backlog

## 1. Goal & scope

The IA expansion (PR #56) restructured the site into seven top-level sections and
explicitly deferred a prioritized backlog of ~80 follow-up content additions.
Eighteen of those were tagged **P0** — "needed so the section feels coherent at
launch." This spec covers exactly those 18.

**Goals:**

1. Author the **18 P0 entries** so the new Playbooks and Operations sections
   feel populated, and the three Concepts mirrors close the gaps the new
   structure made obvious.
2. Ship via **three parallel PRs** — one per section (Concepts, Playbooks,
   Operations) — each in an isolated worktree, each squash-merged to `main`.
3. Lock down per-entry slug / title / summary / group / reading-order
   position **in this spec** so per-PR drafting is purely body-writing.

**Non-goals:**

- The remaining ~62 backlog entries (P1 / P2). Future brainstorms.
- Backward cross-link backfill on existing entries (deferred to a small
  follow-up sweep PR; see §5).
- Any IA / URL / template / group changes — those landed in #56.
- Field-Guide additions, group reshuffles, new top-nav items.

**Success criteria:**

- Every group that gained P0 entries shows them in its configured reading
  order on the group landing page.
- Search returns the new entries with the correct `[Concept]` / `[Playbook]` /
  `[Operation]` facet chip.
- Every new entry has a faithful, fluent ZH translation (not machine-literal,
  per `CLAUDE.md`).
- `<pre>` code blocks are byte-identical between EN and ZH copies.
- All existing gates green: `npm run build`, `npm run verify`, `npm test`.

## 2. Shape of work

| PR | Branch | Section | New entries | Group files touched |
|---|---|---|---|---|
| 1 | `feat/p0-content-concepts` | Concepts | 3 | `concepts/manifest.ts` (one file) |
| 2 | `feat/p0-content-playbooks` | Playbooks | 7 | 4 group files under `playbooks/groups/` |
| 3 | `feat/p0-content-operations` | Operations | 8 | 5 group files under `operations/groups/` |

The three PRs are **fully disjoint** on every shared file:

- No PR touches `i18n/ui.ts` (no new sections, no new UI strings, no new groups).
- No PR touches `astro.config.mjs`, `vercel.json`, or any layout / route.
- Changelog uses one-file-per-entry (refactor #32) → no contention.
- The five Operations groups, the four Playbooks groups, and the Concepts
  manifest are each touched by exactly one PR.

This is why three concurrent worktrees are safe.

Each worktree is created under `.worktrees/<branch>/`, branched from
`origin/main` (per memory: local `main` lags `origin/main` on this repo),
and squash-merged via the Vercel auto-deploy flow.

## 3. Per-entry contract

Each new entry contributes exactly three artifacts.

### 3.1 Files

1. `src/content/<section>/en/<slug>.html` — body-only HTML fragment, no
   doctype / head / script / style / frontmatter.
2. `src/content/<section>/zh/<slug>.html` — same structure, faithful fluent
   translation; `<pre>` blocks byte-identical to EN.
3. One registration line in the group file or Concepts manifest.

### 3.2 Body skeleton

```html
<section class="phase">
  <div class="phase-num">P1</div>          <!-- one-letter+number; varies, see siblings -->
  <div class="week">Playbook · Domain Playbooks</div>  <!-- localized kicker; omit for Concepts -->
  <h2>One-sentence thesis.</h2>
  <p class="goal">One paragraph framing: who needs this, what the essay delivers.</p>

  <div class="step">
    <div class="step-num">STEP 1</div>
    <h3>Section heading</h3>
    <p>…</p>
    <div class="callout">…</div>          <!-- or .callout.danger / .callout.tip, sparingly -->
  </div>

  <!-- 3-5 more step blocks -->

  <div class="step">
    <div class="step-num">STEP N</div>
    <h3>Closing / what to take away</h3>
    <p>…</p>
  </div>
</section>
```

- **Depth target:** 50–120 lines per fragment, median ~70 (sampled from existing siblings).
- **Steps:** 4–6 per essay. 1–2 callouts where they sharpen a point.
- **Code/config samples:** optional. When used, `<pre class="standalone">` and
  **byte-identical** between EN and ZH (translate prose only, never code).
- **External citation links:** none. Reference well-known things (OWASP Top 10,
  ReAct, NIST AI RMF) by name without `<a href>`.

### 3.3 Kicker lines

Every section uses a `<div class="week">` kicker line inside the opening `<section class="phase">`. The kicker is hand-written into each HTML fragment; it is **not** auto-derived from the group's `name` field at render time. New entries must match the **existing kicker string** used by sibling entries in the same group (which sometimes differs from the group's short `name` field — see `safety-and-security` below).

**Exact kicker strings for the 11 affected groups:**

| Section | Group key | EN kicker | ZH kicker |
|---|---|---|---|
| Concepts | (Agentic AI) | `Concepts · Agentic AI Explained` | `概念 · 智能体 AI 详解` |
| Concepts | (Building Blocks) | `Concepts · Core Building Blocks` | `概念 · 核心构件` |
| Playbooks | `domain-playbooks` | `Playbook · Domain Playbooks` | `实战手册 · 领域实战手册` |
| Playbooks | `coding-and-computer-use-agents` | `Playbook · Coding & Computer-Use Agents` | `实战手册 · 编码与计算机操作智能体` |
| Playbooks | `voice-realtime-agents` | `Playbook · Voice & Realtime Agents` | `实战手册 · 语音与实时智能体` |
| Playbooks | `agent-ux-and-human-interaction` | `Playbook · Agent UX & Human Interaction` | `实战手册 · 智能体体验与人机交互` |
| Operations | `agentops` | `Operation · AgentOps: Deploy & Operate` | `运维 · 智能体运维：部署与运营` |
| Operations | `evaluation-and-observability` | `Operation · Evaluation & Observability` | `运维 · 评估与可观测性` |
| Operations | `economics-roi` | `Operation · Economics & ROI` | `运维 · 经济性与投资回报` |
| Operations | `governance-compliance` | `Operation · Governance & Compliance` | `运维 · 治理与合规` |
| Operations | `safety-and-security` | `Operation · Safety, Alignment & Agentic Security` | `运维 · 安全、对齐与智能体安全` |

(The Playbooks/Operations ZH kicker labels are sampled from the existing entries' ZH HTML, which mirrors the EN form. The `safety-and-security` group's kicker uses the **longer** descriptive label `Safety, Alignment & Agentic Security` / `安全、对齐与智能体安全` even though the group's `name` field is the shorter `Safety & Security` / `安全与防护` — **match siblings**, not the field.)

**Concepts entries also include a `<div class="phase-num">` letter+number** (e.g., `A8`, `B5`) prefix on the section element. New Concepts entries use the next free letter+number in the group's existing scheme. Sample siblings to determine the right prefix.

### 3.4 Registration shape

**Concepts** (flat manifest in `src/content/concepts/manifest.ts`):

```ts
{
  page: L('Concepts','概念'),
  slug: L('<slug>','<slug>'),
  title: L('<EN title>','<ZH title>'),
  summary: L('<EN one-liner>','<ZH one-liner>'),
  group: L('<EN group>','<ZH group>'),
}
```

**Playbooks / Operations** (in the group's `groups/<key>.ts`):

```ts
{
  slug: '<slug>',
  title: L('<EN title>','<ZH title>'),
  summary: L('<EN one-liner>','<ZH one-liner>'),
}
```

(The `related` field on `Entry` is defined in `deep-dives/types.ts` but **not populated by this work** — see §5.)

### 3.5 Bilingual policy (from `CLAUDE.md`)

- Drafter writes EN first, then writes ZH from scratch in fluent native style — **not** a literal token map.
- Match step count, callout count, code-block content between EN and ZH.
- Translate prose only. **Never** translate code, comments inside code,
  identifiers, or any text inside `<pre>` blocks.
- ZH register: technical, concise, willing to use English loanwords where
  idiomatic (e.g., "RAG", "MCP", "OAuth").
- Before writing ZH, drafter samples ≥2 existing ZH siblings in the same section to anchor register.

## 4. The 18 entries

### 4.1 Concepts (3 entries → PR #1)

| # | Slug | Group (EN / ZH) | Pos | EN title | ZH title |
|---|---|---|---|---|---|
| 1 | `prompt-injection-101` | Agentic AI / 智能体 AI | 17 (after `agentic-risks-intro`) | Prompt injection, in plain words | 用大白话讲提示词注入 |
| 2 | `guardrails-101` | Building Blocks / 基础构件 | 25 (after `structured-outputs`) | Guardrails, in plain words | 用大白话讲护栏 |
| 3 | `evals-101` | Building Blocks / 基础构件 | 26 (after `guardrails-101`) | Evals, in plain words | 用大白话讲评测 |

**Summaries (EN / ZH):**

- **prompt-injection-101** — *What prompt injection actually is, why it's not a bug a vendor can patch, and the three real defenses available to you.* / *提示词注入究竟是什么、为何它不是哪家厂商能打补丁的 bug，以及你真正能用的三种防御手段。*
- **guardrails-101** — *Guardrails are pre/post-checks around a model call, not a wall around the model — what they catch, what they miss, and where they live.* / *护栏是模型调用前后的检查，而不是围着模型的一堵墙——它们能拦住什么、漏掉什么，又该装在哪里。*
- **evals-101** — *An eval is a small, trusted scoreboard you run against your own task — why public benchmarks aren't enough, and what a useful eval set looks like.* / *评测是你针对自己任务运行的一个小而可信的记分牌——为何公开基准不够用，以及一个有用的评测集长什么样。*

### 4.2 Playbooks (7 entries → PR #2)

| # | Slug | Group | Pos | EN title | ZH title |
|---|---|---|---|---|---|
| 4 | `finance-agents` | domain-playbooks | 6 (before `playbook-meta`) | Finance agents | 金融场景智能体 |
| 5 | `healthcare-agents` | domain-playbooks | 7 | Healthcare agents | 医疗场景智能体 |
| 6 | `legal-agents` | domain-playbooks | 8 | Legal agents | 法律场景智能体 |
| 7 | `browser-agents` | coding-and-computer-use-agents | 6 (after `computer-use-and-gui-agents`) | Browser agents | 浏览器智能体 |
| 8 | `ide-agents` | coding-and-computer-use-agents | 7 | IDE agents | IDE 智能体 |
| 9 | `outbound-voice-agents` | voice-realtime-agents | 7 (after `voice-failure-modes`) | Outbound voice agents | 外呼语音智能体 |
| 10 | `progressive-disclosure-ux` | agent-ux-and-human-interaction | 3 (after `approval-and-confirmation-ux`) | Progressive-disclosure UX for agents | 智能体的渐进式披露界面 |

**Summaries (EN / ZH):**

- **finance-agents** — *Where agents earn their keep in finance — reconciliation, research synthesis, KYC review — and the hard rails (audit, determinism, regulator-readable trails) they must carry.* / *智能体在金融场景真正能创造价值的地方——对账、研报合成、KYC 审核——以及它们必须背着的硬性约束（审计、确定性、可供监管审阅的轨迹）。*
- **healthcare-agents** — *Charting, prior auth, intake triage — the few healthcare jobs where agents shave real labor, and the privacy + clinical-safety guardrails you cannot ship without.* / *病历记录、事前授权、分诊接待——这些是医疗中智能体真正节省人力的少数任务，以及离开它们就不能上线的隐私与临床安全护栏。*
- **legal-agents** — *Discovery, contract review, citation checking — where legal agents already work, where they hallucinate, and what supervision they need by jurisdiction.* / *电子取证、合同审阅、引文核查——法律智能体已经能跑的地方、它们会幻觉的地方，以及不同法域下需要的人工监督。*
- **browser-agents** — *Driving a real browser as a tool — DOM versus pixel observation, login + auth state, the well-trodden failure modes, and when to step up to a full GUI agent.* / *把一个真实浏览器当工具来驱动——DOM 与像素两种观察方式、登录与认证状态、踩烂了的失败模式，以及何时该升级到完整 GUI 智能体。*
- **ide-agents** — *Coding agents that live in the editor — the loop is the same as a CLI coding agent, but the interaction surface, undo expectations, and trust threshold are all different.* / *住在编辑器里的编码智能体——内循环和 CLI 编码智能体一样，但交互面、撤销预期与信任阈值都不同。*
- **outbound-voice-agents** — *Agents that **make** the call instead of answering it — pacing, abandonment, identity disclosure, and the regulatory landmines that turn a clever demo into a fine.* / *主动拨打而非接听的智能体——节奏、放弃率、身份披露，以及把炫酷 demo 变成罚单的合规雷区。*
- **progressive-disclosure-ux** — *Show the user only the next decision they need to make — when to surface the chain of thought, the tool call, the diff; and when to keep it folded.* / *只把用户下一步需要做的决定摆在他面前——什么时候展开思考链、工具调用、diff，什么时候继续折叠。*

### 4.3 Operations (8 entries → PR #3)

| # | Slug | Group | Pos | EN title | ZH title |
|---|---|---|---|---|---|
| 11 | `feature-flags-for-agents` | agentops | 6 (after `rollout-and-versioning`) | Feature flags for agents | 面向智能体的特性开关 |
| 12 | `kill-switches` | agentops | 7 | Kill switches | 急停开关 |
| 13 | `online-vs-offline-evals` | evaluation-and-observability | 2 (after `why-agent-eval-is-hard`) | Online vs offline evals | 在线评测与离线评测 |
| 14 | `per-customer-economics` | economics-roi | 3 (after `unit-economics`) | Per-customer economics | 按客户的单位经济模型 |
| 15 | `eu-ai-act-for-agents` | governance-compliance | 4 (after `regulatory-landscape`) | EU AI Act, for agents | 欧盟《人工智能法案》——智能体视角 |
| 16 | `nist-ai-rmf-for-agents` | governance-compliance | 5 | NIST AI RMF, for agents | NIST AI RMF——智能体视角 |
| 17 | `agent-identity` | safety-and-security | 5 (after `guardrails`) | Agent identity | 智能体的身份 |
| 18 | `scoped-credentials-for-agents` | safety-and-security | 6 (after `agent-identity`) | Scoped credentials for agents | 面向智能体的范围受限凭证 |

**Summaries (EN / ZH):**

- **feature-flags-for-agents** — *Flags scoped to prompts, models, tools, and policies — what to gate, how to roll, and why "off by default" is a non-negotiable for agent flags.* / *面向 prompt、模型、工具与策略的开关——该把什么放进开关、如何放量，以及为何"默认关"对智能体开关是没得商量的。*
- **kill-switches** — *A button that stops a running agent fleet — what it must actually stop (in-flight calls, queued work, scheduled retries), and how to test it before you need it.* / *一个能停下整支正在运行的智能体队伍的按钮——它真正要拦下的东西（飞行中调用、排队任务、计划重试），以及如何在你真用上它之前就把它演练好。*
- **online-vs-offline-evals** — *Offline evals catch regressions before deploy; online evals catch the user behavior you couldn't fake — why you need both, and where each one lies to you.* / *离线评测在发布前抓住回归；在线评测抓住你伪造不出来的用户行为——为何你两者都需要，以及它们各自会在哪里骗你。*
- **per-customer-economics** — *Whole-system unit economics hide which customers cost you money — a per-tenant cost view, what drives the heavy-tail user, and the levers you actually have.* / *整盘的单位经济模型会把哪些客户亏钱遮起来——按租户的成本视图、什么造就长尾用户，以及你手上真正能用的杠杆。*
- **eu-ai-act-for-agents** — *The AI Act's risk tiers explained from an agent builder's perspective — what triggers high-risk, what general-purpose AI obligations look like, and the dates that matter.* / *从智能体开发者视角解读《人工智能法案》的风险分层——什么会触发高风险、通用人工智能义务是什么样子，以及关键时间点。*
- **nist-ai-rmf-for-agents** — *Map / Measure / Manage / Govern read as a checklist for agent teams — what each function actually demands when the system is an autonomous agent rather than a model.* / *把"映射 / 度量 / 管理 / 治理"四件套当作智能体团队的清单来看——当系统是自主智能体而不仅仅是一个模型时，每个职能真正要求什么。*
- **agent-identity** — *Who is acting when an agent calls a tool? Service accounts, on-behalf-of patterns, and the audit consequences of getting the answer wrong.* / *智能体调用工具时，到底是"谁"在动作？服务账号、on-behalf-of 模式，以及把这个答案搞错时的审计后果。*
- **scoped-credentials-for-agents** — *Why agents should never hold human-grade credentials — short-lived, narrowly-scoped, per-action tokens, and the failure modes when you try to take shortcuts.* / *为何智能体绝不该持有人类级别的凭证——短期、范围窄、按动作签发的令牌，以及走捷径时会撞上的失败模式。*

### 4.4 Slug normalization

The §10 backlog had three proposals in inconsistent casing
(`IDE-agents`, `EU-AI-Act-for-agents`, `NIST-AI-RMF-for-agents`). All slugs in
this spec are lowercase-kebab to match every existing slug on the site.

## 5. Cross-link policy

### 5.1 The `related` manifest field is NOT populated by this work

The `related` field is defined on `Entry` (`src/content/deep-dives/types.ts`)
but is currently dead metadata in production:

- The `GroupIndexView` render block for related links was **removed** in PR
  #56 review (see comment at `GroupIndexView.astro:54`) on the grounds that
  no entries declared `related` yet.
- No test currently validates that a `related` slug resolves to a real entry
  in its declared source.

Populating `related` on the 18 new entries today would be storing metadata
that does nothing — readers see no benefit, and a typo'd slug would be
silently shipped because nothing checks it.

**Decision:** New entries ship **without** `related` set. All `related`
population — forward (new → existing) and backward (existing → new) — is
deferred to a single follow-up sweep PR that also re-enables the render
block and adds a manifest test for slug resolution. This makes that sweep
PR a coherent unit of work with visible payoff, rather than a janitorial
ping.

### 5.2 In-prose `<a href>` cross-links (allowed in this work)

A different mechanism from `related` — these are anchor tags inside the
HTML fragment body, not manifest metadata. These DO render today and ARE
validated.

- Drafters MAY add 1–3 in-prose `<a href="/<section>/<group>/<slug>">`
  links where they sharpen a sentence (e.g., a `prompt-injection-101`
  entry naturally points to `/operations/safety-and-security/prompt-injection`
  for the deep version).
- Must use the full new-style `/<section>/<group>/<slug>` URL.
- The `check-internal-links.mjs` gate catches drift at `npm run verify`.
- Don't link into entries created by another in-flight PR; links to peers
  in the **same** PR are fine.

### 5.3 Suggested in-prose link pairings

Drafters may use these as starting points (not exhaustive, not required):

| New entry | Natural in-prose link targets |
|---|---|
| `prompt-injection-101` | `/operations/safety-and-security/prompt-injection`, `/concepts/agentic-risks-intro` |
| `guardrails-101` | `/operations/safety-and-security/guardrails`, `/concepts/tool-calling-explained` |
| `evals-101` | `/operations/evaluation-and-observability/why-agent-eval-is-hard`, `/concepts/reading-benchmarks` |
| `finance-agents` | `/operations/governance-compliance/audit-trails`, `/operations/governance-compliance/regulatory-landscape` |
| `healthcare-agents` | `/operations/governance-compliance/data-governance`, `/operations/safety-and-security/human-in-the-loop` |
| `legal-agents` | `/operations/governance-compliance/audit-trails`, `/playbooks/domain-playbooks/research-agents` |
| `browser-agents` | `/playbooks/coding-and-computer-use-agents/computer-use-and-gui-agents`, `/playbooks/coding-and-computer-use-agents/sandboxing-and-execution` |
| `ide-agents` | `/playbooks/coding-and-computer-use-agents/coding-agent-architecture` |
| `outbound-voice-agents` | `/playbooks/voice-realtime-agents/realtime-architecture`, `/playbooks/voice-realtime-agents/voice-failure-modes` |
| `progressive-disclosure-ux` | `/playbooks/agent-ux-and-human-interaction/approval-and-confirmation-ux` |
| `feature-flags-for-agents` | `/operations/agentops/rollout-and-versioning` |
| `kill-switches` | `/operations/agentops/incident-response-for-agents` (intra-PR: `feature-flags-for-agents`) |
| `online-vs-offline-evals` | `/operations/evaluation-and-observability/why-agent-eval-is-hard`, `.../tracing-and-observability` |
| `per-customer-economics` | `/operations/economics-roi/unit-economics`, `.../cost-attribution` |
| `eu-ai-act-for-agents` | `/operations/governance-compliance/regulatory-landscape` |
| `nist-ai-rmf-for-agents` | `/operations/governance-compliance/regulatory-landscape`, `.../governance-in-practice` |
| `agent-identity` | `/operations/governance-compliance/policy-enforcement`, `/concepts/tools-actions-environments` |
| `scoped-credentials-for-agents` | `/operations/safety-and-security/agentic-threat-model` (intra-PR: `agent-identity`) |

Two intra-PR links exist (`kill-switches → feature-flags-for-agents` and
`scoped-credentials-for-agents → agent-identity`). Both targets land in the
same PR as their sources, so no cross-PR coordination is needed.

## 6. Authoring patterns

### 6.1 Voice & tone

- Authoritative, opinionated essay voice (match `prompt-injection.html`,
  `unit-economics.html`, `realtime-architecture.html`).
- No marketing copy.
- No external citation links.
- No model name-dropping unless it illustrates a point.

### 6.2 Sources / accuracy

For entries with regulatory or domain-factual content, drafter does a quick
fact pass before finalizing — verifying named dates, tier names, regulator
names against an authoritative source. The result is **not** an external link
in the entry, but the drafter must not invent a directive number or an
effective date. Applies to:

- `eu-ai-act-for-agents`
- `nist-ai-rmf-for-agents`
- `finance-agents`
- `healthcare-agents`
- `legal-agents`

Everything else: write from general knowledge.

### 6.3 Per-PR tracer-bullet ordering

Inside each PR, draft **one entry first**, run the full gate trio
(`build` / `verify` / `test`) end-to-end, then draft the rest. Catches
registration / template bugs at entry #1 rather than entry #8.

Suggested tracer per PR:

| PR | Tracer entry | Why |
|---|---|---|
| Concepts | `prompt-injection-101` | Strongest existing sibling (`prompt-injection`) to mimic |
| Playbooks | `progressive-disclosure-ux` | Self-contained, low fact-checking risk, anchored in existing UX siblings |
| Operations | `feature-flags-for-agents` | Self-contained, low fact-checking risk, anchored in `rollout-and-versioning` |

## 7. Verification

No new gates are added. The IA expansion already shipped what we need.

### 7.1 Mandatory per-PR gates

Run in the worktree before opening the PR:

```bash
npm run build     # static build to dist/ — no new warnings
npm run verify    # bilingual completeness + check-internal-links.mjs
npm test          # extraction unit tests + manifest tests
```

`npm run verify` catches:

- Missing `zh/<slug>.html` for any new `en/<slug>.html` (or vice versa).
- Any new entry registered in a `groups/*.ts` without matching fragments.
- Broken internal `<a href>` to a route that doesn't resolve in `dist/`.

`npm test` catches (via existing manifest tests):

- Shape violations on the new entries (missing `title`, `summary`, etc.).
- Slug collisions inside a section.
- `groupSummary` missing on a group file (already enforced on existing groups;
  new entries don't add groups, so unaffected).

(Note: `related` field validation is **not** in the existing test suite — but
this work doesn't populate `related`, per §5.1, so that gap doesn't bite
here. The follow-up sweep PR adds the test alongside populating `related`.)

### 7.2 Pre-PR manual smoke

Drafter does this once per PR:

- `npm run build && npx astro preview`
- Spot-check 2 random new entries in EN and the same 2 in ZH.
- Visit the group landing page for each affected group; confirm new entries
  appear in the configured reading order.
- Visit search; confirm new entries return with the correct facet chip.
- Visit at desktop (1280px) and mobile widths; confirm header / sidebar /
  callouts render cleanly.

### 7.3 Not automated (drafter judgment + human review)

- ZH translation **fluency** — the gate catches existence, not quality.
  Drafter writes ZH natively per §3.5; PR review catches the rest.
- Factual accuracy on the five regulatory / domain entries — §6.2 fact pass.

## 8. Changelog

`CLAUDE.md` requires one entry file per PR. Three PRs → three entries.

**File:** `src/content/changelog/entries/<merge-date>-<slug>.ts`

The `<merge-date>` is the actual merge day to `main` (per `CLAUDE.md` — a stale
date is a defect, fix it at merge time).

| PR | Filename slug | EN title | ZH title |
|---|---|---|---|
| Concepts P0 | `concepts-p0-launch` | Added P0 Concepts: prompt injection, guardrails, evals | 新增 P0 概念条目：提示词注入、护栏、评测 |
| Playbooks P0 | `playbooks-p0-launch` | Added P0 Playbooks: finance, healthcare, legal, browser, IDE, outbound voice, progressive-disclosure UX | 新增 P0 实战手册：金融、医疗、法律、浏览器、IDE、外呼语音、渐进式披露 UX |
| Operations P0 | `operations-p0-launch` | Added P0 Operations: feature flags, kill switches, online vs offline evals, per-customer economics, EU AI Act, NIST AI RMF, agent identity, scoped credentials | 新增 P0 运维条目：特性开关、急停开关、在线 vs 离线评测、按客户经济、欧盟 AI 法案、NIST AI RMF、智能体身份、范围受限凭证 |

Bullets per entry: ≤3, bilingual via `L()`, covering which entries shipped and
what gap each fills relative to the IA expansion's launch-coherence goal.

The backward-cross-link sweep PR (§5.3) gets its own small changelog entry
when it ships.

## 9. Risks & mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| ZH translation reads as machine-literal | medium | §3.5 mandates native-style ZH; drafter samples ≥2 existing ZH siblings before writing; human PR review |
| Drafter invents a fact in a regulatory entry | medium | §6.2 fact-pass requirement on the five flagged entries; PR review checks named dates/tiers/regulators |
| In-prose `<a href>` points to a bad path | low | `check-internal-links.mjs` (added in #56) catches broken internal links at `npm run verify` |
| Drafter copies the wrong kicker label | medium | §3.3 gives the exact kicker string for every affected group; drafter pastes from the table |
| Three concurrent worktrees collide on shared files | low | §2 verified the three PRs are disjoint on every shared file |
| Reading-order positions conflict with parallel edits | very low | Only one PR touches any given group file (Concepts manifest, 4 Playbooks groups, 5 Operations groups — no overlap) |
| Search facet chip missing for new entries | none | Pagefind section filter (Field Guide / Concepts / Deep-Dives / Playbooks / Operations / Changelog) already shipped; see changelog `2026-05-22-site-enhancements-bundle.ts` |
| `related` sweep follow-up gets forgotten | medium | Named explicitly in §5.1 and §11; tracked as a follow-up with concrete scope |
| Drafter forgets the changelog entry | low | `CLAUDE.md` loaded into every Claude Code session; PR review catches it |
| One PR is much larger than the others | low | Per-PR worktree is isolated; tracer-bullet ordering (§6.3) caps blast radius if the structural recipe is wrong |

## 10. Out of scope (explicit)

- The remaining ~62 backlog entries (P1 / P2) from the IA expansion §10.
- Backward `related` sweep — follow-up PR.
- New groups, new sections, new top-nav items.
- Field Guide additions.
- Concept group reshuffles.
- URL redirects, sitemap-priority tweaks, RSS feed.
- `/paths/` curated reading paths (§10.5 of IA spec).
- LLM-as-judge for ZH register or any translation-quality automation.
- Image / diagram assets for new entries — none required; drafter-discretion follow-up if a strong case arises.

## 11. Follow-ups (tracked, not in this spec)

1. **`related` cross-link sweep PR** — a single coherent PR that:
   - Populates `related` (both forward on the 18 new entries and backward on
     natural existing entries) — bounded to ~30–50 edits total.
   - Re-enables the `related` render block in `GroupIndexView.astro` (removed
     during #56 review when no entries declared it).
   - Adds a manifest test asserting every `related` slug resolves to a real
     entry in its declared source (the §8.1 test from the IA spec that did
     not ship in #56).
   - Touches only `groups/*.ts`, `concepts/manifest.ts`, the view component,
     and the test file. After all three content PRs merge.
2. **P1 backlog brainstorm** — the 21 P1 Deep-Dives, 8 P1 Playbooks, 8 P1
   Operations, 5 P1 Concepts (44 entries total).
3. **`/paths/` curated reading paths** — already a §10.5 P1 in the IA spec.
