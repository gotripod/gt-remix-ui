import classNames from "classnames"
import { PProps } from "react-html-props";

export const Caption = ({...props}: PProps) => <p className={classNames(props.className, 'italic my-4 mx-0')} {...props}>{props.children}</p>