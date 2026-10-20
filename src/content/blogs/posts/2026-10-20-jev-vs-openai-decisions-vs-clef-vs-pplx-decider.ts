import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-20',
  slug: 'jev-vs-openai-decisions-vs-clef-vs-pplx-decider',
  title: L(
    'Jev and its fast followers sell a probability nobody has measured',
    'Jev 和它的快速跟进者，卖的是一个没人量过的概率',
  ),
  summary: L(
    "Jev, OpenAI Decisions, Cloudflare Clef and Perplexity's pplx-decider all guarantee a valid answer — so does constrained decoding — which leaves the calibrated probability as the only new thing they sell. As of October 2026 no vendor has published calibration on the job these models are sold for, and the threshold you set from your own labels decides both the error rate and the bill.",
    'Jev、OpenAI Decisions、Cloudflare Clef 和 Perplexity 的 pplx-decider 都保证答案合法——约束解码也能做到——于是它们真正新卖的只剩那个经过校准的概率。截至 2026 年 10 月，没有一家厂商公布过它们在本职任务上的校准数据；而你用自己的标注数据定下的阈值，同时决定了错误率和账单。',
  ),
  tags: ['agent-comparison', 'frontier-models', 'structured-outputs', 'evals', 'cost'],
};

export default post;
