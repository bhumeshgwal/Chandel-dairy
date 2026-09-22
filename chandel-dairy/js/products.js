/* =====================================================
   PRODUCTS.JS — product data + filter + render
   Price ya naam badalna ho toh sirf neeche wala array edit karo.
   Photo: images/products/ folder mein same file name se daal do.
   ===================================================== */

const CATEGORIES = [
  { id: 'milk',  label: 'Doodh',   labelEn: 'Fresh Milk',
    desc: 'Roz subah taaza, seedha dairy se. Gaay aur bhains dono ka doodh.' },
  { id: 'ghee',  label: 'Ghee',    labelEn: 'Pure Ghee',
    desc: 'Parampara se bana shuddh desi ghee. Khushboo aur swad dono asli.' },
  { id: 'curd',  label: 'Dahi',    labelEn: 'Fresh Curd',
    desc: 'Jama hua taaza dahi, do qism mein, roz ki thali ke liye.' },
  { id: 'other', label: 'Dairy Essentials', labelEn: 'Dairy Essentials',
    desc: 'Paneer, makkhan, malai aur mattha, sab ek hi jagah.' },
  { id: 'frozen', label: 'Frozen', labelEn: 'Frozen Goods',
    desc: 'Ghar ke liye jaruri frozen saman.' }
];

/* price = number (rupaye), unit = "L" / "Kg" / "Pkt" */
const PRODUCTS = [
  { id: 'cow-milk',     cat: 'milk',  name: 'Cow Milk',      hi: 'Gaay ka Doodh',   price: 50,   unit: 'L',
    note: 'Halka aur pachne mein aasan, bachon aur badon dono ke liye.', img: 'cow-milk.jpg', featured: true },
  { id: 'buffalo-milk', cat: 'milk',  name: 'Buffalo Milk',  hi: 'Bhains ka Doodh', price: 60,   unit: 'L',
    note: 'Gaadha aur malaidaar, chai aur mithai ke liye behtareen.', img: 'buffalo-milk.jpg' },

  { id: 'cow-ghee',     cat: 'ghee',  name: 'Cow Ghee',      hi: 'Gaay ka Ghee',    price: 1200, unit: 'Kg',
    note: 'Sunahri rang, dane daar, ayurvedic pasand.', img: 'cow-ghee.jpg', featured: true },
  { id: 'buffalo-ghee', cat: 'ghee',  name: 'Buffalo Ghee',  hi: 'Bhains ka Ghee',  price: 700,  unit: 'Kg',
    note: 'Safed aur gaadha, roz ke khane aur tadke ke liye.', img: 'buffalo-ghee.jpg' },

  { id: 'super-curd',   cat: 'curd',  name: 'Super Curd',    hi: 'Super Dahi',      price: 100,  unit: 'Kg',
    note: 'Extra gaadha aur malaidaar dahi.', img: 'super-curd.jpg', featured: true },
  { id: 'normal-curd',  cat: 'curd',  name: 'Normal Curd',   hi: 'Saadha Dahi',     price: 60,   unit: 'Kg',
    note: 'Roz ke khane ke liye taaza jama dahi.', img: 'normal-curd.jpg' },

  { id: 'paneer',       cat: 'other', name: 'Paneer',        hi: 'Paneer',          price: 400,  unit: 'Kg',
    note: 'Naram aur taaza, roz banaya jata hai.', img: 'paneer.jpg', featured: true },
  { id: 'butter',       cat: 'other', name: 'Butter',        hi: 'Makkhan',         price: 600,  unit: 'Kg',
    note: 'Ghar jaisa asli makkhan.', img: 'butter.jpg' },
  { id: 'cream',        cat: 'other', name: 'Buffalo Cream', hi: 'Bhains ki Malai', price: 500,  unit: 'Kg',
    note: 'Gaadhi malai, mithai aur gravy ke liye.', img: 'cream.jpg' },
  { id: 'mattha',       cat: 'other', name: 'Mattha',        hi: 'Mattha / Chhachh', price: 20,  unit: 'L',
    note: 'Thanda aur taaza, garmi ka asli saathi.', img: 'mattha.jpg' },

  { id: 'frozen-matar', cat: 'frozen', name: 'Frozen Matar', hi: 'Frozen Matar',    price: 100,  unit: 'Pkt',
    note: 'Saaf-suthri, seedha pakane ke liye taiyar.', img: 'frozen-matar.jpg' }
];

const IMG_PATH = 'images/products/';

const rupee = n => '₹' + n.toLocaleString('en-IN');

function productCard(p) {
  return `
    <article class="product paper reveal">
      <div class="product__img img-frame" data-label="${p.name}">
        <img src="${IMG_PATH + p.img}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product__body">
        <span class="product__hi deva">${p.hi}</span>
        <h3 class="product__name">${p.name}</h3>
        <p class="product__note">${p.note}</p>
        <div class="product__price">
          <strong>${rupee(p.price)}</strong><span>/ ${p.unit}</span>
        </div>
      </div>
    </article>`;
}

/* ---------- Home page: featured ---------- */
function renderFeatured(target) {
  const el = document.querySelector(target);
  if (!el) return;
  el.innerHTML = PRODUCTS.filter(p => p.featured).map(productCard).join('');
  revealNew(el);
}

/* ---------- Products page: category sections + filter tabs ---------- */
function renderProductsPage() {
  const tabs = document.querySelector('#filterTabs');
  const wrap = document.querySelector('#productSections');
  if (!tabs || !wrap) return;

  tabs.innerHTML =
    `<button class="tab active" data-cat="all">Sab Kuch</button>` +
    CATEGORIES.map(c => `<button class="tab" data-cat="${c.id}">${c.label}</button>`).join('');

  wrap.innerHTML = CATEGORIES.map(c => {
    const items = PRODUCTS.filter(p => p.cat === c.id);
    return `
      <section class="cat-block" id="cat-${c.id}" data-cat="${c.id}">
        <header class="cat-block__head reveal">
          <h2>${c.labelEn}</h2>
          <p>${c.desc}</p>
          <div class="divider">${MANDALA_SVG}</div>
        </header>
        <div class="grid grid--3 product-grid">${items.map(productCard).join('')}</div>
      </section>`;
  }).join('');

  tabs.addEventListener('click', e => {
    const btn = e.target.closest('.tab');
    if (!btn) return;
    tabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    wrap.querySelectorAll('.cat-block').forEach(b => {
      b.hidden = !(cat === 'all' || b.dataset.cat === cat);
    });
  });

  revealNew(wrap);
  if (typeof initImageFallback === 'function') initImageFallback();
}

function revealNew(root) {
  const items = root.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { items.forEach(i => i.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: 0.1 });
  items.forEach(i => io.observe(i));
  if (typeof initImageFallback === 'function') initImageFallback();
}

const MANDALA_SVG = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.2 5.3L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.8-.7z"/></svg>`;

document.addEventListener('DOMContentLoaded', () => {
  renderFeatured('#featuredProducts');
  renderProductsPage();
});
