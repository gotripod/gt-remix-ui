import { useMatches } from "@remix-run/react"
import type { Menu } from "~/types"

export const useMenu = () => {
    const matches = useMatches()

  const rootMatch = matches[0]
  return rootMatch.data.menu as Menu[]
}