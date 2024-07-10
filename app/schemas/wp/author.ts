import { z } from 'zod'

const AuthorSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string().optional(),
  description: z.string(),
  link: z.string().url(),
  slug: z.string(),
  avatar_urls: z.record(z.string().url()),
  meta: z.record(z.unknown()).optional(),
  _links: z.record(z.unknown())
})

export default AuthorSchema
