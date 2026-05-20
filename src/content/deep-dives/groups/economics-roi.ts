import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'economics-roi',
  order: 140,
  name: L('Economics & ROI', '经济性与投资回报'),
  entries: [
  { page: 'build-vs-buy', slug: 'build-vs-buy', title: L('Build vs Buy vs Orchestrate','自建 vs 采购 vs 编排'), summary: L('Not a cost comparison but a question of which layer is your durable moat: the three-branch decision tree, the hidden costs each path omits, and the lock-in you price today but pay later.','不是成本比较，而是哪一层是你持久护城河的问题：三分支决策树、每条路略去的隐性成本，以及你今天定价、以后才付的锁定。') },
  { page: 'unit-economics', slug: 'unit-economics', title: L('Agent Unit Economics','智能体单位经济学'), summary: L('Cost per token is the wrong unit; cost per successful task is the right one, with the success rate in the denominator where small reliability gains swing margin hardest.','每 token 成本是错误的单位；每个成功任务的成本才对，成功率在分母上——那里一点可靠性提升对毛利的撬动最猛。') },
  { page: 'cost-attribution', slug: 'cost-attribution', title: L('Cost Attribution & Budgets','成本归因与预算'), summary: L('The provider bill is at the wrong granularity to act on: tag spend by feature, tenant, user, and version, propagate it through fan-out, and make budgets runtime circuit breakers, not reports.','厂商账单的粒度无法据以行动：按功能、租户、用户、版本给花费打标签，让它穿过扇出传播，并把预算做成运行时熔断器，而非报表。') },
  { page: 'measuring-roi', slug: 'measuring-roi', title: L('Measuring Agent ROI','衡量智能体投资回报'), summary: L('Value over a defensible counterfactual, net of the human still in the loop, on a cumulative time-to-value curve — and why the "agent replaces a human" framing is a category error.','相对站得住脚的反事实、扣除仍在循环里的人、放在累计价值实现曲线上的价值——以及为何"智能体替代一个人"是范畴错误。') },
  { page: 'pricing-models', slug: 'pricing-models', title: L('Pricing & Packaging Agent Products','智能体产品的定价与打包'), summary: L('Seat, usage, and outcome pricing each misalign somewhere; align price with delivered value but defend the floor, because more autonomy means you hold more variable-cost risk.','席位、用量、结果定价各在某处错位；让价格与交付价值对齐但守住下限，因为越自主你持有的可变成本风险越大。') },
  { page: 'economics-failure-modes', slug: 'economics-failure-modes', title: L('Where the Economics Breaks','经济性在何处崩溃'), summary: L('Unit economics do not erode gradually — they invert at retry storms, the long tail, escalation, the eval bill, and the silent-failure tax; watch the failure surface, not the average.','单位经济学不会渐渐侵蚀——它在重试风暴、长尾、上报、评估账单与无声失败税处反转；盯着失败面，而非平均。') },
  ],
};
export default group;
