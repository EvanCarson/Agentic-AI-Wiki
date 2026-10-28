import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-16',
  title: L(
    'Book: Part I of “From SDLC to AI-Driven SDLC” — the case, the maturity model, ten cases',
    '书籍：《从 SDLC 到 AI 驱动的 SDLC》第一部分——理由、成熟度模型、十个案例',
  ),
  items: [
    L(
      'Preface and Chapter 1, “When Code Gets Cheap, the Bottleneck Moves”: DORA tied each 25% rise in AI adoption to a 7.2% drop in delivery stability while code quality and review speed rose — the damage was downstream, where larger batches wait to be checked. Amdahl’s arithmetic shows why a coding-only speed-up has a hard ceiling.',
      '前言与第 1 章《当代码变便宜，瓶颈就会转移》：DORA 发现 AI 采用率每上升 25%，交付稳定性就下降 7.2%，而与此同时代码质量与评审速度却在提升——损害发生在下游，在更大的批次等待检查的地方。阿姆达尔定律的算术说明了为什么只加速编码会有一道硬上限。',
    ),
    L(
      'Chapter 2, “The AI-SDLC Maturity Model”: five levels across eight phases, defined by what a human still reviews read against the authority the AI actually holds — with the oracle principle (nothing above L2 without a check the AI cannot edit), a per-level permission envelope labelled as the book’s proposal, a crosswalk to fourteen published models, and a self-assessment template.',
      '第 2 章《AI-SDLC 成熟度模型》：横跨八个阶段的五个级别，以“人还在检查什么”并对照“AI 实际握有的权限”来定义——包括判据原则（没有 AI 改不了的检查，就不能高于 L2）、标明为本书提案的分级权限边界、与十四个已发布模型的对照表，以及一份自评模板。',
    ),
    L(
      'Chapter 3, “Case Studies”: ten public cases, each with its evidence grade (T1–T4) and the authority the AI really held — Google’s migrations, Meta TestGen-LLM, Spotify Honk, dotnet/runtime, Uber uReview, DIDACT, an independent industrial review study, Answer.AI’s month with Devin, and the Replit and Kiro incidents. Supervised autonomy worked where a deterministic check closed the loop; incidents happened where an agent held irreversible authority with no environment boundary.',
      '第 3 章《案例研究》：十个公开案例，每个都标出证据等级（T1–T4）以及 AI 实际握有的权限——Google 的代码迁移、Meta TestGen-LLM、Spotify Honk、dotnet/runtime、Uber uReview、DIDACT、一项独立的工业界评审研究、Answer.AI 试用 Devin 的一个月，以及 Replit 与 Kiro 事故。凡是有确定性检查闭环的地方，受监督的自主就成立；凡是智能体握有不可逆权限又没有环境边界的地方，就出了事故。',
    ),
    L(
      'Chapter 4, “Economics, Risk and Measurement”: controlled trials range from 19% slower to 56% faster, and the developers measured 19% slower believed they were 20% faster — so plan for a modest, conditional gain paid for in review time, tokens and risk, and read every number by who measured it.',
      '第 4 章《经济性、风险与度量》：对照试验的结果从慢 19% 到快 56% 不等，而被测出慢了 19% 的开发者却以为自己快了 20%——所以请按一个温和、有条件的收益来规划，它要用评审时间、token 与风险来支付，并且按“是谁测的”来解读每一个数字。',
    ),
    L(
      'Books — chapter pages now have a full-book sidebar (planned chapters dimmed), previous/next links that skip unpublished chapters, and a list of the chapters that build on each one; the book is listed in llms.txt.',
      '书籍——章节页现在有完整的全书侧边栏（尚未发布的章节以浅色显示）、会跳过未发布章节的上一章/下一章链接，以及“在此基础上展开的章节”列表；本书也已列入 llms.txt。',
    ),
  ],
  lines: ['bk'],
};

export default entry;
