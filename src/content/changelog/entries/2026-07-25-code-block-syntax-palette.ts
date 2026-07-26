import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-07-25',
  title: L(
    'Design: code blocks retuned for the cool palette, with a permanent contrast guard',
    '设计：代码块配色适配新的冷色系统，并加入永久性对比度校验',
  ),
  items: [
    L(
      'The syntax palette (keyword/string/function/comment colours) was chosen for the site\'s old warm cream theme; verified against the current cool near-white/near-black surfaces and found to already clear WCAG AA 4.5:1 against the code background at every measured value — 5.92:1 to 14.60:1. A new automated test locks this in so a future token edit cannot silently regress it.',
      '语法配色（关键字/字符串/函数/注释颜色）原是为旧版暖色米调主题选定的；现已对照当前的冷色近白/近黑底色重新校验，结果所有实测值均已达到 WCAG AA 4.5:1 的对比度门槛——从 5.92:1 到 14.60:1 不等。新增一项自动化测试将其锁定，避免未来改动 token 时无声回归。',
    ),
    L(
      'Dropped the synthetic italic on code comments. JetBrains Mono has a true italic cut, but the font link never requested it, so browsers were faking the slant by shearing the upright glyph. At the ~11px comments run at, the true-vs-fake distinction is barely visible, so this removes the slant and lets colour alone carry the distinction — avoiding both the synthesis artifact and the ~22KB an italic subset would add to every page with a code block.',
      '去掉了代码注释的合成斜体。JetBrains Mono 本身带有真正的斜体字形，但字体链接从未请求过它，浏览器只能靠把正体字形做切变来伪造倾斜。注释字号约 11px，真斜体与伪斜体的差异本就难以分辨，因此干脆去掉倾斜、只靠颜色来区分——既避免了合成变形的瑕疵，也省下了斜体子集会给每个带代码块的页面增加的约 22KB。',
    ),
  ],
};
export default entry;
