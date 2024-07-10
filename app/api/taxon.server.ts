import { gql } from '@apollo/client/core'
import type { Category, Tag } from 'types/normalised-responses'
import { z } from 'zod'
import { TagSchema } from '~/schemas/wp/tag.server'
import ac from './apollo.server'

interface IReturn {
  categories: {
    edges: Array<{
      node: Category
    }>
  }
}

export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  const gQuery = ac.query<IReturn>({
    query: gql`
      query GetCategory($name: [String]) {
        categories(where: { slug: $name }) {
          edges {
            node {
              id: databaseId
              name
            }
          }
        }
      }
    `,
    variables: { name: slug }
  })

  const response = await gQuery

  return response.data.categories.edges[0].node
}

export const getTagBySlug = async (slug: string): Promise<Tag> => {
  const response = await fetch('https://content.gotripod.com/wp-json/wp/v2/tags?slug=' + slug)
  const tagsJson = await response.json()

  const tags = z.array(TagSchema).parse(tagsJson)

  const tag = tags[0]

  return {
    id: tag.id,
    name: tag.name,
    link: tag.link,
    slug: tag.slug,
    taxonomy: tag.taxonomy
  }
}
