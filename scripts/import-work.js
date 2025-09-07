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

const workEntries = [
  {
    _type: 'work',
    title: 'Shadow Lion',
    slug: { current: 'shadow-lion', _type: 'slug' },
    category: 'Marketing Website',
    description: 'Designing a new video experience for content creators and viewers',
    challenge: 'Shadow Lion needed to create a revolutionary video platform that could compete with established players while offering unique features for content creators and their audiences.',
    solution: 'Built a responsive video streaming platform with React and React Native. Implemented adaptive bitrate streaming, real-time analytics, and creator monetization tools that differentiated the platform in a crowded market.',
    website: 'https://shadowlion.com',
    order: 2,
    body: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'h2',
        children: [{ _type: 'span', text: 'Project Overview' }]
      },
      {
        _type: 'block',
        _key: 'overview',
        style: 'normal',
        children: [{ _type: 'span', text: 'Shadow Lion revolutionizes the video streaming experience with innovative features designed specifically for content creators seeking to monetize and engage with their audiences.' }]
      },
      {
        _type: 'block',
        _key: 'achievements-title',
        style: 'h2',
        children: [{ _type: 'span', text: 'Key Achievements' }]
      },
      {
        _type: 'block',
        _key: 'achievements',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Developed cross-platform video streaming solution' }]
      },
      {
        _type: 'block',
        _key: 'achievements2',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Implemented adaptive bitrate streaming technology' }]
      },
      {
        _type: 'block',
        _key: 'achievements3',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Built creator monetization tools' }]
      },
      {
        _type: 'block',
        _key: 'achievements4',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: 'Delivered responsive React and React Native architecture' }]
      }
    ]
  },
  {
    _type: 'work',
    title: 'Project Finance (DCU)',
    slug: { current: 'project-finance-dcu', _type: 'slug' },
    category: 'React & TypeScript',
    description: 'Elevating digital banking experiences for credit union members',
    challenge: 'DCU needed to modernize their digital banking platform to compete with fintech startups while maintaining the security and reliability their members expect from a trusted financial institution.',
    solution: 'Developed a modern React and TypeScript banking application with enhanced security features. Created intuitive financial management tools, streamlined loan applications, and mobile-first account management interfaces.',
    website: 'https://dcu.org',
    order: 3,
    body: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'h2',
        children: [{ _type: 'span', text: 'Project Overview' }]
      },
      {
        _type: 'block',
        _key: 'overview',
        style: 'normal',
        children: [{ _type: 'span', text: 'This project transformed DCU\'s digital banking experience, bringing modern fintech capabilities while maintaining the security and trust that credit union members expect.' }]
      }
    ]
  },
  {
    _type: 'work',
    title: 'O2X',
    slug: { current: 'o2x', _type: 'slug' },
    category: 'React & Performance',
    description: 'Optimizing human performance for tactical athletes and first responders',
    challenge: 'O2X needed a comprehensive platform to deliver performance training, mental health resources, and data analytics to military units, fire departments, and law enforcement agencies.',
    solution: 'Developed React-based training dashboards with real-time biometric data integration. Built performance tracking systems that help tactical athletes optimize their physical and mental readiness.',
    website: 'https://o2x.com',
    order: 5,
    body: [
      {
        _type: 'block',
        _key: 'intro',
        style: 'h2',
        children: [{ _type: 'span', text: 'Project Overview' }]
      },
      {
        _type: 'block',
        _key: 'overview',
        style: 'normal',
        children: [{ _type: 'span', text: 'O2X delivers critical performance training and mental health resources to those who serve in high-stress, high-stakes environments including military, fire, and law enforcement personnel.' }]
      }
    ]
  }
]

// Add the other work entries by reading their files
const additionalWork = [
  {
    _type: 'work',
    title: 'Dwight Capital',
    slug: { current: 'dwight-capital', _type: 'slug' },
    category: 'Commercial Real Estate',
    description: 'Commercial real estate lending platform',
    challenge: 'Dwight Capital needed a modern platform to streamline their commercial real estate lending process.',
    solution: 'Built a comprehensive lending platform with automated workflows and data analytics.',
    order: 1
  },
  {
    _type: 'work',
    title: 'Linus Health',
    slug: { current: 'linus-health', _type: 'slug' },
    category: 'Healthcare Technology',
    description: 'Digital brain health assessment platform',
    challenge: 'Linus Health needed to digitize cognitive assessment tools for healthcare providers.',
    solution: 'Developed a React-based platform for digital cognitive assessments with real-time scoring.',
    order: 4
  },
  {
    _type: 'work',
    title: 'FraudNet',
    slug: { current: 'fraudnet', _type: 'slug' },
    category: 'Fintech Security',
    description: 'Financial fraud detection and prevention platform',
    challenge: 'FraudNet needed to build a sophisticated platform to detect and prevent financial fraud.',
    solution: 'Created a React-based dashboard with real-time fraud detection algorithms and analytics.',
    order: 6
  }
]

const allWork = [...workEntries, ...additionalWork]

async function importWork() {
  try {
    console.log('Importing work entries to Sanity...')
    
    // Create all work entries
    const results = await Promise.all(
      allWork.map(work => client.create(work))
    )
    
    console.log(`Successfully imported ${results.length} work entries:`)
    results.forEach(result => {
      console.log(`- ${result.title} (ID: ${result._id})`)
    })
    
    console.log('\nWork entries imported successfully! 🎉')
    console.log('You can now view them in Sanity Studio at /studio')
    
  } catch (error) {
    console.error('Error importing work entries:', error)
  }
}

importWork()