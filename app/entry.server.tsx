import type { EntryContext } from '@remix-run/cloudflare'
import { RemixServer } from '@remix-run/react'
import * as isbotModule from 'isbot'
import { renderToReadableStream } from 'react-dom/server'
import { createSitemapGenerator } from 'remix-sitemap'

// Step 1. setup the generator
const { isSitemapUrl, sitemap } = createSitemapGenerator({
  siteUrl: 'https://gotripod.com',
  generateRobotsTxt: true
  // configure other things here
})

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cfContext: any
) {
  // https://github.com/fedeya/remix-sitemap/issues/68
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (isSitemapUrl(request)) return await sitemap(request, remixContext as any)

  const body = await renderToReadableStream(
    <RemixServer
      context={{
        ...remixContext,
        ...cfContext
      }}
      url={request.url}
    />,
    {
      signal: request.signal,
      onError(error: unknown) {
        // Log streaming rendering errors from inside the shell
        console.error(error)
        responseStatusCode = 500
      }
    }
  )

  if (isBotRequest(request.headers.get('user-agent'))) {
    await body.allReady
  }

  responseHeaders.set('Content-Type', 'text/html')
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  })
}

// We have some Remix apps in the wild already running with isbot@3 so we need
// to maintain backwards compatibility even though we want new apps to use
// isbot@4.  That way, we can ship this as a minor Semver update to @remix-run/dev.
function isBotRequest(userAgent: string | null) {
  if (!userAgent) {
    return false
  }

  // isbot >= 3.8.0, >4
  if ('isbot' in isbotModule && typeof isbotModule.isbot === 'function') {
    return isbotModule.isbot(userAgent)
  }

  // isbot < 3.8.0
  if ('default' in isbotModule && typeof isbotModule.default === 'function') {
    return isbotModule.default(userAgent)
  }

  return false
}
