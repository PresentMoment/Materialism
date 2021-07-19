import styled from "styled-components"
import Title from './Title'
import React, { useEffect, useState } from 'react'
import Search from "./Search";
import { LineBreak } from "../Layout/LineBreak";

export default function Header(props) {
  const [isBreakPoint, setBreakPoint] = useState(false)
  
  useEffect(() => {
    document !== undefined &&
    setBreakPoint(window.innerWidth > 425 ? true : false)
  }, [])
  return (
    <>
    <Nav isBreakPoint={isBreakPoint}>
      <div style={{display: 'flex', flexDirection: 'row', width: '100%',justifyContent: 'space-around' }}>
      <Title />
      <Search isBreakPoint={isBreakPoint} />
      </div>
    </Nav>
    <LineBreak paddingBottom={props.paddingBottom ? props.paddingBottom : 10} />
    
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