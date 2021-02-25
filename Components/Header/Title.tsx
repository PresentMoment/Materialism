import styled from "styled-components"
import Link from "next/link";

export default function Title(props) {
  const isBreakPoint = props;
  return (
    <Link href={{ pathname: "/" }}>
    <a>

<TitleText isBreakPoint={isBreakPoint}>MATERIAL</TitleText>
    </a>
    </Link>
  )
}


const  TitleText =  styled('span')<{isBreakPoint: boolean}>`
font-family: 'EB Garamond', 'Raleway', serif;
font-size: ${(p) => p.isBreakPoint ? '2em' : '6em'};
font-style: italic;
text-align: center;
`