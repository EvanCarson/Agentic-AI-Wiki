import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-18',
  title: L('Last Mile completes Part II: seven more chapters take an engagement from data access to handoff, and failure',
           '《最后一公里》第 II 部分完结：新增七章，从数据接入一路讲到交接与失败'),
  items: [
    L('Ch 7, Data Access and Integration: file the access request on day one, build on sanitised fixtures while it moves, read before you write, and name an owner for every connector. Ships a data-access request template.',
      '第 7 章《数据接入与集成》：第一天就提交访问申请，等待期间用测试样本先行构建，先读后写，并为每个连接器指定负责人。附数据接入申请模板。'),
    L('Ch 8, Security, Governance and Model Risk: treat the review as a design input, answer the data questions with contract terms, and answer indirect prompt injection with an agent that can do nothing dangerous. Ships an AI security-answers sheet.',
      '第 8 章《安全、治理与模型风险》：把评审当作设计输入，用合同条款回答数据问题，用一个没有危险能力的智能体回答间接提示注入。附 AI 安全问卷答复模板。'),
    L('Ch 9, Evals: build the eval set with the customer\'s experts before the agent, plan for the long climb from 80%, and deliver bad news with a plan. Ships an eval plan.',
      '第 9 章《评测》：先和客户的专家一起建评测集，再造智能体；为从 80% 起的漫长爬坡做好计划，带着方案去报坏消息。附评测计划模板。'),
    L('Ch 10–11, Building in Their Environment and Production and Handoff: rules that must hold live in code outside the model, the least clever design that clears the eval wins, and handoff is a drill the customer\'s operators pass without you. Ships an architecture decision record and a runbook.',
      '第 10–11 章《在客户的环境里构建》《上线与交接》：必须成立的规则放在模型之外的代码里，能通过评测的最朴素设计胜出，交接是一场客户运维团队独立通过的演练。附架构决策记录与运行手册模板。'),
    L('Ch 12–13, Feeding the Product and When Engagements Fail: keep a field log so one customer\'s build becomes a product template, and write a rescue-or-walk rule before you need it. Ships a product-feedback brief and an engagement post-mortem.',
      '第 12–13 章《反哺产品》《当交付失败时》：记好现场日志，让一个客户的构建变成产品模板；在用得上之前就写好“挽救还是退出”的规则。附产品反馈简报与交付复盘模板。'),
    L('The running insurer example now continues across all ten Part II chapters on one checked timeline, and the How to Use index and the *From SDLC to AI-Driven SDLC* book now link to the new chapters.',
      '贯穿全书的保险公司合成案例，如今在第 II 部分全部十章中沿着同一条核对过的时间线展开；导读的处境索引和《从 SDLC 到 AI 驱动的 SDLC》一书也已链接到新章节。'),
  ],
  lines: ['bk'],
};

export default entry;
