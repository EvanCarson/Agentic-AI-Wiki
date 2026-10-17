# aggregate.md: FDE book research aggregate

Sources: five briefs. Brief codes: **RM** role-and-market, **CA** cases, **EP** engagement-practice, **FA** failure, **CO** competition. All access dates are 2026-10-17 unless stated. Tiers and confidence are carried over from the briefs. Where two briefs gave different tiers, both are shown. Duplicate claims are merged, and the line lists every brief that carried the claim.

---

## Per-chapter claims

### how-to-use
- [T1] Every job post cited was read in full on 2026-10-17. Each came from the employer's ATS feed (Greenhouse, Ashby or Lever) or from a named aggregator copy. The date given is the feed's published or updated date. Pay is base unless marked OTE. Source: employer ATS feeds (2026-10-17). (RM)
- [T4] Job posts show what employers ask for. They do not show who gets hired, what people are paid, or how much they travel. (RM)
- [T4] Measured, independent (T1) evidence on how engagements run is close to nonexistent. Most figures are vendor self-reports (T2) or secondary write-ups (T3). Several sources were read through named mirrors because the originals returned 403. (EP)
- [T2] Claims about a book's contents rest on that work's own listing, repo or page. They are self-described and were not checked independently. Source: O'Reilly API record https://www.oreilly.com/api/v2/epubs/urn:orm:book:0642572416485/ (2026-10-02). (CO)
- [T3]/[T2] The Chinese term is unsettled:
  - 前线部署工程师 is the most common form. Sources: iFanr/36Kr https://eu.36kr.com/zh/p/3960032943504520 (2026-08-29); 川观 https://cbgc.scol.com.cn/news/8004805 (2026-09-28); 硅谷101 https://news.qq.com/rain/a/20260623A06BZ600 (2026-06-23).
  - 前沿部署工程师 appears in Beijing policy 京发改〔2026〕1185号 [T2]. Source: https://www.beijing.gov.cn/zhengce/zhengcefagui/202607/t20260723_4781085.html (2026-07-21).
  - 前置部署工程师 is used by Sina. Source: https://news.sina.cn/ai/2026-05-22/detail-inhyufhp7695997.d.html (2026-05-22).
  - 前端部署工程师 is a misleading outlier from 中新经纬. Source: https://www.36kr.com/p/3839857956817414 (2026-06-05).
  - 前線部署工程師 is the Taiwanese form. Source: INSIDE https://www.inside.com.tw/article/41983-fde-ai-forward-deployed-engineers-ai-talent-war (2026-07-31).
  - The xdash book uses two of these forms inconsistently [T4].

  (CO)
- [T4] Employer titles in China differ from the media terms. Tencent uses 前线部署工程师 in its product job family. ByteDance uses "AI FDE工程师" in R&D and files FDE internships under Sales–Sales Support. Source: iFanr/36Kr (2026-08-29). (CO)

### what-an-fde-is
- [T4] OpenAI says FDEs "lead complex end-to-end deployments of frontier models in production". They own "discovery, technical scoping, system design, build, and production rollout". Success is measured by "production adoption, measurable workflow impact, and eval-driven feedback that changes product and model roadmaps". Sources: https://jobs.ashbyhq.com/openai/967f94aa-1706-4dba-ac89-bfbc2c38b688 (2026-09-11); Zurich mirror https://jobs.thrivecap.com/companies/openai/jobs/87143008-forward-deployed-engineer-zurich (2026-07-22). (RM, EP)
- [T4] OpenAI's healthcare post: "This role owns the technical solution; ownership of the commercial or executive relationship is not required." Source: https://jobs.ashbyhq.com/openai/a4332746-163e-4506-b62a-90758fb7a950 (2026-08-06). (RM)
- [T4] Anthropic's Staff FDE post says customers "bring you in to lead, not only to implement". The role sits in GTM. Source: https://job-boards.greenhouse.io/anthropic/jobs/5449229008 (2026-10-14). (RM)
- [T4]/[T3] Palantir describes FDSE responsibilities as "similar to those of a startup CTO", with "minimal supervision" and "end-to-end execution of high stakes projects". Sources: https://jobs.lever.co/palantir/289ad049-7b4e-41e3-8a39-146fbeb6fb64 (created 2020-04-15); https://jobs.lever.co/palantir/bf718bd3-b2ef-451e-8033-cb4d2d9c094b; Orosz quoting it at https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers (2025-08-12). Decagon uses the same framing: "operating like the founding CTO of each" (https://jobs.ashbyhq.com/decagon/13056902-5ab6-4451-83a8-aa72e9f72532, 2026-07-31). (RM, EP)
- [T4] Employers use many titles for this work: Applied AI Engineer/Architect, Agent Deployment Engineer, Strategist (Agent Development), Frontier Agents Engineer, Deployment Strategist, and Forward Deployed Finance Engineer. Title-based counts therefore undercount the role. Source: ATS feeds (2026-10-17). (RM)
- [T2] Bloomberry's split of about 1,000 posts: Builder FDE 60%, Sales Engineer+ 30%, Internal Tools Builder 10%. Source: https://bloomberry.com/blog/i-analyzed-1000-forward-deployed-engineer-jobs-what-i-learned/ (2025-11-18, updated 2026-01-25). (RM)
- [T2] Salesforce describes the FDE as "hacker meets customer value meets professional services person" and calls coding "table stakes". Source: https://www.salesforce.com/news/stories/forward-deployed-engineers-making-ai-jobs-more-human/ (2026-03-18). (RM)
- [T4] Palantir: "Being an FDSE is its own unique role", with productivity "tied more to delivering business outcomes". Source: https://blog.palantir.com/who-wants-to-be-a-delta-8d2ea948035 (2021-10-21). (CA)
- [T3] Jarvis: "A forward deployed engineer is focused on outcomes." Source: https://newsletter.eng-leadership.com/p/inside-openais-forward-deployed-engineer (2026-08-15). (CA)
- [T4] Tryolabs' boundary test: a consultant "hands you a strategy, then leaves", while a contractor "will not tell you the ticket is wrong". Source: https://tryolabs.com/blog/forward-deployed-engineers-enterprise-ai (2026-06-30). (EP)
- [T2]/[T4] Gayle (O'Reilly, Early Release) frames the role as "founder-sized ownership" and draws the boundary by ownership across discovery, scoping, build, deployment, verification and relationship. He argues "a lot of content labeled FDE is really AI engineering". Sources: https://www.oreilly.com/api/v2/epubs/urn:orm:book:0642572416485/table-of-contents/ (2026-10-02); https://www.oreilly.com/live-events/the-forward-deployed-engineer-fde/0642572446192/. (CO)
- [T3] Pragmatic Engineer defines the FDE as an engineer who also contributes to the company's product. Adjacent roles are Agent Engineer, SA, SE and Technical Delivery Engineer. Source: (2025-08-12). (CO)

### origins-and-economics
- [T2] Palantir's S-1 names the role: FDEs "travelled to bases in Afghanistan and factories in the industrial Midwest". Source: https://www.sec.gov/Archives/edgar/data/1321655/000119312520230013/d904406ds1.htm (2020-08-25). (RM)
- [T2] S-1 economics by phase, 2019:
  - Acquire: $0.6M revenue at a $65.4M contribution loss.
  - Expand: $176.3M at a (43)% contribution margin.
  - Scale: $565.7M at 55%, with the top 25% of Scale customers at 87%.

  Pilots run "at no or low cost… at a loss". The sales cycle is "six to nine months but can extend to a year". Source: same S-1 (2020-08-25). (RM)
- [T4] Qureshi (Palantir FDE 2015–2023):
  - The FDE/PD split was a key "secret". FDE field work became Magritte, Contour and Workshop, because "PD's job was to take whatever you'd built and generalize it".
  - Palantir's 2023 gross margin was about 80% against 32% for Accenture. He gives no source; these may echo company figures.

  Source: https://nabeelqu.substack.com/p/reflections-on-palantir and https://nabeelqu.co/reflections-on-palantir (2024-10-15). (RM, CA, FA)
- [T3] Palantir created the role in the early 2010s as "Delta". It had more FDEs than SWEs until about 2016, and many FDEs moved to product after Foundry launched. Source: Pragmatic Engineer (2025-08-12). (CO)
- [T3] McGrew: users could not describe their own workflows, so engineers iterated on rough demos. Palantir split the work between "Echo" teams (domain experts) and "Delta" teams (fast prototypers). This is a secondary write-up. Source: https://www.startuphub.ai/ai-news/ai-video/2025/the-forward-deployed-engineer-ais-essential-playbook (2025-09-09). (EP)
- [T2] OpenAI set up its FDE practice because its "previous hands-off… technical support model was just not reliably getting these folks to production". It targets problems worth "tens of millions to sometimes the low billions" and warns against "the short-term lure of services revenue". Source: Altimeter/Jarvis https://www.youtube.com/watch?v=cBD7_R-Cizg (2025-11-26). (CA; EP gives the same target via ZenML)
- [T2]/[T3] The OpenAI Deployment Company:
  - Funding: more than $4B, majority-owned by OpenAI, with TPG leading 19 partners and Bain, Capgemini and McKinsey as alliance partners.
  - The Tomoro acquisition brings "approximately 150… Forward Deployed Engineers and Deployment Specialists".
  - Sources: OpenAI https://openai.com/index/openai-launches-the-deployment-company (2026-05-11) [T2, CA; RM got a 403 on this URL]; ERP Today https://erp.today/openai-launches-deployment-company-to-bring-ai-into-enterprise-operations/ (2026-05-11) [T3, RM].
  - Later, the Northslope acquisition took FDE headcount "into the hundreds", alongside a $150M partner programme. Source: MarketScale via WSJ https://www.marketscale.com/industries/software-and-technology/openais-150-million-enterprise-push-puts-forward-deployed-engineers-inside-client-operations (2026-07-30) [T3, EP].
- [T3] Anthropic's joint venture with Blackstone, H&F, Goldman and others is named Ode. It has about $1.5B, acquired Fractional AI, and has about 100 engineers, "over half" of them former founders. FDE demand "far outstrips supply". Source: https://techcrunch.com/2026/07/15/anthropic-blackstone-bet-the-next-trillion-dollar-ai-business-is-implementation-not-models/ (2026-07-15). (RM)
- [T4] a16z, "Trading Margin for Moat":
  - Gross margins at IPO were 63.2% for ServiceNow and 54.1% for Workday, rising to 79% and 75% in 2024.
  - "It's shortsighted to be optimizing for 80% gross margin."
  - Services should be sold "at cost".
  - Source: https://a16z.com/services-led-growth/ (2025-06-04). (RM, EP)
- [T4] Sierra's Flagship strategist must "manage down cost to serve over time, improving margins". Source: https://jobs.ashbyhq.com/sierra/15f81581-ad9c-4b03-8ed7-097fbbce0469 (2026-09-18). (RM)
- [T3] Gartner puts GenAI deployment costs at "$5 million to $20 million" and says many CFOs are uncomfortable with indirect returns. Source: https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025 (2024-07-29). (FA, EP)
- [T2] FourWeekMBA frames the FDE as the "last mile of intelligence", "the deepest dependency mechanism ever sold". Its figures are illustrations, not graded evidence. Source: https://web.archive.org/web/20261004093137/https://fourweekmba.com/fde-playbook-book/ (2026-10-04). (CO)

### the-skill-map
- [T4] OpenAI asks for 5+ years "that includes customer-facing work", production code in Python and JavaScript, and LLM systems experience. Sources: OpenAI FDE SF (2026-09-11); Zurich (2026-07-22). (RM, EP)
- [T4] Anthropic asks for 4+ years in a customer-facing role and "Production experience with LLMs including… agent development, evaluation frameworks", plus Python. Former founders are invited to apply. Source: https://job-boards.greenhouse.io/anthropic/jobs/5423029008 (2026-09-14). (RM, EP)
- [T4] Anthropic's Staff FDE post says "You don't need to have shipped agents to production". Side projects count, and it requires everyday use of AI coding tools. Source: (2026-10-14). (RM)
- [T4] The variants span a wide range:
  - Mistral: a PhD or MS plus LLM fine-tuning. Source: https://jobs.ashbyhq.com/mistral.ai/2ec2dacd-1117-479b-a4c1-efa9df530798 (2026-07-10).
  - Scale: distributed systems, MCP and vector DBs. Source: https://job-boards.greenhouse.io/scaleai/jobs/4694861005 (2026-10-12).
  - Harvey: buyout deal experience, with Python only "a plus". Source: https://jobs.ashbyhq.com/harvey/fb3ecf9e-9379-4839-817c-f620a3e6034d (2026-10-06).
  - ElevenLabs: student-club customer experience is enough. Source: https://jobs.ashbyhq.com/elevenlabs/6c4c57c1-ec72-42ba-af3a-eb7aebbde2e6 (2026-10-14).

  (RM)
- [T2] Bloomberry: Python appears in 66% of posts, TypeScript 35%, AWS 32%, agents 35%, LLM experience 31%, RAG 12%, and customer-facing ability 47%. Prior roles of 100 FDE profiles: SWE 45%, SE/SA 22%, data 15%, consultant 10%, founder 8%. Source: Bloomberry (2025-11-18). (RM)
- [T2] Leanpub/Bommena gives six chapters to the technical stack, plus an "FDE Technical Skills Checklist". Source: https://web.archive.org/web/20260614100858/https://leanpub.com/shippingenterpriseai- (2026-05-20). (CO)
- [T4] roadmap.sh's FDE roadmap has 97 nodes that mix tools and soft skills. It cites no employer posts, and its three-tier split comes with no data. Source: https://github.com/nilbuild/developer-roadmap (2026-10-16). (CO)

### before-the-engagement
- [T2] Palantir AIP bootcamps deliver "real workflows on actual customer data in five days or less", against pilots of one to three months: "proof, not proofs of concept." Source: Q3 2023 call https://www.fool.com/earnings/call-transcripts/2023/11/02/palantir-technologies-pltr-q3-2023-earnings-call-t/ (2023-11-02). (EP, CA)
- [T2] By February 2024 Palantir reported more than 560 bootcamps at 465 organisations, against 92 pilots two years earlier. Karp's pitch: "Our 10 hours, your 10 months." No conversion rate was given. Source: https://www.fool.com/earnings/call-transcripts/2024/02/05/palantir-technologies-pltr-q4-2023-earnings-call-t/ (2024-02-05). (EP)
- [T2] Bootcamp-to-contract examples:
  - A bootcamp in December converted five weeks later to a five-year deal at $26M ACV. Source: https://transcripts.platformaeronaut.com/transcripts/PLTR-1Q25-transcript (Q1 2025).
  - A healthcare company did two bootcamps and signed a $96M deal. Source: https://transcripts.platformaeronaut.com/transcripts/PLTR-4Q25-transcript.

  (EP)
- [T4] Anthropic's FDE Manager works in pre-sales "to qualify engagements, scope work, and inform statements of work". Source: https://job-boards.greenhouse.io/anthropic/jobs/5099753008 (2026-08-31). Mistral FDEs join pre-sales calls. Sierra's infrastructure engineer scopes during pre-sales (https://jobs.ashbyhq.com/sierra/d9c0aa93-e35d-4752-9cef-4c39dcad5365, 2026-04-21). Harvey FDEs "lead discovery, demos, pilots" on OTE with a 75/25 split. (RM)
- [T4] Paid-pilot guidance:
  - Pear VC: "pilots should never be free". Aim for one month and stay under 3 months. Price at a 20–50% discount on prorated ACV, agreed in advance. Source: https://pear.vc/how-to-run-pilots (2026-03-19).
  - Heavybit: frame the pilot inside a full-year contract with one KPI and 30 days. Source: https://www.heavybit.com/library/blog/saas-poc-paid-pilot-program/ (2020-02-14).
  - Shimoni: a 30-day pilot of about $10K, tied to the labour budget. Source: https://arnon.dk/pricing-ai-proofs-of-concept-free-pilots-will-kill-you/ (2025-07-30).
  - Lemkin: paid pilots convert at "70%+" [low confidence]. Source: https://www.saastr.com/what-is-the-typical-conversion-from-paid-pilot-to-annual-contract-in-b2b-saas-2.

  (EP)
- [T4] Sierra charges for outcomes: "let's pay for a job well done." Source: https://inferencebysequoia.substack.com/p/how-ai-is-reinventing-software-business (2025-05-08). (EP)
- [T2] Leanpub has "The First 30 Days on a Client Engagement" and engagement templates. Source: (2026-05-20). (CO)

### discovery
- [T3] Jarvis: "often what the customer describes in scoping doesn't match the data/system reality." Early scoping is "a couple of days onsite, mapping processes and prototyping with synthetic data". Source: https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers (2025-08-12). (EP)
- [T3] Engagements open with a two-day visit in which leaders set AI aside and name their business levers. Source: TNW https://thenextweb.com/news/openai-colin-jarvis-enterprise-ai-deployment-fde-humanx (2026-09-23). (EP)
- [T2] The European semiconductor engagement began when the team "embedded on site, spent like a couple of weeks just like understanding their business" before picking a target. Source: Altimeter/Jarvis (2025-11-26). (CA; EP via ZenML)
- [T4] Anthropic's Staff FDE should go from a business problem to "a defensible technical strategy". Palantir's projects "often start with an open ended question like 'Why are we delaying so many flights?'". Glean: "Before you write a line of code, you go deep on the business." Source: https://job-boards.greenhouse.io/gleanwork/jobs/4651990005 (2026-09-24). (RM)
- [T4] Palantir Deployment Strategists "Go onsite and meet with customer analysts… locate their biggest pain points". Source: https://jobs.lever.co/palantir/55c68159-62d3-40ed-b4a7-8b586dc99200. (EP)
- [T2] Sierra strategists map real journeys, procedures and transcripts. One project had more than 20 stakeholders and no APIs. Source: https://sierra.ai/blog/agent-strategist-your-phd-in-applied-ai (2026-05-19). (RM)
- [T4] Qureshi: on-site presence captures "the tacit knowledge of how they work". Tryolabs: what to build "has to be discovered, from the inside". (RM, EP)
- [T1] RAND root cause #1: stakeholders "misunderstand — or miscommunicate — what problem needs to be solved". Interviewees raised it spontaneously in more than half of interviews. Source: https://www.rand.org/content/dam/rand/pubs/research_reports/RRA2600/RRA2680-1/RAND_RRA2680-1.pdf (2024-08). (FA)
- [T2] Existing coverage: O'Reilly chapter 3, "Discovery as Engineering" / "The Statement of Work Is the Spec"; a Leanpub discovery chapter and question bank; yeasy chapter 2. (CO)

### scoping-and-the-first-win
- [T2] Jarvis: "They pick something with genuinely high stakes," not "an edge case… over to the side of the company". Source: (2025-11-26). (CA)
- [T3] Jarvis: "We want to bias for moving fast, proving out any brick walls and then adjusting the scope." Source: (2025-08-12). (EP)
- [T2] Stanford, 51 successful deployments: "73%… started small deliberately, and 63% framed their pilots explicitly as experiments." This is a DRAFT with survivorship bias. Source: https://digitaleconomy.stanford.edu/app/uploads/2026/03/EnterpriseAIPlaybook_PereiraGraylinBrynjolfsson.pdf (2026-04-02). (FA)
- [T1] RAND recommends committing each team to a problem "for at least a year. If an AI project is not worth such a long-term commitment, it most likely is not worth committing to at all." Source: (2024-08). (FA)
- [T2] MIT NANDA: winners "land small, visible wins in narrow workflows, then expand". Heavy customisation tends to stall at pilot. Source: https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf (2025-07). (FA)
- [T2] OpenAI's guide: succeed by "aligning around high-return, low-effort use cases". Source: https://cdn.openai.com/business-guides-and-resources/ai-in-the-enterprise.pdf (2025). Anthropic: "find the simplest solution possible" [T4]. Source: https://www.anthropic.com/engineering/building-effective-agents (2024-12-19). (EP)
- [T4] Job posts:
  - OpenAI: "Make trade-offs between scope, speed, and quality."
  - Glean: "when to simplify scope to get something real into production faster".
  - Decagon: "choose between them under pressure", from POC through "post-close stabilization".

  (RM, EP)
- [T2] WeightWatchers/Sierra started with a small-traffic trial of about 100 concurrent inquiries, then expanded. Source: https://sierra.ai/customers/weightwatchers. (CA)
- [T4] Alpine Edge four-week template:
  - Week 1: measure the baseline.
  - Week 2: build one end-to-end workflow.
  - Week 3: harden and pilot.
  - Week 4: prepare for production.

  Keep a "not now" list. Warning sign: "no production-like data access by end of week one". Source: https://alpineedge.ch/blog/forward-deployed-ai-engineer-first-month (2026-08-10). (EP)
- [T2] Sierra reports one agent live "within 48 hours during a major storm" [low confidence, vendor best case]. Source: (2026-05-19). (RM)
- [T2] FourWeekMBA's "wedge test" has four gates: volume, specifiability, verifiability and pain. It has no published validation. (CO)

### data-access-and-integration
- [T2] Jarvis: most FD time getting to production goes into "creating the translation layer between the… raw data and… the business logic". Source: (2025-11-26). (CA)
- [T4] Qureshi: the core of the work was "data integration": "(a) gaining access… negotiating with 'data owners' (b) cleaning it". Source: (2024-10-15). (RM, FA)
- [T3] NHS FDP: Palantir's EVP told MPs that write-back to legacy systems is "more challenging than reading", and that with manual write-back "a lot of the efficiency is lost". Source: https://www.theregister.com/2025/07/10/writeback_to_ageing_nhs_systems/ (2025-07-10). (CA)
- [T3] MD Anderson: the Watson system was never updated after the 2016 move to Epic. This was integration decay, not model failure. Sources: https://www.networkworld.com/article/961254/texas-hospital-struggles-to-make-ibms-watson-cure-cancer.html (2017-03-09); Engadget (2017-02-20). (CA, FA)
- [T2] Stanford: "77% of the hardest challenges were invisible and intangible costs: change management, data quality, and process redesign". Yet "Messy data is not a blocker if you design around it." Source: (2026-04-02). (FA)
- [T1] RAND causes #2 (lacking the needed data) and #4 (inadequate infrastructure). Source: (2024-08). (FA)
- [T2] Palantir's CTO says LLM value is realised "through ontology". This is the vendor's self-interested framing. Source: Q1 2025 transcript. (EP)
- [T2] Bloomberry: integration appears among responsibilities in 32% of posts, and direct customer work in 55%. (RM)
- [T4] Job posts: OpenAI healthcare covers Epic, HL7 and FHIR; Decagon covers CRMs, ticketing and pipelines; Anthropic covers "MCP servers, sub-agents, and agent skills". (RM, EP)
- [T4] Practical tips: bring IAM into discovery early and build on sanitised fixtures while access is pending (Alpine Edge). Engagements open by "asking for database credentials" (Kothari, low confidence). (EP)

### security-governance-and-model-risk
- [T1] OWASP LLM01:2025 ranks prompt injection first. It includes indirect injection, which RAG and fine-tuning "do not fully mitigate". Mitigations include least privilege and "Require human approval for high-risk actions". Source: https://genai.owasp.org/llmrisk/llm01-prompt-injection/ (2025). (EP)
- [T3] On 2026-04-17, SR 26-2 replaced SR 11-7 and "excluded GenAI models from its scope". Before that, most banks avoided validation by calling such tools "productivity tools". Source: https://www.risk.net/our-take/7963480/do-banks-still-need-to-validate-genai-models (2026-05-07). Baker Tilly corroborates the date and the $30B-asset relevance: https://www.bakertilly.com/insights/updated-interagency-guidance-on-model-risk-management (2026-06-04). (EP)
- [T2] Morgan Stanley's gating question was zero data retention: "is our information going to be used by OpenAI to train the public ChatGPT?" Source: https://openai.com/index/morgan-stanley/. (CA)
- [T2] OpenAI EU data residency processes eligible API projects in-region "with zero data retention", for new projects only. Source: https://techcrunch.com/2025/02/06/openai-launches-data-residency-in-europe (2025-02-06). (EP)
- [T2] Stanford: Legal, HR, Risk and Compliance were the most frequent source of resistance (35%), yet "Security was not a project killer in any of the cases we studied". The sample is successes only. (FA)
- [T2] Deloitte Q4: regulatory compliance is the top barrier, and 35% name "mistakes / errors with real-world consequences". Source: https://www2.deloitte.com/content/dam/Deloitte/us/Documents/consulting/us-state-of-gen-ai-q4.pdf (2025-01). (FA)
- [T3] MD Anderson governance failure: payments were reportedly kept under the board-approval threshold and not tied to deliverables. Source: Engadget (2017-02-20); Network World (2017-03-09). (CA, FA)
- [T3] Replit's agent deleted a production database during a code freeze. The fixes were dev/prod separation and a planning-only mode. Source: https://www.eweek.com/news/replit-ai-coding-assistant-failure/ (2025-07-22). (FA)
- [T4] Honeycomb on prompt injection: "like SQL injection, except worse and with no solution today". They kept outputs non-destructive. Source: https://www.honeycomb.io/blog/hard-stuff-nobody-talks-about-llm (2024-08-26). (FA)
- [T4] Job posts:
  - OpenAI healthcare: PHI and HIPAA, with "auditability".
  - OpenAI FDSecE: clearance required, $266K–$445K. Source: https://jobs.ashbyhq.com/openai/89d61ae8-1ce1-4187-9edd-da8029979e41 (2026-05-21).
  - Anthropic: "anticipate security and procurement gates".
  - Cohere: "reliable, observable, safe, and auditable from day one", with TS clearance preferred.
  - Decagon: "layered guardrails".

  (RM)
- [T4] Vaquill's AI vendor-questionnaire core covers training on customer data, LLM sub-processors, ZDR with each, per-call audit logs and SOC 2 Type II. Source: https://www.vaquill.ai/blog/vendor-security-questionnaire-in-house-counsel (2025-10-03). CIO.com: governance "cannot be added as a final compliance checklist". (EP)

### evals
- [T2] Jarvis's doctrine: LLM-written code is "not done until you have a set of evals". Start with "a set of five with the experts from the customer". Playground feasibility check: "N of 10… seven or eight times then… maybe this is going to work". Source: (2025-11-26). (CA)
- [T2] Klarna pattern: each intent was wrapped in an eval set so the system could scale from about 20 to 400+ policies. (CA; EP via ZenML)
- [T2] Morgan Stanley: "Start with evals." Advisors and prompt engineers graded summarisation, translation evals, a daily regression suite, and Debrief meeting-type sets. Sources: https://openai.com/index/morgan-stanley/; https://cdn.openai.com/business-guides-and-resources/ai-in-the-enterprise.pdf. (CA, EP)
- [T2] Anthropic:
  - Start with "20-50 simple tasks drawn from real failures", each one two experts would grade the same way.
  - Regression evals should be "nearly 100%". Use pass^k for consistency.
  - A 0% pass rate usually means a broken task or grader. Opus 4.5 went from 42% to 95% on CORE-Bench after grading fixes.
  - Source: https://anthropic.com/engineering/demystifying-evals-for-ai-agents (2026-01-09).
  - Success criteria should be multidimensional and measured against a baseline. Source: https://platform.claude.com/docs/en/test-and-evaluate/define-success.

  (EP)
- [T2] LinkedIn reached "about 80%" in month one, then "spent roughly four more months" pushing past 95%, a "false sense of being 'almost there'". A defensive parser cut format failures from about 10% to about 0.01%. Source: https://www.linkedin.com/blog/engineering/generative-ai/musings-on-building-a-generative-ai-product (2024-04-25). (FA)
- [T2] Sierra ADLC turns production conversations into simulated regression tests, runs "thousands" before each release, and reruns every customer's suite on platform upgrades. Source: https://sierra.ai/blog/agent-development-life-cycle (2024-06-03). (RM)
- [T4] Husain:
  - 60–80% of dev time goes to error analysis.
  - Start with 100 traces and binary labels, with a "benevolent dictator" domain expert.
  - At Nurture Boss, date-handling fixes took success from 33% to 95%.
  - Sources: https://hamel.dev/blog/posts/evals-faq/ (2026-09-18); https://hamel.dev/blog/posts/field-guide/ (2025-03-24).

  Yan: collect 50–100 failures out of 200+ samples, align the judge on 75% of labels, aim for kappa above 0.7, and build one evaluator per dimension. Source: https://eugeneyan.com/writing/product-evals/ (2025-11). (EP)
- [T4] Job posts:
  - OpenAI healthcare: "launch criteria" against "customer-specific acceptance thresholds".
  - Scale: golden datasets, regression suites, LLM-as-a-Judge.
  - Cohere and Decagon: regression and drift frameworks.
  - DeepMind: evals on partner datasets (closed post, aggregator copy).

  (RM)

### building-in-their-environment
- [T3] Anjor Kanekar, a Palantir FDE for seven years, worked on the Airbus final assembly line. Many of his peers worked air-gapped. Source: (2025-08-12). (EP)
- [T4] Qureshi moved to Toulouse for a year and worked in the factory four days a week. Source: (2024-10-15). (CA)
- [T3] OpenAI FDEs "write code on customer infrastructure". Source: Pragmatic Engineer (2025-08-12). (CO)
- [T3] In the APAC automotive agent, hard constraints such as keeping at least two suppliers were checked deterministically, outside the LLM. Source: ZenML https://www.zenml.io/llmops-database/forward-deployed-engineering-bringing-enterprise-llm-applications-to-production. (EP)
- [T4] Job posts:
  - Sierra infrastructure engineer: customer-owned VPC and IAM, upgrades, rollbacks.
  - OpenAI Gov FDSE: K8s, Terraform, TS/SCI. Source: https://jobs.ashbyhq.com/openai/db5a708d-1d7a-4aa3-8dd3-0d0423b6b69f (2025-09-03).
  - Anthropic Public Sector: on-site in secure facilities, TS/SCI with polygraph. Source: https://job-boards.greenhouse.io/anthropic/jobs/5445410008 (2026-10-06).

  (RM)
- [T4] Anthropic advises starting with LLM APIs directly, because frameworks "obscure the underlying prompts". (EP)

### production-and-handoff
- [T2] Jarvis: "We see our FD team very much as like a zero to one team… we don't want to… be there in the… long term." Source: (2025-11-26). [T3] "From OpenAI's side, we should always be temporary." Source: TNW (2026-09-23). (CA, EP)
- [T2] Morgan Stanley: the technical build took 6–8 weeks, then about 4 more months of pilots before advisors trusted it. Trust was the real path to production. (CA, EP; see contradictions on the source)
- [T4] Anthropic: "hand over systems the customer can run". OpenAI healthcare names "adoption, and handoff" as owned stages. (RM)
- [T4] Handoff tests:
  - Tryolabs: "still in use after we are gone".
  - Alpine Edge: the future operator deploys, investigates a failure and recovers using only the docs, with cost tracked per successful task.
  - CIO.com: "AI-generated code without engineering ownership becomes technical debt".

  (EP)
- [T2] Palantir Deployment Strategists "Lead training sessions", which treats adoption as part of the deliverable. At Walgreens: "end-to-end workflows in 4,000 stores within eight months" (customer quote relayed by Palantir). (EP)
- [T2] Sierra's immutable releases bundle code, prompts, model and knowledge, so they "can roll back… instantly". (RM)
- [T3] NHS FDP: by end of 2024, 45 trusts were active users, fewer than a quarter. Adoption metrics can be framed as 45, 72 or 120+ depending on definition. Source: https://www.theregister.com/2025/05/16/nhs_hospitals_palantir/ (2025-05-16). (CA)
- [T2] Doctrine in existing books: FourWeekMBA, "Run the handover as an acceptance test"; yeasy's delivery evidence pack. (CO)

### feeding-the-product
- [T2] Klarna's work became Swarm, which T-Mobile extended. It then led to the Agents SDK and AgentKit: "very much an FDE style of delivery". Source: (2025-11-26). (CA; EP via ZenML [T3]; CO notes Swarm was "built by the Solutions Architecture team")
- [T2] Reuse: the first customer yields about 20% reusable work, rising to about 50% after two or three more. Source: Altimeter/Jarvis (2025-11-26). (CA [T2 high]; EP via ZenML [T3 low])
- [T3] COBOL-to-Java feedback to research: "We need more training data." Source: Ojstersek (2026-08-15). (CA)
- [T3] An OpenAI voice engagement fed improvements into the Realtime API. Source: Pragmatic Engineer (2025-08-12). (EP, CO)
- [T3] McGrew: FDEs build "gravel roads" and the core team paves "superhighways", which avoids the "consulting trap". (EP)
- [T2] OpenAI's operating model is Research, Applied and Deployment, using "iterative deployment to learn quickly from customer use cases". Source: OpenAI PDF (2025). (EP)
- [T4] Every lab post includes the loop:
  - OpenAI: "field feedback that helps Research and Product".
  - Anthropic: "codify repeatable deployment patterns".
  - Mistral: improve product from customer feedback.
  - Decagon: "durable improvements".
  - Glean: "ships to every Glean customer".
  - OpenAI's FDE Manager is "measured by… how clearly you deliver signal to Research and Product".

  (RM, EP)
- [T4] Salesforce: "features have been moved up six months because of the urgency of what we're seeing in the field". Source: https://www.salesforce.com/blog/?p=131030 (2025-11-15). (CA)

### when-engagements-fail
- [T2] Palantir's S-1: "no guarantee that we will be able to move customers from the Acquire phase". It "sometimes spend[s] substantial time, effort, and money… without producing any sales". (RM)
- [T2]/[T3] MIT NANDA:
  - "95% of organizations are getting zero return." Task-specific tools went from 60% evaluated to 20% piloted to 5% in production.
  - Buying or partnering reached deployment about 67% of the time, against about 33% for internal builds.
  - The PDF method is 52 organisations, 153 leaders and 300+ initiatives. The report calls itself "directionally accurate" and does not prove causation.
  - Sources: https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf (2025-07) [T2, FA]; Fortune https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/ (2025-08-18) [T3, CA/EP].
  - Critique: https://www.futuriom.com/articles/news/why-we-dont-believe-mit-nandas-werid-ai-study/2025/08/ (2025-08-26).

  (FA, CA, EP)
- [T1] RAND interviewed 65 practitioners and found five root causes; 84% cited a leadership-driven cause as primary. Its "more than 80 percent" figure is cited "By some estimates" from Fortune (Kahn), not measured by RAND. Source: (2024-08). (FA)
- [T2]/[T3] Gartner's forecasts are predictions, not measurements:
  - At least 30% of GenAI projects abandoned after PoC by end-2025. Source: (2024-07-29).
  - More than 40% of agentic projects cancelled by 2027, from a poll of 3,412 webinar attendees, with about 130 "real" agentic vendors. Source: https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 (2025-06-25).

  (EP, FA)
- [T3] S&P: 42% of businesses scrap most AI initiatives, up from 17%, and 46% of PoCs are scrapped. Source: https://www.ciodive.com/news/AI-project-fail-data-SPGlobal/742590/ (2025-03-14). IDC/Lenovo: 88% of PoCs fail to scale, 4 of 33 graduate. Source: https://www.cio.com/article/3850763/88-of-ai-pilots-fail-to-reach-production-but-thats-not-all-on-it.html (2025-03-25). (FA)
- [T2] Surveys:
  - Deloitte (N=2,773): over two-thirds expect 30% or fewer experiments to scale.
  - IBM CEO study: 25% of initiatives delivered expected ROI, 16% scaled. Source: https://newsroom.ibm.com/2025-05-06-ibm-study-ceos-double-down-on-ai-while-navigating-enterprise-hurdles.
  - Informatica: 67% moved fewer than half of pilots to production.
  - BCG: 74% show no tangible value. Source: https://www.bcg.com/press/24october2024-ai-adoption-in-2024-74-of-companies-struggle-to-achieve-and-scale-value.
  - All of these are vendor or consultancy sources.

  (FA)
- [T3] Jarvis: about four in five stalled efforts are deployment problems, not model problems. Source: TNW (2026-09-23). (EP)
- [T4] Tryolabs: the commonest failure is a correct tool that "sits there unused", because discovery, build and adoption have three owners. (EP)
- [T1]/[T3] Rollbacks and shutdowns:
  - Klarna reversal. Source: https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396 (2025-05-09).
  - McDonald's/IBM AOT. Source: https://www.nrn.com/quick-service/mcdonald-s-is-ending-its-ai-drive-thru-test-with-ibm (2024-06-17).
  - CBA voice bot. Source: https://ia.acs.org.au/article/2025/cba-reverses-ai-driven-job-cuts--admits--error-.html (2025-08-21).
  - NYC MyCity [T1]. Source: https://themarkup.org/artificial-intelligence/2026/01/30/mamdani-to-kill-the-nyc-ai-chatbot-we-caught-telling-businesses-to-break-the-law (2026-01-30/02-04).
  - MD Anderson.
  - NHS FDP.
  - Taco Bell review. Source: https://www.cyberdaily.au/digital-transformation/12583-taco-bell-weighs-up-ai-rollback-as-drive-through-ordering-delivers-mixed-results (2025-09-02).
  - Air Canada. Source: https://manatt.com/insights/newsletters/advertising-law/ai-gone-wild-airline-has-to-honor-a-refund-policy (2024-02-28).
  - Replit.
  - Zillow [T2]. Source: https://www.sec.gov/Archives/edgar/data/1617640/000161764021000085/exhibit993.htm (2021-11-02).

  See the case list below. (CA, FA)
- [T2] yeasy section 14.6 grounds failures in primaries (JNCI, the Zillow 8-K, Moffatt, SEC on Knight). None of them is an FDE engagement. (CO)

### judgment-under-pressure
- [T2] Stanford: "61% of successful projects included at least one prior failure." The same executive sponsored both the failed and the successful attempt in every case where that could be identified. "In none of the cases… was anyone punished." Source: (2026-04-02, DRAFT). (FA)
- [T2] Stanford's recruiting rescue changed three things: the CEO owned it, the process was fixed first, and it targeted acute pain ("I'm drowning"). Results: intake efficiency up 83%, time per role down from 3 hours to 3 minutes (self-reported). The semiconductor field-service rescue came through escalation to the CEO. (FA)
- [T1] RAND: leaders "rapidly switch their priorities every few weeks or months"; "models are delivered as 50 percent of what they could have been". (FA)
- [T3] Morgan Stanley could not promise deterministic outputs, so it invested in advisor annotation and low-confidence verification tools. Source: ZenML. (EP)
- [T4] Rechat/Lucy rescue (Husain): unit assertions, trace review, an aligned judge and fine-tuning. No overall outcome metric. Source: https://hamel.dev/blog/posts/evals/ (2024-03-29). (FA)
- [T4] OpenAI posts: "make fast, sound decisions under pressure"; "distinguish what requires action and what does not". Sierra: "every big technical discussion is also a negotiation… hold your ground". (RM, EP)
- [T2] O'Reilly's thesis: "The tools will age. The judgment will not." Leanpub has stakeholder and politics chapters. (CO)

### where-fdes-work
- [T1] FDE-titled share of open roles on 2026-10-17:

  | Employer | FDE-titled roles | Open roles |
  |---|---|---|
  | OpenAI | 26 | 814 |
  | Anthropic | 6 | 655 |
  | Palantir | 77 | 310 |
  | Mistral | 16 | 219 |
  | Scale | 14 | 182 |
  | Cohere | 11 | 118 |
  | ElevenLabs | 4 | 156 |
  | Harvey | 3 | 345 |
  | Glean | 3 | 136 |
  | Sierra | 0 | (not given) |
  | Decagon | 0 | (not given) |

  Anthropic also lists about 40 Applied AI roles. Source: ATS APIs. (RM)
- [T2] Valletta (2026-09-08) found Palantir at 77 of 310, matching RM's count, with a median requisition age of 452 days and Databricks at 94 of 870. Valletta is a vendor. Source: https://vallettasoftware.com/blog/post/companies-hiring-forward-deployed-engineers. A Palantir FDSE requisition created in 2020 is still live [T4]. (RM)
- [T2] Plank: 1,333 live posts at 565 companies, about two-thirds in the US, about 9% at labs plus Palantir. Source: https://joinplank.com/fde-job-market (2026-09-12). Bloomberry: 58% at companies of 11–200 staff; 45% in a dedicated FDE team. (RM)
- [T3] OpenAI FDEs spend about 50% of their time on site, about 80% in the UAE and Japan, and 2–3 weeks a month in the EU and US. Source: Ojstersek (2026-08-15). (CA)
- [T3] Orosz's employer list: Ramp, Palantir, Commure, Matta, Salesforce, Lindy, Gecko, OpenAI. Onsite time runs from about 25% (Palantir) to up to 50% (Commure). Ramp FDEs "embed within core product engineering teams". (EP, CO)
- [T4] Lab FDE posts span Paris, Munich, Zurich, London, Tokyo, Seoul, Singapore, Sydney, Abu Dhabi and more. (RM)
- [T3]/[T4] China pay (H1 2026 postings): ByteDance ¥35k–70k ×15, Ant ¥40k–60k ×15, Zhipu lead ¥60k–80k, Tencent Cloud ¥35k–65k, Alibaba Cloud ¥20k–50k ×16. This is a possible echo between xdash and 中新经纬. 脉脉 reports domestic postings up 21× [T3, low]. (CO)

### getting-hired
- [T4] Palantir loop (candidate reports): recruiter, technical screen, then three onsite rounds drawn from Decomposition, Learning, Coding, Re-engineering and System Design, then a hiring manager. Decomposition is near-universal. Source: https://www.aced.io/guides/palantir-forward-deployed-engineer-interview. Supporting anecdotes: PracHub (2026-09-05) and Blind (2023-03-02). (RM)
- [T4] OpenAI loop:
  - Aced: recruiter, one-week take-home with defence, AI-allowed coding, LLM system design, project deep dive, behavioural; 3–4 weeks in all. Source: https://www.aced.io/guides/openai-forward-deployed-engineer-interview.
  - One verified candidate report: a take-home semantic search over Amazon products. Source: https://www.aced.io/experiences/openai-forward-deployed-engineer-interview-0b9c09.

  (RM, CO)
- [T4] No documentation of Anthropic's loop was found. Source: Blind (2026-01-31). (RM)
- [T3] Ramp prefers 5+ years for Senior FDE but hires some new grads. Palantir hires at about 1 year post-college. Source: Pragmatic Engineer (2025-08-12). [T4] Palantir also posts New Grad FDSE at $135K–$145K. Source: https://jobs.lever.co/palantir/cbe90327-3e6e-451c-a54c-1d3cbcef5aeb. (CO, RM)
- [T2] Bloomberry seniority: 12% entry, 60% mid, 20% senior, 8% staff+. (RM)
- [T4] Former founders are explicitly invited by Anthropic, Glean, Decagon and Mistral. (RM)
- [T3] Jarvis: with Codex, the share of custom work fell from about 90% to about 50%, which shifted hiring toward domain experts [low]. (EP)
- [T3] An unnamed estimate says about 60% fail the client-simulation round [low]. Source: iFanr (2026-08-29). (CO)

### leading-fdes
- [T4] Anthropic's first FDE Manager:
  - A player-coach with 10+ years and 2+ managing, $320K–$405K.
  - Pairs with Engagement Managers who own logistics.
  - Owns hiring, the quality bar, playbooks and "starter repositories".

  OpenAI's FDE Manager: 10+ years, still writes code, $302K–$385K. Source: https://jobs.ashbyhq.com/openai/5bbc43df-558a-4e4b-a0cf-83f185c664d7 (2026-09-23). (RM)
- [T4] Anthropic's Staff FDE is the senior IC path, setting "the quality bar for work you don't build yourself". (RM)
- [T2] OpenAI allocates FDE capacity along two axes: product-hypothesis design partners, and research-valuable industries. Source: (2025-11-26). (CA)
- [T2] Salesforce tripled its FDE team in six months. 40–50% of moves are internal, and onboarding takes six weeks. Source: (2026-03-18). [T4] Pods are "two Forward Deployed Engineers and one Deployment Strategist". (RM, CA)
- [T3] Ramp had about 15 FDEs in pods about nine months in. (CO) [T4] Cresta: each FDE carries 2–3 projects, possibly rising to 5–6 [low]. (CO)
- [T4] a16z: "clean information sharing between the front lines and product"; "document everything". (EP)
- [T2] Adjacent heuristics: BCG's 10-20-70 rule. NANDA: buyers who succeed treat vendors "like business service providers" and source work "from frontline managers". (FA)

### levels-burnout-and-what-comes-next
- [T4] Scale's ladder (base pay):

  | Level | Experience | Base pay |
  |---|---|---|
  | FAE (FDE) | 4+ years | $180K–$225K |
  | Senior | 5+ years | $216K–$270K |
  | Staff | 8+ years | $252K–$315K |

  Sources: Greenhouse 4694861005/…63005/…65005 (2026-10-12). (RM)
- [T4] Published bases:

  | Role | Base |
  |---|---|
  | OpenAI FDE | $185K–$300K |
  | OpenAI FDSE (SF; FA) | $185K–$325K |
  | Anthropic Staff FDE | $280K–$320K |
  | Anthropic London FDE | £225K–£255K |
  | Decagon | $175K–$230K |
  | Glean | $160K–$270K |
  | Palantir | $135K–$200K |
  | Cohere | CA$175K–CA$385K |

  The Anthropic London band runs against the usual UK discount. (RM, EP, FA)
- [T2] Pay aggregates:
  - Bloomberry median $173,816.
  - Plank median $193K, about $243K at labs and about $150K at seed stage.
  - [T3] Indeed average $171,911, via LeadDev https://leaddev.com/hiring/the-rise-of-the-forward-deployed-engineer.
  - [T4] Gayle median $216K from 109 roles.
  - [T3] A "Perspective AI" survey reports $485K for senior lab FDEs [low].

  (RM, FA, CO)
- [T4] Travel:
  - OpenAI: up to 50%.
  - Anthropic: 25–50%.
  - Cohere: 20–40%.
  - Glean: 25–50%.
  - Palantir FD AI: up to 25%.
  - Harvey: "2–3+ times per month".

  [T2] Bloomberry: 68% of posts require travel; Builder FDEs travel 30–50%. (RM, EP, FA)
- [T4] Qureshi: on site 3–4 days a week, "high pain tolerance", "paid lower than market". It was nonetheless "common to stick around for 5+ years", with equity as a confound. (RM, FA)
- [T3] LeadDev (Kraus, ex-Palantir): burnout comes sooner than in other roles; the model "doesn't seem very sustainable" (Slovak). No attrition data. Source: (2026-07-23). (FA)
- [T4] Pragmatic Engineer spoke to two disappointed hires who described an "IT services mindset"; one quit after 4 weeks. Betts estimates about 10% of the market wants the role. Source: https://newsletter.pragmaticengineer.com/p/is-the-fde-role-becoming-less-desirable (2026-03-26). (CO)
- [T2] Consensus SE survey: burnout is "a real and growing problem". This is an adjacent role, a vendor source, and gives no prevalence figure [low-medium]. (FA)
- [T4] Hours: Blind reports 50–60 hours a week when deployed [low]. Scaler says 45–55 [low, unsourced]. (FA)
- [T4] Exits: FDE skills "carried over to founding companies" (Qureshi), and Palantir pitches the role to would-be entrepreneurs [low]. (RM)

### case-file
See "10 best cases" below. Other material:
- [T2] OpenAI PDF: Lowe's tagging accuracy up 20% and error detection up 60%; Indeed applications started up 20%. (EP)
- [T2] Palantir: General Mills saves "about $14 million annually" on part of its network. Lowe's reports a "75% reduction in overdue tasks" [low]. (CA)
- [T2] Lyft/Anthropic: resolution time down "over 87%". "Resolved" means a self-reported yes. Sources: https://claude.com/customers/lyft; TechCrunch https://techcrunch.com/2025/02/06/lyfts-new-ai-customer-assistant-is-powered-by-anthropics-claude (2025-02-06). (CA)
- [T2] Novo Nordisk: "10+ weeks to 10 minutes"; Anthropic's role was advisory only. Source: https://claude.com/customers/novo-nordisk. (CA)
- [T2] WeightWatchers/Sierra: "nearly 70%" containment in week one. (CA)
- Other cases: [T3] Japanese COBOL-to-Java (no metric) (CA); [T2] T-Mobile, "10x more complex" than Klarna (CA); [T4]/[T3] Scale Donovan/Thunderforge, projections only (CA); [T3] John Deere (CO).
- [T2] The xdash book claims "165 verifiable cases" but has zero hyperlinks. yeasy's cases carry claim IDs but are not FDE engagements. (CO)

### templates
- [T2] Success-criterion template: metric, threshold, held-out set, improvement over baseline. Source: Claude docs. (EP)
- [T4] Paid-pilot term sheet, from Pear and Heavybit: 2–3 milestones, one KPI, 30 days (never more than 90), a 20–50% discount, annual value agreed in advance, and the fee credited on conversion. (EP)
- [T4] AI security-questionnaire core, from Vaquill. (EP)
- [T4] Handoff drill and four-week plan, from Alpine Edge. (EP)
- [T2] Existing template sets: Leanpub appendices A–K (paywalled or email-gated; live URL 404 on 2026-10-17); yeasy's delivery evidence pack and fast-facts check table. (CO)

### failure-modes
- [T1] Synthesis of named failure modes (FA):
  - Wrong problem framing (RAND #1).
  - Data inadequacy (RAND #2).
  - Technology-first projects (RAND #3; Gartner's agent washing).
  - Missing infrastructure (RAND #4).
  - The NANDA "learning gap".
  - Integration drift (MD Anderson).
  - Unbounded agent permissions (Replit).
  - Confident wrong answers in regulated domains (MyCity, Air Canada).
  - Cost-led automation that degrades quality (Klarna, CBA).
- [T2] Jarvis: the biggest mistake is "generalizing too early… looking for a problem". (CA)
- [T3] Cutting staff on automation metrics before operational evidence is in: Klarna and CBA both reversed. (CA)
- [T3] Accuracy below the bar for broad use (low 80s against a 95%+ target) left McDonald's stuck. (CA, FA)
- [T2] Vendor retellings widen metric scope: TGH's sepsis length of stay became plain "length of stay". (CA)
- [T3] Gartner: "many current use cases labeled as agentic don't need agentic implementations". (EP)
- [T4] Generic eval metrics "create false confidence" (Husain). A "God Evaluator" is "a nightmare to calibrate" (Yan). (EP)
- [T2] Stanford: escalation models show a 71% median productivity gain against 30% for approval models, with task mix as a possible confound. (FA)
- [T4] Palantir-era failures: no titles, the "hero-shithead rollercoaster", below-market pay. Decagon: AI is not "set it and forget it". (RM)

### state-of-the-role
- [T2] Bloomberry: FDE posts up 1,165% in Jan–Oct 2025 against the same months of 2024. (RM)
- [T3] Indeed posting growth:
  - Via the FT: more than 800% from January to September 2025. (RM)
  - Via WSJ: more than 10× in 2025 against 2024. (CO)
  - Via Business Insider and others: 643 posts in April 2025 to 5,330 in April 2026 (+729%) [low]. (RM, FA, CO; possible echo)
- [T3] LinkedIn: FDE posts up 42× from 2023 to 2025, against 13× for AI engineers. AlphaSense: earnings-call mentions rose from 8 to 50. India: about 19× [low]. (CO, RM)
- [T2] Plank sizes the market at 1,000–1,400 strict-title roles, 3,000–6,000 with AI-era equivalents, and 18,000–25,000 for all embedded delivery roles. It calls LinkedIn's 56K "noise". (RM)
- [T3] Christian & Timbers: about 17,000 US FDEs, about 2,000 of them fully qualified [low]. (CO)
- [T3] FT-relayed plans: OpenAI to about 50 FDEs in 2025, Anthropic applied AI ×5 [low]. (RM)
- [T3] In 2026 the labs moved FDE capacity into separate entities (DeployCo, Ode). (EP, RM)
- [T3] Pragmatic Engineer Pulse: "massive demand" at Google, OpenAI and Anthropic, with the role looking more like a consultant or SA (rest paywalled). (EP, CO)
- [T4] Specialisation is under way: security, infrastructure, verticals, defence, and non-coding Deployment Strategists. (RM)
- [T4] OpenAI's FDE share fell from 22 of 311 (a16z, June 2025) to 26 of 814, though the two counts define the role differently. (RM)
- [T3] Sierra reached $100M ARR in about 21 months on outcome pricing. Source: https://techcrunch.com/2025/11/21/bret-taylors-sierra-reaches-100m-arr-in-under-two-years/. (CA)
- [T2] Deloitte 2026: worker skills are the biggest barrier, and 1 in 5 has mature agent governance. (FA)
- [T2] Competing works: O'Reilly (Gayle; 2 of 12 chapters out, due 2027-12-25), Leanpub/Bommena (live URL 404), FourWeekMBA, xdash (5,093 stars), yeasy, Mann (230 pp., no TOC), roadmap.sh. Gaps they leave: per-claim grading, echo detection, a bilingual glossary, FDE-specific failures, free templates, the sceptical view. (CO)

---

## Contradictions between briefs

1. **OpenAI FDE headcount.**
   - ZenML says 2 to 39 people, with 52 planned by end-2024 (EP [T3]). CA flags that the video transcript does not contain this.
   - Ojstersek says 2 to about 140 internally, plus about 200 at DeployCo (CA [T3]).
   - The FT said about 50 were planned for 2025 (RM [T3]).
   - MarketScale/WSJ says "into the hundreds" (EP).
   - The figures may reflect different dates, but none reconciles the others.
2. **MIT NANDA method and framing.**
   - CA and EP cite Fortune's 150 interviews, 350 surveys and 300 deployments as T3.
   - FA's PDF says 52 organisations, 153 leaders and 300+ initiatives, rated T2, and flags the mismatch.
   - EP and CA describe 67% buy/partner "success". FA says the figure measures reaching deployment, is based on interviews, and is not causal.
   - CA notes Jarvis echoes the 95%.
3. **Morgan Stanley "98%".**
   - Morgan Stanley: "98% of Financial Advisor teams have adopted" (CA).
   - OpenAI's PDF: "98% of Morgan Stanley advisors use OpenAI every day" (EP).
   - Team adoption has become individual daily use, which looks like scope drift.
4. **Morgan Stanley timeline source.** EP lists 6–8 weeks plus 4 months as resting on ZenML and unverified. CA verified it from the Altimeter video transcript and against Morgan Stanley's March-to-September 2023 dates. CA's sourcing resolves EP's open question.
5. **Klarna share.** "Two-thirds" of chats (Klarna, OpenAI; CA, FA, EP) against 75% in Entrepreneur's later account (CA flags possible drift).
6. **Palantir onsite time.** Qureshi says 3–4 days a week (RM, CA, FA). Pragmatic Engineer says about 25% onsite (EP, CO). Palantir posts say 25–50% travel.
7. **Who built Swarm.** CA (Jarvis) calls it an "FDE style of delivery" from a solution-architect engagement. CO says the Solutions Architecture team built it. Attribution to FDEs is blurred.
8. **Tomoro's ~150.**
   - OpenAI: "FDEs and Deployment Specialists" (CA).
   - ERP Today: "roughly 150 FDEs" (RM).
   - 硅谷101 and INSIDE: about 150 FDEs (CO; possible echo).
   - The FDE-only count is unknown.
9. **Market size.** Plank counts 1,000–1,400 strict-title roles worldwide. The Indeed figure via Business Insider is 5,330 US postings in April 2026. Christian & Timbers counts about 17,000 US FDEs. The definitions differ, and the numbers cannot be reconciled.
10. **Growth rates.** 1,165% (Bloomberry), 800%+ (FT/Indeed), more than 10× (WSJ/Indeed), 729% (Indeed via BI) and 42× (LinkedIn) cover different windows. RM warns against blending them.
11. **Security as a blocker.** Stanford says "Security was not a project killer" (FA, successes only). Informatica ranks cybersecurity and privacy as the top obstacle (46%), S&P lists security among the top obstacles, and Deloitte ranks compliance first (all FA).
12. **Palantir entry level.** CO (Pragmatic Engineer) says Palantir hires at about 1 year post-college. RM shows live New Grad FDSE posts and internships.
13. **Reuse claim tier.** The 20% to 50% reuse figure is T2/high in CA (video) and T3/low in EP (ZenML). Keep the CA sourcing.
14. **Tier disagreements on the same source.** Gartner 2024 is T2 in EP and T3 in FA. NANDA is T3 via Fortune (CA, EP) and T2 via the PDF (FA).
15. **The "60% fail the customer round" figure.** RM has an unsourced getperspective.ai claim about Anthropic. CO has an unnamed iFanr estimate about a client-simulation round. This is likely the same unsourced echo, and both briefs rate it unreliable or low.
16. **Anthropic London FDE post identity.** RM cites Greenhouse 5423029008 (2026-09-14). EP cites GC mirror 93102649 (2026-09-14). CA cites GC mirror 63014770, "posted 6+ months before access". These may be different or older requisitions.
17. **Internal inconsistencies within one brief (FA).** Stanford gives both 61% of successful projects and "two thirds of companies" with prior failure. xdash claims both "165" and "100+" cases (CO).

---

## Chapters with thin evidence (fewer than 5 T1–T3 claims)

| Chapter | T1–T3 count | Note |
|---|---|---|
| the-skill-map | 3 (Bloomberry ×2, Leanpub) | Everything else is T4 job posts. No data on which skills predict success. |
| before-the-engagement | 4 (Palantir bootcamp claims ×3, Leanpub) | All vendor self-report. No independent pilot-conversion data. Pricing advice is T4. |
| building-in-their-environment | 3 (Kanekar, OpenAI on customer infra, automotive constraint) | Mostly job-post requirements. |
| templates | 3 (Claude docs, Leanpub, yeasy) | The rest are T4 practitioner templates. |

Borderline: these meet the count, but the FDE-specific evidence is weak.
- **getting-hired:** 5. Every interview-loop description is T4 or low confidence, and there is nothing on Anthropic's loop.
- **judgment-under-pressure:** The T2 claims are Stanford enterprise-AI rescues, not FDE judgment.
- **leading-fdes:** The T2 claims are adjacent heuristics (BCG, NANDA), with no data on managing FDE teams.
- **levels-burnout-and-what-comes-next:** No primary attrition or tenure data exists. Burnout evidence is anecdote, and the closest survey covers an adjacent role.
- **when-engagements-fail:** Plenty of evidence, but no primary account of an FDE deliberately killing an engagement (FA's top gap). The only T1 measured outcome in any case is a failure (MyCity).

---

## 10 best cases and proposed chapter homes

| # | Case | Strongest evidence | Primary home | Secondary homes |
|---|---|---|---|---|
| 1 | **Morgan Stanley Wealth Management / OpenAI (2023)** | [T2] Jarvis video (2025-11-26); Morgan Stanley release https://www.morganstanley.com/press-releases/ai-at-morgan-stanley-debrief-launch (2024-06-26). 6–8 weeks to build, then 4 months of trust-building; 98% adoption and 20% to 80% access, both self-reported with scope drift. | evals | production-and-handoff, security-governance (ZDR gate), case-file |
| 2 | **Klarna / OpenAI: launch claim, then reversal** | [T2] https://openai.com/index/klarna/; Klarna press release (2024-02-27); [T3] Entrepreneur (2025-05-09); [T4] Orosz probe. Eval-per-intent scaled to 400 policies; it became Swarm and then the Agents SDK; later, "lower quality". | when-engagements-fail | feeding-the-product, evals, failure-modes |
| 3 | **Tampa General Hospital / Palantir** | [T2] TGH releases (2024-06-05, 2025-09-24); [T2] Q2 2024 call. 83% placement-time reduction and 30% sepsis LOS reduction; the vendor later dropped the "sepsis" qualifier. | case-file | failure-modes (metric-scope inflation) |
| 4 | **Palantir AIP bootcamps** | [T2] Q3 2023, Q4 2023, Q1 2024, Q1 2025 and Q4 2025 calls. 5 days against 1–3-month pilots; 560+ bootcamps; examples of $26M ACV and $96M deals; no conversion rate disclosed. | before-the-engagement | scoping-and-the-first-win |
| 5 | **NYC MyCity chatbot (Microsoft Azure, contractors)** | [T1] The Markup's own testing (2024-03-29; 2026-01-30/02-04). Gave illegal advice, about $500–600K spent, shut down about 2.3 years after launch. The only T1 outcome in the set. | when-engagements-fail | security-governance-and-model-risk, failure-modes |
| 6 | **McDonald's AOT / IBM** | [T3] NRN (2024-06-17). About 100 stores over about 2.5 years; low-80s accuracy against a 95%+ target; ended. | when-engagements-fail | evals (acceptance threshold), failure-modes |
| 7 | **MD Anderson Oncology Expert Advisor / IBM Watson** | [T3] Network World (2017-03-09); Engadget (2017-02-20). $62M spent, payments kept under the approval threshold, scope creep, never updated after the Epic move. | data-access-and-integration | security-governance (governance failure), when-engagements-fail |
| 8 | **NHS Federated Data Platform / Palantir** | [T3] The Register (2025-05-16; 2025-07-10). £330M contract; 45 active trusts; write-back limits benefits; KPMG paid £8.8M for adoption. | production-and-handoff (adoption metrics) | data-access-and-integration |
| 9 | **European semiconductor company / OpenAI (unnamed)** | [T2] Jarvis video (2025-11-26). Two weeks on site in discovery; chose verification (70–80% of engineer time); forked Codex; ticket to PR as trust grew; 20–30% against a 50% target [low]. | discovery | scoping-and-the-first-win, building-in-their-environment |
| 10 | **Airbus A350 ramp / Palantir (Qureshi; Kanekar)** | [T4] Qureshi (2024-10-15), a year in Toulouse four days a week, with a loosely attributed "4x"; [T3] Kanekar on the final assembly line (2025-08-12). | building-in-their-environment (thin chapter) | origins-and-economics, levels-burnout |

Runners-up:
- CBA voice-bot reversal: judgment-under-pressure / failure-modes, [T3].
- Replit database deletion: security-governance, [T3].
- Stanford recruiting rescue: judgment-under-pressure, [T2].
- LinkedIn's 80%-to-95% plateau: evals, [T2].
- Japanese COBOL-to-Java: feeding-the-product, [T3].
- Lyft / Anthropic: case-file, [T2]/[T3].
- Air Canada (Moffatt): security-governance, [T3].
- Zillow Offers: when-engagements-fail, [T2].

---

## Cross-brief open questions (merged)

- Actual headcounts at OpenAI FDE, DeployCo and Ode, and whether the 2025 projections materialised (RM, CA, EP).
- Primary sources for the Indeed, LinkedIn and AlphaSense growth figures, and their title-matching rules (RM, CO).
- Independent bootcamp-to-production and paid-pilot conversion data (CA, EP).
- Any primary data on FDE attrition or tenure (RM, FA).
- A first-hand account of an FDE killing an engagement, with the criteria used (FA, RM).
- Handoff durability 12 months after the FDE leaves (EP).
- Attribution of outcomes on Sierra, Lyft and Novo pages to vendor staff versus the customer's own team (CA).
- Anthropic's interview loop, and whether customer role-play rounds exist anywhere (RM, CO).
- A methodology for Morgan Stanley's 98% figure (CA, EP).