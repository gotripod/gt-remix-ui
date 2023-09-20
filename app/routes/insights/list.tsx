import Column from '~/components/column'
import PageTitle from '~/components/page-title'

import Item from './list-item'
import Pagination from './pagination'
import type { Pagination as PaginationType, Post, WPPage } from '~/types'

interface PostListProps {
  posts: Post[]
  extraTitle: string | null
  insightsPage: WPPage
  pagination?: PaginationType
}

const List = ({ insightsPage, posts, pagination, extraTitle }: PostListProps) => (
  <div className="mx-4 md:mx-0">
    {/* <Head>
      <title>
        {extraTitle ? `${extraTitle} from` : 'Development insights, client advice and news'} Go
        Tripod, Software developers in Cornwall
      </title>
    </Head> */}
    <Column slim>
      <PageTitle title="Insights" subTitle="Nuggets from the Go Tripod hive mind" />
    </Column>
    <Column>
      <>
        <div className="mt-16 mb-16 md:grid grid-cols-3 gap-8">
          {posts && posts.map((post) => <Item key={post.id} post={post} />)}
        </div>
        <Pagination
          pageCount={pagination?.pageCount || 0}
          totalItems={pagination?.totalItems || 0}
          currentPage={pagination?.currentPage}
        />
      </>
    </Column>
  </div>
)

// const Container = styled.ul`
//   display: flex;

//   flex-flow: row wrap;
//   padding: 0;

//   ${mqLess(breakpoints.medium)} {
//     display: block;
//   }
// `

export default List
