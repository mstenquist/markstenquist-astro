import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'gardenPhoto',
  title: 'Garden Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image for screen readers',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional detailed description of the photo',
    }),
    defineField({
      name: 'dateTaken',
      title: 'Date Taken',
      type: 'date',
      description: 'When was this photo taken?',
    }),
    defineField({
      name: 'season',
      title: 'Season',
      type: 'string',
      options: {
        list: [
          {title: 'Spring', value: 'spring'},
          {title: 'Summer', value: 'summer'},
          {title: 'Fall', value: 'fall'},
          {title: 'Winter', value: 'winter'},
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Tags like "permaculture", "harvest", "planting", etc.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Photo',
      type: 'boolean',
      description: 'Show this photo prominently',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which photos appear (lower numbers first)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      season: 'season',
    },
    prepare(selection) {
      const {season} = selection
      return {...selection, subtitle: season ? `${season} photo` : 'Garden photo'}
    },
  },
  orderings: [
    {
      title: 'Date Taken, Newest',
      name: 'dateTakenDesc',
      by: [{field: 'dateTaken', direction: 'desc'}],
    },
    {
      title: 'Display Order',
      name: 'orderAsc', 
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})