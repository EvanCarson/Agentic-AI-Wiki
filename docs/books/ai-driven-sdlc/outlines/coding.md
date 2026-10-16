# Outline — Ch 6 Coding (`coding`, ~4,000 words)

**Argument (bible §2):** preparation matters more than the model; a repo becomes agent-ready through its environment, a minimal human-written instruction file and checks the agent can run; task type, not size, decides what moves from L2 to L3.

**Lede:** In dotnet/runtime the same coding agent went from 38.1% to 69% success without a model change: firewall rules, an instruction file, a build that worked. Preparation matters more than the model. Make the repo agent-ready (environment, a short human-written instruction file, checks the agent can run), then let task type, not size, decide what leaves per-diff review.

## 6.1 What changes (`#what-changes`)
- Unit of work moves from keystroke (L1) to complete PR (L2+); author becomes reviewer — refer back to the-bottleneck-moves#deciding-and-verifying, don't repeat.
- L1 speed range lives in economics#the-range; not re-argued here.
- The coding phase's job becomes making output cheap to verify. "Give Claude a check it can run… session you watch and one you walk away from" (RR-22, https://code.claude.com/docs/en/best-practices, vendor guidance).
- Rule 6 heuristic (the-maturity-model#rule-coding-gap): coding at most one level above review/testing.
- Adoption context: 14.1% use agents daily, 37.9% don't plan to (RR-34, https://survey.stackoverflow.co/2025/ai, survey 2025).

## 6.2 The ladder for coding (`#ladder`) — grid consistent with Ch 2 #grid-coding
- L0: Gentoo/QEMU policy (OG-40/42). L0 is a legitimate choice.
- L1: range only; link economics.
- L2: dotnet 67.9% vs 87.1%; 86.2% vs 55.1% with human commits (GM-R7, RR-26). Watanabe 567 PRs/157 projects, 83.8% merged, 54.9% unmodified, mostly refactoring/docs/tests (RR-27, https://arxiv.org/abs/2509.14745, T1).
- L3: Stripe (case); Copilot cloud agent envelope (SB-19, docs); Faros 13–14% (GP-R9, T3); Answer.AI 3/20 (GM-R8) link case-studies#case-answer-ai-devin.
- L4: none for LLMs; Spotify FM = L0 for AI (GM-R9); de facto L4 failures Replit, PocketOS.

## 6.3 The case: Stripe Minions (`#the-case`)
- https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents (Alistair Gray, 9 Feb 2026), re-read at primary: >1,000 merged PRs/week "completely minion-produced"; "while they're human-reviewed, they contain no human-written code"; devboxes pre-warmed ~10 s, "isolated from production resources and the internet" so no permission checks needed; same rule files as Cursor/Claude Code; Toolshed MCP 400+ tools; local lint <5 s; >3M tests; "at most two rounds of CI"; triggered from Slack, CLI, web, flaky-test tickets.
- Measured by Stripe, own blog · volume only · T3. Level: L3 by design, every PR human-reviewed (banned move 12).
- What it doesn't show: success/failure, revert, review time, share of all PRs.
- Contrast: Answer.AI (no scoping) and dotnet (preparation) → links to case-studies anchors.

## 6.4 Migration steps (`#migration-steps`)
- L0→L1: stance first (Ch 2 enablers).
- L1→L2: (1) fix the environment (dotnet firewall, build steps); (2) minimal human-written instruction file — ETH https://arxiv.org/abs/2602.11988 (no general gain, +20% cost, useful for non-standard practices), Lulla https://arxiv.org/abs/2601.20404 (−28.64% runtime, −16.58% output tokens), AAIF https://aaif.io/blog/measuring-agents-md-what-five-runs-show-that-one-doesn-t (5 runs vs 1), Anthropic include/exclude, GitHub 2,500 files https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/ (six areas; Always/Ask first/Never); (3) attribute; (4) pick named task types; GitHub don't-assign list https://docs.github.com/en/copilot/tutorials/coding-agent/get-the-best-results; (5) track per-type success.
- L2→L3: check it can run, gated deterministically (Stop hook); sandbox fs+network (SB-15 https://www.anthropic.com/engineering/claude-code-sandboxing; SB-17); own branch, cannot merge/approve, workflows held (SB-19); choose task type by data; routing written down; 90-day baseline.
- Worked example (pre): dotnet type spread vs size spread — type 84.7→54.5 (30.2 pts); size 76–80 → 64 → 72 (≈16 pts); largest PRs rebound because mechanical. Illustrative promotion list.
- L3→L4: no LLM evidence; criteria from Ch 2 only.

## 6.5 Guardrails (`#guardrails`)
- Permission mode = level (Rule 2). Claude Code bypassPermissions "Only use this mode in isolated environments…", managed-settings disable, Bash rules not a boundary (SB-18 https://code.claude.com/docs/en/permissions); Codex network off, --yolo "not recommended" (SB-17 https://developers.openai.com/codex/agent-approvals-security). 93% approvals, 17% classifier miss (SB-16 https://www.anthropic.com/engineering/claude-code-auto-mode).
- Hooks for mandatory rules ("advisory" vs "deterministic").
- Oracle out of reach: link #oracle-principle.
- Link security chapter root.

## 6.6 Metrics (`#metrics`)
- Per task type: success rate (merged/(merged+closed)); unmodified-merge share; human co-commit share; review comments per PR (16.5 vs 12.4); reverts vs baseline; CI rounds per PR; cost per merged change (economics#what-it-costs). Five runs, not one. Never % code by AI. Thoughtworks "first-pass acceptance rate" (GM-N1, opinion).

## 6.7 Anti-patterns (`#anti-patterns`)
- Auto-approve on a workstation: Gemini CLI #4586 (FR-C2), Claude Code #10077 (FR-C3), Antigravity Turbo (FR-C4, TechRadar secondary) — all T4.
- Over-specified/generated instruction file (Radar "agent instruction bloat", GM-N1).
- Autonomy without scoping (Answer.AI).
- Judging the model before preparing the repo.
- Single-run evaluations.
- Coding outrunning review (Rule 6) → code-review.

## What to do
1. Fix the agent's environment before judging any model. 2. Write a short human-written instruction file; move mandatory rules into hooks. 3. Name task types, attribute agent PRs, track success per type. 4. Give every task a check the agent can run and cannot edit. 5. Turn off bypass/auto-approve via managed settings outside a sandbox. 6. Entry to L3: one task type with a non-editable verifier, a sandbox with no prod creds, own-branch-only, written routing, 90-day comparison with human baseline.
