import React from 'react'
import styled from "styled-components"

import useMediaQuery from '../../Utils/useMediaQuery'

export default function ArtistCard() {
  const isBreakPoint = useMediaQuery(425)
  return (
    <>
    <Wrapper isBreakPoint={isBreakPoint}>
      <ArtistInfo isBreakPoint={isBreakPoint}>
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