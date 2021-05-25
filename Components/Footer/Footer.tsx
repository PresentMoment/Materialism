import React from 'react'
import Link from "next/link";
import styled from "styled-components"
import AddTag from './AddTag'

export default function Footer() {
  return (
    <>
    <Wrapper>
      <Link href={{ pathname: '/add/'}}>
      <a>

      <AddTag />
      </a></Link>
    </Wrapper>
    </>
  )
}

const Wrapper = styled("div")`
display: flex;
flex-direction: row;
margin: 0 auto;
justify-content: center;
`