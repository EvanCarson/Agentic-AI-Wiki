import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-16',
  title: L(
    'Books — Part II of “From SDLC to AI-Driven SDLC” is published: eight phase-by-phase chapters, from requirements to security, each with its own maturity ladder, a graded case, migration steps, guardrails and metrics',
    '书籍——《从 SDLC 到 AI 驱动的 SDLC》第二部分发布：从需求到安全的八个逐阶段章节，每章都有自己的成熟度阶梯、一个分级案例、迁移步骤、护栏与指标',
  ),
  items: [
    L(
      'Chapters 5–8 — Requirements, Specs & Design (the spec becomes the product, so scale its depth to the task); Coding (the same agent went from 38.1% to 69% success in dotnet/runtime without a better model — preparation beats the model); Code Review (an AI reviewer pays off only when it is precise and changes what humans review); Testing & Verification (a suite the agent can edit is a suggestion, not a check).',
      '第 5–8 章——《需求、规格与设计》（规格成了产品，所以其详尽程度要与任务相称）；《编码》（在 dotnet/runtime 中，同一个智能体没换更好的模型，成功率就从 38.1% 升到 69%——准备工作胜过模型）；《代码评审》（AI 评审只有在精确、且改变了人评审的对象时才划算）；《测试与验证》（智能体能改的测试套件只是建议，不是检查）。',
    ),
    L(
      'Chapters 9–12 — CI/CD & Release (auto-fix is a solid L2; batch size, practised rollback and the CI token decide whether it pays); Operations & Incidents (let diagnosis climb, keep action behind reversibility); Maintenance & Migrations (the one phase where L3 is reachable today, because the compiler and tests already define “done”); and the new Security, Permissions & Blast Radius (every destructive incident on record sits in the authority surface — the credential, not the model, sets the blast radius).',
      '第 9–12 章——《CI/CD 与发布》（自动修复是扎实的 L2；批次大小、演练过的回滚和 CI 令牌决定它是否划算）；《运维与故障处理》（让诊断往上爬，让行动守在可逆性之后）；《维护与迁移》（如今唯一够得着 L3 的阶段，因为编译器和测试早已定义了“完成”）；以及新增的《安全、权限与爆炸半径》（有记录的每一起破坏性事故都落在权限面上——决定爆炸半径的是凭据，而不是模型）。',
    ),
    L(
      'Corrections to Chapter 2 found while fact-checking Part II: Slack’s 80% is the share of code converted in 9 sampled files, not of files; Elastic added its no-downgrade rule after its agent removed a version bump, not before; Uber’s quote restored verbatim; Spotify’s Fleet Management auto-merges are no longer counted as deterministic, since Spotify does not say how many its LLM agent wrote; BiAn’s 20.5% is measured against an RCACopilot baseline.',
      '在核查第二部分时发现并修正了第 2 章的几处错误：Slack 的 80% 指的是 9 个抽样文件中被转换的代码比例，而不是文件比例；Elastic 是在智能体删掉一次版本升级之后才加上禁止降级的规则，而不是之前；Uber 的引文已恢复原文；Spotify Fleet Management 的自动合并不再一概算作确定性的，因为 Spotify 没有说明其中有多少出自其 LLM 智能体；BiAn 的 20.5% 是相对 RCACopilot 基线测得的。',
    ),
  ],
};

export default entry;
