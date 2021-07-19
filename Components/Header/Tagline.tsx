import React, { useState, useEffect} from 'react'
import styled, { keyframes } from "styled-components"
import { Transition } from "react-transition-group";

export default function Tagline(userlocation) {
  const [transState, setTransState] = useState(false);
  const [geoClicked, setGeoClicked] = useState(false);
  const [hover, setHover] = useState(false)

  useEffect(() => {
    if (userlocation.userlocation > 0){
      setTransState(true)
    }
  }, [userlocation])

  const tagStyle = {
    transition: `font-size ${1000}ms ease-in-out`,
    fontSize: '3rem'
  };
  
  const tagTransitions = {
    entering: { fontSize: '0',
  },
    entered: { fontSize: '0',
  },
    exiting: { fontSize: '3rem',
  },
    exited: { fontSize: '3rem',
  },
  };

  return (
    <>
    <Transition in={transState} timeout={1000}>
        {(state) => (
          <div
          style={{
          ...tagStyle,
          ...tagTransitions[state],
          }}
          >

    <TagText hover={hover} onClick={() => setGeoClicked(true)}>{!geoClicked ? <TagBorder onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} hover={hover}><span>Find Public Art Near You</span></TagBorder> :<Loading><span>Fetching Location<Circle>.</Circle><Circle>.</Circle><Circle>.</Circle></span></Loading>}</TagText>
          </div>
        )}
          </Transition>
          </>
  )
}

const Loading = styled.div`
display: inline-block;
`

const TagText = styled('div')<{hover: boolean}>`
text-align: center;
margin-top: 10px;
font-weight: 500;
cursor: pointer;
color: ${(p) => p.hover ? 'white' : 'black'};
`

const TagBorder = styled.div<{hover: boolean}>`
display: inline-block;
border: 1px solid #bfbdbd;
border-radius: 1px;
padding: 1px 10px;
background-color: ${(p) => p.hover ? '#bfbdbd' : 'transparent'};
`

const breatheAnimation = keyframes`
0% {
  opacity: .2;
}
20% {
  opacity: 1;
}
100% {
  opacity: .2;
}
`

const Circle = styled.span`
 animation-name: ${breatheAnimation};
 animation-duration: 1.4s;
 animation-iteration-count: infinite;
 animation-fill-mode: both;
 &:nth-child(2){
    animation-delay: .2s;
 };
 &:nth-child(3){
    animation-delay: .4s;
 }
`