import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-31',
  title: L(
    'Two AI Blog posts, two new pages, and the structured-outputs concept rebuilt',
    '两篇博客、两个新页面，结构化输出概念页重写',
  ),
  items: [
    L(
      'AI Blog: "Pydantic AI vs OpenAI Agents SDK vs LangChain vs Claude Agent SDK" — all four hand you a validated object, and the decision is what happens when the model\'s answer does not fit it. Pydantic AI feeds the validation error back on a shared retry budget and is the only one with a first-class hook (ModelRetry) for rejecting an answer that parsed but was wrong; the OpenAI Agents SDK raises ModelBehaviorError by default, with an opt-in handler whose fallback it re-validates against the same output_type; and in LangChain\'s create_agent the retry handler is wired to ToolStrategy while a bare Pydantic model auto-selects the provider path that does not retry — so the one-line declaration most examples show is the one that gives up. Three exits, costing a second inference call, a stack trace, or a confidently wrong answer.',
      'AI 博客：《Pydantic AI、OpenAI Agents SDK、LangChain、Claude Agent SDK》——四者都递给你一个经过校验的对象，而真正的决定是「模型的答案装不进它时会怎样」。Pydantic AI 在一份共享重试预算内把校验错误喂回去，而且是唯一一个带有一等钩子（ModelRetry）去否决「解析通过但内容是错的」答案的；OpenAI Agents SDK 默认抛出 ModelBehaviorError，并提供一个可选启用的处理器——它的兜底值还会被拿同一个 output_type 再校验一遍；而在 LangChain 的 create_agent 里，重试处理器接在 ToolStrategy 上，可一个裸的 Pydantic 模型会自动选中那条不重试的 provider 路径——于是大多数示例展示的那个一行写法，恰恰是会放弃的那一个。三个出口，代价分别是第二次推理调用、一条堆栈回溯，或者一个自信的错误答案。',
    ),
    L(
      'AI Blog: "The IDE kept the tools and rented the agent" — Android Studio Rabbit 2 went stable with Bring Your Own Agent at the Android Dev Summit on 28–29 October 2026, opening the IDE\'s agent window to 40+ agents over the open Agent Client Protocol, Claude Agent, Codex, Junie and Google Antigravity among them. The guest brings a model, its prompting and its own vendor account; the host keeps the Android Emulator, the build systems, Logcat, the project context and the Android skills. The Android CLI shipping plugins for Claude Code and Codex in the same breath is the tell that the asset is the tool surface rather than the window. ACP standardises the connection and not the authorization — and that tool list is also the blast radius.',
      'AI 博客：《IDE 留下了工具，把智能体租了进来》——Android Studio Rabbit 2 在 2026 年 10 月 28–29 日的 Android Dev Summit 上随 Bring Your Own Agent 进入稳定版，通过开放的 Agent Client Protocol 把 IDE 的智能体窗口开放给 40 多个智能体，其中包括 Claude Agent、Codex、Junie 与 Google Antigravity。客人带来一个模型、它的提示词与自己的厂商账号；主人留下 Android 模拟器、构建系统、Logcat、项目上下文与 Android skills。而 Android CLI 在同一口气里发布了 Claude Code 与 Codex 的插件，正是那个破绽：资产是工具面，而不是那扇窗。ACP 标准化了连接而不是授权——而那份工具清单同时也是爆炸半径。',
    ),
    L(
      'New Deep-Dive, Permission-Aware Retrieval (R14): filtering the top-k after the search has no error state, so a permissions bug arrives as "search got worse" and gets debugged as relevance for a week. The over-fetch you need is 1/v, where v is the asking user\'s visible fraction of the corpus — a user who sees 5% expects 0.5 survivors from a top-10 and needs k≈200 to land ten — and relevance correlates with permission, so the lowest-access users lose their best results and keep the company-wide boilerplate. Pre-filter inside the search for ranking, re-check the surviving ids against the authority for disclosure (that drop rate is your sync lag as a number), index groups not users, and run the recall test against your least-privileged role.',
      '新增深入解析《权限感知检索》（R14）：检索之后再过滤 top-k 没有错误状态，于是一个权限缺陷以「搜索变差了」的面目抵达，并被当成相关性问题 debug 一整周。你需要的超额抓取倍数是 1/v，其中 v 是提问用户在语料库中可见的比例——一个只看到 5% 的用户，从 top-10 里期望存活 0.5 个，要拿到十个就需要 k≈200——而相关性与权限是相关的，所以权限最低的那批用户丢掉的正是最好的结果，留下的是全公司通用的样板话。请在检索内部前置过滤以获得排序，把存活的 id 拿去权威方复核以获得披露边界（那个丢弃率就是你同步延迟的数字形态），索引组而不是用户，并对你权限最少的那个角色跑召回测试。',
    ),
    L(
      'New Deep-Dive, Evaluating Multi-Turn Agents (E13): a recorded conversation expires at the first turn the agent deviates, because turn three\'s expected answer assumed turn two\'s reply — and the bias runs against the agent that diagnoses in one turn what the recording took four to reach. Generate the user and the simulator joins the system under test: τ²-bench models it as a dual-control Dec-POMDP where both sides hold tools, and the official harness\'s no-thought-carry-over policy alone is reported to cost 3–5 points, larger than most announced model gaps. Publish the simulator, its prompt, the carry-over policy and the turn limit beside every number; grade the end state in the database; make a quarter of cases end in no write; log goal-shift recovery time and redundant tool calls.',
      '新增深入解析《评估多轮智能体》（E13）：一段录下来的对话，在智能体第一次偏离的那一轮就过期了，因为第三轮的期望答案假定了第二轮的回复——而这份偏置恰恰针对那个「一轮就诊断出录音花了四轮才搞清之事」的智能体。把用户生成出来，模拟器就加入了被测系统：τ²-bench 把它建模为双方都握有工具的双控 Dec-POMDP，而光是官方框架那条「不携带思维」策略，据报告就要付出 3 到 5 分——比大多数被宣布的模型差距都大。请把模拟器、它的提示词、携带策略与轮数上限公布在每个数字旁边；在数据库里评最终状态；让四分之一的用例以「不该写入」收场；并记录目标切换恢复时间与冗余工具调用。',
    ),
    L(
      'Rebuilt Concept, Structured outputs (B8), 866 → ~2,200 words: the most-linked unrebuilt page on the topic (64 inbound links) had no product, number or date in it. It now argues that enforcement deletes the one loud failure and installs three quiet ones that live outside the schema — a refusal arriving in a shape the schema never described, a truncation yielding a valid prefix of an invalid document, and a deterministic pre-generation rejection that retry logic will loop on forever. New: strict mode has no optional fields at OpenAI (every property required, optional expressed as a union with null) and rations them at Anthropic (per request, 20 strict tools, 24 optional parameters across all strict schemas, 16 union-typed parameters, 180-second compile timeout), so every field you declare is a compulsory question and the schema is your fabrication lever; the four-branch parse path; compiling schemas in CI; and the honest state of the quality debate — Tam et al. 2024 found JSON mode worst on reasoning, while 2026 follow-ups match or beat unconstrained under matched prompts and attribute the original effect to premature serialisation, which is why reasoning goes above the verdict.',
      '重写概念页《结构化输出》（B8），866 → 约 2,200 词：这个主题下未被重写过、入链最多的页面（64 条入链）里没有一个产品、数字或日期。它现在主张：强制约束删掉了那一个很吵的失败，却装进三个住在 schema 之外的安静失败——一次以 schema 从未描述过的形状抵达的拒绝、一次产出「无效文档的有效前缀」的截断，以及一次确定性的生成前驳回，而重试逻辑会对它永远循环。新增：严格模式在 OpenAI 那边根本没有可选字段（每个属性都必填，可选要表达成与 null 的联合类型），在 Anthropic 那边则对它限量（按请求计：20 个严格工具、横跨所有严格 schema 共 24 个可选参数、16 个联合类型参数、180 秒编译超时），所以你声明的每一个字段都是一道必答题，而 schema 就是你编造率的那根杠杆；那条四分支解析路径；在 CI 里编译 schema；以及那场质量之争的诚实现状——Tam 等人 2024 年发现 JSON 模式在推理上最差，而 2026 年的后续工作在提示词对齐的条件下追平或胜过无约束，并把最初那个效应归因于过早序列化，这正是为什么推理要放在裁决之上。',
    ),
  ],
  lines: ['co', 'dd', 'bl'],
};

export default entry;
