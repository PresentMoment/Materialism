import React from 'react'
import styled from "styled-components"

export default function Search() {
  return (
      <SearchStyles>Search</SearchStyles>
  )
}

const SearchStyles = styled('span')`
font-size: 4em;
margin-left: 20px;
&:hover {
  font-style: italic;
}
`