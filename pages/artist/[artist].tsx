import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import styled from "styled-components"
import groq from "groq";
import client from "../../client";
import Layout from '../../Components/Layout';
import ArtistCard from "../../Components/Content/ArtistCard";
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


function Artist({ config, data = {} }) {
  const { height, width } = useWindowDimensions();
  const [ size, setSize ] = useState(null)

  useEffect(() => {
    setSize(width > 425 ? false : true)
  }, [width])
console.log(size)
  return (
    <Layout>
      <ContentContainer isBreakPoint={size}>
      <ArtistCard props={data} flex={2} />
      <div style={{display: 'flex', width: '100%', height: '100%'}}>
        <Map artWorks={data} />
      </div>
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
height: ${(p) => p.isBreakPoint ? '85vh' :'80vh'};
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
