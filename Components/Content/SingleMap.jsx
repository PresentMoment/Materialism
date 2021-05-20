import { useState, useEffect } from "react"
import ReactMapGL, { Marker, NavigationControl, GeolocateControl, Popup } from "react-map-gl"
import imageUrlBuilder from "@sanity/image-url";
import client from '../../client'
import useWindowDimensions from "../../Utils/useWindowDimensions";

export default function SingleMap(props) {
  const width  = props.width
  const builder = imageUrlBuilder(client);
  const artWorks = props.artWorks;
  const navControlStyle = {
    right: 10,
    top: 10,
  }
 
  const [geo, setGeo] = useState([])
  const [markerClicked, setMarkerClicked] = useState(false)
  const [popUpGeo, setPopUpGeo] = useState([])
    useEffect(() => {
      props.artWorks.mainImage.metadata.location ?
      setGeo([props.artWorks.mainImage.metadata.location.lng, props.artWorks.mainImage.metadata.location.lat])
      :
       fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${artWorks.address}.json?limit=2&access_token=${process.env.MAPBOX_KEY}`
      )
        .then((response) => response.json())
        .then((result) => {
          setGeo(result.features[0].center)
        })
        .catch((error) => {
          console.log(error)
        })
  },[])

  const [viewport, setViewport] = useState({
    width: width,
    height: "400px",
    zoom: 16,
  })


  return (
    geo.length > 0 ?
    <ReactMapGL
      mapStyle="mapbox://styles/presentmoment/cklzzsyil014p17qrlk3x48y2"
      mapboxApiAccessToken={process.env.MAPBOX_KEY}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      latitude={geo[1]}
      longitude={geo[0]}
    >
      <GeolocateControl />
      <NavigationControl style={navControlStyle} />
      <Marker longitude={geo[0]} latitude={geo[1]}>
          <div  
          //onClick={() => {setPopUpGeo([geo[0], geo[1], geo[1].image, geo[1].title]), setMarkerClicked(true)}}
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