// Equipo: en escritorio la lista de nombres muestra la ficha al lado (copiada de la tarjeta);
// en móvil es un carrusel de tarjetas. El filtro resalta a quién corresponde cada especialidad.
import { $, $$, RM, FINE } from './dom.js';
import { gsap } from 'gsap';

export function initTeam() {
  const deck = $('#deck');
  if (!deck) return;
  const arts = $$('article', deck);
  const card = $('#card');
  let filt = 'all';
  let act = '';
  const matches = (a) => filt === 'all' || a.dataset.f.split(' ').includes(filt);

  function setAct(id) {
    if (id === act) return;
    act = id;
    const a = arts.find((x) => x.dataset.id === id);
    $$('#roll li').forEach((li) => li.classList.toggle('act', li.dataset.id === id));
    card.innerHTML = a.innerHTML;
    const pr = $('.portrait', card);
    if (a.dataset.hasImg) { pr.classList.remove('color'); requestAnimationFrame(() => setTimeout(() => pr.classList.add('color'), 60)); }
    if (!RM) {
      gsap.from(pr, { clipPath: 'polygon(0 7%,0 7%,0 100%,0 100%)', duration: 0.9, ease: 'expo.out', clearProps: 'clipPath' });
      gsap.from($$('.info>*', card), { y: 16, opacity: 0, stagger: 0.04, duration: 0.7, ease: 'expo.out' });
    }
  }

  $$('#roll li').forEach((li) => {
    const go = () => setAct(li.dataset.id);
    li.firstElementChild.addEventListener('click', go);
    if (FINE) li.addEventListener('pointerenter', go);
  });

  $$('#filters .chip').forEach((c) => c.addEventListener('click', () => {
    filt = c.dataset.tf;
    $$('#filters .chip').forEach((x) => x.setAttribute('aria-pressed', String(x === c)));
    const m = arts.filter(matches);
    $$('#roll li').forEach((li) => li.classList.toggle('dim', !matches(arts.find((a) => a.dataset.id === li.dataset.id))));
    arts.forEach((a) => a.classList.toggle('dim', !matches(a)));
    if (m.length && !m.some((a) => a.dataset.id === act)) setAct(m[0].dataset.id);
    if (m[0] && innerWidth <= 860) deck.scrollTo({ left: m[0].offsetLeft - deck.offsetLeft - parseFloat(getComputedStyle(deck).paddingLeft), behavior: 'smooth' });
  }));

  // móvil: la foto pasa a color al centrarse y los puntos marcan la posición
  const dots = $$('#dots i');
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    const pr = $('.portrait', e.target);
    if (e.isIntersecting) {
      pr.classList.add('color');
      dots.forEach((d, j) => d.classList.toggle('on', j === arts.indexOf(e.target)));
    } else if (e.target.dataset.hasImg) pr.classList.remove('color');
  }), { root: deck, threshold: 0.6 });
  arts.forEach((a) => { if (a.dataset.hasImg) $('.portrait', a).classList.remove('color'); io.observe(a); });

  // /equipo/#valeria abre directamente esa ficha
  const fromHash = location.hash.slice(1);
  setAct(arts.some((a) => a.dataset.id === fromHash) ? fromHash : arts[0].dataset.id);
  if (fromHash && innerWidth <= 860) {
    const a = arts.find((x) => x.dataset.id === fromHash);
    a && deck.scrollTo({ left: a.offsetLeft - deck.offsetLeft - 24 });
  }
}
