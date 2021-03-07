import React from 'react'
import styled from "styled-components"
import imageUrlBuilder from "@sanity/image-url";
import useMediaQuery from '../../Utils/useMediaQuery'
import client from '../../client'

const builder = imageUrlBuilder(client);
export default function ArtistCard(props) {
  const  artWorks = props.props;
  const isBreakPoint = useMediaQuery(768);
  return (
    <>
    <Wrapper isBreakPoint={isBreakPoint}>
      <div style={{display: 'flex', flexDirection: "column", width: '100%'}}>
      {artWorks.map((artwork)=> {
        return(
          <div key={artwork._id}>
        <div style={{display: 'flex', flexDirection: 'row'}} key={artwork._id}>
            <ArtistInfo isBreakPoint={isBreakPoint} key={artwork._id}>
            <span>Artist: {artwork.artist.name}</span>
            <span>Title: {artwork.title}</span>
            <span>Year: {artwork.year}</span>
            </ArtistInfo>
            <img
              src={builder.image(artwork.image).auto("format").width(isBreakPoint ? 100 : 200).height(isBreakPoint ? 100 : 200).url()}
              alt={""}
            />
            </div>
            <LineBreak width='100%' />
            <div style={{height: '20px'}} />
          </div>
        )
      })}
        </div>
    </Wrapper>
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
font-size: ${(p) => p.isBreakPoint ? '0.9em' : '1.5em'};
line-height: 2em;
flex: 1;
`
const LineBreak =  styled('div')<{width: string}>`
border-bottom: 1px solid black;
padding-bottom: 20px;
margin: 0 auto;
width: ${(p) => p.width};
`