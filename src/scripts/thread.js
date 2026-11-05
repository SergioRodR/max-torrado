// Dibuja la línea dorada por las secciones de la home y la revela con el scroll.
// Cada tramo sale y llega en vertical, así todas las uniones son curvas continuas.
import { $, $$, RM } from './dom.js';

let tLen = 0;
let ready = false;

function draw() {
  const path = $('#threadPath');
  if (!path || !tLen) return;
  const box = $('#thread');
  const p = RM ? 1 : Math.min(1, Math.max(0, (scrollY + innerHeight * 0.7) / box.clientHeight));
  path.style.strokeDashoffset = tLen * (1 - p);
  const pt = path.getPointAtLength(tLen * p);
  const tip = $('#threadTip');
  tip.setAttribute('cx', pt.x);
  tip.setAttribute('cy', pt.y);
}

export function buildThread() {
  const path = $('#threadPath');
  if (!path) return;
  const main = $('main'), box = $('#thread'), svg = $('#threadSvg');
  const W = main.clientWidth, H = main.scrollHeight;
  box.style.height = H + 'px';
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const mob = W < 700, edge = mob ? 10 : W * 0.05, mTop = main.getBoundingClientRect().top;
  const pts = [[W * 0.62, innerHeight * 0.55]];
  $$('main section').slice(1).forEach((s0, i) => {
    const s = s0.parentElement.classList.contains('pin-spacer') ? s0.parentElement : s0;
    const top = s.getBoundingClientRect().top - mTop;
    const y = top + (i % 2 ? s.offsetHeight * 0.35 : s.offsetHeight * 0.15);
    if (y > pts[pts.length - 1][1] + 120) pts.push([i % 2 ? edge : W - edge, y]);
  });
  pts.push([W * 0.5, H - 10]);
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [a, b] = pts[i - 1], [c, e] = pts[i], h = e - b;
    const loop = !mob && i % 3 === 1 && Math.abs(c - a) > W * 0.4;
    const k = loop ? h * 1.15 : h * 0.5;
    d += ` C${a.toFixed(1)},${(b + k).toFixed(1)} ${c.toFixed(1)},${(e - k).toFixed(1)} ${c.toFixed(1)},${e.toFixed(1)}`;
  }
  path.setAttribute('d', d);
  tLen = path.getTotalLength();
  path.style.strokeDasharray = tLen;
  draw();
  if (!ready) {
    ready = true;
    addEventListener('scroll', draw, { passive: true });
    let rt;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(buildThread, 200); });
    addEventListener('load', buildThread);
    document.fonts && document.fonts.ready.then(buildThread);
  }
}
