import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import PageTransition from '../components/tools/PageTransition';
import Header from '@/components/layout/Header';
import PageLoader from '@/components/tools/PageLoader';
import FontProvider from '@/context/FontProvider';
import Redux from '@/redux/Redux';


export default function App({ Component, pageProps }: AppProps) {


  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="next-head-count" content="5" />
        <meta name="color-scheme" content="dark light" />
        <title>Moinak Majumdar | Portfolio</title>
        <meta name='author' content="Moinak Majumdar" />
        <meta name='description' content='Hey! this is @moinak05, A passionate full stack web developer from India, Welcome to my portfolio. Let me introduce you with my various projects.' />
        <meta name='keywords' content='Next js, express js, node js, firebase, react js, mongo, portfolio, github, vercel, typescript' />
        <meta property='og:title' content='Moinak Majumdar | Portfolio' />
        <meta property='og:keyword' content='Next js, express js, node js, firebase, react js, mongo, portfolio, github, vercel, typescript' />
        <meta property='og:description' content='Hey! this is @moinak05, A passionate full stack web developer from India, Welcome to my portfolio. Let me introduce you with my various projects.' />
        <meta property='og:type' content='website' />
        <meta property='og:image' content='https://avatars.githubusercontent.com/u/99950805?v=4' />
        <meta property='og:url' content='https://moinak05.vercel.app/' />
      </Head>
      <Redux>
        <FontProvider>
          <PageTransition>
            <PageLoader>
              <Header />
              <Component {...pageProps} />
            </PageLoader>
          </PageTransition>
        </FontProvider>
      </Redux>
      <Analytics />
    </>
  )
}
