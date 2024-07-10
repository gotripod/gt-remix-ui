import { z } from 'zod'
import AuthorSchema from './author'
import FeaturedMediaSchema from './featured-media'
import TermSchema from './term'

const PostSchema = z.object({
  id: z.number(),
  yoast_head_json: z.object({
    title: z.string(),
    description: z.string()
  }),
  yoast_head: z.string(),
  date: z.coerce.date(),
  date_gmt: z.coerce.date(),
  guid: z.object({
    rendered: z.string().url()
  }),
  modified: z.coerce.date(),
  modified_gmt: z.coerce.date(),
  slug: z.string(),
  status: z.enum(['publish', 'future', 'draft', 'pending', 'private']),
  type: z.string(),
  link: z.string().url(),
  title: z.object({
    rendered: z.string()
  }),
  content: z.object({
    rendered: z.string(),
    protected: z.boolean()
  }),
  excerpt: z.object({
    rendered: z.string(),
    protected: z.boolean()
  }),
  author: z.number(),
  featured_media: z.number(),
  comment_status: z.enum(['open', 'closed']),
  ping_status: z.enum(['open', 'closed']),
  sticky: z.boolean(),
  template: z.string(),
  format: z.enum([
    'standard',
    'aside',
    'chat',
    'gallery',
    'link',
    'image',
    'quote',
    'status',
    'video',
    'audio'
  ]),
  meta: z.record(z.unknown()),
  categories: z.array(z.number()),
  tags: z.array(z.number()),
  _links: z.record(z.unknown()),
  _embedded: z
    .object({
      author: z.array(AuthorSchema),
      'wp:featuredmedia': z.array(FeaturedMediaSchema).optional(),
      'wp:term': z.array(z.array(TermSchema))
    })
    .optional(),
  acf: z.record(z.any()).optional()
})

export default PostSchema
