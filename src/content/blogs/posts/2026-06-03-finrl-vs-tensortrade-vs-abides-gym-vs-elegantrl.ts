import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-06-03',
  slug: 'finrl-vs-tensortrade-vs-abides-gym-vs-elegantrl',
  title: L(
    'FinRL vs TensorTrade vs ABIDES-Gym vs ElegantRL: Who Controls the Simulation Contract',
    'FinRL、TensorTrade、ABIDES-Gym 与 ElegantRL：谁来掌控仿真契约',
  ),
  summary: L(
    'Four RL-for-trading projects, four near-identical feature lists — Gymnasium env, OHLCV ingest, PPO/SAC/A2C/DQN, backtest evaluation. The thing that actually decides which survives a serious research-or-prod loop is invisible there: who controls the simulation contract.',
    '四款 RL 交易项目，四份几乎一致的功能清单——Gymnasium 环境、OHLCV 摄入、PPO/SAC/A2C/DQN、回测评估。真正决定谁能在严肃的研究或生产循环中扛下去的那一点，在功能清单上根本看不见：谁来掌控仿真契约。',
  ),
  tags: ['agent-comparison', 'reinforcement-learning', 'trading', 'open-source'],
};

export default post;
