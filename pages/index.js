import { motion } from 'framer-motion'
import axios from 'axios'
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

const index = ({ darkMode, theme, Work, Project, Hobby }) => {
  const key = ['intro', 'aboutMe', 'tech', 'myWorks', 'myProjects', 'myHobby', 'hire', 'footer']

  const compo = [
    <Hero key={key[0]} darkMode={darkMode} theme={theme}/>,
    <AboutMe key={key[1]} darkMode={darkMode} theme={theme}/>,
    <Tech key={key[2]} darkMode={darkMode} theme={theme}/>,
    <MyWorks key={key[3]} darkMode={darkMode} theme={theme} Work={Work} />,
    <MyProjects key={key[4]} darkMode={darkMode} theme={theme} Project={Project}/>,
    <MyPhotography key={key[5]} darkMode={darkMode} theme={theme} Hobby={Hobby}/>,
    <HireMe key={key[6]} darkMode={darkMode} theme={theme} />,
    <Footer key={key[7]} darkMode={darkMode} theme={theme} />,
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

export async function getServerSideProps() {
  let Hobby, Work, Project
  const optWork = {
    method: 'POST',
    url: process.env.NEXT_PUBLIC_GET_ALL_DOC_API,
    params: {
      apiKey: process.env.NEXT_PUBLIC_DB_KEY
    },
    headers: { 'Content-Type': 'application/json' },
    data: { type: 'work' }
  };
  const optProject = {
    method: 'POST',
    url: process.env.NEXT_PUBLIC_GET_ALL_DOC_API,
    params: {
      apiKey: process.env.NEXT_PUBLIC_DB_KEY
    },
    headers: { 'Content-Type': 'application/json' },
    data: { type: 'project' }
  };
  const optHobby = {
    method: 'GET',
    url: process.env.NEXT_PUBLIC_GET_ALL_PHOTOGRAPHY_API,
    params: {
      apiKey: process.env.NEXT_PUBLIC_DB_KEY
    },
    headers: { 'Content-Type': 'application/json' }
  };
  await axios.request(optWork).then((response) => {
    Work = response.data
  }).catch((error) => {
      console.log(error)
  })
  await axios.request(optProject).then((response) => {
    Project = response.data
  }).catch((error) => {
    console.log(error)
  })
  await axios.request(optHobby).then((response) => {
    const d = response.data
    const shuffled = d.sort(() => 0.5 - Math.random());
    Hobby = shuffled.slice(0, 4)
    setPhoto(shuffled.slice(0, 4))
  }).catch((error) => {
      console.log(error)
  })

  return {props: {Work: Work, Project: Project, Hobby: Hobby}}
}

export default index