// Loads the site's starting content into Sanity.
// Run with: npm run seed  (uses your `sanity login` session)
//
// Singletons and projects use fixed ids, so re-running replaces them with this
// file's content. Posts are only created when missing, so edits made in the
// Studio are never overwritten.

import { readFileSync, readdirSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2025-01-01' });
const key = () => randomUUID().slice(0, 12);
const link = (label: string, href: string) => ({ _key: key(), _type: 'link', label, href });
const ref = (id: string) => ({ _key: key(), _type: 'reference', _ref: id });

// --- Markdown → Portable Text (covers what the legacy posts use) ---

type Span = { _type: 'span'; _key: string; text: string; marks: string[] };
type MarkDef = { _key: string; _type: 'link'; href: string };

function inline(text: string) {
	const children: Span[] = [];
	const markDefs: MarkDef[] = [];
	const pattern = /\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)|\*(.+?)\*/g;
	let last = 0;
	for (const match of text.matchAll(pattern)) {
		if (match.index! > last) children.push({ _type: 'span', _key: key(), text: text.slice(last, match.index), marks: [] });
		const [, bold, code, label, href, italic] = match;
		if (bold) children.push({ _type: 'span', _key: key(), text: bold, marks: ['strong'] });
		else if (code) children.push({ _type: 'span', _key: key(), text: code, marks: ['code'] });
		else if (label) {
			const markKey = key();
			markDefs.push({ _key: markKey, _type: 'link', href });
			children.push({ _type: 'span', _key: key(), text: label, marks: [markKey] });
		} else if (italic) children.push({ _type: 'span', _key: key(), text: italic, marks: ['em'] });
		last = match.index! + match[0].length;
	}
	if (last < text.length) children.push({ _type: 'span', _key: key(), text: text.slice(last), marks: [] });
	return { children, markDefs };
}

function block(text: string, style = 'normal', listItem?: 'bullet' | 'number') {
	return {
		_type: 'block',
		_key: key(),
		style,
		...inline(text),
		...(listItem ? { listItem, level: 1 } : {}),
	};
}

function markdownToBlocks(markdown: string) {
	const blocks = [];
	for (const chunk of markdown.trim().split(/\n\s*\n/)) {
		const lines = chunk.split('\n').map((line) => line.trim());
		if (lines.every((line) => /^[-*] /.test(line))) {
			for (const line of lines) blocks.push(block(line.slice(2), 'normal', 'bullet'));
		} else if (lines.every((line) => /^\d+\. /.test(line))) {
			for (const line of lines) blocks.push(block(line.replace(/^\d+\. /, ''), 'normal', 'number'));
		} else if (/^### /.test(lines[0])) {
			blocks.push(block(lines.join(' ').slice(4), 'h3'));
		} else if (/^## /.test(lines[0])) {
			blocks.push(block(lines.join(' ').slice(3), 'h2'));
		} else if (/^> /.test(lines[0])) {
			blocks.push(block(lines.map((line) => line.replace(/^> ?/, '')).join(' '), 'blockquote'));
		} else {
			blocks.push(block(lines.join(' ')));
		}
	}
	return blocks;
}

function parsePost(file: string) {
	const raw = readFileSync(file, 'utf8');
	const [, frontmatter, body] = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)!;
	const field = (name: string) => frontmatter.match(new RegExp(`^${name}:\\s*['"]?(.*?)['"]?$`, 'm'))?.[1];
	const isoDate = (value?: string) => (value ? new Date(`${value} UTC`).toISOString().slice(0, 10) : undefined);
	const slug = basename(file, extname(file));
	return {
		_id: `post-${slug}`,
		_type: 'post',
		title: field('title'),
		slug: { _type: 'slug', current: slug },
		description: field('description'),
		publishedAt: isoDate(field('pubDate')),
		updatedAt: isoDate(field('updatedDate')),
		body: markdownToBlocks(body),
	};
}

// --- Content ---

async function main() {
	const photoFile = join(process.cwd(), 'public/images/mark-feature-photo.jpg');
	const photo = await client.assets.upload('image', readFileSync(photoFile), { filename: 'mark-feature-photo.jpg' });

	const projects = [
		{
			_id: 'project-visualboston',
			_type: 'project',
			name: 'VisualBoston',
			url: 'https://visualboston.com',
			tag: 'agency',
			meta: 'agency · co-founder · 2020–now',
			summary: 'Websites, apps and AI workflows for growing companies.',
			description: 'The agency I co-founded. We design and build websites, apps and AI tools, from early-stage startups to established brands.',
			status: 'active',
			cardStyle: 'dark',
			watermark: 'vb_',
		},
		{
			_id: 'project-gardenmates',
			_type: 'project',
			name: 'GardenMates',
			url: '/engineering',
			tag: 'product',
			summary: 'Matches gardeners with neighbors who have unused yard space.',
			description: 'Matches people who want to grow food with neighbors who have the space. Think Airbnb for garden plots.',
			status: 'in-progress',
			cardStyle: 'outline',
			stack: ['React', 'TypeScript', 'Prisma', 'Neon'],
		},
		{
			_id: 'project-garden-notes',
			_type: 'project',
			name: 'Garden notes',
			url: 'https://gardening.markstenquist.com',
			tag: 'journal',
			summary: "What's growing in Zone 6b, logged by season.",
			status: 'active',
			cardStyle: 'outline',
		},
	];

	const docs = [
		{
			_id: 'siteSettings',
			_type: 'siteSettings',
			name: 'Mark Stenquist',
			handle: 'mark.stenquist',
			logoMark: 'm_',
			location: 'Westwood, MA',
			email: 'mark@stenquist.com',
			bio: 'Co-founder of VisualBoston. Engineer, gardener.',
			photo: { _type: 'image', asset: { _type: 'reference', _ref: photo._id }, alt: 'Mark Stenquist' },
			seoTitle: 'Mark Stenquist | Engineer, founder, gardener',
			seoDescription:
				'Mark Stenquist is an engineer in Westwood, MA and co-founder of VisualBoston, building websites, apps and AI tools.',
			nav: [link('Work', '/engineering'), link('Writing', '/blog'), link('Garden', 'https://gardening.markstenquist.com')],
			navCta: { _type: 'link', label: 'Contact', href: '#contact' },
			footerHeading: 'Say hello.',
			footerButtons: [link('mark@stenquist.com', 'mailto:mark@stenquist.com'), link('LinkedIn ↗', 'https://linkedin.com/in/markstenquist')],
			socials: [link('LinkedIn', 'https://linkedin.com/in/markstenquist'), link('GitHub', 'https://github.com/mstenquist')],
		},
		{
			_id: 'homePage',
			_type: 'homePage',
			eyebrow: 'Mark Stenquist · Westwood, MA',
			headline: ['Engineer,', 'founder,', 'gardener'],
			intro: "I'm Mark. I co-founded VisualBoston, where I lead engineering on websites, apps and AI tools. The rest of the time I'm in the garden.",
			primaryCta: { _type: 'link', label: 'See my work', href: '/engineering' },
			secondaryCta: { _type: 'link', label: 'Read my writing', href: '/blog' },
			terminalCommand: 'ship --to production',
			terminalResult: 'deployed',
			badge: 'Since 2009',
			nowLabel: '~/now — building',
			nowProjects: projects.map((project) => ref(project._id)),
			interestsKicker: '// interests',
			interestsHeading: 'What I spend time on.',
			interests: [
				{ _key: key(), _type: 'card', title: 'Engineering', description: '15+ years of building for the web, from startups to my own agency.' },
				{ _key: key(), _type: 'card', title: 'AI', description: 'Using AI as everyday infrastructure, in client work and my own projects.' },
				{ _key: key(), _type: 'card', title: 'Gardening', description: 'Permaculture and backyard growing in Zone 6b, written up as garden notes.' },
			],
			careerKicker: '// changelog',
			careerHeading: 'Shipping since 2009.',
			career: [
				{ _key: key(), _type: 'careerEntry', year: 'v2011', title: 'CampusLIVE', description: 'Founding team, dorm room to venture-backed.' },
				{ _key: key(), _type: 'careerEntry', year: 'v2013', title: 'CustomMade', description: 'Frontend systems for an artisan marketplace.' },
				{ _key: key(), _type: 'careerEntry', year: 'v2015', title: 'Independent', description: 'Five years with Boston startups.' },
				{ _key: key(), _type: 'careerEntry', year: 'v2020 — latest', title: 'VisualBoston', description: 'Co-founder, leading engineering.', current: true },
			],
		},
		{
			_id: 'workPage',
			_type: 'workPage',
			seoTitle: 'Work',
			seoDescription: 'What Mark Stenquist is building: VisualBoston, GardenMates, AI workflows and web apps.',
			kicker: '// work',
			headline: ['Building for the web', 'since 2009'],
			intro: 'I lead engineering at VisualBoston. These days that means web products and AI workflows, built by a small senior team.',
			projects: projects.slice(0, 2).map((project) => ref(project._id)),
			servicesKicker: '// what i work on',
			servicesHeading: 'The kind of projects I do.',
			services: [
				{ _key: key(), _type: 'card', title: 'AI workflows', description: 'Intake, quoting, search, content and internal tools. Places where AI removes real manual work.' },
				{ _key: key(), _type: 'card', title: 'Web apps', description: 'Auth, payments, dashboards and polished customer flows, end to end.' },
				{ _key: key(), _type: 'card', title: 'Website rebuilds', description: 'Faster pages, cleaner editing, better mobile and technical SEO.' },
			],
			stackKicker: '// stack',
			stackHeading: 'Tools I reach for.',
			stackNote: 'Plus whichever model fits the problem.',
			stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Astro', 'Tailwind', 'Postgres', 'Vercel', 'Sanity', 'Claude', 'OpenAI'].map((name) => ({
				_key: key(),
				_type: 'tool',
				name,
				highlight: name === 'Claude' || name === 'OpenAI',
			})),
			writingKicker: '// related writing',
			writingHeading: 'Notes on how I work.',
		},
		{
			_id: 'blogPage',
			_type: 'blogPage',
			seoTitle: 'Writing',
			seoDescription: 'Notes on engineering, AI and running a small agency.',
			kicker: '// writing',
			heading: 'Writing',
			intro: 'Notes on engineering, AI and running a small agency.',
			listKicker: '// all posts',
		},
	];

	const postsDir = join(process.cwd(), 'scripts/legacy-posts');
	const posts = readdirSync(postsDir)
		.filter((file) => /\.mdx?$/.test(file))
		.map((file) => parsePost(join(postsDir, file)));

	const tx = client.transaction();
	for (const doc of [...projects, ...docs]) tx.createOrReplace(doc);
	for (const post of posts) tx.createIfNotExists(post);
	await tx.commit();

	console.log(`Seeded ${projects.length} projects, ${docs.length} pages and ${posts.length} posts.`);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
