// Ordered structure for the Agentic AI Field Guide series.
// `page` is the legacy data-page id; `slug` is the public URL segment.
import type { Locale, Localized } from '../../i18n/index';

export interface Chapter {
  page: string;
  slug: string;
  num: string;
  title: Localized;
}
export interface Part {
  key: string;
  roman: string;
  name: Localized;
  chapters: Chapter[];
}

const L = (en: string, zh: string): Localized => ({ en, zh });

export const PARTS: Part[] = [
  { key: 'f', roman: '0', name: L('Foundations', '基础'), chapters: [
    { page: 'f1', slug: 'llm-mental-model', num: '01', title: L('LLM Mental Model', 'LLM 心智模型') },
    { page: 'f2', slug: 'prompts',          num: '02', title: L('Prompts', '提示词') },
    { page: 'f3', slug: 'tool-use',         num: '03', title: L('Tool Use', '工具调用') },
    { page: 'f4', slug: 'async-python',     num: '04', title: L('Async Python', '异步 Python') },
  ]},
  { key: 'b', roman: 'I', name: L('Build', '构建'), chapters: [
    { page: 'p1', slug: 'the-loop',         num: '01', title: L('The Loop', '主循环') },
    { page: 'p2', slug: 'retrieval',        num: '02', title: L('Retrieval', '检索') },
    { page: 'p3', slug: 'real-loop',        num: '03', title: L('Real Loop', '真实循环') },
    { page: 'p4', slug: 'first-eval-suite', num: '04', title: L('First Eval Suite', '第一套评估') },
  ]},
  { key: 's', roman: 'II', name: L('Ship', '交付'), chapters: [
    { page: 's1', slug: 'observability',    num: '01', title: L('Observability', '可观测性') },
    { page: 's2', slug: 'cost-and-latency', num: '02', title: L('Cost & Latency', '成本与延迟') },
    { page: 's3', slug: 'safety',           num: '03', title: L('Safety', '安全') },
    { page: 's4', slug: 'deployment',       num: '04', title: L('Deployment', '部署') },
  ]},
  { key: 'e', roman: 'III', name: L('Evaluate', '评估'), chapters: [
    { page: 'e1', slug: 'eval-driven-dev',  num: '01', title: L('Eval-Driven Dev', '评估驱动开发') },
    { page: 'e2', slug: 'three-layers',     num: '02', title: L('Three Layers', '三个层次') },
    { page: 'e3', slug: 'llm-as-judge',     num: '03', title: L('LLM-as-Judge', 'LLM 作为评判者') },
    { page: 'e4', slug: 'benchmarks-and-ci',num: '04', title: L('Benchmarks & CI', '基准与 CI') },
  ]},
  { key: 'x', roman: 'IV', name: L('Specialize', '专精'), chapters: [
    { page: 'x1', slug: 'code-agents',      num: '01', title: L('Code Agents', '代码智能体') },
    { page: 'x2', slug: 'computer-use',     num: '02', title: L('Computer Use', '计算机操作') },
    { page: 'x3', slug: 'research',         num: '03', title: L('Research', '研究') },
    { page: 'x4', slug: 'multi-agent',      num: '04', title: L('Multi-Agent', '多智能体') },
  ]},
  { key: 'r', roman: 'V', name: L('Frontier', '前沿'), chapters: [
    { page: 'r1', slug: 'what-to-read',     num: '01', title: L('What to Read', '延伸阅读') },
  ]},
];

export const CHAPTERS = PARTS.flatMap(p =>
  p.chapters.map(c => ({ ...c, partKey: p.key, partName: p.name, partRoman: p.roman }))
);

export type FlatChapter = (typeof CHAPTERS)[number];

export function chapterBySlug(slug: string): FlatChapter | undefined {
  return CHAPTERS.find(c => c.slug === slug);
}

/** Localized chapter title. */
export function chapterTitle(c: { title: Localized }, locale: Locale): string {
  return c.title[locale];
}
// Accepts a Part ({name}) or a flattened CHAPTERS entry ({partName}); the flatMap renames name->partName.
/** Localized part name. */
export function partName(p: { name: Localized } | { partName: Localized }, locale: Locale): string {
  return 'name' in p ? p.name[locale] : p.partName[locale];
}
