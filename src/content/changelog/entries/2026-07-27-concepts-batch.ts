import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-27',
  title: L(
    'Five new Concepts: streaming, agent cost, agent-to-agent protocols, synthetic data, distillation & quantization',
    '五则新概念：流式输出、智能体成本、智能体间协议、合成数据、蒸馏与量化',
  ),
  items: [
    L(
      'Streaming & partial output — why streaming changes perceived speed without changing actual speed, why an agent streams typed events rather than one text field, and the five things it quietly breaks, starting with output guardrails that can no longer unsay what is already on screen.',
      '《流式输出与中间结果》——为什么流式输出改变的是体感速度而非实际速度，为什么智能体流出来的是带类型的事件而非单个文本字段，以及它会悄悄弄坏的五件事，首当其冲的就是再也收不回已显示内容的输出侧护栏。',
    ),
    L(
      'Agent cost control — the arithmetic behind the surprise bill: because the whole transcript is re-sent on every step, total input grows with the square of the step count. Covers the four levers in order of return, the three levels to cap, and why "cost per completed task" is the only cost metric worth a dashboard.',
      '《智能体成本控制》——账单让人意外的背后算术：由于每一步都要重发整段对话，累计输入随步数的平方增长。文中按回报排序讲了四个抓手、需要设限的三个层级，以及为什么「每完成任务成本」是唯一值得放上看板的成本指标。',
    ),
    L(
      'Agent interoperability & A2A — the distinction that matters: MCP connects your agent to a tool, A2A introduces it to a peer that runs its own loop. Covers the four problems any agent protocol must solve, the five it hands back to you, and the organisational test for whether you need one at all.',
      '《智能体互操作与 A2A》——关键区别在于：MCP 把你的智能体连到一件工具上，A2A 则把它介绍给一个跑自己循环的对等方。文中讲了任何智能体协议都必须解决的四个问题、它又原样还给你的五个问题，以及判断你到底需不需要它的组织层面判据。',
    ),
    L(
      'Synthetic data — model collapse is real but routinely over-generalised; it is a property of the pipeline (no filter, no fresh real data, no external signal) rather than of synthetic data itself. Includes the three uses that pay off for application teams, all of which are about testing rather than training.',
      '《合成数据》——模型崩塌确有其事，但常被过度推广；它是流水线的属性（不筛选、不引入新的真实数据、不引入外部信号），而不是合成数据本身的属性。文中列出了对应用团队真正划算的三种用途，而它们都关于测试而非训练。',
    ),
    L(
      'Distillation & quantization — two techniques that are constantly confused: one trains a new smaller model, the other stores the same weights at lower precision. Includes what breaks unevenly in both (long-horizon agent work fails first) and why quantization should always be tried first.',
      '《蒸馏与量化》——两种经常被混为一谈的技术：一个训练全新的小模型，另一个把同一批权重以更低精度存储。文中说明了两者会不均匀损伤的能力（长程智能体任务最先垮掉），以及为什么应当永远先试量化。',
    ),
    L(
      'The Concepts encyclopedia is now 58 entries.',
      '「概念」百科现已收录 58 则条目。',
    ),
  ],
};
export default entry;
