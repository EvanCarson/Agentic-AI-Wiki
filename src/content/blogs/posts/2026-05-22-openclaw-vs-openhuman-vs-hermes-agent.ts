import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-05-22',
  slug: 'openclaw-vs-openhuman-vs-hermes-agent',
  title: L(
    'OpenClaw vs OpenHuman vs Hermes Agent: Three Architectures of the Open-Source Agent Stack',
    'OpenClaw、OpenHuman 与 Hermes Agent：开源智能体栈的三种架构',
  ),
  summary: L(
    'Three of 2026’s fastest-growing open-source agents look almost identical on a feature list — and behave like completely different species the moment you run them. A diagram-by-diagram tour of where the architectures diverge.',
    '2026 年增长最快的三款开源智能体——在功能清单上几乎一致，跑起来却像完全不同的物种。逐图解析三者架构分歧之处。',
  ),
  tags: ['agent-comparison', 'open-source', 'architecture', 'agent-frameworks'],
};

export default post;
