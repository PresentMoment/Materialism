import { useState, useEffect } from "react"
import ReactMapGL, { Marker, NavigationControl, GeolocateControl } from "react-map-gl"

export default function Map(props) {
  const artWorks = props.artWorks;
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
            // Your error is here!
            console.log(error)
          })
      }
    const arrayOfPromises = [];
    for(const [index, address] of addresses.entries()){
      arrayOfPromises.push(forLoop(address, index))
    }
    useEffect(() => {
    Promise.all(arrayOfPromises).then((loacales) => {
        setLocaleState(locales)}).then(() => (setFetching(false))
    )
  },[])

  const [viewport, setViewport] = useState({
    width: "60%",
    height: "100%",
    latitude: 40.7628,
    longitude: -73.965242,
    zoom: 11,
  })
  const populateMarkers = Object.entries(artWorks).map(geo => 
    {
      return (
        geo[1].geo && 
        <Marker longitude={geo[1].geo[0]} latitude={geo[1].geo[1]}>
          <svg height={20} viewBox="0 0 24 24" style={{ transform: `translate(${-20 / 2}px,${-20}px)` }}>
            <path
              d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
C20.1,15.8,20.2,15.8,20.2,15.7z`}
            />
          </svg>
        </Marker>
      )
    })
  return isFetching && localeState.length > 0 ? (
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
    </ReactMapGL>
  )
}
