import { useState, useEffect } from "react"
import Link from "next/link";
import ReactMapGL, { Marker, NavigationControl, Popup, FlyToInterpolator } from "react-map-gl"
import imageUrlBuilder from "@sanity/image-url";
import client from '../../client'

export default function NearMap(props) {
  const width  = props.width;
  const height = props.height;
  const zoom = props.zoom;
  const artWorks = props.artWorks;
  const userlocation = props.userlocation;
  const builder = imageUrlBuilder(client);

  const navControlStyle = {
    right: 10,
    top: 10,
  }

  useEffect(() => {
      setViewport({
        ...viewport,
        latitude: artWorks.length < 2 ? artWorks[0].location.lat
          : ((artWorks[0].location.lat + artWorks[1].location.lat) / 2),
        longitude: artWorks.length < 2 ? artWorks[0].location.lng
          : ((artWorks[0].location.lng + artWorks[1].location.lng) / 2),
        zoom: zoom
      })
    return () => {setViewport({...viewport})}
  }
    , [userlocation]);

  const [viewport, setViewport] = useState({
    width: width,
    height: height,
    zoom: zoom,
    latitude: artWorks[0].location.lat,
    longitude: artWorks[0].location.lng,
  })

  const [markerClicked, setMarkerClicked] = useState(false);
  const [popUpGeo, setPopUpGeo] = useState([]);

  const populateMarkers = Object.entries(artWorks).map(artwork => {
    return (
      <Marker
        longitude={artwork[1].location.lng}
        latitude={artwork[1].location.lat}
        key={artwork[1]._id}
        onClick={() => {
          setPopUpGeo([artwork[1].location.lng, artwork[1].location.lat, artwork[1].image, artwork[1].title, artwork[1].slug.current]),
          props.passIDtoContent(artwork[1]._id),
          setMarkerClicked(true)
            setViewport({
              ...viewport, latitude: artwork[1].location.lat, longitude: artwork[1].location.lng,
              zoom: 16,
              transitionDuration: 300,
              transitionInerpolator: new FlyToInterpolator({ speed: 1.2 })
            })
        }}>
          <svg height={20} viewBox="0 0 24 26" style={{ 
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
      {markerClicked && <Popup latitude={popUpGeo[1]} longitude={popUpGeo[0]}
        closeOnClick={false}
        onClose={() => setMarkerClicked(false)}
        anchor="top">
        <div style={{ maxWidth: '150px', paddingTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Link href={{ pathname: '/artwork/' + popUpGeo[4] }}>
            <a>
              <img
                src={builder.image(popUpGeo[2]).auto("format").width(140).height(140).url()}
                alt={""}
              /><div style={{ fontSize: '13px', textAlign: 'center' }}><span>{popUpGeo[3]}</span></div>
            </a></Link>
        </div>
      </Popup>}
    </ReactMapGL>
  )
}