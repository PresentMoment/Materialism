import React, {useState, useEffect} from 'react'
import { useRouter } from "next/router";
import styled from "styled-components"
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Tagline from './Header/Tagline';
import { useAppContext } from '../Utils/state';

export default function Layout(props) {
  const { children } = props;
  const router = useRouter();
  const [locErr, setLocErr] = useState(false);
  const {insta} = useAppContext();

  useEffect(() => {
    if (props.errMsg && props.errMsg.length > 0){
      setLocErr(true)
    }
  }, [props.errMsg])
  return (
    <>
    <Header />
      {props.errMsg && props.errMsg.length > 0 && <ErrorContainer><ErrorText>{!insta ? props.errMsg[0] : `Looks like you're viewing Materialism inside Instagram`}</ErrorText><div /><ErrorSub>{!insta ? props.errMsg[1] : `Use Chrome to enable location services`}</ErrorSub></ErrorContainer>}
      {!locErr && router.pathname === '/' && props.userlocation !== 'undefined' ? <div onClick={props.getLocation}><Tagline userlocation={props.userlocation[0]} /> </div> : null}
      {React.Children.map(children, (child) => React.cloneElement(child))}
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