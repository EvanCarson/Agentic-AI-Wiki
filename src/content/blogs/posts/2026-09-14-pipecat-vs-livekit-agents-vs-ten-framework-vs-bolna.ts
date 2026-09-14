import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-09-14',
  slug: 'pipecat-vs-livekit-agents-vs-ten-framework-vs-bolna',
  title: L(
    'Pipecat vs LiveKit Agents vs TEN vs Bolna: buy the media path, not the pipeline',
    'Pipecat、LiveKit Agents、TEN 与 Bolna：该买的是媒体通路，不是流水线',
  ),
  searchTitle: {
    en: 'Open-source voice agent frameworks compared: Pipecat, LiveKit Agents, TEN Framework, Bolna',
  },
  summary: L(
    'Four open-source voice frameworks that look interchangeable on a feature table have their centres of gravity in four different columns — the runtime, the media server, the graph, the phone line — and only one of those is expensive to change later. The pipeline ergonomics everyone benchmarks are also the part a full-duplex model is busy commoditising, so pick on transport ownership, telephony breadth and maintenance velocity, and read TEN’s licence before you ship.',
    '四个在功能表上看起来可以互换的开源语音框架，重心其实落在四个不同的列上——运行时、媒体服务器、图、电话线——而其中只有一个是事后难以更换的。人人拿来跑分的流水线手感，恰恰是全双工模型正在商品化掉的那部分；所以要按媒体通路归属、电话接入广度与维护速度来挑，并且在上线之前先把 TEN 的许可证读一遍。',
  ),
  tags: ['agent-comparison', 'open-source', 'voice-agents', 'realtime', 'agent-frameworks'],
};

export default post;
