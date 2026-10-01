import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-01',
  title: L(
    'Two AI Blog posts — one arguing that the quoted number in Google’s new vulnerability report is a sampling artifact while the number about you is 782 CVEs in the orchestration layer, one on MCP Events shipping with the webhook hardening done and the two envelopes that report absence left optional — plus three pages on maker–checker independence, planted detection signals, and how to actually retire an agent',
    '两篇 AI 博客——一篇论证谷歌那份新漏洞报告里被引用的那个数字是抽样产物，而真正写着你名字的数字是编排层的 782 个 CVE；一篇讲 MCP Events 上线时 webhook 加固做到了、而那两个报告「缺席」的信封被留成了可选——外加三个页面：制单—复核的独立性、被种下的检测信号，以及到底该怎么退役一个智能体',
  ),
  items: [
    L(
      'AI Blog — “The 782 is the number about you”: GTIG reported on 30 September that exactly 50% of AI-discovered flaws yield RCE against 26% of everything else, but publishes no denominator and identifies the set by parsing advisories for explicit AI credit — which selects for the few vendors pointing agents at OpenSSL and the kernel. Puts the four-day BeyondTrust exploitation against Mandiant’s own 63/44/32/5-day time-to-exploit series, and relocates the actionable finding to 782 CVEs in agent frameworks and orchestration against 97 for frontier models.',
      'AI 博客《写着你名字的那个数字是 782》：GTIG 在 9 月 30 日报告说，由 AI 发现的漏洞里恰好 50% 会导致 RCE，而其余漏洞是 26%；但它没有公布分母，而且是靠解析公告里「明确把功劳记给 AI」来识别这个集合的——这就挑中了当下那几家把智能体对准 OpenSSL 与内核的厂商。文中把 BeyondTrust 那起「四天被利用」放到 Mandiant 自己 63/44/32/5 天那条「到被利用时间」序列上，并把可据以行动的发现挪到了：智能体框架与编排层 782 个 CVE，对前沿模型的 97 个。',
    ),
    L(
      'AI Blog — “A dropped subscription looks exactly like a quiet week”: OpenAI shipped plugin automations on all plans against a design sketch with no SEP, whose incubation repo calls its contents exploratory. The webhook engineering is stricter than A2A’s on every axis — MUST-level HTTPS, a mandatory endpoint handshake, a five-minute replay window, a client-supplied secret — while the terminated and gap envelopes that distinguish “your stream ended” from “nothing happened” stay optional and are not consumed. Includes the long-polling field report where every call past 60 seconds was recorded ok.',
      'AI 博客《一个掉了的订阅，和一个清静的一周长得一模一样》：OpenAI 向全部订阅档位上线了插件自动化，对接的是一份没有 SEP 的设计草图，其孵化仓库称内容属探索性质。webhook 这块的工程在每条轴上都比 A2A 更严——MUST 级别的 HTTPS、强制的端点握手、五分钟重放窗口、由客户端提供的密钥——而把「你的流结束了」与「什么都没发生」区分开的 terminated 与 gap 信封却仍是可选、且没被消费。文中也收了那份长轮询现场报告：每一次超过 60 秒的调用都被记成了 ok。',
    ),
    L(
      'New Deep-Dive (Agent Security) — Separation of Duties for Agents: maker–checker is an independence claim, and its effectiveness is anti-correlated with threat severity, because the document that fools the maker fools the checker. Scores four couplings (model, context, authority, objective), shows the arithmetic in which correlation dominates checker quality, and gives the disagreement-rate inequality an auditor can run in one query.',
      '新深入解析（智能体安全）《面向智能体的职责分离》：制单—复核是一个独立性主张，而它的有效性与威胁严重程度呈负相关——因为骗过制单方的那份文档也会骗过复核方。文中给四种耦合（模型、上下文、权限、目标）打分，展示了那道「相关性压过复核方质量」的算术，并给出审计师用一条查询就能跑的不一致率不等式。',
    ),
    L(
      'New Operation (Safety & Security) — Honeytokens for Agent Systems: behavioural detection drowns in base rates because an agent is anomalous by design, so plant a resource with no legitimate user instead. Six token classes ranked for an agent stack, the use-not-read rule that keeps them from being muted by Thursday, and an inert decoy that turns production injection susceptibility into a continuously measured rate.',
      '新运维页（安全、对齐与智能体安全）《面向智能体系统的蜜标》：行为式检测会被基础比率淹没，因为智能体天生异常——那就改为种下一份没有合法使用者的资源。文中为智能体技术栈排了六类标的物、给出让它们不至于周四就被静音的「以用而非以读为触发」规则，以及一个把生产环境注入易感度变成持续测量值的惰性诱饵。',
    ),
    L(
      'New Operation (Governance & Compliance) — Decommissioning an Agent: only 21% of organisations have a formal decommissioning process, and revoking the credentials first turns a clean stop into a retry storm. Gives the six-step teardown order, treats draining as a per-task-class decision about side effects, and names the provenance boundary you owe the records, shared memory and documents that have no off switch.',
      '新运维页（治理与合规）《退役一个智能体》：只有 21% 的组织有正式的退役流程，而先吊销凭据会把一次干净的停止变成一场重试风暴。文中给出六步拆除顺序、把排空当作按任务类别作出的副作用决定，并点明你欠那些没有开关的记录、共享记忆与文档的那条溯源边界。',
    ),
  ],
};

export default entry;
