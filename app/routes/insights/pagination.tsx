import type { ReactElement } from 'react'

import type { Pagination as PaginationType } from '~/types'
import { LinkButton } from '~/components/button'

const NewerLink = (props: { rootUrl: string; pagination: PaginationType }) => {
  const { rootUrl, pagination } = props
  const { currentPage } = pagination

  const targetPage = currentPage ? currentPage - 1 : 0

  const url = `${rootUrl}${targetPage === 1 ? '' : `/page/${targetPage}`}`

  console.log('targetPage', targetPage)

  if (targetPage < 1) {
    return null
  }

  return <LinkButton to={url}>Newer posts →</LinkButton>
}

const OlderLink = (props: { rootUrl: string; pagination: PaginationType }) => {
  const { rootUrl, pagination } = props
  const { currentPage, pageCount } = pagination

  const targetPage = currentPage ? currentPage + 1 : 2

  if (targetPage > pageCount) {
    return null
  }

  return <LinkButton to={`${rootUrl}/page/${targetPage}`}>← Older posts</LinkButton>
}

const Pagination = (props: PaginationType & { rootUrl: string }): ReactElement => {
  const { rootUrl } = props
  return (
    <div className="flex justify-between">
      {/* If there's a next page, render this link */}
      <OlderLink rootUrl={rootUrl} pagination={props} />

      {/* If there's a previous page, render this link */}
      <NewerLink rootUrl={rootUrl} pagination={props} />
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
