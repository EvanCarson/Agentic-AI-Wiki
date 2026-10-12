import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-12',
  title: L(
    'Two AI Blog posts — one on Personal Agent Protocol draft 0.1, which spends its rigour proving which agent is calling and then describes what it may do with two scopes, one on the four prompt-management tools and the 60-second cache TTL that is the real length of your "instant rollback" — plus three pages on what a reranker can and cannot buy you, grading agents that must never emit the grade, and the energy figure that is a boundary choice before it is a measurement',
    '两篇 AI 博客——一篇讲 Personal Agent Protocol 草案 0.1：它把严谨都花在证明「是哪个智能体在调用」上，然后用两个 scope 描述它可以做什么；一篇讲四款提示词管理工具，以及那个 60 秒缓存 TTL——它才是你那套「即时回滚」的真实长度——外加三个页面：重排序器能买到与买不到的东西、绝不该吐出成绩的评分智能体，以及那个在成为测量之前先是一次边界选择的能耗数字',
  ),
  items: [
    L(
      'AI Blog — “The token proves the agent, not the errand”: Personal Agent Protocol draft 0.1, published 9 October, puts four mechanical checks in front of the token (a /.well-known/poppy.json document, an HTTPS client identifier and public key, an RFC 8414 issuer that must match that document, DPoP-bound session tokens with bearer accepted only on the MCP surface) and then offers poppy:read, poppy:write and per-company custom_scopes as the whole authorisation model. Three access surfaces carry three credential strengths — the browser one trades a signed assertion for ordinary session cookies and will carry most of the traffic — so “Poppy-compliant” says almost nothing about blast radius, and the grant semantics your product needs belong in your own authorisation layer while the draft reserves the right to break.',
      'AI 博客——《令牌证明的是智能体，不是那件差事》：10 月 9 日发布的 Personal Agent Protocol 草案 0.1，在发令牌之前摆了四道机械检查（一份 /.well-known/poppy.json 文档、一个 HTTPS 客户端标识符与公钥、一个必须与该文档一致的 RFC 8414 issuer、与 DPoP 绑定的会话令牌且 bearer 仅在 MCP 面上被接受），然后把 poppy:read、poppy:write 与各公司自定义的 custom_scopes 当作全部的授权模型。三个接入面携带三种凭据强度——浏览器那一面用一份签名断言换普通会话 cookie，而它将承载大部分流量——于是「符合 Poppy」几乎说明不了爆炸半径；而你产品需要的授权语义，应当放在你自己的授权层里，因为草案保留了打破兼容的权利。',
    ),
    L(
      'AI Blog — “Langfuse vs PromptLayer vs Agenta vs LaunchDarkly AI Configs”: all four store immutable prompt versions and deploy by moving a pointer, so the axis that matters is where the prompt is at request time. Langfuse, PromptLayer and Agenta fetch it — Langfuse’s SDKs cache client-side with a 60-second default TTL, serve stale while revalidating, return 404 rather than silently falling back, and leave the unreachable-registry case to a local constant you write yourself — while LaunchDarkly evaluates a streamed ruleset in-process, which is what buys cohorts, percentage rollouts and a revert that does not wait out a cache.',
      'AI 博客——《Langfuse、PromptLayer、Agenta 与 LaunchDarkly AI Configs》：四者都存不可变的提示词版本、都靠挪动一个指针来发布，所以真正要紧的轴是「请求时提示词在哪里」。Langfuse、PromptLayer 与 Agenta 是去取回的——Langfuse 的 SDK 在客户端缓存，默认 TTL 60 秒，过期仍先发、后台再校验，标签不存在时返回 404 而不是悄悄回落，并把「注册中心不可达」这一情形留给一个你自己写的本地常量——而 LaunchDarkly 在进程内对推流下来的规则集求值，这正是买到人群划分、百分比放量，以及一次不必等缓存过期的退回的原因。',
    ),
    L(
      'Concepts — Rerankers: a reranker reorders what the retriever already found, so it raises precision and cannot raise recall, which makes the gap between your recall@5 and recall@50 the entire available gain. It is also the only retrieval stage billed per candidate at request time, because a cross-encoder reads query and document in one pass and therefore precomputes nothing. Depth is the knob — nDCG@10 keeps climbing from 10 to 20 to 50 — so retrieve 50 and keep 5, and measure the recall curve on 100 labelled queries before you buy anything.',
      '概念——重排序器：重排序器只是把检索器已经找到的东西重新排序，所以它提升精确率而无法提升召回率，于是 recall@5 与 recall@50 之间的差距就是全部可得的收益。它也是唯一一个在请求时按候选数计价的检索阶段，因为交叉编码器一次前向就同时读到查询与文档、因而什么都预计算不了。深度才是那个旋钮——nDCG@10 从 10 到 20 再到 50 一路还在涨——所以取 50 个、留 5 个；并在掏钱之前用 100 条标注查询把召回曲线量出来。',
    ),
    L(
      'Playbooks · Domain — Grading & Assessment Agents: a grade is a contestable record, so the number the agent must never emit is the one that lands on a transcript. Ship rubric-criterion findings bound to spans, keep the mark attributable to a human, measure quadratic weighted kappa against double-marked adjudicated scores per stratum rather than accuracy — reported LLM agreement sits in the 0.6–0.8 band and a high kappa may just mean the agent learned the markers’ bias — and refuse the cheating detector: seven detectors averaged a 61.3% false-positive rate on pre-ChatGPT TOEFL essays and fell to about 3% detection after a single rewrite prompt.',
      '实战手册 · 领域——评分与考核智能体：成绩是一份可被申诉的记录，所以智能体绝不该吐出的那个数字，正是最终落到成绩单上的那个。请交付绑定到提交稿具体段落的按评分项结论，让分数仍可归因到某个人，并按分层计算对「双评并经裁定分数」的二次加权 kappa 而不是准确率——已报告的大模型一致性落在 0.6–0.8 区间，而很高的 kappa 可能只说明智能体学到了评分者的偏差——并且请拒绝那个作弊检测器：七款检测器在 ChatGPT 问世前写成的 TOEFL 作文上平均误报率 61.3%，而一句改写提示就把检测率压到约 3%。',
    ),
    L(
      'Operations · Economics & ROI — Energy & Carbon per Run: published figures for one text prompt run from 0.10 Wh to 14.6 Wh — one paper alone puts the same median prompt at 0.10 Wh for active accelerators and 0.24 Wh for the serving stack around them — and every public figure was measured on a single chatbot turn that an agent multiplies by ten to forty. Report watt-hours per completed task with the boundary stated, build the estimate from tokens-per-run in your own traces divided by the success rate, show location-based and market-based carbon side by side, and note that the top four levers all attack the multiplier while choosing a smaller model comes last.',
      '运维 · 经济性与投资回报——每次运行的能耗与碳排：已发布的、针对单条文本提示的能耗数字从 0.10 Wh 铺到 14.6 Wh——仅同一篇论文就把同一条中位数提示算成「只数活跃加速器 0.10 Wh、把周围服务栈数进来 0.24 Wh」——而所有公开数字量的都是单轮聊天，智能体会把它乘上十到四十倍。请以「每个已完成任务多少瓦时」汇报并把边界写明，用你自己追踪里的每次运行词元数除以成功率来搭这个估算，把基于地点与基于市场的碳排并排给出，并注意：排在最前面的四根杠杆打的都是那个乘数，而「换个更小的模型」排在最后。',
    ),
  ],
};

export default entry;
