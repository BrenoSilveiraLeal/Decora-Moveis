import { createReadStream, promises as fs } from 'node:fs';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import catalog from './api/catalog.js';
import health from './api/health.js';
import orders from './api/orders.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT_INDEX = process.argv.indexOf('--port');
const PORT = Number(PORT_INDEX >= 0 ? process.argv[PORT_INDEX + 1] : 5173);
const API_ROUTES = new Map([
  ['/api/health', health],
  ['/api/catalog', catalog],
  ['/api/orders', orders]
]);
const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json'
};

async function readRequestBody(request, limit = 1024 * 1024) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > limit) throw Object.assign(new Error('Request body too large'), { status: 413 });
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function handleApi(request, response, url, handler) {
  try {
    const body = await readRequestBody(request);
    const contentType = request.headers['content-type'];
    const webRequest = new Request(url, {
      method: request.method,
      headers: contentType ? { 'content-type': Array.isArray(contentType) ? contentType[0] : contentType } : {},
      ...(body.length ? { body } : {})
    });
    const result = await handler.fetch(webRequest);
    response.writeHead(result.status, Object.fromEntries(result.headers));
    response.end(Buffer.from(await result.arrayBuffer()));
  } catch (error) {
    const status = error.status || 500;
    response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
    response.end(JSON.stringify({ error: status === 413 ? 'Corpo da requisição muito grande.' : 'Falha interna do servidor local.' }));
    if (status !== 413) console.error(error);
  }
}

async function handleStatic(request, response, url) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method Not Allowed');
    return;
  }

  let decodedPath;
  try { decodedPath = decodeURIComponent(url.pathname); }
  catch {
    response.writeHead(400);
    response.end('Bad Request');
    return;
  }
  if (decodedPath.split('/').some((segment) => segment.startsWith('.'))) {
    response.writeHead(404);
    response.end('Not Found');
    return;
  }

  const relativePath = decodedPath === '/' ? 'index.html' : decodedPath.slice(1);
  const fullPath = path.resolve(ROOT, relativePath);
  if (!fullPath.startsWith(`${ROOT}${path.sep}`)) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  try {
    const file = await fs.stat(fullPath);
    if (!file.isFile()) throw new Error('Not a file');
    response.writeHead(200, {
      'content-type': MIME[path.extname(fullPath).toLowerCase()] || 'application/octet-stream',
      'content-length': file.size,
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff'
    });
    if (request.method === 'HEAD') response.end();
    else createReadStream(fullPath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end('Not Found');
  }
}

const server = createServer((request, response) => {
  const url = new URL(request.url, `http://localhost:${PORT}`);
  const api = API_ROUTES.get(url.pathname);
  if (api) void handleApi(request, response, url, api);
  else if (url.pathname.startsWith('/api/')) {
    response.writeHead(404, { 'content-type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ error: 'Endpoint não encontrado.' }));
  } else void handleStatic(request, response, url);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Decora Móveis + API em http://localhost:${PORT}`);
  console.log('Rotas: GET /api/health, GET /api/catalog, POST /api/orders');
});
