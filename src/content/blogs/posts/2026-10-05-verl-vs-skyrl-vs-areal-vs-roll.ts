import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-05',
  slug: 'verl-vs-skyrl-vs-areal-vs-roll',
  title: L(
    'verl vs SkyRL vs AReaL vs ROLL',
    'verl、SkyRL、AReaL 与 ROLL 对比',
  ),
  summary: L(
    'All four are Apache-2.0 and all four ship PPO and GRPO, so neither the licence nor the algorithm list decides anything. What decides it is whether your environment is a separately scheduled participant in the rollout or a callback inside the generator — because every fix for a slow tool buys throughput by training on stale data. Pick on which staleness knob you get, not on whose speedup number is biggest.',
    '四者都是 Apache-2.0，四者都带 PPO 与 GRPO，所以许可证和算法清单什么都没定下来。真正定下来的是：你的环境在 rollout 里是一个被单独调度的参与者，还是生成器内部的一个回调——因为针对「慢工具」的每一种修法，买到吞吐的方式都是拿陈旧数据去训练。请按「你拿到的是哪一个陈旧度旋钮」来选，而不是按谁的加速比数字最大。',
  ),
  tags: ['agent-comparison', 'reinforcement-learning', 'open-source', 'infrastructure'],
};

export default post;
