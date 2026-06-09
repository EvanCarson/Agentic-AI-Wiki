import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-06-09',
  title: L(
    'Cross-links between the four trading + open-weights posts',
    '四篇交易与开源权重文章之间的交叉链接',
  ),
  items: [
    L(
      'Cross-linked the four adjacent posts so the trading-stack landscape, the agentic-research deep dive, the RL-trading-framework comparison, and the open-weights flagship comparison each surface the others from their "Further reading" lists — making the LLM-and-RL split of the agentic trading stack legible as a set rather than four isolated essays. Bilingual en/zh, content-only edits, no SVG or layout changes.',
      '在四篇相邻文章的「延伸阅读」里互相加上链接：交易栈整图、智能体研究深入解析、RL 交易框架对比，以及开源权重旗舰对比——让「智能体交易栈如何在 LLM 与 RL 之间切分」这件事，作为一个组合而不是四篇孤立文章呈现出来。中英双语，仅改动正文，未动 SVG 与版式。',
    ),
  ],
};

export default entry;
