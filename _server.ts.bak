import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import type { AppLoadContext } from '@remix-run/cloudflare'
import { createRequestHandler, logDevReady } from '@remix-run/cloudflare'
import * as build from '@remix-run/dev/server-build'
import __STATIC_CONTENT_MANIFEST from '__STATIC_CONTENT_MANIFEST'
import path from 'path'
const MANIFEST = JSON.parse(__STATIC_CONTENT_MANIFEST)
const handleRemixRequest = createRequestHandler(build, process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
  logDevReady(build)
}

export default {
  async fetch(
    request: Request,
    env: {
      __STATIC_CONTENT: Fetcher
    },
    ctx: ExecutionContext
  ): Promise<Response> {
    try {
      const url = new URL(request.url)

      // console.log('Fetching path', url.pathname)

      const ext = path.extname(url.pathname)

      // console.log('Detected extension', ext)

      // console.log(url.pathname.endsWith('/'), url.pathname !== '/', ext.length === 0)

      if (url.pathname.endsWith('/') && url.pathname !== '/' && ext.length === 0) {
        // console.log('Redirecting due to extensionless slash')
        const isDataRequest = url.searchParams.has('_data')
        if (isDataRequest) {
          url.searchParams.delete('_data')
          const redirectUrl = url.origin + url.pathname.substring(0, url.pathname.length - 1)
          return new Response(undefined, {
            headers: {
              'x-remix-redirect': redirectUrl
            },
            status: 204
          })
        }

        // console.log('Not trailing slash URL')

        const redirectUrl = url.origin + url.pathname.substring(0, url.pathname.length - 1)

        return Response.redirect(redirectUrl, 301)
      }

      // console.log('Proceeding with request')

      const ttl = url.pathname.startsWith('/build/')
        ? 60 * 60 * 24 * 365 // 1 year
        : 60 * 5 // 5 minutes
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx)
        } as FetchEvent,
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: MANIFEST,
          cacheControl: {
            browserTTL: ttl,
            edgeTTL: ttl
          }
        }
      )
    } catch (error) {
      console.error(error)
    }

    try {
      const loadContext: AppLoadContext = {
        env
      }
      return await handleRemixRequest(request, loadContext)
    } catch (error) {
      console.log(error)
      return new Response('An unexpected error occurred', { status: 500 })
    }
  }
}
