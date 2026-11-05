import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-11-05',
  slug: 'the-agent-points-the-dish-not-the-claim',
  title: L(
    'The agent points the dish, not the claim',
    '智能体转的是碟，不是结论',
  ),
  summary: L(
    "NVIDIA, the SETI Institute and Breakthrough Listen announced on 30 October 2026 that software agents now take plain-language instructions to steer the 42-antenna Allen Telescope Array and process its live stream — and the design decision worth copying is which half they kept for humans. The agent moves the hardware, where a mistake costs one observing window; the human owns the claim, where a mistake cannot be withdrawn. Almost every enterprise agent pilot does the reverse: a human approves each reversible tool call while the model authors the conclusion somebody then acts on. The announcement is also a clean exercise in reading one: the throughput figure is the vendor's, and the headline result — a real-time pulsar detection in the Crab Nebula — has a 2025 peer-reviewed predecessor at the same array that used no agent at all.",
    'NVIDIA、SETI 研究所与 Breakthrough Listen 在 2026 年 10 月 30 日宣布：软件智能体现在会接受自然语言指令，去操控那座 42 面天线的艾伦望远镜阵列、并处理它的实时数据流——而其中值得照抄的设计决定，是他们把哪一半留给了人。智能体动硬件，在那里一次失手的代价是一个观测窗口；人拥有那个结论，在那里一次失手收不回来。几乎每一个企业智能体试点都做的是反过来的事：人逐一批准那些可逆的工具调用，而模型撰写那个随后会有人照着做的结论。这份公告同时也是一次干净的「怎么读公告」练习：那个吞吐量数字是厂商的，而那个头条结果——蟹状星云里一次实时的脉冲星探测——在同一座阵列上有一个 2025 年的同行评审前身，而它压根没用智能体。',
  ),
  tags: ['agentic-ai', 'applications', 'safety', 'agent-ux'],
};

export default post;
