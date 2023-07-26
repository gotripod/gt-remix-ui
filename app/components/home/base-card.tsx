import classNames from "classnames"
import { DivProps } from "react-html-props"


const BaseCard = (props: DivProps) => (
  <div className={classNames('bg-white', props.className)} {...props}>{props.children}</div>
)

// const BaseCard = styled.div`
//   background-color: #fff;
//   border-bottom: ${px2rem(5)} solid rgba(0, 0, 0, 0.3);
//   box-shadow: 0 0 ${px2rem(1)} rgba(0, 0, 0, 0.1);
// `

export default BaseCard
