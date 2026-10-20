import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes, singletonTypes } from './sanity/schemaTypes';

// The embedded Studio reads Astro's import.meta.env; the Sanity CLI runs in Node and reads process.env.
const env = { ...(typeof process !== 'undefined' ? process.env : {}), ...(import.meta.env ?? {}) };
const projectId = env.PUBLIC_SANITY_PROJECT_ID;
const dataset = env.PUBLIC_SANITY_DATASET ?? 'production';

const singletons = [
	{ type: 'siteSettings', title: 'Site settings' },
	{ type: 'homePage', title: 'Home page' },
	{ type: 'workPage', title: 'Work page' },
	{ type: 'blogPage', title: 'Writing page' },
];

export default defineConfig({
	name: 'default',
	title: 'markstenquist.com',
	projectId,
	dataset,
	plugins: [
		structureTool({
			structure: (S) =>
				S.list()
					.title('Content')
					.items([
						...singletons.map(({ type, title }) =>
							S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type).title(title)),
						),
						S.divider(),
						S.documentTypeListItem('post').title('Blog posts'),
						S.documentTypeListItem('project').title('Projects'),
					]),
		}),
		visionTool(),
	],
	schema: {
		types: schemaTypes,
		// Singletons are opened from the list above, never created from "New document".
		templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
	},
	document: {
		actions: (actions, { schemaType }) =>
			singletonTypes.includes(schemaType)
				? actions.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
				: actions,
	},
});
