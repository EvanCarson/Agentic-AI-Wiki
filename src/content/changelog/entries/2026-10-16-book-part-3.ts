import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-16',
  title: L(
    'Book complete: Part III, the migration plan, and four appendices',
    '全书完成：第三部分迁移计划与四个附录',
  ),
  items: [
    L(
      'Part III, The Migration — Assess Your Starting Point (score each phase on what a human reviews, which check the AI cannot edit, which credentials it holds and its risk ceiling, then find the constraint); The 90-Day Pilot (one phase, one task type, a verifier, a baseline and a stop rule written in advance, starting in maintenance); Scaling Across Teams (governance by level, provenance, and the three camps of AI contribution policy); People: Roles, Skills and the Junior Pipeline; and Measuring Success and When to Roll Back (pair every speed metric with a stability metric, and write the rollback triggers before the pilot).',
      '第三部分《迁移》——《评估你的起点》（按人评审什么、有哪道 AI 改不了的检查、AI 握有哪些凭据以及风险上限，为每个阶段打分，再找出约束所在）；《90 天试点》（一个阶段、一类任务、一个核验器、一条基线，外加事先写好的停止规则，从维护开始）；《向更多团队推广》（按级别治理、来源可追溯，以及 AI 贡献政策的三大阵营）；《人：角色、技能与初级工程师培养》；以及《衡量成效，以及何时回退》（每个速度指标都配一个稳定性指标，并在试点开始前写好回退触发条件）。',
    ),
    L(
      'Appendices — A, Templates (self-assessment grid, agent instruction file, spec, review checklist, merge-readiness evidence pack, provenance policy, permission-envelope checklist, pilot scorecard, rollback-trigger sheet); B, Regulatory and Licensing Status as of October 2026 (not legal advice); C, Glossary; D, Bibliography, with every source the book cites, its date and its evidence tier.',
      '附录——A《模板》（自评表、智能体指令文件、规格、评审清单、合并就绪证据包、来源政策、权限边界清单、试点计分卡、回退触发表）；B《监管与许可现状（截至 2026 年 10 月）》（非法律意见）；C《术语表》；D《参考文献》，列出全书引用的每个来源及其日期与证据等级。',
    ),
    L(
      'Corrections across the book: the dotnet/runtime revert comparison is agent versus all other pull requests, bots included, not versus humans (Chapters 3, 6, 11); Fedora’s AI policy is now quoted verbatim from its Council ticket; the kernel’s Assisted-by format is noted as differing between documentation builds; an Uber per-engineer spend figure with no traceable source was removed. Chapter references throughout the book are now links.',
      '全书勘误：dotnet/runtime 的撤回对比是智能体对其他所有拉取请求（含机器人），而不是对人类（第 3、6、11 章）；Fedora 的 AI 政策现按其理事会工单原文引用；注明了内核的 Assisted-by 格式在不同文档构建中有所不同；删去了一个无法追溯来源的 Uber 人均花费数字。全书的章节引用现在都已改为链接。',
    ),
  ],
};

export default entry;
