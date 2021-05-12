import React, { useEffect } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic'
import styled from "styled-components"
import groq from "groq";
import client from "../../client";
import { useRouter } from "next/router";
import imageUrlBuilder from "@sanity/image-url";
import Layout from '../../Components/Layout'
import ArtistCard from "../../Components/Content/ArtistCard";
import { LineBreak } from "../../Components/Layout/LineBreak";
import useWindowDimensions from "../../Utils/useWindowDimensions";
import useMediaQuery from "../../Utils/useMediaQuery";

const builder = imageUrlBuilder(client);
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
  const router = useRouter();
  const isBreakPoint = useMediaQuery(425)
  return (
      <Layout>
            <ContentContainer isBreakPoint={isBreakPoint}>
        <ArtistCard props={data} />
      <div style={{display: 'flex', flex: 2}}>

    <Map artWorks={data} />
      </div>
    </ContentContainer>
      </Layout>
  );
}

const ContentContainer = styled("div")<{isBreakPoint: boolean}>`
display: flex;
flex-direction: ${(p) => p.isBreakPoint ? 'column-reverse' : 'row'};
height: 100%;
margin: 10px ${(p) => p.isBreakPoint ? '4px' : '30px'};
border: 1px solid black;
padding: ${(p) => p.isBreakPoint ? '4px' : '10px'};
height: ${(p) => p.isBreakPoint ? '85vh' :'80vh'};
`
const ContentList = styled("div")<{isBreakPoint: boolean}>`
width: ${(p) => p.isBreakPoint ? '40vw' : '100%'};
display: flex;
flex: 1;
overflow: scroll
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
