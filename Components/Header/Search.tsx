import React from 'react'
import styled from "styled-components"

export default function Search(props) {
  const isBreakPoint = props

  return (
      <SearchStyles isBreakPoint={isBreakPoint}>Search</SearchStyles>
  )
}

const SearchStyles = styled('span')<{isBreakPoint: boolean}>`
font-size: 4em;
margin-left: ${(p) => p.isBreakPoint ? 'none' : '20px'};
&:hover {
  font-style: italic;
}
`