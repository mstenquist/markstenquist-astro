import {createClient} from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const homepageData = {
  _type: 'homepage',
  title: 'Homepage Content',
  heroSection: {
    profileImage: {
      // Note: You'll need to upload the image through Sanity Studio
      // This is a placeholder that references the existing image
      alt: 'Mark Stenquist - Frontend Engineer and Co-founder of VisualBoston'
    },
    greeting: "I'm Mark",
    subtitle: "Co-founder at VisualBoston and senior frontend engineer with 15+ years helping shape experiences on the web."
  },
  storySection: {
    content: [
      {
        _type: 'block',
        _key: 'story1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'story1span1',
            text: 'I began my career at a startup called '
          },
          {
            _type: 'span',
            _key: 'story1span2',
            text: 'CampusLIVE',
            marks: [{
              _type: 'link',
              href: 'https://techcrunch.com/2011/04/25/campuslive-raises-3-1-million-to-help-brands-connect-with-college-students/',
              blank: true
            }]
          },
          {
            _type: 'span',
            _key: 'story1span3',
            text: '. My older brother was the founder and I was part of the small team that helped grow the company, eventually going on to raise millions from some prominent venture capital firms. This early experience taught me how to design and build products while navigating the chaos of startup life in 2010. Through this experience I got a crash course in web design and development due to my love for all things design and technology.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'story2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'story2span1',
            text: 'In 2013, I joined a Google Ventures backed startup called '
          },
          {
            _type: 'span',
            _key: 'story2span2',
            text: 'CustomMade',
            marks: [{
              _type: 'link',
              href: 'https://venturebeat.com/entrepreneur/custom-goods-marketplace-custommade-cooks-up-18m-from-google-atlas-others/',
              blank: true
            }]
          },
          {
            _type: 'span',
            _key: 'story2span3',
            text: ' where I honed my JavaScript skills to create beautiful interfaces for interactions between the maker and buyer. There I was fortunate enough to work under the leadership of Mike Salguero (Now CEO and founder of Butcher Box). When that chapter closed in 2015, instead of taking a job at Wayfair I ventured out as an independent consultant, primarily serving Boston-based startups. This period was incredibly rewarding, I met a ton of new people, expanded my network and got to work on some really interesting challenges. Some of these early companies include: Love Pop, Booster, BevSpot, SessionM, Quilt, Mable, VentureApp (Now HqO) etc.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'story3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'story3span1',
            text: 'During the COVID lockdown, these experiences and connections led me to co-found '
          },
          {
            _type: 'span',
            _key: 'story3span2',
            text: 'VisualBoston',
            marks: [{
              _type: 'link',
              href: 'https://visualboston.com',
              blank: true
            }]
          },
          {
            _type: 'span',
            _key: 'story3span3',
            text: ', where I lead the engineering side of our digital agency.'
          }
        ]
      }
    ]
  },
  technicalSection: {
    title: 'Technical Foundation',
    icon: '💻',
    content: [
      {
        _type: 'block',
        _key: 'tech1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'tech1span1',
            text: 'My expertise lies in frontend engineering (HTML, CSS, JavaScript), developed through multiple roles at venture-backed startups. I\'m passionate about creating digital products that combine thoughtful design with high-quality engineering.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'tech2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'tech2span1',
            text: 'I\'m obsessed with combining my deep technical experience developing user interfaces with generative AI to rapidly prototype and build new app ideas.'
          }
        ]
      }
    ]
  },
  beyondTechSection: {
    title: 'Beyond Technology',
    icon: '🌱',
    content: [
      {
        _type: 'block',
        _key: 'beyond1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'beyond1span1',
            text: 'When I\'m not building digital experiences, you\'ll find me working in the garden. I hold a Permaculture Design Certificate and would love to see a world that values transforming landscapes into thriving ecosystems that provide fresh food for family, friends, and neighbors.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'beyond2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'beyond2span1',
            text: 'I also play guitar to unwind and find creative inspiration offline.'
          }
        ]
      }
    ],
    ctaButton: {
      text: 'Explore My Garden',
      href: '/garden'
    }
  },
  ctaSection: {
    title: 'Ready to Work Together?',
    description: 'Whether you need frontend architecture consulting or want to explore what VisualBoston can do for your project, let\'s start the conversation.',
    primaryButton: {
      text: 'View My Services',
      href: '/services'
    },
    secondaryButton: {
      text: 'Get In Touch',
      href: '/contact'
    }
  }
}

async function importHomepageContent() {
  try {
    // Check if homepage content already exists
    const existing = await client.fetch('*[_type == "homepage"][0]')
    
    if (existing) {
      console.log('Homepage content already exists. Updating existing document...')
      const result = await client.patch(existing._id).set(homepageData).commit()
      console.log('Homepage content updated successfully:', result._id)
    } else {
      console.log('Creating new homepage content...')
      const result = await client.create(homepageData)
      console.log('Homepage content created successfully:', result._id)
    }
    
    console.log('\nNext steps:')
    console.log('1. Go to your Sanity Studio (/studio or /admin)')
    console.log('2. Find the "Homepage" document')
    console.log('3. Upload your profile image in the Hero Section')
    console.log('4. Review and edit the content as needed')
    
  } catch (error) {
    console.error('Error importing homepage content:', error)
  }
}

importHomepageContent()