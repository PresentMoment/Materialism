import React, {useState, useEffect} from 'react'
import { useRouter } from "next/router";
import styled from "styled-components"
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Tagline from './Header/Tagline';

export default function Layout(props) {
  const { children } = props;
  const router = useRouter();
  const [locErr, setLocErr] = useState(false);

  useEffect(() => {
    if (props.errMsg && props.errMsg.length > 0){
      setLocErr(true)
    }
  }, [props.errMsg])
  return (
    <>
    <Header />
    {props.errMsg && props.errMsg.length > 0 && <ErrorContainer><ErrorText>{props.errMsg[0]}</ErrorText><div /><ErrorSub>{props.errMsg[1]}</ErrorSub></ErrorContainer>}
      {!locErr && router.pathname === '/' && props.userlocation !== 'undefined' ? <div onClick={props.getLocation}><Tagline userlocation={props.userlocation[0]} /> </div> : null}
      {React.Children.map(children, (child) => React.cloneElement(child))}
      {/* {children} */}
      {router.pathname === '/' &&<Footer />}
    </>
  )
}

const ErrorContainer = styled.div`
text-align: center;
padding: 0 20px;
`
const ErrorText = styled.span`
font-size: 3rem;
font-weight: 500;
`
const ErrorSub = styled.span`
font-size: 1rem;
font-style: italic;
`