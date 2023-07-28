import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import styles from "~/styles.css";
import stylesheet from "~/tailwind.css";
import { cssBundleHref } from "@remix-run/css-bundle";

export const meta = () => [
  {charset: "utf-8"},
  {title: "New Remix App"},
  {viewport: "width=device-width,initial-scale=1"},
];

export const links: LinksFunction = () => {
  return [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: 'anonymous',
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Cabin:wght@400;700&display=swap",
    },
    ...(cssBundleHref
      ? [{ rel: "stylesheet", href: cssBundleHref }]
      : []),
    // {
    //   rel: "stylesheet",
    //   href: styles,
    // },
    { rel: "stylesheet", href: stylesheet },
  ];
};

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
      </body>
    </html>
  );
}
