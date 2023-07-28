import { LoaderArgs } from "@remix-run/cloudflare"
import { getTestimonial, getPostsPage, getPageBySlug, getPostBySlug, getCategoryBySlug, getTagBySlug } from "~/api"
import { toTitle } from "~/helpers/keys-to-camel"
import { Post, WPPage } from "~/types"

export const loader = async ({params}:LoaderArgs) => {
    const [postSlugOrIndexType, pageOrCategory, maybePage, _pageNum, extra] = (params.slug ||
      []) as string[]
  
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
      const { posts, totalCount, pageCount } = await getPostsPage(params)
      const insightsPage = await getPageBySlug('insights')
  
      let page = params.page || '0'
  console.log('Requesting page', page)
      return getIndexProps(posts, totalCount, pageCount, page, insightsPage)
    } else if (pageOrCategory === undefined) {
      const post = await getPostBySlug(postSlugOrIndexType)
      return {
          post
      }
    } else if (postSlugOrIndexType === 'page') {
      const { posts, totalCount, pageCount } = await getPostsPage({ page: Number(pageOrCategory) })
      const insightsPage = await getPageBySlug('insights')
  
      return getIndexProps(posts, totalCount, pageCount, pageOrCategory, insightsPage)
    } else if (postSlugOrIndexType === 'category') {
      const category = await getCategoryBySlug(pageOrCategory)
      console.log('Got category', category)
      const { posts, totalCount, pageCount } = await getPostsPage({ categoryId: category.id })
      const insightsPage = await getPageBySlug('insights')
  
      return getIndexProps(
        posts,
        totalCount,
        pageCount,
        null,
        insightsPage,
        toTitle(pageOrCategory.replace('-', ' '))
      )
    } else if (postSlugOrIndexType === 'topic') {
      const insightsPage = await getPageBySlug('insights')
      const tag = await getTagBySlug(pageOrCategory)
      const { posts, totalCount, pageCount } = await getPostsPage({ tagId: tag.id })
      return getIndexProps(
        posts,
        totalCount,
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
  