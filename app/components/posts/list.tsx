
import Column from '~/components/column'
import PageTitle from '~/components/page-title'
import { PostListProps } from '~/routes/insights/$slug'

import Item from './list-item'
import Pagination from './pagination'

const List = ({ insightsPage, posts, pagination, extraTitle }: PostListProps) => (
  <>
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
        <Container>{posts && posts.map((post) => <Item key={post.id} post={post} />)}</Container>
        <Pagination pageCount={pagination?.pageCount || 0} totalItems={pagination?.totalItems || 0} currentPage={pagination?.currentPage}  />
      </>
    </Column>
  </>
)

const Container = styled.ul`
  display: flex;

  flex-flow: row wrap;
  padding: 0;

  ${mqLess(breakpoints.medium)} {
    display: block;
  }
`

export default List
