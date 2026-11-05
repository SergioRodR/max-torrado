// Utilidades compartidas por los scripts del sitio.
export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
export const WA = 'https://wa.me/525531403795?text=';
