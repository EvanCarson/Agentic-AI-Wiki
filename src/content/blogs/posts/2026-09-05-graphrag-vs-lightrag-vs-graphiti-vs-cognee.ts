import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-05',
  slug: 'graphrag-vs-lightrag-vs-graphiti-vs-cognee',
  title: L(
    'GraphRAG vs LightRAG vs Graphiti vs Cognee: choose by write pattern',
    'GraphRAG、LightRAG、Graphiti 与 Cognee：按写入模式来选',
  ),
  summary: L(
    'The retrieval quality gap between these four is far smaller than the gap in what an update costs, so the real decision is whether your graph is built once, appended to, or continuously mutated. And all four dedupe entities by string matching, which is the failure nobody\'s benchmark catches.',
    '这四者之间检索质量的差距，远小于「一次更新要花多少钱」的差距，所以真正的决定是：你的图是一次建成、只做追加，还是被持续改写。而且四者都用字符串匹配去重实体——这正是没有哪份基准抓得住的那个失败。',
  ),
  tags: ['agent-comparison', 'rag', 'open-source', 'memory', 'infrastructure'],
};

export default post;
