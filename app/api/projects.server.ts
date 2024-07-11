import type { Project, ProjectListItem } from 'types/normalised-responses'
import { z } from 'zod'
import { keysToCamelDeep } from '~/helpers/keys-to-camel'
import type { ProjectBlockSchema } from '~/schemas/wp/project.server'
import { ProjectListSchema, ProjectSchema } from '~/schemas/wp/project.server'
import { getMediaById } from './media.server'
import { getTestimonialById } from './testimonial.server'

export const getProjects = async (): Promise<ProjectListItem[]> => {
  const response = await fetch(
    'https://content.gotripod.com/wp-json/wp/v2/project?_fields=project_hero,acf.project_logo,acf.project_logo_unhover,acf.project_logo_hover,id,slug,title&orderby=menu_order&order=asc'
  )

  const projects = await response.json()

  const parsedProjects = z.array(ProjectListSchema).parse(projects)

  return parsedProjects.map((p) => ({
    id: p.id,
    logoSpriteUrl: p.acf.project_logo,
    logoUrl: p.acf.project_logo_unhover,
    logoHoverUrl: p.acf.project_logo_hover,
    projectHero: {
      large: {
        src: p.project_hero.large.src,
        srcset: p.project_hero.large.srcset,
        sizes: p.project_hero.large.sizes
      },
      medium: {
        src: p.project_hero.medium.src,
        srcset: p.project_hero.medium.srcset,
        sizes: p.project_hero.medium.sizes
      },
      mediumLarge: {
        src: p.project_hero.medium_large.src,
        srcset: p.project_hero.medium_large.srcset,
        sizes: p.project_hero.medium_large.sizes
      }
    },
    link: p.slug,
    title: p.title.rendered
  }))
}

type Block = z.infer<typeof ProjectBlockSchema>
type TestimonialBlock = Extract<Block, { acf_fc_layout: 'testimonial_block' }>

const isTestimonialBlock = (block: Block): block is TestimonialBlock => {
  return block.acf_fc_layout === 'testimonial_block'
}

export const getProjectBySlug = async (slug: string): Promise<Project> => {
  const response = await fetch(`https://content.gotripod.com/wp-json/wp/v2/project?slug=${slug}`)
  const json = await response.json()

  const posts = z.array(ProjectSchema).parse(json)
  const post = posts[0]

  const heroMedia = await getMediaById(post.acf.project_hero)

  const testimonialBlockIndex = post.acf.project_blocks.findIndex(isTestimonialBlock)

  if (testimonialBlockIndex !== -1) {
    const block = post.acf.project_blocks[testimonialBlockIndex] as TestimonialBlock
    const shallowTestimonialBlockId = block.testimonial.ID

    const testimonial = await getTestimonialById(shallowTestimonialBlockId)

    block.testimonial = {
      ID: block.testimonial.ID,
      quote: testimonial.quote,
      quoteAuthor: testimonial.quoteAuthor,
      projectUrl: testimonial.projectUrl
    }
  }

  return {
    id: post.id,
    title: post.title.rendered,
    blocks: keysToCamelDeep(post.acf.project_blocks),
    heroMedia
  }
}
