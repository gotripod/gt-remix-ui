//#region imports
import type { LoaderArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import type { SitemapFunction } from 'remix-sitemap'

import { getPageBySlug, getProjectBySlug } from '~/api'
import Renderer from '~/components/blocks/renderer'
import Column from '~/components/column'
import MediaImage from '~/components/media-image'
import { mergeMeta } from '~/helpers/seo'

//#endregion

export const sitemap: SitemapFunction = async ({ config }) => {
  const workResponse = await fetch(
    'https://content.gotripod.com/wp-json/wp/v2/project?per_page=100&_fields[]=title&_fields[]=slug&_fields[]=modified'
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = await workResponse.json<any[]>()
  return posts.map((post) => ({
    loc: `/work/${post.slug}`,
    lastmod: post.modified,
    exclude: post.status !== 'publish', // exclude this entry
    // acts only in this loc
    alternateRefs: [
      {
        href: `${config.siteUrl}/work/${post.slug}`,
        absolute: true,
        hreflang: 'en'
      }
    ]
  }))
}

export const meta = mergeMeta<typeof loader>(
  () => {
    return []
  },

  ({ data }) => {
    const title = (data?.project?.title || '') + ' | ' + data?.page.yoastTitle
    const description = (data?.project?.title || '') + ' | ' + data?.page.yoast.metaDesc
    return [
      { title },
      {
        name: 'description',
        content: description
      }
    ]
  }
)
//#region component

const SinglePostPage = () => {
  const { project } = useLoaderData()

  return project ? (
    <Column className="-mt-24 md:-mt-12">
      <MediaImage media={project.heroMedia} />
      <div className="bg-white shadow-card py-4 md:py-24 text-lg">
        {project.blocks.map((block: unknown, i: number) => (
          <Renderer key={i} block={block} />
        ))}
      </div>
    </Column>
  ) : null
}
export default SinglePostPage
//#endregion

//#region styles
// const StyledMediaImage = styled(MediaImage)`
//   width: 100%;
//   margin: -${px2rem(theme.gutter * 4)} 0 0 0;
//   position: relative;
//   z-index: 1;
//   display: block;
// `

// const Content = styled.div`
//   background-color: #fff;
//   box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
//   padding: ${px2rem(theme.gutter * 8)} ${px2rem(theme.gutter * 8)};

//   ${mqLess(breakpoints.medium)} {
//     padding: ${px2rem(theme.gutter)} ${px2rem(theme.gutter * 2)};
//   }
// `

//#endregion

//#region data

export const loader = async (context: LoaderArgs) => {
  const slug = Array.isArray(context.params.slug) ? context.params.slug[0] : context.params.slug

  const [project, page] = await Promise.all([getProjectBySlug(slug), getPageBySlug('work')])

  return json({ project, page })
}

// This function gets called at BUILD time
// export const getStaticPaths: GetStaticPaths = async () => {
//   const projects = await getProjects()

//   // Get the paths we want to pre-render
//   const paths = projects.map((post) => ({
//     params: { slug: post.link }
//   }))

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: true }
// }

//#endregion
