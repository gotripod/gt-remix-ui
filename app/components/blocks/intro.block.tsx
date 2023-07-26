import styled from 'styled-components'
import theme, { px2rem } from '~/theme'

interface Props {
  body: string
}

const Section = styled.section`
  font-size: ${px2rem(theme.fontSize.prominentText)};
  margin-bottom: ${px2rem(theme.gutter * 6)};
`

const IntroBlock = ({ body }: Props) => {
  return <Section dangerouslySetInnerHTML={{ __html: body }} />
}

export default IntroBlock
