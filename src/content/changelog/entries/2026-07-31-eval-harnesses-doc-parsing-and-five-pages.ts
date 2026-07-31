import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-31',
  title: L(
    'Two AI Blog posts on eval harnesses and document parsers, plus five pages on eval statistics, model retirement, OTel GenAI, inbox agents and migration agents',
    '两篇 AI 博客——评测框架与文档解析器——外加五个页面：评测统计、模型退役、OTel GenAI、收件箱智能体与迁移智能体',
  ),
  items: [
    L(
      'New blog post — *promptfoo vs DeepEval vs Inspect AI*. Three open-source eval harnesses whose READMEs describe the same job but whose core data structures disagree about what an evaluation is: an attack you declare and the tool generates, an assertion inside pytest, or an experiment whose log is the deliverable. Covers what each makes one line and what each makes a weekend, the judge-drift and trajectory-blindness they all share, and what OpenAI\'s March 2026 acquisition of promptfoo actually changes — roadmap gravity toward the parent\'s providers, not the licence flip everyone worries about. Five themeable SVGs including a unit-of-work comparison and a capability matrix.',
      '新博客文章——《promptfoo、DeepEval 与 Inspect AI》。三套开源评测框架的 README 描述的是同一件事，但它们的核心数据结构对"评测是什么"意见相左：是你声明、工具生成的一次攻击，是 pytest 里的一条断言，还是一场以日志为交付物的实验。文章讲清了每一个让哪类测试变成一行、又让哪类变成一个周末，讲了三者共有的评判器漂移与轨迹盲区，也讲了 OpenAI 在 2026 年 3 月收购 promptfoo 真正改变了什么——是路线图朝母公司厂商倾斜的引力，而不是人人担心的许可证翻脸。配五张可随主题变色的 SVG，含一张"工作单元"对照图与一张能力矩阵。',
    ),
    L(
      'New blog post — *Docling vs Unstructured vs LlamaParse vs Mistral OCR*. Argues that the accuracy leaderboard is the axis that transfers worst, because a parser\'s score is a weighted average over the benchmark\'s document mix and yours is different. Two axes that do transfer: a layout pipeline fails by omission and disorder while a VLM fails by plausible completion — it can return a number that was never on the page — and the self-hosted-versus-hosted cost curves cross at a volume you can compute with one division (roughly 350k pages a month against a GPU, roughly 30k against a CPU pipeline). Four SVGs including a log-scale cost comparison at three volumes.',
      '新博客文章——《Docling、Unstructured、LlamaParse 与 Mistral OCR》。文章主张准确率排行榜恰恰是最难迁移的那个维度，因为解析器的分数是在基准自身文档构成上做的加权平均，而你的构成不一样。真正能迁移的是另外两个维度：版面流水线的失败方式是遗漏与错序，而 VLM 的失败方式是合理补全——它可能返回页面上从不存在的数字；以及自建与托管两条成本曲线，会在一个一次除法就能算出的量级上相交（对 GPU 约为每月 35 万页，对 CPU 流水线约为 3 万页）。配四张 SVG，含一张三档量级的对数刻度成本对比图。',
    ),
    L(
      'New Deep-Dive (Evaluating Agents) — *Eval Variance & Statistical Power*. Why a single-run agent score is a sample rather than a measurement, how pass@k and pass^k answer opposite questions, and the variance decomposition that reverses most teams\' instinct: between-task variance is divided by task count alone, so adding tasks buys precision that adding runs cannot. Works the arithmetic on a 500-task benchmark to show a paired McNemar design cutting the detectable effect from about six points to about two and a half on identical data and budget.',
      '新增深入解析（评估智能体）——《评测方差与统计功效》。讲清了为什么单次运行的智能体分数是抽样而非测量、pass@k 与 pass^k 回答的是相反的问题，以及那个推翻多数团队直觉的方差分解：任务间方差只被任务数所除，所以加任务买到的精度是加运行次数买不到的。文中用一个 500 题基准把算术做了一遍：在完全相同的数据与预算下，McNemar 配对设计把可检测效应从约六个点压到约两个半点。',
    ),
    L(
      'New Operation (AgentOps) — *Model Deprecation & Migration*. A model ID is the one dependency you cannot vendor, freeze or fork: when the retirement date passes, the requests fail. Covers why notice floors of 60 days are the number to plan against, why the swap is a re-qualification rather than a string replacement (prompt sensitivity, tool-calling behaviour, step count and caching all move at once), why silent platform auto-upgrades are the worst outcome rather than the kind one, and the generated inventory plus always-warm candidate lane that turn a retirement into a one-day operation.',
      '新增运维页（智能体运维）——《模型退役与迁移》。模型 ID 是你唯一无法 vendor、无法冻结、也无法分叉的依赖：退役日期一过，请求就失败。文章讲了为什么该照着 60 天这个通知下限来排期、为什么切换是一次重新资格认证而不是字符串替换（提示词敏感性、工具调用行为、步数与缓存会一起动）、为什么平台的静默自动升级是最糟而非最体贴的结局，以及把一次退役变成一天工作量的自动生成清单与常热候选通道。',
    ),
    L(
      'New Operation (Evaluation & Observability) — *OpenTelemetry GenAI Semantic Conventions*. Instrumentation is a data-model decision rather than a dashboard one, and vendor-shaped spans become the lock-in nobody priced. Covers the agent, workflow, tool and model span kinds, why the conventions\' Development status and their June 2026 move to a dedicated repository argue for pinning the version rather than waiting for stability, splitting structural telemetry from prompt content at the collector so retention and residency can differ, and the single collector hop that makes every later vendor choice a config edit.',
      '新增运维页（评估与可观测性）——《OpenTelemetry GenAI 语义约定》。埋点是数据模型决定而不是看板决定，而由厂商塑形的 span 会变成没人定过价的那份锁定。文章讲了 agent、workflow、tool、model 四类 span，讲了为什么这套约定的 Development 状态与它 2026 年 6 月迁入专用仓库这两件事，指向"钉住版本"而不是"等它稳定"，讲了在 collector 处把结构性遥测与提示词内容分流以便留存与驻留规则各行其是，以及那一跳让此后每个厂商选择都变成一次配置编辑的 collector。',
    ),
    L(
      'New Playbook (Domain Playbooks) — *Email & Calendar Agents*. Email and calendar are the only systems of record in a company that an unauthenticated stranger can write to, so the lethal trifecta assembles itself by product definition rather than by design error. Covers provenance tiers that survive a forwarded message, the reader/actor split with a typed interface so message content can never reach the send path, why calendar is the more dangerous half (invites auto-insert, every field is attacker-controlled, briefings read on a schedule the attacker chooses), and confirmation UX that asks only when something is unusual instead of training people to click Approve.',
      '新增实战手册（领域实战手册）——《邮件与日历智能体》。邮件与日历是公司里唯一一类未经认证的陌生人也能写入的记录系统，于是那套"致命三件套"是按产品定义自动凑齐的，而不是因为设计失误。文章讲了能熬过一次转发的来源分级、以强类型接口切开读取者与执行者从而让邮件内容永远够不到发送通路、为什么日历才是更危险的那一半（邀请自动插入、每个字段都由攻击者控制、简报按攻击者选定的时间被读取），以及"只在异常时才问"而不是把人训练成一路点批准的确认设计。',
    ),
    L(
      'New Playbook (Coding & Computer-Use Agents) — *Large-Scale Migration Agents*. Generation went to zero and human review did not, so succeeding at the hard-looking part creates a review queue nobody can drain — ten thousand files at five minutes each is five months of one engineer. Covers building the oracle before generating anything, batching by verifiability rather than by directory, giving the mechanical head to an AST codemod and only the tail to the model, running the fleet against CI capacity rather than token limits, and the hundred-file pilot whose unedited-merge rate decides whether the project is viable at all.',
      '新增实战手册（编码与计算机操作智能体）——《大规模迁移智能体》。生成成本归零而人工评审没有，于是在看起来最难的那一步成功，反而造出了一条没人排得干的评审队列——一万个文件每个五分钟，就是一名工程师五个月。文章讲了在生成任何东西之前先建判据、按可核验性而不是按目录分批、把机械的头部交给 AST codemod 而只把尾部交给模型、机群要按 CI 容量而不是按令牌上限来跑，以及那个用"无需人工编辑即落地"比例来决定项目到底可不可行的百文件试点。',
    ),
  ],
};

export default entry;
