# *Last Mile*: book bible

Binding for every writer and checker. Spec: `docs/superpowers/specs/2026-10-17-last-mile-fde-book-design.md`.
Research: `research/*.md`. Brief codes: RM role-and-market, CA cases, EP engagement-practice, FA failure,
CO competition. `research/aggregate.md` maps claims to chapters.

## 1. Thesis

The model was never the hard part. The distance between a capable model and a customer outcome is made of five things:
- a misread problem;
- data nobody can reach;
- a review nobody planned for;
- a number nobody agreed;
- a system nobody owns once the vendor leaves.

The Forward Deployed Engineer is the person paid to own that distance. Owning it means writing the code *and* deciding what the code is for. The FDE is accountable for the outcome rather than the ticket, and always plans to leave.

The best public account of why the role exists comes from OpenAI. It set up FDEs because its "hands-off… technical support model was just not reliably getting these folks to production" (CA, Jarvis/Altimeter 2025-11-26, T2). Practitioners also say most stalled efforts are deployment problems, not model problems (EP, TNW 2026-09-23, T3).

Every chapter serves this thesis. Each one names a stretch of the distance, says how it goes wrong, and gives the reader something to use on it.

**Voice.** Write as a senior practitioner talking to a peer: direct, specific and opinionated, with no hype. Each chapter argues one point. Where the evidence is weak, say so in the sentence; never imply strength the source lacks.

## 2. Terms (glossary seed)

| EN | ZH | Definition / note |
|---|---|---|
| Forward Deployed Engineer (FDE) | 前线部署工程师（FDE） | Use 前线部署工程师 throughout; it is the media majority and Tencent's job title (CO). Mention once, in how-to-use and the glossary, that Beijing policy 京发改〔2026〕1185号 uses 前沿部署工程师. Note also 前置 (Sina) and 前線 (Taiwan), and flag 前端部署工程师 as a misleading rendering. |
| engagement | 交付（一次交付） | One customer, from first contact to handoff. |
| discovery | 需求挖掘 | |
| scope / first win | 范围 / 首个成果 | |
| success metric / acceptance threshold | 成功指标 / 验收阈值 | |
| eval, eval set, golden set, regression suite | 评测、评测集、黄金集、回归套件 | |
| baseline | 基线 | Performance of the current process *before* AI. |
| handoff | 交接 | |
| proof of concept (PoC) / paid pilot | 概念验证（PoC）/ 付费试点 | |
| statement of work (SOW) | 工作说明书（SOW） | |
| zero data retention (ZDR) | 零数据保留（ZDR） | |
| data residency | 数据驻留 | |
| Deployment Strategist | 部署策略师 | The non-coding partner role at Palantir, Salesforce and Mistral. |
| composite | 合成案例 | See §3. |
| echo | 回声数字 | One self-reported figure repeated by several outlets until it looks independently confirmed. |
| Echo / Delta (Palantir) | Echo / Delta | Palantir's domain-expert and prototyper team types (EP, T3). Used only in Ch 2. |

## 3. Evidence rules

- **Tiers** (state the tier in prose, e.g. "(T2: vendor-reported)"):
  - **T1:** measured, primary and independent.
  - **T2:** measured and primary, but vendor- or self-reported.
  - **T3:** secondary reporting.
  - **T4:** anecdote, opinion, advice, doctrine, a stated target, or a job post.

  **The T2/T4 line is measurement.** T2 = measured, primary, vendor- or self-reported (e.g. CORE-Bench 42%→95%, Klarna 20→400 policies, Morgan Stanley's 6–8 weeks + 4 months, LinkedIn 80%→95%). T4 = vendor advice, doctrine, stated targets or opinion, even from the same vendor or speaker (e.g. Anthropic's eval guidance, Jarvis's 20%→50% reuse target). Independent guidance (OWASP) and analyst forecasts (Gartner) are T4 too. State this rule once in how-to-use; every chapter follows it.

  Job posts are T4 for how the job is *done*, but primary evidence for what employers *ask for*. Say which use you are making.
- **The book is honest about what is weak.** T1 evidence on how engagements run barely exists (EP). Of the ten best cases, the only T1-measured outcome is a failure (NYC MyCity). Say so where it matters.
- **Echo check.** Name a headline number as an echo when its circulation traces to one source. Known echoes:
  - the Indeed growth figures (643 → 5,330; 800%+; 10×);
  - Tomoro's "~150 FDEs";
  - Morgan Stanley's "98%", which is team adoption in one source and *daily individual use* in another;
  - Klarna's "two-thirds" vs "75%".

  Never blend growth rates across windows (aggregate contradiction #10).
- **Composites.** Every composite sits in `<div class="callout composite" data-badge="Composite">`.
  - Never a named or guessable company.
  - Ranges only, never point figures, and no invented number beside a real one.
  - Each beat cites, in its last sentence, the verified pattern it dramatises.
- **Verified boxes.** Pay, headcounts, employer moves, model or product names and policy dates go in `<div class="callout verified" data-badge="Verified 2026-10">`. The durable argument must stand if the box is deleted.
- **What to cut.** Cut any unsourced roadmap claim. Cut the unsourced "60% fail the client round" (CO/RM: unreliable). Cut "$485K" (low). Never cite the MIT NANDA "95%" without its method (52 orgs, 153 leaders, 300+ initiatives; "directionally accurate"; reaching deployment is not success) and the Futuriom critique.

## 4. What this book adds, and what it must not duplicate (from CO)

**Do not re-teach:**
- the generic enterprise-AI stack. Link to wiki pages instead (§8).
- company-by-company interview prep (Aced, Exponent, Gayle's courses). Synthesise and link.
- Palantir lore at length. xdash covers it deeply in Chinese.

**Must add, in every Part where it fits:**
1. Per-claim grading, including echo detection.
2. Free templates aligned to the evidence.
3. FDE-specific failures, with the sceptical view as first-class material: Pragmatic Engineer's "less desirable" reporting (two hires disappointed by an "IT services mindset", one quit after 4 weeks), "much FDE content is really AI engineering" (Gayle), and the drift toward consulting entities (DeployCo, Ode).
4. The China market, including Chinese titles and pay, in both languages.
5. Dated timeliness. The O'Reilly book (Gayle) is Early Release with 2 of 12 chapters, due 2027-12-25.

One-line differentiator per Part:
- **I:** the only account of the role that grades its own evidence and takes the sceptics seriously.
- **II:** an engagement manual with a free template per phase.
- **III:** judgment grounded in real rescues, not maxims.
- **IV:** career facts with their echoes removed, in two markets.

## 5. Per-chapter table

Format: argument (one sentence) · cases (tier) · template · links out (paths verified to exist on 2026-10-17).

### Part I · The Role

**how-to-use** (H)
- **Argument:** Use this book by situation, not cover to cover. Trust each claim exactly as far as its tier.
- **Contents:**
  - reading paths;
  - tiers, with one real example each: T1 MyCity, T2 Palantir S-1, T3 NHS FDP via The Register, T4 an OpenAI job post;
  - the echo convention;
  - live composite and verified examples;
  - the Chinese-term note;
  - the situation index (§7).
- **Template:** none.
- **Links:** published book chapters; `/books/ai-driven-sdlc/`.

**what-an-fde-is** (1)
- **Argument:** An FDE is defined by owning the outcome across discovery through handoff, with the code as the means. Every title that drops one of those stages is a different job, whatever it is called.
- **Cases:**
  - OpenAI's role definition, with the healthcare "commercial relationship not required" line (T4, RM);
  - Palantir's "startup CTO" (T4);
  - Bloomberry's 60/30/10 split (T2);
  - Tryolabs' consultant/contractor test (T4);
  - Gayle's "much FDE content is really AI engineering" (T2/T4, CO);
  - Pragmatic Engineer's disappointed hires (T4, CO).
- **Template:** a role-comparison grid (FDE / SA / SE / consultant / applied AI engineer), drawn on what each one owns.
- **Links:** `/concepts/agent-evaluation/`.

**origins-and-economics** (2)
- **Argument:** Palantir proved that losing money on pilots can buy an 87%-margin customer. The AI labs adopted the pattern because models need the same last mile. The 2026 move of FDE capacity into separate deployment companies shows the services trap is still live.
- **Cases:**
  - Palantir S-1 Acquire/Expand/Scale economics (T2);
  - Qureshi on FDE→PD (T4);
  - a16z "Trading Margin for Moat" (T4);
  - OpenAI's rationale and "short-term lure of services revenue" (T2, CA);
  - DeployCo/Tomoro and Ode (T3, Verified box).

  Keep the Palantir history short (§4).
- **Template:** none.
- **Links:** `/concepts/agent-cost-control/`.

**the-skill-map** (3)
- **Argument:** Employers list skills. Engagements reward four kinds of behaviour, and job posts measure only two of them well. Place yourself by what you have *done*, not by what you know.
- **Evidence:** thin. Job posts are T4 for *what employers ask for*; Bloomberry's skill frequencies are T2; there is no data on which skills predict success. Say exactly that.
- **Template:** the rubric (§6), as a self-assessment.
- **Links:** none required.

### Part II · The Engagement

Chapter template, in this order (**binding**):
1. What this phase is for, and how it fails.
2. The composite beat.
3. The playbook, as STEPs.
4. The template: blank, then filled from the composite.
5. Failure signals.
6. "Ready to move on" checklist.
7. A closing tip.

Communication tactics live inside the playbooks: demos in Ch 6, bad news in Ch 9, executives in Ch 11.

**before-the-engagement** (4)
- **Argument:** The engagement is decided before the FDE arrives, by the pilot's terms. A free, open-ended proof of concept is designed not to reach production. A short paid pilot with one agreed KPI is designed to.
- **Cases:**
  - Palantir AIP bootcamps: 5 days vs 1–3-month pilots, 560+ bootcamps, the $26M and $96M examples, no conversion rate disclosed (T2: vendor earnings calls).
  - Palantir S-1: pilots run "at a loss", 6–9-month cycles (T2).
  - Pear, Heavybit and Shimoni paid-pilot guidance (T4).
  - Lemkin's "70%+" conversion (T4, low; label it as low).
  - Anthropic and Harvey posts showing FDEs in pre-sales (T4).
- **Thin evidence:** say so. There is no independent pilot-conversion data.
- **Template:** an engagement brief and pilot-terms checklist covering:
  - sponsor;
  - decision-maker;
  - budget owner;
  - the one KPI and its baseline source;
  - duration (30, never above 90 days);
  - price and credit-on-conversion;
  - data access by day 5;
  - exit criteria;
  - what happens on success.
- **Links:** `/concepts/cost-quality-latency/`; `/books/ai-driven-sdlc/the-90-day-pilot/`.

**discovery** (5)
- **Argument:** The customer's stated problem is a hypothesis about their business, and usually the wrong one. Discovery's job is to find the lever leadership actually cares about and the workflow where it lives. That happens on site, before any model is chosen.
- **Cases:**
  - RAND root cause #1, from 65 practitioner interviews (T1). Use it as the anchor.
  - The OpenAI European semiconductor engagement: two weeks on site, chose verification at 70–80% of engineer time (T2, Altimeter video).
  - Jarvis: "what the customer describes in scoping doesn't match the data/system reality" (T3).
  - The two-day visit with AI set aside (T3, TNW).
  - Palantir's "Why are we delaying so many flights?" (T4).
  - Sierra's 20+ stakeholders and no APIs (T2).
  - Qureshi on tacit knowledge (T4).
- **Template:** a discovery interview guide. It covers:
  - the business lever;
  - the current workflow;
  - who touches it;
  - volumes and time, as ranges;
  - where data lives and who owns it;
  - what "better" means to each stakeholder;
  - the failure the customer fears most;
  - ends with a "stated problem vs. observed problem" summary box.
- **Links:** `/operations/evaluation-and-observability/failure-taxonomy-and-triage/`.

**scoping-and-the-first-win** (6)
- **Argument:** Agree the success metric, its threshold and its baseline *before* building, and pick a first win that matters to the business but fits in weeks. A first win on a side workflow proves nothing, and one without an agreed number cannot be won.
- **Cases:**
  - Jarvis: "pick something with genuinely high stakes" and "bias for moving fast, proving out any brick walls" (T2/T3).
  - RAND: commit for at least a year (T1).
  - Stanford: 73% started small, 63% framed as experiments (T2; draft, successes only, so flag survivorship).
  - MIT NANDA: narrow wins then expand (T2, with method caveat).
  - WeightWatchers/Sierra: small-traffic trial (T2).
  - Alpine Edge four-week template and its "no production-like data access by end of week one" warning (T4).
  - Claude docs success-criteria shape (T2).
  - The demo as a communication tool: show the real workflow on real or realistic data, never a slide.
- **Template:** a one-page scope covering:
  - problem (from Ch 5);
  - in scope / "not now" list;
  - success metric;
  - baseline and how measured;
  - threshold;
  - held-out set owner;
  - first demo date;
  - week-by-week plan;
  - risks;
  - sign-off names.
- **Links:** `/concepts/evals-101/`; `/operations/evaluation-and-observability/eval-driven-agent-development/`.

**data-access-and-integration** (7)
- **Argument:** Integration, not modelling, is where FDE time goes. Write-back is harder than read. An integration nobody maintains decays faster than a model.
- **Cases:**
  - Jarvis "translation layer" (T4, self-description);
  - Qureshi "data integration… negotiating with data owners" (T4);
  - NHS FDP write-back (T3);
  - MD Anderson never updated after the Epic move (T3);
  - Stanford "77% invisible costs" (T2);
  - RAND #2 and #4 (T1).
- **Template:** a data-access request.
- **Links:**
  - `/operations/safety-and-security/permission-aware-retrieval/`
  - `/operations/safety-and-security/scoped-credentials-for-agents/`
  - `/deep-dives/retrieval-and-rag/document-parsing-for-rag/`
  - `/deep-dives/mcp/mcp-building-servers-in-practice/`

**security-governance-and-model-risk** (8)
- **Argument:** The customer's review is a design input, not a gate at the end. Its first question about AI is about the data (retention, training, residency), and its hardest is the one nobody can fully answer: indirect prompt injection.
- **Cases:**
  - Morgan Stanley's ZDR gate (T2);
  - OWASP LLM01 (T1);
  - SR 26-2 replacing SR 11-7 (T3, Verified box);
  - Replit (T3);
  - Air Canada (T3);
  - MD Anderson governance (T3);
  - the Stanford vs Informatica/Deloitte contradiction (#11) on whether security kills projects.
- **Template:** the AI security-questionnaire answers.
- **Links:**
  - `/operations/safety-and-security/prompt-injection/`
  - `/concepts/data-residency-and-sovereignty/`
  - `/deep-dives/agent-security/decision-receipts-and-audit/`
  - `/operations/safety-and-security/deployment-safety-checklist/`

**evals** (9)
- **Argument:** The eval set is the contract. Build it with the customer's experts before the agent, and expect the climb from 80% to the threshold to take longer than everything before it.
- **Cases:**
  - Jarvis "five with the experts" and "not done until you have a set of evals" (T4, doctrine);
  - Klarna eval-per-intent, 20 → 400 policies (T2);
  - Morgan Stanley "start with evals" (T2);
  - Anthropic's 20–50 tasks, pass^k and broken graders (T4, vendor advice);
  - LinkedIn's 80% → 95% over four months (T2);
  - Husain and Yan (T4);
  - McDonald's low-80s vs a 95%+ target (T3).
- **Bad news:** delivering it is taught here.
- **Template:** an eval plan.
- **Links:**
  - `/concepts/agent-evaluation/`
  - `/deep-dives/evaluating-agents/judge-calibration-and-meta-evaluation/`
  - `/operations/evaluation-and-observability/eval-set-maintenance/`
  - `/deep-dives/evaluating-agents/eval-driven-development-and-ci/`

**building-in-their-environment** (10)
- **Argument:** On someone else's infrastructure the binding constraints are theirs. Put the rules that must hold outside the model, and build the least clever thing that clears the eval.
- **Cases:**
  - Airbus A350 / Palantir (T4/T3);
  - the APAC automotive deterministic constraint (T3);
  - OpenAI "code on customer infrastructure" (T3);
  - air-gapped and cleared work, from job posts (T4);
  - Anthropic "start with APIs directly" (T4).
- **Thin evidence:** lean on wiki links; do not re-teach the stack.
- **Template:** an architecture decision record.
- **Links:**
  - `/deep-dives/agent-security/sandbox-and-isolation-patterns/`
  - `/operations/agentops/self-hosted-inference-for-agents/`
  - `/operations/agentops/staging-environments-for-agents/`
  - `/concepts/what-is-mcp/`

**production-and-handoff** (11)
- **Argument:** The build took weeks; trust takes months. Handoff is an acceptance test the customer's operators pass without you, and adoption is a deliverable.
- **Cases:**
  - Morgan Stanley: 6–8 weeks to build, then about 4 months of pilots (T2);
  - "we should always be temporary" (T3);
  - Alpine Edge handoff drill (T4);
  - NHS FDP adoption framed as 45/72/120+ (T3);
  - Walgreens (T2);
  - Sierra immutable releases (T4, platform description).
- **Executives:** communicating with them is taught here.
- **Template:** a runbook and handoff document.
- **Links:**
  - `/operations/agentops/incident-response-for-agents/`
  - `/operations/agentops/rollout-and-versioning/`
  - `/operations/agentops/kill-switches/`
  - `/operations/evaluation-and-observability/production-feedback-signals/`

**feeding-the-product** (12)
- **Argument:** The loop back to product is what separates an FDE from a contractor. Without it the role is services revenue, and every lab job post says so.
- **Cases:**
  - Klarna → Swarm → Agents SDK, flagging the attribution blur (#7) (T2);
  - reuse rising from 20% to 50% (T4, a stated target; CA);
  - the Realtime API (T3);
  - Palantir FDE→PD (T4);
  - "gravel roads / superhighways" (T3);
  - Salesforce "moved up six months" (T4).
- **Template:** a product-feedback brief.
- **Links:** none required.

**when-engagements-fail** (13)
- **Argument:** Engagements fail for named, recurring reasons that show early: wrong problem, no data, no owner, a moving sponsor, an unagreed threshold. The FDE's job is to call it, rescue it, or walk away in time.
- **Cases:**
  - RAND (T1);
  - MIT NANDA, with method (T2);
  - the Gartner forecasts (predictions, not measurements);
  - MyCity (T1);
  - McDonald's (T3);
  - Klarna and CBA reversals (T3);
  - Stanford: "61% of successful projects included at least one prior failure", same sponsor, nobody punished (T2, draft).
- **Gap:** say plainly that no public first-hand account exists of an FDE deliberately killing an engagement.
- **Template:** an engagement post-mortem.
- **Links:** `/operations/evaluation-and-observability/failure-taxonomy-and-triage/`.

### Part III · The Craft

**judgment-under-pressure** (14)
- **Argument:** Judgment is knowing which commitments are load-bearing. The threshold, the data path, the sponsor and the exit matter; almost everything else is negotiable.
- **Cases:**
  - the Stanford recruiting rescue (T2);
  - RAND on priority switching (T1);
  - Morgan Stanley on non-determinism (T3);
  - Rechat (T4);
  - Sierra "every big technical discussion is also a negotiation" (T4).
- **Template:** a "say no" note.

### Part IV · The Career

**where-fdes-work** (15)
- **Argument:** The employer type changes the job more than the title does. Labs, application startups, Palantir-style platforms, and the new deployment companies offer different work, pay and exits.
- **Cases (Verified boxes):**
  - FDE-titled share of open roles (T1 count, RM);
  - Plank and Bloomberry (T2);
  - onsite % by employer (T3/T4);
  - China titles and pay (T3/T4; possible echo).

**getting-hired** (16)
- **Argument:** Every loop tests decomposition and customer judgment more than algorithms. Prepare with one portfolio project shaped like an engagement.
- **Evidence:** loops are T4; nothing is documented on Anthropic's. Keep the chapter short; link to prep sites (§4).

**leading-fdes** (17)
- **Cases:**
  - Anthropic and OpenAI FDE Manager posts (T4);
  - Salesforce tripled in six months, pods of 2 FDE + 1 strategist (T2/T4);
  - OpenAI's two-axis capacity allocation (T2);
  - Ramp and Cresta (T3/T4).
- **Thin evidence:** say so.

**levels-burnout-and-what-comes-next** (18)
- **Cases:**
  - Scale's ladder and the published bases (Verified box);
  - travel percentages;
  - Qureshi "high pain tolerance" (T4);
  - LeadDev burnout (T3).
- **Gap:** state plainly that no attrition data exists.

### Appendices

| Appendix | Contents |
|---|---|
| A case-file | The 10 best cases plus runners-up, graded, each with "what it proves / what it doesn't". |
| B templates | All Part II templates, blank and filled. |
| C failure-modes | Symptom → cause → fix, from FA's synthesis, cross-linked to cases. |
| D state-of-the-role | Every Verified-box fact, dated, with the echo map. |
| E glossary | §2, with Chinese aliases. |
| F sources | Every URL, with tier and access date. |

## 6. The running composite

**The customer:**
- a regional property-and-casualty insurer;
- 2,000–5,000 staff;
- on-prem claims system, a document store, a strict model-risk function;
- a new COO as sponsor.

**The vendor:** an AI platform company. **The team:** one FDE (the protagonist, mid-level), a senior FDE lead part-time, and an account executive. It is never named. Refer to them as "the insurer", "the FDE" and "the lead".

| Ch | Beat | Pattern it dramatises (cite in the box) |
|---|---|---|
| 4 | Sales has promised a free 3-month PoC with "a customer chatbot". The FDE and lead reshape it into a 30-day paid pilot with one KPI, data access by day 5 and credit-on-conversion. The COO signs because the KPI is hers. | Pear/Heavybit paid-pilot terms; Palantir bootcamp "proof, not proofs of concept" |
| 5 | Two weeks on site. Adjusters spend a large share of each day (a range, e.g. 30–50%) triaging incoming claim documents. The chatbot request was a proxy for "claims take too long". Stated vs observed problem. | RAND #1; the OpenAI semiconductor discovery; Jarvis "doesn't match the data/system reality" |
| 6 | Scope covers first-notice-of-loss document triage for auto claims only, with property on the "not now" list. Metric: routing accuracy and time-to-first-action against a baseline measured in week 1. The threshold is set with the claims director. The first demo is on redacted real documents in week 2. | Jarvis "genuinely high stakes"; Claude docs success criteria; Alpine Edge four weeks |
| 7 | Read access to a replica takes weeks. The FDE builds on sanitised fixtures meanwhile. Write-back into the claims system is deferred, and suggestions appear in the adjuster's queue instead. | Alpine Edge sanitised fixtures; NHS FDP write-back; Qureshi on data owners |
| 8 | Model risk asks about ZDR, residency and audit. The FDE spots that claimant-uploaded documents are an indirect injection path, and sets the agent to propose, never act. | Morgan Stanley ZDR; OWASP LLM01 indirect injection; human approval for high-risk actions |
| 9 | The eval starts with five cases from senior adjusters, grows to dozens of real failures, and gains a regression suite. Accuracy reaches the low 80s fast, then stalls for weeks below the threshold. The FDE delivers the bad news with a plan. | Jarvis "five with the experts"; LinkedIn 80%→95%; Anthropic 20–50 tasks |
| 10 | Deployed in the insurer's VPC. Routing rules that must hold, such as never auto-routing litigation-flagged claims, are enforced in code outside the model. | APAC automotive deterministic constraints; Anthropic "simplest solution" |
| 11 | The handoff drill: the insurer's ops team deploys, breaks and recovers it from the runbook alone. Adoption lags until adjusters see their own overrides improve it over months. | Morgan Stanley trust period; Alpine Edge handoff drill; NHS adoption |
| 12 | The document-triage component and its eval harness become a reusable product template. The second insurance customer reuses part of it. | Jarvis 20%→50% reuse; Klarna→Swarm; Palantir FDE→PD |
| 13 | The expansion to property claims stalls when the COO's priorities shift. The lead and FDE reset the scope or walk, using the post-mortem. | RAND priority switching; Stanford same-sponsor rescue; Klarna/CBA reversal as the cautionary counter-case |

## 7. Skill map rubric (Ch 3; reused in Ch 16 and 18)

Four domains × L1–L4, written as observable behaviours.

**Technical:**
- **L1:** ships a working prototype on clean data with help.
- **L2:** ships an end-to-end workflow on the customer's real data and infrastructure, with an eval set.
- **L3:** designs the architecture, owns the eval contract, and gets it through security review unaided.
- **L4:** sets the technical pattern other FDEs reuse and turns field work into product components.

**Customer:**
- **L1:** runs a scripted demo and takes notes in discovery.
- **L2:** runs discovery interviews, and finds the observed problem behind the stated one.
- **L3:** negotiates scope, threshold and "not now" with a director, and delivers bad news with a plan.
- **L4:** holds the executive relationship through a failing engagement, and decides with the sponsor to rescue or exit.

**Product:**
- **L1:** reports bugs and feature requests.
- **L2:** writes a product-feedback brief with evidence from the engagement.
- **L3:** gets a field pattern adopted into the product roadmap.
- **L4:** shapes which customers and problems the company deploys to, for product learning.

**Judgment:**
- **L1:** escalates when stuck.
- **L2:** flags scope creep and data risk early.
- **L3:** says no to a sponsor and makes it stick, and knows which commitments are load-bearing.
- **L4:** calls an engagement's failure early, and the company's next move agrees.

## 8. Situation index seed (how-to-use; link only published chapters)

1. Sales promised a free open-ended PoC → before-the-engagement
2. Nobody can name who signs if the pilot works → before-the-engagement
3. The pilot has no end date → before-the-engagement
4. The customer asked for "a chatbot" → discovery
5. Every stakeholder describes a different problem → discovery
6. You're asked to pick a model before seeing the workflow → discovery
7. The use case is safe but nobody would notice if it worked → scoping-and-the-first-win
8. Nobody has measured how the process performs today → scoping-and-the-first-win
9. The exec wants a demo on Friday → scoping-and-the-first-win
10. Scope keeps growing in every meeting → scoping-and-the-first-win (the "not now" list)
11. No production-like data access by the end of week one → data-access-and-integration
12. They want the agent to write back into a legacy system → data-access-and-integration
13. Security sent a 200-question questionnaire → security-governance-and-model-risk
14. "Will our data train your model?" → security-governance-and-model-risk
15. User-uploaded documents feed the agent → security-governance-and-model-risk
16. Accuracy is stuck around 80% → evals
17. The eval scores are fine but users hate it → evals
18. You have to tell the sponsor it isn't good enough yet → evals
19. Their infrastructure forbids the service you planned on → building-in-their-environment
20. A rule must never be broken by the agent → building-in-their-environment
21. You're leaving in two weeks and only you can run it → production-and-handoff
22. It works but nobody uses it → production-and-handoff
23. You built the same thing for the third customer → feeding-the-product
24. The sponsor changed jobs → when-engagements-fail
25. Should you walk away? → when-engagements-fail
26. You're being asked to promise deterministic outputs → judgment-under-pressure
27. Is this role right for me? → what-an-fde-is, the-skill-map
28. Preparing for a decomposition interview → getting-hired

## 9. Link map

- **Within the book:** chapters link to the composite's previous and next beats, Ch 6 ↔ Ch 9 (metric ↔ eval), Ch 7 ↔ Ch 8, Ch 13 → Appendix C, and every case → Appendix A, once published.
- **To the SDLC book:**
  - Ch 9 → `/books/ai-driven-sdlc/testing-and-verification/`
  - Ch 8 → `/books/ai-driven-sdlc/security-permissions-and-blast-radius/`
  - Ch 4/6 → `/books/ai-driven-sdlc/the-90-day-pilot/`

  The SDLC book links back only when those *Last Mile* chapters publish.
- **To the wiki:** use the per-chapter paths in §5. Writers may add others only after checking with `ls src/content/<section>/en/<slug>.html`.

## 10. What research changed from the spec

1. **Ch 16 is shorter.** Interview prep is saturated (CO), so Ch 16 synthesises, grades and links out.
2. **Ch 10 leans on the wiki.** It does not re-teach the stack (CO), and its own evidence is thin.
3. **Ch 2 stays tight on Palantir history,** because xdash covers it.
4. **Echo detection is a book-wide convention** (CO differentiator #2), explained in how-to-use.
5. **Chinese term:** 前线部署工程师, with the aliases noted once.
6. **The O'Reilly book is not out.** It is Early Release with 2 of 12 chapters, due 2027-12-25.
7. **Thin chapters say so up front:** Ch 3, 4, 10, 16, 17 and 18.
