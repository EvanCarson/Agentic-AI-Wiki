// scripts/lib/static-server.mjs
// Minimal static file server for tests. Astro emits absolute asset paths
// (/_astro/...), so file:// URLs load the HTML without its CSS — which
// would make every computed-style assertion meaningless.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

export async function startStaticServer(root) {
  const server = createServer(async (req, res) => {
    try {
      // Strip the query string and block traversal above `root`.
      const rel = normalize(decodeURIComponent(req.url.split('?')[0]))
        .replace(/^(\.\.[/\\])+/, '');
      let file = join(root, rel);
      try {
        if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
      } catch {
        file = join(root, rel, 'index.html');
      }
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end('not found');
    }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const { port } = server.address();
  return {
    url: `http://127.0.0.1:${port}`,
    close: () => new Promise((r) => server.close(r)),
  };
}
