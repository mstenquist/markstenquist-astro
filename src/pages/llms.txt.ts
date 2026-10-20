// A plain-text guide to the site for language models (https://llmstxt.org), built from Sanity.
import type { APIRoute } from 'astro';
import { getHomePage, getPosts, getSiteSettings, getWorkPage, isExternal } from '../lib/sanity';

export const GET: APIRoute = async ({ site }) => {
	const [settings, home, work, posts] = await Promise.all([getSiteSettings(), getHomePage(), getWorkPage(), getPosts()]);
	const abs = (href: string) => (isExternal(href) ? href : new URL(href, site).href);

	const projects = new Map([...(work?.projects ?? []), ...(home?.nowProjects ?? [])].map((project) => [project._id, project]));
	const career = (home?.career ?? []).map((entry) => `- ${entry.year.replace(/^v/, '').replace(/\s*—.*$/, '')}: ${entry.title}${entry.description ? `. ${entry.description}` : ''}`);

	const lines = [
		`# ${settings.name}`,
		'',
		`> ${settings.seoDescription ?? ''}`,
		'',
		home?.intro ?? '',
		'',
		'## Pages',
		'',
		`- [Home](${abs('/')}): who Mark is, what he is building and his career`,
		`- [Work](${abs('/engineering/')}): ${work?.intro ?? 'projects and the kind of work he does'}`,
		`- [Writing](${abs('/blog/')}): notes on engineering, AI and running a small agency`,
		'',
		'## Projects',
		'',
		...[...projects.values()].map(
			(project) => `- ${project.url ? `[${project.name}](${abs(project.url)})` : project.name}: ${project.description ?? project.summary ?? ''}`,
		),
		'',
		'## Writing',
		'',
		...posts.map((post) => `- [${post.title}](${abs(`/blog/${post.slug}/`)}) (${post.publishedAt}): ${post.description}`),
		'',
		'## Career',
		'',
		...career,
		'',
		'## Contact',
		'',
		...(settings.email ? [`- Email: ${settings.email}`] : []),
		...(settings.socials ?? []).map((link) => `- ${link.label}: ${link.href}`),
		'',
	];

	return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
