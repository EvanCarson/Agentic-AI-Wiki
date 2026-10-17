## how-to-use

- [T2] Convention for this brief: when a claim is about what a book or guide contains, the source is that work's own listing, repo or page. Treat those claims as primary but self-described, and the contents have not been checked independently — O'Reilly API record https://www.oreilly.com/api/v2/epubs/urn:orm:book:0642572416485/ (2026-10-02) · confidence: high
- [T3] Chinese tech media use at least four renderings of "Forward Deployed Engineer". The commonest is 前线部署工程师. iFanr/APPSO, republished by 36Kr, says FDE "常译作前沿部署工程师或前线部署工程师" — 硅谷最火的新岗位，划出了 AI 时代职场的斩杀线 https://eu.36kr.com/zh/p/3960032943504520 (2026-08-29) · confidence: high
- [T3] Mainland examples of 前线部署工程师: 川观新闻 writes "FDE（前线部署工程师）" — 岗位激增，FDE成AI落地重要工种 https://cbgc.scol.com.cn/news/8004805 (2026-09-28) · confidence: high
- [T3] 硅谷101 (republished by Tencent News) also uses 前线部署工程师. It adds the informal glosses "AI落地官" and "前线驻场软件工程师", the latter for Palantir's version — OpenAI联手PE砸下40亿美元，聊聊硅谷最火新职位FDE https://news.qq.com/rain/a/20260623A06BZ600 (2026-06-23) · confidence: high
- [T3] The Jiemian republication of the same 硅谷101 piece uses the same terms ("前线部署工程师", "前线驻场软件工程师", "AI落地官") — https://m.jiemian.com/article/14683397.html (accessed 2026-10-17; the article itself carries no date) · confidence: medium
- [T3] Sina uses 前置部署工程师 throughout: "AI浪潮催生新职业：前置部署工程师" https://news.sina.cn/ai/2026-05-22/detail-inhyufhp7695997.d.html (2026-05-22) · confidence: high
- [T3] 中新经纬, republished on 36Kr, renders it 前端部署工程师. This is a mistranslation-like outlier, because 前端 means "frontend" in Chinese engineering usage — 年薪百万，招聘需求涨42倍，"AI圈最火岗位"，到底是干嘛的？ https://www.36kr.com/p/3839857956817414 (2026-06-05) · confidence: high
- [T2] A government policy text uses 前沿部署工程师. Beijing's 京发改〔2026〕1185号 says: "支持模型服务商和行业企业等通过前沿部署工程师（FDE）等模式创新加速智能体应用落地，通过驻场共创、持续迭代反哺智能体能力提升" — 北京市加快智能体引领发展若干措施 https://www.beijing.gov.cn/zhengce/zhengcefagui/202607/t20260723_4781085.html (2026-07-21) · confidence: high
- [T4] Employer titles in China differ from the media terms. iFanr reports Tencent posts "前线部署工程师" under its product job family, while ByteDance uses "AI FDE工程师" under R&D and files FDE internships under Sales–Sales Support — https://eu.36kr.com/zh/p/3960032943504520 (2026-08-29) · confidence: medium
- [T3] Taiwanese media use the Traditional-character form 前線部署工程師 — INSIDE, 前線部署工程師 FDE 是什麼？ https://www.inside.com.tw/article/41983-fde-ai-forward-deployed-engineers-ai-talent-war (2026-07-31) · confidence: high
- [T4] The two Chinese open books disagree internally. The xdash book's title and body use 前线部署工程师, but its repo description says "FDE（前沿部署工程师）" — https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer (2026-08-14) · confidence: high

## what-an-fde-is

- [T2] O'Reilly's *The Forward Deployed Engineer* is by Paden Gayle and is not yet published. The record lists publication_date 2027-12-25 and 350 pages, with "roughcut": true (Early Release), and was created on 2026-10-02 — https://www.oreilly.com/api/v2/epubs/urn:orm:book:0642572416485/ (2026-10-02) · confidence: high
- [T2] Early Release status: only chapters 1 and 3 are available. The brief TOC is marked "Not Yet Final" and lists 12 chapters, from "The Founder Inside Someone Else's Company" to "The AI-Augmented Senior Engineer: The Operating Model Goes In-House" — https://www.oreilly.com/api/v2/epubs/urn:orm:book:0642572416485/files/preface01.html (2026-10-02) · confidence: high
- [T2] Gayle frames the role around "founder-sized ownership". Chapter 1 sections include "Drawing the Borders", "Flavors of Forward Deployed Engineers", "Why AI Created the FDE" and "Their Turf, Your Outcome" — https://www.oreilly.com/api/v2/epubs/urn:orm:book:0642572416485/table-of-contents/ (2026-10-02) · confidence: high
- [T2] Evidence basis: the O'Reilly bio says the content comes "from current production work, not from research or summary". It is a practitioner account (Gayle is a Forward Deployed AI Engineer at Notion), not a measured or multi-source one — O'Reilly Live Event "The Forward Deployed Engineer (FDE)" https://www.oreilly.com/live-events/the-forward-deployed-engineer-fde/0642572446192/ (accessed 2026-10-17) · confidence: high
- [T4] Gayle argues "a lot of content labeled FDE is really AI engineering under a different name". He draws the boundary by ownership (discovery → scoping → build → deployment → verification → relationship) rather than by skills — same O'Reilly Live Event page (accessed 2026-10-17) · confidence: high
- [T4] Gayle also publishes a free ~10-page "FDE Handbook". It covers five deployment stages, how FDE differs from SE, architecture, consulting and product, compensation, and hiring signals — Maven digital asset https://maven.com/paden/o/33931e (accessed 2026-10-17) · confidence: medium
- [T3] Pragmatic Engineer (2025) defines the FDE as an engineer who also contributes to the company's product. It lists Agent Engineer, Solutions Architect, Sales Engineer and Technical Delivery Engineer as adjacent roles — What are Forward Deployed Engineers, and why are they so in demand? https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers (2025-08-12) · confidence: high
- [T2] The Leanpub book defines the FDE as "the person who stands at the boundary between model capability and operational value". It has a dedicated chapter, "FDE vs. Everyone Else" — Shipping Enterprise AI (Wayback snapshot) https://web.archive.org/web/20260614100858/https://leanpub.com/shippingenterpriseai- (2026-05-20) · confidence: high

## origins-and-economics

- [T3] Pragmatic Engineer reports that Palantir created the role in the early 2010s under the name "Delta". Palantir had more FDEs than regular SWEs until about 2016, and many FDEs moved to core product after Foundry launched in 2016 — https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers (2025-08-12) · confidence: medium
- [T4] roadmap.sh says "Delta" refers to "the gap between what a software product does out of the box and what a specific customer actually needs". This etymology cites only Medium and fde.academy and has no Palantir primary source — roadmap.sh FDE content, delta node https://github.com/nilbuild/developer-roadmap (accessed 2026-10-17) · confidence: low
- [T2] FourWeekMBA's free book (Gennaro Cuofano, "First edition · Aug 2026", 93 pp., 35 plates, 30 chapters, email-gated) is an economics and strategy framing. Its thesis is the "last mile of intelligence", and it describes the FDE as both "the fastest capability transfer" and "the deepest dependency mechanism ever sold" — The Forward-Deployed Engineer — free book (Wayback) https://web.archive.org/web/20261004093137/https://fourweekmba.com/fde-playbook-book/ (2026-10-04) · confidence: high
- [T2] FourWeekMBA says its "contemporary measurements are dated as of the third quarter of 2026 and are presented as instances of mechanisms". In other words, it uses figures as illustrations, not as graded evidence — same page (2026-10-04) · confidence: high
- [T2] xdash/范冰's Chinese book is organized as a commercial lifecycle: rise → solve the right problem → win the customer → activate deployment → protect renewal → expand revenue → scale by replication → case collection. The repo description says it is "基于范冰《增长黑客》原书框架", that is, it reuses the author's growth-hacking book framework — https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer (2026-08-14) · confidence: high
- [T3] The xdash book's chapter-1 case index relies heavily on Palantir lore. Items include Shyam Sankar as "FDE 模式与命名的发明者", an Airbus A380 fuel-pump story ("据报道 400 亿美元订单"), and a Bin Laden rumor that the index itself marks "从未证实、从未证伪" — 附录C https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer (2026-08-14) · confidence: high
- [T3] The xdash book uses the MIT NANDA "GenAI Divide" figures ($30–40B spent, 95% no return) as its motivating statistic. The handbook should check the primary report rather than inherit the framing — xdash README https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer (2026-08-14) · confidence: medium

## the-skill-map

- [T4] roadmap.sh has an official FDE roadmap with 97 content nodes. They mix tools (Docker, Kubernetes, Airflow, Claude Code, Cursor, Codex, Gemini, AWS/Azure/GCP), languages and soft skills (communication, business-acumen, executive-reporting). The content was last synced 2026-10-16 — nilbuild/developer-roadmap, roadmaps/forward-deployed-engineer https://github.com/nilbuild/developer-roadmap (2026-10-16) · confidence: high
- [T4] roadmap.sh splits the market into three "tiers": AI-lab FDEs, enterprise-software FDEs, and consulting/staffing FDEs. The tiering cites a Forbes piece and forwarddeployedcreative.com and comes with no data — roadmap.sh fde-tiers node https://github.com/nilbuild/developer-roadmap (2026-10-16) · confidence: medium
- [T4] The roadmap's landing page shows no update date and cites no sources. The node files cite blogs, YouTube and fde.academy rather than employer postings, and at least one video link is a truncated playlist ID — roadmap.sh https://roadmap.sh/forward-deployed-engineer (accessed 2026-10-17) · confidence: high
- [T2] Leanpub/Bommena gives six chapters to the technical stack: baseline, data contracts, RAG, agents, integration patterns, cost engineering. Appendix A is an "FDE Technical Skills Checklist" — https://web.archive.org/web/20260614100858/https://leanpub.com/shippingenterpriseai- (2026-05-20) · confidence: high

## before-the-engagement

- [T2] Leanpub/Bommena has "Chapter 12 — The First 30 Days on a Client Engagement" and Appendix G "Engagement Templates". It is the only English book in this audit with an explicit onboarding-window chapter — https://web.archive.org/web/20260614100858/https://leanpub.com/shippingenterpriseai- (2026-05-20) · confidence: high

## discovery

- [T2] O'Reilly chapter 3 (available in Early Release) treats "Discovery as Engineering" and says "The Statement of Work Is the Spec". It covers stakeholder translation and pushing back, and "Agent, Worker, or No Software at All" — https://www.oreilly.com/api/v2/epubs/urn:orm:book:0642572416485/table-of-contents/ (2026-10-02) · confidence: high
- [T2] Leanpub/Bommena has "Chapter 11 — Discovery and Problem Decomposition", Appendix B "Discovery Session Question Bank" and Appendix E "Decomposition Interview Practice Problems" — https://web.archive.org/web/20260614100858/https://leanpub.com/shippingenterpriseai- (2026-05-20) · confidence: high
- [T2] yeasy's guide gives chapter 2 to on-site discovery: entry, facts and constraints, domain modeling, slicing, and a risk-hypothesis validation plan — yeasy SUMMARY.md https://github.com/yeasy/forward_deployed_engineering_guide (2026-10-14) · confidence: high

## scoping-and-the-first-win

- [T2] FourWeekMBA's "wedge test" has four gates (volume, specifiability, verifiability, pain), and a first problem must pass all four. It is a framework with no published validation — https://web.archive.org/web/20261004093137/https://fourweekmba.com/fde-playbook-book/ (2026-10-04) · confidence: high
- [T2] O'Reilly chapter 3 includes "Proving It Before You Build, on One Page" and "Scoping Under Commercial and Political Constraints" — https://www.oreilly.com/api/v2/epubs/urn:orm:book:0642572416485/table-of-contents/ (2026-10-02) · confidence: high
- [T4] The Mann book's blurb promises "Scope and deliver projects without scope creep or missed deadlines". The book is independently published, released June 2026, 230 pp. paperback, and has no visible TOC or reviews — ThriftBooks listing, ISBN 9798181160132 https://www.thriftbooks.com/browse/?b.search=9798181160132 (accessed 2026-10-17) · confidence: high

## data-access-and-integration

- [T2] O'Reilly planned chapters 4–7 cover the customer's data, legacy systems and migration; building custom agents and workers; "Connecting Agents to a Customer's Systems: SDKs, MCP, and CLIs"; and retrieval. All are unavailable as of the record date — https://www.oreilly.com/api/v2/epubs/urn:orm:book:0642572416485/files/preface01.html (2026-10-02) · confidence: high
- [T2] yeasy gives four chapters to cloud-native runtime (Kubernetes, hybrid cloud, GPU), CI/CD/GitOps/IaC, and data contracts, lineage and semantic layers. Its centre of gravity is platform and DevOps rather than customer-facing work — yeasy SUMMARY.md https://github.com/yeasy/forward_deployed_engineering_guide (2026-10-14) · confidence: high

## security-governance-and-model-risk

- [T2] Leanpub/Bommena has "Security, Trust, and Compliance in the Field" and sector chapters on financial services, healthcare/life sciences and "Other High-Stakes Sectors", plus Appendix I "Regulatory Reference". The author bio cites EU AI Act focus and Udemy AWS practice tests — https://web.archive.org/web/20260614100858/https://leanpub.com/shippingenterpriseai- (2026-05-20) · confidence: high
- [T2] O'Reilly planned chapter 8 is "Trust, Guardrails, and Blast Radius" and chapter 9 is "Security, Compliance, and the Constraints That Decide Whether You Ship". Both are unavailable — https://www.oreilly.com/api/v2/epubs/urn:orm:book:0642572416485/files/preface01.html (2026-10-02) · confidence: high
- [T2] yeasy chapter 8 covers identity and zero trust, privacy tiers, SBOM and supply chain, audit evidence, threat modeling, and AI-specific supply-chain threats — yeasy SUMMARY.md https://github.com/yeasy/forward_deployed_engineering_guide (2026-10-14) · confidence: high

## evals

- [T2] yeasy chapter 10 covers eval sets and acceptance criteria; prompt, retrieval and tool-call evals; tracing and cost; red-teaming; and replay/regression. This is the most eval-specific structure in the audit, but it is generic LLMOps rather than FDE-in-customer-environment — yeasy SUMMARY.md https://github.com/yeasy/forward_deployed_engineering_guide (2026-10-14) · confidence: high
- [T2] Leanpub/Bommena has "AI Observability and Evaluation in the Field" and Appendix D "Evaluation Suite Templates" — https://web.archive.org/web/20260614100858/https://leanpub.com/shippingenterpriseai- (2026-05-20) · confidence: high
- [T4] Aced (formerly Exponent) reports that OpenAI FDE system-design prompts include "evaluation to catch failures before customers see them". Its project deep dive asks candidates to describe their evaluation structure — OpenAI FDE Interview Guide https://www.aced.io/guides/openai-forward-deployed-engineer-interview (accessed 2026-10-17) · confidence: medium

## building-in-their-environment

- [T3] Pragmatic Engineer reports Palantir expects ~25% of FDE time onsite and Commure up to 50%. It also reports OpenAI FDEs "write code on customer infrastructure" — https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers (2025-08-12) · confidence: medium

## production-and-handoff

- [T2] FourWeekMBA's handover doctrine is to "Write the ownership schedule before week one. Verify portability at milestones, not at farewell. Run the handover as an acceptance test." — https://web.archive.org/web/20261004093137/https://fourweekmba.com/fde-playbook-book/ (2026-10-04) · confidence: high
- [T2] Leanpub/Bommena has "Delivery, Handover, and Expansion" and promises "runbooks, and production-readiness evidence" — https://web.archive.org/web/20260614100858/https://leanpub.com/shippingenterpriseai- (2026-05-20) · confidence: high
- [T2] yeasy covers prototype → hardening → launch → retrospective (chapter 11), SLOs, incident response and runbooks (chapter 12), and knowledge transfer and "客户自治" (4.5). Its appendix includes a "交付证据包模板" (delivery evidence pack template) — yeasy SUMMARY.md https://github.com/yeasy/forward_deployed_engineering_guide (2026-10-14) · confidence: high

## feeding-the-product

- [T3] Pragmatic Engineer reports that an OpenAI voice call-centre engagement led to model improvements later reflected in the Realtime API. It also says OpenAI's Swarm framework (built by the Solutions Architecture team) was later replaced by the Agents SDK — https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers (2025-08-12) · confidence: medium
- [T2] xdash chapter 7 ("规模化复制") and FourWeekMBA ("everything that repeats across deployments becomes software") both cover field-to-product feedback. Neither shows a measured mechanism — xdash repo https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer (2026-08-14) · confidence: medium

## when-engagements-fail

- [T2] yeasy section 14.6 "公开失败案例" anchors failures in primary records: the JNCI report on MD Anderson/IBM Watson, Zillow's Form 8-K, Moffatt v. Air Canada (2024 BCCRT 149) and SEC 34-70694 on Knight Capital. Each is tagged by evidence type and comes with a "不可外推边界" (limits on generalizing) — 第十四章声明账本 https://github.com/yeasy/forward_deployed_engineering_guide (verified_at 2026-10-04) · confidence: high
- [T2] None of yeasy's failure cases is an FDE engagement; they are general AI and automation failures. "Demo-Driven Delivery" is labeled a "synthetic-pattern" — same claim ledger (2026-10-04) · confidence: high

## judgment-under-pressure

- [T2] The O'Reilly book's stated thesis is "The tools will age. The judgment will not." Only discovery and scoping judgment is available so far — https://www.oreilly.com/api/v2/epubs/urn:orm:book:0642572416485/ (2026-10-02) · confidence: high
- [T2] Leanpub/Bommena has "Stakeholder Management" and "Internal Politics and Organizational Change" chapters — https://web.archive.org/web/20260614100858/https://leanpub.com/shippingenterpriseai- (2026-05-20) · confidence: high

## where-fdes-work

- [T3] The xdash book lists Chinese FDE pay from H1 2026 postings: ByteDance/Doubao ¥35k–70k × 15 months, Ant Digital ¥40k–60k × 15, Zhipu FDE lead ¥60k–80k, Tencent Cloud ¥35k–65k, Alibaba Cloud ¥20k–50k × 16. It also cites a Tangshan industrial firm's "人工智能交付工程师（FDE）" at ¥8k–16k. Possible echo: the 中新经纬 article has the same ByteDance, Ant and Zhipu figures — xdash ch. 1 https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer (2026-08-14) · confidence: medium
- [T4] 中新经纬 (via 36Kr) screenshotted job listings: ByteDance FDE ¥35k–70k × 15, Ant Digital B-end FDE ¥40k–60k × 15, Zhipu FDE lead ¥60k–80k — https://www.36kr.com/p/3839857956817414 (2026-06-05) · confidence: medium
- [T3] 川观新闻 cites 脉脉 (Maimai) data that domestic FDE postings rose 21× year on year in H1 2026 — https://cbgc.scol.com.cn/news/8004805 (2026-09-28) · confidence: low
- [T3] iFanr reports that OpenAI has a separate Forward Deployed Engineering team hiring in SF, Seattle, Tokyo, Seoul and Singapore — https://eu.36kr.com/zh/p/3960032943504520 (2026-08-29) · confidence: medium
- [T3] 硅谷101 reports that OpenAI's Deployment Company (with 19 PE firms, >$4B) acquired Tomoro and brought in about 150 FDEs. INSIDE repeats the ~150 figure and attributes it to OpenAI — possible echo of OpenAI's own number — https://news.qq.com/rain/a/20260623A06BZ600 (2026-06-23) · confidence: medium

## getting-hired

- [T4] Aced (Exponent was renamed Aced) describes the OpenAI FDE loop: a 30-min recruiter screen, a ~1-week take-home with recorded walkthrough and live defence, 60-min coding with AI tools allowed, LLM-deployment system design, a project deep dive and a behavioral round. That is 5–6 interviews over 3–4 weeks. The guide has no author and no stated sample size, and the page shows "2 interview experiences" — https://www.aced.io/guides/openai-forward-deployed-engineer-interview (accessed 2026-10-17) · confidence: medium
- [T4] Aced quotes OpenAI FDE base bands of ~$162K–$280K (NY) and $185K–$325K for a Forward Deployed Software Engineer (SF), citing OpenAI postings. Possible echo: 中新经纬/36Kr gives the same $162k–$280k figure — same Aced page (accessed 2026-10-17) · confidence: medium
- [T4] Aced's Google FDE guide lists recruiter, DS&A coding, "vibe coding", agentic/ML system design and Googleyness rounds, a typical 6–8 weeks, base $127K–$265K and an FDE II–IV ladder. It rests on "1" interview experience — Google FDE Interview Guide https://www.aced.io/guides/google-forward-deployed-engineer-interview (accessed 2026-10-17) · confidence: low
- [T4] Aced lists its FDE interview course as "Beta" — https://www.aced.io/courses/fde-interviews (accessed 2026-10-17) · confidence: high
- [T3] Pragmatic Engineer reports Ramp prefers 5+ years for Senior FDE but hires some exceptional new grads, while Palantir hires with about 1 year of post-college experience — https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers (2025-08-12) · confidence: medium
- [T4] Gayle's Maven handbook cites a median advertised US base of $216K across 109 roles on his own job board. It is a self-collected, non-random sample — https://maven.com/paden/o/33931e (accessed 2026-10-17) · confidence: medium
- [T3] iFanr cites an unnamed estimate that ~60% of candidates who pass the technical round fail at the client-simulation round. No source is named — https://eu.36kr.com/zh/p/3960032943504520 (2026-08-29) · confidence: low
- [T2] The careers and hiring chapters already covered are Leanpub "Breaking Into the FDE Role" and "The Independent FDE"; O'Reilly planned chapter 11, "Pivoting In and Moving Up"; and Mann's book, which is career-entry focused ("Break into the Forward Deployed Engineer / Solutions Engineer career path") — Leanpub snapshot https://web.archive.org/web/20260614100858/https://leanpub.com/shippingenterpriseai- (2026-05-20) · confidence: high

## leading-fdes

- [T3] Pragmatic Engineer reports Ramp had ~15 FDEs in pods embedded within core product teams, about nine months after starting the function — https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers (2025-08-12) · confidence: medium
- [T4] 硅谷101 quotes a Cresta interviewee ("Jove"): FDEs each carry 2–3 projects today, possibly rising to 5–6, and ~80% of volume comes from ~20% of use cases. This is a single-interview anecdote — https://news.qq.com/rain/a/20260623A06BZ600 (2026-06-23) · confidence: low
- [T2] yeasy chapter 15 covers the capability model, hiring and talent pipeline, field ethics, and "从项目制到产品组织" (from project-based work to a product organization) — yeasy SUMMARY.md https://github.com/yeasy/forward_deployed_engineering_guide (2026-10-14) · confidence: high

## levels-burnout-and-what-comes-next

- [T4] Pragmatic Engineer spoke to two engineers who took FDE roles and were disappointed: little software engineering, no platform contribution, an "IT services mindset". One quit after four weeks — Is the FDE role becoming less desirable? https://newsletter.pragmaticengineer.com/p/is-the-fde-role-becoming-less-desirable (2026-03-26) · confidence: high
- [T4] The same piece quotes a Betts Recruiting executive's estimate that only ~10% of the market wants the role — same URL (2026-03-26) · confidence: medium
- [T3] The xdash book cites practitioner-forum views: 25–50% travel is normal and burnout risk is real. It notes OpenAI postings say travel "up to 50%" — xdash ch. 1 https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer (2026-08-14) · confidence: medium
- [T2] Leanpub/Bommena has "Sustaining the FDE Career", and xdash has an afterword on "FDE的职业道德" (professional ethics). Neither shows burnout data — Leanpub snapshot https://web.archive.org/web/20260614100858/https://leanpub.com/shippingenterpriseai- (2026-05-20) · confidence: high

## case-file

- [T2] The xdash book claims "165 verifiable cases" in its README, while Appendix C claims "100+". Appendix C names sources in prose, with labels such as 媒体报道 (media report), 公司披露 (company disclosure), 第三方估算 (third-party estimate) and 综合 (composite), but contains zero hyperlinks, so claims cannot be traced mechanically — 附录C https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer (2026-08-14) · confidence: high
- [T2] The xdash repo has 5,093 stars and 604 forks, last pushed 2026-08-14 (v1.0.24). Commit messages show AI-assisted editing (Co-Authored-By: Claude) and a "删不可核验年限" pass, which removed an unverifiable year range. It is free for non-commercial use, all rights reserved, with no OSS license — GitHub API / repo https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer (2026-08-14) · confidence: high
- [T2] yeasy's chapter 14 cases are mostly vendor and institutional transformation stories (GOV.UK, Visa, Mastercard, Siemens, Mayo, Pfizer, Ericsson), not FDE engagements. Each gets a claim_id, type, verified_at and generalization boundary, and "vendor-claim 的结果数字不得转为本地验收目标" (vendor result figures must not become local acceptance targets) — claim ledger https://github.com/yeasy/forward_deployed_engineering_guide (2026-10-04) · confidence: high
- [T3] Pragmatic Engineer names an OpenAI engagement with John Deere (personalized farmer interventions, FDEs travelling to Iowa) — https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers (2025-08-12) · confidence: medium

## templates

- [T2] Existing template sets: Leanpub appendices A–K (skills checklist, discovery question bank, integration patterns, eval suite templates, engagement templates, cost engineering, regulatory reference). The book is 90% complete, last updated 2026-05-20, $6.99 minimum, with a free "Community Edition" for an email. The live Leanpub URL returned 404 on 2026-10-17 — https://web.archive.org/web/20260614100858/https://leanpub.com/shippingenterpriseai- (2026-05-20) · confidence: high
- [T2] yeasy's appendix has a glossary, references (171 links in references.md), a tool index, the delivery evidence pack template, a capstone from Discovery to customer takeover, a claim ledger and a "快变事实核验表" (fast-changing facts check table). The repo has 59 stars, no license and was pushed 2026-10-14 — https://github.com/yeasy/forward_deployed_engineering_guide (2026-10-14) · confidence: high
- [T4] The Mann book's blurb claims "real-world examples, templates, and frameworks", with no TOC visible to check — https://www.thriftbooks.com/browse/?b.search=9798181160132 (accessed 2026-10-17) · confidence: low

## failure-modes

- [T2] yeasy section 1.5 is "FDE 反模式" (FDE anti-patterns). Gayle's live course has a "constraint that nearly killed it" segment. Neither publishes a counted failure taxonomy — yeasy SUMMARY.md https://github.com/yeasy/forward_deployed_engineering_guide (2026-10-14) · confidence: medium
- [T4] Gayle warns that the definition is unsettled, so evaluating "a role, course, or job posting" is itself a failure point for candidates — O'Reilly Live Event https://www.oreilly.com/live-events/the-forward-deployed-engineer-fde/0642572446192/ (accessed 2026-10-17) · confidence: high

## state-of-the-role

- [T3] Pragmatic Engineer relays WSJ citing Indeed that FDE postings grew more than 10× in 2025 versus 2024. It also cites AlphaSense data that earnings-call transcripts mentioning the role rose from 8 to 50. Possible echo of Indeed's own number — https://newsletter.pragmaticengineer.com/p/is-the-fde-role-becoming-less-desirable (2026-03-26) · confidence: medium
- [T3] Three Chinese sources give Indeed counts of 643 FDE postings (Apr 2025) and 5,330 (Apr 2026), +729%: the xdash book, iFanr via 36Kr, and 川观新闻 via a "霞光智库《FDE行业研究报告》". Possible echo: all relay Indeed's own figure, and I did not fetch the Indeed primary — xdash ch. 1 https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer (2026-08-14); https://eu.36kr.com/zh/p/3960032943504520 (2026-08-29); https://cbgc.scol.com.cn/news/8004805 (2026-09-28) · confidence: medium
- [T3] 36Kr/中新经纬 and Sina both cite LinkedIn's January 2026 report: FDE postings up 42× from 2023 to 2025, against 13× for AI engineers. Possible echo of LinkedIn's own figure — https://www.36kr.com/p/3839857956817414 (2026-06-05); https://news.sina.cn/ai/2026-05-22/detail-inhyufhp7695997.d.html (2026-05-22) · confidence: medium
- [T3] INSIDE relays recruiter Christian & Timbers estimates: ~17,000 US FDEs, of whom ~2,000 are fully qualified, and a projected 2,100% demand rise. These are vendor (recruiter) numbers via TechCrunch — https://www.inside.com.tw/article/41983-fde-ai-forward-deployed-engineers-ai-talent-war (2026-07-31) · confidence: low
- [T3] 硅谷101 cites a "Perspective AI" survey of 1,500 FDEs: median total comp $485K for senior FDEs at frontier labs, $725K at senior staff. Methodology is not given — https://news.qq.com/rain/a/20260623A06BZ600 (2026-06-23) · confidence: low
- [T3] Pragmatic Engineer's 2026 job-market report says FDEs "are growing rapidly", based on a SignalFire title chart. No numbers appear in the text — https://newsletter.pragmaticengineer.com/p/the-job-market-in-2026-part-2 (2026-06-09) · confidence: medium
- [T3] The Pragmatic Engineer Pulse (May 2026) reports "massive demand" at Google, OpenAI and Anthropic, and says the current version of the role resembles consultant or solutions-architect work. The rest is paywalled — https://newsletter.pragmaticengineer.com/p/the-pulse-forward-deployed-engineering (2026-05-14) · confidence: medium

## differentiators

What already exists, and should not be duplicated:
- Career entry and interview prep: Mann; Leanpub Part V; O'Reilly chapter 11; Aced/Exponent company loops; Gayle's Maven handbook and courses. The handbook should link to these, not rewrite them.
- Generic enterprise-AI tech stack (RAG, agents, k8s, CI/CD, LLMOps): Leanpub Part II; yeasy Parts II–III; O'Reilly chapters 4–8; roadmap.sh's 97 nodes. A free handbook adds nothing by re-teaching these.
- Palantir origin lore and commercial-lifecycle storytelling: the xdash book covers this deeply in Chinese.
- Economic and strategy framing (last mile, dependency, wedge): FourWeekMBA.

What a free, evidence-graded, bilingual handbook can add:
1. Per-claim evidence grading across the whole role, not just a case chapter. The only precedent is yeasy's chapter-14 claim ledger, and its cases are not FDE engagements. No audited work grades FDE-specific claims (pay, demand, onsite %, failure rates) by T1–T4.
2. Echo detection on the headline numbers. Indeed's 643→5,330, LinkedIn's 42×, OpenAI's $162K–$280K and the ~150 Tomoro FDEs each circulate through several outlets that trace back to a single self-reported source. A handbook that names this explicitly would be unique.
3. A true bilingual glossary. The term is unsettled: 前线部署工程师 (media majority, Tencent title) vs. 前沿部署工程师 (Beijing policy 京发改〔2026〕1185号) vs. 前置 (Sina) vs. 前端 (中新经纬, misleading) vs. 前線 (Taiwan). Add ByteDance's untranslated "AI FDE工程师" and "人工智能交付工程师（FDE）". No existing book reconciles these, and xdash is inconsistent with itself.
4. FDE-specific failure cases. yeasy's failures are generic (Watson, Zillow, Knight), and Pragmatic Engineer has two anecdotes about disappointed hires. There is room for a structured file of failed or abandoned FDE engagements and their failure modes.
5. Templates that are free and open. Leanpub's are paywalled (or email-gated), and yeasy's are delivery/DevOps-centric. Free scoping, discovery and handover templates aligned to evidence would fill a gap.
6. The skeptical view as a first-class chapter. Pragmatic Engineer's "less desirable" reporting, Gayle's "much FDE content is really AI engineering", and the role's split across tiers are scattered. No book centres them.
7. China-market coverage in English, and US-market coverage graded in Chinese. Only xdash covers Chinese pay and titles, and only in Chinese without links.
8. Timeliness. The O'Reilly book is Early Release with 2 of 12 chapters, due 2027-12-25. A dated, versioned handbook can cover the 2026 state of the role well before it ships.

## open-questions

- Will O'Reilly keep the title "The Forward Deployed Engineer"? Gayle's Maven pages reportedly use other names. And will the 2027-12-25 date hold? The record is "roughcut" with the TOC "Not Yet Final".
- Is the Leanpub book withdrawn, renamed or moved? The live URL returned 404 on 2026-10-17; the last snapshot is 2026-06-14.
- What does Mann's 230-page book actually contain (TOC, author background, sources)? No preview was reachable, and Books-A-Million blocked fetching.
- Which Chinese term will become standard? The policy text (前沿) and media/employer usage (前线) diverge. Pick one with the other as an alias.
- Do the Indeed (643→5,330), LinkedIn (42×) and AlphaSense (8→50) figures hold up against their primary releases? What do their job-title matching rules count?
- Does the xdash book's "165 cases" vs. "100+" discrepancy reflect a version difference?

## leads-not-verified

- Dataford FDE guide (https://dataford.io/roles/forward-deployed-engineer): a search snippet claims 428 candidate reports, 101 company guides, and stage frequencies (recruiter 71%, take-home/technical 63%, behavioral 43%, onsite 39%). Fetch failed with 429/Vercel checkpoint, so none of this is cited above.
- Dataford PwC FDE guide (https://dataford.io/interview-guides/price-waterhouse-coopers/forward-deployed-engineer): a snippet says "4 rounds · ≈3–5 weeks". Not fetched.
- Gayle's O'Reilly product page (https://www.oreilly.com/library/view/the-forward-deployed/0642572416485/) returned 403. Facts here come from O'Reilly's public API record instead.
- Books-A-Million listing for Mann: 403.
- Indeed/WSJ primary on FDE posting growth; LinkedIn January 2026 labor-market report (42×); 霞光智库《FDE行业研究报告》; Perspective AI 1,500-FDE survey; Christian & Timbers research (via TechCrunch); Lightcast ">1000%" figure; TeamLease Digital "800%". All seen only second-hand.
- 脉脉 (Maimai) 21× YoY H1 2026 domestic FDE postings: seen only via 川观新闻.
- Pragmatic Engineer's paywalled sections (the Ramp FDE detail in 2025; the full May 2026 Pulse).
- Awesome-FDE-Roadmap (pierpaolo28), fde.academy roadmap, Prepzee roadmap, and Will Bachman's "Forward Deployed Engineer Playbook" and A. Lawrence's "Forward Deployed Engineer Rule Book" (both found in an Open Library search). These are further competing works not audited.
- Gayle's Maven courses "Become an FDE" and "FDE interview": not fetched.