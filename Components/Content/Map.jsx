
import { useState, useEffect } from "react"
import ReactMapGL, { Marker, NavigationControl, FlyToInterpolator } from "react-map-gl"

export default function Map(props) {
  const artWorks = props.artWorks;
  const userlocation = props.userlocation

  const navControlStyle = {
    right: 10,
    top: 10,
  }

  useEffect(() => {
    if (userlocation && userlocation[0] !== undefined) { setViewport({ ...viewport, height: '100%', latitude: userlocation[0], longitude: userlocation[1], zoom: 15 }) }
    else {
      setViewport({
        ...viewport,
        latitude: artWorks.length < 2 ? artWorks[0].location.lat
          : ((artWorks[0].location.lat + artWorks[1].location.lat) / 2),
        longitude: artWorks.length < 2 ? artWorks[0].location.lng
          : ((artWorks[0].location.lng + artWorks[1].location.lng) / 2),
        zoom: artWorks.length < 2 ? 17 : 12
      })
    }
  }
    , [userlocation]);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    zoom: 15,
    latitude: artWorks[0].location.lat,
    longitude: artWorks[0].location.lng,
  })

  const [markerClicked, setMarkerClicked] = useState(null)

  const populateMarkers = Object.entries(artWorks).map(artwork => {
    return (
      <Marker
        longitude={artwork[1].location.lng}
        latitude={artwork[1].location.lat}
        key={artwork[1]._id}
        onClick={() => {
          props.passIDtoContent(artwork[1]._id),
          setMarkerClicked(artwork[1]._id)
            setViewport({
              ...viewport, latitude: artwork[1].location.lat, longitude: artwork[1].location.lng,
              zoom: 17,
              transitionDuration: 300,
              transitionInerpolator: new FlyToInterpolator({ speed: 1.2 })
            })
        }}>
          <svg height={artwork[1]._id && artwork[1]._id == markerClicked ? 50 : 20} viewBox="0 0 24 26" style={{ 
          transform: `translate(${-20 / 2}px,${-20}px)`, overflow: 'visible' }}>
            <path style={{fill: 'black',
              stroke: '#a3a3a3',
              strokeWidth: '3px',
              strokeLinejoin: 'round'}}
              d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
                  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
C                 20.1,15.8,20.2,15.8,20.2,15.7z`}
            />
          </svg>
      {/* </div> */}
      </Marker>
    )
  })

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/jawsjawsjaws/ckq7ymef20qlw18nwfxt7w4wk"
      mapboxApiAccessToken={process.env.MAPBOX_KEY}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <NavigationControl style={navControlStyle} />
      {populateMarkers}
    </ReactMapGL>
  )
}