import he from 'he'
import type { Pagination, Post } from 'types/normalised-responses'
import z from 'zod'
import PostSchema from '~/schemas/wp/post'
import { TeamMemberSchema } from '~/schemas/wp/team-member.server'

export const getPostPreview = async (
  id: string,
  nonce: string,
  request: Request
): Promise<Post> => {
  console.log('sending nonce and cookies', nonce, request.headers.get('cookie'))

  const response = await fetch(
    `https://content.gotripod.com/wp-json/wp/v2/posts/${id}?preview=true&_wpnonce=${nonce}&_embed=1`,
    {
      headers: { cookie: request.headers.get('cookie') || '' }
    }
  )
  const json = await response.json()

  const wpPost = PostSchema.parse(json)

  return postResponseToPost(wpPost)
}

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const response = await fetch(
    `https://content.gotripod.com/wp-json/wp/v2/posts?_embed=1&slug=${slug}`
  )
  const json = await response.json()

  const wpPost = z.array(PostSchema).parse(json)

  return postResponseToPost(wpPost[0])
}

export interface PostPageParams {
  categoryId?: number
  tagId?: number
  perPage?: number
  page?: number
}

export const getPostsPage = async (
  params: PostPageParams
): Promise<{
  posts: Post[]
  pagination: Pagination
}> => {
  const { categoryId, tagId, page, perPage = 18 } = params

  const url = `https://content.gotripod.com/wp-json/wp/v2/posts?_embed=1&per_page=${perPage}${
    page ? `&page=${page}` : ''
  }${categoryId ? `&categories=${categoryId}` : ''}${tagId ? `&tags=${tagId}` : ''}`
  // console.log('Fetching posts', url)
  const response = await fetch(url)
  const posts = await response.json()

  const parsedPosts = z.array(PostSchema).parse(posts)

  return {
    posts: await Promise.all(parsedPosts.map(postResponseToPost)),
    pagination: {
      currentPage: page,
      totalItems: Number(response.headers.get('x-wp-total')),
      pageCount: Number(response.headers.get('x-wp-totalpages'))
    }
  }
}

const postResponseToPost = async (post: z.infer<typeof PostSchema>): Promise<Post> => {
  //console.log('post.acf', post)
  const teamMemberId = post.acf?.article_author ? post.acf.article_author.ID : null
  //console.log('teamMemberId', teamMemberId)
  let teamMember
  if (teamMemberId) {
    const tmUrl = `https://content.gotripod.com/wp-json/wp/v2/team_member/${teamMemberId}`

    const teamMemberResponse = await fetch(tmUrl)
    const teamMemberJson = await teamMemberResponse.json()

    teamMember = TeamMemberSchema.parse(teamMemberJson)
  }

  const featured = post._embedded?.['wp:featuredmedia']?.[0]
  // console.log(featured?.media_details)
  return {
    status: post.status,
    modified: post.modified,
    yoastHeadJson: {
      title: post.yoast_head_json.title,
      description: post.yoast_head_json.description
    },
    yoastHtml: post.yoast_head,
    id: post.id,
    featuredMedia: featured
      ? {
          sizes: {
            thumbnail: {
              sourceUrl: featured.media_details.sizes.thumbnail.source_url
            },
            medium: {
              sourceUrl: featured.media_details.sizes.medium.source_url
            },
            mediumLarge: {
              sourceUrl: featured.media_details.sizes.medium_large.source_url
            }
          }
        }
      : null,
    title: he.decode(post.title.rendered),
    content: post.content.rendered,
    date: post.date,
    slug: post.slug,
    link: post.link,
    excerpt: post.excerpt.rendered,
    taxonomies: post._embedded?.['wp:term']
      ? post._embedded['wp:term']
          .flat()
          .map(({ id, name, link, taxonomy, slug }) => ({ id, name, link, taxonomy, slug }))
      : [],
    teamMember: teamMember
      ? {
          name: teamMember.title.rendered as string,
          position: teamMember.acf.team_member_position as string,
          imageUrl: ''
        }
      : undefined
  }
}
