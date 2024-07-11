import {
  cloudflareDevProxyVitePlugin,
  vitePlugin as remix,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    cloudflareDevProxyVitePlugin(),
    remix({
      future: {
        unstable_singleFetch: true,
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      routes: async (defineRoutes) => {
        return defineRoutes((route) => {
          route("/insights/page/:page", "routes/insights.tsx", {
            id: 'insights-paged',
            index: true
          });
          route("/insights/category/:category", "routes/insights.tsx", {
            id: 'insights-category',
            index: true
          });
          route("/insights/category/:category/page/:page", "routes/insights.tsx", {
            id: 'insights-category-paged',
            index: true
          });
          route("/insights/topic/:tag", "routes/insights.tsx", {
            id: 'insights-tag',
            index: true
          });
          route("/insights/topic/:tag/page/:page", "routes/insights.tsx", {
            id: 'insights-tag-paged',
            index: true
          });
        });
      }
    }),
    tsconfigPaths(),
  ],
  ssr: {
    resolve: {
      conditions: ["workerd", "worker", "browser"],
    },
  },
  resolve: {
    mainFields: ["browser", "module", "main"],
  },
  build: {
    minify: true,
  },
});
