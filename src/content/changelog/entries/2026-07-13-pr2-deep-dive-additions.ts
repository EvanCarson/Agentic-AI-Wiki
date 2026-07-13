import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-13',
  title: L(
    'Deep-Dive additions across seven groups + new Evaluating Agents group (27 essays)',
    '七个分组下的深入解析新增 + 新增"评估智能体"分组（27 篇）',
  ),
  items: [
    L(
      'Added 27 new Deep-Dive essays: 4 in Architectures & Patterns (durable execution, context caching, browser failure modes, Claude Managed Agents), 5 in Protocols & Interop (A2A v1.0, agent cards, ACP post-mortem, AP2, agents.json), 4 in Memory & Context Engineering (write-path, poisoning defenses, effective long context, MemRL), 4 in Training Agentic Models (RLVR+GRPO, RL fine-tuning open weights, process reward models, DSPy 3+GEPA), 1 in Multi-Agent Systems (sub-agent patterns), 1 in Reasoning & Test-Time Compute (adaptive thinking), and 5 in Tool & Capability Design (vendor matrix, advanced orchestration, structured outputs vs tool calls, JSON Schema subsets, streaming tool calls).',
      '新增 27 篇深入解析：架构与模式 4 篇（持久执行、上下文缓存、浏览器失败模式、Claude Managed Agents），协议与互操作 5 篇（A2A v1.0、Agent Card、ACP 复盘、AP2、agents.json），记忆与上下文工程 4 篇（写入路径、毒化防御、有效长上下文、MemRL），训练智能体模型 4 篇（RLVR+GRPO、开放权重 RL 微调、过程奖励模型、DSPy 3+GEPA），多智能体系统 1 篇（子智能体模式），推理与测试时计算 1 篇（自适应思考），以及工具与能力设计 5 篇（厂商对照矩阵、进阶编排、结构化输出与工具调用、JSON Schema 子集、流式工具调用）。',
    ),
    L(
      'New Evaluating Agents group (order 100) with 3 essays: judge calibration and meta-evaluation collapse, the 2026 benchmark landscape (SWE-bench Verified saturation, SWE-bench Pro, Gaia2, tau2-bench), and HAL + asynchronous agent eval.',
      '新增"评估智能体"分组（order 100），含 3 篇：评判器校准与元评测坍缩、2026 年基准全景（SWE-bench Verified 饱和、SWE-bench Pro、Gaia2、tau2-bench），以及 HAL 与异步智能体评测。',
    ),
    L(
      'Cross-linked new essays back into 17 existing pages (+19 xrefs per locale) so readers arriving on established topics discover the 2026 material.',
      '把新篇章反向链回 17 个既有页面（每语种共 +19 处 xref），让读者从旧主题也能找到 2026 年的新内容。',
    ),
  ],
};
export default entry;
