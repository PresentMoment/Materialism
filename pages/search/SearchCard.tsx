import React from 'react'
import styled from "styled-components"
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import useMediaQuery from '../../Utils/useMediaQuery'
import client from '../../client'

const builder = imageUrlBuilder(client);
export default function SearchCard(props) {
  const isBreakPoint = useMediaQuery(768);
  const is425 = useMediaQuery(425);
  const is950 = useMediaQuery(950);

  return (
    <>
    <Wrapper isBreakPoint={isBreakPoint}>
      <List is425={is425}>
      {
      props.props.map((artwork)=> {
        return(
          <div key={artwork._id}>
            <Link href={{ pathname: '/artwork/' + artwork.slug.current}}>
              <a>
            <InfoWrapper>
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

const InfoWrapper = styled.div`
display: flex;
flex-direction: row;
max-height: 100px;
`