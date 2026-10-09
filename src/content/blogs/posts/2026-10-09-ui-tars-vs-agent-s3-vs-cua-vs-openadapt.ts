import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-09',
  slug: 'ui-tars-vs-agent-s3-vs-cua-vs-openadapt',
  title: L(
    'UI-TARS vs Agent S3 vs cua vs OpenAdapt: you are picking a layer, not an agent',
    'UI-TARS、Agent S3、cua 与 OpenAdapt 对比：你挑的是一个层，不是一个智能体',
  ),
  summary: L(
    'Agent S3 recommends UI-TARS as its grounding model, so two of these four are halves of one stack — and five numbers published under the name “OSWorld” span 63 points. Pick on which of four layers you are missing, and on the one axis that actually separates them: whether a model decides where to click every time the task runs.',
    'Agent S3 推荐 UI-TARS 作为它的定位模型，所以这四者里有两个是同一个栈的上下两半——而以「OSWorld」之名发表的五个数字，跨度有 63 个百分点。请按「你缺的是四个层里的哪一个」来选，并按那条真正把它们分开的轴来选：每次任务运行时，是不是都由一个模型来决定点哪里。',
  ),
  tags: ['agent-comparison', 'computer-use', 'open-source', 'evals'],
};

export default post;
