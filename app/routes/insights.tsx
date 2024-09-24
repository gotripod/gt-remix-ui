/**
 * This is a catch-all route for posts, handling the index page (with + without pagination),
 * category indexes, and single post.
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
import { Link, useLoaderData, useLocation } from '@remix-run/react'
import { getPageBySlug } from '~/api/page.server'
import type { PostPageParams } from '~/api/post.server'
import { getPostsPage } from '~/api/post.server'
import { getCategoryBySlug, getTagBySlug } from '~/api/taxon.server'
import Header from '~/components/header'
import { mergeMeta } from '~/helpers/seo'
import Pagination from './insights/pagination'

const Index = () => {
  const { pageNumber, posts, pagination } = useLoaderData<typeof loader>()
  const location = useLocation()
  let rootUrl = location.pathname

  rootUrl = rootUrl.replace(/\/?$/, '')

  if (pageNumber) {
    rootUrl = rootUrl.replace(/(:?\/page\/\d+)/, '')
  }

  return (
    <>
      <Header
        plain
        title="Our insights"
        cta={
          <div className="flex gap-2">
            <Link to="/#services" className="btn-primary-blue my-2">
              Tips
            </Link>
            <Link to="/#services" className="btn-primary-blue my-2">
              Technology
            </Link>
            <Link to="/#services" className="btn-primary-blue my-2">
              Software
            </Link>
            <Link to="/#services" className="btn-primary-blue my-2">
              Go Tripod News
            </Link>
            <Link to="/#services" className="btn-primary-blue my-2">
              All
            </Link>
          </div>
        }
        image="/_img/hero-home.jpg"
        subTitle={
          <>
            The latest from our world and beyond.
            <br />
            Read, watch and go deeper into what&apos;s happening.
          </>
        }
      />
      <div className="relative w-full bg-gray-100 overflow-hidden ">
        <div className="max-w-screen-xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-gt-blue">Our tips</h2>
          <p className="font-Raleway text-4xl font-bold text-gray-800 mb-14">
            Helping you stay ahead of change
          </p>
          <div className="md:grid grid-cols-2 gap-8">
            {posts &&
              posts.map((post) => (
                <li key={post.id} className="list-none before:hidden mb-6 md:mb-0">
                  <Link
                    to={post.link.replace('https://gotripod.com', '')}
                    className="block group/card">
                    <article className="bg-white overflow-hidden">
                      {
                        <div className="min-w-80 h-64 overflow-hidden">
                          <img
                            src={
                              post.featuredMedia?.sizes?.mediumLarge?.sourceUrl ||
                              'https://picsum.photos/300/200'
                            }
                            alt={post.title}
                            className="w-full object-cover min-w-80 min-h-64"
                          />
                        </div>
                      }
                      <div className="p-6">
                        <span className="text-sm underline underline-offset-8 decoration-2 decoration-gt-green">
                          {new Date(post.date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                        <h3 className="text-xl font-bold mt-2 mb-4 group-hover/card:text-gt-blue transition-colors">
                          {post.title}
                        </h3>
                        <div className="mb-4" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                        <p className="text-gt-green text-sm font-bold underline invisible group-hover/card:visible">
                          Read more
                        </p>
                        <div className="flex flex-wrap gap-2 mt-8">
                          {post.taxonomies.map((category) => (
                            <span
                              key={category.id}
                              className="text-gt-blue-lt border-gt-blue-lt border-2 uppercase bg-white text-xs px-3 py-2 rounded-full">
                              {category.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </Link>
                </li>
              ))}
          </div>
        </div>
      </div>

      <Pagination
        rootUrl={rootUrl}
        pageCount={pagination?.pageCount || 0}
        totalItems={pagination?.totalItems || 0}
        currentPage={pagination?.currentPage}
      />
    </>
  )
}

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

export default Index
