import { ReactElement } from 'react'
import styled from 'styled-components'
import { GalleryImage } from '~/types'
// import { SRLWrapper } from 'simple-react-lightbox'
import { Caption } from '~/components/common'
import theme, { px2rem } from '~/theme'

interface Props {
  images: GalleryImage[]
  caption: string
}

const GalleryBlock = ({ caption, images }: Props): ReactElement => {
  const key = caption && caption.replace(/ /g, '')
  return (
    <>
        <Gallery>
          {images.map((image, idx) => {
            return (
              <A key={`${key}-${idx}`} href={image.url}>
                <Img alt={image.alt} src={image.url} />
              </A>
            )
          })}
        </Gallery>
      <Caption>{caption}</Caption>
    </>
  )
}

const A = styled.a`
  flex: 1 0 30%;
  padding: ${px2rem(theme.gutter * 2)} ${px2rem(theme.gutter * 4)};
`


const Img = styled.img``

const Gallery = styled.section`
  display: flex;
  flex-wrap: wrap;
  background: #ededed;
`

export default GalleryBlock
