// Mapa nombre → imagen importada (Astro las optimiza y genera tamaños responsivos).
const files = import.meta.glob('../assets/img/*.webp', { eager: true, import: 'default' });
export const IMG = Object.fromEntries(
  Object.entries(files).map(([p, m]) => [p.split('/').pop().replace('.webp', ''), m])
);
