import classNames from "classnames"

export type ColumnProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  slim?:boolean
}

const Column = ({slim, children, ...props}: ColumnProps) => <div
{...props}
className={classNames(`max-w-[1140px] mx-auto my-0 relative
  [&>img]:max-w-full
  `, props.className)}
>{children}</div>


export default Column
