import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-16',
  slug: 'the-name-on-the-request-was-the-credential',
  title: L(
    'The name on the request was the credential',
    '请求上那个名字就是凭证',
  ),
  summary: L(
    'Cequence and KPMG published field data on 11 November 2026 in which traffic claiming one consumer AI agent’s name hit a single marketplace 414,210 times in a week — more than every genuine agent visit the same vendor counted across five industries. Every one of those visits went to the sign-in page and every one failed, which is credential stuffing wearing an allowlisted name. The lesson is not that the allowlist was too generous: it is that an unauthenticated string was being used as a credential, and the control that caught this was behavioural, not an identity check.',
    'Cequence 与 KPMG 于 2026 年 11 月 11 日发布了一批现场数据：冒用某个消费级 AI 智能体名字的流量，一周内打了某个在线市场 414,210 次——比这家厂商在同期五个行业里数到的全部真实智能体访问还多。这些访问每一次都奔向登录页、每一次都失败，这就是披着一个被列入允许名单的名字的撞库。教训不是允许名单放得太宽：而是一个未经认证的字符串一直被当作凭证在用，而抓住这件事的那项控制是行为类的，不是一次身份检查。',
  ),
  tags: ['safety', 'agentic-ai', 'protocols'],
};

export default post;
