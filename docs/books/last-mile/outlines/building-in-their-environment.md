# Ch 10: Building in Their Environment (`building-in-their-environment`)

Part II · The Engagement · phase-num 10 · 3,500–4,500 words. Thin-evidence chapter (bible §10.2): say so up front, lean on wiki links, do not re-teach the stack.

## p.goal draft
> On someone else's infrastructure, their constraints bind and your preferences do not. Enforce the rules that must never break in plain code outside the model, and build the least clever system that clears the eval and their operators can run.

## STEPs

**10.1 What this phase is for, and how it fails.**
- Purpose: turn the pilot into something that runs on their hosting, their identity, their endpoint, their change process, and keeps running after you leave.
- Three failures: importing your own stack (designing for the vendor's cloud); putting must-hold rules in the prompt; cleverness their operators cannot run.
- Evidence statement: thin. Mostly T3 secondary reports and T4 job posts and memoirs; no measured data on architecture choices vs outcomes.

**10.2 The composite (beat 7, months 2–3).** In the insurer's VPC/private cloud, approved model endpoint, their IdP; rules in code (litigation-flagged never to fast queue; some claim types always human); least clever pipeline; runs in shadow while the eval climbs. Pattern: APAC automotive deterministic constraints; Anthropic "simplest solution possible".

**10.3 Inventory their constraints before you design.**
- OpenAI FDEs "write code directly on customer infrastructure and use customer tooling" (Pragmatic Engineer 2025-08-12, T3).
- Kanekar: Airbus final assembly line; peers in "airgapped" environments (same source, T3).
- Sierra Deployed Infrastructure Engineer: "navigate their infrastructure constraints and compliance requirements"; "customer-owned cloud environments" (T4, what employers ask for).
- Verified box: OpenAI Gov FDSE (TS/SCI, Azure/AWS, Kubernetes, Terraform), Anthropic Applied AI Engineer Public Sector (secure facilities, TS/SCI + polygraph, air-gapped preferred), Cohere Infrastructure Specialist Public Sector (private cloud/on-prem, Kubernetes/Helm, TS strongly preferred). T4.
- The inventory list: hosting, model endpoint, identity, egress, data stores, change process, who operates.
- Links: self-hosted-inference-for-agents, sandbox-and-isolation-patterns.

**10.4 Put the rules that must hold outside the model.**
- APAC automotive: "use determinism wherever possible and LLMs only where their probabilistic nature adds value"; "checked 100% of the time through deterministic code" (ZenML summary of the Jarvis interview, T3; no outcome reported).
- Rules before the model (routing overrides), after the model (schema, allowed values), rules tested as unit tests at 100%, not inside the eval percentage.
- Link policy-as-code-for-agents; human-in-the-loop.

**10.5 Build the least clever thing that clears the eval.**
- Anthropic "simplest solution possible"; "start by using LLM APIs directly"; frameworks "obscure the underlying prompts and responses"; agents mean "higher costs, and the potential for compounding errors" (2024-12-19, T4 per bible: vendor guidance).
- Qureshi on Airbus: "basic software things"; "just deploying these 'best practice' UIs to the real world is insanely powerful"; 4x is a former employee's claim with no method (T4).
- The ladder: rules → one call with structured output → fixed chain → agent loop. Climb only when an eval failure category demands it.
- Link agents-vs-chatbots-workflows.

**10.6 Build it so they can run it.**
- Qureshi: FDE code "usually means – politely – technical debt and hacky workarounds" (T4); here that debt becomes the customer's.
- Pin versions; record them in each audit entry; fail closed to the old process; staging in their environment; go through their change process.
- Links: staging-environments-for-agents; what-is-mcp (only where they already expose tools); next chapter production-and-handoff.

**10.7 Template: architecture decision record (blank, filled).**
Fields: ID/date/status; context (their constraints); decision; rules that must hold (rule / enforced where / test); what the model decides; options rejected and why; failure behaviour; versions pinned; who operates; eval gate; reversibility; sign-off (platform owner, model risk, FDE lead).

## Failure signals
- Design doc names a service their platform does not run.
- A must-never rule lives only in the prompt.
- An agent loop where a single call would do; nobody can explain a wrong route.
- Only the FDE can deploy it.
- Model endpoint upgrade changes behaviour unannounced.
- Rule tests reported as a percentage.

## Ready to move on
- Runs in their environment, deployed through their pipeline by their identity.
- Every must-hold rule enforced in code, with tests at 100%.
- ADR signed by platform owner and model risk.
- Versions pinned and logged; fallback to the old process tested.
- Eval re-run on the production stack matches the pilot number.

## Closing tip
If breaking a rule would end up in a complaint or a courtroom, it does not belong in a prompt.

## Cases and tiers
- Pragmatic Engineer (Orosz, 2025-08-12), T3: https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers
- ZenML LLMOps database summary of Jarvis interview, T3: https://www.zenml.io/llmops-database/forward-deployed-engineering-bringing-enterprise-llm-applications-to-production
- Anthropic "Building effective agents" (2024-12-19), T4: https://www.anthropic.com/engineering/building-effective-agents
- Qureshi "Reflections on Palantir" (2024-10-15), T4: https://nabeelqu.co/reflections-on-palantir
- Job posts, T4 (what employers ask for): Sierra https://jobs.ashbyhq.com/sierra/d9c0aa93-e35d-4752-9cef-4c39dcad5365 ; OpenAI Gov https://jobs.ashbyhq.com/openai/db5a708d-1d7a-4aa3-8dd3-0d0423b6b69f ; Anthropic https://job-boards.greenhouse.io/anthropic/jobs/5445410008 ; Cohere https://jobs.ashbyhq.com/cohere/52a2b83b-7537-4e88-af7b-e4e9630a96e0
