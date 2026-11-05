// Comportamiento común a todas las páginas: navegación, menú móvil, barra de reserva,
// cursor, revelados al hacer scroll y el logo del pie.
import { $, $$, RM, FINE } from './dom.js';

// ---------- Nav sólida + barra móvil ----------
const nav = $('#nav');
const dock = $('#dock');
function onScrollUI() {
  const y = scrollY;
  nav.classList.toggle('solid', y > 40);
  dock.classList.toggle('on', y > innerHeight * 0.8 && y < document.body.scrollHeight - innerHeight * 2);
}
addEventListener('scroll', onScrollUI, { passive: true });
onScrollUI();

// ---------- Menú móvil ----------
const menu = $('#menu');
const burger = $('#burger');
const setMenu = (open) => {
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) $('#menuClose').focus();
};
burger.addEventListener('click', () => setMenu(true));
$('#menuClose').addEventListener('click', () => { setMenu(false); burger.focus(); });
$$('#menu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false); });

// ---------- Cursor ----------
const cur = $('#cur');
if (FINE) {
  let cx = 0, cy = 0, tx = 0, ty = 0;
  addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; cur.classList.add('on'); }, { passive: true });
  document.addEventListener('pointerleave', () => cur.classList.remove('on'));
  (function loop() {
    cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
    cur.style.transform = `translate(${cx}px,${cy}px)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener('pointerover', (e) => {
    const t = e.target.closest('[data-cursor]');
    cur.classList.toggle('big', !!t);
    if (t) cur.firstElementChild.textContent = t.dataset.cursor;
  });
}

// ---------- Revelados ----------
const rio = new IntersectionObserver(
  (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } }),
  { rootMargin: '0px 0px -8% 0px' }
);
$$('.rv').forEach((el) => rio.observe(el));

// ---------- Logo del pie: el brillo sigue al cursor (o al scroll en táctil) ----------
const bm = $('#bigmark');
if (FINE) addEventListener('pointermove', (e) => bm.style.setProperty('--fx', (e.clientX / innerWidth) * 100 + '%'), { passive: true });
else if (!RM) addEventListener('scroll', () => bm.style.setProperty('--fx', (scrollY / Math.max(1, document.body.scrollHeight - innerHeight)) * 100 + '%'), { passive: true });
