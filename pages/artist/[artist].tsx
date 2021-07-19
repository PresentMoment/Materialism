import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { NextSeo } from "next-seo";
import styled from "styled-components"
import groq from "groq";
import client from "../../client";
import Layout from '../../Components/Layout';
import Card from "./Card";
import useWindowDimensions from "../../Utils/useWindowDimensions";

const pageQuery = groq`
*[_type == 'artwork' && artist -> name == $pid]{
  ...,
  "artist": artist -> name,
  "mainImage": image.asset->
}`;

const Map = dynamic(() => import("../../Components/Content/Map"), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

function Artist({ config, data }) {
  const { height, width } = useWindowDimensions();
  const [ size, setSize ] = useState(null)
  const [clickedWork, setClickedWork] = useState([])

  const clickedPopUp = (artworkID) => {
    var res = data.filter(obj => {
      return obj._id === artworkID
    })
    setClickedWork(res)
  }

  useEffect(() => {
    setSize(width > 425 ? false : true)
    return () => {}
  }, [width])

  return (
    <Layout>
      <NextSeo
        title={data[0].artist}
        description="Materialism - art within reach"
      />
        <ArtistHeader><span>Pieces by {data[0].artist}</span></ArtistHeader>
      <ContentContainer isBreakPoint={size}>
      <Card props={data} flex={2} clickedWork={clickedWork} />
      {width < 768 ?
      <></>
    : 
      <>
      <Spacer />
      <div style={{display: 'flex', width: size ? '97.5%' : '100%', height: size ? '300px': '100%'}}>
        <Map artWorks={data} passIDtoContent={clickedPopUp} />
      </div>
      </>
    }
      </ContentContainer>
    </Layout>
  );
}

const ContentContainer = styled.div<{isBreakPoint: boolean}>`
display: flex;
flex-direction: ${(p) => p.isBreakPoint ? 'column' : 'row'};
height: 100%;
margin: 10px ${(p) => p.isBreakPoint ? '4px' : '30px'};
border: 1px solid black;
padding: ${(p) => p.isBreakPoint ? '4px' : '10px'};
height: ${(p) => p.isBreakPoint ? '80vh' :'90vh'};
`

const ArtistHeader = styled.div`
display: flex;
width: 100%;
justify-content: center;
text-align: center;
font-size: 2em;
padding-top: 10px;
`

const Spacer = styled.div`
display: flex;
flex: 2;
`

export async function getStaticProps(paths) {
  const pid = paths.params.artist;
  const res = await client.fetch(pageQuery, { pid });
  const json = await res;
  return { props: { data: json } };
}

export async function getStaticPaths() {
  const request = await client.fetch(
    `*[_type == "artist" && defined(name)][].name`
  );
  return {
    paths: request.map((slug) => ({ params: { artist: `${slug}` } })),
    fallback: false,
  };
}

export default Artist;
