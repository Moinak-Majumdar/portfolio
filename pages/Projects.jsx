import { motion } from 'framer-motion'
import axios from 'axios';
import { GiClick } from 'react-icons/gi'
import DocCard from "../components/others/DocCard";
import Bg from '../components/tools/Bg'
import Footer from '../components/layout/Footer'

const viewport = {
  once: false,
  amount: typeof window !== 'undefined' ? (window.innerWidth > 450 ? 0.5 : 0.05) : 0.5
}
const outerVariants = {
  open: {
    transition: { staggerChildren: 0.5, delayChildren: 0.3 }
  },
  closed: {
    transition: { staggerChildren: 0.5, staggerDirection: -1 }
  }
};
const Heading = {
  closed: {
    opacity: 0.5,
  },
  open: {
    opacity: 1,
    transition: {
      delay: 0.5
    }
  }
}

const Projects = ({ darkMode, theme, Work, Project }) => {

  return (
    <section className='flex flex-col'>
      <div id='myWorks' className={`relative overflow-hidden myContainer py-[5rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
        <motion.div initial='closed' whileInView='open' variants={outerVariants} className="flex flex-col justify-start">
          <motion.div variants={Heading}>
            <h4 className="font-ubuntu tracking-wide text-lg">PROJECTS</h4>
            <h1 className="text-4xl md:text-5xl mb-4 font-ubuntu">
              My<span className="font-ubuntu font-bold ml-2">Latest Works</span>
            </h1>
            <p className='font-roboto text-lg mt-4 max-w-[35rem]'>
              Work I did for my clients.
            </p>
            <p className="flex items-center gap-2 lg:hidden">
              <GiClick style={{ color: theme.val, fontSize: '20px' }} />
              Click on each card for full description.
            </p>
          </motion.div>
          <div >
            {Work && <div className="mt-4 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
              {Work.map((curr, index) => {
                return (
                  <DocCard key={index} darkMode={darkMode} theme={theme} data={curr} />
                )
              })}
            </div>}
          </div>
        </motion.div>
        <motion.div variants={Heading} className="absolute w-full lg:w-1/3 h-1/3 top-10 left-0 -z-10">
          <div className={`absolute w-full h-full inset-0 bg-gradient-to-t z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
          <Bg
            alt="landing pattern"
            src={darkMode ? '/assets/svg/pattern-dark.svg' : '/assets/svg/pattern-lite.svg'}
            className="opacity-60"
          />
          <div className={`absolute w-full h-full inset-0 bg-gradient-to-r z-10 ${darkMode ? 'from-[#000011]' : 'from-[#ffffff]'}`}></div>
        </motion.div>
      </div>
      <div id='myProjects' className={`relative overflow-hidden myContainer py-[5rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
        <motion.div initial='closed' whileInView='open' viewport={viewport} variants={outerVariants} className="flex flex-col justify-start">
          <motion.div variants={Heading}>
            <h4 className="font-ubuntu tracking-wide text-lg">PROJECTS</h4>
            <h1 className="text-4xl md:text-5xl mb-4 font-ubuntu">
              Learning<span className="font-ubuntu font-bold ml-2">By Building</span>
            </h1>
            <p className='font-roboto text-lg mt-4 max-w-[35rem]'>
              Learning tech by building solo projects.
            </p>
          </motion.div>
          <div>
            {Project && <div className="mt-4 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
              {Project.map((curr, index) => {
                return (
                  <DocCard key={index} darkMode={darkMode} theme={theme} data={curr} />
                )
              })}
            </div>}
          </div>
        </motion.div>
      </div>
      <Footer darkMode={darkMode}/>
    </section>
  )
}

export async function getServerSideProps() {
  let Work, Project;
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
  await axios.request(optWork).then((response) => {
    Work = response.data
  }).catch((error) => {
    const status = error.response.status;
    const data = error.response.data;
    const s = status.toString()
    if (s === '420') {
      console.log(error)
    } else if (s === '422' || s === '404' || s === '400') {
      setError(data.error)
    }
  })
  await axios.request(optProject).then((response) => {
    Project = response.data
  }).catch((error) => {
    const status = error.response.status;
    const data = error.response.data;
    const s = status.toString()
    if (s === '420') {
      console.log(error)
    } else if (s === '422' || s === '404' || s === '400') {
      console.log(data.error)
    }
  })

  return { props: { Work: Work, Project: Project } }
}


export default Projects