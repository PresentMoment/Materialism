import { useRouter } from "next/router";
import styled from "styled-components"
import Title from './Title'
import LogIn  from './LogIn'
import Search from "./Search";
import Tagline from "./Tagline";
import { LineBreak } from "../Layout/LineBreak";

import useMediaQuery from '../../Utils/useMediaQuery'

export default function Header() {
  const router = useRouter();
  const isBreakPoint = useMediaQuery(425)



  return (
    <>
    <Nav isBreakPoint={isBreakPoint}>
      {/* {!isBreakPoint ?
      <LogoContainer>
      <img src ='/logo.png' alt="" width={100} height={100} />
      </LogoContainer> : null} */}
      <div style={{display: 'flex', flexDirection: 'row', width: '100%',justifyContent: 'space-around' }}>
      <Title isBreakPoint={isBreakPoint} />

      <Search isBreakPoint={isBreakPoint} />
   
      <LogIn isBreakPoint={isBreakPoint} />
    {/* <TextContainer isBreakPoint={isBreakPoint}>
    </TextContainer> */}
      </div>
    </Nav>
    <LineBreak paddingBottom={10} />
    {router.pathname === '/' && !isBreakPoint ? <Tagline /> : null}
    </>
  );
}

const Nav = styled("div")<{isBreakPoint: boolean}>`
font-family: 'Cormorant Garamond', serif;
display: flex;
flex-direction: ${(p) => p.isBreakPoint ? 'column-reverse' : 'row'};
justify-content: space-between;
margin: 20px 0px 0 0px;
`
// const LogoContainer = styled("div")`
// display: flex;
// flex-direction: row;
// align-items: center;
// justify-content: center;
// `
const TextContainer = styled("div")<{isBreakPoint: boolean}>`
display: flex;
flex-direction: row;
margin-top: -10px;
text-align: center;
justify-content: ${(p) => p.isBreakPoint ? 'space-between' : 'none'}
`