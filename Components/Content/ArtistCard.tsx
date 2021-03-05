import React from 'react'
import styled from "styled-components"
import imageUrlBuilder from "@sanity/image-url";
import useMediaQuery from '../../Utils/useMediaQuery'
import client from '../../client'

const builder = imageUrlBuilder(client);
export default function ArtistCard(props) {
  const  artWorks = props.props;
  console.log(artWorks)
  const isBreakPoint = useMediaQuery(425);
  return (
    <>
    <Wrapper isBreakPoint={isBreakPoint}>
      <div style={{display: 'flex', flexDirection: "column", width: '100%'}}>
      {artWorks.map((artwork)=> {
        return(
          <div style={{display: 'flex', flexDirection: 'row', marginBottom: '1em'}}>
      <ArtistInfo isBreakPoint={isBreakPoint}>
        <span>Artist: {artwork.artist.name}</span>
        <span>Title: {artwork.title}</span>
         <span>Year: {artwork.year}</span>
         </ArtistInfo>
         <img
          src={builder.image(artwork.image).auto("format").width(isBreakPoint ? 200 : 100).height(isBreakPoint ? 200 : 100).url()}
          alt={""}
          />
          </div>
        )
      })}
        </div>
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
flex: 1;
`
const LineBreak =  styled('div')`
border-bottom: 1px solid black;
padding-bottom: 20px;
margin: 0 auto;
width: 95%;
`