import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-09',
  slug: 'ai-in-the-trading-stack',
  title: L(
    'AI in the Trading Stack: What Hedge Funds Actually Run on the Decision',
    'AI 在交易栈中的位置：对冲基金真正用 AI 做哪些决策',
  ),
  searchTitle: { en: 'How Hedge Funds Use AI in the Trading Stack' },
  summary: L(
    'AI in trading is not one bot; it is a four-layer stack — signal, sizing, execution, risk — and each layer runs a different model with different failure modes. Map the layers and any "AI hedge fund" headline becomes legible in thirty seconds.',
    '交易中的 AI 不是一个机器人，而是一个四层栈——信号、仓位、执行、风控——每一层跑的模型不同、失效模式也不同。把这四层在脑中摆开，任何「AI 对冲基金」的标题三十秒内都能看懂。',
  ),
  tags: ['ai-trading', 'quant-finance', 'reinforcement-learning', 'applications'],
};

export default post;
