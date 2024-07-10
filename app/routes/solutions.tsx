import Header from '~/components/header'

const Solutions = () => {
  return (
    <>
      <Header
        title="Our purpose"
        ctaText="See what we can do for you"
        ctaLink="#services"
        image="/_img/hero-solutions.jpg"
        subTitle={
          <>
            Let&apos;s create transformative solutions <br />
            to move your business forward
          </>
        }
      />
      <div className="max-w-screen-xl mx-auto">
        <p>COntent here</p>
      </div>
    </>
  )
}

export default Solutions
