import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-26',
  slug: 'the-store-opened-the-wallet-stayed-shut',
  title: L(
    'The store opened, the wallet stayed shut',
    '店门开了，钱包没开',
  ),
  summary: L(
    "Walmart's Agent Gateway, announced 21 October 2026, lets an approved agent search inventory and buy at Walmart and Sam's Club — and never hands it card details or the ability to change a payment method. That line, not the MCP server in front of it, is the industry's actual settlement: agents get admission to choosing, platforms keep custody of the instrument. Amazon drew the opposite line with the same technology, which is how you know the decision was never technical.",
    '沃尔玛在 2026 年 10 月 21 日公布的 Agent Gateway，允许获批的智能体在沃尔玛与山姆会员店搜索库存并下单——却从不把卡片信息、或更改支付方式的能力交给它。真正的行业定局是这条线，而不是摆在它前面的那台 MCP 服务器：智能体获准参与「挑选」，平台保留对支付工具的保管权。亚马逊用同样的技术画出了相反的线——由此可知，这个决定从来不是技术性的。',
  ),
  tags: ['agentic-ai', 'ecosystem', 'governance', 'protocols'],
};

export default post;
