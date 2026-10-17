## case-file

**C1. Morgan Stanley Wealth Management with OpenAI (FDE-led, 2023)**
- [T2] Customer and problem: Morgan Stanley wanted its wealth-management research in front of every financial advisor, and advisors had to trust it. OpenAI's FDE head Colin Jarvis calls it OpenAI's "first enterprise customer to deploy with GPT-4" — Altimeter Capital, "Colin Jarvis | Head of Forward Deployed Engineering at OpenAI: Trust. Product. Impact." https://www.youtube.com/watch?v=cBD7_R-Cizg (2025-11-26) · confidence: high
- [T2] What the FDE team did: "we embedded with Morgan Stanley… did a bunch of like retrieval tuning… ran a bunch of pilots getting the wealth advisers to… label data" — same video (2025-11-26) · confidence: high
- [T2] Timeline (vendor account): the "main technical hurdle was probably solved within like 6 to 8 weeks," then "a further like 4 months of… doing pilots collecting evals and iterating" before advisors trusted it — same video (2025-11-26) · confidence: high
- [T2] Timeline (customer account): Morgan Stanley announced OpenAI as its "only wealth management strategic partner in March 2023" and "fully rolled out the AI @ Morgan Stanley Assistant in September 2023." That is roughly six months, which fits Jarvis's 6–8 weeks plus 4 months — Morgan Stanley, "Morgan Stanley Wealth Management Announces Latest Game-Changing Addition to Suite of GenAI Tools" https://www.morganstanley.com/press-releases/ai-at-morgan-stanley-debrief-launch (2024-06-26) · confidence: high
- [T2] Outcome: "98% of Financial Advisor teams have adopted the Assistant." The customer measured this itself, and nobody has audited it — same press release (2024-06-26) · confidence: high
- [T2] Outcome (vendor page): document access rose "from 20% to 80%," and coverage went from "7,000 questions" to "any question from a corpus of 100,000 documents" (David Wu, Morgan Stanley). Jarvis separately cites "a 3x increase in… usage of their research reports." The page does not say how either figure was measured. The 98% figure on OpenAI's page repeats the customer's own number (possible echo) — OpenAI, "Morgan Stanley uses AI evals to shape the future of financial services" https://openai.com/index/morgan-stanley/ (undated; accessed 2026-10-17) · confidence: medium
- [T4] Outcome (advisor anecdote): Debrief is "saving me about half an hour per meeting" (a named advisor quoted in Morgan Stanley's own release) — Morgan Stanley press release (2024-06-26) · confidence: medium

**C2. European semiconductor company with OpenAI (FDE-led, unnamed)**
- [T2] What the FDE team did: they "embedded on site, spent like a couple of weeks just like understanding their business," then picked verification, where engineers spend "70 80% of their time… fixing bugs." They forked Codex, added telemetry, and built a "debug investigation and triage agent." It started by writing tickets and moved on to opening PRs once engineers trusted it — Altimeter / Jarvis video (2025-11-26) · confidence: medium
- [T2] Outcome: "10 different… use cases," with a 50% efficiency-saving target and "about 20 to 30% for the first couple divisions." The customer is unnamed, OpenAI reports the figure itself, and no method is given — same video (2025-11-26) · confidence: low

**C3. APAC automotive manufacturer with OpenAI (FDE-led, unnamed)**
- [T4] What the FDE team did: built a supply-chain data layer and simulator that could run tariff scenarios. Jarvis showed only "a kind of a toy version" and gave no outcome metric — Altimeter / Jarvis video (2025-11-26) · confidence: medium

**C4. Japanese enterprise code modernization with OpenAI (FDE-led, unnamed)**
- [T3] What the FDE team did: COBOL-to-Java migration. FDEs met the payments team, wrote tests, wrote migration code and built a UI to track progress. They told research the model "struggles with these types of COBOL-to-Java tasks. We need more training data." No outcome metric — Gregor Ojstersek, "Inside OpenAI's Forward Deployed Engineer Role" https://newsletter.eng-leadership.com/p/inside-openais-forward-deployed-engineer (2026-08-15) · confidence: medium

**C5. Klarna customer-service assistant with OpenAI (success claim, later partial reversal)**
- [T2] FDE involvement: Jarvis says "I worked with them for a while… the first thing we shipped with them was this customer service application." The team parameterized instructions and tools and wrapped "each… intent with a set of evals" so the assistant could scale "from like say 20 policies all the way up to 400" — Altimeter / Jarvis video (2025-11-26) · confidence: high
- [T2] Outcome claimed in month one: "2.3 million conversations, two-thirds of… customer service chats"; "equivalent work of 700 full-time agents"; "25% drop in repeat inquiries"; resolution in "less than 2 mins compared to 11 mins"; "$40 million USD in profit improvement" (an estimate). The source is Klarna's own numbers on OpenAI's page — OpenAI, "Klarna's AI assistant does the work of 700 full-time agents" https://openai.com/index/klarna/ (undated, about Feb 2024; accessed 2026-10-17) · confidence: medium
- [T4] Independent probe: Gergely Orosz spent about 15 minutes trying and failed to make the bot hallucinate. He argued it mainly automates L1 support, which "isn't new." He sanity-checked the claim arithmetically: 700 agents across three shifts is about 2,100 roles, which he says matches the roughly $60M support cost — The Pragmatic Engineer, "Klarna's AI chatbot: how revolutionary is it, really?" https://blog.pragmaticengineer.com/klarnas-ai-chatbot/ (2024-02-29; republished 2024-08-08) · confidence: medium

**C6. T-Mobile customer service with OpenAI (FDE-led)**
- [T2] What the FDE team did: an engagement "maybe 10x more complex [than Klarna] in terms of… volume and the number of policies." The Klarna-derived framework "worked like pretty well there with a few… extensions." No outcome metric — Altimeter / Jarvis video (2025-11-26) · confidence: medium

**C7. Tampa General Hospital with Palantir (embedded Palantir engineers)**
- [T2] Customer, problem and what was done: the partnership began in 2021 with Foundry and grew "from one to more than a dozen use cases." Bed placement, patient itineraries and staffing went onto AIP. "Palantir's engineers will keep working closely with TGH's operations, analytics, and clinical subject matter experts" — Tampa General Hospital, "TGH selects Palantir AI software for connected care coordination" https://tgh.org/news/tgh-press-releases/2024/june/tgh-selects-palantir-ai-software-connected-care-coordination (2024-06-05) · confidence: high
- [T2] Outcome: patient placement time down 83%, PACU holds down 28%, and "mean length of stay for sepsis patients" down 30%. The hospital reports these itself and gives no method or time period — same release (2024-06-05) · confidence: medium
- [T2] The Joint Commission gave TGH its inaugural 2025 Healthcare Innovation Award, and the release repeats the same three figures. It does not say the Joint Commission verified them, so the award is not independent measurement — TGH, "Tampa General Hospital Honored with Healthcare Innovation Award by Joint Commission" https://www.tgh.org/news/tgh-press-releases/2025/september/tampa-general-hospital-honored-healthcare-innovation-award-by-joint-commission (2025-09-24) · confidence: high
- [T2] Scope inflation in the vendor's retelling: Palantir's CRO said Palantir helped TGH "reduce patient length of stay by 30%." The customer's figure applies to sepsis patients only. This is a possible echo of the customer's number, with its scope widened — The Motley Fool, "Palantir Technologies (PLTR) Q2 2024 Earnings Call Transcript" https://www.fool.com/earnings/call-transcripts/2024/08/05/palantir-technologies-pltr-q2-2024-earnings-call-t/ (2024-08-05) · confidence: high

**C8. Palantir AIP bootcamps (mostly unnamed customers)**
- [T2] Format claim: bootcamps "deliver real workflows on actual customer data in five days or less versus our traditional pilots, which generally take one to three months" (Ryan Taylor). Palantir was "on track to conduct boot camps for more than 140 organizations by the end of November" 2023 — The Motley Fool, "Palantir Technologies (PLTR) Q3 2023 Earnings Call Transcript" https://www.fool.com/earnings/call-transcripts/2023/11/02/palantir-technologies-pltr-q3-2023-earnings-call-t/ (2023-11-02) · confidence: high
- [T4] Attendee testimonials, all unnamed: "we basically built 10x faster with 3x less resources" — same transcript (2023-11-02) · confidence: low
- [T2] Bootcamp participation reached "over 915 organizations." A utility "signed a seven-figure deal just five days after completing the bootcamp." These are sales-cycle numbers, not delivery outcomes — The Motley Fool, "Palantir Technologies (PLTR) Q1 2024 Earnings Call Transcript" https://www.fool.com/earnings/call-transcripts/2024/05/06/palantir-technologies-pltr-q1-2024-earnings-call-t/ (2024-05-06) · confidence: high
- [T2] Unnamed customers: a wholesale insurance brokerage reached a seven-figure production deal "just 16 days after the Bootcamp," and a convenience-store chain went from prototype to paid pilot in 25 days — Q2 2024 transcript (2024-08-05) · confidence: medium

**C9. General Mills and Lowe's with Palantir**
- [T2] General Mills: "We're saving on average about $14 million annually, and it's really only deployed to part of our network." A General Mills senior director said this and Palantir's CRO relayed it on an earnings call. The transcript does not say the work came from a bootcamp — Q1 2024 transcript (2024-05-06) · confidence: medium
- [T2] Lowe's: "75% reduction in overdue tasks." Palantir reports this itself, with no baseline or period — Q1 2024 transcript (2024-05-06) · confidence: low

**C10. Airbus A350 ramp with Palantir (FDE memoir)**
- [T4] What the FDE did: Qureshi "moved out to Toulouse for a year and worked in the factory alongside the manufacturing people four days a week." He says the software helped "drive the A350 manufacturing surge and successfully 4x'ing the pace of manufacturing." The 4x is attributed loosely and comes from a former employee — Nabeel S. Qureshi, "Reflections on Palantir" https://nabeelqu.co/reflections-on-palantir (2024-10-15) · confidence: medium

**C11. WeightWatchers with Sierra**
- [T2] Problem: policy changes "took about 30 days to reach the contact center." What was done: an agent grounded in the knowledge base and connected to key systems, trialed in the app on a small share of traffic (about 100 concurrent inquiries), then stress-tested with adversarial requests. Outcome: "nearly 70%" containment in the first week and CSAT above 4.5/5 (4.6 in the header). The page does not say who measured these. It does not name Sierra's deployment staff — Sierra, "WeightWatchers" https://sierra.ai/customers/weightwatchers (undated; accessed 2026-10-17) · confidence: medium

**C12. SiriusXM with Sierra**
- [T4] Customer and problem: a rule-based bot hit dead-ends. Sierra built "Harmony" for radio refresh, payments and billing. No metrics and no timeline beyond "worked quickly" — Sierra, "SiriusXM" https://sierra.ai/customers/siriusxm (undated; accessed 2026-10-17) · confidence: high (that no metrics are published)

**C13. Lyft with Anthropic**
- [T2] Problem: 2023 support waits of "30 to 40 minutes," with agents handling three or four chats at once. Outcome: "resolution time reduced by over 87%," "decision-making accuracy improved by over 30%," and "millions" saved. The page names no Anthropic staff and gives no method — Claude, "Lyft" https://claude.com/customers/lyft (undated; accessed 2026-10-17) · confidence: medium
- [T3] TechCrunch reports "resolved" means the customer answered yes to "Did we resolve your issue?" Anthropic "will train and educate Lyft's engineers." The integration ran through Amazon Bedrock in late 2024. The 87% figure is Lyft's own (possible echo) — TechCrunch, "Lyft's new AI customer assistant is powered by Anthropic's Claude" https://techcrunch.com/2025/02/06/lyfts-new-ai-customer-assistant-is-powered-by-anthropics-claude (2025-02-06) · confidence: high

**C14. Novo Nordisk with Anthropic**
- [T2] What was built: NovoScribe, built with Claude Code and running on Bedrock and MongoDB Atlas, generates clinical study reports. Anthropic's role is limited to "conversations… that guided how Novo Nordisk could use Claude securely." Outcome: "10+ weeks to 10 minutes," which is not attributed, and "cut writing times on CSRs by 90%," attributed to Waheed Jowiya. The development team was 11 people — Claude, "Novo Nordisk" https://claude.com/customers/novo-nordisk (undated; accessed 2026-10-17) · confidence: medium

**C15. XVIII Airborne Corps with Scale AI (Donovan)**
- [T4] What was announced: an LLM on a classified network ingesting "more than 100,000 pages of live data." The release claims Donovan "can" cut the air tasking order cycle from three days to hours, which is a projection. No measured outcome was published — Intelligence Community News, "Scale AI deploying first LLM on a government classified network" https://intelligencecommunitynews.com/scale-ai-deploying-first-llm-on-a-government-classified-network/ (2023-05-11) · confidence: medium

**C16. INDOPACOM/EUCOM Thunderforge with Scale AI, Anduril and Microsoft**
- [T3] A DIU prototype contract with no published value. The embedded people named are DIU personnel at INDOPACOM and EUCOM, not Scale engineers. No outcomes yet — DefenseScoop, "DIU taps Scale AI for Thunderforge…" https://defensescoop.com/2025/03/05/diu-thunderforge-scale-ai-combatant-commands-indopacom-eucom/ (2025-03-05) · confidence: high

## when-engagements-fail

**F1. Klarna: partial reversal after the AI-first push (OpenAI FDE-built, see C5)**
- [T3] In a Bloomberg interview, CEO Siemiatkowski said AI chatbots were cheaper but gave "lower quality" output and that "investing in the quality of human support is the way of the future for us." Klarna began hiring remote human agents. The article puts the earlier figures at 75% of chats and 2.3M conversations, which differs from the "two-thirds" in C5 (possible echo with drift) — Entrepreneur, "Klarna Is Hiring Customer Service Agents After AI Couldn't Cut It on Calls…" https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396 (2025-05-09) · confidence: medium
- [T3] Context: headcount fell 22% to 3,500 during a hiring freeze of more than 12 months, mostly through attrition — same article (2025-05-09) · confidence: medium

**F2. McDonald's automated order taker with IBM (co-developed, ended)**
- [T3] About 100 restaurants over roughly two and a half years, starting with the October 2021 partnership. A 2022 BTIG report put accuracy "in the low 80% range" against a 95%+ target. McDonald's ended the AOT partnership "beyond this year" (2024). Restaurant Business broke the news from an internal franchisee email — Nation's Restaurant News, "McDonald's is ending its AI drive-thru test with IBM" https://www.nrn.com/quick-service/mcdonald-s-is-ending-its-ai-drive-thru-test-with-ibm (2024-06-17) · confidence: high

**F3. MD Anderson Oncology Expert Advisor with IBM Watson (paused after audit)**
- [T3] A University of Texas audit found $62M spent. Payments to IBM were reportedly kept just under the board-approval threshold, and the focus shifted from leukemia to lung cancer. A change of EHR made Watson incompatible, and the training data was outdated. The audit "did not judge Watson's abilities." IBM cited the audit's 90% accuracy figure for lung-cancer decision support. The audit was independent, but this is secondary reporting of it — Engadget, "Watson-based cancer project paused after running aground" https://www.engadget.com/2017-02-20-watson-cancer-research-runs-into-trouble.html (2017-02-20) · confidence: medium

**F4. Commonwealth Bank of Australia voice bot (vendor not named; job cuts reversed)**
- [T3] In July 2025 CBA cut 45 roles because of an AI "voice bot," then reversed the cuts. The bank said its assessment "did not adequately consider all relevant business considerations" and apologized. The union said call volumes were rising and team leaders were answering calls. CBA confirmed the reversal to Information Age. No vendor or FDE is named — Information Age (ACS), "CBA reverses AI-driven job cuts, admits 'error'" https://ia.acs.org.au/article/2025/cba-reverses-ai-driven-job-cuts--admits--error-.html (2025-08-21) · confidence: high

**F5. NYC MyCity chatbot, built on Microsoft Azure by outside contractors (shut down)**
- [T1] The Markup, Documented and THE CITY tested the bot themselves. It said landlords could refuse Section 8 vouchers, did not know the minimum wage, and said businesses could refuse cash. The new mayor called it "functionally unusable" and said it cost about $500k. The foundations cost nearly $600k. It was taken down on 2026-02-04 ("beta test has ended"). How much vendor engineering went into it is not documented — The Markup, "Mamdani to kill the NYC AI chatbot we caught telling businesses to break the law" https://themarkup.org/artificial-intelligence/2026/01/30/mamdani-to-kill-the-nyc-ai-chatbot-we-caught-telling-businesses-to-break-the-law (2026-01-30, updated 2026-02-04) · confidence: high

**F6. NHS Federated Data Platform with Palantir (contested, slow adoption)**
- [T3] The contract is £330M over seven years, awarded November 2023. Per NHS figures, fewer than a quarter of hospital trusts (45) were actively using it by the end of 2024. Leeds Teaching Hospitals said adopting some FDP products meant losing functionality, according to a letter obtained through FOI by Corporate Watch. KPMG was paid £8.8M to promote adoption — The Register, "Some English hospitals doubt Palantir's utility…" https://www.theregister.com/2025/05/16/nhs_hospitals_palantir/ (2025-05-16) · confidence: high

## evals

- [T2] At Morgan Stanley, summarization evals were graded by advisors and prompt engineers, followed by translation evals, a daily regression suite of sample questions, and Debrief eval sets covering different meeting types. Customer staff described it as: "we'd sit with OpenAI and say, 'What can we change about our retrieval methods…'" — OpenAI Morgan Stanley page (undated; accessed 2026-10-17) · confidence: medium
- [T2] OpenAI FDE doctrine: "a bit of LLM written code is like not done until you have a set of evals that verify the efficacy." The first step is "making like a set of five with the experts from the customer." Feasibility check in the Playground: "with an N of 10… if it's like seven or eight times then like maybe this is going to work in production" — Altimeter / Jarvis video (2025-11-26) · confidence: high
- [T2] Klarna pattern: each customer-service intent was wrapped with an eval set so the system could scale to 400+ policies — same video (2025-11-26) · confidence: high

## feeding-the-product

- [T2] The Klarna work became Swarm, which was open-sourced. T-Mobile extended it, and it then led to the OpenAI Agents SDK and AgentKit: "that all sort of came… from that… solution architect engagement but very much an FDE style of delivery" — Altimeter / Jarvis video (2025-11-26) · confidence: high
- [T2] Reuse target: the first customer yields about 20% reusable work, and two or three more get it to about 50% — same video (2025-11-26) · confidence: high
- [T3] Field feedback to research: "The model struggles with these types of COBOL-to-Java tasks. We need more training data" — Ojstersek newsletter (2026-08-15) · confidence: medium
- [T4] Salesforce VP of FDE Usman Nasir: "I've seen where features have been moved up six months because of the urgency of what we're seeing in the field" — Salesforce, "Back to Build: Why Agentforce Inspired 3 FDEs to Return to Salesforce" https://www.salesforce.com/blog/?p=131030 (2025-11-15) · confidence: medium
- [T4] Palantir model as Qureshi describes it: "PD's job was to take whatever you'd built and generalize it." Foundry tools such as Magritte grew out of FDE "cruft work" — Qureshi (2024-10-15) · confidence: medium

## origins-and-economics

- [T2] OpenAI set up its FDE practice because "our previous hands-off… technical support model was just not reliably getting these folks to production" — Altimeter / Jarvis video (2025-11-26) · confidence: high
- [T2] OpenAI targets problems worth "tens of millions to sometimes the low billions" and warns that "the short-term lure of services revenue" pulls teams off strategy — same video (2025-11-26) · confidence: high
- [T2] The OpenAI Deployment Company launched with ">$4 billion of initial investment." It is majority-owned by OpenAI, with TPG leading 19 partners including Bain & Company, Capgemini and McKinsey. The Tomoro acquisition brings "approximately 150… Forward Deployed Engineers and Deployment Specialists" — OpenAI, "OpenAI launches the OpenAI Deployment Company…" https://openai.com/index/openai-launches-the-deployment-company (2026-05-11) · confidence: high
- [T3] The internal FDE org grew from 2 people to about 140. DeployCo has about 200 people, and the plan is to keep the internal org small while DeployCo expands — Ojstersek newsletter (2026-08-15) · confidence: medium
- [T4] Palantir's move from services to product shows in "80% gross margins in 2023… Compare to Accenture: 32%" — Qureshi (2024-10-15) · confidence: medium

## scoping-and-the-first-win

- [T2] "They pick something with genuinely high stakes," not "a kind of edge case like over to the side of the company" — Altimeter / Jarvis video (2025-11-26) · confidence: high
- [T2] Palantir bootcamp claim: 1–5 days against 1–3-month pilots. "We're running more boot camps per month than we had U.S. commercial pilots all last year" (Shyam Sankar) — Q3 2023 transcript (2023-11-02) · confidence: high
- [T2] Sierra/WeightWatchers took a small-traffic trial (about 100 concurrent inquiries) on limited use cases, then expanded — Sierra WeightWatchers page (undated) · confidence: medium

## data-access-and-integration

- [T2] "Where we spend… majority of our time in FD getting things to production is… creating the translation layer between the… raw data and… the business logic." Jarvis calls the metadata translation layer underrated — Altimeter / Jarvis video (2025-11-26) · confidence: high
- [T3] Writing back to legacy NHS systems limits FDP benefits. Palantir EVP Louis Mosley told MPs write-back is "more challenging than reading" and that with manual write-back "a lot of the efficiency is lost" — The Register, "Write-back to aging UK health systems lessens benefits of Palantir-based platform" https://www.theregister.com/2025/07/10/writeback_to_ageing_nhs_systems/ (2025-07-10) · confidence: high
- [T3] At MD Anderson, an EHR change broke Watson compatibility — Engadget (2017-02-20) · confidence: medium

## security-governance-and-model-risk

- [T2] Zero data retention was a gating issue at Morgan Stanley: "is our information going to be used by OpenAI to train the public ChatGPT?" (David Wu) — OpenAI Morgan Stanley page (undated) · confidence: medium
- [T3] At MD Anderson, payments were reportedly kept below the board-approval threshold, funded from donations not yet received, and not tied to deliverables. This was a governance failure, not a model failure — Engadget (2017-02-20) · confidence: medium

## production-and-handoff

- [T2] "We see our FD team very much as like a zero to one team." The team hands over to customer engineers or a partner, and "we don't want to… be there in the… long term" — Altimeter / Jarvis video (2025-11-26) · confidence: high
- [T2] Morgan Stanley: the technical build took 6–8 weeks, but adoption took about 4 more months of pilots. Trust was the real path to production — same video (2025-11-26) · confidence: high

## failure-modes

- [T2] "One of the biggest [mistakes] is probably generalizing too early… looking for a problem" for ChatGPT features — Altimeter / Jarvis video (2025-11-26) · confidence: high
- [T3] Cutting staff on the strength of automation metrics before the operational evidence was in. Klarna (F1) and CBA (F4) both reversed — Entrepreneur (2025-05-09); Information Age (2025-08-21) · confidence: medium
- [T3] Accuracy below the target needed for broad use (low 80s against 95%+) left the McDonald's pilot stuck — NRN (2024-06-17) · confidence: high
- [T2] Vendor retellings blur metric scope, as with TGH sepsis length of stay becoming plain "length of stay" (see C7) — Q2 2024 transcript (2024-08-05) · confidence: high

## where-fdes-work

- [T3] OpenAI FDEs spend about 50% of their time on site. Teams in the UAE and Japan are on site about 80% of the time; teams in Europe and the US spend 2–3 weeks a month there — Ojstersek newsletter (2026-08-15) · confidence: medium
- [T4] Palantir FDEs worked on site "3-4 days per week" — Qureshi (2024-10-15) · confidence: medium

## what-an-fde-is

- [T4] "Being an FDSE is its own unique role." Productivity is "tied more to delivering business outcomes than knowing every single technical detail" — Palantir (Chinemerem E.), "Who Wants to be a Delta?" https://blog.palantir.com/who-wants-to-be-a-delta-8d2ea948035 (2021-10-21) · confidence: high
- [T3] "A forward deployed engineer is focused on outcomes" (Colin Jarvis) — Ojstersek newsletter (2026-08-15) · confidence: medium

## leading-fdes

- [T2] OpenAI splits FDE capacity along two axes: product-hypothesis design partners (customer service, clinical-trial document authoring) and research-valuable industry problems (semiconductors, life sciences) — Altimeter / Jarvis video (2025-11-26) · confidence: high
- [T4] Salesforce Agentforce uses a pod of "two Forward Deployed Engineers and one Deployment Strategist." No customer outcomes are published — Salesforce blog (2025-11-15) · confidence: medium

## getting-hired

- [T4] The Anthropic Applied AI FDE posting (London) asks for "4+ years… customer facing role such as Forward Deployed Engineer," production LLM experience including "evaluation frameworks," and travel of "25-50%." Deliverables include "MCP servers, sub-agents, and agent skills" — General Catalyst job board, "Forward Deployed Engineer – Anthropic" https://jobs.generalcatalyst.com/companies/anthropic/jobs/63014770-forward-deployed-engineer (posted 6+ months before access; accessed 2026-10-17) · confidence: high
- [T4] Sierra's deployment-adjacent titles include "Forward Deployed Infrastructure Engineer" (Tokyo), "Strategist, Agent Development – Flagship Deployment," and "Product Manager, Agent Development" — Sierra Careers https://sierra.ai/careers (accessed 2026-10-17) · confidence: high

## state-of-the-role

- [T3] The MIT NANDA report "The GenAI Divide" says about 95% of pilots show no measurable P&L impact. Buying from specialized vendors or partnering succeeds about 67% of the time, and internal builds about one-third as often. The basis is 150 interviews, 350 surveys and 300 public deployments. Jarvis cites the same "95%" framing, which makes him a downstream echo, not independent confirmation — Fortune, "MIT report: 95% of generative AI pilots at companies are failing" https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/ (2025-08-18) · confidence: medium
- [T3] Sierra reached $100M ARR in about 21 months on outcome-based pricing. Customers include ADT, Cigna and SiriusXM. No customer outcome metrics are published — TechCrunch, "Bret Taylor's Sierra reaches $100M ARR in under two years" https://techcrunch.com/2025/11/21/bret-taylors-sierra-reaches-100m-arr-in-under-two-years/ (2025-11-21) · confidence: high

## open-questions

- No case in this set has a T1 measured outcome for a success. Every positive number is self-reported by the vendor or the customer. The only T1 item is a failure (NYC MyCity, tested by journalists).
- What happened to the Klarna assistant's quality metrics between Feb 2024 and May 2025? Did the original eval-per-intent framework catch the "lower quality" the CEO later described, or did it measure the wrong thing (containment instead of resolution)?
- Did Morgan Stanley ever publish a methodology for "98% adoption"? Is it teams that used the Assistant at least once, or daily active use?
- Sierra, Anthropic and Lyft pages name no vendor deployment staff. How much of each outcome came from embedded vendor engineers and how much from the customer's own team? This is the main attribution gap for the book.
- Who built the CBA voice bot, and were vendor engineers involved? Neither the bank nor the union has said.
- Do Palantir's bootcamp "days to deal" figures turn into production outcomes at the same rate? None of the transcripts reports conversion or churn after a bootcamp.
- How should "deployed" vs "signed up" vs "actively using" be defined? The NHS FDP figures (45 vs 72 vs 120+) show how adoption metrics can be framed.

## leads-not-verified

- The ZenML LLMOps Database summary of the Jarvis talk says the FDE team grew "from 2 people at the start of 2024 to 39… plan to reach 52 by year-end 2024." The video transcript I read did not contain this, and it conflicts with the 2→140 figure in the newsletter. https://www.zenml.io/llmops-database/forward-deployed-engineering-bringing-enterprise-llm-applications-to-production
- John Deere as the first OpenAI FDE engagement, with custom evals for planting recommendations (MarkTechPost returned 403 and was not fetched; ZenML mentions it only in passing).
- BBVA ChatGPT Enterprise rollout to 120,000 employees in 25 countries (MarkTechPost, not fetched).
- Coca-Cola "Create Real Magic": FDEs tuned pre-release DALL-E 3 (mentioned only briefly in the video).
- Computing.co.uk: the NHS FDP business case is "under pressure as costs rise and benefits fall" (2026). The fetch returned 403. https://www.computing.co.uk/news/2026/government/nhs-palantir-platform-s-business-case-under-scrutiny-as-costs-rise-and-benefits-fall
- Foxglove's claim that about a third of trusts using the FDP inpatient tool performed fewer operations (seen only in a search snippet).
- Distyl AI's self-reported "100% production deployment success rate" (job-board snippet) and its embedded model (OpenAI partner page returned 403).
- Bloomberg's original reporting on Klarna (2025-05-08) and CBA (2025-08-21) is paywalled and was read only through secondary coverage.
- The University of Texas audit report on MD Anderson (primary document not fetched); reported payments of about $40M to IBM and $21M+ to PwC.
- Restaurant Business's original report on the McDonald's memo, and the BTIG 2022 accuracy report (cited only second-hand by NRN).
- Palantir FDE/"Echo" (Deployment Strategist) role split, which appears only on third-party sites.
- Lyft's later agentic expansion (eWeek: more than half of requests resolved in under 3 minutes, driver usage up 70% in 2025), not fetched.