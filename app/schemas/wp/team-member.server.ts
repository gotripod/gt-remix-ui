import { z } from 'zod'

const guidSchema = z.object({
  rendered: z.string().url()
})

const titleSchema = z.object({
  rendered: z.string()
})

const acfSchema = z.object({
  team_member_image: z.number(),
  team_member_position: z.string()
})

const robotsSchema = z.object({
  index: z.string(),
  follow: z.string(),
  'max-snippet': z.string(),
  'max-image-preview': z.string(),
  'max-video-preview': z.string()
})

const graphSchema = z.array(
  z.union([
    z.object({
      '@type': z.string(),
      '@id': z.string().url(),
      url: z.string().url(),
      name: z.string(),
      isPartOf: z.object({ '@id': z.string().url() }),
      datePublished: z.coerce.date(),
      dateModified: z.coerce.date(),
      breadcrumb: z.object({ '@id': z.string().url() }),
      inLanguage: z.string(),
      potentialAction: z.array(
        z.object({
          '@type': z.string(),
          target: z.array(z.string().url())
        })
      )
    }),
    z.object({
      '@type': z.string(),
      '@id': z.string().url(),
      itemListElement: z.array(
        z.object({
          '@type': z.string(),
          position: z.number(),
          name: z.string(),
          item: z.string().url().optional()
        })
      )
    }),
    z.object({
      '@type': z.string(),
      '@id': z.string().url(),
      url: z.string().url(),
      name: z.string(),
      description: z.string().optional(),
      potentialAction: z.array(
        z.object({
          '@type': z.string(),
          target: z.object({
            '@type': z.string(),
            urlTemplate: z.string().url()
          }),
          'query-input': z.string()
        })
      ),
      inLanguage: z.string()
    })
  ])
)

const yoastHeadJsonSchema = z.object({
  title: z.string(),
  robots: robotsSchema,
  canonical: z.string().url(),
  og_locale: z.string(),
  og_type: z.string(),
  og_title: z.string(),
  og_url: z.string().url(),
  og_site_name: z.string(),
  article_publisher: z.string().url(),
  article_modified_time: z.coerce.date(),
  twitter_card: z.string(),
  twitter_site: z.string(),
  schema: z.object({
    '@context': z.string().url(),
    '@graph': z.any() // review graphSchema as it was throwing an error
  })
})

const teamMemberImageSchema = z.object({
  ID: z.number(),
  post_author: z.string(),
  post_date: z.coerce.date(),
  post_date_gmt: z.coerce.date(),
  post_content: z.string(),
  post_title: z.string(),
  post_excerpt: z.string(),
  post_status: z.string(),
  comment_status: z.string(),
  ping_status: z.string(),
  post_password: z.string(),
  post_name: z.string(),
  to_ping: z.string(),
  pinged: z.string(),
  post_modified: z.coerce.date(),
  post_modified_gmt: z.coerce.date(),
  post_content_filtered: z.string(),
  post_parent: z.number(),
  guid: z.string().url(),
  menu_order: z.number(),
  post_type: z.string(),
  post_mime_type: z.string(),
  comment_count: z.string(),
  filter: z.string()
})

const linksSchema = z.object({
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

export const TeamMemberSchema = z.object({
  id: z.number(),
  date: z.coerce.date(),
  date_gmt: z.coerce.date(),
  guid: guidSchema,
  modified: z.coerce.date(),
  modified_gmt: z.coerce.date(),
  slug: z.string(),
  status: z.string(),
  type: z.string(),
  link: z.string().url(),
  title: titleSchema,
  template: z.string(),
  acf: acfSchema,
  yoast_head: z.string(),
  yoast_head_json: yoastHeadJsonSchema,
  // team_member_image: z.object({ '168': teamMemberImageSchema }).optional(),
  _links: linksSchema
})
