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
  const { pageNumber, page, posts, pagination } = useLoaderData<typeof loader>()
  const location = useLocation()
  let rootUrl = location.pathname

  rootUrl = rootUrl.replace(/\/?$/, '')

  if (pageNumber) {
    rootUrl = rootUrl.replace(/(:?\/page\/\d+)/, '')
  }

  return (
    <>
      <Header
        title="Our purpose"
        ctaText="See what we can do for you"
        ctaLink="#services"
        image="/_img/hero-home.jpg"
        subTitle={
          <>
            Let&apos;s create transformative solutions <br />
            to move your business forward
          </>
        }
      />
      <div className="max-w-screen-xl mx-auto">
        <div className="mt-16 mb-16 md:grid grid-cols-3 gap-8">
          {posts &&
            posts.map((post) => (
              <li key={post.id} className={`list-none before:hidden p-6 mb-6 md:mb-0`}>
                <article className="flex flex-col justify-between h-full">
                  <span className="text-lg text-neutral-400">{post.date}</span>

                  <h3 className="text-lg font-bold my-8 hover:underline">
                    <Link to={post.link.replace('https://gotripod.com', '')}>{post.title}</Link>
                  </h3>
                </article>
              </li>
            ))}
        </div>
        <Pagination
          rootUrl={rootUrl}
          pageCount={pagination?.pageCount || 0}
          totalItems={pagination?.totalItems || 0}
          currentPage={pagination?.currentPage}
        />
      </div>
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
