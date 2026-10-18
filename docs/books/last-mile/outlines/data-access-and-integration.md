# Ch 7: Data Access and Integration (`data-access-and-integration`)

Part II · The Engagement · phase-num 7 · 3,500–4,500 words.

## p.goal draft
> Most of an FDE's time goes into reaching the customer's data and making it mean something, not into the model. Ask for read access in week one, build on fixtures while you wait, defer write-back, and give every connector an owner.

## STEPs

**7.1 What this phase is for, and how it fails.**
- Jarvis: "majority of our time in FDE getting things to production" is the "translation layer" (T2, Altimeter transcript).
- Qureshi's three steps: access via "data owners", cleaning, putting it where everyone can reach it (T4).
- Stanford: 77% of hardest challenges invisible costs; 59% data scattered across teams; success "required access" (T2, successes only).
- RAND #2 and #4 (T1, interviews; written about ML generally).
- Three failures: waiting for access; writing back too early; the unowned connector.
- Thin evidence: no measured time split exists; Jarvis is self-report.

**7.2 Composite beat (weeks 1–3).** Replica filed week 1; three approvers (claims-system owner, IT security, DPO); landed week 3; clock paused; sanitised fixtures + redacted export; ugly documents; write-back deferred, side table owned by the insurer feeds the existing queue view. Cites Alpine Edge fixtures, NHS FDP write-back, Qureshi data owners.

**7.3 The access request is a negotiation.** Name the approvers; ask for the minimum (read-only, named tables/fields, purpose, retention, end date); request the redacted export in parallel; the access ladder. Alpine Edge "Bring security and IAM into discovery" and "Separate read and write permissions; no credentials in code" (T4). Links: scoped credentials, permission-aware retrieval.

**7.4 Build on fixtures while you wait.** How to make fixtures shaped like the real thing; what they cannot tell you. RAND "They think they have great data…" legacy data built for compliance/logging (T1). Stanford "Messy data is not a blocker if you design around it", 6% data ready, 91% processed unstructured (T2, survivorship). Link: document parsing.

**7.5 The translation layer.** Jarvis: people "just stick the MCP connectors"; a "light… logic layer" (T2). What goes in it: field map, business glossary, joins, rules. Link: MCP servers in practice. Verified box: OpenAI healthcare FDE and Decagon postings (T4 / primary for what employers ask).

**7.6 Read first, write later.** NHS FDP: Mosley "more challenging than reading", manual write-back loses efficiency; Freeman (T3). The side-table pattern; when write-back is earned. Ch 8 named in prose.

**7.7 Integrations decay; give them an owner.** MD Anderson: "has not been updated to integrate with the current system" after the 2016 Epic move; "not in clinical use" (T3, UT audit via Network World). RAND #4: monitor whether a source "changes formats or fails to arrive promptly"; departing data engineers take knowledge (T1). Practice: schema contract tests, freshness alarm, named customer owner per connector.

**7.8 Template: data-access request** (blank + filled). Fields: purpose; workflow and metric served; systems and objects; fields in/out (minimised); access level; environment; identity; approvers; retention and deletion; residency; start/end; fallback while pending; write-back status; connector owner after handoff; sign-off.

**7.9 Failure signals** grid. **7.10 Ready to move on** list. Closing tip.

## Sources (re-fetched 2026-10-17)
- Jarvis/Altimeter https://www.youtube.com/watch?v=cBD7_R-Cizg (transcript) T2
- Qureshi https://nabeelqu.substack.com/p/reflections-on-palantir T4
- The Register https://www.theregister.com/2025/07/10/writeback_to_ageing_nhs_systems/ T3
- Network World https://www.networkworld.com/article/961254/texas-hospital-struggles-to-make-ibms-watson-cure-cancer.html T3
- Stanford https://digitaleconomy.stanford.edu/app/uploads/2026/03/EnterpriseAIPlaybook_PereiraGraylinBrynjolfsson.pdf T2
- RAND https://www.rand.org/content/dam/rand/pubs/research_reports/RRA2600/RRA2680-1/RAND_RRA2680-1.pdf T1
- Alpine Edge https://alpineedge.ch/blog/forward-deployed-ai-engineer-first-month T4
- OpenAI FDE Healthcare https://jobs.ashbyhq.com/openai/a4332746-163e-4506-b62a-90758fb7a950 ; Decagon https://jobs.ashbyhq.com/decagon/8c40fb7a-5f25-4112-a1df-f1c22b81042c T4
