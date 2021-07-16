import { useState, useEffect } from "react"
import ReactMapGL, { Marker, NavigationControl, GeolocateControl } from "react-map-gl"
import Directions from "./Directions"

export default function SingleMap(props) {
  const width  = props.width
  const height = props.height
  const navControlStyle = {
    right: 10,
    top: 10,
  }

  const [geo, setGeo] = useState([])

    useEffect(() => {
      setGeo([props.artWorks.location.lng, props.artWorks.location.lat])
  },[width])

  const [viewport, setViewport] = useState({
    width: width,
    height:  height,
    zoom: 16,
  })

  return (
    geo.length > 0 ?
    <ReactMapGL
      mapStyle="mapbox://styles/jawsjawsjaws/ckq7ymef20qlw18nwfxt7w4wk"
      mapboxApiAccessToken={process.env.MAPBOX_KEY}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      latitude={geo[1]}
      longitude={geo[0]}
    >
      <GeolocateControl />
      <NavigationControl style={navControlStyle} />
      <Directions data={props.artWorks} />
      <Marker longitude={geo[0]} latitude={geo[1]}>
          <div
          >
          <svg height={50} viewBox="0 0 24 24" style={{ transform: `translate(${-20 / 2}px,${-20}px)` }}>
            <path
              d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
C20.1,15.8,20.2,15.8,20.2,15.7z`}
            />
          </svg>
          </div>
        </Marker>
      </ReactMapGL>
    : null
  )
}