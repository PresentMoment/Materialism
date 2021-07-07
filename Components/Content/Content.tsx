import React, { useRef, useEffect, useState } from 'react'
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
  const isBreakPoint = useMediaQuery(625)
  const artistCard = useRef(null);
  const [gradientWidth, setGradientWidth] = useState(null)
  const [findLocale, setFindLocale] = useState(true)

  useEffect(() => {
    setGradientWidth(artistCard.current.offsetWidth);
    props.userlocation[0] !== undefined ? setFindLocale(false) : null;
  }, [artistCard, gradientWidth, props.userlocation])


  return (
    <ContentContainer isBreakPoint={isBreakPoint} findLocale={findLocale}>
      <ContentList isBreakPoint={isBreakPoint}>
        <div ref={el => { artistCard.current = el}} style={{width: '100%'}} >
        <ArtistCard props={artWorks} />
        </div>
      <GradientWrapper gradientWidth={gradientWidth}><Gradient /></GradientWrapper>
      </ContentList>
      <div style={{display: 'flex', flex: isBreakPoint ? 1 : 2}}>

    <Map artWorks={artWorks} userlocation={props.userlocation} />
      </div>
    </ContentContainer>
  )
}

const ContentContainer = styled.div<{isBreakPoint: boolean, findLocale: boolean}>`
display: flex;
flex-direction: ${(p) => p.isBreakPoint ? 'column' : 'row'};
height: 100%;
margin: 10px ${(p) => p.isBreakPoint ? '4px' : '30px'};
border: 1px solid black;
padding: ${(p) => p.isBreakPoint ? '4px' : '10px'};
height: ${(p) => 
  !p.isBreakPoint && !p.findLocale && '88vh' ||
  !p.isBreakPoint && p.findLocale && '83vh' ||
  p.isBreakPoint && p.findLocale && '86vh' ||
  p.isBreakPoint && !p.findLocale && '89vh'
};
`
const ContentList = styled.div<{isBreakPoint: boolean}>`
width: ${(p) => p.isBreakPoint ? '100%' : '40vw'};
height: ${(p) => p.isBreakPoint ? '48vh': '100%'};
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
//left: 0;
//right: 0;
//top: 41.5%;
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