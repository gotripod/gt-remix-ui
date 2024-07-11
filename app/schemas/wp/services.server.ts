import { z } from 'zod'

export const GTServiceSchema = z.object({
  id: z.number(),
  parent: z.number(),
  link: z.string(),
  slug: z.string(),
  title: z.object({
    rendered: z.string()
  }),
  excerpt: z.object({
    rendered: z.string()
  })
})
