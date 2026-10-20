// schema.org JSON-LD for the site. Every page carries the Person and WebSite
// nodes; pages add their own nodes, which point back at these by @id.
import { urlFor, type PostSummary, type SiteSettings } from './sanity';

type Node = Record<string, unknown>;

export function siteNodes(settings: SiteSettings, site: URL): Node[] {
	const origin = site.origin;
	const sameAs = (settings.socials ?? []).map((link) => link.href).filter((href) => href.startsWith('http'));
	return [
		{
			'@type': 'Person',
			'@id': `${origin}/#person`,
			name: settings.name,
			url: `${origin}/`,
			jobTitle: 'Co-founder and Lead Engineer',
			description: settings.seoDescription,
			...(settings.photo?.asset ? { image: urlFor(settings.photo).width(512).height(512).url() } : {}),
			...(settings.email ? { email: `mailto:${settings.email}` } : {}),
			worksFor: { '@type': 'Organization', name: 'VisualBoston', url: 'https://visualboston.com' },
			address: { '@type': 'PostalAddress', addressLocality: 'Westwood', addressRegion: 'MA', addressCountry: 'US' },
			knowsAbout: ['Web development', 'AI engineering', 'Product engineering', 'Gardening'],
			sameAs: [...sameAs, 'https://visualboston.com'],
		},
		{
			'@type': 'WebSite',
			'@id': `${origin}/#website`,
			url: `${origin}/`,
			name: settings.name,
			description: settings.seoDescription,
			publisher: { '@id': `${origin}/#person` },
			inLanguage: 'en-US',
		},
	];
}

export function blogNode(posts: PostSummary[], site: URL, name: string, description?: string): Node {
	const origin = site.origin;
	return {
		'@type': 'Blog',
		'@id': `${origin}/blog/#blog`,
		url: `${origin}/blog/`,
		name,
		description,
		author: { '@id': `${origin}/#person` },
		isPartOf: { '@id': `${origin}/#website` },
		blogPost: posts.map((post) => ({
			'@type': 'BlogPosting',
			headline: post.title,
			url: `${origin}/blog/${post.slug}/`,
			datePublished: post.publishedAt,
		})),
	};
}

export function postNodes(post: PostSummary, site: URL, image: string): Node[] {
	const origin = site.origin;
	const url = `${origin}/blog/${post.slug}/`;
	return [
		{
			'@type': 'BlogPosting',
			'@id': `${url}#post`,
			headline: post.title,
			description: post.description,
			url,
			mainEntityOfPage: url,
			image,
			datePublished: post.publishedAt,
			dateModified: post.updatedAt ?? post.publishedAt,
			wordCount: post.wordCount,
			inLanguage: 'en-US',
			author: { '@id': `${origin}/#person` },
			publisher: { '@id': `${origin}/#person` },
			isPartOf: { '@id': `${origin}/blog/#blog` },
		},
		{
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
				{ '@type': 'ListItem', position: 2, name: 'Writing', item: `${origin}/blog/` },
				{ '@type': 'ListItem', position: 3, name: post.title, item: url },
			],
		},
	];
}
