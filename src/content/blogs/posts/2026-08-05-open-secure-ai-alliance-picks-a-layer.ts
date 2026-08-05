import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-05',
  slug: 'open-secure-ai-alliance-picks-a-layer',
  title: L(
    'Agent Security Just Picked a Layer, and It Is the One You Own',
    '智能体安全刚刚选定了一层，而那一层归你所有',
  ),
  summary: L(
    'NVIDIA and the Linux Foundation launched the Open Secure AI Alliance on 27 July 2026 with 37 founding members and without OpenAI, Google, Anthropic or Meta. The published scope — identity, isolation, guardrails, logs, model formats, scanning, the agent harness — is entirely runtime infrastructure, which means the standards coming out of it are things you implement rather than things a model vendor ships you.',
    'NVIDIA 与 Linux Foundation 于 2026 年 7 月 27 日发起 Open Secure AI Alliance，37 家创始成员，名单里没有 OpenAI、Google、Anthropic 和 Meta。它公布的范围——身份、隔离、护栏、日志、模型格式、扫描、智能体外壳——全是运行时基础设施，这意味着从中产出的标准是你要自己去落地的东西，而不是模型厂商发给你的东西。',
  ),
  tags: ['safety', 'ecosystem', 'open-source', 'agentic-ai', 'governance'],
};

export default post;
