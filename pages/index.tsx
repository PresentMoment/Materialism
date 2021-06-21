import React, { useEffect } from 'react'
import groq from "groq";
import client from '../client';
import Content from "../Components/Content/Content";
import Layout from '../Components/Layout'

const pageQuery = groq`
*[_type == 'artwork']{...,artist->{name}}`;


export default function Home(props) {
  let artWorks = props.props
  const geosToConvert = []
  const getGeos = () => {
    for(const [index, data] of artWorks.entries()){
      if (!data.address){
        geosToConvert.push({_id: data._id, lat: data.location.lat,lng: data.location.lng})
      }
    }
  }
  getGeos();


  const locales = []
  async function forLoop(geo) {
    await fetch(
      `https://geoservices.tamu.edu/Services/ReverseGeocoding/WebService/v04_01/HTTP/default.aspx?apiKey=0c97418cf2f248d697f537d32c5f9734&version=4.01&lat=${geo.lat}&lon=${geo.lng}&format=json`    )
      .then((response) => response.json())
      .then((result) => {
        client
          .patch(geo._id)
          .set({address: result.StreetAddresses[0].StreetAddress + ', ' + result.StreetAddresses[0].City + ', ' + result.StreetAddresses[0].State + ', ' + result.StreetAddresses[0].Zip})
          .commit()
          .then((updatedArt) => {
            console.log('New document:')
            console.log(updatedArt)
          })
          .catch((err) => {
            console.error('Oh no, the update failed: ', err.message)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const arrayOfPromises = [];
  geosToConvert.forEach((geo) => {
    arrayOfPromises.push(forLoop(geo))
  })



  useEffect(() => {
    Promise.all(arrayOfPromises).then(() => {
      console.log('updated')
    })
    },[]);


  return (
      <Layout>
      <Content artWorks={props.props} />
        </Layout>
  );
}

Home.getInitialProps = async() => {
  const res = await client.fetch(pageQuery)
  return {
    props: res
  }
}