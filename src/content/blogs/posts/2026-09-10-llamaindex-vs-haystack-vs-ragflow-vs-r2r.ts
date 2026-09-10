import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-10',
  slug: 'llamaindex-vs-haystack-vs-ragflow-vs-r2r',
  title: L(
    'LlamaIndex vs Haystack vs RAGFlow vs R2R',
    'LlamaIndex、Haystack、RAGFlow 与 R2R',
  ),
  searchTitle: {
    en: 'RAG frameworks in 2026: a library in your process or a second production system',
  },
  summary: L(
    'All four do hybrid search, graphs and agentic retrieval, so the feature table decides nothing. Two things do: whether the framework runs inside your process or arrives as a second production system with its own database, users and on-call — and where the document-parsing boundary sits, because that is what decides whether your best-quality path is open source, a per-page bill, or an integration you own. Pick the posture; the features converged eighteen months ago.',
    '四个项目都有混合检索、图谱与智能体式检索，所以功能对照表什么也定不了。真正起决定作用的是两件事：这套框架是跑在你自己的进程里，还是作为一套自带数据库、自带用户体系与自带值班表的第二生产系统抵达；以及文档解析的边界落在哪里——因为正是它决定了你那条质量最高的路径是开源的、是按页计费的，还是一份你自己扛的集成工作。选姿态；功能在一年半以前就已经趋同了。',
  ),
  tags: ['agent-comparison', 'rag', 'open-source', 'infrastructure'],
};

export default post;
