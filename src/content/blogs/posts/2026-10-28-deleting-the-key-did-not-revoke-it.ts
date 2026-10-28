import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-28',
  slug: 'deleting-the-key-did-not-revoke-it',
  title: L(
    'Deleting the key did not revoke it',
    '在控制台删掉那把钥匙，并不等于吊销它',
  ),
  summary: L(
    "OpenCode told 1.4% of its Console users that provider API keys saved in their workspaces may have been exposed, and the remediation instruction is the finding: go revoke the key in OpenAI's, Anthropic's or Google's own dashboard, because removing it from OpenCode revokes nothing. Bring-your-own-key splits custody from revocation across two companies, and the asset it leaks is metered compute whose only authoritative monitor is somebody else's invoice.",
    'OpenCode 通知了 1.4% 的 Console 用户：他们存在工作区里的模型提供方 API key 可能已经泄露。而真正的发现藏在那条补救指示里——请去 OpenAI、Anthropic 或 Google 自己的控制台吊销这把 key，因为把它从 OpenCode 里删掉吊销不了任何东西。自带 key 的集成方式，把「保管」与「吊销」拆给了两家公司；而它泄露出去的资产是按量计费的算力，其唯一权威的监控器，是别人家的账单。',
  ),
  tags: ['safety', 'coding-agents', 'developer-tools', 'cost'],
};

export default post;
