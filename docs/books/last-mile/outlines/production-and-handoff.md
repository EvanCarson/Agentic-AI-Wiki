# Ch 11: Production and Handoff (`production-and-handoff`)

Part II · The Engagement / 第 II 部分 · 一次交付 · phase-num 11 · 3,500–4,500 words.

## p.goal draft
> The build took weeks; trust takes months, and an FDE who leaves before it arrives leaves a system nobody uses or nobody can run. Treat handoff as an acceptance test the customer's operators pass without you, and adoption as a deliverable you are measured on.

## Argument
Handoff is an acceptance test the customer's operators pass without you, and adoption is a deliverable.

## STEPs
**11.1 What this phase is for, and how it fails.**
- Production = the point where the customer runs it and uses it; two failures: "only the engineer can operate it" (Alpine Edge, T4) and the correct tool that "sits there unused" (Tryolabs, T4).
- Morgan Stanley: pipeline 6–8 weeks, then 4 more months of pilots (ZenML summary of Jarvis talk, T3; the primary is the Altimeter video, T2, not re-fetchable as text).
- Jarvis at HumanX: about 80% of cases are deployment problems; companies don't know how to "roll AI out, govern it or prove they can trust it" (TNW, T3).

**11.2 Composite beat (months 3–6).** Staged go-live after threshold; handoff drill with the FDE silent; adoption lags then rises as overrides visibly improve it; COO brief pairs cycle time with time-to-first-action.

**11.3 Ship in stages you can undo.** Shadow → small slice → widen; release = code+prompts+model version+knowledge snapshot (Sierra ADLC, T2); rollback rehearsed; kill switch falls back to manual queue. Links: rollout-and-versioning, kill-switches.

**11.4 Adoption is a deliverable.** Palantir Deployment Strategist "Lead training sessions…" (T4 job post, Verified box); NHS FDP 45 / 72 / 120+ (T3) — define the adoption metric before someone else does; KPMG £8.8M on adoption (T3); Walgreens 4,000 stores in eight months (T2, customer quote relayed by Palantir's CRO, no adoption definition). Overrides as the signal (link production-feedback-signals).

**11.5 Briefing the executive.** One page, the KPI and the leading indicator together, adoption with its definition, the next decision. Evidence thin: practice, not data.

**11.6 The handoff drill.** Alpine Edge: future operator deploys, investigates a failed task, practises recovery using the documentation; "Name the operational owner and provide the runbook"; cost per successful task (T4). Anthropic Staff FDE "hand over systems the customer can run" (T4, Verified box). Link incident-response-for-agents.

**11.7 Leaving on purpose.** "we should always be temporary" (TNW, T3); "zero-to-one team… rather than long-term service delivery" (ZenML, T3); Tryolabs "still in use after we are gone", "more capable, not more dependent" (T4). Gap: no data on handoff durability 12 months on.

**11.8 Template:** handoff document + runbook (blank, filled).
Fields: system and authority; owners; release and rollback; health signals; known failures and recovery; kill switch and fallback; change control; adoption definitions and review; handoff drill record; vendor support window; sign-off.

**11.9 Failure signals** (threat-grid). **11.10 Ready to move on** (ul). Tip.

## Cases and tiers
| Case | Tier | Source |
|---|---|---|
| Morgan Stanley 6–8 weeks + 4 months | T3 (summary of T2 talk) | https://www.zenml.io/llmops-database/forward-deployed-engineering-bringing-enterprise-llm-applications-to-production |
| Jarvis "always be temporary", 80% deployment | T3 | https://thenextweb.com/news/openai-colin-jarvis-enterprise-ai-deployment-fde-humanx |
| Alpine Edge handoff drill, runbook, warning sign | T4 | https://alpineedge.ch/blog/forward-deployed-ai-engineer-first-month |
| Tryolabs "still in use after we are gone" | T4 | https://tryolabs.com/blog/forward-deployed-engineers-enterprise-ai |
| NHS FDP 45/72/120+, KPMG £8.8M | T3 | https://www.theregister.com/2025/05/16/nhs_hospitals_palantir/ |
| Walgreens 4,000 stores / eight months | T2 | https://transcripts.platformaeronaut.com/transcripts/PLTR-1Q25-transcript |
| Sierra immutable releases | T2 | https://sierra.ai/blog/agent-development-life-cycle |
| Palantir Deployment Strategist training sessions | T4 | https://jobs.lever.co/palantir/55c68159-62d3-40ed-b4a7-8b586dc99200 |
| Anthropic Staff FDE "hand over systems the customer can run" | T4 | https://job-boards.greenhouse.io/anthropic/jobs/5449229008 |

Cut: OpenAI healthcare "adoption, and handoff" (re-fetch did not show the sentence); Morgan Stanley press-release dates (fetch timed out).

## Checklist
- Go-live staged, rollback rehearsed, kill switch falls back to the manual process.
- Handoff drill passed by the customer's operators with the FDE silent; gaps closed or covered.
- Named operational owner, behaviour/threshold owner, eval-set owner on the customer side.
- Adoption metric defined, baselined and reviewed on a cadence the customer runs.
- Executive brief delivered with KPI + leading indicator; next decision named.
- Vendor support window and exit date written down.
