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
];

/** Flat, ordered list of all entries (mirrors field-guide CHAPTERS). */
export const ENTRIES = entries;

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
