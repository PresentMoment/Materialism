import { AppProps } from 'next/app'
import HeadPreloads from '../Components/HeadPreloads'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <><style jsx global>{`
  #__next {
    height: 100%;
    width: 100%;
  }
`}</style><HeadPreloads /><Component {...pageProps} /></>
}

export default MyApp
