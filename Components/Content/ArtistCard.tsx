import React from 'react'
import styled from "styled-components"

export default function ArtistCard() {
  return (
    <>
    <Wrapper>
      <ArtistInfo>
        <span>Artist:</span>
        <span>Title:</span>
        <span>Year:</span>
      </ArtistInfo>
      <span>IMAGE</span>
    </Wrapper>
      <LineBreak />
      </>
  )
}

const Wrapper = styled("div")`
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 0 20px;
`

const ArtistInfo = styled("div")`
display: flex;
flex-direction: column;
font-family: 'Raleway';
font-size: 1.5em;
line-height: 2em;
`
const LineBreak =  styled('div')`
border-bottom: 1px solid black;
padding-bottom: 20px;
margin: 0 auto;
width: 95%;
`