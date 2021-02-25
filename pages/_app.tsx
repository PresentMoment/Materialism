import { AppProps } from 'next/app'
import HeadPreloads from '../Components/HeadPreloads'
import '../styles/globals.css'

import useMediaQuery from '../Utils/useMediaQuery'

function MyApp({ Component, pageProps }: AppProps) {
  const isBreakPoint = useMediaQuery(425)
  return <><style jsx global>{`
  #__next {
    height: 100%;
    width: 100%;
  }
`}</style><HeadPreloads /><Component {...pageProps} isBreakPoint={isBreakPoint} /></>
}

export default MyApp