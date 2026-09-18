import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://www.naturemadeinitaly.it/',
    integrations: [tailwind(), sitemap({
        filter: (page) => !new URL(page).pathname.startsWith('/prove-foto'),
    })],
});
