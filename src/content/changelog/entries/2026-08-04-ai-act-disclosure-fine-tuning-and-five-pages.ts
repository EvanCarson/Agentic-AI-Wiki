import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-08-04',
  title: L(
    'Two AI Blog posts on the AI Act transparency deadline and the fine-tuning framework stack, plus five pages on calibration, claims agents, shared agents, provisioned throughput and disclosure',
    '两篇 AI 博客——《人工智能法案》透明度期限与微调框架技术栈——外加五个页面：校准、理赔智能体、共享智能体、预置吞吐量与披露',
  ),
  items: [
    L(
      'New blog post — *Your Agent Now Has to Say Who Sent It*. The 2 August 2026 deadline everyone prepared for split in two: the Digital Omnibus (Regulation (EU) 2026/1744, in force 27 July) moved the Annex III high-risk obligations to 2 December 2027, while Article 50\'s transparency duties applied on schedule in the €15m-or-3% penalty tier. The argument is that the Commission\'s final Article 50 guidelines, adopted 20 July 2026, read the duty onto agents and ask for two disclosures rather than one — that the agent is artificial, and the person on whose behalf it is acting — which is a field no interop protocol currently carries and a design-time obligation when you cannot know whether a human is on the other end. Also covers the marking line drawn at perceptibility, and the registration duty that was removed while the assessment behind it was not. Three themeable SVGs including a timeline of what moved.',
      '新博客文章——《你的智能体现在必须说出是谁派它来的》。所有人都在准备的 2026 年 8 月 2 日这个期限裂成了两半：《数字综合法案》（《欧盟条例 2026/1744》，7 月 27 日生效）把附件三的高风险义务推到了 2027 年 12 月 2 日，而第 50 条的透明度义务如期适用，坐在 1500 万欧元或 3% 的罚则档位上。文章主张：欧盟委员会于 2026 年 7 月 20 日通过的第 50 条最终指南把该义务读到了智能体身上，并要求披露两件事而非一件——智能体是人工的，以及它在为哪个人行事——前者是字符串，后者是一个当前互操作协议都不携带的字段，且在你无法知道另一端是否有人时，它是一项设计期的义务。文中还讲了画在"可被感知"上的标记分界线，以及那项被取消的登记义务与其背后并未被取消的评估。配三张可随主题变色的 SVG，含一张"什么挪了、什么落地了"的时间线。',
    ),
    L(
      'New blog post — *Unsloth vs Axolotl vs TRL vs LlamaFactory: Pick by Coupling, Not Throughput*. The most-quoted wall-clock table in this space has no primary source and appears to descend from a GPU vendor\'s 2025 post benchmarking on a 4090. The argument is that these four are not four alternatives at one layer — TRL is the trainer API, Axolotl and LlamaFactory import it, and Unsloth source-rewrites its trainer classes at import time — and that this single fact predicts the coupling you will feel: TRL shipped 1.9.2 on 28 July while Unsloth and LlamaFactory both still pin the 0.x line, and Axolotl rides trl.experimental for ORPO and CPO under a no-deprecation contract. Also maps the parallelism wall, notes Unsloth\'s split licence and LlamaFactory\'s missing GRPO, and is explicit that almost every published speed figure is self-reported. Three SVGs including a layer diagram and a parallelism matrix.',
      '新博客文章——《Unsloth、Axolotl、TRL 与 LlamaFactory：按耦合度选，别按吞吐量选》。这个领域被引用最多的那张挂钟时间对比表没有原始出处，看上去源自某家 GPU 厂商 2025 年在 4090 上做的基准。文章主张：这四者并不是同一层上的四个替代品——TRL 是训练器 API，Axolotl 与 LlamaFactory 导入它，而 Unsloth 在导入时重写它的训练器类源码——而这一个事实就能预测你会感受到的耦合：TRL 于 7 月 28 日发布 1.9.2，而 Unsloth 与 LlamaFactory 仍双双锁在 0.x 那条线上，Axolotl 则在一份"不作弃用预告"的契约下依赖 trl.experimental 提供 ORPO 与 CPO。文中还画出了并行度这堵墙，指出 Unsloth 并非单一许可证、以及 LlamaFactory 完全没有 GRPO，并明确说明几乎每一个公开的速度数字都是项目自报的。配三张 SVG，含一张分层图与一张并行度矩阵。',
    ),
    L(
      'New Concept (Core Building Blocks) — *Uncertainty & Calibration*. Three signals share the word "confidence" — token probabilities, verbalised confidence and agreement across samples — and only the last one reliably tracks whether the answer is right. Explains why base models are often calibrated and aligned ones are not, that the fix is a temperature scaling or isotonic regression fitted on a few hundred of your own labelled outcomes, and that the useful output is an abstention threshold read off a coverage–risk curve rather than a percentage on the screen. Closes on the one-afternoon version: 200 runs, sort by score, plot error rate, read off the threshold.',
      '新增概念页（核心构件）——《不确定性与校准》。三种信号共用"置信度"这个词——令牌概率、口头置信度、多次采样之间的一致性——而只有最后一种可靠地与"答案对不对"相关。文中解释了为何基座模型往往是校准的而对齐后的模型不是、修法是在你自己的几百条带标注结果上拟合一个温度缩放或保序回归，以及有用的产出是一个从覆盖率-风险曲线上读出的弃答阈值，而不是屏幕上的一个百分比。文末落在那个一下午的版本上：200 次运行、按分数排序、画错误率、读出阈值。',
    ),
    L(
      'New Playbook (Domain Playbooks) — *Insurance Claims Agents*. Most of a claim\'s life is spent waiting for a document nobody asked for, so the completeness engine is the product and the coverage determination is where the agent stops. Covers requirement lists as versioned data, extraction with page-level citations, contradiction surfaced rather than resolved, denials generated from a structured artifact that cites the clause, and the NAIC Model Bulletin\'s written-programme and vendor-accountability expectations. Argues that fraud scoring is the trap with the worst risk-adjusted return in the domain, and that touchless rate is the metric that most rewards the agent behaving badly.',
      '新增实战手册（领域实战手册）——《保险理赔智能体》。一件理赔案的大部分生命花在等一份没人想起要索取的材料上，因此完备性引擎才是产品，而责任认定是智能体停下的地方。文中讲了把要件清单做成带版本的数据、带页级引用的抽取、把矛盾摆出来而不是去化解它、从一份援引条款的结构化产物生成拒赔函，以及 NAIC 示范公告对书面方案与供应商问责的期待。文章主张欺诈评分是这个领域里风险调整后回报最差的那个陷阱，而无人工率是最奖励智能体行为不端的那个指标。',
    ),
    L(
      'New Playbook (Agent UX & Human Interaction) — *Shared & Multi-User Agents*. The moment a second person can see the agent, three assumptions break together: one intent, one permission set, one accountable person. Argues that teams design for the leak and lose the pilot to attribution collapse instead — bind every run to the asking human, take permissions as the intersection of that person\'s access and the agent\'s scope, give abort to more people than steer, and print the principal in the message the room can see. Also covers the shared context window as an injection surface where the author has a badge, and separating personal memory from space memory.',
      '新增实战手册（智能体体验与人机交互）——《共享与多用户智能体》。第二个人能看见这个智能体的那一刻，三条假设一起断掉：一个意图、一套权限、一个负责的人。文章主张团队为泄漏做了设计，却把试点输给了归属塌陷——把每次运行绑定到提出请求的那个人、把权限取作"那个人的访问权 ∩ 智能体的授权范围"、把"中止"给比"引导"更多的人，并把委托人打印在屋里人看得见的那条消息上。文中还讲了共享上下文窗口作为一个注入面（而写下它的人带着工牌），以及把个人记忆与空间记忆分开。',
    ),
    L(
      'New Operation (Economics & ROI) — *Provisioned Throughput & Commitments*. A 30% discount means breaking even at 70% sustained utilisation over the whole term, and agent traffic — bursty by construction, super-linear in context, with correlated peaks — essentially never sits there. Separates capacity reservation from committed spend, works the break-even as one division, and argues the honest justification is a customer-facing p99 and an admission-control point you own rather than a unit price. Names the term cost nobody models: a commitment is bought per model and quietly freezes your model choice in a market moving quarterly.',
      '新增运维页（经济性与投资回报）——《预置吞吐量与容量承诺》。打七折意味着要在整个合约期内维持 70% 的持续利用率才打平，而智能体流量——按构造就是突发的、对上下文超线性、峰值还彼此相关——基本上从来待不到那里。文中把容量预留与承诺消费分开、把打平点做成一次除法，并主张诚实的理由是一条面向客户的 p99 与一个归你自己掌握的准入控制点，而不是单价。文章点名了那项没人写进模型的期限成本：承诺是按模型购买的，它会在一个按季度移动的市场里悄悄冻住你的模型选择。',
    ),
    L(
      'New Operation (Governance & Compliance) — *Disclosure & Content Provenance*. Disclosure is a property of an artifact as it travels, not an element you render once, and in an agent topology the person who must be told is frequently three hops from your code. Enumerates the paths from a model output to a human eye, argues for one egress layer plus a CI test per channel, and sorts the marking mechanisms by what actually survives which boundary — C2PA manifests are strong until a pipeline re-encodes, embedded watermarks survive re-encoding on images and audio, and text has no durable mark, so the defensible artifact is a provenance record you hold. Also covers agent-to-agent propagation, which no current protocol does for you.',
      '新增运维页（治理与合规）——《披露与内容来源》。披露是一件产物在流转过程中的属性，而不是一个渲染一次的元素；在智能体拓扑里，必须被告知的那个人常常离你的代码有三跳之远。文中把从模型输出到人眼的路径逐条枚举出来，主张用一个统一的出口层加每渠道一条 CI 测试，并按"什么能真正跨过哪一道边界"给标记机制排了序——C2PA 清单很强，直到某条流水线重新编码；嵌入式水印在图像与音频上能扛住重编码；而文本没有持久的标记，因此站得住的产物是一份你握在手里的来源记录。文中还讲了智能体之间的传递，而当前没有任何协议会替你做这件事。',
    ),
  ],
};

export default entry;
