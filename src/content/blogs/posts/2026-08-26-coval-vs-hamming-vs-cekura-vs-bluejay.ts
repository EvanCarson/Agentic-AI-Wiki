import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-26',
  slug: 'coval-vs-hamming-vs-cekura-vs-bluejay',
  title: L(
    'Coval vs Hamming vs Cekura vs Bluejay: You Are Buying a Simulated Caller',
    'Coval vs Hamming vs Cekura vs Bluejay：你买的是一位模拟来电者',
  ),
  summary: L(
    'Four platforms will run thousands of test calls against your voice agent, and the number they advertise — concurrency — is the axis that matters least. What separates them is where the caller on the other end comes from, because that sets the ceiling on what any of these evals can tell you.',
    '四个平台都能对你的语音智能体跑上几千通测试电话，而它们主推的那个数字——并发量——恰恰是最不重要的那条轴。真正把它们区分开的，是电话那头的来电者从哪儿来，因为那设定了所有这些评测能告诉你什么的上限。',
  ),
  tags: ['agent-comparison', 'voice-agents', 'evals', 'realtime', 'cost'],
};

export default post;
