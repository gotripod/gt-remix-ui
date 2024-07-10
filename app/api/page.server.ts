import { gql } from '@apollo/client/core'
import type { Page } from 'types/normalised-responses'
import ac from './apollo.server'

interface PageGqlResponse {
  page: {
    seo: {
      title: string
      fullHead: string
      metaDesc: string
      metaKeywords: string
    }
    title: string
    date: string
    content: string
    link: string
    section: {
      sectionBody: string
      sectionSubtitle: string
      sectionTitle: string
    }
    hero: {
      subTitle: string
      heroImage: GQLMediaItem
    }
  }
}

export const getPageBySlug = async (slug: string): Promise<Page | null> => {
  // console.debug('Getting page with slug', slug)

  // // Some pages (such as insights) may not have the section_body acf field
  // const body = page.acf?.section_body ? he.decode(page.acf.section_body) : ''

  const query = gql`
    query PageQuery($slug: ID!) {
      page(id: $slug, idType: URI) {
        seo {
          title
          fullHead
          metaDesc
          metaKeywords
        }
        title
        date
        content(format: RENDERED)
        link
        section {
          sectionBody
          sectionSubtitle
          sectionTitle
        }
        hero {
          subTitle
          heroImage {
            caption
            altText
            title
            guid
            srcSet
          }
        }
      }
    }
  `

  const gQuery = ac.query<PageGqlResponse>({ query, variables: { slug } })

  const response = await gQuery

  const page = response.data.page
  if (!page) {
    return null
  }
  // console.log('Page fetched', JSON.stringify(page))

  return {
    title: page.title,
    yoastHtml: page.seo.fullHead,
    yoastTitle: page.seo.title,
    yoast: {
      metaDesc: page.seo.metaDesc,
      metaKeywords: page.seo.metaKeywords
    },
    date: page.date,
    body: page.section.sectionBody ? page.section.sectionBody : page.content,
    link: page.link,
    section: {
      body: page.section.sectionBody,
      subtitle: page.section.sectionSubtitle,
      title: page.section.sectionTitle
    },
    subTitle: page.hero.subTitle,
    hero: page.hero.heroImage
  }
}
