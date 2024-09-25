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
import { Fragment } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import type { SitemapFunction } from 'remix-sitemap'
import type { Post, Taxonomy } from 'types/normalised-responses'
import { getPostBySlug, getPostPreview } from '~/api/post.server'
import { getTestimonial } from '~/api/testimonial.server'
import Header from '~/components/header'
import Link from '~/components/link'
import { DEFAULT_META } from '~/constants'

export const sitemap: SitemapFunction = async ({ config }) => {
  const postsResponse = await fetch(
    'https://content.gotripod.com/wp-json/wp/v2/posts?per_page=100&_fields[]=title&_fields[]=slug&_fields[]=modified'
  )
  const posts = await postsResponse.json<Post[]>()
  return posts.map((post) => ({
    loc: `/insights/${post.slug}`,
    lastmod: post.modified.toISOString(),
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
    ...DEFAULT_META,
    {
      name: 'description',
      content: data?.post?.yoastHeadJson.description || data?.post.title
    },
    { title: data?.post?.yoastHeadJson.title || data?.post.title }
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
  const link = encodeURIComponent(post.link)
  console.log('POST', post.featuredMedia)
  return (
    <>
      <Header
        plain
        cta={<></>}
        subTitle="Transformation from every angle"
        title="Go Tripod News / Software"
      />
      <div className="max-w-screen-xl mx-auto">
        <div
          className={`sm:min-h-[640px] bg-cover bg-center flex flex-col justify-between`}
          style={{
            backgroundImage: `url(${post.featuredMedia?.sizes.large.sourceUrl})`
          }}>
          <div className="lg:bg-stripes-bg bg-[right_top_50px] bg-no-repeat bg-[length:300px]">
            <div className="min-h-80"></div>
          </div>
        </div>
        <>
          <div className="m-0 mb-6 max-w-screen-xl mx-auto mt-8 w-full bg-white p-8">
            <div
              className="prose max-w-3xl"
              dangerouslySetInnerHTML={{ __html: post.content }}></div>
            <div className="mt-4">
              Sharing is caring:
              <ul className="flex gap-4 py-4">
                <li>
                  <a
                    href={`https://twitter.com/intent/tweet/?url=${link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share this article on Twitter (opens in new window)">
                    <FaTwitter size={18} color={'black'} />
                  </a>
                </li>
                <li>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share this article on Facebook (opens in new window)">
                    <FaFacebookF size={18} color={'black'} />
                  </a>
                </li>
                <li>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share this article on LinkedIn (opens in new window)">
                    <FaLinkedinIn size={18} color={'black'} />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:?subject=I thought you might be interested in this article on the Go Tripod website&body=${link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share this article by email (opens in new window)">
                    <AiOutlineMail size={18} color={'black'} />
                  </a>
                </li>
              </ul>
            </div>

            {post.teamMember && (
              <div className="flex justify-center m-0 mt-4">
                <img
                  className="rounded-full mr-4 block"
                  alt={`Avatar of ${post.teamMember.name}, ${post.teamMember.position}`}
                  src={post.teamMember.imageUrl}
                  width={100}
                  height={100}
                />
                <div className="ml-10 text-gray-500">
                  By {post.teamMember.name}, {post.teamMember.position}
                  <br />
                  Filed under:{' '}
                  {post.taxonomies
                    .filter((t: Taxonomy) => t.taxonomy === 'category')
                    .map((t: Taxonomy, idx: number, arr: Taxonomy[]) => (
                      <Fragment key={t.slug}>
                        <Link to={`/insights/category/${t.slug}`}>{t.name}</Link>
                        {idx < arr.length - 1 ? ', ' : ''}
                      </Fragment>
                    ))}
                  <br />
                  Topics:{' '}
                  {post.taxonomies
                    .filter((t: Taxonomy) => t.taxonomy === 'post_tag')
                    .map((t: Taxonomy, idx: number, arr: Taxonomy[]) => (
                      <Fragment key={t.slug}>
                        <Link key={t.slug} to={`/insights/topic/${t.slug}`}>
                          {t.name}
                        </Link>
                        {idx < arr.length - 1 ? ', ' : ''}
                      </Fragment>
                    ))}
                </div>
              </div>
            )}
          </div>
        </>
      </div>
    </>
  )
}

export default Index
