import type { MediaItem } from 'types/normalised-responses'
import FeaturedMediaSchema from '~/schemas/wp/media.server'

export const getMediaById = async (mediaId: number): Promise<MediaItem> => {
  const response = await fetch(`https://content.gotripod.com/wp-json/wp/v2/media/${mediaId}`)
  const json = await response.json()

  const media = FeaturedMediaSchema.parse(json)

  return media
}
