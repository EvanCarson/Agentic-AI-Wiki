import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-08',
  slug: 'claude-code-vs-codex-cli-vs-antigravity-cli-vs-opencode',
  title: L(
    'Claude Code vs Codex CLI vs Antigravity CLI vs opencode: pick the contract, not the score',
    'Claude Code vs Codex CLI vs Antigravity CLI vs opencode：挑契约，别挑分数',
  ),
  summary: L(
    'The top two terminal coding agents are 0.4 points apart on Terminal-Bench 2.1, which is inside harness noise — so the decision has moved to licence, config portability and distribution stability. Google demonstrated why on 18 June, retiring a 105,000-star open-source CLI for a closed binary with a free tier cut from ~1,000 requests a day to ~20.',
    '排名前二的终端编码智能体在 Terminal-Bench 2.1 上只差 0.4 分，落在外壳噪声以内——于是决策重心挪到了许可证、配置可移植性与分发稳定性上。6 月 18 日 Google 演示了原因：一个 10.5 万星的开源 CLI 被退役，换成闭源二进制，免费额度从每天约 1000 次请求砍到约 20 次。',
  ),
  tags: ['agent-comparison', 'coding-agents', 'developer-tools', 'open-source'],
};

export default post;
