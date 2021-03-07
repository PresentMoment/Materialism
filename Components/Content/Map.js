import { useState, useEffect } from "react"
import ReactMapGL, { Marker, NavigationControl, GeolocateControl } from "react-map-gl"

export default function Map(props) {
  const artWorks = props.artWorks
  const artLocales = artWorks.map((artwork) => {
    return artwork.address
  })
  const navControlStyle = {
    right: 10,
    top: 10,
  }
  const locales = []
  const [isFetching, setFetching] = useState(true)

  useEffect(() => {
    async function forLoop() {
      for (const locale of artLocales) {
        await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${locale}.json?limit=2&access_token=pk.eyJ1IjoicHJlc2VudG1vbWVudCIsImEiOiJjanhpdGlhczkwNWdpM3dwbHRtMGVrdWYwIn0.xzwCmqIxkr_AfZ3YNBwy9g`
        )
          .then((response) => response.json())
          .then((result) => {
            locales.push(result.features[0].center)
          })
          .then(setLocaleState(locales))
          .then(setFetching(false))
      }
    }
    forLoop()
  }, [])
  const [viewport, setViewport] = useState({
    width: "60%",
    height: "100%",
    latitude: 40.7628,
    longitude: -73.965242,
    zoom: 11,
  })
  const [localeState, setLocaleState] = useState([])
  return isFetching && localeState.length > 0 ? (
    <span>Loading map...</span>
  ) : (
    <ReactMapGL
      mapStyle="mapbox://styles/presentmoment/cklhdwg440h9117qqea2dtsgo"
      mapboxApiAccessToken={process.env.MAPBOX_KEY}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <GeolocateControl />
      <NavigationControl style={navControlStyle} />
      {localeState.map((locale) => {
        return (
          <Marker longitude={locale[0]} latitude={locale[1]}>
            <svg height={20} viewBox="0 0 24 24" style={{ transform: `translate(${-20 / 2}px,${-20}px)` }}>
              <path
                d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`}
              />
            </svg>
          </Marker>
        )
      })}
    </ReactMapGL>
  )
}
