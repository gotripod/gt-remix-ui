import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { json, type LinksFunction } from '@remix-run/cloudflare'
import {
  Links,
  Meta,
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
          </main>
        </>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
