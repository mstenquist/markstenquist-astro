import { sanityClient } from 'sanity:client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import type { PortableTextBlock } from '@portabletext/types';

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
	return builder.image(source).auto('format');
}

export interface Link {
	label: string;
	href: string;
}

export interface Card {
	_key: string;
	title: string;
	description?: string;
}

export interface SanityImage {
	asset?: { _ref: string };
	alt?: string;
}

export interface SiteSettings {
	name: string;
	handle?: string;
	logoMark?: string;
	location?: string;
	email?: string;
	bio?: string;
	photo?: SanityImage;
	seoTitle?: string;
	seoDescription?: string;
	ogImage?: SanityImage;
	nav?: Link[];
	navCta?: Link;
	footerHeading?: string;
	footerButtons?: Link[];
	socials?: Link[];
}

export interface Project {
	_id: string;
	name: string;
	url?: string;
	tag?: string;
	meta?: string;
	summary?: string;
	description?: string;
	status?: 'active' | 'in-progress';
	cardStyle?: 'dark' | 'outline';
	watermark?: string;
	stack?: string[];
}

export interface HomePage {
	eyebrow?: string;
	headline?: string[];
	intro?: string;
	primaryCta?: Link;
	secondaryCta?: Link;
	terminalCommand?: string;
	terminalResult?: string;
	badge?: string;
	nowLabel?: string;
	nowProjects?: Project[];
	interestsKicker?: string;
	interestsHeading?: string;
	interests?: Card[];
	careerKicker?: string;
	careerHeading?: string;
	career?: { _key: string; year: string; title: string; description?: string; current?: boolean }[];
}

export interface PostSummary {
	_id: string;
	title: string;
	slug: string;
	description: string;
	publishedAt: string;
	updatedAt?: string;
	wordCount: number;
}

export interface Post extends PostSummary {
	body?: PortableTextBlock[];
}

export interface WorkPage {
	seoTitle?: string;
	seoDescription?: string;
	kicker?: string;
	headline?: string[];
	intro?: string;
	projects?: Project[];
	servicesKicker?: string;
	servicesHeading?: string;
	services?: Card[];
	stackKicker?: string;
	stackHeading?: string;
	stackNote?: string;
	stack?: { _key: string; name: string; highlight?: boolean }[];
	writingKicker?: string;
	writingHeading?: string;
	writingPosts?: PostSummary[];
}

export interface BlogPage {
	seoTitle?: string;
	seoDescription?: string;
	kicker?: string;
	heading?: string;
	intro?: string;
	listKicker?: string;
}

const projectFields = `_id, name, url, tag, meta, summary, description, status, cardStyle, watermark, stack`;
const postFields = `_id, title, "slug": slug.current, description, publishedAt, updatedAt,
	"wordCount": length(string::split(pt::text(body), " "))`;

export async function getSiteSettings(): Promise<SiteSettings> {
	const settings = await sanityClient.fetch<SiteSettings | null>(`*[_id == "siteSettings"][0]`);
	if (!settings) throw new Error('Sanity: the "Site settings" document is missing. Run `npm run seed` or create it in the Studio.');
	return settings;
}

export function getHomePage() {
	return sanityClient.fetch<HomePage | null>(`*[_id == "homePage"][0]{ ..., nowProjects[]->{ ${projectFields} } }`);
}

export function getWorkPage() {
	return sanityClient.fetch<WorkPage | null>(
		`*[_id == "workPage"][0]{ ..., projects[]->{ ${projectFields} }, writingPosts[]->{ ${postFields} } }`,
	);
}

export function getBlogPage() {
	return sanityClient.fetch<BlogPage | null>(`*[_id == "blogPage"][0]`);
}

export function getPosts() {
	return sanityClient.fetch<PostSummary[]>(
		`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc){ ${postFields} }`,
	);
}

export function getPost(slug: string) {
	return sanityClient.fetch<Post | null>(`*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0]{ ${postFields}, body }`, {
		slug,
	});
}

/** Rough reading time at 220 words a minute, never under one minute. */
export function readingTime(words: number) {
	return `${Math.max(1, Math.round(words / 220))} min read`;
}

export function formatDate(date: string, style: 'short' | 'long' = 'long') {
	const [y, m, d] = date.split('-').map(Number);
	return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
		timeZone: 'UTC',
		month: 'short',
		year: 'numeric',
		...(style === 'long' ? { day: 'numeric' } : {}),
	});
}

export function isExternal(href: string) {
	return /^https?:\/\//.test(href);
}

/** Turns heading text into an anchor id for the post's "On this page" list. */
export function slugify(text: string) {
	return text
		.toLowerCase()
		.replace(/['"]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

export function blockText(block: PortableTextBlock) {
	return (block.children as { text?: string }[] | undefined)?.map((child) => child.text ?? '').join('') ?? '';
}
