import { ReactElement } from 'react'

import { Pagination as PaginationType } from '~/types'
import { LinkButton } from '~/components/button'

const newerLink = (pagination: PaginationType) => {
  const { currentPage, totalItems, pageCount } = pagination

  return `/insights/page/${currentPage ? currentPage - 1 : 1}`
}

const olderLink = (pagination: PaginationType) => {
  const { currentPage, totalItems, pageCount } = pagination

  return `/insights/page/${currentPage ? currentPage + 1 : 2}`
}

const Pagination = (props: PaginationType): ReactElement => {
  const { currentPage } = props
  return (
    <div className='flex justify-between'>
      {/* If there's a next page, render this link */}
      {<LinkButton to={olderLink(props)}>← Older posts</LinkButton>}

      {/* If there's a previous page, render this link */}
      {currentPage ? <LinkButton to={newerLink(props)}>Newer posts →</LinkButton> : null}
    </div>
  )
}

export default Pagination

// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
// `

// const SLinkButton = styled(LinkButton)`
//   color: white !important;
//   display: inline-block;
//   margin: 13px 0;
//   padding: 13px;
// `
