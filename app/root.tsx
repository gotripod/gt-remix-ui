import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { json, type LinksFunction } from '@remix-run/cloudflare'
import {
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useRouteError
} from '@remix-run/react'
import { useEffect } from 'react'
import * as gtag from '~/helpers/google.client'
import stylesheet from '~/tailwind.css?url'
import { getMenu } from './api/menu.server'
import { getTestimonial } from './api/testimonial.server'
import ToTop from './components/to-top'

export const DEFAULT_META = [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width,initial-scale=1' },
  { name: 'msapplication-TileColor', content: '#da532c' },
  { name: 'theme-color', content: '#ffffff' }
]

export const meta = () => DEFAULT_META

export const links: LinksFunction = () => {
  return [
    { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap'
    },
    // {
    //   rel: "stylesheet",
    //   href: styles,
    // },
    { rel: 'stylesheet', href: stylesheet }
  ]
}

interface Env {
  GA_TRACKING_ID: string | undefined
}

export function ErrorBoundary() {
  const error = useRouteError()
  console.error(error)
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>There was an unexpected error!</h1>
        {error instanceof Error ? <pre>{error.message}</pre> : null}
        <Scripts />
      </body>
    </html>
  )
}

export const loader = async ({ context }: LoaderFunctionArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const env = ((context?.cloudflare as any)?.env || {}) as Env
  console.log('context', env)
  // For child routes/components
  const menu = await getMenu()
  const testimonial = await getTestimonial()
  return json({ menu, gaTrackingId: env.GA_TRACKING_ID, testimonial })
}

export default function App() {
  const { gaTrackingId, testimonial } = useLoaderData<typeof loader>()
  const location = useLocation()
  useEffect(() => {
    if (gaTrackingId?.length) {
      gtag.pageview(location.pathname, gaTrackingId)
    }
  }, [location, gaTrackingId])

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-screen font-Texgyre">
        {!gaTrackingId && (
          <div>
            <p className="bg-red-500 text-white font-bold p-4 text-center">
              GA_TRACKING_ID not set
            </p>
          </div>
        )}
        <script type="text/javascript" src="https://widget.clutch.co/static/js/widget.js" async />
        {!gaTrackingId ? null : (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`} />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `
              }}
            />
          </>
        )}
        <>
          <main>
            <ToTop />

            <Outlet />

            <nav className="bg-black text-white p-6">
              <div className="max-w-screen-xl mx-auto">
                <div className="flex items-center my-5">
                  <img
                    src="_img/chevron.svg"
                    alt=""
                    width="30px"
                    className="inline max-w-[30px] mr-2"
                  />
                  <NavLink className="text-4xl font-bold hover:text-gt-green" to="#">
                    Subscribe
                  </NavLink>
                </div>

                <div
                  className="
                    py-12     
                    border-y border-gray-400 
                    md:flex 
                    md:flex-row 
                    md:items-center 
                    md:justify-between
                ">
                  <div>
                    <NavLink to="/">
                      <img
                        src="_img/gotripod-logo.png"
                        alt="Go Tripod"
                        width="130px"
                        className="max-w-[130px]"
                      />
                    </NavLink>
                  </div>
                  <div className="w-full md:w-auto md:flex md:items-center">
                    <ul
                      className="
                            py-4
                            my-auto
                            font-Raleway font-semibold text-sm uppercase 
                            md:flex
                            md:justify-between 
                            md:py-0
                        ">
                      <li>
                        <NavLink
                          className="py-1 mx-2 md:mr-5 inline-block hover:text-gt-green-lt"
                          to="/solutions">
                          Solutions
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="py-1 mx-2 md:mx-5 inline-block hover:text-gt-green-lt"
                          to="/work">
                          Work
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="py-1 mx-2 md:mx-5 inline-block hover:text-gt-green-lt"
                          to="/insights">
                          Insights
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="py-1 mx-2 md:mx-5 inline-block hover:text-gt-green-lt"
                          to="/about">
                          About
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="py-1 mx-2 md:ml-5 inline-block hover:text-gt-green-lt"
                          to="/contact">
                          Contact
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <div className="flex">
                    <NavLink
                      className="ml-2"
                      target="_blank"
                      rel="noopener noreferrer"
                      to="https://www.facebook.com/gotripod">
                      <img
                        src="_img/social-li.svg"
                        alt="Visit us on Facebook"
                        width="20px"
                        className="max-w-[20px]"
                      />
                    </NavLink>
                    <NavLink
                      className="ml-2"
                      target="_blank"
                      rel="noopener noreferrer"
                      to="https://twitter.com/gotripod">
                      <img
                        src="_img/social-x.svg"
                        alt="Visit us on Twitter"
                        width="20px"
                        className="max-w-[20px]"
                      />
                    </NavLink>
                    <NavLink
                      className="ml-2"
                      target="_blank"
                      rel="noopener noreferrer"
                      to="https://www.linkedin.com/company/go-tripod-ltd">
                      <img
                        src="_img/social-fb.svg"
                        alt="Visit us on LinkedIn"
                        width="20px"
                        className="max-w-[20px]"
                      />
                    </NavLink>
                  </div>
                </div>

                <div
                  className="
                    text-xs
                    md:flex
                    md:flex-row
                    md:items-center
                    md:justify-between
                ">
                  <div className="pt-6">
                    <ul
                      className="
                            font-semibold tracking-tight                         
                            md:flex
                        ">
                      <li>
                        <NavLink className="py-1 mr-10 inline-block hover:text-gt-green-lt" to="#">
                          Privacy policy
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="py-1 mr-10 inline-block hover:text-gt-green-lt" to="#">
                          Cookie policy
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="py-1 mr-10 inline-block hover:text-gt-green-lt" to="#">
                          Accessibility statement
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="py-1 mr-10 inline-block hover:text-gt-green-lt" to="#">
                          Sitemap
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6">&copy; Go Tripod Ltd. All rights reserved</div>
                </div>
              </div>
            </nav>
          </main>
        </>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
