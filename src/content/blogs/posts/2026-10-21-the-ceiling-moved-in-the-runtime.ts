import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-21',
  slug: 'the-ceiling-moved-in-the-runtime',
  title: L(
    'The unattended ceiling went up 288x and the model did not change',
    '无人监督的上限涨了 288 倍，而模型没换',
  ),
  summary: L(
    "Notion raised the longest single unattended agent task from five minutes to more than 24 hours on 19 October 2026, and every mechanism it names is runtime engineering: a dedicated service with a queue-backed worker loop that survives restarts, condensed conversations, and large tool results set aside. A ceiling is not a success rate — the horizon you can sell is still your own 80% figure — and the same release replaced the bill with credits whose exchange rate is not published.",
    'Notion 在 2026 年 10 月 19 日把智能体处理单个任务的最长无人监督时长从 5 分钟提到 24 小时以上，而它点名的每一个机制都是运行时工程：专属服务上能扛住重启的队列驱动工作循环、被压缩的会话、被搁置的大体积工具返回结果。上限不是成功率——你能卖的时域仍然是你自己那个 80% 的数字——而同一次发布还把账单换成了一种不公布换算率的额度。',
  ),
  tags: ['agentic-ai', 'infrastructure', 'durable-execution', 'cost', 'agent-ux'],
};

export default post;
