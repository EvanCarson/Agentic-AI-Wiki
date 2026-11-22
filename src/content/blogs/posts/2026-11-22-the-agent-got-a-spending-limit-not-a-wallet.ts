import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-22',
  slug: 'the-agent-got-a-spending-limit-not-a-wallet',
  title: L(
    'The agent got a spending limit, not a wallet',
    '智能体拿到的不是钱包，是一个花费上限',
  ),
  summary: L(
    'On 19 November 2026 AWS let agents buy AWS Marketplace listings per request and charge them to the buyer\'s AWS bill. The payment step is the least interesting part — x402 is a 1997 HTTP status code finally used as written. What matters is the sentence AWS buried in the announcement: the spending limits are enforced deterministically at the infrastructure layer, which means the model is never asked to be careful with money. That is the same structural move as an action guardrail, and it explains the asymmetry everyone misreads as hypocrisy — agent purchasing shipped at the cloud console years before it worked at a consumer storefront, because the console buyer already had a bill, an identity, a log and a dispute path.',
    '2026 年 11 月 19 日，AWS 让智能体可以按请求购买 AWS Marketplace 上的商品，并把费用记到买方的 AWS 账单上。付款这一步是其中最不值得讲的部分——x402 不过是一个 1997 年的 HTTP 状态码终于被按字面用起来。真正要紧的是 AWS 在公告里一笔带过的那句话：花费限额是在基础设施层以确定性方式强制执行的，也就是说，从来没有人要求模型对钱小心。这与动作护栏是同一个结构性动作，它也解释了那个被大家误读成「双标」的不对称——智能体采购在云控制台这边比在消费端店面早了好几年可用，因为控制台这边的买方本来就有一张账单、一个身份、一份日志和一条争议路径。',
  ),
  tags: ['agentic-ai', 'ecosystem', 'infrastructure', 'governance', 'protocols'],
};

export default post;
