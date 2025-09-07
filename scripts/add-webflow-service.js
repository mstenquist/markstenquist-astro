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

const webflowService = {
  _type: 'service',
  title: 'Design to Webflow Development',
  slug: { current: 'design-to-webflow', _type: 'slug' },
  shortDescription: 'Transform your designs into pixel-perfect, responsive Webflow sites with custom interactions and CMS integration.',
  iconColor: 'indigo',
  iconSvg: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5v14a2 2 0 002 2 2 2 0 002-2V5a2 2 0 00-2-2zM17 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4z',
  features: [
    'Figma/Sketch to Webflow conversion',
    'Custom animations and interactions',
    'Responsive design implementation',
    'CMS setup and content modeling',
    'SEO optimization and performance',
    'Client training and handoff'
  ],
  order: 5
}

async function addWebflowService() {
  try {
    console.log('Adding Webflow service to Sanity...')
    
    const result = await client.create(webflowService)
    
    console.log(`✅ Successfully added service: ${result.title} (ID: ${result._id})`)
    console.log('You can now view it in Sanity Studio at /studio and on your services page!')
    
  } catch (error) {
    console.error('Error adding Webflow service:', error)
  }
}

addWebflowService()