// Construye rutas internas respetando el `base` (necesario en GitHub Pages).
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const u = (path = '/') => {
  const p = path.startsWith('/') ? path : '/' + path;
  return BASE + p;
};
