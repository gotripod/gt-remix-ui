import { useMatches } from "@remix-run/react"
import type { WPPage } from "~/types"

export const useHero = () => {
    const matches = useMatches()

    const match = matches.find(x => 'page' in x.data)
    if(match) {
        const page = match.data.page as WPPage
        return page.hero as GQLMediaItem
    }

    return undefined
}

export const usePageTitles = () => {
    const matches = useMatches()

    const match = matches.find(x => 'page' in x.data)

    if(match) {
        const page = match.data.page as WPPage

        return {
            title: page.title,
            subTitle: page.subTitle
        }
    }

    return undefined
}