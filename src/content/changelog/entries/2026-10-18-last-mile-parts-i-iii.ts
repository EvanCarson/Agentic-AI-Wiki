import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-18',
  title: L('Last Mile adds Part I on the role and Part III on judgment: what an FDE is, the economics, and a skill map',
           '《最后一公里》新增第 I 部分与第 III 部分：FDE 是什么、经济账、技能地图与压力下的判断'),
  items: [
    L('Ch 1, What an FDE Is, and Isn\'t: one test sorts the jobs that share the title (own the outcome from discovery to handoff, and write the code), with a role-comparison grid and an "Is this an FDE job?" checklist worked through on a real posting.',
      '第 1 章《FDE 是什么，不是什么》：一个检验就能分清共用这个头衔的几种工作（从需求挖掘到交接都对结果负责，并亲手写代码），附角色对比表，以及一份用真实职位描述演示过的“这是 FDE 工作吗？”检查清单。'),
    L('Ch 2, Origins and Economics: why Palantir lost money on pilots, why the AI labs copied the pattern, and how to tell from an interview whether an employer is betting on product or on services.',
      '第 2 章《起源与经济账》：Palantir 为何在试点上亏钱，AI 实验室为何照搬这一模式，以及如何在面试中判断雇主押注的是产品还是服务。'),
    L('Ch 3, The Skill Map: four domains by four levels, written as behaviours someone else can check, plus a self-assessment template and one interview question per domain to see how high a job lets you rise.',
      '第 3 章《技能地图》：四个领域乘四个级别，全部写成他人可以核实的行为，附自我评估模板，以及每个领域一个面试问题，用来看清一份工作能让你走多高。'),
    L('Ch 14, Judgment Under Pressure: the four load-bearing commitments (threshold, data path, sponsor, exit), how to say no so it holds, and a say-no note template.',
      '第 14 章《压力下的判断》：四项承重承诺（阈值、数据通路、发起人、退出），如何拒绝才站得住，附“拒绝说明”模板。'),
    L('Earlier chapters now link to the new ones, and evidence grades are applied more strictly: vendor advice and stated targets are T4, vendor-reported measurements T2.',
      '已发布章节现已链接到新章节；证据分级也更严格：厂商建议与既定目标归为 T4，厂商自报的测量结果归为 T2。'),
  ],
};

export default entry;
