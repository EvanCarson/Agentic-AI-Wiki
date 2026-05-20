import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-18',
  title: L('RAG coverage expansion', '扩充 RAG 相关内容'),
  items: [
    L('New advanced Deep-Dives: Advanced RAG Architectures, GraphRAG & Multi-Hop Retrieval, and RAG Pipeline Security — under a new "Retrieval & RAG" group.',
      '新增进阶「深度剖析」：进阶 RAG 架构、GraphRAG 与多跳检索、RAG 管道安全 — 归入新的「检索与 RAG」分组。'),
    L('Refreshed the Concepts "what is RAG" entry to the current long-context-vs-RAG routing consensus.',
      '更新「概念」中的「什么是 RAG」词条，采用当前关于长上下文与 RAG 路由取舍的共识。'),
    L('Field Guide updates: RAGAS evaluation vocabulary in the eval chapter; parent-document and late chunking in the retrieval chapter.',
      '实战指南更新：评估章节加入 RAGAS 评测术语；检索章节加入父文档与延迟分块。'),
  ],
};
export default entry;
