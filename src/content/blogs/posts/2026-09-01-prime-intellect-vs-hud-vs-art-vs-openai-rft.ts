import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-01',
  slug: 'prime-intellect-vs-hud-vs-art-vs-openai-rft',
  title: L(
    'Prime Intellect vs HUD vs ART vs OpenAI RFT: you are choosing where the environment lives',
    'Prime Intellect、HUD、ART 与 OpenAI RFT：你在选的是环境住在哪里',
  ),
  summary: L(
    'Trainers and GPUs are rentable and the base model changes every quarter, so the only durable thing an RL project produces is the environment — the task distribution, the tool surface and the verifier that scores a run. These four platforms disagree about where that artifact lives and who writes the reward, and the one that offered to own the whole pipeline is closing to new users. Pick on portability of the environment and ownership of the verifier; the trainer comparison is the easy part.',
    '训练器和 GPU 都可以租，基座模型每个季度换一次，所以一个 RL 项目唯一留得下来的东西是环境——任务分布、工具面，以及给一次运行打分的那个校验器。这四家平台对"那件产物住在哪里、奖励由谁来写"给出了不同答案，而其中那个提出要包下整条流水线的，正在对新用户关门。按环境的可移植性和校验器的归属来选；训练器的对比反倒是容易的那部分。',
  ),
  tags: ['agent-comparison', 'reinforcement-learning', 'evals', 'open-source', 'infrastructure'],
};

export default post;
