import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import useMediaQuery from '../../Utils/useMediaQuery'
import client from '../../client'

const builder = imageUrlBuilder(client);
export default function Card(props) {
  const  artWorks = props.props;
  const isBreakPoint = useMediaQuery(768);
  const is425 = useMediaQuery(425);
  const is950 = useMediaQuery(950)
  const [clickedArt, setClickedArt] = useState({});

  useEffect(() => {
    setClickedArt(props.clickedWork)
  }, [props.clickedWork])

  return (
    <>
    <Wrapper isBreakPoint={isBreakPoint}>
      <Container is425={is425}>
      {artWorks && artWorks.map((artwork)=> {
        const cityState = artwork.address.replace(/^[^,]+, */, '');
        const cityClean = cityState.match(/([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/)
        return(
          <div key={artwork._id}>
            <Link href={{ pathname: '/artwork/' + artwork.slug.current}}>
              <a>
        <InfoContainer clickedArt={clickedArt[0]} artwork={artwork} key={artwork._id}>
            <ArtistInfo isBreakPoint={isBreakPoint} is950={is950} key={artwork._id}>
            <span>{artwork.title}</span>
            <span>{artwork.year}</span>
            <span>{cityClean[0]}</span>
            </ArtistInfo>
            <img
              src={builder.image(artwork.image).auto("format").width(100).height(100).url()}
              alt={""}
            />
            </InfoContainer>
            <LineBreak width='100%' />
            <Spacer />
            </a>
            </Link>
          </div>
        )
      })}
        </Container>
    </Wrapper>
      </>
  )
}

const Wrapper = styled("div")<{isBreakPoint: boolean}>`
display: flex;
flex-direction: row;
width: 100%;
overflow: scroll;
justify-content: space-between;
padding: 0 ${(p) => p.isBreakPoint ? '10px' : '20px'};
`

const Container = styled.div<{is425: boolean}>`
display: flex;
flex-direction: column;
width: 100%;
padding-top:${(p) => p.is425 ? `30px` : `0`};
`

type clickedArt = {
  _id: string
}

type artwork = {
  _id: string
}

const InfoContainer = styled.div<{clickedArt, artwork}>`
background-color: ${(p) => p.clickedArt && p.clickedArt._id == p.artwork._id ? `#e6e6e6` : `transparent`};
border-bottom: ${(p) => p.clickedArt && p.clickedArt._id == p.artwork._id ? `3px solid #919191` : `none`};
font-weight: ${(p) => p.clickedArt && p.clickedArt._id == p.artwork._id ? `600` : `500`};
display: flex;
flex-direction: row;
max-height: 100px;
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

const Spacer = styled.div`
height: 20px;
`