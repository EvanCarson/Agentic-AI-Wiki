# Ch 8: Security, Governance and Model Risk (`security-governance-and-model-risk`)

Part II · The Engagement · phase-num 8 · 3,500–4,500 words.

## p.goal draft
> Treat the customer's security and model-risk review as a design input from day one, not a gate at the end. Its first question is about the data; its hardest, indirect prompt injection, has no full answer, so answer it with an agent that cannot act.

(First sentence: 20 words.)

## STEPs

**8.1 What this phase is for, and how it fails.**
- The review decides whether the agent may touch real data, and on what terms. Ch 4 already set the day-1 start; do not repeat the argument, build on it.
- Failure 1: review as a gate at the end (one line, back-reference to Ch 4).
- Failure 2: review answered with reassurance, not design; authority granted that no reviewer would sign.
- Contradiction #11: Stanford "Security was not a project killer" (T2, draft, 12 cases with complete data, successes only; "The security tax is real but front-loaded") vs Informatica 46% cybersecurity/privacy compliance (T2, vendor, no method, obstacle to *demonstrating value*) vs Deloitte Q4 compliance "emerged from the pack to become the top barrier" (T2, N=2,773). Reconcile: different questions; survivors paid the tax early.

**8.2 The composite (beat 8).** Review started week 1, booked by week 2; questions: retention/training, residency, audit. FDE flags claimant-uploaded documents as indirect injection path → propose-only, no acting tools, read-only identity. Week 3: model risk approves read-only shadow-run; production conditional on eval result + audit log. Pattern: Morgan Stanley ZDR; OWASP LLM01; human approval for high-risk actions.

**8.3 Run the review as a design session.**
- CIO.com/Kasthuri: "Governance in Agentic AI cannot be added as a final compliance checklist" (T4).
- Who sits in it, what each asks; bring a data-flow diagram, not a deck.

**8.4 The first question is about the data.**
- Morgan Stanley, Wu: "One of the first questions we get is, is our information going to be used by OpenAI to train the public ChatGPT?"; ZDR "really impactful" (T2, vendor-published). https://openai.com/index/morgan-stanley/
- Answer with terms: training clause, sub-processors, ZDR per sub-processor, your own logs and traces count as retention.
- Vaquill AI section questions 5.1–5.8 (T4). https://www.vaquill.ai/blog/vendor-security-questionnaire-in-house-counsel
- Verified box: OpenAI EU residency (TechCrunch 2025-02-06): "handled in-region ... with zero data retention"; new projects only.
- Link: /concepts/data-residency-and-sovereignty/

**8.5 The hardest question: indirect prompt injection.**
- OWASP LLM01:2025 (T1): indirect definition; RAG/fine-tuning "do not fully mitigate"; mitigations (least privilege, human approval, segregate external content, adversarial testing). https://genai.owasp.org/llmrisk/llm01-prompt-injection/
- Honeycomb (T4): "kinda like SQL injection, except worse and with no solution today"; "non-destructive and undoable"; LLM "isn't connected to our databases". https://www.honeycomb.io/blog/hard-stuff-nobody-talks-about-llm
- Answer containment, not prevention: what can a successful injection do?
- Replit (T3, eWeek 2025-07-22): instruction not a boundary; structural fixes. https://www.eweek.com/news/replit-ai-coding-assistant-failure/
- Links: /operations/safety-and-security/prompt-injection/, /operations/safety-and-security/scoped-credentials-for-agents/, SDLC Ch 12.

**8.6 Model risk, audit and accountability.**
- Verified box: SR 26-2 replaced SR 11-7 on 2026-04-17, GenAI excluded (Risk.net T3; Baker Tilly T3: Fed/FDIC/OCC, >$30B, separate AI guidance not issued). "productivity tools rather than models".
- Air Canada / Moffatt (T3, Manatt): separate-entity defence dismissed; "did not take reasonable care to ensure its chatbot was accurate"; C$650.88.
- Audit log fields; CIO.com audit trail "path the agent took" (T4). Link /deep-dives/agent-security/decision-receipts-and-audit/.
- MD Anderson (T3, Network World): $62M, "almost all of it without board approval"; paid "regardless of whether the original contracted scope-of-work was completed". Governance of the engagement itself → conditional approvals with named conditions.

**8.7 Template: AI security-questionnaire answers.** Blank, then filled. Fields: system summary + authority; data flow and retention per store; training; sub-processors and ZDR; residency; identity and access; prompt injection (untrusted inputs, worst case, controls, residual risk); human oversight; audit log; model and prompt change; incident and switch-off; conditions of approval; sign-off.

## Failure signals
- "We'll do security after the pilot."
- "Will our data train your model?" answered with "no" and no clause.
- The agent has write access "for later".
- Injection answered with "we have a filter".
- The tool is classed a "productivity tool" to skip model risk.
- Approval with no conditions written down.

## Ready-to-move-on checklist
- Review started in week 1; written answers submitted.
- Training/retention/residency answered by contract clause.
- Every untrusted input listed with its worst case.
- Agent identity least-privilege, authority level signed.
- Audit log live before shadow-run.
- Approval conditions written, each with owner and evidence.

## Closing tip
Answer the injection question with the worst case, not the filter.

## Links
- /books/last-mile/before-the-engagement/, /books/last-mile/scoping-and-the-first-win/, /books/last-mile/data-access-and-integration/, /books/last-mile/evals/, /books/last-mile/building-in-their-environment/
- /operations/safety-and-security/prompt-injection/; /concepts/data-residency-and-sovereignty/; /deep-dives/agent-security/decision-receipts-and-audit/; /operations/safety-and-security/deployment-safety-checklist/; /operations/safety-and-security/scoped-credentials-for-agents/
- /books/ai-driven-sdlc/security-permissions-and-blast-radius/
