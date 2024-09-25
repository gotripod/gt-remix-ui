import { Link, useLoaderData } from '@remix-run/react'
import { getServices } from '~/api/services.server'
import GrowCta from '~/components/grow-cta'
import Header from '~/components/header'
import ServiceCard from '~/components/service-card'

const Solutions = () => {
  const { services } = useLoaderData<typeof loader>()

  const bgMap = [
    null,
    'bg-no-repeat bg-[size:contain,contain,cover] bg-[url:theme(backgroundImage.slope-tl-white),theme(backgroundImage.slope-br-white),theme(backgroundImage.wall-green-bg)] bg-[position:center_top,center_bottom,center_center]  ',
    null,
    'bg-no-repeat bg-[size:contain,contain,cover] bg-[url:theme(backgroundImage.slope-tl-white),theme(backgroundImage.slope-br-white),theme(backgroundImage.wall-blue-bg)] bg-[position:center_top,center_bottom,center_center] ',
    null
  ]

  return (
    <>
      <Header
        title="Our solutions"
        cta={
          <div className="flex gap-2">
            {services
              .filter((service) => service.parent === 0)
              .map((service) => {
                return (
                  <Link
                    key={service.id}
                    to={`/solutions#${service.slug}`}
                    className="btn-primary-blue my-2">
                    {service.title}
                  </Link>
                )
              })}
          </div>
        }
        image="/_img/hero-solutions.jpg"
        subTitle={
          <>
            Delivering custom software and consultancy services
            <br />
            that deliver real business value
          </>
        }
      />

      {services
        .filter((service) => service.parent === 0)
        .map((service, i) => {
          const bg = bgMap[i / bgMap.length]
          const children = services.filter((s) => s.parent === service.id)

          return (
            <section id={service.slug} className={`p-6 pb-20 ${bg}`} key={service.id}>
              <div className="max-w-screen-xl mx-auto">
                <h2 className="font-Raleway text-5xl font-bold text-gray-800">{service.title}.</h2>
                <div
                  className="text-2xl font-bold text-gt-green mb-14"
                  dangerouslySetInnerHTML={{ __html: service.excerpt }}></div>

                <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
                  {children.map((child) => (
                    <ServiceCard key={child.id} title={child.title} body={child.excerpt} />
                  ))}
                </div>
              </div>
            </section>
          )
        })}
      <GrowCta />
    </>
  )
}

export default Solutions

export const loader = async () => {
  const services = await getServices()

  return {
    services
  }
}
