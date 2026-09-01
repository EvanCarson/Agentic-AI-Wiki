import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-08',
  slug: 'inference-hooks-move-the-dlp-boundary',
  title: L(
    'Inference Hooks Move the DLP Boundary — Past the Traffic That Matters Most',
    '推理钩子挪动了 DLP 边界——却绕开了最要紧的那股流量',
  ),
  searchTitle: { en: 'Inference Hooks Move the DLP Boundary for AI Agents' },
  summary: L(
    "Anthropic's inference hooks, in beta since 5 August, put your DLP server in the path of every Claude Enterprise prompt — closing a gap network proxies have had for a decade. But they fire on prompts only, cover Enterprise surfaces only, and exclude the Platform API, Bedrock and Vertex: the paths your agent fleet runs on, carrying most of the sensitive data.",
    'Anthropic 的推理钩子自 8 月 5 日起进入 beta，把你的 DLP 服务器放进每一条 Claude Enterprise 提示词的路径上——补上了网络代理十年来的一个缺口。但它只对提示词触发、只覆盖 Enterprise 界面，并排除 Platform API、Bedrock 与 Vertex：那正是你的智能体机群所走的路径，也承载着大部分敏感数据。',
  ),
  tags: ['governance', 'safety', 'guardrails', 'agentic-ai'],
};

export default post;
