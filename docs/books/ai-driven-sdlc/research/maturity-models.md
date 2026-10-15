# Existing maturity models and frameworks for AI in software engineering

Research brief for Ch 2 (*The AI-SDLC maturity model*). Researched 2026-10-15.
Coverage note: the shared WebSearch budget ran out partway through, so a few known leads
(GitLab's 4 stages, Gartner's press-release text, McKinsey's full article, Thoughtworks'
"complacency" blip page, the DORA report's archetype shares) could not be fetched from the
primary source. They are listed under "Unverified leads", not as claims.

## Key findings

1. **No published model is a per-phase grid.** Almost every model is a single scale for coding, usually borrowed from SAE J3016 driving levels: Sourcegraph, Shapiro, Stride, Tessl, Swarmia, James Read, Dash0 and Hassan et al. The few lifecycle-wide frameworks (AWS AI-DLC, Microsoft Agentic DevOps, McKinsey) describe a process or org stages, not a level for each phase. The book's L0–L4 × 8-phase grid fills a real gap. Serves **Ch 2**.
2. **The strongest academic work separates autonomy from capability.** Morris et al. (DeepMind, ICML 2024) and Feng/McDonald/Zhang (2025) argue that autonomy is a deployment or design choice: the right level "need not be the maximum achievable". The book should define its levels as *how the team operates a phase*, not as how good the tool is. Serves **Ch 2, Ch 13**.
3. **The most useful axis is what a human reviews.** Sourcegraph (2023) defines levels by who initiates the work and whether humans review every output, the final output, or nothing. Dash0 (2026) uses "review every PR", then "review intent and proof, not diffs", then "veto auto-merged PRs". This maps almost exactly onto the book's L2 "reviews every output" and L3 "review by exception". Ch 2 should make the review mode the defining test. Serves **Ch 2, Ch 8**.
4. **Numbering is chaotic, so the book needs a crosswalk.** Shapiro's Level 0 is *autocomplete*, while everyone else's L0 is *no AI*. Yegge counts 1–8. Swarmia and ASDLC start at L1. Hassan's levels carry "SE 1.0–5.0" labels. A reader arriving with "we're at Level 3" could mean three different things. Serves **Ch 2**.
5. **Every leading framework sits on preconditions, not just tools.** DORA's AI Capabilities Model names seven capabilities, among them version control, small batches and quality internal platforms. Microsoft's 2026 model says "agents do not magically fix broken engineering practices". Swarmia cites DORA: Level 3 agents "amplify weak pipelines". The book should treat these as *enablers that gate a level*, not as levels. Serves **Ch 2, Ch 4, Ch 15**.
6. **Phases move unevenly, and verification lags creation.** SmartBear (2025, a vendor) argues coding tools are at "Level 4 to 5" while testing, security and observability tooling sits near "Level 2 or 3". That is an opinion, but it supports the per-phase design and the book's emphasis on testing. Serves **Ch 2, Ch 9**.
7. **The top level is contested or empty.** Hassan et al. say general-domain autonomy (their L5) "does not yet exist". CSA says the controls for L5 "don't exist yet". ai4se calls full automation "rather unrealistic for complex, industrial-scale software". Shapiro knows only "a handful" of Level 5 practitioners. The book's choice to stop at L4, *narrow, well-verified task types*, is consistent with the serious sources. Serves **Ch 2**.
8. **Practitioner self-placement is anecdotal and drifts upward.** Shapiro says "90%" of "AI-native" developers are at his Level 2, but this is not measured. Anthropic's own telemetry is a vendor measurement: full auto-approve rises from about 20% to over 40% of sessions as users gain experience. Trust-driven drift is real, and a model needs *observable evidence*, not self-report. Serves **Ch 2, Ch 13, Ch 17**.
9. **Risk should cap the level.** James Read puts it as "As risk increases, acceptable autonomy decreases". CSA attaches escalating authorisation and monitoring controls to each level. Feng et al. propose third-party "autonomy certificates". The book should pair each level with required controls and let risk class set the ceiling. Serves **Ch 2, Ch 15, Ch 17**.

## Claims

1. **Sourcegraph's "Levels of Code AI" defines six SAE-style levels for coding.** L0 "the developer writes all code manually"; L1 code completion; L2 code creation, where the "developer reviews all generated code"; L3 supervised automation, where "the human gives a high-level objective and the code AI performs multiple steps", with review of only the final output; L4 full automation, where "humans are no longer expected to review the final code output"; L5 "AI setting its own goals". Levels 0–2 are human-initiated and 3–4 AI-initiated. Achieving level N requires achieving N-1.
   - Source: https://sourcegraph.com/blog/levels-of-code-ai · 2023-10-04 (Quinn Slack)
   - Measured by: vendor (Sourcegraph builds Cody), conceptual
   - Confidence: high (that it says this)
   - Chapter: Ch 2
2. **Sourcegraph estimates L3's ceiling.** About "80%" of typical issue-tracker work may fall within L3.
   - Source: same as claim 1 · 2023-10-04
   - Measured by: vendor estimate, unmeasured
   - Confidence: low as a fact (high that the claim was made)
   - Chapter: Ch 2 (as an example of a vendor estimate)
3. **Dan Shapiro's "Five Levels" (actually six, zero-indexed).** L0 "spicy autocomplete"; L1 "coding intern"; L2 "junior developer"; L3 "developer", where "You are the human in the loop"; L4 "engineering team" ("a robotaxi… you can do something else"); L5 "dark software factory" ("a black box that turns specs into software"). He says "90% of 'AI-native' developers are living" at L2, "almost everyone tops out" at L3, and he knows "a handful of people" at L5, on teams of "less than five people".
   - Source: https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/ · 2026-01-23
   - Measured by: practitioner essay; the figures are personal observation
   - Confidence: high (that he says it); low (that the 90% is accurate)
   - Chapter: Ch 2
4. **Steve Yegge's eight levels.** As told to Gergely Orosz: 1 "no AI"; 2 "Coding agent in your IDE, permissions turned on"; 3 "YOLO mode"; 4 "not look at the diffs anymore"; 5 agent-first, IDE later; 6 "several agents"; 7 "10+ agents, managed by hand"; 8 "build your own orchestrator". He says he knows good engineers still at level one or two.
   - Source: https://newsletter.pragmaticengineer.com/p/steve-yegge-on-ai-agents-and-the · 2026-02-10
   - Measured by: practitioner interview, secondary transcription
   - Confidence: medium (the original Gas Town post, where other versions of the list appear, was not opened; Block's and Tessl's restatements use different stage names)
   - Chapter: Ch 2 (counter-example: a model measured by number of agents, not by verification)
5. **Hassan et al. define L0–L5 for SE, explicitly paralleling SAE.** L0 Manual Coding [SE 1.0]; L1 Token Assistance [SE 1.5]; L2 Task-Agentic [SE 2.0], which "Maps a planned code change… to a complete, generated block of code"; L3 Goal-Agentic [SE 3.0], which maps "a technical goal (e.g., 'add a caching layer') to a detailed plan of code changes"; L4 Specialized Domain Autonomy [SE 4.0], a "broad technical mandate for a specific domain (e.g., 'ensure the reliability of the payment service')"; L5 General Domain Autonomy, which "currently is at the conceptual/research stage, i.e., it does not yet exist".
   - Source: https://arxiv.org/abs/2509.06216 (HTML v2, Sec. 2) · v1 2025-09-07, v2 2025-09-23
   - Measured by: academic, conceptual
   - Confidence: high
   - Chapter: Ch 2
6. **The same paper proposes a Merge-Readiness Pack.** An MRP is "a structured evidence bundle submitted for human approval, designed to demonstrate functional completeness…". This is a concrete artefact for review-by-exception.
   - Source: https://arxiv.org/html/2509.06216v2 · 2025-09
   - Measured by: academic, conceptual
   - Confidence: high
   - Chapter: Ch 2, Ch 8
7. **The ai4se taxonomy (Schieferdecker) has five automation levels.** L0 "No AI-assisted automation"; L1 "AI-assisted options… developer is in full control"; L2 "AI-assisted selection, where the AI selects pre-defined options"; L3 "AI-based partial automation… in simple, standard cases"; L4 "AI-based full automation, where the AI operates without the developer". It states that L1–L2 are most common, L3 is increasing, and L4 is "rather unrealistic for complex, industrial-scale software". Its other dimensions are purpose (understand / generate / improve), target (development / operations / SE process) and AI type.
   - Source: https://arxiv.org/html/2409.18048v4 · v1 2024-09-26, v4 2026-08-05
   - Measured by: academic, conceptual
   - Confidence: high
   - Chapter: Ch 2
8. **Morris et al. (Google DeepMind) separate capability from autonomy.** Autonomy levels: 0 "No AI"; 1 "AI as a Tool"; 2 "AI as a Consultant", whose examples include "Accelerating computer programming with a code-generating model"; 3 "AI as a Collaborator"; 4 "AI as an Expert"; 5 "AI as an Agent". Quotes: "Increasing capabilities unlock new interaction paradigms, but do not determine them" and "The choice of appropriate autonomy level need not be the maximum achievable given the capabilities of the underlying model."
   - Source: https://arxiv.org/html/2311.02462v5 (ICML 2024) · v1 2023-11-04, v5 2025-09-24
   - Measured by: academic
   - Confidence: high
   - Chapter: Ch 2
9. **Feng, McDonald and Zhang define five levels by the user's role.** The levels are operator, collaborator, consultant, approver and observer. An approver interacts "only… when the agent encounters a blocker", and an observer has logs and an off-switch only. They argue "an agent's level of autonomy can be treated as a deliberate design decision", separate from capability, and propose third-party "autonomy certificates".
   - Sources: https://arxiv.org/abs/2506.12469 (v1 2025-06-14, v2 2025-07-28) and https://knightcolumbia.org/content/levels-of-autonomy-for-ai-agents-1
   - Measured by: academic
   - Confidence: high
   - Chapter: Ch 2, Ch 15
10. **The Berkeley RDI group proposes three levels of development autonomy.** Level I Code Autonomy, where "AI takes full ownership of system design and implementation without line-by-line human approval"; Level II Pipeline Autonomy, through "testing, auditing, and deployment"; Level III Demand Autonomy, where AI "decides what should be built". It notes that evaluation infrastructure for this "barely exists".
    - Source: https://rdi.berkeley.edu/blog/auto-software-dev · 2026-07-26 (Wang, … Stoica, Song)
    - Measured by: academic, position piece, no data
    - Confidence: high (that it says this)
    - Chapter: Ch 2 (Level III maps onto the book's *requirements* phase at L4, which is an open question)
11. **The DORA AI Capabilities Model names seven capabilities.** They are: clear and communicated AI stance; healthy data ecosystems; AI-accessible internal data; strong version control practices; working in small batches; user-centric focus; quality internal platforms. They were derived from 78 interviews and validated on a survey of nearly 5,000 respondents. Quote: "successful AI-assisted development isn't just a purchasing decision".
    - Source: https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model · 2025-09-23 (Storer, DeBellis)
    - Measured by: independent-ish (DORA is Google-run research; survey based, correlational)
    - Confidence: high
    - Chapter: Ch 2 (enablers), Ch 4, Ch 15
12. **The 2025 DORA report's headline finding.** "AI's primary role is as an amplifier, magnifying an organization's existing strengths and weaknesses."
    - Source: https://dora.dev/research/2025/dora-report/ · 2025-09
    - Measured by: DORA survey
    - Confidence: high
    - Chapter: Ch 1, Ch 2
13. **The 2025 DORA report's adoption and trust figures.** AI adoption is "90%". "Over 80%" say AI enhanced their productivity. Only 24% trust AI "a great deal" (4%) or "a lot" (20%). The report links AI adoption to higher throughput, "reversing last year's finding", and notes an ongoing challenge in "ensuring software works as intended before it's delivered".
    - Source: https://blog.google/technology/developers/dora-report-2025/ · 2025-09-23
    - Measured by: DORA survey, self-reported
    - Confidence: high
    - Chapter: Ch 1, Ch 4
14. **The 2025 DORA report clusters teams into seven profiles.** Names reported include "Harmonious high-achievers" and "Legacy bottleneck". This is a diagnostic typology, not a ladder.
    - Source: https://blog.google/technology/developers/dora-report-2025/ · 2025-09-23
    - Measured by: DORA cluster analysis
    - Confidence: high for existence; shares unverified (see leads)
    - Chapter: Ch 13
15. **AWS AI-DLC is a lifecycle method, not a level scale.** It has three phases: Inception, Construction and Operations. Its rituals are "Mob Elaboration" and "Mob Construction". "Bolts" replace sprints, "measured in hours or days rather than weeks". AI "defers critical decisions to humans". It criticises both "AI-assisted development" and "AI-autonomous development" as having "produced suboptimal results". It reports no quantified results.
    - Source: https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle · 2025-07-31 (Raja SP)
    - Measured by: vendor, no data
    - Confidence: high (that it says this)
    - Chapter: Ch 2, Ch 14
16. **AWS open-sourced AI-DLC workflows with adaptive depth.** The workflows aim to fix "one-size-fits-all workflows" and tools that "over-automate".
    - Source: https://aws.amazon.com/blogs/devops/open-sourcing-adaptive-workflows-for-ai-driven-development-life-cycle-ai-dlc/ · date not verified
    - Measured by: vendor
    - Confidence: medium (search snippet only)
    - Chapter: Ch 2
17. **Microsoft's Agentic DevOps Maturity Model has four levels.** L1 Reactive ("Ad hoc use of AI assistants by individual developers"); L2 Foundation ("IDE-level AI assistance adopted team-wide with shared instruction files"); L3 Structured ("Custom agents for specialized tasks; agent PRs with attribution metadata"); L4 Optimized ("Agent teams orchestrated across the lifecycle"). A separate specification-maturity track runs Ad Hoc Prompts, Template Prompts, Structured Specs, Living Specs. Quote: "agents do not magically fix broken engineering practices". It reports no quantified results.
    - Source: https://devblogs.microsoft.com/all-things-azure/agentic-devops-practices-principles-strategic-direction/ · 2026-04-15 (David Sanchez, Microsoft GTM)
    - Measured by: vendor, no data
    - Confidence: high
    - Chapter: Ch 2, Ch 5
18. **GitHub's Engineering System Success Playbook has no AI levels.** It uses foundational "zones" (quality, velocity, developer happiness) and a three-step loop ("Identify the current barriers… Evaluate… Implement… monitor… adjust"). It is positioned partly to help teams "justify the investment in GenerativeAI".
    - Sources: https://github.com/resources/insights/engineering-system-success-playbook (2025-05-01) and https://docs.github.com/en/copilot/get-started/achieve-company-goals
    - Measured by: vendor
    - Confidence: high
    - Chapter: Ch 4, Ch 17
19. **GitLab's 2024 Global DevSecOps Report contains "The 4 stages of AI maturity in DevSecOps".** The stage definitions are gated. The survey covered "over 5,000" professionals and found "39%" using AI for software development, "up 16 percentage points from 2023".
    - Source: https://about.gitlab.com/developer-survey/2024/ai/ · 2024
    - Measured by: vendor survey (with Omdia)
    - Confidence: high for existence; stage content unverified
    - Chapter: Ch 2 (comparison table)
20. **Forrester's TuringBots frame is a lifecycle vision, not levels.** It predicts the future SDLC as "seamlessly integrated and invisible, operating in real time", "projected to unfold by 2028". Coder TuringBots are described as the most mature category.
    - Source: https://www.forrester.com/blogs/the-future-is-now-turingbots-will-collapse-the-software-development-life-cycle-siloes/ · 2024-05-28 (Diego Lo Giudice)
    - Measured by: analyst opinion
    - Confidence: high (that it says this)
    - Chapter: Ch 2 (analyst landscape); the forecast is not to be repeated as fact
21. **Thoughtworks rates spec-driven development "Assess", not Adopt.** Caveats: workflows are "elaborate and opinionated", some tools generate spec files that are hard to review, and hand-writing detailed AI rules may not scale (the "bitter lesson"). The blip is no longer on the current edition.
    - Source: https://www.thoughtworks.com/radar/techniques/spec-driven-development · 2025-11-05
    - Measured by: practitioner panel opinion
    - Confidence: high
    - Chapter: Ch 5
22. **Cloud Security Alliance attaches controls to each autonomy level.** L1 needs an approval gate per action. L2 needs plan or batch approval with pause, cancel and checkpoint rollback. L3 needs "machine-readable boundary definitions", technical enforcement, escalation workflows and logging. L4 needs continuous monitoring, anomaly detection, a "kill-switch" and executive risk acceptance. L5's controls "don't exist yet".
    - Source: https://cloudsecurityalliance.org/blog/2026/01/28/levels-of-autonomy · 2026-01-28 (Jim Reavis)
    - Measured by: industry body, normative guidance
    - Confidence: high
    - Chapter: Ch 2, Ch 15
23. **Dash0's six-level scale defines each level by the human's review object.** L2 "Review and approve every PR before merge". L3 "Look at intent and proof (satisfaction reports, screenshots, behavior evidence), not diffs". L3.5 "Selective Auto-Merge… Veto rights on auto-merged PRs. Active review only on high-risk services". L4 "Notifies humans, does not ask them". L5 "Dark Factory".
    - Source: https://www.dash0.com/knowledge/the-six-levels-of-agentic-software-engineering · updated 2026-06-02 (Ben Blackmore)
    - Measured by: vendor blog synthesising ~15 earlier frameworks
    - Confidence: high
    - Chapter: Ch 2, Ch 8
24. **Swarmia defines levels by one variable.** The variable is "how much of the work does the agent do autonomously before returning to you". L3 task agent is "hand off a task and come back to a pull request", with the rule of thumb "can you create a PR from your phone?". L4 "picks work items on its own". L5 "Agentic avalanche". It suggests metrics per level, e.g. merge rate and share of agent PRs at L3.
    - Source: https://www.swarmia.com/blog/five-levels-ai-agent-autonomy/ · 2026-03-19 (Miikka Holkeri)
    - Measured by: vendor (engineering analytics)
    - Confidence: high
    - Chapter: Ch 2, Ch 17
25. **SmartBear argues autonomy is uneven across lifecycle activities.** It says coding assistants have reached "Level 4 to 5" while testing, security, documentation and observability tools sit near "Level 2 or 3", and that "autonomy without assurance becomes a liability". No data is given.
    - Source: https://smartbear.com/blog/levels-of-autonomy-in-software-development-closing-the-gap-between-creation-and-confidence/ · 2025-10-21 (Dan Faulkner)
    - Measured by: vendor opinion (SmartBear sells testing tools)
    - Confidence: medium (opinion; conflict of interest)
    - Chapter: Ch 2, Ch 9
26. **Tessl's five levels.** L1 "the AI suggests, you decide"; L2 "hands-off but eyes-on"; L3 "autonomous operation within well-defined boundaries"; L4 "Human intervention is only needed in exceptional circumstances"; L5 "no steering wheel".
    - Source: https://tessl.io/blog/the-5-levels-of-ai-agent-autonomy-learning-from-self-driving-cars/ · 2025-09-29 (Guy Podjarny)
    - Measured by: vendor
    - Confidence: high
    - Chapter: Ch 2
27. **James Read ties autonomy to risk.** Six levels, L0 No AI to L5 Development Team ("AI writes, tests, reviews, merges; humans supervise outcomes"). Principle: "As risk increases, acceptable autonomy decreases". Prototypes and greenfield work suit higher levels; regulated and customer-facing production suits lower.
    - Source: https://blog.jread.com/posts/ai-levels-of-autonomy-in-software-engineering/ · 2026-02-15
    - Measured by: practitioner essay
    - Confidence: high
    - Chapter: Ch 2
28. **ASDLC.io gives machine-checkable guardrails per level.** At L3 the AI "cannot redefine success", with loop caps, lint and test steps, and token and monetary caps. To remain at L3, changes to evaluators must pass a "human-audited proposal loop".
    - Source: https://asdlc.io/concepts/levels-of-autonomy/ · updated 2026-06-30 (no author listed)
    - Measured by: practitioner site
    - Confidence: medium (anonymous)
    - Chapter: Ch 2, Ch 9
29. **Stride's six levels have no formal criteria.** The levels are Manual, Assisted, Semi-Autonomous, Autonomous, Highly Autonomous and Full Automation. L5 is "entirely hypothetical (for now) but will inevitably become available".
    - Source: https://www.stride.build/thought-leadership/the-6-levels-of-codegen-automation · undated
    - Measured by: consultancy
    - Confidence: medium (undated)
    - Chapter: Ch 2 (example of a weak model)
30. **Unblocked's "8 Levels of Agentic Engineering" measures technique sophistication, not autonomy.** The model is credited to Bassim Eledath. Its levels: Tab Complete, Agent IDE, Context Engineering, Compounding Engineering, MCP and Skills, Harness Engineering…, Background Agents, Autonomous Agent Teams.
    - Source: https://getunblocked.com/blog/8-levels-of-agentic-engineering/ · 2026-04-29 (Dennis Pilarinos)
    - Measured by: vendor
    - Confidence: high
    - Chapter: Ch 2
31. **Interface (EU think tank) classifies agents on three dimensions.** The dimensions are "Generality and scope of functions", "Control" and "Access to external tools/environments". Its five levels shift liability from user (L1–2) towards developers and providers (L5).
    - Source: https://www.interface-eu.org/publications/ai-agent-classification · 2025-04-02 (Soder et al.)
    - Measured by: policy think tank
    - Confidence: medium (level table was an image and was not read)
    - Chapter: Ch 15
32. **Anthropic's telemetry shows autonomy drifting up with experience.** Full auto-approve goes from "roughly 20%" of sessions for users with under 50 sessions to "over 40%" by 750 sessions. Interrupts rise from about 5% to about 9% of turns. The 99.9th-percentile turn duration went from under 25 to over 45 minutes between Oct 2025 and Jan 2026. Internal human interventions per session fell from 5.4 to 3.3 (Aug to Dec). Anthropic cautions that some of the rise may reflect configuration changes.
    - Source: https://www.anthropic.com/research/measuring-agent-autonomy · 2026-02-18
    - Measured by: vendor telemetry on its own product
    - Confidence: medium-high
    - Chapter: Ch 2, Ch 13
33. **Gartner's 2028 forecast and AI-native framing (secondary only; the primary returned 403).** Gartner forecasts "90% of enterprise software engineers will use AI code assistants" by 2028, "up from less than 14% in early 2024". "AI-native software engineering" lets AI "autonomously or semi-autonomously handle a significant share of tasks across SDLC". Teams "must balance automation with human oversight, considering business criticality, risk and workflow complexity."
    - Source: https://www.gartner.com/en/newsroom/press-releases/2025-07-01-gartner-identifies-the-top-strategic-trends-in-software-engineering-for-2025-and-beyond · 2025-07-01
    - Measured by: analyst forecast
    - Confidence: medium (verify before citing)
    - Chapter: Ch 2

## Cases

The models are frameworks, not cases. These are the few measured or self-placed examples found that illustrate levels.

- **Anthropic, Claude Code users and internal teams.**
  - What was measured: auto-approve share, interrupt rate and turn length over time, from Anthropic's product telemetry (vendor measuring its own product).
  - Result: auto-approve rises from about 20% to over 40% of sessions, and internal interventions per session fell from 5.4 to 3.3.
  - Source: claim 32.
  - Illustrates: the L2→L3 drift in *coding*, and why self-assessment needs evidence.
- **Uber FlakyGuard (secondary).**
  - Swarmia reports 1,115 flaky tests handled over six months: 798 reproduced, 380 fixes created, 197 landed with developer approval.
  - Source: https://www.swarmia.com/blog/five-levels-ai-agent-autonomy/ (secondary; the Uber primary was not located).
  - Illustrates: an L3/L4 candidate in *testing and maintenance*. Note the 197/1,115 landing rate: humans still approve.
- **Cursor FastRender (secondary).**
  - Swarmia reports over 1M lines across 30,000 commits from up to 2,000 parallel agents in about a week.
  - Source: as above (secondary).
  - Illustrates: Yegge and Swarmia's "multi-agent" top levels. This measures throughput, not quality, so it is not evidence of L4 under the book's definition.
- **Dan Shapiro / Glowforge (self-placement).**
  - He places himself at Level 4. This is self-reported.
  - Source: claim 3.
  - Illustrates: the gap between individual practice and team-level evidence.

## Contradictions & debates

- **What L0 means.** "No AI" (Sourcegraph, Hassan, ai4se, Morris, James Read) versus "spicy autocomplete" (Shapiro). The book should say plainly: L0 = no AI in that phase. It should also publish a crosswalk, for example Shapiro L2 ≈ book coding L2; Shapiro L3 ≈ book L2/L3 boundary; Shapiro L4 ≈ book L3; Shapiro L5 ≈ beyond book L4.
- **What defines a level.** Candidates: the review mode (Sourcegraph, Dash0); who initiates (Sourcegraph, Swarmia); the user's role (Feng et al., Morris); agent count and tooling sophistication (Yegge, Unblocked); org rollout breadth (Microsoft, GitLab); and the size of the task mapped (Hassan: tokens → block → plan → domain mandate). These are not compatible. Yegge-style counts reward parallelism without verification.
- **Is more autonomy progress?** The ladder sources (Stride: L5 "will inevitably become available"; Shapiro: L5 "will likely be our future") say yes. Morris ("need not be the maximum"), Feng (a design decision) and James Read (risk-capped) say no. The book's stance — readers choose how far to climb — aligns with the second group and should cite them.
- **Does the SAE analogy fit?** It is used by Sourcegraph, Hassan, Tessl, Dash0, ai4se and Shapiro. My analysis, not a cited critique: driving is one task with a stable environment and a legal liability framework, while software spans many phases and "correct" is often under-specified. Also, the SAE L2/L3 boundary is notorious for unsafe handover, the same trap as reviewers rubber-stamping at the book's L2/L3 boundary (Thoughtworks' complacency warning, if verified). I did not find a published critique of the SAE analogy specific to software; the search budget ran out.
- **Lifecycle methods vs levels.** AWS AI-DLC rejects both "AI-assisted" and "AI-autonomous" as suboptimal and proposes a different *process* instead. That challenges the idea that a level ladder is the right frame. The book can reconcile the two: AI-DLC describes how work flows at roughly L2–L3 across requirements, design and coding.
- **Capability vs adoption.** SmartBear says coding tools are at L4–5. DORA finds trust is low (24% trust a lot or a great deal) and ai4se says L1–L2 dominate. Tool capability claims and practised levels diverge sharply.

## Unverified leads

- The four stage names in the GitLab 2024 DevSecOps Report (the report is gated). https://about.gitlab.com/developer-survey/2024/ai/
- Population shares of DORA 2025's seven team profiles. Secondary sources (cusy.io, Splunk) give 10/11/17/7/15/20/20%. Check against the PDF (https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf — too large to fetch).
- The DORA AI Capabilities Model report (https://dora.dev/ai/capabilities-model/report/): which outcome each capability moderates.
- The Thoughtworks Radar Vol 32 (Apr 2025) wording on "complacency with AI-generated code". Only press summaries were seen. https://thoughtworks.com/content/dam/thoughtworks/documents/radar/2025/04/tr_technology_radar_vol_32_en.pdf
- McKinsey, "Unlocking the value of AI in software development" (survey of about 300 public companies; top performers "six to seven times more likely" to scale to four or more use cases; quality gains of 31–45%). The page timed out twice; only search snippets were seen. https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/unlocking-the-value-of-ai-in-software-development
- A Gartner CIO survey (Nov 2025) saying 25% of IT work will be done by AI alone by 2030 (third-party only).
- Forrester "State of TuringBots 2024" (paywalled) and the planned Q4 2025 TuringBot Landscape. Whether either defines levels is unknown.
- Atlassian State of DevEx 2025 (3,500 respondents): no maturity model found in public text.
- Yegge's original "Welcome to Gas Town" post (Medium), whose stage names differ between Block's and Tessl's restatements.
- Secure Code Warrior "AI Adoption Model" (AI-Assisted → AI Native → Agentic), seen only in a snippet.
- Others cited by Dash0 and not read: Sean Falconer, Parloa, Mayflower "dark factory" patterns, HackerNoon "Dark Factory Pattern". There is also a Lilys.ai claim that StrongDM runs a Level 5 factory with three people (no primary found).
- The SAE J3016 statement that the levels are "descriptive rather than normative" (the SAE site failed to fetch). It is worth citing if confirmed, because it supports "levels are not targets".
- The Uber FlakyGuard primary source (Uber engineering blog or paper).
- Google's internal "AI in software engineering at Google" posts, and any Meta, Amazon or Google internal level frameworks.

## Open questions for the book

1. **Which axis defines the level?** Recommendation: the *review mode* — who reviews what, and when — plus *who initiates*. Capability, agent count and adoption breadth stay out of the definition.
2. **Does the book's L4 need a sub-level like Dash0's "L3.5 selective auto-merge"?** Recommendation: no. Define L4 as "auto-merge or auto-act for an enumerated task type with a measured verification record", which is what L3.5 describes. Keep the grid at five columns.
3. **How does a team score a phase it partly automates?** Recommendation: a phase's level is the *highest level at which a named, recurring task type in that phase is run with the required evidence*. Record the task type next to the level (e.g. "Testing: L3 for flaky-test triage, L2 for new-feature tests").
4. **Should risk classes cap levels per phase?** For example, nothing above L2 in CI/CD for regulated services. Recommendation: yes, as a "ceiling column" in the self-assessment grid (from CSA and James Read).
5. **Where does "AI decides what to build" (Berkeley Level III) go?** Recommendation: requirements L4 should *not* mean that. Requirements L4 should be narrow, e.g. auto-triage of bug reports into reproducible tickets.

### Recommendation: how the book's model should align and differ

- **Align:**
  - L0 = no AI.
  - Name levels by the human's role; the book's Assisted / Delegated / Supervised-autonomous / Autonomous already does this.
  - Cite Sourcegraph, Hassan and Morris as precedents.
  - Keep the top level narrow, matching Hassan L4's "specialized domain autonomy", and do not add an L5.
- **Differ:**
  1. Per phase rather than one scale.
  2. Levels are defined by *observable evidence*, not self-description.
  3. Each level carries required *controls* (CSA-style) and preconditions (DORA capabilities).
  4. Levels are explicitly *not targets* (Morris, Feng).
  5. Include a crosswalk to Shapiro, Yegge, Sourcegraph, Hassan and Microsoft, so readers can translate.

### Proposed observable criteria (draft, for the bible; these are proposals, not sourced facts)

These hold for any phase. Each is stated over a trailing window such as 30 or 90 days, so that it can be audited.

- **L0 Manual:** no AI tool is used for this phase's outputs, or its use is prohibited by policy.
- **L1 Assisted:**
  - AI is available and used.
  - A human authors every artefact of the phase; AI output enters only as suggestions the human edits.
  - Evidence: tool usage telemetry; no artefacts attributed to an agent.
- **L2 Delegated:**
  1. At least one written, recurring task type in the phase is handed to AI to produce a complete artefact (PR, test file, ADR draft, runbook step).
  2. 100% of those artefacts get recorded human review before they take effect (approval logs).
  3. Agent output is attributed (labels, commit trailers or metadata).
  4. A shared instruction or context file exists for the phase.
  5. The team tracks acceptance or rework rate for that task type.
- **L3 Supervised-autonomous:**
  1. For named routine task types, AI runs end to end and a human reviews an *evidence bundle* (tests, checks, behaviour evidence; cf. Hassan's Merge-Readiness Pack), not every line. Alternatively, review is sampled or triggered by policy.
  2. The routing rules (what goes to a human) are written down and machine-enforced.
  3. Escalation and pause/rollback exist and have been exercised.
  4. A measured escape-defect or incident rate for AI-run work is compared against the human baseline over at least 90 days.
  5. The AI cannot change its own evaluators (ASDLC).
- **L4 Autonomous:**
  1. For an enumerated narrow task type, AI acts without per-item human approval (auto-merge, auto-remediate).
  2. The task type has a documented verification record (e.g. N consecutive items with no escaped defect, or a defined error budget).
  3. Continuous monitoring with automatic rollback or kill-switch.
  4. Named human accountability and a documented risk acceptance (CSA L4).
  5. Periodic audit samples.
  6. Scope is the task type, never the whole phase.

Phase examples, to be refined by the phase researchers:

- **Requirements:**
  - L2: AI drafts user stories or specs from inputs, and a PM approves each one.
  - L3: AI triages inbound bug reports into tickets, and humans review only the ones flagged as ambiguous.
  - L4: auto-dedupe and auto-label of tickets with audited precision.
- **Design:**
  - L2: AI drafts ADRs or design docs, and an architect approves each one.
  - L3: AI proposes and applies changes that conform to existing patterns, with architecture-fitness checks gating them.
  - L4: rare; leave mostly empty.
- **Coding:**
  - L2: agent PRs, each reviewed line by line.
  - L3: agent PRs for routine classes reviewed via an evidence pack.
  - L4: auto-merged dependency bumps or codemods with a verification record.
- **Review:**
  - L1: AI comments are advisory.
  - L2: AI review is a required check, and a human still approves.
  - L3: the AI reviewer approves low-risk diffs, and humans see only flagged diffs.
  - L4: AI approval alone suffices for an enumerated change class.
- **Testing:**
  - L2: AI writes tests for a specified task type, and each test file is human-reviewed before merge. The team tracks how many AI tests are kept or rewritten, and their mutation score or defect detection.
  - L3: AI generates and maintains regression suites for routine changes, and humans review coverage or mutation reports, not individual tests.
  - L4: flaky-test quarantine and fix with auto-land, under an audited false-fix rate.
- **CI/CD:**
  - L2: AI drafts pipeline changes, which are reviewed.
  - L3: AI diagnoses failed builds and opens fixes under policy.
  - L4: AI-driven canary promotion or rollback for defined services with an error budget.
- **Operations:**
  - L2: AI drafts incident summaries and suggested remediations, and the on-call engineer executes them.
  - L3: AI executes runbook steps from an allow-list, and humans are paged on exception.
  - L4: auto-remediation for enumerated alert types with a kill-switch.
- **Maintenance:**
  - L2: AI drafts migration PRs, each reviewed.
  - L3: fleet-wide migrations, with sampled review and an evidence pack.
  - L4: auto-merged dependency and security patch updates under a verification record.
