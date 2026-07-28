import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-28',
  title: L(
    'Five new Concepts: agent review UX, multilingual agents, batch inference, prefill/decode, knowledge cutoffs',
    '五则新概念：智能体复核交互、多语言智能体、批处理推理、预填充与解码、知识截止日',
  ),
  items: [
    L(
      'Agent UX: designing for review — an agent that saves an hour is worthless if checking it costs fifty minutes. Covers why legibility beats brevity, why an editable plan collects a correction where a confirmation dialog only collects a click, why per-claim evidence beats a confidence percentage, and the inversion that a cheap undo lets you delete confirmations entirely.',
      '《智能体的交互设计：为复核而设计》——一个省下一小时的智能体，如果检查它要花五十分钟就毫无价值。文中讲了为什么可读性比简短更重要、为什么可编辑的计划收上来的是纠正而确认弹窗只收上来一次点击、为什么逐条挂证据胜过给一个置信度百分比，以及那个反转：可靠而廉价的撤销让你有底气把确认弹窗整个删掉。',
    ),
    L(
      'Multilingual & cross-lingual agents — adding a language breaks tokens, retrieval and evaluation at once, and generation quality is the least broken of the three. Covers the roughly 2× token tax in Chinese, the four cross-lingual retrieval strategies with their real costs, why BM25 fails silently on scripts without spaces, why English-tuned safety classifiers report green on everything else, and why you must never translate an eval set with the model under test.',
      '《多语言与跨语言智能体》——多加一种语言会同时打坏令牌、检索与评测，而生成质量是三者中坏得最轻的。文中讲了中文约两倍的令牌税、四种跨语言检索策略及其真实代价、为什么 BM25 在无空格文字上会无声失效、为什么按英文调的安全分类器对其他语言一律报绿，以及为什么绝不能用被测模型来翻译评测集。',
    ),
    L(
      'Batch & asynchronous inference — the same model at 50% of standard input and output rates in exchange for a completion window measured in hours. Covers which of your work is secretly offline, why an agent loop can never be batched (step n+1 does not exist yet), why batch pulls against prompt caching, and the two-lane queue routed by deadline rather than by model.',
      '《批处理与异步推理》——同一个模型，输入与输出均按标准价的 50% 计费，代价只是把完成窗口拉长到以小时计。文中讲了你手上哪些活儿其实是离线的、为什么智能体循环永远无法批处理（第 n+1 步的请求还不存在）、为什么批处理与提示词缓存相互拉扯，以及那个按截止时间而非按模型分流的双车道队列。',
    ),
    L(
      'Prefill, decode & the KV cache — one model call is two machines with opposite bottlenecks. Explains time-to-first-token versus inter-token latency, why the KV cache (not the weights) is what overflows at long context, why prompt caching must be a prefix match, why output tokens cost several times input, and the one measurement that tells you which half to optimise.',
      '《预填充、解码与 KV 缓存》——一次模型调用其实是两台瓶颈相反的机器。文中解释了首令牌时延与令牌间时延之别、为什么长上下文时溢出的是 KV 缓存而不是权重、为什么提示词缓存必须是前缀匹配、为什么输出令牌比输入贵好几倍，以及那一次能告诉你该优化哪一半的测量。',
    ),
    L(
      'Knowledge cutoffs & the missing clock — the cutoff is a gradient, not a wall: knowledge of the months just before it is thinner than knowledge of two years earlier, which is where confidence outruns evidence. Covers why the model is an unreliable reporter of its own cutoff, why the injected date belongs at the end of the system prompt, why stale procedural knowledge is worse than stale facts in an agent, and why your own retrieval index has a cutoff too.',
      '《知识截止日与缺失的那只钟》——截止日是一道渐变而非一堵墙：它之前那几个月的知识比两年前更稀薄，而那正是自信跑在证据前面的地方。文中讲了为什么模型是自身截止日的不可靠汇报者、为什么注入的日期该放在系统提示词的末尾、为什么在智能体里过时的操作性知识比过时的事实更糟，以及为什么你自己的检索索引也有一个截止日。',
    ),
    L(
      'The Concepts encyclopedia is now 68 entries.',
      '「概念」百科现已收录 68 则条目。',
    ),
  ],
};
export default entry;
