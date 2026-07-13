import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-13',
  title: L(
    'Field Guide: 4 new Frontier chapters + 1 Evaluate chapter (5 chapters total)',
    'Field Guide：新增 4 章"前沿"部分 + 1 章"评估"部分（共 5 章）',
  ),
  items: [
    L(
      'Added 4 chapters to Part V — Frontier: r2 Computer Use in Production, r3 MCP-Native Agent Building, r4 The Two-Layer Consensus, r5 Choosing Thinking Effort. Part V previously had only r1 What to Read.',
      '在第五部分"前沿"下新增 4 章：r2 生产中的计算机操作、r3 MCP 原生的智能体构建、r4 两层共识、r5 选择思考努力度。第五部分之前仅有 r1 延伸阅读。',
    ),
    L(
      'Added 1 chapter to Part III — Evaluate: e5 Evals as CI Gate. Extends the existing e1-e4 chain with the tiered eval-CI discipline (cheap graders in pre-commit, LLM judges in preview, monthly calibration).',
      '在第三部分"评估"下新增 1 章：e5 把评测做成 CI 门禁。承接 e1–e4 的既有链，加入分层评测 CI 纪律（预提交阶段的廉价打分器、预览阶段的 LLM 评判器、月度校准）。',
    ),
    L(
      "Cross-linked new chapters back from existing pages: Field Guide's x2 (computer use), f3 (tool use), e4 (benchmarks & CI), plus the mcp-architecture deep-dive — so readers on established chapters find the 2026 material.",
      '把新章节从既有页面反向链回：Field Guide 的 x2（计算机操作）、f3（工具调用）、e4（基准与 CI），以及 mcp-architecture 深入解析——让读者从既有章节也能找到 2026 年的新内容。',
    ),
    L(
      'This closes out the third and final track of the 2026-07 new-tech-pages slate — combined with PR #89 (MCP Deep-Dive group) and PR #90 (Deep-Dive additions), the 42-page slate ships as 42 pages.',
      '这一 PR 收束了 2026-07 新技术页面 slate 的第三条也是最后一条轨——加上 PR #89（MCP 深入解析分组）与 PR #90（深入解析新增），这份 42 页的 slate 以 42 页交付。',
    ),
  ],
};
export default entry;
