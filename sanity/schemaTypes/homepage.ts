import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Homepage Content',
      validation: (Rule) => Rule.required(),
    }),
    
    // Hero Section
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'profileImage',
          title: 'Profile Image',
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
              validation: (Rule) => Rule.required(),
            },
          ],
        }),
        defineField({
          name: 'greeting',
          title: 'Greeting (e.g., "I\'m Mark")',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle/Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // Story Section
    defineField({
      name: 'storySection',
      title: 'Story Section',
      type: 'object',
      fields: [
        defineField({
          name: 'content',
          title: 'Story Content',
          type: 'array',
          of: [
            {
              type: 'block',
              marks: {
                annotations: [
                  {
                    name: 'link',
                    type: 'object',
                    title: 'Link',
                    fields: [
                      {
                        name: 'href',
                        type: 'url',
                        title: 'URL',
                      },
                      {
                        name: 'blank',
                        type: 'boolean',
                        title: 'Open in new tab',
                        initialValue: true,
                      },
                    ],
                  },
                ],
              },
            },
          ],
        }),
      ],
    }),

    // Technical Foundation Section
    defineField({
      name: 'technicalSection',
      title: 'Technical Foundation Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Technical Foundation',
        }),
        defineField({
          name: 'icon',
          title: 'Section Icon (emoji)',
          type: 'string',
          initialValue: '💻',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [
            {
              type: 'block',
            },
          ],
        }),
      ],
    }),

    // Beyond Technology Section
    defineField({
      name: 'beyondTechSection',
      title: 'Beyond Technology Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Beyond Technology',
        }),
        defineField({
          name: 'icon',
          title: 'Section Icon (emoji)',
          type: 'string',
          initialValue: '🌱',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [
            {
              type: 'block',
            },
          ],
        }),
        defineField({
          name: 'ctaButton',
          title: 'Call-to-Action Button',
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Button Text',
              initialValue: 'Explore My Garden',
            },
            {
              name: 'href',
              type: 'string',
              title: 'Button Link',
              initialValue: '/garden',
            },
          ],
        }),
      ],
    }),

    // CTA Section
    defineField({
      name: 'ctaSection',
      title: 'Call-to-Action Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'CTA Title',
          type: 'string',
          initialValue: 'Ready to Work Together?',
        }),
        defineField({
          name: 'description',
          title: 'CTA Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Button Text',
              initialValue: 'View My Services',
            },
            {
              name: 'href',
              type: 'string',
              title: 'Button Link',
              initialValue: '/services',
            },
          ],
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button',
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Button Text',
              initialValue: 'Get In Touch',
            },
            {
              name: 'href',
              type: 'string',
              title: 'Button Link',
              initialValue: '/contact',
            },
          ],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'heroSection.profileImage',
    },
  },
})