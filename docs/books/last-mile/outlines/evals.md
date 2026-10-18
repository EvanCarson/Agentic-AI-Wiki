# Ch 9: Evals (`evals`)

Part II · The Engagement / 第 II 部分 · 一次交付 · phase-num 9 · 3,500–4,500 words.

## p.goal draft
> The eval set is the contract: build it with the customer's experts before the agent, and expect the climb from 80% to the threshold to outlast everything before it.

## STEPs

**9.1 What this phase is for, and how it fails.**
- Scoping signed a threshold; this phase makes it something you run every day.
- Fails three ways: the vendor grades its own work; generic metrics (Husain, T4); the 80% illusion (LinkedIn, T2).
- Thin evidence: nearly all eval practice is T2 vendor accounts or T4 practitioner writing; nothing T1 on engagement evals.

**9.2 Composite beat** (week 2 → about month 3, per composite-arc.md).

**9.3 Start with five, from their experts.**
- Jarvis: "a set of five with the experts from the customer"; "not done until you have a set of evals" (T2; the context is the semiconductor verification work). Source: https://www.youtube.com/watch?v=cBD7_R-Cizg (transcript fetched 2026-10-17).
- N-of-10 playground sense check (T2) as a feasibility check, not an eval.
- Anthropic: two experts would independently reach the same verdict (T2). https://anthropic.com/engineering/demystifying-evals-for-ai-agents
- Morgan Stanley: three evals including "human trainers" comparing AI with expert advisors (T2). https://cdn.openai.com/business-guides-and-resources/ai-in-the-enterprise.pdf

**9.4 Grow it from real failures.**
- Anthropic "20-50 simple tasks drawn from real failures" (T2).
- Husain: review at least 100 traces, binary labels, one domain expert drives ("benevolent dictator"), 60–80% of dev time (T4). https://hamel.dev/blog/posts/evals-faq/
- Yan: 50–100 failures out of 200+; organic over synthetic (T4). https://eugeneyan.com/writing/product-evals/
- Nurture Boss: three issues >60% of problems; date handling 33% → 95% (T4). https://hamel.dev/blog/posts/field-guide/

**9.5 Three sets, three jobs, and graders you can trust.**
- Held-out acceptance (customer-owned), development set, regression suite ("nearly 100%"; pass^k).
- Sierra: annotated conversations become tests; reruns every live customer's suite on upgrades (T2). https://sierra.ai/blog/agent-development-life-cycle
- Klarna eval-per-intent, 20 → 400 policies (T2, Jarvis); later reversal "lower quality" (T3, Entrepreneur): public record does not show what the evals measured.
- Graders: code first, one judge per dimension (Yan), kappa > 0.7; read transcripts; broken graders (Verified box: CORE-Bench 42% → 95%, T2).

**9.6 The long climb.**
- LinkedIn 80% in month one, four more months past 95% (T2). https://www.linkedin.com/blog/engineering/generative-ai/musings-on-building-a-generative-ai-product
- McDonald's: low 80s vs 95%-plus target, ~100 stores from Oct 2021, ended (T3). https://www.nrn.com/quick-service/mcdonald-s-is-ending-its-ai-drive-thru-test-with-ibm
- Morgan Stanley: 6–8 weeks then about 4 months of pilots collecting evals (T2, Jarvis).
- Expert agreement is the ceiling; plan the contract around the climb.

**9.7 Delivering the bad news.** Number, ceiling, failure categories, fix per category, re-measure date, what does not move.

**9.8 Template: eval plan** (blank, then filled). Fields: contract; three sets; labelling and ceiling; graders per dimension; consistency (pass^k); cadence; failure log; readout; sign-off.

**9.9 Failure signals** (threat-grid). **9.10 Ready to move on.** Closing tip.

## Composite beat
Five cases from senior adjusters in week 2 → dozens of shadow-run failures → regression suite. Low 80s fast; seniors agree low-to-mid 90s. Week-4 readout: time-to-first-action meets target, routing accuracy below threshold. Bad news with plan; COO signs annual contract, go-live gated on threshold. Stall for several weeks; threshold reached roughly two to three months after the pilot. Patterns: Jarvis "five with the experts"; LinkedIn 80%→95%; Anthropic 20–50 tasks.

## Checklist
Threshold encoded as a runnable check; held-out set customer-owned and untouched; regression suite runs on every change; each grader calibrated; failure log categorised; readout delivered with re-measure date; threshold met on held-out set and signed by threshold owner.
