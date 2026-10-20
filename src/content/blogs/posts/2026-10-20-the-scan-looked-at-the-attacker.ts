import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-20',
  slug: 'the-scan-looked-at-the-attacker',
  title: L(
    'The scan that found it was pointed at the attacker, not the targets',
    '找到它的那次扫描，扫的是攻击者，不是目标',
  ),
  summary: L(
    'A campaign that attempted 1,200 sites and breached over a hundred was found by scanning the internet for exposed agent platforms, not by any victim. An attacker who automates acquires a control plane — and a control plane is an internet-facing asset holding a written record of intent.',
    '一场尝试了 1,200 个站点、攻破了一百多个的行动，是靠在互联网上扫描暴露的智能体平台发现的，而不是靠任何一个受害方。一个走向自动化的攻击者会获得一个控制平面——而控制平面是一项面向互联网的资产，里面存着一份写下来的意图记录。',
  ),
  tags: ['safety', 'agentic-ai', 'ecosystem', 'observability'],
};

export default post;
