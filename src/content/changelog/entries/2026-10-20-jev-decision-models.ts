import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-20',
  title: L(
    'Jev and decision models: a blog comparison, a new concept and a thresholds runbook',
    'Jev 与决策模型：一篇博客对比、一个新概念和一份阈值运行手册',
  ),
  items: [
    L(
      'AI Blog: "Jev and its fast followers sell a probability nobody has measured" compares Jev, OpenAI Decisions, Cloudflare Clef and Perplexity\'s pplx-decider. All four guarantee a valid answer, as constrained decoding already did, so the calibrated probability is the only new thing — and no vendor publishes it for the job these models are sold for. Jev reached 35.3% of Vercel\'s paid teams in two weeks but 0.27% of spend; the threshold you set decides the bill.',
      'AI 博客：《Jev 和它的快速跟进者，卖的是一个没人量过的概率》对比了 Jev、OpenAI Decisions、Cloudflare Clef 与 Perplexity 的 pplx-decider。四者都保证答案合法——约束解码早已做到——所以真正新的只有经过校准的概率，而没有一家厂商在这些模型的本职任务上公布它。Jev 两周内覆盖了 Vercel 35.3% 的付费团队，却只占 0.27% 的支出；你设定的阈值决定账单。',
    ),
    L(
      'New Concept, Decision Models (E26): a decision model replaces the if inside an agent, not the agent. Its weak spots — counting, dates, indirection, option order — are where code is strong, so code computes and the model judges.',
      '新概念「决策模型」（E26）：决策模型取代的是智能体里的那个 if，而不是智能体。它的短板——计数、日期、间接引用、选项顺序——正是代码的强项，所以代码负责计算，模型只做判断。',
    ),
    L(
      'New Operations page, Thresholds for Decision Models (E26): the deployable artifact is the threshold. Shadow the incumbent, size the labelled set by arithmetic (~750 in-band examples for 2% ± 1%), read calibration off probabilities rather than the derived confidence field, set three bands, probe the jagged edges, and pin the version — jev-latest moves to 1.14.0 around 21 October.',
      '新运维页「决策模型的阈值」（E26）：真正可部署的产物是阈值。与现有方案并行影子运行，用算术确定标注集规模（2% ± 1% 需要带内约 750 条），从 probabilities 而非派生出来的 confidence 字段读取校准，设三档，探查已知短板，并固定版本——jev-latest 约在 10 月 21 日切到 1.14.0。',
    ),
    L(
      'Corrected the GPT Researcher comparison post: its v3.7.0 context filter uses TypeSafe AI\'s Jev (with BM25 as the fallback), not an in-house scorer of the same name.',
      '更正 GPT Researcher 对比文章：其 v3.7.0 的上下文过滤器使用的是 TypeSafe AI 的 Jev（以 BM25 兜底），而不是一个同名的自研打分器。',
    ),
  ],
};

export default entry;
