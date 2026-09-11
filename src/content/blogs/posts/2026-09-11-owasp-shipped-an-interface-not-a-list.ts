import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-11',
  slug: 'owasp-shipped-an-interface-not-a-list',
  title: L(
    'OWASP shipped an interface, not a list',
    'OWASP 交付的是一个接口，不是一份清单',
  ),
  searchTitle: {
    en: 'OWASP 2026: the Agent Control Standard matters more than the Top 10 ranking',
  },
  summary: L(
    'Excessive Agency climbing to third is the headline and the least useful part. The Agent Control Standard is the change: a hook contract a framework fires before a tool call, a memory write or a sub-agent, with an allow/deny/modify verdict behind any policy engine — which turns security advice into something you either implement or do not, and moves the audit boundary into your runtime. It also exposes the number nobody reports: the share of your agent’s effects that pass a hooked call site at all.',
    '"过度代理权"升至第三是头条，也是最没用的那部分。真正的变化是 Agent Control Standard：一份框架在工具调用、写入记忆或派生子智能体之前触发的 hook 契约，背后可接任意策略引擎、返回 allow/deny/modify 裁决——它把安全建议变成了你要么实现、要么没实现的东西，并把审计边界挪进了你的运行时。它同时暴露出一个没人在报的数字：你的智能体产生的效果里，究竟有多大比例真的经过了一个挂了 hook 的调用点。',
  ),
  tags: ['safety', 'governance', 'agentic-ai', 'ecosystem'],
};

export default post;
