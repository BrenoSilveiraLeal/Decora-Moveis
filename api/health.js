export default {
  fetch() {
    return Response.json({
      ok: true,
      service: 'decora-moveis-demo-api',
      capabilities: ['catalog', 'server-side cart validation', 'coupon and shipping calculation', 'demo order generation'],
      persistence: 'none'
    }, { headers: { 'Cache-Control': 'no-store' } });
  }
};
