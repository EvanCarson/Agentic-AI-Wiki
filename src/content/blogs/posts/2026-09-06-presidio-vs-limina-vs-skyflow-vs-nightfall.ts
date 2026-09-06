import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-06',
  slug: 'presidio-vs-limina-vs-skyflow-vs-nightfall',
  title: L(
    'Presidio vs Limina vs Skyflow vs Nightfall: you are choosing a boundary, not a detector',
    'Presidio、Limina、Skyflow 与 Nightfall：你选的是一道边界，不是一个检测器',
  ),
  summary: L(
    'These four are sold as four ways to keep personal data out of your model traffic, and they are actually three different boundaries — vault at collection, transform on the wire, find it after the fact — which is what decides your residual risk. Two of them are classifiers, so a miss is a leak nothing reports; and every redaction is a lossy transform applied to the same trace your incident response will need.',
    '这四家都被当成「把个人数据挡在模型流量之外」的四种做法来卖，而它们其实是三道不同的边界——在采集处入库、在链路上变换、在事后去找——真正决定你残余风险的正是这个。其中两家是分类器，所以一次漏检就是一次没有任何东西会上报的泄露；而每一次脱敏，都是对「你的事故响应将会需要的那份追踪」施加的一次有损变换。',
  ),
  tags: ['agent-comparison', 'governance', 'observability', 'safety', 'open-source'],
};

export default post;
