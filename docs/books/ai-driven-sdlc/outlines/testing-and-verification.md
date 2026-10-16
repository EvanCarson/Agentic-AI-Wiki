# Ch 8 outline — Testing & Verification (`testing-and-verification`, ~3,000 words)

**Argument (bible §2):** AI test generation works when a deterministic filter, not the model, is the oracle and the agent cannot edit it; measure mutation score and escaped defects, not acceptance or coverage.

**Lede:** A test suite an agent can edit is not a verifier; it is a suggestion. Testing is the phase every other level in this book leans on, so it is where the oracle principle has to hold first: let a deterministic filter decide what counts as a passing test, keep it out of the agent's reach, and score the result by mutation score and escaped defects, never by how many tests engineers accepted.

Part I already carries TestGen-LLM/ACH (case-studies#case-meta-testgen) and METR/ImpossibleBench (the-maturity-model#oracle-principle): refer back, do not repeat.

## 8.1 What changes (`what-changes`)
- Testing stops being the place where humans write checks and becomes the place where humans decide what a check is. Meta: reviewers "valued being able to focus on evaluating tests rather than having to construct them" (TM-4; https://engineering.fb.com/2025/09/30/security/llms-are-the-key-to-mutation-testing-and-better-compliance/).
- Two jobs, two failure modes: generating tests (yield problem) vs using tests as the gate for other AI work (gaming problem). Recall TestGen 25%→73% (TM-1; back-link Ch 3) and METR/ImpossibleBench (TM-12/13; back-link Ch 2).
- Test writing is a task type agents already do: dotnet testing PRs 75.6% merged (GM-R7) — merged ≠ good tests.
- Vendor opinion: verification tools lag creation (SmartBear, MM-25; https://smartbear.com/blog/levels-of-autonomy-in-software-development-closing-the-gap-between-creation-and-confidence/).

## 8.2 The ladder for this phase (`ladder`) — threat-grid, same criteria as Ch 2 #grid-testing
- L0 none direct; L1 Auto-Diagnose 90.14% n=71, 52,635 tests, 5.8% "Not helpful" (TM-8; https://arxiv.org/abs/2604.12108); L2 TestGen/ACH (back-link), FlakyGuard 47.6%/51.8% (TM-7; https://arxiv.org/abs/2511.14002; Uber attribution secondary); L3 JiT (TM-5), Airbnb test-file migration (TM-34, back to maintenance), gap Spotify Part 4 (GM-R9); L4 none.
- Per-task-type scoring sentence (Rule 3).

## 8.3 The case: Meta's just-in-time catching tests (`the-case`)
- TM-5; https://arxiv.org/abs/2601.22832 (30 Jan 2026). Catching vs hardening definitions; 22,126 → 41 → 8 → 4; assessors −70%; diff-aware 4x; "relating directly to the Oracle Problem"; catching tests cannot land.
- **Worked example:** the precision funnel (8/41 ≈ 20%; 4/41 ≈ 10%) + illustrative arithmetic on triage minutes (no org named).
- What it does not show.

## 8.4 Migration steps (`migration-steps`)
- L0→L1: diagnosis surfaced in review, accuracy check on a sample (Auto-Diagnose pattern).
- L1→L2: filtered generation (build, repeated pass, coverage or mutant kill); attribution; record acceptance AND mutation score.
- L2→L3: oracle out of reach; humans review mutation/coverage report (Merge-Readiness Pack, MM-6, https://arxiv.org/html/2509.06216v2); 90-day escaped-defect baseline; assessor layer.
- L3→L4: flaky quarantine under audited false-fix rate — no evidence; book's proposal only.

## 8.5 Guardrails (`guardrails`)
- Oracle outside the agent: Honk verifiers in stop hook, "the PR isn't opened" (GM-R9; Part 3 URL); instruction-only bans fail (Elastic, back-link Ch 2).
- Deterministic preprocessing around LLM judgement: equivalent-mutant detector 0.79/0.47 → 0.95/0.96 (TM-3).
- Book's proposal: protect test/CI paths; route diffs that delete/skip tests to a human. Link security chapter.

## 8.6 Metrics (`metrics`)
- Coverage weak: 100% line+branch, 4% mutation score (TM-6; https://arxiv.org/abs/2506.02954). Acceptance ≠ correctness. DIDACT as template for downstream safety (back-link case-studies#case-google-didact).
- Pair: mutation score + escaped defects; precision of catches; false-fix rate; oracle-edit count (book's proposal).

## 8.7 Anti-patterns (`anti-patterns`)
- Coverage as target; acceptance as success; same agent writes code and its tests in one session; LLM judge as oracle (Spotify judge vetoes ~25%, removal per InfoQ); no tests to verify against (Spotify Part 4); vendor benchmarks — how-not-to box Diffblue (T4).

## What to do
- Name the oracle per task type; check whether the agent can edit it.
- Filter before humans see AI tests; record raw yield.
- Report mutation score and escaped defects beside acceptance.
- Route any agent diff touching tests/CI config to a human.
- Measure precision before scaling catching tests.
- Next-level entry criterion: L3 = oracle out of reach + mutation report review + 90-day escaped-defect comparison.
