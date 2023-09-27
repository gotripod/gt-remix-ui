import type { LoaderArgs } from '@remix-run/cloudflare'
import { json, type LinksFunction } from '@remix-run/cloudflare'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation
} from '@remix-run/react'
import stylesheet from '~/tailwind.css'
import { cssBundleHref } from '@remix-run/css-bundle'
import { lazy, Suspense, useEffect } from 'react'
import rdtStylesheet from 'remix-development-tools/stylesheet.css'
import { getMenu, getTestimonial } from './api'
import * as gtag from '~/helpers/google.client'
import Column from './components/column'
import Contact from './components/contact'
import Footer from './components/footer'
import Header from './components/header'
import Testimonials from './components/home/testimonials'
import LargeNav from './components/nav/large'
import SmallNav from './components/nav/small'
import ToTop from './components/to-top'

const RemixDevTools =
  process.env.NODE_ENV === 'development' ? lazy(() => import('remix-development-tools')) : undefined

export const meta = () => [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width,initial-scale=1' },
  { name: 'msapplication-TileColor', content: '#da532c' },
  { name: 'theme-color', content: '#ffffff' }
]

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
      href: 'https://fonts.googleapis.com/css2?family=Cabin:wght@400;700&display=swap'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap'
    },
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
    // {
    //   rel: "stylesheet",
    //   href: styles,
    // },
    { rel: 'stylesheet', href: stylesheet },
    ...(rdtStylesheet && process.env.NODE_ENV === 'development'
      ? [{ rel: 'stylesheet', href: rdtStylesheet }]
      : [])
  ]
}

interface Env {
  GA_TRACKING_ID: string | undefined
}

export const loader = async ({ context }: LoaderArgs) => {
  const env = context.env as Env

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
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {process.env.NODE_ENV === 'development' || !gaTrackingId ? null : (
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
          <main className="bg-main-dots">
            <LargeNav />
            <ToTop />
            <SmallNav />
            <Header />

            <div className="relative z-[250] -mt-20">
              <Outlet />
            </div>

            <Contact />
            {testimonial && location.pathname === '/' && (
              <Column>
                <Testimonials testimonial={testimonial} />
              </Column>
            )}
            <Footer />
          </main>
        </>

        <ScrollRestoration />
        {false && <Scripts />}
        <LiveReload />
        {RemixDevTools && (
          <Suspense>
            <RemixDevTools />
          </Suspense>
        )}
      </body>
    </html>
  )
}
