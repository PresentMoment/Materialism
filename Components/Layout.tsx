import React, {useState, useEffect} from 'react'
import { useRouter } from "next/router";
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
    {props.errMsg && props.errMsg.length > 0 && <div style={{textAlign: 'center', padding: '0 50px'}}><span style={{fontSize: '3rem', fontWeight: 500}}>{props.errMsg[0]}</span><span style={{fontSize: '1rem', fontStyle: 'italic'}}>{props.errMsg[1]}</span></div>}
      {!locErr && router.pathname === '/' && props.userlocation !== 'undefined' ? <div onClick={props.getLocation}><Tagline userlocation={props.userlocation[0]} /> </div> : null}
      {React.Children.map(children, (child) => React.cloneElement(child))}
      {/* {children} */}
      {router.pathname === '/' &&<Footer />}
    </>
  )
}
