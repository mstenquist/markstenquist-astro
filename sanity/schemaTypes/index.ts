import { blogPage, homePage, post, project, siteSettings, workPage } from './documents';
import { blockContent, card, careerEntry, link, tool } from './objects';

export const singletonTypes = ['siteSettings', 'homePage', 'workPage', 'blogPage'];

export const schemaTypes = [
	siteSettings,
	homePage,
	workPage,
	blogPage,
	post,
	project,
	link,
	card,
	careerEntry,
	tool,
	blockContent,
];
