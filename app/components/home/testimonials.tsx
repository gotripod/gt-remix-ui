
import { BlueLink } from '~/components/link'

import { Testimonial } from '~/types'

interface Props {
  testimonial: Testimonial
  className?: string
}

const Testimonials = ({ testimonial, className }: Props) => (
  <section className={"bg-white py-4"}>
    <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
    <p>&mdash; {testimonial.quoteAuthor} {testimonial.projectUrl !== '' && <>&emsp;<BlueLink to={testimonial.projectUrl}>Read the case study</BlueLink></>}</p>

    
  </section>
)

export default Testimonials

// const Wrapper = styled.section`
//   background: white;
//   border-bottom: 5px solid rgba(0, 0, 0, 0.3);
//   text-align: center;
//   padding: ${px2rem(theme.gutter * 4)} ${px2rem(theme.gutter * 8)};

//   blockquote {
//     font-style: italic;
//     font-size: ${px2rem(22)};
//     color: #333;
//     line-height: ${px2rem(32.5)};
//     margin-bottom: ${px2rem(theme.gutter * 2)};
//   }

//   p {
//     color: #999;
//   }

//   ${mqLess(breakpoints.medium)} {
//     padding: ${px2rem(theme.gutter * 4)} ${px2rem(theme.gutter * 4)};
//   }
// `