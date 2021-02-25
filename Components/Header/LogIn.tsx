import React from 'react'
import Link from "next/link";
import styled from "styled-components"


export default function LogIn(props) {
  const isBreakPoint = props
  return (
    <>
    <LogTxt isBreakPoint={isBreakPoint}>
      <Link href={{ pathname: "/login" }}>
    <a>
    <Txt>Log In</Txt>
    </a>
      </Link>
    <span>/</span>
    <Link href={{ pathname: "/signup" }}>
    <a>
    <Txt>Sign Up</Txt>
    </a></Link>
    </LogTxt>
    </>
  )
}

const LogTxt = styled('div')<{isBreakPoint: boolean}>`
font-size: ${(p) => p.isBreakPoint ? '2em' : '4em'};
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