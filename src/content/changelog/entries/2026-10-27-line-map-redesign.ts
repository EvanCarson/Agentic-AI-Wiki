import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-10-27',
  title: L(
    'Site redesign: the wiki drawn as a transit map, with a line colour for every section',
    '全站改版：把维基画成一张地铁线路图，每个板块一条线、一种颜色',
  ),
  items: [
    L(
      'Every section is now a line with its own colour: Field Guide red, Books brown, Concepts green, Deep-Dives blue, Playbooks orange, Operations purple, AI Blog teal. The header shows each line as a short tick under its name, and a page carries its line as a 5px band under the header, so a reader arriving from search can tell which section they are in before reading a word.',
      '每个板块现在都是一条有自己颜色的线：实战指南红、书籍棕、概念绿、深度剖析蓝、实战手册橙、运维紫、AI 博客青。页眉在每个板块名下画一小段对应颜色的线，页面则在页眉下方带一条 5px 的同色色带——从搜索进来的读者，还没读一个字就知道自己在哪个板块。',
    ),
    L(
      'The sidebar is a line diagram: each page is a station on its section\'s line, the page you are on is a large ring, and pages you have already opened in this browser are filled in. Your reading history stays in your own browser and is never sent anywhere.',
      '侧边栏变成一张线路图：每个页面是所在板块线路上的一个站，当前页面是一个大圆环，你在这个浏览器里读过的页面会被填实。阅读记录只保存在你自己的浏览器里，不会上传到任何地方。',
    ),
    L(
      'The home page opens with search and a system map: seven lines leave one hub, and each is as long as its section has entries, so the map is also the contents and its scale. On a phone the map becomes a list of proportional bars.',
      '首页以搜索和一张线网图开场：七条线从同一个枢纽出发，每条线的长度与该板块的条目数成正比，所以这张图同时也是目录和规模。在手机上，线网图变成一列按比例长短的色条。',
    ),
    L(
      'New typeface: Atkinson Hyperlegible Next, drawn by the Braille Institute for legibility, replaces Space Grotesk and Inter; its Mono replaces JetBrains Mono for code. Small tracked capital labels are now sentence case, the smallest text step is 12px instead of 11px, and reading columns were re-measured to about 70 characters a line.',
      '换了字体：由盲文研究所为易读性设计的 Atkinson Hyperlegible Next 取代 Space Grotesk 与 Inter，它的等宽版取代 JetBrains Mono 用于代码。原来字距拉开的小号全大写标签改为句首大写，最小字号从 11px 提到 12px，正文栏宽重新测定为每行约 70 个字符。',
    ),
    L(
      'Page codes (D15, Y7, 3.1) are now station-code pills beside the section name instead of a giant italic numeral. On about 80 pages whose opening heading is a full thesis sentence, the real title now shows above it and the sentence reads as a standfirst, out of the page contents list.',
      '页面编号（D15、Y7、3.1）改成板块名旁边的站码胶囊，不再是一个巨大的斜体数字。约 80 个页面的开头标题本是一整句论点，现在真正的标题显示在它上方，那句话作为导语出现，也不再挤进本页目录。',
    ),
    L(
      'Fixed: 93 page titles across Deep-Dives, Playbooks, Operations and Concepts showed a literal "&amp;" in sidebars, breadcrumbs and browser tabs; they now show "&".',
      '修复：深度剖析、实战手册、运维与概念中有 93 个页面标题在侧边栏、面包屑和浏览器标签里显示成字面的「&amp;」，现已正确显示为「&」。',
    ),
  ],
};

export default entry;
