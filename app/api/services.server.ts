import type { GTService } from 'types/normalised-responses'
import { z } from 'zod'
import { GTServiceSchema } from '~/schemas/wp/services.server'

export const getServices = async (parent: number | string = ''): Promise<GTService[]> => {
  const response = await fetch(
    `https://content.gotripod.com/wp-json/wp/v2/gt-services/?_embed=1&parent=${parent}`
  )
  const data = await response.json()

  // parse with zod
  const services = z.array(GTServiceSchema).parse(data)

  return services.map((s) => ({
    id: s.id,
    link: s.link,
    parent: s.parent,
    title: s.title.rendered,
    excerpt: s.excerpt.rendered,
    slug: s.slug
  }))
}
