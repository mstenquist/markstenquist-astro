import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
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
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for service cards',
    }),
    defineField({
      name: 'iconColor',
      title: 'Icon Color',
      type: 'string',
      options: {
        list: [
          {title: 'Blue', value: 'blue'},
          {title: 'Purple', value: 'purple'},
          {title: 'Green', value: 'green'},
          {title: 'Orange', value: 'orange'},
          {title: 'Red', value: 'red'},
          {title: 'Indigo', value: 'indigo'},
        ],
      },
      description: 'Color theme for this service',
    }),
    defineField({
      name: 'iconSvg',
      title: 'Icon SVG Path',
      type: 'text',
      description: 'SVG path data for the icon (d attribute)',
      rows: 2,
    }),
    defineField({
      name: 'features',
      title: 'Features / Bullet Points',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of features or deliverables',
    }),
    defineField({
      name: 'body',
      title: 'Detailed Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which services appear',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
    },
  },
})