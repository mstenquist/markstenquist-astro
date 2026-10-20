// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import { createClient } from '@sanity/client';

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// Last-modified dates for the sitemap, keyed by post path.
const postDates = PUBLIC_SANITY_PROJECT_ID
	? await createClient({ projectId: PUBLIC_SANITY_PROJECT_ID, dataset: PUBLIC_SANITY_DATASET || 'production', apiVersion: '2025-01-01', useCdn: false })
			.fetch(`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{ "path": "/blog/" + slug.current + "/", "date": coalesce(updatedAt, publishedAt) }`)
			.then((posts) => new Map(posts.map((post) => [post.path, post.date])))
	: new Map();

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
		sitemap({
			filter: (page) => !page.includes('/admin'),
			serialize(item) {
				const date = postDates.get(new URL(item.url).pathname);
				return date ? { ...item, lastmod: new Date(date).toISOString() } : item;
			},
		}),
	],
	vite: {
		// Sanity Studio's GROQ engine uses top-level await, which Vite's default browser target rejects.
		optimizeDeps: { esbuildOptions: { target: 'es2022' } },
		build: { target: 'es2022' },
	},
});
