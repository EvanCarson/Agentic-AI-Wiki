# Agent Security Deep-Dive Group — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Ship a new `agent-security` Deep-Dive group (order 95, prefix `S`) with 8 essays forming the cohesive production-agent security surface.

**Architecture:** New group file `groups/agent-security.ts`; 8 bilingual fragment pairs under `deep-dives/{en,zh}/<slug>.html`; xref back-pass into ~9 existing security-adjacent pages; one bilingual changelog entry.

**Tech Stack:** Astro + TS manifest; body-only HTML fragments (`.phase`/`.step`/`.callout`/`<pre class="standalone">`/`<pre class="trace">`/`<code class="inline">`/`.xref`); vitest manifest tests.

**Design:** `docs/superpowers/specs/2026-07-14-agent-security-group-design.md`.
**Research (source of record for facts):** `docs/superpowers/specs/2026-07-14-agent-security-research.md`.

**Proven-pattern lessons (from the 42-page slate PRs #89/#90/#91):**
- New-group scaffold CANNOT commit with empty `entries` (manifest test rejects). Scaffold ships with S1 in ONE atomic commit (Task 1).
- Xref URLs: deep-dives `/deep-dives/<group-key>/<slug>`; concepts `/concepts/<slug>`; operations `/operations/safety-and-security/<slug>` (all security ops pages are in `safety-and-security`); zh prepends `/zh`.
- Never forward-reference an essay not yet committed — demote to prose; Task 10 back-pass restores.
- `<pre>` blocks byte-identical en↔zh (hash-verify). Hook lede per CLAUDE.md, no banned openers.
- Atomic commit per essay: `git add <specific 3 files> && git commit -m "..."` (no `--amend`).
- Serial dispatch (all essays touch `groups/agent-security.ts`). Do NOT parallelize.

---

## Group scaffold (created in Task 1, shipped with S1)

`src/content/deep-dives/groups/agent-security.ts`:

```ts
import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'agent-security',
  order: 95,
  name: L('Agent Security', '智能体安全'),
  groupSummary: L(
    'Securing a production agent end-to-end — injection defense, policy-as-code, identity and attestation, red-teaming, isolation, and the audit primitives that shipped in 2026.',
    '端到端保护一台生产级智能体——注入防御、策略即代码、身份与鉴证、红队、隔离，以及 2026 年落地的审计原语。',
  ),
  entries: [
    // S1 entry appended in Task 1; S2-S8 appended in their tasks.
  ],
};
export default group;
```

Header line for every fragment: en `Deep Dive · Agent Security`, zh `深入解析 · 智能体安全`.

## Standard 8-step workflow (every essay task)

1. Append the entry to `entries` in `groups/agent-security.ts` (Task 1 also writes the group file).
2. `npm test` — expect FAIL (`<slug>` missing bilingual fragments).
3. Write `deep-dives/en/<slug>.html` per the content spec.
4. Write `deep-dives/zh/<slug>.html` — faithful prose, `<pre>` byte-identical.
5. `npm test` — expect PASS.
6. `npm run verify` — expect PASS.
7. `npm run build` — expect PASS, no new warnings.
8. Atomic commit (3 files).

**Global authoring rules (apply to every essay):**
- Reference style: match `src/content/deep-dives/en/mcp-security-anti-patterns.html` (same subject domain, established voice).
- Every substantive factual claim traces to the research file. Claims flagged `[unverified]` there are DROPPED, not hedged.
- `mcp-server-git` CVE numbers and AgentPoison ASR figures: describe the pattern; only print exact numbers if trivially confirmable, else omit the number and cite qualitatively.
- A2A `#1672` is an OPEN PROPOSAL — never call it a ratified spec.
- The Gemini CLI incident's full writeup lives in S7; S1 cites and links it (avoid duplicating the blow-by-blow).
- Draft order: S1 → S2 → S3 → S4 → S5 → S6 → S7 → S8. Within-group cross-links only reference already-committed essays; anything later is demoted to prose for Task 10.

---

## Task 1: Scaffold + S1 — `prompt-injection-defense-2026`

**Files:** create `groups/agent-security.ts` (scaffold above + S1 entry), `deep-dives/{en,zh}/prompt-injection-defense-2026.html`.

**Spec:** L (~2300 en words), must, `S1`.

**Entry:**
```ts
{ page: 'prompt-injection-defense-2026', slug: 'prompt-injection-defense-2026', title: L('Prompt-Injection Defense in 2026','2026 年的提示注入防御'), summary: L("Prompt injection is an unsolved frontier problem, not a bug you patch — the instruction hierarchy, defense-in-depth layers, and why the Gemini CLI CVSS-10 incident proves single-model defenses fail.",'提示注入是尚未解决的前沿问题，不是能打补丁的 bug——指令层级、纵深防御分层，以及 Gemini CLI CVSS-10 事件为何证明单模型防御会失败。') },
```

**`<h2>` (en):** Prompt injection is a frontier security problem no model-level fix fully solves — the honest 2026 posture is an instruction hierarchy plus defense-in-depth, and a CVSS-10 incident is the proof that any single layer fails alone.

**Hook lede (en):** OpenAI calls prompt injection a "frontier security challenge" and means it literally: there is no model-level fix that fully prevents it, and every team shipping an agent in 2026 is defending an unsolved problem. The load-bearing ideas are an instruction hierarchy — system outranks developer outranks user outranks tool output — and defense-in-depth, because the Gemini CLI incident (CVSS 10, April 2026) showed a single injected GitHub issue chaining straight through a tool-allowlist bypass to token exfiltration. This essay is the honest defense posture: which layers are load-bearing, which are theater, and how to test that your hierarchy actually holds against tool-output injection, not just a hostile user message.

**Sections (STEP en / zh):** 1 "Why there's no patch" / "为何没有补丁"; 2 "The instruction hierarchy" / "指令层级"; 3 "Defense-in-depth layers, ranked by leverage" / "按杠杆排序的纵深防御层"; 4 "The layer everyone skips: tool-output injection" / "人人都跳过的一层：工具输出注入"; 5 "Testing the hierarchy holds" / "测试层级是否守得住".

**Beats:** S1: OpenAI framing + IH-Challenge (Mar 2026). S2: system>developer>user>tool ordering with a concrete override example. S3: rank layers; note "12-layer"/"5-layer" are vendor taxonomies (attribute); highest-leverage single layer = typed-schema output (cross-link `structured-outputs` concept + S2 policy gating). S4: tool output is untrusted input — the interesting attack surface; downstream data (a GitHub issue, a webpage, a tool result) carrying instructions. S5: red-team the hierarchy (forward-ref S4 as prose — S4 not committed yet).

**`<pre>` blocks:** one `<pre class="trace">` showing an instruction-hierarchy override attempt being refused (~12 lines); one `<pre class="standalone">` showing a typed-schema output constraint (~12 lines).

**Xrefs (all pre-existing):** `/concepts/prompt-injection-101` (S1), `/operations/safety-and-security/prompt-injection` (S1), `/concepts/structured-outputs` (S3), `/deep-dives/mcp/mcp-tool-poisoning` (S4). Demote to prose: `agent-supply-chain-security` (S7, not committed), `red-teaming-agents` (S4, not committed).

**Task 1 exact steps:**
- [ ] Write `groups/agent-security.ts` (scaffold + S1 entry).
- [ ] `npm test` — expect FAIL (missing `prompt-injection-defense-2026` fragments).
- [ ] Write en fragment.
- [ ] Write zh fragment.
- [ ] `npm test` PASS → `npm run verify` PASS → `npm run build` PASS.
- [ ] Commit: `git add src/content/deep-dives/groups/agent-security.ts src/content/deep-dives/en/prompt-injection-defense-2026.html src/content/deep-dives/zh/prompt-injection-defense-2026.html && git commit -m "Agent Security: scaffold groups/agent-security.ts + S1 prompt-injection-defense-2026"`.

---

## Task 2: S2 — `policy-as-code-for-agents`

**Files:** append to `groups/agent-security.ts`; `deep-dives/{en,zh}/policy-as-code-for-agents.html`.

**Spec:** L (~2300), must, `S2`.

**Entry:**
```ts
{ page: 'policy-as-code-for-agents', slug: 'policy-as-code-for-agents', title: L('Policy-as-Code for Agents','面向智能体的策略即代码'), summary: L('OPA/Rego and Cedar gating every tool call at the boundary — where the PDP lives, failure-open vs failure-closed, and the structured PolicyDecision that makes refusals machine-readable.','用 OPA/Rego 与 Cedar 在边界处对每次工具调用做门控——PDP 放在哪里、失败放行还是失败拦截，以及让拒绝可被机器读取的结构化 PolicyDecision。') },
```

**`<h2>` (en):** Policy-as-code moves the "may this agent do this" decision out of the prompt and into a policy engine that gates every tool call at the boundary — and the 2026 tooling (Cedar in Bedrock AgentCore, Microsoft's Agent Governance Toolkit) makes it a solved engineering problem, not a research one.

**Hook lede (en):** The instruction hierarchy tells the model what to prioritize; policy-as-code decides what the model is actually allowed to do, in code the model cannot argue with. In 2026 this is a gateway pattern: a policy decision point (PDP) — OPA with Rego, or Cedar — intercepts every tool call before it executes and returns a structured verdict, not a vibe. Microsoft's Agent Governance Toolkit returns a `PolicyDecision` with `allowed`, `matched_rule`, an `action`, and a human-readable `reason`; AWS put Cedar inside Bedrock AgentCore at the tool-call boundary. This essay is where the PDP lives, the failure-open-versus-failure-closed choice that decides your blast radius, and why the structured decision is the primitive everything downstream depends on.

**Sections:** 1 "The gateway pattern" / "网关模式"; 2 "OPA/Rego vs Cedar for agent workloads" / "面向智能体负载的 OPA/Rego 与 Cedar"; 3 "Where the PDP lives (and the latency budget)" / "PDP 放在哪里（及延迟预算）"; 4 "Failure-open vs failure-closed" / "失败放行与失败拦截"; 5 "The structured PolicyDecision" / "结构化的 PolicyDecision".

**Beats:** S1: PDP-fronts-the-gateway; call before invoking. S2: Rego expressiveness vs Cedar verifiability/analysis; AGT supports both + YAML. S3: OPA CLI ~50-200 ms subprocess vs remote OPA server sub-ms (use OFFICIAL figures, NOT "<0.1ms"); sidecar pattern. S4: failure-closed default for write tools, failure-open only for read-only low-risk. S5: `PolicyDecision{allowed, matched_rule, action, reason, audit_entry}` — the `reason` field is what S6 (why-trails) and S8 (receipts) build on; cross-link both as prose (not committed yet).

**`<pre>` blocks:** one `<pre class="standalone">` Rego (or Cedar) policy gating a `write_file` tool (~18 lines); one `<pre class="trace">` PolicyDecision JSON (~12 lines).

**Xrefs (pre-existing):** `/operations/safety-and-security/agentic-threat-model` (S1), `/operations/safety-and-security/scoped-credentials-for-agents` (S3). Prose-demote: `structured-refusal-and-why-trails` (S6), `decision-receipts-and-audit` (S8), `prompt-injection-defense-2026`→ this IS linkable (S1 committed): `/deep-dives/agent-security/prompt-injection-defense-2026` (S1).

**Commit:** `"Agent Security: S2 policy-as-code-for-agents"`.

---

## Task 3: S3 — `agent-identity-and-attestation`

**Files:** append; `deep-dives/{en,zh}/agent-identity-and-attestation.html`.

**Spec:** M (~1500), must, `S3`.

**Entry:**
```ts
{ page: 'agent-identity-and-attestation', slug: 'agent-identity-and-attestation', title: L('Agent Identity & Attestation','智能体身份与鉴证'), summary: L('Three complementary layers answer "which agent is calling me" — signed Agent Cards, runtime attestation (OATR), and Verifiable Credentials — plus Visa\'s RFC 9421 request signing for commerce.','三个互补的层回答"是哪个智能体在调用我"——签名的 Agent Card、运行时鉴证（OATR）、以及可验证凭证——外加 Visa 用于商务的 RFC 9421 请求签名。') },
```

**`<h2>` (en):** "Which agent is calling me" has three answers in 2026 — a signed Agent Card proves who published it, runtime attestation proves who is calling right now, and a Verifiable Credential proves what a third party vouches for — and they are complementary, not competing.

**Hook lede (en):** Once agents call other agents' tools, "which agent is this" stops being rhetorical and becomes an authorization question with real money attached. Three mechanisms answer it at different layers: signed Agent Cards prove a card's static authenticity (the open A2A `#1672` proposal), runtime attestation binds a specific request to a specific agent instance (the OATR proposal — Ed25519 JWTs, RFC 8785 canonical JSON, request-hash replay protection), and Verifiable Credentials let a third party vouch for an agent across trust domains (W3C DID/VC, used by Google's AP2 for auditable consent). Visa's Trusted Agent Protocol adds RFC 9421 HTTP Message Signatures that lock each request to a merchant page. This essay is the taxonomy, the minimum viable identity for an internal versus a cross-org agent, and why none of these is a ratified standard yet.

**Sections:** 1 "The three questions hiding in 'which agent'" / "'哪个智能体'背后藏的三个问题"; 2 "Signed Agent Cards (static authenticity)" / "签名的 Agent Card（静态真实性）"; 3 "Runtime attestation: OATR" / "运行时鉴证：OATR"; 4 "Verifiable Credentials (cross-domain trust)" / "可验证凭证（跨域信任）"; 5 "Commerce: Visa TAP and RFC 9421" / "商务：Visa TAP 与 RFC 9421"; 6 "Minimum viable identity" / "最小可用身份".

**Beats:** clearly mark #1672 as OPEN proposal (mechanism traces to third-party getagentid.dev, not A2A-adopted). OATR = per-request runtime. VC/DID = cross-domain. Visa TAP = request-locked signatures. S6: internal agent may need only a signed card + network policy; cross-org commerce needs request signing + VC. Reference S8 for where signed identity lands in receipts (prose or link — S8 not committed).

**`<pre>` blocks:** one `<pre class="trace">` OATR attestation JWT header+claims (~15 lines); one `<pre class="standalone">` RFC 9421 signature-input example (~10 lines).

**Xrefs (pre-existing):** `/deep-dives/protocols-and-interop/a2a-v1-deep-dive`, `/deep-dives/protocols-and-interop/agent-cards-and-discovery`, `/deep-dives/protocols-and-interop/ap2-and-agent-commerce`, `/operations/safety-and-security/scoped-credentials-for-agents`. Prose-demote: S8.

**Commit:** `"Agent Security: S3 agent-identity-and-attestation"`.

---

## Task 4: S4 — `red-teaming-agents`

**Files:** append; `deep-dives/{en,zh}/red-teaming-agents.html`.

**Spec:** M (~1600), must, `S4`.

**Entry:**
```ts
{ page: 'red-teaming-agents', slug: 'red-teaming-agents', title: L('Red-Teaming Agents','对智能体做红队'), summary: L('MCPTox showed a 36.5% average attack success rate across 20 models — with inverse scaling, where more capable models are more susceptible — and a three-paradigm methodology you can turn into a repeatable harness.','MCPTox 显示 20 个模型平均攻击成功率 36.5%——且存在逆向扩展，越强的模型越易受攻击——以及一套可变成可重复测试台的三范式方法论。') },
```

**`<h2>` (en):** Red-teaming an agent is not one-off manual probing — MCPTox turned it into a benchmark (36.5% average attack success rate, and the unsettling finding that more capable models are *more* susceptible) and a three-paradigm methodology you can build a repeatable harness around.

**Hook lede (en):** Safety alignment does not catch tool poisoning: in the MCPTox benchmark, Claude-3.7-Sonnet refused poisoned tool calls under 3% of the time, and the average attack success rate across 20 models was 36.5%. The most uncomfortable finding is inverse scaling — better instruction-following makes a model *more* susceptible, and turning on Qwen3's reasoning mode raised its attack success rate by nearly 28 points. This essay turns red-teaming from ad-hoc probing into a repeatable harness: the three attack paradigms MCPTox formalizes (explicit-trigger hijacking, implicit-trigger hijacking, parameter tampering), how to seed fixture MCP servers with known poisons, and what attack-success-rate threshold should block a release for your deployment tier.

**Sections:** 1 "Why alignment doesn't save you" / "为何对齐救不了你"; 2 "The MCPTox numbers, honestly" / "如实看待 MCPTox 的数字"; 3 "Inverse scaling" / "逆向扩展"; 4 "The three attack paradigms" / "三种攻击范式"; 5 "Building a repeatable harness" / "构建可重复的测试台"; 6 "Ship-blocking thresholds" / "阻断发布的阈值".

**Beats:** cite MCPTox precisely (45 servers, 353 tools, 1312 cases, 36.5% avg, per-model figures). Inverse scaling + Qwen3 +27.8%. Three paradigms with case counts. Harness: fixture servers + seeded poisons + CI. AgentPoison referenced qualitatively (verify-or-describe). S7 owns supply-chain framing (link once committed → prose now).

**`<pre>` blocks:** one `<pre class="trace">` a poisoned-tool-description attack case (~12 lines); one `<pre class="standalone">` a red-team harness skeleton (~15 lines Python).

**Xrefs (pre-existing):** `/deep-dives/mcp/mcp-tool-poisoning`, `/deep-dives/memory-and-context/memory-poisoning-defenses`, `/concepts/agentic-risks-intro`, `/operations/safety-and-security/agentic-threat-model`. Link S1 (committed): `/deep-dives/agent-security/prompt-injection-defense-2026`. Prose-demote: S7.

**Commit:** `"Agent Security: S4 red-teaming-agents"`.

---

## Task 5: S5 — `sandbox-and-isolation-patterns`

**Files:** append; `deep-dives/{en,zh}/sandbox-and-isolation-patterns.html`.

**Spec:** M (~1500), should, `S5`.

**Entry:**
```ts
{ page: 'sandbox-and-isolation-patterns', slug: 'sandbox-and-isolation-patterns', title: L('Sandbox & Isolation Patterns','沙箱与隔离模式'), summary: L('Shared-kernel containers are no longer enough for agent-generated code — the 2026 tiers are microVMs (Firecracker, <150ms), gVisor userspace interception, and remote-only execution, chosen by blast radius.','对智能体生成的代码而言，共享内核的容器已经不够了——2026 年的层级是 microVM（Firecracker，<150ms）、gVisor 用户态拦截、以及仅远程执行，按爆炸半径来选。') },
```

**`<h2>` (en):** Treat agent-generated code as hostile: shared-kernel containers stopped being sufficient in 2026, and the real choice is microVM versus gVisor versus remote-only, decided by the blast radius you can tolerate.

**Hook lede (en):** The moment an agent runs code it wrote — or a tool it was told to trust — you are executing untrusted input, and a shared-kernel Docker container is one kernel exploit away from your host. The 2026 consensus is to treat agent-generated code as hostile by default and pick isolation by blast radius: microVMs (Firecracker, E2B) give a separate kernel and sub-150ms startup, gVisor intercepts syscalls in userspace at near-container speed, and remote-only execution removes local exec entirely. This essay is the tier comparison with real startup and threat-model numbers, where computer-use and browser isolation change the calculus (screen plus network egress, not just code), and when remote-only is the right default.

**Sections:** 1 "Agent code is untrusted input" / "智能体代码是不受信输入"; 2 "The isolation tiers" / "隔离层级"; 3 "microVM vs gVisor vs container" / "microVM 与 gVisor 与容器"; 4 "Computer-use and browser isolation" / "计算机操作与浏览器隔离"; 5 "When remote-only wins" / "仅远程何时取胜".

**Beats:** containers share kernel (<1s, kernel-exploit exposure); Firecracker microVM separate kernel (<150ms); gVisor userspace syscall interception. Attribute vendor claims. Computer-use adds screen + egress surface. Remote-only default for untrusted tool sources.

**`<pre>` blocks:** one `<pre class="trace">` tier-comparison table (~15 lines); one `<pre class="standalone">` a Firecracker/E2B sandbox-per-tool-call snippet (~12 lines).

**Xrefs (pre-existing):** `/playbooks/coding-and-computer-use-agents/sandboxing-and-execution`, `/deep-dives/architectures-and-patterns/browser-agent-failure-modes`, `/field-guide/computer-use-in-production`, `/operations/safety-and-security/scoped-credentials-for-agents`. Link S4 (committed): `/deep-dives/agent-security/red-teaming-agents`.

**Commit:** `"Agent Security: S5 sandbox-and-isolation-patterns"`.

---

## Task 6: S6 — `structured-refusal-and-why-trails`

**Files:** append; `deep-dives/{en,zh}/structured-refusal-and-why-trails.html`.

**Spec:** M (~1300 — keep tight), should, `S6`. **This is the thinnest topic — scope tightly, defer aggressively.**

**Entry:**
```ts
{ page: 'structured-refusal-and-why-trails', slug: 'structured-refusal-and-why-trails', title: L('Structured Refusal & Why-Trails','结构化拒绝与理由链'), summary: L('A prose refusal tells a user "no"; an enumerated refusal reason plus a why-trail tells a forensic investigator exactly which rule fired and why — the accountability primitive that a policy decision already hands you.','散文式拒绝只对用户说"不行"；一个枚举化的拒绝原因加一条理由链，能告诉取证人员到底是哪条规则触发、为何触发——这是策略决策已经交到你手上的问责原语。') },
```

**`<h2>` (en):** A refusal that says "I can't help with that" is a dead end; an enumerated refusal reason plus a why-trail is an accountability primitive — and the structured `reason` field your policy engine already returns is 90% of the work.

**Hook lede (en):** "I'm sorry, I can't help with that" is useless to a forensic investigator and only slightly less useless to the user who wants to know what to fix. The 2026 alternative is a structured refusal: an enumerated reason code — the kind Microsoft's Agent Governance Toolkit already returns in `PolicyDecision.reason`, or the OATR rejection reason codes — paired with a why-trail that records which rule fired against which input. Logs support forensics; why-trails support accountability under examination. This short essay is the minimum useful refusal-reason taxonomy, the why-trail-versus-log distinction, and how to keep a why-trail auditable without leaking the sensitive reasoning behind the refusal. It deliberately stops at the boundary: the policy mechanism lives in policy-as-code, and the signing and storage live in decision receipts.

**Sections:** 1 "Why prose refusals fail two audiences" / "散文式拒绝为何辜负两类受众"; 2 "The enumerated refusal-reason taxonomy" / "枚举化的拒绝原因分类"; 3 "Why-trail vs log" / "理由链与日志"; 4 "Auditable without leaking" / "可审计而不泄露".

**Beats:** S2 owns the policy mechanism, S8 owns signing — this essay owns the taxonomy + UX/forensic argument ONLY, cross-links both. AGT `PolicyDecision.reason` + OATR reason codes as working examples. "Logs support forensics; why-trails support accountability" (attribute). Redaction: record the rule + input class, not the raw sensitive content.

**`<pre>` blocks:** one `<pre class="trace">` a structured refusal (reason code + why-trail) vs a prose refusal, side by side (~15 lines).

**Xrefs (pre-existing + committed):** `/deep-dives/agent-security/policy-as-code-for-agents` (S2, committed), `/operations/safety-and-security/guardrails`, `/concepts/guardrails-101`. Prose-demote: S8 (not committed).

**Commit:** `"Agent Security: S6 structured-refusal-and-why-trails"`.

---

## Task 7: S7 — `agent-supply-chain-security`

**Files:** append; `deep-dives/{en,zh}/agent-supply-chain-security.html`.

**Spec:** M (~1600), stretch, `S7`.

**Entry:**
```ts
{ page: 'agent-supply-chain-security', slug: 'agent-supply-chain-security', title: L('Agent Supply-Chain Security','智能体供应链安全'), summary: L('The Gemini CLI CVSS-10 compromise is the canonical warning — a public GitHub issue chained through an auto-approve bypass to token exfiltration — and it generalizes to every MCP server you install without vetting.','Gemini CLI 的 CVSS-10 被攻破事件是标志性警示——一个公开的 GitHub issue 经由自动批准的绕过一路串到令牌外泄——而它可推广到你未经审查就安装的每一台 MCP 服务器。') },
```

**`<h2>` (en):** Every MCP server you install is a production dependency with tool-call privileges — the Gemini CLI CVSS-10 incident is the canonical proof, and the defense is a vet-before-install checklist plus continuous monitoring for poisoned updates.

**Hook lede (en):** In April 2026 a prompt injection hidden in a public GitHub issue chained through Gemini CLI's `--yolo` auto-approve bypass and exfiltrated environment variables and git tokens — a CVSS-10 supply-chain compromise of a 101,000-star repository, fixed only in 0.39.1. It is the canonical warning because it generalizes: an MCP server is a production dependency that runs with your agent's tool-call privileges, and analyses of thousands of public servers found intentional malice, SSRF exposure, and exploitable file and command APIs at rates too high to install-and-hope. This essay is the full incident anatomy, the pattern it teaches, a concrete vet-before-install checklist, and how to monitor an approved server for the poisoned-update attack that static review misses.

**Sections:** 1 "The Gemini CLI incident, in full" / "Gemini CLI 事件全貌"; 2 "The pattern it teaches" / "它教给我们的模式"; 3 "The state of MCP-server security" / "MCP 服务器安全现状"; 4 "Vet before install" / "安装前审查"; 5 "Monitoring for poisoned updates" / "监控被投毒的更新".

**Beats:** THIS essay owns the full Gemini CLI writeup (GHSA-wpqr-6v78-jr5g, `--yolo`, `cat /proc/$PPID/environ`, `.git/config`, fixed 0.39.1/0.40.0-preview.3, run-gemini-cli 0.1.22, ≥8 Google repos). mcp-server-git chained-CVE pattern (NVD-verify or describe). Scale stats (attribute: ~8% of ~18k repos malice-signs; ~36.7% of 7k+ SSRF; >30% of 1.8k exploitable; Azure MCP no-auth CVSS 9.1). Checklist: pin versions, review agent-config paths, block auto-approval, treat as prod dep. Monitoring: watch for update drift.

**`<pre>` blocks:** one `<pre class="trace">` the injection→bypass→exfil chain (~15 lines); one `<pre class="standalone">` a vet-before-install checklist as a script/YAML (~15 lines).

**Xrefs (pre-existing + committed):** `/deep-dives/mcp/mcp-security-anti-patterns`, `/deep-dives/mcp/mcp-tool-poisoning`, `/deep-dives/mcp/mcp-registry-and-distribution`, `/deep-dives/agent-security/prompt-injection-defense-2026` (S1), `/deep-dives/agent-security/red-teaming-agents` (S4).

**Commit:** `"Agent Security: S7 agent-supply-chain-security"`.

---

## Task 8: S8 — `decision-receipts-and-audit`

**Files:** append; `deep-dives/{en,zh}/decision-receipts-and-audit.html`.

**Spec:** S (~900), stretch, `S8`.

**Entry:**
```ts
{ page: 'decision-receipts-and-audit', slug: 'decision-receipts-and-audit', title: L('Decision Receipts & Audit','决策回执与审计'), summary: L('A signed action envelope per tool call, stored in a hash-chained journal, turns an agent run into a tamper-evident record you can replay — the audit primitive that regulators (SR 26-2, EU AI Act Article 12) now expect.','每次工具调用一份签名的动作信封、存入哈希链式日志，就把一次智能体运行变成可回放、防篡改的记录——这是监管方（SR 26-2、欧盟 AI 法案第 12 条）如今所期望的审计原语。') },
```

**`<h2>` (en):** A decision receipt — a signed action envelope per tool call, hash-chained into a tamper-evident journal — turns an agent run into a record you can replay and prove, which is exactly what SR 26-2 and the EU AI Act now require.

**Hook lede (en):** When an agent does something expensive or wrong, "check the logs" is not enough — logs can be edited, and they rarely let you replay the exact run. A decision receipt is the stronger primitive: a signed action envelope emitted per tool call, hash-chained into a journal so any tampering breaks the chain, capturing the prompt, the reasoning, the tool inputs and outputs, the policy version that was in force, and precise timestamps. That record supports deterministic replay and non-repudiation, and it is no longer optional — SR 26-2 (April 2026) and EU AI Act Article 12 (high-risk obligations landing August 2026) both expect automatic, tamper-evident event recording. This short essay is what to sign and hash-chain, per-call versus per-session, and the hard question of who holds the key if the runtime itself is compromised.

**Sections:** 1 "Logs vs receipts" / "日志与回执"; 2 "The signed action envelope" / "签名的动作信封"; 3 "Hash-chaining for tamper-evidence" / "用哈希链实现防篡改"; 4 "What regulators expect" / "监管方的期望"; 5 "The key-custody problem" / "密钥托管问题".

**Beats:** THIS essay owns signing/storage/replay. Signed envelope per call → hash-chained journal. Capture prompt+reasoning+tool IO+policy version+timestamps → deterministic replay. SR 26-2 + EU AI Act Art 12 (attribute). Key custody: non-repudiation if runtime compromised is the open hard problem. Cross-link S3 (identity in the signature) + S6 (why-trail as receipt contents).

**`<pre>` blocks:** one `<pre class="trace">` a hash-chained receipt journal (~15 lines JSON).

**Xrefs (pre-existing + committed):** `/deep-dives/agent-security/agent-identity-and-attestation` (S3), `/deep-dives/agent-security/structured-refusal-and-why-trails` (S6), `/operations/governance-compliance/audit-trails` (verify group key with grep — audit-trails is in operations; confirm exact group), `/operations/safety-and-security/agentic-threat-model`.

**Commit:** `"Agent Security: S8 decision-receipts-and-audit"`.

---

## Task 9: Within-group forward-link restoration + audit

After S8 commits, several within-group cross-links were prose-demoted (S1→S4/S7, S2→S6/S8, S3→S8, S4→S7). Restore the highest-value ones as `.xref` links now that all targets exist.

- [ ] For each essay S1-S8, add the within-group xrefs that were demoted, at the natural prose position, both locales, balanced count.
- [ ] Highest-value restorations: S1→S4 (defense↔attack), S1→S7 (single-model-fail↔incident), S2→S6 (reason field↔why-trail), S2→S8 (reason↔receipt), S3→S8 (identity↔receipt), S4→S7 (poisoning↔supply-chain).
- [ ] Balance check per file: `grep -c 'class="xref"' en == zh`.
- [ ] `npm run build && npm run verify && npm test` — all pass.
- [ ] Commit: `"Agent Security: restore within-group cross-links"`.

---

## Task 10: Xref back-pass from existing pages

Add one `.xref` per pair into existing security-adjacent pages, both locales, first natural mention, balanced.

- [ ] `/deep-dives/mcp/mcp-security-anti-patterns` → S1 and/or S7.
- [ ] `/deep-dives/mcp/mcp-tool-poisoning` → S4.
- [ ] `/deep-dives/memory-and-context/memory-poisoning-defenses` → S4.
- [ ] `/operations/safety-and-security/prompt-injection` → S1.
- [ ] `/operations/safety-and-security/agentic-threat-model` → S2 and/or S4.
- [ ] `/operations/safety-and-security/guardrails` → S6.
- [ ] `/operations/safety-and-security/scoped-credentials-for-agents` → S3.
- [ ] `/concepts/prompt-injection-101` → S1.
- [ ] `/concepts/agentic-risks-intro` → S4.
- [ ] Skip any file with no natural mention (report it). Balance en↔zh per file.
- [ ] Verify all 8 new slugs registered: `for s in prompt-injection-defense-2026 policy-as-code-for-agents agent-identity-and-attestation red-teaming-agents sandbox-and-isolation-patterns structured-refusal-and-why-trails agent-supply-chain-security decision-receipts-and-audit; do grep -q "slug: '$s'" src/content/deep-dives/groups/agent-security.ts || echo "MISSING $s"; done`.
- [ ] `npm run build && npm run verify && npm test` — all pass.
- [ ] Commit: `"Agent Security: xref back-pass from existing security pages"`.

---

## Task 11: Changelog

- [ ] Create `src/content/changelog/entries/<MERGE-DATE>-agent-security-group.ts` (date == merge day == filename prefix). Bilingual `title` + `items[]`: (1) new group + 8 essays; (2) the cohesion thesis (consolidates fragmented security material); (3) xref back-pass into ~9 existing pages.
- [ ] Verify filename ↔ `date:` match. Run all three gates. Commit `"Changelog: entry for Agent Security group"`.

---

## Task 12: Final verification + PR

- [ ] `npm run build` (no new warnings), `npm run verify`, `npm test` — all green.
- [ ] Grep new content for `TODO`/`TBD` — empty.
- [ ] Hook-lede audit: each of 8 en fragments — no banned openers, stakes first.
- [ ] `<pre>` byte-identical audit across all 8 (SHA-hash en vs zh).
- [ ] Xref balance en↔zh across all 8.
- [ ] `[unverified]` audit: grep the 8 essays for the dropped stats ("88%", "<0.1ms", "21%") — confirm none printed.
- [ ] A2A `#1672` audit: confirm no essay calls it a ratified spec (grep "spec"/"standard" near "1672").
- [ ] Changelog date == today.
- [ ] Push `feature/agent-security-group`; open PR with the contents table + slate-completion note + test-plan checklist.
- [ ] Poll CI; squash-merge on green; delete branch; sync main; remove worktree; verify live.

---

## Notes for the executor

- Work in `.worktrees/agent-security/`. Never edit main. Serial only.
- Research file is source-of-record for facts. Dropped `[unverified]` claims stay dropped.
- If a factual claim can't be verified during drafting, drop it and flag in the commit message — do not paper over.
- Reference essay for voice/markup: `deep-dives/en/mcp-security-anti-patterns.html`.
