import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-30',
  title: L(
    'Two AI Blog posts on document parsers and structured output, plus four new pages',
    '两篇 AI 博客——文档解析器与结构化输出——外加四个新页面',
  ),
  items: [
    L(
      'Blog — Docling vs Unstructured vs LlamaParse vs Mistral OCR. The same thousand pages cost nothing or about ninety dollars depending which one you point at them, so these are not substitutes; and the accuracy figure every comparison leads with is character-level, which is not what breaks retrieval — a parser that reads every glyph and flattens a table has destroyed the answer while scoring well. Argues for choosing on structure fidelity and on where the compute runs, notes that the published parser rankings contradict each other because several are published by an interested party, and shows how to build the only ranking that predicts your outcome: TEDS scored on fifty of your own worst pages.',
      '博客《Docling、Unstructured、LlamaParse 与 Mistral OCR》——同样的一千页，你交给哪一个，花费会是零或约九十美元，所以它们不是彼此的替代品；而每篇对比开篇的那个准确率是字符级的，那并不是让检索崩掉的东西——一个把每个字形都读对、却把表格压平的解析器，已经毁掉了答案，同时分数还不错。文章主张按结构保真度与算力运行位置来选，指出公开的解析器排名彼此矛盾（其中几份由有利益的一方发布），并给出如何建起唯一能预测你结果的那个排名：在你自己最糟的五十页上用 TEDS 打分。',
    ),
    L(
      'Blog — Instructor vs Outlines vs BAML vs provider structured outputs. Not four answers to one question: they enforce the schema after generation, during it, around it, and upstream inside the vendor, and everything else about them follows from that. Only two can guarantee parseable output, none can guarantee correct output, and a required field the model has no answer for turns abstention into a well-typed fabrication. Includes the arithmetic of retry-based validation, why field ordering measurably moves quality, and the point that once vendors commoditized JSON the libraries compete on everything around the schema rather than the schema itself.',
      '博客《Instructor、Outlines、BAML 与厂商原生结构化输出》——它们不是同一个问题的四个答案：它们分别在生成之后、生成之中、生成周围以及上游的厂商内部强制 schema，而它们的其余一切都由此推出。其中只有两个能保证输出可解析，没有一个能保证输出正确，而一个模型没有答案的必填字段，会把弃答变成一个类型良好的编造。文中含基于重试的校验的算术、字段顺序为何会可测量地改变质量，以及一个论点：厂商把 JSON 商品化之后，这些库竞争的是 schema 周围的一切，而不是 schema 本身。',
    ),
    L(
      'Operations — Model Deprecation & Migration. The retirement date is set by someone else, and the notice window is shorter than re-qualifying an agent: Anthropic commits to at least 60 days for publicly released models, OpenAI to six months for generally available ones and as little as two weeks for previews. Covers why pinning is right and is also what creates the deadline, the parameter deprecations that defeat a find-and-replace migration, why your inventory key is (platform, model ID) since partner platforms set their own dates, and the standing candidate-versus-baseline eval diff that turns a fire drill into a decision you already made.',
      '运维《模型下线与迁移》——退役日期由别人来定，而通知窗口比重新验收一个智能体所需的时间更短：Anthropic 对公开发布的模型承诺至少 60 天，OpenAI 对正式可用模型承诺六个月、对 preview 则可能只有两周。文中讲了为何固定版本是对的、也正是它造出了那个截止日期；讲了那些能击溃"查找替换式迁移"的参数弃用；讲了为何你的清单主键是（平台, 模型 ID）——因为合作方平台自行设定日期；以及那份把救火演习变成"你早就做完的决定"的常设候选对基线评估差异。',
    ),
    L(
      'Operations — Agent Inventory & Registration. Every other control takes a list of agents as an input and degrades silently without one: a kill switch you cannot aim is not a kill switch. Argues that the quarterly survey fails because agents are created by config changes rather than deploys, that the fix is to make registration the way an agent obtains its credentials, that the unit worth versioning is the (agent, capability, data-scope) triple rather than the agent, and that reconciling declared against observed turns shadow agents and orphaned credentials into two SQL queries.',
      '运维《智能体清单与登记》——其他每一项控制都把智能体名单当输入，而名单缺失时它们会静默降级：一个瞄不准的熔断开关不是熔断开关。文章主张季度问卷之所以失败，是因为智能体是由配置改动而非部署创造出来的；解法是把登记做成智能体取得凭据的必经之路；值得做版本的单元是（智能体, 能力, 数据范围）三元组而非智能体本身；而把声明的与观测到的对账，会把影子智能体与无主凭据变成两条 SQL 查询。',
    ),
    L(
      'Playbooks — Large-Scale Migration Agents. 4,000 files is a pipeline, not a conversation, and the bottleneck is that a human has to believe 4,000 rewrites. Covers measuring the residue so a deterministic codemod handles the boring majority, letting the verifier define the unit rather than intuition, and the failure that defines the genre: an agent told to make the tests pass can weaken the tests, so the oracle belongs outside its write scope — best of all a differential check against behaviour recorded before the agent had write access. Also argues for making abstention a first-class output.',
      '实战手册《大规模迁移智能体》——4000 个文件是一条流水线而非一次对话，而瓶颈在于得有一个人去相信这 4000 次改写。文中讲了先量出残差、好让确定性 codemod 处理掉枯燥的大多数；讲了让校验器而不是直觉来定义单元；以及定义了这个门类的那个失败：被要求"让测试通过"的智能体可以把测试改差，所以判据应当在它的写权限之外——最好是对"智能体拿到写权限之前录制下来的行为"做差分比对。文章还主张把弃答做成一等输出。',
    ),
    L(
      'Playbooks — Inbox & Calendar Agents. The one domain where 100% of the input is attacker-controlled by design, and that is the feature working: EchoLeak (CVE-2025-32711, CVSS 9.3) needed one crafted email and zero clicks to exfiltrate data from a mail assistant. Splits the tool-free reader from an actor that never sees a raw body, addresses recipients as references into the thread so an injected address has nowhere to land, grades autonomy by counterparty rather than by action, and notes that a calendar write is irreversible because eight phones have already buzzed.',
      '实战手册《收件箱与日历智能体》——唯一一个输入 100% 由攻击者掌控且属设计使然的领域，而那是功能在正常工作：EchoLeak（CVE-2025-32711，CVSS 9.3）只需一封精心构造的邮件、零点击，就从一个邮件助手里外泄了数据。文章把无工具的读者与从不看原始正文的执行者拆开、把收件人写成指向线程内部的引用（于是被注入的地址无处落地）、按对方是谁而非按动作给自主性分级，并指出一次日历写入之所以不可逆，是因为八台手机已经响过了。',
    ),
  ],
};

export default entry;
