import React from 'react'

const Map = () => (
  <>
    <Iframe
      title="Tremough Innovation Centre - Go Tripod's Location"
      scrolling="no"
      marginHeight={0}
      marginWidth={0}
      style={{ border: 0 }}
      src="https://www.openstreetmap.org/export/embed.html?bbox=-5.133667588233948%2C50.16933947367061%2C-5.122541785240174%2C50.173740813862786&amp;layer=mapnik&amp;marker=50.17154019444076%2C-5.1281046867370605"></Iframe>
  </>
)

const Iframe = styled.iframe`
  width: 100%;
height: 425px;
`

export default Map
