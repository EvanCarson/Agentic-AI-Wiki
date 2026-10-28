import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-20',
  title: L(
    'Large MCP results: a GitHub case study, a pagination deep-dive and a context-overload runbook',
    '大体积 MCP 结果：一篇 GitHub 案例、一篇分页深入解析和一份上下文过载运行手册',
  ),
  items: [
    L(
      'AI Blog: "GitHub\'s MCP server paginated from day one and still overflowed the context window" traces why: pagination bounds how many records come back, not how big they are, and 30 pull requests came to 508KB. Projection fixed it each time (−93% per project item), and Datadog reached the same rule from the logs side: end the page on a token budget.',
      'AI 博客：《GitHub 的 MCP 服务器一开始就分页，上下文窗口照样被撑爆》追溯了原因：分页限制的是返回多少条记录，而不是每条有多大，30 个拉取请求就有 508KB。每次奏效的都是字段投影（每个项目条目 −93%），Datadog 也从日志一侧得出同一条规则：按 token 预算结束一页。',
    ),
    L(
      'New Deep-Dive, Large Results & Pagination in MCP (C13): the protocol paginates the four list methods but not tools/call, so the same oversized result is spilled to a file, truncated or capped depending on the host. The contract has to live in the tool\'s arguments: an opaque cursor, a token budget, an in-band truncated flag, and output that stays greppable after a host saves it to disk.',
      '新深入解析「MCP 中的大结果与分页」（C13）：协议给四个 list 方法分页，却不给 tools/call 分页，于是同一个超大结果，换个宿主就可能被落盘、被截断或被卡在上限。契约只能写进工具参数里：不透明游标、token 预算、带内的 truncated 标记，以及被宿主落盘后仍能 grep 的输出。',
    ),
    L(
      'New Operations page, When MCP Results Overload the Context (O34): for servers you do not own, measure result size per tool against your largest account, set per-tool ceilings in Claude Code, Codex and Gemini CLI, test the overflow round trip using the public Notion, Atlassian and VS Code failures, and treat clearing, compaction and code execution as moving the cost, not removing it.',
      '新运维页「当 MCP 结果撑爆上下文」（O34）：面对不归你管的服务器，用最大的账户按工具测量结果大小，在 Claude Code、Codex 与 Gemini CLI 中按工具设上限，以 Notion、Atlassian 与 VS Code 的公开故障为用例测试溢出往返，并把清理、压缩与代码执行看作挪走成本，而不是消除成本。',
    ),
    L(
      'Linked Shaping Tool Results and Designing MCP Tools to the new pagination deep-dive.',
      '为「塑形工具返回值」与「设计 MCP 工具」两页添加了指向新分页深入解析的链接。',
    ),
  ],
  lines: ['dd', 'op', 'bl'],
};

export default entry;
