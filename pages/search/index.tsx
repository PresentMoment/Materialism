import React from "react";
import dynamic from 'next/dynamic'
import { NextSeo } from "next-seo";
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
  const isBreakPoint = useMediaQuery(425);
  const searchQuery = router.query.q as string;
  return (
      <Layout>
        <NextSeo
        title={searchQuery.split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')}
        description="Materialism - art within reach"
      />
         <ContentContainer isBreakPoint={isBreakPoint}>
        {page.length > 0 ?
        <ArtistCard props={page} flex={2} />
        : <div style={{width: '100%', textAlign: 'center'}}><span>No Results</span></div>}
      <div style={{display: 'flex', flex: 1}}>

      </div>
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
