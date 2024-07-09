/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HeadersFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import he from 'he'
import Header from '~/components/header'
import { keysToCamelDeep } from '~/helpers/keys-to-camel'
import { mergeMeta } from '~/helpers/seo'
import { getPageBySlug, getTestimonial } from '../api'

const Index = () => {
  const { services, articles } = useLoaderData<typeof loader>()

  return (
    <>
      <header>
        <div className="relative min-h-[75vh] overflow-hidden bg-black">
          <div className="min-h-[75vh] flex flex-col justify-between">
            <Header />
            <div className="relative z-10">
              <div className="bg-slope-bl-white bg-bottom bg-no-repeat bg-contain p-6 pb-24">
                <div className="max-w-screen-xl mx-auto pb-4 md:pb-12">
                  <h1 className="text-3xl font-bold text-gt-green pb-2 border-b border-white bg-black bg-opacity-50 p-2 md:bg-transparent">
                    Our purpose
                  </h1>
                  <p className="font-Raleway text-4xl font-bold text-white mb-14 bg-black bg-opacity-50 p-2 md:bg-transparent">
                    Let's create transformative solutions <br />
                    to move your business forward
                  </p>
                  <a href="#services" className="btn-primary-blue my-2">
                    See what we can do for you
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-black bg-[center_40%] bg-no-repeat bg-cover bg-hero-home min-h-[75vh] z-0 perspectiveHero "></div>
        </div>
      </header>

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
                <div className="pt-3 pr-3 bg-right-top bg-no-repeat bg-box-corner-blue hover:bg-box-corner-green flex">
                  <a href="solutions.asp#develop" className="inline-flex">
                    <div className="bg-gt-gray p-5 text-gray-800 hover:bg-gray-800 hover:text-white ease-in-out duration-300">
                      <h3 className="font-Raleway text-2xl font-extrabold">Develop.</h3>
                      <p className="mt-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad sed do
                        eiusmod tempor incididunt consectetur adipiscingelit, minim veniam.
                      </p>
                    </div>
                  </a>
                </div>

                <div className="pt-3 pr-3 bg-right-top bg-no-repeat bg-box-corner-blue hover:bg-box-corner-green flex">
                  <a href="solutions.asp#maintain" className="inline-flex">
                    <div className="bg-gt-gray p-5 text-gray-800 hover:bg-gray-800 hover:text-white ease-in-out duration-300">
                      <h3 className="font-Raleway text-2xl font-extrabold">Maintain.</h3>
                      <p className="mt-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad sed do
                        eiusmod tempor incididunt consectetur adipiscingelit, minim veniam.
                      </p>
                      <p className="mt-5">
                        Ut enim ad sed do eiusmod tempor incididunt consectetur adipiscingelit,
                        minim veniam.
                      </p>
                    </div>
                  </a>
                </div>

                <div className="pt-3 pr-3 bg-right-top bg-no-repeat bg-box-corner-blue hover:bg-box-corner-green flex">
                  <a href="solutions.asp#modernise" className="inline-flex">
                    <div className="bg-gt-gray p-5 text-gray-800 hover:bg-gray-800 hover:text-white ease-in-out duration-300">
                      <h3 className="font-Raleway text-2xl font-extrabold">Modernise.</h3>
                      <p className="mt-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad sed do
                        eiusmod tempor incididunt consectetur adipiscingelit, minim veniam.
                      </p>
                    </div>
                  </a>
                </div>

                <div className="pt-3 pr-3 bg-right-top bg-no-repeat bg-box-corner-blue hover:bg-box-corner-green flex">
                  <a href="solutions.asp#strategise" className="inline-flex">
                    <div className="bg-gt-gray p-5 text-gray-800 hover:bg-gray-800 hover:text-white ease-in-out duration-300">
                      <h3 className="font-Raleway text-2xl font-extrabold">Strategise.</h3>
                      <p className="mt-5">
                        Ut enim ad sed do eiusmod tempor incididunt consectetur adipiscingelit,
                        minim veniam.
                      </p>
                      <p className="mt-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad sed do
                        eiusmod tempor incididunt consectetur adipiscingelit, minim veniam.
                      </p>
                    </div>
                  </a>
                </div>

                <div className="pt-3 pr-3 bg-right-top bg-no-repeat bg-box-corner-blue hover:bg-box-corner-green flex">
                  <a href="solutions.asp#design" className="inline-flex">
                    <div className="bg-gt-gray p-5 text-gray-800 hover:bg-gray-800 hover:text-white ease-in-out duration-300">
                      <h3 className="font-Raleway text-2xl font-extrabold">Design.</h3>
                      <p className="mt-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad sed do
                        eiusmod tempor incididunt consectetur adipiscingelit, minim veniam.
                      </p>
                    </div>
                  </a>
                </div>
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
                <div className=" w-full lg:max-w-full lg:flex">
                  <div className="flex flex-row lg:flex-col bg-white">
                    <div
                      className="
									hidden 
									md:block 
									min-w-80 
									min-h-64
									lg:min-w-full
									bg-center bg-cover
									bg-[url('_img/insights-placeholder-01.jpg')]
									"></div>
                    <div className="flex flex-col grow">
                      <div className="flex flex-col justify-between grow">
                        <div className="p-6 pr-10">
                          <span className="text-sm underline underline-offset-8 decoration-2 decoration-gt-green">
                            Development
                          </span>
                          <h3 className="font-Raleway text-xl font-bold my-5">
                            Fuelling intelligent operations in the cloud
                          </h3>
                          <p className="mb-5">
                            Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam.
                          </p>
                        </div>
                        <div className="p-6 pt-0">
                          <a href="#" className="text-gt-green text-sm font-bold underline">
                            Read more
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" w-full lg:max-w-full lg:flex">
                  <div className="flex flex-row lg:flex-col bg-white">
                    <div
                      className="
									hidden 
									md:block 
									min-w-80 
									min-h-64
									lg:min-w-full
									bg-center bg-cover
									bg-[url('_img/insights-placeholder-02.jpg')]
									"></div>
                    <div className="flex flex-col grow">
                      <div className="flex flex-col justify-between grow">
                        <div className="p-6 pr-10">
                          <span className="text-sm underline underline-offset-8 decoration-2 decoration-gt-green">
                            Development
                          </span>
                          <h3 className="font-Raleway text-xl font-bold my-5">
                            Fuelling intelligent operations in the cloud
                          </h3>
                          <p className="mb-5">
                            Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam.
                          </p>
                          <p className="mb-5">
                            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam.
                          </p>
                        </div>
                        <div className="p-6 pt-0">
                          <a href="#" className="text-gt-green text-sm font-bold underline">
                            Read more
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" w-full lg:max-w-full lg:flex">
                  <div className="flex flex-row lg:flex-col bg-white">
                    <div
                      className="
									hidden 
									md:block 
									min-w-80 
									min-h-64
									lg:min-w-full
									bg-center bg-cover
									bg-[url('_img/insights-placeholder-03.jpg')]
									"></div>
                    <div className="flex flex-col grow">
                      <div className="flex flex-col justify-between grow">
                        <div className="p-6 pr-10">
                          <span className="text-sm underline underline-offset-8 decoration-2 decoration-gt-green">
                            Development
                          </span>
                          <h3 className="font-Raleway text-xl font-bold my-5">
                            Fuelling intelligent operations in the cloud
                          </h3>
                          <p className="mb-5">
                            cLorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam.
                          </p>
                        </div>
                        <div className="p-6 pt-0">
                          <a href="#" className="text-gt-green text-sm font-bold underline">
                            Read more
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                        "Our goal is to create advantage for all our stakeholders - our clients,
                        people, partners and communities. This goal reflects our growth strategy,
                        our purpose, our core values and our culture of shared success."
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
                <div className=" w-full lg:max-w-full lg:flex">
                  <div className="flex flex-row lg:flex-col bg-gradient-to-br from-gt-green-dk to-gt-green-lt">
                    <div
                      className="
									hidden 
									md:block 
									min-w-80 
									min-h-72
									lg:min-w-full
									bg-center bg-cover
									bg-[url('_img/work-placeholder-01.jpg')]
									"></div>
                    <div className="flex flex-col justify-between grow">
                      <div className="text-white p-6 pr-10">
                        <span className="text-sm align-top underline underline-offset-8 decoration-2">
                          Strategy
                        </span>
                        <h3 className="font-Raleway text-xl font-bold my-5">
                          Fuelling intelligent operations in the cloud
                        </h3>
                        <p className="mb-5">
                          Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                          veniam.
                        </p>
                      </div>
                      <div className="text-white p-6 pt-0">
                        <a href="#" className="text-sm font-bold underline">
                          Read the case study
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" w-full lg:max-w-full lg:flex">
                  <div className="flex flex-row lg:flex-col bg-gradient-to-br from-gt-blue-dk to-gt-blue-lt">
                    <div
                      className="
									hidden 
									md:block 
									min-w-80 
									min-h-72
									lg:min-w-full
									bg-center bg-cover
									bg-[url('_img/work-placeholder-01.jpg')]
									"></div>
                    <div className="flex flex-col justify-between grow">
                      <div className="text-white p-6 pr-10">
                        <span className="text-sm align-top underline underline-offset-8 decoration-2">
                          Development
                        </span>
                        <h3 className="font-Raleway text-xl font-bold my-5">
                          Fuelling intelligent operations in the cloud
                        </h3>
                        <p className="mb-5">
                          Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                          veniam.
                        </p>
                        <p className="mb-5">
                          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                          ad minim veniam.
                        </p>
                      </div>
                      <div className="text-white p-6 pt-0">
                        <a href="#" className="text-sm font-bold underline">
                          Read the case study
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" w-full lg:max-w-full lg:flex">
                  <div className="flex flex-row lg:flex-col bg-gradient-to-br from-gray-800 to-gray-500">
                    <div
                      className="
									hidden 
									md:block 
									min-w-80 
									min-h-72
									lg:min-w-full
									bg-center bg-cover
									bg-[url('_img/work-placeholder-01.jpg')]
									"></div>
                    <div className="flex flex-col justify-between grow">
                      <div className="text-white p-6 pr-10">
                        <span className="text-sm align-top underline underline-offset-8 decoration-2">
                          Design
                        </span>
                        <h3 className="font-Raleway text-xl font-bold my-5">
                          Fuelling intelligent operations in the cloud
                        </h3>
                        <p className="mb-5">
                          Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                          veniam.
                        </p>
                      </div>
                      <div className="text-white p-6 pt-0">
                        <a href="#" className="text-sm font-bold underline">
                          Read the case study
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-left lg:text-center">
                <a className="btn-primary-blue" href="work.asp">
                  See more work
                </a>
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
                  <a className="btn-white-on-green" href="contact.asp">
                    Get in touch
                  </a>
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
