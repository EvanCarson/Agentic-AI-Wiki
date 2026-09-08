import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-08',
  slug: 'iso-42001-vs-nist-ai-rmf-vs-eu-ai-act-vs-aiuc-1',
  title: L(
    'ISO 42001 vs NIST AI RMF vs the EU AI Act vs AIUC-1',
    'ISO 42001 vs NIST AI RMF vs 欧盟《AI 法案》vs AIUC-1',
  ),
  searchTitle: { en: 'AI governance frameworks compared: what each one proves' },
  summary: L(
    'Buyers ask for all four as if they were grades of one exam. They are four objects with four recipients — and an ISO/IEC 42001 certificate buys no presumption of conformity with the EU AI Act, because the harmonised standard for Article 17 is EN 18286:2026, uncited in the Official Journal as of mid-August 2026. Underneath, the evidence overlaps: build the core once, certify last, and note that only AIUC-1 was written for agents at all.',
    '买方把四者当作同一场考试的四个等级来索要。它们是四种东西、四种接收方——而一份 ISO/IEC 42001 证书买不到对欧盟《AI 法案》的合规推定，因为第 17 条的协调标准是 EN 18286:2026，截至 2026 年 8 月中旬尚未被《欧盟官方公报》引用。而在底下，证据是重叠的：内核只建一次、认证放到最后，并且注意到四者中只有 AIUC-1 是真正为智能体写的。',
  ),
  tags: ['governance', 'regulation', 'agent-comparison', 'safety'],
};

export default post;
