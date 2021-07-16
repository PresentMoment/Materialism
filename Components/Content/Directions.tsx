import React from 'react'
import styled from "styled-components"

export default function Directions(props) {
  const lat = props.data.location.lat;
  const lng = props.data.location.lng;
  return (
    <Container><a target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${lat}%2C${lng}`} rel="noopener noreferrer"><span>Directions</span></a>
    </Container>
  )
}

const Container = styled.div`
background-color: white;
position: absolute;
right: 3px;
bottom: 3px;
z-index: 99999;
padding: 3px 10px;
font-size: 2rem;
`
