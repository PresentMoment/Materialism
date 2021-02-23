import React from "react";
import styled from "styled-components"
import Title from './Title'
import LogIn  from './LogIn'
import Search from "./Search";
import Tagline from "./Tagline";

export default function Header() {
  return (
    <>
    <Nav>
      <LogoContainer>
      <img src ='/logo.png' alt="" width={100} height={100} />
      <Search />
      </LogoContainer>
    <TextContainer>
      <Title />
      <LogIn />
    </TextContainer>
    </Nav>
    <LineBreak />
    <Tagline />
    </>
  );
}

const Nav = styled("div")`
font-family: 'Cormorant Garamond', serif;
display: flex;
flex-direction: row;
justify-content: space-between;
margin: 20px 30px 0 20px;
`
const LogoContainer = styled("div")`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`

const TextContainer = styled("div")`
display: flex;
flex-direction: column;
margin-top: -10px;
`
const LineBreak =  styled('div')`
border-bottom: 2px solid black;
padding-bottom: 30px;
margin: 0 auto;
`