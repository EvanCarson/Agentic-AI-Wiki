import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-06',
  slug: 'five-minutes-was-the-whole-response-window',
  title: L(
    'Five minutes was the whole response window',
    '五分钟，就是你全部的响应窗口',
  ),
  summary: L(
    "Microsoft Threat Intelligence reported on 5 November 2026 that it watched an AI agent go from searching GitHub for secrets to exfiltrating data out of Azure Key Vault in five minutes. The finding is not a new vulnerability — it is the retirement of detect-and-rotate as a primary control, because Microsoft's own remediation list splits cleanly into measures that race the agent's clock and measures that do not have to.",
    '微软威胁情报在 2026 年 11 月 5 日报告：他们观察到一个 AI 智能体从在 GitHub 上搜索密钥，到把数据从 Azure Key Vault 里外带出去，只用了五分钟。这个发现并不是一个新漏洞——它宣告了「检测再轮换」作为首要控制措施的退场，因为微软自己那份补救清单干净地劈成了两半：一半要跟智能体的时钟赛跑，另一半根本不必赛跑。',
  ),
  tags: ['safety', 'infrastructure', 'developer-tools'],
};

export default post;
