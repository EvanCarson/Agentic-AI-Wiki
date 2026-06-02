import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-06-01',
  title: L(
    'New AI Blog post: four evals + observability platforms compared',
    'AI 博客新文章：四款评测与可观测性平台对比',
  ),
  items: [
    L(
      'Added "LangSmith vs Braintrust vs Helicone vs Arize Phoenix" — a diagram-driven comparison built around the loop each tool was designed to close: LangSmith the LangChain dev loop, Braintrust the CI eval loop, Helicone the production gateway loop, Arize Phoenix the OTel-native monitoring loop.',
      '新增《LangSmith、Braintrust、Helicone 与 Arize Phoenix》——围绕每款工具被设计去闭合的回路展开的图解对比：LangSmith 闭合 LangChain 开发回路，Braintrust 闭合 CI 评测回路，Helicone 闭合生产网关回路，Arize Phoenix 闭合 OTel 原生监控回路。',
    ),
    L(
      'New tags: observability, evals, infrastructure.',
      '新增标签：observability、evals、infrastructure。',
    ),
  ],
};
export default entry;
