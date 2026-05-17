// Ordered structure for the Agentic AI Field Guide series.
// `page` is the legacy data-page id; `slug` is the public URL segment.
export interface Chapter {
  page: string;   // legacy data-page id, e.g. "f1"
  slug: string;   // URL slug, e.g. "llm-mental-model"
  num: string;    // chapter number within part, e.g. "01"
  title: string;
}
export interface Part {
  key: string;    // legacy part key
  roman: string;  // "0", "I", ...
  name: string;
  chapters: Chapter[];
}

export const PARTS: Part[] = [
  { key: 'f', roman: '0', name: 'Foundations', chapters: [
    { page: 'f1', slug: 'llm-mental-model', num: '01', title: 'LLM Mental Model' },
    { page: 'f2', slug: 'prompts',          num: '02', title: 'Prompts' },
    { page: 'f3', slug: 'tool-use',         num: '03', title: 'Tool Use' },
    { page: 'f4', slug: 'async-python',     num: '04', title: 'Async Python' },
  ]},
  { key: 'b', roman: 'I', name: 'Build', chapters: [
    { page: 'p1', slug: 'the-loop',         num: '01', title: 'The Loop' },
    { page: 'p2', slug: 'retrieval',        num: '02', title: 'Retrieval' },
    { page: 'p3', slug: 'real-loop',        num: '03', title: 'Real Loop' },
    { page: 'p4', slug: 'first-eval-suite', num: '04', title: 'First Eval Suite' },
  ]},
  { key: 's', roman: 'II', name: 'Ship', chapters: [
    { page: 's1', slug: 'observability',    num: '01', title: 'Observability' },
    { page: 's2', slug: 'cost-and-latency', num: '02', title: 'Cost & Latency' },
    { page: 's3', slug: 'safety',           num: '03', title: 'Safety' },
    { page: 's4', slug: 'deployment',       num: '04', title: 'Deployment' },
  ]},
  { key: 'e', roman: 'III', name: 'Evaluate', chapters: [
    { page: 'e1', slug: 'eval-driven-dev',  num: '01', title: 'Eval-Driven Dev' },
    { page: 'e2', slug: 'three-layers',     num: '02', title: 'Three Layers' },
    { page: 'e3', slug: 'llm-as-judge',     num: '03', title: 'LLM-as-Judge' },
    { page: 'e4', slug: 'benchmarks-and-ci',num: '04', title: 'Benchmarks & CI' },
  ]},
  { key: 'x', roman: 'IV', name: 'Specialize', chapters: [
    { page: 'x1', slug: 'code-agents',      num: '01', title: 'Code Agents' },
    { page: 'x2', slug: 'computer-use',     num: '02', title: 'Computer Use' },
    { page: 'x3', slug: 'research',         num: '03', title: 'Research' },
    { page: 'x4', slug: 'multi-agent',      num: '04', title: 'Multi-Agent' },
  ]},
  { key: 'r', roman: 'V', name: 'Frontier', chapters: [
    { page: 'r1', slug: 'what-to-read',     num: '01', title: 'What to Read' },
  ]},
];

export const CHAPTERS = PARTS.flatMap(p =>
  p.chapters.map(c => ({ ...c, partKey: p.key, partName: p.name, partRoman: p.roman }))
);

export type FlatChapter = (typeof CHAPTERS)[number];

export function chapterBySlug(slug: string): FlatChapter | undefined {
  return CHAPTERS.find(c => c.slug === slug);
}
