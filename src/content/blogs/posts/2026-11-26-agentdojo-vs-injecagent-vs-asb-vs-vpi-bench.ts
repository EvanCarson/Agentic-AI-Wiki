import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-26',
  slug: 'agentdojo-vs-injecagent-vs-asb-vs-vpi-bench',
  title: L(
    'Four injection benchmarks report 24% to 100%. None of them disagree',
    '四个注入基准报出 24% 到 100%，而它们彼此并不矛盾',
  ),
  summary: L(
    'AgentDojo, InjecAgent, Agent Security Bench and VPI-Bench all publish an "attack success rate" and the numbers span 24% to 100% — because each one defines the attack channel and the success condition differently. An ASR quoted without its benchmark is not a weak number, it is not a number. Which one to run depends on whether your agent reads tool output, memory, or pixels, and only one of the four tells you what the defence cost you.',
    'AgentDojo、InjecAgent、Agent Security Bench 与 VPI-Bench 都会公布一个「攻击成功率」，而这些数字横跨 24% 到 100%——因为每一个对攻击通道与成功条件的定义都不一样。一个不带基准名的 ASR 不是一个弱的数字，它根本不是一个数字。该跑哪一个，取决于你的智能体读的是工具输出、记忆，还是像素；而四者中只有一个会告诉你防御让你付出了什么代价。',
  ),
  tags: ['agent-comparison', 'prompt-injection', 'evals', 'safety', 'open-source'],
};

export default post;
