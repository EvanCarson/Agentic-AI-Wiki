import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-16',
  slug: 'agent-cves-are-authorization-bugs',
  title: L(
    'August’s Worst Agent CVEs Were Authorization Bugs, and There Was No Patch to Apply',
    '八月最严重的智能体 CVE 是授权缺陷，而且没有补丁可打',
  ),
  summary: L(
    'Two agent vulnerabilities scored above 9.0 this month and neither involved a language model. CVE-2026-62830 hit 9.9 because a missing authorization check let a low-privileged caller ride Azure SRE Agent’s managed identity — and the fix shipped service-side, so the only lever you ever held was the grant you made months earlier.',
    '本月有两个智能体漏洞评分越过 9.0，而它们都与语言模型无关。CVE-2026-62830 拿到 9.9，是因为一道缺失的授权检查让低权限调用方骑上了 Azure SRE Agent 的托管标识——而修复是在服务端上线的，所以你手里唯一的杠杆，是几个月前做的那次授权。',
  ),
  tags: ['safety', 'governance', 'agentic-ai', 'ecosystem'],
};

export default post;
