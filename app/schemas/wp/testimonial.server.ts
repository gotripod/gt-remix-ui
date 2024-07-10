import { z } from 'zod'

export const TestimonialSchema = z.object({
  project_url: z.string().optional(),
  acf: z.object({
    testimonial_body: z.string()
  }),
  title: z.object({
    rendered: z.string()
  })
})
