import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-01',
  slug: 'marker-vs-markitdown-vs-mineru-vs-docling',
  title: L(
    'Marker vs MarkItDown vs MinerU vs Docling',
    'Marker、MarkItDown、MinerU、Docling',
  ),
  summary: L(
    'Four open-source document-to-Markdown converters, and the only published head-to-head among them sits in one of their own READMEs — topped by that vendor\'s paid hosted product. The tool with 4.7 times more stars than any rival publishes no accuracy number and explicitly disclaims fidelity. Choose on per-element provenance instead: a dropped table row and a reordered two-column page both produce clean Markdown, and no retrieval metric downstream will ever see them.',
    '四个开源的「文档转 Markdown」工具，而它们之间唯一公开的正面对比，就躺在其中一家自己的 README 里——榜首还是那家自己的付费托管产品。星数比任何对手都多出 4.7 倍的那个工具，不公布任何准确率数字，并且明确声明自己不保真。请改用「逐元素溯源」来选：少掉一行表格和被打乱顺序的双栏页面，产出的都是干净的 Markdown，而下游任何检索指标都永远看不见它们。',
  ),
  tags: ['agent-comparison', 'open-source', 'rag', 'developer-tools'],
};

export default post;
