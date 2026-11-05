// Menú de servicios: pestañas por categoría y búsqueda sobre el HTML ya renderizado.
import { $, $$ } from './dom.js';

const norm = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function initServices() {
  const svc = $('#svc');
  if (!svc) return;
  const cats = $('#svcCats');
  const panels = $$('.svc-panel', svc);
  const q = $('#svcQ');
  const img = $('#svcImg');
  let current = panels.find((p) => !p.hidden)?.dataset.k ?? panels[0].dataset.k;

  function setFig(p) {
    $('#svcFigT').textContent = p.dataset.t;
    $('#svcFigN').textContent = p.dataset.n + ' servicios';
    if (img.getAttribute('src') === p.dataset.img) return;
    img.removeAttribute('srcset');
    img.classList.add('out');
    setTimeout(() => {
      img.src = p.dataset.img;
      img.onload = () => img.classList.remove('out');
    }, 220);
  }

  function showCat(k, scroll) {
    current = k;
    q.value = '';
    svc.classList.remove('searching');
    $('#svcEmpty').hidden = true;
    panels.forEach((p) => {
      p.hidden = p.dataset.k !== k;
      $$('.svc-row', p).forEach((r) => (r.hidden = false));
    });
    $$('button', cats).forEach((b) => b.setAttribute('aria-selected', String(b.dataset.k === k)));
    const p = panels.find((x) => x.dataset.k === k);
    $('#svcN').textContent = p.dataset.n + ' servicios';
    setFig(p);
    const ab = $(`button[data-k="${k}"]`, cats);
    if (ab && innerWidth <= 860) cats.scrollTo({ left: ab.offsetLeft - cats.offsetLeft - 24, behavior: 'smooth' });
    if (scroll && innerWidth <= 860) {
      const top = p.getBoundingClientRect().top + scrollY - 150;
      if (top < scrollY) scrollTo({ top, behavior: 'smooth' });
    }
  }

  $$('button', cats).forEach((b) => b.addEventListener('click', () => showCat(b.dataset.k, true)));
  // flechas para moverse entre pestañas (patrón de tabs accesible)
  cats.addEventListener('keydown', (e) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    const bs = $$('button', cats);
    const i = bs.indexOf(document.activeElement);
    if (i < 0) return;
    e.preventDefault();
    const n = bs[(i + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1) + bs.length) % bs.length];
    n.focus();
    showCat(n.dataset.k);
  });

  q.addEventListener('input', () => {
    const term = norm(q.value.trim());
    if (!term) { showCat(current); return; }
    svc.classList.add('searching');
    $('#svcQv').textContent = `“${q.value.trim()}”`;
    $$('button', cats).forEach((b) => b.setAttribute('aria-selected', 'false'));
    let total = 0, firstHit = null;
    panels.forEach((p) => {
      let hits = 0;
      $$('.svc-row', p).forEach((r) => {
        const ok = r.dataset.q.includes(term);
        r.hidden = !ok;
        if (ok) hits++;
      });
      p.hidden = hits === 0;
      if (hits && !firstHit) firstHit = p;
      total += hits;
    });
    $('#svcEmpty').hidden = total > 0;
    $('#svcN').textContent = total + (total === 1 ? ' resultado' : ' resultados');
    if (firstHit) setFig(firstHit);
  });

  // otros componentes (lookbook) pueden pedir abrir una categoría
  addEventListener('svc:show', (e) => showCat(e.detail));
}
