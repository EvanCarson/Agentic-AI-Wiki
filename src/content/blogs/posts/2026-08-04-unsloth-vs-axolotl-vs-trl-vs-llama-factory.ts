import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-04',
  slug: 'unsloth-vs-axolotl-vs-trl-vs-llama-factory',
  title: L(
    'Unsloth vs Axolotl vs TRL vs LlamaFactory: Pick by Coupling, Not Throughput',
    'Unsloth、Axolotl、TRL 与 LlamaFactory：按耦合度选，别按吞吐量选',
  ),
  summary: L(
    'These four are not four alternatives at one layer — TRL is the trainer API, Axolotl and LlamaFactory wrap it, and Unsloth rewrites its source at import time. That single fact predicts the thing you will actually feel: TRL shipped 1.9.2 in July while two of the others still pin the 0.x line. The famous speed table nobody can source is the wrong axis entirely.',
    '这四者并不是同一层上的四个替代品——TRL 是训练器 API，Axolotl 与 LlamaFactory 包在它外面，而 Unsloth 在导入时重写它的源码。这一个事实就能预测你真正会感受到的东西：TRL 在 7 月发布了 1.9.2，而其中两家仍然锁在 0.x 那条线上。那张没人能溯源的著名速度对比表，量的完全是错的轴。',
  ),
  tags: ['agent-comparison', 'open-source', 'developer-tools', 'reinforcement-learning'],
};

export default post;
