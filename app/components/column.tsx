import classNames from "classnames"

export type ColumnProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  slim?:boolean
}

const Column = ({slim, children, ...props}: ColumnProps) => <div data-column
{...props}
className={classNames(`mx-auto my-0 relative
  [&>img]:max-w-full
  `, props.className, {
    'max-w-[1140px]': !slim,
    'max-w-[1000px]': slim,
  })}
>{children}</div>


export default Column
