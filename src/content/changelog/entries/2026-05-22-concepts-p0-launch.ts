import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-22',
  title: L(
    'Added P0 Concepts: prompt injection, guardrails, evals',
    '新增 P0 概念条目：提示词注入、护栏、评测',
  ),
  items: [
    L(
      'Three beginner-friendly Concepts mirrors of the deeper material under Operations and Evaluation — closes the launch-coherence gaps called out in the IA expansion backlog.',
      '三篇面向初学者的概念条目，对应 Operations 与 Evaluation 中的深度文章——填补了 IA 扩展规划中提到的"上线连贯性"缺口。',
    ),
    L(
      'Entries: prompt-injection-101 (Agentic AI), guardrails-101 and evals-101 (Building Blocks).',
      '条目：prompt-injection-101（智能体 AI）、guardrails-101 与 evals-101（基础构件）。',
    ),
  ],
};
export default entry;
