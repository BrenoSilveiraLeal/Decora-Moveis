import { publicCatalog } from '../lib/commerce.js';

export default {
  fetch(request) {
    if (request.method !== 'GET') {
      return Response.json({ error: 'Use GET para consultar o catálogo.' }, { status: 405 });
    }
    return Response.json({ ok: true, products: publicCatalog() }, {
      headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' }
    });
  }
};
