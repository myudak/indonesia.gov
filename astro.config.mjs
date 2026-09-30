import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Canonical domain: used for absolute og:image/canonical URLs and the sitemap
  site: 'https://indonesia.gov.myudak.com',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
