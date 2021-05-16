import React, {useState} from 'react'
import styled from "styled-components"
import SearchInput from './SearchInput'

export default function Search(props) {
  const isBreakPoint = props
  const [clicked, setClicked] = useState(false)
  return (
      <div onClick={() => {setClicked(!clicked)}} style={{width: '40vw', textAlign: 'center'}}>

      {clicked ? <SearchInput /> : <SearchStyles isBreakPoint={isBreakPoint}>Search</SearchStyles>}
      </div>
  )
}

const SearchStyles = styled('span')<{isBreakPoint: boolean}>`
font-size: 2em;
margin-left: ${(p) => p.isBreakPoint ? 'none' : '20px'};
&:hover {
  font-style: italic;
}
`