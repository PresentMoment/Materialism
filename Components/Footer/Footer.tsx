import React from 'react'
import Link from "next/link";
import styled from "styled-components"
import AddTag from './AddTag'

export default function Footer() {
  return (
    <>
    <Wrapper>
      <div style={{display: 'flex', flex: 1}}>{" "}</div>
      <FooterLinks>
      <Link href={{ pathname: '/about/'}}>
      <a><span>About</span></a></Link><Link href={{ pathname: '/contact/'}}>
      <a><span>Contact</span></a></Link>
      </FooterLinks>
      {/* <Link href={{ pathname: '/add/'}}>
      <a>

      <AddTag />
      </a></Link> */}
    </Wrapper>
    </>
  )
}

const Wrapper = styled("div")`
display: flex;
flex-direction: column;
margin: 0 auto;
justify-content: center;
flex: 1;
`

const FooterLinks = styled("div")`
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-around;
font-size: 2.3rem;
margin-bottom: 30px;
`