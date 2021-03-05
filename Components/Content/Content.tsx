import React from 'react'
import dynamic from 'next/dynamic'
import styled from "styled-components"
import ArtistCard from './ArtistCard';
import useMediaQuery from '../../Utils/useMediaQuery'

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>Loading...</p>,
  ssr: false
});


export default function Content(props) {
  const {artWorks} = props
  const isBreakPoint = useMediaQuery(425)
  return (
    <ContentContainer isBreakPoint={isBreakPoint}>
      <ContentList>
        <ArtistCard props={artWorks} />
      </ContentList>
    <Map artWorks={artWorks} />
    </ContentContainer>
  )
}

const ContentContainer = styled("div")<{isBreakPoint: boolean}>`
display: flex;
flex-direction: row;
height: 100%;
margin: 10px ${(p) => p.isBreakPoint ? '4px' : '30px'};
border: 1px solid black;
padding: ${(p) => p.isBreakPoint ? '4px' : '10px'};
height: 70vh;
`
const ContentList = styled("div")`
width: 40vw;
`