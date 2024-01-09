'use client'

import { motion } from 'framer-motion'
import Hero from "./components/home/Hero";
import AboutMe from './components/home/AboutMe';
import { useAppTheme } from './components/theme/AppTheme';
import Tech from './components/home/Tech';
import WebProjects from './components/home/WebProjects';
import { Suspense } from 'react';
import WebProjectLoader from './components/home/WebProjectLoader';
import FlutterProjects from './components/home/FlutterProjects';
import Hobby from './components/home/Hobby';
import HireMe from './components/home/HireMe';

const viewport = {
  once: false,
  amount: typeof window !== 'undefined' ? (window.innerWidth > 450 ? 0.3 : 0.1) : 0.3
}

const transition = {
  closed: { staggerChildren: 0.3, staggerDirection: -1 },
  open: { staggerChildren: 0.3, delayChildren: 0.2 }
}

export default function Home() {

  const { ubuntu, poppins, roboto, themeColor } = useAppTheme()

  return (
    <>
      <Hero />
      <motion.section id='aboutMe' initial='closed' whileInView='open' viewport={viewport} transition={transition} className='relative max-w-[100vw] overflow-hidden dark:bg-gradient-to-t dark:from-slate-900 dark:to-transparent'>
        <AboutMe ubuntu={ubuntu} poppins={poppins} roboto={roboto} themeColor={themeColor} />
      </motion.section>
      <motion.section id='tech' initial='closed' whileInView='open' viewport={viewport} transition={transition} className=' relative dark:bg-gradient-to-b dark:from-slate-900'>
        <Tech poppins={poppins} roboto={roboto} ubuntu={ubuntu} themeColor={themeColor} />
      </motion.section>
      <motion.section id='WebProjects' initial='closed' whileInView='open' viewport={viewport} transition={transition} className='relative overflow-hidden bg-gradient-to-br dark:from-black dark:to-transparent from-gray-100 to-slate-100'>
        {/* <Suspense fallback={<WebProjectLoader />}> */}
        <WebProjects />
        {/* </Suspense> */}
      </motion.section>
      <motion.section id='FlutterProjects' initial='closed' whileInView='open' viewport={viewport} transition={transition} className='relative overflow-hidden'>
        <FlutterProjects />
      </motion.section>
      <motion.section id='myHobby' initial='closed' whileInView='open' viewport={viewport} transition={transition} className=' relative overflow-hidden'>
        <Hobby/>
      </motion.section>
      <motion.section id='hire' initial='closed' whileInView='open' viewport={viewport} transition={transition} className=' relative overflow-hidden myContainer py-[8rem]'>
        <HireMe />
      </motion.section>
    </>
  )
}