// Lookbook: carrusel horizontal (fijado al scroll en escritorio), flechas, filtros por estilo
// y visor ampliado con "Quiero este look" (WhatsApp) y "Ver en el menú".
import { $, $$, RM, WA } from './dom.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { buildThread } from './thread.js';
gsap.registerPlugin(ScrollTrigger);

const lookMsg = (s) =>
  `Hola, vi el look "${s.dataset.n}" (${s.dataset.tec} con ${s.dataset.who}) en su sitio y me gustaría algo similar. ¿Me pueden asesorar?`;

export function initLookbook() {
  const tr = $('#track');
  if (!tr) return;
  const shots = $$('.shot', tr);
  let shown = shots.slice();
  let st = null;

  const dist = () => Math.max(0, tr.scrollWidth - tr.parentElement.clientWidth);
  const shotX = (i) => Math.min(dist(), shown[i].offsetLeft - shown[0].offsetLeft);
  const curX = () => (st ? -gsap.getProperty(tr, 'x') : tr.scrollLeft);
  const curIndex = () => {
    if (!shown.length) return 0;
    const x = curX();
    let best = 0, bd = 1e9;
    shown.forEach((s, i) => { const d = Math.abs(shotX(i) - x); if (d < bd) { bd = d; best = i; } });
    return best;
  };
  const pad = (n) => String(n).padStart(2, '0');
  function updCount() {
    $('#lbCount').textContent = pad(curIndex() + 1) + ' / ' + pad(shown.length);
    const d = dist();
    $('#lbProg').style.setProperty('--p', (d ? Math.max(0.06, Math.min(1, curX() / d)) : 1).toFixed(3));
  }
  function goShot(i) {
    if (!shown.length) return;
    i = Math.max(0, Math.min(shown.length - 1, i));
    if (st) {
      const y = st.start + (dist() ? shotX(i) / dist() : 0) * (st.end - st.start);
      scrollTo({ top: Math.ceil(y) + 1, behavior: RM ? 'auto' : 'smooth' });
    } else tr.scrollTo({ left: shotX(i), behavior: RM ? 'auto' : 'smooth' });
  }
  $('#lbPrev').addEventListener('click', () => goShot(curIndex() - 1));
  $('#lbNext').addEventListener('click', () => goShot(curIndex() + 1));
  tr.addEventListener('scroll', updCount, { passive: true });

  if (!RM) {
    ScrollTrigger.matchMedia({
      '(min-width:900px)': () => {
        const tw = gsap.to(tr, {
          x: () => -dist(), ease: 'none',
          scrollTrigger: {
            trigger: '#lookbook', start: 'top top', end: () => '+=' + Math.max(1, dist()),
            pin: true, scrub: 0.6, invalidateOnRefresh: true, onUpdate: updCount,
            onRefresh: () => setTimeout(buildThread, 0),
          },
        });
        st = tw.scrollTrigger;
        return () => { st = null; };
      },
    });
  }

  // filtros por estilo
  $$('.lfilters .chip').forEach((c) => c.addEventListener('click', () => {
    const f = c.dataset.lf;
    $$('.lfilters .chip').forEach((x) => x.setAttribute('aria-pressed', String(x === c)));
    shots.forEach((s) => (s.hidden = !(f === 'all' || s.dataset.f === f)));
    shown = shots.filter((s) => !s.hidden);
    if (st) { ScrollTrigger.refresh(); scrollTo({ top: st.start + 1, behavior: 'auto' }); }
    else tr.scrollTo({ left: 0, behavior: 'auto' });
    if (!RM) shown.forEach((s, i) => s.animate(
      [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }],
      { duration: 600, delay: i * 60, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' }
    ));
    updCount();
  }));
  updCount();

  // visor ampliado
  const lb = $('#lightbox');
  let li = 0;
  const hasMenu = !!$('#svc');
  function showLb(i) {
    li = (i + shown.length) % shown.length;
    const s = shown[li], im = $('img', s);
    $('#lbImg').src = s.dataset.full;
    $('#lbImg').alt = im.alt;
    $('#lbCap').innerHTML = `<b>${s.dataset.n}</b><span>${s.dataset.tec} · con ${s.dataset.who} · ${s.dataset.tm} aprox.</span>`;
    $('#lbWant').href = WA + encodeURIComponent(lookMsg(s));
    const svc = $('#lbSvc');
    svc.dataset.cat = s.dataset.cat;
    svc.href = window.__SERV_BASE + s.dataset.slug + '/';
  }
  function openLb(i) { showLb(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; $('#lbClose').focus(); }
  function closeLb() { lb.classList.remove('open'); document.body.style.overflow = ''; const s = shown[li]; s && $('.ph', s).focus({ preventScroll: true }); }
  shots.forEach((s) => $('.ph', s).addEventListener('click', () => openLb(shown.indexOf(s))));
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbxPrev').addEventListener('click', () => showLb(li - 1));
  $('#lbxNext').addEventListener('click', () => showLb(li + 1));
  // en la home "Ver en el menú" abre la categoría en el menú de la misma página
  $('#lbSvc').addEventListener('click', (e) => {
    if (!hasMenu) return;
    e.preventDefault();
    const k = e.currentTarget.dataset.cat;
    closeLb();
    dispatchEvent(new CustomEvent('svc:show', { detail: k }));
    scrollTo({ top: $('#carta').getBoundingClientRect().top + scrollY - 20, behavior: RM ? 'auto' : 'smooth' });
  });
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.tagName === 'FIGURE') closeLb(); });
  addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') showLb(li + 1);
    if (e.key === 'ArrowLeft') showLb(li - 1);
  });
  let x0 = null;
  lb.addEventListener('touchstart', (e) => (x0 = e.touches[0].clientX), { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (x0 == null) return;
    const d = e.changedTouches[0].clientX - x0;
    if (Math.abs(d) > 50) showLb(li + (d < 0 ? 1 : -1));
    x0 = null;
  });
}
