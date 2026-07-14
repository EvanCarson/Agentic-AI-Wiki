# Research: Agent Security landscape (2026-07)

> Grounding for the 8-essay `agent-security` Deep-Dive group. Not shipped; kept so
> essay factual claims are traceable. Source tier in parentheses: (official) /
> (vendor) / (academic) / (news).

## Verification verdicts (read first)

- **Gemini CLI "TrustIssues" incident — CONFIRMED, precise.** Prompt injection in a
  public GitHub issue chained with a `--yolo` tool-allowlist bypass →
  env-var/git-token exfiltration. **CVSS 10, GHSA-wpqr-6v78-jr5g.** Fixed in Gemini
  CLI 0.39.1 / 0.40.0-preview.3 and run-gemini-cli action 0.1.22. Timeline: reported
  Apr 16, PoC Apr 20, advisory Apr 24, 2026. Corroborated by The Register, The Hacker
  News, SecurityWeek. Safe to print. This is the canonical incident for S1 (cite) and
  S7 (own).
- **mcp-server-git chained CVEs (CVE-2025-68143 / 68144 / 68145)** — sourced from ONE
  vendor blog (Sigil). **Verify against NVD at draft time; if unconfirmed, describe
  the chained-CVE→RCE pattern without printing exact CVE numbers.**
- **AgentPoison figures** — real attack line, but exact 2026 numbers not independently
  pulled. **Cite the primary AgentPoison paper or describe qualitatively; do not
  invent an ASR.**
- **A2A #1672 (`verifiedIdentity`)** — OPEN issue, no PR, no labels. The "AgentID /
  ECDSA P-256" mechanism traces to third-party **getagentid.dev**, NOT an
  A2A-adopted standard. Present as an open proposal, never as a ratified spec.

## `[unverified]` — DROP these, do not hedge-and-print

- "88% of enterprises had AI-agent security incidents / 21% had runtime visibility /
  33% had no audit trail" — vendor blog, no methodology.
- OPA "<0.1ms p99" — contradicts official docs (CLI ~50-200 ms; remote server
  sub-ms). Use the official figures.
- "LLM-as-Critic improved precision by 21%" — no published data.
- "every prompt-injection control documented in 2025-2026 has been bypassed in
  isolation" — rhetorical, unsourced.

---

## S1 — prompt-injection-defense-2026

- OpenAI officially frames prompt injection as an unsolved "frontier security
  challenge" — no model-level fix fully prevents it; recommends defense-in-depth +
  an **instruction hierarchy** (system > developer > user > tool). (official)
  https://openai.com/index/prompt-injections/ ,
  https://openai.com/index/instruction-hierarchy-challenge/
- OpenAI published **IH-Challenge** (training dataset to harden instruction-hierarchy
  robustness, March 2026) + a prompt-injection defense guide (April 2026). (official)
- **Gemini CLI TrustIssues** = proof single-model defenses fail (see verdict above).
  (vendor/news)
- Layer counts ("12-layer", "5-layer") are **vendor** framings, not standards. Use as
  "one vendor's taxonomy," attributed.
- Highest-leverage single layer per multiple sources: **constraining output to a typed
  schema** (structured outputs). Cross-link S2, S6.
- Open Qs: which layers are load-bearing vs theater once policy-as-code gating exists?
  How do you test the instruction hierarchy holds under **tool-output** injection (not
  just user-message injection)?

## S2 — policy-as-code-for-agents

- **AWS Cedar inside Amazon Bedrock AgentCore** intercepts every agent tool call at the
  gateway; policies in Cedar or generated from natural language (March 2026). (vendor)
- **Microsoft Agent Governance Toolkit (AGT)** — MIT-licensed, public preview April
  2026; supports YAML / OPA Rego / Cedar; evaluates tool calls, message sends,
  delegations. (official) https://github.com/microsoft/agent-governance-toolkit
- AGT returns a structured `PolicyDecision`: `allowed` (bool), `matched_rule`,
  `action` (allow/deny/audit/block), `reason` (human-readable), `audit_entry` (policy,
  rule, timestamp, context). Structured refusal reasons are already the norm. (official)
- Latency (correct the marketing): OPA **CLI ~50-200 ms** subprocess overhead; **remote
  OPA server sub-ms**; Cedar `cedarpy` fastest. (official)
- Dominant architecture: **OPA-as-sidecar fronting the tool gateway** — gateway calls
  the PDP before invoking the tool. (vendor)
- **S2 owns the policy mechanism + structured `reason` field.** S6 owns the UX/forensic
  argument; S8 owns signing/storage.
- Open Qs: where does the PDP live (gateway / MCP proxy / SDK middleware) and
  failure-open vs failure-closed default? OPA (Rego expressiveness) vs Cedar
  (verifiability/analysis) for agent workloads?

## S3 — agent-identity-and-attestation

- **A2A #1672** proposes optional `verifiedIdentity` on Agent Cards — OPEN, no PR (see
  verdict; present as proposal). (official) https://github.com/a2aproject/A2A/issues/1672
- **A2A Discussion #1677 — OATR (Open Agent Trust Registry)**: Ed25519-signed JWTs
  (`typ: agent-attestation+jwt`), JCS-canonical JSON (RFC 8785), binds card fingerprint
  + agent instance id + request hash for replay protection. Runtime authorization vs
  #1672's static card authenticity. Ships "rejection reason codes" v1.2.0 (Mar 29 2026).
  (official) https://github.com/a2aproject/A2A/discussions/1677
- **Visa Trusted Agent Protocol** — **RFC 9421 HTTP Message Signatures**, locks each
  request to a merchant site+page, with timestamp/session-id/key-id for single-use
  replay protection. 10+ launch partners; Akamai joined 2026. (vendor/official)
  https://github.com/visa/trusted-agent-protocol
- **W3C DID/VC**: academic proposal (arXiv 2511.02841) gives each agent a ledger-anchored
  W3C DID + third-party-issued VCs for cross-domain trust without a central IdP. A W3C
  **Agent Identity** Community Group exists. Google AP2 uses W3C VCs for auditable user
  consent. (academic/official) https://arxiv.org/abs/2511.02841 ,
  https://www.w3.org/community/agent-identity/
- Three complementary layers answer "which agent is calling me": **card signing** (#1672,
  static authenticity), **runtime attestation** (OATR, per-request), **VC presentation**
  (cross-domain trust). S3 owns this taxonomy; S8 owns the signing/storage of receipts.
- Open Qs: are the three layers complementary or competing? Minimum viable identity for
  an internal agent vs a cross-org commerce agent?

## S4 — red-teaming-agents

- **MCPTox** (arXiv 2508.14925, AAAI 2026): **45 live MCP servers, 353 authentic tools,
  1,312 malicious cases across 10 risk categories, 20 LLM agents.** (academic)
  https://arxiv.org/html/2508.14925v1
- **Overall average ASR 36.5%**; o1-mini **72.8%**, DeepSeek-R1 **70.9%**, Phi-4
  **70.2%**, GPT-4o-mini **61.8%**. (academic)
- **Inverse scaling**: more capable / better instruction-following models are *more*
  susceptible; enabling Qwen3 reasoning raised ASR **+27.8%**; Claude-3.7-Sonnet refused
  poisoned calls **<3%** of the time (safety alignment does not catch tool poisoning).
  (academic)
- Three attack paradigms = ready methodology: explicit-trigger function hijacking (224),
  implicit-trigger function hijacking (548), implicit-trigger parameter tampering (725).
- **AgentPoison** — cite primary paper / describe qualitatively (verdict above).
- **S4 owns the attack/benchmark**; S7 owns the supply-chain framing of MCP poisoning.
- Open Qs: how do you build a repeatable red-team harness (fixture MCP servers, seeded
  poisons) vs one-off manual attacks? What ASR is "ship-blocking" per deployment tier?

## S5 — sandbox-and-isolation-patterns

- Isolation tiers: **containers (Docker/runc)** share host kernel, <1s startup,
  kernel-exploit exposure; **microVMs (Firecracker/E2B)** separate kernel, **<150 ms**
  startup, immune to kernel escapes; **gVisor** = container-speed startup + userspace
  syscall interception. (vendor) https://northflank.com/blog/how-to-sandbox-ai-agents ,
  https://amux.io/guides/ai-agent-sandboxing/
- 2026 consensus: **shared-kernel containers no longer sufficient** for untrusted
  agent/LLM-generated code — treat generated code as hostile; default to microVMs, relax
  to gVisor/containers only when the threat model allows. (vendor — attribute)
- Framing: "sandboxing confines the blast radius; defense-in-depth closes the loop."
- Open Qs: where does computer-use/browser isolation change the calculus (screen +
  network egress, not just code exec)? When is remote-only tool execution the right
  default?

## S6 — structured-refusal-and-why-trails  (THIN — keep scope tight)

- Weakest as a standalone; most evidence is embedded in S2 and S8. Keep, but scope
  tightly to: **(a) the enumerated refusal-reason taxonomy, (b) the why-trail vs log
  distinction.** Defer signing to S8, policy mechanism to S2 — cross-link both.
- Concrete grounding: AGT `PolicyDecision.reason` + `audit_entry` = working structured
  (non-prose) refusal. (official) OATR ships enumerated **rejection reason codes**
  v1.2.0. (official)
- Framing worth quoting: "Logs support forensics; why-trails support accountability
  under examination." (vendor — attribute)
- Open Qs: minimum enumerated refusal-reason taxonomy useful to both an end user and a
  forensic investigator? How do you keep why-trails from leaking sensitive reasoning
  while staying auditable?

## S7 — agent-supply-chain-security

- **Gemini CLI TrustIssues** = canonical warning (own the full writeup here; see verdict).
  101k-star repo, `--yolo` bypass, env/git-token exfil (`cat /proc/$PPID/environ`,
  `.git/config`). ≥8 other Google repos vulnerable. (vendor/news)
- **mcp-server-git chained CVEs** (path-validation bypass + unrestricted FS via
  git_init + argument injection via git_diff → RCE), Jan 2026 — NVD-verify or describe
  without pinning numbers (verdict). (vendor)
- Scale (attribute carefully): ~**8% of ~18,000 MCP repos** showed intentional-malice
  signs; **~36.7% of 7,000+ public MCP servers** had SSRF exposure; separate analysis of
  1,800+ servers found **>30% with an exploitable vuln** (82% path-traversal-prone file
  ops, 67% code-injection APIs, 34% command-injection APIs). **Azure MCP Server** shipped
  without auth → CVSS 9.1 (Apr 2026). (vendor)
- Practice: pin MCP package versions, add agent-config paths to code review, block MCP
  auto-approval, treat every MCP server like a production dependency. (vendor)
- Open Qs: concrete "vet before install" checklist for an MCP server? How do you monitor
  an approved server for a poisoned update (the npm-update attack)?

## S8 — decision-receipts-and-audit

- **Signed action envelopes** per tool call/artifact, stored in a **hash-chained local
  journal** — the concrete decision-receipt pattern. (vendor)
  https://zylos.ai/research/2026-04-25-agent-identity-provenance-signed-audit-trails/
- Tamper-evident logs: cryptographic signature seals each entry at creation; each agent
  holds a key-bound verifiable identity so any message verifies against its public key.
  (vendor)
- Regulatory drivers (real): **SR 26-2** (OCC/Fed/FDIC, April 2026, replaces SR 11-7);
  **EU AI Act Article 12 / Reg (EU) 2024/1689** automatic event-recording, high-risk
  obligations landing **August 2026**. (vendor)
- Forensic-grade record captures: initial prompt, reasoning chain, every tool call
  (inputs/outputs), **policy version**, human overrides, precise timestamps — and
  supports **deterministic replay**. (vendor)
- **S8 owns signing/storage/replay.** S3 references it for identity; S6 references it for
  the why-trail contents.
- Open Qs: what to sign and hash-chain (per-call vs per-session) to enable replay without
  exploding storage? Who holds the signing key; how do you prove non-repudiation if the
  runtime itself is compromised?

---

## Cross-cutting ownership (prevents overlap)

- **Gemini CLI incident** → S7 owns the writeup; S1 cites + links.
- **Structured refusal / `PolicyDecision.reason`** → S2 owns mechanism; S6 owns
  UX/forensic; S8 owns signing/storage.
- **Signed envelopes / hash-chained journals** → S8 home; S3 + S6 reference.
- **Instruction hierarchy** (S1) underpins S4's tool-output-injection red-team surface.
- **MCP tool poisoning (MCPTox)** → S4 owns attack/benchmark; S7 owns supply-chain framing.

## Source URLs

Official: openai.com/index/prompt-injections, openai.com/index/instruction-hierarchy-challenge,
github.com/microsoft/agent-governance-toolkit,
microsoft.github.io/agent-governance-toolkit/tutorials/08-opa-rego-cedar-policies,
github.com/a2aproject/A2A/issues/1672, github.com/a2aproject/A2A/discussions/1677,
github.com/visa/trusted-agent-protocol, w3.org/community/agent-identity.
Academic: arxiv.org/abs/2511.02841, arxiv.org/html/2508.14925v1 (MCPTox).
Vendor: pillar.security (Gemini CLI), sigilsec.ai (supply-chain state), natoma.ai,
tianpan.co, northflank.com, amux.io, firecrawl.dev, workos.com, zylos.ai, truescreen.io,
deepinspect.ai, mightybot.ai, digitalapplied.com, tokenmix.ai, flowtivity.ai,
corporate.visa.com.
News: theregister.com, thehackernews.com, securityweek.com (Gemini CLI CVSS-10).
