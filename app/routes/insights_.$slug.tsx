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

import { invariant } from '@apollo/client/utilities/globals'
import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import type { MetaFunction } from '@remix-run/react'
import { useLoaderData } from '@remix-run/react'
import type { SitemapFunction } from 'remix-sitemap'
import { getPostBySlug, getPostPreview, getTestimonial } from '~/api'
import type { WPPost } from '~/types'
import Column from '../components/column'
import Single from './insights/single'

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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      name: 'description',
      content: data?.post?.yoastHeadJson.description
    },
    { title: data?.post?.yoastHeadJson.title }
  ]
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  if (url.searchParams.has('preview')) {
    const id = url.searchParams.get('post')
    const nonce = url.searchParams.get('nonce')
    invariant(id)
    invariant(nonce)

    const post = await getPostPreview(id, nonce, request)

    return json({
      post: post
    })
  }

  invariant(params.slug)

  const testimonial = await getTestimonial()
  const post = await getPostBySlug(params.slug)

  return json({
    testimonial,
    post
  })
}

const Index = () => {
  const { post } = useLoaderData<typeof loader>()
  return (
    <Column>
      <Single post={post} />
    </Column>
  )
}

export default Index
