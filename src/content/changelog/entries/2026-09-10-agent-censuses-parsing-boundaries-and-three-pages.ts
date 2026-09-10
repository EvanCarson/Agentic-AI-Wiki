import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-09-10',
  title: L(
    'Two AI Blog posts — on the week three vendors shipped agent discovery and none of it is a register, and on the RAG frameworks whose feature lists converged while their operational postures did not — plus three pages on parallel tool calls, mobile coding agents, and system-prompt extraction',
    '两篇 AI 博客——三家厂商在同一周发布了智能体发现能力，而没有一份是登记册；以及那些功能表已经趋同、运维姿态却始终没有趋同的 RAG 框架——外加三个页面：并行工具调用、移动端编码智能体，以及系统提示词提取',
  ),
  items: [
    L(
      'AI Blog — “Discovery is not an inventory”: CrowdStrike shipped Falcon Guardian at Fal.Con on 1 September, AIR left stealth the same day with $50M for an inline context firewall, and Tenable and OpenAI announced the CyberAgents Exchange AI Inspector on the 3rd. Three products, three instrumentation points, one shared admission — the register that the EU AI Act, ISO/IEC 42001 and the NIST AI RMF all assume is obtainable does not exist, and each vendor is now selling an estimate of it from wherever it happens to have a sensor. The post maps what each one is structurally blind to, notes that killing a process does not revoke the OAuth grant that made it dangerous, and argues the metric to start reporting is the delta between discovered and registered, broken down by environment rather than aggregated.',
      'AI 博客《发现不等于清单》：CrowdStrike 于 9 月 1 日在 Fal.Con 发布 Falcon Guardian，AIR 同日带着 5000 万美元走出隐身、做一道内联上下文防火墙，Tenable 与 OpenAI 则在 3 日公布了 CyberAgents Exchange AI Inspector。三样产品，三个埋点位置，一份共有的自认——欧盟《人工智能法案》、ISO/IEC 42001 与 NIST AI RMF 都假定拿得到的那份登记册并不存在，而如今每家厂商都在把"从自家传感器所在之处得出的估计值"卖给你。文章标出每一个在结构上看不见什么，指出把进程杀掉并不吊销那份让它变危险的 OAuth 授权，并论证该开始上报的指标是"已发现"与"已登记"之差，且要按环境拆开、而不是汇总。',
    ),
    L(
      'AI Blog — “LlamaIndex vs Haystack vs RAGFlow vs R2R”: all four do hybrid search, graphs and agentic retrieval, so the feature table decides nothing. Two things do — whether the framework runs in your process or arrives as a second production system with its own database, users and on-call, and where the document-parsing boundary sits. RAGFlow is the only one of the four whose best-quality parser (DeepDoc) ships inside the Apache-2.0 artefact; LlamaIndex has moved that path to a per-page service. Includes the four answers to “where does control flow live”, and the advice to run twenty of your worst PDFs through all four ingestion paths before comparing anything else.',
      'AI 博客《LlamaIndex、Haystack、RAGFlow 与 R2R》：四个都做混合检索、图谱与智能体式检索，所以功能对照表什么也定不了。起决定作用的是两件事——这套框架是跑在你的进程里，还是作为一套自带数据库、用户体系与值班表的第二生产系统抵达；以及文档解析的边界落在哪里。四者之中只有 RAGFlow 把质量最好的解析器（DeepDoc）装进了 Apache-2.0 产物里；LlamaIndex 则把那条路挪到了一项按页计费的服务上。文中给出对"控制流住在哪里"的四种回答，并建议在比较其他任何东西之前，先把你最难啃的二十份 PDF 过一遍这四条摄取路径。',
    ),
    L(
      'Concepts — Parallel Tool Calls: every call in a batch was chosen before any of them ran, which makes fan-out a correctness decision rather than a latency optimisation. Only calls that commute and can be retried independently belong together, partial failure is the ordinary outcome, and the model’s usual repair is to re-emit the whole batch — which runs your non-idempotent write twice. It is on by default in both major APIs, it is the fastest way to fill a context window with results the run never needed, and the fix is a reading/mutating boolean in your tool registry that the dispatcher enforces.',
      '概念 — 并行工具调用：一批调用里的每一次，都是在其中任何一次跑起来之前就选定的——这让扇出成为一个正确性决定，而不是一项延迟优化。只有彼此可交换、且能独立重试的调用才该放在一起；部分失败才是常态，而模型惯常的修复方式是把整批重发一遍——于是你那次非幂等的写跑了两次。它在两家主要 API 上都默认开着，它是把上下文窗口用"本次运行根本用不上的结果"填满的最快办法，而修法是在工具注册表里加一个"读/写"布尔值，由派发器强制执行。',
    ),
    L(
      'Playbooks — Mobile & Native App Agents: a coding agent’s advantage is being wrong twenty times an hour, and a clean iOS or Android build spends that budget before lunch. The answer is not a faster build but a codebase split into a fast core the agent iterates in and a slow shell the full build gates once per candidate. Pin the simulator or every red is ambiguous; make committed snapshot references the contract the agent may propose but never accept; keep signing, entitlements and generated project files out of reach; and rank the backlog by full builds per attempt.',
      '实战手册 — 移动端与原生应用智能体：编码智能体的优势在于一小时错二十次，而一次干净的 iOS 或 Android 构建能在午饭前就把这份预算花光。解法不是把构建变快，而是把代码库劈成一个供智能体迭代的快内核，与一个由完整构建按候选把关一次的慢外壳。把模拟器钉死，否则每一次红都是含混的；把已提交的快照参考图立为契约，智能体可以提议但绝不可以接受；把签名、entitlement 与生成式工程文件放到它够不着的地方；并按"每次尝试要几次完整构建"给待办排序。',
    ),
    L(
      'Operations — System-Prompt Extraction: OWASP lists prompt leakage as LLM07 and says in the same entry that the prompt is neither a secret nor a security control, which most teams read as a reason to guard it harder. Hardening the refusal buys delay against one adversary while degrading the product for everyone, and the ruleset stays recoverable by probing regardless. Separates the text from the secrets it embeds and the tool surface it maps, gives the enforcement-twin audit for every “never” in the prompt, and adds a per-version canary so a leaked copy names its own build and tenant.',
      '运维 — 系统提示词提取：OWASP 把提示词泄露列为 LLM07，并在同一条目里说提示词既不是秘密也不是安全控制——而多数团队把这句话读成了"该守得更严"的理由。加固拒答只是对一个对手拖延一阵，却让所有人的产品都变差，何况那套规则照样能靠试探还原。文章把文本、它嵌着的秘密、以及它标出的工具面三者分开，给出针对提示词里每一句"绝不"的执行孪生审计，并加上一个按版本的金丝雀，好让泄露副本自报构建与租户。',
    ),
  ],
};

export default entry;
