import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-19',
  slug: 'the-passport-stops-at-your-perimeter',
  title: L(
    'The passport stops at your perimeter',
    '护照只到你自己的边界为止',
  ),
  summary: L(
    'ServiceNow announced AI Passport on 15 October 2026: a cryptographically signed credential, issued from its control tower, that agents and MCP servers check at runtime to establish what they may do. The prevention claim holds exactly as far as the issuer\'s own enforcement points reach, and an agent\'s most consequential calls leave them. What the credential durably buys is different and underrated — a binding between an action and the approval that authorised it, recorded as the action happens rather than reconstructed afterwards.',
    'ServiceNow 于 2026 年 10 月 15 日发布 AI Passport：一份由其控制塔签发、带密码学签名的凭据，智能体与 MCP 服务端在运行时校验它，以确认自己可以做什么。「事前阻止」这个说法的成立范围，恰好等于签发方自家执行点所能触及的范围——而智能体那些后果最重的调用，正好走出了这个范围。这份凭据真正长久买到的是另一样被低估的东西：把一次操作与授权它的那次审批绑定起来，并且在操作发生的当下就记下，而不是事后重建。',
  ),
  tags: ['governance', 'agentic-ai', 'ecosystem', 'mcp', 'safety'],
};

export default post;
