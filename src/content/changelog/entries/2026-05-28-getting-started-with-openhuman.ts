import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-28',
  title: L(
    'New AI Blog post: Getting Started with OpenHuman',
    '新增 AI 博客文章：OpenHuman 上手指南',
  ),
  items: [
    L(
      'Hands-on getting-started guide for OpenHuman (v0.56.0) — install paths for macOS/Windows/Linux, the first-run onboarding flow, how the Memory Tree gets built, and an honest local-data / managed-services trust model. Three new diagrams, an FAQ, bilingual en/zh.',
      '面向 OpenHuman（v0.56.0）的实操上手指南——涵盖 macOS/Windows/Linux 的安装方式、首次运行的引导流程、Memory Tree 的构建过程，以及"本地数据 + 托管服务"这一如实呈现的信任模型。配三张全新示意图、常见问答，中英双语。',
    ),
    L(
      'Correction to the OpenClaw vs OpenHuman vs Hermes Agent comparison: softened the "local-only" framing to the accurate local-data / managed-services model, and refreshed OpenHuman’s star count to reflect its climb past 29,000.',
      '修订 OpenClaw vs OpenHuman vs Hermes Agent 对比文章：将"纯本地"的表述更正为更准确的"本地数据 + 托管服务"模型，并更新 OpenHuman 的 Star 数以反映其已突破 29,000 的增长。',
    ),
  ],
};

export default entry;
