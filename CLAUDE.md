# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | Action |
|---------|--------|
| `yarn dev` | Start local development server at localhost:4321 |
| `yarn build` | Build production site to ./dist/ |
| `yarn preview` | Preview production build locally |
| `yarn astro check` | Run TypeScript and content collection type checking |

## Architecture Overview

This is Mark Stenquist's personal website built with **Astro 5** and **Tailwind CSS**. The site serves as a professional portfolio showcasing frontend engineering services and includes a blog and garden photography section.

### Key Technologies
- **Astro 5**: Static site generator with component islands architecture
- **Tailwind CSS**: Utility-first CSS framework with custom base font size (18px)
- **MDX**: Markdown with React components for blog content
- **TypeScript**: Type checking enabled

### Site Structure
- **Homepage**: Professional introduction and services overview
- **About**: Detailed background and expertise
- **Services**: Consulting offerings
- **Work**: Portfolio showcase 
- **Contact**: Contact information and forms
- **Blog**: Technical articles using Astro content collections
- **Garden**: Photo gallery with pagination for permaculture documentation

### Component Architecture

**Layout Components:**
- `BaseHead.astro`: Meta tags, OpenGraph, Twitter cards, and SEO
- `Header.astro`: Fixed navigation with scroll-triggered hand emoji animation
- `Footer.astro`: Site-wide footer
- `BlogPost.astro`: Layout for blog content with formatted dates

**UI Components:**
- `Button.astro`: Reusable button with primary/secondary variants
- `HeaderLink.astro`: Navigation link styling
- `FormattedDate.astro`: Date formatting utility
- `Pagination.astro`: Gallery pagination component

**Global Configuration:**
- Site constants in `src/consts.ts` (SITE_TITLE, SITE_DESCRIPTION)
- Global styles in `src/styles/global.css` (Tailwind imports only)
- Tailwind config extends base font size to 18px/28px line-height

### Content Management
- Blog posts in `src/content/blog/` as Markdown files
- Content collections configured for type-safe frontmatter
- RSS feed and sitemap automatically generated

### Special Features
- **Scroll Animation**: Header shows/hides hand emoji (👋) when scrolling past hero section
- **Responsive Design**: Mobile-first approach with consistent max-width containers (`max-w-6xl`)
- **Performance Optimized**: Font preloading, optimized images, Lighthouse 100/100
- **SEO Ready**: Canonical URLs, structured meta data, sitemap, RSS feed

### Development Notes
- All pages use `max-w-6xl` container width for consistency
- Components follow Astro's `.astro` single-file component format
- Styling primarily uses Tailwind utility classes with minimal custom CSS
- TypeScript interfaces defined inline within components
- Content collections used for blog posts with automatic type generation