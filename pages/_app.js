import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head'
import { useState, useEffect } from "react"
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css'
import PageTransition from '../components/tools/PageTransition'
import Header from '../components/layout/Header'


function MyApp({ Component, pageProps: { ...pageProps } }) {

  const [darkMode, setDarkMode] = useState()
  const [theme, setTheme] = useState(null)

  useEffect(() => {

    if (localStorage.getItem('theme') === null) {
      const mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      document.body.style.backgroundColor = mode ? '#000011' : '#ffffff'
      setDarkMode(mode)
      localStorage.setItem('theme', JSON.stringify({ name: 'pink', val: '#ec4899', KitMode: 'System' }))
      setTheme({ name: 'pink', val: '#ec4899' })
      const style = document.createElement('style');
      style.setAttribute('id', 'selection')
      style.textContent = `::selection { background-color: #ec4899; color: black;}`
      if (!document.getElementById('selection')) {
        document.head.appendChild(style)
      }
    } else {
      const temp = JSON.parse(localStorage.getItem('theme'))
      const { name, val, KitMode } = temp
      setTheme({ name, val })
      if (KitMode === 'System') {
        const mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        document.body.style.backgroundColor = mode ? '#000011' : '#ffffff'
        setDarkMode(mode)
      }
      if (KitMode === 'Dark') {
        setDarkMode(true)
        document.body.style.backgroundColor = '#000011'
      }
      if (KitMode === 'Lite') {
        setDarkMode(false)
        document.body.style.backgroundColor = '#ffffff'
      }
      const style = document.createElement('style');
      style.setAttribute('id', 'selection')
      style.textContent = `::selection { background-color: ${temp.val}; color: black;}`
      if (!document.getElementById('selection')) {
        document.head.appendChild(style)
      }
    }

  }, [])

  return (
    <>
      <Head>
        <title>moinak05 - portfolio</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name='author' content="Moinak Majumdar" />
        <meta name='description' content='personal portfolio website' />
        <meta name='keywords' content='Next js, express js, nodejs, firebase, react js, mongo, portfolio, github' />
        <meta name="color-scheme" content="dark light" />
        <link rel="apple-touch-icon" sizes="500x500" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="500x500" href="/favicon.png" />
      </Head>
      {theme && <NextNProgress color={theme.val} height={3} showOnShallow={true} />}
      <PageTransition>
        {theme && <Component {...pageProps} darkMode={darkMode} theme={theme} />}
        {theme && <Header theme={theme} darkMode={darkMode} setTheme={setTheme} setDarkMode={setDarkMode} />}
      </PageTransition>
      <Analytics />
    </>
  )
}

export default MyApp
