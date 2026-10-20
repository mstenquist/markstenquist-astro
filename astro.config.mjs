// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
	site: 'https://markstenquist.com',
	integrations: [
		sanity({
			projectId: PUBLIC_SANITY_PROJECT_ID,
			dataset: PUBLIC_SANITY_DATASET || 'production',
			apiVersion: '2025-01-01',
			// The site is built statically, so always read fresh content at build time.
			useCdn: false,
			studioBasePath: '/admin',
		}),
		react(),
		mdx(),
		sitemap({ filter: (page) => !page.includes('/admin') }),
	],
	vite: {
		// Sanity Studio's GROQ engine uses top-level await, which Vite's default browser target rejects.
		optimizeDeps: { esbuildOptions: { target: 'es2022' } },
		build: { target: 'es2022' },
	},
});
