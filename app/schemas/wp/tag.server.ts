import { z } from 'zod'

export const TagSchema = z.object({
  id: z.number(),
  name: z.string(),
  link: z.string().url(),
  slug: z.string(),
  taxonomy: z.string()
})
