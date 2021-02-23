import React from 'react'
import dynamic from 'next/dynamic'
import styled from "styled-components"
import ArtistCard from './ArtistCard';

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>Loading...</p>,
  ssr: false
});
export default function Content() {
  return (
    <ContentContainer>
      <ContentList>
        <ArtistCard />
      </ContentList>
    <Map />
    </ContentContainer>
  )
}

const ContentContainer = styled("div")`
display: flex;
flex-direction: row;
height: 100%;
margin: 10px 30px;
border: 1px solid black;
padding: 10px;
height: 70vh;
`
const ContentList = styled("div")`
width: 40vw;
`