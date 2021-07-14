import React from 'react'
import { useRouter } from "next/router";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Tagline from './Header/Tagline';

export default function Layout(props) {
  const { children } = props;
  const router = useRouter();
  return (
    <>
    <Header />
    {props.errMsg.length > 0 && <><span style={{fontSize: '3rem', fontWeight: 500}}>{props.errMsg[0]}</span><span style={{fontSize: '1rem', fontStyle: 'italic'}}>{props.errMsg[1]}</span></>}
      {router.pathname === '/' && props.errMsg.length > 0 && props.userlocation !== 'undefined' ? <div onClick={props.getLocation}><Tagline userlocation={props.userlocation[0]} /> </div> : null}
      {React.Children.map(children, (child) => React.cloneElement(child))}
      {/* {children} */}
      {router.pathname === '/' &&<Footer />}
    </>
  )
}
