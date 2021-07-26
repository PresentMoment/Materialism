import React, {useState, useEffect, useRef } from 'react'
import styled from "styled-components"
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import useMediaQuery from '../../Utils/useMediaQuery'
import client from '../../client'

const builder = imageUrlBuilder(client);
export default function ArtistCard(props) {
  const isBreakPoint = useMediaQuery(768);
  const is425 = useMediaQuery(425);
  const is950 = useMediaQuery(950);

  const clickRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    clickRef.current !== null && clickRef.current.scrollIntoView();
  }, [props.clickedWork, clickRef])
  return (
    <>
    <Wrapper isBreakPoint={isBreakPoint}>
      <List is425={is425}>
      {
      props.artWorks.map((artwork)=> {
        return(
          <div key={artwork._id} ref={props.clickedWork[0] && props.clickedWork[0]._id == artwork._id ? clickRef : null}>
            <Link href={{ pathname: '/artwork/' + artwork.slug.current}}>
              <a>
            <InfoWrapper clickedWork={props.clickedWork[0]} artwork={artwork}>
            <ArtistInfo isBreakPoint={isBreakPoint} is950={is950} key={artwork._id}>
            <span>{artwork.artist.name && artwork.artist.name || artwork.name && artwork.name}</span>
            <span>{artwork.title}</span>
            </ArtistInfo>
            <img
              src={builder.image(artwork.image).auto("format").width(100).height(100).url()}
              alt={""}
            />
            </InfoWrapper>
            <LineBreak width='100%' />
            <div style={{height: '20px'}} />
            </a>
            </Link>
          </div>
        )
      })}
        </List>
    </Wrapper>
      </>
  )
}

const Wrapper = styled("div")<{isBreakPoint: boolean}>`
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-between;
padding: 0 ${(p) => p.isBreakPoint ? '10px' : '20px'};
`

const ArtistInfo = styled("div")<{isBreakPoint: boolean, is950: boolean}>`
display: flex;
flex-direction: column;
font-family: 'Raleway';
font-size: ${(p) => p.is950 ? '1em' : '1.5em'};
line-height: 2em;
flex: 1;
margin-top: -2px;
`
const LineBreak =  styled('div')<{width: string}>`
border-bottom: 1px solid black;
padding-bottom: 20px;
margin: 0 auto;
width: ${(p) => p.width};
`

const List = styled.div<{is425: boolean}>`
display: flex;
flex-direction: column;
width: 100%;
padding-top:${(p) => p.is425 ? `30px` : `0`};
`

type clickedWork = {
  _id: string;
}

type artwork = {
  _id: string
}

const InfoWrapper = styled.div<{clickedWork, artwork}>`
background-color:${(p) => p.clickedWork && p.clickedWork._id == p.artwork._id ?  `#e6e6e6` : `transparent`};
border-bottom: ${(p) => p.clickedWork && p.clickedWork._id == p.artwork._id ? `3px solid #919191` : `none`};
font-weight: ${(p) => p.clickedWork && p.clickedWork._id == p.artwork._id ? `600` : `500`};
display: flex;
flex-direction: row;
max-height: 100px;
`