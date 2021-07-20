import React, { useRef, useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import styled from "styled-components"
import groq from "groq";
import client from "../../client";
import { useRouter } from "next/router";
import imageUrlBuilder from "@sanity/image-url";
import Layout from '../../Components/Layout';
import SearchCard from "../../Components/Content/SearchCard";
import useMediaQuery from "../../Utils/useMediaQuery";

const builder = imageUrlBuilder(client);
const pageQuery = groq`
*[title match $q || address match $q || artist->name match $q]{
  ...,
  "name": artist->name,
  "mainImage": image.asset->
  }`;


function SearchResults({ page }) {
  const router = useRouter();
  const isBreakPoint = useMediaQuery(425);
  const searchQuery = router.query.q as string;
  const artistCard = useRef(null);
  const [gradientWidth, setGradientWidth] = useState(null)

  useEffect(() => {
    console.log(artistCard.current.offsetWidth)
    setGradientWidth(artistCard.current.offsetWidth);
  }, [artistCard])
  return (
      <Layout>
        <NextSeo
        title={searchQuery && searchQuery.split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ')}
        description="Materialism - art within reach"
      />
         <ContentContainer isBreakPoint={isBreakPoint}>
         
        {page.length > 0 ?
        <ContentList isBreakPoint={isBreakPoint}>
        <div ref={el => { artistCard.current = el}} style={{width: '100%'}} >

        <SearchCard props={page} flex={2} />
        </div>
        {gradientWidth !== null && <GradientWrapper gradientWidth={gradientWidth}><Gradient /></GradientWrapper>}
      </ContentList>
        : <div style={{width: '100%', textAlign: 'center'}}><span>No Results</span></div>}
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
height: ${(p) => p.isBreakPoint ? '80vh' :'90vh'};
`

const ContentList = styled.div<{isBreakPoint: boolean}>`
width: ${(p) => p.isBreakPoint ? '100%' : '40vw'};
height: ${(p) => '100%'};
display: flex;
flex: 1;
overflow-y: scroll;
position: relative;
`

const GradientWrapper = styled.div<{gradientWidth: number}>`
height: 100px;
width: ${(p) => p.gradientWidth}px;
position: absolute;
margin-left: auto;
margin-right: auto;
bottom: 0;
z-index: 9;
`
const Gradient = styled('div')`
height: 100px;
width: inherit;
position: fixed;
z-index: 9;
background-color: rgba(255,255,255,0);
background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1));
`

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
