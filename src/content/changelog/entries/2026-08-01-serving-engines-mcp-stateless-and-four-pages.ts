import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-08-01',
  title: L(
    'Two AI Blog posts on serving engines and the new MCP specification, plus four pages on agent skills, async agent UX, tutoring agents and self-hosted inference',
    '两篇 AI 博客——服务引擎与新版 MCP 规范——外加四个页面：智能体技能、异步智能体体验、辅导智能体与自建推理',
  ),
  items: [
    L(
      'New blog post — *vLLM vs SGLang vs TensorRT-LLM vs llama.cpp*. Argues that tokens per second is the axis that transfers worst to agent traffic, because an agent re-sends the same prompt twenty times with a few hundred tokens appended, so the work is overwhelmingly prefill of text the GPU has already seen. Covers what each engine keys its KV cache on, why prefix reuse is decided by your router rather than your engine (a prefix-aware router prefills 300 tokens where round-robin prefills 60,300), why constrained decoding under a full batch is load-bearing for agents and absent from most benchmarks, and what TensorRT-LLM\'s per-model-per-GPU build step costs a team that changes models monthly. Four themeable SVGs including a star-count chart and a cache-keying comparison.',
      '新博客文章——《vLLM、SGLang、TensorRT-LLM 与 llama.cpp》。文章主张每秒 token 数恰恰是最难迁移到智能体流量上的那根轴：智能体会把同一段提示词带着几百个新 token 重发二十次，于是工作量绝大部分是在预填充 GPU 已经见过的文本。文中讲了各引擎的 KV 缓存以什么为键、为何前缀复用由你的路由而非你的引擎决定（前缀感知路由只预填充 300 个 token，而轮询要预填充 60,300 个）、为何满 batch 下的受约束解码对智能体是承重的却在多数基准里缺席，以及 TensorRT-LLM 那道"每模型每 GPU 一次"的构建步骤，对一个每月换模型的团队意味着什么。配四张可随主题变色的 SVG，含一张 star 数图与一张缓存键对照图。',
    ),
    L(
      'New blog post — *MCP 2026-07-28: Statelessness Was the Small Part*. The specification published on 28 July retires the initialize handshake and the Mcp-Session-Id header, and every write-up has framed that as plumbing. The argument here is that dropping the held-open connection is what put Sampling, Roots and Logging on a twelve-month deprecation clock — the three features that made an MCP client a peer rather than a caller — and demoted Tasks to an extension. Also covers Multi Round-Trip Requests as the mechanism that made the rest survivable, header-based routing and cacheable list results, and the DCR-to-CIMD migration that enterprise teams will feel longest. Three SVGs including a before/after architecture diagram and a migration-cost matrix by deployment shape.',
      '新博客文章——《MCP 2026-07-28：无状态才是这次改动里小的那一半》。7 月 28 日发布的规范废止了 initialize 握手与 Mcp-Session-Id 头，而所有解读都把它当成管道层改动。本文的论点是：正是放弃那条长连接，把 Sampling、Roots 与 Logging 推上了十二个月的弃用倒计时——这三项让 MCP 客户端不只是调用方而是对等方——并把 Tasks 降级为扩展。文中还讲了让其余改动得以成立的多轮往返请求（MRTR）、基于头部的路由与可缓存的 list 结果，以及企业团队会感受最久的 DCR 到 CIMD 迁移。配三张 SVG，含一张前后架构对比图与一张按部署形态划分的迁移成本矩阵。',
    ),
    L(
      'New Concept (AI Ecosystem) — *Agent Skills*. A skill adds no capability: the model could already write the report, it just did not know your house style. What it buys is conditional loading — name and description always resident at roughly a hundred tokens, the SKILL.md body only on a match, reference files only on demand. Argues that this makes the description a retrieval index rather than documentation, so a skill library stops scaling when two descriptions collide rather than at a token count, and that most reported skill failures are retrieval failures wearing an instruction failure\'s clothes. Includes the placement rule against tools and MCP servers, and why a skill pulled from a public directory is closer to a dependency than a document.',
      '新增概念页（AI 生态）——《智能体技能》。技能带不来能力：模型本来就写得出那份报告，它只是不知道你们家的行文规矩。它买到的是按需加载——名称与描述常驻、约一百个 token，SKILL.md 正文只在命中时加载，参考文件只在用到时加载。文章主张这让描述成了一个检索索引而不是文档，于是技能库停止扩张的那个点是两条描述撞车、而不是 token 数封顶；也主张被报上来的技能故障大多是穿着"指令没写好"外衣的检索故障。文中还给出了相对工具与 MCP 服务器的放置规则，以及为什么从公开目录拉来的技能更像一个依赖项而不是一份文档。',
    ),
    L(
      'New Playbook (Agent UX & Human Interaction) — *Async & Away: UX for Unwatched Runs*. Past about ninety seconds nobody is watching, so everything built for the watching case is dead weight and the expensive problem is re-entry rather than the wait. Covers the shift from chat transcript to an inbox over runs, the notification budget that is spent permanently the first time you ping someone about progress, pushing status into the artifact because that is where the user already is, a re-entry diff rendered from structured run state rather than summarised from the log, and why an approval gate with nobody behind it is a deadlock that teams respond to by deleting the gate.',
      '新增实战手册（智能体体验与人机交互）——《异步与离场：无人盯守运行的体验设计》。过了大约九十秒就没人在看了，于是一切为"有人盯着"而做的东西都成了累赘，而贵的问题是重新进入而不是等待。文章讲了从聊天记录转向以运行为单位的收件箱、那份在你第一次为进度打扰别人时就永久花掉的通知预算、把状态推进交付物因为用户本来就在那儿、用结构化运行状态渲染而不是拿日志总结出来的重新进入 diff，以及为什么一道背后没人的审批闸门是死锁——而团队对死锁的回应就是把闸门拆了。',
    ),
    L(
      'New Playbook (Domain Playbooks) — *Tutoring & Learning Agents*. The only domain in this section where doing the task well is the failure: a tutor is graded on what the learner can do afterwards without it, so helpfulness and the objective are directly opposed and every in-session proxy metric points the wrong way. Covers measuring unaided transfer a day later instead of session satisfaction, enforcing the five-rung hint ladder in session state rather than in a prompt a frustrated third turn will overturn, diagnosing the specific misconception instead of explaining the topic, why a learner is the one user population with no error-detection capability at all, and the fact that any agent able to do the homework has already broken homework as an assessment.',
      '新增实战手册（领域实战手册）——《辅导与学习智能体》。这是本章里唯一一个把活儿干好就等于失败的领域：辅导者的评分标准是学习者事后在没有它时能做出什么，于是"乐于助人"与目标直接对立，而所有会话内的代理指标都指错了方向。文章讲了测隔天的无辅助迁移而不是会话满意度、把五级提示阶梯执行在会话状态里而不是写在一句会被沮丧的第三轮推翻的提示词里、诊断具体的错误概念而不是讲解知识点、为什么学习者是唯一一群完全不具备纠错能力的用户，以及任何做得了作业的智能体都已经让作业作为考核失效了。',
    ),
    L(
      'New Operation (AgentOps) — *Self-Hosted Inference for Agents*. Leaving the provider API changes the currency from tokens to KV-cache bytes, and most capacity plans do not notice. Works the arithmetic: an 8B-class model at 128 KiB of cache per token means one 128k-context sequence holds 16 GiB, so an 80 GB card admits under four concurrent agents — which makes context discipline a scaling lever rather than an economy one and fp8 cache quantisation the highest-return knob on the list. Also covers prefix-cache hit rate as a routing SLI, prefill storms from one oversized prompt, why autoscaling cannot work when cold start is minutes of weight loading, and the utilisation number the whole build-versus-buy decision turns on.',
      '新增运维页（智能体运维）——《为智能体自建推理》。离开厂商 API，计价单位就从 token 变成 KV 缓存字节，而多数容量规划没察觉。文中把算术做了一遍：8B 量级模型每 token 128 KiB 缓存，意味着一条 128k 上下文的序列就占 16 GiB，于是一张 80 GB 的卡装不下四个并发智能体——这让上下文纪律成为扩容杠杆而非省钱措施，也让 fp8 缓存量化成为清单上回报最高的旋钮。文章还讲了把前缀缓存命中率当作路由 SLI、一条超大提示词引发的预填充风暴、为什么在冷启动要花几分钟加载权重时自动扩缩根本不成立，以及自建与采购整个决策所系的那个利用率数字。',
    ),
  ],
};

export default entry;
