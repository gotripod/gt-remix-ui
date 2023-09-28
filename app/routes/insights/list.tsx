import Column from '~/components/column'

import Item from './list-item'
import Pagination from './pagination'
import type { Pagination as PaginationType, Post, WPPage } from '~/types'
import { useLocation } from '@remix-run/react'

interface PostListProps {
  posts: Post[]
  insightsPage: WPPage
  pagination?: PaginationType
  pageNumber: number | undefined
}

const List = ({ posts, pagination, pageNumber }: PostListProps) => {
  const location = useLocation()
  let rootUrl = location.pathname

  rootUrl = rootUrl.replace(/\/?$/, '')

  if (pageNumber) {
    rootUrl = rootUrl.replace(/(:?\/page\/\d+)/, '')
  }

  return (
    <div className="mx-4 md:mx-0">
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

export default List
