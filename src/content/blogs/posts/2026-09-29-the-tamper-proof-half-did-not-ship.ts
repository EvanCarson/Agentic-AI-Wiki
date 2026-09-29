import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-29',
  slug: 'the-tamper-proof-half-did-not-ship',
  title: L(
    'The tamper-proof half did not ship',
    '防篡改的那一半没有交付',
  ),
  searchTitle: {
    en: 'What NVIDIA conceded about in-process guardrails',
  },
  summary: L(
    'NVIDIA split agent enforcement into a kernel sandbox on the host CPU and a watchdog on a DPU the host cannot reach. The sandbox is Apache-2.0 on GitHub today; the watchdog has no ship date. The split is not a release accident — the layer far enough away to be tamper-proof is too far away to understand what the agent was trying to do.',
    'NVIDIA 把智能体的强制力拆成了两层：一层是主机 CPU 上的内核沙箱，一层是跑在主机碰不到的 DPU 上的看守。沙箱今天就以 Apache-2.0 摆在 GitHub 上；看守没有发货日期。这道裂缝不是发布事故——「远得足以防篡改」的那一层，同时也远得看不懂智能体当时想干什么。',
  ),
  tags: ['safety', 'sandboxing', 'infrastructure', 'open-source', 'ecosystem'],
};

export default post;
