import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-03',
  slug: 'anthropic-moved-the-evidence-not-the-detector',
  title: L(
    'Anthropic moved the evidence, not the detector',
    'Anthropic 挪走的是证据，不是探测器',
  ),
  searchTitle: {
    en: 'Anthropic Enterprise Frontier Safeguards Explained',
  },
  summary: L(
    'Enterprise Frontier Safeguards, announced 1 September 2026, resolves a real contradiction: zero data retention forbids the history that cross-session misuse detection requires. Anthropic\'s fix is to keep the classifier and put the corpus in your own S3, Azure Blob or GCS bucket, under your keys — with alerts routing to you and human review yours by default. That is not only a privacy upgrade. It is a transfer of duty, and the artefact it creates is a discovery-visible record of your own employees\' prompts that nobody has written a retention rule for yet.',
    '2026 年 9 月 1 日发布的 Enterprise Frontier Safeguards，解开了一个真实的矛盾：零数据留存禁掉的，正是跨会话滥用检测所必需的历史。Anthropic 的解法是把分类器留在自己手里，把语料放进你自己的 S3、Azure Blob 或 GCS 存储桶、用你自己的密钥——告警发给你，人工复核默认也归你。这不只是一次隐私上的升级。这是一次义务的转移，而它造出来的那件产物，是一份关于你自己员工提示词的、在诉讼中可被调取的记录，而至今没有人给它写过留存规则。',
  ),
  tags: ['governance', 'safety', 'observability', 'agentic-ai', 'ecosystem'],
};

export default post;
