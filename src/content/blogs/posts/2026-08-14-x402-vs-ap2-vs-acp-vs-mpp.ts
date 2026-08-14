import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-14',
  slug: 'x402-vs-ap2-vs-acp-vs-mpp',
  title: L(
    'x402 vs AP2 vs ACP vs MPP: The Only Difference That Changes Your Risk',
    'x402、AP2、ACP、MPP：唯一会改变你风险的那个差别',
  ),
  summary: L(
    'Four agent-payment standards, usually compared on rails. The axis that matters is where the spending cap is stored — a pre-funded wallet, an issuer rule, a one-checkout token, or a mandate the user signed — because that fixes how much a prompt-injected agent can spend before anything else gets a vote.',
    '四套智能体支付标准，通常被拿来比通道。真正要紧的坐标轴是支出上限存放在哪里——预充值钱包、发卡机构规则、只用一次的结账令牌，还是用户签过名的授权书——因为它决定了一个被提示词注入的智能体，在其他任何环节有机会表态之前能花掉多少。',
  ),
  tags: ['agent-comparison', 'protocols', 'ecosystem', 'safety', 'governance'],
};

export default post;
