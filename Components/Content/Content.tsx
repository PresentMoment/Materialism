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
      {isBreakPoint ? <Gradient /> : null}
      <div style={{display: 'flex', flex: isBreakPoint ? 1 : 2}}>

    <Map artWorks={artWorks} />
      </div>
    </ContentContainer>
  )
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
const ContentList = styled("div")<{isBreakPoint: boolean}>`
width: ${(p) => p.isBreakPoint ? '40vw' : '100%'};
height: ${(p) => p.isBreakPoint ? null : '48vh'};
display: 'flex';
flex: 1;
overflow: scroll
`

const Gradient = styled('div')`
height: 100px;
width: 96%;
position: absolute;
margin-left: auto;
margin-right: auto;
left: 0;
right: 0;
top: 41.7%;
z-index: 9;
background-color: transparent;
background-image: linear-gradient(to bottom, rgba(255,0,0,0), rgba(255,255,255,1));
`