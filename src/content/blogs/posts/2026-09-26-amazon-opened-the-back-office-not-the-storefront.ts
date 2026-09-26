import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-26',
  slug: 'amazon-opened-the-back-office-not-the-storefront',
  title: L(
    'Amazon opened the back office and closed the storefront in the same week',
    '亚马逊在同一周里打开了后台、关上了店面',
  ),
  summary: L(
    'On 21 September Amazon cut off Meta\'s Muse agent; two days later it handed outside AI agents its Seller Central APIs. The variable is not the agent — it is whether a delegation exists that the platform can verify, scope and revoke, which the seller side has had for a decade and the buyer side does not have at all.',
    '9 月 21 日，亚马逊切断了 Meta 的 Muse 智能体；两天后，它把 Seller Central 的 API 交给了外部 AI 智能体。变量不是智能体——而是是否存在一份平台能够核验、限定范围并撤销的委托：卖家侧已经有了十年，买家侧则完全没有。',
  ),
  tags: ['agentic-ai', 'ecosystem', 'governance'],
};

export default post;
