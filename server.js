import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import { createRequestHandler } from "@remix-run/cloudflare";
import __STATIC_CONTENT_MANIFEST from "__STATIC_CONTENT_MANIFEST";
import path from 'node:path';
import * as remixBuild from "./build/server";

const MANIFEST = JSON.parse(__STATIC_CONTENT_MANIFEST);
const handleRemixRequest = createRequestHandler(remixBuild);

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);



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

      const ttl = url.pathname.startsWith("/build/")
        ? 60 * 60 * 24 * 365 // 1 year
        : 60 * 5; // 5 minutes
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: MANIFEST,
          cacheControl: {
            browserTTL: ttl,
            edgeTTL: ttl,
          },
        }
      );
    } catch (error) {
      // No-op
    }
console.log('CF env', env)
    try {
      const loadContext = {
        cloudflare: {
          // This object matches the return value from Wrangler's
          // `getPlatformProxy` used during development via Remix's
          // `cloudflareDevProxyVitePlugin`:
          // https://developers.cloudflare.com/workers/wrangler/api/#getplatformproxy
          cf: request.cf,
          ctx: {
            waitUntil: ctx.waitUntil,
            passThroughOnException: ctx.passThroughOnException,
          },
          caches,
          env,
        },
      };
      return await handleRemixRequest(request, loadContext);
    } catch (error) {
      console.log(error);
      return new Response("An unexpected error occurred", { status: 500 });
    }
  },
};