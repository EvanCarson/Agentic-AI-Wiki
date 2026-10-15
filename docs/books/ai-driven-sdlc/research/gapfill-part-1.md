# Gap-fill for Part I (Ch 1–4): bottleneck leads, the DORA sample size, the DORA 2025 capabilities and profiles, and cost

Research date: 2026-10-15. This file covers the leads the first round left open in `bottleneck-evidence.md` (lines 80–84), `maturity-models.md`, and the "Contradictions" (#1) and "Gaps" (Ch 2, Ch 4, fact-check list) sections of `aggregate.md`.

Every entry gives: the exact figure or quote · URL · date · measured-by · confidence · suggested chapter.

**Note on the DORA PDFs.** The 2024 report was downloaded directly from `https://services.google.com/fh/files/misc/2024_final_dora_report.pdf` (footer "v. 2024.3"), and its text was extracted and searched. The 2025 report is a gated download behind `https://cloud.google.com/dora` (linked from `https://dora.dev/research/2025/dora-report/`). Its text was read from a PDF copy whose title page reads "State of AI-assisted Software Development 2025" and whose footer reads "v. 2025.2". The page numbers below are the report's printed numbers, which match the PDF page index for both reports.

---

## Resolved

### R1. DORA 2024 sample size: ~3,000 vs ~39,000 (aggregate contradiction #1). RESOLVED.

- **Verdict:** the 2024 survey had **nearly 3,000** respondents. **~39,000** is DORA's cumulative total across ten years of reports. The aggregate's judgement was correct.
- **Exact text, p. 91 ("Demographics and firmographics → Who took the survey"):** "We've heard from roughly 39,000 professionals working in organizations of every size and across many different industries. … This year, nearly 3,000 working professionals from a variety of industries around the world shared their experiences."
- **Exact text, p. 3 (Executive summary):** "This is our tenth DORA report. We have heard from more than 39,000 professionals…". This is the cumulative figure, and the first-round brief misread it as the 2024 sample.
- **Effect sizes unaffected.** The p. 40 text was confirmed: "an estimated 7.2% reduction for every 25% increase in AI adoption" (stability), alongside the 1.5% throughput reduction.
- **Fix needed in `bottleneck-evidence.md`:** BN-1 says "survey of ~39,000 professionals"; change it to "nearly 3,000 (2024 survey)". Line 70 says "~39k vs ~5k respondents"; change it to "~3k (2024) vs 4,867 (2025)".
- **Source:** https://services.google.com/fh/files/misc/2024_final_dora_report.pdf · Oct 2024 (v. 2024.3) · independent-ish (Google Cloud research programme; survey) · **high** · Ch 1, Ch 4

### R2. DORA 2025 sample size (needed for the same contradiction). RESOLVED.

- **Exact count, p. 103:** "This year, a total of 4,867 respondents answered our survey."
- **Rounded figures:** "nearly 5,000" appears on p. 3 and p. 103. On p. 103 the cumulative total rises to "roughly 45,000 professionals".
- **Survey window, p. 4:** "a global survey conducted between June 13 and July 21, 2025".
- **Qualitative data, p. 3:** "more than 100 hours of qualitative data".
- **Source:** DORA, *State of AI-assisted Software Development 2025*, v. 2025.2 (via https://dora.dev/research/2025/dora-report/) · Sep 2025 · independent-ish survey · **high** · Ch 1, Ch 2

### R3. DORA 2025 AI Capabilities Model: the seven capabilities. RESOLVED, from the report chapter (pp. 49–64; authors Kevin M. Storer, Derek DeBellis, Nathen Harvey).

**Derivation, p. 50.** The model was built from "78 in-depth interviews, informed opinions from leading subject-matter experts, and previous DORA research". From that, DORA chose "an initial set of 15 candidate capabilities". Of these, "a set of seven AI capabilities showed substantial evidence of an interaction with AI use. That is, when teams paired these capabilities with AI adoption, the difference AI made across important outcomes was amplified."

Exact names, in the order the chapter presents them, with what the report says about each:

| # | Exact name | How it is measured | What the report found (exact wording where quoted) | Page |
|---|---|---|---|---|
| 1 | **Clear and communicated AI stance** | One factor with four indicators: AI use feels expected; the organisation supports experimentation; it is clear which tools are permitted; the policy applies to the respondent | "With a high degree of certainty": when the stance is clear, AI's positive influence on **individual effectiveness** and **organizational performance** is amplified, and "AI's neutral effect on friction is made beneficial and shown to decrease friction." "With a lesser degree of certainty": AI's positive influence on **software delivery throughput** is amplified. The measure covers "the clarity and awareness—not the specific content" of the stance. | 51–53 |
| 2 | **Healthy data ecosystems** | Three indicators: quality, accessibility and siloing of internal data | "With a high degree of certainty": AI's positive influence on **organizational performance** is amplified | 54 |
| 3 | **AI-accessible internal data** | Four indicators: AI tools have access to company information; responses use it; internal information is put into prompts; AI is used to retrieve internal information | "With a high degree of certainty": amplifies AI's positive influence on **individual effectiveness** and **code quality**. Quote: "maximizing the individual-effectiveness and code-quality benefits of AI may require a deeper investment than simply procuring AI licenses." | 55–56 |
| 4 | **Strong version control practices** | Commit frequency, and frequency of using rollback/revert | "With a high degree of certainty": frequent commits amplify AI's effect on **individual effectiveness**, and more frequent rollbacks amplify AI's effect on **team performance**. On instability: "it is harder to review larger batches of code", so "rollback reliance does not directly reduce instability" but helps AI-assisted teams undo changes. | 56–57 |
| 5 | **Working in small batches** | Three indicators: lines of code in the most recent change; changes per release; time to complete a task | "With a high degree of certainty": amplifies AI's effect on **product performance**, and turns AI's neutral effect on friction into a decrease. **Caveat:** "AI adoption's benefits for individual effectiveness are slightly reduced in teams that are working in small batches." DORA judges the net effect positive. | 58–59 |
| 6 | **User-centric focus** | Three seven-point Likert indicators | "With a high degree of certainty": amplifies AI's effect on **team performance**. Key line: "in the absence of a user-centric focus, AI adoption has a negative impact on team performance." | 60–61 |
| 7 | **Quality internal platforms** | Count of 12 platform characteristics | "With a high degree of certainty": amplifies AI's effect on **organizational performance**. **Caveat:** "AI's neutral effect on respondents' reported experiences of friction is made harmful". DORA hypothesises this is because platforms act as guardrails that prevent inappropriate use. | 62 |

- **Practical advice, p. 64.** One headline per capability: "Clarify and socialize your AI policies"; "Treat your data as a strategic asset"; "Connect AI to your internal context"; "Center users' needs in product strategy"; "Embrace and fortify your safety nets"; "Reduce the size of work items"; "Invest in your internal platform".
- **Point for Ch 2.** Two capabilities have a documented downside: small batches slightly reduce the individual-effectiveness gain, and quality platforms increase friction. Present them as trade-offs, not free wins.
- **Source:** DORA 2025 report pp. 49–64 (via https://dora.dev/research/2025/dora-report/); summary blog at https://cloud.google.com/blog/products/ai-machine-learning/introducing-doras-inaugural-ai-capabilities-model (2025-09-23) · survey-based moderation analysis, correlational · **high** for wording, **medium** for causal reading · Ch 2, Ch 15 (and Ch 1 for the small-batch/review link)

### R4. DORA 2025 team archetypes and their shares. RESOLVED (pp. 15–18).

- **Method, p. 15.** "Our analysis revealed seven distinct team archetypes". These came from "a cluster analysis" over eight factors: team performance, product performance, software delivery throughput, software delivery instability, individual effectiveness, valuable work, friction and burnout.
- **Caveat, p. 16.** "The names and descriptions for each of these clusters are an interpretation of the data."

| Cluster | Exact name | Share of respondents | Report's one-line description (verbatim) |
|---|---|---|---|
| 1 | Foundational challenges | **10%** | Indicators "consistently low"; "high reported levels of burnout and significant friction"; "notable challenges with the stability" |
| 2 | The legacy bottleneck | **11%** | "Teams in this cluster are in a constant state of reaction, where unstable systems dictate their work and undermine their morale." |
| 3 | Constrained by process | **17%** | "These teams are running on a treadmill. Despite working on stable systems, their effort is consumed by inefficient processes, leading to high burnout and low impact." |
| 4 | High impact, low cadence | **7%** | "…strong product performance and high individual effectiveness. However, this is coupled with a low-cadence delivery model characterized by low software delivery throughput and high instability." |
| 5 | Stable and methodical | **15%** | "These teams are the steady artisans of the software world, delivering high-quality, valuable work at a deliberate and sustainable pace." |
| 6 | Pragmatic performers | **20%** | "These teams consistently deliver work with impressive speed and stability, even if their work environment hasn't reached a state of peak engagement." |
| 7 | Harmonious high-achiever | **20%** | "This is what excellence looks like—a virtuous cycle where a stable, low-friction environment empowers teams to deliver high-quality work sustainably and without burnout." |

- The shares sum to 100%.
- **Extraction note.** In the PDF, the "Team well-being / System stability" sub-bullets are laid out in columns, so their mapping to clusters 2–4 was inferred from the order of the text. The names, shares and one-line descriptions are unambiguous.
- **Source:** DORA 2025 report pp. 15–18 · survey cluster analysis · **high** · Ch 2 (as a "where are you starting from" lens), Ch 13

### R5. Pichai's ~10% engineering velocity figure. VERIFIED from the official transcript.

- **Measure and estimate, [01:31:16]:** "we've given various stats around 30% of code now uses AI-generated suggestions or whatever it is. But the most important metric, and we carefully measure it is, like, how much has our engineering velocity increased as a company due to AI, right? It's tough measure, and we rigorously try to measure it, and our estimates are that number is now at 10%, right?"
- **Company-wide figure, [01:31:51]:** "Like, now, across the company, we've accomplished a 10% engineering velocity increase using AI, but we plan to hire more engineers next year".
- **Velocity vs share of code, [01:34:08]:** "when you have tens of thousands of engineers, that's a phenomenal number, and that's different than what other site or statistic saying like, 'This percentage of code is now written by AI.'"
- **Correction to the first-round brief:** the transcript **does not** say the metric is "engineering hours per week freed". That phrasing came from secondary snippets, so drop it. Pichai gives no definition beyond "engineering velocity … tough measure".
- **Source:** Lex Fridman Podcast #471, official transcript https://lexfridman.com/sundar-pichai-transcript · June 2025 · self-reported by the company CEO, method undisclosed · **high** that he said it, **low** as a measurement · Ch 1, Ch 4 (as an example of a CEO distinguishing velocity from % of code)

### R6. Microsoft "20–30% of code written by AI". PARTLY VERIFIED: secondary only, but an official recording exists.

- **Setting.** Satya Nadella answered a question from Mark Zuckerberg at Meta's LlamaCon fireside chat on 2025-04-29. Meta hosts the official recording at https://www.llama.com/resources/videos/mark-zuckerberg-and-satya-nadella/. It could not be transcribed here: it is a video, and the mirror returned 403.
- **Wording as reported by The Register** (2025-04-30, https://www.theregister.com/2025/04/30/microsoft_meta_autocoding): "I'd say maybe 20 to 30 percent of the code that is inside of our repos today in some of our projects are probably all written by software."
- **Variant wording.** Other secondary outlets print "maybe 20%, 30% of the code … and some of our projects". The Register also quotes "sort of whatever 30-40 percent – it's going up monotonically". Its paraphrase ties this to Microsoft tracking acceptance rates of suggested code, but the article is ambiguous.
- **Caveat from TechCrunch (secondary):** "it's unclear how exactly Microsoft and Google are measuring what's AI generated versus not."
- **Status:** **medium** confidence on the 20–30% wording, which multiple independent reports agree on. **Low** confidence on the 30–40% figure and what it refers to. Label it "as reported by The Register / TechCrunch" until the video is transcribed.
- **Use for:** Ch 4 ("% of code" is undefined; note the hedges "maybe", "in some of our projects").

### R7. The Stanford ~100k-developer study (Denisov-Blanch et al.). VERIFIED at the level of the researchers' own slides and talk. Not peer-reviewed.

- **Primary slide deck:** "Will AI Replace Software Engineers? Our 100k-Engineer Study Says… Not So Fast", Yegor Denisov-Blanch, Software Engineering Productivity Research Group, Stanford. PDF at https://aiconference.com/wp-content/uploads/2025/09/Yegor-Denisov-Blanch-Will-AI-Replace-Software-Engineers_-.pptx.pdf. The deck is internally titled "250906", i.e. the 2025-09-06 AI Conference talk. The research site is softwareengineeringproductivity.stanford.edu.
- **Design, slide 3:** "Time-series cross-sectional study … Git History · 600+ Companies · 100k+ Software Engineers", covering 2023–2025.
- **Method, slide 8.** A model trained to replicate a "Panel of 10-15 Independent Experts" scoring quality/maintainability, complexity and implementation time, with "r = >0.85". It builds on the authors' paper "Predicting Expert Evaluations in Software Code Reviews" (2024).
- **Matrix by project maturity × task complexity, slide 30.** Labelled "Orientative Guidelines":
  - Greenfield, low complexity: **+35–40%**
  - Greenfield, high complexity: **+10–15%**
  - Brownfield, low complexity: **+15–20%**
  - Brownfield, high complexity: **+0–10%**
  - **Internal inconsistency:** the slide 29/30 *title* says "Greenfield projects gain 30–35% on simple tasks and 10–15% on complex ones, versus 15–20% and 5–10% in brownfield projects". Quote ranges, not a single number, and say they are the authors' "orientative" estimates.
- **Matrix by language popularity × task complexity, slide 19.** Popular languages (e.g. Python, Java): **+20–25%** on low-complexity tasks and **+10–15%** on high-complexity tasks. Niche languages (e.g. COBOL, Haskell, Elixir): **0–5%** low and **(−5)–5%** high. Slide title: "AI boosts productivity by 10–25% in popular languages, but can decrease productivity in niche languages". "Data as of Q1 2025" (slide 18).
- **Case study of one company, slides 11–14:** PRs **+13.6%**, code quality **−9%** (with 3.6× more variance), "effective output" **+1%**, rework **2.6×** (p < 0.01). The deck's question: "Is this a failed AI coding assistant pilot?"
- **Widening gap, slide 21:** the gap between top- and bottom-quartile teams went from **4.8% (Apr 2023) to 19% (Jul 2025)**.
- **Self-assessment, slide 28.** 43 engineers' self-rated productivity correlated **r = 0.17** with measured productivity, and people "misjudge their productivity by ~30 percentile points".
- **Talk page.** The AI Engineer World's Fair talk page (https://www.ai.engineer/talks/tbDDYKRFjhk-ai-developer-productivity, listed 2025-07-23) summarises a net gain of "about 15–20%" after rework. That page appears to be an event-site summary, so prefer the slides.
- **Measured-by:** academic research group, but the data comes from companies that join the group's research portal. Not peer-reviewed, and the model is proprietary. Critics include BlueOptima, a competing vendor. **Confidence: medium** · Ch 1, Ch 4 (and Ch 13 for "brownfield/complex = smallest gain")

### R8. DX's AI measurement reports. VERIFIED (vendor; mostly self-reported).

| Report | Date | Sample | Key figures (verbatim) | URL |
|---|---|---|---|---|
| Q4 2025 "State of AI Impact in Engineering" | covers Q4 2025; page © 2026 | "over 135,000 developers across 425 organizations", combining "system-level telemetry with self-reported insights" | "AI adoption exceeds 90%"; "Developers save an average 3.6 hours per week"; "22% of merged code is AI-authored" ("far below vendor marketing claims"); "Daily AI users ship 60% more PRs than non-users"; "mixed results on quality" | https://getdx.com/report/ai-assisted-engineering-q4-impact-report/ |
| Q1 2026 AI impact report | updated 2026-04-29; data window 2025-10-17 to 2026-02-01 | "400+ companies" / "close to 500 companies" | "3.9 hours per week"; daily users 4.72 h; AI-authored code **27.4%**, defined as code "merged without major human rewrites", measured "by asking developers directly" (self-report); median PRs/week: daily users 2.4 vs non-users 1.5; "AI is a local optimizer"; "Global optimization requires fixing the human and systemic processes surrounding the code"; some companies "shipping as many as 50% more defects than before" | https://getdx.com/blog/ai-assisted-engineering-q1-impact-report/ |
| "AI and Engineering Velocity: A Longitudinal Analysis" | Nov 2024 – Feb 2026 window; blog updated 2026-04-28 | "more than 400 companies"; companies with >100 engineers and >75% monthly AI usage; companies with M&A, IPOs etc. excluded | "AI tool usage increased by an average of 65%, while median PR throughput increased by an average 7.76%"; "For most organizations, a 5–15% throughput gain"; blog: mean "around 11%" (a DX pricing guide says 13.1%; inconsistent); coding is "about 14%" of developer time | https://getdx.com/report/ai-and-engineering-velocity-a-longitudinal-analysis/ ; https://getdx.com/blog/ai-productivity-gains-more-modest-than-expected/ |
| Q2 2026 report (press release) | 2026-07-22; covers Apr–Jun 2026 | "500+ organizations" | "Median quarterly AI spend grew from roughly $1.5K to $44K in a year, a nearly 28x increase in the Tech sector alone" (unit of analysis not stated); innovation ratio "holding at roughly 57–58%"; "over 6 hours a week for heavy users"; "AI-generated code now accounting for 52.7% of all code", up from 24% two quarters earlier | https://getdx.com/news/dx-releases-q2-2026-state-of-ai-impact-in-engineering-report/ |
| 2026 DX benchmarks | updated 2026-07-21 | segments of "at least 30,000 individuals and/or 200 organizations" | "AI time savings (self-reported) increased by 60%, from 3.9 to 6.2 hours per developer per week"; AI-authored code +140% YoY | https://getdx.com/blog/2026-dx-benchmarks-are-now-available/ |

- **Measured-by:** vendor (DX sells measurement). Hours saved and % AI-authored are **self-reported**. PR throughput is system data.
- **Confidence:** medium.
- **Chapters:** Ch 1 (local optimiser; spend up, innovation ratio flat), Ch 4 (the ~8% median throughput gain is the most conservative large-sample telemetry number in the book), Ch 17.
- **Volatility warning:** % AI-authored jumps from 22% to 27.4% to 52.7% across three consecutive reports. DX says it rebuilt the methodology for Q2 2026 (secondary: diginomica), so do not chart these as one series.

### R9. The newest Faros AI report (2026). VERIFIED: "The Speed Trap" (Q3 2026) supersedes "Acceleration Whiplash" (Q2 2026).

- **Report list.** The Faros research index (https://www.faros.ai/research) lists:
  - Q3 2026 "The Speed Trap" (/research/speed-trap)
  - Q2 2026 "The Acceleration Whiplash"
  - Q2 2025 "The Productivity Paradox"
- **Sample and window.** Takeaways post, 2026-09-18, author "Faros Research": https://www.faros.ai/blog/ai-speed-trap-takeaways. Sample: "the most recent 12 months of telemetry from 22,000 developers across 4,000 teams" with high AI adoption.
- **Verbatim figures.** All are % changes against an unstated baseline:
  - Adoption and agents: "acceptance of AI-generated code has reached 65%"; "agents opening 13–14% of PRs at the leading edge"; "many companies running AI review on 50–80% of PRs"
  - Size and restarts: "average PR size is up 71.8%"; "restarts are up 66.7%"
  - Review and QA: PRs merged without review, "That figure has increased to 76.3%" (the prior report said +31.3%); "time in QA is up 300.6%"
  - Incidents: incidents per PR "up just 14.5%" (prior report: +242.7%); "Monthly incidents are up 125.4%, remediation is slower, and backlogs are growing again"
  - Deployment: "Deployment frequency has reversed direction" (no figure given)
- **Eight takeaways.** Among them: "the frontier has moved to agents"; "Work moves faster upfront, then queues downstream"; "Per-change risk stabilized, but operational strain has not"; "Agentic review is the first promising countermeasure" (correlational, no figures).
- **Cost:** no figure. The post only says improvement comes "with … higher costs".
- **Measured-by:** vendor telemetry, correlational, not peer-reviewed. The baseline (low- vs high-adoption) is not restated in the post. **Confidence: medium** for what Faros says, **low** for effect sizes.
- **Chapters:** Ch 1, Ch 8, Ch 11.
- **Note:** the earlier Whiplash FAQ (https://faros.ai/research/ai-acceleration-whiplash) frames its own figures differently from the BN-27 brief: "bugs per PR +28%", "5x median review time", "3x incidents per PR", "10x code churn". These are rounded versions of +441.5% etc. Keep one framing per report.

### R10. Cost of AI-driven development (aggregate gap, Ch 4). PARTLY RESOLVED.

**Bottom line:** no company engineering blog found publishes a **cost per merged agent PR including human review time**. The gap stands. What does exist:

- **Seat vs usage pricing (primary, vendor docs):**
  - **GitHub Copilot.** Moved from premium requests to token-based "AI Credits" on 2026-06-01. Announced 2026-04-27 (https://github.blog/changelog/2026/04/27/github-copilot-is-moving-to-usage-based-billing/).
    - Stated reason: "Agentic usage is becoming the default, and it brings significantly higher compute and inference demands."
    - Metering: "Usage will be calculated based on token consumption, including input, output, and cached tokens."
    - Seat prices unchanged, each including an equal dollar value of credits: Pro $10, Pro+ $39, Business $19/user, Enterprise $39/user.
    - "Copilot code review will also consume GitHub Actions minutes."
    - The previous model (docs.github.com, copilot-requests): cloud agent "uses one premium request per session, multiplied by the model's rate", with additional requests at "$0.04/request".
    - Measured-by: vendor pricing · high · Ch 4, Ch 15
  - **Anthropic Claude Code** (https://code.claude.com/docs/en/costs, read 2026-10-15). "Across enterprise deployments, the average cost is around $13 per developer per active day and $150-250 per developer per month, with costs remaining below $30 per active day for 90% of users."
    - "Agent teams use approximately 7x more tokens than standard sessions when teammates run in plan mode."
    - Team/Enterprise plans use per-seat allowances plus optional usage credits; Console and cloud billing is per token.
    - Measured-by: vendor-reported aggregate telemetry, method not disclosed · medium · Ch 4
- **Review cost (primary, vendor):** Anthropic Code Review (https://claude.com/blog/code-review, 2026-03-09).
  - Cost: reviews "generally average $15–25, scaling with PR size and complexity", "billed on token usage".
  - Time: "the average review takes around 20 minutes".
  - Coverage: substantive review comments went from "16% of PRs" to "54%".
  - Accuracy: "less than 1% of findings are marked incorrect".
  - Measured-by: vendor, internal · medium · Ch 4, Ch 8
- **Spend vs outcome (primary, vendor):** DX Q2 2026. Median quarterly AI spend rose from ~$1.5K to $44K (Tech sector, unit unstated) while the innovation ratio stayed flat at ~57–58% (see R8) · vendor · medium · Ch 4
- **Controlled cost-to-merge experiment (practitioner blog).** Veli-Matti Vanamo, Insight Tech APAC blog, 2026-07-06: https://blog.apac.insight.com/2026/07/06/cost-to-a-merged-feature.
  - Setup: one real feature (RFC 8628 device flow), 23 model × harness arms, 29 runs. The gate was an Opus 4.8 PR reviewer, and a 38-test oracle checked correctness.
  - Total cost to merge was "about $3 to about $33" (table: $2.59 to $33.38), taking 26 minutes to ~3 hours.
  - The harness alone moved cost "by roughly 2.5×" on the same model.
  - Low effort roughly halved cost (~$10 to $5.24, single run).
  - **Excludes human review time.**
  - Measured-by: self-reported single practitioner, n = 1 feature · low–medium · Ch 4 (as a method template)
- **Anecdotal seat → usage shock (vendor quoting customers).** DX pricing guide (https://getdx.com/blog/ai-coding-assistant-pricing/, updated 2026-06-12) quotes DX's Troy Gray on the Copilot billing change: "One developer reported going from $29 to $750 a month. Another from $50 to $3,000." Also: "A company with 80 developers calculated their monthly spend will now equal the annual salary of a full time engineer." · anecdotal · low · Ch 4 sidebar

---

## New claims

1. **Google: "75% of all new code at Google is now AI-generated and approved by engineers, up from 50% last fall."** The same post: "We're now shifting to truly agentic workflows", and "a particularly complex code migration done by agents and engineers working together was completed six times faster." · https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/cloud-next-2026-sundar-pichai/ · 2026-04-22 · self-reported (CEO), definition undisclosed · high that it was said, low as a measure · Ch 1, Ch 4. *Use with Pichai's own 2025 caveat (R5) that velocity, not % of code, is the metric that matters. Google has published no updated velocity figure.*
2. **DORA 2025: 30% report "little to no trust" in AI-generated code; 90% use AI; more than 80% believe it raised their productivity** (p. 4) · DORA 2025 PDF · Sep 2025 · survey · high · Ch 4 (perception vs measurement)
3. **DORA 2025 cumulative sample is "roughly 45,000 professionals"** (p. 103). It replaces the 2024 report's 39,000 if a cumulative figure is needed · high · Preface/Ch 1
4. **DORA 2025 executive summary: "Without this foundation, AI creates localized pockets of productivity that are often lost to downstream chaos."** (p. 3) This confirms the BN-10 quote's location · high · Ch 1
5. **DORA links rollback to larger AI batches: "it is harder to review larger batches of code."** (p. 57) · high · Ch 1, Ch 10
6. **Stanford case study: AI adoption raised PRs by 13.6% while "effective output" rose 1% and rework rose 2.6×** (slides 11–14) · researcher slides · medium · Ch 1, Ch 17 (a model of "the pilot that looked like success on PR count")
7. **Stanford self-assessment: r = 0.17 between self-rated and measured productivity; people misjudge by ~30 percentile points (n = 43)** · slides · medium (small n) · Ch 4, Ch 17
8. **DX: the median PR throughput gain is ~8% (7.76%) over 15 months while AI usage rose 65%; most organisations sit at 5–15%** (R8) · vendor, telemetry · medium · Ch 1, Ch 4
9. **Faros Q3 2026: agents open 13–14% of PRs at the leading edge; AI review runs on 50–80% of PRs at many companies** (R9) · vendor · medium · Ch 7, Ch 8
10. **GitHub's stated reason for moving to usage-based billing is that agentic usage "brings significantly higher compute and inference demands"** (R10) · vendor primary · high · Ch 4 ("the seat-price era is ending" argument)

---

## Cases

- **Uber's AI coding budget overrun (secondary only).**
  - What happened, per reports: the CTO told The Information that Uber exhausted its full-year 2026 AI budget by about April, driven by Claude Code.
  - Reported figures:
    - Claude Code adoption rose from 32% to 84% of engineers.
    - Average spend was $150–250 per engineer per month, with heavy users at ~$2,000.
    - A $1,500 monthly cap was introduced.
    - The COO said it is hard to link more tokens to more useful features.
  - Sources: Outlook Business, Quartz (https://qz.com/uber-coo-ai-spending-harder-justify-052626) and aiweekly, all citing The Information or Business Insider. **No Uber primary found.**
  - Ch 4 lesson: usage pricing without per-team budgets and an outcome metric. Mark it **secondary** · low–medium.
- **Microsoft E+D division reportedly pulling Claude Code licences at ~$2,000/engineer/month.** Secondary via aggregators citing Windows Central; not checked against the original · low · do not use without the primary.
- **Pylon (via DX).** The Anthropic bill is reportedly going from $400K to $1.4M a year because a seat threshold triggered a tier change. CEO quotes: "I accidentally spent $4,000 in three days in Claude Code"; "Top spenders on our support team hit $800/month" · https://getdx.com/blog/ai-coding-assistant-pricing/ (DX citing the CEO) · secondary-of-primary · low · Ch 4 sidebar
- **Stanford anonymous company case (R7).** It shows how a pilot judged on PR count can look like a success while effective output is flat · medium · Ch 3 (negative-case candidate, though the company is anonymous) or Ch 17.

---

## Still unverified

- **The Nadella LlamaCon quote, verbatim from the recording.** The official video is at https://www.llama.com/resources/videos/mark-zuckerberg-and-satya-nadella/ but was not transcribed. It is unclear what the "30–40 percent … going up monotonically" figure refers to (acceptance rate vs share of code).
- **The Stanford study as a peer-reviewed paper.** No paper reporting the 100k-developer AI-impact results was found. Only the 2024 "Predicting Expert Evaluations in Software Code Reviews" methods paper is referenced (arXiv ID not confirmed). The talk-page summary of a "15–20% net" gain is not on the slides read here.
- **The full Faros "Speed Trap" report.** The landing page is a teaser; the figures above come from the 2026-09-18 takeaways post. The baseline definition and the deployment-frequency figure were not retrieved.
- **The full DX Q2 2026 report.** Only the press release was read. The unit of "median quarterly AI spend" (per org? per engineer?) is unstated, and so is DX's methodology rebuild (secondary: diginomica).
- **DX longitudinal mean.** Its own sources say "around 11%" (blog) and 13.1% with a 90th percentile of 43.9% (pricing guide, citing the report). The report page gives neither.
- **The DORA ROI report** (https://cloud.google.com/resources/content/dora-roi-of-ai-assisted-software-development). The page is gated or truncated, so its content was not read. It remains the best lead for a cost framework for Ch 4.
- **Any published cost per merged agent PR including human review and CI time** from a company engineering blog. None found (searched for Stripe, Spotify, Ramp, Coinbase, Shopify and general queries). The aggregate's Ch 4 gap stands.
- **Uber budget overrun and Microsoft E+D licence pullback.** Only secondary press found (The Information and Windows Central originals not read).
- **"Engineering hours per week freed" as Google's velocity definition.** It is not in the Pichai transcript. Drop it unless another Google primary turns up.
