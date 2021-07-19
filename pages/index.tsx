import React, { useEffect, useState } from 'react'
import groq from "groq";
import client from '../client';
import styled from "styled-components"

import Content from "../Components/Content/Content";
import Layout from '../Components/Layout'
import getGeos from '../Utils/GetGeos';
import Distance from '../Utils/Distance';
import useMediaQuery from '../Utils/useMediaQuery'
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
  const [errMsg, setErrMsg] = useState([])
  const [view, setView] = useState("list")
  const isBreakPoint = useMediaQuery(625)

  function getLocation() {
    const options = {timeout: 7000}
      navigator.geolocation.getCurrentPosition(showPosition, locationError, options);
}

function locationError(err){
  setErrMsg([`Location service not available in this browser`, '(try viewing Materialism in Chrome or Safari)'])
}

  function showPosition(position) {
    const promise = new Promise((res, rej) => {
    setUserLocation([position.coords.latitude, position.coords.longitude])
    }).then(() => setGeoFetched(true));
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
      <Layout getLocation={getLocation} userlocation={userlocation} errMsg={errMsg}>
        {isBreakPoint ?
              <ViewOption>
                <ViewWrapper>
                  <span onClick={() => setView('list')}>List View</span><Spacer /><span>|</span><Spacer /><span onClick={() => setView('map')}>Map View</span>
                </ViewWrapper>
            </ViewOption>
            : <></>
              }
      <Content artWorks={artWorks} userlocation={userlocation} view={view} />
        </Layout>
  );
}

const ViewOption = styled.div`
font-size: 2rem;
padding-top: 10px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
`

const ViewWrapper = styled.div`
display: flex;
flex-direction: row;
margin: 0 auto;
cursor: pointer;
`

const Spacer = styled.div`
width: 10px
`

Home.getInitialProps = async() => {
  const rndInt = Math.floor(Math.random() * 99) + 2;
  const res = await client.fetch(pageQuery, {rndInt})
  return {
    props: res
  }
}