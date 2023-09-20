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
import { getPageBySlug, getPostsPage, getTestimonial } from '~/api'

export const loader = async ({ params }: LoaderArgs) => {
  const { posts, pagination } = await getPostsPage(params)
  const insightsPage = await getPageBySlug('insights')
  const testimonial = await getTestimonial()

  return json({
    testimonial,
    insightsPage,
    posts,
    pagination
  })
}

const Index = () => {
  const { testimonial, insightsPage, posts, pagination } = useLoaderData<typeof loader>()
  return (
    <Layout testimonial={testimonial}>
      <Column className="-mt-28 md:mt-0">
        <List insightsPage={insightsPage} posts={posts} pagination={pagination} extraTitle={''} />
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
