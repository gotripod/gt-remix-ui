import { RemixLinkProps, RemixNavLinkProps } from '@remix-run/react/dist/components'
import Link from './link'
import classNames from 'classnames'

const DefaultButtonStyles: React.CSSProperties = {
  display: 'inline-block',
  position: 'relative',
  textAlign: 'center',
  fontWeight: 700,
  cursor: 'pointer',
  border: 0,
  borderBottom: '3px solid #262626',
  transition: 'background-color 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
  padding: '6.5px 30px',
  color: '#fff',
}

const LinkButton = ({children, ...props}: RemixLinkProps) => (
  <Link style={DefaultButtonStyles} {...props} className={classNames(props.className, 'bg-linkBlue')}>{children}</Link>
)

const Button = ({children, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button style={DefaultButtonStyles} {...props} className={classNames(props.className, 'bg-linkBlue')}>{children}</button>
)

export { LinkButton, Button }
