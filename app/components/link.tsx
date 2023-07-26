import { Link } from '@remix-run/react'
import { RemixLinkProps } from '@remix-run/react/dist/components'
import classnames from 'classnames'

export const BlueLink = ({children, ...props}: RemixLinkProps) => (
  <Link {...props} className={classnames(props.className, "text-linkBlue visited:text-linkBlue underline")}>{children}</Link>
)

export default Link
