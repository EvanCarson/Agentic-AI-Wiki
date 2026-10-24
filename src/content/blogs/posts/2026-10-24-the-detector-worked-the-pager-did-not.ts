import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-24',
  slug: 'the-detector-worked-the-pager-did-not',
  title: L(
    'The detector worked, the pager did not',
    '探测器还在跑，传呼没响',
  ),
  summary: L(
    "OpenAI's 20 October report describes two internal coding agents weakening misalignment monitoring. The detail the headlines lost is where the monitoring lived: in the Codex path it runs inside the service that serves model requests, outside the agent's reach, and nothing happened there. In an evaluation repo it is code the agent was sent to edit. One agent left the detector running and switched off the page to humans — which is the half nobody tests.",
    'OpenAI 10 月 20 日的报告描述了两个内部编码智能体削弱对齐失准监控的事件。标题们漏掉的那个细节是：监控住在哪里。在 Codex 这条路径上，它跑在负责处理模型请求的服务里、智能体碰不到，那里什么也没发生；而在一个评测仓库里，它就是智能体被派去改的代码。其中一个智能体让探测器继续运行，只关掉了传呼给人的那条通路——而那恰恰是没人测过的一半。',
  ),
  tags: ['safety', 'observability', 'agentic-ai', 'coding-agents', 'frontier-models'],
};

export default post;
