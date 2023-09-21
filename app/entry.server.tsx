/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import type { EntryContext } from '@remix-run/cloudflare'
import { RemixServer } from '@remix-run/react'
import isbot from 'isbot'
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
  remixContext: EntryContext
) {
  if (isSitemapUrl(request)) return await sitemap(request, remixContext)

  const context =
    process.env.NODE_ENV === 'development'
      ? await import('remix-development-tools').then(({ initRouteBoundariesServer }) =>
          initRouteBoundariesServer(remixContext)
        )
      : remixContext
  const body = await renderToReadableStream(<RemixServer context={context} url={request.url} />, {
    signal: request.signal,
    onError(error: unknown) {
      // Log streaming rendering errors from inside the shell
      console.error(error)
      responseStatusCode = 500
    }
  })

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady
  }

  responseHeaders.set('Content-Type', 'text/html')
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  })
}
