import { motion } from 'framer-motion'
import Link from 'next/link';
import DocCard from "../others/DocCard";

const viewport = {
  once: false,
  amount: typeof window !== 'undefined' ? (window.innerWidth > 450 ? 0.5 : 0.05) : 0.5
}
const outerVariants = {
  open: {
      transition: { staggerChildren: 0.3, delayChildren: 0.3 }
  },
  closed: {
      transition: { staggerChildren: 0.3, staggerDirection: -1 }
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


const MyProjects = ({ darkMode, theme, Project }) => {
  
  return (
    <section id='myProjects' className='relative overflow-hidden'>
      <div className={`myContainer py-[5rem] ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
        <motion.div initial='closed' whileInView='open' viewport={viewport} variants={outerVariants} className="flex flex-col justify-start">
          <motion.div variants={Heading}>
            <h4 className="font-ubuntu tracking-wide text-lg">PROJECTS</h4>
            <h1 className="text-4xl md:text-5xl mb-4 font-ubuntu">
              Learning<span className="font-ubuntu font-bold ml-2">By Building</span>
            </h1>
            <p className='font-roboto text-lg mt-4 max-w-[35rem]'>
            Learning tech by building solo projects.
            </p>
            <div className='mt-2'>
              <Link href='/Projects'>
                <a className='font-roboto text-xl font-bold' style={{ color: theme.val }}>View all solo projects</a>
              </Link>
            </div>
          </motion.div>
          <div>
            {!Project && <h1 className="text-center text-4xl mt-40"><span className="font-ubuntu font-bold" style={{ color: `${theme.val}` }}>Server Error:</span> Failed to fetch projects.</h1>}
            {Project && <div  className="mt-4 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
              {Project.map((curr, index) => {
                return (
                  <DocCard key={index} darkMode={darkMode} theme={theme} data={curr}/>
                )
              })}
            </div>}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


export default MyProjects