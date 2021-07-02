import styled from "styled-components"

const LineBreak = styled.div<{paddingBottom: number}>`
border-bottom: 2px solid black;
padding-bottom: ${({ paddingBottom }) => paddingBottom + 'px'}
`
export {LineBreak}