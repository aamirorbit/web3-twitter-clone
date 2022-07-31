import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import { RecoilRoot } from "recoil";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
<MoralisProvider appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID} serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL} >
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
    </MoralisProvider>
  ) 
}

export default MyApp
