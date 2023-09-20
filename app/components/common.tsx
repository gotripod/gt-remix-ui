import classNames from "classnames"
import { PProps } from "react-html-props";

export const Caption = ({...props}: PProps) => {
  const {className, ...others} = props
  return <p className={classNames(className, 'italic my-4 mx-0 text-sm text-gray-400')} {...others}>{others.children}</p>
}