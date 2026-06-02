import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-06-01',
  title: L(
    'New AI Blog post: four code-execution sandboxes for agents compared',
    'AI 博客新文章:四款面向智能体的代码执行沙箱对比',
  ),
  items: [
    L(
      'Added "E2B vs Modal vs Daytona vs Anthropic Code Execution" — a diagram-driven comparison built around the one question the marketing pages hide: who owns the sandbox lifecycle?',
      '新增《E2B、Modal、Daytona 与 Anthropic Code Execution》——围绕营销页面掩盖的那个问题展开的图解对比:沙箱的生命周期归谁所有?',
    ),
    L(
      'New tags: sandboxing, code-execution, infrastructure.',
      '新增标签:sandboxing、code-execution、infrastructure。',
    ),
  ],
};
export default entry;
