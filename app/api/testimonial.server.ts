import type { Testimonial } from 'types/normalised-responses'
import { z } from 'zod'
import { TestimonialSchema } from '~/schemas/wp/testimonial.server'

export const getTestimonial = async (): Promise<Testimonial> => {
  const response = await fetch(
    'https://content.gotripod.com/wp-json/wp/v2/testimonial?per_page=1&orderby=rand'
  )

  if (response.status !== 200) {
    console.error(await response.text())
  }
  try {
    const json = await response.json()

    const testimonials = z.array(TestimonialSchema).parse(json)

    const testimonial = testimonials[0]

    return {
      projectUrl: testimonial.project_url || '',
      quote: testimonial.acf.testimonial_body,
      quoteAuthor: testimonial.title.rendered
    }
  } catch (e) {
    console.error('getTestimonial error', e)
    return {
      projectUrl: '',
      quote: '',
      quoteAuthor: ''
    }
  }
}

export const getTestimonialById = async (testimonialId: number): Promise<Testimonial> => {
  const response = await fetch(
    `https://content.gotripod.com/wp-json/wp/v2/testimonial/${testimonialId}`
  )

  const json = await response.json()

  const testimonial = TestimonialSchema.parse(json)
  return {
    projectUrl: testimonial.project_url || '',
    quote: testimonial.acf.testimonial_body,
    quoteAuthor: testimonial.title.rendered
  }
}
