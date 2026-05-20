import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-19',
  title: L('New Deep-Dive group: Economics & ROI', '新增「深度剖析」分组：经济性与投资回报'),
  items: [
    L('New Deep-Dive group "Economics & ROI" — 6 essays: build vs buy vs orchestrate, agent unit economics, cost attribution & budgets, measuring agent ROI, pricing & packaging agent products, and where the economics breaks.',
      '新增「深度剖析」分组「经济性与投资回报」——6 篇文章：自建 vs 采购 vs 编排、智能体单位经济学、成本归因与预算、衡量智能体投资回报、智能体产品的定价与打包，以及经济性在何处崩溃。'),
    L('Central thesis: token cost is the wrong unit — cost per successful task with the success rate in the denominator is what decides whether an agent is a business, and the economics invert (rather than erode) at retry storms, the long tail, escalation, the eval bill, and the silent-failure tax.',
      '核心论点：token 成本是错误的单位——分母放成功率的「每个成功任务成本」才决定一个智能体是不是生意，而经济性会在重试风暴、长尾、上报、评估账单与无声失败税处反转（而非渐渐侵蚀）。'),
    L('Grounded in 2025–2026 sources: McKinsey State of AI ROI patterns, the cost-per-successful-task framing, the SaaS-vs-agent gross-margin shift (80–90% to 50–60%), and the 2.5–3.5× outcome-pricing rule of thumb.',
      '依据 2025–2026 来源：麦肯锡《人工智能现状》回报模式、「每个成功任务成本」框架、SaaS 与智能体毛利之差（80–90% 降至 50–60%），以及结果定价 2.5–3.5× 的经验法则。'),
  ],
};
export default entry;
