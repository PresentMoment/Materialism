import { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import NextNprogress from 'nextjs-progressbar';

import { AppWrapper } from '../Utils/state'
import { WorksProvider } from '../Utils/worksContext';
import HeadPreloads from '../Components/HeadPreloads'
import '../styles/globals.css'


function Materialism({ Component, pageProps }: AppProps) {
  const [artData, setArtData] = useState([]);
  useEffect(() => {
      pageProps.props && setArtData(pageProps.props)
  }, [])
  return <><style jsx global>{`
  #__next {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`}</style><HeadPreloads />
        <NextNprogress
          color="#a6a6a6"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <AppWrapper works={artData}>
            <Component {...pageProps} />
        </AppWrapper>
        </>
}

export default Materialism;