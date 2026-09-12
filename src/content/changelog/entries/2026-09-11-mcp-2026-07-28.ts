import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-09-11',
  title: L(
    'Every MCP page has been brought onto the current protocol revision, and one of them is new',
    'MCP 板块的每一页都已对齐到当前协议修订版，其中一页是全新的',
  ),
  items: [
    L(
      'The MCP section was describing a version of the protocol that no longer exists. All eleven pages were written in July 2026, days before the `2026-07-28` revision landed and deleted the thing they were built around: the `initialize` handshake, the session header, resumable streams, `ping`, `logging/setLevel`, and the ability for a server to call back into the host at all. Between them the pages cited the old revision twenty-two times and walked readers through a handshake in twenty-seven passages. Meanwhile the AI Blog had covered the change three times. A reader trusting the reference section was being taught a protocol the site itself had already reported as gone.',
      'MCP 板块此前描述的，是一个已经不存在的协议版本。这十一个页面都写于 2026 年 7 月，距离 `2026-07-28` 修订版落地只差几天——而那次修订恰恰删掉了它们赖以成立的东西：`initialize` 握手、会话头、可恢复的流、`ping`、`logging/setLevel`，以及服务器回头调用宿主的能力本身。这些页面合计引用旧修订版二十二次，并在二十七处带着读者走一遍握手流程。与此同时，AI 博客已经三次报道过这次变更。也就是说，信任参考板块的读者，学到的是一个本站自己早已报道为"已消失"的协议。',
    ),
    L(
      'New page, `/deep-dives/mcp/mcp-revision-2026-07-28`, on the revision itself. Its argument: calling this "MCP went stateless" makes it sound like an operational convenience, and it was not. Deleting the handshake deleted the one place where negotiation, identity and server-initiated requests used to live, so all three had to reappear on every single request — a server that does not restate them is now malformed, not merely old-fashioned. The page covers what per-request metadata must carry, why per-connection state has no replacement at all, and the pattern that replaced server-initiated requests, in which the server returns its questions and the client retries the call carrying the answers under a deliberately different request id.',
      '新增页面 `/deep-dives/mcp/mcp-revision-2026-07-28`，专门讲这次修订。它的论点是：把这件事称作"MCP 变成无状态了"，听起来像是一项运维便利，但它不是。删掉握手，等于删掉了协商、身份与服务器发起请求原本唯一的落脚点，于是这三者都必须在每一次请求上重新出现——如今不再逐次声明的服务器，是格式错误，而不只是写法老旧。本页讲清了每次请求的元数据必须携带什么、为何按连接保存的状态根本没有替代品，以及取代"服务器发起请求"的那套模式：服务器把问题返回，客户端带着答案、用一个刻意不同的请求 id 重试同一次调用。',
    ),
    L(
      '`/deep-dives/mcp/mcp-testing` was rewritten, because it was the page most likely to waste a reader\'s afternoon. Its two headline recommendations had both stopped being true: one Python helper it named has been removed from the SDK outright, and the TypeScript pattern it taught now only connects the older generation of servers. It also recommended a tool whose last real commit was December 2025. The rewrite covers the current in-process pattern in both languages, what a test fixture asserts now that there is no handshake to set up, how to prove your server rejects a tampered continuation token, the official conformance suite, and three cheap tests that between them cover seven CVEs across six SDKs.',
      '`/deep-dives/mcp/mcp-testing` 做了重写，因为它是最可能白白浪费读者一个下午的那一页。它主推的两项建议都已不再成立：它点名的一个 Python 辅助函数已被 SDK 整个移除，而它教的 TypeScript 写法如今只能连上老一代的服务器。它还推荐了一个最后一次实质提交停在 2025 年 12 月的工具。重写后的版本覆盖了两种语言当前的进程内测试写法、在"已经没有握手可搭"之后 fixture 该断言什么、如何证明你的服务器会拒收被篡改的续传令牌、官方一致性测试套件，以及三个成本极低、却合起来覆盖了六个 SDK 上七个 CVE 的测试。',
    ),
    L(
      'The other nine pages were corrected rather than rewritten, and two of them contained claims that were never true rather than merely outdated. The registry page told readers, in its opening line and again in a full section, that the 2026 roadmap adds well-known-URI capability discovery; the roadmap contains no such item, and runtime discovery in fact shipped inside the protocol as a mandatory method. The same page carried an example manifest using field names the real schema does not define, and stated that the manifest lets a host check protocol compatibility before installing — it has no protocol-version field at all. Both are replaced with verified material.',
      '其余九页是修正而非重写，其中两页里有些说法并不只是过时，而是从来就不成立。注册表那一页在开篇一句、以及后面一整节里都告诉读者：2026 路线图会加入基于 well-known URI 的能力发现；然而路线图里根本没有这一项，而运行时发现实际上是以一个必须实现的方法落在协议内部的。同一页还给出了一份示例清单，用的字段在真实 schema 里并不存在，并声称该清单能让宿主在安装前检查协议兼容性——可它连一个协议版本字段都没有。这两处都已替换为经过核实的内容。',
    ),
  ],
};

export default entry;
