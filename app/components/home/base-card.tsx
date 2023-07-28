import classNames from "classnames"
import { DivProps } from "react-html-props"

export const cardClasses = 'bg-white cardflare border-b-4 border-b-gray-400 shadow-card'

const BaseCard = (props: DivProps) => {
  return <div {...props} className={classNames(cardClasses, props.className)} >
    <div className="py-4 px-12 overflow-hidden relative">
      {props.children}
    </div>
  </div>
}

// const BaseCard = styled.div`
//   background-color: #fff;
//   border-bottom: ${px2rem(5)} solid rgba(0, 0, 0, 0.3);
//   box-shadow: 0 0 ${px2rem(1)} rgba(0, 0, 0, 0.1);
// `

export default BaseCard
