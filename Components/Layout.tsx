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
      {router.pathname === '/' && props.userlocation !== 'undefined' ? <div onClick={props.getLocation}><Tagline userlocation={props.userlocation[0]} /> </div> : null}
      {React.Children.map(children, (child) => React.cloneElement(child))}
      {/* {children} */}
      <Footer />
    </>
  )
}
