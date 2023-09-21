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

import type { Post, Testimonial } from '~/types'
import Column from '../components/column'
import Layout from '../components/layout'
import List from './insights/list'
import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import type { PostPageParams } from '~/api'
import { getCategoryBySlug, getPageBySlug, getPostsPage, getTagBySlug, getTestimonial } from '~/api'
import { mergeMeta } from '~/helpers/seo'

export const meta = mergeMeta<typeof loader>(
  () => [],
  ({ data }) => {
    let suffix = ''

    if (data?.category) {
      suffix += `| ${data.category.name}`
    }

    if (data?.tag) {
      suffix += `| ${data.tag.name}`
    }

    if (data?.pageNumber) {
      suffix += ` | page ${data.pageNumber}`
    }

    return [
      {
        name: 'description',
        content: data?.page?.yoast.metaDesc + `${suffix ? suffix : ''}`
      },
      { title: (data?.page?.yoastTitle || '') + `${suffix ? suffix : ''}` }
    ]
  }
)

export const loader = async ({ params }: LoaderArgs) => {
  const postParams: PostPageParams = {}

  let category, pageNumber, tag

  if (params.category) {
    category = await getCategoryBySlug(params.category)
    postParams.categoryId = category.id
  }

  if (params.tag) {
    tag = await getTagBySlug(params.tag)
    postParams.tagId = tag.id
  }

  if (params.page) {
    pageNumber = Number(params.page)
    postParams.page = Number(params.page)
  }

  const [postPage, insightsPage, testimonial] = await Promise.all([
    getPostsPage(postParams),
    getPageBySlug('insights'),
    getTestimonial()
  ])

  const { posts, pagination } = postPage

  return json({
    testimonial,
    page: insightsPage,
    posts,
    pagination,
    category,
    tag,
    pageNumber
  })
}

const Index = () => {
  const { category, tag, pageNumber, testimonial, page, posts, pagination } =
    useLoaderData<typeof loader>()
  return (
    <Layout testimonial={testimonial}>
      <Column className="-mt-28 md:mt-0">
        <List
          category={category}
          tag={tag}
          pageNumber={pageNumber}
          insightsPage={page}
          posts={posts}
          pagination={pagination}
        />
      </Column>
    </Layout>
  )
}

export interface PostBaseProps {
  testimonial: Testimonial
}

export interface SinglePostProps {
  post: Post
}

export default Index
