import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-22',
  title: L(
    'Deterministic finance with AI: an industry analysis, a design deep-dive and a measured before-and-after',
    '用 AI 做确定性的金融流程：行业分析、设计深入解析与实测的代码改造',
  ),
  items: [
    L(
      'New blog post, The model proposes, the ledger decides: how BNY, Allianz, Rillet, BlackLine, Ramp and Goldman keep money-moving decisions deterministic, the failures where that line was missing, what regulators asked for in 2026 (SR 26-2, FINRA, the EU Omnibus, MAS, HKMA), the debate over human error rates, and five developments to watch.',
      '新博客《模型提议，账本决定》：BNY、Allianz、Rillet、BlackLine、Ramp 与高盛如何让动钱的决定保持确定，缺了这条线时出过的事故，监管机构 2026 年的要求（SR 26-2、FINRA、欧盟综合法案、MAS、HKMA），围绕人工错误率的争论，以及五个值得关注的动向。',
    ),
    L(
      'New Deep-Dive, The Deterministic Boundary for Finance Agents (D14): the four meanings of "deterministic", where each step of a finance process may be probabilistic, compounding error rates, a catalogue of finance-specific model mistakes with a check for each, and what reproducibility each provider actually offers in October 2026.',
      '新深入解析「金融智能体的确定性边界」（D14）：“确定性”的四种含义、金融流程中哪些步骤可以是概率性的、误差如何复合、金融数据特有的模型错误清单及其各自的检查，以及 2026 年 10 月各家供应商实际能提供的可复现性。',
    ),
    L(
      'New Deep-Dive, Deterministic Finance Workflows in Code (D15): a 406-line bank reconciliation run 28 times naively on Haiku, Sonnet and Opus 5.5 (all 25 numeric answers said 0.00; 4 were wrong or incomplete), then rebuilt with integer cents, code matching, model proposals checked by code, a sign-off gate, recorded replay and eight tests; plus a measured library evaluation.',
      '新深入解析「代码里的确定性金融流程」（D15）：一份 406 行的银行对账，先用朴素做法在 Haiku、Sonnet 与 Opus 5.5 上跑了 28 次（25 个给出数字的答案都说差额为 0.00，其中 4 个有误或不完整），再用整数分、代码匹配、经代码检验的模型提议、签核闸门、记录回放与八个测试重建；附实测的选库评估。',
    ),
    L(
      'Corrected two existing pages: Finance agents (Y7) no longer says temperature 0 and caching make outputs identical, and Decision Receipts & Audit (S8) now says SR 26-2 excludes agentic AI and gives the EU AI Act high-risk date as 2 December 2027.',
      '更正了两个现有页面：「金融智能体」（Y7）不再声称温度为 0 加缓存能让输出一致；「决策回执与审计」（S8）改为说明 SR 26-2 把智能体 AI 排除在外，并把欧盟 AI 法案高风险义务的日期更正为 2027 年 12 月 2 日。',
    ),
  ],
};

export default entry;
