
import { useState, useEffect } from "react"
import Link from "next/link";
import ReactMapGL, { Marker, NavigationControl, GeolocateControl, Popup } from "react-map-gl"
import imageUrlBuilder from "@sanity/image-url";
import client from '../../client'

export default function Map(props) {
  const builder = imageUrlBuilder(client);
  const artWorks = props.artWorks;
  const userLocation = props.userLocation

  const navControlStyle = {
    right: 10,
    top: 10,
  }
  const addresses = []
  const getAddresses = () => {
    artWorks.map((address) => {
      addresses.push(address.address)
    })
  }
  getAddresses();
  const locales = []
  const [isFetching, setFetching] = useState(true)
  const [localeState, setLocaleState] = useState([])
  const [markerClicked, setMarkerClicked] = useState(false)
  const [popUpGeo, setPopUpGeo] = useState([])

  async function forLoop(address, index) {
    await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=2&access_token=${process.env.MAPBOX_KEY}`
    )
      .then((response) => response.json())
      .then((result) => {
        artWorks[index].geo = result.features[0].center,
        locales.push(result.features[0].center)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const arrayOfPromises = [];
  for(const [index, address] of addresses.entries()){
    arrayOfPromises.push(forLoop(address, index))
  }
    
  useEffect(() => {
  Promise.all(arrayOfPromises).then(() => {
      //setLocaleState(locales)})
      if (userLocation) {setViewport({...viewport, latitude: userLocation[0], longitude: userLocation[1], zoom: 15})}
      else {
        setViewport({...viewport, 
        latitude: locales.length < 2 ? locales[0][1] 
        : ((locales[0][1] + locales[1][1]) / 2),
        longitude: locales.length < 2 ? locales[0][0] 
        : ((locales[0][0] + locales[1][0]) / 2), 
        zoom: locales.length < 2 ? 17 : 12})
      }})
      .then(() => (setFetching(false))
  )
  },[userLocation]);

  

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    zoom: 15,
    latitude: 40.7628,
    longitude: -73.965242,
  })

  const populateMarkers = Object.entries(artWorks).map(geo => 
    {
      return (
        geo[1].geo && 
        <Marker longitude={geo[1].geo[0]} latitude={geo[1].geo[1]} key={geo[1]._id}>
          <div onClick={() => {setPopUpGeo([geo[1].geo[0], geo[1].geo[1], geo[1].image, geo[1].title, geo[1].slug.current]), setMarkerClicked(true)}}>
          <svg height={20} viewBox="0 0 24 24" style={{ transform: `translate(${-20 / 2}px,${-20}px)` }}>
            <path
              d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
                  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
C                 20.1,15.8,20.2,15.8,20.2,15.7z`}
            />
          </svg>
          </div>
        </Marker>
      )
    })

  return isFetching && localeState.length < 1 ? (
    <span>Loading map...</span>
  ) : (
    <ReactMapGL
      mapStyle="mapbox://styles/presentmoment/cklzzsyil014p17qrlk3x48y2"
      mapboxApiAccessToken={process.env.MAPBOX_KEY}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <GeolocateControl />
      <NavigationControl style={navControlStyle} />
      {populateMarkers}
      {markerClicked && <Popup latitude={popUpGeo[1]} longitude={popUpGeo[0]} 
      //onClose={() => setMarkerClicked(false)} 
      anchor="top">
                <div style={{maxWidth: '90px', paddingTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Link href={{ pathname: '/artwork/' + popUpGeo[4]}}>
              <a>
                  <img
              src={builder.image(popUpGeo[2]).auto("format").width(70).height(70).url()}
              alt={""}
            /><p>{popUpGeo[3]}</p>
            </a></Link>
            </div>
            </Popup>}
    </ReactMapGL>
  )
}