import React, { useState } from 'react'
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

export default function Layout(props) {
  const { children } = props;

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
      <div onClick={getLocation}><Header /></div>
      {React.Children.map(children, (child) => React.cloneElement(child, {userlocation}))}
      {/* {children} */}
      {/* <Footer /> */}
    </>
  )
}
