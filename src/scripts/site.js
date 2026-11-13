// Interazioni comuni a tutte le pagine: menu, header, link "Vai al contenuto", scheda prodotto.
const $ = (s) => document.querySelector(s);
const nav = $('#main-navigation');
const toggle = $('.menu-toggle');
const header = $('header');
const dialog = $('#product-dialog');

function focusPageContent() {
  const main = $('#main');
  main.setAttribute('tabindex', '-1');
  main.focus({ preventScroll: true });
}

// Menu mobile
function closeMenu() {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Apri menu');
}
toggle.addEventListener('click', () => {
  const on = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(on));
  toggle.setAttribute('aria-label', on ? 'Chiudi menu' : 'Apri menu');
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); }
});
document.addEventListener('click', (event) => {
  if (nav.classList.contains('open') && !event.target.closest('header')) closeMenu();
});
matchMedia('(max-width:1100px)').addEventListener('change', closeMenu);

// Link "Vai al contenuto"
$('.skip').addEventListener('click', (event) => {
  event.preventDefault();
  focusPageContent();
  $('#main').scrollIntoView({ block: 'start', behavior: 'instant' });
});

// Header: si compatta dopo 110px e ricompare appena si scorre verso l'alto.
(() => {
  let previousY = Math.max(0, window.scrollY);
  let scheduled = false;
  function updateHeader() {
    const currentY = Math.max(0, window.scrollY);
    const delta = currentY - previousY;
    header.classList.toggle('nav-compact', currentY > 110);
    if (currentY <= 110 || delta < 0 || nav.classList.contains('open')) header.classList.remove('nav-hidden');
    else if (delta > 0) header.classList.add('nav-hidden');
    previousY = currentY;
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateHeader); }
  }, { passive: true });
  header.addEventListener('focusin', () => {
    header.classList.toggle('nav-compact', window.scrollY > 110);
    header.classList.remove('nav-hidden');
  });
})();

// Scheda prodotto: il contenuto è pre-generato in <template id="product-tpl-N">.
function showProduct(i) {
  const tpl = document.getElementById(`product-tpl-${i}`);
  if (!tpl) return;
  const content = $('#product-content');
  content.replaceChildren(tpl.content.cloneNode(true));
  dialog.showModal();
  const main = $('#gallery-main');
  const thumbs = content.querySelectorAll('[data-photo]');
  thumbs.forEach((b) => b.addEventListener('click', () => {
    main.srcset = b.dataset.srcset;
    main.src = b.dataset.src;
    main.alt = b.getAttribute('aria-label');
    main.dataset.photo = b.dataset.photo;
    thumbs.forEach((t) => t.setAttribute('aria-pressed', String(t === b)));
  }));
  content.querySelector('a').addEventListener('click', () => dialog.close());
}
document.querySelectorAll('[data-product]').forEach((b) =>
  b.addEventListener('click', () => showProduct(Number(b.dataset.product))));
$('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

// Comparsa morbida dei blocchi allo scorrimento e cerchi decorativi in leggero parallasse,
// come le forme della brochure. Disattivati se il visitatore preferisce ridurre le animazioni.
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll([
    '.section-heading', '.split > *', '.facts > span', '.product', '.box-card',
    '.process article', '.timeline article', '.technical article', '.topic-card',
    '.steps li', '.faq > *', '.page-head > *', '.prose > *', '.project-story-grid article',
    '.contact-request', '.contact-location', '.origin-photo', '.wide-photo', '.blue-section > .eyebrow', '.blue-section > h2',
  ].join(','));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  const targetSet = new Set(targets);
  targets.forEach((el) => {
    // Gli elementi vicini compaiono uno dopo l'altro.
    const siblings = [...el.parentElement.children].filter((c) => targetSet.has(c));
    const delay = Math.min(siblings.indexOf(el), 5) * 90;
    if (delay > 0) el.style.transitionDelay = `${delay}ms`;
    el.classList.add('reveal');
    observer.observe(el);
  });

  const floating = [...document.querySelectorAll('[data-parallax]')];
  if (!floating.length) return;
  let ticking = false;
  function updateParallax() {
    const mid = window.innerHeight / 2;
    floating.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      const offset = (r.top + r.height / 2 - mid) * Number(el.dataset.parallax);
      el.style.translate = `0 ${offset.toFixed(1)}px`;
    });
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateParallax); }
  }, { passive: true });
  updateParallax();
})();
