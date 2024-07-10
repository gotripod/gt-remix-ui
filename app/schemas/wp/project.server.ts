import { z } from 'zod'

export const ProjectListSchema = z.object({
  id: z.number(),
  acf: z.object({
    project_logo: z.string().url(),
    project_logo_unhover: z.string().url(),
    project_logo_hover: z.string().url()
  }),
  slug: z.string(),
  title: z.object({
    rendered: z.string()
  })
})

const mediaSizeSchema = z.object({
  ID: z.number(),
  id: z.number(),
  title: z.string(),
  filename: z.string(),
  filesize: z.number(),
  url: z.string().url(),
  link: z.string().url(),
  alt: z.string(),
  author: z.string(),
  description: z.string().optional(),
  caption: z.string().optional(),
  name: z.string(),
  status: z.string(),
  uploaded_to: z.number(),
  date: z.string(),
  modified: z.string(),
  menu_order: z.number(),
  mime_type: z.string(),
  type: z.string(),
  subtype: z.string(),
  icon: z.string().url(),
  width: z.number(),
  height: z.number(),
  sizes: z.object({
    thumbnail: z.string().url(),
    'thumbnail-width': z.number(),
    'thumbnail-height': z.number(),
    medium: z.string().url(),
    'medium-width': z.number(),
    'medium-height': z.number(),
    medium_large: z.string().url(),
    'medium_large-width': z.number(),
    'medium_large-height': z.number(),
    large: z.string().url(),
    'large-width': z.number(),
    'large-height': z.number(),
    '1536x1536': z.string().url(),
    '1536x1536-width': z.number(),
    '1536x1536-height': z.number(),
    '2048x2048': z.string().url(),
    '2048x2048-width': z.number(),
    '2048x2048-height': z.number()
  })
})

export const ProjectBlockSchema = z.union([
  z.object({
    acf_fc_layout: z.literal('intro_block'),
    block_body: z.string()
  }),
  z.object({
    acf_fc_layout: z.literal('title_block'),
    block_title: z.string(),
    block_body: z.string()
  }),
  z.object({
    acf_fc_layout: z.literal('gallery_block'),
    block_gallery: z.array(mediaSizeSchema),
    block_note: z.string().optional()
  }),
  z.object({
    acf_fc_layout: z.literal('testimonial_block'),
    testimonial: z.object({
      ID: z.number()
    })
  }),
  z.object({
    acf_fc_layout: z.literal('precis_block'),
    service_list: z.array(z.object({ item_body: z.string() })),
    technology_list: z.array(z.object({ item_body: z.string() })),
    link_list: z.boolean().nullable()
  })
])

export const ProjectSchema = z.object({
  id: z.number(),
  date: z.string(),
  date_gmt: z.string(),
  guid: z.object({
    rendered: z.string().url()
  }),
  modified: z.string(),
  modified_gmt: z.string(),
  slug: z.string(),
  status: z.string(),
  type: z.string(),
  link: z.string().url(),
  title: z.object({
    rendered: z.string()
  }),
  menu_order: z.number(),
  template: z.string(),
  acf: z.object({
    project_hero: z.number(),
    project_logo: z.string().url(),
    project_blocks: z.array(ProjectBlockSchema),
    project_logo_hover: z.string().url(),
    project_logo_unhover: z.string().url(),
    section_title: z.string(),
    section_subtitle: z.string(),
    section_body: z.string()
  }),
  yoast_head: z.string(),
  yoast_head_json: z.object({
    title: z.string(),
    robots: z.object({
      index: z.string(),
      follow: z.string(),
      'max-snippet': z.string(),
      'max-image-preview': z.string(),
      'max-video-preview': z.string()
    }),
    canonical: z.string().url(),
    og_locale: z.string(),
    og_type: z.string(),
    og_title: z.string(),
    og_url: z.string().url(),
    og_site_name: z.string(),
    article_publisher: z.string().url(),
    article_modified_time: z.string(),
    twitter_card: z.string(),
    twitter_site: z.string(),
    schema: z.object({
      '@context': z.string().url(),
      '@graph': z.array(
        z.union([
          z.object({
            '@type': z.literal('WebPage'),
            '@id': z.string().url(),
            url: z.string().url(),
            name: z.string(),
            isPartOf: z.object({ '@id': z.string().url() }),
            datePublished: z.string(),
            dateModified: z.string(),
            breadcrumb: z.object({ '@id': z.string().url() }),
            inLanguage: z.string(),
            potentialAction: z.array(
              z.object({ '@type': z.literal('ReadAction'), target: z.array(z.string().url()) })
            )
          }),
          z.object({
            '@type': z.literal('BreadcrumbList'),
            '@id': z.string().url(),
            itemListElement: z.array(
              z.object({
                '@type': z.literal('ListItem'),
                position: z.number(),
                name: z.string(),
                item: z.string().url()
              })
            )
          }),
          z.object({
            '@type': z.literal('WebSite'),
            '@id': z.string().url(),
            url: z.string().url(),
            name: z.string(),
            description: z.string().optional(),
            potentialAction: z.array(
              z.object({
                '@type': z.literal('SearchAction'),
                target: z.object({
                  '@type': z.literal('EntryPoint'),
                  urlTemplate: z.string().url()
                }),
                'query-input': z.string()
              })
            ),
            inLanguage: z.string()
          })
        ])
      )
    })
  }),
  _links: z.object({
    self: z.array(z.object({ href: z.string().url() })),
    collection: z.array(z.object({ href: z.string().url() })),
    about: z.array(z.object({ href: z.string().url() })),
    'wp:attachment': z.array(z.object({ href: z.string().url() })),
    curies: z.array(
      z.object({
        name: z.string(),
        href: z.string().url(),
        templated: z.boolean()
      })
    )
  })
})
