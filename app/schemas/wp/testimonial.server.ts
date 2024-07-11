import { z } from 'zod'

export const TestimonialSchema = z.object({
  project_url: z.string().optional(),
  acf: z.object({
    testimonial_body: z.string(),
    testimonial_link: z.string().url().optional()
  }),
  title: z.object({
    rendered: z.string()
  })
})
