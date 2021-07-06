import React, { useState, useEffect} from 'react'
import styled, { keyframes } from "styled-components"
import { Transition } from "react-transition-group";

export default function Tagline(userlocation) {
  const [transState, setTransState] = useState(false);
  const [geoClicked, setGeoClicked] = useState(false);

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

    <TagText onClick={() => setGeoClicked(true)}>{!geoClicked ? <span>Find Public Art Near You</span> :<Loading><span>Fetching Location<Circle>.</Circle><Circle>.</Circle><Circle>.</Circle></span></Loading>}</TagText>
          </div>
        )}
          </Transition>
          </>
  )
}

const Loading = styled.div`
display: inline-block;
`

const TagText = styled('div')`
text-align: center;
margin-top: 10px;
font-weight: 500;
cursor: pointer;
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