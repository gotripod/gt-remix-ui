/**
 * This is a catch-all route for posts, handling the index page (with + without pagination),
 * category indexes, and single post. For more on catch-all routes, see:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * /insights/
 * /insights/post-name/
 * /insights/page/2/
 * /insights/category/cat-name/
 * /insights/category/cat-name/page/2/
 * /insights/topic/topic-name/
 * /insights/topic/topic-name/page/2
 **/

import { ReactElement } from 'react'
import type { Pagination as PaginationType, Post, Testimonial, WPPage } from '~/types'
import {
  getCategoryBySlug, getPageBySlug, getPostBySlug, getPostsPage, getTagBySlug, getTestimonial
} from '../../api'
import Column from '../../components/column'
import Layout from '../../components/layout'

import { LoaderArgs } from '@remix-run/cloudflare'

import List from '~/components/posts/list'
import Single from '~/components/posts/single'
import { toTitle } from '~/helpers/keys-to-camel'

const Index = ({ testimonial, ...props }: PostBaseProps & Props): ReactElement => {
  return (
    <Layout testimonial={testimonial}>
      <Column>{'post' in props ? <Single {...props} /> : <List {...props} />}</Column>
    </Layout>
  )
}

export interface PostBaseProps {
  testimonial: Testimonial
}

export interface PostListProps {
  posts: Post[]
  extraTitle: String | null
  insightsPage: WPPage
  pagination?: PaginationType
}

export interface SinglePostProps {
  post: Post
}

type Props = PostListProps | SinglePostProps

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
    revalidate: 30,
    props: {
      testimonial,
      posts,
      insightsPage,
      extraTitle,
      pagination: {
        totalItems: totalCount,
        pageCount: pageCount,
        currentPage: page ? Number(page) : null
      }
    }
  })

  if (postSlugOrIndexType === undefined || postSlugOrIndexType === '[[...slug]]') {
    const { posts, totalCount, pageCount } = await getPostsPage()
    const insightsPage = await getPageBySlug('insights')

    if(!params.page) throw 'Page number is required for index page'

    return getIndexProps(posts, totalCount, pageCount, params.page, insightsPage)
  } else if (pageOrCategory === undefined) {
    const post = await getPostBySlug(postSlugOrIndexType)
    return {
      props: {
        post
      }
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

// This function gets called at BUILD time
// export const getStaticPaths: GetStaticPaths = async () => {
//   const { posts } = await getPostsPage({ perPage: 100 })

//   // Get the paths we want to pre-render
//   const paths = posts.map((post) => ({
//     params: { slug: [post.slug] }
//   }))

//   return { paths: paths, fallback: true }
// }

export default Index
