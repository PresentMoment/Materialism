import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import groq from "groq";
import client from "../../client";
import { useRouter } from "next/router";
import Layout from '../../Components/Layout';
import Autocomplete from './Autocomplete';

const artistQuery = groq`
*[_type == 'artist']`;


function addAnArtWork({data = {}}) {

  const [ artist, setArtist ] = useState({_type: 'artist', name: ""})
  const handleChange = (event) => {
    setArtist({...artist, name: event.target.value.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())})
  }
  const handleSubmit = () => {
    event.preventDefault();
    console.log('submitting' + artist)
    client.create(artist).then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error.message)
    })
  }
  return (
    <Layout>
      <Autocomplete data={data} />
      <form onSubmit={handleSubmit}><input 
        onChange={handleChange}
        type="text"
        id="artist"
        autoFocus={false}
        placeholder={'Artist Name'}
        ></input>
        <button type="submit">SUBMIT</button>
        </form>
    </Layout>
  )
}

export async function getInitialProps() {
  const res = await client.fetch(artistQuery);
  const json = await res;
  return { props: { data: json } };
}

export default addAnArtWork;