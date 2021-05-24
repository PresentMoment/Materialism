import styled from "styled-components"

const LineBreak = styled.div<{paddingBottom: number}>`
border-bottom: 2px solid black;
margin: 0 auto;
padding-bottom: ${({ paddingBottom }) => paddingBottom + 'px'}
`
export {LineBreak}