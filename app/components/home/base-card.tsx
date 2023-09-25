import classNames from 'classnames'
import type { DivProps } from 'react-html-props'

export const cardClasses = (alternate = false, cardflare = true) =>
  `card-base ${cardflare ? 'cardflare' : ''} ${alternate ? 'cardflare-alt' : ''}`

const BaseCard = (props: DivProps & { alternate?: boolean; cardflare?: boolean }) => {
  const { alternate, ...other } = props
  return (
    <div
      {...other}
      className={classNames(cardClasses(alternate, props.cardflare), props.className)}>
      <div className="card-inner">{props.children}</div>
    </div>
  )
}

export default BaseCard
