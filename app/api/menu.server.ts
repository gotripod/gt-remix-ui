import { gql } from '@apollo/client/core'
import type { Menu } from 'types/normalised-responses'
import ac from './apollo.server'

interface MenuGqlResponse {
  menu: {
    menuItems: {
      nodes: Array<{
        label: string
        url: string
      }>
    }
  }
}

export const getMenu = async (): Promise<Menu[]> => {
  const query = gql`
    query {
      menu(id: "dGVybToy") {
        count
        id
        databaseId
        name
        slug
        menuItems {
          nodes {
            id
            databaseId
            title
            url
            cssClasses
            description
            label
            linkRelationship
            target
            parentId
          }
        }
      }
    }
  `

  const gQuery = ac.query<MenuGqlResponse>({ query })

  const response = await gQuery

  const menu = response.data.menu

  return menu.menuItems.nodes.map((x) => {
    return {
      label: x.label,
      url: x.url
    }
  })
}
