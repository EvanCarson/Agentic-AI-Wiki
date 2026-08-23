import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-08-22',
  title: L(
    'New AI Blog post: reading the AI-native SDLC playbook as a compiler, and finding the three hops nothing checks',
    '新增 AI 博客文章：把 AI 原生 SDLC 手册读成一台编译器，并找出无人把关的三跳',
  ),
  items: [
    L(
      'Added `/blogs/ai-native-sdlc-artifact-chain` — a reading of Anthropic\'s AI-native SDLC playbook (Louis Claxton, 2026-08-21) that treats its artifact chain (`intent.md` → `spec.md` → `plan.md` → diff → review findings → incident record) as a compilation pipeline. The load-bearing argument: a compiler is trustworthy because each pass is verified, and here the intermediate representation is prose, the passes are language models, and there is no type error for "this plan does not implement this spec" — so each named play should be read as a fidelity check bolted onto one hop, which makes the unguarded hops visible. Three have nothing checking them: `intent.md` → `spec.md` (skills check the spec against policy, not against the intent, on the hop that invents the most), diff → `spec.md` (agentic review checks the diff for defects, not against the requirement, so "built the wrong thing correctly" survives), and production → `intent.md` (the only artifact with no human author at any point, checked only by a stage-one intake queue that has to actually be staffed).',
      '新增 `/blogs/ai-native-sdlc-artifact-chain`——对 Anthropic AI 原生 SDLC 手册（Louis Claxton，2026-08-21）的一次解读，把它的产物链（`intent.md` → `spec.md` → `plan.md` → diff → 评审结论 → 事故记录）当作一条编译流水线来看。核心论点是：编译器之所以可信，是因为每一遍都经过校验；而这里的中间表示是散文，各遍是语言模型，也不存在"这份计划没有实现这份规格"这样的类型错误——所以每个具名做法都该读成钉在某一跳上的忠实度检查，缺口也就随之显形。有三跳没有任何检查：`intent.md` → `spec.md`（skills 检查的是规格对政策的符合度，而非对意图的忠实度，偏偏这一跳创造的信息最多）、diff → `spec.md`（agent 评审在 diff 里找缺陷，而不是拿它对照需求，于是"把错的东西做对了"能一路存活）、以及生产 → `intent.md`（整条链上唯一全程没有人类作者的产物，唯一的检查是第一阶段的入口队列，而那个队列必须真有人在岗）。',
    ),
    L(
      'The post also separates the playbook into the half you can adopt this afternoon and the half you cannot: `intent.md`/`spec.md`/`plan.md` and `CLAUDE.md` are file conventions that the wider spec-driven-development ecosystem has already converged on (GitHub\'s Spec Kit — MIT, 130k+ stars, v1.0.1 on 2026-08-21, its first birthday — and AWS Kiro\'s `requirements.md`/`design.md`/`tasks.md`), while plan mode and hooks are harness features with no prompt-level substitute. Hooks get named as the only genuinely deterministic control in the whole playbook, along with the asymmetry that makes them a governance layer rather than a throughput lever: a `PreToolUse` hook can deny a call and exit code 2 is the one outcome later JSON cannot override, but staying silent never approves one — so you cannot hook your way out of a review backlog.',
      '文章还把这份手册切成"今天下午就能采纳"和"采纳不了"的两半：`intent.md`/`spec.md`/`plan.md` 与 `CLAUDE.md` 是文件约定，更广的规格驱动开发生态早已在这上面收敛（GitHub 的 Spec Kit——MIT 许可、star 数 13 万以上、2026-08-21 也就是它一周岁生日当天发布 v1.0.1——以及 AWS Kiro 的 `requirements.md`/`design.md`/`tasks.md`）；而 plan mode 与 hooks 是 harness 特性，在提示词层面没有替代品。文中点名 hooks 是整份手册里唯一真正确定性的控制，并指出让它成为治理层而非产能杠杆的那种不对称：`PreToolUse` hook 可以拒掉一次调用、退出码 2 是后续 JSON 也覆盖不了的唯一结果，但保持沉默永远不等于批准——所以你没法靠 hook 把评审积压消化掉。',
    ),
    L(
      'Anchored the "code is no longer the bottleneck" claim in the 2025 DORA data rather than leaving it as an assertion: 90% of respondents use AI at work (up 14 points), a median of two hours a day, AI adoption now positively associated with delivery throughput — a reversal of the prior year — while still associated with elevated instability. Throughput up and stability down in one dataset is the signature of a pipeline whose build stage got faster while its verification stages did not, which is the problem the playbook is a response to. Closes with five concrete additions the playbook leaves to the reader: SHA-stamping each artifact\'s front matter with its upstream commit so git records derivation rather than order, a script-level spec-versus-plan file check, a calibrated LLM judge on the intent→spec hop, a staffed draft queue for machine-generated intents, and hooks reserved for the irreversible.',
      '把"代码不再是瓶颈"这句话落到 2025 年 DORA 的数据上，而不是让它停在断言层面：90% 的受访者已在工作中使用 AI（同比上升 14 个百分点），每天使用时长中位数为两小时，AI 采用度如今与交付吞吐量呈正相关——这是对前一年结论的反转——但依然与更高的不稳定性相伴。同一份数据里吞吐上升、稳定性下降，正是"构建环节提速了、验证环节没跟上"这种流水线的特征，也正是这份手册要回应的问题。文章最后给出手册留给读者的五处具体补法：在每份产物的 front matter 里盖上上游提交的 SHA，让 git 记录派生而不只是顺序；用脚本做一道规格与计划的文件对照检查；在意图→规格这一跳上放一个经过校准的 LLM 裁判；给机器生成的意图配一个有人值守的草稿队列；以及把 hooks 留给不可逆的动作。',
    ),
  ],
};

export default entry;
