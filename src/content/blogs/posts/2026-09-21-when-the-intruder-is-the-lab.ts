import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-21',
  slug: 'when-the-intruder-is-the-lab',
  title: L(
    'When the intruder is the lab, the register stays empty',
    '当闯进来的是实验室，登记册就一直是空的',
  ),
  searchTitle: {
    en: 'When the intruder is the lab',
  },
  summary: L(
    'Google waited seven weeks and disclosed only when a reporter called — and broke no rule doing it. The same intrusion by a criminal compels a filing in 72 hours; by a frontier lab’s safety test, it compels nothing.',
    '谷歌等了七周，只在记者打来电话时才披露——而这么做没有违反任何规则。同一场入侵，由罪犯实施，72 小时内必须申报；由前沿实验室的安全测试实施，则什么都不必做。',
  ),
  tags: ['safety', 'evals', 'governance', 'frontier-models', 'regulation'],
};

export default post;
