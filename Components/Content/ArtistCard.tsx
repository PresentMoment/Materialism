import React from 'react'
import styled from "styled-components"
import imageUrlBuilder from "@sanity/image-url";
import useMediaQuery from '../../Utils/useMediaQuery'
import client from '../../client'

const builder = imageUrlBuilder(client);
export default function ArtistCard(props) {
  const  artWorks = props.props;
  const isBreakPoint = useMediaQuery(425);
  return (
    <>
    <Wrapper isBreakPoint={isBreakPoint}>
      <ArtistInfo isBreakPoint={isBreakPoint}>
        <span>Artist: {artWorks[0].artist.name}</span>
        <span>Title: {artWorks[0].title}</span>
        <span>Year: {artWorks[0].year}</span>
      </ArtistInfo>
      <img
          src={builder.image(artWorks[0].image).auto("format").width(200).height(200).url()}
          alt={""}
        />
    </Wrapper>
      <LineBreak />
      </>
  )
}

const Wrapper = styled("div")<{isBreakPoint: boolean}>`
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 0 ${(p) => p.isBreakPoint ? '10px' : '20px'};
`

const ArtistInfo = styled("div")<{isBreakPoint: boolean}>`
display: flex;
flex-direction: column;
font-family: 'Raleway';
font-size: ${(p) => p.isBreakPoint ? '0.7em' : '1.5em'};
line-height: 2em;
`
const LineBreak =  styled('div')`
border-bottom: 1px solid black;
padding-bottom: 20px;
margin: 0 auto;
width: 95%;
`