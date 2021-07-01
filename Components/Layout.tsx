import React, { useState } from 'react'
import { useRouter } from "next/router";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Tagline from './Header/Tagline';

export default function Layout(props) {
  const { children } = props;
  const router = useRouter();
  const [userlocation, setUserLocation] = useState([40.70683, -74.01243])

  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { return }
}

  function showPosition(position) {
    setUserLocation([position.coords.latitude, position.coords.longitude])
  }

  return (
    <>
    <Header />
      {router.pathname === '/' ? <div onClick={getLocation}><Tagline /> </div> : null}
      {React.Children.map(children, (child) => React.cloneElement(child, {userlocation}))}
      {/* {children} */}
    </>
  )
}
