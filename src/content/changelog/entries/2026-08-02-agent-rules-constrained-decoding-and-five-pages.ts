import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-08-02',
  title: L(
    'Two AI Blog posts on China\'s agent rules and constrained decoding, plus five pages on speculative decoding, benchmark contamination, vendor risk, SOC agents and localization agents',
    '两篇 AI 博客——中国的智能体新规与受约束解码——外加五个页面：投机解码、基准污染、供应商风险、安全运营智能体与本地化智能体',
  ),
  items: [
    L(
      'New blog post — *China Wrote Down the Agent Design Doc Everyone Skipped*. The Implementation Opinions on Intelligent Agents, jointly issued by the CAC, NDRC and MIIT on 8 May 2026 and in force since 15 July, are the first national policy to treat agents as their own regulated category. The argument is that their central demand — sort every decision into human-only, user-approved or autonomous, document it before deployment, and never exceed the granted scope — is unsatisfiable by a system prompt and therefore specifies an architecture: an authorisation gate outside the model, plus a per-action decision log. Also contrasts decision-level tiering with the EU AI Act\'s system-level tiering, and is honest that Implementation Opinions are a policy instrument whose enforcement detail is still with sector regulators. Three themeable SVGs including a prompt-boundary versus gate-boundary architecture diagram.',
      '新博客文章——《中国把所有人都跳过的那份智能体设计文档写了下来》。由网信办、发改委与工信部于 2026 年 5 月 8 日联合印发、7 月 15 日起施行的《智能体规范应用与创新发展实施意见》，是第一份把智能体当作自成一类的受规管对象的国家级政策。文章主张：它的核心要求——把每个决定分入"仅限用户""需用户授权""可自主"三档、在部署前写下来、且永不超出授权范围——是系统提示词无法满足的，因而它实际上规定了一套架构：一道位于模型之外的授权关卡，外加一份按动作记录的决策日志。文中还把"按决策分级"与欧盟《AI 法案》的"按系统分级"作了对照，并如实说明实施意见是政策性文件、其执行细节仍在行业主管部门手中。配三张可随主题变色的 SVG，含一张"提示词边界 vs 关卡边界"的架构对比图。',
    ),
    L(
      'New blog post — *Outlines vs XGrammar vs llguidance vs Instructor*. Three of the four constrain the sampler so malformed output is unreachable, and the choice between them collapses to one question — do your schemas repeat? — because Outlines precomputes an index, XGrammar JIT-compiles behind a cache, and llguidance builds lazily with no startup cost. The fourth is categorically different: Instructor never touches sampling, so it is the only one that can enforce cross-field and evidence-grounded rules, and the working configuration is both together. Closes on the failure nobody benchmarks — a schema with no way to express "I don\'t know" converts abstention into a confident, well-formed, unfalsifiable value. Three SVGs including a capability matrix and a schema-churn comparison.',
      '新博客文章——《Outlines、XGrammar、llguidance 与 Instructor》。四者中有三个约束采样器，让格式不合法的输出根本够不着，而它们之间的选择坍缩成一个问题——你的 schema 会重复吗？因为 Outlines 预计算索引、XGrammar 在缓存背后即时编译、llguidance 惰性构建且没有启动成本。第四个属于另一个类别：Instructor 根本不碰采样，因此它是唯一能强制跨字段与"接地于证据"规则的，而真正管用的配置是两者叠加。文末落在那个没人做基准的失败模式上——一个无法表达"我不知道"的 schema，会把弃答变成一个笃定、良构、无从证伪的取值。配三张 SVG，含一张能力矩阵与一张 schema 更替率对照图。',
    ),
    L(
      'New Concept (AI Foundations) — *Speculative Decoding*. The one speedup that provably cannot change what the model says: a cheap draft proposes several tokens, the full model verifies them in a single pass, and the accept rule is constructed so the output distribution is identical to sampling directly. That is why it costs you no eval cycle, unlike quantization or a model swap. The page argues the part people get wrong — speculation buys latency with spare compute, so it is close to free at low concurrency and can reduce total throughput on a saturated GPU, which is what vLLM\'s disable-by-batch-size threshold exists for.',
      '新增概念页（AI 基础）——《投机解码》。唯一一种可被证明不会改变模型输出的提速手段：廉价草稿提出若干令牌，完整模型用一次前向核验，而接受规则被构造成让输出分布与直接采样完全相同。这正是它不像量化或换模型那样要花掉你一个评测周期的原因。页面着重讲了人们弄错的那一半——投机是拿闲置算力换延迟，所以它在低并发下近乎白送，在被打满的 GPU 上却可能拉低总吞吐，而这正是 vLLM 那个按 batch 大小自动关闭的阈值存在的意义。',
    ),
    L(
      'New Deep-Dive (Evaluating Agents) — *Benchmark Contamination & Leakage*. Contamination is not a property of a benchmark; it is a property of the (model, benchmark, date) triple, and it only gets worse. Separates verbatim, solution and indirect leakage — only the first is fixed by a canary string, and the third cannot be fixed at all. Gives four detection tests you can run without the training data, and makes the agent-specific point that an agent benchmark ships an environment, so a coding agent scored on a public repo is being tested on a codebase it has already read: navigation contamination is invisible to any comparison of solutions. Ends on the rule that public scores screen a shortlist while only post-cutoff data decides between finalists.',
      '新增深入解析（评估智能体）——《基准污染与泄漏》。污染不是基准的属性，而是（模型，基准，日期）这个三元组的属性，而且只会越来越糟。文中区分了逐字泄漏、解法泄漏与间接泄漏——只有第一种能被金丝雀串修好，而第三种根本修不好。给出四个不需要训练数据也能跑的检测，并提出一个智能体特有的要点：智能体基准交付的是一个环境，所以一个在公开仓库上被打分的编码智能体，是在一份它已经读过的代码库上受测——导航污染对任何解法比对都是隐形的。结论落在那条规则上：公开分数用来筛候选名单，只有截止日之后的数据才用来在决赛选手之间做决定。',
    ),
    L(
      'New Operation (Governance & Compliance) — *Third-Party Model & Vendor Risk*. The standard AI vendor questionnaire asks unanswerable questions; the one with teeth is "what can change without telling me?". Names the three clauses that decide whether your evaluations stay true — model version stability, subprocessor notice, retention and training use — and is precise about what SOC 2 and ISO/IEC 42001 do and do not attest. Also maps the supply chain most procurement misses: the inference host, the gateway, every third-party tool server, the embedding model, and the judge model that silently redefines your quality metric.',
      '新增运维页（治理与合规）——《第三方模型与供应商风险》。标准的 AI 供应商问卷问的都是无从作答的问题；真正有牙齿的那个是"什么可以不通知我就变？"。文中点名了决定你的评测还算不算数的三条条款——模型版本稳定性、子处理方通知、留存与训练用途——并精确说明了 SOC 2 与 ISO/IEC 42001 各自证明了什么、又没证明什么。此外还梳理了采购通常漏掉的那条供应链：推理托管方、网关、每一个第三方工具服务器、嵌入模型，以及那个会悄悄重新定义你质量指标的评判模型。',
    ),
    L(
      'New Playbook (Domain Playbooks) — *Security-Operations Agents*. The only agent class whose input is authored by an adversary who knows a model reads it: log lines, filenames, headers and phishing bodies are all attacker-writable, so no sequence of that text may be able to close an alert. Keeps enrichment deterministic and the verdict out of the model, sorts containment actions as gated rather than autonomous, and builds the golden set from closed incidents in both directions — because you learn quickly when the agent escalates something benign and may never learn when it de-prioritised something real.',
      '新增实战手册（领域实战手册）——《安全运营智能体》。唯一一类输入由"知道有模型在读"的对手亲手撰写的智能体：日志行、文件名、请求头与钓鱼邮件正文都是攻击者可写的，所以任何这类文本序列都不该有能力关掉一条告警。文中把富化保持为确定性的、把裁决权挡在模型之外，把遏制类动作归为须人工把关而非可自主，并用两个方向的已结案事件来搭黄金集——因为智能体把无害的东西升级了你很快会知道，而它把真实的东西降级了你可能永远不会知道。',
    ),
    L(
      'New Playbook (Domain Playbooks) — *Translation & Localization Agents*. Human review of translation worked for thirty years on an undocumented shortcut: bad translations read badly. That shortcut is gone, and a reviewer reading only the target text has no signal — the sentence that inverts a warning reads exactly as well as the one that does not. The playbook makes the reviewable unit the source-target pair in a diff, moves the gates to machine-checkable invariants (placeholder parity, markup integrity, termbase compliance, length budgets, structural parity), treats terminology as retrieval rather than a glossary in the prompt, and notes that source content is untrusted instruction surface.',
      '新增实战手册（领域实战手册）——《翻译与本地化智能体》。三十年来人工审校译文靠的是一条没写下来的捷径：糟糕的译文读起来就糟糕。这条捷径没了，而只读译文的审校者拿不到任何信号——那句把警告反转过来的话，读起来和没反转的一样漂亮。手册把可审校的单位定为 diff 中的原文-译文对，把关卡挪到机器可校验的不变量上（占位符对等、标记完整性、术语库合规、长度预算、结构对等），把术语当作检索问题而不是塞进提示词的术语表，并指出源内容本身就是一处不可信的指令面。',
    ),
  ],
};

export default entry;
