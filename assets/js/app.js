/**
 * DECORA MÓVEIS - CONTROLADOR DA LOJA
 * Vitrine interativa, carrinho (localStorage), frete simulado, cupons,
 * checkout em etapas e confirmação de pedido. Nenhum dado sai do navegador,
 * exceto a consulta pública de CEP (ViaCEP) no checkout.
 */

/* ==========================================================================
   UTILITÁRIOS
   ========================================================================== */
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

const money = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const moneyShort = (n) => 'R$ ' + n.toLocaleString('pt-BR');
const onlyDigits = (s) => String(s || '').replace(/\D/g, '');

const ICONS = {
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M3 10h18M7 15h3"/></svg>',
  refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8 8 0 0 0-14.9-3M4 4v4h4M4 13a8 8 0 0 0 14.9 3M20 20v-4h-4"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  pix: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m12 3 4.5 4.5L12 12 7.5 7.5 12 3ZM12 12l4.5 4.5L12 21l-4.5-4.5L12 12ZM3 12l4.5-4.5L12 12l-4.5 4.5L3 12ZM12 12l4.5-4.5L21 12l-4.5 4.5L12 12Z"/></svg>',
  barcode: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6v12M7 6v12M10 6v12M14 6v12M16 6v12M20 6v12"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
  tool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5 2.5-2.5Z"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11 12 4l8 7v9H4z"/><path d="M10 20v-5h4v5"/></svg>'
};

/* Armazenamento local com fallback em memória (aba anônima, bloqueio etc.) */
const memoryStore = {};
function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return key in memoryStore ? memoryStore[key] : fallback;
  }
}
function save(key, value) {
  memoryStore[key] = value;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* segue em memória */ }
}

function findProduct(pid) { return PRODUCTS.find((p) => p.id === pid); }
function findVariant(product, vid) { return product && product.variants.find((v) => v.id === vid); }
function productLabel(product) { return `${product.category} ${product.name}`; }
function productUrl(product, variant) { return `produto.html?p=${product.id}&c=${variant.id}`; }

function installmentsFor(total) {
  const n = Math.max(1, Math.min(STORE.maxInstallments, Math.floor(total / 100)));
  return { n, value: total / n };
}

/* Tema da vitrine: todas as cores passam por variáveis CSS no :root */
function applyTheme(theme, fill) {
  const root = document.documentElement;
  root.style.setProperty('--color-text-nav', theme.navText);
  root.style.setProperty('--color-dark-btn', theme.darkBtn);
  root.style.setProperty('--color-dark-hover', theme.darkHover);
  root.style.setProperty('--color-badge-bg', theme.badgeBg);
  root.style.setProperty('--color-text-title', theme.titleText);
  root.style.setProperty('--color-fill', fill || theme.bodyBg);
}

/* ==========================================================================
   CARRINHO E CHECKOUT (estado)
   ========================================================================== */
const CART_KEY = 'decora_cart';
const STATE_KEY = 'decora_checkout';
const ORDER_KEY = 'decora_last_order';

const getCart = () => load(CART_KEY, []);
const setCart = (items) => { save(CART_KEY, items); refreshCartUI(); };
const getState = () => Object.assign({ coupon: null, cep: '', ship: 'padrao', assembly: false }, load(STATE_KEY, {}));
const setState = (patch) => save(STATE_KEY, Object.assign(getState(), patch));

function cartLines() {
  return getCart()
    .map((item) => {
      const product = findProduct(item.pid);
      const variant = findVariant(product, item.vid);
      if (!product || !variant) return null;
      return { product, variant, qty: item.qty, total: variant.price * item.qty };
    })
    .filter(Boolean);
}

const cartCount = () => cartLines().reduce((s, l) => s + l.qty, 0);
const cartSubtotal = () => cartLines().reduce((s, l) => s + l.total, 0);

function addToCart(pid, vid, qty = 1, { silent = false } = {}) {
  const items = getCart();
  const found = items.find((i) => i.pid === pid && i.vid === vid);
  if (found) found.qty = Math.min(10, found.qty + qty);
  else items.push({ pid, vid, qty });
  setCart(items);
  bumpBadge();
  if (!silent) {
    const product = findProduct(pid);
    const variant = findVariant(product, vid);
    showToast(`${productLabel(product)} · ${variant.name} no carrinho`, 'Ver carrinho', openDrawer);
  }
}

function setQty(pid, vid, qty) {
  let items = getCart();
  if (qty <= 0) items = items.filter((i) => !(i.pid === pid && i.vid === vid));
  else items.forEach((i) => { if (i.pid === pid && i.vid === vid) i.qty = Math.min(10, qty); });
  setCart(items);
}

/* Frete simulado por faixa de CEP */
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

function addBusinessDays(n) {
  const d = new Date();
  let added = 0;
  while (added < n) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return d;
}

const fmtDate = (d) => d.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' });

function quoteShipping(cep, subtotal, units, freeCoupon = false) {
  const digits = onlyDigits(cep);
  if (digits.length !== 8) return null;
  const region = REGIONS[digits[0]];
  const extra = Math.max(0, units - 1);
  const isFree = subtotal >= STORE.freeShippingFrom || freeCoupon;
  const standard = isFree ? 0 : region.base + extra * 18;
  const express = Math.round(region.base * 1.8 + extra * 25);
  const options = [
    { id: 'padrao', label: 'Entrega padrão', days: region.days, price: standard },
    { id: 'expressa', label: 'Entrega expressa', days: Math.max(2, Math.ceil(region.days * 0.5)), price: express },
    { id: 'retirada', label: 'Retirar no showroom', note: 'Rua dos Pinheiros, 1200 · São Paulo/SP', days: 2, price: 0 }
  ];
  options.forEach((o) => {
    o.date = addBusinessDays(o.days);
    o.dateText = fmtDate(o.date);
  });
  return { region: region.name, options };
}

function couponInfo(code, subtotal) {
  const c = code && COUPONS[code];
  if (!c) return { valid: false, discount: 0 };
  if (c.min && subtotal < c.min) return { valid: false, discount: 0, reason: `Válido para compras acima de ${moneyShort(c.min)}` };
  let discount = 0;
  if (c.type === 'percent') discount = subtotal * (c.value / 100);
  if (c.type === 'fixed') discount = c.value;
  return { valid: true, discount, freeShipping: c.type === 'shipping', label: c.label };
}

function computeTotals(payment) {
  const state = getState();
  const lines = cartLines();
  const subtotal = lines.reduce((s, l) => s + l.total, 0);
  const units = lines.reduce((s, l) => s + l.qty, 0);
  const coupon = couponInfo(state.coupon, subtotal);
  const discount = coupon.valid ? Math.min(coupon.discount, subtotal) : 0;
  const quote = units ? quoteShipping(state.cep, subtotal - discount, units, coupon.freeShipping) : null;
  const ship = quote ? (quote.options.find((o) => o.id === state.ship) || quote.options[0]) : null;
  const assemblyUnits = lines.filter((l) => l.product.assembly).reduce((s, l) => s + l.qty, 0);
  const assembly = state.assembly && assemblyUnits ? assemblyUnits * STORE.assemblyPrice : 0;
  const base = subtotal - discount + (ship ? ship.price : 0) + assembly;
  const pixDiscount = payment === 'pix' ? base * (STORE.pixDiscount / 100) : 0;
  const total = base - pixDiscount;
  return { state, lines, subtotal, units, coupon, discount, quote, ship, assemblyUnits, assembly, pixDiscount, total, base };
}

/* ==========================================================================
   CABEÇALHO, GAVETA DO CARRINHO E TOAST (comuns a todas as páginas)
   ========================================================================== */
function renderHeader(el) {
  if (!el) return;
  el.innerHTML = `
    <div class="header-left">
      <a href="index.html" class="brand-logo" aria-label="Decora Móveis Início"><span>D</span></a>
      <nav aria-label="Navegação Principal">
        <ul class="nav-menu">
          <li><a href="index.html#colecao" class="nav-link">Coleção</a></li>
          <li><a href="index.html#sobre" class="nav-link">Sobre</a></li>
          <li><a href="index.html#entrega" class="nav-link">Entrega</a></li>
          <li><a href="index.html#contato" class="nav-link">Contato</a></li>
        </ul>
      </nav>
    </div>
    <div class="header-right">
      <button class="cart-button" id="cartButton" type="button" aria-label="Abrir carrinho">
        ${ICONS.bag}
        <span class="cart-count" id="cartCount">0</span>
      </button>
    </div>`;
  $('#cartButton', el).addEventListener('click', openDrawer);
}

function injectChrome() {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="drawer-overlay" id="drawerOverlay"></div>
    <aside class="drawer" id="cartDrawer" aria-label="Carrinho de compras" aria-hidden="true">
      <div class="drawer-head">
        <h2>carrinho</h2>
        <button class="icon-btn" id="drawerClose" type="button" aria-label="Fechar carrinho">${ICONS.close}</button>
      </div>
      <div class="drawer-body" id="drawerBody"></div>
      <div class="drawer-foot" id="drawerFoot"></div>
    </aside>
    <div class="toast" id="toast" role="status" aria-live="polite"><span id="toastText"></span></div>
  `);
  $('#drawerOverlay').addEventListener('click', closeDrawer);
  $('#drawerClose').addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });
}

function openDrawer() {
  renderDrawer();
  document.body.classList.add('drawer-open');
  $('#cartDrawer').setAttribute('aria-hidden', 'false');
  hideToast();
}

function closeDrawer() {
  document.body.classList.remove('drawer-open');
  const d = $('#cartDrawer');
  if (d) d.setAttribute('aria-hidden', 'true');
}

function lineItemHTML(line, { compact = true } = {}) {
  const { product, variant, qty, total } = line;
  return `
    <div class="line-item">
      <a class="line-thumb" href="${productUrl(product, variant)}" style="--card-fill:${variant.fill};--zoom:${product.cardZoom * 1.15}">
        <img src="${variant.image}" alt="${productLabel(product)} na cor ${variant.name}" loading="lazy">
      </a>
      <div class="line-info">
        <div class="line-top">
          <div>
            <h3><a href="${productUrl(product, variant)}">${productLabel(product)}</a></h3>
            <p><span class="line-color" style="background:${variant.swatch}"></span>${variant.name}${compact ? '' : ` · ${moneyShort(variant.price)} cada`}</p>
          </div>
          <button class="line-remove" type="button" data-remove="${product.id}|${variant.id}" aria-label="Remover ${productLabel(product)} ${variant.name}">${ICONS.trash}</button>
        </div>
        <div class="line-bottom">
          <div class="qty ${compact ? 'qty-sm' : ''}">
            <button type="button" data-qty="${product.id}|${variant.id}|-1" aria-label="Diminuir quantidade">−</button>
            <span>${qty}</span>
            <button type="button" data-qty="${product.id}|${variant.id}|1" aria-label="Aumentar quantidade">+</button>
          </div>
          <span class="line-price">${money(total)}</span>
        </div>
      </div>
    </div>`;
}

function bindLineEvents(container) {
  $$('[data-qty]', container).forEach((b) => b.addEventListener('click', () => {
    const [pid, vid, delta] = b.dataset.qty.split('|');
    const item = getCart().find((i) => i.pid === pid && i.vid === vid);
    if (item) setQty(pid, vid, item.qty + Number(delta));
  }));
  $$('[data-remove]', container).forEach((b) => b.addEventListener('click', () => {
    const [pid, vid] = b.dataset.remove.split('|');
    setQty(pid, vid, 0);
  }));
}

function freeShippingHTML(subtotal) {
  const missing = STORE.freeShippingFrom - subtotal;
  const pct = Math.min(100, (subtotal / STORE.freeShippingFrom) * 100);
  const text = missing > 0
    ? `Faltam <strong>${money(missing)}</strong> para o frete padrão grátis`
    : 'Você ganhou <strong>frete padrão grátis</strong>!';
  return `<p class="free-ship">${text}</p><div class="free-ship-bar"><span style="width:${pct}%"></span></div>`;
}

function emptyStateHTML() {
  return `
    <div class="empty-state">
      <h3>seu carrinho está vazio</h3>
      <p>Escolha uma peça, uma cor e deixe a casa mais macia.</p>
      <a class="btn" href="index.html#colecao">Ver coleção</a>
    </div>`;
}

function renderDrawer() {
  const body = $('#drawerBody');
  const foot = $('#drawerFoot');
  if (!body) return;
  const lines = cartLines();
  if (!lines.length) {
    body.innerHTML = emptyStateHTML();
    foot.style.display = 'none';
    return;
  }
  const subtotal = cartSubtotal();
  const inst = installmentsFor(subtotal);
  body.innerHTML = lines.map((l) => lineItemHTML(l)).join('');
  foot.style.display = '';
  foot.innerHTML = `
    ${freeShippingHTML(subtotal)}
    <div class="totals-row total"><span>Subtotal</span><span>${money(subtotal)}</span></div>
    <p class="totals-note">em até ${inst.n}x de ${money(inst.value)} sem juros</p>
    <div class="drawer-actions">
      <a class="btn btn-lg btn-block" href="checkout.html">Finalizar compra</a>
      <a class="btn btn-light btn-block" href="carrinho.html">Ver carrinho, cupom e frete</a>
    </div>`;
  bindLineEvents(body);
}

function refreshCartUI() {
  const count = cartCount();
  const badge = $('#cartCount');
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
  }
  if (document.body.classList.contains('drawer-open')) renderDrawer();
  document.dispatchEvent(new CustomEvent('cart:change'));
}

function bumpBadge() {
  const badge = $('#cartCount');
  if (!badge) return;
  badge.classList.remove('bump');
  void badge.offsetWidth;
  badge.classList.add('bump');
}

let toastTimer;
function showToast(message, actionLabel, action) {
  const toast = $('#toast');
  if (!toast) return;
  toast.innerHTML = `<span>${message}</span>${actionLabel ? `<button type="button">${actionLabel}</button>` : ''}`;
  if (actionLabel) $('button', toast).addEventListener('click', () => { hideToast(); action(); });
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 3800);
}

function hideToast() {
  const toast = $('#toast');
  if (toast) toast.classList.remove('show');
}

/* ==========================================================================
   VITRINE (HERO) - mesma mecânica do hero "Suave Mobiliário"
   ========================================================================== */
function initShowcase({ product, startIndex = 0, title, subtitle, mode = 'product', onChange }) {
  const variants = product.variants;
  let currentVariantIndex = startIndex;

  const bgContainer = $('#heroBgContainer');
  const footerQuote = $('#footerQuote');
  const cardsContainer = $('#variantCardsContainer');
  const btnMore = $('#btnMorePositions');
  const buyBox = $('#heroBuy');

  $('#heroTitle').textContent = title;
  $('#heroSubtitle').textContent = subtitle;
  $('.hero-sidebar').setAttribute('aria-label', `Cores disponíveis de ${productLabel(product)}`);

  // Camadas de fundo, todas no DOM para crossfade instantâneo
  bgContainer.innerHTML = '';
  variants.forEach((variant, index) => {
    const layer = document.createElement('div');
    layer.className = `hero-bg-layer ${index === currentVariantIndex ? 'active' : ''}`;
    layer.style.backgroundImage = `url('${variant.image}')`;
    layer.style.setProperty('--mscale', `${product.mobileScale}%`);
    const frame = HERO_FRAMES[product.id]?.[variant.id] || {};
    layer.style.setProperty('--hero-image-scale', frame.scale || variant.heroScale || 1);
    layer.style.setProperty('--hero-position', frame.position || '50% 50%');
    layer.setAttribute('data-id', variant.id);
    bgContainer.appendChild(layer);
  });

  // A tela inicial dá um instante para a marca aparecer e revelar a vitrine
  // assim que a primeira imagem estiver pronta.
  if (mode === 'home') {
    const firstLayer = $('.hero-bg-layer.active', bgContainer);
    const heroHeader = $('#siteHeader');
    const heroBody = $('.hero-body');
    const loader = $('#siteLoader');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const image = new Image();
    image.src = variants[currentVariantIndex].image;
    const imageReady = image.decode ? image.decode().catch(() => {}) : new Promise((resolve) => {
      image.onload = image.onerror = resolve;
    });
    const minimumSplash = new Promise((resolve) => setTimeout(resolve, reducedMotion ? 0 : 1250));

    const imageReadyOrTimeout = Promise.race([
      imageReady,
      new Promise((resolve) => setTimeout(resolve, 1800))
    ]);

    Promise.all([imageReadyOrTimeout, minimumSplash]).then(() => {
      heroHeader.classList.add('hero-header-enter');
      heroBody.classList.add('hero-body-enter');
      firstLayer.classList.add('hero-intro-rise');
      document.body.classList.remove('home-loading');
      loader.classList.add('is-exiting');
      window.setTimeout(() => loader.remove(), 500);
    });
    firstLayer.addEventListener('animationend', () => firstLayer.classList.remove('hero-intro-rise'), { once: true });
    heroHeader.addEventListener('animationend', () => heroHeader.classList.remove('hero-header-enter'), { once: true });
    heroBody.addEventListener('animationend', () => heroBody.classList.remove('hero-body-enter'), { once: true });
  }

  function renderSidebarCards() {
    cardsContainer.innerHTML = '';
    variants
      .map((item, idx) => ({ ...item, originalIndex: idx }))
      .filter((item) => item.originalIndex !== currentVariantIndex)
      .forEach((variant) => {
        const card = document.createElement('button');
        card.className = 'variant-card';
        card.type = 'button';
        card.dataset.variantId = variant.id;
        card.setAttribute('aria-label', `Trocar para ${productLabel(product)} na cor ${variant.name}`);
        card.innerHTML = `
          <span class="card-price-pill">${moneyShort(variant.price)}</span>
          <span class="card-thumb-wrapper" aria-hidden="true">
            <img class="card-thumb-img" src="${variant.image}" alt="${productLabel(product)} na cor ${variant.name}" loading="eager" />
          </span>
          <span class="card-model-name">${variant.name}</span>`;
        cardsContainer.appendChild(card);
      });
  }

  cardsContainer.addEventListener('click', (event) => {
    const card = event.target.closest('.variant-card[data-variant-id]');
    if (!card || !cardsContainer.contains(card)) return;
    const index = variants.findIndex((variant) => variant.id === card.dataset.variantId);
    if (index !== -1) updateView(index);
  });

  function renderBuyBox(variant) {
    if (!buyBox) return;
    const inst = installmentsFor(variant.price);
    const actions = mode === 'home'
      ? `<a class="btn btn-sm" href="${productUrl(product, variant)}">Ver detalhes</a>
         <button class="btn btn-sm btn-light" type="button" data-add>Adicionar</button>`
      : `<button class="btn btn-sm" type="button" data-add>Adicionar</button>
         <button class="btn btn-sm btn-light" type="button" data-buy>Comprar agora</button>`;
    buyBox.innerHTML = `
      <span class="buy-eyebrow">${mode === 'home' ? 'Destaque da coleção' : product.category}</span>
      <strong class="buy-name">${productLabel(product)} <span>· ${variant.name}</span></strong>
      <div class="buy-price">${moneyShort(variant.price)}</div>
      <p class="buy-installments">ou ${inst.n}x de ${money(inst.value)} sem juros</p>
      <div class="buy-actions">${actions}</div>`;
    $('[data-add]', buyBox).addEventListener('click', () => addToCart(product.id, variant.id, 1));
    const buy = $('[data-buy]', buyBox);
    if (buy) buy.addEventListener('click', () => {
      addToCart(product.id, variant.id, 1, { silent: true });
      window.location.href = 'checkout.html';
    });
  }

  function updateView(index, animate = true) {
    currentVariantIndex = index;
    const current = variants[index];

    const layers = $$('.hero-bg-layer', bgContainer);
    const targetLayer = layers[index];
    const currentLayer = layers.find((layer) => layer.classList.contains('active'));
    const introLayer = $('.hero-intro-rise', bgContainer);
    if (introLayer && currentLayer !== targetLayer) {
      introLayer.classList.remove('hero-intro-rise');
    }
    layers.forEach((layer) => {
      if (layer === targetLayer || layer === currentLayer) return;
      layer.style.transition = 'none';
      layer.classList.remove('active');
      void layer.offsetWidth;
      layer.style.removeProperty('transition');
    });
    if (currentLayer && currentLayer !== targetLayer) currentLayer.classList.remove('active');
    if (targetLayer && targetLayer !== currentLayer) {
      targetLayer.style.transition = 'none';
      targetLayer.classList.remove('active');
      void targetLayer.offsetWidth;
      targetLayer.style.removeProperty('transition');
      targetLayer.classList.add('active');
    }
    renderSidebarCards();
    applyTheme(current.theme, current.fill);

    if (footerQuote) {
      if (animate) {
        footerQuote.classList.remove('fade-text-enter');
        void footerQuote.offsetWidth;
        footerQuote.classList.add('fade-text-enter');
      }
      footerQuote.innerHTML = `<p>${current.quote[0]}<br>${current.quote[1]}</p>`;
    }

    renderBuyBox(current);
    if (onChange) onChange(current, index);
  }

  btnMore.addEventListener('click', () => updateView((currentVariantIndex + 1) % variants.length));

  window.addEventListener('keydown', (e) => {
    const tag = (e.target.tagName || '').toLowerCase();
    if (['input', 'textarea', 'select'].includes(tag) || document.body.classList.contains('drawer-open')) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      updateView((currentVariantIndex + 1) % variants.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      updateView((currentVariantIndex - 1 + variants.length) % variants.length);
    }
  });

  updateView(currentVariantIndex, false);
  return { select: updateView, get index() { return currentVariantIndex; } };
}

/* ==========================================================================
   CARD DE PRODUTO (grade da coleção e relacionados)
   ========================================================================== */
function productCardHTML(product, delay = 0) {
  const v = product.variants[0];
  const minPrice = Math.min(...product.variants.map((x) => x.price));
  return `
    <article class="product-card" data-pid="${product.id}" style="animation-delay:${delay}ms">
      <a class="product-media" href="${productUrl(product, v)}" style="--card-fill:${v.fill};--zoom:${product.cardZoom};--word-color:${v.theme.titleText}">
        <img src="${v.image}" alt="${productLabel(product)} na cor ${v.name}" loading="lazy">
        <span class="product-word">${product.word}</span>
      </a>
      <div class="product-info">
        <div>
          <h3><a href="${productUrl(product, v)}">${productLabel(product)}</a></h3>
          <p data-color>${v.name} · ${product.variants.length} cores</p>
        </div>
        <span class="product-price"><small>a partir de</small>${moneyShort(minPrice)}</span>
      </div>
      <div class="product-foot">
        <div class="swatches" role="group" aria-label="Cores">
          ${product.variants.map((x, i) => `<button type="button" class="swatch ${i === 0 ? 'active' : ''}" style="--sw:${x.swatch}" data-vid="${x.id}" aria-label="Cor ${x.name}"></button>`).join('')}
        </div>
        <button class="quick-add" type="button" aria-label="Adicionar ${productLabel(product)} ao carrinho">${ICONS.plus}</button>
      </div>
    </article>`;
}

function bindProductCards(container) {
  $$('.product-card', container).forEach((card) => {
    const product = findProduct(card.dataset.pid);
    let selected = product.variants[0];
    const media = $('.product-media', card);
    const img = $('img', media);

    const select = (variant) => {
      selected = variant;
      media.style.setProperty('--card-fill', variant.fill);
      media.style.setProperty('--word-color', variant.theme.titleText);
      img.src = variant.image;
      img.alt = `${productLabel(product)} na cor ${variant.name}`;
      $('[data-color]', card).textContent = `${variant.name} · ${product.variants.length} cores`;
      const url = productUrl(product, variant);
      media.href = url;
      $('h3 a', card).href = url;
      $$('.swatch', card).forEach((s) => s.classList.toggle('active', s.dataset.vid === variant.id));
    };

    $$('.swatch', card).forEach((s) => {
      const variant = findVariant(product, s.dataset.vid);
      s.addEventListener('focus', () => select(variant));
      s.addEventListener('click', () => select(variant));
    });
    $('.quick-add', card).addEventListener('click', () => addToCart(product.id, selected.id, 1));
  });
}

/* ==========================================================================
   PÁGINA INICIAL
   ========================================================================== */
function initHome() {
  initShowcase({ product: PRODUCTS[0], title: 'decora', subtitle: 'móveis', mode: 'home' });

  const grid = $('#productGrid');
  const chips = $('#categoryChips');
  const roomCards = $('#roomCards');
  let filter = { type: 'cat', key: 'todos' };

  const renderGrid = () => {
    const list = PRODUCTS.filter((p) => {
      if (filter.type === 'room') return p.room === filter.key;
      return filter.key === 'todos' || p.categoryKey === filter.key;
    });
    grid.innerHTML = list.map((p, i) => productCardHTML(p, i * 50)).join('');
    bindProductCards(grid);
    $$('.chip', chips).forEach((c) => c.classList.toggle('active', filter.type === 'cat' && c.dataset.cat === filter.key));
    $$('.room-card', roomCards).forEach((c) => c.classList.toggle('active', filter.type === 'room' && c.dataset.room === filter.key));
  };

  chips.innerHTML = CATEGORIES
    .filter((c) => c.key === 'todos' || PRODUCTS.some((p) => p.categoryKey === c.key))
    .map((c) => `<button type="button" class="chip" data-cat="${c.key}">${c.label}</button>`)
    .join('');
  $$('.chip', chips).forEach((chip) => chip.addEventListener('click', () => {
    filter = { type: 'cat', key: chip.dataset.cat };
    renderGrid();
  }));

  // Compre por ambiente: cada card usa a primeira peça do ambiente como foto
  const roomCover = { sala: 'sofa-lumo', jantar: 'conjunto-roda', quarto: 'cama-nuvem' };
  roomCards.innerHTML = ROOMS.map((room) => {
    const product = findProduct(roomCover[room.key]) || PRODUCTS.find((p) => p.room === room.key);
    const v = product.variants[0];
    const count = PRODUCTS.filter((p) => p.room === room.key).length;
    return `
      <button type="button" class="room-card" data-room="${room.key}" style="--card-fill:${v.fill};--zoom:${product.cardZoom};--word-color:${v.theme.navText}">
        <img src="${v.image}" alt="" loading="lazy">
        <span class="room-label">${room.label.toLowerCase()}</span>
        <span class="room-count">${count} peças</span>
      </button>`;
  }).join('');
  $$('.room-card', roomCards).forEach((card) => card.addEventListener('click', () => {
    const same = filter.type === 'room' && filter.key === card.dataset.room;
    filter = same ? { type: 'cat', key: 'todos' } : { type: 'room', key: card.dataset.room };
    renderGrid();
    if (!same) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  renderGrid();

  const news = $('#newsletterForm');
  news.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('input', news);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      email.classList.add('invalid');
      email.focus();
      return;
    }
    email.classList.remove('invalid');
    email.value = '';
    showToast('Pronto! Seu cupom DECORA10 foi enviado (simulação).');
  });
}

/* ==========================================================================
   PÁGINA DE PRODUTO
   ========================================================================== */
function initProductReviews(product) {
  const root = $('#productReviews');
  if (!root) return;

  const storageKey = `decora_reviews_${product.id}`;
  const readReviews = () => {
    const reviews = load(storageKey, []);
    return Array.isArray(reviews) ? reviews.filter((review) =>
      review && typeof review.name === 'string' && typeof review.comment === 'string' &&
      Number.isInteger(review.rating) && review.rating >= 1 && review.rating <= 5
    ) : [];
  };

  root.innerHTML = `
    <div class="reviews-heading">
      <div>
        <span class="eyebrow">Quem já escolheu</span>
        <h2 class="display-title" id="reviewsTitle">avaliações</h2>
      </div>
      <div class="reviews-summary" id="reviewsSummary" aria-live="polite"></div>
    </div>
    <div class="reviews-layout">
      <div class="reviews-list" id="reviewsList" aria-live="polite"></div>
      <form class="review-form" id="reviewForm">
        <span class="review-form-kicker">Sua experiência</span>
        <h3>Conte o que achou</h3>
        <label class="field">
          <span>Seu nome</span>
          <input class="input" name="name" type="text" maxlength="50" autocomplete="name" placeholder="Como podemos chamar você?" required>
        </label>
        <fieldset class="rating-field">
          <legend>Sua nota</legend>
          <div class="rating-picker" role="radiogroup" aria-label="Escolha uma nota de 1 a 5 estrelas">
            ${[5, 4, 3, 2, 1].map((rating) => `<label class="rating-option"><input type="radio" name="rating" value="${rating}" required><span aria-hidden="true">★</span><span class="sr-only">${rating} ${rating === 1 ? 'estrela' : 'estrelas'}</span></label>`).join('')}
          </div>
        </fieldset>
        <label class="field">
          <span>Seu comentário</span>
          <textarea class="input review-comment-input" name="comment" maxlength="600" rows="4" placeholder="O que mais gostou neste móvel?" required></textarea>
        </label>
        <button class="btn btn-lg" type="submit">Enviar avaliação</button>
        <p class="review-local-note">Sua avaliação fica salva neste navegador.</p>
      </form>
    </div>`;

  const summary = $('#reviewsSummary', root);
  const list = $('#reviewsList', root);
  const productReviewLink = $('#productReviewLink');
  const render = () => {
    const reviews = readReviews();
    const average = reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
    if (productReviewLink) {
      productReviewLink.textContent = reviews.length
        ? `★ ${average.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} · ${reviews.length} ${reviews.length === 1 ? 'avaliação' : 'avaliações'} · ver comentários`
        : '☆ Seja a primeira pessoa a avaliar';
    }
    summary.innerHTML = reviews.length
      ? `<strong>${average.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</strong><span class="review-stars" aria-label="${average.toFixed(1)} de 5 estrelas">${'★'.repeat(Math.round(average))}${'☆'.repeat(5 - Math.round(average))}</span><span>${reviews.length} ${reviews.length === 1 ? 'avaliação' : 'avaliações'}</span>`
      : '<span>Seja a primeira pessoa a avaliar</span>';

    list.replaceChildren();
    if (!reviews.length) {
      const empty = document.createElement('div');
      empty.className = 'reviews-empty';
      empty.innerHTML = '<span class="reviews-empty-star" aria-hidden="true">☆</span><h3>Esse espaço é seu</h3><p>Conte como o móvel ficou na sua casa e ajude outras pessoas a escolher.</p>';
      list.appendChild(empty);
      return;
    }

    reviews.slice().reverse().forEach((review) => {
      const card = document.createElement('article');
      card.className = 'review-card';
      const top = document.createElement('div');
      top.className = 'review-card-top';
      const author = document.createElement('strong');
      author.className = 'review-author';
      author.textContent = review.name;
      const date = document.createElement('time');
      date.className = 'review-date';
      const createdAt = new Date(review.createdAt);
      date.dateTime = Number.isNaN(createdAt.getTime()) ? '' : createdAt.toISOString();
      date.textContent = Number.isNaN(createdAt.getTime()) ? '' : createdAt.toLocaleDateString('pt-BR');
      top.append(author, date);
      const stars = document.createElement('div');
      stars.className = 'review-stars';
      stars.setAttribute('aria-label', `${review.rating} de 5 estrelas`);
      stars.textContent = `${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}`;
      const comment = document.createElement('p');
      comment.className = 'review-card-comment';
      comment.textContent = review.comment;
      card.append(top, stars, comment);
      list.appendChild(card);
    });
  };

  $('#reviewForm', root).addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const review = {
      name: String(data.get('name')).trim(),
      rating: Number(data.get('rating')),
      comment: String(data.get('comment')).trim(),
      createdAt: new Date().toISOString()
    };
    if (!review.name || !review.comment || review.rating < 1 || review.rating > 5) return;
    const reviews = readReviews();
    reviews.push(review);
    save(storageKey, reviews);
    form.reset();
    render();
    showToast('Obrigado por compartilhar sua avaliação!');
  });

  render();
}

function initProduct() {
  const params = new URLSearchParams(window.location.search);
  const product = findProduct(params.get('p')) || PRODUCTS[0];
  const startIndex = Math.max(0, product.variants.findIndex((v) => v.id === params.get('c')));
  let qty = 1;
  let current = product.variants[startIndex];

  document.title = `${productLabel(product)} | Decora Móveis`;

  const details = $('#productDetails');
  details.innerHTML = `
    <div class="selectable">
      <nav class="breadcrumb" aria-label="Você está em">
        <a href="index.html">Início</a><span>/</span><a href="index.html#colecao">Coleção</a><span>/</span><span>${productLabel(product)}</span>
      </nav>
      <h2 class="product-title">${productLabel(product).toLowerCase()}</h2>
      <p class="product-tagline">${product.tagline}</p>
      <a class="product-reviews-link" id="productReviewLink" href="#reviewsTitle"></a>
      <p class="product-desc">${product.description}</p>
      <dl class="specs">
        ${Object.entries(product.specs).map(([k, v]) => `<div class="specs-row"><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
      </dl>
      <div class="accordion">
        <details open>
          <summary>Entrega${product.assembly ? ' e montagem' : ''}</summary>
          <p>Enviamos para todo o Brasil com transportadora especializada em móveis. Compras acima de ${moneyShort(STORE.freeShippingFrom)} têm frete padrão grátis.${product.assembly ? ` Esta peça pode ser entregue montada por ${moneyShort(STORE.assemblyPrice)} por unidade — escolha no carrinho.` : ' Esta peça chega pronta para usar.'}</p>
        </details>
        <details>
          <summary>Garantia</summary>
          <p>2 anos de garantia contra defeitos de fabricação na estrutura e 1 ano no revestimento. Você tem 30 dias para trocar ou devolver sem custo.</p>
        </details>
        <details>
          <summary>Cuidados</summary>
          <p>Aspire semanalmente com bocal macio. Manchas: pano úmido com sabão neutro, sem esfregar. Evite sol direto prolongado para preservar a cor.</p>
        </details>
      </div>
    </div>
    <aside class="buy-panel" aria-label="Comprar ${productLabel(product)}">
      <div class="panel-label"><span>Cor</span><strong id="panelColor"></strong></div>
      <div class="swatches" id="panelSwatches">
        ${product.variants.map((v, i) => `<button type="button" class="swatch swatch-lg" style="--sw:${v.swatch}" data-index="${i}" aria-label="Cor ${v.name}"></button>`).join('')}
      </div>
      <div class="panel-price" id="panelPrice"></div>
      <p class="panel-sub" id="panelSub"></p>
      <div class="panel-actions">
        <div class="qty" aria-label="Quantidade">
          <button type="button" id="qtyMinus" aria-label="Diminuir quantidade">−</button>
          <span id="qtyValue">1</span>
          <button type="button" id="qtyPlus" aria-label="Aumentar quantidade">+</button>
        </div>
        <button class="btn btn-lg" type="button" id="panelAdd">Adicionar ao carrinho</button>
        <button class="btn btn-lg btn-light btn-buy-now" type="button" id="panelBuy">Comprar agora</button>
      </div>
      <div class="divider"></div>
      <form class="field" id="cepForm" novalidate>
        <label for="cepInput">Calcule o prazo de entrega</label>
        <div class="inline-form">
          <input class="input" id="cepInput" inputmode="numeric" placeholder="00000-000" maxlength="9" autocomplete="postal-code">
          <button class="btn" type="submit">Calcular</button>
        </div>
        <span class="field-error" id="cepError"></span>
      </form>
      <div class="shipping-quote" id="shippingQuote"></div>
      <div class="trust">
        <div>${ICONS.truck}Entrega para todo o Brasil</div>
        <div>${ICONS.refresh}30 dias para trocar</div>
        <div>${ICONS.shield}2 anos de garantia</div>
      </div>
    </aside>`;

  initProductReviews(product);

  const renderPanel = () => {
    const inst = installmentsFor(current.price * qty);
    $('#panelColor').textContent = current.name;
    $('#panelPrice').textContent = moneyShort(current.price * qty);
    $('#panelSub').innerHTML = `em até <strong>${inst.n}x de ${money(inst.value)}</strong> sem juros<br>ou <strong>${money(current.price * qty * (1 - STORE.pixDiscount / 100))}</strong> no Pix (${STORE.pixDiscount}% off)`;
    $('#qtyValue').textContent = qty;
    $$('#panelSwatches .swatch').forEach((s) => s.classList.toggle('active', product.variants[s.dataset.index] === current));
    if (onlyDigits($('#cepInput').value).length === 8) renderQuote();
  };

  const renderQuote = () => {
    const quote = quoteShipping($('#cepInput').value, current.price * qty, qty);
    if (!quote) return;
    $('#shippingQuote').innerHTML = quote.options.map((o) => `
      <div class="ship-row">
        <div><strong>${o.label}</strong><span>${o.id === 'retirada' ? 'disponível a partir de' : 'chega até'} ${o.dateText}</span></div>
        <b>${o.price ? money(o.price) : 'Grátis'}</b>
      </div>`).join('') + `<p class="hint">Região: ${quote.region}</p>`;
  };

  const showcase = initShowcase({
    product,
    startIndex,
    title: product.word,
    subtitle: product.category.toLowerCase(),
    mode: 'product',
    onChange: (variant) => {
      current = variant;
      history.replaceState(null, '', productUrl(product, variant));
      if ($('#panelColor')) renderPanel();
    }
  });

  $$('#panelSwatches .swatch').forEach((s) => s.addEventListener('click', () => showcase.select(Number(s.dataset.index))));
  $('#qtyMinus').addEventListener('click', () => { qty = Math.max(1, qty - 1); renderPanel(); });
  $('#qtyPlus').addEventListener('click', () => { qty = Math.min(10, qty + 1); renderPanel(); });
  $('#panelAdd').addEventListener('click', () => addToCart(product.id, current.id, qty));
  $('#panelBuy').addEventListener('click', () => {
    addToCart(product.id, current.id, qty, { silent: true });
    window.location.href = 'checkout.html';
  });

  const cepInput = $('#cepInput');
  cepInput.value = getState().cep || '';
  maskInput(cepInput, maskCep);
  $('#cepForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (onlyDigits(cepInput.value).length !== 8) {
      $('#cepError').textContent = 'Digite um CEP com 8 números.';
      cepInput.classList.add('invalid');
      return;
    }
    $('#cepError').textContent = '';
    cepInput.classList.remove('invalid');
    setState({ cep: cepInput.value });
    renderQuote();
  });

  renderPanel();

  // Sugere primeiro peças do mesmo ambiente (ex.: cama → cabeceira, cômoda, guarda-roupa)
  const others = PRODUCTS.filter((p) => p.id !== product.id);
  const related = [...others.filter((p) => p.room === product.room), ...others.filter((p) => p.room !== product.room)].slice(0, 3);
  const relatedGrid = $('#relatedGrid');
  relatedGrid.innerHTML = related.map((p, i) => productCardHTML(p, i * 60)).join('');
  bindProductCards(relatedGrid);
}

/* ==========================================================================
   MÁSCARAS DE CAMPO
   ========================================================================== */
const maskCep = (v) => onlyDigits(v).slice(0, 8).replace(/^(\d{5})(\d)/, '$1-$2');
const maskPhone = (v) => {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};
const maskCard = (v) => onlyDigits(v).slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
const maskExpiry = (v) => onlyDigits(v).slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2');
const maskCvv = (v) => onlyDigits(v).slice(0, 4);

function maskInput(input, fn) {
  input.addEventListener('input', () => { input.value = fn(input.value); });
}

/* ==========================================================================
   RESUMO DE VALORES (carrinho e checkout)
   ========================================================================== */
function totalsHTML(t, { showShipping = true, payment } = {}) {
  const inst = installmentsFor(t.base);
  let shipText = 'Calcule com seu CEP';
  if (t.ship) shipText = t.ship.price ? money(t.ship.price) : 'Grátis';
  return `
    <div class="totals-row"><span>Subtotal (${t.units} ${t.units === 1 ? 'item' : 'itens'})</span><span>${money(t.subtotal)}</span></div>
    ${t.discount ? `<div class="totals-row discount"><span>Cupom ${t.state.coupon}</span><span>− ${money(t.discount)}</span></div>` : ''}
    ${showShipping ? `<div class="totals-row"><span>Frete${t.ship ? ` · ${t.ship.label.replace('Entrega ', '')}` : ''}</span><span>${shipText}</span></div>` : ''}
    ${t.assembly ? `<div class="totals-row"><span>Montagem (${t.assemblyUnits} ${t.assemblyUnits === 1 ? 'peça' : 'peças'})</span><span>${money(t.assembly)}</span></div>` : ''}
    ${t.pixDiscount ? `<div class="totals-row discount"><span>Desconto Pix (${STORE.pixDiscount}%)</span><span>− ${money(t.pixDiscount)}</span></div>` : ''}
    <div class="totals-row total"><span>Total</span><span>${money(t.total)}</span></div>
    ${payment === 'pix' ? '<p class="totals-note">à vista no Pix</p>' : `<p class="totals-note">em até ${inst.n}x de ${money(inst.value)} sem juros${payment ? '' : ` · ou ${money(t.base * (1 - STORE.pixDiscount / 100))} no Pix`}</p>`}`;
}

function shippingOptionsHTML(t, name = 'ship') {
  if (!t.quote) return '';
  return `<div class="option-list">${t.quote.options.map((o) => `
    <label class="option ${t.ship && t.ship.id === o.id ? 'selected' : ''}">
      <input type="radio" name="${name}" value="${o.id}" ${t.ship && t.ship.id === o.id ? 'checked' : ''}>
      <span class="opt-main"><strong>${o.label}</strong><span>${o.note ? o.note + ' · ' : ''}${o.id === 'retirada' ? 'disponível a partir de' : 'chega até'} ${o.dateText}</span></span>
      <span class="opt-price">${o.price ? money(o.price) : 'Grátis'}</span>
    </label>`).join('')}</div>`;
}

function couponBlockHTML(t) {
  if (t.state.coupon && t.coupon.valid) {
    return `<div class="applied-tag"><span>${t.state.coupon} · ${t.coupon.label}</span><button class="btn-text" type="button" id="couponRemove">remover</button></div>`;
  }
  return `
    <form class="inline-form" id="couponForm" novalidate>
      <input class="input" id="couponInput" placeholder="Código do cupom" autocomplete="off" style="text-transform:uppercase">
      <button class="btn" type="submit">Aplicar</button>
    </form>
    <span class="field-error" id="couponError">${t.state.coupon && t.coupon.reason ? t.coupon.reason : ''}</span>
    <p class="hint">Cupons de demonstração: <code data-coupon="DECORA10">DECORA10</code> <code data-coupon="BEMVINDO">BEMVINDO</code> <code data-coupon="FRETEGRATIS">FRETEGRATIS</code></p>`;
}

function bindCouponBlock(root, rerender) {
  const form = $('#couponForm', root);
  if (form) {
    const input = $('#couponInput', form);
    const apply = (code) => {
      code = code.trim().toUpperCase();
      const info = couponInfo(code, cartSubtotal());
      if (!COUPONS[code]) {
        $('#couponError', root).textContent = 'Cupom inválido ou expirado.';
        input.classList.add('invalid');
        return;
      }
      if (!info.valid) {
        $('#couponError', root).textContent = info.reason;
        return;
      }
      setState({ coupon: code });
      showToast(`Cupom ${code} aplicado: ${info.label}`);
      rerender();
    };
    form.addEventListener('submit', (e) => { e.preventDefault(); apply(input.value); });
    $$('[data-coupon]', root).forEach((c) => c.addEventListener('click', () => apply(c.dataset.coupon)));
  }
  const remove = $('#couponRemove', root);
  if (remove) remove.addEventListener('click', () => { setState({ coupon: null }); rerender(); });
}

function assemblyHTML(t) {
  if (!t.assemblyUnits) return '';
  return `
    <label class="check" style="margin-top:16px">
      <input type="checkbox" id="assemblyCheck" ${t.state.assembly ? 'checked' : ''}>
      <span>Quero receber montado <strong>(+ ${money(t.assemblyUnits * STORE.assemblyPrice)})</strong>
      <small>Montagem profissional no dia da entrega · ${moneyShort(STORE.assemblyPrice)} por peça elegível</small></span>
    </label>`;
}

/* ==========================================================================
   PÁGINA DO CARRINHO
   ========================================================================== */
function initCart() {
  const root = $('#cartRoot');

  const render = () => {
    const t = computeTotals();
    if (!t.lines.length) {
      root.innerHTML = `<div class="panel">${emptyStateHTML()}</div>`;
      $('#cartTitleCount').textContent = '';
      return;
    }
    $('#cartTitleCount').textContent = `${t.units} ${t.units === 1 ? 'item' : 'itens'}`;
    root.innerHTML = `
      <div class="layout-2col">
        <div>
          <div class="cart-list" id="cartList">${t.lines.map((l) => lineItemHTML(l, { compact: false })).join('')}</div>
          <a class="btn btn-light" href="index.html#colecao">← Continuar comprando</a>
        </div>
        <div class="sticky">
          <div class="panel">
            <h2>Cupom de desconto</h2>
            ${couponBlockHTML(t)}
          </div>
          <div class="panel">
            <h2>Entrega</h2>
            <form class="inline-form" id="cartCepForm" novalidate>
              <input class="input" id="cartCep" inputmode="numeric" placeholder="Seu CEP" maxlength="9" value="${t.state.cep || ''}" autocomplete="postal-code">
              <button class="btn" type="submit">Calcular</button>
            </form>
            <span class="field-error" id="cartCepError"></span>
            ${t.quote ? `<p class="hint">Entrega para: ${t.quote.region}</p>` : ''}
            ${shippingOptionsHTML(t)}
            ${assemblyHTML(t)}
          </div>
          <div class="panel">
            ${freeShippingHTML(t.subtotal - t.discount)}
            ${totalsHTML(t)}
            <div class="drawer-actions">
              <a class="btn btn-lg btn-block" href="checkout.html">Finalizar compra</a>
            </div>
          </div>
        </div>
      </div>`;

    bindLineEvents($('#cartList'));
    bindCouponBlock(root, render);

    const cep = $('#cartCep');
    maskInput(cep, maskCep);
    $('#cartCepForm').addEventListener('submit', (e) => {
      e.preventDefault();
      if (onlyDigits(cep.value).length !== 8) {
        $('#cartCepError').textContent = 'Digite um CEP com 8 números.';
        cep.classList.add('invalid');
        return;
      }
      setState({ cep: cep.value });
      render();
    });
    $$('input[name="ship"]', root).forEach((r) => r.addEventListener('change', () => { setState({ ship: r.value }); render(); }));
    const asm = $('#assemblyCheck');
    if (asm) asm.addEventListener('change', () => { setState({ assembly: asm.checked }); render(); });
  };

  document.addEventListener('cart:change', render);
  render();
}

/* ==========================================================================
   CHECKOUT
   ========================================================================== */
function initCheckout() {
  const root = $('#checkoutRoot');
  const summary = $('#checkoutSummary');
  let step = 1;
  let payment = 'pix';
  const customer = load('decora_customer', {});

  if (!cartLines().length) {
    $('#checkoutLayout').innerHTML = `<div class="panel">${emptyStateHTML()}</div>`;
    return;
  }

  const renderSummary = () => {
    const t = computeTotals(payment);
    summary.innerHTML = `
      <div class="panel">
        <h2>Resumo do pedido</h2>
        <div class="summary-items">
          ${t.lines.map((l) => `
            <div class="summary-item">
              <div class="line-thumb" style="--card-fill:${l.variant.fill};--zoom:${l.product.cardZoom * 1.2}">
                <span class="thumb-clip"><img src="${l.variant.image}" alt=""></span>
                <span class="qty-badge">${l.qty}</span>
              </div>
              <div><strong>${productLabel(l.product)}</strong><span>${l.variant.name}</span></div>
              <b>${money(l.total)}</b>
            </div>`).join('')}
        </div>
        ${totalsHTML(t, { payment })}
        <p class="hint" style="text-align:center;margin-top:14px"><a href="carrinho.html">Editar carrinho ou cupom</a></p>
      </div>`;
  };

  const goTo = (n) => {
    step = n;
    $$('.checkout-step', root).forEach((s) => s.classList.toggle('active', Number(s.dataset.step) === n));
    $$('.step-pill').forEach((p) => {
      const k = Number(p.dataset.step);
      p.classList.toggle('active', k === n);
      p.classList.toggle('done', k < n);
    });
    if (n === 2) renderShipping();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Preenche dados salvos
  Object.entries(customer).forEach(([k, v]) => {
    const el = $(`[name="${k}"]`, root);
    if (el) el.value = v;
  });
  if (!$('[name="cep"]', root).value && getState().cep) $('[name="cep"]', root).value = getState().cep;

  maskInput($('[name="phone"]', root), maskPhone);
  maskInput($('[name="cep"]', root), maskCep);
  maskInput($('[name="cardNumber"]', root), maskCard);
  maskInput($('[name="cardExpiry"]', root), maskExpiry);
  maskInput($('[name="cardCvv"]', root), maskCvv);

  const rules = {
    name: (v) => v.trim().split(/\s+/).length >= 2 || 'Informe nome e sobrenome.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'E-mail inválido.',
    phone: (v) => onlyDigits(v).length >= 10 || 'Telefone com DDD.',
    cep: (v) => onlyDigits(v).length === 8 || 'CEP com 8 números.',
    street: (v) => v.trim().length > 2 || 'Informe a rua.',
    number: (v) => v.trim().length > 0 || 'Nº obrigatório.',
    district: (v) => v.trim().length > 1 || 'Informe o bairro.',
    city: (v) => v.trim().length > 1 || 'Informe a cidade.',
    uf: (v) => /^[A-Za-z]{2}$/.test(v.trim()) || 'UF com 2 letras.',
    cardNumber: (v) => onlyDigits(v).length >= 13 || 'Número incompleto.',
    cardName: (v) => v.trim().length > 3 || 'Nome como no cartão.',
    cardExpiry: (v) => {
      const m = v.match(/^(\d{2})\/(\d{2})$/);
      if (!m || +m[1] < 1 || +m[1] > 12) return 'Use MM/AA.';
      const exp = new Date(2000 + +m[2], +m[1], 0);
      return exp >= new Date() || 'Cartão vencido.';
    },
    cardCvv: (v) => onlyDigits(v).length >= 3 || 'CVV inválido.'
  };

  const validate = (names) => {
    let ok = true;
    let first = null;
    names.forEach((name) => {
      const el = $(`[name="${name}"]`, root);
      const res = rules[name](el.value);
      const err = el.closest('.field').querySelector('.field-error');
      if (res !== true) {
        ok = false;
        el.classList.add('invalid');
        if (err) err.textContent = res;
        if (!first) first = el;
      } else {
        el.classList.remove('invalid');
        if (err) err.textContent = '';
      }
    });
    if (first) first.focus();
    return ok;
  };

  const persistCustomer = () => {
    const data = {};
    ['name', 'email', 'phone', 'cep', 'street', 'number', 'complement', 'district', 'city', 'uf'].forEach((k) => {
      data[k] = $(`[name="${k}"]`, root).value;
    });
    save('decora_customer', data);
  };

  // Etapa 2: frete e montagem
  const renderShipping = () => {
    const t = computeTotals(payment);
    const box = $('#shipOptions');
    box.innerHTML = t.quote
      ? `${shippingOptionsHTML(t, 'checkoutShip')}${assemblyHTML(t)}`
      : '<p class="hint">Preencha o CEP para ver as opções de entrega.</p>';
    $$('input[name="checkoutShip"]', box).forEach((r) => r.addEventListener('change', () => { setState({ ship: r.value }); renderShipping(); }));
    const asm = $('#assemblyCheck', box);
    if (asm) asm.addEventListener('change', () => { setState({ assembly: asm.checked }); renderShipping(); });
    renderSummary();
  };

  // ViaCEP: preenche endereço automaticamente (com fallback silencioso)
  const cepField = $('[name="cep"]', root);
  const lookupCep = async () => {
    const digits = onlyDigits(cepField.value);
    if (digits.length !== 8) return;
    setState({ cep: cepField.value });
    renderShipping();
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 4000);
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`, { signal: ctrl.signal });
      clearTimeout(timer);
      const data = await res.json();
      if (data.erro) return;
      const fill = { street: data.logradouro, district: data.bairro, city: data.localidade, uf: data.uf };
      Object.entries(fill).forEach(([k, v]) => {
        const el = $(`[name="${k}"]`, root);
        if (v && !el.value) el.value = v;
      });
      $('[name="number"]', root).focus();
    } catch (e) { /* sem internet: o cliente preenche manualmente */ }
  };
  cepField.addEventListener('input', () => { if (onlyDigits(cepField.value).length === 8) lookupCep(); });
  if (onlyDigits(cepField.value).length === 8 && !$('[name="street"]', root).value) lookupCep();
  // Guarda o endereço conforme o cliente digita
  $$('.input', root).forEach((el) => el.addEventListener('change', persistCustomer));

  $('#toStep2').addEventListener('click', () => {
    if (validate(['name', 'email', 'phone'])) { persistCustomer(); goTo(2); }
  });
  $('#backTo1').addEventListener('click', () => goTo(1));
  $('#toStep3').addEventListener('click', () => {
    if (!validate(['cep', 'street', 'number', 'district', 'city', 'uf'])) return;
    persistCustomer();
    goTo(3);
    renderSummary();
  });
  $('#backTo2').addEventListener('click', () => goTo(2));

  // Etapa 3: pagamento
  $$('.pay-tab', root).forEach((tab) => tab.addEventListener('click', () => {
    payment = tab.dataset.pay;
    $$('.pay-tab', root).forEach((t) => t.classList.toggle('active', t === tab));
    $$('.pay-panel', root).forEach((p) => p.classList.toggle('active', p.dataset.pay === payment));
    renderInstallments();
    renderSummary();
  }));

  const renderInstallments = () => {
    const t = computeTotals('card');
    const max = installmentsFor(t.base).n;
    const sel = $('[name="installments"]', root);
    sel.innerHTML = Array.from({ length: max }, (_, i) => i + 1)
      .map((n) => `<option value="${n}">${n}x de ${money(t.base / n)} sem juros</option>`).join('');
  };
  renderInstallments();

  $('#placeOrder').addEventListener('click', () => {
    // Revalida as etapas anteriores (ex.: página recarregada no meio do checkout)
    const step1 = ['name', 'email', 'phone'];
    const step2 = ['cep', 'street', 'number', 'district', 'city', 'uf'];
    if (!step1.every((n) => rules[n]($(`[name="${n}"]`, root).value) === true)) { goTo(1); validate(step1); return; }
    if (!step2.every((n) => rules[n]($(`[name="${n}"]`, root).value) === true)) { goTo(2); validate(step2); return; }
    if (payment === 'card' && !validate(['cardNumber', 'cardName', 'cardExpiry', 'cardCvv'])) return;
    const t = computeTotals(payment);
    const get = (k) => $(`[name="${k}"]`, root).value.trim();
    const order = {
      number: 'DM-' + String(Math.floor(100000 + Math.random() * 900000)),
      createdAt: new Date().toISOString(),
      lines: t.lines.map((l) => ({ pid: l.product.id, vid: l.variant.id, qty: l.qty, total: l.total })),
      totals: { subtotal: t.subtotal, discount: t.discount, coupon: t.coupon.valid ? t.state.coupon : null, shipping: t.ship ? t.ship.price : 0, assembly: t.assembly, pixDiscount: t.pixDiscount, total: t.total },
      shipping: t.ship ? { label: t.ship.label, id: t.ship.id, date: t.ship.date, dateText: t.ship.dateText, note: t.ship.note || '' } : null,
      customer: { name: get('name'), email: get('email'), phone: get('phone') },
      address: { street: get('street'), number: get('number'), complement: get('complement'), district: get('district'), city: get('city'), uf: get('uf').toUpperCase(), cep: get('cep') },
      payment: {
        method: payment,
        installments: payment === 'card' ? Number(get('installments')) : 1,
        last4: payment === 'card' ? onlyDigits(get('cardNumber')).slice(-4) : null
      }
    };
    $('#processing').classList.add('show');
    setTimeout(() => {
      save(ORDER_KEY, order);
      save(CART_KEY, []);
      setState({ coupon: null, assembly: false });
      window.location.href = 'pedido.html';
    }, 1800);
  });

  goTo(1);
  renderSummary();
  document.addEventListener('cart:change', renderSummary);
}

/* ==========================================================================
   PEDIDO CONFIRMADO
   ========================================================================== */
function fakeQrSVG(seed) {
  // Padrão visual de QR apenas ilustrativo (não é um Pix real)
  let s = 0;
  for (const ch of seed) s = (s * 31 + ch.charCodeAt(0)) >>> 0;
  const rand = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  const n = 25;
  let cells = '';
  const finder = (x, y) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (finder(x, y)) continue;
      if (rand() > 0.52) cells += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    }
  }
  const eye = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7" rx="1.5"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" rx="1" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3" rx=".6"/>`;
  return `<svg viewBox="0 0 ${n} ${n}" fill="currentColor" shape-rendering="crispEdges" role="img" aria-label="QR Code ilustrativo">${cells}${eye(0, 0)}${eye(n - 7, 0)}${eye(0, n - 7)}</svg>`;
}

function initOrder() {
  const root = $('#orderRoot');
  const order = load(ORDER_KEY, null);
  if (!order) {
    root.innerHTML = `<div class="panel">${emptyStateHTML()}</div>`;
    return;
  }

  const lines = order.lines.map((l) => {
    const product = findProduct(l.pid);
    return { product, variant: findVariant(product, l.vid), qty: l.qty, total: l.total };
  }).filter((l) => l.product && l.variant);

  if (lines[0]) applyTheme(lines[0].variant.theme, lines[0].variant.fill);

  const first = order.customer.name.split(' ')[0];
  const created = new Date(order.createdAt);
  const deliveryDate = order.shipping ? new Date(order.shipping.date) : null;
  const pay = order.payment;
  const payText = pay.method === 'pix' ? 'Pix à vista' : pay.method === 'card' ? `Cartão final ${pay.last4} · ${pay.installments}x de ${money(order.totals.total / pay.installments)}` : 'Boleto bancário';
  const pixCode = `00020126580014BR.GOV.BCB.PIX0136decora-demo-${order.number.toLowerCase()}5204000053039865406${order.totals.total.toFixed(2)}5802BR5913DECORA MOVEIS6009SAO PAULO`;

  let payBlock = '';
  if (pay.method === 'pix') {
    payBlock = `
      <div class="panel">
        <h2>Pague com Pix</h2>
        <div class="pix-box">
          <div class="pix-qr">${fakeQrSVG(order.number)}</div>
          <div>
            <p style="font-size:14px;line-height:1.6">Escaneie o QR Code ou copie o código abaixo. O pagamento é aprovado na hora.</p>
            <div class="pix-code selectable" id="pixCode">${pixCode}</div>
            <button class="btn btn-sm" type="button" id="copyPix">Copiar código Pix</button>
            <p class="hint">Código ilustrativo — este é um projeto demonstrativo e nenhuma cobrança é gerada.</p>
          </div>
        </div>
      </div>`;
  } else if (pay.method === 'boleto') {
    payBlock = `
      <div class="panel">
        <h2>Boleto bancário</h2>
        <div class="pix-code selectable">34191.79001 01043.510047 91020.150008 7 ${String(Math.round(order.totals.total * 100)).padStart(10, '0')}</div>
        <p class="hint">Vence em 3 dias úteis. Boleto ilustrativo — nenhuma cobrança é gerada.</p>
      </div>`;
  }

  root.innerHTML = `
    <section class="success-hero">
      <div class="success-badge">${ICONS.check}</div>
      <h1 class="page-title">pedido confirmado!</h1>
      <p>Obrigado, <strong>${first}</strong>. Seu pedido <strong>${order.number}</strong> foi recebido em ${created.toLocaleDateString('pt-BR')}.<br>
      ${deliveryDate ? `Previsão de ${order.shipping.id === 'retirada' ? 'retirada' : 'entrega'}: <strong>${fmtDate(deliveryDate)}</strong>` : ''}</p>
    </section>

    <div class="layout-2col">
      <div>
        <div class="panel">
          <h2>Acompanhe seu pedido</h2>
          <div class="timeline">
            <div class="tl-step done"><div class="tl-dot">${ICONS.check}</div><strong>Confirmado</strong><span>${created.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}</span></div>
            <div class="tl-step"><div class="tl-dot"></div><strong>Em produção</strong><span>até 2 dias</span></div>
            <div class="tl-step"><div class="tl-dot"></div><strong>${order.shipping && order.shipping.id === 'retirada' ? 'Pronto' : 'Enviado'}</strong><span>${order.shipping && order.shipping.id === 'retirada' ? 'no showroom' : 'transportadora'}</span></div>
            <div class="tl-step"><div class="tl-dot"></div><strong>${order.shipping && order.shipping.id === 'retirada' ? 'Retirado' : 'Entregue'}</strong><span>${deliveryDate ? deliveryDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }) : '—'}</span></div>
          </div>
        </div>
        ${payBlock}
        <div class="panel">
          <div class="info-grid">
            <div><h3>Entrega</h3><p>${order.shipping && order.shipping.id === 'retirada' ? `Retirada no showroom<br>${order.shipping.note}` : `${order.address.street}, ${order.address.number}${order.address.complement ? ' · ' + order.address.complement : ''}<br>${order.address.district} · ${order.address.city}/${order.address.uf}<br>CEP ${order.address.cep}`}</p></div>
            <div><h3>Pagamento</h3><p>${payText}</p></div>
            <div><h3>Contato</h3><p>${order.customer.email}<br>${order.customer.phone}</p></div>
          </div>
        </div>
      </div>
      <div class="sticky">
        <div class="panel">
          <h2>Itens</h2>
          <div class="summary-items">
            ${lines.map((l) => `
              <div class="summary-item">
                <div class="line-thumb" style="--card-fill:${l.variant.fill};--zoom:${l.product.cardZoom * 1.2}">
                  <span class="thumb-clip"><img src="${l.variant.image}" alt=""></span><span class="qty-badge">${l.qty}</span>
                </div>
                <div><strong>${productLabel(l.product)}</strong><span>${l.variant.name}</span></div>
                <b>${money(l.total)}</b>
              </div>`).join('')}
          </div>
          <div class="totals-row"><span>Subtotal</span><span>${money(order.totals.subtotal)}</span></div>
          ${order.totals.discount ? `<div class="totals-row discount"><span>Cupom ${order.totals.coupon}</span><span>− ${money(order.totals.discount)}</span></div>` : ''}
          <div class="totals-row"><span>Frete${order.shipping ? ' · ' + order.shipping.label.replace('Entrega ', '') : ''}</span><span>${order.totals.shipping ? money(order.totals.shipping) : 'Grátis'}</span></div>
          ${order.totals.assembly ? `<div class="totals-row"><span>Montagem</span><span>${money(order.totals.assembly)}</span></div>` : ''}
          ${order.totals.pixDiscount ? `<div class="totals-row discount"><span>Desconto Pix</span><span>− ${money(order.totals.pixDiscount)}</span></div>` : ''}
          <div class="totals-row total"><span>Total</span><span>${money(order.totals.total)}</span></div>
          <div class="drawer-actions"><a class="btn btn-lg btn-block" href="index.html">Voltar para a loja</a></div>
        </div>
      </div>
    </div>`;

  const copy = $('#copyPix');
  if (copy) copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(pixCode); } catch (e) { /* sem permissão de área de transferência */ }
    showToast('Código Pix copiado (simulação).');
  });
}

/* ==========================================================================
   INICIALIZAÇÃO
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page !== 'home' && page !== 'product') applyTheme(NEUTRAL_THEME, NEUTRAL_THEME.bodyBg);

  renderHeader($('#siteHeader'));
  injectChrome();
  refreshCartUI();

  if (page === 'home') initHome();
  if (page === 'product') initProduct();
  if (page === 'cart') initCart();
  if (page === 'checkout') initCheckout();
  if (page === 'order') initOrder();

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
});
