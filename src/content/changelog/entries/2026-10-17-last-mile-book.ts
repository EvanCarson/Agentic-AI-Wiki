import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-17',
  title: L('A second book: Last Mile, the Forward Deployed Engineer\'s handbook, opens with its guide and Chapters 4–6',
           '第二本书《最后一公里：FDE 落地手册》上线，先发导读与第 II 部分前三章'),
  items: [
    L('How to Use This Book: three reading paths, the T1–T4 evidence grades, how echoed numbers and composites are marked, and a 28-row index from the situation you are in to the page that helps.',
      '如何使用本书：三条阅读路径、T1–T4 证据分级、回声数字与合成案例的标注方式，以及一份 28 行、从你所处处境直达对应页面的索引。'),
    L('Ch 4, Before the Engagement: the pilot\'s terms decide the outcome before the FDE arrives, so a free, open-ended proof of concept stalls. It ends with a one-page engagement brief.',
      '第 4 章“交付开始之前”：试点条款在 FDE 到场之前就决定了结果，免费、不设期限的概念验证注定停滞。章末附一页纸的交付简报。'),
    L('Ch 5, Discovery: the problem the customer names is a hypothesis. Watch the work, find the business lever, and get the sponsor to sign the observed problem. Includes an interview guide.',
      '第 5 章“需求挖掘”：客户说出的问题只是一个假设。观察工作本身，找到业务杠杆，请发起人在观察到的问题上签字。附访谈指南。'),
    L('Ch 6, Scoping and the First Win: fix the metric, baseline and threshold before any agent code, keep the stakes high and the scope small, and keep a "not now" list. Includes a one-page scope.',
      '第 6 章“划定范围与首个成果”：写智能体代码之前先定下指标、基线和阈值；利害要高、范围要小，并维护一份“暂不做”清单。附一页纸范围模板。'),
    L('New annotation boxes mark composite scenarios and dated facts, so invented examples never read like real cases.',
      '新增两种标注框，分别标出合成案例与注明日期的事实，让虚构示例永远不会被误读为真实案例。'),
  ],
  lines: ['bk'],
};
export default entry;
