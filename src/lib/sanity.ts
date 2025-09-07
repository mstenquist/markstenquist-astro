import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: import.meta.env.MODE === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper functions for common queries
export async function getBlogPosts() {
  return await client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      publishedAt,
      heroImage,
      tags
    }
  `)
}

export async function getBlogPost(slug: string) {
  return await client.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      publishedAt,
      heroImage,
      body,
      tags
    }
  `, {slug})
}

export async function getWorkProjects() {
  return await client.fetch(`
    *[_type == "work"] | order(order asc) {
      _id,
      title,
      slug,
      category,
      description,
      challenge,
      solution,
      featuredImage,
      website,
      githubUrl,
      completedAt,
      order,
      featured
    }
  `)
}

export async function getWorkProject(slug: string) {
  return await client.fetch(`
    *[_type == "work" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      client,
      description,
      projectType,
      technologies,
      featuredImage,
      gallery,
      projectUrl,
      githubUrl,
      completedAt,
      body,
      featured
    }
  `, {slug})
}

export async function getServices() {
  return await client.fetch(`
    *[_type == "service"] | order(order asc) {
      _id,
      title,
      slug,
      shortDescription,
      iconColor,
      iconSvg,
      features,
      body,
      order
    }
  `)
}

export async function getSiteSettings() {
  return await client.fetch(`
    *[_type == "siteSettings"][0] {
      title,
      description,
      email,
      phone,
      socialLinks,
      heroSection
    }
  `)
}

export async function getGardenPhotos(limit?: number, offset?: number) {
  const limitClause = limit ? `[${offset || 0}...${(offset || 0) + limit}]` : ''
  return await client.fetch(`
    *[_type == "gardenPhoto"] | order(order asc, dateTaken desc)${limitClause} {
      _id,
      title,
      image,
      description,
      dateTaken,
      season,
      tags,
      featured,
      order
    }
  `)
}

export async function getGardenPhotoCount() {
  return await client.fetch(`count(*[_type == "gardenPhoto"])`)
}

export async function getHomepageContent() {
  return await client.fetch(`
    *[_type == "homepage"][0] {
      _id,
      title,
      heroSection {
        profileImage,
        greeting,
        subtitle
      },
      storySection {
        content
      },
      technicalSection {
        title,
        icon,
        content
      },
      beyondTechSection {
        title,
        icon,
        content,
        ctaButton {
          text,
          href
        }
      },
      ctaSection {
        title,
        description,
        primaryButton {
          text,
          href
        },
        secondaryButton {
          text,
          href
        }
      }
    }
  `)
}