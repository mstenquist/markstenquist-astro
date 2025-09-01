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
  },
});