# Design: Agent Security Deep-Dive Group

**Status:** design → execution (autonomous)
**Date:** 2026-07-14

## Problem

The wiki's security material is fragmented. MCP security lives in the MCP group
(`mcp-security-anti-patterns`, `mcp-tool-poisoning`); memory security lives in
Memory & Context (`memory-poisoning-defenses`); input-side injection lives in
Concepts (`prompt-injection-101`) and Operations (`prompt-injection`,
`agentic-threat-model`, `guardrails`, `scoped-credentials-for-agents`). There is
no cohesive "how do I secure a production agent end-to-end" surface. A reader who
asks "what's my agent's security posture" has to assemble the answer from six
places.

## Goal

Ship a new Deep-Dive group `agent-security` (order 95, phase-num prefix `S`) with
8 essays that form the cohesive production-agent security surface, going beyond
the existing fragmented pages and cross-linking them rather than duplicating.

## Non-goals

- No new Concepts, Operations, Playbooks, or Field Guide pages.
- No changes to the existing security pages beyond an xref back-pass.
- No manifest schema changes.

## Group

- Key: `agent-security`
- Order: 95 (between `multi-agent-systems` 90 and `evaluating-agents` 100 —
  reads as "build the agent → secure it → evaluate it").
- Name: en `Agent Security` / zh `智能体安全`
- groupSummary (en): "Securing a production agent end-to-end — injection
  defense, policy-as-code, identity and attestation, red-teaming, isolation, and
  the audit primitives that shipped in 2026."
- groupSummary (zh): "端到端保护一台生产级智能体——注入防御、策略即代码、身份
  与鉴证、红队、隔离，以及 2026 年落地的审计原语。"
- Phase-num prefix: `S` (S1-S8).

## Essays

| # | slug | priority | size | angle |
|---|---|---|---|---|
| S1 | `prompt-injection-defense-2026` | must | L | 5-12-layer defense stacks; 2026 vendor guidance; why single-model defenses fail; a real supply-chain incident as the cautionary tale |
| S2 | `policy-as-code-for-agents` | must | L | OPA/Rego/Cedar over agent tool calls; pre-action gating; signed decision receipts; structured refusal reasons |
| S3 | `agent-identity-and-attestation` | must | M | Signed Agent Cards, Verifiable Credentials, Visa Trusted Agent Protocol; the "which agent is calling me" problem |
| S4 | `red-teaming-agents` | must | M | MCPTox, AgentPoison, structured attack methodology; running a real red team |
| S5 | `sandbox-and-isolation-patterns` | should | M | VM vs container vs remote-only tool execution; computer-use isolation; blast-radius design |
| S6 | `structured-refusal-and-why-trails` | should | M | structured refusal reasons vs prose; why-trails as forensic + UX primitive |
| S7 | `agent-supply-chain-security` | stretch | M | tool-source verification; MCP-server dependency posture; the supply-chain incident deep read |
| S8 | `decision-receipts-and-audit` | stretch | S | signed decision receipts as an audit primitive; storing and replaying for forensic reconstruction |

Total: 8 (4 must + 2 should + 2 stretch). Above the 6 floor, inside the 10 cap.

## Cross-link map

Within-group: S1↔S7 (supply chain), S2↔S6 (refusals), S2↔S8 (receipts),
S1↔S4 (defense vs attack), S3↔S8 (identity in receipts), S5↔S4 (isolation
limits what a red team can reach).

To existing pages (xref back-pass, Task 10):
- `mcp-security-anti-patterns` ↔ S1, S7
- `mcp-tool-poisoning` ↔ S1, S4
- `memory-poisoning-defenses` ↔ S4
- `prompt-injection` (operations) ↔ S1
- `agentic-threat-model` (operations) ↔ S2, S4
- `guardrails` (operations) ↔ S6
- `scoped-credentials-for-agents` (operations) ↔ S3, S5
- `prompt-injection-101` (concept) ↔ S1
- `agentic-risks-intro` (concept) ↔ S4

## Execution

Single PR. Serial subagent dispatch (all 8 essays modify `groups/agent-security.ts`).
Scaffold ships with S1 in one atomic commit (new group cannot commit with empty
`entries` — enforced by `deep-dives-manifest.test.mjs`).

Per-essay 8-step workflow: register entry → `npm test` (FAIL) → write en → write
zh → `npm test` (PASS) → `npm run verify` → `npm run build` → atomic commit.

## URL rules (from prior slates)

- Deep-dives: `/deep-dives/<group-key>/<slug>` (en), `/zh/…` (zh).
- Concepts: `/concepts/<slug>`.
- Operations: `/operations/safety-and-security/<slug>` (all security operations
  pages are in the `safety-and-security` group).
- Never forward-reference an essay not yet committed; demote to prose, restore in
  the Task 10 back-pass.

## Verification (must pass before PR + merge)

```
npm run build     # no new warnings
npm run verify    # bilingual completeness / no orphans
npm test          # manifest + changelog tests
```

Plus: hook-lede audit, `<pre>` byte-identical audit (SHA-hash), xref count
balance en↔zh per file.

## Risk / rollback

Content-only, squash-merged, one changelog entry. Revert = `git revert` the PR
commit. New-group scaffold revert would strip xref targets, so a full revert
also reverts the back-pass — noted for completeness; low likelihood.

## Grounding

Essay factual content is grounded in a dedicated 2026 research pass
(`2026-07-14-agent-security-research.md`), which verifies the supply-chain
incident specifics, framework names/versions, CVE numbers, and attack-benchmark
figures before drafting. Any claim that doesn't verify is dropped, not hedged.
