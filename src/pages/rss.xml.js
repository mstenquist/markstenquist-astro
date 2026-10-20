import rss from '@astrojs/rss';
import { getPosts, getSiteSettings } from '../lib/sanity';

export async function GET(context) {
	const [settings, posts] = await Promise.all([getSiteSettings(), getPosts()]);
	return rss({
		title: settings.seoTitle ?? settings.name,
		description: settings.seoDescription ?? '',
		site: context.site,
		items: posts.map((post) => ({
			title: post.title,
			description: post.description,
			pubDate: new Date(post.publishedAt),
			link: `/blog/${post.slug}/`,
		})),
	});
}
