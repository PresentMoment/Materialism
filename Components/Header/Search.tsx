import React, {useState} from 'react'
import styled from "styled-components"
import SearchInput from './SearchInput'

export default function Search(props) {
  const isBreakPoint = props
  const [clicked, setClicked] = useState(false)
  return (
      <SearchContainer onClick={() => {setClicked(!clicked)}}  isBreakPoint={isBreakPoint}>

      {clicked ? <SearchInput /> : <SearchStyles isBreakPoint={isBreakPoint}>Search</SearchStyles>}
      </SearchContainer>
  )
}

const SearchContainer = styled.div<{isBreakPoint: boolean}>`
min-width: ${(p) => p.isBreakPoint ? '80vw': '30vw'};
text-align: center;
`

const SearchStyles = styled('span')<{isBreakPoint: boolean}>`
font-size: 2em;
margin-left: ${(p) => p.isBreakPoint ? 'none' : '20px'};
`