import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-14',
  slug: 'cursor-projects-vs-codex-cloud-vs-claude-code-web-vs-jules',
  title: L(
    'Cursor Projects vs Codex cloud vs Claude Code on the web vs Jules: buy the meter',
    'Cursor Projects、Codex cloud、Claude Code on the web 与 Jules：该买的是那块表',
  ),
  searchTitle: {
    en: 'Cloud coding agents compared: the meter, not the model, decides how you use them',
  },
  summary: L(
    'Four cloud coding agents that look interchangeable on a feature table bill in four different shapes — a usage pool with overage, one allowance shared across every surface you use, a rate limit shared with the rest of your account, and hard task counts per tier — and each shape induces a specific, predictable misuse. Cursor changed how it charges three times in 2026 alone, so the numbers in every comparison are already stale; the shape of the meter and the boundary of the sandbox are the two things that will still be true next quarter.',
    '四个在功能表上看似可以互换的云端编码智能体，计费的形状有四种：一个带超额结算的用量池、一份跨你所有使用界面共享的额度、一条与你账户其余用量共用的速率上限，以及按档位给死的任务次数——而每一种形状都会诱发一种具体且可预测的误用。光是 2026 年，Cursor 就改过三次收费方式，所以任何对比里的数字都已经过期；下个季度仍然成立的，只有那块表的形状，和那个沙箱的边界。',
  ),
  tags: ['coding-agents', 'agent-comparison', 'developer-tools', 'cost', 'infrastructure'],
};

export default post;
