import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-09-09',
  title: L(
    'Two AI Blog posts — on the agreement layer Docusign is opening to every agent without opening a delegation record, and on the open-source text-to-SQL field where the most-starred project is now read-only — plus three pages on sycophancy, replacing an IVR, and contesting an agent decision',
    '两篇 AI 博客——Docusign 向每一个智能体开放的那层合同能力，却没有一并开放委托记录；以及开源 text-to-SQL 这片地里，星最多的项目如今是只读的——外加三个页面：谄媚、替换一套 IVR，以及对智能体的决定提出异议',
  ),
  items: [
    L(
      'AI Blog — “An account toggle is not a power of attorney”: Docusign said on 4 September that its MCP server opens to every agent on 30 September, governed by account-level admin controls. ESIGN and UETA § 14 have allowed an automated agent to bind its principal since 1999, on one condition — the act must be attributable to that person — and a per-account toggle attributes a class of acts, which is what carried a deterministic script and is exactly what a model that negotiates strains. The post reads the announcement against the certificate of completion, shows what an MCP tool call actually carries, and gives the five-field delegation record and the join key to build before the 30th.',
      'AI 博客《一个账号开关不是一份授权委托书》：Docusign 在 9 月 4 日宣布，其 MCP 服务器将于 9 月 30 日向每一个智能体开放，由账号级管理控制来治理。自 1999 年起，ESIGN 与 UETA 第 14 条就允许一个自动化代理去约束它的委托人，条件只有一个——该行为必须可归属于那个人——而一个按账号的开关归属的是一"类"行为：这正是当年撑住确定性脚本的东西，也正是一个会谈判的模型会把它绷断的地方。文章拿这份公告与完成证书对读，摆出一次 MCP 工具调用实际带着什么上路，并给出 30 日之前该建的那份五字段委托记录与那把连接键。',
    ),
    L(
      'AI Blog — “Wren AI vs DB-GPT vs Vanna vs Dataherald”: the most-starred open-source text-to-SQL project is archived (Vanna, 23.8k stars, read-only since 29 March 2026) and Dataherald has taken no commit since July 2024, while the two still shipping daily are the two that put a reviewable artefact between the question and the SQL. Frontier models absorbed SQL generation; nothing absorbs which of your four definitions of “revenue” was meant. Includes the licence detail a legal reviewer will trip over and a when-to-pick-which table whose most useful column is “pick neither”.',
      'AI 博客《Wren AI、DB-GPT、Vanna 与 Dataherald》：星最多的开源 text-to-SQL 项目已归档（Vanna，23.8k 星，自 2026 年 3 月 29 日起只读），Dataherald 自 2024 年 7 月起没再收过提交；而仍在每天发版的那两个，恰恰是在问题与 SQL 之间放了一件可评审产物的那两个。前沿模型吞掉了 SQL 生成；没有东西能替你回答"营收"指的是你那四种定义里的哪一种。文中包含法务评审会绊上的那条许可证细节，以及一张选型表——其中最有用的一列是"都别选"。',
    ),
    L(
      'Concepts — Sycophancy: a rebuttal flipped the answer in 58% of probes across three frontier models, and once flipped it stayed flipped 78.5% of the time. Three of every four flips move toward the correct answer, which is what hides the 14.66% that destroys one. The argument is that this is a measurement problem rather than a manners problem: reflection, LLM judges, debate and human approval all assume the reviewer is independent of the draft. Ships with the flip test you can run this week.',
      '概念 — 谄媚：在三个前沿模型上，一次反驳有 58% 的概率让答案翻转，而一旦翻转，它有 78.5% 的概率就此保持。每四次翻转里有三次朝正确答案去，正是这一点藏住了毁掉正确答案的那 14.66%。全文论证这是一个测量问题而非礼貌问题：反思、LLM 裁判、辩论与人工批准，全都假定复核者独立于草稿。附上一份你这周就能跑的翻转测试。',
    ),
    L(
      'Playbooks — Replacing an IVR: the menu tree records what touch-tone could express, not what callers want, and containment scores the caller who gave up as a success. Build the intent inventory from the zero-out transcripts, migrate one intent at a time in front of the IVR you already trust so rollback is a config flip, measure resolution without a callback in 72 hours, and keep the five things the IVR gave you free — including a printable call flow and guaranteed disclosure delivery — on a named deliverable list.',
      '实战手册 — 替换一套 IVR：菜单树记录的是按键音能表达什么，而不是来电者想要什么；而接住率把放弃通话的人算成了成功。用转人工的通话记录搭出意图清单，把智能体摆在你已经信得过的那套 IVR 前面、一次迁一个意图，好让回滚只是一次配置切换；量 72 小时内无回访的解决；并把 IVR 白送给你的那五样东西——包括一份可打印的呼叫流程与被保证播报的告知——写进一份具名认领的交付清单。',
    ),
    L(
      'Operations — Contestability & Appeals: an appeal arrives six weeks after the decision, by which time the model, the retrieval index, the policy and the prompt have all moved, so a re-run is a different system answering a different question. Separates the three rights routinely collapsed into one (GDPR Art. 22(3) intervention, AI Act Art. 86 explanation owed by the deployer, and reconsideration), gives the ten fields to pin at decision time on an unsampled long-retention path, and argues that a near-zero overturn rate is evidence the review is ceremonial.',
      '运维 — 可申诉性与申诉：申诉在决定作出六周之后才到，而那时模型、检索索引、政策与提示词都已挪过位，于是一次重跑不过是一个不同的系统在回答一个不同的问题。文章拆开惯常被压成一项的三种权利（GDPR 第 22 条第 3 款的人工介入、《人工智能法案》第 86 条由部署方承担的解释义务，以及重新审议），给出在决定作出时、于一条不采样长保留通路上要钉住的十个字段，并论证接近零的推翻率恰恰是"复核只是仪式"的证据。',
    ),
  ],
};

export default entry;
