import React from 'react'
import styled from "styled-components"
import Link from "next/link";

import { Media, MediaContextProvider } from '../Layout/media';

export default function Title(props) {
  const isBreakPoint = props;
  return (
    <MediaContextProvider>

    <div style={{marginTop: '-8px'}}>

    <Link href={{ pathname: "/" }}>
    <a>

<TitleText isBreakPoint={isBreakPoint}>
  <Media lessThan='sm'>M</Media>
  <Media greaterThanOrEqual='sm'>Materialism</Media>
</TitleText>
    </a>
    </Link>
    </div>
    </MediaContextProvider>
  )
}


const  TitleText =  styled('span')<{isBreakPoint: boolean}>`
font-family: 'EB Garamond', 'Raleway', serif;
font-size: ${(p) => p.isBreakPoint ? '3em' : '6em'};
font-style: italic;
text-align: center;
`