import { useRouter } from "next/router";
import styled from "styled-components"
import Title from './Title'
import LogIn  from './LogIn'
import Search from "./Search";
import Tagline from "./Tagline";

import useMediaQuery from '../../Utils/useMediaQuery'


export default function Header(props) {
  const router = useRouter();
  const isBreakPoint = props
  return (
    <>
    <Nav isBreakPoint={isBreakPoint}>
      {!isBreakPoint ?
      <LogoContainer>
      <img src ='/logo.png' alt="" width={100} height={100} />
      </LogoContainer> : null}
      <Search isBreakPoint={isBreakPoint} />
   
    <TextContainer isBreakPoint={isBreakPoint}>
      <Title isBreakPoint={isBreakPoint} />
      <LogIn isBreakPoint={isBreakPoint} />
    </TextContainer>
    </Nav>
    <LineBreak />
    {router.pathname === '/' && !isBreakPoint ? <Tagline /> : null}
    </>
  );
}

const Nav = styled("div")<{isBreakPoint: boolean}>`
font-family: 'Cormorant Garamond', serif;
display: flex;
flex-direction: ${(p) => p.isBreakPoint ? 'column-reverse' : 'row'};
justify-content: space-between;
margin: 20px 30px 0 20px;
`
const LogoContainer = styled("div")`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
`

const TextContainer = styled("div")<{isBreakPoint: boolean}>`
display: flex;
flex-direction: row;
margin-top: -10px;
text-align: center;
justify-content: ${(p) => p.isBreakPoint ? 'space-between' : 'none'}
`
const LineBreak =  styled('div')`
border-bottom: 2px solid black;
padding-bottom: 30px;
margin: 0 auto;
`