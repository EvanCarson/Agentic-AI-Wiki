// Curated, bilingual site changelog. Newest entry first.
// One page renders this list (no per-entry routes) — see ChangelogView.astro.
import type { Localized } from '../i18n/index';

export interface ChangelogEntry {
  /** ISO date, YYYY-MM-DD */
  date: string;
  title: Localized;
  /** Bullet points describing what changed. */
  items: Localized[];
}

const L = (en: string, zh: string): Localized => ({ en, zh });

export const CHANGELOG: ChangelogEntry[] = [
  {
    date: '2026-05-19',
    title: L('Cross-page links between related topics', '相关主题之间的跨页链接'),
    items: [
      L('Added inline cross-reference links inside Concepts and Deep-Dives pages so a reader who hits a term — RAG, the agent loop, embeddings, tool calling, prompt injection — can jump straight to the page that explains it, in the same language.',
        '在「概念」与「深度剖析」页面中加入行内交叉引用链接，让读者读到某个术语——RAG、智能体循环、嵌入、工具调用、提示词注入——时，可直接跳转到讲解该术语的页面，且保持同一语言。'),
      L('Links are restrained: only the first natural mention per page, only when a strong target exists, with a subtle accent underline that stays out of the way of reading.',
        '链接力求克制：每页仅链接首个自然出现处，且仅在存在明确目标页时才链接，采用低调的强调色下划线，不干扰阅读。'),
      L('Proposed a site-wide navigation/information-architecture plan (grouping, "start here" path, related-pages and concepts↔deep-dives mapping) for review as a follow-up.',
        '提出一份全站导航/信息架构方案（分组、「从这里开始」路径、相关页面与概念↔深度剖析映射），作为后续工作待评审。'),
    ],
  },
  {
    date: '2026-05-19',
    title: L('Operations, evaluation & training coverage', '扩充运维、评估与训练内容'),
    items: [
      L('New Deep-Dive group "Evaluation & Observability" — 6 essays: why agent eval is hard, outcome vs trajectory eval, LLM-as-judge for agents, reading agent benchmarks critically, tracing & observability, and eval-driven development.',
        '新增「深度剖析」分组「评估与可观测性」——6 篇文章：为什么评估智能体很难、结果 vs 轨迹评估、用 LLM 作为智能体评判者、批判地阅读智能体基准、追踪与可观测性，以及评估驱动开发。'),
      L('New Deep-Dive group "AgentOps: Deploy & Operate" — 6 essays: durable state & resumability, concurrency & scaling, idempotency & side-effect safety, loop-level cost control, rollout/versioning/pinning, and incident response & runaway containment.',
        '新增「深度剖析」分组「智能体运维：部署与运营」——6 篇文章：持久状态与可恢复性、并发与扩缩容、幂等与副作用安全、循环层面的成本控制、灰度发布/版本化/固定，以及事故响应与失控遏制。'),
      L('New Deep-Dive group "Training Agentic Models" — 6 essays: prompt vs fine-tune vs RL, RLHF & RLAIF, RL for tool use, reward design & reward hacking, SFT/rejection sampling/distillation, and process vs outcome reward models.',
        '新增「深度剖析」分组「训练智能体模型」——6 篇文章：提示 vs 微调 vs 强化学习、RLHF 与 RLAIF、面向工具使用的强化学习、奖励设计与奖励黑客、SFT/拒绝采样/蒸馏，以及过程奖励 vs 结果奖励模型。'),
    ],
  },
  {
    date: '2026-05-18',
    title: L('Security hardening & AdSense', '安全加固与 AdSense 接入'),
    items: [
      L('Added security response headers: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy.',
        '新增安全响应头：X-Content-Type-Options、X-Frame-Options、Referrer-Policy 与 Permissions-Policy。'),
      L('Integrated Google AdSense site-wide and added ads.txt seller authorization.',
        '全站接入 Google AdSense，并添加 ads.txt 卖家授权文件。'),
      L('Hardened structured-data (JSON-LD) output against script-tag breakout.',
        '加固结构化数据（JSON-LD）输出，防止 script 标签逃逸。'),
    ],
  },
  {
    date: '2026-05-18',
    title: L('RAG coverage expansion', '扩充 RAG 相关内容'),
    items: [
      L('New advanced Deep-Dives: Advanced RAG Architectures, GraphRAG & Multi-Hop Retrieval, and RAG Pipeline Security — under a new "Retrieval & RAG" group.',
        '新增进阶「深度剖析」：进阶 RAG 架构、GraphRAG 与多跳检索、RAG 管道安全 — 归入新的「检索与 RAG」分组。'),
      L('Refreshed the Concepts "what is RAG" entry to the current long-context-vs-RAG routing consensus.',
        '更新「概念」中的「什么是 RAG」词条，采用当前关于长上下文与 RAG 路由取舍的共识。'),
      L('Field Guide updates: RAGAS evaluation vocabulary in the eval chapter; parent-document and late chunking in the retrieval chapter.',
        '实战指南更新：评估章节加入 RAGAS 评测术语；检索章节加入父文档与延迟分块。'),
    ],
  },
  {
    date: '2026-05-18',
    title: L('About page & Changelog', '关于页面与更新日志'),
    items: [
      L('Expanded About into a multi-section bilingual page: mission, what\'s covered, who maintains it, and contributing & contact.',
        '将「关于」扩展为多板块双语页面：使命、涵盖内容、维护者，以及贡献与联系方式。'),
      L('Introduced this Changelog, replacing the unused Posts section; the home page now links the latest entries.',
        '引入本「更新日志」，替换未使用的「文章」板块；首页现在链接到最新条目。'),
    ],
  },
  {
    date: '2026-05-18',
    title: L('Concepts & Deep-Dives sections', '新增「概念」与「深度剖析」板块'),
    items: [
      L('Added the Concepts encyclopedia — 33 bilingual entries from AI foundations to the agent loop.',
        '新增「概念」百科 — 33 篇双语词条，涵盖从 AI 基础到智能体主循环。'),
      L('Added Deep-Dives — 30 advanced bilingual essays on architectures, protocols (MCP/A2A), memory, and agentic security.',
        '新增「深度剖析」— 30 篇进阶双语文章，涉及架构、协议（MCP/A2A）、记忆与智能体安全。'),
      L('Accessibility & SEO pass: skip link, WCAG-AA contrast, responsive header, structured data, sitemap.',
        '可访问性与 SEO 优化：跳转链接、WCAG-AA 对比度、响应式页头、结构化数据、站点地图。'),
      L('Surfaced the new sections as cards on the home page.',
        '在首页以卡片形式呈现新板块。'),
      L('Replaced the unused Posts section with this Changelog.',
        '以本「更新日志」替换了未使用的「文章」板块。'),
    ],
  },
  {
    date: '2026-05-17',
    title: L('Chinese (中文) localization', '中文本地化'),
    items: [
      L('Full bilingual site: every page and all Field Guide chapters available in English and Chinese.',
        '全站双语：所有页面与实战指南章节均提供中英文版本。'),
      L('Language switcher and localized navigation, metadata, and sitemap.',
        '语言切换器，以及本地化的导航、元数据与站点地图。'),
    ],
  },
  {
    date: '2026-05-16',
    title: L('Initial launch', '首次发布'),
    items: [
      L('Launched the Agentic AI Wiki with the flagship Agentic AI Field Guide (22 chapters across 6 parts).',
        '上线 Agentic AI 维基，发布旗舰系列《Agentic AI 实战指南》（6 部分共 22 章）。'),
    ],
  },
];
