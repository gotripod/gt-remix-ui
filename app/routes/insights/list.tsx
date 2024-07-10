import Column from '~/components/column'

import { useLocation } from '@remix-run/react'
import type { Page, Pagination as PaginationType, Post } from 'types/normalised-responses'
import Item from './list-item'
import Pagination from './pagination'

interface PostListProps {
  posts: Post[]
  insightsPage: Page
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
