import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-24',
  slug: 'the-evidence-has-no-retention-clock',
  title: L(
    'The evidence has no retention clock',
    '那些证据没有留存时钟',
  ),
  summary: L(
    "NIST, the NSA and CISA published ten voluntary practices for rogue-agent incidents on 16 October 2026. Nine of them are incident response you already know how to do. The one that decides whether you can answer the other nine names four artefacts to preserve — and the cheapest of them, the tool call your policy engine refused, is the one almost nobody keeps. The guidance sets no retention period, so the default is your existing trace TTL.",
    'NIST、NSA 与 CISA 在 2026 年 10 月 16 日发布了十条针对失控智能体事件的自愿性实践。其中九条是你本来就会做的事件响应。而决定你能否回答另外九条的那一条，点名了四类需要保全的产物——其中最便宜的那个，也就是被你的策略引擎拒掉的那次工具调用，几乎没人在留。指引没有设定任何留存期限，于是默认值就是你现有的 trace TTL。',
  ),
  tags: ['governance', 'regulation', 'safety', 'observability', 'agentic-ai'],
};

export default post;
