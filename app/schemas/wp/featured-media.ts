import { z } from 'zod'

const FeaturedMediaSchema = z.object({
  id: z.number(),
  date: z.coerce.date(),
  slug: z.string(),
  type: z.string(),
  link: z.string().url(),
  title: z.object({ rendered: z.string() }),
  author: z.number(),
  caption: z.object({ rendered: z.string() }),
  alt_text: z.string(),
  media_type: z.string(),
  mime_type: z.string(),
  media_details: z.object({
    width: z.number(),
    height: z.number(),
    file: z.string(),
    sizes: z.record(
      z.object({
        file: z.string(),
        width: z.number(),
        height: z.number(),
        mime_type: z.string(),
        source_url: z.string().url()
      })
    ),
    image_meta: z.record(z.unknown())
  }),
  source_url: z.string().url(),
  _links: z.record(z.unknown())
})

export default FeaturedMediaSchema
