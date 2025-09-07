import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const client = createClient({
  projectId: 'yncpf922',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
})

const updatedPost = {
  title: 'Hello World: Building with Astro + Sanity',
  slug: { current: 'hello-world-astro-sanity', _type: 'slug' },
  description: 'A quick introduction to my new site built with Astro and Sanity CMS.',
  publishedAt: new Date().toISOString(),
  body: [
    {
      _type: 'block',
      _key: 'intro',
      style: 'normal',
      children: [
        { 
          _type: 'span', 
          text: 'Welcome to my new website! I\'ve just finished rebuilding my portfolio using Astro and Sanity CMS, and I\'m excited to share the journey.' 
        }
      ]
    },
    {
      _type: 'block',
      _key: 'why-astro',
      style: 'h2',
      children: [{ _type: 'span', text: 'Why Astro + Sanity?' }]
    },
    {
      _type: 'block',
      _key: 'astro-benefits',
      style: 'normal',
      children: [
        { 
          _type: 'span', 
          text: 'Astro provides incredible performance with its islands architecture, while Sanity gives me a flexible, developer-friendly CMS. Together, they create a powerful foundation for a modern web presence.' 
        }
      ]
    },
    {
      _type: 'block',
      _key: 'features-title',
      style: 'h2',
      children: [{ _type: 'span', text: 'What\'s New' }]
    },
    {
      _type: 'block',
      _key: 'feature1',
      style: 'normal',
      listItem: 'bullet',
      children: [{ _type: 'span', text: 'Dynamic content management with Sanity Studio' }]
    },
    {
      _type: 'block',
      _key: 'feature2',
      style: 'normal',
      listItem: 'bullet', 
      children: [{ _type: 'span', text: 'Lightning-fast performance with Astro\'s static generation' }]
    },
    {
      _type: 'block',
      _key: 'feature3',
      style: 'normal',
      listItem: 'bullet',
      children: [{ _type: 'span', text: 'Seamless image optimization and CDN delivery' }]
    },
    {
      _type: 'block',
      _key: 'feature4',
      style: 'normal',
      listItem: 'bullet',
      children: [{ _type: 'span', text: 'Modern development workflow with TypeScript and Tailwind CSS' }]
    },
    {
      _type: 'block',
      _key: 'conclusion',
      style: 'normal',
      children: [
        { 
          _type: 'span', 
          text: 'This combination allows me to focus on creating great content while maintaining full control over the user experience. Looking forward to sharing more insights on frontend architecture and AI integration!' 
        }
      ]
    }
  ]
}

async function updateBlogPost() {
  try {
    console.log('Finding existing blog post...')
    
    // Find the first blog post
    const existingPosts = await client.fetch('*[_type == "blogPost"] | order(publishedAt desc)')
    
    if (existingPosts.length === 0) {
      console.log('No existing posts found, creating new one...')
      const result = await client.create({
        _type: 'blogPost',
        ...updatedPost
      })
      console.log('Created new blog post:', result.title)
    } else {
      console.log('Updating existing post:', existingPosts[0].title)
      const result = await client
        .patch(existingPosts[0]._id)
        .set(updatedPost)
        .commit()
      console.log('Updated blog post:', result.title)
    }
    
    console.log('\n✅ Blog post updated successfully!')
    console.log('Visit your site to see the new "Hello World" post.')
    
  } catch (error) {
    console.error('Error updating blog post:', error)
  }
}

updateBlogPost()