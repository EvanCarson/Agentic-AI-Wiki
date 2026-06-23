import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-22',
  slug: 'temporal-vs-inngest-vs-restate-vs-cloudflare-workflows',
  title: L(
    'Temporal vs Inngest vs Restate vs Cloudflare Workflows: Four Bets on Keeping Your Agent Alive for 30 Minutes',
    'Temporal、Inngest、Restate 与 Cloudflare Workflows：让智能体活过 30 分钟的四种下注方式',
  ),
  summary: L(
    'Naive agent loops die on minute 29 of a 30-minute job. Durable-execution engines journal every step so the next process can pick up exactly where the previous one died — and 2026 was the year hyperscalers shipped their own. Four engines now compete on the same primitive, with very different architectures and bills.',
    '朴素的智能体循环在 30 分钟作业的第 29 分钟死掉。持久化执行引擎会把每一步记录到日志，下一个进程就能从上次中断的位置接着干——而 2026 正是各家超大规模云厂商也下场推出自家产品的年份。四款引擎围绕同一个原语竞争，但架构与账单差得很远。',
  ),
  tags: ['agent-comparison', 'infrastructure', 'orchestration', 'durable-execution'],
};

export default post;
