import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'coding-and-computer-use-agents',
  order: 100,
  name: L('Coding & Computer-Use Agents', '编码与计算机操作智能体'),
  groupSummary: L('Agents that read code, write code, run tools, and drive a computer — patterns, harnesses, and pitfalls.', '能读代码、写代码、运行工具并驱动计算机的智能体——模式、外壳与陷阱。'),
  entries: [
    { page: 'coding-agent-architecture', slug: 'coding-agent-architecture', title: L('Coding Agent Architecture','编码智能体架构'), summary: L('The localize-edit-verify loop that makes a coding agent more than a code generator: the agent-computer interface, why agentic beats pipeline coding, and where the loop fails.','让编码智能体不止是代码生成器的“定位-编辑-验证”循环：智能体-计算机接口、为何智能体式优于流水线式，以及循环在哪里失效。') },
    { page: 'repo-navigation-and-context', slug: 'repo-navigation-and-context', title: L('Repo Navigation & Code Context','仓库导航与代码上下文'), summary: L('Code search vs. embeddings, symbol-level indexing, context budgeting over a large tree, and why confident wrong localization is the expensive failure of code retrieval.','代码搜索 vs 向量检索、符号级索引、在大型目录树上做上下文预算，以及为何自信的错误定位是代码检索代价最高的失败。') },
    { page: 'patch-generation-and-tests', slug: 'patch-generation-and-tests', title: L('Patch Generation & Test-Driven Loops','补丁生成与测试驱动循环'), summary: L('Structured diffs and hunk-apply failures, test-driven self-correction, regression guarding, and the three honest liars in the loop: flakes, overfit, and the deleted assertion.','结构化 diff 与 hunk 应用失败、测试驱动自我纠错、回归守护，以及循环里的三个诚实骗子：flake、过拟合、被删的断言。') },
    { page: 'computer-use-and-gui-agents', slug: 'computer-use-and-gui-agents', title: L('Computer-Use & GUI Agents','计算机操作与 GUI 智能体'), summary: L('Pixel vs. DOM grounding, the action space, the screenshot loop, and the multiplicative latency and reliability tax that makes GUI control a last resort.','像素 vs DOM 定位、动作空间、截图循环，以及那笔让 GUI 操控成为最后手段的乘法式延迟与可靠性税。') },
    { page: 'browser-agents', slug: 'browser-agents', title: L('Browser agents','浏览器智能体'), summary: L('Driving a real browser as a tool — DOM versus pixel observation, login + auth state, the well-trodden failure modes, and when to step up to a full GUI agent.','把一个真实浏览器当工具来驱动——DOM 与像素两种观察方式、登录与认证状态、踩烂了的失败模式，以及何时该升级到完整 GUI 智能体。') },
    { page: 'ide-agents', slug: 'ide-agents', title: L('IDE agents','IDE 智能体'), summary: L('Coding agents that live in the editor — the loop is the same as a CLI coding agent, but the interaction surface, undo expectations, and trust threshold are all different.','住在编辑器里的编码智能体——内循环和 CLI 编码智能体一样，但交互面、撤销预期与信任阈值都不同。') },
    { page: 'sandboxing-and-execution', slug: 'sandboxing-and-execution', title: L('Sandboxing & Safe Execution','沙箱与安全执行'), summary: L('Containerized execution, network and filesystem isolation, capability scoping, and designing for blast radius when an agent runs untrusted, attacker-influenced code.','容器化执行、网络与文件系统隔离、能力作用域，以及当智能体运行不可信、受攻击者影响的代码时如何为爆炸半径做设计。') },
    { page: 'evaluating-coding-agents', slug: 'evaluating-coding-agents', title: L('Evaluating Coding Agents','评估编码智能体'), summary: L('The SWE-bench family, pass@k vs. resolve rate, harness sensitivity, documented contamination, and why a private post-cutoff eval set is the only number to trust.','SWE-bench 系列、pass@k vs 解决率、测试编排敏感性、记录在案的污染，以及为何一个截止日期后的私有评测集才是唯一可信的数字。') },
  ],
};
export default group;
