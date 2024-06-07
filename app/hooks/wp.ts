import type { SerializeFrom } from '@remix-run/cloudflare'
import { useMatches } from '@remix-run/react'
import type { loader } from '~/routes/insights'
import type { Category, Taxonomy, WPPage } from '~/types'

export const useHero = () => {
  const matches = useMatches()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const match = matches.find((x: any) => 'page' in x.data)
  if (match) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const page = (match.data as any).page as WPPage
    return page.hero as GQLMediaItem
  }

  return undefined
}

const buildTitle = (
  category: Category | undefined,
  tag: Taxonomy | undefined,
  pageNumber: number | undefined
) => {
  console.log('build title...')
  const ct = category ? ` ${category.name} ` : ''
  const tt = tag ? ` ${tag.name} ` : ''

  const pt = pageNumber ? ` Page ${pageNumber} ` : ''

  const prefix = `${ct}${tt}`

  return `${prefix}${
    prefix.trim().toLowerCase().endsWith('insights') ? 'Posts' : 'Insights'
  }${pt}`.trim()
}

export const usePageTitles = () => {
  const matches = useMatches()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const postsMatch = matches.find((x: any) => 'posts' in x.data)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const postMatch = matches.find((x: any) => 'post' in x.data)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pageMatch = matches.find((x: any) => 'page' in x.data)

  if (postMatch) {
    const { post } = postMatch.data as { post: { title: string } }

    return {
      title: post.title,
      subTitle: undefined
    }
  } else if (postsMatch) {
    const { category, tag, pageNumber } = postsMatch.data as SerializeFrom<typeof loader>

    return {
      title: buildTitle(category, tag, pageNumber),
      subTitle: undefined
    }
  } else if (pageMatch) {
    const { page } = pageMatch.data as SerializeFrom<typeof loader>

    return {
      title: page.title,
      subTitle: page.subTitle
    }
  }

  return undefined
}
