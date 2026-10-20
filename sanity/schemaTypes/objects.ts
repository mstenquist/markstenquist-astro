import { defineArrayMember, defineField, defineType } from 'sanity';

export const link = defineType({
	name: 'link',
	title: 'Link',
	type: 'object',
	fields: [
		defineField({ name: 'label', type: 'string', validation: (rule) => rule.required() }),
		defineField({
			name: 'href',
			title: 'URL or path',
			type: 'string',
			description: 'A full URL (https://…), a site path (/blog) or mailto:',
			validation: (rule) => rule.required(),
		}),
	],
	preview: { select: { title: 'label', subtitle: 'href' } },
});

export const card = defineType({
	name: 'card',
	title: 'Card',
	type: 'object',
	fields: [
		defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
		defineField({ name: 'description', type: 'text', rows: 2 }),
	],
});

export const careerEntry = defineType({
	name: 'careerEntry',
	title: 'Career entry',
	type: 'object',
	fields: [
		defineField({ name: 'year', type: 'string', validation: (rule) => rule.required() }),
		defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
		defineField({ name: 'description', type: 'string' }),
		defineField({
			name: 'current',
			type: 'boolean',
			description: 'Marks this as the latest entry (filled dot).',
			initialValue: false,
		}),
	],
	preview: { select: { title: 'title', subtitle: 'year' } },
});

export const tool = defineType({
	name: 'tool',
	title: 'Tool',
	type: 'object',
	fields: [
		defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
		defineField({ name: 'highlight', type: 'boolean', description: 'Shown in blue.', initialValue: false }),
	],
	preview: { select: { title: 'name' } },
});

export const blockContent = defineType({
	name: 'blockContent',
	title: 'Body',
	type: 'array',
	of: [
		defineArrayMember({
			type: 'block',
			styles: [
				{ title: 'Normal', value: 'normal' },
				{ title: 'Heading', value: 'h2' },
				{ title: 'Subheading', value: 'h3' },
				{ title: 'Pull quote', value: 'blockquote' },
			],
			lists: [
				{ title: 'Bullet', value: 'bullet' },
				{ title: 'Numbered', value: 'number' },
			],
			marks: {
				decorators: [
					{ title: 'Bold', value: 'strong' },
					{ title: 'Italic', value: 'em' },
					{ title: 'Code', value: 'code' },
				],
				annotations: [
					defineArrayMember({
						name: 'link',
						type: 'object',
						title: 'Link',
						fields: [defineField({ name: 'href', type: 'url', validation: (rule) => rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }) })],
					}),
				],
			},
		}),
		defineArrayMember({
			type: 'image',
			options: { hotspot: true },
			fields: [
				defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
				defineField({ name: 'caption', type: 'string' }),
			],
		}),
	],
});
