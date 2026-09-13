import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-09-13',
  title: L(
    'Two AI Blog posts — on the week a voice model stopped waiting for you to finish, and on the four open-source frameworks whose most-polished subsystem it just made redundant — plus three pages on full duplex, the drive-thru lane, and deploying while calls are live',
    '两篇 AI 博客——语音模型不再等你说完的这一周；以及那四个开源框架里被它一举变得多余的、打磨得最精的那个子系统——外加三个页面：全双工、点餐车道，以及在通话进行时发布',
  ),
  items: [
    L(
      'AI Blog — “Full duplex deletes the turn — and the turn was your commit point”: OpenAI put GPT-Live-1 in the API on 10 September at $0.05 a minute billed by the second, a voice layer that listens while it speaks and delegates reasoning and tool calls to a backend text model you pick. The post argues the interesting consequence is not naturalness but a missing event: end-of-turn was what tool dispatch, trace spans, guardrail checks and human handoff were all silently subscribed to, and nothing throws when it stops firing — a tool runs against half a sentence, a guardrail evaluates an empty buffer, and both surface on your dashboard as a model regression. Replace the turn with commit points you declare, treat retraction as the ordinary path rather than an edge case, and note that the bill now has two meters of opposite shape: a per-minute voice layer that charges for the caller’s thinking pause, and a token-metered backend that does not.',
      'AI 博客《全双工删掉了「轮次」——而轮次正是你的提交点》：OpenAI 于 9 月 10 日把 GPT-Live-1 放进 API，每分钟 0.05 美元、按秒计费；这是一个边听边说的语音层，把推理与工具调用委托给一个你自己挑的后端文本模型。文章论证：有意思的后果不是自然度，而是一个消失的事件——工具派发、追踪 span、护栏检查与转人工，全都默默订阅着「轮次结束」，而它不再触发时不会抛出任何异常：一个工具对着半句话运行、一道护栏对着空缓冲求值，两者在你的看板上浮现出来的样子都是一次模型回退。用你自己声明的提交点去取代轮次，把「撤回」当作常态通路而非边角情形；并留意账单如今有两块形状相反的表：一块按分钟计、连来电者思考时的停顿也照收的语音层，和一块按 token 计、并不收的后端。',
    ),
    L(
      'AI Blog — “Pipecat vs LiveKit Agents vs TEN vs Bolna: buy the media path, not the pipeline”: four open-source voice frameworks that look interchangeable on a feature table have their centres of gravity in four different columns — Pipecat (15.5k stars, BSD-2-Clause) in the processor pipeline with transport deliberately left to you, LiveKit Agents (14.2k, Apache-2.0) in its own self-hostable WebRTC media server, TEN (11.1k, Apache-2.0 with additional restrictions) in a polyglot node graph, and Bolna (0.76k, MIT) in the phone line. Only the media path is expensive to change once callers are on it, which makes it the buying axis; the pipeline ergonomics everyone benchmarks are being commoditised by full-duplex models that delete turn detection, the subsystem all four invested most heavily in. Vocode is the cautionary case: nothing about it was wrong when it was chosen, and it became a rewrite the first time the model layer moved.',
      'AI 博客《Pipecat、LiveKit Agents、TEN 与 Bolna：该买的是媒体通路，不是流水线》：四个在功能表上看似可以互换的开源语音框架，重心落在四个不同的列上——Pipecat（15.5k star，BSD-2-Clause）在处理器流水线上、并刻意把传输留给你，LiveKit Agents（14.2k，Apache-2.0）在它自家可自托管的 WebRTC 媒体服务器上，TEN（11.1k，Apache-2.0 并附加限制）在一张多语言节点图上，Bolna（0.76k，MIT）则在电话线上。一旦有来电者接进来，只有媒体通路是昂贵到改不动的，这使它成为选型轴；而人人拿来跑分的流水线手感，正被那些删掉轮次检测的全双工模型商品化掉——轮次检测恰恰是四者投入最重的那个子系统。Vocode 就是那个警示案例：当初选它时它没有任何一点是错的，而在模型层第一次挪动时，它变成了一次重写。',
    ),
    L(
      'Concepts — Full-Duplex Speech: the turn is an artefact of the pipeline, not a property of speech — human conversation overlaps constantly and gaps between turns average around 200 ms, which is shorter than it takes to plan a sentence. Full duplex removes the endpointing decision rather than improving it, which means an echo-cancellation requirement becomes a correctness requirement, a threshold you could tune and revert becomes an interruption policy distributed across weights, and per-turn evaluation loses its segments. The meter changes shape too: silence is free under token-metered audio and billed at full rate under a per-minute voice layer.',
      '概念 — 全双工语音：轮次是流水线的产物，不是言语的属性——人类对话不断重叠，轮次间隔平均在 200 毫秒上下，短于组织一个句子所需的时间。全双工是把端点检测这个判定取消掉，而不是把它做得更好：于是回声消除从音质要求变成正确性要求，一个你能调、能回滚的阈值变成了一条分布在权重里的打断策略，而逐轮评估失去了它的切分单位。计费表也换了形状：在按 token 计量的音频里静音是免费的，在按分钟计的语音层里则按全价收费。',
    ),
    L(
      'Playbooks — Drive-Thru &amp; Restaurant Ordering Agents: voice AI running a lane alone lands around 83% order accuracy against about 87% for the standard lane, and about 95% when staff step in on roughly one order in five — read together, those say the product is the handoff rather than the recogniser, and the number that moves the P&amp;L is containment at an acceptable intervention rate. Escalate on structure (an amended modifier, an item outside the current menu version) rather than on a confidence score, hand the crew the structured order rather than the audio, ground every item in the live menu and write through the POS, and measure greeting latency from vehicle detection because the queue is physical and drive-offs are the metric nobody instruments until a bad week.',
      '实战手册 — 点餐车道与餐厅点单智能体：语音 AI 独自跑一条车道，订单准确率约 83%，普通车道约 87%，而店员介入时约 95%——他们大约每五单介入一次；把这几个数放在一起读，说的是产品是那次交接而不是识别器，而撬动损益表的数字是「在可接受介入率下的自助完成率」。按结构升级（被改过的配料、不在当前菜单版本里的商品），而不是按置信度分数；交给店员的是结构化订单而不是音频；把每个商品接地到当前菜单并穿过 POS 写入；并从车辆检测开始量问候延迟，因为队列是物理的，而「放弃排队」是那个没人埋点、直到过了糟糕的一周才想起来的指标。',
    ),
    L(
      'Operations — Long-Lived Sessions &amp; Zero-Downtime Deploys: rolling updates, connection draining and a thirty-second grace period were all designed for sub-second requests, so an agent session that runs for forty minutes makes your release cadence a function of the p99 of your session-length distribution — and a pod killed at the end of its grace period records a normal rollout with a slight uptick in session-ended events, alerting nobody. Pin the build to the session and route by session ID rather than migrating live state, snapshot feature flags at session start, expand-migrate-contract your session schema across three releases rather than one, and set a maximum session age derived backwards from how long you are willing to drain.',
      '运维 — 长会话与零停机发布：滚动更新、连接排空与三十秒宽限期，全都是为亚秒级请求设计的；于是一次跑四十分钟的智能体会话，会让你的发版节奏变成会话时长分布 p99 的函数——而一个在宽限期结束时被杀掉的 pod，记录下来的是一次正常滚动发布外加「会话结束」事件的轻微上扬，谁也不会被告警。把构建钉在会话上、按会话 ID 路由，而不是去迁移活跃状态；在会话开始时给特性开关拍快照；把会话 schema 的「扩展—迁移—收缩」拆到三个版本里而不是挤进一个；并从「你愿意排空多久」倒推出一个最长会话时长。',
    ),
  ],
};

export default entry;
