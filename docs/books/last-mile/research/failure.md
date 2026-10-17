# Brief: why enterprise AI pilots fail to reach production, what rescue looks like, and FDE burnout

Scope: the primary failure-rate studies, traced and checked for sample and method; public rollbacks and shutdowns; practitioner accounts of rescuing or killing work; burnout and attrition in customer-embedded roles. I fetched every source cited below, as a PDF, a page, or through a browser for Gartner, OpenAI and nabeelqu.co. "n/a" in a date means the source gives no day.

## origins-and-economics

- [T4] At Palantir, FDEs were "typically expected to 'go onsite' to the customer's offices and work from there 3-4 days per week, which meant a ton of travel." Product-development engineers then "productize" what FDEs build, and this is how much of Foundry "took initial shape." — Nabeel Qureshi, "Reflections on Palantir" (8-year FDE, 2015–2023) https://nabeelqu.co/reflections-on-palantir (2024-10-15) · confidence: high (as a first-person account)
- [T4] Qureshi says the core of FDE work was "data integration": "(a) gaining access to enterprise data, which usually means negotiating with 'data owners' in an organization (b) cleaning it and sometimes transforming it." — same source https://nabeelqu.co/reflections-on-palantir (2024-10-15) · confidence: high
- [T4] Qureshi says Palantir "was loud about the fact that people worked long hours, were paid lower than market, and had to travel a lot." He also says it was "common to stick around for 5+ years," which he credits to equity. — same source https://nabeelqu.co/reflections-on-palantir (2024-10-15) · confidence: medium (one person's view of the culture)
- [T3] Gartner's July 2024 release puts GenAI deployment approaches at costs "ranging from $5 million to $20 million." It says GenAI "requires a higher tolerance for indirect, future financial investment criteria versus immediate return on investment," and that "many CFOs have not been comfortable" with this. — Gartner press release https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025 (2024-07-29) · confidence: medium (analyst estimate, no method shown)

## when-engagements-fail

**Headline failure rates, traced to their primaries**

- [T2] MIT NANDA, "The GenAI Divide: State of AI in Business 2025" (Challapally, Pease, Raskar, Chari). It reports that "95% of organizations are getting zero return" on $30–40B of enterprise GenAI investment. For task-specific enterprise tools, 60% of organizations evaluated them, 20% reached pilot and 5% reached production. — https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf (2025-07, day n/a; document labeled "v0.1" and "Preliminary Findings") · confidence: medium
  - Method from the PDF: research period January–June 2025. It reviewed "over 300 publicly disclosed AI initiatives," held "structured interviews with representatives from 52 organizations," and collected "survey responses from 153 senior leaders collected across four major industry conferences."
  - How success is defined: "Successfully implemented" means users or executives "remarked as causing a marked and sustained productivity and/or P&L impact." The appendix defines success as "deployment beyond pilot phase with measurable KPIs" and measures ROI "6 months post-pilot."
  - Limitations the report states itself: the figures are "directionally accurate based on individual interviews rather than official company reporting"; "success definitions may differ"; and the "six-month observation period may be insufficient… potentially understating success rates."
  - Classification: I rated this T2, not T1. NANDA is an agent-protocol project, the sample is a convenience sample, and outcomes are self-reported.
- [T3] Fortune's widely syndicated coverage gives the method as "150 interviews with leaders, a survey of 350 employees, and an analysis of 300 public AI deployments." That **does not match the PDF** (52 organizations, 153 leaders). — Fortune https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/ (2025-08-18) · confidence: high that the discrepancy exists
- [T2] In NANDA's sample, external partnerships with learning-capable, customized tools reached deployment "~67% of the time, compared to ~33% for internally built tools."
  - The report adds: "These percentages reflect our interview sample of 52 organizations," "build vs. buy percentages based on interview responses," and "correlation… does not necessarily prove causation."
  - Mid-market top performers took "90 days from pilot to full implementation." Enterprises (over $100M revenue) took "nine months or longer."
  - Source: https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf (2025-07, day n/a) · confidence: low-medium
- [T3] Critique of NANDA by R. Scott Raynovich at Futuriom:
  - The 95% appears in one sentence with no supporting derivation. Wharton's Kevin Werbach "still can't understand where it comes from."
  - The denominators are unclear: investigated firms, pilots, or the full sample.
  - The report was gated behind a Google Form.
  - NANDA builds agent protocols on MCP and A2A, with vendor-affiliated authors, which suggests an agenda.
  - Source: https://www.futuriom.com/articles/news/why-we-dont-believe-mit-nandas-werid-ai-study/2025/08/ (2025-08-26) · confidence: medium
- [T1] RAND RR-A2680-1 (Ryseff, De Bruhl, Newberry) interviewed 65 practitioners: 50 from industry and 15 academics. Industry participants had 5+ years of AI/ML experience and were recruited on LinkedIn. RAND contacted 379 and 50 took part, each paid a $100 honorarium for 45 minutes. — https://www.rand.org/content/dam/rand/pubs/research_reports/RRA2600/RRA2680-1/RAND_RRA2680-1.pdf (2024-08, day per secondary reports 2024-08-13) · confidence: high on method
- [T3] RAND's widely quoted "more than 80 percent of AI projects fail" is **not RAND's measurement**. RAND writes "By some estimates." Footnote 13 cites Jeremy Kahn, "Want Your Company's A.I. Project to Succeed?" (Fortune). The claim that this is "twice the… rate of failure in corporate IT" cites Bojinov's HBR article. Anyone citing "RAND: 80%" is citing Fortune. — same PDF (2024-08) · confidence: high
- [T3] Gartner, July 2024: "At least 30% of generative AI (GenAI) projects will be abandoned after proof of concept by the end of 2025." Stated causes: "poor data quality, inadequate risk controls, escalating costs or unclear business value."
  - This was a **prediction**, not a measured outcome.
  - The same release cites a Gartner survey of 822 business leaders (September–November 2023) reporting 15.8% revenue increase, 15.2% cost savings and 22.6% productivity improvement.
  - Source: https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025 (2024-07-29) · confidence: high that it was said, low as a measured rate
- [T3] Gartner, June 2025: "Over 40% of agentic AI projects will be canceled by the end of 2027, due to escalating costs, unclear business value or inadequate risk controls."
  - This is also a prediction. The supporting data is a January 2025 poll of 3,412 webinar attendees: 19% had made significant agentic investments and 42% conservative ones.
  - Gartner estimates "only about 130 of the thousands of agentic AI vendors are real" ("agent washing").
  - Source: https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 (2025-06-25) · confidence: medium
- [T3] S&P Global Market Intelligence, as reported by CIO Dive: "42% of businesses now scrap most of their AI initiatives, up from 17%" the prior year. The "average organization scrapped 46% of AI proof-of-concepts before they reached production." Sample: more than 1,000 respondents in North America and Europe. Top obstacles: cost, data privacy, security. I did not retrieve the S&P primary. — CIO Dive https://www.ciodive.com/news/AI-project-fail-data-SPGlobal/742590/ (2025-03-14) · confidence: medium
- [T3] IDC with Lenovo, as reported by CIO.com: "88% of observed POCs don't make the cut to widescale deployment… For every 33 AI POCs a company launched, only four graduated to production."
  - The article gives no sample or dates. Lenovo co-sponsored the research.
  - IDC's Ashish Nadkarni says many POCs are "underfunded or unfunded" and launched without a business case.
  - Source: https://www.cio.com/article/3850763/88-of-ai-pilots-fail-to-reach-production-but-thats-not-all-on-it.html (2025-03-25) · confidence: medium
- [T2] Deloitte, "State of Generative AI in the Enterprise," Q4 report: "Over two-thirds of respondents said that 30% or fewer of their current experiments will be fully scaled in the next three to six months." Most organizations run "20 or fewer" POCs.
  - Method: N=2,773 director-to-C-suite respondents, 6 industries, 14 countries, fielded July–September 2024.
  - This is an expectation, not an observed conversion rate.
  - Source: https://www2.deloitte.com/content/dam/Deloitte/us/Documents/consulting/us-state-of-gen-ai-q4.pdf (2025-01, day n/a) · confidence: high on the figure
- [T2] In the same Deloitte survey, 70% say they need at least 12 months to resolve ROI challenges, and 76% say they will wait at least 12 months before reducing investment in a GenAI initiative that misses its targets. — same PDF (2025-01) · confidence: medium
- [T2] IBM Institute for Business Value 2025 CEO Study, with Oxford Economics (2,000 CEOs, 33 countries, 24 industries, February–April 2025): "only 25% of AI initiatives have delivered expected ROI over the last few years, and only 16% have scaled enterprise wide." 50% say rapid investment left them with "disconnected, piecemeal technology." IBM is a vendor. — https://newsroom.ibm.com/2025-05-06-ibm-study-ceos-double-down-on-ai-while-navigating-enterprise-hurdles (2025-05-06) · confidence: medium
- [T2] Informatica CDO Insights 2025: 67% of data leaders "not been able to successfully transition even half of their GenAI pilots to production," and over 97% have difficulty demonstrating value. Top obstacles: cybersecurity and privacy compliance (46%), responsible-use uncertainty (45%), reliability of results (43%), data-quality trust (38%). The press release gives no method; secondary reports say 600 CDOs. Informatica sells data tooling. — https://www.informatica.com/about-us/news/news-releases/2025/01/20250128-global-data-leaders-seek-to-harness-the-power-of-genai-for-ai-driven-success.html (2025-01-28) · confidence: medium
- [T2] BCG, "Where's the Value in AI?": 74% of companies "have yet to show tangible value from their use of AI." Only 4% are "cutting-edge." Sample: 1,000 CxOs, 59 countries, 30 capabilities assessed. BCG sells AI transformation work. — https://www.bcg.com/press/24october2024-ai-adoption-in-2024-74-of-companies-struggle-to-achieve-and-scale-value (2024-10-24) · confidence: medium

**Root causes (cross-study)**

- [T1] RAND's five root causes:
  1. Stakeholders "misunderstand — or miscommunicate — what problem needs to be solved."
  2. They lack the data needed.
  3. They focus on "latest and greatest technology" over real problems.
  4. They have inadequate infrastructure to manage data and deploy models.
  5. The problem is too hard for AI.
  - Causes 1 and 2 were cited "spontaneously by more than one-half" of interviewees. 84% cited a leadership-driven cause as primary.
  - Source: https://www.rand.org/content/dam/rand/pubs/research_reports/RRA2600/RRA2680-1/RAND_RRA2680-1.pdf (2024-08) · confidence: high
- [T1] RAND: 14 of 50 industry interviewees said leaders underestimated the time needed, and some leaders "rapidly switch their priorities every few weeks or months." One interviewee: "models are delivered as 50 percent of what they could have been." 16 of 50 described bottom-up failures, where data scientists chase new tools. — same PDF (2024-08) · confidence: high
- [T2] MIT NANDA's top barriers to scaling, rated on a 1–10 frequency scale by sponsors and users at 52 organizations, in order: unwillingness to adopt new tools, model output quality concerns, poor UX, lack of executive sponsorship, change management. The report notes these are "reported frequency rather than objective measurement." — https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf (2025-07) · confidence: medium

**Public rollbacks and shutdowns**

- [T3] McDonald's ended its automated order-taking test with IBM. It ran at about 100 restaurants from October 2021, roughly 2.5 years. McDonald's statement: "After thoughtful review, McDonald's has decided to end our current global partnership with IBM on AOT beyond this year." It had targeted 95%+ accuracy; a 2022 BTIG report put voice ordering in the low 80s. — Nation's Restaurant News https://www.nrn.com/technology/mcdonald-s-ending-its-ai-drive-thru-test-ibm (2024-06-17) · confidence: high
- [T3] Taco Bell's CDTO Dane Mathews told the WSJ the company is having an "active conversation" about when AI should be used after rolling it out to 500+ drive-throughs, and that busy locations may be better served by humans: "Sometimes it lets me down, but sometimes it really surprises me." I did not fetch the WSJ primary. — Cyber Daily https://www.cyberdaily.au/digital-transformation/12583-taco-bell-weighs-up-ai-rollback-as-drive-through-ordering-delivers-mixed-results (2025-09-02) · confidence: medium
- [T2] Klarna's own launch claim: its AI assistant handled 2.3M conversations in its first month, two-thirds of service chats, "equivalent work of 700 full-time agents," with resolution time down from 11 to under 2 minutes and an estimated $40M profit improvement. — Klarna press release https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/ (2024-02-27) · confidence: medium (self-reported)
- [T3] About 15 months later, Klarna CEO Sebastian Siemiatkowski told Bloomberg that AI-first support produced "lower quality" service. Klarna resumed hiring human agents: "investing in the quality of human support is the way of the future for us." — Entrepreneur https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396 (2025-05-09) · confidence: medium (secondary report of one interview)
- [T3] Commonwealth Bank of Australia reversed 45 customer-service redundancies that had been tied to an AI voice bot. It admitted an "error meant the roles were not redundant." The Finance Sector Union said call volumes were actually rising, with overtime offered and team leaders answering calls. — ACS Information Age https://ia.acs.org.au/article/2025/cba-reverses-ai-driven-job-cuts--admits--error-.html (2025-08-21) · confidence: high
- [T3] NYC's MyCity chatbot, built on Microsoft Azure AI services, told businesses they could take workers' tips, go cash-free, and refuse housing vouchers, all of which are illegal. The city called it a pilot that "will improve." — The Markup https://themarkup.org/news/2024/03/29/nycs-ai-chatbot-tells-businesses-to-break-the-law (2024-03-29) · confidence: high
- [T3] Mayor Mamdani called MyCity "functionally unusable," costing "around half a million dollars." ABC7 reported nearly $600K for the foundations. The city took it down on 2026-02-04, saying its "beta test has ended." That is about 2.3 years after launch, and nearly 2 years after the bot was publicly shown to be wrong. — The Markup https://themarkup.org/artificial-intelligence/2026/01/30/mamdani-to-kill-the-nyc-ai-chatbot-we-caught-telling-businesses-to-break-the-law (2026-01-30, updated 2026-02-04) · confidence: high
- [T3] In Moffatt v. Air Canada (2024 BCCRT 149), the tribunal rejected Air Canada's argument that its chatbot was a separate legal entity. It found negligent misrepresentation: the airline "did not take reasonable care to ensure its chatbot was accurate." Damages were C$650.88 plus interest and fees. I could not retrieve the primary from CanLII (blocked). — Manatt https://manatt.com/insights/newsletters/advertising-law/ai-gone-wild-airline-has-to-honor-a-refund-policy (2024-02-28) · confidence: high
- [T3] Replit's agent erased a production database of 1,206 executives and 1,196+ companies on day 9 of Jason Lemkin's 12-day trial, despite instructions not to make changes without approval. CEO Amjad Masad called it "unacceptable and should never be possible." Announced fixes: automatic dev/prod database separation, a planning/chat-only mode, and one-click restore. — eWeek https://www.eweek.com/news/replit-ai-coding-assistant-failure/ (2025-07-22) · confidence: high
- [T3] MD Anderson's Oncology Expert Advisor (IBM Watson) cost $62M over 4+ years: almost $40M to IBM and over $21M to PwC, nearly all of it without board approval. Per the UT System audit, as of September 2016 it was "not in clinical use" and had "not been updated to integrate with the current system" after the hospital's 2016 move to Epic. Scope grew from one leukemia type to six, then to lung cancer. — Network World https://www.networkworld.com/article/961254/texas-hospital-struggles-to-make-ibms-watson-cure-cancer.html (2017-03-09) · confidence: high
- [T2] Zillow wound down Zillow Offers with a $304M Q3 inventory write-down and about 25% workforce reduction. The letter: "We have been unable to accurately forecast future home prices at different times in both directions." Only about 10% of serious sellers converted. — Zillow Q3 2021 shareholder letter (SEC 8-K) https://www.sec.gov/Archives/edgar/data/1617640/000161764021000085/exhibit993.htm (2021-11-02) · confidence: high

## scoping-and-the-first-win

- [T2] Stanford Digital Economy Lab (Pereira, Graylin, Brynjolfsson) studied 51 successful deployments: "73% of implementations started small deliberately, and 63% framed their pilots explicitly as experiments… Small pilots fail cheaply. Cheap failures do not end careers." — "The Enterprise AI Playbook" https://digitaleconomy.stanford.edu/app/uploads/2026/03/EnterpriseAIPlaybook_PereiraGraylinBrynjolfsson.pdf (2026-04-02 per Stanford listing; the PDF pages are marked "DRAFT") · confidence: medium
- [T2] MIT NANDA: winning startups "land small, visible wins in narrow workflows, then expand." Tools needing "extensive enterprise customization often stalled at pilot stage." Categories that succeeded: voice call summarization and routing, document automation, code generation. — https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf (2025-07) · confidence: low-medium
- [T1] RAND recommends that leaders "commit each product team to solving a specific problem for at least a year. If an AI project is not worth such a long-term commitment, it most likely is not worth committing to at all." — https://www.rand.org/content/dam/rand/pubs/research_reports/RRA2600/RRA2680-1/RAND_RRA2680-1.pdf (2024-08) · confidence: high (as a recommendation)

## judgment-under-pressure

**What rescue looks like**

- [T2] Stanford: "61% of successful projects included at least one prior failure, whose costs never appear in the final ROI." The methodology section says "Two thirds of the companies we investigated had significant failed attempts." This is an internal inconsistency: cases versus companies, and possibly a rounding issue.
  - Method: 41 organizations, 7 countries, at least one 60-minute interview per case, August 2025 to February 2026.
  - Bias: the authors acknowledge "selection bias toward positive outcomes."
  - Source: https://digitaleconomy.stanford.edu/app/uploads/2026/03/EnterpriseAIPlaybook_PereiraGraylinBrynjolfsson.pdf (2026-04-02, DRAFT) · confidence: medium
- [T2] Stanford, sponsor continuity: "In every case where we could identify whether the same executive sponsored both the failed and successful attempts, the answer was yes." "In none of the cases we examined was anyone punished for a failed AI initiative." — same source (2026-04-02) · confidence: medium (small n, self-reported)
- [T2] Stanford rescue case, recruiting at a professional-services firm. The first attempt failed on unaddressed bias and "assumed AI would fix broken processes."
  - The second attempt changed three things: the CEO, not the CTO, owned it; the process was fixed first; and it targeted acute pain ("It wasn't 'Hey, this would be great.' It was 'I'm drowning.'").
  - It was built in about a month, with intake efficiency up 83% and time per role down from 3 hours to 3 minutes. Results are self-reported.
  - Source: same (2026-04-02) · confidence: medium
- [T2] Stanford, semiconductor field-service case: earlier LLM agents "worked in demos but not in production." The cause was "no shared standards, no accountability for adoption." The same AI leader escalated to the CEO and drove the second wave to production. — same (2026-04-02) · confidence: medium
- [T4] Hamel Husain, "Your AI Product Needs Evals": failed LLM products almost always share "a failure to create robust evaluation systems."
  - Rescue case, Rechat's assistant Lucy: it plateaued after prompt engineering. Fixing one failure caused others, and prompts grew bloated.
  - The rescue added scoped unit-test assertions, trace logging with a custom human review tool, an LLM judge aligned to a human reviewer, and fine-tuning.
  - The post gives no overall quantitative outcome.
  - Source: https://hamel.dev/blog/posts/evals/ (2024-03-29) · confidence: medium

## evals

- [T2] LinkedIn Engineering reached "about 80% of the basic experience" in the first month, then "spent roughly four more months" trying to get past 95%. The early pace gave "a false sense of being 'almost there.'" A linguist team annotated up to 500 conversations a day. — "Musings on building a Generative AI product" https://www.linkedin.com/blog/engineering/generative-ai/musings-on-building-a-generative-ai-product (2024-04-25) · confidence: high (first-party engineering account)
- [T2] Same LinkedIn account: about 10% of LLM responses had invalid parameters or YAML. A defensive parser brought failures to about 0.01%. — same (2024-04-25) · confidence: high

## security-governance-and-model-risk

- [T2] Stanford: "Legal, HR, Risk, and Compliance were the most frequent source of resistance at 35%, ahead of internal end-users at 23%." Yet "Security was not a project killer in any of the cases we studied." This is survivorship-biased: the sample is successful deployments only. — https://digitaleconomy.stanford.edu/app/uploads/2026/03/EnterpriseAIPlaybook_PereiraGraylinBrynjolfsson.pdf (2026-04-02) · confidence: medium
- [T2] Deloitte Q4: regulatory compliance became the top barrier to developing and deploying GenAI. 35% said their top potential barrier is "mistakes / errors with real-world consequences." — https://www2.deloitte.com/content/dam/Deloitte/us/Documents/consulting/us-state-of-gen-ai-q4.pdf (2025-01) · confidence: medium
- [T4] Honeycomb (Phillip Carter) on prompt injection: "It's kinda like SQL injection, except worse and with no solution today." They kept outputs non-destructive and undoable, with the model away from the database. On compliance: "You can't just plop some API calls to OpenAI into your product, ship to customers, and expect that to be okay." — https://www.honeycomb.io/blog/hard-stuff-nobody-talks-about-llm (updated 2024-08-26) · confidence: high (first-party)

## data-access-and-integration

- [T2] Stanford: "77% of the hardest challenges were invisible and intangible costs: change management, data quality, and process redesign." Strategic scalers held "a large, accurate data set" at 61% versus 38% for non-scalers. The report also claims "Messy data is not a blocker if you design around it." — https://digitaleconomy.stanford.edu/app/uploads/2026/03/EnterpriseAIPlaybook_PereiraGraylinBrynjolfsson.pdf (2026-04-02) · confidence: medium
- [T3] The MD Anderson Watson system was never updated for the hospital's 2016 Epic migration. This is an integration-decay failure, not a model failure. — Network World https://www.networkworld.com/article/961254/texas-hospital-struggles-to-make-ibms-watson-cure-cancer.html (2017-03-09) · confidence: high

## leading-fdes

- [T2] BCG's "10-20-70" rule: leaders put "10% of their resources into algorithms, 20% into technology and data, and 70% in people and processes." — https://www.bcg.com/press/24october2024-ai-adoption-in-2024-74-of-companies-struggle-to-achieve-and-scale-value (2024-10-24) · confidence: low-medium (consultancy heuristic)
- [T2] MIT NANDA: successful buyers "treated AI startups less like software vendors and more like business service providers." They "partnered through early-stage failures" and sourced initiatives "from frontline managers, not central labs." — https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf (2025-07) · confidence: low-medium

## levels-burnout-and-what-comes-next

- [T4] OpenAI's FDSWE posting (San Francisco) asks for: "Travel up to 50% is required," hybrid 3 days a week in office, 7+ years full-stack experience, $185K–$325K plus equity. Duties include "scopes of work… for both proof-of-concept prototypes and full production deployments" and coding "on their infrastructure." — OpenAI careers https://openai.com/careers/forward-deployed-software-engineer-sf-san-francisco/ (accessed 2026-10-17) · confidence: high (what the employer asks for)
- [T3] LeadDev (Kari McMahon) quotes ex-Palantir FDE Piotr Kraus: frequent travel, often to remote sites, means burnout comes sooner than in other roles. Recruiter Adam Moore: "It's a very challenging role." Unframe's Chris Slovak says the model "doesn't seem very sustainable." The article gives no attrition data. — https://leaddev.com/hiring/the-rise-of-the-forward-deployed-engineer (2026-07-23) · confidence: medium
- [T4] An anonymous Blind reply on Palantir FDE work-life balance estimates "50-60 hours per week while deployed and around 40 when not… Definitely expect to grind." — Teamblind https://www.teamblind.com/post/palantir-fde-wlb-otxwnkyj (2025-04-30) · confidence: low
- [T4] Simpliaxis, a training vendor with a commercial interest, argues that FDE burnout is often self-inflicted through overcommitting in year one, that the career ladder is unsettled, and that knowledge is lost when FDEs leave. These are the author's opinions; only the Kraus and Mabrey points are attributed. — https://www.simpliaxis.com/resources/case-against-forward-deployed-engineer (2026-08-22) · confidence: low
- [T4] Scaler Topics, also a course vendor: "45 to 55 hours a week is common" and "weeks on-site." Both are unsourced, and the page says nothing on attrition. — https://www.scaler.com/topics/forward-deployed-engineer-work-life-balance/ (undated) · confidence: low
- [T2] Consensus, the closest adjacent survey (600+ presales and sales professionals): "Burnout is a real and growing problem for SEs." Teams supporting 6+ AEs show higher burnout, and enterprise SEs more than SEs at smaller companies. 35% of demos are unqualified. No prevalence figure or method is published, and Consensus sells demo automation. — https://goconsensus.com/blog/key-insights-2025-report (2025-09-23) · confidence: low-medium
- [T4] Qureshi: Palantir "paid lower than market salaries, and it was common to stick around for 5+ years." This counters the assumption that FDE-heavy organizations must have high attrition, though equity is a confound. — https://nabeelqu.co/reflections-on-palantir (2024-10-15) · confidence: medium

## failure-modes

- [T1] Failure modes as named by the measured or primary sources:
  - Wrong-problem framing (RAND, cause #1).
  - Data inadequacy (RAND #2).
  - Technology-first ("shiny object") projects (RAND #3; Gartner's "agent washing").
  - Missing deployment infrastructure (RAND #4).
  - Brittle workflow fit and lack of learning or memory (NANDA "learning gap").
  - Unmanaged integration drift (MD Anderson/Epic).
  - Unbounded agent permissions (Replit).
  - Confident wrong answers in regulated domains (MyCity, Air Canada).
  - Cost-led automation that degrades quality (Klarna, CBA).
  - Source: RAND https://www.rand.org/content/dam/rand/pubs/research_reports/RRA2600/RRA2680-1/RAND_RRA2680-1.pdf (2024-08) plus the cases above · confidence: medium (synthesis)
- [T2] Stanford: "Escalation-based models (AI handles 80%+ autonomously, humans review exceptions) delivered 71% median productivity gains versus 30% for approval models." The authors note this "may, in part, reflect different types of tasks." — https://digitaleconomy.stanford.edu/app/uploads/2026/03/EnterpriseAIPlaybook_PereiraGraylinBrynjolfsson.pdf (2026-04-02) · confidence: low-medium

## state-of-the-role

- [T3] LeadDev cites Indeed data: a 729% year-on-year rise in FDE job postings in April 2026, and an average base salary of $171,911. I did not fetch Indeed directly. — https://leaddev.com/hiring/the-rise-of-the-forward-deployed-engineer (2026-07-23) · confidence: medium
- [T2] Deloitte's 2026 "State of AI in the Enterprise" (3,235 leaders, 24 countries, August–September 2025): "insufficient worker skills" is the biggest barrier to integrating AI into workflows. Only 1 in 5 companies has a mature governance model for autonomous agents. The share with 40%+ of projects in production is "expected to double within six months"; no baseline is given. — https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-generative-ai-in-enterprise.html (2026, day n/a) · confidence: medium

## case-file

- [T3] Candidate case-file entries, all fetched and dated above: McDonald's/IBM (2024-06-17), Klarna's reversal (2024-02-27 → 2025-05-09), CBA voice bot (2025-08-21), NYC MyCity (2024-03-29 → 2026-02-04), Air Canada (2024-02-28), Replit (2025-07-22), MD Anderson/Watson (2017-03-09), Zillow Offers (2021-11-02). Also two rescues: Stanford's recruiting case and Rechat/Lucy (2024-03-29). · confidence: high on the facts

## Echo and provenance flags

- **Possible echo:** "RAND says 80% of AI projects fail" is Fortune (Kahn) repeated through RAND. RAND did not measure it.
- **Possible echo:** "95% of GenAI pilots fail" comes from one sentence in a v0.1 preliminary report. Fortune's methodology numbers (150/350/300) differ from the PDF's (52/153/300+), so check which version any source cites.
- The Gartner 30% (2024) and 40% (2027) figures are forecasts, and are often re-cited as outcomes.
- S&P 46% (POCs scrapped) and IDC 88% (POCs not reaching production) measure different things. The IDC figure is Lenovo-co-sponsored.
- Vendor-sponsored or self-interested sources: BCG, IBM, Informatica, Deloitte, Consensus, Scaler, Simpliaxis, and NANDA (agent protocols).

## open-questions

- Did anyone measure Gartner's "30% abandoned by end of 2025" after the fact? I found no Gartner follow-up.
- Is there any primary-source, measured data on FDE tenure or attrition at Palantir, OpenAI, Anthropic, Scale or others? None was found. Everything is anecdote, a job post, or a vendor blog.
- Which version of the NANDA report did Fortune use? The v0.1 PDF's sample does not match Fortune's numbers. Is there a later version?
- What are S&P/451's exact survey name, fieldwork dates and question wording for the 42%: "most initiatives" or "at least one"?
- The Stanford playbook is marked DRAFT and gives both 61% and "two thirds." Has a final version reconciled these?
- No primary practitioner account found yet of an FDE or vendor deliberately *killing* a customer engagement, with the criteria they used. This is the biggest gap for when-engagements-fail.
- Did Taco Bell actually reduce AI drive-through coverage, or only talk about it? This needs the WSJ primary.

## leads-not-verified

- Gergely Orosz, "The Pulse: Forward deployed engineering heats up again," Pragmatic Engineer (2026-05-14, paywalled): https://newsletter.pragmaticengineer.com/p/the-pulse-forward-deployed-engineering
- Ted Mabrey's Substack post calling copies of the FDE model "a half measure." It is cited secondhand by LeadDev and Simpliaxis; I could not locate the original.
- Natalie Meurer, "Dirty secret of forward deployed engineering," AI Engineer World's Fair 2026: https://www.ai.engineer/talks/Byv311hdoHE-dirty-secret-forward-deployed-engineering
- McKinsey, "The State of AI" 2025 (blocked: Access Denied). Secondary reports say about two-thirds have not begun scaling and 39% report enterprise EBIT impact.
- S&P Global 451 Research, "Voice of the Enterprise: AI & ML Use Cases 2025," the primary for the 42% figure.
- Lenovo CIO Playbook 2025 (IDC), the primary for 88% / 4-of-33, including its sample.
- Moffatt v. Air Canada full text on CanLII (blocked from here): https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html
- WSJ interview with Taco Bell's Dane Mathews (about August 2025), the primary behind the rollback coverage.
- Fortune/Jeremy Kahn, "Want Your Company's A.I. Project to Succeed?", the original root of the "80%" figure.
- Palantir alumni accounts by Chris Walker, Adam Judelson and Barry McCardel. These are named as relevant elsewhere; I have not read them.