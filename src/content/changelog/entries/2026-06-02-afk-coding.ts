import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-06-02',
  title: L(
    'New AI Blog post: AFK coding',
    '新增 AI Blog 文章：AFK 编程',
  ),
  items: [
    L(
      'New AI Blog post — AFK coding: a six-phase pipeline that splits judgment (spec, review) from execution (vertical slices, Ralph loop, refactor, agentic QA). Three new diagrams (hero pipeline, vertical-vs-horizontal slicing, Ralph cycle), an FAQ, bilingual en/zh, cross-links into concepts / field-guide / deep-dives / the coding-agent comparison post.',
      '新增 AI Blog 文章——AFK 编程：用一条六阶段流水线，把判断（规格、评审）和执行（纵向切片、Ralph 循环、重构、Agentic QA）拆到两端。配三张全新示意图（六阶段流水线、纵向 vs 横向切片对比、Ralph 循环），一组常见问答，中英双语，并交叉链接到概念、Field Guide、深入解析与编码智能体对比文章。',
    ),
  ],
};

export default entry;
