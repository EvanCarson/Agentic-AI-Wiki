import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-06-09',
  title: L(
    'New AI Blog post: four coding-agent token trackers compared',
    'AI 博客新文章：四款编码 Agent token 跟踪器对比',
  ),
  items: [
    L(
      'Added "ccusage vs codex-usage-tracker vs CodeBurn vs LiteLLM proxy" — a diagram-driven comparison organized around the telemetry trail each coding agent leaves behind: ccusage parses Claude Code and Codex JSONL, codex-usage-tracker indexes Codex token-count events behind an MCP surface, CodeBurn reads 25 agents’ on-disk stores, and a LiteLLM proxy meters live API traffic for Aider and anything else you point at it.',
      '新增《ccusage、codex-usage-tracker、CodeBurn 与 LiteLLM proxy》——一篇围绕「每个编码 Agent 留下的遥测轨迹」展开的图解对比：ccusage 解析 Claude Code 与 Codex 的 JSONL，codex-usage-tracker 把 Codex 的 token 计数事件索引进 SQLite 并以 MCP 形式暴露，CodeBurn 直接读取 25 款 Agent 的本地存储，而 LiteLLM proxy 则为 Aider 以及任何你指向它的客户端计量实时 API 流量。',
    ),
    L(
      'Adds a per-agent "how to actually save tokens" section (prompt-cache hits, model routing, context resets) and a decision table for picking a tracker by the agent you run — plus current notes that Cursor now bills against a token-based dollar pool rather than per request, and that Aider does leave a (prose) trail on disk.',
      '附带一节按 Agent 拆分的「如何真正省下 token」（命中 prompt 缓存、模型路由、重置上下文），以及一张「按你所用 Agent 选跟踪器」的决策表；并更新两点现状：Cursor 现已改为按「美元额度池 + token 计费」结算，而非按请求计费；Aider 其实也会在磁盘上留下轨迹（只是纯文本，而非结构化用量账本）。',
    ),
    L(
      'New tags: cost, tooling.',
      '新增标签：cost、tooling。',
    ),
  ],
};

export default entry;
