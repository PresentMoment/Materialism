import React from 'react'
import styled from "styled-components"
import Link from "next/link";

import { Media, MediaContextProvider } from '../Layout/media';

export default function Title() {
  return (
    <MediaContextProvider>
      <div style={{marginTop: '-8px'}}>
      <Link href={{ pathname: "/" }}>
      <a>
      <TitleText>
        <Media lessThan='sm'>M</Media>
        <Media greaterThanOrEqual='sm'>Materialism</Media>
      </TitleText>
      </a>
      </Link>
      </div>
    </MediaContextProvider>
  )
}


const  TitleText =  styled('span')`
font-family: 'EB Garamond', 'CormorantGaramond', serif;
font-size: 3em;
font-style: italic;
text-align: center;
`