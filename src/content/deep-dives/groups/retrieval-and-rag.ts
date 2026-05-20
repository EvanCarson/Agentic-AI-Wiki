import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'retrieval-and-rag',
  order: 40,
  name: L('Retrieval & RAG', '检索与 RAG'),
  groupSummary: L('Retrieval-augmented generation past the basics — advanced architectures, graph RAG, retrieval as an agent tool, RAG security.', '检索增强生成的进阶——高级架构、图 RAG、把检索作为智能体工具、RAG 安全。'),
  entries: [
    { page: 'advanced-rag-architectures', slug: 'advanced-rag-architectures', title: L('Advanced RAG Architectures','进阶 RAG 架构'), summary: L('The naive→modular→agentic RAG spectrum and the levers that matter — CRAG, Self-RAG, query transformation, fusion, reranking — all attacking the same garbage-in/confident-wrong-out failure.','朴素→模块化→智能体式 RAG 谱系与关键杠杆——CRAG、Self-RAG、查询变换、融合、重排序——全都在攻击同一个“垃圾进、自信错出”的失败。') },
    { page: 'graph-rag', slug: 'graph-rag', title: L('GraphRAG & Multi-Hop Retrieval','GraphRAG 与多跳检索'), summary: L('Why flat top-k RAG cannot answer thematic or relational multi-hop queries, how Microsoft GraphRAG and iterative retrieve-reason loops solve it, and the cost/staleness heuristic for when not to.','为什么扁平 top-k RAG 回答不了主题型或关系型多跳查询，微软 GraphRAG 与迭代检索-推理循环如何解决，以及何时不该用的成本/陈旧化启发式。') },
  ],
};
export default group;
