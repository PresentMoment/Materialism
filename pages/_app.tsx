import { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import NextNprogress from 'nextjs-progressbar';
import { NextSeo } from "next-seo";

import { AppWrapper } from '../Utils/state'
import HeadPreloads from '../Components/HeadPreloads'
import '../styles/globals.css'


function Materialism({ Component, pageProps }: AppProps) {

  const [artData, setArtData] = useState([]);
  const [safariMobile, setSafariMobile] = useState(false);

  useEffect(() => {
      pageProps.props && setArtData(pageProps.props);

      let ua = navigator.userAgent;
      const regex = /(?=^.*Safari)(?=^.*Mobile)(?!^.*CriOS)(?!^.*Linux).*/;
      let test = regex.test(ua)
      setSafariMobile(test);
      
  }, [])

  return <>
      <NextSeo
      title="Materialism"
      description="Materialism - art within reach"
      openGraph={{
        type: 'website',
        locale: 'en_IE',
        url: 'https://www.materialism.nyc',
        title: `Materialism`,
        description: 'Materialism - art within reach',
        images: [
          {
            url: '/public/Logo.jpg',
            width: 800,
            height: 800,
            alt: `Materialism`,
          },
        ],
        site_name: 'Materialism',
      }}
      twitter={{
        site: `${process.env.BASE_URL}`,
        cardType: "summary_large_image",
      }}
    />
  <style jsx global>{`
    #__next {
      height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    `}</style>
  <HeadPreloads />
  <NextNprogress
    color="#a6a6a6"
    startPosition={0.3}
    stopDelayMs={200}
    height={3}
    showOnShallow={true}
    />
  <AppWrapper works={artData} safariMobile={safariMobile}>
      <Component {...pageProps} />
  </AppWrapper>
  </>
}

export default Materialism;