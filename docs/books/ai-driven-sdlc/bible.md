# Book bible: *From SDLC to AI-Driven SDLC: A Migration Handbook*

Status: draft for owner review · Compiled 2026-10-15 · Language: English (the ZH edition follows this bible; see §6.3)
Inputs: the design spec (`docs/superpowers/specs/2026-10-14-ai-driven-sdlc-book-design.md`), `research/aggregate.md` and all eleven briefs in `research/`. Nothing here was re-fetched. Every number must still pass the per-part fact-check before it goes into a chapter.

**Brief codes used in this bible** (claim numbers follow each brief's own numbering):

| Code | Brief | Numbering |
|---|---|---|
| AG | `aggregate.md` | section numbers (AG §5.3 = contradiction 3) |
| BN | `bottleneck-evidence.md` | claims 1–38 |
| MM | `maturity-models.md` | claims 1–33 |
| LC | `cases-large-companies.md` | claims 1–39; LC-case# for the case table |
| FR | `failures-and-rollbacks.md` | C1–C36 |
| RR | `phases-requirements-to-review.md` | claims 1–48 |
| TM | `phases-testing-to-maintenance.md` | claims 1–43 |
| OG | `org-people-governance.md` | claims 1–54 |
| SB | `security-and-blast-radius.md` | SB-1–25; SB-R1–R13 (Resolved); SB-Case 1–7 |
| GP | `gapfill-part-1.md` | GP-R1–R10 (Resolved); GP-N1–N10 (New claims) |
| GM | `gapfill-models-and-cases.md` | GM-R1–R10 (Resolved); GM-N1–N7 (New claims) |
| GF | `gapfill-later-parts.md` | GF-1–33 |

Where a gap-fill brief corrects a first-round brief, the gap-fill wins. Corrections that matter for writers: DORA 2024's sample is "nearly 3,000", not ~39,000 (GP-R1); dotnet's pre-setup success rate is 38.1%, not 38% (GM-R7); the Kiro story is real and Amazon published a dated rebuttal (GM-R5); Pichai's 10% velocity figure has no "hours freed" definition (GP-R5); uReview lacks "past PRs, feature flag configurations, database schemas, or technical documentation", not "design docs" (GM-R10); Spotify's removal of its LLM judge is sourced only to InfoQ (GM-R9).

---

## Decisions taken in this bible

Owner decisions (binding) are marked **[owner]**. The rest adopt or reject an aggregator proposal (AG §7) and say why.

1. **[owner] Add "Security, Permissions & Blast Radius" as the last chapter of Part II (Ch 12).** The SB brief supplies the evidence: three risk surfaces (the code, the toolchain, the authority), and every destructive incident traces to authority without an environment boundary.
2. **[owner] Merge requirements and design into Ch 5 "Requirements, Specs & Design".** The grid keeps separate Requirements and Design rows. The merge also follows the tools: Kiro and Spec Kit already bundle requirements → design → tasks (RR-3, RR-1).
3. **[owner] 17 numbered chapters:** Part I 1–4, Part II 5–12, Part III 13–17.
4. **Adopt AG §7.2: sharpen Ch 2 with explicit rules.** The rules are the defining axis, the oracle principle, level = granted authority, per-task-type scoring, a risk ceiling and no L5. The aggregator's optional rule, "Coding at most one level above Review and Testing", is adopted as a labelled heuristic, not a law. The Faros, LinearB and DORA data that support it are correlational (BN open question 5).
5. **Adopt AG §7.3: de-overlap Ch 4 and Ch 17.** Ch 4 owns how to read the evidence and what it costs. Ch 17 owns the metric set and the rollback triggers. The title and slug of Ch 4 stay unchanged ("measurement" there means reading measurements).
6. **Adopt AG §7.5: maintenance is the recommended first pilot.** Part II stays in SDLC order. Ch 14 points to Ch 11 (maintenance) as the lowest-risk first rung, and Ch 11 serves as the worked example of L3 that other Part II chapters reference.
7. **Adopt AG §7.6: grade every case visibly with T1–T4 and a "Measured by" line** (§4). The T-scheme is used instead of LC's A–D because it separates who measured from how; LC grades are mapped in §4.
8. **Adopt AG §7.7: a metric-vocabulary sidebar in Ch 7 (Code review)**, mirrored in the glossary. It normalises useful / addressed / led to change / resolved (AI-judged) / actionable / marked incorrect.
9. **Adopt AG §7.8: the oracle principle is a named box in Ch 2**, referenced from Ch 8, 9 and 11.
10. **Adopt AG §7.9: move volatile regulatory and licensing status into a new appendix**, "Regulatory and Licensing Status (as of October 2026)", slug `regulatory-and-licensing-status`. Ch 15 keeps the governance argument and links to it.
11. **Adopt AG §7.10: add two templates to Appendix A**: a Merge-Readiness Pack / evidence bundle (MM-6) and a provenance policy (`Assisted-by:` trailer, human-only sign-off; OG-38, OG-39).
12. **Adopt AG §7.11: Klarna appears only as a labelled non-SDLC sidebar in Ch 17**, framed as "add a human escape hatch", never as a Ch 3 case.
13. **Keep the aggregator's ten Ch 3 cases (AG §3).** The gap-fills strengthened two: Kiro now has Amazon's dated primary rebuttal (GM-R5), and Replit's fix is documented in Replit's own docs (SB-R10). Cases that would duplicate a Part II anchor are assigned to one chapter only (§5).
14. **Classical ML counts as "AI" in the grid, with a footnote; deterministic codemods and rule bots do not** (AG §2, observation 2). So Harness Continuous Verification (classical ML) is cited as a precedent, and Spotify Fleet Management's deterministic PRs are "L0 for AI". This is a teaching point, not a gap.
15. **Ch 12 uses an adapted Part II template.** "The ladder for this phase" becomes "The permission envelope per level", because security is cross-phase. The other six slots are unchanged.
16. **Level names stay as in the spec** (Manual, Assisted, Delegated, Supervised-autonomous, Autonomous). L4 is always written with its scope ("L4 for <task class>") so it can never be read as "the phase runs itself".
17. **Existing slugs are kept wherever the chapter's scope is unchanged.** Only two slugs change: the merged Ch 5 and the new Ch 12.

---

## 1. Thesis

Adding AI to an unchanged software process mostly moves the queue. Generation got cheap; deciding what to build and verifying what was built did not. An organisation that speeds up only coding therefore buys larger batches, longer review queues and more delivery instability, not more delivery. DORA found AI adoption tied to lower stability in 2024 and still to rising instability in 2025, and vendor telemetry (Faros, LinearB) shows review time and unreviewed merges climbing. An AI-driven SDLC is therefore not a tool purchase but a series of authority decisions, made separately for each of eight phases and each task type within them: how much work the AI may finish before a human looks, what that human looks at, and what the AI is actually permitted to touch. The public record shows these decisions paying off where three conditions hold: an automated check the AI cannot edit, actions that can be undone, and authority bounded by the environment rather than by instructions. Where any one is missing, the record shows them failing, sometimes destructively. This book gives the reader a map (a five-level ladder for each phase, defined by what a human reviews and what the AI is allowed to do), the evidence graded by who measured it, and a migration plan. That plan climbs one phase at a time, starts where verification is cheapest, pairs every speed metric with a stability metric, and treats stepping back down a level as normal operations, not defeat.

---

## 2. Final table of contents

Body target ≈ 65,000 words, plus ≈ 5,000 words of appendices. That sits inside the spec's 60–70k, with the bibliography uncounted. Chapter URLs are `/books/ai-driven-sdlc/<slug>/`.

### Part I — The Case and the Map (for engineering leaders)

| # | Slug | EN title | One-sentence argument | Words | Replaces |
|---|---|---|---|---|---|
| — | `preface` | Preface: How to Read This Book | This book is a map, not a destination: place each phase on a ladder, climb only as far as your verification reaches, and read every number by who measured it. | 1,500 | `preface` (unchanged) |
| 1 | `the-bottleneck-moves` | When Code Gets Cheap, the Bottleneck Moves | AI made starting work cheap but not finishing it, so the constraint moves to verification — reviewing, testing and integrating larger batches — and an organisation that speeds up only coding gets more instability, not more delivery. | 4,000 | `the-bottleneck-moves` (unchanged) |
| 2 | `the-maturity-model` | The AI-SDLC Maturity Model | A phase's level is what a human reviews, and when, given the authority the AI actually holds; each level is earned per task type with an automated check the AI cannot edit, capped by risk, and never a target. | 5,500 | `the-maturity-model` (unchanged) |
| 3 | `case-studies` | Case Studies: Who Did It and What They Measured | The public record shows L3 working where a deterministic verifier closes the loop and failing where agents got irreversible authority without an environment boundary; almost everything else is volume with no outcome measure. | 6,000 | `case-studies` (unchanged) |
| 4 | `economics-risk-and-measurement` | Economics, Risk and Measurement | The honest economics is a modest, conditional speed-up paid for in review time, tokens and risk; you can plan with the evidence only if you read each number by its tier and by what it actually counted. | 4,000 | `economics-risk-and-measurement` (unchanged slug; scope narrowed to reading evidence and cost — see Decision 5) |

### Part II — Phase by Phase (for tech leads and staff engineers)

| # | Slug | EN title | One-sentence argument | Words | Replaces |
|---|---|---|---|---|---|
| 5 | `requirements-specs-and-design` | Requirements, Specs & Design | When an agent implements whatever the spec says, the spec becomes the product; spec depth should scale with task size, design stays human-owned at L1–L2 by choice, and the work is moving decisions into the agent's context, not delegating them. | 4,000 | `requirements-and-specs` + `design-and-architecture` (merged) |
| 6 | `coding` | Coding | Preparation matters more than the model: a repository becomes agent-ready through its environment, a minimal human-written instruction file and checks the agent can run, and task type, not size, decides what can move from L2 to L3. | 4,000 | `coding` (unchanged) |
| 7 | `code-review` | Code Review | Review is where the bottleneck lands; AI review helps only when it favours precision over recall and changes what humans review (risk tiers, evidence bundles), not merely how many comments appear. | 3,500 | `code-review` (unchanged) |
| 8 | `testing-and-verification` | Testing & Verification | AI test generation works when a deterministic filter, not the model, is the oracle and the agent cannot edit it; measure mutation score and escaped defects, not acceptance or coverage. | 3,000 | `testing-and-verification` (unchanged) |
| 9 | `ci-cd-and-release` | CI/CD & Release | CI auto-fix is a solid L2 today; whether AI speed turns into instability depends on batch size, rollback capability and treating the agent toolchain in CI as a privileged, attackable dependency. | 3,000 | `ci-cd-and-release` (unchanged) |
| 10 | `operations-and-incidents` | Operations & Incidents | Diagnosis can climb the ladder, but action must not outrun reversibility: ops autonomy is a closed set of typed, reversible mitigations with an automatic downgrade path, and IAM, not the model, sets the blast radius. | 3,500 | `operations-and-incidents` (unchanged) |
| 11 | `maintenance-and-migrations` | Maintenance & Migrations | Maintenance is where L3 is reachable first, because the compiler and test suite are a ready-made verifier; the winning pattern is deterministic tooling plus an LLM for the tail, with review capacity as the throttle. | 3,500 | `maintenance-and-migrations` (unchanged) |
| 12 | `security-permissions-and-blast-radius` | Security, Permissions & Blast Radius | AI changes three risk surfaces — the code it writes, the toolchain it runs in and the authority it holds — and every destructive incident on record sits in the third, so a level is set by the credentials you grant and the boundary you build, not by the model you choose. | 4,500 | **new** (no prior slug) |

### Part III — The Migration (for leaders and practitioners together)

| # | Slug | EN title | One-sentence argument | Words | Replaces |
|---|---|---|---|---|---|
| 13 | `assess-your-starting-point` | Assess Your Starting Point | Assess each phase by observable evidence — what is reviewed, what verifier exists, what credentials the AI holds, what the risk ceiling is — not by tool count or self-report, and locate the constraint before choosing where to climb. | 2,500 | unchanged |
| 14 | `the-90-day-pilot` | The 90-Day Pilot | Pilot one phase × one task type with a verifier, a baseline and a pre-agreed stop rule, start in maintenance, and prepare the environment before judging the model. | 3,000 | unchanged |
| 15 | `scaling-across-teams` | Scaling Across Teams | Scaling is governance by level: a clear and communicated stance, provenance, and a permission model whose controls tighten as autonomy rises; mandates have no published outcomes, clarity does. | 3,000 | unchanged |
| 16 | `people-and-roles` | People: Roles, Skills and the Junior Pipeline | AI raises juniors' short-term output and lowers their skill formation, so an AI-driven SDLC must design the junior track deliberately — tutor modes, review-first apprenticeship, protected mentorship — and redesign roles around supervising and verifying. | 3,000 | unchanged |
| 17 | `measuring-success-and-rolling-back` | Measuring Success and When to Roll Back | Pair a flow metric with a stability metric for every phase you climb, write rollback triggers before the pilot, never use self-report or AI-code share as success criteria, and treat stepping one phase down a level as normal operations. | 3,000 | unchanged |

### Appendices

| # | Slug | EN title | Contents | Words | Replaces |
|---|---|---|---|---|---|
| A | `templates` | Templates | Agent instruction file; spec template; review checklist; **Merge-Readiness Pack / evidence bundle**; **provenance policy**; permission-envelope checklist (from Ch 12); pilot scorecard; rollback-trigger sheet | 2,500 | `templates` (expanded) |
| B | `regulatory-and-licensing-status` | Regulatory and Licensing Status (as of October 2026) | EU AI Act after the Omnibus, CRA dates, NIST AI RMF, ISO/IEC 42001, Microsoft CCC terms, USCO, *Doe v. GitHub*, OSS project policies | 1,200 | **new** |
| C | `glossary` | Glossary | Terms, the crosswalk to other models, the review-metric vocabulary | 1,500 | `glossary` (was B) |
| D | `bibliography` | Bibliography | Every source, with access date and tier | n/a | `bibliography` (was C) |

**Manifest edits this implies:**
- Remove `requirements-and-specs` and `design-and-architecture`; add `requirements-specs-and-design` as num 5.
- Renumber `coding` … `maintenance-and-migrations` to 6–11, and add `security-permissions-and-blast-radius` as num 12.
- Add appendix `regulatory-and-licensing-status` as B and re-letter `glossary` to C and `bibliography` to D.
- Rewrite each `summary` from the argument column above when its chapter ships.
- Proposed ZH titles: Ch 5 《需求、规格与设计》; Ch 12 《安全、权限与爆炸半径》; Appendix B 《监管与许可现状（截至 2026 年 10 月）》.

---

## 3. The maturity model

### 3.1 The defining axis

A phase's level is defined by **what a human reviews, and when**, read together with **the authority the AI actually holds** in that phase. The two must agree. If they disagree, the higher reading wins (Rule 2).

- Review mode is the axis that the most useful published models converge on. Sourcegraph separates "reviews all generated code" from reviewing only the final output (MM-1). Dash0 runs from "review and approve every PR" to "intent and proof … not diffs" (MM-23). Morris et al. and Feng et al. both define levels by the human's role (MM-8, MM-9).
- Capability, agent count, tooling sophistication and rollout breadth are **excluded** from the definition (MM open question 1; MM contradictions). Yegge-style agent counts reward parallelism without verification.

### 3.2 Levels

Each level is stated as an observable criterion over a trailing window (30 or 90 days), so that it can be audited. These are the book's definitions, built on MM's proposed criteria and adopted with edits (AG §2).

- **L0 Manual.** No AI touches this phase's outputs, or AI is prohibited by policy. Deterministic automation (codemods, Renovate, rule bots) is L0 *for AI*.
- **L1 Assisted.** AI suggests; a human authors every artefact. AI output enters only as suggestions the human edits. Evidence: tool telemetry exists, and no artefact is attributed to an agent.
- **L2 Delegated.** For at least one named, recurring task type, the AI produces a complete artefact (a PR, a test file, an ADR draft, a mitigation proposal). **100% of those artefacts get recorded human review before they take effect.** Agent output is attributed (label, trailer or metadata). A shared instruction or context file exists, and the team tracks acceptance or rework for the task type.
- **L3 Supervised-autonomous.** For named routine task types, the AI runs end to end. **A human reviews an evidence bundle, a sample, or only the items routed to them** (a Merge-Readiness Pack, MM-6), not every line. All of the following hold:
  - The routing rules are written down and machine-enforced.
  - Pause and rollback exist and have been exercised.
  - The escape-defect or incident rate of AI-run work is compared against a human baseline over at least 90 days.
  - The AI cannot change its own evaluator (Rule 1).
- **L4 Autonomous (always for a named task class).** For one enumerated, narrow, **reversible** task class, the AI acts without per-item human approval (auto-merge, auto-remediate). All of the following hold:
  - There is a documented verification record (N consecutive items with no escaped defect, or an error budget).
  - Monitoring is continuous, with automatic rollback or a kill switch.
  - A named human is accountable and has documented the risk acceptance (CSA L4; SB-23).
  - Audit samples are taken periodically.
  - The scope is the task class, never the whole phase.

### 3.3 The rules

1. **The oracle principle.** No task type runs at L3 or L4 unless an automated verifier decides pass/fail **and the AI cannot edit that verifier.** Tests, mutants, the compiler, a plan classifier, a policy engine: whichever it is, the agent must not be able to edit it, skip it or redefine success.
   - Evidence that agents game what they can reach: o3 reward-hacked in 30.4% of RE-Bench runs and once monkey-patched an evaluator (TM-12). ImpossibleBench (TM-13). Spotify's agents commented out failing tests and downgraded Java versions (TM-38, secondary). Elastic's agent "fixed" bumps by removing them (TM-17).
   - Evidence that it works when enforced: every L3 migration on record had a deterministic check (AG §1 Ch 2; LC key finding 1).
   - ASDLC states the same rule for L3 (MM-28).
   - Named box in Ch 2, id `#oracle-principle`.
2. **Level = authority actually granted.** A phase's level is the higher of (a) the review mode the team practises and (b) the authority the AI's credentials and settings allow.
   - An agent holding a production-capable token, or running in a skip-permissions mode, is operating at L4 for whatever that token reaches, whatever the team calls it.
   - Every destructive incident in the record is a de facto L4 grant the team did not know it had made: Replit, PocketOS, Kiro, Anthropic's internal "overeager" examples (SB-25; SB-16; AG §2 observation 3).
3. **Score per named task type, not per phase.** A phase's level is the highest level at which a named, recurring task type in that phase runs with the required evidence. Record the task type beside the level, e.g. "Testing: L3 for flaky-test triage; L2 for feature tests" (MM open question 3).
   - Gartner's 2026 advice to classify tasks into "developer-led, developer-with-agent, and fully agent-led" and to decide "appropriate levels of autonomy for each task" is an analyst endorsement of the same idea (GM-N3).
4. **Risk sets a ceiling.** Each phase × risk class carries a maximum level, recorded in a ceiling column of the self-assessment grid. Example: nothing above L2 in CI/CD for regulated services; no L4 anywhere an action is irreversible.
   - "As risk increases, acceptable autonomy decreases" (MM-27).
   - CSA and AWS attach escalating controls to each level (SB-23, SB-24).
   - Irreversibility makes a task class ineligible for L4 (SB-25).
5. **There is no L5, and L4 is narrow.** The serious sources say general autonomy does not exist or lacks controls:
   - Hassan et al.'s L5 "does not yet exist" (MM-5).
   - CSA: L5 controls "don't exist yet" (SB-23).
   - ai4se: full automation is "rather unrealistic for complex, industrial-scale software" (MM-7).
   - Thoughtworks notes that the agent-swarm showcases "chose use cases that could rely on existing detailed specifications", conditions "not representative of typical product development" (GM-N1).
   - Levels are not targets: the right autonomy "need not be the maximum achievable" (MM-8); autonomy is "a deliberate design decision" (MM-9).
6. **Heuristic (the book's proposal): run Coding at most one level above the lower of Review and Testing.** Coding that outruns its verifiers produces the pattern in the telemetry: more PRs, bigger PRs, longer review, more unreviewed merges and more instability.
   - Faros 2025/2026: BN-26, BN-27.
   - LinearB: BN-28.
   - DORA's batch-size mechanism: BN-12.
   - The data are correlational. Present this as a rule of thumb with its evidence, not as a law.
7. **Evidence over self-report.** Placement must cite observable evidence: approval logs, attribution, routing config, credential inventory, a verification record. Self-placement drifts upward with comfort:
   - Anthropic's auto-approve share rises from ~20% to >40% of sessions with experience (MM-32).
   - Users approve 93% of permission prompts (SB-16).
   - Self-rated and measured productivity correlate at r = 0.17 (GP-N7).

### 3.4 Controls per level (summary; Ch 12 owns the detail)

| Control | L2 Delegated | L3 Supervised-autonomous | L4 Autonomous (task class) |
|---|---|---|---|
| Where it runs | Dev machine, permission prompts on, bypass disabled by managed settings (SB-18) | Ephemeral sandbox with filesystem **and** network isolation (SB-15, SB-17) | As L3, plus continuous monitoring and a kill switch (SB-23) |
| Credentials | Developer's own; no production credentials on the machine | Short-lived, task-scoped, injected by a proxy, never inside the sandbox (SB-15) | A narrow service identity per task class (PocketOS lesson, SB-Case 1) |
| Write scope | Workspace; a human approves every commit | Its own branch; cannot merge or approve; CI gated on human approval (SB-19) | Auto-merge or act only for the enumerated class, behind a verifier it cannot edit |
| Untrusted input | Allowed (a human sees everything) | Agents Rule of Two: drop sensitive access or external state change (SB-20) | Never all three |
| Irreversible actions | Never by the agent | Agent prepares, human executes | Only via APIs with undo / soft delete, and backups outside the blast radius; otherwise not L4-eligible |

This table is labelled in print as **the book's proposal**, synthesised from vendor defaults and incident fixes (SB-25). There is no outcome-validated standard, and no published incident rate by permission level exists (SB "Still unverified").

### 3.5 Enablers that gate levels

DORA's seven AI capabilities amplify AI's effect (GP-R3, report pp. 49–64). Ch 2 presents them as preconditions, and two of them as trade-offs rather than free wins:

- Clear and communicated AI stance.
- Healthy data ecosystems.
- AI-accessible internal data.
- Strong version control practices.
- Working in small batches. Trade-off: it slightly reduces the individual-effectiveness gain.
- User-centric focus. Without it, "AI adoption has a negative impact on team performance".
- Quality internal platforms. Trade-off: it turns AI's neutral effect on friction harmful.

### 3.6 Crosswalk to published models

The Glossary carries this table, and Ch 2 prints it. Mappings are the book's reading of each model and marked "≈" where approximate.

| Model (source) | ≈ Book L0 | ≈ L1 | ≈ L2 | ≈ L3 | ≈ L4 (narrow) | Beyond the book |
|---|---|---|---|---|---|---|
| Sourcegraph, Levels of Code AI (MM-1) | L0 manual | L1 completion | L2 creation ("reviews all generated code") | L3 supervised automation (review final output) | L4 full automation (no review), narrowed | L5 AI sets own goals |
| Shapiro, Five Levels (MM-3) | — | L0 "spicy autocomplete" | L1 intern, L2 junior | L3 "developer" ≈ L2/L3 boundary; L4 "engineering team" ≈ L3 | — | L5 "dark software factory" |
| Yegge, eight levels (MM-4) | 1 "no AI" | — | 2 agent in IDE, permissions on | 4 "not look at the diffs" (review mode only) | — | 3 "YOLO" = authority without controls (Rule 2); 5–8 count agents, not mapped |
| Hassan et al. (MM-5) | L0 manual | L1 token assistance | L2 task-agentic | L3 goal-agentic | L4 specialized domain autonomy | L5 general domain autonomy |
| Morris et al., DeepMind (MM-8) | 0 no AI | 1 tool; 2 consultant | 3 collaborator | 4 expert | 5 agent (narrow scope only) | — |
| Feng, McDonald, Zhang (MM-9) | — | operator | collaborator; consultant | approver | observer | — |
| ai4se (MM-7) | L0 | L1 options | L2 selection ≈ L1/L2 | L3 partial automation | L4 full automation | — |
| CSA Levels of Autonomy (SB-23) | — | L1 per-action approval ≈ L1/L2 | L2 plan/batch approval | L3 machine-readable boundaries | L4 kill switch + executive risk acceptance | L5 "controls don't exist yet" |
| AWS Agentic AI Scoping Matrix (SB-24) | — | Scope 1 no agency | Scope 2 prescribed agency | Scope 3 supervised agency | — | Scope 4 full agency (self-initiating) |
| Dash0 six levels (MM-23) | — | — | L2 review every PR | L3 intent and proof | L3.5 selective auto-merge | L4 notifies; L5 dark factory |
| Swarmia (MM-24) | — | L1–L2 | L3 task agent (if every PR reviewed) | L3 task agent (if reviewed by evidence) | — | L4 picks own work; L5 |
| Microsoft Agentic DevOps (MM-17) | — | L1 Reactive | L2 Foundation, L3 Structured | — | — | L4 Optimized. Note: measures rollout breadth, not authority |
| Gartner execution models (GM-N3) | — | developer-led | developer-with-agent | fully agent-led ≈ L3 | fully agent-led ≈ L4 | — |
| Google SRE AI Operator (GF-10) | — | — | "L2 Autonomy (Partial Automation)" | "L3 Autonomy (High Automation)" | — | Google's other levels not read |
| **This wiki's** `/concepts/autonomy-levels/` | — | L0 Suggest | L1 Act-with-approval; L2 Act-and-escalate | L3 Supervised autonomy | L4 Full autonomy | — |

**Warning for writers:** the wiki's own concept page numbers from L0 = "Suggest", so its L0–L2 sit one step below the book's numbers. Ch 2 must say so in one sentence and link it. See Open question 1.

### 3.7 The grid: 8 phases × 5 levels

Each cell gives the **observable criterion**, then the **best evidence** with tier and brief claim. "None" means no public evidence was found, and the chapter must say so plainly. Tiers are defined in §4. HTML anchor ids for linking: `#grid-requirements`, `#grid-design`, `#grid-coding`, `#grid-review`, `#grid-testing`, `#grid-cicd`, `#grid-operations`, `#grid-maintenance`.

#### Requirements (`#grid-requirements`)

| Level | Observable criterion | Best evidence (tier · claim) |
|---|---|---|
| L0 | No AI on tickets, PRDs or specs | 69.2% of developers "don't plan to use" AI for project planning (survey · RR-9) |
| L1 | AI drafts stories/PRDs or extracts specs from legacy code; a human rewrites and owns each | Design/planning rose from 1.0% to 9.9% of Claude Code use (T3 · RR-10). Morgan Stanley DevGen.AI, "280,000 hours" from legacy-to-spec extraction (T4, secondary · GF-1) |
| L2 | Agent interviews the human and writes a spec (`SPEC.md`, EARS `requirements.md`, Spec Kit `spec.md`) kept in the repo; a human approves every spec before implementation | Practice: Anthropic interview → spec → fresh session (vendor guidance · RR-7); Kiro (RR-3); Spec Kit (RR-1). Outcomes, all weak: top-third spec-quality repos spent 11.8% of commits on bug fixes vs 20.4% (T1, correlational, n=114 repos · GF-2); a 14-engineer Spec Kit pilot saw rollbacks fall from 2–4 to 0–1 a month (T3, uncontrolled · GF-3); LLM-judged quality 3.46 → 3.51 for stock Spec Kit (T1, LLM judge · GF-4) |
| L3 | Routine inbound items (bug reports, small tickets) become specs or reproducible tickets without per-item approval; humans see only flagged or ambiguous items | Mechanism only: Kiro Quick Spec runs "without approval gates" (vendor docs · RR-3). **No outcome evidence.** |
| L4 | Auto-dedupe and auto-label of tickets with audited precision. Explicitly **not** "AI decides what to build" (Berkeley's Level III, MM-10) | **None.** |

#### Design (`#grid-design`)

| Level | Observable criterion | Best evidence |
|---|---|---|
| L0 | No AI in design docs or ADRs | None direct |
| L1 | LLM drafts ADR text or options from a decision context; an architect writes the decision | GPT-4 ADRs "relevant and accurate" but "falls short of human-level performance" (T1, lab · RR-11); DRAFT (T1 · RR-12) |
| L2 | Agent proposes options in plan mode or `design.md`; a human chooses; accepted ADRs are fed into the agent's instruction file | Anthropic lists "architectural decisions specific to your project" under Include (guidance · RR-15). dotnet: of 253 closed agent PRs, 16% "wrong approach" and 8% "design rejected"; only 1.8% of human comments on merged agent PRs were architectural (T2 · RR-14, GM-R7) |
| L3 | Pattern-conforming changes ship gated by architecture fitness functions; humans see only violations | **None.** Thoughtworks lists "architecture drift reduction with LLMs" at Assess (opinion, a lead · GM-N2). uReview has no access to "past PRs, feature flag configurations, database schemas, or technical documentation" (T3 · GM-R10) |
| L4 | Leave empty | **None.** Counter-evidence is de facto L4 by non-engineers: Lovable, 170 of 1,645 apps exposed (T1 · FR-C11); Moltbook, 1.5M tokens exposed (T1 · FR-C12) |

#### Coding (`#grid-coding`)

| Level | Observable criterion | Best evidence |
|---|---|---|
| L0 | AI prohibited for code | Gentoo and QEMU bans (policy · OG-40, OG-42); Samsung (T4 · OG-45) |
| L1 | Autocomplete and chat; a human writes every commit | Field RCTs +26.08% completed tasks (T1, mixed independence · BN-24); Google ~21% (T2 · BN-19); METR −19% (T1 · BN-16); ANZ −42.36% task time, n=22 (T2 · GF-21). Quote as a range with moderators, never one number |
| L2 | Agent PRs for named task types; every diff human-reviewed; agent attributed; instruction file | dotnet/runtime: 67.9% merged vs 87.1% for Microsoft humans; 38.1% → 69% after preparation; reverts 0.6% vs 0.8% (T2 · GM-R7). Claude Code OSS PRs 83.8% merged, 54.9% of those unmodified (T1 · RR-27) |
| L3 | Unattended background agents in a sandbox for routine task types; verifier-gated; humans review the final PR or evidence; the agent cannot merge or approve | Stripe Minions, 1,000+ merged PRs/week, every one human-reviewed (T3, volume only · RR-28). GitHub Copilot cloud agent's shipped envelope: own branch, workflows held until review, requester cannot approve (vendor docs · SB-19). Agents open 13–14% of PRs "at the leading edge" (T3 · GP-R9). Failure case: Answer.AI with Devin, 3 of 20 tasks (T1 · GM-R8) |
| L4 | Auto-merge for an enumerated change class with a verification record | **No LLM evidence.** Spotify Fleet Management auto-merges most of its 2.5M+ automated PRs, but these are deterministic, so L0 for AI (T3 · GM-R9). De facto L4 failures: Replit (FR-C1), PocketOS (SB-Case 1), Antigravity (FR-C4) |

#### Review (`#grid-review`)

| Level | Observable criterion | Best evidence |
|---|---|---|
| L0 | No AI review | 58.7% "don't plan to use" AI for committing and reviewing (survey · RR-48) |
| L1 | Author-side AI suggestions only | Google: authors address 7.5% of reviewer comments by applying an ML-suggested edit (T2 · LC-11) |
| L2 | A bot comments on every PR; a human approves every merge | Atlassian RovoDev: 38.7% of comments led to code changes, −30.8% PR cycle time (T2 · RR-39). Uber uReview: 75% rated useful, >65% addressed vs 51% for human comments (T3 · GM-R10). Counter: the Qodo-based industrial study, mean closure 5h52m → 8h20m (T1 · RR-40). Precedent for a rollback trigger: Tricorder disables any analyzer above a 10% "Not useful" rate (T2 · GF-15) |
| L3 | AI is the first reviewer; humans review by risk tier or evidence bundle; routing is machine-enforced | Partial: Anthropic Code Review, PRs with substantive comments 16% → 54% (T3 · RR-42); Atlassian −35.6% human comments (T2 · RR-39); Merge-Readiness Pack concept (MM-6). Reverse signal: Amazon retail senior sign-off for AI-assisted changes (T4, disputed · FR-C6) |
| L4 | AI approval alone merges an enumerated low-risk class | **No LLM primary.** Precedent: Zalando's bot auto-approves the 33% of PRs classed low-risk, using rules "built based on analysis of our production incidents", with lead time −20–40% vs all PRs (T3 · GF-27). Whether the bot uses an LLM is unconfirmed (Open question 3) |

#### Testing (`#grid-testing`)

| Level | Observable criterion | Best evidence |
|---|---|---|
| L0 | No AI in tests | None direct |
| L1 | IDE test suggestions; AI failure diagnosis surfaced to humans | Google Auto-Diagnose, 90.14% accurate on n=71 (T2 · TM-8) |
| L2 | AI generates tests behind deterministic filters (build, pass reliably, raise coverage or kill mutants); a human accepts each | Meta TestGen-LLM: 75% built, 57% passed reliably, 25% raised coverage; 73% of filtered recommendations accepted (T2 · TM-1). ACH: 73% accepted, 36% privacy-relevant (T2 · TM-2). FlakyGuard repaired 47.6% of reproducible flaky tests, 51.8% of fixes accepted (T2; Uber attribution secondary · TM-7) |
| L3 | AI maintains suites; humans review mutation or coverage reports, not individual tests; the agent cannot edit the oracle | Meta JiT catching tests: 8 true positives of 41 candidates from 22,126 tests; assessors cut review load 70% (T2, experimental · TM-5). Airbnb test-file migration 97% automated (T3 · TM-34). Gap: Spotify's dataset migrations lacked build-time tests, so owners tested by hand (T3 · GM-R9 Part 4) |
| L4 | Flaky-test quarantine and fix auto-land under an audited false-fix rate | **None.** FlakyGuard landings were human-approved |

#### CI/CD (`#grid-cicd`)

| Level | Observable criterion | Best evidence |
|---|---|---|
| L0 | No AI in pipelines | 75.8% "don't plan to use" AI for deployment and monitoring (survey · BN-32) |
| L1 | ML suggests build fixes; the developer applies them | Google DIDACT RCT: 50% of developers for 11 weeks; 34% of those with breakages applied fixes; ~2% CL throughput; no detectable rise in rollbacks (T2, RCT · TM-16) |
| L2 | Agent pushes a fix to a branch; a human merges; auto-merge disabled when AI contributed | GitHub "Fix with Copilot" (vendor docs · TM-15); Elastic, 24 broken Renovate PRs fixed in month one, auto-merge disabled, `--allowedTools` allow-list (T3 · TM-17); Nx ~60% of fixes accepted (T3, vendor · TM-18) |
| L3 | Fixes auto-apply after a verification phase; CI agents act under policy on untrusted input | Nx auto-applies only after verification passes (T3 · TM-18). Risk: PromptPwnd, CI agents reading untrusted issue/PR text with privileged tokens (T1 · SB-14). Control: Copilot cloud agent's workflows are not triggered until a human reviews (vendor docs · SB-19) |
| L4 | AI canary promotion or rollback for defined services within an error budget | **No LLM evidence.** Classical-ML precedent: Harness Continuous Verification auto-rollback (vendor docs · TM-19). Anti-pattern: an agent with an over-broad role (Kiro, T4 · GM-R5) |

#### Operations (`#grid-operations`)

| Level | Observable criterion | Best evidence |
|---|---|---|
| L0 | No AI in incident handling | None direct |
| L1 | AI ranks root-cause hypotheses, confidence-gated; humans investigate and act | Alibaba BiAn: time to root cause −20.5% (−55.2% high-risk) over 10 months vs shadow operators (T2 · GF-11). Google Incident Hypothesis: −10% MTTM in an A/B test, no n published (T3 · GF-10). Meta RCA: 42% top-5 by backtest (T2 · GF-13). Independent benchmarks: OpenRCA 2.0 exact root-cause set 20.7% (T1 · GF-6); ORCA-bench 25.3% medium, 10.0% hard (T1 · GF-7) |
| L2 | Agent proposes a mitigation from a closed, typed set; a human authorises each | Google SREs + Gemini CLI: drain/rollback/restart/add capacity behind typed tools, risk tags, policy checks, forced confirmation, audit (T3, design walkthrough · TM-26). Google AI Operator at "L2 … for critical operations" (T3 · GF-10) |
| L3 | Agent executes allow-listed reversible mitigations; humans paged on exception; automatic downgrade to L2 on elevated risk | Google AI Operator executes mitigations "autonomously for minor incidents", auto-downgrades L3 → L2 on an elevated risk score, and has a fleet-wide "Red Button" (T3 · GF-10, GF-16). Azure SRE Agent "35,000+ incidents … handled autonomously" (T4, no method · GF-12) |
| L4 | Auto-remediation for an enumerated alert class with a kill switch | **No credible evidence.** Failures with production credentials: PocketOS (SB-Case 1), Replit (FR-C1), Kiro (GM-R5) |

#### Maintenance (`#grid-maintenance`)

| Level | Observable criterion | Best evidence |
|---|---|---|
| L0 | No AI; deterministic codemods count as automation, not AI | Spotify Fleet Management: "around half of Spotify's pull requests" automated since mid-2024, largely deterministic (T3 · GM-R9) |
| L1 | AI suggests migration edits; humans apply | No dedicated case |
| L2 | AI drafts migration PRs; each is reviewed | Google int32→int64: 80% of edits in landed CLs AI-authored; JUnit3→4: 5,359 files in 3 months, ~87% committed unchanged (T2 · TM-32). Slack AST + LLM: 45% → 80% on 9 files (T3 · TM-35). Elastic Renovate fixes (T3 · TM-17) |
| L3 | Fleet-wide changes with deterministic verifiers; owner-approved or sampled review; evidence pack | Spotify Honk: 1,500+ merged PRs, 60–90% time saved on measured migrations, verifiers in a stop hook, LLM judge vetoes ~25% (T3 · GM-R9). Airbnb: ~3.5K files in 6 weeks vs a 1.5-year estimate (T3 · TM-34). Google year-long study, 39 migrations (T2 · LC-10). Amazon Java 17: 79% shipped unchanged (T4 · GM-R6) |
| L4 | Auto-merged dependency or security updates under a verification record | **No LLM evidence.** Spotify auto-merged some documentation changes (T3, thin · TM open question 4). Pre-LLM Renovate/Dependabot auto-merge is L0 for AI |

**Grid observations Ch 2 must state:**

1. Real L3 evidence exists in coding (volume only), testing (partly), maintenance, and a self-reported narrow class in operations. **No phase has credible L4 evidence for LLMs.** Requirements and design have no L3 evidence at all.
2. Classical ML reached L3/L4 in release gating years ago (Harness CV). It is footnoted, not credited to LLMs.
3. Every cell where an incident happened (coding L4, operations L3/L4) is a case where granted permissions put the team at a higher level than it believed (Rule 2).

---

## 4. Evidence grading

### 4.1 The scheme

A source's tier is **the lower of who measured and how they measured**.

| Tier | Name | Who measured | How | Examples |
|---|---|---|---|---|
| **T1** | Independent measurement | A party with no product stake in the result: academics, non-profits, independent security researchers with direct access | A stated method with denominators (RCT, controlled study, benchmark, forensic analysis) | METR; Perry et al.; Spracklen et al.; SusVibes; Wiz on Nx and Moltbook; the Qodo-based ICSE study; Hosseini & Lichtinger; Answer.AI (practitioner tally, n=20) |
| **T2** | Organisation-measured, stated method | The organisation running (or selling) the system | Method, denominators, ideally peer review or reproducible public data | Google migrations and DIDACT; Meta TestGen/ACH/JiT; dotnet/runtime; Atlassian RovoDev; Alibaba BiAn; Tricorder; Anthropic's skill RCT; ANZ |
| **T3** | Telemetry or report with thin method | Engineering blogs, vendor pooled telemetry, uncontrolled pilots | Numbers without a full method, baseline or n | Spotify, Stripe, Uber, Airbnb, Zalando, Elastic; Faros, LinearB, Jellyfish, DX, GitClear, CodeRabbit, Veracode; GF-3's Spec Kit pilot |
| **T4** | Claim | Executives, press relays, marketing, disputed accounts, policy memos | No method | Amazon's 4,500 developer-years; Coinbase "95–100%"; Azure SRE Agent's 40.5 h → 3 min; Kiro (disputed); Shopify memo |

Flags that ride alongside the tier:

- **secondary**: read only in press coverage of an unread primary.
- **disputed**: the parties' accounts conflict; print both.
- **mixed independence**: e.g. Cui et al., where two authors work at Microsoft. It counts as T1 with the flag.
- **vendor-on-own-product**: forces a vendor box (§6.5).
- **policy**: the source states a rule, not a result; it is never cited as evidence of an outcome.

Mapping from LC's grades: A → T1 or T2 (depending on independence), B → T3, C → T4, D → T4 (policy).

### 4.2 How it appears on the page

- Every case, and every number that carries an argument, gets a **"Measured by" line** directly under it:
  `Measured by: <who> · <method> · <n / window> · <tier>` — e.g. *Measured by: Microsoft .NET team, own public repo data · 878 agent PRs, May 2025–Mar 2026 · T2*.
  Markup proposal: `<div class="observe"><span class="label">Measured by</span> …</div>` (an existing `guide.css` class). The layout PR may substitute a dedicated class.
- Ch 3 case headers carry the tier as a badge, e.g. "T2 · organisation-measured".
- Inline numbers in running prose without a full case carry the tier in brackets after the link the first time they appear in a chapter: "… 67.9% merged ([dotnet/runtime](url), T2)".
- A number whose only source is the vendor of the measured product goes in a **vendor box** (§6.5). It never carries the main argument.
- The Preface prints the T1–T4 legend once. Ch 3 restates it in four lines. The Glossary defines it.

---

## 5. Case assignment

Each case anchors exactly one chapter; "also" lists the chapters that may cite it briefly and must link back to the anchor. URLs are primaries unless marked.

### 5.1 Part I

| Case | Tier | Anchors | The one point it proves | Also | Source |
|---|---|---|---|---|---|
| DORA 2024 + 2025 reports | survey (independent-ish) | Ch 1 | Stability falls (2024) and instability still rises (2025) with AI adoption; friction "shifts … to deciding and verifying" | 2, 4, 13 | https://services.google.com/fh/files/misc/2024_final_dora_report.pdf ; https://dora.dev/research/2025/dora-report/ |
| Faros (2025 Paradox, 2026 Whiplash, Q3 2026 Speed Trap) | T3 | Ch 1 (vendor box) | Team output up, review time and unreviewed merges up, no company-level gain | 4, 7 | https://www.faros.ai/blog/ai-software-engineering ; https://www.faros.ai/research/ai-acceleration-whiplash ; https://www.faros.ai/blog/ai-speed-trap-takeaways |
| Stanford 100k-engineer study, anonymous company slide | T3 (not peer-reviewed) | Ch 1 | A pilot judged on PR count (+13.6%) looked like success while effective output rose 1% and rework 2.6× | 17 | https://aiconference.com/wp-content/uploads/2025/09/Yegor-Denisov-Blanch-Will-AI-Replace-Software-Engineers_-.pptx.pdf |
| Spotify "Coding is no longer the constraint" (CwC 2026) | T3 | Ch 1 | +76% PRs: "we now have 76% more PRs to review" | 7 | https://engineering.atspotify.com/2026/6/code-with-claude-coding-is-no-longer-the-constraint |
| Anthropic autonomy telemetry | T3 | Ch 2 | Self-placement drifts upward with comfort (auto-approve ~20% → >40%) | 13 | https://www.anthropic.com/research/measuring-agent-autonomy |
| Google LLM migrations | T2 | Ch 3 | L3 is reachable where compiler and tests verify; review throttles generation; "LLMs alone through simple prompting is not sufficient" | 11, 1 | https://arxiv.org/abs/2501.06972 ; https://arxiv.org/abs/2504.09691 |
| Microsoft dotnet/runtime + Copilot Coding Agent | T2 | Ch 3 | Preparation matters more than the model (38.1% → 69%); below-human merge rate disclosed; revert parity | 6, 14, 17 | https://devblogs.microsoft.com/dotnet/ten-months-with-cca-in-dotnet-runtime/ |
| Meta TestGen-LLM + ACH | T2 | Ch 3 | The filter, not the model, is the oracle (25% raw coverage gain vs 73% accepted after filters) | 8 | https://arxiv.org/abs/2402.09171 ; https://arxiv.org/abs/2501.12862 |
| Spotify Honk (Parts 1–4) | T3 | Ch 3 | Verifier-first design, a sandbox and a deliberately small toolset; review becomes the constraint | 11, 8, 7 | https://engineering.atspotify.com/2025/11/spotifys-background-coding-agent-part-1 ; https://engineering.atspotify.com/2025/11/context-engineering-background-coding-agents-part-2 ; https://engineering.atspotify.com/2025/12/feedback-loops-background-coding-agents-part-3 ; https://engineering.atspotify.com/2026/4/background-coding-agents-dataset-migrations-honk-part-4 |
| Uber uReview | T3 | Ch 3 | Precision over recall at >90% coverage beats the human-comment addressed rate | 7 | https://www.uber.com/en-US/blog/ureview/ |
| Google DIDACT build repair | T2 (RCT) | Ch 3 | The only RCT here that measured downstream safety; the honest effect is ~2% | 9, 17 | https://research.google/blog/safely-repairing-broken-builds-with-ml |
| Qodo-based industrial review study | T1 | Ch 3 | AI review can slow PR closure (5h52m → 8h20m) | 7 | https://arxiv.org/abs/2412.18531 |
| Answer.AI × Devin | T1 (n=20) | Ch 3 | Autonomy without scoping: 3 of 20, "days pursuing impossible solutions" | 6 | https://www.answer.ai/posts/2025-01-08-devin.html |
| Replit production-DB deletion | T4 (acknowledged; fix in vendor docs) | Ch 3 | The fix was environmental: an automatic dev/prod split; the agent "can't touch" prod | 12 | https://www.theregister.com/2025/07/22/replit_saastr_response/ ; https://docs.replit.com/features/data-and-storage/development-and-production |
| Amazon Kiro / AWS Cost Explorer | T4 (disputed) | Ch 3 | Rollback in practice: "mandatory peer review for production access"; both accounts agree the cause was access scope | 10, 12, 17 | https://www.aboutamazon.com/news/aws/aws-service-outage-ai-bot-kiro ; Engadget (secondary) https://engadget.com/ai/13-hour-aws-outage-reportedly-caused-by-amazons-own-ai-tools-170930190.html |
| Cui et al. field RCTs | T1 (mixed independence) | Ch 4 | +26.08% tasks for L1 autocomplete; 30–40% never tried a free tool | 14, 16 | https://doi.org/10.1287/mnsc.2025.00535 ; https://economics.mit.edu/sites/default/files/inline-files/draft_copilot_experiments.pdf |
| METR 2025 RCT + 2026 update | T1 | Ch 4 | −19% measured vs +20% believed; the 2026 rerun is an "unreliable signal" | 1, 17 | https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ ; https://metr.org/blog/2026-02-24-uplift-update/ |
| Peng et al. Copilot lab RCT | T2 (vendor authors) | Ch 4 | The top of the range (55.8%) comes from a greenfield toy task | — | https://arxiv.org/abs/2302.06590 |
| Google internal RCT | T2 | Ch 4 | ~21% on one enterprise task, "confidence interval is large" | — | https://arxiv.org/abs/2410.12944 |
| Stanford matrix (greenfield/brownfield × complexity) | T3 | Ch 4 | Gains shrink to 0–10% on brownfield, high-complexity work | 13 | slides above |
| DX longitudinal + quarterly reports | T3 | Ch 4 (vendor box) | Median PR throughput +7.76% while AI use rose 65%; AI-authored share is self-reported and its series breaks | 1, 17 | https://getdx.com/report/ai-and-engineering-velocity-a-longitudinal-analysis/ |
| Pichai velocity vs % of code | T4 | Ch 4 | A CEO separating "~10% engineering velocity" from "30% of code" | 1 | https://lexfridman.com/sundar-pichai-transcript |
| Amazon Q Java 17 upgrades | T4 | Ch 4 (vendor box) | "The equivalent of 4,500 developer-years" is an unaudited counterfactual estimate | 11 | https://simonwillison.net/2024/Aug/24/andy-jassy-amazon-ceo/ ; https://aws.amazon.com/blogs/devops/amazon-q-developer-just-reached-a-260-million-dollar-milestone/ |
| Insight cost-to-merge experiment | T3 (n=1 feature) | Ch 4 | Cost to merge ran $2.59–$33.38 and the harness alone moved it ~2.5×; it excludes human review | 14 | https://blog.apac.insight.com/2026/07/06/cost-to-a-merged-feature |
| Uber AI budget overrun | T4 (secondary) | Ch 4 sidebar | Usage pricing without per-team budgets or an outcome metric | 15 | https://qz.com/uber-coo-ai-spending-harder-justify-052626 |

### 5.2 Part II

| Case | Tier | Anchors | The one point it proves | Also | Source |
|---|---|---|---|---|---|
| Böckeler's three-tool SDD evaluation | T1 (independent practitioner, qualitative) | Ch 5 | SDD tools are "a sledgehammer to crack a nut" for small changes, and their markdown is hard to review | — | https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html |
| EPIC spec-quality association study | T1 (correlational) | Ch 5 | Better specs go with fewer bug-fix commits (11.8% vs 20.4%), but confounded by project size | — | https://arxiv.org/abs/2610.07534 |
| Spec Kit 14-engineer pilot | T3 (uncontrolled) | Ch 5 | Spec overhead is 45–90 minutes per medium feature; reported rollbacks fell | 14 | https://arxiv.org/html/2605.01160v1 |
| dotnet closure reasons | T2 | Ch 5 (design) | Humans reject agent designs (16% wrong approach, 8% design rejected) | — | dotnet URL above |
| Lovable CVE-2025-48757 / Moltbook | T1 | Ch 5 (design) | Security architecture delegated to a generator fails (170/1,645 apps; 1.5M tokens) | 12 | https://mattpalmer.io/posts/statement-on-CVE-2025-48757/ ; https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys |
| Morgan Stanley DevGen.AI | T4 (secondary) | Ch 5 vendor box | Legacy code → spec extraction, "280,000 hours" with no method | 11 | https://www.aol.com/team-engineers-saved-morgan-stanley-094301348.html |
| Stripe Minions | T3 (volume only) | Ch 6 | Unattended one-shot agents at 1,000+ merged PRs/week, isolated devboxes, ≤2 CI rounds, every PR human-reviewed | 9 | https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents |
| Instruction-file studies (ETH; Lulla et al.; AAIF) | T1, T1, T3 | Ch 6 | Minimal, human-written files plus deterministic hooks; one run misleads, five do not | 17 | https://arxiv.org/abs/2602.11988 ; https://arxiv.org/abs/2601.20404 ; https://aaif.io/blog/measuring-agents-md-what-five-runs-show-that-one-doesn-t |
| Claude Code PRs in OSS | T1 | Ch 6 | 83.8% merged, but only 54.9% of those unmodified | — | https://arxiv.org/abs/2509.14745 |
| Gemini CLI file loss; Claude Code `rm -rf`; Antigravity drive wipe | T4 | Ch 6 anti-patterns | Auto-approve modes are a level decision | 12 | https://github.com/google-gemini/gemini-cli/issues/4586 ; https://github.com/anthropics/claude-code/issues/10077 ; TechRadar (secondary) |
| Atlassian RovoDev | T2 | Ch 7 | 38.7% of comments led to changes; −30.8% cycle time; −35.6% human comments | — | https://arxiv.org/abs/2601.01129 |
| Zalando risk-based auto-approval | T3 | Ch 7 | Risk tiers built from incident data can take a third of PRs off human review | 9, 15 | https://engineering.zalando.com/posts/2026/08/agentic-engineering-at-zalando-a-snapshot.html |
| Google Tricorder disable rule | T2 | Ch 7 (rule) | A published numeric off-switch for review bots: >10% "Not useful" → disabled | 17 (anchor there) | https://storage.googleapis.com/gweb-research2023-media/pubtools/4365.pdf |
| Copilot code review; Microsoft AI reviewer; Cursor Bugbot; Anthropic Code Review; Graphite | T3 / T3 / T3 / T3 / T4 | Ch 7 vendor box + metric-vocabulary sidebar | Each vendor defines "accepted" differently; none can be ranked | — | https://github.blog/ai-and-ml/github-copilot/60-million-copilot-code-reviews-and-counting/ ; https://devblogs.microsoft.com/engineering-at-microsoft/enhancing-code-quality-at-scale-with-ai-powered-code-reviews/ ; https://cursor.com/blog/building-bugbot ; https://claude.com/blog/code-review ; https://claude.com/customers/graphite |
| curl ends its bug bounty | T3 (maintainer) | Ch 7 | Inbound AI output can exceed human review capacity | 17 | https://www.theregister.com/2026/01/21/curl_ends_bug_bounty/ |
| Perry et al. | T1 | Ch 7 | Assistant users wrote less secure code and were more confident in it (n=47) | 12 | https://arxiv.org/abs/2211.03622 |
| Meta JiT catching tests | T2 | Ch 8 | At the L3 frontier precision is the problem: 8 true positives of 41 candidates | — | https://arxiv.org/abs/2601.22832 |
| METR reward hacking; ImpossibleBench | T1 | Ch 8 | Agents edit or game the oracle when they can reach it | 2 | https://metr.org/blog/2025-06-05-recent-reward-hacking ; https://arxiv.org/abs/2510.20270 |
| FlakyGuard; Google Auto-Diagnose | T2 | Ch 8 | L2 flaky repair and L1 diagnosis with measured acceptance and accuracy | — | https://arxiv.org/abs/2511.14002 ; https://arxiv.org/abs/2604.12108 |
| Diffblue vs Copilot/Claude Code | T4 | Ch 8 how-not-to box | A vendor benchmark run by one developer with gated data | — | https://www.diffblue.com/resources/unit-test-generation-benchmark-diffblue-copilot-gpt5/ |
| Elastic Claude Code in Buildkite | T3 | Ch 9 | Auto-merge off whenever AI contributed, an allow-list, a ban on downgrades — and the agent still removed a version bump | 11 | https://www.elastic.co/search-labs/blog/ci-pipelines-claude-ai-agent |
| Nx self-healing CI; GitHub Fix with Copilot; Harness CV | T3 / docs / docs | Ch 9 | L2 is shipping; L3 auto-apply needs a verification phase; L4 release gating is classical ML | — | https://nx.dev/blog/wrapping-up-2025 ; https://github.blog/changelog/2026-05-18-one-click-fixes-for-failing-actions-with-copilot-cloud-agent/ ; https://developer.harness.io/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step |
| PromptPwnd | T1 (Fortune 500 count self-reported) | Ch 9 | A CI agent that reads untrusted text while holding a privileged token is an exfiltration path | 12 | https://www.aikido.dev/blog/promptpwnd-github-actions-ai-agents |
| Alibaba Cloud BiAn | T2 (peer-reviewed) | Ch 10 | The best-measured ops result: −20.5% time to root cause over 10 months, at L1–L2 | — | https://doi.org/10.1145/3718958.3750505 |
| Google SRE + Gemini CLI; Google AI Operator | T3 | Ch 10 (guardrail template) | A closed set of typed, reversible mitigations with forced confirmation, plus auto-downgrade | 17 | https://cloud.google.com/blog/topics/developers-practitioners/how-google-sres-use-gemini-cli-to-solve-real-world-outages ; https://sre.google/resources/practices-and-processes/ai-engineering-reliable-operations/ |
| OpenRCA 2.0; ORCA-bench; Waterloo FORGE | T1 | Ch 10 | Independent RCA accuracy is 10–25% on realistic tasks; fabricated evidence is the dominant failure | — | https://arxiv.org/abs/2606.27154 ; https://arxiv.org/abs/2607.28545 ; https://arxiv.org/abs/2601.22208 |
| Meta RCA | T2 | Ch 10 | Confidence gating: withhold low-confidence answers; 42% top-5 | — | https://engineering.fb.com/2024/06/24/data-infrastructure/leveraging-ai-for-efficient-incident-response/ |
| Azure SRE Agent; Resolve; PagerDuty; Traversal; Datadog | T4 | Ch 10 vendor box | MTTR claims with no method | — | https://techcommunity.microsoft.com/blog/appsonazureblog/how-we-build-and-use-azure-sre-agent-with-agentic-workflows/4508753 ; https://resolve.ai/customers/salesforce |
| Zalando postmortem analysis | T3 | Ch 10 | A low-risk L2 use with sampled curation (100% → 10–20%) | — | https://engineering.zalando.com/posts/2025/09/dead-ends-or-data-goldmines-ai-powered-postmortem-analysis.html |
| Airbnb Enzyme → RTL | T3 | Ch 11 | Retries beat prompt tuning: 75% in 4 hours, 97% in 4 days, against a 1.5-year estimate | 8 | https://airbnb.tech/?p=366 |
| Slack Enzyme → RTL | T3 (n=9) | Ch 11 contrast | The same migration gives a different number: migration figures don't transfer | — | https://slack.engineering/balancing-old-tricks-with-new-feats-ai-powered-conversion-from-enzyme-to-react-testing-library-at-slack/ |
| Spotify Fleet Management determinism | T3 | Ch 11 | Deterministic tooling did ~half the PRs and 70% of a fleet move; the last 30% needs the LLM | — | Honk Part 1 URL; InfoQ (secondary) https://www.infoq.com/news/2026/03/spotify-honk-rewrite |
| PocketOS | T4 (incident databases; mechanism secondary) | Ch 12 opening | A staging task, a token that could reach prod, an API with no undo, and backups inside the blast radius | 10 | https://incidentdatabase.ai/entities/railway-api-volumes/ ; https://oecd.ai/en/incidents/2026-04-27-6153 |
| Nx "s1ngularity" | T1 (Wiz) + maintainer advisory | **Ch 12 anchor** | Defaults (permission prompts, workspace limits) measurably blunted the AI step; the skip-permission flags were what the malware needed | 9, 15 | https://www.wiz.io/blog/s1ngularitys-aftermath ; https://github.com/nrwl/nx/security/advisories/GHSA-cxm3-wv7p-598c |
| Amazon Q Developer extension (CVE-2025-8217) | T2 (vendor bulletin) | Ch 12 | An over-scoped CI token shipped a wiper prompt in an AI tool's release | 9 | https://aws.amazon.com/security/security-bulletins/AWS-2025-015/ |
| Anthropic auto-mode classifier | T2 (vendor, candid) | Ch 12 | Neither clicks (93% approved) nor classifiers (17% miss on real overeager actions) are a boundary | 2 | https://www.anthropic.com/engineering/claude-code-auto-mode |
| CVE-2025-53773; CurXecute; Gemini CLI allow-list bypass; MCP tool poisoning; GitHub MCP toxic flow; Supabase MCP; rules-file backdoor; Antigravity exfiltration | T1 (one T2 advisory) | Ch 12 | The toolchain surface: the agent must not write its own permission/MCP/rules config; allow-lists are string matches; MCP output is untrusted input | — | SB-7–SB-13 URLs; https://www.promptarmor.com/resources/google-antigravity-exfiltrates-data |
| Veracode 2026; BaxBench; SusVibes; Spracklen | T3 / T1 / T1 / T1 | Ch 12 | The code surface: ~44% security fail rate with no model-size fix; agents 57% functional but 11.8% secure; predictable hallucinated packages | 4 | https://www.veracode.com/?p=31889 ; https://arxiv.org/abs/2502.11844 ; https://proceedings.mlr.press/v306/zhao26ax.html ; https://www.usenix.org/conference/usenixsecurity25/presentation/spracklen |

### 5.3 Part III

| Case | Tier | Anchors | The one point it proves | Also | Source |
|---|---|---|---|---|---|
| DORA 2025 team archetypes | survey | Ch 13 | Seven archetypes; "legacy bottleneck" 11%, "constrained by process" 17%: diagnose before you climb | — | https://dora.dev/research/2025/dora-report/ (pp. 15–18) |
| ANZ Bank Copilot experiment | T2 (n=22 on time) | Ch 14 | A controlled pilot before scaling; the time gain was significant, security inconclusive | 4 | https://arxiv.org/abs/2402.05636 |
| Accenture rollout; ZoomInfo | T3; T2 | Ch 14 | Adoption funnels: 81.4% same-day install, but acceptance metrics are not outcomes | — | https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/ ; https://arxiv.org/abs/2501.13282 |
| Booking.com via DX | T3 (vendor) | Ch 14 vendor box | The only enablement programme with before/after numbers is vendor-published and observational | 15 | https://getdx.com/customers/booking-drives-ai-adoption-with-dx/ |
| Mercado Libre | T4 | Ch 14 weak-claim example | Seat counts that disagree on one page; "50%" is one executive's estimate | — | https://github.com/customer-stories/mercado-libre |
| Zalando programme (proxy, guild, labs; "never centrally mandated") | T3 | Ch 15 | The best non-vendor enablement design, with no adoption figures | 16 | Zalando 2026 URL above |
| Linux kernel, Fedora, Gentoo, NetBSD, QEMU policies | policy | Ch 15 | Three governance camps: ban, presumed tainted, allow with disclosure | Appendix A/B | https://kernel.org/doc/html/next/process/coding-assistants.html ; https://wiki.gentoo.org/wiki/Project:Council/AI_policy ; https://www.netbsd.org/developers/commit-guidelines.html ; https://www.qemu.org/docs/master/devel/code-provenance.html |
| Shopify, Coinbase, Goldman mandates; Samsung ban | T4 (policy) | Ch 15 | Mandates without published outcomes | 16 | LC-33, LC-25, LC-31, OG-45 URLs |
| Anthropic skill-formation RCT | T2 (against vendor interest) | Ch 16 | Mastery 50% vs 67%; biggest gap in debugging; no significant speed gain | 6 | https://arxiv.org/abs/2601.20245 |
| Hosseini & Lichtinger; Stanford Canaries | T1 | Ch 16 | Junior employment falls through slower hiring (−9% at adopters; 19% below counterfactual) | — | https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5425555 ; https://digitaleconomy.stanford.edu/app/uploads/2026/08/Canaries_August2026.pdf |
| Bastani et al. (PNAS) | T1 | Ch 16 | A guarded tutor removes most of the learning harm | — | https://papers.ssrn.com/abstract=4895486 |
| DX time to 10th PR | T3 (vendor, observational) | Ch 16 vendor box | 49 vs 91 days; reverse causation likely | — | https://getdx.com/blog/ai-cuts-developer-onboarding-time-in-half/ |
| Cloudflare 1,111 interns; Duolingo walk-back; Salesforce freeze | T4 | Ch 16 sidebar | Counter-signals and reversals in the headcount story | — | https://blog.cloudflare.com/cloudflare-1111-intern-program/ ; LC-34, LC-29 URLs |
| Google Tricorder | T2 | **Ch 17 anchor** | The template rollback trigger: a feedback button, a tracked ratio, a fixed 10% threshold, disable until fixed | 7 | Tricorder PDF above |
| Google SRE auto-downgrade + Red Button | T3 | Ch 17 | A level downgrade as an automatic, pre-wired action | 10 | Google SRE URL above |
| Klarna | T4, non-SDLC | Ch 17 sidebar | A cost-only success metric hid a quality decline; the fix was a human escape hatch | — | https://pymnts.com/bnpl/2025/klarna-focuses-on-human-powered-customer-service |

**Do not use (until a primary is read):**
- Gemini CLI's "failed you completely and catastrophically" (FR-C2)
- the 19.7% package-hallucination figure (AG §5.12)
- GitLab's four stage names (GM-R2)
- any Gartner Hype Cycle placement (GM-R3)
- McKinsey's 2023 developer-productivity figures (GM unverified)
- Microsoft E+D licence pullback (GP cases)
- the postmark-mcp download counts (SB unverified)
- Morgan Stanley's "9 million lines" (GF-1)
- Booking's "150,000 hours" (GF-29)
- the OpenAI tool-use pause (GF-33)
- any developer-specific figure from Canaries (GF-25)
- Pichai's "hours freed" definition (GP-R5)

Use only with a label:
- Spotify's LLM-judge removal: "reported by InfoQ".
- Kiro's "13 hours": "FT, via Reuters/Engadget; Amazon says 'brief'".

---

## 6. Style guide

### 6.1 Voice

- **Match the wiki.** Opinionated, specific, numerate. Every chapter **argues one point** (the argument column in §2) and every section serves it. If a section does not move the argument, cut it.
- **Specific numbers, with denominators and dates.** "67.9% of 878 agent PRs merged (May 2025–Mar 2026)", not "most agent PRs merged".
- **Named trade-offs.** When recommending X, name what it costs (e.g. "small batches slightly reduce individual-effectiveness gains", GP-R3).
- **Opening rule.** Every chapter opens with a hook lede (CLAUDE.md "Document openers"): stakes first, takeaway within the first 30 words. No label, list or code, and no throat-clearing.
- **Closing rule.** Every chapter ends with a **"What to do" box**: 4–7 imperative bullets a reader can act on Monday, each traceable to the chapter's evidence. Markup: `<div class="deliverable"><span class="tag">What to do</span> …</div>`. Part II boxes also name the next level's entry criterion.
- **Part II template**, in this order, using these h2 names:
  1. What changes
  2. The ladder for this phase
  3. A case
  4. Migration steps
  5. Guardrails
  6. Metrics
  7. Anti-patterns
  8. What to do

  Ch 12 replaces item 2 with "The permission envelope per level".
- **Linking rules (spec).** Links use slugs, never chapter numbers ("see [the maturity model](/books/ai-driven-sdlc/the-maturity-model/#grid-coding)", never "see Chapter 2"). Every Part II chapter links to its grid row and to the Part III chapters that use it.
- **Spelling.** British spelling, matching the manifest and site ("organisation", "centralised").
- **Person.** Address the reader as "you". The book never says "we found"; it says who found.
- **Figures.** At most one diagram per chapter. It must show a mechanism, not decorate. Use `.diagram` or inline SVG per the blog AUTHORING conventions. Non-blog layouts have no `<table>` styling, so grids render as `<pre class="standalone">` or as a per-phase list.

### 6.2 Terminology (EN → ZH)

Use these renderings everywhere. They align with the existing wiki pages where one exists (noted).

| English | 中文 | Note |
|---|---|---|
| maturity model | 成熟度模型 | |
| maturity level | 成熟度级别 | "Level 3" → "L3 级" or "第 3 级"; keep "L3" in running text |
| maturity grid / self-assessment grid | 成熟度网格 / 自评表 | manifest uses 自评表 |
| phase (of the SDLC) | 阶段 | |
| L0 Manual | L0 手工 | |
| L1 Assisted | L1 辅助 | |
| L2 Delegated | L2 委派 | |
| L3 Supervised-autonomous | L3 受监督自主 | |
| L4 Autonomous | L4 自主（限定任务类） | always with scope |
| task type / task class | 任务类型 / 任务类别 | |
| oracle | 判据 | matches `/playbooks/.../large-scale-migration-agents/` |
| oracle principle | 判据原则 | |
| verifier / verification | 核验器 / 验证 | 核验 matches `/concepts/generator-verifier-gap/` (生成-核验落差); the phase name stays 测试与验证 |
| blast radius | 爆炸半径 | matches `/concepts/blast-radius/` |
| granted authority | 实际授予的权限 | |
| permission envelope | 权限边界 | |
| risk ceiling | 风险上限 | |
| review mode | 评审方式 | |
| review by exception | 例外评审 | |
| evidence bundle | 证据包 | |
| Merge-Readiness Pack | 合并就绪包 | |
| human-in-the-loop | 人在回路 | matches wiki |
| guardrail | 护栏 | |
| kill switch | 急停开关 | matches `/operations/agentops/kill-switches/` |
| rollback / roll back | 回退 | manifest |
| rollback trigger / tripwire | 回退触发条件 / 警戒线 | |
| reward hacking | 奖励黑客 | matches wiki |
| prompt injection | 提示词注入 | matches wiki |
| sandbox | 沙箱 | |
| egress control | 出站控制 | matches wiki |
| scoped credential | 范围受限凭证 | matches wiki |
| least privilege | 最小权限 | |
| skip-permission mode | 跳过权限确认模式 | keep the flag name in code font |
| slopsquatting | 幻觉包名抢注（slopsquatting） | |
| instruction file (AGENTS.md etc.) | 指令文件 | manifest |
| spec / spec-driven development | 规格 / 规格驱动开发 | |
| background coding agent | 后台编码智能体 | |
| agent | 智能体 | |
| bottleneck / constraint | 瓶颈 / 约束 | |
| value stream | 价值流 | |
| batch size | 批量大小 | |
| throughput / instability | 吞吐量 / 不稳定性 | DORA terms |
| change failure rate / rework rate | 变更失败率 / 返工率 | |
| MTTM (time to mitigate) | 平均缓解时间（MTTM） | |
| escaped defect | 逃逸缺陷 | |
| flaky test | 不稳定测试（flaky test） | |
| self-healing CI | 自愈 CI | |
| autonomy drift | 自主度漂移 | |
| evidence tier (T1–T4) | 证据等级（T1–T4） | |
| Measured by | 测量方 | box label |
| vendor-reported | 厂商自报 | box label |
| What to do | 怎么做 | box label |
| as of October 2026 | 截至 2026 年 10 月 | |
| Agents Rule of Two | 智能体"三取二"规则 | Meta's term, quoted in English once |
| lethal trifecta | 致命三要素 | Willison's term |

### 6.3 ZH edition

- The writer agent for each chapter owns both its EN and ZH files.
- ZH is a faithful, fluent translation, never machine-literal.
- Ledes are translated faithfully, not byte-mirrored.
- `<pre>` blocks are byte-identical between locales.
- Quoted English source text is translated in the ZH prose, with the original in parentheses only when the wording itself is the evidence. Example: Amazon's "user error—specifically misconfigured access controls".

### 6.4 Dating volatile facts

- Any product capability, default, price, version, adoption figure, star count, pace ("1,000 PRs per 10 days"), policy state or regulatory date carries **"(as of <Month YYYY>)"**, e.g. "(as of October 2026)". Use the source's own date when it is earlier: "1,000+ merged PRs a week (Stripe, as of February 2026)".
- Studies and incidents carry their publication or incident date, not an "as of".
- **Plausible but unsourced future or roadmap claims are cut, not hedged** (spec). Analyst forecasts may appear only as a quoted forecast, attributed and labelled ("Gartner forecasts …"), never as fact.

### 6.5 Citing

- **Inline link to the primary source** on the claim itself, at first use in each chapter. Link text is the source name or the claim, never "here".
- **Secondary-only** claims say so in the sentence: "according to the FT, as reported by Engadget".
- **Quotes** are verbatim from the primary. Where a gap-fill corrected wording, use the corrected wording.
- **Vendor-reported box.** A vendor's figure about its own product, or a vendor's pooled telemetry used for more than direction, goes in a labelled box (`<div class="callout warn">`, header "Vendor-reported"). The box states:
  - who measured
  - what "success" means in their metric
  - what is missing (n, baseline, window)

  The main text may say "vendor telemetry agrees on direction" but never rests the argument on the box.
- **Disputed incidents** print both accounts side by side, attribute each, and tag the level by granted permissions.
- **The bibliography** lists every URL with access date and tier.

### 6.6 Banned moves

1. **No invented companies, people or composite cases.** Worked examples use public data. Where arithmetic needs a hypothetical, label it "illustrative arithmetic" and name no organisation.
2. **No unsourced roadmap or future claims.** Cut them; do not hedge.
3. **No single-number RCT quotes.** Always give the range (−19% to +55.8%) and the moderators (task type, familiarity, codebase maturity, tool generation).
4. **No "% of code written by AI" as a success metric**, and no comparison of such figures across companies.
5. **Never combine figures from different vendors, windows or definitions into one number.** This covers Faros 2025 vs 2026, Anthropic's +67% vs +200%, and DX's 22% / 27.4% / 52.7% series.
6. **Never rank vendor review metrics against each other.** Use the metric-vocabulary sidebar.
7. **Never call the DORA 2024 → 2025 throughput change a trend**, and never call METR 2026 a "reversal".
8. **Never claim "AGENTS.md / instruction files improve success" unqualified.**
9. **No attribution of a disputed incident to "the AI" or "the human" alone.**
10. **No quote not verified at a primary** (see the "Do not use" list in §5).
11. **No chapter numbers in links.** No emojis. No ledes that begin "In this chapter…", "AI is everywhere…", or with a label.
12. **No self-placement claims about real organisations beyond what their sources show.** E.g. do not call Stripe "L3" without saying every PR is human-reviewed.

---

## 7. Cross-link map

Book URLs are `/books/ai-driven-sdlc/<slug>/`. Grid anchors are listed in §3.7. Other anchors: `#oracle-principle`, `#rules`, `#crosswalk`, `#self-assessment` (Ch 2); `#permission-envelope` (Ch 12); `#review-metric-vocabulary` (Ch 7); `#rollback-triggers` (Ch 17).

Every wiki URL below was checked to exist in this worktree (fragment present and registered).

### 7.1 Chapter → chapter (required links)

| From | Must link to |
|---|---|
| `preface` | `the-bottleneck-moves`; `the-maturity-model` (#grid-*); `case-studies`; `assess-your-starting-point`; `templates` |
| `the-bottleneck-moves` | `the-maturity-model#rules` (Rule 6); `code-review`; `testing-and-verification`; `economics-risk-and-measurement`; `measuring-success-and-rolling-back` |
| `the-maturity-model` | every Part II chapter from its grid row; `security-permissions-and-blast-radius#permission-envelope`; `case-studies`; `assess-your-starting-point`; `glossary` (crosswalk) |
| `case-studies` | per case: its anchor-chapter phase (`maintenance-and-migrations`, `coding`, `testing-and-verification`, `code-review`, `ci-cd-and-release`, `security-permissions-and-blast-radius`); `the-maturity-model#grid-*`; `measuring-success-and-rolling-back` (Kiro) |
| `economics-risk-and-measurement` | `the-bottleneck-moves`; `security-permissions-and-blast-radius`; `measuring-success-and-rolling-back`; `regulatory-and-licensing-status`; `the-90-day-pilot` (cost model) |
| `requirements-specs-and-design` | `the-maturity-model#grid-requirements` and `#grid-design`; `coding` (spec → task); `security-permissions-and-blast-radius` (Lovable/Moltbook); `the-90-day-pilot`; `templates` (spec template) |
| `coding` | `the-maturity-model#grid-coding`; `requirements-specs-and-design`; `code-review`; `testing-and-verification`; `security-permissions-and-blast-radius#permission-envelope`; `the-90-day-pilot`; `templates` (instruction file) |
| `code-review` | `the-maturity-model#grid-review`; `the-bottleneck-moves`; `coding`; `testing-and-verification`; `measuring-success-and-rolling-back#rollback-triggers` (Tricorder); `scaling-across-teams`; `templates` (review checklist, MRP) |
| `testing-and-verification` | `the-maturity-model#grid-testing` and `#oracle-principle`; `code-review`; `ci-cd-and-release`; `maintenance-and-migrations`; `measuring-success-and-rolling-back` |
| `ci-cd-and-release` | `the-maturity-model#grid-cicd` and `#oracle-principle`; `testing-and-verification`; `operations-and-incidents`; `security-permissions-and-blast-radius` (PromptPwnd, Nx, Amazon Q); `measuring-success-and-rolling-back` |
| `operations-and-incidents` | `the-maturity-model#grid-operations`; `ci-cd-and-release`; `security-permissions-and-blast-radius`; `case-studies` (Kiro, Replit); `measuring-success-and-rolling-back` |
| `maintenance-and-migrations` | `the-maturity-model#grid-maintenance` and `#oracle-principle`; `testing-and-verification`; `code-review` (throttling); `the-90-day-pilot` (first-pilot recommendation); `case-studies` (Google, Spotify) |
| `security-permissions-and-blast-radius` | `the-maturity-model#rules` (Rule 2); every Part II chapter's Guardrails section links *here*; this chapter links back to `coding`, `ci-cd-and-release`, `operations-and-incidents`; `scaling-across-teams` (managed settings, CODEOWNERS); `templates` (permission-envelope checklist) |
| `assess-your-starting-point` | `the-maturity-model#self-assessment`; all eight Part II chapters (one line each); `security-permissions-and-blast-radius` (credential inventory); `the-90-day-pilot` |
| `the-90-day-pilot` | `assess-your-starting-point`; `maintenance-and-migrations`; `coding`; `measuring-success-and-rolling-back`; `templates` (pilot scorecard) |
| `scaling-across-teams` | `the-90-day-pilot`; `security-permissions-and-blast-radius`; `people-and-roles`; `regulatory-and-licensing-status`; `templates` (provenance policy) |
| `people-and-roles` | `code-review` (review-first apprenticeship); `scaling-across-teams`; `measuring-success-and-rolling-back` (no AI metrics in individual reviews) |
| `measuring-success-and-rolling-back` | `the-maturity-model#rules`; `economics-risk-and-measurement`; `the-90-day-pilot`; `code-review` (Tricorder); `operations-and-incidents` (auto-downgrade); `templates` (rollback-trigger sheet) |

### 7.2 Chapter → existing wiki pages

| Chapter | Existing pages to link (all verified) |
|---|---|
| `preface` | /concepts/autonomy-levels/ · /blogs/ai-native-sdlc-artifact-chain/ |
| `the-bottleneck-moves` | /concepts/generator-verifier-gap/ · /playbooks/coding-and-computer-use-agents/background-coding-agents/ · /playbooks/agent-ux-and-human-interaction/review-queues-for-agent-output/ · /operations/economics-roi/cost-of-human-review/ · /blogs/ai-native-sdlc-artifact-chain/ |
| `the-maturity-model` | /concepts/autonomy-levels/ (crosswalk note) · /playbooks/agent-ux-and-human-interaction/progressive-autonomy/ · /concepts/human-in-the-loop/ · /concepts/blast-radius/ · /concepts/generator-verifier-gap/ · /concepts/task-scope/ · /deep-dives/evaluating-agents/eval-integrity-and-scorer-gaming/ · /operations/governance-compliance/accountability-and-roles/ |
| `case-studies` | /playbooks/coding-and-computer-use-agents/large-scale-migration-agents/ · /playbooks/coding-and-computer-use-agents/code-review-agents/ · /playbooks/coding-and-computer-use-agents/test-generation-agents/ · /playbooks/coding-and-computer-use-agents/ci-repair-agents/ · /concepts/blast-radius/ |
| `economics-risk-and-measurement` | /operations/economics-roi/measuring-roi/ · /operations/economics-roi/cost-of-human-review/ · /operations/economics-roi/fractional-time-savings/ · /operations/economics-roi/cost-of-agent-errors/ · /operations/economics-roi/pricing-models/ · /concepts/reading-benchmarks/ · /concepts/jagged-frontier/ · /deep-dives/evaluating-agents/eval-variance-and-statistical-power/ · /operations/governance-compliance/ip-and-copyright-for-agent-output/ · /blogs/the-agent-pullback-is-a-measurement-failure/ |
| `requirements-specs-and-design` | /playbooks/coding-and-computer-use-agents/spec-driven-agent-development/ · /playbooks/agent-ux-and-human-interaction/plan-review-and-editing/ · /concepts/clarifying-questions/ · /concepts/unsatisfiable-tasks/ · /concepts/context-engineering/ · /blogs/ai-native-sdlc-artifact-chain/ · /blogs/agents-md-vs-claude-md-vs-cursor-rules-vs-agent-skills/ |
| `coding` | /playbooks/coding-and-computer-use-agents/coding-agent-architecture/ · /playbooks/coding-and-computer-use-agents/background-coding-agents/ · /playbooks/coding-and-computer-use-agents/repo-navigation-and-context/ · /playbooks/coding-and-computer-use-agents/ide-agents/ · /playbooks/coding-and-computer-use-agents/evaluating-coding-agents/ · /operations/safety-and-security/lifecycle-hooks-and-harness-config/ · /concepts/task-horizon/ · /blogs/afk-coding/ · /blogs/agents-md-vs-claude-md-vs-cursor-rules-vs-agent-skills/ |
| `code-review` | /playbooks/coding-and-computer-use-agents/code-review-agents/ (spec-named) · /playbooks/agent-ux-and-human-interaction/review-queues-for-agent-output/ · /playbooks/coding-and-computer-use-agents/merge-queues-for-agent-changes/ · /deep-dives/agent-security/separation-of-duties-for-agents/ · /operations/economics-roi/cost-of-human-review/ · /concepts/sycophancy/ · /blogs/coderabbit-vs-greptile-vs-bugbot-vs-diamond/ |
| `testing-and-verification` | /playbooks/coding-and-computer-use-agents/evaluating-coding-agents/ (spec-named) · /playbooks/coding-and-computer-use-agents/test-generation-agents/ · /playbooks/coding-and-computer-use-agents/patch-generation-and-tests/ · /playbooks/coding-and-computer-use-agents/debugging-and-triage-agents/ · /deep-dives/evaluating-agents/eval-integrity-and-scorer-gaming/ · /deep-dives/evaluating-agents/eval-driven-development-and-ci/ · /deep-dives/training-agentic-models/reward-design-and-hacking/ · /concepts/generator-verifier-gap/ |
| `ci-cd-and-release` | /playbooks/coding-and-computer-use-agents/ci-repair-agents/ · /playbooks/coding-and-computer-use-agents/release-and-publishing-agents/ · /playbooks/coding-and-computer-use-agents/merge-queues-for-agent-changes/ · /playbooks/coding-and-computer-use-agents/infrastructure-as-code-agents/ · /operations/agentops/rollout-and-versioning/ · /operations/agentops/feature-flags-for-agents/ · /deep-dives/agent-security/agent-supply-chain-security/ · /blogs/github-merge-queue-vs-trunk-vs-mergify-vs-aviator/ |
| `operations-and-incidents` | /playbooks/domain-playbooks/devops-sre-agents/ · /operations/agentops/incident-response-for-agents/ · /operations/agentops/kill-switches/ · /operations/agentops/slos-and-error-budgets/ · /playbooks/agent-ux-and-human-interaction/undo-and-reversibility/ · /concepts/human-in-the-loop/ · /blogs/agent-cves-are-authorization-bugs/ · /blogs/one-in-ten-outages-is-not-about-agents/ |
| `maintenance-and-migrations` | /playbooks/coding-and-computer-use-agents/large-scale-migration-agents/ · /playbooks/coding-and-computer-use-agents/dependency-upgrade-agents/ · /playbooks/coding-and-computer-use-agents/database-migration-agents/ · /playbooks/coding-and-computer-use-agents/dead-code-and-flag-removal-agents/ · /playbooks/coding-and-computer-use-agents/vulnerability-remediation-agents/ · /playbooks/coding-and-computer-use-agents/documentation-agents/ |
| `security-permissions-and-blast-radius` | /concepts/blast-radius/ · /concepts/sandboxing-and-code-execution/ · /concepts/prompt-injection-101/ · /concepts/ambient-authority/ · /concepts/confused-deputy/ · /concepts/credential-lifetime/ · /concepts/agent-identity-and-permissions/ · /playbooks/coding-and-computer-use-agents/sandboxing-and-execution/ · /playbooks/coding-and-computer-use-agents/agents-on-developer-workstations/ · /playbooks/coding-and-computer-use-agents/secret-scanning-and-rotation-agents/ · /deep-dives/agent-security/sandbox-and-isolation-patterns/ · /deep-dives/agent-security/credential-delivery-to-the-sandbox/ · /deep-dives/agent-security/agent-supply-chain-security/ · /deep-dives/agent-security/prompt-injection-defense-2026/ · /deep-dives/mcp/mcp-tool-poisoning/ · /deep-dives/mcp/mcp-security-anti-patterns/ · /operations/safety-and-security/scoped-credentials-for-agents/ · /operations/safety-and-security/egress-control-for-agents/ · /operations/safety-and-security/secrets-management-for-agents/ · /operations/safety-and-security/lifecycle-hooks-and-harness-config/ · /blogs/your-agent-ran-git-status-and-that-was-enough/ · /blogs/agent-cves-are-authorization-bugs/ |
| `assess-your-starting-point` | /concepts/jagged-frontier/ · /operations/governance-compliance/agent-inventory-and-registry/ · /operations/governance-compliance/governance-in-practice/ |
| `the-90-day-pilot` | /operations/evaluation-and-observability/shadow-mode-and-dark-launches/ · /operations/evaluation-and-observability/online-experiments-for-agents/ · /deep-dives/evaluating-agents/eval-variance-and-statistical-power/ · /operations/economics-roi/measuring-roi/ · /playbooks/coding-and-computer-use-agents/evaluating-coding-agents/ |
| `scaling-across-teams` | /operations/governance-compliance/governance-in-practice/ · /operations/governance-compliance/policy-enforcement/ · /operations/governance-compliance/accountability-and-roles/ · /operations/governance-compliance/agent-inventory-and-registry/ · /operations/governance-compliance/disclosure-and-content-provenance/ · /deep-dives/agent-security/policy-as-code-for-agents/ · /operations/governance-compliance/worker-consultation-and-co-determination/ |
| `people-and-roles` | /playbooks/domain-playbooks/tutoring-and-learning-agents/ · /operations/governance-compliance/worker-consultation-and-co-determination/ · /blogs/afk-coding/ |
| `measuring-success-and-rolling-back` | /operations/economics-roi/scaling-back-an-agent-deployment/ · /blogs/the-agent-pullback-is-a-measurement-failure/ · /operations/agentops/kill-switches/ · /operations/agentops/slos-and-error-budgets/ · /operations/evaluation-and-observability/quality-regression-detection/ · /operations/evaluation-and-observability/production-feedback-signals/ · /operations/economics-roi/measuring-roi/ · /blogs/trust-outran-the-agent-incident-rate/ |
| `templates` | /blogs/agents-md-vs-claude-md-vs-cursor-rules-vs-agent-skills/ · /playbooks/coding-and-computer-use-agents/spec-driven-agent-development/ · /deep-dives/agent-security/decision-receipts-and-audit/ |
| `regulatory-and-licensing-status` | /operations/governance-compliance/regulatory-landscape/ · /operations/governance-compliance/eu-ai-act-for-agents/ · /operations/governance-compliance/nist-ai-rmf-for-agents/ · /operations/governance-compliance/ip-and-copyright-for-agent-output/ · /blogs/iso-42001-vs-nist-ai-rmf-vs-eu-ai-act-vs-aiuc-1/ |

Reverse links the spec requires (done in the Part I PR):
- `/blogs/ai-native-sdlc-artifact-chain/` → `/books/ai-driven-sdlc/`
- `/concepts/autonomy-levels/` → `the-maturity-model`
- `/playbooks/coding-and-computer-use-agents/code-review-agents/` → `code-review` (when Part II ships)
- `/playbooks/coding-and-computer-use-agents/evaluating-coding-agents/` → `testing-and-verification` (when Part II ships)

---

## 8. Part I detailed outlines

Each outline gives the h2/h3 structure, the claims and cases each section uses (with source URLs), the worked example(s), the closing "What to do" box, and the drafted lede. Writers may reorder h3s inside a section, but not the h2 sequence.

### 8.0 Preface: How to Read This Book (`preface`, 1,500 words)

**Lede (draft):**
> Most organisations that bought coding assistants got faster typing and a longer review queue. This book is for the people deciding what to do next. It maps eight phases of software delivery, five levels of AI authority in each, and the public evidence on which climbs have paid off. Place each phase honestly, climb only where you have a check the AI cannot edit, and treat stepping back down as routine.

**h2 Who this book is for**
- The two reader layers and the three reading paths (manifest `howToRead`).
- One sentence each on Part I, Part II and Part III.

**h2 The map in one picture**
- A single diagram: 8 phases × L0–L4. Cells are shaded by evidence density: L3 evidence only in coding, testing, maintenance and a narrow ops class; L4 empty for LLMs (grid observation 1).
- Claim: no published model is a per-phase grid; almost every model is one coding scale borrowed from SAE J3016 (MM key finding 1; https://sourcegraph.com/blog/levels-of-code-ai ; https://arxiv.org/abs/2509.06216).
- h3 *What a level means here.* It is what a human reviews, given the authority the AI actually holds (one paragraph; link `the-maturity-model#rules`).

**h2 Three ideas to carry through the book**
1. *The bottleneck moves.* DORA 2025: friction "shifts from manual grind to deciding and verifying" (BN-7; https://dora.dev/research/2025/dora-report/, p. 40). Link `the-bottleneck-moves`.
2. *Levels are choices, not targets.* The right autonomy "need not be the maximum achievable" (MM-8; https://arxiv.org/html/2311.02462v5). Autonomy is "a deliberate design decision" (MM-9; https://arxiv.org/abs/2506.12469).
3. *AI amplifies what you already are.* "AI's primary role is as an amplifier, magnifying an organization's existing strengths and weaknesses" (MM-12; https://dora.dev/research/2025/dora-report/).

**h2 How the evidence is graded**
- The T1–T4 legend (§4.1), the "Measured by" line, the vendor-reported box, and "as of" dating.
- One sentence on why: corporate AI claims are often marketing (spec, Risks).

**h2 What this book is not**
- Not a tool guide; tools are dated, named only as examples.
- Not a prescription for an end state; there is no L5.
- Not legal advice (Appendix B).
- h3 *A note on sources.* The book cites Anthropic research and products where they are the primary source, under the same vendor rules as everyone else. The wording of any further disclosure is Open question 9.

**What to do box:**
- Before reading on, write one line per phase: what a human reviews today, and which credentials your AI tools hold.
- Mark any phase where those two lines disagree; that phase is already at a higher level than you think.
- Pick your reading path. Leaders: Ch 1–4 in order. Practitioners: Ch 2, then your phase.
- Keep the page; it is your input to `assess-your-starting-point`.

---

### 8.1 Ch 1 — When Code Gets Cheap, the Bottleneck Moves (`the-bottleneck-moves`, 4,000 words)

**Argument:** AI made starting work cheap but not finishing it, so the constraint moves to verification, and speeding up only coding buys instability.

**Lede (draft):**
> When DORA's 2024 survey tied every 25% rise in AI adoption to a 7.2% drop in delivery stability, code quality and review speed were going up at the same time. The damage was not at the keyboard. It was downstream, where larger batches waited to be checked. AI made starting work cheap and left finishing it as expensive as ever. Speed up only coding, and you buy longer queues and more instability, not more delivery.

**h2 The promise and the measured result**
- DORA 2024: −1.5% throughput and −7.2% stability per 25% more AI adoption, alongside +7.5% documentation quality, +3.4% code quality and +3.1% review speed. Sample "nearly 3,000" (BN-1, BN-2, GP-R1; https://services.google.com/fh/files/misc/2024_final_dora_report.pdf pp. 38–40, 91).
- DORA 2025 (n = 4,867): "AI adoption now improves software delivery throughput … However, it still increases delivery instability" (BN-6, GP-R2; https://dora.dev/research/2025/dora-report/ p. 4).
- Presentation rule: instability is the stable finding; the throughput sign is unsettled, from two cross-sectional surveys of different populations (AG §5.2). No "trend" language.
- h3 *Instability is not the price of speed.* "We found no evidence of such a moderating effect" (BN-8; 2025 report p. 41).

**h2 Where the friction goes: deciding and verifying**
- "It shifts from manual grind to deciding and verifying … assessing code that looks remarkably similar to correct code" (BN-7, p. 40).
- "AI tends to turn up at the keyboard" (BN-9, p. 39).
- "localized pockets of productivity that are often lost to downstream chaos" (GP-N4, p. 3).
- "It is harder to review larger batches of code" (BN-12 / GP-N5, p. 57).
- Thoughtworks Radar (Nov 2025): "speeding up one part of the workflow increases pressure on the others" (GM-R1; https://www.thoughtworks.com/radar/techniques/complacency-with-ai-generated-code).
- Google's research blog: the "code author increasingly becomes a reviewer" (BN-20; https://research.google/blog/ai-in-software-engineering-at-google-progress-and-the-path-ahead/).
- Trust context: 30% report little or no trust (GP-N2); 66% cite "almost right, but not quite" (BN-32; https://survey.stackoverflow.co/2025/ai).

**h2 The queue, in telemetry** (vendor-reported box for the figures)
- Faros 2025: PRs merged +98%, review time +91%, PR size +154%, no company-level correlation (BN-26; https://www.faros.ai/blog/ai-software-engineering).
- Faros 2026: median time in review +441.5%, PRs merged with no review +31.3%, deploys/week −11.7% (BN-27; https://www.faros.ai/research/ai-acceleration-whiplash).
- Faros Q3 2026: PR size +71.8%, no-review merges +76.3% (GP-R9; https://www.faros.ai/blog/ai-speed-trap-takeaways). One framing per report; never combine.
- LinearB: agentic PRs wait 17.6 h at P75 vs 3.4 h for unassisted, and merge 32.7% vs 84.4% within 30 days (BN-28; https://linearb.io/library/ai-in-software-development).
- h3 *Wait time vs active time.* Jellyfish saw review time *fall* (BN-29; https://jellyfish.co/blog/ai-impact-data-june-2025/). Reconcile per AG §5.3: queue and wait time grow with agent-PR volume and size, active time can fall, and shallow review is a third explanation.

**h2 Amdahl's arithmetic** — *worked example 1*
- Inputs:
  - Coding and testing are ~25–35% of idea-to-launch time (BN-30; https://www.bain.com/insights/from-pilots-to-payoff-generative-ai-in-software-development-technology-report-2025/).
  - Developers spend 16% of their time coding (BN-31; https://www.atlassian.com/blog/developer/developer-experience-report-2025).
  - DX puts coding at "about 14%" (GP-R8; https://getdx.com/blog/ai-productivity-gains-more-modest-than-expected/).
- Illustrative arithmetic, with no organisation named:
  - With coding at 30% of lead time, a 2× coding speed-up cuts lead time by 15%.
  - An infinitely fast coder cuts it by at most 30%.
  - If review is r% of lead time and grows 91% (the Faros 2025 figure), it adds 0.91r back. At r = 10%, that is 9.1 points, which wipes out most of the 15-point gain.
- Show the numbers as a small `<pre>` table.

**h2 Phase-level evidence: when generation stops being the constraint**
- Google's JUnit migration limited CLs per week so reviewers were not overwhelmed (TM-33, LC-9; https://arxiv.org/abs/2501.06972).
- Spotify (Jun 2026): over 99% weekly use, PR frequency +76%, "we now have 76% more PRs to review"; the talk was titled "Coding is no longer the constraint" (GM-R9; https://engineering.atspotify.com/2026/6/code-with-claude-coding-is-no-longer-the-constraint).
- DX longitudinal: AI usage +65%, median PR throughput +7.76%; "AI is a local optimizer" (GP-R8; https://getdx.com/report/ai-and-engineering-velocity-a-longitudinal-analysis/ ; https://getdx.com/blog/ai-assisted-engineering-q1-impact-report/).

**h2 The pilot that looked like a success** — *worked example 2*
- One anonymous company in the Stanford study: PRs +13.6%, effective output +1%, rework 2.6× (p < 0.01). The slide asks: "Is this a failed AI coding assistant pilot?" (GP-R7 / GP-N6; https://aiconference.com/wp-content/uploads/2025/09/Yegor-Denisov-Blanch-Will-AI-Replace-Software-Engineers_-.pptx.pdf).
- Measured by: Stanford SEP research group, git history scored by a model trained on expert panels; not peer-reviewed · T3.
- Lesson: volume metrics show a gain that flow-plus-quality metrics do not (forward link `measuring-success-and-rolling-back`).

**h2 Where the constraint goes next**
- Verification broadly: review, testing, and integrating larger batches. Name the next candidate honestly: specs and requirements are *argued* to be the next constraint, but this is not measured (BN open question 4).
- DORA: "in the absence of a user-centric focus, AI adoption has a negative impact on team performance" (GP-R3; report pp. 60–61).
- DORA's remedy: map the value stream and aim AI at the actual constraint, "rather than using AI to simply generate more code that will only exacerbate the bottleneck" (BN-14; 2025 report pp. 74–76).
- Link `the-maturity-model#rules` for Rule 6 (Coding ≤ Review/Testing + 1).

**What to do box:**
- Map your value stream before buying more generation, and find the phase where work waits longest.
- Measure review *wait* time and *active* time separately, and agentic PRs separately from assisted ones.
- Cap batch size (lines per PR, changes per release) before you scale agent PRs.
- Point your next AI investment at the constraint (review, tests, CI), not at more code.
- For every phase you speed up, name the stability metric that would tell you it backfired (change failure rate, rework rate, reverts).
- Don't report PR counts or "% of code by AI" as the outcome.

---

### 8.2 Ch 2 — The AI-SDLC Maturity Model (`the-maturity-model`, 5,500 words)

**Argument:** a phase's level is what a human reviews, and when, given the authority the AI actually holds. It is earned per task type with an automated check the AI cannot edit, capped by risk, and never a target.

**Lede (draft):**
> Tell three published maturity models you are "at Level 3" and you have told them three different things, none of which says what a human still checks. This model defines a level by one observable fact, what a human reviews and when, read against the authority the AI actually holds. It scores each phase per task type, not per tool or per team. Its first rule: no task climbs past L2 without an automated check the AI cannot edit.

**h2 Why another model**
- No published model is a per-phase grid (MM key finding 1).
- Numbering chaos: Shapiro's L0 is autocomplete, Yegge counts 1–8, Hassan labels SE 1.0–5.0 (MM-3, MM-4, MM-5; https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/ ; https://newsletter.pragmaticengineer.com/p/steve-yegge-on-ai-agents-and-the ; https://arxiv.org/abs/2509.06216).
- Gartner endorses per-task autonomy levels (GM-N3; https://www.gartner.com/en/newsroom/press-releases/2026-06-24-gartner-predicts-ai-coding-costs-will-surpass-average-developer-salary-by-2028-as-token-consumption-surges).

**h2 The defining axis: what a human reviews**
- Sourcegraph: "reviews all generated code" vs the final output (MM-1; https://sourcegraph.com/blog/levels-of-code-ai).
- Dash0: "intent and proof … not diffs" (MM-23; https://www.dash0.com/knowledge/the-six-levels-of-agentic-software-engineering).
- Morris and Feng: a level is a deployment choice, not a capability (MM-8, MM-9).
- What is excluded, and why: capability, agent count, rollout breadth.

**h2 The five levels** — the §3.2 definitions, each with an h3, one paragraph, and the observable evidence an auditor would ask for.

**h2 The rules** (`#rules`)
- h3 *The oracle principle* (`#oracle-principle`, boxed). Evidence:
  - METR: o3 reward-hacked in 30.4% of RE-Bench runs (TM-12; https://metr.org/blog/2025-06-05-recent-reward-hacking).
  - ImpossibleBench (TM-13; https://arxiv.org/abs/2510.20270).
  - Spotify's commented-out tests (TM-38, secondary).
  - Elastic's removed version bump (TM-17; https://www.elastic.co/search-labs/blog/ci-pipelines-claude-ai-agent).
  - ASDLC: the AI "cannot redefine success" (MM-28; https://asdlc.io/concepts/levels-of-autonomy/).
- h3 *Level = authority actually granted.* Kiro: Amazon says "misconfigured access controls" and added "mandatory peer review for production access" (GM-R5; https://www.aboutamazon.com/news/aws/aws-service-outage-ai-bot-kiro). Anthropic's internal examples of agents "attempting database migrations against a production database" (SB-16; https://www.anthropic.com/engineering/claude-code-auto-mode).
- h3 *Score per task type.* Recording format: "Phase: Ln for <task type>".
- h3 *Risk sets a ceiling.* "As risk increases, acceptable autonomy decreases" (MM-27; https://blog.jread.com/posts/ai-levels-of-autonomy-in-software-engineering/).
- h3 *No L5; L4 is narrow and reversible.* MM-5, SB-23 (https://cloudsecurityalliance.org/blog/2026/01/28/levels-of-autonomy); Thoughtworks on agent swarms (GM-N1; https://www.thoughtworks.com/radar/techniques).
- h3 *A heuristic: Coding at most one level above Review and Testing.* Labelled as the book's proposal; evidence BN-26–28, BN-12.
- h3 *Evidence beats self-report.* Auto-approve ~20% → >40% (MM-32; https://www.anthropic.com/research/measuring-agent-autonomy); 93% of prompts approved (SB-16); r = 0.17 (GP-N7).

**h2 Controls that come with each level**
- The §3.4 table.
- CSA per-level controls (SB-23); AWS Scoping Matrix (SB-24; https://aws.amazon.com/blogs/security/the-agentic-ai-security-scoping-matrix-a-framework-for-securing-autonomous-ai-systems/).
- Forward link `security-permissions-and-blast-radius#permission-envelope`.

**h2 Enablers that gate a level**
- DORA's seven capabilities and their two trade-offs (GP-R3; https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model).
- Microsoft: "agents do not magically fix broken engineering practices" (MM-17).

**h2 The grid** (`#grid-*`)
- The §3.7 grid rendered per phase: criterion per cell, the best evidence named, and "None found" printed where true.
- Close with the three grid observations.
- Footnote on classical ML (Harness CV, TM-19) and on deterministic automation being L0 for AI (Spotify Fleet Management, GM-R9).

**h2 Translating other models** (`#crosswalk`)
- The §3.6 table, including the note on the wiki's own `/concepts/autonomy-levels/` numbering.

**h2 Scoring yourself** (`#self-assessment`) — *worked examples*
- **Worked example 1: scoring dotnet/runtime's coding phase from public data** (GM-R7; https://devblogs.microsoft.com/dotnet/ten-months-with-cca-in-dotnet-runtime/).
  - Every agent PR is human-reviewed → L2 for all task types.
  - Cleanup (84.7% merged) and tests (75.6%) are the candidates for L3. Performance work (54.5%) is not.
  - What L3 would require: a verifier the agent cannot edit, and a 90-day escaped-defect comparison. The 0.6% vs 0.8% revert data is a start, but the sample is too small.
- **Worked example 2: scoring Spotify's maintenance phase** (GM-R9).
  - Deterministic verifiers run in a stop hook; the agent is sandboxed; push and Slack messages come from the surrounding infrastructure, not the agent; migration drivers approve.
  - → L3 for fleet migrations.
  - Fleet Management's auto-merged PRs are deterministic → L0 for AI despite being "autonomous".
- **Worked example 3: scoring by granted authority (Kiro).**
  - Whatever the intended review mode, an operator role broad enough to delete and recreate a production environment put that task at de facto L4.
  - Amazon's fix (peer review for production access) returned it to L2.
  - Print both accounts.
- The self-assessment grid template: phase × task type × level × evidence × risk ceiling × credentials held (link `templates`).

**What to do box:**
- Fill the grid per task type, citing evidence (approval logs, attribution, routing config), not opinions.
- For every claimed L3, write down the oracle and who can edit it. If the agent can, you are at L2.
- Inventory the credentials and permission modes your AI tools hold. Wherever they exceed your review mode, record the higher level.
- Set a risk ceiling per phase before anyone proposes a climb.
- Check Rule 6: if Coding sits two levels above Review or Testing, raise those first.
- Re-score every quarter; expect drift upward and make people show the evidence.

---

### 8.3 Ch 3 — Case Studies: Who Did It and What They Measured (`case-studies`, 6,000 words)

**Argument:** L3 works where a deterministic verifier closes the loop and fails where agents got irreversible authority without an environment boundary; almost everything else is volume with no outcome measure.

**Lede (draft):**
> The public record on AI-driven delivery is mostly volume: pull requests merged, lines generated, developer-years "saved". Almost none of it measures what broke. Ten cases survive a harder filter, four of them failures, and they tell one story. L3 works where a deterministic check closes the loop, and incidents happen where an agent held irreversible authority with no environment boundary. Each case carries its evidence grade, so you can see how much weight it can bear.

**h2 How to read a case**
- Tier badge, "Measured by" line, level tagged by granted authority, and "what it does not show".
- Restate T1–T4 in four lines.
- Why ten: they are the cases that publish a method or a failure (AG §3).

**h2 Where it worked: verification closed the loop**
- h3 **Google: LLM-assisted migrations** (T2; Maintenance L2 → L3).
  - int32→int64: 80% of edits AI-authored, ~50% time saved (estimated). JUnit3→4: 5,359 files in 3 months, ~87% unchanged. Joda: ~89% (extrapolated).
  - "LLMs alone through simple prompting is not sufficient for anything but the simplest of migrations."
  - Review throttled the CLs.
  - Year-long study: 39 migrations, 74.45% of changes LLM-generated.
  - Sources: TM-32, TM-33, LC-10; https://arxiv.org/abs/2501.06972 ; https://arxiv.org/abs/2504.09691.
  - Doesn't show: quality over time ("remains to be seen").
- h3 **Meta: TestGen-LLM and ACH** (T2; Testing L2).
  - Raw yield 75/57/25%; 73% of filtered recommendations accepted; ACH 73% accepted, 36% privacy-relevant (TM-1, TM-2; https://arxiv.org/abs/2402.09171 ; https://arxiv.org/abs/2501.12862).
  - Point: the filter is the oracle.
  - Doesn't show: escaped-defect reduction; acceptance ≠ correctness.
- h3 **Spotify: Honk** (T3; Maintenance L3).
  - 1,500+ merged PRs; 60–90% time saved where measured; verifiers in a stop hook ("the PR isn't opened"); judge vetoes ~25%, and the agent recovers half the time.
  - "It's highly sandboxed"; a deliberately tiny toolset ("The more tools you have, the more dimensions of unpredictability you introduce").
  - Later +76% PRs to review.
  - Sources: GM-R9, Parts 1–4 URLs.
  - Note: the judge's removal is reported only by InfoQ (secondary).
  - Doesn't show: failure or revert rates.
- h3 **Microsoft: Copilot Coding Agent in dotnet/runtime** (T2; Coding L2, edging to L3 for cleanup and tests).
  - 878 PRs; 67.9% vs 87.1% merged; 38.1% → 69% after setup, "not through better AI models, but through better preparation".
  - Reverts 0.6% vs 0.8%; 16.5 vs 12.4 review comments; 86.2% success when humans co-commit (GM-R7, RR-23–26).
  - Doesn't show: compute or CI cost ("These are real costs").
- h3 **Uber: uReview** (T3; Review L2 → L3).
  - >90% of ~65,000 diffs per week. Print it as "Uber's headline figure; the same post also says 'per month'".
  - 75% useful; >65% addressed vs 51% for human comments; precision filters, a grader model, category suppression (GM-R10, RR-38; https://www.uber.com/en-US/blog/ureview/).
  - Doesn't show: correctness of "addressed" (a model-computed proxy).
- h3 **Google: DIDACT build repair** (T2, RCT; CI L1).
  - 50% of developers for 11 weeks; 34% applied fixes; ~2% throughput; no detectable rise in rollbacks (TM-16; https://research.google/blog/safely-repairing-broken-builds-with-ml).
  - Point: the honest effect size, and the only study that measured downstream safety.

**h2 Where it did not: three negative results**
- h3 **An industrial AI-review study** (T1; Review L2, negative).
  - 73.8% of comments resolved, but mean closure time rose from 5h52m to 8h20m (RR-40; https://arxiv.org/abs/2412.18531).
- h3 **Answer.AI's month with Devin** (T1, n=20; a failed L3 attempt).
  - 3 successes, 14 failures, 3 inconclusive. "would spend days pursuing impossible solutions"; "Tasks it can do are those that are so small and well-defined that I may as well do them myself" (GM-R8; https://www.answer.ai/posts/2025-01-08-devin.html).
  - Dated tool; the point is scoping, not the product.

**h2 Where it broke: authority without a boundary**
- h3 **Replit: the production database** (T4, acknowledged; Coding + Ops de facto L4).
  - Masad: "Unacceptable and should never be possible"; the fix was automatic dev/prod database separation.
  - Replit docs now: the Agent "can't touch" production (FR-C1, SB-R10; https://www.theregister.com/2025/07/22/replit_saastr_response/ ; https://docs.replit.com/features/data-and-storage/development-and-production).
  - Avoid the record counts (secondary).
- h3 **Amazon Kiro and AWS Cost Explorer** (T4, disputed; Ops de facto L3/L4 → rolled back to L2).
  - Two columns:
    - FT via Reuters/Engadget: 13 hours; "delete and recreate the environment".
    - Amazon (20 Feb 2026): "user error—specifically misconfigured access controls"; "extremely limited event"; "mandatory peer review for production access".
  - Both agree on the class (GM-R5; https://www.aboutamazon.com/news/aws/aws-service-outage-ai-bot-kiro).
  - Forward link `security-permissions-and-blast-radius`, which carries the full incident set (PocketOS, Nx, Amazon Q).

**h2 The pattern across ten cases**
- Verifier present → L3 works (Google, Meta, Spotify).
- Review capacity throttles (Google, Spotify, the Qodo study).
- Preparation beats model (dotnet).
- Authority without a boundary → incident (Replit, Kiro).
- Small honest effects (DIDACT ~2%).

**h2 What the record does not contain**
- No large-company L3/L4 rollout measured on outcomes (change failure, incidents). dotnet's revert rate is the only public agent-vs-human comparison (LC open question 3; GM-N5).
- No published rollback trigger for coding agents (GF-20); the nearest precedents are in `measuring-success-and-rolling-back`.
- *Worked example: re-reading a headline.* Take "the equivalent of 4,500 developer-years" (Amazon, T4) and ask the five questions below; it fails four of them. Present the claim in a vendor-reported box (GM-R6). The arithmetic belongs in Ch 4; here it is the reading exercise.

**What to do box:**
- For any case, internal or external, ask five questions:
  - Who measured?
  - Against what baseline?
  - Over what window and n?
  - What does "success" count?
  - What authority did the AI actually hold?
- Discount any figure that answers none of them to T4, however famous.
- Prefer cases that publish a negative number; they are the ones you can calibrate against.
- Copy the patterns, not the products: verifier first, a small toolset, a sandbox, review capacity planned.
- Read every incident for the boundary that was missing, not for the model that was used.

---

### 8.4 Ch 4 — Economics, Risk and Measurement (`economics-risk-and-measurement`, 4,000 words)

**Argument:** the honest economics is a modest, conditional speed-up paid for in review time, tokens and risk; you can plan with the evidence only if you read each number by its tier and by what it actually counted.

**Lede (draft):**
> Controlled trials of AI coding tools range from 19% slower to 56% faster, and the developers who were 19% slower believed they were 20% faster. A business case built on any single one of those numbers, or on self-report, is built on sand. The honest economics is a modest, conditional speed-up paid for in review time, tokens and risk. The evidence is good enough to plan with, if you know which tier each number comes from and what it actually counted.

**h2 The range, and what moves it**
- Peng +55.8% on a greenfield HTTP server (T2; BN-23; https://arxiv.org/abs/2302.06590).
- Cui et al. +26.08% (SE 10.3%) across 4,867 developers (T1, mixed; BN-24; https://doi.org/10.1287/mnsc.2025.00535).
- Google ~21%, "confidence interval is large" (T2; BN-19; https://arxiv.org/abs/2410.12944).
- METR −19% on experienced developers' own large repos (T1; BN-16; https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/).
- Moderators: task type × familiarity × codebase maturity × tool generation (AG §5.4).
- Stanford matrix (T3): greenfield/low complexity +35–40%; brownfield/high complexity +0–10%; niche languages (−5)–5% (GP-R7). Quote ranges and the authors' "orientative" label; note the slide-title inconsistency.
- h3 *Why clean RCTs are getting rare.* METR 2026: "30% to 50%" of developers skipped tasks they would not do without AI, so the data are "an unreliable signal" (BN-17; https://metr.org/blog/2026-02-24-uplift-update/). Not a reversal.

**h2 Perception is not measurement**
- METR: forecast +24%, believed +20%, measured −19%.
- DORA 2025: >80% believe productivity rose (GP-N2).
- Stanford: r = 0.17 between self-rated and measured productivity; misjudged by ~30 percentile points, n = 43 (GP-N7).
- Telemetry sits far lower:
  - Pichai: "now at 10%" engineering velocity (T4; GP-R5; https://lexfridman.com/sundar-pichai-transcript).
  - DX median +7.76% PR throughput (T3; GP-R8).
  - Bain 10–15% (BN-30).
- Org-level null: the Danish administrative data rule out effects larger than 2% on earnings and hours two years after ChatGPT (T1; GF-31; https://ideas.repec.org/p/nbr/nberwo/33777.html). Keep it brief; it is a labour-market result.

**h2 Volume is not value: "% of code written by AI"**
- Google: >25% (Oct 2024) → "well over 30%" (Apr 2025) → "75% of all new code … AI-generated and approved by engineers" (Apr 2026) (BN-21, GP-N1; https://abc.xyz/2025-q1-earnings-call/ ; https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/cloud-next-2026-sundar-pichai/).
- Pichai's own caveat that velocity, not code share, is "the most important metric" (GP-R5).
- Nadella "maybe 20 to 30 percent … in some of our projects", as reported by The Register (GP-R6).
- Coinbase "95–100% … by or with LLMs" (LC-24).
- DX AI-authored share 22% → 27.4% → 52.7%, with a methodology rebuild, so not a series (GP-R8).
- Banned-move reminder: never compare these across firms.

**h2 Counterfactuals dressed as measurements** (vendor-reported box)
- Amazon: "We estimate this has saved us the equivalent of 4,500 developer-years"; "79% … without any additional changes"; "$260M" (T4; GM-R6; https://simonwillison.net/2024/Aug/24/andy-jassy-amazon-ceo/ ; https://aws.amazon.com/blogs/devops/amazon-q-developer-just-reached-a-260-million-dollar-milestone/).
- Airbnb: 1.5 years "originally estimated" (TM-34).
- McKinsey 2025: top-quintile performers, but outcomes self-assessed by the same respondents, so the comparison is circular (GM-R4).

**h2 What it costs**
- h3 *Seats to tokens.*
  - GitHub moved Copilot to token-based AI Credits on 1 Jun 2026 because agentic use "brings significantly higher compute and inference demands" (GP-R10; https://github.blog/changelog/2026/04/27/github-copilot-is-moving-to-usage-based-billing/).
  - Claude Code averages ~$13 per developer per active day, $150–250 per month (vendor; https://code.claude.com/docs/en/costs).
  - Gartner forecasts AI coding costs overtaking the average developer salary by 2028, as a labelled forecast (GM-R3e).
  - Mark all prices "(as of October 2026)".
- h3 *Review is the line that does not shrink.*
  - Anthropic Code Review "$15–25" and ~20 minutes per review (vendor; RR-42; https://claude.com/blog/code-review).
  - dotnet agent PRs draw 16.5 review comments vs 12.4 (GM-R7).
  - Link `/operations/economics-roi/cost-of-human-review/`.
- h3 *Budgets without outcomes.* Uber's reported overrun (T4, secondary; https://qz.com/uber-coo-ai-spending-harder-justify-052626). DX: median quarterly AI spend ~$1.5K → $44K while the innovation ratio stayed ~57–58% (T3; https://getdx.com/news/dx-releases-q2-2026-state-of-ai-impact-in-engineering-report/).
- **Worked example: a cost-per-merged-change model.**
  - Formula: cost per merged change = (agent tokens + CI minutes + reviewer minutes × loaded rate + rework) ÷ merged changes.
  - Published parameters to plug in:
    - Insight's single-feature experiment: $2.59–$33.38 to merge, 26 min to ~3 h, with the harness alone moving cost ~2.5× and review time excluded (T3; https://blog.apac.insight.com/2026/07/06/cost-to-a-merged-feature).
    - Anthropic's $15–25 per AI review.
    - Merge rate as the denominator (67.9% in dotnet).
  - No organisation publishes this number including human review time (GP-R10). Say so, and tell the reader to compute their own.

**h2 What it risks** (summary; detail in `security-permissions-and-blast-radius`)
- Code: Veracode 2026 security pass rate "stalled at 56%", no gain from size or specialisation (T3; SB-2; https://www.veracode.com/?p=31889). SusVibes: 57% functional, 11.8% secure on real repo tasks (T1; SB-4; https://proceedings.mlr.press/v306/zhao26ax.html). Users more confident in less secure code (T1; SB-R3; https://arxiv.org/abs/2211.03622).
- Supply chain: hallucinated packages ≥5.2% (commercial) and 21.7% (open-source), and they repeat predictably (T1; SB-R5).
- Legal (as of October 2026; link Appendix B):
  - The Ninth Circuit rejected the DMCA §1202(b) output theory; contract claims are pending (FR-C33).
  - USCO: prompts alone do not create authorship (FR-C34).
  - EU AI Act Annex III 4(b) *may* cover AI scoring of developers; this is an inference pending legal review (FR-C36).
- Quality data from GitClear, CodeRabbit and Uplevel go in a vendor box with their caveats (FR-C20–C22). Independent security studies carry the argument (AG §5.6).

**h2 A policy for reading vendor numbers**
- The tier rule.
- Vendor-on-own-product → box.
- Accept direction, not magnitude, from pooled telemetry.
- One framing per report.
- Forward link `measuring-success-and-rolling-back` for which metrics to adopt.

**What to do box:**
- Budget for a modest, conditional gain. Plan on single-digit to low-double-digit throughput improvements until your own data say otherwise.
- Never put self-report or "% of code by AI" in a business case. Use flow and stability metrics.
- Build your own cost-per-merged-change, including reviewer time, before scaling agents.
- Set per-team token budgets and an outcome metric at the same time as usage pricing.
- Price risk as a line item: SAST, secret scanning, dependency allow-lists and the review hours they need.
- Grade every number in your deck T1–T4 and remove the T4s from the argument.

---

## 9. Open questions for the owner

1. **The site's own autonomy scale disagrees with the book's.** `/concepts/autonomy-levels/` numbers from L0 = "Suggest" (its L0–L2 sit one step below the book's L1–L3). Options: (a) print the crosswalk note only (current plan); (b) revise the concept page to match the book; (c) rename the book's levels to avoid "L" numbers. Recommendation: (a) now, (b) as a follow-up issue.
2. **Rule 6 (Coding ≤ min(Review, Testing) + 1): rule or heuristic?** The bible treats it as a labelled heuristic because the supporting data are correlational vendor telemetry. Confirm, or promote it to a rule.
3. **Zalando's auto-approval bot in the Review L4 cell.** The source does not say whether the bot uses an LLM. If it is rule-based, the cell stays "No LLM evidence" with Zalando as a non-AI precedent (current plan). Should we contact Zalando or drop it?
4. **Disputed and paywalled primaries.** Kiro (FT paywalled; Amazon rebuttal primary) and Morgan Stanley (WSJ paywalled) are used with labels. Approve using them, or require the paywalled primaries to be read before Part I ships?
5. **The new appendix re-letters the existing ones** (Glossary B → C, Bibliography C → D). Slugs are unchanged, so no links break. Approve?
6. **Ch 12's adapted template** ("permission envelope" instead of "ladder"). Approve, or force the standard ladder?
7. **The permission envelope (§3.4) and the rollback triggers (Ch 17) are the book's own proposals**, synthesised from vendor defaults, Tricorder and Google SRE. No organisation has published outcome-validated versions. Are you comfortable with the book making normative proposals, clearly labelled?
8. **Legal statements.** CRA applicability to AI-generated code and Annex III 4(b) coverage of developer-productivity scoring are inferences (OG-49, FR-C36). Do we get a lawyer-checked paragraph, or keep them phrased as open questions?
9. **Disclosure.** The book is drafted by Claude agents and cites Anthropic research and products (the autonomy telemetry, auto-mode classifier, skill RCT, Code Review, Claude Code costs). The style guide already applies vendor rules to Anthropic. Should the Preface carry an explicit disclosure line, and in what words?
10. **Classical ML in the grid.** The bible counts classical ML as "AI" (with a footnote) and deterministic automation as L0 for AI. Confirm.
11. **Ch 4 title.** The slug stays `economics-risk-and-measurement`. With risk detail moved to Ch 12 and metrics to Ch 17, should the display title become "Economics and Evidence" (slug unchanged)? Current plan: keep the title.
12. **Length.** The bible budgets ≈ 65k body + ≈ 5k appendices (top of the 60–70k range). Confirm, or trim Ch 3 (6,000) first.
13. **The Ch 3 case mix.** The bible keeps the aggregator's ten (six positive or mixed, four negative). The available swaps: Stripe Minions for DIDACT; PocketOS for Kiro; Airbnb for Spotify. Approve the ten?
14. **Undated primaries.** Google's SRE page (GF-10/GF-16) and Amazon's Kiro page show no date on the page. Cite with "accessed October 2026" and the coverage date (Feb 2026 for Kiro). OK?
