import { useMatches } from '@remix-run/react'
import type { Menu } from '~/types'
import type { loader as RootLoader } from '~/root'
import type { SerializeFrom } from '@remix-run/cloudflare'

export const useMenu = () => {
  const matches = useMatches()

  const rootMatch = matches[0]
  const data = rootMatch.data as SerializeFrom<typeof RootLoader>
  return data.menu as Menu[]
}
