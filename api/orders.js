import { ApiError, createDemoOrder } from '../lib/commerce.js';

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return Response.json({ error: 'Use POST para validar e criar um pedido demonstrativo.' }, { status: 405 });
    }
    if (!request.headers.get('content-type')?.includes('application/json')) {
      return Response.json({ error: 'Envie o pedido em formato JSON.' }, { status: 415 });
    }
    try {
      let input;
      try { input = await request.json(); }
      catch { return Response.json({ error: 'O JSON do pedido está inválido.' }, { status: 400 }); }
      const order = createDemoOrder(input);
      return Response.json({ ok: true, persisted: false, order }, {
        headers: { 'Cache-Control': 'no-store' }
      });
    } catch (error) {
      if (error instanceof ApiError) {
        return Response.json({ error: error.message }, { status: error.status });
      }
      console.error('Falha ao validar pedido demonstrativo:', error);
      return Response.json({ error: 'Não foi possível validar o pedido agora.' }, { status: 500 });
    }
  }
};
