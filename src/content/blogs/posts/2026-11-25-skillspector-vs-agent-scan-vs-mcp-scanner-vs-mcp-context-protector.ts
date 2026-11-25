import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-25',
  slug: 'skillspector-vs-agent-scan-vs-mcp-scanner-vs-mcp-context-protector',
  title: L(
    'Three scanners score the risk. The one that catches the rug pull is archived',
    '三个扫描器给风险打分，而唯一能抓到“事后换描述”的那个已经归档',
  ),
  summary: L(
    'SkillSpector, Snyk Agent Scan and Cisco MCP Scanner all answer "is this skill or server dangerous right now?" — and all three were pushed to yesterday. Trail of Bits\' mcp-context-protector answers the different question, "is this the same thing you approved?", blocks tool calls until you say yes, and was archived in April 2026 with 228 stars against SkillSpector\'s 27,593. The question you need answered after install is the one nobody is maintaining.',
    'SkillSpector、Snyk Agent Scan 与 Cisco MCP Scanner 回答的都是同一个问题——“这个 skill 或这台服务器现在危险吗？”，而三者昨天都还有提交。Trail of Bits 的 mcp-context-protector 回答的是另一个问题——“这还是你批准过的那一份吗？”，不批准就拦住工具调用；它在 2026 年 4 月归档，228 颗星，对面 SkillSpector 有 27,593 颗。装完之后你真正需要被回答的那个问题，恰恰没人在维护。',
  ),
  tags: ['agent-comparison', 'mcp', 'safety', 'prompt-injection', 'open-source'],
};

export default post;
