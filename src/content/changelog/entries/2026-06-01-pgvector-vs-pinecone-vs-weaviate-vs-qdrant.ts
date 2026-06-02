import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-06-01',
  title: L(
    'New AI Blog post: four vector stores for agentic RAG, compared',
    'AI 博客新文章：面向智能体 RAG 的四款向量库对比',
  ),
  items: [
    L(
      'Added "pgvector vs Pinecone vs Weaviate vs Qdrant" — a diagram-driven comparison built around the one question the feature lists hide: where does the index sit relative to your primary data?',
      '新增《pgvector、Pinecone、Weaviate 与 Qdrant》——围绕功能清单掩盖的那个问题展开的图解对比：索引相对于你主数据所在的位置究竟在哪儿？',
    ),
    L(
      'New tags: rag, vector-databases, infrastructure.',
      '新增标签：rag、vector-databases、infrastructure。',
    ),
  ],
};
export default entry;
