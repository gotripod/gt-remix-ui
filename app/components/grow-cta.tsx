import { Link } from '@remix-run/react'

const GrowCta = () => (
  <section className="bg-gradient-to-r from-gt-green-dk to-gt-green-lt">
    <div className="px-6 py-10 bg-none sm:bg-stripes-bg bg-right bg-no-repeat bg-[length:300px]">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-4xl font-bold text-white">Grow your business</h2>
        <p className="font-Raleway text-4xl font-normal text-white mb-14 sm:pr-52">
          Find out how we can help
        </p>
        <p>
          <Link className="btn-white-on-green" to="/contact">
            Get in touch
          </Link>
        </p>
      </div>
    </div>
  </section>
)

export default GrowCta
