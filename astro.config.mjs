// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
	site: 'https://markstenquist.com',
	integrations: [mdx(), markdoc(), sitemap(), tailwind(), react(), keystatic()],
});
