import { createReadStream, promises as fs } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT_INDEX = process.argv.indexOf('--port');
const PORT = Number(PORT_INDEX >= 0 ? process.argv[PORT_INDEX + 1] : 5173);
const MIME = { '.css':'text/css; charset=utf-8', '.html':'text/html; charset=utf-8', '.ico':'image/x-icon', '.jpeg':'image/jpeg', '.jpg':'image/jpeg', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.mjs':'text/javascript; charset=utf-8', '.png':'image/png', '.svg':'image/svg+xml', '.webmanifest':'application/manifest+json' };

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') { response.writeHead(405, { Allow: 'GET, HEAD' }); response.end('Method Not Allowed'); return; }
  let decodedPath;
  try { decodedPath = decodeURIComponent(new URL(request.url, `http://localhost:${PORT}`).pathname); }
  catch { response.writeHead(400); response.end('Bad Request'); return; }
  if (decodedPath.split('/').some((part) => part.startsWith('.'))) { response.writeHead(404); response.end('Not Found'); return; }
  const fullPath = path.resolve(ROOT, decodedPath === '/' ? 'index.html' : decodedPath.slice(1));
  if (!fullPath.startsWith(`${ROOT}${path.sep}`)) { response.writeHead(403); response.end('Forbidden'); return; }
  try {
    const file = await fs.stat(fullPath);
    if (!file.isFile()) throw new Error('Not a file');
    response.writeHead(200, { 'content-type': MIME[path.extname(fullPath).toLowerCase()] || 'application/octet-stream', 'content-length': file.size, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
    if (request.method === 'HEAD') response.end(); else createReadStream(fullPath).pipe(response);
  } catch { response.writeHead(404); response.end('Not Found'); }
});

server.listen(PORT, '127.0.0.1', () => console.log(`Decora Móveis em http://localhost:${PORT}`));
