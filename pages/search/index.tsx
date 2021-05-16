import React from "react";
import dynamic from 'next/dynamic'
import styled from "styled-components"
import groq from "groq";
import client from "../../client";
import { useRouter } from "next/router";
import imageUrlBuilder from "@sanity/image-url";
import Layout from '../../Components/Layout';
import ArtistCard from "../../Components/Content/ArtistCard";
import useWindowDimensions from "../../Utils/useWindowDimensions";
import useMediaQuery from "../../Utils/useMediaQuery";

const builder = imageUrlBuilder(client);
const pageQuery = groq`
*[title match $q || address match $q || artist->name match $q]{
  ...,
  "name": artist->name,
  "mainImage": image.asset->
  }`;

const Map = dynamic(() => import("../../Components/Content/Map"), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

function SearchResults({ config, page }) {
  const { height, width } = useWindowDimensions();
  const router = useRouter();
  const isBreakPoint = useMediaQuery(425)
  console.log(page)
  return (
      <Layout>
        <span>the search results</span>
            <ContentContainer isBreakPoint={isBreakPoint}>
        {/* <ArtistCard props={data} flex={2} />
      <div style={{display: 'flex', flex: 1}}>

    <Map artWorks={data} />
      </div> */}
    </ContentContainer>
      </Layout>
  );
}

const ContentContainer = styled("div")<{isBreakPoint: boolean}>`
display: flex;
flex-direction: ${(p) => p.isBreakPoint ? 'column' : 'row'};
height: 100%;
margin: 10px ${(p) => p.isBreakPoint ? '4px' : '30px'};
border: 1px solid black;
padding: ${(p) => p.isBreakPoint ? '4px' : '10px'};
height: ${(p) => p.isBreakPoint ? '85vh' :'80vh'};
`

// export async function getStaticProps(paths) {
//   const pid = paths.params.artist;
//   const res = await client.fetch(pageQuery, { pid });
//   const json = await res;
//   return { props: { data: json } };
// }

// export async function getStaticPaths() {
//   const request = await client.fetch(
//     `*[_type == "artist" && defined(name)][].name`
//   );
//   return {
//     paths: request.map((slug) => ({ params: { artist: `${slug}` } })),
//     fallback: false,
//   };
// }

SearchResults.getInitialProps = async (context) => {
  const slug = context.pathname.substring(1);
  const { q } = (await context.query.q) ? { q: `${context.query.q}` } : { q: "" };

  const res = await client.fetch(pageQuery, { q, slug });
  return {
    page: res,
    slug,
  };
};


export default SearchResults;
