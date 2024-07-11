const ServiceCard = ({ title, body, link }: { title: string; body: string; link?: string }) => {
  return (
    <div className="pt-3 pr-3 bg-right-top bg-no-repeat bg-box-corner-blue hover:bg-box-corner-green flex">
      <a href={link} className="inline-flex">
        <div className="bg-gt-gray p-5 text-gray-800 hover:bg-gray-800 hover:text-white ease-in-out duration-300">
          <h3 className="font-Raleway text-2xl font-extrabold">{title}.</h3>
          <p className="mt-5" dangerouslySetInnerHTML={{ __html: body }}></p>
        </div>
      </a>
    </div>
  )
}

export default ServiceCard
