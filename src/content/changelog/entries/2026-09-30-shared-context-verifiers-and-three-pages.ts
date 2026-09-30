import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-09-30',
  title: L(
    'Two AI Blog posts — one reading the OpenAI DevDay stack as a permission model in which a shared context behaves like a shared credential, one on why the synthetic-data framework you pick is really a choice about whether it can execute your verifier — plus three pages on open-weight licences, the missing human baseline under every agent score, and the savings that never reach a budget',
    '两篇 AI 博客——一篇把 OpenAI DevDay 那套东西当成权限模型来读，看共享上下文如何表现得像一份共享凭据；一篇讲你挑的合成数据框架，实际上是在选「它能不能执行你的核验器」——外加三个页面：开放权重许可证、每个智能体分数底下缺失的那条人类基线，以及永远到不了预算里的那些节省',
  ),
  items: [
    L(
      'AI Blog — “A shared context is a shared credential”: DevDay on 29 September paired always-on Dots agents, each with its own cloud computer and browser, with ChatGPT Space, where employees, ChatGPT, Codex and those agents work from one context. The enforced boundary is per-connector OAuth scope; the decisive one is who may write into the context, and nobody enforces it. Five candidate boundaries scored, and the two that would work are the two you cannot buy.',
      'AI 博客《共享上下文就是一份共享凭据》：9 月 29 日的 DevDay 把常驻的 Dots 智能体（每个都配了自己的云端电脑和浏览器）与 ChatGPT Space 配成一对，让员工、ChatGPT、Codex 和这些智能体从同一份上下文出发工作。被强制的边界是按连接器的 OAuth 授权范围；起决定作用的那道是「谁可以往这份上下文里写」，而没人在强制它。文中给五道候选边界打了分，而真正能起作用的那两道，正是你买不到的两道。',
    ),
    L(
      'AI Blog — “Distilabel vs Curator vs NeMo Data Designer vs Augmentoolkit”: all four orchestrate LLM calls into datasets competently, so the differences on that axis are ergonomic. The axis that decides is whether a verifier can run inside the regeneration loop — a judge from the generator’s own family filters half your rows and adds no information. Only NeMo Data Designer treats Python/SQL validation as a declared stage; includes the Distilabel maintainer-transition note.',
      'AI 博客《Distilabel、Curator、NeMo Data Designer 与 Augmentoolkit 对比》：四者都能胜任地把 LLM 调用编排成数据集，所以那条轴上的差别只是手感。真正起决定作用的那条轴，是核验器能不能跑在重新生成的循环里面——一个与生成器同门的评判器会滤掉你一半的行，却没有增加任何信息。只有 NeMo Data Designer 把 Python/SQL 校验当成声明出来的阶段；文中也记下了 Distilabel 维护方交接这件事。',
    ),
    L(
      'New Concept — Open-Weight Licences: what stops you shipping is a clause attached to who you are, not to what you built, so sort by standard versus bespoke rather than permissive versus restrictive. Covers the three documents that all get called “the licence”, the 2026 move to Apache 2.0 and MIT, the Llama 4 agreement as the worked specimen, and the four facts to record per deployed checkpoint.',
      '新概念《开放权重许可证》：挡住你上线的是一条挂在「你是谁」而不是「你造了什么」上的条款，所以请按「标准 vs 定制」来分类，而不是按「宽松 vs 严格」。内容覆盖那三份都被叫作「许可证」的文件、2026 年向 Apache 2.0 与 MIT 的迁移、作为范本的 Llama 4 协议，以及每个已部署检查点该记下的四件事。',
    ),
    L(
      'New Deep-Dive (Evaluating Agents) — Human Baselines in Agent Evals: a baseline is a four-part tuple of who, budget, tools and grader, and the grader biases the comparison in both directions at once. Explains what METR’s time-horizon method does and does not say, gives a twenty-task two-annotator recipe that costs about two person-days, and argues for reporting the ratio rather than the score.',
      '新深入解析（评估智能体）《智能体评测中的人类基线》：一条基线是「谁、时限、工具、打分器」的四元组，而打分器会同时把比较往两个方向掰。文中讲清了 METR 的时间跨度方法说了什么、没说什么，给出一份二十件任务、两位标注者、约两个人日的做法，并主张汇报比值而不是汇报分数。',
    ),
    L(
      'New Operation (Economics & ROI) — Fractional Time Savings: forty people saving twenty minutes a day is thirteen FTEs on a spreadsheet and zero dollars in any budget, because a fifth of a person is not a line item. Names the four auditable shapes that convert freed capacity into money, shows that the cost side is fractional too while only one side gets instrumented, and gives the two-part write-up finance will actually accept.',
      '新运维页（经济性与投资回报）《碎片化的时间节省》：四十个人每天各省二十分钟，在电子表格上是十三个全职当量，在任何预算里都是零美元——因为五分之一个人不是一条费用项。文中点出把释放产能换成钱的四种可审计形态，说明成本那一侧同样是碎片化的、却只有一侧上了仪表，并给出财务真正会接受的那种两段式写法。',
    ),
  ],
};

export default entry;
