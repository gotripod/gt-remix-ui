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
import { LoaderArgs, json } from '@remix-run/cloudflare'
import { getPostBySlug, getTestimonial } from '~/api'
import { invariant } from '@apollo/client/utilities/globals'

export const loader = async({params}: LoaderArgs) => {
    invariant(params.slug)

    const testimonial = await getTestimonial()
    const post = await getPostBySlug(params.slug)

    return json({
        testimonial,
        post
    })
}

const Index = () => {
  const {testimonial, post} = useLoaderData<typeof loader>()
  return (
    <Layout testimonial={testimonial}>
      <Column><Single post={post} /></Column>
    </Layout>
  )
}


export default Index