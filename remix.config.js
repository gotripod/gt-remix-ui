/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  server: "./server.ts",
  serverConditions: ["workerd", "worker", "browser"],
  serverDependenciesToBundle: [
    // bundle verything except the virtual module for the static content manifest provided by wrangler
    /^(?!.*\b__STATIC_CONTENT_MANIFEST\b).*$/,
  ],
  serverMainFields: ["browser", "module", "main"],
  serverMinify: true,
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  tailwind: true,
  future: {
    v2_dev: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
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
};
