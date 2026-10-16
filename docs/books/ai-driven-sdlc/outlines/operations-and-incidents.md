# Outline — Ch 10 Operations & Incidents (`operations-and-incidents`, ~3,500 words)

**Argument (bible §2):** Diagnosis can climb the ladder, but action must not outrun reversibility: ops autonomy is a closed set of typed, reversible mitigations with an automatic downgrade path, and IAM, not the model, sets the blast radius.

**Lede:** In operations a wrong diagnosis costs minutes and a wrong action can cost the database and its backups. So let diagnosis climb; keep action inside a closed, reversible set with an automatic way down, and let credentials, not the model, set how far a mistake reaches.

## 10.1 What changes (`#what-changes`)
- Incident work splits into diagnosing (reading) and mitigating (writing to production). No PR stage between an ops action and prod: the action is the change.
- Diagnosis is cheap to be wrong about when a human acts: BiAn −20.5% TTR (GF-11, https://doi.org/10.1145/3718958.3750505); Google Incident Hypothesis −10% MTTM by A/B (GF-10, https://sre.google/resources/practices-and-processes/ai-engineering-reliable-operations/).
- But independent accuracy is low: OpenRCA 2.0 20.7% exact set (GF-6, https://arxiv.org/abs/2606.27154); ORCA-bench 25.3%/10.0%, weakest model invented a root cause in 40% (GF-7, https://arxiv.org/abs/2607.28545).
- Action failures are authority failures: PocketOS, Replit, Kiro (SB-Case 1, FR-C1, GM-R5) → Rule 2.

## 10.2 The ladder for this phase (`#ladder`)
- Grid identical in criteria to Ch 2 `#grid-operations`; deeper notes per level.
- L1: Meta RCA 42% top-5 backtest, withholds low-confidence answers (GF-13/TM-21, https://engineering.fb.com/2024/06/24/data-infrastructure/leveraging-ai-for-efficient-incident-response/).
- L2: Google SRE + Gemini CLI, closed set + five layers (TM-26, https://cloud.google.com/blog/topics/developers-practitioners/how-google-sres-use-gemini-cli-to-solve-real-world-outages); Google AI Operator L2 for critical ops (GF-10).
- L3: AI Operator "autonomously for minor incidents", auto-downgrade, Red Button (GF-10, GF-16); Azure SRE Agent T4 (GF-12).
- L4: none; failures (SB-Case 1, FR-C1, GM-R5).

## 10.3 The case: Alibaba Cloud BiAn (`#case-bian`)
- T2 peer-reviewed; 10 months; shadow operators with BiAn vs RCACopilot; −20.5% (−55.2% high-risk); +9.2% accuracy on 17 months of cases; mitigation then ~2 min; not randomised or blinded (GF-11).
- Point: the best-measured result is diagnosis with humans acting (L1–L2).
- Counterweight: OpenRCA 2.0, ORCA-bench, FORGE (fabricated evidence dominant, GF-9, https://arxiv.org/abs/2601.22208), Kim et al. (prompting does not fix pitfalls, GF-8, https://arxiv.org/abs/2602.09937); Traversal critique is a vendor's (TM-31).
- Vendor box: Azure SRE Agent (GF-12), Resolve (TM-29), PagerDuty/Traversal (GF-14), Datadog (TM-27).

## 10.4 Migration steps (`#migration-steps`)
- L0→L1: read-only access; backtest on past incidents (Meta method); confidence gate; shadow comparison (BiAn). Low-risk entry: postmortem analysis, Zalando curation 100% → 10–20% sampled (GF-32, https://engineering.zalando.com/posts/2025/09/dead-ends-or-data-goldmines-ai-powered-postmortem-analysis.html).
- L1→L2: enumerate mitigation classes; typed tools; risk tags; policy; forced confirmation; audit; distinct agent identity (TM-26, GF-16).
- Worked example: an illustrative mitigation catalogue (`<pre>`), the book's proposal built from Google's five layers.
- L2→L3: one minor-incident class, reversible actions only, auto-downgrade, Red Button exercised, rate limits/circuit breakers, 90-day baseline (Ch 2 L3 criteria; GF-16).
- L3→L4: no public LLM evidence; Ch 2 L4 requirements; don't plan for it.

## 10.5 Guardrails (`#guardrails`)
- PocketOS (AIID, OECD; mechanism secondary). Replit dev/prod split (docs). Kiro "mandatory peer review for production access".
- Env-scoped agent identity; backups outside blast radius; irreversible → not L4-eligible; rollback is not automatically safe ("last known good" risky, GF-16); rate limits and circuit breakers; link Ch 12.

## 10.6 Metrics (`#metrics`)
- MTTM per mitigation class (Google A/B template); time to root cause vs shadow baseline (BiAn); top-k by backtest (Meta); fabricated-evidence rate by sampling (GF-9, Zalando); paired stability: incidents caused or worsened by agent actions, downgrade and Red Button events. Not: "incidents handled autonomously", hours saved.

## 10.7 Anti-patterns (`#anti-patterns`)
- Broad token for a narrow task (PocketOS); instruction as boundary (Replit freeze); acting on a confident RCA (ORCA 40%); prompt tuning to fix RCA (Kim et al.); rollback as always safe; autonomy with no way down; counting volume as outcome (Azure).

## What to do
- Inventory every credential your ops tooling/agents hold; score the level by it.
- Start at L1 on diagnosis with backtest and confidence gate; postmortem analysis as low-risk entry.
- Write the closed mitigation catalogue with risk tags before any L2.
- Give agents their own identities, env-scoped; move backups out of reach.
- Build the downgrade path and Red Button before the first L3 action; exercise them.
- Measure MTTM per class against a baseline and pair it with agent-caused incidents.
- Next-level entry criterion: L3 only for one minor-incident class with reversible actions, auto-downgrade exercised and 90-day comparison.
