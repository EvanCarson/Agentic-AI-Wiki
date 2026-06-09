import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-06-09',
  title: L(
    'New AI Blog pair: AI in the Trading Stack + Agentic AI for Trading Research',
    '新增两篇 AI Blog：AI 在交易栈中的位置 + 智能体 AI 用于交易研究',
  ),
  items: [
    L(
      'New AI Blog post — AI in the Trading Stack: the four-layer map (signal, sizing, execution, risk), which ML technique dominates each, the failure modes that bite each, and a 2024 alpha-uplift bar chart that puts the SEC +12% and PwC +20% numbers on the same axis. Five diagrams, FAQ with FAQPage JSON-LD, bilingual en/zh, cross-links into RL deep-dives, supervisor-worker pattern, debate-and-ensembles, evals 101, guardrails 101.',
      '新增 AI Blog 文章——《AI 在交易栈中的位置》：把交易栈拆成信号、仓位、执行、风控四层地图，写清楚每层主导的 ML 技术、最咬人的失效模式，并用一张柱状图把 SEC 的 +12% 与 PwC 的 +20% 摆在同一条轴上。配五张示意图、一组带 FAQPage JSON-LD 的常见问答，中英双语，并交叉链接到 RL 相关深入解析、监督者/工作者模式、辩论与集成、Evals 101 与 Guardrails 101。',
    ),
    L(
      'New AI Blog post — Agentic AI for Trading Research: the agent-firm pattern from TradingAgents (analyst → bull/bear debate → trader → risk supervisor), the tool surface and memory split a trading agent needs, BloombergGPT vs FinGPT vs prompted general LLM, and what LiveTradeBench\'s 50-day live evaluation revealed about LMArena rank not predicting P&L rank. Five diagrams, FAQ with FAQPage JSON-LD, bilingual en/zh, cross-links into multi-agent topologies, supervisor-worker pattern, debate-and-ensembles, agentic retrieval, structured tool I/O, and the companion landscape post.',
      '新增 AI Blog 文章——《智能体 AI 用于交易研究》：写清 TradingAgents 提出的「智能体公司」模式（分析师 → 多空辩论 → 交易员 → 风控监督者）、一个交易智能体需要的工具面与记忆切分、BloombergGPT 与 FinGPT 与被提示的通用 LLM 的取舍，以及 LiveTradeBench 50 天实盘评估揭示的「LMArena 名次预测不了 P&L 名次」这一发现。配五张示意图、一组带 FAQPage JSON-LD 的常见问答，中英双语，并交叉链接到多智能体拓扑、监督者/工作者模式、辩论与集成、智能体式检索、结构化工具 I/O，以及配套的栈视角文章。',
    ),
  ],
};

export default entry;
