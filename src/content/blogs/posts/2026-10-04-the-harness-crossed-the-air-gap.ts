import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-04',
  slug: 'the-harness-crossed-the-air-gap',
  title: L(
    'The harness crossed the air gap; the model did not',
    '外壳越过了气隙，模型没有',
  ),
  summary: L(
    'IBM made self-hosted Bob generally available on 1 October 2026 for on-premises, private-cloud, sovereign-cloud and air-gapped environments, with the shell, parallel tool calling, skills and modes intact. The models supported on customer-managed infrastructure are NVIDIA Nemotron and Poolside Laguna — not the hosted Claude, Gemini and GPT options. The feature list ports; the behaviour has to be re-earned, which makes a sovereignty migration an eval migration wearing infrastructure clothes.',
    'IBM 在 2026 年 10 月 1 日让自托管版 Bob 正式可用，面向本地、私有云、主权云与气隙环境，shell、并行工具调用、技能与模式完整保留。而受支持运行在客户自管基础设施上的模型是 NVIDIA Nemotron 与 Poolside Laguna——不是托管版的 Claude、Gemini 与 GPT 选项。功能清单能移植；行为得重新挣回来，这使得一次主权迁移成了一次披着基础设施外衣的评测迁移。',
  ),
  tags: ['agentic-ai', 'coding-agents', 'infrastructure', 'governance', 'self-hosted'],
};

export default post;
