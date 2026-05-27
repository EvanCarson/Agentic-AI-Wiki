import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-27',
  title: L(
    'Retrieval & RAG: new deep-dive on choosing a vector database',
    '检索与 RAG：新增"选向量数据库"深入解析',
  ),
  items: [
    L(
      'Adds a constraint-first deep-dive for the most overdone decision in modern RAG engineering — what a vector DB actually is, the axes that genuinely differ between products, just enough ANN internals to read a vendor pitch, the landscape by category not brand, and a one-page selection procedure. Closes #66.',
      '为现代 RAG 工程中被过度操作的一项决策新增一份约束优先的深入解析——向量库到底是什么、产品之间真正不同的那些轴、读懂厂商话术所需的最少 ANN 内部知识、按品类（而非按品牌）看市场地图，以及一页纸的选型流程。关闭 #66。',
    ),
    L(
      'Bottom line: most teams end at Postgres + pgvector or OpenSearch (because they already run one), Pinecone/Turbopuffer (because they have no ops headcount), or Qdrant/Milvus/Weaviate (because they need the tuning surface). Pick category first; brand within a category is a taste-and-pricing question.',
      '结论：多数团队最终落在 Postgres + pgvector 或 OpenSearch（因为已在跑其中之一）、Pinecone/Turbopuffer（因为没有运维人头）、或 Qdrant/Milvus/Weaviate（因为需要调参面）。先选品类；品类内的品牌是口味与价格问题。',
    ),
  ],
};
export default entry;
