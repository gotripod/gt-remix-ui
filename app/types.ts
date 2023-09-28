export type ISODateString = string

export interface Menu {
  label: string
  url: string
}

export interface WPPost {
  modified: ISODateString
  slug: string
  title: {
    rendered: string
  },
  status: 'publish' | 'draft'
}

export interface WPPage {
  date: string
  title: string
  link: string
  body: string
  yoastHtml: string
  yoastTitle: string
  yoast: {
    metaDesc: string
    metaKeywords: string
  },
  section: {
    body: string
    subtitle: string
    title: string
  },
  subTitle: string
  hero: GQLMediaItem
}

export interface Category {
  id: number
  name: string
}

export interface Pagination {
  totalItems: number
  pageCount: number
  currentPage?: number
}

export interface Testimonial {
  quote: string
  projectUrl: string
  quoteAuthor: string
}

export interface Article {
  id: string
  date: string
  title: string
  link: string
}

export interface Service {
  body: string
  title: string
  imageUrl: string
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

export interface Post {
  yoastHtml: string
  date: string
  slug: string
  link: string
  id: number
  title: string
  content: string
  taxonomies: Taxonomy[]
  teamMember?: {
    position: string
    name: string
    imageUrl: string
  }
}

export interface Project {
  id: number
  heroMedia: MediaItem
  title: string
  blocks: any[]
  logoUrl?: string
}

export interface ProjectListItem {
  id: string
  logoSpriteUrl: string
  logoUrl: string
  logoHoverUrl: string
  link: string
  title: string
}

export interface GalleryImage {
  alt: string
  url: string
}

export interface Guid {
  rendered: string
}

export interface Title {
  rendered: string
}

export interface Description {
  rendered: string
}

export interface Caption {
  rendered: string
}

export interface MediaItemImage {
  file: string
  width: number
  height: number
  mime_type: string
  source_url: string
}

export interface Sizes {
  thumbnail: MediaItemImage
  medium: MediaItemImage
  medium_large: MediaItemImage
  large: MediaItemImage
  full: MediaItemImage
}

export interface ImageMeta {
  aperture: string
  credit: string
  camera: string
  caption: string
  created_timestamp: string
  copyright: string
  focal_length: string
  iso: string
  shutter_speed: string
  title: string
  orientation: string
  keywords: any[]
}

export interface MediaDetails {
  width: number
  height: number
  file: string
  sizes: Sizes
  image_meta: ImageMeta
}

export interface Self {
  href: string
}

export interface Collection {
  href: string
}

export interface About {
  href: string
}

export interface Author {
  embeddable: boolean
  href: string
}

export interface Reply {
  embeddable: boolean
  href: string
}

export interface Links {
  self: Self[]
  collection: Collection[]
  about: About[]
  author: Author[]
  replies: Reply[]
}

export interface MediaItem {
  id: number
  date: Date
  date_gmt: Date
  guid: Guid
  modified: Date
  modified_gmt: Date
  slug: string
  status: string
  type: string
  link: string
  title: Title
  author: number
  comment_status: string
  ping_status: string
  template: string
  meta: any[]
  acf: any[]
  description: Description
  caption: Caption
  alt_text: string
  media_type: string
  mime_type: string
  media_details: MediaDetails
  post: number
  source_url: string
  _links: Links
}
