import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './css/globals.css'
import AppTheme from './components/theme/AppTheme'
import Navbar from './components/others/Navbar'
import Footer from './components/others/Footer';

export const metadata: Metadata = {
  title: 'Moinak Majumdar | Home',
  description: 'Hey! this is @moinak05, A passionate full stack web developer from India, Welcome to my portfolio. Let me introduce you with my various projects.',
  authors: [{ name: 'Moinak Majumdar', url: 'https://www.linkedin.com/in/moinak-majumdar' }],
  keywords: ['Next js', 'express js', 'node js', 'firebase', 'react js', 'mongo', 'portfolio', 'github', 'vercel', 'typescript'],
  openGraph: {
    type: 'website',
    title: 'Moinak Majumdar | Home',
    description: 'Hey! this is @moinak05, A passionate full stack web developer from India, Welcome to my portfolio. Let me introduce you with my various projects.',
    images: 'https://avatars.githubusercontent.com/u/99950805?v=4',
    url: 'https://moinak05.vercel.app/',
  },
}

interface props { children: ReactNode }

export default function RootLayout({ children }: props) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body className='bg-white dark:bg-[#000011] text-gray-800 dark:text-gray-200'>
        <AppTheme>
          <Navbar />
          {children}
          <Footer />
        </AppTheme>
      </body>
    </html>
  )
}
