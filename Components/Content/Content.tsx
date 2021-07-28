import React, { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styled from "styled-components"
import ArtistCard from './ArtistCard';
import useMediaQuery from '../../Utils/useMediaQuery'

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

const MobileMap = dynamic(() => import("./MobileMap"), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

export default function Content(props) {
  const {artWorks} = props;
  const isBreakPoint = useMediaQuery(625)
  const isMobile = useMediaQuery(425);
  const artistCard = useRef(null);
  const [gradientWidth, setGradientWidth] = useState(null)
  const [findLocale, setFindLocale] = useState(true)
  const [clickedWork, setClickedWork] = useState([])

  const clickedPopUp = (artworkID) => {
    var res = artWorks.filter(obj => {
      return obj._id === artworkID
    })
    setClickedWork(res)
  }

  useEffect(() => {
    setGradientWidth(artistCard.current.offsetWidth);
    props.userlocation[0] !== undefined ? setFindLocale(false) : null;
  }, [artistCard, gradientWidth, props.userlocation])


  return (
    <ContentContainer isBreakPoint={isBreakPoint} findLocale={findLocale}>
      {isBreakPoint ?
      props.view == 'list' ?
      <ContentList isBreakPoint={isBreakPoint}>
        <div ref={el => { artistCard.current = el}} style={{width: '100%'}} >
        <ArtistCard artWorks={artWorks} clickedWork={clickedWork} />
        </div>
      <GradientWrapper gradientWidth={gradientWidth} isMobile={isMobile}><Gradient isMobile={isMobile} /></GradientWrapper>
      </ContentList>
      :
      props.view == 'map' &&
      <MapWrapper isBreakPoint={isBreakPoint} isMobile={isMobile}>
      <MobileMap artWorks={artWorks} userlocation={props.userlocation} passIDtoContent={clickedPopUp} />
      </MapWrapper>
      :
      <>
      <ContentList isBreakPoint={isBreakPoint}>
        <div ref={el => { artistCard.current = el}} style={{width: '100%'}} >
        <ArtistCard artWorks={artWorks} clickedWork={clickedWork} />
        </div>
      <GradientWrapper gradientWidth={gradientWidth} isMobile={isMobile}><Gradient isMobile={isMobile} /></GradientWrapper>
      </ContentList>
      <MapWrapper isBreakPoint={isBreakPoint} isMobile={isMobile}>
        <Map artWorks={artWorks} userlocation={props.userlocation} passIDtoContent={clickedPopUp} />
      </MapWrapper>
      </>
      }
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
  p.isBreakPoint && p.findLocale && '60vh' ||
  p.isBreakPoint && !p.findLocale && '68vh'
};
`
const ContentList = styled.div<{isBreakPoint: boolean}>`
width: ${(p) => p.isBreakPoint ? '100%' : '40vw'};
height: ${(p) => p.isBreakPoint ? '62vh': '100%'};
display: flex;
flex: 1;
overflow-y: scroll;
position: relative;
`

const MapWrapper = styled.div<{isBreakPoint: boolean, isMobile: boolean}>`
display: flex;
flex: ${(p) => p.isBreakPoint ? 1 : 2};
width: ${(p) => p.isMobile ? `97.5%` : `100%`};
`

const GradientWrapper = styled.div<{gradientWidth: number, isMobile: boolean}>`
height: ${(p) => p.isMobile ? '50px' : '100px'};
width: ${(p) => p.gradientWidth}px;
position: absolute;
margin-left: auto;
margin-right: auto;
bottom: 0;
z-index: 9;
`
const Gradient = styled.div<{isMobile: boolean}>`
height: ${(p) => p.isMobile ? '50px' : '100px'};
width: inherit;
position: fixed;
z-index: 9;
background-color: rgba(255,255,255,0);
background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1));
`