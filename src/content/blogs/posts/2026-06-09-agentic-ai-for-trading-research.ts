import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-09',
  slug: 'agentic-ai-for-trading-research',
  title: L(
    'Agentic AI for Trading Research: When the LLM Sits in the Loop',
    '智能体 AI 用于交易研究：当 LLM 坐进决策回路',
  ),
  summary: L(
    'The hype says AI agents run the fund; the reality in 2026 is that LLM agents run the research desk — fundamentals, sentiment, bull-bear debate, risk sign-off — while rule-based code still pulls the trigger. Knowing where the line sits is the difference between deploying the pattern and over-trusting it.',
    '炒作说 AI 智能体在「跑基金」；2026 年的现实是 LLM 智能体在跑研究台——基本面、情绪、多空辩论、风控签字——真正扣扳机的还是规则代码。看清这条分界线，就分得清「把模式用对」和「把它当神」。',
  ),
  tags: ['agentic-ai', 'llm-agents', 'quant-finance', 'multi-agent-systems', 'applications'],
};

export default post;
