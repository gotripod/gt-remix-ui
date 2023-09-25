import classNames from 'classnames'
import type { DivProps } from 'react-html-props'

export const cardClasses = (alternate = false, cardflare = true) =>
  `bg-white relative ${cardflare ? 'cardflare' : ''} ${
    alternate ? 'before:right-0' : ''
  } border-b-4 border-b-gray-400 shadow-card`

const BaseCard = (props: DivProps & { alternate?: boolean; cardflare?: boolean }) => {
  const { alternate, ...other } = props
  return (
    <div
      {...other}
      className={classNames(cardClasses(alternate, props.cardflare), props.className)}>
      <div className=" py-6 px-8 md:py-10 md:px-20 overflow-hidden relative">{props.children}</div>
    </div>
  )
}

export default BaseCard
