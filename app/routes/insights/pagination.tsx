import type { ReactElement } from 'react'

import { Link } from '@remix-run/react'
import type { Pagination as PaginationType } from '~/types'

const NewerLink = (props: { rootUrl: string; pagination: PaginationType }) => {
  const { rootUrl, pagination } = props
  const { currentPage } = pagination

  const targetPage = currentPage ? currentPage - 1 : 0

  const url = `${rootUrl}${targetPage === 1 ? '' : `/page/${targetPage}`}`

  if (targetPage < 1) {
    return null
  }

  return (
    <Link className="btn-primary-blue m-6" to={url}>
      See newer insights
    </Link>
  )
}

const OlderLink = (props: { rootUrl: string; pagination: PaginationType }) => {
  const { rootUrl, pagination } = props
  const { currentPage, pageCount } = pagination

  const targetPage = currentPage ? currentPage + 1 : 2

  if (targetPage > pageCount) {
    return null
  }

  return (
    <Link className="btn-primary-blue m-6" to={`${rootUrl}/page/${targetPage}`}>
      See older insights
    </Link>
  )
}

const Pagination = (props: PaginationType & { rootUrl: string }): ReactElement => {
  const { rootUrl } = props
  return (
    <div className="bg-white bg-slope-tr-grey bg-top bg-no-repeat bg-contain p-24 pb-20">
      <p className="text-left lg:text-center">
        <OlderLink rootUrl={rootUrl} pagination={props} />
        <NewerLink rootUrl={rootUrl} pagination={props} />
      </p>
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
