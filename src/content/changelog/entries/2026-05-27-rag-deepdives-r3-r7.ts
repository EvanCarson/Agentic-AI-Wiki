import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-27',
  title: L(
    'Retrieval & RAG: five new deep-dives (hybrid search, parsing, query understanding, agentic retrieval, evaluation)',
    '检索与 RAG：五篇新深入解析（混合检索、解析、查询理解、智能体式检索、评估）',
  ),
  items: [
    L(
      'Expanded the Retrieval & RAG deep-dive group from 2 to 7 entries, covering the gaps between the existing 101 concepts and the previously-published advanced-architectures and GraphRAG essays.',
      '把"检索与 RAG"深入解析栏目从 2 条扩展为 7 条，填补了既有 101 概念与已发布的进阶架构、GraphRAG 之间的空白。',
    ),
    L(
      'Hybrid Search & Reranking — why one retriever is not enough, reciprocal rank fusion across BM25 + dense, the two-stage retrieve-then-cross-encoder pattern, and when ColBERT-style late interaction pays.',
      '混合检索与重排序——为什么单一检索器不够、跨 BM25 + 稠密的倒数排名融合、"检索-再交叉编码器"两阶段模式，以及 ColBERT 式晚交互何时值得。',
    ),
    L(
      'Document Parsing & Ingestion Quality — the upstream bottleneck most teams underestimate: layout-aware parsing, tables, OCR, structural chunking, and vision-RAG (ColPali) as an escape hatch.',
      '文档解析与摄取质量——多数团队低估的上游瓶颈：布局感知解析、表格、OCR、结构化分块，以及作为逃生阀的视觉 RAG（ColPali）。',
    ),
    L(
      'Query Understanding & Transformation — the pre-retrieval lever set: rewriting, decomposition, multi-query, HyDE caveats, step-back prompting, and routing.',
      '查询理解与变换——检索前的杠杆集：改写、分解、多查询、HyDE 告诫、退一步提示，以及路由。',
    ),
    L(
      'Agentic Retrieval — search as a tool the model calls iteratively, with budget, stopping criteria, and the new failure modes (looping, drift, premature stop) that come with handing the model the steering wheel.',
      '智能体式检索——把搜索作为模型迭代调用的工具，配以预算、停止判据，以及把方向盘交给模型后随之而来的新失败模式（原地循环、漂移、过早停止）。',
    ),
    L(
      'Evaluating RAG — score retrieval, grounding, and answer quality as three separate things (recall@k, faithfulness, answer relevance), with a minimum viable eval recipe and the LLM-judge caveats.',
      '评估 RAG——把检索、接地与答案质量分开打分（recall@k、忠实性、答案相关性），附带最小可用评测配方与 LLM 裁判告诫。',
    ),
  ],
};
export default entry;
