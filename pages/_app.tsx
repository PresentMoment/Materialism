import { AppProps } from 'next/app'
import NextNprogress from 'nextjs-progressbar';
import HeadPreloads from '../Components/HeadPreloads'
import '../styles/globals.css'

function Materialism({ Component, pageProps }: AppProps) {
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
<Component {...pageProps} /></>
}

export default Materialism
