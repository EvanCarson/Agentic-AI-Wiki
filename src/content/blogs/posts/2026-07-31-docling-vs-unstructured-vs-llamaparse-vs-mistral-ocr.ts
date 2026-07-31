import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-07-31',
  slug: 'docling-vs-unstructured-vs-llamaparse-vs-mistral-ocr',
  title: L(
    'Docling vs Unstructured vs LlamaParse vs Mistral OCR: Stop Choosing a Parser on Accuracy',
    'Docling、Unstructured、LlamaParse 与 Mistral OCR：别再按准确率挑解析器',
  ),
  summary: L(
    'Every document-parser comparison is published as an accuracy leaderboard, and accuracy is the axis that transfers worst to your documents. Two things do transfer: a layout pipeline can drop a number but cannot invent one, and the cost curves of self-hosted and hosted parsing cross at a volume you can compute in five minutes.',
    '每一份文档解析器对比都以准确率排行榜的形式发布，而准确率恰恰是最难迁移到你自己文档上的那个维度。真正能迁移的有两件事：版面流水线会漏掉一个数字，但结构上编不出一个数字；以及自建与托管两条成本曲线，会在一个你五分钟就能算出来的量级上相交。',
  ),
  tags: ['agent-comparison', 'rag', 'open-source', 'self-hosted', 'cost'],
};

export default post;
