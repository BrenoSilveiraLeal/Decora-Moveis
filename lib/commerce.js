import { COUPONS, PRODUCTS, STORE } from '../assets/js/data.js';

const MAX_QTY_PER_VARIANT = 10;
const REGIONS = {
  0: { name: 'Grande São Paulo', base: 59, days: 4 },
  1: { name: 'Interior de São Paulo', base: 69, days: 5 },
  2: { name: 'Rio de Janeiro e Espírito Santo', base: 89, days: 7 },
  3: { name: 'Minas Gerais', base: 79, days: 7 },
  4: { name: 'Bahia e Sergipe', base: 129, days: 10 },
  5: { name: 'PE, AL, PB e RN', base: 139, days: 12 },
  6: { name: 'Norte, CE, PI e MA', base: 169, days: 15 },
  7: { name: 'Centro-Oeste e Tocantins', base: 119, days: 10 },
  8: { name: 'Paraná e Santa Catarina', base: 99, days: 8 },
  9: { name: 'Rio Grande do Sul', base: 109, days: 9 }
};

export class ApiError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

const roundMoney = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

function normalizeItems(items) {
  if (!Array.isArray(items) || items.length === 0 || items.length > 100) {
    throw new ApiError('O carrinho está vazio ou contém itens demais.');
  }

  const quantities = new Map();
  for (const item of items) {
    const pid = typeof item?.pid === 'string' ? item.pid : '';
    const vid = typeof item?.vid === 'string' ? item.vid : '';
    const qty = Number(item?.qty);
    if (!pid || !vid || !Number.isInteger(qty) || qty < 1) {
      throw new ApiError('Há um item inválido no carrinho.');
    }
    const key = `${pid}|${vid}`;
    const nextQty = (quantities.get(key) || 0) + qty;
    if (nextQty > MAX_QTY_PER_VARIANT) {
      throw new ApiError(`O limite é de ${MAX_QTY_PER_VARIANT} unidades por cor.`);
    }
    quantities.set(key, nextQty);
  }

  return [...quantities.entries()].map(([key, qty]) => {
    const [pid, vid] = key.split('|');
    const product = PRODUCTS.find((entry) => entry.id === pid);
    const variant = product?.variants.find((entry) => entry.id === vid);
    if (!product || !variant) throw new ApiError('Um produto do carrinho não está mais disponível.', 422);
    return { pid, vid, qty, product, variant, total: roundMoney(variant.price * qty) };
  });
}

function resolveCoupon(code, subtotal) {
  if (!code) return { code: null, discount: 0, freeShipping: false, label: null };
  const normalized = String(code).trim().toUpperCase();
  const coupon = COUPONS[normalized];
  if (!coupon) throw new ApiError('Cupom inválido ou expirado.', 422);
  if (coupon.min && subtotal < coupon.min) throw new ApiError(`O cupom ${normalized} exige uma compra mínima de R$ ${coupon.min}.`, 422);

  let discount = 0;
  if (coupon.type === 'percent') discount = subtotal * coupon.value / 100;
  if (coupon.type === 'fixed') discount = coupon.value;
  return {
    code: normalized,
    discount: roundMoney(Math.min(discount, subtotal)),
    freeShipping: coupon.type === 'shipping',
    label: coupon.label
  };
}

function businessDate(days) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date());
  const part = (type) => parts.find((entry) => entry.type === type).value;
  const date = new Date(Date.UTC(Number(part('year')), Number(part('month')) - 1, Number(part('day')), 15));
  let added = 0;
  while (added < days) {
    date.setUTCDate(date.getUTCDate() + 1);
    const weekday = date.getUTCDay();
    if (weekday !== 0 && weekday !== 6) added++;
  }
  return date;
}

function shippingOptions(region, subtotalAfterDiscount, units, freeCoupon) {
  const extraUnits = Math.max(0, units - 1);
  const freeStandard = subtotalAfterDiscount >= STORE.freeShippingFrom || freeCoupon;
  const options = [
    { id: 'padrao', label: 'Entrega padrão', days: region.days, price: freeStandard ? 0 : region.base + extraUnits * 18 },
    { id: 'expressa', label: 'Entrega expressa', days: Math.max(2, Math.ceil(region.days * 0.5)), price: Math.round(region.base * 1.8 + extraUnits * 25) },
    { id: 'retirada', label: 'Retirar no showroom', note: 'Rua dos Pinheiros, 1200 · São Paulo/SP', days: 2, price: 0 }
  ];
  return options.map((option) => {
    const date = businessDate(option.days);
    return {
      ...option,
      date: date.toISOString(),
      dateText: new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo', weekday: 'short', day: 'numeric', month: 'short'
      }).format(date)
    };
  });
}

export function createDemoOrder(input) {
  const lines = normalizeItems(input?.items);
  const subtotal = roundMoney(lines.reduce((sum, line) => sum + line.total, 0));
  const coupon = resolveCoupon(input?.coupon, subtotal);
  const regionCode = String(input?.regionCode ?? '');
  const region = REGIONS[regionCode];
  if (!region) throw new ApiError('Informe um CEP válido para calcular a entrega.', 422);

  const units = lines.reduce((sum, line) => sum + line.qty, 0);
  const options = shippingOptions(region, subtotal - coupon.discount, units, coupon.freeShipping);
  const shippingId = String(input?.shippingId || 'padrao');
  const shipping = options.find((option) => option.id === shippingId);
  if (!shipping) throw new ApiError('Opção de entrega inválida.', 422);

  const assemblyUnits = lines.filter((line) => line.product.assembly).reduce((sum, line) => sum + line.qty, 0);
  const assembly = input?.assembly === true ? roundMoney(assemblyUnits * STORE.assemblyPrice) : 0;
  const base = roundMoney(subtotal - coupon.discount + shipping.price + assembly);
  const paymentMethod = String(input?.payment?.method || '');
  if (!['pix', 'card', 'boleto'].includes(paymentMethod)) throw new ApiError('Forma de pagamento inválida.', 422);

  const maxInstallments = Math.max(1, Math.min(STORE.maxInstallments, Math.floor(base / 100)));
  const installments = paymentMethod === 'card' ? Number(input?.payment?.installments) : 1;
  if (!Number.isInteger(installments) || installments < 1 || installments > maxInstallments) {
    throw new ApiError('Quantidade de parcelas inválida.', 422);
  }
  const pixDiscount = paymentMethod === 'pix' ? roundMoney(base * STORE.pixDiscount / 100) : 0;
  const selectedShipping = {
    id: shipping.id,
    label: shipping.label,
    date: shipping.date,
    dateText: shipping.dateText,
    note: shipping.note || ''
  };

  return {
    number: `DM-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    lines: lines.map(({ pid, vid, qty, total }) => ({ pid, vid, qty, total })),
    totals: {
      subtotal,
      discount: coupon.discount,
      coupon: coupon.code,
      shipping: shipping.price,
      assembly,
      pixDiscount,
      total: roundMoney(base - pixDiscount)
    },
    shipping: selectedShipping,
    payment: { method: paymentMethod, installments, last4: null }
  };
}

export function publicCatalog() {
  return PRODUCTS.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
    variants: product.variants.map((variant) => ({
      id: variant.id,
      name: variant.name,
      price: variant.price,
      image: variant.image
    }))
  }));
}
