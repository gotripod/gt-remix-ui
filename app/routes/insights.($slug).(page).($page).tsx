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

import type { Pagination as PaginationType, Post, Testimonial, WPPage } from '~/types'
import Column from '../components/column'
import Layout from '../components/layout'
import List from './insights/list'
import Single from './insights/single'
import { useLoaderData } from '@remix-run/react'
import { loader as insightsLoader } from './insights/loader'

export const loader = insightsLoader

const Index = () => {
  const {...props} = useLoaderData<typeof loader>()
  return (
    <Layout testimonial={'testimonial' in props ? props.testimonial : undefined}>
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

export default Index
