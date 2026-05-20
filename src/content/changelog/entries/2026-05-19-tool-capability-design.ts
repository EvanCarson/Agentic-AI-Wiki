import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-19',
  title: L('Tool & capability design coverage', '扩充工具与能力设计内容'),
  items: [
    L('New Deep-Dive group "Tool & Capability Design" — 6 essays: tools as the agent\'s API and designing for the model, tool granularity & composition, schemas/contracts/defaults, error messages as prompts, tool docs & discoverability, and the four recurring tool-design anti-patterns.',
      '新增「深度剖析」分组「工具与能力设计」——6 篇文章：工具即智能体的 API 与为模型设计、工具粒度与组合、模式/契约/默认值、把错误消息当作提示、工具文档与可发现性，以及四个反复出现的工具设计反模式。'),
    L('Grounded in 2025–2026 practice: Anthropic\'s tool-writing and deferred-loading guidance, the measured ~95%→~71% tool-selection accuracy drop under tool overload, and real consolidations (GitHub Copilot 40→13 tools, Block 30+→2 Linear tools).',
      '立足 2025–2026 实践：Anthropic 的工具编写与延迟加载指南、工具过载下实测约 95%→71% 的工具选择准确率下降，以及真实的工具收拢（GitHub Copilot 40→13 个工具、Block 30 多→2 个 Linear 工具）。'),
  ],
};
export default entry;
