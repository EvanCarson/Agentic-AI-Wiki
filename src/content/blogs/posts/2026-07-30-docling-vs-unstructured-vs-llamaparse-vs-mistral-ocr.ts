import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-07-30',
  slug: 'docling-vs-unstructured-vs-llamaparse-vs-mistral-ocr',
  title: L(
    'Docling vs Unstructured vs LlamaParse vs Mistral OCR: the parser decides your RAG ceiling',
    'Docling、Unstructured、LlamaParse 与 Mistral OCR：解析器决定了你 RAG 的上限',
  ),
  summary: L(
    'List prices for the same thousand pages run from nothing to about ninety dollars, a spread of two orders of magnitude — and the accuracy number everyone quotes is character-level, which is not the thing that breaks retrieval. Choose on structure fidelity and on where the compute runs.',
    '同样的一千页，标价从零一路到约九十美元，横跨两个数量级——而人人引用的那个准确率是字符级的，那并不是让检索崩掉的东西。按结构保真度、以及算力在哪里运行来选。',
  ),
  tags: ['agent-comparison', 'rag', 'open-source', 'developer-tools', 'cost'],
};

export default post;
