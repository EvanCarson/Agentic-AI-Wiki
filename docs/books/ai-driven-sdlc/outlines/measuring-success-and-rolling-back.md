# Outline — Ch 17 Measuring Success and When to Roll Back (`measuring-success-and-rolling-back`, ~3,000 words)

**Argument (bible §2):** pair a flow metric with a stability metric for every phase you climb, write rollback triggers before the pilot, never use self-report or AI-code share as success criteria, and treat stepping one phase down a level as normal operations.

**Lede:** no organisation has published the threshold at which it would take autonomy back from a coding agent (GF-20), so climbs get judged on numbers that cannot fail. Takeaway: pair, pre-write triggers, exclude self-report and code share, downgrade is routine.

17.1 `#what-success-means` — success = the constraint moved and stability held, against a baseline taken first.
- Refer back: bottleneck chapter's Stanford pilot (#pilot-that-looked-like-success); economics #perception-is-not-measurement, #volume-is-not-value; maturity model #rule-evidence. Do not repeat numbers beyond one line each.
- Two exclusions: self-report, AI-code share. DX AI Measurement Framework (vendor, OG-37, verified): "Metrics like code generation volume are particularly susceptible to gaming"; against "top-down mandates or using metrics for individual performance evaluation" → link people-and-roles.
- Baseline first: METR 2026 update, 30–50% skipped tasks, "unreliable signal" (BN-17) → the control group disappears once the tool is everywhere. Link the-90-day-pilot.

17.2 `#paired-metrics` — the pairing rule.
- DIDACT as the template (TM-16; case-studies#case-google-didact): ~2% throughput + no detectable rise in rollback rates.
- DORA metrics incl. rework rate in Thoughtworks Adopt (GM-N2 claim 2).
- threat-grid: 8 rows (Requirements & design, Coding, Review, Testing, CI/CD, Operations, Maintenance, Security cross-phase): flow metric | stability pair, each pointing back to that chapter's #metrics.
- dotnet 0.6% vs 0.8% as the only public revert comparison (GM-R7) → you will build the baseline yourself.

17.3 `#scorecard` — the book's proposal: one row per phase × task type; `<pre>` template (illustrative, no org). Link templates.

17.4 `#rollback-triggers` — precedents and the proposed sheet.
- Gap: GF-20. Precedents: Tricorder (GF-15, refer code-review#guardrails), Google SRE auto-downgrade + Red Button (GF-16, refer operations-and-incidents#guardrails), NIST AI RMF MANAGE 2.4 (GF-17) → regulatory appendix.
- Anatomy (book's proposal): signal, threshold fixed before launch, window, scoped action, owner, re-entry condition.
- threat-grid trigger sheet: stability regression; oracle tampering; reviewer noise; queue overflow (throttle, not downgrade); authority drift; ops risk score; severe incident.

17.5 `#stepping-down` — normal operations.
- Kiro → peer review for production access (maturity-model#example-kiro, case-studies#case-kiro). Amazon retail reported senior sign-off, both accounts (FR-C6, T4 disputed).
- Make it cheap: pre-wired, exercised (L3 definition), scoped to one task type, recorded, no blame; re-entry criterion.
- Klarna sidebar (FR-C32; non-SDLC, T4): cost-only metric hid quality; fix = human escape hatch.
- Wiki: scaling-back-an-agent-deployment, kill-switches, slos-and-error-budgets, quality-regression-detection, production-feedback-signals, measuring-roi, agent-pullback blog, trust-outran blog.

What to do box (6 bullets).
