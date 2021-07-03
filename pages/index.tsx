import React, { useEffect } from 'react'
import groq from "groq";
import client from '../client';
import Content from "../Components/Content/Content";
import Layout from '../Components/Layout'
import getGeos from '../Utils/GetGeos';

const pageQuery = groq`
*[_type == 'artwork']{...,
 artist->{name},
'random': 
(dateTime(now()) - dateTime(_createdAt)) % $rndInt
} | order(random desc)`;


export default function Home(props) {
  let artWorks = props.props

  //checks if artWorks have street address, if not, reverse geocodes and updates backend
  useEffect(() => {
    getGeos(artWorks)
  }, [])

  return (
      <Layout>
      <Content artWorks={artWorks} />
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