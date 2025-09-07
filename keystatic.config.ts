// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description',
          description: 'Brief description of the blog post for SEO and previews',
        }),
        pubDate: fields.date({
          label: 'Publication Date',
          description: 'When this post was published',
        }),
        heroImage: fields.image({
          label: 'Hero Image',
          description: 'Featured image for the blog post',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        content: fields.mdx({
          label: 'Content',
        }),
      },
    }),
    work: collection({
      label: 'Case Studies',
      slugField: 'title',
      path: 'src/content/work/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.text({
          label: 'Category',
          description: 'Technology category (e.g., React & AI/ML)',
        }),
        description: fields.text({
          label: 'Description',
          description: 'Brief description of the project',
        }),
        challenge: fields.text({
          label: 'Challenge',
          description: 'The challenge that needed to be solved',
          multiline: true,
        }),
        solution: fields.text({
          label: 'Solution',
          description: 'How the challenge was addressed',
          multiline: true,
        }),
        website: fields.text({
          label: 'Website',
          description: 'Optional website URL for the project',
        }),
        order: fields.integer({
          label: 'Order',
          description: 'Display order (lower numbers appear first)',
          defaultValue: 0,
        }),
        content: fields.mdx({
          label: 'Content',
        }),
      },
    }),
  },
});