import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-19',
  title: L('Cross-page links between related topics', '相关主题之间的跨页链接'),
  items: [
    L('Added inline cross-reference links inside Concepts and Deep-Dives pages so a reader who hits a term — RAG, the agent loop, embeddings, tool calling, prompt injection — can jump straight to the page that explains it, in the same language.',
      '在「概念」与「深度剖析」页面中加入行内交叉引用链接，让读者读到某个术语——RAG、智能体循环、嵌入、工具调用、提示词注入——时，可直接跳转到讲解该术语的页面，且保持同一语言。'),
    L('Links are restrained: only the first natural mention per page, only when a strong target exists, with a subtle accent underline that stays out of the way of reading.',
      '链接力求克制：每页仅链接首个自然出现处，且仅在存在明确目标页时才链接，采用低调的强调色下划线，不干扰阅读。'),
    L('Proposed a site-wide navigation/information-architecture plan (grouping, "start here" path, related-pages and concepts↔deep-dives mapping) for review as a follow-up.',
      '提出一份全站导航/信息架构方案（分组、「从这里开始」路径、相关页面与概念↔深度剖析映射），作为后续工作待评审。'),
  ],
};
export default entry;
