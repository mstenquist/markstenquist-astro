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

const gardenPhotos = [
  {
    _type: 'gardenPhoto',
    title: 'Early garden development',
    description: 'The beginning stages of our permaculture garden transformation',
    dateTaken: '2024-03-15',
    season: 'spring',
    tags: ['permaculture', 'garden-development', 'early-stage', 'planning'],
    featured: false,
    order: 1,
    image: {
      alt: 'Garden development progress showing initial planning and early plantings'
    }
  },
  {
    _type: 'gardenPhoto',
    title: 'Growing season progress',
    description: 'Mid-season growth showing the garden coming alive',
    dateTaken: '2024-05-20',
    season: 'spring',
    tags: ['growth', 'seasonal-progress', 'spring-growth'],
    featured: true,
    order: 2,
    image: {
      alt: 'Seasonal garden growth with lush green vegetation'
    }
  },
  {
    _type: 'gardenPhoto',
    title: 'Permaculture implementation',
    description: 'Key permaculture design elements taking shape',
    dateTaken: '2024-06-15',
    season: 'summer',
    tags: ['permaculture', 'design-elements', 'implementation'],
    featured: false,
    order: 3,
    image: {
      alt: 'Permaculture design elements including water management and companion plantings'
    }
  },
  {
    _type: 'gardenPhoto',
    title: 'Ecosystem building',
    description: 'The garden ecosystem developing with beneficial insects and wildlife',
    dateTaken: '2024-07-10',
    season: 'summer',
    tags: ['ecosystem', 'wildlife', 'beneficial-insects', 'biodiversity'],
    featured: true,
    order: 4,
    image: {
      alt: 'Garden ecosystem development with diverse plants and wildlife habitats'
    }
  },
  {
    _type: 'gardenPhoto',
    title: 'Garden maturation',
    description: 'Mature garden areas showing established plantings and productivity',
    dateTaken: '2024-08-05',
    season: 'summer',
    tags: ['mature-garden', 'productivity', 'harvest-season'],
    featured: false,
    order: 5,
    image: {
      alt: 'Mature garden areas with established plantings and food production'
    }
  },
  {
    _type: 'gardenPhoto',
    title: 'Current garden state',
    description: 'The latest progress showing the garden at its current stage of development',
    dateTaken: '2024-08-25',
    season: 'summer',
    tags: ['current-state', 'late-summer', 'progress'],
    featured: false,
    order: 6,
    image: {
      alt: 'Latest garden progress showing current state of development'
    }
  }
]

async function createGardenEntries() {
  try {
    console.log('Creating garden photo entries in Sanity...')
    
    // Create all garden photo entries
    const results = await Promise.all(
      gardenPhotos.map(photo => client.create(photo))
    )
    
    console.log(`✅ Successfully created ${results.length} garden photo entries:`)
    results.forEach((result, index) => {
      console.log(`- ${result.title} (ID: ${result._id})`)
    })
    
    console.log('\n📸 Garden photo entries created successfully!')
    console.log('\nNext steps:')
    console.log('1. Go to /studio and navigate to Garden Photo')
    console.log('2. Upload the actual images for each entry:')
    gardenPhotos.forEach((photo, index) => {
      const imageFile = [
        'IMG_1950.jpeg', 'IMG_2027.jpeg', 'IMG_2075.jpeg', 
        'IMG_2338.jpeg', 'IMG_2564.jpeg', 'IMG_2829.jpeg'
      ][index]
      console.log(`   - ${photo.title} → ${imageFile}`)
    })
    
  } catch (error) {
    console.error('Error creating garden entries:', error)
  }
}

createGardenEntries()