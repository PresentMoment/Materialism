import React from 'react'
import styled from "styled-components"

export default function LogIn() {
  return (
    <LogTxt>
    <Txt>Log In</Txt>
    <span>/</span>
    <Txt>Sign Up</Txt>
    </LogTxt>
  )
}

const LogTxt = styled('div')`
font-size: 4em;
display: flex;
flex-direction: row;
display: flex;
justify-content: space-between;
`
const Txt = styled('span')`
&:hover {
  font-style: italic;
}
`