import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'work',
  title: 'Work / Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. React & TypeScript, Marketing Website',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief project description',
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 3,
      description: 'What problem needed to be solved',
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'text',
      rows: 3,
      description: 'How you solved the challenge',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main image for the case study card',
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
      description: 'Link to the live project',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'completedAt',
      title: 'Completed Date',
      type: 'date',
    }),
    defineField({
      name: 'body',
      title: 'Case Study Content',
      type: 'blockContent',
      description: 'Detailed case study content',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which work appears (lower numbers first)',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project on the homepage',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'featuredImage',
    },
    prepare(selection) {
      const {category} = selection
      return {...selection, subtitle: category}
    },
  },
})