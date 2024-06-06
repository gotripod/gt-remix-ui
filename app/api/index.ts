/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloClient, gql, InMemoryCache } from '@apollo/client/core'
import he from 'he'
import { keysToCamelDeep } from '~/helpers/keys-to-camel'
import type {
  Category,
  MediaItem,
  Menu,
  Pagination,
  Post,
  Project,
  ProjectListItem,
  Tag,
  Testimonial,
  WPPage
} from '~/types'

const API_URL = 'https://content.gotripod.com/graphql'

const ac = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
})

interface IReturn {
  categories: {
    edges: Array<{
      node: Category
    }>
  }
}

const getCategoryBySlug = async (slug: string): Promise<Category> => {
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

const getTagBySlug = async (slug: string): Promise<Tag> => {
  const response = await fetch('https://content.gotripod.com/wp-json/wp/v2/tags?slug=' + slug)
  const tags = (await response.json()) as any

  const tag = tags[0]

  return {
    id: tag.id,
    name: tag.name,
    link: tag.link,
    slug: tag.slug,
    taxonomy: tag.taxonomy
  }
}

const getTestimonial = async (): Promise<Testimonial> => {
  const response = await fetch(
    'https://content.gotripod.com/wp-json/wp/v2/testimonial?per_page=1&orderby=rand'
  )

  if (response.status !== 200) {
    console.error(await response.text())
  }
  try {
    const testimonials = (await response.json()) as any

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

const getTestimonialById = async (testimonialId: number): Promise<Testimonial> => {
  const response = await fetch(
    `https://content.gotripod.com/wp-json/wp/v2/testimonial/${testimonialId}`
  )

  const testimonial = (await response.json()) as any

  return {
    projectUrl: testimonial.project_url || '',
    quote: testimonial.acf.testimonial_body,
    quoteAuthor: testimonial.title.rendered
  }
}

const getMediaById = async (mediaId: number): Promise<MediaItem> => {
  const response = await fetch(`https://content.gotripod.com/wp-json/wp/v2/media/${mediaId}`)
  const media = (await response.json()) as any

  return media
}

const getProjects = async (): Promise<ProjectListItem[]> => {
  const response = await fetch(
    'https://content.gotripod.com/wp-json/wp/v2/project?_fields=acf.project_logo,acf.project_logo_unhover,acf.project_logo_hover,id,slug,title&orderby=menu_order&order=asc'
  )

  const projects = (await response.json()) as any

  return projects.map((p: any) => ({
    id: p.id,
    logoSpriteUrl: p.acf.project_logo,
    logoUrl: p.acf.project_logo_unhover,
    logoHoverUrl: p.acf.project_logo_hover,
    link: p.slug,
    title: p.title.rendered
  }))
}

const getProjectBySlug = async (slug: string): Promise<Project> => {
  const response = await fetch(`https://content.gotripod.com/wp-json/wp/v2/project?slug=${slug}`)
  const json = (await response.json()) as any
  const post = json[0]

  const heroMedia = await getMediaById(post.acf.project_hero)

  // fetch testimonial body
  const shallowTestimonialIndex = post.acf.project_blocks.findIndex(
    (b: any) => b.acf_fc_layout === 'testimonial_block'
  )

  if (shallowTestimonialIndex !== -1) {
    const shallowTestimonialBlockId =
      post.acf.project_blocks[shallowTestimonialIndex].testimonial.ID

    const testimonial = await getTestimonialById(shallowTestimonialBlockId)

    post.acf.project_blocks[shallowTestimonialIndex].testimonial = testimonial
  }

  return {
    id: post.id,
    title: post.title.rendered,
    blocks: keysToCamelDeep(post.acf.project_blocks),
    heroMedia
  }
}

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

const getPageBySlug = async (slug: string): Promise<WPPage> => {
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

export const getPostPreview = async(id: string, nonce: string): Promise<Post> => {
  console.log('sending nonce', nonce)
  const response = await fetch(
    `https://content.gotripod.com/wp-json/wp/v2/posts${id}?preview=true&_wpnonce=${nonce}&_embed=1`,
    {
      credentials: "include",
      headers: {
        'X-WP-Nonce': nonce
      }
    }
  )
  const json = (await response.json()) as any
  console.log(json)
  return postResponseToPost(json)
}

const getPostBySlug = async (slug: string): Promise<Post> => {
  const response = await fetch(
    `https://content.gotripod.com/wp-json/wp/v2/posts?_embed=1&slug=${slug}`
  )
  const json = (await response.json()) as any
  
  return postResponseToPost(json)
}

const postResponseToPost = async(json: any): Promise<Post> => {
  const post = json[0]
  const teamMemberId = post.acf.article_author.ID
  let teamMemberJson
  if (teamMemberId) {
    const tmUrl = `https://content.gotripod.com/wp-json/wp/v2/team_member/${teamMemberId}`

    const teamMemberResponse = await fetch(tmUrl)
    teamMemberJson = (await teamMemberResponse.json()) as any
  }
  return {
    yoastHtml: post.yoast_head,
    id: post.id,
    title: he.decode(post.title.rendered),
    content: post.content.rendered,
    date: post.date,
    slug: post.slug,
    link: post.link,
    taxonomies: post._embedded['wp:term']
      .flat()
      .map(({ name, link, taxonomy, slug }: any) => ({ name, link, taxonomy, slug })),
    teamMember: teamMemberJson
      ? {
          name: teamMemberJson.title.rendered as string,
          position: teamMemberJson.acf.team_member_position as string,
          imageUrl: teamMemberJson.team_member_image[teamMemberJson.acf.team_member_image]
            .guid as string
        }
      : undefined
  }
}

export interface PostPageParams {
  categoryId?: number
  tagId?: number
  perPage?: number
  page?: number
}

const getPostsPage = async (
  params: PostPageParams
): Promise<{
  posts: Post[]
  pagination: Pagination
}> => {
  const { categoryId, tagId, page, perPage = 18 } = params

  const url = `https://content.gotripod.com/wp-json/wp/v2/posts?per_page=${perPage}${
    page ? `&page=${page}` : ''
  }${categoryId ? `&categories=${categoryId}` : ''}${tagId ? `&tags=${tagId}` : ''}`
  // console.log('Fetching posts', url)
  const response = await fetch(url)
  const posts = (await response.json()) as any

  return {
    posts: posts.map((post: any) => ({
      id: post.id,
      title: he.decode(post.title.rendered),
      content: post.content.rendered,
      date: post.date,
      slug: post.slug,
      link: post.link
    })),
    pagination: {
      currentPage: page,
      totalItems: Number(response.headers.get('x-wp-total')),
      pageCount: Number(response.headers.get('x-wp-totalpages'))
    }
  }
}

export {
  getCategoryBySlug,
  getTagBySlug,
  getTestimonial,
  getTestimonialById,
  getMediaById,
  getProjects,
  getProjectBySlug,
  getPostBySlug,
  getPostsPage,
  getPageBySlug
}
