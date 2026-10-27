import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-15',
  title: L(
    'Books section launched, with the plan for “From SDLC to AI-Driven SDLC”',
    '新增「书籍」板块，首本《从 SDLC 到 AI 驱动的 SDLC》写作计划上线',
  ),
  items: [
    L(
      'Books — a shelf at /books/ for long-form guides that are meant to be read in order, each one arguing a single case across many chapters and published part by part.',
      '书籍——位于 /books/ 的书架，收录需要按顺序阅读的长篇指南：每一本用许多章节论证同一件事，并逐部分发布。',
    ),
    L(
      'From SDLC to AI-Driven SDLC: A Migration Handbook — the landing page and full table of contents: Part I makes the case and defines a five-level maturity model across eight delivery phases, Part II takes the phases one at a time, Part III is the migration plan. Every chapter is marked coming soon; Part I is in research now.',
      '《从 SDLC 到 AI 驱动的 SDLC：一本迁移手册》——书的首页与完整目录：第一部分讲清理由，并定义一个横跨八个交付阶段的五级成熟度模型；第二部分逐个阶段展开；第三部分是迁移计划。所有章节目前都标为「即将推出」；第一部分正在调研中。',
    ),
    L(
      'Navigation — Books joins the top bar next to the Field Guide, and the Changelog moves to the footer, where it was already listed.',
      '导航——「书籍」加入顶部导航栏，紧挨实战指南；「更新日志」移到页脚（页脚中原本就有它）。',
    ),
  ],
  lines: ['bk'],
};

export default entry;
