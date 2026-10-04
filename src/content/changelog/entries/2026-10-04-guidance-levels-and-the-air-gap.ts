import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-04',
  title: L(
    'Two AI Blog posts — one on the pair of October benchmarks that turn an agent score into a reading taken at one guidance level and score an agent at human parity on prediction and forty points behind on explanation, one on IBM shipping self-hosted Bob with the harness intact and a different model tier inside the air gap — plus three pages on why a prompt is a measurement rather than a specification, how to build a discovery agent that is graded on the explanation, and what an air gap actually cuts',
    '两篇 AI 博客——一篇讲十月那两个基准如何把「智能体分数」变成「在某一档指引下取得的读数」，并测出智能体在预测上与人类齐平、在解释上落后四十个点；一篇讲 IBM 交付自托管版 Bob，外壳完整保留，而气隙之内换了一个模型档位——外加三个页面：为什么提示词是一次测量而不是一份规格说明、如何造一个「照解释打分」的发现型智能体，以及一道气隙究竟切断了什么',
  ),
  items: [
    L(
      'AI Blog — “It matched the scientist and missed the point”: two benchmarks posted to arXiv in the opening days of October 2026 each make a variable out of something agent evals normally fix. CompMat-Bench crosses task length with how much methodological guidance the agent gets across 94 tasks, pre-runs the expensive simulations so grading is rule-based with no LLM judge, and reports 66.0–90.4% on single tasks with full guidance — the only cell anyone quotes. EurekaBench scores prediction and explanation separately against 306 expert-enumerated insights: 47.4% predictive against a human reference of 48.8%, and 29.4% on insight against 69.7%. Argues the honest unit is a curve over guidance rather than a point, and that most remaining failures being domain-reasoning errors is why a better harness will not close the gap.',
      'AI 博客《它追平了科学家，却没抓住要点》：2026 年 10 月初发布到 arXiv 的两个基准，各自把一件智能体评测通常固定住的东西变成了变量。CompMat-Bench 在 94 项任务上把任务长度与「给智能体多少方法学指引」交叉起来，并预先跑掉昂贵的模拟，使评分得以基于规则、不用 LLM 评判；它报出完整指引下单任务 66.0–90.4%——而这恰是人人引用的唯一一格。EurekaBench 则对照 306 条由专家列举的洞见，把预测与解释分开打分：预测 47.4% 对人类参考 48.8%，洞见 29.4% 对 69.7%。文中论证：诚实的计量单位是一条随指引变化的曲线而非一个点；而「余下的失败大多是领域推理错误」正是更好的外壳补不上这道落差的原因。',
    ),
    L(
      'AI Blog — “The harness crossed the air gap; the model did not”: IBM made self-hosted Bob generally available on 1 October 2026 for on-premises, private-cloud, sovereign-cloud and air-gapped environments, keeping the shell, parallel tool calling, skills and modes whole — while the models supported on customer-managed infrastructure at GA are NVIDIA Nemotron and Poolside Laguna, with Claude Sonnet 5.0 and Opus 4.8, Gemini 3.7 Flash and GPT 5.6 Sol reserved for hosted and hybrid configurations. Reads the supported-model matrix as the actual price list for an isolation requirement, separates the three postures procurement calls by one name, and ends on the one-day experiment — block egress in staging and count confidently-wrong answers, not failed tool calls.',
      'AI 博客《外壳越过了气隙，模型没有》：IBM 在 2026 年 10 月 1 日让自托管版 Bob 正式可用，面向本地、私有云、主权云与气隙环境，shell、并行工具调用、技能与模式完整保留——而正式可用时受支持运行在客户自管基础设施上的模型是 NVIDIA Nemotron 与 Poolside Laguna，Claude Sonnet 5.0 与 Opus 4.8、Gemini 3.7 Flash 以及 GPT 5.6 Sol 则留给托管与混合配置。文中把受支持模型矩阵读作隔离要求的真实价目表，把采购口中共用一个名字的三种姿态分开，并以那个一天的实验收尾——在预发环境封掉对外访问，数的是自信的错答，而不是失败的工具调用。',
    ),
    L(
      'New Concept (Core Building Blocks) — Prompt Portability: changing a model string is a one-line diff that no reviewer can approve, because what it changes is not in the diff. Separates the four layers stacked in every prompt — intent, contracts, calibration, harness coupling — and shows only the first travels, with the invisible fourth moving on its own (Opus 5.5 was the first Claude to default to medium rather than high effort, so a byte-identical prompt got a different amount of thinking). Argues a mature prompt is scar tissue from one model’s failure distribution, gives four structural moves that make the model-specific parts separable, and sets the migration gate at an eval run comparing format validity, refusal rate, steps and cost per completed task — not just pass rate.',
      '新概念（核心构件）《提示词可移植性》：换一个模型字符串，是一行没人能审出问题的 diff，因为它改动的东西不在 diff 里。文中把每条提示词里叠着的四层分开——意图、契约、校准、外壳耦合——并说明只有第一层真能迁移，而看不见的第四层会自己移动（Opus 5.5 是第一个把默认力度定为 medium 而非 high 的 Claude 模型，于是逐字节相同的提示词拿到了不同的思考量）。文中论证一份成熟的提示词是某一个模型失败分布留下的疤痕组织，给出四个让模型专属部分可分离的结构性动作，并把迁移闸设在一次评测运行上，比的是格式合法率、拒答率、步数与每完成任务成本——而不只是通过率。',
    ),
    L(
      'New Playbook (Domain Playbooks) — Scientific-Discovery Agents: build for the metric the agent already wins and you ship expert-accuracy correlations nobody can publish. Splits the work into three jobs that must not be one agent (execute a known method, analyse given outputs, propose a mechanism), copies CompMat-Bench’s harness shape — pre-run the expensive simulations, grade with fixed rules rather than a judge that scores the agent’s own narrative — declares guidance as a logged L0–L3 parameter so an L3 pass rate is read as a statement about your prompt, scores explanation separately from prediction against a pre-registered insight list, and puts expert-accepted insights per expert review-hour on the wall instead of discoveries made.',
      '新实战手册（领域实战手册）《科学发现智能体》：照着智能体本来就能赢的指标去造，你交付的会是没人能发表的专家级准确率相关性。文中把工作拆成三件绝不该合成一个智能体的活（执行已知方法、分析给定输出、提出机制），照抄 CompMat-Bench 的外壳形状——预先跑掉昂贵的模拟，用固定规则评分，而不用一个会去给智能体自家叙述打分的评判模型——把指引申报成一个记录在案的 L0–L3 参数，使 L3 通过率被读作「一句关于你提示词的话」，对照一份预先登记的洞见清单把解释与预测分开打分，并把「每位专家复核工时换来几条被接受的洞见」挂上墙，而不是挂「做出了多少发现」。',
    ),
    L(
      'New Operation (AgentOps) — Air-Gapped Agent Deployments: everyone asks where the model will run, which is the one question with a vendor answer; the expensive surprises are the implicit internet dependencies nobody decided on — package index, tool registry, hosted judge, telemetry, CRL and NTP — each of which fails inside the gap as an unexplained quality regression rather than a connection error, because the model answers from its weights instead. Separates sovereign cloud from self-hosted from air-gapped before the architecture review, treats the model tier available inside as the binding design constraint, moves the judge and the traces in rather than switching the suite off, turns updates into a release process with a cadence and signature checks, and sets a five-item acceptance gate.',
      '新运维页（智能体运维）《气隙环境中的智能体部署》：人人都问模型跑在哪，而这恰是唯一有厂商答案的问题；真正昂贵的意外是那些没人拍板过的隐式互联网依赖——软件包索引、工具注册表、托管评判模型、遥测、证书吊销列表与 NTP——它们在气隙之内每一个都以「无法解释的质量回归」而非连接错误的形式失败，因为模型改为从自己的权重里作答。文中在架构评审之前把主权云、自托管与气隙分开，把「里面可用的模型档位」当作那条起约束作用的设计约束，把评判模型与追踪数据搬进去而不是把套件关掉，把更新变成一套有节奏、带签名校验的发布流程，并给出一道五项验收闸。',
    ),
  ],
};

export default entry;
