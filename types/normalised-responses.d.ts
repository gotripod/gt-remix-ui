export interface GTService {
  id: number
  title: string
  excerpt: string
  link: string
  slug: string
  parent: number
}

export interface Project {
  id: number
  heroMedia: MediaItem
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocks: any[]
  logoUrl?: string
}

export interface ProjectListItem {
  id: number
  logoSpriteUrl: string
  excerpt: string
  logoUrl: string
  logoHoverUrl: string
  link: string
  title: string
  projectHero: {
    large: {
      src: string
      srcset: string | false
      sizes: string
    }
    medium: {
      src: string
      srcset: string | false
      sizes: string
    }
    mediumLarge: {
      src: string
      srcset: string | false
      sizes: string
    }
  }
}

export interface Testimonial {
  quote: string
  projectUrl: string
  quoteAuthor: string
}

export interface Category {
  id: number
  name: string
}

export interface Tag {
  id: number
  link: string
  name: string
  slug: string
  taxonomy: string
}

export interface Taxonomy {
  id: number
  link: string
  name: string
  slug: string
  taxonomy: string
}

export interface Menu {
  label: string
  url: string
}

export interface MediaItem {
  id: number
  // date: string
  // date_gmt: string
  // guid: Guid
  // modified: string
  // modified_gmt: string
  // slug: string
  // status: string
  // type: string
  // link: string
  // title: Title
  // author: number
  // comment_status: string
  // ping_status: string
  // template: string
  // meta: any[]
  // acf: any[]
  // description: Description
  // caption: Caption
  // alt_text: string
  // media_type: string
  // mime_type: string
  // media_details: MediaDetails
  // post: number
  // source_url: string
  // _links: Links
}

export interface Pagination {
  totalItems: number
  pageCount: number
  currentPage?: number
}

export interface Page {
  date: string
  title: string
  link: string
  body: string
  yoastHtml: string
  yoastTitle: string
  yoast: {
    metaDesc: string
    metaKeywords: string
  }
  section: {
    body: string
    subtitle: string
    title: string
  }
  subTitle: string
  hero: GQLMediaItem
}

export interface Post {
  yoastHtml: string
  yoastHeadJson: {
    title: string
    description: string | undefined
  }
  modified: Date
  status: 'publish' | 'future' | 'draft' | 'pending' | 'private'
  date: Date
  slug: string
  link: string
  id: number
  title: string
  excerpt: string
  featuredMedia: {
    sizes: {
      thumbnail: {
        sourceUrl: string
      }
      medium: {
        sourceUrl: string
      }
      mediumLarge: {
        sourceUrl: string
      }
    }
  } | null
  content: string
  taxonomies: Taxonomy[]
  teamMember?: {
    position: string
    name: string
    imageUrl: string
  }
}
