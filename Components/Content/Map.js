import { useState, useEffect } from "react"
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl"

export default function Map() {
  const navControlStyle = {
    right: 10,
    top: 10,
  }
  const address = "923 White Knoll Dr, LA, CA 90012"
  const [isFetching, setFetching] = useState(true)
  useEffect(async () => {
    await fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_KEY}&location=${address}`)
      .then((response) => response.json())
      .then((result) => {
        setFetching(false)
        setViewport({
          ...viewport,
          latitude: result.results[0].locations[0].latLng.lat,
          longitude: result.results[0].locations[0].latLng.lng,
        })
      })
  }, [])
  const [viewport, setViewport] = useState({
    width: "60%",
    height: "100%",
    latitude: 40.767386,
    longitude: -73.88375,
    zoom: 13,
  })
  return isFetching ? (
    <span>Loading...</span>
  ) : (
    <ReactMapGL
      mapStyle="mapbox://styles/presentmoment/cklhdwg440h9117qqea2dtsgo"
      mapboxApiAccessToken={process.env.MAPBOX_KEY}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <NavigationControl style={navControlStyle} />
      <Marker longitude={viewport.longitude} latitude={viewport.latitude}>
        <svg height={20} viewBox="0 0 24 24" style={{ transform: `translate(${-20 / 2}px,${-20}px)` }}>
          <path
            d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`}
          />
        </svg>
      </Marker>
    </ReactMapGL>
  )
}
