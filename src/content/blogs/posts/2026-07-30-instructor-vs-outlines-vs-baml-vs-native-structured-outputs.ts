import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-07-30',
  slug: 'instructor-vs-outlines-vs-baml-vs-native-structured-outputs',
  title: L(
    'Instructor vs Outlines vs BAML vs provider structured outputs: where the schema is enforced',
    'Instructor、Outlines、BAML 与厂商原生结构化输出：schema 到底在哪里被强制',
  ),
  summary: L(
    'These four are not four answers to one question — they enforce the schema at four different points: after generation, during it, around it, and upstream inside the vendor. Only two can guarantee parseable output, none can guarantee correct output, and a required field with no good answer turns abstention into a fabricated value.',
    '这四者不是同一个问题的四个答案——它们在四个不同的位置强制 schema：生成之后、生成之中、生成周围，以及上游的厂商内部。其中只有两个能保证输出可解析，没有一个能保证输出正确，而一个没有好答案的必填字段，会把弃答变成一个编造出来的值。',
  ),
  tags: ['agent-comparison', 'developer-tools', 'open-source', 'tooling'],
};

export default post;
