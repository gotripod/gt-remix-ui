import { ReactElement } from 'react'

import { GalleryImage } from '~/types'
// import { SRLWrapper } from 'simple-react-lightbox'
import { Caption } from '~/components/common'
import { Link } from '@remix-run/react'


interface Props {
  images: GalleryImage[]
  caption: string
}

const GalleryBlock = ({ caption, images }: Props): ReactElement => {
  const key = caption && caption.replace(/ /g, '')
  return (
    <div className='px-28'>
        <section className='grid grid-cols-2 gap-16 p-8 bg-slate-100'>
          {images.map((image, idx) => {
            return (
              <Link key={`${key}-${idx}`} to={image.url}>
                <img alt={image.alt} src={image.url} />
              </Link>
            )
          })}
        </section>
      <Caption>{caption}</Caption>
    </div>
  )
}

// const A = styled.a`
//   flex: 1 0 30%;
//   padding: ${px2rem(theme.gutter * 2)} ${px2rem(theme.gutter * 4)};
// `



// const Gallery = styled.section`
//   display: flex;
//   flex-wrap: wrap;
//   background: #ededed;
// `

export default GalleryBlock
