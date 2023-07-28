
import Testimonials from '~/components/home/testimonials'

import { Testimonial } from '~/types'

interface Props {
  testimonial: Testimonial
}

// const StyledTestimonials = styled(Testimonials)`
//   background: #ededed;
//   border-bottom: 0;
//   margin: ${px2rem(theme.gutter * 6)} -${px2rem(theme.gutter * 8)};
// `

const TestimonialBlock = ({ testimonial }: Props) => {
  return (
    <Testimonials testimonial={testimonial} />
  )
}

export default TestimonialBlock
