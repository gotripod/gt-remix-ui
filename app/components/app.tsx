import { Links, Meta, Scripts, ScrollRestoration } from '@remix-run/react'
import Column from '~/components/column'
import Contact from '~/components/contact'
import Footer from '~/components/footer'
import Header from '~/components/header'
import Testimonials from '~/components/home/testimonials'
import LargeNav from '~/components/nav/large'
import SmallNav from '~/components/nav/small'
import ToTop from '~/components/to-top'
import type { Testimonial } from '~/types'

export default function App({
  children,
  gaTrackingId,
  testimonial
}: {
  testimonial: Testimonial | undefined
  children: React.ReactNode
  gaTrackingId: string | undefined
}) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <script type="text/javascript" src="https://widget.clutch.co/static/js/widget.js" async />
        {!gaTrackingId ? null : (
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

            <div className="relative z-[250] -mt-8 md:-mt-20">{children}</div>

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
        <Scripts />
      </body>
    </html>
  )
}
