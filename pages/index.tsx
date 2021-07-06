import React, { useEffect, useState } from 'react'
import groq from "groq";
import client from '../client';
import Content from "../Components/Content/Content";
import Layout from '../Components/Layout'
import getGeos from '../Utils/GetGeos';
import Distance from '../Utils/Distance';

const pageQuery = groq`
*[_type == 'artwork']{...,
 artist->{name},
'random': 
(dateTime(now()) - dateTime(_createdAt)) % $rndInt
} | order(random desc)`;


export default function Home(props) {
  //let artWorks = props.props

  const [artWorks, setArtworks] = useState(props.props)
  const [userlocation, setUserLocation] = useState([undefined, undefined])
  const [geoFetched, setGeoFetched] = useState(false)

  function getLocation() {
      navigator.geolocation.getCurrentPosition(showPosition);
    // }).then(setGeoFetched(true))
    // promise
    // if (navigator.geolocation) {
    // } else { return }
}

  function showPosition(position) {
    let setGeoFetched: any;
    const promise = new Promise((res, rej) => {
    setUserLocation([position.coords.latitude, position.coords.longitude])
    }).then(setGeoFetched(true));
    promise;
  }

  //checks if artWorks have street address, if not, reverse geocodes and updates backend
  useEffect(() => {
    getGeos(artWorks)
    if(
    userlocation[0] !== undefined) { const sortedWorks = Distance(userlocation, artWorks); return (setArtworks(sortedWorks)) };
    }, 
    [userlocation, artWorks])

  return (
      <Layout getLocation={getLocation} userlocation={userlocation}>
      <Content artWorks={artWorks} userlocation={userlocation} />
        </Layout>
  );
}

Home.getInitialProps = async() => {
  const rndInt = Math.floor(Math.random() * 99) + 2;
  const res = await client.fetch(pageQuery, {rndInt})
  return {
    props: res
  }
}