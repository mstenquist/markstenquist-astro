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

const accessibilityService = {
  _type: 'service',
  title: 'Accessibility Audits & Remediation',
  slug: { current: 'accessibility-audits', _type: 'slug' },
  shortDescription: 'Comprehensive WCAG compliance audits and remediation services to ensure your website is accessible to all users, including those with disabilities.',
  iconColor: 'red',
  iconSvg: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM13 19h-2v-2h2v2zM15.07 11.25l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z',
  features: [
    'WCAG 2.1 AA/AAA compliance assessment',
    'Screen reader compatibility testing',
    'Keyboard navigation evaluation',
    'Color contrast and visual accessibility',
    'Automated and manual testing protocols',
    'Detailed remediation roadmap',
    'Implementation support and training',
    'Legal compliance documentation'
  ],
  order: 6
}

async function addAccessibilityService() {
  try {
    console.log('Adding Accessibility Audit service to Sanity...')
    
    const result = await client.create(accessibilityService)
    
    console.log(`✅ Successfully added service: ${result.title} (ID: ${result._id})`)
    console.log('You can now view it in Sanity Studio at /studio and on your services page!')
    
  } catch (error) {
    console.error('Error adding Accessibility service:', error)
  }
}

addAccessibilityService()