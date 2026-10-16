# Ch 9 outline: CI/CD & Release (`ci-cd-and-release`, ~3,000 words)

**Argument (bible §2):** CI auto-fix is a solid L2 today; whether AI speed turns into instability depends on batch size, rollback capability and treating the agent toolchain in CI as a privileged, attackable dependency.

**Lede:** CI auto-fix is the most mature agent job in delivery, and it is L2: an agent pushes the fix, a human merges. What decides whether it pays is not the model but three things around it: how big the batches are, whether you can roll back, and what the agent's CI token can reach. Elastic's agent kept a build green by deleting the upgrade it was meant to fix, and one bad workflow token put a wiper prompt into a shipped AI extension.

## 9.1 What changes (`#what-changes`)
- Upstream agents send more, larger changes into the pipeline: DORA 2025 p. 57 "harder to review larger batches"; "rollback reliance does not directly reduce instability" (BN-12, GP-R3 row 4; dora.dev 2025). Link back to `the-bottleneck-moves#deciding-and-verifying`, don't repeat it.
- The pipeline becomes the verifier for every upstream agent: Stripe Minions ≤2 CI rounds (RR-28, stripe.dev; Ch 6 anchors it); oracle principle (`the-maturity-model#oracle-principle`).
- The agent moves into the pipeline and holds its tokens: PromptPwnd (SB-14) preview.
- Release gating already had ML (Harness CV, TM-19): classical ML, not LLM.

## 9.2 The ladder (`#the-ladder`) — threat-grid, criteria = Ch 2 `#grid-cicd`
- L0: SO 2025 75.8% "don't plan" (BN-32).
- L1: DIDACT RCT (TM-16) → link `case-studies#case-google-didact`.
- L2: Elastic (TM-17), GitHub Fix with Copilot (TM-15, changelog 2026-05-18), Nx ~60% accepted (TM-18, vendor box).
- L3: Nx docs auto-apply conditions (verified + glob + "highly confident"; fetched Oct 2026); Copilot cloud agent workflows held until review (SB-19); risk PromptPwnd (SB-14). No outcome evidence.
- L4: none for LLMs; Harness CV "automatically triggers a rollback" (TM-19); Kiro anti-pattern (GM-R5).
- Rule 2 paragraph: a publish/deploy token makes it L4 for that token.

## 9.3 The case: Elastic (`#case-elastic`) — T3
- 24 broken Renovate PRs fixed, 22 commits 22 Jul–22 Aug 2025, 45% of deps, "saved 20 days"; guardrails verbatim; "removing the version bump". Measured-by line. What it doesn't show. Worked example: score it on the ladder (L2 for dependency-bump repair; what L3 would need — an intent check outside the agent, the book's proposal).

## 9.4 Migration steps (`#migration-steps`) — per climb L0→L1→L2→L3, L4 = not yet. Zalando risk tiers from incident data (GF-27) as the routing precedent.
## 9.5 Guardrails (`#guardrails`) — PromptPwnd mitigations (4 verbatim); Amazon Q CVE-2025-8217 (SB-R6); Nx s1ngularity root cause (SB-R7); Copilot envelope (SB-19); link Ch 12 for detail; slopsquatting → back-link Ch 4 `#what-it-risks`.
## 9.6 Metrics (`#metrics`) — acceptance ≠ correctness (TM contradiction); DIDACT template; pairs: fix merge rate × 14-day revert rate; intent violations; batch size (DORA's three indicators); change failure rate. Thoughtworks "DORA metrics" Adopt quote (GM-N2). Tricorder-style trigger → name Ch 17 in prose.
## 9.7 Anti-patterns (`#anti-patterns`) — green build as proof; inherited auto-merge; untrusted triggers with secrets (`allowed_non_write_users: "*"`); long-lived publish tokens; acceptance as success; LLM release gate without verification record; over-broad role (Kiro).

## What to do (next-level entry criterion included)
- Start at L2 for one task class (broken dependency bumps / lint) with auto-merge forced off and an allow-list.
- Put intent checks outside the agent (no downgrades, no deleted tests, no workflow edits).
- Remove publish/deploy tokens from any job an agent runs in; untrusted text never in a prompt with secrets.
- Cap batch size; exercise rollback before climbing.
- Measure revert rate of AI-landed fixes, not acceptance.
- Entry to L3: 90 days of revert data vs a human baseline, verifier the agent can't edit, pause exercised.
- L4 release decisions: leave to classical verification against baselines; no LLM evidence.
