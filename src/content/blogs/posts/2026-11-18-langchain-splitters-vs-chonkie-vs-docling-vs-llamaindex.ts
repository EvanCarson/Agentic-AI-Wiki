import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-18',
  slug: 'langchain-splitters-vs-chonkie-vs-docling-vs-llamaindex',
  title: L(
    'LangChain splitters vs Chonkie vs Docling vs LlamaIndex: the chunker is a schema',
    'LangChain 切分器、Chonkie、Docling 与 LlamaIndex 对比：切分器是一份模式，不是一道预处理',
  ),
  searchTitle: {
    en: 'Chunking libraries compared: LangChain vs Chonkie vs Docling vs LlamaIndex',
  },
  summary: L(
    "langchain-text-splitters still defaults to 4,000 characters counted by len() — a unit no retriever uses. Pick the chunker whose unit is your embedding model's tokenizer, then pin it, because a boundary change silently invalidates every stored vector, citation offset and eval number you have.",
    'langchain-text-splitters 至今默认 4,000 个字符、由 len() 计数——而这个单位任何检索器都不用。请选择「以你的嵌入模型分词器为单位」的那个切分器，然后把它钉死：因为边界一变，你手上每一个已存向量、每一处引用偏移、每一个评测数字都会被悄无声息地作废。',
  ),
  tags: ['agent-comparison', 'rag', 'open-source', 'developer-tools'],
};

export default post;
