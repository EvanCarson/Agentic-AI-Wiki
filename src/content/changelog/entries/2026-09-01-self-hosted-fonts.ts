import { L, type ChangelogEntry } from '../types.ts';

const entry: ChangelogEntry = {
  date: '2026-09-01',
  title: L(
    'Fonts are served from this site instead of Google, taking two origins out of every page load',
    '字体改为由本站提供，而不再来自 Google，从而把两个域名移出了每次页面加载的关键路径',
  ),
  items: [
    L(
      'Every page used to open with two `preconnect` hints and a render-blocking stylesheet on `fonts.googleapis.com`. That put two extra origins in the critical path before text could settle: fetch 24KB of CSS from one Google host, and only then discover and fetch the actual font files from a second one. All three families are now served from this site, so the browser finds them in the stylesheet it has already downloaded and fetches them from a connection it is already using.',
      '此前每个页面开头都有两条 `preconnect` 提示和一份来自 `fonts.googleapis.com` 的阻塞渲染样式表。这在文字稳定下来之前，把两个额外的域名塞进了关键路径：先从一个 Google 主机取回 24KB 的 CSS，然后才能发现并从第二个主机取回真正的字体文件。现在三套字体全部由本站提供，浏览器在已经下载好的样式表里就能找到它们，并通过一个已经建立好的连接取回。',
    ),
    L(
      'These are the same 22 faces the old link requested — same families, same weights, same latin / latin-ext split and the same `unicode-range` rules — so nothing about the rendering changes. A page loads only the faces it actually needs: the article checked while verifying this pulled 9 files, not 22, and made zero third-party requests. Deliberately static weights rather than a variable font: several rules declare a weight the site does not load and rely on the browser resolving it to the nearest one that exists, and a variable font would start honouring those declarations and quietly relight headings across the site.',
      '这里用的就是原先那个链接所请求的同样 22 个字重字形——同样的字体家族、同样的字重、同样的 latin / latin-ext 拆分，以及同样的 `unicode-range` 规则——因此渲染结果没有任何变化。每个页面只会加载它真正需要的那些：验证时检查的那篇文章取回了 9 个文件而不是 22 个，且没有发起任何第三方请求。这里刻意采用静态字重而非可变字体：站点里有若干规则声明了本站并未加载的字重，依赖浏览器解析到最接近的那一个；而换成可变字体后，浏览器会开始如实采用这些声明，从而悄悄改变全站标题的粗细。',
    ),
    L(
      'A side effect worth naming: readers are no longer announced to a third party on every page view. Loading a font from Google sends the reader\'s IP address and user agent to Google on every visit, whether or not they have anything to do with Google.',
      '一个值得点明的副作用：读者不再在每次浏览时被通报给第三方。从 Google 加载字体，意味着每一次访问都会把读者的 IP 地址与浏览器标识发送给 Google——无论这位读者本身与 Google 有没有任何关系。',
    ),
  ],
};

export default entry;
