import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-26',
  title: L(
    'Local knowledge bases: five new pages on building retrieval you own — starting with whether you need an index at all',
    '本地知识库：五个新页面讲清如何搭建归你所有的检索——先从"你到底需不需要索引"讲起',
  ),
  items: [
    L(
      'A new AI Blog comparison, "LanceDB vs Chroma vs sqlite-vec vs FAISS", covering the four local vector stores as four different architectures rather than four competing products: a search library with no storage, a SQLite extension, an embedded engine with a write-ahead log, and a columnar format read from disk. Eight themed diagrams, a capability matrix, and a decision table that also names the cases where the right answer is none of them.',
      'AI 博客新增对比文章《LanceDB、Chroma、sqlite-vec 与 FAISS》，把这四种本地向量存储当作四种不同的架构而非四个互相竞争的产品来讲：一个不带存储的搜索库、一个 SQLite 扩展、一个带预写日志的嵌入式引擎，以及一种从磁盘读取的列式格式。配有八张主题化图示、一张能力矩阵，以及一张会明说"哪些情况下正确答案是一个都不选"的选型表。',
    ),
    L(
      'A new Deep-Dive, "Local-first retrieval", walks the whole build on hardware you own: why ingest quality caps everything downstream, how to size the machine from embedding-model memory and vector count, the four store architectures, hybrid retrieval with a local reranker, exposing the knowledge base to an agent over MCP without widening your attack surface, and when to run a finished platform such as RAGFlow, AnythingLLM or Onyx instead of assembling one.',
      '深入解析新增《本地优先检索》，把在自有硬件上的整套搭建走了一遍：为什么摄取质量为下游一切设定上限、如何从嵌入模型内存与向量数量推算机器规格、四种存储架构、配本地重排序器的混合检索、如何通过 MCP 把知识库交给智能体而不扩大攻击面，以及什么时候该直接跑 RAGFlow、AnythingLLM 或 Onyx 这类成品平台而不是自己拼装。',
    ),
    L(
      'Three new Concepts entries take the encyclopedia to 53. "Local knowledge bases" separates the three dials people conflate when they say "local RAG" — where documents sit, where embeddings are computed, where generation happens. "Knowledge graphs" explains what a graph answers that top-k retrieval structurally cannot. "Small & local models" reframes the question from "can a small model match a frontier one" to "which jobs never needed one".',
      '概念百科新增三条，总数达到 53 条。《本地知识库》拆开了人们说"本地 RAG"时混为一谈的三个旋钮——文档存在哪、嵌入在哪算、生成在哪发生。《知识图谱》讲清了图谱能回答而 top-k 检索在结构上答不了的那类问题。《小模型与本地模型》把问题从"小模型能否追平前沿模型"改写成"哪些活儿本来就用不着前沿模型"。',
    ),
    L(
      'All five pages lead with the same uncomfortable finding, because it changed our own recommendation: the leading coding agents removed their vector indexes. Claude Code shipped one, deleted it, and retrieves with grep; Cursor and Codex do the same. A May 2026 PwC paper measured it across 116 questions and found lexical search won uniformly when results were injected inline — but the ordering reversed on half the configurations when results were written to files instead, which is why the guidance here is about matching the retriever to the corpus rather than picking a winner.',
      '这五个页面都以同一个令人不适的发现开场，因为它改变了我们自己的建议：领先的编程智能体把向量索引拿掉了。Claude Code 曾经带过一个，后来删掉，改用 grep 检索；Cursor 与 Codex 也一样。普华永道 2026 年 5 月的一篇论文在 116 道题目上做了测量，发现当结果被内联注入时词法检索一致胜出——但当结果改为写入文件时，一半的配置上排序发生了反转。这正是本站给出的建议着眼于"让检索器匹配语料"、而不是评出一个赢家的原因。',
    ),
  ],
};
export default entry;
