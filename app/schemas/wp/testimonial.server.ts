import { z } from 'zod'

export const TestimonialSchema = z.object({
  project_url: z.string().optional(),
  acf: z.object({
    testimonial_body: z.string(),
    testimonial_link: z.any()
  }),
  title: z.object({
    rendered: z.string()
  })
})
