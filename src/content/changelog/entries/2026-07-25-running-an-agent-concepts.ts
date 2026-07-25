import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-25',
  title: L(
    'Concepts: five entry-level pages on actually running an agent — fabrication, cost, visibility, isolation, authority',
    '概念：五篇入门页，讲"把智能体真跑起来"——编造、成本、可见性、隔离、权限',
  ),
  items: [
    L(
      'Hallucination & Grounding (AI Foundations): why fluency and truth are separate axes, the three kinds of fabrication you actually meet (from memory, unfaithful to context, confabulated structure), the three parts of grounding people usually do only one of, and why in an agent a hallucination is a wrong action rather than a wrong sentence.',
      '《幻觉与接地》（AI 基础）：为何流畅与真实是两条互不相干的轴、你真正会遇到的三种编造（凭记忆编造、不忠于上下文、虚构的结构）、接地的三个部分中人们通常只做了一个，以及为何在智能体里幻觉是一个错误动作而非一句错话。',
    ),
    L(
      'Prompt Caching (Building Blocks): the prefix-match rule everything follows from, the write-premium / read-discount economics and where the break-even lands, the silent invalidators (timestamps, unsorted serialization, per-user values, varying tool lists, model switches), and how to verify with the usage numbers.',
      '《提示词缓存》（基础构件）：一切由之推出的前缀匹配规则、"写入溢价 / 读取折扣"的经济账与盈亏平衡点落在哪里、那些无声的失效源（时间戳、无序序列化、逐用户的值、会变动的工具清单、切换模型），以及如何用用量数字去验证。',
    ),
    L(
      'Agent Observability & Tracing (Building Blocks): a run as a tree of spans rather than a log line, the six fields of a minimum viable trace, the three zoom levels instrumentation answers (this run / across runs / did this change help), and the four ways instrumentation goes wrong.',
      '《智能体可观测性与追踪》（基础构件）：把一次运行看成一棵跨度构成的树而非一行日志、一条最小可用追踪的六个字段、埋点所回答的三个缩放层级（这一次运行 / 跨越多次运行 / 这次改动有没有帮上忙），以及埋点做砸的四种方式。',
    ),
    L(
      'Sandboxing & Code Execution (Agentic AI): why code is the universal tool, the three sources of bad code (model error, prompt injection, untrusted dependencies), the five axes of isolation with network egress called out as the most under-configured, and the limit — a sandbox bounds reach, not whether a permitted action was the right one.',
      '《沙箱与代码执行》（智能体 AI）：为何代码是那个万能工具、坏代码的三个来源（模型犯错、提示词注入、不可信依赖）、隔离的五条维度并点名网络出站是配置得最不到位的一条，以及它的边界——沙箱限定的是可及范围，而非"一个被允许的动作是否正确"。',
    ),
    L(
      'Agent Identity & Permissions (Agentic AI): authentication vs authorization vs attribution, impersonation vs delegated authority, the intersection rule for scoping an agent’s permissions, and why permissions — enforced outside the model — are the one defense that still holds when prompt injection wins.',
      '《智能体身份与权限》（智能体 AI）：认证、授权与归属之别，冒充与委托授权之别，为智能体权限定范围的"交集规则"，以及为何权限——它在模型之外被强制执行——是提示词注入得手时唯一仍然撑得住的防线。',
    ),
    L(
      'All five are fully bilingual (en/zh) and cross-linked into the existing ladder — to the agent loop, context engineering, evals, prompt injection, human-in-the-loop and MCP concepts, and outward to the agent-security, evaluating-agents, MCP and retrieval deep-dives plus the evaluation/observability, agentops, safety and governance operations chapters. The Concepts encyclopedia is now 50 entries.',
      '五篇均为完全双语（中/英），并已交叉链接进既有的学习阶梯——向内连到智能体循环、上下文工程、评测、提示词注入、人在回路与 MCP 等概念，向外连到智能体安全、评估智能体、MCP 与检索等深入解析，以及评估/可观测性、AgentOps、安全与治理等运营章节。概念百科现已收录 50 条。',
    ),
  ],
};
export default entry;
