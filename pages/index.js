import { motion } from 'framer-motion'
import Hero from "../components/home/Hero"
import AboutMe from "../components/home/AboutMe"
import Tech from "../components/home/Tech"
import MyWorks from '../components/home/MyWorks'
import MyProjects from '../components/home/MyProjects'
import Footer from '../components/layout/Footer'
import MyPhotography from '../components/home/MyPhotography'
import HireMe from '../components/home/HireMe'

const viewport = {
  once: false,
  amount: typeof window !== 'undefined' ? (window.innerWidth > 450 ? 0.5 : 0.1) : 0.5
}

const transition = {
  closed: {
    staggerChildren: 0.3, staggerDirection: -1
  },
  open: {
    staggerChildren: 0.3, delayChildren: 0.2
  }
}

const index = ({ darkMode, theme }) => {
  const key = ['intro', 'aboutMe', 'tech', 'myWorks', 'myProjects', 'myHobby', 'hire', 'footer']

  const compo = [
    <Hero key={key[0]} darkMode={darkMode} theme={theme}/>,
    <AboutMe key={key[1]} darkMode={darkMode} theme={theme}/>,
    <Tech key={key[2]} darkMode={darkMode} theme={theme}/>,
    <MyWorks key={key[3]} darkMode={darkMode} theme={theme}/>,
    <MyProjects key={key[4]} darkMode={darkMode} theme={theme}/>,
    <MyPhotography key={key[5]} darkMode={darkMode} theme={theme}/>,
    <HireMe key={key[6]} darkMode={darkMode} theme={theme}/>,
    <Footer key={key[7]} darkMode={darkMode}/>,
  ]

  return (
    <>
      {compo.map((components, index) => {
        return (
          <motion.div key={key[index]} initial='closed' whileInView='open' viewport={viewport} transition={transition}>
            {components}
          </motion.div>
        )
      })}
    </>
  )
}

export default index