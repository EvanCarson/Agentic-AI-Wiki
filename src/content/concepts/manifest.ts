// Ordered structure for the Concepts encyclopedia (beginner → intermediate).
// `page` is the fragment file basename; `slug` is the public URL segment.
// Bilingual data (title/summary/group) lives here, NOT in the HTML fragments.
//
// Content agents (C1–C4) ONLY add HTML fragment pairs under
// src/content/concepts/{en,zh}/<page>.html — they NEVER edit this file.
// Phase 3 (I1) registers entries here. Keep ENTRIES empty until then.
import type { Locale, Localized } from '../../i18n/index';

export interface Entry {
  /** Fragment file basename, e.g. `ai-foundations` → src/content/concepts/{en,zh}/ai-foundations.html */
  page: string;
  /** Public URL segment, lowercase-kebab. Usually equal to `page`. */
  slug: string;
  /** Localized entry title. */
  title: Localized;
  /** Localized one-line summary shown on the index. */
  summary: Localized;
  /** Optional localized group/section label for grouping on the index. */
  group?: Localized;
}

const L = (en: string, zh: string): Localized => ({ en, zh });
// `L` is intentionally exported so manifest entries (added in Phase 3) can use it.
export { L };

// Phase 3 (I1) registered content-agent entries below, in agent order
// (C1, C2, C3, C4), preserving each agent's internal order. Groups are kept
// as each agent provided them — the index buckets by these strings.
export const entries: Entry[] = [
  // --- C1 — AI Foundations 101 (8) ---
  { page: 'what-is-ai', slug: 'what-is-ai', title: L('What is AI, ML & Deep Learning?','什么是 AI、机器学习与深度学习？'), summary: L('AI, machine learning, and deep learning are nested circles, not synonyms — and which one you are looking at predicts how a system fails.','AI、机器学习与深度学习是层层嵌套的同心圆，而非同义词——你看的是哪一层，决定了一个系统会如何失败。'), group: L('AI Foundations','AI 基础') },
  { page: 'neural-networks-intuition', slug: 'neural-networks-intuition', title: L('Neural Networks, Intuitively','直观理解神经网络'), summary: L('A neural network is a big stack of adjustable knobs that turns numbers into numbers; learning is just nudging those knobs toward less error.','神经网络是一大堆把数字变成数字的可调旋钮；学习不过是把这些旋钮朝更小的误差微调。'), group: L('AI Foundations','AI 基础') },
  { page: 'what-is-an-llm', slug: 'what-is-an-llm', title: L('What Is a Large Language Model?','什么是大语言模型？'), summary: L('An LLM is a huge next-token predictor; scale turned that one simple objective into abilities nobody explicitly programmed.','LLM 是一个巨大的下一令牌预测器；规模把这一个简单目标变成了无人显式编写的能力。'), group: L('AI Foundations','AI 基础') },
  { page: 'training-vs-inference', slug: 'training-vs-inference', title: L('Training vs Inference','训练与推理'), summary: L('Training builds the model’s frozen weights once; inference runs them per request and never changes them — which answers most cost and privacy questions.','训练一次性造出模型被冻结的权重；推理按请求运行它们且从不改变它们——这解答了大多数成本与隐私问题。'), group: L('AI Foundations','AI 基础') },
  { page: 'tokens-and-tokenization', slug: 'tokens-and-tokenization', title: L('Tokens & Tokenization','令牌与分词'), summary: L('Models see integers, not text; the hidden tokenization step explains your bill, your context limit, and odd failure modes.','模型看到的是整数而非文本；隐藏的分词步骤解释了你的账单、上下文上限和古怪的失败模式。'), group: L('AI Foundations','AI 基础') },
  { page: 'embeddings', slug: 'embeddings', title: L('Embeddings: Meaning as Geometry','嵌入：意义即几何'), summary: L('Embeddings turn things into points in space so that similar becomes close — the engine behind search, recommendations, and RAG.','嵌入把事物变成空间中的点，让“相似”变成“接近”——这是搜索、推荐和 RAG 背后的引擎。'), group: L('AI Foundations','AI 基础') },
  { page: 'transformers-overview', slug: 'transformers-overview', title: L('Transformers, at a High Level','从宏观看 Transformer'), summary: L('Self-attention lets every token look at every other token; that one idea fixed long-range memory and unlocked GPU-scale training.','自注意力让每个令牌都能看其他每个令牌；这一个思想修复了长程记忆并解锁了 GPU 规模的训练。'), group: L('AI Foundations','AI 基础') },
  { page: 'temperature-and-sampling', slug: 'temperature-and-sampling', title: L('Generation & Sampling: Temperature','生成与采样：讲清温度'), summary: L('The model returns a probability distribution, not an answer; temperature reshapes it, and temperature 0 is low-variance, not deterministic.','模型返回的是一个概率分布而非一个答案；温度重塑它，而温度 0 是低方差，并非确定性。'), group: L('AI Foundations','AI 基础') },

  // --- C2 — Agentic AI Explained (8) ---
  { page: 'what-is-an-agent', slug: 'what-is-an-agent', title: L('What Is an AI Agent?','什么是 AI 智能体？'), summary: L('An agent is a model placed in a loop with tools, choosing each next action toward a goal — the core mental model.','智能体是被放进循环、配有工具、自行选择每个下一步以实现目标的模型——核心思维模型。'), group: L('Agentic AI','智能体 AI') },
  { page: 'the-agent-loop', slug: 'the-agent-loop', title: L('The Agent Loop','智能体循环'), summary: L('Reason → act → observe → repeat: tracing a tool call from the model through the harness into the environment and back.','推理→行动→观察→重复：追踪一次工具调用如何从模型经外壳进入环境再返回。'), group: L('Agentic AI','智能体 AI') },
  { page: 'autonomy-levels', slug: 'autonomy-levels', title: L('Autonomy Levels','自主性等级'), summary: L('A five-rung ladder from suggest to fully autonomous, and why the right level is a per-action engineering decision.','从"建议"到"完全自主"的五级阶梯，以及为何合适的等级是逐动作的工程决策。'), group: L('Agentic AI','智能体 AI') },
  { page: 'agents-vs-chatbots-workflows', slug: 'agents-vs-chatbots-workflows', title: L('Agents vs Chatbots vs Workflows','智能体 vs 聊天机器人 vs 工作流'), summary: L('One question — who decides the next step — sorts any LLM system into chatbot, pipeline, workflow, or agent.','一个问题——谁决定下一步——就能把任何 LLM 系统归入聊天机器人、流水线、工作流或智能体。'), group: L('Agentic AI','智能体 AI') },
  { page: 'tools-actions-environments', slug: 'tools-actions-environments', title: L('Tools, Actions & Environments','工具、动作与环境'), summary: L('What a tool really is, read vs write actions, and why the environment — not the model — is where agents become dangerous.','工具的真实面貌、读动作与写动作之分，以及为何是环境而非模型让智能体变得危险。'), group: L('Agentic AI','智能体 AI') },
  { page: 'planning-and-termination', slug: 'planning-and-termination', title: L('Goals, Planning & Termination','目标、规划与终止'), summary: L('The planning spectrum from reactive to deliberative, and the under-appreciated hard problem of knowing when an agent is done.','从反应式到深思熟虑的规划谱系，以及"如何知道智能体完成了"这个被低估的难题。'), group: L('Agentic AI','智能体 AI') },
  { page: 'when-to-use-an-agent', slug: 'when-to-use-an-agent', title: L('When to Use an Agent','何时该用智能体'), summary: L('The three properties a task needs to justify an agent, the cheaper patterns that solve most cases, and clear do-not cases.','一个任务要值得用智能体所需的三个属性、能解决多数情况的更便宜模式，以及明确不该用的情形。'), group: L('Agentic AI','智能体 AI') },
  { page: 'agentic-risks-intro', slug: 'agentic-risks-intro', title: L('Risks & Limits of Agents','智能体的风险与局限'), summary: L('The four characteristic loop failure modes, the security shift autonomy brings, and what "safe agent" honestly means.','循环的四种特征性故障模式、自主性带来的安全转变，以及"安全的智能体"诚实地意味着什么。'), group: L('Agentic AI','智能体 AI') },
  { page: 'prompt-injection-101', slug: 'prompt-injection-101', title: L('Prompt injection, in plain words','用大白话讲提示词注入'), summary: L('What prompt injection actually is, why it\'s not a bug a vendor can patch, and the three real defenses available to you.','提示词注入究竟是什么、为何它不是哪家厂商能打补丁的 bug，以及你真正能用的三种防御手段。'), group: L('Agentic AI','智能体 AI') },

  // --- C3 — Core Building Blocks (8) ---
  { page: 'prompting-basics', slug: 'prompting-basics', title: L('Prompting basics','提示词基础'), summary: L('The four levers that move output quality: instruction, context, examples, output shape.','撬动输出质量的四个杠杆：指令、上下文、示例、输出形式。'), group: L('Building Blocks','基础构件') },
  { page: 'system-vs-user-prompts', slug: 'system-vs-user-prompts', title: L('System vs user prompts','系统提示词 vs 用户提示词'), summary: L('Message roles, the instruction hierarchy, and never letting data act as instructions.','消息角色、指令层级，以及绝不让数据充当指令。'), group: L('Building Blocks','基础构件') },
  { page: 'few-shot-prompting', slug: 'few-shot-prompting', title: L('Few-shot prompting & examples','少样本提示与示例'), summary: L('When examples beat instructions, how to choose/order them, and where they stop paying off.','何时示例胜过指令、如何挑选与排序，以及它们在何处不再划算。'), group: L('Building Blocks','基础构件') },
  { page: 'context-windows', slug: 'context-windows', title: L('Context windows explained','上下文窗口详解'), summary: L('The finite shared token budget, the three limit failures, and managing it actively.','有限的共享令牌预算、三种上限故障，以及主动管理它。'), group: L('Building Blocks','基础构件') },
  { page: 'tool-calling-explained', slug: 'tool-calling-explained', title: L('Tool / function calling explained','工具/函数调用详解'), summary: L('The model proposes, your code disposes: the request/response shape, the loop, the safety rules.','模型提议、你的代码裁决：请求/响应形状、循环与安全规则。'), group: L('Building Blocks','基础构件') },
  { page: 'what-is-rag', slug: 'what-is-rag', title: L('Retrieval-augmented generation (RAG) explained','检索增强生成（RAG）详解'), summary: L('Retrieve→augment→generate, RAG vs alternatives, and debugging it in two halves.','检索→增强→生成、RAG 对比其他方案，以及分两半调试它。'), group: L('Building Blocks','基础构件') },
  { page: 'chunking-and-vector-search', slug: 'chunking-and-vector-search', title: L('Chunking & vector search intuition','分块与向量搜索直觉'), summary: L('Why we chunk, embeddings as coordinates, nearest-neighbour search, hybrid + reranking.','为何分块、嵌入即坐标、最近邻搜索、混合检索与重排序。'), group: L('Building Blocks','基础构件') },
  { page: 'structured-outputs', slug: 'structured-outputs', title: L('Structured outputs','结构化输出'), summary: L('From "ask for JSON" to schema-constrained decoding, plus schema design and defensive parsing.','从"要 JSON"到 schema 约束解码，外加 schema 设计与防御性解析。'), group: L('Building Blocks','基础构件') },
  { page: 'guardrails-101', slug: 'guardrails-101', title: L('Guardrails, in plain words','用大白话讲护栏'), summary: L('Guardrails are pre/post-checks around a model call, not a wall around the model — what they catch, what they miss, and where they live.','护栏是模型调用前后的检查，而不是围着模型的一堵墙——它们能拦住什么、漏掉什么，又该装在哪里。'), group: L('Building Blocks','基础构件') },
  { page: 'evals-101', slug: 'evals-101', title: L('Evals, in plain words','用大白话讲评测'), summary: L('An eval is a small, trusted scoreboard you run against your own task — why public benchmarks aren\'t enough, and what a useful eval set looks like.','评测是你针对自己任务运行的一个小而可信的记分牌——为何公开基准不够用，以及一个有用的评测集长什么样。'), group: L('Building Blocks','基础构件') },

  // --- C4 — The AI Model & Tooling Ecosystem (9) ---
  { page: 'model-families', slug: 'model-families', title: L('The model landscape: families & providers','模型版图：家族与提供方'), summary: L('A vendor-neutral map of the major model families and a durable mental model for placing any new release.','一份厂商中立的主要模型家族地图，以及给任何新发布定位的稳定思维模型。'), group: L('AI Ecosystem','AI 生态') },
  { page: 'open-vs-closed-models', slug: 'open-vs-closed-models', title: L('Open-weight vs closed models','开放权重 vs 闭源模型'), summary: L('Control, cost, privacy, licensing and lock-in — the real engineering trade-offs, without the marketing.','控制力、成本、隐私、许可与锁定——真实的工程权衡，去除营销话术。'), group: L('AI Ecosystem','AI 生态') },
  { page: 'modalities', slug: 'modalities', title: L('Modalities & multimodal models','模态与多模态模型'), summary: L('Text, vision, audio, code: input vs output modalities and why "multimodal" is a spectrum, not a checkbox.','文本、视觉、音频、代码：输入与输出模态，以及为何"多模态"是谱系而非勾选项。'), group: L('AI Ecosystem','AI 生态') },
  { page: 'cost-quality-latency', slug: 'cost-quality-latency', title: L('Cost, quality & latency','成本、质量与延迟'), summary: L('Model size and the trade-off triangle that dominates production model economics, and how to engineer around it.','模型规模与主导生产经济性的权衡三角，以及如何围绕它做工程。'), group: L('AI Ecosystem','AI 生态') },
  { page: 'reasoning-models', slug: 'reasoning-models', title: L('Reasoning vs non-reasoning models','推理 vs 非推理模型'), summary: L('What inference-time "thinking" actually does, when it helps or wastes money, and why it is now a dial.','推理期"思考"实际做了什么、何时有用或浪费钱，以及为何它如今是一个旋钮。'), group: L('AI Ecosystem','AI 生态') },
  { page: 'agent-frameworks', slug: 'agent-frameworks', title: L('Agent frameworks & orchestration','智能体框架与编排'), summary: L('LangChain, LlamaIndex, provider SDKs and the broader landscape — by category and trade-off, not by brand.','LangChain、LlamaIndex、提供方 SDK 与更广版图——按类别与权衡，而非按品牌。'), group: L('AI Ecosystem','AI 生态') },
  { page: 'inference-providers', slug: 'inference-providers', title: L('Serving & access: APIs, local, gateways','服务与访问：API、本地、网关'), summary: L('Model choice and serving choice are orthogonal: first-party APIs, cloud catalogs, inference providers, self-host, gateways.','模型选择与服务选择是正交的：第一方 API、云目录、推理提供方、自托管、网关。'), group: L('AI Ecosystem','AI 生态') },
  { page: 'reading-benchmarks', slug: 'reading-benchmarks', title: L('Reading benchmarks critically','批判地阅读基准'), summary: L('Why leaderboard rank rarely predicts your task, and why a small custom eval set beats every public number.','为何排行榜名次很少预测你的任务，以及为何小的自定义评测集胜过一切公开数字。'), group: L('AI Ecosystem','AI 生态') },
  { page: 'choosing-a-model', slug: 'choosing-a-model', title: L('Choosing a model: a checklist','选模型：一份清单'), summary: L('A repeatable, constraint-first decision procedure that synthesizes the whole topic and survives a fast-moving field.','一套约束优先、可重复的决策流程，综合整个主题并能在快速变动的领域中存活。'), group: L('AI Ecosystem','AI 生态') },

  // --- 2026-07 Concepts expansion (5) — appended; groupedEntries() merges each into its existing group bucket ---
  { page: 'agent-memory', slug: 'agent-memory', title: L('Agent Memory: Short-Term vs Long-Term','智能体记忆：短期与长期'), summary: L('The context window is an agent’s short-term memory and it resets every session; durable behavior needs an external long-term store you write to and retrieve from on purpose.','上下文窗口是智能体的短期记忆，每次会话都会重置；持久的行为需要一个你有意写入并检索的外部长期存储。'), group: L('Agentic AI','智能体 AI') },
  { page: 'computer-use', slug: 'computer-use', title: L('Computer Use & GUI Agents','计算机操作与图形界面智能体'), summary: L('When there is no API, an agent can drive the screen itself — reading a screenshot and synthesizing clicks and keystrokes — which unlocks any software but is slow, brittle, and a fresh attack surface.','当没有 API 时，智能体可以自己操作屏幕——读取截图并合成点击与按键——这解锁了任何软件，却缓慢、脆弱，并带来全新的攻击面。'), group: L('Agentic AI','智能体 AI') },
  { page: 'context-engineering', slug: 'context-engineering', title: L('Context Engineering','上下文工程'), summary: L('Prompt engineering words one instruction; context engineering decides everything else that fills the window — retrieval, memory, tool results, history — and when to compact it. It is the core discipline of building agents.','提示词工程打磨一条指令；上下文工程决定填满窗口的其余一切——检索、记忆、工具结果、历史——以及何时压缩它。它是构建智能体的核心工程。'), group: L('Building Blocks','基础构件') },
  { page: 'fine-tuning-vs-rag-vs-prompting', slug: 'fine-tuning-vs-rag-vs-prompting', title: L('Fine-Tuning, RAG, or Prompting?','微调、RAG 还是提示词？'), summary: L('Three ways to adapt a base model to your task change three different things — the instruction, the retrieved context, or the weights. Picking wrong wastes months; the right order is usually prompt, then RAG, then fine-tune.','把基础模型适配到你的任务有三种方式，它们改变三样不同的东西——指令、检索到的上下文，或权重。选错会浪费数月；正确的顺序通常是先提示词、再 RAG、最后微调。'), group: L('Building Blocks','基础构件') },
  { page: 'what-is-mcp', slug: 'what-is-mcp', title: L('What Is the Model Context Protocol (MCP)?','什么是模型上下文协议（MCP）？'), summary: L('MCP is an open standard that lets any model talk to any tool or data source through one interface — turning M×N custom integrations into M+N.','MCP 是一个开放标准，让任何模型通过同一个接口连接任何工具或数据源——把 M×N 个定制集成变成 M+N。'), group: L('AI Ecosystem','AI 生态') },

  // --- 2026-07-15 Concepts batch 2 (3) — appended; groupedEntries() merges each into its existing group bucket ---
  { page: 'multi-agent-systems', slug: 'multi-agent-systems', title: L('Multi-Agent Systems','多智能体系统'), summary: L('One strong agent is the baseline, not the goal; you reach for multiple cooperating agents only when a task is genuinely parallel or needs separate specialized contexts — and you pay in coordination cost, error propagation, and tokens.','一个强大的单智能体才是基线，而非目标；只有当任务确实可并行、或需要相互隔离的专门上下文时，才该动用多个协作智能体——代价是协调开销、错误传播与 token 消耗。'), group: L('Agentic AI','智能体 AI') },
  { page: 'voice-and-realtime-agents', slug: 'voice-and-realtime-agents', title: L('Voice & Realtime Agents','语音与实时智能体'), summary: L('Talking to an agent in real time makes latency the whole design problem, and forces one architectural choice: a swappable STT→LLM→TTS cascade you can inspect, or a single speech-to-speech model that trades that control for speed and natural prosody.','与智能体实时对话让延迟成为整个设计难题，并逼出一个架构抉择：可拆解、可审查的 STT→LLM→TTS 级联，还是用控制力换取速度与自然语调的单一语音到语音模型。'), group: L('Agentic AI','智能体 AI') },
  { page: 'agent-evaluation', slug: 'agent-evaluation', title: L('Evaluating Agents','评估智能体'), summary: L('An agent produces a trajectory, not a single answer, so grading only the final output hides broken paths — evaluating an agent means scoring the steps it took, on your own tasks, with cost and safety on the same scoreboard as accuracy.','智能体产出的是一条轨迹，而非单一答案，所以只给最终输出打分会掩盖走坏的路径——评估一个智能体，意味着在你自己的任务上为它走过的每一步打分，并把成本与安全和准确率放在同一张记分牌上。'), group: L('Building Blocks','基础构件') },

  // --- 2026-07-15 human-in-the-loop (Agentic AI) ---
  { page: 'human-in-the-loop', slug: 'human-in-the-loop', title: L('Human-in-the-Loop','人在回路'), summary: L('Human-in-the-loop is not the opposite of automation — it is where you place a human checkpoint. Gate the few consequential, irreversible actions and let the rest run; the trap is the rubber-stamped approval that adds latency and false confidence while catching nothing.','人在回路不是自动化的反面——它是你把人的检查点放在哪里。给少数有后果、不可逆的动作设闸，其余放行；陷阱是那种橡皮图章式的批准：它增加延迟与虚假信心，却什么也拦不住。'), group: L('Agentic AI','智能体 AI') },

  // --- 2026-07-25 running an agent for real: fabrication, cost, visibility, isolation, authority ---
  { page: 'hallucination-and-grounding', slug: 'hallucination-and-grounding', title: L('Hallucination & Grounding','幻觉与接地'), summary: L('A model invents fluent answers because fluency, not truth, is what it optimizes — so fabrication is structural, not a bug awaiting a patch. Grounding puts the evidence in the context and requires the answer to come from it, which does not eliminate invention but makes it cheap to catch.','模型会编出流畅的答案，因为它优化的是流畅而非真实——所以编造是结构性的，而非等待打补丁的 bug。接地把证据放进上下文并要求答案出自其中，这消除不了杜撰，却让发现杜撰变得廉价。'), group: L('AI Foundations','AI 基础') },
  { page: 'prompt-caching', slug: 'prompt-caching', title: L('Prompt Caching','提示词缓存'), summary: L('Caching is a prefix match: stable content first, volatile content last, and one stray timestamp in the system prompt silently invalidates everything after it. Reads cost roughly a tenth of base input price, writes carry a premium — and in an agent loop that resends the whole transcript each step, this stops being an optimization and becomes structural.','缓存是前缀匹配：稳定内容在前、易变内容在后，而系统提示词里一个不起眼的时间戳就会悄然让其后一切失效。读取约为基础输入价的十分之一，写入则要付溢价——而在每一步都重发整份记录的智能体循环里，这已不再是优化项，而是结构性问题。'), group: L('Building Blocks','基础构件') },
  { page: 'agent-observability', slug: 'agent-observability', title: L('Agent Observability & Tracing','智能体可观测性与追踪'), summary: L('A run is a tree of spans, not a log line: the prompt as actually sent, the tool arguments, the result, the cost, and a trace ID threading it all. Logging only the final answer records where the failure surfaced, never where it happened.','一次运行是一棵跨度构成的树，而非一行日志：实际发送出去的提示词、工具参数、返回结果、成本，以及贯穿其间的一个追踪 ID。只记录最终答案，记下的是失败浮现之处，而非失败发生之处。'), group: L('Building Blocks','基础构件') },
  { page: 'sandboxing-and-code-execution', slug: 'sandboxing-and-code-execution', title: L('Sandboxing & Code Execution','沙箱与代码执行'), summary: L('Code is the universal tool — and agent-written code is untrusted code, always, because its output depends on inputs you do not control. Isolation is five independent decisions (filesystem, egress, credentials, compute, lifetime), and network egress is the one most often left wide open.','代码是那个万能工具——而智能体写出的代码永远是不可信代码，因为它的输出取决于你并不掌控的输入。隔离是五条彼此独立的决策（文件系统、出站、凭据、算力、生命周期），其中网络出站最常被大敞着。'), group: L('Agentic AI','智能体 AI') },
  { page: 'agent-identity-and-permissions', slug: 'agent-identity-and-permissions', title: L('Agent Identity & Permissions','智能体身份与权限'), summary: L('Authentication, authorization, and attribution are three questions that one shared API key answers badly. An agent’s permissions should be the intersection of what the user may do and what the task needs — and because they are enforced outside the model, they are the one defense that still holds when prompt injection wins.','认证、授权与归属是三个问题，而一把共用的 API 密钥把它们都答砸了。智能体的权限应当是"用户可以做什么"与"任务需要什么"的交集——而由于它们在模型之外被强制执行，它们是提示词注入得手时唯一仍然撑得住的防线。'), group: L('Agentic AI','智能体 AI') },

  // --- 2026-07-26 local knowledge bases: owning the retrieval stack on your own hardware ---
  { page: 'local-knowledge-bases', slug: 'local-knowledge-bases', title: L('Local Knowledge Bases','本地知识库'), summary: L('"Local" is three independent dials — where documents sit, where embeddings are computed, where generation happens — and most real setups are local on the first two only. Owning the pipeline buys provable data residency and a retrieval bill of zero; it costs you recall quality, index maintenance, and a full re-embed every time you change embedding models.','"本地"是三个彼此独立的旋钮——文档存在哪、嵌入在哪算、生成在哪发生——而多数真实方案只在前两个上是本地的。自己扛下这条流水线，买到的是可证明的数据驻留与归零的检索账单；付出的是召回质量、索引维护，以及每次更换嵌入模型都要重嵌一遍全部内容。'), group: L('Building Blocks','基础构件') },
  { page: 'knowledge-graphs', slug: 'knowledge-graphs', title: L('Knowledge Graphs','知识图谱'), summary: L('Vector search returns passages that look like the question, so it structurally cannot answer what is spread across documents. A graph stores relationships instead of prose — winning multi-hop and whole-corpus questions, and paying for it with an LLM pass over your entire corpus and an entity-resolution problem that never fully goes away.','向量搜索返回的是看起来像问题的段落，因此它在结构上答不了那些散落在多份文档之间的问题。图谱存的是关系而非散文——赢下多跳与全局性问题，代价是要在整个语料上跑一遍 LLM，以及一个永远无法彻底消失的实体消歧问题。'), group: L('Building Blocks','基础构件') },
  { page: 'small-and-local-models', slug: 'small-and-local-models', title: L('Small & Local Models','小模型与本地模型'), summary: L('The question is not whether a model you can run yourself matches a frontier one — it does not — but which jobs never needed one. Embedding, reranking, routing and extraction are the high-volume steps, and they are exactly where a quantized 0.5–8B model on your own hardware is good enough and orders of magnitude cheaper.','问题不是你自己能跑起来的模型能否追平前沿模型——它不能——而是哪些活儿本来就用不着前沿模型。嵌入、重排序、路由与抽取才是高频步骤，而它们恰恰是自有硬件上一个量化后的 0.5–8B 模型既够用、又便宜好几个数量级的地方。'), group: L('AI Ecosystem','AI 生态') },
  // --- 2026-07-27 batch (5): the gaps the 2026-07-26 batch left open ---
  { page: 'streaming-and-partial-output', slug: 'streaming-and-partial-output', title: L('Streaming & Partial Output','流式输出与中间结果'), summary: L('Streaming does not make a model faster — it makes the wait legible, and it moves every output guardrail you own to a place where it may now run too late.','流式输出不会让模型变快——它让等待变得可见，同时把你所有的输出侧护栏挪到了一个可能已经太晚的位置。'), group: L('Building Blocks','基础构件') },
  { page: 'agent-cost-control', slug: 'agent-cost-control', title: L('Agent Cost Control','智能体成本控制'), summary: L('An agent re-sends the whole transcript every step, so total input grows with the square of the step count — which is why a cheaper model is almost never the fix.','智能体每一步都会重发整段对话，因此累计输入随步数的平方增长——这正是「换个便宜模型」几乎从来都不是解法的原因。'), group: L('Agentic AI','智能体 AI') },
  { page: 'agent-interoperability', slug: 'agent-interoperability', title: L('Agent Interoperability & A2A','智能体互操作与 A2A'), summary: L('MCP hands your agent a tool; A2A introduces it to a peer with its own goals, latency and failure modes — and the protocol solves discovery, not trust.','MCP 递给你的智能体一件工具；A2A 把它介绍给一个有自己目标、延迟与失效模式的对等方——而协议解决的是发现，不是信任。'), group: L('AI Ecosystem','AI 生态') },
  { page: 'synthetic-data', slug: 'synthetic-data', title: L('Synthetic Data','合成数据'), summary: L('Model-generated training data is safe in proportion to how good your filter is — collapse is a property of the pipeline, not of the data.','由模型生成的训练数据，其安全程度与筛选器的质量成正比——崩塌是流水线的属性，而非数据的属性。'), group: L('AI Foundations','AI 基础') },
  { page: 'distillation-and-quantization', slug: 'distillation-and-quantization', title: L('Distillation & Quantization','蒸馏与量化'), summary: L('Distillation trains a new, smaller model; quantization stores the same weights at lower precision. One is GPU-days and irreversible, the other is minutes and is not.','蒸馏训练的是一个全新的小模型；量化存储的是同一批权重的低精度版本。前者以 GPU 天计且不可逆，后者以分钟计且可逆。'), group: L('AI Foundations','AI 基础') },

  // --- 2026-07-28 batch (5): caching beyond the prefix, tool design, routing, residency, post-training ---
  { page: 'tool-design-for-agents', slug: 'tool-design-for-agents', title: L('Designing Tools for Agents','为智能体设计工具'), summary: L('When an agent picks the wrong tool or loops on a failing call, the bug is almost always in your tool — a tool is an interface for a reader with no docs, no memory between calls, and a token budget.','当智能体挑错工具、或对着一个失败的调用死循环时，问题几乎总是出在你的工具上——工具是写给这样一位读者的接口：没有文档、两次调用之间不记事、还受令牌预算约束。'), group: L('Agentic AI','智能体 AI') },
  { page: 'semantic-caching', slug: 'semantic-caching', title: L('Semantic Caching','语义缓存'), summary: L('Every other cache can only be slow; a semantic cache can be wrong, because it decides a hit by similarity score rather than equality. It is not a caching feature — it is a retrieval system with a false-positive budget.','其他缓存最坏也不过是慢；语义缓存却可能答错，因为它靠相似度得分而非相等判断来决定命中。它不是一项缓存功能——它是一套带着误报预算的检索系统。'), group: L('Building Blocks','基础构件') },
  { page: 'model-routing', slug: 'model-routing', title: L('Model Routing & Cascades','模型路由与级联'), summary: L('Routing pays only when judging "is this hard?" is cheaper and more reliable than answering — which is why static routing by task captures most of the savings, and a cascade needs a verifier you already have.','只有当判断「这难不难」比直接作答更便宜、也更可靠时，路由才划算——这正是按任务的静态路由就能拿下大部分节省、而级联需要一个你手里已有的验证器的原因。'), group: L('AI Ecosystem','AI 生态') },
  { page: 'data-residency-and-sovereignty', slug: 'data-residency-and-sovereignty', title: L('Data Residency & Sovereignty','数据驻留与数据主权'), summary: L('Residency is geography, sovereignty is jurisdiction, and a region toggle answers one of the four questions your legal team is asking. For an agent, the leak is usually the trace, not the model endpoint.','驻留是地理，主权是司法管辖，而那个区域开关只回答了法务在问的四个问题中的一个。对智能体而言，泄漏点通常是追踪系统，而不是模型端点。'), group: L('AI Ecosystem','AI 生态') },
  { page: 'post-training-and-alignment', slug: 'post-training-and-alignment', title: L('Post-Training: Base Model to Assistant','后训练：从基座模型到助手'), summary: L('Refusals, sycophancy, formatting habits and the assistant persona itself are installed after pre-training, in a comparatively cheap layer rebuilt for every release — which is why a minor version bump can move behavior more than a capability upgrade.','拒绝、谄媚、排版习惯乃至助手人格本身，都是在预训练之后、在一个每发布一版就重做一次的相对廉价的层里装上去的——这正是一次小版本升级对行为的改动可能大过一次能力升级的原因。'), group: L('AI Foundations','AI 基础') },

  // --- 2026-07-28 batch 2 (5): review UX, the batch lane, inference mechanics, language, time ---
  { page: 'agent-ux-patterns', slug: 'agent-ux-patterns', title: L('Agent UX: Designing for Review','智能体的交互设计：为复核而设计'), summary: L('An agent that saves an hour is worthless if checking it costs fifty minutes — review cost is the metric your interface actually optimizes, and an editable plan plus a working undo beat every confirmation dialog you could add.','一个省下一小时的智能体，如果复核它要花五十分钟就毫无价值——复核成本才是你的界面真正在优化的指标，而一份可编辑的计划加一个能用的撤销，胜过你能加上去的任何确认弹窗。'), group: L('Agentic AI','智能体 AI') },
  { page: 'multilingual-agents', slug: 'multilingual-agents', title: L('Multilingual & Cross-Lingual Agents','多语言与跨语言智能体'), summary: L('Adding a language breaks three things at once — tokens, retrieval, and evaluation — and generation quality, the part everyone tests, is the least broken of them. The cross-lingual retrieval miss is invisible from a fluent final answer.','多加一种语言会同时打坏三样东西——令牌、检索与评测——而人人都会去测的生成质量，恰恰是坏得最轻的那个。跨语言检索的落空，从一段流畅的最终答案上完全看不出来。'), group: L('Building Blocks','基础构件') },
  { page: 'batch-and-async-inference', slug: 'batch-and-async-inference', title: L('Batch & Asynchronous Inference','批处理与异步推理'), summary: L('The same model at half price on both input and output, in exchange for a completion window measured in hours — and the work that qualifies is usually your highest-volume work. The structural catch: an agent loop can never use it.','同一个模型，输入与输出双双对折，代价只是把完成窗口拉长到以小时计——而符合条件的活儿往往正是你跑得最多的。结构性的前提是：智能体循环永远用不上它。'), group: L('AI Ecosystem','AI 生态') },
  { page: 'prefill-and-decode', slug: 'prefill-and-decode', title: L('Prefill, Decode & the KV Cache','预填充、解码与 KV 缓存'), summary: L('One model call is two machines with opposite bottlenecks: prefill reads the prompt in parallel and is compute-bound, decode writes one token at a time and is memory-bandwidth-bound. That split explains time-to-first-token, why output costs more than input, and why prompt caching must be a prefix match.','一次模型调用其实是两台瓶颈相反的机器：预填充并行读入提示词、受限于算力，解码一次写一个令牌、受限于内存带宽。这一划分解释了首令牌时延、为何输出比输入贵，以及提示词缓存为何必须是前缀匹配。'), group: L('AI Foundations','AI 基础') },
  { page: 'reproducibility-and-determinism', slug: 'reproducibility-and-determinism', title: L('Reproducibility & Nondeterminism','可复现性与非确定性'), summary: L('Temperature 0 is a sampling rule, not a guarantee: inference servers batch your request with other people\u2019s, and many kernels change their reduction strategy with batch size, so identical greedy requests return different text. The consequence for agents is that a failing run cannot be reproduced by re-running it \u2014 reproducibility has to come from records.','temperature 0 是一条采样规则，不是一份保证：推理服务器会把你的请求和别人的打成一批，而许多算子会随批大小改变归约策略，于是相同的贪心请求会返回不同的文本。对智能体的后果是，一次出错的运行无法靠重跑复现——可复现性只能来自记录。'), group: L('AI Foundations','AI 基础') },
  { page: 'knowledge-cutoffs-and-time', slug: 'knowledge-cutoffs-and-time', title: L('Knowledge Cutoffs & the Missing Clock','知识截止日与缺失的那只钟'), summary: L('The cutoff is a gradient, not a wall — knowledge of the months just before it is thinner than knowledge of two years earlier, which is exactly where confidence outruns evidence. And a model with no clock turns every date question into a fluent, self-consistent, wrong answer.','截止日是一道渐变而非一堵墙——它之前那几个月的知识比两年前更稀薄，而那恰恰是自信跑在证据前面的地方。加上一个没有钟的模型，会把每一个与日期有关的问题，都答成流畅、自洽而错误的样子。'), group: L('AI Foundations','AI 基础') },
  { page: 'agent-skills', slug: 'agent-skills', title: L('Agent Skills','智能体技能'), summary: L('A skill adds no capability — it is a folder of instructions the agent loads only when the task matches, so the hard part is not the instructions but the one-sentence description that decides whether they are ever read.','技能带不来任何新能力——它是一个装着指令的文件夹，只有当任务对得上时才被加载，所以难的不是指令本身，而是那句决定它会不会被读到的一句话描述。'), group: L('AI Ecosystem','AI 生态') },
  { page: 'speculative-decoding', slug: 'speculative-decoding', title: L('Speculative Decoding','投机解码'), summary: L('The one speedup that provably cannot change what the model says — a cheap draft guesses ahead and the real model verifies — which is why it costs you no eval cycle, and why it quietly loses throughput on a busy GPU.','唯一一种可被证明不会改变模型输出的提速手段——廉价草稿往前猜、真模型来核验——这既是它不花你一个评测周期的原因，也是它在繁忙 GPU 上悄悄吃掉吞吐的原因。'), group: L('AI Foundations','AI 基础') },
  { page: 'uncertainty-and-calibration', slug: 'uncertainty-and-calibration', title: L('Uncertainty &amp; Calibration','不确定性与校准'), summary: L('Three signals share the word "confidence" and only sampling agreement earns it, because the alignment step that made the model pleasant also made it overconfident — so the thing to build is not a number to display but an abstention threshold read off a coverage–risk curve.','三种信号共用"置信度"这个词，而只有采样一致性配得上它，因为让模型变得可亲的那步对齐同时让它过度自信——所以该造的不是一个拿去显示的数字，而是一个从覆盖率-风险曲线上读出来的弃答阈值。'), group: L('Core Building Blocks','核心构件') },
  { page: 'mixture-of-experts', slug: 'mixture-of-experts', title: L('Mixture of Experts','专家混合（MoE）'), summary: L('Parameter count stopped meaning cost: MoE splits the bill so compute follows the parameters that fire per token while memory follows all of them — which makes the same model a bargain on a rented API and an expensive mistake on your own GPUs.','参数量不再等于成本：MoE 把账单劈开，算力跟着每个令牌真正激活的参数走，显存却要跟着全部参数走——于是同一个模型，租来的 API 上是笔划算买卖，自己的 GPU 上却是一次昂贵的误判。'), group: L('AI Foundations','AI 基础') },
  { page: 'chain-of-thought-faithfulness', slug: 'chain-of-thought-faithfulness', title: L('Chain-of-Thought Faithfulness','思维链忠实性'), summary: L('A reasoning trace is generated text, not a log — models mentioned an answer-changing hint only 25–39% of the time — so approval gates, judges and injection detectors that read the thinking are grading a story; audit the tool calls instead, and never put the scratchpad in the reward.','推理轨迹是生成出来的文本，不是日志——模型只在 25–39% 的情况下提到那个改变了答案的提示——所以读"它怎么想"的审批闸门、裁判与注入检测器，评的都是一个故事；改去审计工具调用，并且永远不要把草稿纸放进奖励里。'), group: L('Core Building Blocks','核心构件') },
];

/** Flat, ordered list of all entries (mirrors field-guide CHAPTERS). */
export const ENTRIES = entries;

/**
 * The recommended five-entry "new here?" reading path for newcomers,
 * shown as a chip-list callout on the Concepts index. Ordered: LLM →
 * agent → loop → tool-calling → RAG. Kept in the manifest (not the
 * component) so the slugs sit next to the underlying entries.
 */
export const CORE_PATH_SLUGS = [
  'what-is-an-llm',
  'what-is-an-agent',
  'the-agent-loop',
  'tool-calling-explained',
  'what-is-rag',
] as const;

export type FlatEntry = (typeof ENTRIES)[number];

export function entryBySlug(slug: string): Entry | undefined {
  return ENTRIES.find(e => e.slug === slug);
}

/** Localized entry title. */
export function entryTitle(e: { title: Localized }, locale: Locale): string {
  return e.title[locale];
}

/**
 * Entries grouped by their optional `group` label, preserving manifest order.
 * Entries without a `group` are collected under a single null-keyed bucket
 * (rendered ungrouped by the index view).
 */
export function groupedEntries(locale: Locale): { group: string | null; items: Entry[] }[] {
  const out: { group: string | null; items: Entry[] }[] = [];
  for (const e of ENTRIES) {
    const key = e.group ? e.group[locale] : null;
    let bucket = out.find(b => b.group === key);
    if (!bucket) { bucket = { group: key, items: [] }; out.push(bucket); }
    bucket.items.push(e);
  }
  return out;
}
