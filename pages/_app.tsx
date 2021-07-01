import { AppProps } from 'next/app'
import Footer from '../Components/Footer/Footer'
import HeadPreloads from '../Components/HeadPreloads'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <><style jsx global>{`
  #__next {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`}</style><HeadPreloads /><Component {...pageProps} /><Footer /></>
}

export default MyApp
