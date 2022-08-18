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
  const contentList = useRef(null);

  const [gradientWidth, setGradientWidth] = useState(null)
  const [findLocale, setFindLocale] = useState(true)
  const [clickedWork, setClickedWork] = useState([])
  const [scrollBottom, setScrollBottom] = useState(false)
  const [hoveredArt, setHoveredArt] = useState(null);
  const [winHeight, setWinHeight] = useState(null);

  const handleArtHover = (e) => {
    setHoveredArt(e)
  }


  const clickedPopUp = (artworkID) => {
    var res = artWorks.filter(obj => {
      return obj._id === artworkID
    })
    setClickedWork(res)
  }

  const handleScroll = () => {
    if (contentList.current.scrollHeight - contentList.current.scrollTop < 1200){
      setScrollBottom(true)
    } else if (contentList.current.scrollHeight - contentList.current.scrollTop > 1200){
      setScrollBottom(false)
    }
  }

  useEffect(() => {
    setGradientWidth(artistCard.current.offsetWidth);
    setWinHeight(window.innerHeight);
    props.userlocation[0] !== undefined ? setFindLocale(false) : null;
  }, [artistCard, props.userlocation])


  return (
    <ContentContainer isBreakPoint={isBreakPoint} findLocale={findLocale} winHeight={winHeight}>
      {isBreakPoint ?
      props.view == 'list' ?
      <ContentList 
        isBreakPoint={isBreakPoint} 
        onScroll={handleScroll}
        ref={el => { contentList.current = el}}
        >
        <div ref={el => { artistCard.current = el}} style={{width: '100%'}}>
        <ArtistCard artWorks={artWorks} clickedWork={clickedWork} handleArtHover={handleArtHover} />
        </div>
      {!scrollBottom ?
      <GradientWrapper gradientWidth={gradientWidth} isMobile={isMobile}><Gradient isMobile={isMobile} /></GradientWrapper>
      : null}
      </ContentList>
      :
      props.view == 'map' &&
      <MapWrapper isBreakPoint={isBreakPoint} isMobile={isMobile}>
      <MobileMap artWorks={artWorks} userlocation={props.userlocation} passIDtoContent={clickedPopUp} />
      </MapWrapper>
      :
      <>
      <ContentList 
        isBreakPoint={isBreakPoint} 
        onScroll={handleScroll}
        ref={el => { contentList.current = el}}
        >
        <div ref={el => { artistCard.current = el}} style={{width: '100%'}} >
        <ArtistCard artWorks={artWorks} clickedWork={clickedWork} handleArtHover={handleArtHover} />
        </div>
        {!scrollBottom ?
        <GradientWrapper gradientWidth={gradientWidth} isMobile={isMobile}><Gradient isMobile={isMobile} /></GradientWrapper>
        : null}
        </ContentList>
      <MapWrapper isBreakPoint={isBreakPoint} isMobile={isMobile}>
        <Map artWorks={artWorks} userlocation={props.userlocation} passIDtoContent={clickedPopUp} hoveredArt={hoveredArt} />
      </MapWrapper>
      </>
      }
    </ContentContainer>
  )
}

const ContentContainer = styled.div<{isBreakPoint: boolean, findLocale: boolean, winHeight: number}>`
display: flex;
flex-direction: ${(p) => p.isBreakPoint ? 'column' : 'row'};
height: 100%;
margin: 10px ${(p) => p.isBreakPoint ? '4px' : '30px'};
border: 1px solid black;
padding: ${(p) => p.isBreakPoint ? '4px' : '10px'};
height: 
${(p) => 
  !p.findLocale && p.winHeight - 160+'px' ||
  p.findLocale && p.winHeight - 210+'px'
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
height: ${(p) => p.isMobile ? '50px' : '99px'};
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