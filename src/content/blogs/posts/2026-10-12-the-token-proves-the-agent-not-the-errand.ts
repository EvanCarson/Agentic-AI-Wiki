import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-12',
  slug: 'the-token-proves-the-agent-not-the-errand',
  title: L(
    'The token proves the agent, not the errand',
    '令牌证明的是智能体，不是那件差事',
  ),
  summary: L(
    'Personal Agent Protocol draft 0.1 spends its rigour on identity — client keys, DPoP-bound tokens, an issuer that must match the discovery document — and then describes what the agent may do with two scopes plus whatever each company invents. Three access surfaces carry three credential strengths and one shared authorisation vocabulary, so "Poppy-compliant" says almost nothing about the blast radius.',
    'Personal Agent Protocol 草案 0.1 把严谨都花在了身份上——客户端密钥、与 DPoP 绑定的令牌、必须与发现文档一致的 issuer——然后用两个 scope 加上各家自行发明的东西来描述智能体可以做什么。三个接入面携带三种凭据强度、共用一套授权词汇，于是「符合 Poppy」几乎说明不了爆炸半径。',
  ),
  tags: ['protocols', 'agentic-ai', 'governance', 'ecosystem'],
};

export default post;
