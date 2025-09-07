// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
	site: 'https://markstenquist.com',
	output: 'server',
	adapter: vercel(),
	integrations: [mdx(), markdoc(), sitemap(), tailwind(), react(), keystatic()],
});
