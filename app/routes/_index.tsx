import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import he from 'he'
import { keysToCamelDeep } from '~/helpers/keys-to-camel'
import { getPageBySlug, getTestimonial } from '../api'
import Column from '../components/column'
import Articles from '../components/home/articles'
import ServiceList from '../components/home/service-list'
import Layout from '../components/layout'

const Index = () => {
  const { services, articles, testimonial, heroHtml, page } = useLoaderData<typeof loader>()

  return (
    <Layout testimonial={testimonial} heroHtml={heroHtml}>
      {/* <Head>
        <title>{page.yoastTitle}</title>
        {parse(page.yoastHtml)}
      </Head> */}
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
    heroHtml: '',
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
      link: `/insights/${post.slug}/`
    })),
    testimonial
  })
}

export default Index
