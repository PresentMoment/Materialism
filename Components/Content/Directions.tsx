import React, {useState} from 'react'
import styled from "styled-components"

export default function Directions(props) {
  const lat = props.data.location.lat;
  const lng = props.data.location.lng;
  const [isFetching, setIsFetching] = useState(false);

  const fetchUserLocation = () => {
    setIsFetching(true)
    const options = {timeout: 7000}
    return new Promise(() => {
      navigator.geolocation.getCurrentPosition(showPosition, locationError, options);
    });
  }
  function locationError(err){
    console.log([`Location service not available in this browser`, '(try viewing Materialism in Chrome or Safari)'])
  }
  
    function showPosition(position) {
      setIsFetching(false)
      var win = window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat}%2C${lng}&origin=${position.coords.latitude}%2C${position.coords.longitude}`, '_blank');
      win.focus();
    }

  const handleClick = () => {
    fetchUserLocation()
  }
  return (
    <Container onClick={handleClick}>
      {/* <a target="_blank"  */}
    {/* href={`https://www.google.com/maps/dir/?api=1&destination=${lat}%2C${lng}${userlocation[0] !== undefined ? `&origin=${userlocation[0]}%2C${userlocation[1]}` : ''}`} rel="noopener noreferrer"> */}
    <span>{!isFetching ? 'Directions' : 'Fetching location...map will open in new window'}</span>
    {/* </a> */}
    </Container>
  )
}

const Container = styled.div`
background-color: white;
position: absolute;
right: 3px;
bottom: 3px;
z-index: 99999;
padding: 3px 10px;
font-size: 2rem;
pointer: cursor;
`
