import { motion } from 'framer-motion'
import Head from 'next/head'
// import Hero from "../components/home/Hero"
import Hero2 from '@/components/home/Hero2'
import AboutMe from "../components/home/AboutMe"
import Tech from "../components/home/Tech"
// import MyWorks from '../components/home/MyWorks'
import MyProjects from '../components/home/MyProjects'
import Footer from '../components/layout/Footer'
import MyPhotography from '../components/home/MyPhotography'
import HireMe from '../components/home/HireMe'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import DevFlag from '@/components/others/DevFlag'
import FlutterProjects from '@/components/home/FlutterProjects'


const viewport = {
  once: false,
  amount: typeof window !== 'undefined' ? (window.innerWidth > 450 ? 0.3 : 0.1) : 0.3
}

const transition = {
  closed: {
    staggerChildren: 0.3, staggerDirection: -1
  },
  open: {
    staggerChildren: 0.3, delayChildren: 0.2
  }
}


const index = () => {

  const darkMode = useSelector((s: RootState) => s.darkMode.mode);
  // const theme = useSelector((s: RootState) => s.colorTheme);

  const devFlag:boolean = process.env.NEXT_PUBLIC_DEV_FLAG == 'yes' ? true : false;
  
  return (
    <>
      {devFlag && <DevFlag />}
      <Head>
        <meta property='og:title' content='Moinak Majumdar | Home' />
        <title>Moinak Majumdar | Home</title>
      </Head>
      {/* hero section */}
      {/* <motion.section id='intro' className={` min-h-screen flex relative overflow-hidden`} initial='closed' whileInView='open' viewport={viewport} transition={transition} style={{ background: `${darkMode ? 'radial-gradient(ellipse at bottom, #1b2735 0%,#090a0f 100%)' : 'radial-gradient(ellipse at bottom, #DFFEFE 0%,#FFFFFF 100%)'}` }}>
        <Hero />
      </motion.section> */}
      <Hero2 />
      {/* AboutMe section */}
      <motion.section id='aboutMe' initial='closed' whileInView='open' viewport={viewport} transition={transition} className={` relative max-w-[100vw] overflow-hidden ${darkMode ? 'bg-gradient-to-t from-slate-900' : ''}`}>
        <AboutMe />
      </motion.section>
      {/* Tools and Tech */}
      <motion.section id='tech' initial='closed' whileInView='open' viewport={viewport} transition={transition} className={` relative ${darkMode ? 'bg-gradient-to-b from-slate-900' : ''}`}>
        <Tech />
      </motion.section>
      {/* My works section */}
      {/* <motion.section id='myWorks' initial='closed' whileInView='open' viewport={viewport} transition={transition} className={` relative overflow-hidden bg-gradient-to-b ${darkMode? 'from-black to-transparent': 'from-gray-200 to-transparent'}`}>
        <MyWorks />
      </motion.section> */}
      {/* Web projects section */}
      <motion.section id='WebProjects' initial='closed' whileInView='open' viewport={viewport} transition={transition} className={`relative overflow-hidden bg-gradient-to-br ${darkMode? 'from-black to-transparent': 'from-white to-transparent'}`}>
        <MyProjects />
      </motion.section>
      {/* Flutter Project Section */}
      <motion.section id='FlutterProjects' initial='closed' whileInView='open' viewport={viewport} transition={transition} className='relative overflow-hidden'>
        <FlutterProjects />
      </motion.section>
      {/* My photography section */}
      <motion.section id='myHobby' initial='closed' whileInView='open' viewport={viewport} transition={transition} className=' relative overflow-hidden'>
        <MyPhotography />
      </motion.section>
      {/* Hire me section */}
      <motion.section id='hire' initial='closed' whileInView='open' viewport={viewport} transition={transition} className=' relative overflow-hidden myContainer py-[8rem]'>
        <HireMe />
      </motion.section>
      {/* Footer */}
      <Footer />
    </>
  )
}

export default index