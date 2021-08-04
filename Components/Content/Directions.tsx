import React, {Fragment, useState} from 'react'
import styled from "styled-components"
import Link from "next/link";

import { useAppContext } from '../../Utils/state'


export default function Directions(props) {
  const lat = props.data.location.lat;
  const lng = props.data.location.lng;
  const [isFetching, setIsFetching] = useState(false);
  const [userLocation, setUserLocation] = useState([])
  const [locError, setLocError] = useState(false);
  const [dirClicked, setDirClicked] = useState(false);
  
  const safariMobile = useAppContext();
  

  const fetchUserLocation = () => {
    setIsFetching(true)
    const options = {timeout: 7000}
    return new Promise(() => {
      navigator.geolocation.getCurrentPosition(showPosition, locationError, options);
    });
  }
  function locationError(err){
    setLocError(true);
    console.log('Location service not available in this browser (try viewing Materialism in Chrome or Firefox)')
  }
  
  function showPosition(position) {
    setIsFetching(false);
    setUserLocation([position.coords.latitude, position.coords.longitude])
    var win = window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat}%2C${lng}&origin=${position.coords.latitude}%2C${position.coords.longitude}`, '_blank');
    win.focus();
  }
  
  const handleClick = () => {
    fetchUserLocation();
    setDirClicked(true);
  }

  return (
    <Container onClick={handleClick}>
    {dirClicked && safariMobile ?
    <>
    <Link href={`https://www.google.com/maps/dir/?api=1&destination=${lat}%2C${lng}&origin=${userLocation[0]}%2C${userLocation[1]}`}>
      <a target="_blank">
      <span>Pop ups not allowed in this browser. Click here to open Directions in new window.</span>
      </a>
    </Link>
    </>
    :
      locError ? <span>Location service not available in this browser (try viewing Materialism in Chrome or Firefox)</span>
      :
      <span>{!isFetching ? 'Directions' : 'Fetching location...map will open in new window'}</span>
  }

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
