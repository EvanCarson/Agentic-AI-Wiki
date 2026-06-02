import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-01',
  slug: 'pgvector-vs-pinecone-vs-weaviate-vs-qdrant',
  title: L(
    'pgvector vs Pinecone vs Weaviate vs Qdrant: Where the Index Sits Decides Everything',
    'pgvector、Pinecone、Weaviate 与 Qdrant：索引放在哪里，决定了一切',
  ),
  summary: L(
    'Four vector stores, four nearly identical feature lists — ANN, filters, hybrid search, all of it. The thing that actually decides which one survives the agentic-RAG stack at scale is invisible there: where the index sits relative to your primary data.',
    '四款向量库，四份几乎一致的功能清单——ANN、过滤、混合检索，一个不落。真正决定谁能在生产环境的智能体 RAG 栈中扛下去的那一点，在功能清单上根本看不见：索引相对于你主数据所在的位置。',
  ),
  tags: ['agent-comparison', 'rag', 'vector-databases', 'infrastructure'],
};

export default post;
