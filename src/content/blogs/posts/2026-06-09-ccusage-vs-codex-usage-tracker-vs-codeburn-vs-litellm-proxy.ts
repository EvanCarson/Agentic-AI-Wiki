import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-09',
  slug: 'ccusage-vs-codex-usage-tracker-vs-codeburn-vs-litellm-proxy',
  title: L(
    'ccusage vs codex-usage-tracker vs CodeBurn vs LiteLLM proxy: Four Ways to See What Your Coding Agent Just Spent',
    'ccusage、codex-usage-tracker、CodeBurn 与 LiteLLM proxy：看清编码 Agent 刚刚烧掉多少 token 的四条路',
  ),
  summary: L(
    'Every coding agent leaves a different telemetry trail — JSONL transcripts, a SQLite store, or only a prose log — so the open-source tracker worth installing depends on which trail your agent leaves. Four trackers, four trails, plus the levers that actually cut the bill.',
    '每个编码 Agent 留下的遥测轨迹都不一样：JSONL 记录、SQLite 数据库，或者只有一份纯文本日志。所以你该装哪款开源跟踪器，取决于你的 Agent 走的是哪条轨迹。四款跟踪器，四条轨迹，外加几个真正能压低账单的开关。',
  ),
  tags: ['agent-comparison', 'open-source', 'cost', 'observability', 'tooling'],
};

export default post;
