/* Minaz International – storefront logic (vanilla JS, hash-routed pages)
   Sections: 1 Config · 2 Catalogue · 3 Helpers · 4 Cart · 5 Views · 6 Router · 7 Init */
'use strict';

/* ---------- 1. CONFIG ---------- */
const CONFIG = {
  wa: '919082194794',
  phoneLabel: '90821 94794',
  currency: '₹',
  sampleData: true,            // true = show "Sample" tags on prices and sizes. Set false once real data is in.
  experienceConfirmed: false,  // set true only when the owner confirms "15 years"
};
/* Stock lifestyle photos (Pexels). If one fails to load it is removed and a soft colour block shows instead. */
const PEXELS = [4491158, 5912194, 6932585, 8260621, 6932448];

/* ---------- 2. CATALOGUE – edit here ----------
   price + size marked sample:true are TEMPORARY. Replace them with confirmed client data.
   img = file name in /assets (with exact extension). features/ing/use: arrays or null. */
const CATS = {
  skincare: { label: 'Skincare' },
  haircare: { label: 'Hair care' },
  body:     { label: 'Body care' },
  soaps:    { label: 'Herbal soaps' },
  kits:     { label: 'Kits' },
};
const PRODUCTS = [
  /* ----- Skincare ----- */
  { id:'minaz-international-cream', name:'Minaz International Cream', cat:'skincare', img:'jars.png', price:499, size:'30 g', sample:true, feat:1,
    short:'The brand’s signature cream.',
    desc:'Our signature cream, made for everyday care. Minaz describes it as whitening, hydrating and rejuvenating, with luxury in every layer.',
    features:['Brand description: whitening, hydrating, rejuvenating'], ing:null, use:null },
  { id:'gold-face-wash', name:'Gold Face Wash', cat:'skincare', img:'gold.png', blend:true, price:249, size:'100 ml', sizeKnown:true, sample:true, feat:1,
    short:'A daily face wash in an amber bottle.',
    desc:'A golden-amber daily face wash. The label describes a cleanser infused with natural golden extracts, made to brighten and refresh.',
    features:['Illuminates and evens skin tone (as labelled)','Gently removes impurities (as labelled)','Deeply hydrates and softens (as labelled)'], ing:null, use:null },
  { id:'pigmentation-face-wash', name:'Pigmentation Face Wash', cat:'skincare', img:'wash-pig.jpeg', blend:true, price:249, size:'100 ml', sizeKnown:true, sample:true,
    short:'A bright yellow gel wash with micro beads.',
    desc:'A bright yellow gel face wash with micro-exfoliating beads. The label describes a brightening cleanser made for dark spots and uneven skin tone.',
    features:['Targets pigmentation (as labelled)','Brightens complexion (as labelled)','Gentle exfoliation (as labelled)','Reduces sun spots (as labelled)','Even skin tone (as labelled)'], ing:null, use:null },
  { id:'charcoal-face-wash', name:'Charcoal Face Wash', cat:'skincare', img:'wash-char.jpeg', blend:true, price:229, size:'100 ml', sizeKnown:true, sample:true,
    short:'A deep-cleansing charcoal face wash.',
    desc:'A sleek black face wash labelled “Natural Detox”. The label describes a purifying cleanser made with activated charcoal to clear impurities.',
    features:['Deep pore cleansing (as labelled)','Removes excess oil (as labelled)','Exfoliates gently (as labelled)','For balanced skin (as labelled)'], ing:null, use:null },
  { id:'red-wine-face-wash', name:'Red Wine Face Wash', cat:'skincare', img:'wash-wine.jpeg', blend:true, price:229, size:'100 ml', sizeKnown:true, sample:true,
    short:'A rich red face wash with red wine antioxidants.',
    desc:'A deep red face wash. The label describes a cleanser that revitalises with the natural power of red wine antioxidants, while gently cleansing and purifying.',
    features:['Brightens complexion (as labelled)','Deep pore cleansing (as labelled)','Retains natural moisture (as labelled)','Gentle on skin (as labelled)'], ing:['Red wine antioxidants (as labelled)'], use:null },
  { id:'avocado-face-wash', name:'Avocado Face Wash', cat:'skincare', img:'wash-avo.jpeg', blend:true, price:229, size:'100 ml', sizeKnown:true, sample:true,
    short:'A fresh green avocado gel face wash.',
    desc:'A fresh green gel face wash. The label describes a gentle yet effective cleanser for natural radiance, with a light exfoliating action.',
    features:['Deep cleansing and clarifying (as labelled)','Hydrates and conditions skin (as labelled)','Gentle exfoliation (as labelled)'], ing:null, use:null },
  { id:'rice-face-wash', name:'Rice Face Wash', cat:'skincare', img:'wash-rice.jpeg', blend:true, price:229, size:'100 ml', sizeKnown:true, sample:true,
    short:'A clear gel wash with rice bran water.',
    desc:'A clear gel face wash. The label describes a gentle exfoliating cleanser infused with rice bran water, for a brighter-looking, smoother complexion.',
    features:['Brightens and evens skin tone (as labelled)','Gentle micro-scrubbing action (as labelled)','Deeply hydrates and plumps (as labelled)','Suitable for all skin types (as labelled)'], ing:['Rice bran water (as labelled)'], use:null },
  { id:'vitamin-c-face-serum', name:'Vitamin C Face Serum', cat:'skincare', img:'full-vitc.jpeg', price:399, size:'30 ml', sample:true, feat:1,
    short:'A 20% Vitamin C brightening serum.',
    desc:'A golden-orange face serum labelled with 20% Vitamin C and hyaluronic acid, sold as a professional anti-ageing brightening serum.',
    features:['20% Vitamin C (as labelled)','Contains hyaluronic acid (as labelled)','Anti-ageing brightening serum (as labelled)'], ing:['Vitamin C 20% (as labelled)','Hyaluronic acid (as labelled)'], use:null },
  { id:'korean-face-serum', name:'Korean Face Serum', cat:'skincare', img:'korean.jpeg', blend:true, price:399, size:'30 ml', sample:true,
    short:'A hyaluronic acid serum in a teal bottle.',
    desc:'A teal dropper-bottle face serum labelled with hyaluronic acid, sold as a professional anti-ageing brightening serum.',
    features:['Contains hyaluronic acid (as labelled)','Anti-ageing brightening serum (as labelled)','Dropper bottle'], ing:['Hyaluronic acid (as labelled)'], use:null },
  { id:'open-pores-serum', name:'Open Pores Serum', cat:'skincare', img:'poreserum.jpeg', blend:true, price:399, size:'30 ml', sample:true,
    short:'A pink dropper-bottle pore serum.',
    desc:'A pink dropper-bottle face serum, sold by Minaz as an open pores serum.',
    features:['Sold as an open pores serum','Dropper bottle'], ing:null, use:null },
  { id:'acne-serum', name:'Acne Serum', cat:'skincare', img:'acneserum.jpeg', blend:true, price:399, size:'30 ml', sample:true,
    short:'A purple “Deep Preparation Formula” serum.',
    desc:'A purple dropper-bottle face serum labelled “Deep Preparation Formula” and sold by Minaz as an acne serum.',
    features:['Sold as an acne serum','Labelled deep preparation formula','Dropper bottle'], ing:null, use:null },
  { id:'day-cream', name:'Day Cream', cat:'skincare', img:'day.png', price:299, size:'30 g', sample:true,
    short:'A smooth day cream in compact jars.',
    desc:'A smooth white day cream, sold in compact jars that are easy to carry. Made for use in the morning.',
    features:['Made for daytime use','Compact jar'], ing:null, use:null },
  { id:'avocado-day-night-creams', name:'Avocado Day and Night Creams', cat:'skincare', img:'full-avo-creams.jpeg', price:599, size:'Day + Night set', sizeKnown:true, sample:true, feat:1,
    short:'A day cream and a night cream, together.',
    desc:'Two avocado creams in one set: a day cream for the morning and a night cream for the evening. Both jars are included.',
    features:['Includes both a day cream and a night cream','Avocado range, as named on the jars'], ing:null, use:null },
  /* ----- Hair care ----- */
  { id:'hair-growth-serum', name:'Hair Growth Serum', cat:'haircare', img:'full-hairserum.jpeg', price:449, size:'30 ml', sample:true,
    short:'A hair serum for dry and damaged hair.',
    desc:'A clear hair serum in a gold-capped dropper bottle. The label reads “For dry & damaged hair” and “For stronger shiny hair”.',
    features:['For dry and damaged hair (as labelled)','For stronger, shiny hair (as labelled)','Dropper bottle'], ing:null, use:null },
  { id:'eyebrow-lash-growth-oil', name:'Eyebrow and Lash Growth Oil', cat:'haircare', img:'brow.png', price:249, size:'10 ml', sample:true,
    short:'A roll-on oil for eyebrows and lashes.',
    desc:'A convenient roll-on bottle sold as an eyebrow and lash growth oil. The label reads “100% Natural”.',
    features:['Roll-on bottle','Labelled 100% natural'], ing:null, use:null },
  /* ----- Body care ----- */
  { id:'skin-whitening-body-lotion', name:'Skin Whitening Body Lotion', cat:'body', img:'full-lotion.jpeg', variants:['Rose','Almond'], price:299, size:'100 ml', sample:true,
    short:'A pump-bottle body lotion, Rose or Almond.',
    desc:'A body lotion in two variants, Rose and Almond. The pack is labelled 24 hrs hydrating with SPF 15, in an easy pump bottle.',
    features:['Two variants: Rose and Almond','24 hrs hydrating (as labelled)','SPF 15 (as labelled)'], ing:null, use:null },
  /* ----- Herbal soaps ----- */
  { id:'moroccan-nila-soap', name:'Moroccan Nila Soap', cat:'soaps', img:'nila.jpg', price:199, size:'100 g', sample:true, feat:1,
    short:'An embossed blue soap bar.',
    desc:'A deep blue soap bar with an embossed floral design. Minaz says it helps brighten and even out skin tone and reduces the appearance of tanning and dullness.',
    features:['Helps brighten and even out skin tone (as stated by Minaz)','Reduces the appearance of tanning and dullness (as stated by Minaz)'], ing:null, use:null },
  { id:'saffron-goat-milk-soap', name:'Saffron Goat Milk Soap', cat:'soaps', img:'saffron.png', price:179, size:'100 g', sample:true, feat:1,
    short:'A golden soap with saffron strands.',
    desc:'A golden soap bar with visible saffron strands, made with saffron and goat milk.',
    features:['Made with saffron and goat milk'], ing:['Saffron','Goat milk'], use:null },
  { id:'avocado-soap', name:'Avocado Soap', cat:'soaps', img:'avocado.png', price:149, size:'100 g', sample:true,
    short:'A sage-green soap moulded as a rose.',
    desc:'A soft sage-green avocado soap, beautifully moulded in the shape of a rose.',
    features:['Rose-shaped bar'], ing:null, use:null },
  { id:'anti-acne-haldi-chandan-soap', name:'Anti Acne Haldi Chandan Soap', cat:'soaps', img:'haldi.png', price:169, size:'100 g', sample:true,
    short:'A sunflower-shaped haldi chandan soap.',
    desc:'A bright sunflower-shaped soap bar made with haldi (turmeric) and chandan (sandalwood), sold by Minaz as an anti acne soap.',
    features:['Made with haldi and chandan','Sold as an anti acne soap'], ing:['Haldi (turmeric)','Chandan (sandalwood)'], use:null },
  { id:'detan-multani-mitti-soap', name:'Detan Multani Mitti Soap', cat:'soaps', img:'detan.jpg', price:159, size:'100 g', sample:true,
    short:'A multani mitti soap with tree and sun motifs.',
    desc:'An earthy multani mitti soap bar pressed with tree and sun motifs, sold by Minaz as a de-tan soap.',
    features:['Made with multani mitti','Sold as a de-tan soap'], ing:['Multani mitti'], use:null },
  { id:'d-tan-magic-soap', name:'D-Tan Special Magic Soap', cat:'soaps', img:'d-tan soap.png', price:179, size:'100 g', sizeKnown:true, sample:true,
    short:'A D-Tan soap with saffron and sandalwood.',
    desc:'A D-Tan special soap bar in kraft-style packaging. The label reads infused with saffron and sandalwood, suitable for all skin types.',
    features:['Infused with saffron and sandalwood (as labelled)','Suitable for all skin types (as labelled)','Net weight 100 g (as labelled)'], ing:['Saffron (as labelled)','Sandalwood (as labelled)'], use:null },
  { id:'skin-lightening-soap', name:'Skin Lightening Soap', cat:'soaps', img:'light.png', price:159, size:'100 g', sample:true,
    short:'A natural-toned soap bar.',
    desc:'A natural-toned soap bar, listed by Minaz as a skin lightening soap.',
    features:['Sold as a skin lightening soap'], ing:null, use:null },
  /* ----- Kits ----- */
  { id:'d-tan-kit', name:'D-Tan Kit', cat:'kits', img:'full-kit-dtan.jpeg', price:899, size:'Kit', sample:true,
    short:'A D-Tan set of five products.',
    desc:'A D-Tan set that brings several products together. The client photo shows a face wash, scrub, face pack, D-Tan special soap and a day/night cream.',
    features:['Face wash, scrub, face pack, soap and day/night cream (as shown in the client photo)'], ing:null, use:null },
  { id:'avocado-kit', name:'Avocado Kit', cat:'kits', img:'kit-avo.jpeg', price:799, size:'Kit', sample:true,
    short:'An avocado set with wash, scrub and face pack.',
    desc:'An avocado set. The client photo labels a face wash, scrub, avocado face pack and a day/night cream.',
    features:['Face wash, scrub, face pack and day/night cream (as labelled in the client photo)'], ing:null, use:null },
  { id:'coffee-kit', name:'Coffee Kit', cat:'kits', img:'kit-coffee.jpeg', price:799, size:'Kit', sample:true,
    short:'A coffee set of five items.',
    desc:'A coffee set packed in a clear tray. The client photo shows five items, including a coffee-bean-shaped soap.',
    features:['Five items (as shown in the client photo)'], ing:null, use:null },
  { id:'abhyang-kit', name:'Abhyang Kit', cat:'kits', img:'kit-abh.jpeg', price:999, size:'Kit', sample:true,
    short:'An Abhyang set of oil, powder and soap.',
    desc:'An Abhyang set that brings the range together in one kit. An earlier client photo shows Abhyang oil, Ubtan powder and Abhyang soap.',
    features:['Abhyang oil, Ubtan powder and Abhyang soap (as shown in the client photo)'], ing:null, use:null },
  /* HELD BACK until the client confirms it can be sold: a "Weight Loss Drop" bottle (health claim in its name). */
];
const FAQ = [
  ['What is the Winter Special Discount?','It is an offer for our first 100 customers. Message us on WhatsApp to claim it. Discount details and eligibility are confirmed there.'],
  ['How do I order?','Add products to your cart, fill in your delivery details at checkout, then send the order to Minaz Khan on WhatsApp. Your order is confirmed there.'],
  ['Do you deliver across India?','Yes. Minaz International delivers Pan-India. Delivery charges and timing are confirmed on WhatsApp.'],
  ['How do I pay?','There is no online payment on this website yet. Payment options are agreed on WhatsApp when your order is confirmed.'],
  ['What is your return policy?','Return and refund terms have not been published yet. Please ask on WhatsApp before you order.'],
  ['Where can I see the ingredients?','Full ingredient lists are being collected from the owner. If you have allergies or sensitive skin, ask on WhatsApp first and do a patch test before first use.'],
];

/* ---------- 3. HELPERS ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&','<':'<','>':'>','"':'"'}[c]));
const inr = n => CONFIG.currency + n.toLocaleString('en-IN');
const find = id => PRODUCTS.find(p => p.id === id);
const img = p => `assets/${p.img}`;
const waURL = t => `https://wa.me/${CONFIG.wa}?text=${encodeURIComponent(t)}`;
const OFFER_MSG = 'Hello Minaz International, I’d like to claim the Winter Special Discount for the first 100 customers.';
const tag = () => CONFIG.sampleData ? '<small>Sample</small>' : '';
const priceHTML = p => `<span class="price">${inr(p.price)}${p.sample ? tag() : ''}<span class="sz">${esc(p.size)}</span></span>`;
const photo = (i, alt) => `<img src="https://images.pexels.com/photos/${PEXELS[i]}/pexels-photo-${PEXELS[i]}.jpeg?auto=compress&cs=tinysrgb&w=800" alt="${alt}" loading="lazy" onerror="this.remove()">`;
const toast = (m, link) => { const t = $('#toast'); t.innerHTML = esc(m) + (link ? ` <a href="${link[0]}">${link[1]}</a>` : ''); t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('on'), 2800); };

/* ---------- 4. CART (localStorage) ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem('minaz_cart') || '[]').filter(i => find(i.id)); } catch (e) {}
function saveCart(bump) {
  try { localStorage.setItem('minaz_cart', JSON.stringify(cart)); } catch (e) {}
  const b = $('#cc'); b.textContent = cart.reduce((a, i) => a + i.qty, 0);
  if (bump) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
}
function addToCart(id, qty = 1, v) {
  const k = cart.find(i => i.id === id && i.v === v);
  k ? k.qty = Math.min(20, k.qty + qty) : cart.push({ id, qty, v });
  saveCart(true);
}
const subtotal = () => cart.reduce((a, i) => a + find(i.id).price * i.qty, 0);
/* Replace with a real order API call when a backend exists. */
function buildOrderURL(f) {
  const lines = cart.map(i => `- ${find(i.id).name} (${find(i.id).size}${i.v ? ', ' + i.v : ''}) × ${i.qty}`).join('\n');
  return waURL(`Hello Minaz International, I’d like to order:\n${lines}\n\nPrices to be confirmed.${f.claim ? '\nI’d also like to claim the Winter Special Discount.' : ''}\n\nName: ${f.name}\nPhone: ${f.phone}\nAddress: ${f.addr}, ${f.city}, ${f.state} – ${f.pin}`);
}

/* ---------- 5. VIEWS ---------- */
const card = (p, cls = '') => `<article class="card ${cls}"><a class="im" href="#/product/${p.id}" aria-label="View ${esc(p.name)}"><img class="${p.blend ? 'bl' : ''}" src="${img(p)}" alt="${esc(p.name)}" loading="lazy" width="380" height="400"></a><div class="meta"><span class="c">${CATS[p.cat].label}</span><h3><a href="#/product/${p.id}">${esc(p.name)}</a></h3><p class="sd">${esc(p.short)}</p>${priceHTML(p)}<div class="acts"><a class="btn line sm" href="#/product/${p.id}"><span>View details</span></a>${p.variants ? `<a class="btn sm" href="#/product/${p.id}"><span>Choose variant</span></a>` : `<button class="btn sm" data-add="${p.id}"><span>Add to cart</span></button>`}</div></div></article>`;
const waBtn = (t, cls = 'wa') => `<a class="btn ${cls}" href="${waURL('Hello Minaz International, I’d like to know more about your products.')}" target="_blank" rel="noopener"><span>${t}</span></a>`;
const empty = (t, d, a = '') => `<div class="empty"><h2>${t}</h2><p>${d}</p>${a}</div>`;

const S = { q: '', cat: 'all', sort: '' };
function renderShop() {
  const cats = [['all', 'All'], ...Object.entries(CATS).map(([k, v]) => [k, v.label])];
  $('#chips').innerHTML = cats.map(([k, t]) => `<button class="chip${S.cat === k ? ' on' : ''}" data-c="${k}" aria-pressed="${S.cat === k}">${t}</button>`).join('');
  $('#sort').value = S.sort; $('#q').value = S.q;
  let l = PRODUCTS.filter(p => (S.cat === 'all' || p.cat === S.cat) && (p.name + ' ' + CATS[p.cat].label + ' ' + p.short).toLowerCase().includes(S.q.toLowerCase()));
  const o = { az: (a, b) => a.name.localeCompare(b.name), lo: (a, b) => a.price - b.price, hi: (a, b) => b.price - a.price }[S.sort];
  if (o) l = [...l].sort(o);
  const none = S.cat === 'haircare' && !S.q
    ? empty('Hair oils are coming online soon', 'Hair oils are part of the Minaz range, but no products are listed here yet. Message Minaz Khan on WhatsApp to ask what is available.', waBtn('Ask on WhatsApp'))
    : empty('No products found', 'Try a different word or clear the filters.');
  $('#list').innerHTML = l.length ? l.map((p, i) => card(p, `rv d${i % 3 + 1}`)).join('') : none;
  reveal();
}
function renderProduct(id) {
  const p = find(id), box = $('#pd');
  if (!p) { box.innerHTML = empty('Product not found', 'That product does not exist.', '<a class="btn" href="#/shop"><span>Back to shop</span></a>'); return; }
  let q = 1;
  const rel = PRODUCTS.filter(x => x.id !== p.id).sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat)).slice(0, 5);
  box.innerHTML = `<div class="crumb"><a href="#/shop">Shop</a> / <a href="#/shop/${p.cat}">${CATS[p.cat].label}</a> / ${esc(p.name)}</div>
  <div class="pd"><div class="pic${p.blend ? ' bl' : ''}" id="pic"><img src="${img(p)}" alt="${esc(p.name)}" width="560" height="640"><span class="zh">Hover to zoom · tap to enlarge</span></div>
  <div><span class="kick">${CATS[p.cat].label}</span><h1>${esc(p.name)}</h1>${priceHTML(p)}<p class="lead">${esc(p.desc)}</p>
  <ul class="ft">${p.features.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
  ${p.variants ? `<label style="max-width:240px;margin-top:14px">Variant<select id="vsel">${p.variants.map(v => `<option>${v}</option>`).join('')}</select></label>` : ''}
  <p class="note" style="margin-top:14px"><b>Size:</b> ${esc(p.size)} ${p.sample && !p.sizeKnown ? '<span class="todo">sample, to be confirmed</span>' : ''}</p>
  <div class="row"><div class="qty"><button id="dec" aria-label="Decrease quantity">−</button><span id="q1">1</span><button id="inc" aria-label="Increase quantity">+</button></div><button class="btn" id="addb"><span>Add to cart</span></button></div>
  <details open><summary>Ingredients</summary><p>${p.ing ? esc(p.ing.join(', ')) : '<span class="todo">Full ingredient list to be confirmed by Minaz International.</span>'}</p></details>
  <details><summary>How to use</summary><p>${p.use ? esc(p.use) : '<span class="todo">Usage directions to be confirmed by Minaz International.</span>'}</p></details>
  <details><summary>Delivery</summary><p>Delivered across India. Charges and timing are confirmed on WhatsApp.</p></details>
  <p class="note" style="margin-top:18px">Patch-test before first use. A personal-care product, not a medical treatment; results vary from person to person.</p></div></div>
  <div class="head"><h2>You may also like</h2></div><div class="rail" style="margin-bottom:70px">${rel.map(x => card(x)).join('')}</div>`;
  const set = () => $('#q1').textContent = q;
  $('#dec').onclick = () => { q = Math.max(1, q - 1); set(); };
  $('#inc').onclick = () => { q = Math.min(20, q + 1); set(); };
  const pic = $('#pic'), pimg = $('img', pic);
  pic.onmousemove = e => { if (!matchMedia('(hover:hover)').matches) return; const r = pic.getBoundingClientRect(); pimg.style.transformOrigin = `${(e.clientX - r.left) / r.width * 100}% ${(e.clientY - r.top) / r.height * 100}%`; pic.classList.add('zoom'); };
  pic.onmouseleave = () => pic.classList.remove('zoom');
  pic.onclick = () => openLightbox(img(p), p.name);
  $('#addb').onclick = () => { const v = p.variants ? $('#vsel').value : undefined; addToCart(p.id, q, v); toast(`${p.name}${v ? ' (' + v + ')' : ''} added to cart`, ['#/cart', 'View cart']); };
}
function renderCart() {
  const box = $('#cartBody');
  if (!cart.length) { box.innerHTML = empty('Your cart is empty', 'Add a product from the shop and it will appear here.', '<a class="btn" href="#/shop"><span>Browse products</span></a>'); return; }
  box.innerHTML = `<div class="lay"><div>${cart.map((i, n) => { const p = find(i.id); return `<div class="item"><img src="${img(p)}" alt=""><div><h3>${esc(p.name)}</h3><span class="note">${i.v ? esc(i.v) + ' · ' : ''}${esc(p.size)} · ${inr(p.price)}${p.sample && CONFIG.sampleData ? ' (sample)' : ''}</span><br><button class="rm" data-rm="${n}">Remove</button></div><div class="qty"><button data-q="${n}" data-d="-1" aria-label="Decrease quantity">−</button><span>${i.qty}</span><button data-q="${n}" data-d="1" aria-label="Increase quantity">+</button></div></div>`; }).join('')}</div>
  <aside class="sum"><h3>Order summary</h3><div class="l"><span>Items</span><span>${cart.reduce((a, i) => a + i.qty, 0)}</span></div><div class="l"><span>Subtotal${CONFIG.sampleData ? ' (sample prices)' : ''}</span><b>${inr(subtotal())}</b></div><div class="l"><span>Delivery</span><span>Confirmed on order</span></div><a class="btn gold" href="#/checkout"><span>Go to checkout</span></a></aside></div>`;
}
function renderCheckout() {
  const box = $('#checkoutBody');
  if (!cart.length) { renderCartInto(box); return; }
  box.innerHTML = `<div class="lay"><div><div class="banner"><b>No online payment yet.</b> Payment and order processing are not connected to this website. Fill in your details, then send the order to Minaz Khan on WhatsApp to confirm it. Payment can be added here later.</div>
  <form id="cf" style="margin-top:24px" novalidate><div class="two"><label>Full name<input name="name" required autocomplete="name"><span class="err"></span></label><label>Phone number<input name="phone" required inputmode="tel" pattern="[0-9+ ]{10,14}" autocomplete="tel"><span class="err"></span></label></div>
  <label>Full address<textarea name="addr" rows="3" required autocomplete="street-address"></textarea><span class="err"></span></label>
  <div class="two"><label>City<input name="city" required><span class="err"></span></label><label>State<input name="state" required><span class="err"></span></label></div>
  <label style="max-width:220px">Pincode<input name="pin" required inputmode="numeric" pattern="[0-9]{6}" maxlength="6"><span class="err"></span></label>
  <label style="display:flex;gap:10px;align-items:center;font-weight:400"><input type="checkbox" name="claim" style="width:auto"> I’d like to claim the Winter Special Discount</label>
  <button class="btn" type="submit" style="justify-self:start"><span>Prepare my order</span></button></form></div>
  <aside class="sum"><h3>Order summary</h3>${cart.map(i => `<div class="l"><span>${esc(find(i.id).name)} × ${i.qty}</span><span>${inr(find(i.id).price * i.qty)}</span></div>`).join('')}<div class="l t"><span>Subtotal${CONFIG.sampleData ? ' (sample)' : ''}</span><b>${inr(subtotal())}</b></div><p class="note">Final prices and delivery charges are confirmed by Minaz Khan on WhatsApp.</p></aside></div>`;
  bindForm('#cf', f => {
    const url = buildOrderURL(f);
    box.innerHTML = `<div class="done"><span class="kick">One last step</span><h2>Send your order on WhatsApp</h2><p class="lead" style="margin:16px auto">Thank you, ${esc(f.name)}. Your order is not placed until you send it. Tap below to open WhatsApp with your products and delivery details filled in.</p><div class="l"><b>Delivering to</b><br>${esc(f.addr)}, ${esc(f.city)}, ${esc(f.state)} – ${esc(f.pin)}<br>Phone: ${esc(f.phone)}</div><a class="btn gold" href="${url}" target="_blank" rel="noopener"><span>Send order on WhatsApp</span></a> <a class="btn line" href="#/shop"><span>Keep shopping</span></a></div>`;
    cart = []; saveCart(); scrollTo(0, 0);
  });
}
function renderCartInto(box) { box.innerHTML = empty('Your cart is empty', 'Add a product from the shop first.', '<a class="btn" href="#/shop"><span>Browse products</span></a>'); }
function bindForm(sel, ok) {
  const f = $(sel); if (!f) return;
  f.onsubmit = e => {
    e.preventDefault(); let good = true;
    $$('input:not([type=checkbox]),textarea', f).forEach(el => {
      const m = el.validity.valueMissing ? 'This field is required.' : el.validity.patternMismatch ? (el.name === 'pin' ? 'Enter a 6-digit pincode.' : 'Enter a valid phone number.') : '';
      el.nextElementSibling.textContent = m; el.setAttribute('aria-invalid', !!m); if (m) good = false;
    });
    if (good) ok(Object.fromEntries(new FormData(f))); else $('[aria-invalid=true]', f).focus();
  };
}

function openLightbox(src, alt) { const lb = $('#lb'), im = $('img', lb); im.src = src; im.alt = alt; lb.hidden = false; document.body.style.overflow = 'hidden'; $('button', lb).focus(); }
function closeLightbox() { $('#lb').hidden = true; document.body.style.overflow = ''; }
$('#lb').addEventListener('click', closeLightbox);
addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ---------- 6. ROUTER ---------- */
const TITLES = { home: '', shop: 'Shop – ', about: 'About – ', contact: 'Contact – ', cart: 'Cart – ', checkout: 'Checkout – ', product: '' };
let first = true;
function route() {
  let [r = '', a] = location.hash.replace(/^#\/?/, '').split('/'); r = r || 'home';
  if (!$('#page-' + r)) r = 'nf';
  $$('.page').forEach(p => p.hidden = p.id !== 'page-' + r);
  if (r === 'shop') { S.cat = CATS[a] ? a : 'all'; S.q = ''; renderShop(); }
  if (r === 'product') renderProduct(a);
  if (r === 'cart') renderCart();
  if (r === 'checkout') renderCheckout();
  const pr = r === 'product' && find(a);
  document.title = (pr ? pr.name + ' – ' : TITLES[r] || '') + 'Minaz International' + (r === 'home' ? ' – Herbal skincare, soaps and personal care' : '');
  $$('#nav a').forEach(x => x.classList.toggle('on', x.dataset.r === (r === 'product' ? 'shop' : r)));
  $('#nav').classList.remove('open'); $('.burger').setAttribute('aria-expanded', 'false');
  const target = r === 'contact' && a && $('#' + a);
  target ? setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 60) : scrollTo(0, 0);
  if (!first) $('#app').focus({ preventScroll: true });
  first = false; reveal(); mediaState();
}

/* ---------- 7. INIT ---------- */
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 }) : null;
function reveal() { $$('.rv:not(.in)').forEach(el => io ? io.observe(el) : el.classList.add('in')); }

/* Videos: hero loops silently; pause anything off-screen or when the user prefers reduced motion. */
const hero = $('#heroVid'), story = $('#storyVid');
const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
function mediaState() { if (still) { hero.pause(); story.pause(); } }
if ('IntersectionObserver' in window) {
  new IntersectionObserver(es => es.forEach(e => { if (!still) e.isIntersecting ? hero.play().catch(() => {}) : hero.pause(); })).observe(hero);
  new IntersectionObserver(es => es.forEach(e => { if (!still) e.isIntersecting ? story.play().catch(() => {}) : story.pause(); }), { threshold: .2 }).observe(story);
}

document.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.add) { e.preventDefault(); addToCart(b.dataset.add, 1, (find(b.dataset.add).variants || [])[0]); toast(`${find(b.dataset.add).name} added to cart`, ['#/cart', 'View cart']); }
  else if (b.dataset.c) { S.cat = b.dataset.c; renderShop(); }
  else if (b.dataset.rm != null) { cart.splice(+b.dataset.rm, 1); saveCart(); renderCart(); }
  else if (b.dataset.q != null) { const i = cart[+b.dataset.q]; i.qty = Math.min(20, Math.max(1, i.qty + +b.dataset.d)); saveCart(); renderCart(); }
  else if (b.classList.contains('burger')) { const o = $('#nav').classList.toggle('open'); b.setAttribute('aria-expanded', o); }
});
$('#q').oninput = e => { S.q = e.target.value; const p = e.target.selectionStart; renderShop(); $('#q').focus(); $('#q').setSelectionRange(p, p); };
$('#sort').onchange = e => { S.sort = e.target.value; renderShop(); };
bindForm('#mf', f => open(waURL(`Hello Minaz International, I’m ${f.name} (${f.phone}).\n${f.msg}`), '_blank', 'noopener'));

/* static fills */
$$('[data-offer]').forEach(a => a.href = waURL(OFFER_MSG));
$$('[data-wa]').forEach(a => a.href = waURL('Hello Minaz International, I’d like to know more about your products.'));
$$('[data-photo]').forEach(el => el.innerHTML = photo(+el.dataset.photo, el.dataset.alt));
$('#expLine').hidden = !CONFIG.experienceConfirmed;
$('#n-soaps').textContent = PRODUCTS.filter(p => p.cat === 'soaps').length + ' soap bars';
$('#n-skincare').textContent = PRODUCTS.filter(p => p.cat === 'skincare').length + ' products';
$('#n-haircare').textContent = PRODUCTS.filter(p => p.cat === 'haircare').length + ' products';
$('#featRail').innerHTML = PRODUCTS.filter(p => p.feat).map(p => card(p)).join('');
$('#igs').innerHTML = PRODUCTS.slice(1, 7).map(p => `<a href="https://instagram.com/minaz_international_cream" target="_blank" rel="noopener" aria-label="${esc(p.name)} on Instagram"><img src="${img(p)}" alt="${esc(p.name)}" loading="lazy"></a>`).join('');
$('#faqList').innerHTML = FAQ.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('');

addEventListener('hashchange', route);
addEventListener('load', () => setTimeout(() => $('#ld').classList.add('off'), 500));
saveCart(); route();