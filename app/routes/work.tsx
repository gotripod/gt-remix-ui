import { Link, json, useLoaderData } from '@remix-run/react'
import type { ProjectListItem } from 'types/normalised-responses'
import { getPageBySlug } from '~/api/page.server'
import { getProjects } from '~/api/projects.server'
import Header from '~/components/header'
import { mergeMeta } from '~/helpers/seo'

export const meta = mergeMeta<typeof loader>(
  () => {
    return []
  },

  ({ data }) => {
    return [
      { title: data?.page?.yoastTitle || '' },
      {
        name: 'description',
        content: data?.page?.yoast.metaDesc
      }
    ]
  }
)

export const loader = async () => {
  const [projects, page] = await Promise.all([getProjects(), getPageBySlug('work')])

  return json({
    page,
    projects
  })
}

const Index = () => {
  const loaderData = useLoaderData<typeof loader>()

  const projects = loaderData.projects as ProjectListItem[]

  return (
    <>
      <Header
        title="Our work"
        cta={
          <>
            <Link to="#websites" className="btn-primary-blue my-2">
              Web sites
            </Link>
            <Link to="#websites" className="btn-primary-blue my-2">
              Web apps
            </Link>
            <Link to="#websites" className="btn-primary-blue my-2">
              Wordpress
            </Link>
            <Link to="#websites" className="btn-primary-blue my-2">
              Mobile
            </Link>
          </>
        }
        subTitle={
          <>
            See how we&apos;ve helped our clients become the next <br />
            and best versions of themselves
          </>
        }
      />

      <section className="p-6 py-12 bg-gt-gray" id="websites">
        <div className="max-w-screen-xl mx-auto">
          <div className="bg-postits min-h-[800px] flex flex-col justify-end">
            <div className="bg-white min-h-[400px] w-full md:w-3/5 lg:w-2/5 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gt-green">Web sites</h2>
                <p className="font-Raleway text-4xl font-bold text-gray-800 mb-10">
                  Tranformation
                  <br /> from every angle
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </p>
              </div>
              <div>
                <a className="btn-primary-blue text-xs font-bold mt-1" href="#casestudies">
                  See the case studies
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-slope-tr-grey bg-top bg-no-repeat bg-contain p-6 py-24"
        id="casestudies">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-2xl font-bold text-gt-blue">Case studies</h2>
          <p className="font-Raleway text-4xl font-bold text-gray-800 mb-14">
            Ut enim ad minim veniam
          </p>

          <div className="mb-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10">
            {projects.map((project) => (
              <div className=" w-full lg:max-w-full lg:flex shadow-md" key={project.id}>
                <div className="flex flex-row lg:flex-col bg-gt-gray">
                  <div
                    className="
									hidden 
									md:block 
									min-w-80 
									min-h-96
									lg:min-w-full
									bg-center bg-cover
									
									"
                    style={{
                      backgroundImage: `url(${project.projectHero.large.src})`
                    }}></div>
                  <div className="flex flex-col grow">
                    <div className="flex flex-col justify-between grow">
                      <div className="p-6 pr-10 mb-8">
                        <span className="text-sm underline underline-offset-8 decoration-2 decoration-gt-green">
                          Client: {project.title}
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
                        <a href="#" className="text-gt-green text-sm font-bold underline">
                          Read more
                        </a>
                      </div>
                      <div className="p-6 pt-0">
                        <span className="btn-disabled-white text-xs font-light mt-1">Design</span>
                        <span className="btn-disabled-white text-xs font-light mt-1">
                          Development
                        </span>
                        <span className="btn-disabled-white text-xs font-light mt-1">UI/UX</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Index
