// robots.txt con la URL correcta del sitemap (respeta el base de GitHub Pages).
export function GET({ site }) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const sitemap = new URL(base + '/sitemap-index.xml', site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
