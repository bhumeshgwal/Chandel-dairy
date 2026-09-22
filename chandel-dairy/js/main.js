/* =====================================================
   MAIN.JS — sab pages pe chalta hai
   ===================================================== */

/* ---------- EDIT HERE: shop timing (24h format) ---------- */
const SHOP = {
  openHour: 9,     // 9 AM
  closeHour: 23,   // 11 PM
  founded: 1967
};

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNavbarScroll();
  initActiveLink();
  initReveal();
  initImageFallback();
  initOpenStatus();
  initYearStats();
});

/* ---------- Mobile menu ---------- */
function initMobileMenu() {
  const btn  = document.querySelector('.menu-btn');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;

  const close = () => {
    btn.classList.remove('open');
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  };

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  window.addEventListener('resize', () => { if (window.innerWidth >= 1024) close(); });
}

/* ---------- Navbar shadow on scroll ---------- */
function initNavbarScroll() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Highlight current page link ---------- */
function initActiveLink() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) a.classList.add('active');
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { items.forEach(i => i.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(i => io.observe(i));
}

/* ---------- Image fallback: agar image na mile toh placeholder ---------- */
function initImageFallback() {
  document.querySelectorAll('.img-frame img').forEach(img => {
    const mark = () => img.closest('.img-frame').classList.add('img-missing');
    if (img.complete && img.naturalWidth === 0) mark();
    img.addEventListener('error', mark);
  });
  // logo fallback
  document.querySelectorAll('.brand__logo').forEach(img => {
    img.addEventListener('error', () => {
      img.style.visibility = 'hidden';
    });
  });
}

/* ---------- Open / Closed live badge (India time) ---------- */
function initOpenStatus() {
  const nodes = document.querySelectorAll('[data-open-status]');
  if (!nodes.length) return;

  const render = () => {
    const hourIST = Number(new Intl.DateTimeFormat('en-GB', {
      hour: 'numeric', hour12: false, timeZone: 'Asia/Kolkata'
    }).format(new Date()));
    const isOpen = hourIST >= SHOP.openHour && hourIST < SHOP.closeHour;

    nodes.forEach(n => {
      n.classList.toggle('badge--open', isOpen);
      n.classList.toggle('badge--closed', !isOpen);
      n.innerHTML = `<span class="dot"></span>${isOpen ? 'Abhi Khula Hai' : 'Abhi Band Hai'}`;
    });
  };
  render();
  setInterval(render, 60 * 1000);
}

/* ---------- Years since 1967 (auto-update, fake number nahi) ---------- */
function initYearStats() {
  const years = new Date().getFullYear() - SHOP.founded;
  document.querySelectorAll('[data-years]').forEach(el => { el.textContent = years + '+'; });
  document.querySelectorAll('[data-year-now]').forEach(el => { el.textContent = new Date().getFullYear(); });
}
