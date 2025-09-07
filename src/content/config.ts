import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const work = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		category: z.string(),
		description: z.string(),
		challenge: z.string(),
		solution: z.string(),
		order: z.number().optional(),
	}),
});

export const collections = { blog, work };