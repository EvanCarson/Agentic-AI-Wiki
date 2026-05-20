import { L, type Group } from '../types.ts';

const group: Group = {
  key: 'voice-realtime-agents',
  order: 150,
  name: L('Voice & Realtime Agents', '语音与实时智能体'),
  entries: [
  { page: 'realtime-architecture', slug: 'realtime-architecture', title: L('Realtime Agent Architecture','实时智能体架构'), summary: L('Cascade (STT→LLM→TTS) vs native speech-to-speech, the stateful audio transport, and the one decision everything else hangs on: where the agent loop lives.','级联（STT→LLM→TTS）vs 原生语音到语音、有状态的音频传输，以及一切所系的那个决策：智能体循环住在哪里。') },
  { page: 'latency-budget', slug: 'latency-budget', title: L('The Latency Budget','延迟预算'), summary: L('The sub-second turn accounted for line by line: where the milliseconds go, why endpointing is the biggest slice, and perceived vs actual latency.','把亚秒轮次逐行记账：毫秒去了哪里、为何端点检测是最大一块，以及被感知 vs 实际的延迟。') },
  { page: 'turn-taking-and-barge-in', slug: 'turn-taking-and-barge-in', title: L('Turn-Taking & Barge-In','轮次与打断'), summary: L('VAD vs endpointing, semantic end-of-turn detection, mandatory barge-in, echo cancellation as a prerequisite, and backchannels vs real interruptions.','VAD vs 端点检测、语义轮次结束检测、强制打断、作为前提的回声消除，以及附和 vs 真正的打断。') },
  { page: 'speech-stack', slug: 'speech-stack', title: L('STT, TTS & Speech-to-Speech','STT、TTS 与语音到语音'), summary: L('Streaming STT, the transcription-error tax, TTS time-to-first-audio, native audio models, and why 8 kHz telephony changes every benchmark.','流式 STT、转写错误税、TTS 首段音频时间、原生音频模型，以及为何 8 kHz 电话改变每一个基准。') },
  { page: 'voice-tooling-and-state', slug: 'voice-tooling-and-state', title: L('Tool Use & State in Voice','语音中的工具调用与状态'), summary: L('Calling tools without dead air: preambles, async/parallel tool runs, confirm-by-ear before mutating, and slot state across an interruptible call.','不留空气死寂地调工具：前导语、异步/并行工具运行、变更前靠耳朵确认，以及贯穿可打断通话的槽位状态。') },
  { page: 'voice-failure-modes', slug: 'voice-failure-modes', title: L('Voice Agent Failure Modes','语音智能体失败模式'), summary: L('Hallucinated hearing, dead air, the infinite apology loop, the latency death spiral, and the escalation/handoff you must design for.','幻听、空气死寂、无限道歉循环、延迟死亡螺旋，以及你必须为之设计的升级/移交。') },
  ],
};
export default group;
