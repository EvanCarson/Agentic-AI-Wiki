import { L, type BlogPost } from '../types.ts';

const post: BlogPost = {
  date: '2026-10-21',
  slug: 'the-model-moved-onto-the-laptop',
  title: L(
    'The model moved onto the laptop; the trust boundary did not',
    '模型搬进了笔记本，信任边界没有跟着搬',
  ),
  summary: L(
    "Perplexity Computer now runs its model, planning and file processing entirely on an Apple-silicon Mac, with no inference request leaving the device and no credit charged. That answers data residency and barely touches exfiltration: the agent still reads Mail and Messages on permission, still sits on your files, and still holds an approved cloud route in the same app. Local inference removes the provider's request log — and with it the kill switch, the egress control and the central audit trail.",
    'Perplexity Computer 现在可以把模型、规划与文件处理全部跑在 Apple 芯片的 Mac 上：没有推理请求离开设备，也不计额度。这回答了数据驻留，却几乎没有触及数据外泄：智能体仍在获得许可后读取邮件与信息、仍坐在你的文件上，而且在同一个应用里仍握着一条已授权的云端路径。本地推理删掉的是供应商的请求日志——连带删掉的还有紧急停止开关、出口管控与集中审计轨迹。',
  ),
  tags: ['safety', 'self-hosted', 'computer-use', 'agentic-ai', 'prompt-injection'],
};

export default post;
