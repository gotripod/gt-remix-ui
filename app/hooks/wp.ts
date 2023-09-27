import { useMatches } from '@remix-run/react'
import type { Category, Taxonomy, WPPage } from '~/types'

export const useHero = () => {
  const matches = useMatches()

  const match = matches.find((x) => 'page' in x.data)
  if (match) {
    const page = match.data.page as WPPage
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

  const postsMatch = matches.find((x) => 'posts' in x.data)
  const postMatch = matches.find((x) => 'post' in x.data)
  const pageMatch = matches.find((x) => 'page' in x.data)

  if (postMatch) {
    console.log('postMatch')
    const { post } = postMatch.data

    return {
      title: post.title,
      subTitle: undefined
    }
  } else if (postsMatch) {
    console.log('postMatch')
    const { category, tag, pageNumber } = postsMatch.data

    return {
      title: buildTitle(category, tag, pageNumber),
      subTitle: undefined
    }
  } else if (pageMatch) {
    const page = pageMatch.data.page as WPPage

    return {
      title: page.title,
      subTitle: page.subTitle
    }
  }

  return undefined
}
