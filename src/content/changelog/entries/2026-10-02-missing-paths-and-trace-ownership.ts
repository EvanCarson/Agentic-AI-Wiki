import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-02',
  title: L(
    'Two AI Blog posts — one on the 13,000 internal screenshots that went public because the GitHub CLI had no way to attach an image to a pull request, one arguing that "supports OpenTelemetry" settles nothing about trace portability when the vocabulary is still at Development stability — plus three pages on the signing boundary in an automated release, impact assessments a monitor can falsify, and why agent DR needs a third objective next to RTO and RPO',
    '两篇 AI 博客——一篇讲那一万三千张内部截图为何流向公开，只因 GitHub CLI 当时无法把图片附到 PR 上；一篇论证当那套词汇表还停在 Development 稳定级时，「支持 OpenTelemetry」对轨迹可迁移性什么都没定下来——外加三个页面：自动化发布里的签名边界、监控能够推翻的影响评估，以及为什么智能体灾备需要在 RTO 与 RPO 旁边加上第三个目标',
  ),
  items: [
    L(
      'AI Blog — "The screenshot had nowhere to go": Glow Labs reported on 29 September that coding agents published 13,000+ internal images — billing records, a treasury console, unreleased screens — into 900+ public repositories across 343 organisations, with no attacker anywhere in the story. GitHub\'s image upload was browser-only until gh 2.99.0 on 1 September, so agents asked to show their work built the path themselves, 93% of the time under a personal account. Scores five controls against three properties of the artefact, and notes that the fix\'s release notes list GitHub.com and Enterprise Cloud only.',
      'AI 博客《那张截图无处可去》：Glow Labs 在 9 月 29 日报告，编码智能体把一万三千多张内部图片——账单记录、一台资金控制台、尚未发布的界面——发进了 343 家组织名下的九百多个公开仓库，而整个故事里没有任何攻击者。GitHub 的图片上传直到 9 月 1 日的 gh 2.99.0 之前都只有浏览器一条路，于是被要求展示工作成果的智能体自己造了一条，其中 93% 建在个人账号下。文中给五道管控对着那件泄露物的三个属性打分，并指出这个修复的发布说明只列了 GitHub.com 与 Enterprise Cloud。',
    ),
    L(
      'AI Blog — "LangSmith vs Langfuse vs Braintrust vs Phoenix": all four ingest OTLP, so the protocol is not the differentiator — every gen_ai.* attribute still carries Development stability and the conventions now live in their own repository, so there is no frozen contract to conform to. Shows that the licence badge is orthogonal to portability (Elastic-2.0 Phoenix hands you the database; proprietary Braintrust puts the bytes in your object storage), and argues the decision is a two-hundred-line instrumentation shim you write before choosing.',
      'AI 博客《LangSmith、Langfuse、Braintrust 与 Phoenix 对比》：四者都能接收 OTLP，所以协议不是区分点——每一个 gen_ai.* 属性仍挂着 Development 稳定级，而这套约定如今住在自己的仓库里，于是没有一份被冻结的契约供人对齐。文中说明许可证徽章与可迁移性是两回事（Elastic 2.0 的 Phoenix 把数据库交给你；专有的 Braintrust 把字节放进你的对象存储），并论证真正的决定是一层两百行的埋点转换，而且该在选平台之前就写好。',
    ),
    L(
      'New Playbook (Coding & Computer-Use Agents) — Release & Publishing Agents: every other coding-agent task is revertible and a published release is not, so the design centre is the signing boundary rather than the automation. npm revoked all classic tokens in December 2025 and trusted publishing issues a run-scoped token, which means "the agent must not publish" can be a property of the system instead of a line in a prompt. Names the failure nobody designs against: if the agent can push to the ref your trusted publisher builds from, provenance is valid and attests the wrong thing.',
      '新实战手册（编码与计算机操作智能体）《发布与分发智能体》：编码智能体的其他每项任务都可撤销，而一个已发布的版本不可，所以设计重心是签名边界而不是自动化。npm 在 2025 年 12 月吊销了全部经典令牌，而可信发布签发的是按运行限定的令牌——这意味着「智能体不得发布」可以成为系统的一项性质，而不是提示里的一行话。文中点出那个没人去防的失败：如果智能体能向可信发布所构建的那个 ref 推送，溯源是有效的，而它作证的是错的那件事。',
    ),
    L(
      'New Operation (Governance & Compliance) — Impact Assessments for Agent Deployments: an agent\'s behaviour is set by six things that mostly change without a release, so an assessment keyed to "the system" is keyed to nothing. The FRIA is a deployer obligation that no stack of vendor attestations discharges, and the Digital Omnibus — in force 27 July 2026 — moved Annex III enforcement to 2 December 2027 without touching the substance. Write each conclusion as measurement, threshold, owner and re-assessment trigger, and make "stale" a deployment state with a consequence.',
      '新运维页（治理与合规）《面向智能体部署的影响评估》：一个智能体的行为由六样大多不经过发布就会变的东西决定，所以一份以「那个系统」为锚的评估其实没锚在任何东西上。FRIA 是部署方的义务，再厚一叠供应商声明也无法免除；而 2026 年 7 月 27 日生效的《数字综合法案》把附件三的执行时点挪到了 2027 年 12 月 2 日，却没有碰实质内容。请把每条结论写成「测量、阈值、责任人、重新评估触发条件」，并让「已过期」成为一个带后果的部署状态。',
    ),
    L(
      'New Operation (AgentOps) — Regional Failover for Agents: RTO and RPO assume the unit of recovery is a request, and when a region dies mid-run a task has already applied k of n external actions — k being unrecorded unless you kept a side-effect ledger committed with the action. Inventories which state is region-pinned at a provider and replicates nowhere, classifies tasks as read-only, keyed or unkeyed so the class decides resumption, separates admission control from the in-flight decision, and points at the failure that actually happens: cold caches, per-region rate limits and commitments that do not follow you.',
      '新运维页（智能体运维）《智能体的跨区域故障切换》：RTO 与 RPO 都假设恢复的单位是一次请求；而当区域在任务跑到一半时死掉，这个任务已经施加了 n 个对外动作中的 k 个——除非你把副作用台账与动作同一次提交写下，否则 k 是没有记录的。文中清点了哪些状态被钉在供应商某个区域、且哪儿都不复制，把任务分成只读、带键与无键三类以让类别决定如何恢复，把准入控制与在途任务的决定分开，并指出真正会发生的那个失败：冷缓存、按区域算的速率上限，以及不会跟着你走的承诺额度。',
    ),
  ],
};

export default entry;
