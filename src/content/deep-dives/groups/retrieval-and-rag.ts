import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'retrieval-and-rag',
  order: 40,
  name: L('Retrieval & RAG', '检索与 RAG'),
  groupSummary: L('Retrieval-augmented generation past the basics — advanced architectures, graph RAG, retrieval as an agent tool, RAG security.', '检索增强生成的进阶——高级架构、图 RAG、把检索作为智能体工具、RAG 安全。'),
  entries: [
    { page: 'advanced-rag-architectures', slug: 'advanced-rag-architectures', title: L('Advanced RAG Architectures','进阶 RAG 架构'), summary: L('The naive→modular→agentic RAG spectrum and the levers that matter — CRAG, Self-RAG, query transformation, fusion, reranking — all attacking the same garbage-in/confident-wrong-out failure.','朴素→模块化→智能体式 RAG 谱系与关键杠杆——CRAG、Self-RAG、查询变换、融合、重排序——全都在攻击同一个“垃圾进、自信错出”的失败。') },
    { page: 'graph-rag', slug: 'graph-rag', title: L('GraphRAG & Multi-Hop Retrieval','GraphRAG 与多跳检索'), summary: L('Why flat top-k RAG cannot answer thematic or relational multi-hop queries, how Microsoft GraphRAG and iterative retrieve-reason loops solve it, and the cost/staleness heuristic for when not to.','为什么扁平 top-k RAG 回答不了主题型或关系型多跳查询，微软 GraphRAG 与迭代检索-推理循环如何解决，以及何时不该用的成本/陈旧化启发式。') },
    { page: 'hybrid-search-and-reranking', slug: 'hybrid-search-and-reranking', title: L('Hybrid Search & Reranking','混合检索与重排序'), summary: L('Why one retriever is structurally not enough, reciprocal rank fusion across BM25 + dense, the two-stage retrieve-then-cross-encoder pattern, and ColBERT-style late interaction when cross-encoders are too slow.','为什么单一检索器在结构上不够、跨 BM25 + 稠密的倒数排名融合、"检索-再交叉编码器"两阶段模式，以及交叉编码器太慢时 ColBERT 式晚交互的位置。') },
    { page: 'document-parsing-for-rag', slug: 'document-parsing-for-rag', title: L('Document Parsing & Ingestion Quality','文档解析与摄取质量'), summary: L('Ingestion is the half of RAG that doesn\'t get dashboards and decides whether the answer was ever indexable — layout-aware parsing, tables, OCR, structural chunking, and vision-RAG as a parsing escape hatch.','摄取是不被仪表盘照亮、却决定答案是否曾可被索引的那半 RAG——布局感知解析、表格、OCR、结构化分块，以及作为解析逃生阀的视觉 RAG。') },
    { page: 'query-understanding-for-rag', slug: 'query-understanding-for-rag', title: L('Query Understanding & Transformation','查询理解与变换'), summary: L('Fixing the question before you search — rewriting, decomposition, multi-query, HyDE caveats, step-back prompting, and routing — the cheapest place to add intelligence to a RAG pipeline.','在搜索之前先修好问题——改写、分解、多查询、HyDE 告诫、退一步提示、以及路由——给 RAG 流水线加智能最便宜的地方。') },
    { page: 'agentic-retrieval', slug: 'agentic-retrieval', title: L('Agentic Retrieval: Search as a Tool','智能体式检索：把搜索做成工具'), summary: L('Retrieval as a tool the model calls iteratively in a ReAct-style loop, with budget, stopping criteria, and the new failure modes (looping, drift, premature stop) that come with handing the model the steering wheel.','把检索做成模型在 ReAct 式循环中迭代调用的工具，带预算、停止判据，以及把方向盘交给模型后随之而来的新失败模式（原地循环、漂移、过早停止）。') },
    { page: 'evaluating-rag', slug: 'evaluating-rag', title: L('Evaluating RAG','评估 RAG'), summary: L('Score retrieval, grounding, and answer quality as three separate things — recall@k, faithfulness, answer relevance — plus how to build a small living eval set and use LLM judges without lying to yourself.','把检索、接地与答案质量当作三件独立的事来打分——recall@k、忠实性、答案相关性——加上如何构建一个持续生长的小评测集，以及在不自欺欺人前提下使用 LLM 裁判。') },
  ],
};
export default group;
