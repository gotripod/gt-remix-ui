import Column from '~/components/column'
import PageTitle from '~/components/page-title'

import Item from './list-item'
import Pagination from './pagination'
import type { Category, Pagination as PaginationType, Post, Tag, Taxonomy, WPPage } from '~/types'
import { useLocation } from '@remix-run/react'

interface PostListProps {
  posts: Post[]
  insightsPage: WPPage
  pagination?: PaginationType
  pageNumber: number | undefined
  category: Category | undefined
  tag: Tag | undefined
}

const buildTitle = (
  category: Category | undefined,
  tag: Taxonomy | undefined,
  pageNumber: number | undefined
) => {
  const ct = category ? ` ${category.name} ` : ''
  const tt = tag ? ` ${tag.name} ` : ''

  console.log(tag)

  const pt = pageNumber ? ` Page ${pageNumber} ` : ''

  const prefix = `${ct}${tt}`
  console.log('prefix "%s"', prefix)
  return `${prefix}${
    prefix.trim().toLowerCase().endsWith('insights') ? 'Posts' : 'Insights'
  }${pt}`.trim()
}

const List = ({ insightsPage, posts, pagination, category, tag, pageNumber }: PostListProps) => {
  const location = useLocation()
  let rootUrl = location.pathname

  rootUrl = rootUrl.replace(/\/?$/, '')

  if (pageNumber) {
    rootUrl = rootUrl.replace(/(:?\/page\/\d+)/, '')
  }

  return (
    <div className="mx-4 md:mx-0">
      {/* <Head>
      <title>
        {extraTitle ? `${extraTitle} from` : 'Development insights, client advice and news'} Go
        Tripod, Software developers in Cornwall
      </title>
    </Head> */}
      <Column slim>
        <PageTitle
          title={buildTitle(category, tag, pageNumber)}
          subTitle="Nuggets from the Go Tripod hive mind"
        />
      </Column>
      <Column>
        <>
          <div className="mt-16 mb-16 md:grid grid-cols-3 gap-8">
            {posts && posts.map((post) => <Item key={post.id} post={post} />)}
          </div>
          <Pagination
            rootUrl={rootUrl}
            pageCount={pagination?.pageCount || 0}
            totalItems={pagination?.totalItems || 0}
            currentPage={pagination?.currentPage}
          />
        </>
      </Column>
    </div>
  )
}

// const Container = styled.ul`
//   display: flex;

//   flex-flow: row wrap;
//   padding: 0;

//   ${mqLess(breakpoints.medium)} {
//     display: block;
//   }
// `

export default List
