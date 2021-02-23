import React from 'react'
import styled from "styled-components"

export default function Tagline() {
  return (
    <TagText><span>Find Public Art Near You</span></TagText>
  )
}

const TagText = styled('div')`
text-align: center;
margin-top: 10px;
font-size:  3em;
font-weight: 500;

`