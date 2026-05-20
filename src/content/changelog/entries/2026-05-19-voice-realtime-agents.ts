import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-05-19',
  title: L('Voice & Realtime Agents deep-dive group', '语音与实时智能体深度剖析分组'),
  items: [
    L('New Deep-Dive group "Voice & Realtime Agents" — 6 essays: realtime agent architecture (cascade vs native speech-to-speech), the latency budget, turn-taking & barge-in, the STT/TTS/speech-to-speech stack, tool use & state in voice, and voice agent failure modes.',
      '新增「深度剖析」分组「语音与实时智能体」——6 篇文章：实时智能体架构（级联 vs 原生语音到语音）、延迟预算、轮次与打断、STT/TTS/语音到语音栈、语音中的工具调用与状态，以及语音智能体失败模式。'),
    L('Grounded in the 2025–2026 realtime landscape: speech-to-speech APIs (OpenAI Realtime / gpt-realtime, Gemini Live), semantic-VAD endpointing, sub-second turn budgets, and SIP/PSTN telephony constraints.',
      '立足 2025–2026 的实时格局：语音到语音 API（OpenAI Realtime / gpt-realtime、Gemini Live）、语义 VAD 端点检测、亚秒轮次预算，以及 SIP/PSTN 电话约束。'),
  ],
};
export default entry;
