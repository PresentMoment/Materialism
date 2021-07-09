import React, {useState, useEffect, useCallback } from 'react'
import styled from "styled-components"
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import useMediaQuery from '../../Utils/useMediaQuery'
import client from '../../client'

const builder = imageUrlBuilder(client);
export default function ArtistCard(props, flex) {
  //const  artWorks = props.props;
  const isBreakPoint = useMediaQuery(768);
  const is425 = useMediaQuery(425);
  const is950 = useMediaQuery(950);
  const [artWorks, setArtWorks] = useState(props.props);
  useEffect(() => {
    setArtWorks(props.props)
  }, [props.props])
  return (
    <>
    <Wrapper isBreakPoint={isBreakPoint}>
      <div style={{display: 'flex', flexDirection: "column", width: '100%', paddingTop: is425 ? '30px' : '0'}}>
      {
      artWorks.map((artwork)=> {
        return(
          <div key={artwork._id}>
            <Link href={{ pathname: '/artwork/' + artwork.slug.current}}>
              <a>
        <div style={{display: 'flex', flexDirection: 'row', maxHeight: '100px'}} key={artwork._id}>
            <ArtistInfo isBreakPoint={isBreakPoint} is950={is950} key={artwork._id}>
            <span>{artwork.artist.name}</span>
            <span>{artwork.title}</span>
            </ArtistInfo>
            <img
              src={builder.image(artwork.image).auto("format").width(100).height(100).url()}
              alt={""}
            />
            </div>
            <LineBreak width='100%' />
            <div style={{height: '20px'}} />
            </a>
            </Link>
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