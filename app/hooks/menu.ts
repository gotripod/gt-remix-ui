import type { SerializeFrom } from '@remix-run/cloudflare'
import { useMatches } from '@remix-run/react'
import type { Menu } from 'types/normalised-responses'
import type { loader as RootLoader } from '~/root'

export const useMenu = () => {
  const matches = useMatches()

  const rootMatch = matches[0]
  const data = rootMatch.data as SerializeFrom<typeof RootLoader>
  return data.menu as Menu[]
}
