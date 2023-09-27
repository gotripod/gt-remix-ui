import type { HeadersFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import he from 'he'
import { keysToCamelDeep } from '~/helpers/keys-to-camel'
import { getPageBySlug, getTestimonial } from '../api'
import Column from '../components/column'
import Articles from '../components/home/articles'
import ServiceList from '../components/home/service-list'
import Layout from '../components/layout'
import { mergeMeta } from '~/helpers/seo'

export const links = () => {
  return [{ rel: 'canonical', href: 'https://gotripod.com' }]
}

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'public, s-maxage=60'
  }
}

export const meta = mergeMeta(
  () => [],
  ({ data }) => {
    return [
      {
        name: 'description',
        content: data?.page?.yoast.metaDesc
      },
      { title: data?.page?.yoastTitle || '' }
    ]
  }
)

const Index = () => {
  const { services, articles, testimonial } = useLoaderData<typeof loader>()

  return (
    <Layout testimonial={testimonial}>
      <Column>
        <ServiceList services={services} />
        <Articles articles={articles} />
      </Column>
    </Layout>
  )
}

export const loader = async () => {
  const page = await getPageBySlug('home')
  const postResponse = await fetch('https://content.gotripod.com/wp-json/wp/v2/posts?per_page=3')
  const postData = (await postResponse.json()) as any
  const acfResponse = await fetch('https://content.gotripod.com/wp-json/acf/v3/pages/5')
  let acfData = (await acfResponse.json()) as any

  acfData = keysToCamelDeep(acfData.acf)

  const testimonial = await getTestimonial()

  return json({
    page,
    services: acfData.serviceBuilder.map((s: any) => ({
      imageUrl: s.serviceImage,
      title: s.serviceTitle,
      body: s.serviceBody
    })),
    articles: postData.map((post: any) => ({
      id: post.id,
      date: post.date,
      title: he.decode(post.title.rendered),
      link: `/insights/${post.slug}`
    })),
    testimonial
  })
}

export default Index
