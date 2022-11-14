import '../styles/globals.css'
import { useState, useEffect } from "react"
import PageTransition from '../components/tools/PageTransition'
import Head from 'next/head'
import Header from '../components/layout/Header'


function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  const [darkMode, setDarkMode] = useState()
  const [theme, setTheme] = useState()

  useEffect(() => {
    if (localStorage.getItem('darkMode') === null) {
      localStorage.setItem('darkMode', JSON.stringify(false))
      document.body.style.backgroundColor = '#ffffff'
      setDarkMode(false)
    } else {
      const mode = JSON.parse(localStorage.getItem('darkMode'))
      if (mode === false) {
        document.body.style.backgroundColor = '#ffffff'
        setDarkMode(false)
      }
      if (mode === true) {
        document.body.style.backgroundColor = '#000011'
        setDarkMode(true)
      }
    }

    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', JSON.stringify({ name: 'pink', val: '#ec4899' }))
      setTheme({ name: 'pink', val: '#ec4899' })
      const style = document.createElement('style');
      style.setAttribute('id', 'selection')
      style.textContent = `::selection { background-color: #ec4899; color: black;}`
      if (!document.getElementById('selection')) {
        document.head.appendChild(style)
      }
    } else {
      const temp = JSON.parse(localStorage.getItem('theme'))
      setTheme(temp)
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
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name='author' content="Moinak Majumdar"/>
        <meta name='description' content='personal portfolio website'/>
        <meta name='keywords' content='Nextjs, exprssjs, nodejs, firebase, reactjs, mongo, portfolio, github'/>
      </Head>
      <PageTransition>
        {theme && <Component {...pageProps} darkMode={darkMode} theme={theme} />}
        {theme && <Header theme={theme} darkMode={darkMode} setTheme={setTheme} setDarkMode={setDarkMode} />}
      </PageTransition>
    </>
  )
}

export default MyApp
