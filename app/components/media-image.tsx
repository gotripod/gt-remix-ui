import type { MediaItem } from '~/types'

interface Props {
  media: MediaItem
  className?: string
}

const MediaImage = ({ media, className }: Props) => {
  return <img className={className} src={media.media_details.sizes.full.source_url} />
}

export default MediaImage
