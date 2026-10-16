# Ch 11 outline — Maintenance & Migrations (`maintenance-and-migrations`)

**Argument (bible §2):** maintenance is where L3 is reachable first, because the compiler and test suite are a ready-made verifier; the winning pattern is deterministic tooling plus an LLM for the tail, with review capacity as the throttle.

**Lede:** Maintenance is the one phase where L3 is within reach now, because a compiler and a test suite already decide what "done" means. Airbnb moved ~3,500 test files in six weeks against a 1.5-year estimate (TM-34). What made it work was not the model: deterministic tooling first, an LLM for the tail, and review capacity, not generation, setting the pace.

## 11.1 What changes (`#what-changes`)
- Deterministic tooling's ceiling: Spotify Maven updater "over 20,000 lines"; "most of the automated changes we could implement were simple ones" (TM-36; Honk Part 1 https://engineering.atspotify.com/2025/11/spotifys-background-coding-agent-part-1). Fleet Management ~half of PRs since mid-2024 (GM-R9).
- Scripts moved 70% of the fleet "from nearly a year to under a week"; "the remaining 30% proved extremely difficult" (TM-38, InfoQ secondary https://www.infoq.com/news/2026/03/spotify-honk-rewrite).
- Prompting alone fails: Google "not sufficient for anything but the simplest" (TM-33 https://arxiv.org/abs/2501.06972); Slack LLM-alone "significant variation and inconsistency" (TM-35).
- Verifier pre-exists (compiler, tests, lint, type check) → oracle principle satisfiable (Ch 2 #oracle-principle).
- Constraint moves to review: Google throttled CLs (TM-33); Spotify "PR review, not code generation, the new bottleneck" (InfoQ); +76% PRs to review (GM-R9). Link Ch 1 #phase-level-evidence, Ch 3 #case-google-migrations.

## 11.2 The ladder (`#ladder`) — grid identical in criteria to Ch 2 #grid-maintenance
- L0 Fleet Management (T3 · GM-R9); L1 no dedicated case; L2 Google int32/JUnit (T2 · TM-32), Slack (T3 · TM-35), Elastic (T3 · TM-17 https://www.elastic.co/search-labs/blog/ci-pipelines-claude-ai-agent); L3 Honk (T3 · GM-R9), Airbnb (T3 · TM-34), Google year-long 39 migrations (T2 · LC-10 https://arxiv.org/abs/2504.09691), Amazon Java 17 (T4 · GM-R6); L4 no LLM evidence.
- Boundary notes: deterministic = L0 for AI; L2→L3 is about what the human reviews; Google is "L2 moving to L3"; Honk L3 on design evidence, no 90-day defect comparison public.
- Risk ceiling: schema/data migrations irreversible → agent prepares, human executes (SB-25; Anthropic "attempting migrations against a production database", SB-16).

## 11.3 The case: Airbnb Enzyme → RTL (`#case-airbnb`) + Slack contrast (`#slack-contrast`)
- Airbnb (https://airbnb.tech/?p=366): step pipeline (refactor, fix Jest, fix lint and tsc, mark complete); 75% in 4 hours; "sample, tune, sweep" to 97% in 4 days; retries 50–100; 40k–100k-token prompts, up to 50 related files; "brute force"; remainder manual; 6 weeks vs 1.5-year estimate. Measured by: Airbnb engineers · T3. Doesn't show: coverage equivalence, cost, review mode.
- Slack (https://slack.engineering/balancing-old-tricks-with-new-feats-ai-powered-conversion-from-enzyme-to-react-testing-library-at-slack/): AST 45%; AST+LLM 80% on 9 files; adoption ~64%; 22% dev time saved. T3, n=9. Lesson: migration numbers don't transfer (AG §5.9).

## 11.4 Migration steps (`#migration-steps`)
- Per climb: L0→L1, L1→L2 (verifiers first, attribution, auto-merge off, deterministic downgrade check), L2→L3 (verifier out of reach, sandbox, small toolset, retry budget, owner-reviewed evidence, throttle, 90-day comparison, fill missing tests first — Spotify Part 4), L3→L4 (no evidence; Ch 2 criteria; book's proposal).
- **Worked example (illustrative arithmetic):** review-throttled migration — generation in days, review in weeks; batch size trade-off (DORA "harder to review larger batches", Ch 1).

## 11.5 Guardrails (`#guardrails`)
- Oracle out of reach; Spotify shortcuts (InfoQ), Elastic bump removal; diff checks for deleted tests/downgrades (book's proposal).
- LLM judge = tunable gate with false-positive cost (Part 3 quarter veto; InfoQ removal).
- Sandbox, authority in infrastructure; link Ch 12 root.
- "passes CI but is functionally incorrect" (Part 3) → verifier strength is the ceiling; link testing chapter.

## 11.6 Metrics (`#metrics`)
- Flow: landed changes/week, review wait per agent PR, elapsed vs comparable migration.
- Stability: revert rate vs human (dotnet 0.6% vs 0.8% only public comparison, Ch 3 #case-dotnet-runtime), escaped defects 90 days, verifier rejection rate, manual-tail share.
- Not: % AI-authored edits; developer-years saved → vendor box Amazon (T4), link Ch 4 #counterfactuals.

## 11.7 Anti-patterns (`#anti-patterns`)
- Prompting alone; determinism alone; agent reaching the oracle; generating faster than review; importing another firm's number; calling deterministic automation "AI autonomy"; treating data migrations like code migrations.

## What to do
- Inventory deterministic tooling; pick one recurring migration class with a verifier; write verifiers before prompts; auto-merge off + attribution; budget review before generation; measure reverts/escaped defects 90 days; entry criterion for L3 named. Name The 90-Day Pilot (Part III) in prose — maintenance as first pilot.
