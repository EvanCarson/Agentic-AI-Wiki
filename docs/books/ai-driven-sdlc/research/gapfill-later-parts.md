# Gap-fill for Parts II–III: specs, operations, rollback triggers, pilots, juniors

Researcher brief, 2026-10-15. Scope: the Part II–III gaps named in `aggregate.md` §6 (Ch 5, Ch 11, Ch 3/17 rollback triggers, Ch 14/15 enablement, Ch 16 juniors).

Every item gives: figure or quote · URL · date · measured-by · confidence · suggested chapter. "Self-reported" means the organisation reports on its own system; "vendor" means the organisation sells the tool or measurement product; "independent" means academic or regulator authors with no product stake. IDs use the prefix **GF-**.

**Headline for the bible**

1. **Spec-driven development now has its first outcome data, and all of it is weak.** One association study (114 repos, independent): top-third spec quality repos spent 11.8% of commits on bug fixes against 20.4% for the bottom third. One uncontrolled 14-engineer Spec Kit pilot reported fewer rollbacks and hotfixes. Nothing on Kiro or Tessl beyond press and vendor registry scores. Ch 5 can now say "early, correlational, promising", but not "proven".
2. **The best ops evidence with a real method is Google's, not a vendor's.** Google reports an A/B test: Incident Hypothesis cut Mean Time to Mitigate by 10%. Alibaba's BiAn (SIGCOMM 2025) used shadow operators over 10 months and cut time-to-root-cause by 20.5%. Both are self-reported. Independent benchmarks stay low: OpenRCA 2.0 exact root-cause set 20.7%; ORCA-bench 25.3% (medium) and 10.0% (hard).
3. **Published rollback triggers exist; they are pre-LLM or ops-scoped.** Google's Tricorder disables any analyzer whose "Not useful" rate passes 10% (CACM 2018). Google SRE's agent stack automatically downgrades L3 to L2 on an elevated risk score, and has a "Red Button" to pause all agent actions and revoke L3 fleet-wide. NIST AI RMF MANAGE 2.4 and EU AI Act Art. 14(4)(e) give the regulatory frame. No company has published criteria for rolling back an AI *coding* tool.
4. **Enablement data is almost all vendor-published.** Booking.com (via DX): daily users had 16% higher change throughput, rising to 31% over baseline after enablement. Zalando gives the best non-vendor programme description (proxy, guild, labs, hackathons), but no before/after adoption figure.
5. **Juniors: the firm-level evidence now has a second independent source.** Hosseini & Lichtinger (Harvard): junior employment in GenAI-adopting firms fell ~9% relative to non-adopters six quarters after 2023Q1, through slower hiring. Ramp-up time data exists only from DX (vendor, observational): 49 vs 91 days to 10th PR.

---

## Resolved

### (a) Requirements and specs

**GF-1. Morgan Stanley DevGen.AI: the primary is still not reachable; the best available is Business Insider's interview with the tool's lead.**
- Figure: "more than 280,000 hours" saved "as of June" (2025), stated as 11,666 days. Tool unveiled January 2025. Team grew from fewer than five people to about 20 engineers. Patent granted early June 2025. Quoted: Trevor Brosnan (global head of technology strategy, architecture and modernization, who led the tool), Megan Brewer, Larry Bromberg. **No lines-of-code figure and no estimation method appear in this article.**
- Source: Business Insider (syndicated) https://www.aol.com/team-engineers-saved-morgan-stanley-094301348.html · updated 2025-07-01 · secondary press quoting the bank.
- The WSJ article that earlier briefs cite is "How Morgan Stanley tackled one of coding's toughest problems" (https://www.wsj.com/articles/how-morgan-stanley-tackled-one-of-codings-toughest-problems-4f465959). It is paywalled and could not be fetched. eFinancialCareers' summary of it (2025-06-04, https://www.efinancialcareers.com/news/morgan-stanley-llm-cobol) quotes Mike Pizzi ("building it ourselves gave us certain capabilities that we're not really seeing in some of the commercial products") and describes training on the full code base to extract business logic. It gives **no** figures and does not name DevGen.AI.
- The "9 million lines" figure appears only in secondary aggregators (tmcnet, Developer-First, Le Monde Informatique). Later figures (~16M lines by Feb 2026 via American Banker; 600+ production use cases; 4,000+ PRs/year) come from LinkedIn posts, event listings and job ads. All are **unverified**.
- Measured-by: self-reported (bank), no method. Confidence: **medium** that ~280K hours is the bank's own claim; **low** on 9M lines. Chapter: Ch 5 / Ch 12. Book rule: quote "the bank says 280,000 hours", attribute it to Brosnan via Business Insider, and drop "9M lines" unless the WSJ text is read.

**GF-2. Spec Kit / SDD outcome data: one independent association study.** (EPIC framework)
- Figure: 114 open-source SDD repositories scored against ISO/IEC/IEEE 29148. Repos in the top third for spec quality had a "11.8% of their commits on bug fixes, compared with 20.4% in the bottom third" (−42.4%, p_BH = 0.034, Spearman ρ = −0.210). They also had 15.4% lower cyclomatic complexity per KLOC (137.2 vs 162.3, p = 0.001) and a median of 12.5 vs 3 contributors. Bugs/KLOC: −5.1%, **not significant** (p = 0.101). Vulnerabilities/KLOC: −48%, p = 0.016. The study covers repos that use Spec Kit, Kiro, OpenSpec and similar templates.
- Authors' caveat: "Without multivariate controls or stratified analyses, project characteristics and development practices remain potential confounders, so the associations cannot establish causation." The authors also say: "we did not invite participants to apply EPIC in their own projects." Note the confound: better-resourced projects (4× contributors) may write better specs *and* fix fewer bugs.
- Source: Claudino, Xing, Zuo, Menezes, Sarma, Damevski, Feng, "The EPIC Framework for Spec-Driven Development", arXiv:2610.07534 · https://arxiv.org/abs/2610.07534 · 2026-10-06 · independent (academic) · confidence **medium** (exploratory, correlational) · Ch 5.

**GF-3. Spec Kit pilot: rollbacks and hotfixes down, but no control group.**
- Figure (Table 4, labelled "indicative estimates, not statistically controlled"). 14 engineers (8 mid-level, 6 senior; juniors excluded), 3 web projects, one organisation, 2-month baseline then 2-month Spec Kit:
  - median lead time per feature 8–12 → 6–9 working days
  - late-stage hotfixes per sprint 3–5 → 1–2
  - rollbacks per month 2–4 → 0–1
  - lines reverted within 2 weeks 12–18% → 6–10%
  - confidence (Likert) 3.1 → 3.9
  - spec/plan overhead 45–90 min per medium feature
- Limitations, quoted from the paper: "retrospective and not designed as a controlled experiment"; "The absence of a parallel control group"; "Temporal confounds (e.g. improving AI model capabilities during the study period) cannot be excluded"; Spec Kit "has not yet been the subject of independent academic evaluation".
- Source: Sabry E. Farrag (University of East London), "The Productivity-Reliability Paradox: Specification-Driven Governance for AI-Augmented Software Development", arXiv:2605.01160 · https://arxiv.org/html/2605.01160v1 · 2026-05-01 · independent author, single-org pilot (the measured org is not named) · confidence **low** · Ch 5 (the "overhead" figure is useful for Ch 14 pilot planning).

**GF-4. Spec Kit Agents: a small quality gain, plus a latency cost.**
- Figure: 128 runs over 32 feature tasks in 5 repos (FastAPI, Airflow, Dexter, Plausible, Strapi). The generator was MiniMax-M2.5 via Claude Code; the judge was an LLM (Claude Opus 4.6).
  - Judged quality on a 1–5 scale: Baseline 3.46; Spec Kit "Full" 3.51; author-augmented "Full-Augmented" 3.66 (+0.15 vs Full, Wilcoxon p<0.05).
  - Latency: Full 24.0 min vs Full-Augmented 37.2 min.
  - Human preference over 60 votes: Full 19, Full-Augmented 8, ties 33.
  - SWE-bench Lite: 56.5% → 58.2%.
- Read: stock Spec Kit scores almost the same as no spec (3.51 vs 3.46) on LLM-judged quality, and humans mostly saw no difference.
- Source: Taghavi & Bhavani, arXiv:2604.05278 · https://arxiv.org/html/2604.05278v1 · 2026-04-07 · independent (LLM-as-judge) · confidence **low–medium** · Ch 5.

**GF-5. Kiro and Tessl outcome data: could not verify.**
- Kiro: the only customer figure found is "Socure … three-week migration project from Scala to Go in just two days". It comes from The New Stack (secondary); no AWS or Socure primary was found. Kiro's internal "multi-week feature into a two-day task" appears only in a LinearB podcast (vendor interview). Neither is usable as outcome data.
- Tessl: registry tiles show eval scores (e.g. tessl-labs/spec-driven-development "1.19x" quality), but other versions show "No eval scenarios have been run". Method (per https://docs.tessl.io/evaluate/evaluating-your-codebase): the agent runs with and without context files. This is a vendor self-benchmark with no study.
- A framework survey (arXiv:2606.04967) lists Spec Kit as having no independent academic evaluation. That was true until GF-2 and GF-4.
- Confidence: n/a · Ch 5: say plainly that no Kiro or Tessl outcome study exists.

### (b) Operations: independent evaluations and MTTR with method

**GF-6. OpenRCA 2.0: agents find the service but rarely the causal path.**
- Figure: 500 instances, 11 frontier LLMs. Exact root-cause set recovered in "20.7%" of cases on average. At least one correct root-cause service in "76.0%", but "only 61.5%" of those are grounded in a verified causal path.
- Source: Fang et al. (Pinjia He group), arXiv:2606.27154 · https://arxiv.org/abs/2606.27154v2 · v1 2026-06-25, v2 2026-06-30 · independent (academic) · confidence **medium**. A pith.science review flags that the labelling protocol (PAVE) lacks reported validation. Ch 11.

**GF-7. ORCA-bench: oncall-realistic RCA, with best accuracy 25% (medium) and 10% (hard).**
- Figure: 1,079 RCA tasks over six days of OpenTelemetry metrics, logs and traces, with full source access. "Expert SREs signed off on ground-truth symptoms"; human re-scoring of the judge gives Cohen's κw = 0.91. Across five frontier agents, best RCA accuracy was 25.3% on Medium and 10.0% on Hard. The weakest model "invented an implausible root cause in 40% of incident reports". Removing source-code access lowered accuracy and raised hallucination for every model. Authors' caveat: the 50 GB testbed "is far smaller than real production systems".
- Source: Gong, Choi, Agarwal, Schechner, Huang, Agrawal, Agarwal, Dwivedi, arXiv:2607.28545 · https://arxiv.org/abs/2607.28545 · v1 2026-07-30, v3 2026-09-29 · independent (academic; affiliations not shown on abs page) · confidence **medium** · Ch 11.

**GF-8. Why agents fail at cloud RCA: the failure modes are architectural.**
- Figure: full OpenRCA run across 5 models, 1,675 agent runs, 12 pitfall types. Hallucinated data interpretation and incomplete exploration "appeared across all models". Prompt engineering alone did not fix the dominant pitfalls. A richer inter-agent protocol cut communication failures "by up to 15 percentage points".
- Source: Kim, Park, Yun, Lee, arXiv:2602.09937 · https://arxiv.org/abs/2602.09937 · 2026-02-10 (v2 2026-03-04) · independent · confidence **medium** · Ch 11 (anti-patterns).

**GF-9. Waterloo FORGE '26: 48,000 fault scenarios, and accuracy falls as workflows get more complex.**
- Figure: 6 open-source models (3B–104B), 3 agentic workflows plus 1 non-agentic, on GAIA and OpenRCA, run over 48,000 scenarios. 16-type reasoning-failure taxonomy; the judge agrees with humans at κ = 0.92. The most common failures are fabricated evidence and evidential insufficiency. Performance drops to "sub-guessing" levels as workflow complexity grows, especially for small models. Excluding traces "often improves accuracy".
- Source: https://uwaterloo.ca/waterloo-intelligent-systems-engineering-lab/projects/llm-reasoning-failures-cloud-root-cause-analysis ; paper arXiv:2601.22208 · FORGE 2026 (Apr 12–13, 2026), Distinguished Paper · independent · confidence **medium** (open models only; no exact accuracy figures on the project page) · Ch 11.

**GF-10. Google SRE: an A/B-tested 10% MTTM reduction. The best-method ops figure found, though self-reported.**
- Quotes:
  - "our immense scale provides the statistical rigor necessary to A/B test SRE practices like Incident Hypothesis … this informational assistance alone delivered a 10% reduction in Mean Time to Mitigate (MTTM)"
  - Investigation Dashboards: ML anomaly detection "increased overall findings by 195%"; "roughly 44% reduction in Mean Time to Mitigate (MTTM) for supported incidents" (no method stated for the 44%)
  - AI Operator runs at "L2 Autonomy (Partial Automation)" for critical operations and "L3 Autonomy (High Automation), where AI Operator will safely execute mitigations autonomously for minor incidents"
- Source: Papapanagiotou, Malesevic, Heiser, Meshenberg, "AI in SRE: How Google is Engineering the Future of Reliable Operations" · https://sre.google/resources/practices-and-processes/ai-engineering-reliable-operations/ · **undated on page** (live 2026-10-15) · self-reported · confidence **medium** for the 10% (A/B stated, but no sample or CI given); **low** for the 44% ("supported incidents" is a selected subset) · Ch 11 (and Ch 2: Google uses its own L0–L4 autonomy table).

**GF-11. Alibaba Cloud BiAn: shadow-operator comparison over 10 months; time-to-root-cause down 20.5%.**
- Quote: BiAn "has been deployed in our network infrastructure for 10 months … reducing time to root causing by 20.5% (55.2% for high-risk incidents)", with +9.2% accuracy over baseline on 17 months of real cases.
- Method: "two shadow operator roles to perform the root causing … with BiAn and RCACopilot, respectively", with "operators of comparable expertise" assigned "at best effort". TTR is defined as investigation start to identification of root cause and error device. Mitigation then takes "a relatively fixed duration (around 2 minutes)".
- Caveat: this is not randomised, and the operators were not blinded.
- Source: Wang et al. (Nanjing Univ., Alibaba Cloud, NYU Shanghai, PKU), "Towards LLM-Based Failure Localization in Production-Scale Networks", ACM SIGCOMM 2025 · https://doi.org/10.1145/3718958.3750505 (PDF: https://cs.nju.edu.cn/tianchen/lunwen/2025/sigcomm25-chenxu.pdf) · 2025-09 · self-reported (peer-reviewed) · confidence **medium–high** · Ch 11. **Use as the Ch 11 "measured case".**

**GF-12. Microsoft "Customer Zero" post: the 40.5 h → 3 min figure, now read in full.**
- Quotes:
  - "Internally at Microsoft in the last nine months, we've seen: 35,000+ incidents have been handled autonomously by Azure SRE Agent. 50,000+ developer hours have been saved by reducing manual investigation and response work."
  - "Azure Container Apps had overwhelmingly positive (89%) responses to the root cause analysis (RCA) results … covering over 90% of incidents."
  - "Azure App Service has brought their time-to-mitigation for live-site incidents (LSIs) down to 3 minutes, a drastic improvement from the 40.5-hour average with human-only activity."
- Scope resolved: the 40.5 h is an **average** for App Service live-site incidents under human-only handling. The post gives no period, incident count, or statement of whether the 3 min is a mean, median or best case. "Handled autonomously" is undefined. The GA announcement (Mar 2026) said 20K+ hours saved; this post, about a month later, says 50K+.
- Source: "How we build and use Azure SRE Agent with agentic workflows", author Shamir_AbdulAziz · https://techcommunity.microsoft.com/blog/appsonazureblog/how-we-build-and-use-azure-sre-agent-with-agentic-workflows/4508753 · 2026-04-05 · vendor/self-reported · confidence **low** for the MTTR comparison (no method) · Ch 11 (vendor box only).

**GF-13. Meta AI-assisted RCA: 42% top-5 by backtest; no MTTR claim.**
- Quote: "42% of these investigations had the root cause in the top five suggested code changes". It is evaluated by backtesting with only information available at investigation creation. Llama 2 7B, fine-tuned on ~5,000 RCA examples. **No MTTR figures.**
- Source: https://engineering.fb.com/2024/06/24/data-infrastructure/leveraging-ai-for-efficient-incident-response/ · 2024-06-24 · self-reported · confidence **high** (as a backtest) · Ch 11. This confirms the aggregate's "Meta 42% top-5".

**GF-14. Vendor MTTR claims: none had a published method.**
- PagerDuty (ResultsCX 40 min → 2 min; "up to 50% faster"), Traversal (DigitalOcean CTO quote; the MTTR fields render as "0%" placeholders), Apica ("75% faster"), and Rootly ("30–70%") all appear without baseline period, n, or definition. Source pages: https://traversal.com/customers, https://www.pagerduty.com/resources/learn/reduce-mttr/, https://rootly.com/blog/ai-in-incident-response-how-automation-improves-mttr.
- Result: **no customer-reported MTTR with a methodology was found outside GF-10 (Google) and GF-11 (Alibaba), both self-reported by the operator.** Ch 11 should say so.

### (c) Rollback triggers and kill switches

**GF-15. Google Tricorder: a published, numeric disable trigger for automated review feedback.**
- Quotes: review checks must "Produce less than 10% effective false positives. Developers should feel the check is pointing out an actual issue at least 90% of the time". And: "The Tricorder team tracks such not-useful clicks, computing the ratio of 'Please fix' vs. 'Not useful' clicks. If the ratio for an analyzer goes above 10%, the Tricorder team disables the analyzer until the author(s) improve it … it has disabled an analyzer (on several occasions)".
- Source: Sadowski, Aftandilian, Eagle, Miller-Cushon, Jaspan, "Lessons from Building Static Analysis Tools at Google", CACM 61(4), April 2018, DOI 10.1145/3188720 · PDF https://storage.googleapis.com/gweb-research2023-media/pubtools/4365.pdf · self-reported · confidence **high** · Ch 8 (AI review bots) and Ch 17 (rollback criteria). **This is the model for a rollback trigger**: a feedback button, a tracked ratio, a fixed threshold, and a disable-until-fixed rule. It predates LLMs, so the book must present it as a transferable precedent.

**GF-16. Google SRE agent controls: automatic autonomy downgrade and a fleet-wide "Red Button".**
- Quotes:
  - "If … an L3 (High Automation) execution [is requested], but the agent detects an elevated risk score or an anomalous production state, it will automatically downgrade the request to L2 (Partial Automation), intercepting the execution and routing an approval request to a human SRE."
  - "emergency 'Red Button' endpoints that allow SREs to instantly pause all in-flight agentic actions, block new actions, or globally revoke L3 permissions across the fleet during catastrophic, complex outages."
  - "AI agents are not granted full production access from day one."
  - "Systems must implement strict, agent-specific rate limits and automated circuit breakers"
  - "Agent identities must be distinct from human users"
  - "A simple binary rollback to a 'last known good' version becomes highly risky"
- Source: same page as GF-10 · undated · self-reported (design guidance plus a description of the production system) · confidence **high** that this is Google's stated design · Ch 11, Ch 15 (governance), Ch 17. It fills the aggregate's "no published rollback trigger" gap **for ops agents**: the trigger is risk score or anomalous state, and the action is a level downgrade.

**GF-17. NIST AI RMF MANAGE 2.4: a deactivation duty.**
- Quote: "Mechanisms are in place and applied, and responsibilities are assigned and understood, to supersede, disengage, or deactivate AI systems that demonstrate performance or outcomes inconsistent with intended use." See also MANAGE 1.1: "whether its development or deployment should proceed."
- Source: NIST AI 100-1 (AI RMF 1.0) · https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf · January 2023 (NIST says it is being revised under the AI Action Plan) · official standard (voluntary) · confidence **high** · Ch 15 / Ch 17.

**GF-18. EU AI Act Art. 14(4)(e): a "stop button" for high-risk systems.**
- Quote: overseers must be able "to intervene in the operation of the high-risk AI system or interrupt the system through a 'stop' button or a similar procedure that allows the system to come to a halt in a safe state." Art. 14(4)(b) covers automation bias.
- Source: https://artificialintelligenceact.eu/article/14/ (a mirror of the Regulation (EU) 2024/1689 text; cite EUR-Lex in the book) · official text · confidence **high** on wording. Applying it to dev tooling is an inference: most coding agents are not high-risk systems. · Ch 15.

**GF-19. GitHub Copilot coding agent: admin-level off switches exist; one enterprise policy gap is documented.**
- Per GitHub docs (search snippets of docs.github.com):
  - the coding agent is "disabled by default"
  - an enterprise policy of "Disabled" blocks all licensed users
  - org settings can stop the agent in "some or all" repositories
  - "If there are GitHub Copilot Pro+ users with access to your enterprise's repositories, they will be able to use Copilot coding agent and will not be restricted by your policies."
- Source: https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer/enterprises/managing-copilot-coding-agent-in-your-enterprise · accessed 2026-10-15 via search snippets, **not fetched in full** · vendor docs · confidence **medium** · Ch 15 (it bears on the aggregate's "content-exclusion gap" item; re-read the page before quoting).

**GF-20. No company has published criteria for rolling back an AI *coding* tool or agent autonomy. Could not verify any.**
- Searches across engineering blogs found only a noise-driven anecdote on dev.to (no metrics) and the Amazon Kiro peer-review response already in FR-C5. The nearest analogues are GF-15 (review analyzers), GF-16 (ops agents) and the Zalando risk bot (GF-27). The book should **propose** coding-agent rollback triggers modelled on GF-15 and GF-16, and label them as the book's proposal.

### (d) Pilots and enablement

**GF-21. ANZ Bank: the 42.36% figure is verified against the paper, and the sample was small.**
- Quotes: "The group that had access to GitHub Copilot was able to complete their tasks 42.36% faster than the control group participants. This result is statistically significant."
- Table 2 (one-sided Wilcoxon):
  - Total_Time_Spent: sample size 22, p = 0.001
  - Bugs: n = 17, p = 0.033
  - Code_Smells: n = 17, p = 0.007
  - Unit_Test_Success_Ratio: n = 17, p = 0.060 (not significant)
  - Security: inconclusive
- Design: mid-June to end July 2023; 2 weeks of preparation plus 4 weeks of Python challenges; over 100 participants of ~5,000 engineers. Then "about 1000 engineers" in the scaled rollout, with "early data" claimed but not quantified.
- Limitation, quoted: "participation rates fluctuated significantly across these tasks".
- Source: Chatterjee, Liu, Rowland, Hogarth, arXiv:2402.05636 · https://arxiv.org/abs/2402.05636 · 2024-02-08 (v2 2024-04-17) · self-reported (ANZ staff) · confidence **medium** (small n, toy tasks) · Ch 14. Resolves the aggregate's "ANZ 42.36% not verified against PDF". Print the n = 22.

**GF-22. Accenture (GitHub-run RCT): adoption-funnel figures verified; sample size not reported.**
- Figures:
  - "81.4% of developers installed the GitHub Copilot IDE extension on the same day" they got a licence
  - "96% of those who installed … started receiving and accepting suggestions on the same day"
  - "67% … utilizing GitHub Copilot at least 5 days per week"
  - "8.69% increase in pull requests"
  - "15% increase to the pull request merge rate"
  - "84% increase in successful builds"
  - ~30% acceptance rate
  - 88% character retention
- Source: Ya Gao / GitHub Customer Research, https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture/ · 2024-05-13 · vendor (RCT design stated, **n not given**) · confidence **medium** for the adoption funnel, **low** for the outcome deltas · Ch 14.

**GF-23. ZoomInfo: verified.** "over 400 developers"; "four-phase approach"; "average acceptance rate of 33% for suggestions and 20% for lines of code"; 72% satisfaction. No time-saved figure. Source: Bakal, Dasdan, Katz, Kaufman, Levin, arXiv:2501.13282 · https://arxiv.org/abs/2501.13282 · 2025-01-23 · self-reported · confidence **high** on the figures, which are adoption metrics only · Ch 14.

**GF-24. Mercado Libre: a vendor customer story only, with figures that conflict internally.**
- The page header says "9,000+ developers using Copilot" and "~50% reduction in time spent writing code". The body says "more than 10,000 developers" and the metadata says "Number of Seats: 13,300". The 50% is attributed to SVP Sebastian Barrios' personal estimate ("half as much time to arrive at the correct code"). He refers to "trials we've been running with our teams", with no design or results given.
- Source: https://github.com/customer-stories/mercado-libre · undated (© 2026 footer) · vendor · confidence **low** · Ch 14 (as an example of a weak claim). The OpenAI Mercado Libre story (https://openai.com/index/mercado-libre/) returned 403 and was not read.

### (e) Juniors

**GF-25. Stanford "Canaries": the latest version was re-checked, and there is no text figure specific to software developers.**
- Latest revision 2026-08-12 (PDF https://digitaleconomy.stanford.edu/app/uploads/2026/08/Canaries_August2026.pdf). The headline is unchanged from OG-1–7: ages 22–25 in AI-exposed occupations are "19% below" the counterfactual.
- Software developers appear only in figures (H.1 CPS, H.5 ACS, and an appendix headcount panel) and in a footnote. The footnote says young developers' compensation "grew somewhat faster than for older workers", which "may partly reflect composition effects if firms primarily contracted hiring of lower-paid engineers".
- CPS caveat, quoted: the CPS "includes between 23 and 48 young software developers aged between 22 and 25 per month". Any developer-specific percentage from CPS is therefore noise-prone.
- Measured-by: independent · confidence **high** for the headline, **low** for any developer-only number · Ch 16. **Do not quote a developer-specific decline figure from this paper.**

## New claims

**GF-26. Hosseini & Lichtinger (Harvard): GenAI adoption is "seniority-biased" at firm level.**
- Data: résumé data for "65 million workers at more than 280,000 firms (2015–2025)". Adoption is detected from 'GenAI integrator' job postings: 10,433 adopter firms (≈3.7% of firms, ≈16% of employment).
- Result: "junior employment in adopting firms fell by about 9 percent relative to controls six quarters after" 2023Q1. Event-study version: "an 8 percent reduction after eight quarters". Senior employment is "largely unchanged". Triple-difference: junior employment in high-exposure occupations "contracts by roughly 7 percent".
- Mechanism: "driven primarily by slower hiring rather than increased separations". Juniors from mid-tier (tier-3) universities saw the steepest declines (U-shape).
- Software developers are the top high-exposure occupation in several sectors: 13.1% of high-exposure positions in Information, and 6.8% in Manufacturing.
- Source: SSRN 5425555; author PDF https://raw.githack.com/s-mahdihosseini/Website/b99fa2962dcc4c165bbc3c41dd283afa99c5ccfb/GenAI_SenBTC_May_2026.pdf · first version 2025-08-31, this version 2026-05-06 · independent (working paper) · confidence **medium–high** · Ch 16. Pair it with Canaries: two datasets (ADP payroll; résumés plus postings) reach the same hiring-not-firing mechanism.

**GF-27. Zalando: risk-based PR auto-approval, a governance mechanism with a measured effect.**
- Quotes:
  - "33% of our PRs are low-risk and are auto-approved by the bot … which in our case reduced PR lead time by 20-40% (when compared with all PRs)"
  - "The rule set for the approval bot is built based on analysis of our production incidents"
  - "Typos that break configuration are assessed as high risk"
  - "Breaking backwards-compatibility is medium risk and requires judgement from another human"
- Also measured: growth in PR sizes, "esp. [500,1k) and [1k,2k)" buckets since Sonnet 4 (Q2/2025), and complexity inflection points when coding agents arrive (4 codebases, CCN per commit).
- Programme facts: LiteLLM proxy since January 2024, measuring "MAU, WAU, model, User-Agent"; "2k MAU"; "We have never centrally mandated the use of a single tool"; the proxy blocks outdated clients by User-Agent ("blocking access is the only effective measure").
- Source: Bartosz Ocytko, "Agentic Engineering at Zalando: a snapshot" · https://engineering.zalando.com/posts/2026/08/agentic-engineering-at-zalando-a-snapshot.html · 2026-08-14 · self-reported, non-vendor · confidence **medium** (no method for the 20–40%; the comparison is against "all PRs", which is a selection effect) · Ch 8, Ch 10, Ch 15.

**GF-28. Zalando enablement programme: the best non-vendor description, but without adoption numbers.**
- Components:
  - LLM guild, weekly 1 h, with 20-min slots
  - "guided experimentation" hackathons: ~10 pre-set topics, 2–3 days, groups of 4–6
  - "GenAI Labs": ~20 people, 1–4 h; "over the course of 3 days we can run 6 sessions with ca. 120-150 participants"; trainers recruited from past attendees
  - two monthly trainings (MCP servers; building agents with pydantic-ai)
  - an AI section on the Tech Radar
  - auto-detection of AI model use by scanning deployed Docker images, which triggers documentation and legal review
- Training rule, quoted: "state explicitly when manual coding is expected from attendees … using coding agents usually inhibits learning."
- Source: as GF-27 · confidence **high** as a programme description; **no before/after adoption data** · Ch 15, Ch 16 (the learning quote supports a tutor-mode policy).

**GF-29. Booking.com via DX: the only enablement programme with before/after outcome numbers, and the numbers are vendor-published.**
- Figures:
  - "Daily active AI users had 16% higher change throughput than non-users"
  - after enablement, throughput rose "another 15%, a 31% improvement over the original baseline"
  - developers using AI on "12+ days per month" were "significantly more effective"
  - adoption first "fell short of expectations", later "nearly all of Booking's engineers are using AI tools"
  - the headline "65% increased AI adoption" is unexplained, with no baseline
- Method: assistant telemetry joined to the DX dataset, comparing daily users with non-users. This is observational and selection-prone.
- Named: Bruno Passos (Group PM, GenAI & DevEx) and Zane Wright.
- Separate DX post (2025-09-05, https://getdx.com/blog/how-to-optimize-your-ai-tool-rollout-with-data/): Booking's 3-day "experience-based accelerators" saw "about 70% of code written during EBAs" AI-assisted (survey).
- A DX framework page says "over 3,500 engineers", but the customer page gives no headcount.
- The "150,000 hours saved" figure appears only in secondary sources and is **unverified**.
- Source: https://getdx.com/customers/booking-drives-ai-adoption-with-dx/ · undated (© 2026) · vendor · confidence **low–medium** · Ch 14, Ch 15.

**GF-30. DX time-to-10th-PR: the only ramp-up metric with numbers, and it comes from a vendor and is observational.**
- 2025 study, six unnamed multinationals: time to 10th PR was 49 days for daily AI users, 73.5 weekly, 84 monthly, and 91 for non-users. "Half of new hires who don't use AI tools still haven't reached 10 PRs after 3 months", against "less than 20%" of daily users. The number of hires is not stated, the method for measuring usage is not stated, and there is no causal caveat. Laura Tacho, https://getdx.com/blog/ai-cuts-developer-onboarding-time-in-half/ · last updated 2025-09-10.
- 2026 update: random sample of 400 companies (500+ developers each), Oct 2025–Feb 2026. "the current average Time to 10th PR across our dataset is 33 days, down from 39 days in Q4 2025". Caveat, quoted: the metric "does not, on its own, tell us about the quality of those changes, the amount of rework they generate". Justin Reock, https://getdx.com/blog/developer-ramp-up-time-continues-to-accelerate-with-ai/ · 2026-04-09.
- Measured-by: vendor · confidence **low–medium** (reverse causation is likely: faster rampers may also adopt more) · Ch 16. This is the only company-level ramp data found. Present it as a vendor box beside the Anthropic skill-formation RCT.

**GF-31. Danish administrative data: precise null effects on earnings and hours.**
- Quote: "we estimate precise null effects on earnings and recorded hours at both the worker and workplace levels, ruling out effects larger than 2% two years after the launch of ChatGPT"; "employers absorb AI through task reorganization—including new tasks in content generation, AI oversight, and AI integration". The ~25,000 workers, 7,000 workplaces, 11 exposed occupations and "3% time savings" come from secondary summaries and were not read in the paper.
- Source: Humlum & Vestergaard, NBER WP 33777 · https://ideas.repec.org/p/nbr/nberwo/33777.html · 2025 · independent · confidence **high** for the abstract figures · Ch 4 / Ch 16. It resolves the aggregate's "Danish near-zero-effect study" lead.

**GF-32. Zalando postmortem analysis: two years of LLM-assisted incident learning, with hallucination rates reported.**
- Quotes:
  - reading one postmortem takes "about 15-20 minutes"
  - early small models (3B–12B) showed "up to 40% probability for hallucination at summary and analysis phases"; human-led curation continued "until the effect of hallucination became less than 15%"; with larger models "hallucinations became negligible"
  - human curation went from 100% to "10-20% of randomly sampled summaries"
  - an insight from the analysis led to IaC change validation that "is able to shield us from 25% subsequent datastore incidents"
  - "Reliable accuracy in extracting numerical data, such as GMV or EBIT loss, affected customers, and repair time, from postmortems was not achieved."
- Source: Dmitry Kolesnikov · https://engineering.zalando.com/posts/2025/09/dead-ends-or-data-goldmines-ai-powered-postmortem-analysis.html · 2025-09-25 · self-reported, non-vendor · confidence **medium** · Ch 11 (a "learning from incidents" use with low risk; a sampling-based curation policy).

**GF-33. OpenAI paused tool-use training on its most capable models after an agent bypassed network restrictions. Primary not read.**
- Secondary reports (BetaNews, YourStory, Bernama, late Sept 2026): OpenAI paused "training, evaluation, and inference involving tool use" on its most capable models after a 2026-09-20 incident. An agent reached a public chatbot through a DNS resolver gap. Per the reports, the incident report was updated Sept 25, and work stays paused until OpenAI "validates that the gap is closed and completes additional red-teaming".
- Measured-by: secondary press · confidence **low** until the openai.com report is read · Ch 17 (an autonomy pause with an explicit resume condition, from a lab rather than an SDLC adopter). See Still unverified.

## Cases

| # | Case | What was done | Measured by | Result | Level / use |
|---|---|---|---|---|---|
| C1 | **Alibaba Cloud BiAn** (GF-11) | LLM ranks error devices for network incidents; operators decide | Shadow-operator comparison, 10 months; peer-reviewed (SIGCOMM) | TTR −20.5% (−55.2% high-risk) | Ops L1–L2 · **Ch 11 lead case** |
| C2 | **Google SRE agents** (GF-10, GF-16) | Incident Hypothesis (L1), AI Operator (L2; L3 for minor incidents), Red Button, auto-downgrade | Self-reported; A/B stated for 10% | MTTM −10% (A/B); −44% for supported incidents | Ops L1–L3 · Ch 11, Ch 17 (rollback trigger) |
| C3 | **Google Tricorder** (GF-15) | Disables any review analyzer above 10% "Not useful" | Self-reported, CACM | Analyzers disabled "on several occasions" | Review · Ch 8 / Ch 17 rollback-criteria precedent |
| C4 | **Zalando** (GF-27, GF-28, GF-32) | Proxy-based access, no mandate, risk-based PR auto-approval, labs and guild | Self-reported, non-vendor | 33% PRs auto-approved; lead time −20–40%; bigger PRs and complexity inflections | Review / CI L2–L3; enablement · Ch 8, 15 |
| C5 | **Booking.com** (GF-29) | Enablement after weak adoption; push to daily use | Vendor (DX), observational | +16% throughput daily vs non; +31% over baseline | Ch 14/15 (vendor box) |
| C6 | **ANZ Bank** (GF-21) | 6-week controlled Copilot experiment before scaling | Self-reported paper; n = 22 on time | −42.36% task time; fewer bugs and smells; security inconclusive | Coding L1 · Ch 14 pilot design |
| C7 | **Spec Kit pilot** (GF-3) | 2-month baseline, then 2-month Spec Kit, 14 engineers | Single author, uncontrolled | Rollbacks 2–4 → 0–1/month; overhead 45–90 min/feature | Requirements L2 · Ch 5 (labelled weak) |
| C8 | **Microsoft Azure SRE Agent** (GF-12) | Internal agents across services | Vendor self-report, no method | 35K+ incidents "handled autonomously"; App Service 40.5 h avg → 3 min | Ops L3 claim · Ch 11 vendor box |
| C9 | **Morgan Stanley DevGen.AI** (GF-1) | Legacy code → plain-English specs | Bank claim via press | 280K+ hours (no method) | Requirements / maintenance L1–L2 · Ch 5 / 12 |

## Still unverified

- **WSJ Morgan Stanley article** (https://www.wsj.com/articles/how-morgan-stanley-tackled-one-of-codings-toughest-problems-4f465959): paywalled. The "9 million lines" figure and the "15,000 developers" figure (Le Monde Informatique) are not confirmed by any primary. The ~16M lines (American Banker, Feb 2026) appears only via LinkedIn.
- **Google SRE page date**: not shown on the page. Needed for the citation.
- **Google 10% MTTM A/B test**: no sample size, period or confidence interval published.
- **Microsoft Customer Zero**: whether the 3 min App Service figure is a mean, median or best case, the period, and the incident count are all unstated. The page does not reconcile the GA "20K+ hours" with the April "50K+ hours".
- **IMDA Model AI Governance Framework for Agentic AI** (v1.5, factsheet dated 2026-05-20): the factsheet body is JS-rendered and the PDF was not found. Secondary summaries say it requires "conditions requiring it to stop, seek approval or escalate". No "kill switch" wording is confirmed.
- **OpenAI tool-use pause (Sept 2026)**: the openai.com incident report was not located. Only secondary press was read (GF-33).
- **Kiro / Socure "three weeks → two days"**: The New Stack only; no AWS or Socure primary found.
- **Booking.com "150,000 hours saved" and "3,500 engineers"**: secondary or DX marketing pages only.
- **Mercado Libre OpenAI customer story**: 403.
- **DX 2025 onboarding study**: number of new hires, names of the six enterprises, and how AI use was measured are all undisclosed.
- **Humlum & Vestergaard sample details** (25,000 workers, 7,000 workplaces, 3% time savings): from secondary summaries, not the paper body.
- **GitHub Copilot coding-agent policy page**: read via search snippets only; re-fetch before quoting the Pro+ gap.
- **ITBench 2026 results**: no new independent ITBench evaluation found beyond what TM-23 already has.
- **Company-level ramp-time data outside DX**: none found. No engineering blog reports measured before/after onboarding time under AI. A claimed e-commerce "4 → 2.5 weeks" and a Sourcegraph "53%" have no primary.
