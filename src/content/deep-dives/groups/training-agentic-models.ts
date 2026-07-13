import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'training-agentic-models',
  order: 80,
  name: L('Training Agentic Models', '训练智能体模型'),
  groupSummary: L('Post-training for agentic ability — SFT, rejection sampling, distillation, RLHF/RLAIF, RL for tool use, reward design.', '面向智能体能力的后训练——SFT、拒绝采样、蒸馏、RLHF/RLAIF、面向工具调用的 RL、奖励设计。'),
  entries: [
    { page: 'prompt-finetune-or-rl', slug: 'prompt-finetune-or-rl', title: L('Prompt, Fine-Tune, or RL?','提示、微调，还是强化学习？'), summary: L('The decision tree for changing agent behavior: prompting asks, SFT imitates, RL optimizes — pick the cheapest lever that closes the gap.','改变智能体行为的决策树：提示发问、SFT 模仿、RL 优化——选能闭合差距的最便宜的杠杆。') },
    { page: 'rlhf-and-rlaif', slug: 'rlhf-and-rlaif', title: L('RLHF & RLAIF','RLHF 与 RLAIF'), summary: L('Walking the RLHF pipeline stage by stage — SFT, reward model, PPO/GRPO/DPO — and what swapping human labels for an AI judge actually fixes.','逐阶段走完 RLHF 管线——SFT、奖励模型、PPO/GRPO/DPO——以及把人类标注换成 AI 评判者实际修了什么。') },
    { page: 'rl-for-tool-use', slug: 'rl-for-tool-use', title: L('RL for Tool Use & Multi-Step Tasks','面向工具使用与多步任务的强化学习'), summary: L('Why RL over tool trajectories is hard: sparse terminal reward, credit assignment across steps, and why a trustworthy verifier is the whole game.','为何工具轨迹上的 RL 很难：稀疏终端奖励、跨步信用分配，以及为何可信核验器是全部博弈。') },
    { page: 'reward-design-and-hacking', slug: 'reward-design-and-hacking', title: L('Reward Design & Reward Hacking','奖励设计与奖励黑客'), summary: L('The reward is always a proxy: concrete agent reward-hacking patterns, the KL leash to the base policy, and the discipline of auditing the top, not the mean.','奖励永远是代理：具体的智能体奖励黑客模式、到底座策略的 KL 牵绳，以及审计顶端而非平均的纪律。') },
    { page: 'sft-rejection-sampling-distillation', slug: 'sft-rejection-sampling-distillation', title: L('SFT, Rejection Sampling & Distillation','SFT、拒绝采样与蒸馏'), summary: L('The supervised techniques that solve most agentic training problems before RL: rejection sampling, expert iteration, and distilling a strong agent into a cheap one.','在 RL 之前解决多数智能体训练问题的有监督技术：拒绝采样、专家迭代，以及把强智能体蒸馏进便宜模型。') },
    { page: 'process-vs-outcome-rewards', slug: 'process-vs-outcome-rewards', title: L('Process vs Outcome Reward Models','过程奖励 vs 结果奖励模型'), summary: L('Pay for the answer or pay for the steps: when dense process reward beats sparse outcome reward, and the labeling-cost trade that decides it.','为答案付费还是为步骤付费：何时稠密过程奖励胜过稀疏结果奖励，以及决定它的标注成本取舍。') },
    { page: 'rlvr-and-grpo-for-agents', slug: 'rlvr-and-grpo-for-agents', title: L('RLVR & GRPO for Agents','面向智能体的 RLVR 与 GRPO'), summary: L('The 2026 recipe — SFT → DPO/SimPO → GRPO/DAPO with verifiable rewards; entropy collapse, KL drift, and the multi-turn algorithms (ARPO, StepPO, Turn-PPO).','2026 年的配方——SFT → DPO/SimPO → GRPO/DAPO 且带可核验奖励；熵坍缩、KL 漂移，以及多轮算法（ARPO、StepPO、Turn-PPO）。') },
  ],
};
export default group;
