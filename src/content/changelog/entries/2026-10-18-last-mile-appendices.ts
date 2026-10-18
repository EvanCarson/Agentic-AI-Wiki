import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-18',
  title: L('Last Mile is complete: six appendices add a case file, every template, a failure catalogue and sources',
           '《最后一公里》全书完成：六个附录补上案例档案、全部模板与失败目录'),
  items: [
    L('A, Case File: the ten strongest public cases, each with its evidence tier, what it proves and what it does not, plus the runners-up and what no public source covers.',
      '附录 A《案例档案》：十个最有力的公开案例，逐一标明证据等级、能证明什么、不能证明什么，另附次一级案例，以及公开资料尚未覆盖的空白。'),
    L('B, Templates: all 17 templates from the book, blank and ready to copy, each linked to its filled example.',
      '附录 B《模板》：书中全部 17 份模板的空白版，可直接复制，每份都链接到章节里的填写示例。'),
    L('C, Failure Modes: symptom, likely cause and what to do, gathered from every chapter\'s failure signals and grouped by phase.',
      '附录 C《失败模式》：汇总各章的失败信号，按阶段分组，列出症状、可能成因与对策。'),
    L('D, State of the Role: every dated fact on hiring, pay, employers, titles and loops in one place, with a map of the book\'s echoed numbers.',
      '附录 D《这个角色的现状》：把招聘、薪酬、雇主、头衔与面试流程等注明日期的事实集中在一处，并附全书“回声数字”地图。'),
    L('E and F, Glossary and Sources: every term defined once with its Chinese equivalent, and every source listed under the chapter that first cites it, with its tier.',
      '附录 E、F《术语表》《参考来源》：每个术语统一定义一次并给出中文译法；每个来源列在首次引用它的章节之下，并标明证据等级。'),
    L('Chapters now link to the appendices, including 26 links from case mentions to their Case File entries.',
      '各章现已链接到附录，其中 26 处案例提及链接到《案例档案》中的对应条目。'),
  ],
};

export default entry;
