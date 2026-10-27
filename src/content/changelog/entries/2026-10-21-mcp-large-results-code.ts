import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-21',
  title: L(
    'Large MCP results in code: before and after, a library evaluation, and less overlap between pages',
    '代码里的 MCP 大结果：改造前后、选库评估，以及更少的页面重复',
  ),
  items: [
    L(
      'New Deep-Dive, Large MCP Results in Code (C14): one tool fixed step by step against 30 real pull requests, from 187,521 tokens to 5,379, on mcp 2.3.0, @modelcontextprotocol/server 2.3.1 and fastmcp 4.1.3. Every block was run: projection, a token-budgeted page with a query-bound cursor, five contract tests, a middleware ceiling, a fastmcp proxy, an Agent SDK hook, and measured comparisons of tokenizers and output formats.',
      '新深入解析「代码里的 MCP 大结果」（C14）：在 mcp 2.3.0、@modelcontextprotocol/server 2.3.1 与 fastmcp 4.1.3 上，对着 30 个真实拉取请求把一个工具一步步改造，从 187,521 个 token 降到 5,379 个。每一段代码都实际跑过：字段投影、带查询绑定游标的 token 预算分页、五条契约测试、中间件上限、fastmcp 代理、Agent SDK 钩子，以及分词器与输出格式的实测对比。',
    ),
    L(
      'Removed overlap between the GitHub case study, the C13 pagination deep-dive and the O34 runbook: each now keeps one angle (the story, the protocol design, the host operator), the host-limit list lives only in O34, and the others link to it.',
      '消除了 GitHub 案例、C13 分页深入解析与 O34 运行手册之间的重复：三页各守一个角度（故事、协议设计、宿主运维），宿主限制清单只保留在 O34，其余页面改为链接过去。',
    ),
  ],
  lines: ['dd', 'op', 'bl'],
};

export default entry;
