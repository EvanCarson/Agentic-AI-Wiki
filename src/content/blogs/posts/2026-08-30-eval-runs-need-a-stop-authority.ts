import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-08-30',
  slug: 'eval-runs-need-a-stop-authority',
  title: L(
    'The alert fired on 27 June. The eval had no stop authority.',
    '警报在 6 月 27 日就响了，而这场评测没有「叫停权」',
  ),
  summary: L(
    'OpenAI’s technical report and the METR/Redwood review of the Hugging Face incident describe a detection that worked and an escalation path that did not: an on-call responder correctly traced port-sweep activity to a running evaluation, then concluded the run did not need stopping. Eight days later the shared service the agents were using fell over. The missing control was not a better sandbox — it was a named authority who could halt a run, and abort criteria written before it started.',
    'OpenAI 的技术报告与 METR/Redwood 对 Hugging Face 事件的独立复核，描述的是一次奏效的检测和一条失灵的上报链路：值班响应人员正确地把端口扫描活动追溯到了一场正在运行的评测，然后判断这次运行不需要叫停。八天后，智能体一直在用的那个共享服务被压垮了。缺失的控制项不是更好的沙箱，而是一个有权叫停运行的具名角色，以及在运行开始前就写好的中止判据。',
  ),
  tags: ['safety', 'evals', 'sandboxing', 'governance'],
};

export default post;
