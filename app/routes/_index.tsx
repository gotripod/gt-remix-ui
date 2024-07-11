/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HeadersFunction } from '@remix-run/cloudflare'
import { Link, PrefetchPageLinks, useLoaderData } from '@remix-run/react'
import { getPageBySlug } from '~/api/page.server'
import { getPostsPage } from '~/api/post.server'
import { getServices } from '~/api/services.server'
import { getTestimonial } from '~/api/testimonial.server'
import Header from '~/components/header'
import ServiceCard from '~/components/service-card'
import { mergeMeta } from '~/helpers/seo'
import { getProjects } from '../api/projects.server'

const Index = () => {
  const { services, articles, projects } = useLoaderData<typeof loader>()

  const workCardClasses = [
    'from-gt-green-dk to-gt-green-lt',
    'from-gt-blue-dk to-gt-blue-lt',
    'from-gray-800 to-gray-500'
  ]

  return (
    <>
      <PrefetchPageLinks page="/" />
      <Header
        title="Our purpose"
        cta={
          <Link to="/#services" className="btn-primary-blue my-2">
            See what we can do for you
          </Link>
        }
        image="/_img/hero-home.jpg"
        subTitle={
          <>
            Let&apos;s create transformative solutions <br />
            to move your business forward
          </>
        }
      />

      <main className="flex-grow antialiased text-gray-90 z-10 bg-white">
        <div className="">
          <section
            className="p-6 bg-slope-br-grey bg-bottom bg-no-repeat bg-contain pb-24"
            id="services">
            <div className="max-w-screen-xl mx-auto">
              <h2 className="text-2xl font-bold text-gt-green">Our services</h2>
              <p className="font-Raleway text-4xl font-bold text-gray-800 mb-14">
                We build web software and work with you as a reliable tech partner
              </p>

              <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    body={service.excerpt}
                    link="/solutions"
                    title={service.title}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="p-6 bg-gt-gray">
            <div className="max-w-screen-xl mx-auto">
              <h2 className="text-2xl font-bold text-gt-blue">Our insights</h2>
              <p className="font-Raleway text-4xl font-bold text-gray-800 mb-14">
                Helping you stay ahead of change
              </p>

              <div className="mb-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-10">
                {articles.map((article) => (
                  <div className=" w-full lg:max-w-full lg:flex" key={article.id}>
                    <div className="flex flex-row lg:flex-col bg-white">
                      <div
                        className={`
									hidden
									md:block
									min-w-80
									min-h-64
									lg:min-w-full
									bg-center bg-cover
                `}
                        style={{
                          backgroundImage: `url(${
                            article.featuredMedia?.sizes &&
                            article.featuredMedia.sizes.mediumLarge.sourceUrl
                          })`
                        }}></div>
                      <div className="flex flex-col grow">
                        <div className="flex flex-col justify-between grow">
                          <div className="p-6 pr-10">
                            <span className="text-sm underline underline-offset-8 decoration-2 decoration-gt-green">
                              Development
                            </span>
                            <h3 className="font-Raleway text-xl font-bold my-5">{article.title}</h3>
                            <div
                              className="mb-5"
                              dangerouslySetInnerHTML={{ __html: article.excerpt }}></div>
                          </div>
                          <div className="p-6 pt-0">
                            <Link
                              to={article.link}
                              className="text-gt-green text-sm font-bold underline">
                              Read more
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-left lg:text-center">
                <a className="btn-primary-blue" href="#">
                  See more insights
                </a>
              </p>
            </div>
          </section>
          <section className="p-6 pb-0 bg-slope-bl-grey bg-bottom bg-no-repeat bg-contain">
            <div className="max-w-screen-xl mx-auto">
              <div className="sm:min-h-[710px] bg-quote-bg bg-cover flex flex-col justify-between">
                <div className="lg:bg-stripes-bg bg-[right_top_50px] bg-no-repeat bg-[length:300px]">
                  <div className="p-3 sm:p-24 text-center sm:text-left">
                    <div className="bg-white w-full lg:w-2/4 p-5 sm:p-10 grow">
                      <p className="text-3xl font-Raleway text-gray-500">
                        &quot;Our goal is to create advantage for all our stakeholders - our
                        clients, people, partners and communities. This goal reflects our growth
                        strategy, our purpose, our core values and our culture of shared
                        success.&quot;
                      </p>
                    </div>
                    <div className="bg-white w-full lg:w-2/4 p-5 sm:p-10 grow">
                      <p className="text-3xl font-Raleway text-gray-500 font-semibold">
                        <span className="text-gt-green">Colin/Simon</span>
                        <br />
                        Founder
                      </p>
                    </div>
                    <div className="bg-white w-full lg:w-2/4 p-5 sm:p-10 ">
                      <p className="">
                        <a className="btn-primary-blue" href="#">
                          Learn our approach
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="p-6 bg-gt-gray">
            <div className="max-w-screen-xl mx-auto">
              <h2 className="text-2xl font-bold text-gt-blue">Our work</h2>
              <p className="font-Raleway text-4xl font-bold text-gray-800 mb-14">
                Reinvent what your business can be
              </p>

              <div className="mb-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-10">
                {projects.map((project, i) => (
                  <div className=" w-full lg:max-w-full lg:flex" key={project.id}>
                    <div
                      className={`flex flex-row lg:flex-col bg-gradient-to-br ${workCardClasses[i]}`}>
                      <div
                        className="
hidden
md:block
min-w-80
min-h-72
lg:min-w-full
bg-center bg-cover
"
                        style={{
                          backgroundImage: `url(${project.logoUrl})`
                        }}></div>
                      <div className="flex flex-col justify-between grow">
                        <div className="text-white p-6 pr-10">
                          <span className="text-sm align-top underline underline-offset-8 decoration-2">
                            Development
                          </span>
                          <h3 className="font-Raleway text-xl font-bold my-5">{project.title}</h3>
                          <p className="mb-5">
                            Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam.
                          </p>
                        </div>
                        <div className="text-white p-6 pt-0">
                          <Link
                            to={'/work/' + project.link}
                            className="text-sm font-bold underline">
                            Read the case study
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-left lg:text-center">
                <Link className="btn-primary-blue" to="/work">
                  See more work
                </Link>
              </p>
            </div>
          </section>

          <section className="bg-gradient-to-r from-gt-green-dk to-gt-green-lt">
            <div className="px-6 py-10 bg-none sm:bg-stripes-bg bg-right bg-no-repeat bg-[length:300px]">
              <div className="max-w-screen-xl mx-auto">
                <h2 className="text-4xl font-bold text-white">Grow your business</h2>
                <p className="font-Raleway text-4xl font-normal text-white mb-14 sm:pr-52">
                  Find out how we can help
                </p>
                <p>
                  <Link className="btn-white-on-green" to="/contact">
                    Get in touch
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer></footer>
    </>
  )
}

export const links = () => {
  return [{ rel: 'canonical', href: 'https://gotripod.com' }]
}

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'public, s-maxage=60'
  }
}

export const meta = mergeMeta<typeof loader>(
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

export const loader = async () => {
  const results = await Promise.all([
    getProjects(),
    getPageBySlug('home'),
    getPostsPage({ perPage: 3 }),
    getServices(),
    getTestimonial()
  ])

  const [projects, page, postPage, services, testimonial] = results

  return {
    projects: projects.slice(0, 3),
    page,
    services,
    articles: postPage.posts,
    testimonial
  }
}

export default Index
