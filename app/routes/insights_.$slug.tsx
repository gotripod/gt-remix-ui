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

import Column from '../components/column'
import Layout from '../components/layout'
import Single from './insights/single'
import { useLoaderData } from '@remix-run/react'
import type { LoaderArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { getPostBySlug, getTestimonial } from '~/api'
import { invariant } from '@apollo/client/utilities/globals'
import { mergeMeta, parentTitles } from '~/helpers/seo'
import type { SitemapFunction } from 'remix-sitemap'
import type { WPPost } from '~/types'

export const sitemap: SitemapFunction = async ({ config }) => {
  const postsResponse = await fetch(
    'https://content.gotripod.com/wp-json/wp/v2/posts?per_page=100&_fields[]=title&_fields[]=slug&_fields[]=modified'
  )
  const posts = await postsResponse.json<WPPost[]>()
  return posts.map((post) => ({
    loc: `/insights/${post.slug}`,
    lastmod: post.modified,
    exclude: post.status !== 'publish', // exclude this entry
    // acts only in this loc
    alternateRefs: [
      {
        href: `${config.siteUrl}/insights/${post.slug}`,
        absolute: true,
        hreflang: 'en'
      }
    ]
  }))
}

export const meta = mergeMeta(
  () => [],
  ({ data, matches }) => {
    return [
      {
        name: 'description',
        content: data?.post?.title
      },
      { title: (data?.post?.title || '') + ' | ' + parentTitles(matches) }
    ]
  }
)

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug)

  const testimonial = await getTestimonial()
  const post = await getPostBySlug(params.slug)

  return json({
    testimonial,
    post
  })
}

const Index = () => {
  const { testimonial, post } = useLoaderData<typeof loader>()
  return (
    <Layout testimonial={testimonial}>
      <Column>
        <Single post={post} />
      </Column>
    </Layout>
  )
}

export default Index
