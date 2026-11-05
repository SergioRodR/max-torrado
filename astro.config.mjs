// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// En GitHub Pages el sitio vive en https://<usuario>.github.io/<repo>/.
// El workflow define SITE_URL y BASE_PATH; en local se usan estos valores.
const site = process.env.SITE_URL || 'https://sergiorodr.github.io';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
