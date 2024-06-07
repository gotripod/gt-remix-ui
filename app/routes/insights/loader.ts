import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import {
  getTestimonial,
  getPostsPage,
  getPageBySlug,
  getPostBySlug,
  getCategoryBySlug,
  getTagBySlug
} from '~/api'
import { toTitle } from '~/helpers/keys-to-camel'
import type { Post, WPPage } from '~/types'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const [postSlugOrIndexType, pageOrCategory, maybePage, extra] = (params.slug || []) as string[]

  console.debug('Insights/Posts parameters: ', params.slug)

  const testimonial = await getTestimonial()

  // The third level slug part should always be "page" otherwise we can bail
  if (maybePage && maybePage !== 'page') {
    return {
      notFound: true
    }
  } else if (maybePage && maybePage === 'page' && extra) {
    // Pagination should always be the last URL param
    return {
      notFound: true
    }
  }

  const getIndexProps = (
    posts: Post[],
    totalCount: number,
    pageCount: number,
    page: string | string[] | null,
    insightsPage: WPPage,
    extraTitle: string | null = null
  ) => ({
    testimonial,
    posts,
    insightsPage,
    extraTitle,
    pagination: {
      totalItems: totalCount,
      pageCount: pageCount,
      currentPage: page ? Number(page) : null
    }
  })

  if (postSlugOrIndexType === undefined || postSlugOrIndexType === '[[...slug]]') {
    const {
      posts,
      pagination: { pageCount, totalItems }
    } = await getPostsPage(params)
    const insightsPage = await getPageBySlug('insights')

    const page = params.page || '0'
    console.log('Requesting page', page)
    return getIndexProps(posts, totalItems, pageCount, page, insightsPage)
  } else if (pageOrCategory === undefined) {
    const post = await getPostBySlug(postSlugOrIndexType)
    return {
      post
    }
  } else if (postSlugOrIndexType === 'page') {
    const {
      posts,
      pagination: { pageCount, totalItems }
    } = await getPostsPage({ page: Number(pageOrCategory) })
    const insightsPage = await getPageBySlug('insights')

    return getIndexProps(posts, totalItems, pageCount, pageOrCategory, insightsPage)
  } else if (postSlugOrIndexType === 'category') {
    const category = await getCategoryBySlug(pageOrCategory)
    console.log('Got category', category)
    const {
      posts,
      pagination: { pageCount, totalItems }
    } = await getPostsPage({ categoryId: category.id })
    const insightsPage = await getPageBySlug('insights')

    return getIndexProps(
      posts,
      totalItems,
      pageCount,
      null,
      insightsPage,
      toTitle(pageOrCategory.replace('-', ' '))
    )
  } else if (postSlugOrIndexType === 'topic') {
    const insightsPage = await getPageBySlug('insights')
    const tag = await getTagBySlug(pageOrCategory)
    const {
      posts,
      pagination: { pageCount, totalItems }
    } = await getPostsPage({ tagId: tag.id })
    return getIndexProps(
      posts,
      totalItems,
      pageCount,
      null,
      insightsPage,
      toTitle(pageOrCategory.replace('-', ' '))
    )
  }

  return {
    notFound: true
  }
}
