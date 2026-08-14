import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-14',
  slug: 'muse-glimmer-two-agentic-numbers',
  title: L(
    'Muse Glimmer Ships Two Agentic Numbers, and the Wrong One Is in the Headline',
    'Muse Glimmer 交出了两个"智能体"分数，而上标题的是错的那个',
  ),
  summary: L(
    'Meta\'s 30B open-weights agent model scores 76.0 on SWE-Bench Verified and 24% on τ³-Banking. Five of its six headline numbers measure a model alone against a machine-checkable goal; the sixth measures it working with a person against a written policy — and that is the axis an always-on local assistant lives on.',
    'Meta 的 300 亿参数开放权重智能体模型，在 SWE-Bench Verified 上是 76.0，在 τ³-Banking 上只有 24%。它六个头条数字里有五个测的是"模型独自面对一个可被程序核验的目标"；第六个测的是"陪着一个人、照着一份成文规程办事"——而常驻本地助手活的正是后面这条轴。',
  ),
  tags: ['frontier-models', 'open-source', 'evals', 'agentic-ai', 'self-hosted'],
};

export default post;
