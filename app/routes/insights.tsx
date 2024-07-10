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

import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import type { Post, Testimonial } from 'types/normalised-responses'
import { getPageBySlug } from '~/api/page.server'
import type { PostPageParams} from '~/api/post.server';
import { getPostsPage } from '~/api/post.server'
import { getCategoryBySlug, getTagBySlug } from '~/api/taxon.server'
import { mergeMeta } from '~/helpers/seo'
import Column from '../components/column'
import List from './insights/list'

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

export const loader = async ({ params }: LoaderFunctionArgs) => {
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

  const [postPage, insightsPage] = await Promise.all([
    getPostsPage(postParams),
    getPageBySlug('insights')
  ])

  const { posts, pagination } = postPage

  return json({
    page: insightsPage,
    posts,
    pagination,
    category,
    tag,
    pageNumber
  })
}

const Index = () => {
  const { pageNumber, page, posts, pagination } = useLoaderData<typeof loader>()
  return (
    <Column className="-mt-28 md:mt-0">
      <List pageNumber={pageNumber} insightsPage={page} posts={posts} pagination={pagination} />
    </Column>
  )
}

export interface PostBaseProps {
  testimonial: Testimonial
}

export interface SinglePostProps {
  post: Post
}

export default Index
