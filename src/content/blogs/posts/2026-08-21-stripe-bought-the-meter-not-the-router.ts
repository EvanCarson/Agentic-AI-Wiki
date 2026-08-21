import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-21',
  slug: 'stripe-bought-the-meter-not-the-router',
  title: L(
    'Stripe bought the meter, not the router',
    'Stripe 买下的是计量器，不是路由器',
  ),
  summary: L(
    'A payments company paid a reported $7 billion for the layer that counts AI usage, seven months after buying the layer that invoices it. Routing was never the scarce asset — the scarce asset is one normalised record of what every model call cost and who it was for, and if that record lives in your request path you are paying a percentage on every step your agents take.',
    '一家支付公司为「负责数 AI 用量」的那一层付出了据报道 70 亿美元，而就在七个月前，它刚买下负责为这些用量开票的那一层。稀缺的从来不是路由能力，而是一份归一化的记录：每一次模型调用花了多少、算在谁头上。如果这份记录住在你的请求路径里，你就要为智能体走的每一步付一笔百分比。',
  ),
  tags: ['ecosystem', 'infrastructure', 'cost', 'agentic-ai'],
};

export default post;
