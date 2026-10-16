# Gap-fill: maturity models and case-study leads

Researcher brief for *From SDLC to AI-Driven SDLC: A Migration Handbook*. Compiled 2026-10-15.
Scope: aggregate.md §5 contradictions #7, #8, #10, #11 and the §6 gap row "Ch 2 Maturity", plus the fact-check items "Uber uReview 65k/week vs /month" and the Kiro dates.
Method: every figure below was read on the primary page in this session, via WebFetch, curl, or a headless browser for pages that return 403 to fetchers (gartner.com, mckinsey.com). Anything read only in secondary coverage is labelled **secondary**. Short quotes are verbatim.

---

## Resolved

### R1. Thoughtworks "Complacency with AI-generated code": **verified**
- **What:** a blip in the **Hold** ring ("Proceed with caution") in three consecutive editions:
  - Oct 2024, which is Vol 31 (published 2024-10-23)
  - Apr 2025, Vol 32
  - Nov 2025, Vol 33 (last updated 2025-11-05)
- **Current status:** "NOT ON THE CURRENT EDITION". The current edition is Vol 34, April 2026.
- **Oct 2024 wording:** "It's all too tempting to be less vigilant when reviewing AI suggestions after a few positive experiences with an assistant."
  - It recommends being wary of "automation bias, sunk cost fallacy, anchoring bias and review fatigue".
  - It questions whether GitHub's reported "15% increase of the pull request merge rate is actually a good thing or whether people are merging larger pull requests faster because they trust the AI results too much."
- **Apr 2025 wording:** "when AI generates larger and larger change sets, developers face greater challenges in reviewing results". On vibe coding: "we strongly caution against using it for production code."
- **Nov 2025 wording:** "speeding up one part of the workflow increases pressure on the others. Our teams are finding that using AI effectively in production requires renewed focus on code quality. We recommend reinforcing established practices such as TDD and static analysis, and embedding them directly into coding workflows".
- **Source:** https://www.thoughtworks.com/radar/techniques/complacency-with-ai-generated-code
- **Measured-by:** practitioner opinion (independent consultancy, no data of its own). It cites GitClear and Microsoft research.
- **Confidence:** high, as quoted.
- **Chapters:** Ch 2, for the L2/L3 boundary and "review fatigue"; Ch 8; Ch 16.
- **Correction to maturity-models.md:** the blip first appeared in **Vol 31 (Oct 2024)**, not Vol 32.

### R2. GitLab's "4 stages of AI maturity in DevSecOps": **could not verify the stage names**
- **What is on the landing page:**
  - The table of contents lists "The 4 stages of AI maturity in DevSecOps".
  - "insights from over 5,000 DevSecOps professionals in 39 countries".
  - The survey was run by Omdia and GitLab.
  - Headline stats: "39% of respondents said they are using AI for software development today, up 16 percentage points from 2023" and "55% … said that introducing AI into the software development lifecycle is risky."
  - The summary text: "Most organizations have moved beyond the hype and have begun to explore how they might be able to use AI for specific use cases, and the earliest adopters have begun to optimize their approach".
- **Why the names are missing:** the stage names and definitions sit behind a registration form. They are not in the page's public `_payload.json`, which I inspected, and no primary GitLab blog post repeats them.
- **Source:** https://about.gitlab.com/developer-survey/2024/ai/ (2024)
- **Measured-by:** vendor survey.
- **Confidence:** high for the stats above. The stage names are **unverified**, so do not print them.
- **Chapter:** Ch 2. Cite only as "GitLab describes a four-stage model".

### R3. Gartner predictions: **verified at the primary press releases**
Each release was read on gartner.com via a headless browser. Plain fetchers get a 403.

| # | Release (date) | Exact wording | URL |
|---|---|---|---|
| a | 2024-10-03 | "Through 2027, generative AI (GenAI) will spawn new roles in software engineering and operations, requiring 80% of the engineering workforce to upskill". Three horizons: short term "AI will operate within boundaries" ("modest productivity increases … most significant for senior developers in organizations with mature engineering practices"); medium term "AI agents will push boundaries" ("emergence of AI-native software engineering when most code will be AI-generated rather than human-authored"); long term "rise of AI engineering". Survey: Q4 2023, "300 U.S. and U.K. organizations", "56% of software engineering leaders rated AI/machine learning (ML) engineer as the most in-demand role for 2024". Analyst: Philip Walsh. | https://www.gartner.com/en/newsroom/press-releases/2024-10-03-gartner-says-generative-ai-will-require-80-percent-of-engineering-workforce-to-upskill-through-2027 |
| b | 2025-07-01 | "Gartner predicts that by 2028, 90% of enterprise software engineers will use AI code assistants, up from less than 14% in early 2024." AI-native SE "enable[s] AI to autonomously or semi-autonomously handle a significant share of tasks across SDLC." "teams must balance automation with human oversight, considering business criticality, risk and workflow complexity." Also: "by 2027, at least 55% of software engineering teams will be actively building LLM-based features"; "by 2027, 70% of organizations with platform teams will include GenAI capabilities in their internal developer platforms." Analyst: Joachim Herschmann. | https://www.gartner.com/en/newsroom/press-releases/2025-07-01-gartner-identifies-the-top-strategic-trends-in-software-engineering-for-2025-and-beyond |
| c | 2025-06-25 (Sydney) | "Over 40% of agentic AI projects will be canceled by the end of 2027, due to escalating costs, unclear business value or inadequate risk controls". "Gartner estimates only about 130 of the thousands of agentic AI vendors are real" ("agent washing"). Jan 2025 webinar poll of 3,412: 19% significant investment, 42% conservative, 8% none, 31% wait-and-see/unsure. Analyst: Anushree Verma. | https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 |
| d | 2026-05-20 | "by 2027, over 65% of engineering teams using agentic coding will treat integrated development environments (IDEs) as optional, shifting control, governance, and validation to automated platforms." Market described as "a transformative shift from AI-assisted development to agentic software development, spanning the SDLC from planning to creating to reviewing code." Walsh: "What began as a race to deliver the most 'magical' developer experience is now evolving into a contest of operational excellence, commercial maturity, and enterprise readiness". Mentions a "Magic Quadrant for Enterprise AI Coding Agents". | https://www.gartner.com/en/newsroom/press-releases/2026-05-20-gartner-says-the-market-for-enterprise-ai-coding-agents-is-entering-a-new-phase-of-expansion-and-competitive-realignment |
| e | 2026-06-24 | "By 2028, AI coding costs will overtake the average developer's salary due to rising large language model (LLM) token consumption and the shift to consumption-based licensing models". Recommends "classifying development tasks into three execution models: developer‑led, developer‑with‑agent, and fully agent‑led". Names "ungoverned autonomy in agent-driven workflows, bloated context windows and the absence of structured feedback mechanisms" as failure modes. Tyagi: "Most organizations still lack the maturity and frameworks to effectively measure cost versus business impact". Analyst: Nitish Tyagi. | https://www.gartner.com/en/newsroom/press-releases/2026-06-24-gartner-predicts-ai-coding-costs-will-surpass-average-developer-salary-by-2028-as-token-consumption-surges |

- **Measured-by:** analyst forecasts. They are opinion and model-based, not measurements. The only survey numbers are the Q4 2023 n=300 survey and the Jan 2025 poll of 3,412 webinar attendees, which is self-selected.
- **Confidence:** high, as quoted.
- **Chapters:**
  - (a) and (b): Ch 1 and Ch 2 (industry framing).
  - (c): Ch 3 and Ch 14.
  - (d): Ch 2 and Ch 10. "Validation shifts to automated platforms" supports the verification thesis.
  - (e): **Ch 4 Economics**, which is a direct hit on the "cost per agent PR" gap; also Ch 2. Gartner's three execution models map onto L2, L3 and L4.
- **Hype Cycle placements:** **could not verify.** No Gartner press release that places "AI code assistants", "AI-augmented software engineering" or "AI coding agents" on a Hype Cycle was found. Everything seen was vendor reprints or secondary press (see Still unverified).

### R4. McKinsey, "Unlocking the value of AI in software development": **verified**
- **Date and type:** 2025-11-03, Article.
- **Authors:** Charlotte Relyea, Martin Harrysson and Matt Linderman, with Jose Mario Pena, Nandita Bothra and Natasha Maniar.
- **Source:** https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/unlocking-the-value-of-ai-in-software-development
- **Method sidebar:**
  - "nearly 300 senior leaders from publicly traded companies"; "100 of them assessed impact and performance across four outcomes".
  - "Top performers were defined as the top quintile".
- **Figures:**
  - Top performers saw "team productivity, customer experience, and time to market (16 to 30 percent improvements), as well as software quality (31 to 45 percent)".
  - "a performance gap of 15 percentage points between top and bottom performers".
  - "six to seven times more likely than peers to scale to four or more use cases"; "Nearly two-thirds of leaders report four or more use cases at scale, compared with just 10 percent of bottom performers".
  - "More than 90 percent of all software teams we surveyed use AI for these activities [refactoring, modernization, testing], saving an average of six hours per week".
  - Hands-on workshops and coaching: "57 percent of top performers versus only 20 percent of bottom performers".
  - Outcome tracking by top performers: "quality improvements (79 percent) and speed gains (57 percent)".
  - "Nearly eight in ten link gen-AI-related goals to both product manager and developer reviews, compared with just 10 percent of bottom performers for developers and none for product managers".
- **Measured-by:** self-reported executive survey. Outcomes are self-assessed by 100 respondents, and top/bottom quintiles are defined on those same outcomes, so the comparison is circular.
- **Confidence:** high (as quoted) / low (as evidence of causation).
- **Chapters:** Ch 2 ("maturity = end-to-end across the lifecycle"), Ch 4 (measure outcomes, not adoption), Ch 15.
- **Caveat for the book:** the Cursor case in this article is a vendor self-description, with no figures.

### R5. Amazon Kiro / AWS Cost Explorer: **dates and wording resolved**
- **FT article:** published **2026-02-19**. Amazon's rebuttal, timestamped 2026-02-20 20:36 UTC, refers to "the Financial Times' reporting yesterday". The FT URL, linked from Amazon's own post, is https://www.ft.com/content/00c282de-ed14-4acd-a948-bc8d6bdb339d. It is paywalled and was not read; FT content is known here only via Reuters and Engadget.
- **Reuters (secondary), dated 2026-02-19/20:** the FT said AWS had "two outages in December" involving AI tools, including a "13-hour interruption" after engineers let Kiro make changes. The agent decided to "delete and recreate the environment".
  - An AWS spokesperson told Reuters: "That event interrupted an AWS feature – a single service used for cost management – not AWS generally"; also "extremely limited event"; one of two mainland China regions.
  - Source: https://whbl.com/2026/02/19/amazons-cloud-unit-hit-was-hit-by-least-two-outages-involving-ai-tools-in-december-ft-says/
- **Amazon's primary rebuttal** ("Correcting the Financial Times report about AWS, Kiro, and AI", by Amazon Staff, published **2026-02-20**): https://www.aboutamazon.com/news/aws/aws-service-outage-ai-bot-kiro. Verbatim:
  - "The brief service interruption they reported on was the result of user error—specifically misconfigured access controls—not AI as the story claims."
  - "an extremely limited event last December affecting a single service (AWS Cost Explorer…) in one of our 39 Geographic Regions around the world."
  - "The issue stemmed from a misconfigured role—the same issue that could occur with any developer tool (AI powered or not) or manual action."
  - "We did not receive any customer inquiries regarding the interruption."
  - "Additional safeguards include mandatory peer review for production access."
  - "The Financial Times' claim that a second event impacted AWS is entirely false."
- **Phrases not in the primary post:** "user error, not AI error", "broader permissions than expected — a user access control issue, not an AI autonomy issue" and Kiro "requests authorization before taking any action" do **not** appear in it. They come from Amazon's statement as quoted by Engadget, updated 2026-02-21 11:58 EST: https://engadget.com/ai/13-hour-aws-outage-reportedly-caused-by-amazons-own-ai-tools-170930190.html. Label them "Amazon statement to press (via Engadget)".
- **Still FT-only, via Engadget:** "The outages were small but entirely foreseeable" (a senior AWS employee) and the "80 percent weekly use goal" for Kiro.
- **Measured-by:** anonymous sources vs. a company rebuttal.
- **Confidence:**
  - high: an incident occurred in Dec 2025, it was confined to Cost Explorer, and peer review was added.
  - disputed: the 13-hour duration (Amazon says "brief") and the causal role of Kiro.
- **Chapters:** Ch 3, Ch 11, Ch 17, and the proposed security chapter.
- **Corrections to the existing briefs:**
  - phases-testing-to-maintenance.md's "nothing found; do not use" is wrong.
  - The aggregate's "FT 19 Feb, Amazon statement 20–21 Feb" becomes FT 19 Feb, Amazon blog 20 Feb, and expanded press statement on Engadget 21 Feb.

### R6. Amazon Q Java upgrade figures: **resolved**
- **Jassy's LinkedIn post:** dated **2024-08-22**. The date is decoded from the post's activity ID (7232374162185461760, which gives 2024-08-22 13:12 UTC); the page itself shows only a relative date. URL: https://www.linkedin.com/posts/andy-jassy-8b1615_one-of-the-most-tedious-but-critical-tasks-activity-7232374162185461760-AdSz/
  - The post was fetched directly, but the fetch tool returned only a paraphrase. The verbatim sentences below are as quoted by Simon Willison (https://simonwillison.net/2024/Aug/24/andy-jassy-amazon-ceo/, 2024-08-24), and they match the fetched paraphrase:
    - "The average time to upgrade an application to Java 17 plummeted from what's typically 50 developer-days to just a few hours."
    - "We estimate this has saved us the equivalent of 4,500 developer-years of work (yes, that number is crazy but, real)."
    - "In under six months, we've been able to upgrade more than 50% of our production Java systems to modernized Java versions".
    - "our developers shipped 79% of the auto-generated code reviews without any additional changes."
    - The post also gives an estimated "$260M in annualized efficiency gains".
- **AWS DevOps blog:** "Amazon Q Developer just reached a $260 million dollar milestone", by Aytul Arisoy Cholkar, **2024-08-01**: https://aws.amazon.com/blogs/devops/amazon-q-developer-just-reached-a-260-million-dollar-milestone/. Verbatim:
  - "Amazon has migrated tens of thousands of production applications from Java 8 or 11 to Java 17"
  - "This represents a savings of over 4,500 years of development work for over a thousand developers"
  - "performance improvements worth $260 million dollars in annual cost savings."
- **Resolution:** both phrasings are primary and Amazon-authored.
  - The CEO's phrasing is "the equivalent of 4,500 developer-years", explicitly an estimate ("We estimate").
  - The AWS blog's "4,500 years of development work for over a thousand developers" is the same number in looser marketing wording; it predates the CEO post by three weeks.
  - **Recommend quoting Jassy's wording** and labelling it "Amazon CEO estimate, method undisclosed".
  - "~30,000 applications" is not in either primary; use "tens of thousands".
- **Measured-by:** self-reported (vendor promoting its own product).
- **Confidence:** high (that it was said) / low (as a measurement).
- **Chapters:** Ch 3, Ch 4 (the example of an unaudited counterfactual), Ch 12.

### R7. Microsoft dotnet/runtime Copilot Coding Agent study: **all four figures confirmed**
- **Source:** "Ten Months with Copilot Coding Agent in dotnet/runtime" by Stephen Toub (Distinguished Engineer, Microsoft), **2026-03-23**: https://devblogs.microsoft.com/dotnet/ten-months-with-cca-in-dotnet-runtime/
- **Window:** 878 CCA PRs in dotnet/runtime, 2025-05-19 to 2026-03-22. The post also cites 2,963 CCA PRs across seven repos.
- **Merge ("success") rates:**

  | Author | PRs | Merged | Success rate |
  |---|---|---|---|
  | CCA | 878 | 535 | **67.9%** |
  | Human (Microsoft) | 3,082 | 2,556 | **87.1%** |
  | Human (Community) | 1,411 | 1,029 | 79.7% |
  | Bot | 810 | 666 | 85.9% |

  The post calls the populations different and the comparison directional.
- **Before and after setup:** "PRs created before our first setup changes: 38.1% success rate" and "PRs created after: 69%." The gain came "not through better AI models, but through better preparation": firewall rules for package feeds, `copilot-instructions.md`, and setup steps to avoid build timeouts. **The figure is 38.1%, not 38%.**
- **Reverts:** "Of the 535 merged CCA PRs, 3 were reverted (0.6%)", against 33 of 4,251 non-CCA merged PRs (0.8%). The post says the difference is not statistically meaningful but "the data shows no red flags".
- **By category:** cleanup 84.7% (77), testing 75.6% (99), refactoring 69.7% (86), bug fix 69.4% (317), docs 68.1% (52), update 67.4% (44), feature 64.5% (131), performance 54.5% (46), other 11.5% (26).
- **Architectural comments:** 1.8% of human comments on merged CCA PRs were architectural (92 comments). The categorisation was done by an LLM (Opus 4.6) and is labelled directional.
- **Cost:** "It also does not analyze the compute cost of CCA usage or the CI resources consumed by CCA PRs." Also: "These are real costs".
- **Measured-by:** self-reported by the platform owner, from public repo data. It is reproducible in principle.
- **Confidence:** high.
- **Chapters:** Ch 3, Ch 7, Ch 8, Ch 17 (the revert rate is the only public agent revert figure), Ch 4 (the explicit cost gap).

### R8. Answer.AI's Devin evaluation: **confirmed**
- **Source:** "Thoughts On A Month With Devin" by Hamel Husain, Isaac Flath and Johno Whitaker, **2025-01-08**: https://www.answer.ai/posts/2025-01-08-devin.html
- **Result:** 20 tasks, with 3 successes, 14 failures and 3 inconclusive.
- **Quotes:**
  - "would spend days pursuing impossible solutions rather than recognizing fundamental blockers"
  - "Tasks it can do are those that are so small and well-defined that I may as well do them myself, faster, my way."
  - "spaghetti code that was way more confusing to read through than if I'd written it from scratch"
- **Measured-by:** independent practitioner team, n=20, not a controlled study, early-2025 Devin.
- **Confidence:** high (as reported). The tool version is dated.
- **Chapters:** Ch 3 (failure), Ch 7 (anti-pattern: autonomy without scoping).

### R9. Spotify Honk: **primary posts confirmed, and the series extended**
- **Part 1:** "1,500+ PRs Later: Spotify's Journey with Our Background Coding Agent (Honk, Part 1)" by Max Charas and Marc Bruggmann, **2025-11-06**: https://engineering.atspotify.com/2025/11/spotifys-background-coding-agent-part-1
  - "more than 1,500 pull requests that teams across Spotify have merged"
  - "Since mid-2024, around half of Spotify's pull requests have been automated by this system." This refers to Fleet Management, which is largely deterministic.
  - "a total time saving of 60–90% compared to writing the code by hand", for the migrations where they measured it.
  - "We don't have all the answers yet."
- **Part 2:** "Background Coding Agents: Context Engineering (Honk, Part 2)" by the same authors, **2025-11-24**: https://engineering.atspotify.com/2025/11/context-engineering-background-coding-agents-part-2
  - Goose and Aider were tried first, then a homegrown loop (10 turns per session, 3 retries).
  - Claude Code was then "applied to about 50 migrations" and produced the majority of merged background-agent PRs.
  - The toolset is deliberately small: a verify tool, limited Git, and Bash with a strict allowlist. No code search is exposed.
  - "We keep our background coding agent very limited in terms of tools and hooks"; "The more tools you have, the more dimensions of unpredictability you introduce."
- **Part 3:** "Background Coding Agents: Predictable Results Through Strong Feedback Loops (Honk, Part 3)", **2025-12-09**: https://engineering.atspotify.com/2025/12/feedback-loops-background-coding-agents-part-3
  - "out of thousands of agent sessions, the judge vetoes about a quarter of them"; "the agent is able to course correct half the time".
  - When a verifier fails, "the PR isn't opened and the user is presented with an error message". The phrase "no PR is created" in the earlier brief is a paraphrase.
  - "It's highly sandboxed."
  - The worst failure mode: "a PR that passes CI but is functionally incorrect."
- **Part 4 (new):** "Background Coding Agents: Supercharging Downstream Consumer Dataset Migrations (Honk, Part 4)" by Devon Edwards Joseph, **2026-04-22**: https://engineering.atspotify.com/2026/4/background-coding-agents-dataset-migrations-honk-part-4
  - About 1,800 direct downstream pipelines; "we successfully rolled out 240 automated migration PRs".
  - "We estimated that it would have taken around 10 engineering weeks of effort to complete these migrations manually."
  - No merge rate is given.
  - BigQuery Runner and dbt repos rarely had build-time tests, so owners had to test the PRs manually: a verification gap.
- **Code with Claude 2026 recap (new):** "Coding Is No Longer the Constraint…", Spotify Engineering, **2026-06-03**. It covers a talk by Niklas Gustavsson (Chief Architect): https://engineering.atspotify.com/2026/6/code-with-claude-coding-is-no-longer-the-constraint
  - Over 99% of engineers use AI coding tools weekly.
  - 94% report being more productive.
  - PR frequency is up 76%: "we now have 76% more PRs to review".
  - Fleet Management has merged more than 2.5 million automated maintenance PRs, most auto-merged with no human in the loop.
  - The latest backend Java migration took three days.
- **LLM-judge removal (contradiction #8):** **not found in any Spotify primary.** Part 4 and the June 2026 recap do not mention it. It remains sourced only to InfoQ's QCon London report (2026-03-18, secondary).
- **Measured-by:** self-reported (Spotify staff).
- **Confidence:** high (as reported).
- **Chapters:** Ch 12 (lead case), Ch 9, Ch 8 (review bottleneck), Ch 2 (the verifier-first design).

### R10. Uber uReview: **resolved, but the primary is internally inconsistent**
- **Source:** "uReview: Scalable, Trustworthy GenAI for Code Review at Uber" by Sonal Mahajan, Shauvik Roy Choudhary and Will Bond, **2025-08-12**: https://www.uber.com/en-US/blog/ureview/
- **Verbatim figures:**
  - "uReview today analyzes over 90% of the weekly ~65,000 diffs (equivalent of pull requests) landed at Uber."
  - **Elsewhere the same post says** "given the scale of diffs at Uber (65,000 per month)". So the week-vs-month conflict is *inside the primary*, not a secondary error.
  - "Each week, uReview processes over 10,000 commits, excluding configuration files."
  - "Engineers who interact with the tool mark 75% of its comments as useful"; over 65% of posted comments are addressed (vs. 51% for human comments in internal audits).
  - "approximately 1,500 hours saved weekly, equivalent to nearly 39 developer years annually", assuming 10 minutes per commit.
  - "uReview today only has access to the code, and not to other artifacts like past PRs, …" (feature flags, schemas, docs).
- **Recommendation:** cite "~65,000 diffs per week (Uber's headline figure; the same post also says 'per month')". The time-saved arithmetic is internally consistent: 10,000+ commits/week × 10 min ≈ 1,667 h. That matches "over 10,000 commits weekly" and does not depend on the 65k figure.
- **Correction:** the earlier brief's claim that uReview lacks design docs is a paraphrase. The primary says it lacks "past PRs, feature flag configurations, database schemas, or technical documentation".
- **Measured-by:** self-reported. Usefulness is an opt-in rating, and "addressed" is a model-computed proxy.
- **Confidence:** high for the quotes, medium for the volume figure.
- **Chapters:** Ch 8, Ch 4.

---

## New claims

1. **The current Thoughtworks Radar (Vol 34, April 2026) has 8 blips in the Caution ring, most of them about AI coding.** The ring is now labelled "Caution" on the site; the earlier Hold blips also read "Proceed with caution". Source: https://www.thoughtworks.com/radar/techniques, fetched 2026-10-15. Measured-by: practitioner opinion. Confidence: high (as quoted).
   - **Agent instruction bloat:** "As instructions grow, the likelihood increases that important rules are ignored… research suggests that hand-written versions are often more effective than LLM-generated ones." This feeds contradiction #7 in aggregate.md (Ch 7, Ch 2).
   - **Codebase cognitive debt:** "the growing gap between a system's implementation and a team's shared understanding of how and why it works… Teams should avoid complacency with AI-generated code and adopt explicit countermeasures: feedback sensors for coding agents, tracking team cognitive load and architectural fitness functions". This is the successor to the complacency blip (Ch 16, Ch 6, Ch 17).
   - **Coding throughput as a measure of productivity:** "Cycle times increase as engineers raise PRs filled with insufficiently reviewed AI output". It proposes "first-pass acceptance rate" as a leading indicator tied to DORA (Ch 4, Ch 8).
   - **Coding agent swarms:** the Anthropic C-compiler and Cursor browser experiments "chose use cases that could rely on existing detailed specifications… Those conditions are not representative of typical product development" (Ch 2: why L4 is not a target).
   - **AI-accelerated shadow IT** (Ch 15).
2. **The same Vol 34 Radar lists these AI-delivery techniques in the higher rings.** Source and measured-by as in claim 1.
   - **Adopt:** "Curated shared instructions for software teams" (instruction files in service templates) and "DORA metrics", including rework rate: "If lead times don't decrease and deployment frequency doesn't increase, faster code generation doesn't translate into better outcomes."
   - **Trial:** "Feedback sensors for coding agents" ("these sensors should run during the coding session and report clean results before a commit is made") and "Sandboxed execution for coding agents" ("We see sandboxing as a sensible default rather than an optional enhancement").
   - **Assess:** "Measuring collaboration quality with coding agents" and "Architecture drift reduction with LLMs". The latter is a lead for the Ch 6 Design gap.
   - Confidence: high. Chapters: Ch 2, Ch 9, Ch 10, the security chapter, Ch 6.
3. **Gartner names three execution models: "developer‑led, developer‑with‑agent, and fully agent‑led".** It recommends deciding "appropriate levels of autonomy for each task". This is an analyst endorsement of per-task autonomy levels, so it supports the book's per-phase grid. Source: R3(e), 2026-06-24. Measured-by: analyst opinion. Confidence: high. Chapter: Ch 2.
4. **Gartner forecasts that AI coding cost per developer will exceed the average developer salary by 2028.** It cites vendors' lack of transparency on token billing. Source: R3(e). Measured-by: analyst forecast. Confidence: high (as quoted), low (as a forecast). Chapter: Ch 4.
5. **dotnet's revert rate is no worse than humans' (0.6% vs 0.8%).** Small n; not significant. This is the only public agent-vs-human revert comparison found. Source: R7. Chapters: Ch 17, Ch 3.
6. **Spotify's PR volume is up 76%, which turned review into the constraint.** Over 2.5M Fleet Management PRs have merged, mostly auto-merged. The 76% figure is the first Spotify primary for this, beyond the InfoQ report. Source: R9 (2026-06-03). Measured-by: self-reported. Confidence: high (as reported). Chapters: Ch 8, Ch 10.
7. **Amazon's own fix after Kiro was "mandatory peer review for production access".** This is a primary-sourced example of stepping operations autonomy back to human-gated. Source: R5 (2026-02-20). Chapters: Ch 11, Ch 17.

---

## Cases

| Case | What was done | Level (granted permissions) | Outcome metric · measured-by | Primary | Grade |
|---|---|---|---|---|---|
| Microsoft dotnet/runtime CCA | Cloud coding agent opening PRs in a large OSS repo, human review required | L2→L3 coding | 67.9% merge vs 87.1% (MS humans); 38.1%→69% after setup; 0.6% revert · self (public data) | devblogs.microsoft.com, 2026-03-23 | A− |
| Answer.AI / Devin | Month-long trial of an autonomous agent on 20 real tasks | L3 attempted | 3/20 succeeded · independent practitioners | answer.ai, 2025-01-08 | B (small n, dated tool) |
| Spotify Honk (Parts 1–4 + CwC 2026) | Background agent with deterministic verifiers, sandboxed, minimal tools | L3 maintenance | 1,500+ merged PRs (Nov 2025); 60–90% time saved; judge veto ~25%; 240 dataset-migration PRs (Apr 2026); +76% PRs (Jun 2026) · self | engineering.atspotify.com | B |
| Uber uReview | LLM reviewer on most diffs, low-value categories suppressed | L2 review | >90% coverage; 75% useful; >65% addressed vs 51% human · self | uber.com/blog/ureview, 2025-08-12 | B (volume figure inconsistent) |
| Amazon Q Java upgrades | Transformation agent for Java 8/11→17 | L2→L3 maintenance | 50 dev-days → hours; 4,500 dev-years (est.); 79% shipped unchanged; $260M/yr (est.) · self, vendor | Jassy LinkedIn 2024-08-22; AWS blog 2024-08-01 | C |
| AWS Kiro / Cost Explorer | Agent ran with an over-broad role on a production environment | Failed L3/L4 ops → L2 (peer review added) | 13 h (FT) vs "brief" (Amazon); one service, one region · disputed | aboutamazon.com 2026-02-20; FT 2026-02-19 (via Reuters/Engadget) | C (disputed) |

---

## Still unverified

- **GitLab's four AI-maturity stage names and definitions:** gated behind registration (https://about.gitlab.com/developer-survey/2024/ai/). Do not print stage names.
- **Gartner Hype Cycle placements for AI coding:**
  - Vendor and secondary pages say Gartner published a first "Hype Cycle for Agentic AI, 2026" around April 2026, with agents at the Peak of Inflated Expectations and "AI Coding Agents" as an entry. No gartner.com press release confirming this was found.
  - The 2024 Emerging Tech Hype Cycle placement of "AI-augmented software engineering" is known only from a Computerworld reprint (secondary).
  - Do not cite either.
- **McKinsey, "Unleashing developer productivity with generative AI" (June 2023):** "up to twice as fast"; under 10% gain on high-complexity tasks; juniors 7–10% slower. The PDF timed out and the HTML returned Access Denied, so these are search snippets only. URL: https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/unleashing-developer-productivity-with-generative-ai
- **McKinsey Technology Trends Outlook 2026:** "productivity fell at ~30% of firms", "coding activity +180% vs releases +30%". Secondary only (New Kerala); not checked.
- **The FT article's own wording:** paywalled. "13-hour", "delete and recreate the environment", "small but entirely foreseeable" and the "80 percent weekly use goal" are known only via Reuters and Engadget.
- **Spotify removing the LLM judge as "too rigid":** InfoQ (secondary) only. No Spotify primary repeats it.
- **The Jassy post verbatim text:** the LinkedIn page was fetched but only paraphrased by the tool. The exact sentences rely on Simon Willison's verbatim quotation, which agrees with the fetched paraphrase. The date comes from decoding the activity ID, not from a visible timestamp.
- **dotnet post, final ~15% of the page:** not read (truncated). Any conclusions or recommendations at the end are unchecked.
