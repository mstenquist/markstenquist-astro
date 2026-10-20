/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
	readonly PUBLIC_SANITY_PROJECT_ID: string;
	readonly PUBLIC_SANITY_DATASET: string;
}
