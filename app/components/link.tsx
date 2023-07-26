import { Link, useLocation } from '@remix-run/react'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import theme from '~/theme'

interface Props {
  href: string
  prefetch?: boolean
  className?: string
  children?: React.ReactNode
  target?: string
}

const MyLink = ({ prefetch = false, href, className, children, target }: Props): ReactElement => {
  const router = useLocation()
  const isCurrentPage = router.pathname === href

  return (
    <Link to={href} className={className} aria-current={isCurrentPage ? 'page' : undefined} target={target}>

        {children}

    </Link>
  )
}

export const BlueLink = styled(Link)`
  color: ${theme.colours.linkBlue};
  text-decoration: underline;
  &:visited {
    color: ${theme.colours.linkBlue};
  }
`

export default MyLink
