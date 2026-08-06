import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'voice-realtime-agents',
  order: 150,
  name: L('Voice & Realtime Agents', '语音与实时智能体'),
  groupSummary: L('Realtime voice agents — speech stack, turn-taking, barge-in, latency budgets, voice-specific tooling and state.', '实时语音智能体——语音栈、轮替、打断、延迟预算、语音特有的工具与状态。'),
  entries: [
  { page: 'realtime-architecture', slug: 'realtime-architecture', title: L('Realtime Agent Architecture','实时智能体架构'), summary: L('Cascade (STT→LLM→TTS) vs native speech-to-speech, the stateful audio transport, and the one decision everything else hangs on: where the agent loop lives.','级联（STT→LLM→TTS）vs 原生语音到语音、有状态的音频传输，以及一切所系的那个决策：智能体循环住在哪里。') },
  { page: 'latency-budget', slug: 'latency-budget', title: L('The Latency Budget','延迟预算'), summary: L('The sub-second turn accounted for line by line: where the milliseconds go, why endpointing is the biggest slice, and perceived vs actual latency.','把亚秒轮次逐行记账：毫秒去了哪里、为何端点检测是最大一块，以及被感知 vs 实际的延迟。') },
  { page: 'turn-taking-and-barge-in', slug: 'turn-taking-and-barge-in', title: L('Turn-Taking & Barge-In','轮次与打断'), summary: L('VAD vs endpointing, semantic end-of-turn detection, mandatory barge-in, echo cancellation as a prerequisite, and backchannels vs real interruptions.','VAD vs 端点检测、语义轮次结束检测、强制打断、作为前提的回声消除，以及附和 vs 真正的打断。') },
  { page: 'speech-stack', slug: 'speech-stack', title: L('STT, TTS & Speech-to-Speech','STT、TTS 与语音到语音'), summary: L('Streaming STT, the transcription-error tax, TTS time-to-first-audio, native audio models, and why 8 kHz telephony changes every benchmark.','流式 STT、转写错误税、TTS 首段音频时间、原生音频模型，以及为何 8 kHz 电话改变每一个基准。') },
  { page: 'voice-tooling-and-state', slug: 'voice-tooling-and-state', title: L('Tool Use & State in Voice','语音中的工具调用与状态'), summary: L('Calling tools without dead air: preambles, async/parallel tool runs, confirm-by-ear before mutating, and slot state across an interruptible call.','不留空气死寂地调工具：前导语、异步/并行工具运行、变更前靠耳朵确认，以及贯穿可打断通话的槽位状态。') },
  { page: 'voice-failure-modes', slug: 'voice-failure-modes', title: L('Voice Agent Failure Modes','语音智能体失败模式'), summary: L('Hallucinated hearing, dead air, the infinite apology loop, the latency death spiral, and the escalation/handoff you must design for.','幻听、空气死寂、无限道歉循环、延迟死亡螺旋，以及你必须为之设计的升级/移交。') },
  { page: 'outbound-voice-agents', slug: 'outbound-voice-agents', title: L('Outbound voice agents','外呼语音智能体'), summary: L('Agents that **make** the call instead of answering it — pacing, abandonment, identity disclosure, and the regulatory landmines that turn a clever demo into a fine.','主动拨打而非接听的智能体——节奏、放弃率、身份披露，以及把炫酷 demo 变成罚单的合规雷区。') },
  { page: 'evaluating-voice-agents', slug: 'evaluating-voice-agents', title: L('Evaluating Voice Agents','评估语音智能体'), summary: L('Transcript evals score the one layer that was not broken: build the golden set from recorded audio, measure entity error rate rather than WER, and treat timing as a first-class score.','文字记录评测量的是唯一那层本来就没坏的东西：用录下来的音频搭黄金集，量实体错误率而不是 WER，并把时序当作一等公民的评分项。') },
  { page: 'telephony-and-pstn-integration', slug: 'telephony-and-pstn-integration', title: L('Telephony & PSTN Integration','电话与 PSTN 接入'), summary: L('Half the turn latency, all the audio quality and whether the call connects at all live in a carrier path you cannot profile: the fixed transport tax, your number as a reputation asset, the missing metadata channel, and consent as a code path rather than a prompt.','一半的轮次延迟、全部的音质，以及通话到底接不接得通，都住在一条你无法剖析的运营商链路里：固定的传输税、作为信誉资产的号码、缺失的元数据通道，以及作为代码路径而非提示词的同意机制。') },
  ],
};
export default group;
