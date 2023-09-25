import { json, type LinksFunction } from '@remix-run/cloudflare'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'
import stylesheet from '~/tailwind.css'
import { cssBundleHref } from '@remix-run/css-bundle'
import { lazy, Suspense, useEffect } from 'react'
import rdtStylesheet from 'remix-development-tools/stylesheet.css'
import { getMenu } from './api'
import * as gtag from '~/helpers/google.client'

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

export const loader = async () => {
  // For child routes/components
  const menu = await getMenu()
  return json({ menu, gaTrackingId: process.env.GA_TRACKING_ID })
}

export default function App() {
  const { gaTrackingId } = useLoaderData<typeof loader>()

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
        <Outlet />
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
