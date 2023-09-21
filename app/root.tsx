import type { LinksFunction } from '@remix-run/cloudflare'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import stylesheet from '~/tailwind.css'
import { cssBundleHref } from '@remix-run/css-bundle'
import { lazy, Suspense } from 'react'
import rdtStylesheet from 'remix-development-tools/stylesheet.css'
const RemixDevTools =
  process.env.NODE_ENV === 'development' ? lazy(() => import('remix-development-tools')) : undefined

export const meta = () => [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width,initial-scale=1' }
]

export const links: LinksFunction = () => {
  return [
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

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
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
