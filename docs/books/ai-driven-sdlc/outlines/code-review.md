# Ch 7 Code Review — outline (`code-review`, ~3,500 words)

**Argument (bible §2):** review is where the bottleneck lands; AI review helps only when it favours precision over recall and changes *what* humans review (risk tiers, evidence bundles), not merely how many comments appear.

**Lede:** More generated code means more code waiting for a human, and an AI reviewer that adds comments to every pull request can make that wait longer. AI review pays off when it stays quiet unless it is sure, and when it changes what a person reviews: routing low-risk changes past them and asking for evidence on the rest.

## 7.1 What changes (`#what-changes`)
- Back-ref Ch 1 queue (no repeat of figures): Faros/LinearB, Spotify "76% more PRs to review".
- Two uses of AI review: a commenter (adds work) vs a router (removes work). Industrial study 5h52m→8h20m (RR-40, back-ref Ch 3 #case-industrial-review-study).
- Reviewer confidence: Perry et al., n=47, assistant users more confident in less secure code (SB-R3, https://arxiv.org/abs/2211.03622).
- Inbound volume can exceed capacity: curl ends bug bounty Jan 2026 (FR-C27, https://www.theregister.com/2026/01/21/curl_ends_bug_bounty/).
- Author becomes reviewer (BN-20) — brief.

## 7.2 The ladder for this phase (`#ladder`)
- Grid consistent with Ch 2 `#grid-review`; deeper per-level explanation.
- L0 SO 58.7% (RR-48). L1 Google 7.5% (LC-11). L2 RovoDev, uReview, industrial study; vendor products do not approve ("It won't approve PRs — that's still a human call", RR-42, https://claude.com/blog/code-review). L3 partial: −35.6% human comments, MRP (MM-6), Amazon retail sign-off disputed (FR-C6). L4: Zalando rules, LLM not stated (GF-27).

## 7.3 The case: Atlassian RovoDev, and Zalando's router (`#case-rovodev`, `#case-zalando`)
- RovoDev (RR-39, https://arxiv.org/abs/2601.01129): 38.70% → code change; −30.8% cycle time; −35.6% human comments; one year; Atlassian authors; T2. Doesn't show: escaped defects; whether fewer human comments = less scrutiny.
- Zalando (GF-27, fetched primary): low/medium/high risk; 33% low-risk auto-approved; rules from production incidents; lead time −20–40% vs all PRs (selection effect); engineers split PRs; T3; LLM not stated.

## 7.4 Migration steps (`#migration-steps`)
- L0→L1, L1→L2 (comment-only bot, no approve right, precision tuning, feedback button, baseline first), L2→L3 (risk tiers from incidents, evidence bundle, machine-enforced routing, 90-day escaped-defect comparison), L3→L4 (task class only; no LLM evidence).
- Worked example: illustrative arithmetic — reviewer hours under (A) baseline, (B) noisy bot, (C) precision bot, (D) precision bot + risk routing with 10% audit sample. `<pre>`.

## 7.5 Guardrails (`#guardrails`)
- Separation of duties: requester cannot approve (SB-19); AI reviewer holds no approve right.
- Fresh-context reviewer; "will usually report some" (RR-47, https://code.claude.com/docs/en/best-practices).
- Same-vendor write-and-review: open question (RR-43, InfoQ secondary).
- Context limits: uReview lacks "past PRs, feature flag configurations, database schemas, or technical documentation" (GM-R10) → design review stays human.
- Off-switch: Tricorder >10% "Not useful" → disable (GF-15, https://storage.googleapis.com/gweb-research2023-media/pubtools/4365.pdf); the book's proposal to adopt.
- PR size limits (Zalando). Link Ch 12.

## 7.6 Metrics (`#metrics`, sidebar `#review-metric-vocabulary`)
- Vocabulary: useful / addressed / led to change / resolved (AI-judged) / actionable / marked incorrect.
- Vendor box: Copilot 71%/29% silent (RR-35/36), Bugbot 52%→70%+ AI-judged (RR-41), Anthropic 16%→54%, <1% incorrect (RR-42), Microsoft 10–20% median completion (LC-19), Graphite 67% undefined (RR-44). Never ranked.
- What to track: wait vs active time; closure time; not-useful rate; escaped defects/reverts; fast-lane share; no-review merges.

## 7.7 Anti-patterns (`#anti-patterns`)
- Counting comments; chasing every finding; a bot on top of an unchanged queue; "AI reviewed" counted as reviewed; same model writes and approves; review treated as unlimited.

## What to do
- Baseline wait/active/closure time before switching a bot on.
- Bot comments, never approves; tune for precision; let it say nothing.
- Add a "Not useful" button and a pre-agreed disable threshold (Tricorder 10% as the template).
- Build risk tiers from your own incident history; enforce routing in the merge system.
- Require an evidence bundle for routed-away changes; audit-sample.
- Next-level entry criterion: L3 needs machine-enforced routing + 90-day escaped-defect comparison + AI cannot edit its rules.
