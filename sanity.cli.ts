import { defineCliConfig } from 'sanity/cli';
import { loadEnv } from 'vite';

// Share the Astro site's .env so `sanity` commands target the same project.
const env = { ...loadEnv('production', process.cwd(), 'PUBLIC_'), ...process.env };

export default defineCliConfig({
	api: {
		projectId: env.PUBLIC_SANITY_PROJECT_ID,
		dataset: env.PUBLIC_SANITY_DATASET ?? 'production',
	},
});
